'use client';

import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const Playground: React.FC = () => {
    const [code, setCode] = useState('// Write your JavaScript code here\n');
    const [output, setOutput] = useState('');

    const runCode = () => {
        const log = console.log;
        let logs: string[] = [];
        console.log = (...args: any[]) => {
            logs.push(args.join(' '));
        };
        try {
            // eslint-disable-next-line no-eval
            const result = eval(code);
            setOutput(logs.join('\n') + (logs.length ? '\n' : '') + (result !== undefined ? result.toString() : 'undefined'));
        } catch (error: any) {
            setOutput(error.toString());
        }
        console.log = log;
    };

    return (
        <div className="flex flex-col sm:flex-row h-screen p-4 bg-gray-900 gap-4">
            <div className="flex-1 flex flex-col h-full">
                <Editor
                    height="90vh"
                    defaultLanguage="javascript"
                    defaultValue={code}
                    theme="vs-dark"
                    onChange={(value) => setCode(value || '')}
                    options={{
                        automaticLayout: true,
                        wordWrap: 'on',
                        scrollBeyondLastLine: false,
                        minimap: { enabled: false },
                    }}
                />
                <button
                    onClick={runCode}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Run Code
                </button>
            </div>
            <div className="flex-1 bg-gray-800 text-white p-4 rounded-md h-full">
                <strong>Output:</strong>
                <pre className="whitespace-pre-wrap h-full">{output}</pre>
            </div>
        </div>
    );
};

export default Playground;
