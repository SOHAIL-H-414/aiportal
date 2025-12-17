import { useState } from 'react';

const ProfileSettings = ({ profiles, onUpdate, onClose }) => {
    const [github, setGithub] = useState(profiles?.github || '');
    const [leetcode, setLeetcode] = useState(profiles?.leetcode || '');
    const [codechef, setCodechef] = useState(profiles?.codechef || '');
    const [gfg, setGfg] = useState(profiles?.gfg || '');
    const [hackerrank, setHackerrank] = useState(profiles?.hackerrank || '');
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        try {
            await onUpdate({ github, leetcode, codechef, gfg, hackerrank });
            onClose();
        } catch (error) {
            console.error(error);
            alert("Failed to save profiles");
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%', padding: '10px', borderRadius: '8px',
        background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
        color: 'white', outline: 'none', marginTop: '5px'
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000
        }}>
            <div className="glass-panel" style={{ width: '450px', padding: '30px', maxHeight: '90vh', overflowY: 'auto' }}>
                <h3 style={{ marginTop: 0, marginBottom: '20px' }}>🔗 Connect Profiles</h3>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ fontSize: '0.9rem', color: '#ccc' }}>GitHub Username</label>
                    <input type="text" value={github} onChange={(e) => setGithub(e.target.value)} style={inputStyle} placeholder="e.g. facebook" />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ fontSize: '0.9rem', color: '#ccc' }}>LeetCode Username</label>
                    <input type="text" value={leetcode} onChange={(e) => setLeetcode(e.target.value)} style={inputStyle} placeholder="e.g. leetcode_101" />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ fontSize: '0.9rem', color: '#ccc' }}>CodeChef Handle</label>
                    <input type="text" value={codechef} onChange={(e) => setCodechef(e.target.value)} style={inputStyle} placeholder="e.g. tourist" />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ fontSize: '0.9rem', color: '#ccc' }}>GeeksforGeeks Handle</label>
                    <input type="text" value={gfg} onChange={(e) => setGfg(e.target.value)} style={inputStyle} placeholder="e.g. geek123" />
                </div>

                <div style={{ marginBottom: '25px' }}>
                    <label style={{ fontSize: '0.9rem', color: '#ccc' }}>HackerRank Username</label>
                    <input type="text" value={hackerrank} onChange={(e) => setHackerrank(e.target.value)} style={inputStyle} placeholder="e.g. hacker_x" />
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    <button onClick={onClose} className="glass-button">Cancel</button>
                    <button onClick={handleSave} className="glass-button active" disabled={loading}>
                        {loading ? "Saving..." : "Save Connections"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
