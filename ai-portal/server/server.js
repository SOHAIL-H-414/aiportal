const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { StringOutputParser } = require("@langchain/core/output_parsers");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- STATIC FILES FOR DEPLOYMENT ---
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
        return next();
    }
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// --- DATABASE CONNECTION (DUAL MODE: MONGO or JSON) ---
const mongoose = require('mongoose');
const DATA_FILE = path.join(__dirname, 'progress.json');
let useMongo = false;

// Define Schema for Mongo
const progressSchema = new mongoose.Schema({
    userId: String,
    completedDays: [String],
    streak: Number,
    maxStreak: Number,
    badges: [String],
    history: [Date],
    lastActivityDate: Date,
    externalProfiles: {
        github: String,
        leetcode: String,
        codechef: String,
        gfg: String,
        hackerrank: String
    }
});
const Progress = mongoose.model('Progress', progressSchema);

// Try connecting to Mongo if URI is present
if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000
    }).then(() => {
        console.log('✅ MongoDB Connected (Cloud Mode)');
        useMongo = true;
    }).catch(err => {
        console.log('⚠️ MongoDB Connection Failed. Switching to JSON File Storage (Local Mode).');
        useMongo = false;
    });
} else {
    console.log('ℹ️ No MONGO_URI found. Using JSON File Storage (Local Mode).');
}

// Initialize JSON file if needed
if (!fs.existsSync(DATA_FILE)) {
    const initialData = {
        userId: 'user_default',
        completedDays: [],
        streak: 0,
        maxStreak: 0,
        badges: [],
        history: [],
        lastActivityDate: null,
        externalProfiles: {}
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
}

// --- HELPER FUNCTIONS ---
const getProgress = async () => {
    if (useMongo) {
        let p = await Progress.findOne({ userId: 'user_default' });
        if (!p) {
            p = new Progress({
                userId: 'user_default',
                completedDays: [],
                streak: 0,
                maxStreak: 0,
                badges: [],
                history: [],
                externalProfiles: {}
            });
            await p.save();
        }
        return p;
    } else {
        // JSON Mode
        if (!fs.existsSync(DATA_FILE)) return null;
        return JSON.parse(fs.readFileSync(DATA_FILE));
    }
};

const saveProgress = async (data) => {
    if (useMongo) {
        // In Mongo mode, 'data' is a Mongoose document, so we just save it.
        // But if we modified a POJO, we need to update.
        // For simplicity in this dual-mode refactor, we'll assume we fetch-modify-save pattern.
        if (data.save) {
            await data.save();
        } else {
            await Progress.findOneAndUpdate({ userId: 'user_default' }, data, { upsert: true });
        }
    } else {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    }
};


// --- CHATBOT SETUP ---
const API_KEY = process.env.GOOGLE_API_KEY || "AIzaSyBL4ML4K3qeci6exzIt87Wle8XueOkjqhk";

const chatModel = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: API_KEY,
    temperature: 0.7,
});

const chatPrompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a helpful AI assistant for a coding learning portal. Keep answers concise and motivating."],
    ["human", "{input}"],
]);

const chatChain = chatPrompt.pipe(chatModel).pipe(new StringOutputParser());


// --- ROUTES ---

// Chatbot Endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ error: "Message is required" });

        const response = await chatChain.invoke({
            input: message
        });

        res.json({ reply: response });
    } catch (err) {
        console.error("Chat Error:", err);
        res.status(500).json({ error: "Failed to generate response" });
    }
});

