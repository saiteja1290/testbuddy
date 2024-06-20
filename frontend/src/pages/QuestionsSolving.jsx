import React, { useState } from 'react';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';

const QuestionSolving = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const handleRunCode = () => {
    try {
      const result = new Function(code)();
      setOutput(result === undefined ? 'undefined' : String(result));
    } catch (error) {
      setOutput(error.message);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Left side - Question and test cases */}
      <div className="w-1/2 bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">Question Title</h1>
        <div className="mb-6 text-gray-900">
          <p className="text-lg mb-4">
            Here is a sample DSA question. Write a function that takes an array
            of integers and returns the sum of all even numbers in the array.
          </p>
          <h2 className="text-xl font-semibold mb-2 text-blue-700">Test Cases:</h2>
          <ul className="list-disc list-inside">
            <li>Input: [1, 2, 3, 4, 5] - Output: 6</li>
            <li>Input: [2, 4, 6, 8, 10] - Output: 30</li>
            <li>Input: [1, 3, 5, 7] - Output: 0</li>
          </ul>
        </div>
      </div>

      {/* Right side - Code editor and output */}
      <div className="w-1/2 bg-blue-50 p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Your Code</h2>
        <div className="code-mirror-wrapper">
          <ControlledEditor
            onBeforeChange={(editor, data, value) => {
              setCode(value);
            }}
            value={code}
            options={{
              lineNumbers: true,
              mode: 'javascript',
              theme: 'material',
            }}
            className="code-mirror"
          />
        </div>
        <button
          className="w-full py-2 px-4 mt-4 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 mb-4"
          onClick={handleRunCode}
        >
          Run Code
        </button>
        <div className="bg-white p-4 border border-blue-300 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">Output:</h3>
          <pre className="whitespace-pre-wrap text-gray-900 code-output">{output}</pre>
        </div>
      </div>
    </div>
  );
};

export default QuestionSolving;
