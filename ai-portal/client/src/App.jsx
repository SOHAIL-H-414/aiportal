import React, { useState, useEffect } from 'react';
import './index.css'; // Global styles
import { curriculumData } from './data/curriculum';
import CalendarWidget from './components/CalendarWidget';
import NotificationManager from './components/NotificationManager';
import CodePlayground from './components/CodePlayground';
import ProgressWidget from './components/ProgressWidget';
import GamificationPanel from './components/GamificationPanel';
import Chatbot from './components/Chatbot';
import ExternalStatsWidget from './components/ExternalStatsWidget';
import ProfileSettings from './components/ProfileSettings';
import MotivationWidget from './components/MotivationWidget';
import NewsWidget from './components/NewsWidget';
import ProfilesDashboard from './components/ProfilesDashboard';

function App() {
  const [progressData, setProgressData] = useState(null); // Full progress object
  const [completedDays, setCompletedDays] = useState([]);
  const [activeWeek, setActiveWeek] = useState("Week 1");
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [activeTab, setActiveTab] = useState('curriculum'); // 'curriculum' | 'profiles'

  // Fetch initial progress
  useEffect(() => {
    fetch('http://localhost:5000/api/progress')
      .then(res => res.json())
      .then(data => {
        setCompletedDays(data.completedDays || []);
        setProgressData(data);
      })
      .catch(err => console.error("API Error", err));
  }, []);

  // Calculate Total Days
  const totalDays = Object.values(curriculumData).reduce((acc, week) => acc + week.days.length, 0);

  const toggleDay = async (dayId) => {
    try {
      const res = await fetch('http://localhost:5000/api/progress/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dayId })
      });
      const data = await res.json();

      if (data.error) {
        alert("Server Error: " + data.error);
        return;
      }

      setCompletedDays(data.completedDays || []);
      setProgressData(data); // Update full data (streaks/badges)
    } catch (err) {
      console.error("Toggle Error", err);
    }
  };

  const updateProfiles = async (profiles) => {
    try {
      const res = await fetch('http://localhost:5000/api/profiles/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profiles)
      });
      const data = await res.json();
      setProgressData(data);
    } catch (err) {
      console.error("Profile Update Error", err);
      throw err;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <NotificationManager />
      <Chatbot />

      {showProfileSettings && (
        <ProfileSettings
          profiles={progressData?.externalProfiles}
          onUpdate={updateProfiles}
          onClose={() => setShowProfileSettings(false)}
        />
      )}

      {/* Sidebar */}
      <aside className="glass-panel slide-right" style={{ width: '360px', margin: '20px', padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <h1 className="animate-float" style={{ background: 'linear-gradient(to right, #00d2ff, #3a7bd5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '2rem', marginBottom: '1rem', textAlign: 'center' }}>
          AI Portal
        </h1>

        <MotivationWidget />

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`glass-button ${activeTab === 'curriculum' ? 'active' : ''}`}
            style={{ flex: 1, justifyContent: 'center' }}
          >
            📚 Learn
          </button>
          <button
            onClick={() => setActiveTab('profiles')}
            className={`glass-button ${activeTab === 'profiles' ? 'active' : ''}`}
            style={{ flex: 1, justifyContent: 'center' }}
          >
            🚀 Profiles
          </button>
        </div>

        {/* Sidebar Content based on Tab */}
        {activeTab === 'curriculum' ? (
          <div className="animate-fade-in" style={{ flex: 1, overflowY: 'auto' }}>
            <ProgressWidget completedDays={completedDays} totalDays={totalDays} />
            <GamificationPanel progress={progressData} />

            <div style={{ marginTop: '20px', fontSize: '0.9rem', color: '#888', marginBottom: '10px' }}>CURRICULUM</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {Object.keys(curriculumData).map(weekKey => (
                <button
                  key={weekKey}
                  onClick={() => setActiveWeek(weekKey)}
                  className="glass-button"
                  style={{
                    textAlign: 'left',
                    background: activeWeek === weekKey ? 'rgba(0, 210, 255, 0.2)' : 'transparent',
                    borderColor: activeWeek === weekKey ? 'var(--accent)' : 'transparent'
                  }}
                >
                  <div style={{ fontSize: '0.8rem', color: '#aaa' }}>{weekKey}</div>
                  <div style={{ fontWeight: 'bold' }}>{curriculumData[weekKey].title.substring(0, 25)}...</div>
                </button>
              ))}
            </div>

            <div style={{ marginTop: '40px' }}>
              <CalendarWidget completedDays={completedDays} />
            </div>
          </div>
        ) : (
          <div className="animate-fade-in" style={{ flex: 1, overflowY: 'auto' }}>
            <div className="glass-panel" style={{ padding: '15px', marginBottom: '15px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '5px' }}>🌍</div>
              <div style={{ fontWeight: 'bold', color: '#fff' }}>Global Stats</div>
              <div style={{ fontSize: '0.8rem', color: '#aaa' }}>Connect your accounts on the main dashboard to track them here.</div>
            </div>

            <NewsWidget />
          </div>
        )}

      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '20px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

        {activeTab === 'curriculum' ? (
          <>
            {/* Header */}
            <header className="glass-panel p-8 animate-fade-in" style={{ padding: '20px', marginBottom: '20px', flexShrink: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '1.8rem', margin: 0 }}>{activeWeek}</h2>
                  <p style={{ fontSize: '1rem', color: '#ccc', margin: 0 }}>{curriculumData[activeWeek].title}</p>
                </div>
                <div className="glass-panel" style={{ padding: '5px 15px', fontSize: '0.8rem', color: '#aaa' }}>
                  MERN Stack • Full Stack Development
                </div>
              </div>
            </header>

            {/* Split View */}
            <div style={{ display: 'flex', gap: '20px', flex: 1, overflow: 'hidden' }}>

              {/* Left: Curriculum List */}
              <div style={{ flex: 1, overflowY: 'auto', paddingRight: '5px' }}>
                <div style={{ display: 'grid', gap: '20px' }}>
                  {curriculumData[activeWeek].days.map((dayItem) => {
                    const dayId = `${activeWeek}-Day ${dayItem.day}`;
                    const isDone = completedDays.includes(dayId);

                    return (
                      <div key={dayId} className="glass-panel animate-fade-in" style={{ padding: '20px', position: 'relative' }}>
                        {isDone && <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--accent)', padding: '5px 10px', fontSize: '0.8rem', borderBottomLeftRadius: '10px', fontWeight: 'bold' }}>COMPLETED</div>}

                        <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginBottom: '15px' }}>
                          Day {dayItem.day}: {dayItem.topic}
                        </h3>

                        {/* Videos */}
                        <div style={{ marginBottom: '15px' }}>
                          <h4 style={{ color: '#00d2ff', fontSize: '0.9rem', marginBottom: '5px' }}>VIDEOS</h4>
                          {dayItem.videos.length > 0 ? (
                            dayItem.videos.map((vid, idx) => (
                              <a key={idx} href={vid.url} target="_blank" rel="noreferrer" style={{ display: 'block', color: 'white', textDecoration: 'none', marginBottom: '5px', fontSize: '0.9rem' }} className="hover:text-blue-300">
                                ▶ {vid.title}
                              </a>
                            ))
                          ) : <span style={{ fontSize: '0.8rem', color: '#666' }}>No videos today. Project day.</span>}
                        </div>

                        {/* Practice */}
                        <div style={{ marginBottom: '20px' }}>
                          <h4 style={{ color: '#00d2ff', fontSize: '0.9rem', marginBottom: '5px' }}>PRACTICE</h4>
                          <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '0.9rem', color: '#ddd' }}>
                            {dayItem.practice.map((task, i) => (
                              <li key={i}>{task}</li>
                            ))}
                          </ul>
                        </div>

                        <button
                          onClick={() => toggleDay(dayId)}
                          className="glass-button"
                          style={{ width: '100%', background: isDone ? 'rgba(0, 255, 100, 0.2)' : 'rgba(255,255,255,0.1)' }}
                        >
                          {isDone ? 'Mark Incomplete' : 'Mark Complete'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right: IDE Panel */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <CodePlayground />
              </div>

            </div>
          </>
        ) : (
          <ProfilesDashboard profiles={progressData?.externalProfiles} onOpenSettings={() => setShowProfileSettings(true)} />
        )}

      </main>
    </div>
  );
}

export default App;