// Get Progress
app.get('/api/progress', async (req, res) => {
    try {
        const data = getJsonData();
        if (!data) {
            return res.json({
                userId: 'user_default',
                completedDays: [],
                streak: 0,
                maxStreak: 0,
                badges: [],
                history: []
            });
        }
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Toggle Day Completion
app.post('/api/progress/toggle', async (req, res) => {
    const { dayId } = req.body;

    try {
        let progress = getJsonData();

        // 1. Apply Logic
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (progress.completedDays.includes(dayId)) {
            progress.completedDays = progress.completedDays.filter(d => d !== dayId);
        } else {
            progress.completedDays.push(dayId);

            // Fix history dates for JSON
            progress.history = progress.history.map(d => new Date(d));
            progress.history.push(new Date());

            const lastDate = progress.lastActivityDate ? new Date(progress.lastActivityDate) : null;
            if (lastDate) lastDate.setHours(0, 0, 0, 0);

            if (!lastDate) {
                progress.streak = 1;
            } else if (today.getTime() === lastDate.getTime()) {
                // Same day
            } else if ((today.getTime() - lastDate.getTime()) === 86400000) {
                progress.streak += 1;
            } else {
                progress.streak = 1;
            }

            progress.lastActivityDate = new Date();
            if (progress.streak > progress.maxStreak) progress.maxStreak = progress.streak;

            const newBadges = [];
            if (progress.completedDays.length >= 1 && !progress.badges.includes('First Step')) newBadges.push('First Step');
            if (progress.completedDays.length >= 5 && !progress.badges.includes('High Five')) newBadges.push('High Five');
            if (progress.completedDays.length >= 10 && !progress.badges.includes('Decathlete')) newBadges.push('Decathlete');
            if (progress.streak >= 3 && !progress.badges.includes('Hat Trick')) newBadges.push('Hat Trick');
            if (progress.streak >= 7 && !progress.badges.includes('Week Warrior')) newBadges.push('Week Warrior');
            if (progress.streak >= 30 && !progress.badges.includes('Monthly Master')) newBadges.push('Monthly Master');

            if (newBadges.length > 0) {
                progress.badges = [...progress.badges, ...newBadges];
            }
        }

        progress.lastUpdated = new Date();

        // 2. Save State
        saveJsonData(progress);

        res.json(progress);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Notification endpoint (simplified)
app.get('/api/notifications', async (req, res) => {
    res.json({ alert: false });
});

// --- PROFILES & PROXY ---

// Update Profile Handles
app.post('/api/profiles/update', async (req, res) => {
    try {
        const { github, leetcode, codechef, gfg, hackerrank } = req.body;
        let progress = getJsonData();

        if (!progress) {
            progress = {
                userId: 'user_default',
                completedDays: [],
                streak: 0,
                maxStreak: 0,
                badges: [],
                history: [],
                lastActivityDate: null
            };
        }

        // Initialize externalProfiles if needed
        if (!progress.externalProfiles) progress.externalProfiles = {};

        if (github !== undefined) progress.externalProfiles.github = github;
        if (leetcode !== undefined) progress.externalProfiles.leetcode = leetcode;
        if (codechef !== undefined) progress.externalProfiles.codechef = codechef;
        if (gfg !== undefined) progress.externalProfiles.gfg = gfg;
        if (hackerrank !== undefined) progress.externalProfiles.hackerrank = hackerrank;

        saveJsonData(progress);
        res.json(progress);
    } catch (err) {
        console.error("Profile Update Error:", err);
        res.status(500).json({ error: "Failed to update profile" });
    }
});

// GitHub Proxy
app.get('/api/proxy/github/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const axios = require('axios');
        const response = await axios.get(`https://api.github.com/users/${username}`);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch GitHub data" });
    }
});

// LeetCode Proxy
app.get('/api/proxy/leetcode/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const axios = require('axios');
        const response = await axios.get(`https://leetcode-stats-api.herokuapp.com/${username}`);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch LeetCode data" });
    }
});

// CodeChef Proxy
app.get('/api/proxy/codechef/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const axios = require('axios');
        // Unofficial CodeChef API
        const response = await axios.get(`https://codechef-api.vercel.app/${username}`);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch CodeChef data" });
    }
});

// GeeksforGeeks Proxy
app.get('/api/proxy/gfg/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const axios = require('axios');
        const response = await axios.get(`https://geeks-for-geeks-stats-api-nyx.vercel.app/?userName=${username}`);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch GFG data" });
    }
});

// HackerRank Proxy
app.get('/api/proxy/hackerrank/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const axios = require('axios');
        const response = await axios.get(`https://hackerrank-badges.herokuapp.com/api/${username}`);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch HackerRank data" });
    }
});


// --- NEWS & MOTIVATION ---

// Motivation API
app.get('/api/motivation', (req, res) => {
    const quotes = [
        "Code is like humor. When you have to explain it, it’s bad. – Cory House",
        "Fix the cause, not the symptom. – Steve Maguire",
        "Optimism is an occupational hazard of programming: feedback is the treatment. – Kent Beck",
        "Simplicity is the soul of efficiency. – Austin Freeman",
        "Before software can be reusable it first has to be usable. – Ralph Johnson",
        "Make it work, make it right, make it fast. – Kent Beck",
        "Talk is cheap. Show me the code. – Linus Torvalds"
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    res.json({ quote: randomQuote });
});

// Tech News API (RSS)
app.get('/api/news', async (req, res) => {
    try {
        const Parser = require('rss-parser');
        const parser = new Parser();
        const feed = await parser.parseURL('https://feeds.feedburner.com/TheHackersNews');

        const news = feed.items.slice(0, 5).map(item => ({
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            source: "The Hacker News"
        }));

        res.json(news);
    } catch (err) {
        console.error("News Error:", err);
        res.status(500).json({ error: "Failed to fetch news" });
    }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
