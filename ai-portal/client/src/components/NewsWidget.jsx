import { useState, useEffect } from 'react';
import API_BASE_URL from '../config';

const NewsWidget = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/news`)
            .then(res => res.json())
            .then(data => {
                setNews(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);


    if (loading) return <div className="glass-panel" style={{ padding: '20px', textAlign: 'center' }}>Loading Tech News...</div>;

    return (
        <div className="glass-panel animate-fade-in" style={{ padding: '20px', height: '100%', overflowY: 'auto' }}>
            <h3 style={{ marginTop: 0, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>📰 Tech News</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {news.map((item, idx) => (
                    <a key={idx} href={item.link} target="_blank" rel="noreferrer"
                        style={{ textDecoration: 'none', color: 'inherit', display: 'block', padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', transition: 'background 0.2s' }}
                        className="news-item"
                        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                        onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                    >
                        <div style={{ fontWeight: 'bold', marginBottom: '5px', fontSize: '0.95rem' }}>{item.title}</div>
                        <div style={{ fontSize: '0.8rem', color: '#aaa', display: 'flex', justifyContent: 'space-between' }}>
                            <span>{item.source}</span>
                            <span>{new Date(item.pubDate).toLocaleDateString()}</span>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default NewsWidget;
