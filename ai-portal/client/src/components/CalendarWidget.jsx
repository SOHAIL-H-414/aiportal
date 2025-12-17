import React from 'react';

const CalendarWidget = ({ completedDays }) => {
    // Simple visual calendar for current month (Conceptually generic)
    const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

    return (
        <div className="glass-panel p-6 w-full animate-fade-in">
            <h3 className="text-xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-bold">
                Study Streak
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
                {daysInMonth.map(day => {
                    // Mock logic: Check if "any" task from Week X Day Y matches this number physically 
                    // (In a real app, map dates to completion)
                    // Here we randomly light them up if they match any 'Day X' string in completedDays just for visual demo
                    const isComplete = completedDays.some(d => d.includes(`Day ${day}`));

                    return (
                        <div
                            key={day}
                            style={{
                                aspectRatio: '1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '8px',
                                background: isComplete
                                    ? 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)'
                                    : 'rgba(255,255,255,0.05)',
                                color: isComplete ? 'white' : '#aaa',
                                fontWeight: 'bold',
                                boxShadow: isComplete ? '0 0 10px #00d2ff' : 'none'
                            }}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>
            <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#aaa' }}>
                Red dots indicate missed days (Simulated).
            </p>
        </div>
    );
};

export default CalendarWidget;
