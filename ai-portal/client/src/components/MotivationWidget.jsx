import { useState, useEffect } from 'react';
import API_BASE_URL from '../config';

const MotivationWidget = () => {
    const [quote, setQuote] = useState("Loading motivation...");

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/motivation`)
            .then(res => res.json())
            .then(data => setQuote(data.quote))
            .catch(() => setQuote("Keep coding, keep building."));
    }, []);


    return (
        <div className="glass-panel animate-fade-in" style={{ padding: '20px', marginBottom: '20px', background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)', borderLeft: '4px solid #00d2ff' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#00d2ff', textTransform: 'uppercase', letterSpacing: '1px' }}>Daily Focus</h4>
            <p style={{ margin: 0, fontStyle: 'italic', fontSize: '1.1rem', lineHeight: '1.5' }}>"{quote}"</p>
        </div>
    );
};

export default MotivationWidget;
