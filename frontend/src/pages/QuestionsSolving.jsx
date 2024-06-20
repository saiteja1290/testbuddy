import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/python/python';
// 'codemirror/mode/java/java' is often under 'clike' so let's use 'clike' instead.
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/xml/xml';

const QuestionSolving = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [question, setQuestion] = useState('');
  const [testCases, setTestCases] = useState([]);
  const [lang, setLang] = useState('Python');
  const [inputRadio, setInputRadio] = useState(false);

  useEffect(() => {
    // Fetch question and test cases from backend
    axios.get('http://localhost:8080/api/question')
      .then(response => {
        console.log('Response data:', response.data); // Debugging line
        setQuestion(response.data.question);
        setTestCases(response.data.testCases);
      })
      .catch(error => console.error('Error fetching question:', error));
  }, []);

  const handleRunCode = () => {
    const requestData = {
      code,
      lang,
      inputRadio: inputRadio.toString(),
    };

    axios.post('http://localhost:8080/compilecode', requestData)
      .then(response => setOutput(response.data.output))
      .catch(error => setOutput(`Error: ${error.message}`));
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Left side - Question and test cases */}
      <div className="w-1/3 bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">Question Title</h1>
        <div className="mb-6 text-gray-900">
          <p className="text-lg mb-4">{question}</p>
          <h2 className="text-xl font-semibold mb-2 text-blue-700">Test Cases:</h2>
          <ul className="list-disc list-inside">
            {testCases && testCases.map((testCase, index) => (
              <li key={index}>{testCase}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right side - Code editor and output */}
      <div className="w-2/3 bg-blue-50 p-8 shadow-lg flex flex-col">
        <div className="mb-4 flex justify-between items-center">
          <div>
            <label className="block mb-2 text-blue-700">Language:</label>
            <select value={lang} onChange={(e) => setLang(e.target.value)} className="block w-full p-2 border border-gray-300 rounded">
              <option value="C">C</option>
              <option value="Java">Java</option>
              <option value="Python">Python</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-blue-700">Compile With Input:</label>
            <input type="radio" name="inputRadio" checked={inputRadio === true} onChange={() => setInputRadio(true)} /> Yes
            <input type="radio" name="inputRadio" checked={inputRadio === false} onChange={() => setInputRadio(false)} className="ml-4" /> No
          </div>
        </div>

        <div className="code-mirror-wrapper mb-4 flex-1" style={{ height: '300px' }}>
          <ControlledEditor
            onBeforeChange={(editor, data, value) => {
              setCode(value);
            }}
            value={code}
            options={{
              lineNumbers: true,
              mode: lang.toLowerCase(),
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
