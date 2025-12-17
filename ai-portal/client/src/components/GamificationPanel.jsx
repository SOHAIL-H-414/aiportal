import React from 'react';

// --- ACTIVITY GRAPH ---
const ActivityGraph = ({ history }) => {
    // Logic: Count completions per day for the last 7 days
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(today);
        d.setDate(d.getDate() - (6 - i));
        return d;
    });

    const data = last7Days.map(date => {
        const count = history.filter(h => {
            const hDate = new Date(h);
            return hDate.getDate() === date.getDate() && hDate.getMonth() === date.getMonth();
        }).length;
        return { date: date.toLocaleDateString('en-US', { weekday: 'short' }), count };
    });

    const maxCount = Math.max(...data.map(d => d.count), 1); // Avoid div by 0

    return (
        <div className="glass-panel p-4" style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '0.9rem', color: '#ccc', marginBottom: '10px' }}>Activity (Last 7 Days)</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '100px', gap: '5px' }}>
                {data.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                        <div
                            style={{
                                width: '100%',
                                height: `${(item.count / maxCount) * 80}%`,
                                minHeight: item.count > 0 ? '5px' : '2px',
                                background: item.count > 0 ? 'var(--accent)' : 'rgba(255,255,255,0.1)',
                                borderRadius: '4px',
                                transition: 'all 0.3s ease'
                            }}
                        />
                        <span style={{ fontSize: '0.7rem', marginTop: '5px', color: '#888' }}>{item.date}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- BADGES WIDGET ---
const BadgesWidget = ({ badges }) => {
    const badgeDefinitions = {
        'First Step': { icon: '🦶', desc: 'Completed 1st task' },
        'High Five': { icon: '🖐️', desc: 'Completed 5 tasks' },
        'Decathlete': { icon: '🏅', desc: 'Completed 10 tasks' },
        'Hat Trick': { icon: '🧢', desc: '3 Day Streak!' },
        'Week Warrior': { icon: '🔥', desc: '7 Day Streak!' },
        'Monthly Master': { icon: '🧙‍♂️', desc: '30 Day Streak!' }
    };

    return (
        <div className="glass-panel p-4">
            <h3 style={{ fontSize: '0.9rem', color: '#ccc', marginBottom: '10px' }}>Badges</h3>
            {badges.length === 0 ? <div style={{ fontSize: '0.8rem', color: '#666', fontStyle: 'italic' }}>No badges yet. Start learning!</div> : null}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {badges.map(badgeId => (
                    <div key={badgeId} title={badgeDefinitions[badgeId]?.desc} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px' }}>
                        <div style={{ fontSize: '1.5rem' }}>{badgeDefinitions[badgeId]?.icon || '🏆'}</div>
                        <div style={{ fontSize: '0.6rem', marginTop: '5px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{badgeId}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- MAIN PANEL ---
const GamificationPanel = ({ progress }) => {
    if (!progress) return null;

    return (
        <div className="animate-fade-in" style={{ marginTop: '20px' }}>
            {/* Streak Header */}
            <div className="glass-panel" style={{ padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', background: 'linear-gradient(to right, rgba(255,81,47,0.2), rgba(221,36,118,0.2))', border: '1px solid rgba(255,81,47,0.3)' }}>
                <div>
                    <div style={{ fontSize: '0.8rem', color: '#ffcccb' }}>Current Streak</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>🔥 {progress.streak || 0} Days</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.8rem', color: '#ffcccb' }}>Max Streak</div>
                    <div style={{ fontWeight: 'bold' }}>{progress.maxStreak || 0}</div>
                </div>
            </div>

            <ActivityGraph history={progress.history || []} />
            <BadgesWidget badges={progress.badges || []} />
        </div>
    );
};

export default GamificationPanel;
