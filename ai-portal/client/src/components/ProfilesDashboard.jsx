import React from 'react';
import ExternalStatsWidget from './ExternalStatsWidget';

const ProfilesDashboard = ({ profiles, onOpenSettings }) => {
    return (
        <div className="animate-fade-in" style={{ height: '100%', overflowY: 'auto', padding: '10px' }}>
            <div style={{ marginBottom: '30px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', background: 'linear-gradient(to right, #00d2ff, #3a7bd5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Your Coding Journey
                </h2>
                <p style={{ color: '#aaa', fontSize: '1.1rem' }}>
                    Track your progress across the coding universe.
                </p>
            </div>

            <div className="glass-panel" style={{ padding: '30px', marginBottom: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Platform Statistics</h3>
                    <button onClick={onOpenSettings} className="glass-button active" style={{ padding: '10px 20px' }}>
                        ⚙️ Manage Connections
                    </button>
                </div>

                {/* 
                   We reuse the widget but it will expand to fill the container.
                   The widget's internal grid is 'repeat(auto-fit, minmax(140px, 1fr))'.
                   In a wide container, this will create nice large rows.
                   To make it look even better in full width, we might want slightly larger cards.
                   But for now, standard rendering is sufficient.
                */}
                <ExternalStatsWidget profiles={profiles} onOpenSettings={onOpenSettings} />
            </div>

            <div className="glass-panel" style={{ padding: '30px', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
                <h3 style={{ marginBottom: '15px' }}>Why Track Elsewhere?</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', textAlign: 'left' }}>
                    <div style={{ padding: '15px', borderLeft: '3px solid #ffa116' }}>
                        <h4 style={{ margin: '0 0 5px 0' }}>LeetCode</h4>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#888' }}>Master Data Structures & Algorithms. Essential for technical interviews.</p>
                    </div>
                    <div style={{ padding: '15px', borderLeft: '3px solid #333' }}>
                        <h4 style={{ margin: '0 0 5px 0' }}>GitHub</h4>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#888' }}>Build real-world projects. Showcases your ability to write and manage code.</p>
                    </div>
                    <div style={{ padding: '15px', borderLeft: '3px solid #2E7D32' }}>
                        <h4 style={{ margin: '0 0 5px 0' }}>GeeksforGeeks</h4>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#888' }}>CS Fundamentals foundation. Great for learning concepts.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilesDashboard;
