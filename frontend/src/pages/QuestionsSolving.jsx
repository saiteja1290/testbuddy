import React, { useState } from 'react';
import axios from 'axios';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/python/python';
import 'codemirror/mode/xml/xml';

const QuestionSolving = () => {
  const [roomID, setRoomID] = useState('');
  const [questions, setQuestions] = useState([]);
  const [userTestCases, setUserTestCases] = useState({});
  const [code, setCode] = useState({});
  const [output, setOutput] = useState({});
  const [lang, setLang] = useState('Python');

  const handleFetchQuestions = () => {
    axios.get(`http://localhost:8080/api/user/questions/${roomID}`)
      .then(response => {
        setQuestions(response.data.questions);
      })
      .catch(error => console.error('Error fetching questions:', error));
  };

  const handleRunCode = (questionId) => {
  const requestData = {
    code: code[questionId] || '',
    lang,
    input: userTestCases[questionId] || questions.find(q => q._id === questionId).testCases[0].input || '',
    action: 'run',
  };

  axios.post('http://localhost:8080/compilecode', requestData)
    .then(response => {
      setOutput(prevOutput => ({
        ...prevOutput,
        [questionId]: response.data.output || `Error: ${response.data.error}`
      }));
    })
    .catch(error => setOutput(prevOutput => ({
      ...prevOutput,
      [questionId]: `Error: ${error.message}`
    })));
};

const handleSubmitCode = (questionId) => {
  const requestData = {
    code: code[questionId] || '',
    lang,
    testCases: questions.find(q => q._id === questionId).testCases,
    action: 'submit',
  };

  axios.post('http://localhost:8080/compilecode', requestData)
    .then(response => {
      const results = response.data.results;
      const formattedOutput = results.map((result, index) =>
        `Test Case ${index + 1}: ${result.passed ? 'Passed' : 'Failed'}\n`
      ).join('');
      setOutput(prevOutput => ({
        ...prevOutput,
        [questionId]: formattedOutput
      }));
    })
    .catch(error => setOutput(prevOutput => ({
      ...prevOutput,
      [questionId]: `Error: ${error.message}`
    })));
};


  return (
    <div className="min-h-screen flex flex-col bg-gray-100 p-8">
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomID}
          onChange={(e) => setRoomID(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleFetchQuestions}
          className="ml-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Fetch Questions
        </button>
      </div>

      {questions.map((question, index) => (
        <div key={question._id} className="mb-8 p-4 bg-white shadow-lg rounded">
          <h2 className="text-xl font-semibold text-blue-700">{question.questionText}</h2>
          <p className="text-gray-900 mb-4">{question.description}</p>
          <h3 className="text-lg font-semibold text-blue-700">Test Cases:</h3>
          {question.testCases.length > 0 && (
            <div>
              <p>Input: {question.testCases[0].input}</p>
              <p>Expected Output: {question.testCases[0].expectedOutput}</p>
            </div>
          )}

          <div className="mb-4 flex justify-between items-center">
            <div>
              <label className="block mb-2 text-blue-700">Language:</label>
              <select value={lang} onChange={(e) => setLang(e.target.value)} className="block w-full p-2 border border-gray-300 rounded">
                <option value="C">C</option>
                <option value="Java">Java</option>
                <option value="Python">Python</option>
              </select>
            </div>
          </div>

          <div className="code-mirror-wrapper mb-4" style={{ height: '300px' }}>
            <ControlledEditor
              onBeforeChange={(editor, data, value) => {
                setCode(prevCode => ({
                  ...prevCode,
                  [question._id]: value
                }));
              }}
              value={code[question._id] || ''}
              options={{
                lineNumbers: true,
                mode: lang.toLowerCase(),
                theme: 'material',
              }}
              className="code-mirror"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-blue-700">Test Cases Input:</label>
            <textarea
              value={userTestCases[question._id] || question.testCases[0]?.input || ''}
              onChange={(e) => setUserTestCases(prevTestCases => ({
                ...prevTestCases,
                [question._id]: e.target.value
              }))}
              className="block w-full p-2 border border-gray-300 rounded"
              rows="4"
            />
          </div>
          <br /><br /><br /><br /><br /><br />
          <div className="flex justify-between">
            <button
              className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
              onClick={() => handleRunCode(question._id)}
            >
              Run Code
            </button>
            <button
              className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => handleSubmitCode(question._id)}
            >
              Submit Code
            </button>
          </div>

          <div className="bg-white p-4 border border-blue-300 rounded-lg shadow-inner mt-4">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Output:</h3>
            <pre className="whitespace-pre-wrap text-gray-900 code-output">{output[question._id]}</pre>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionSolving;
