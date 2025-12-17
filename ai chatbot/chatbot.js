const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { StringOutputParser } = require("@langchain/core/output_parsers");
const readline = require('readline');

// Initialize the model
const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: "AIzaSyBL4ML4K3qeci6exzIt87Wle8XueOkjqhk",
    temperature: 0.7,
});

// Create prompt template
const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a helpful AI assistant."],
    ["human", "{input}"],
]);

// Create chain
const chain = prompt.pipe(model).pipe(new StringOutputParser());

// Setup readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Chatbot ready. Type 'exit' to quit.\n");

// Recursive function to handle chat loop
function askQuestion() {
    rl.question('You: ', async (userInput) => {
        if (userInput.toLowerCase() === 'exit') {
            console.log('Chatbot: Bye!');
            rl.close();
            return;
        }

        try {
            const response = await chain.invoke({
                input: userInput
            });
            console.log('Chatbot:', response);
        } catch (error) {
            console.error('Error:', error.message);
        }

        askQuestion();
    });
}

askQuestion();
