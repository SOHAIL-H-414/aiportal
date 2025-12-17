import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';

const CodePlayground = () => {
    const [code, setCode] = useState("# Write your Python code here\nprint('Hello from AI Portal!')\nimport numpy as np\narr = np.array([1, 2, 3])\nprint(arr * 2)");
    const [output, setOutput] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [pyodide, setPyodide] = useState(null);

    useEffect(() => {
        const loadPyodide = async () => {
            try {
                if (window.loadPyodide) {
                    const py = await window.loadPyodide();
                    await py.loadPackage("numpy");
                    setPyodide(py);
                }
            } catch (err) {
                console.error("Pyodide Load Error", err);
            }
        };
        loadPyodide();
    }, []);

    const runCode = async () => {
        if (!pyodide) return;
        setIsRunning(true);
        setOutput([]);

        try {
            // Catch stdout
            pyodide.setStdout({ batched: (msg) => setOutput(prev => [...prev, msg]) });
            await pyodide.runPythonAsync(code);
        } catch (err) {
            setOutput(prev => [...prev, `Error: ${err.message}`]);
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <h3 style={{ margin: 0, fontSize: '1rem', color: '#00d2ff' }}>🐍 Python Playground</h3>
                <button
                    onClick={runCode}
                    disabled={!pyodide || isRunning}
                    className="glass-button"
                    style={{ padding: '5px 15px', background: isRunning ? 'rgba(255,255,0,0.2)' : 'rgba(0,255,100,0.2)' }}
                >
                    {!pyodide ? 'Loading Pyodide...' : isRunning ? 'Running...' : '▶ Run'}
                </button>
            </div>

            <div style={{ flex: 1, position: 'relative' }}>
                <Editor
                    height="100%"
                    defaultLanguage="python"
                    value={code}
                    onChange={(val) => setCode(val)}
                    theme="vs-dark"
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        scrollBeyondLastLine: false,
                        backgroundColor: 'transparent'
                    }}
                />
            </div>

            <div style={{ height: '150px', background: 'rgba(0,0,0,0.3)', padding: '10px', overflowY: 'auto', borderTop: '1px solid rgba(255,255,255,0.1)', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                <div style={{ color: '#aaa', fontSize: '0.8rem', marginBottom: '5px' }}>OUTPUT &gt;_</div>
                {output.map((line, i) => (
                    <div key={i} style={{ color: line.startsWith('Error') ? '#ff5555' : '#ddd' }}>{line}</div>
                ))}
                {output.length === 0 && <div style={{ color: '#555' }}>Ready to execute...</div>}
            </div>
        </div>
    );
};

export default CodePlayground;
