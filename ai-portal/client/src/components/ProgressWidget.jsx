import React from 'react';

const ProgressWidget = ({ completedDays, totalDays }) => {
    const percentage = Math.round((completedDays.length / totalDays) * 100) || 0;

    return (
        <div className="glass-panel p-4 animate-fade-in" style={{ marginBottom: '20px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1rem', color: '#00d2ff', marginBottom: '10px' }}>Course Progress</h3>

            {/* Progress Bar Container */}
            <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', overflow: 'hidden', marginBottom: '10px' }}>
                <div
                    style={{
                        width: `${percentage}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #00d2ff, #3a7bd5)',
                        transition: 'width 0.5s ease-out'
                    }}
                />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#ccc' }}>
                <span>{percentage}% Complete</span>
                <span>{completedDays.length} / {totalDays} Days</span>
            </div>
        </div>
    );
};

export default ProgressWidget;
