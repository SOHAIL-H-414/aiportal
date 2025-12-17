import { useState, useEffect } from 'react';

const ExternalStatsWidget = ({ profiles, onOpenSettings }) => {
    const [ghData, setGhData] = useState(null);
    const [lcData, setLcData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!profiles) return;
            setLoading(true);

            try {
                if (profiles.github) {
                    const res = await fetch(`http://localhost:5000/api/proxy/github/${profiles.github}`);
                    const data = await res.json();
                    if (!data.error) setGhData(data);
                }

                if (profiles.leetcode) {
                    const res = await fetch(`http://localhost:5000/api/proxy/leetcode/${profiles.leetcode}`);
                    const data = await res.json();
                    if (data.status === 'success') setLcData(data);
                }
            } catch (err) {
                console.error("Failed to load external stats", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [profiles]);

    if (!profiles?.github && !profiles?.leetcode) {
        return (
            <div className="glass-panel" style={{ padding: '20px', textAlign: 'center' }}>
                <p style={{ color: '#aaa', marginBottom: '15px' }}>Track your growth across platforms.</p>
                <button onClick={onOpenSettings} className="glass-button active">
                    + Connect Accounts
                </button>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
            {/* GitHub Card */}
            {profiles.github && (
                <div className="glass-panel animate-fade-in" style={{ flex: 1, padding: '20px', position: 'relative' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                        <img src={ghData?.avatar_url || "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"}
                            alt="GH" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                        <div>
                            <h4 style={{ margin: 0 }}>GitHub</h4>
                            <a href={`https://github.com/${profiles.github}`} target="_blank" rel="noreferrer"
                                style={{ fontSize: '0.8rem', color: '#00d2ff', textDecoration: 'none' }}>@{profiles.github}</a>
                        </div>
                    </div>
                    {ghData ? (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{ghData.public_repos}</div>
                                <div style={{ fontSize: '0.7rem', color: '#aaa' }}>REPOS</div>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{ghData.followers}</div>
                                <div style={{ fontSize: '0.7rem', color: '#aaa' }}>FOLLOWERS</div>
                            </div>
                        </div>
                    ) : (
                        <div className="typing"><span>.</span><span>.</span><span>.</span></div>
                    )}
                </div>
            )}

            {/* LeetCode Card */}
            {profiles.leetcode && (
                <div className="glass-panel animate-fade-in" style={{ flex: 1, padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                        <div style={{ width: '40px', height: '40px', background: '#ffa116', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'black' }}>LC</div>
                        <div>
                            <h4 style={{ margin: 0 }}>LeetCode</h4>
                            <a href={`https://leetcode.com/${profiles.leetcode}`} target="_blank" rel="noreferrer"
                                style={{ fontSize: '0.8rem', color: '#00d2ff', textDecoration: 'none' }}>@{profiles.leetcode}</a>
                        </div>
                    </div>
                    {lcData ? (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '5px' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ color: '#00b8a3', fontWeight: 'bold' }}>{lcData.easySolved}</div>
                                <div style={{ fontSize: '0.6rem', color: '#aaa' }}>Easy</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ color: '#ffc01e', fontWeight: 'bold' }}>{lcData.mediumSolved}</div>
                                <div style={{ fontSize: '0.6rem', color: '#aaa' }}>Med</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ color: '#ff375f', fontWeight: 'bold' }}>{lcData.hardSolved}</div>
                                <div style={{ fontSize: '0.6rem', color: '#aaa' }}>Hard</div>
                            </div>
                            <div style={{ gridColumn: '1 / -1', marginTop: '10px', textAlign: 'center', background: 'rgba(255,255,255,0.05)', padding: '5px', borderRadius: '4px' }}>
                                <span style={{ fontSize: '0.9rem' }}>Total: <b>{lcData.totalSolved}</b></span>
                                <span style={{ margin: '0 5px', color: '#555' }}>|</span>
                                <span style={{ fontSize: '0.8rem', color: '#ccc' }}>Rank: {lcData.ranking}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="typing"><span>.</span><span>.</span><span>.</span></div>
                    )}
                </div>
            )}

            <button onClick={onOpenSettings} className="glass-button" style={{ height: 'fit-content' }}>
                ⚙️
            </button>
        </div>
    );
};

export default ExternalStatsWidget;
