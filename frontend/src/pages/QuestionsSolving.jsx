import React, { useState } from 'react';
import axios from 'axios';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import { useNavigate } from 'react-router-dom';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/python/python';

const QuestionSolving = () => {
  const [roomID, setRoomID] = useState('');
  const [rollnumber, setRollNumber] = useState('');
  const [questions, setQuestions] = useState([]);
  const [userTestCases, setUserTestCases] = useState({});
  const [code, setCode] = useState({});
  const [output, setOutput] = useState({});
  const [lang, setLang] = useState('Python');
  const navigate = useNavigate();

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

  const handleSubmitExam = () => {
    let totalMarks = 0;
    const results = questions.map(question => {
      const requestData = {
        code: code[question._id] || '',
        lang,
        testCases: question.testCases,
        action: 'submit',
      };

      return axios.post('http://localhost:8080/compilecode', requestData)
        .then(response => {
          const passedTestCases = response.data.results.filter(result => result.passed).length;
          const questionMarks = passedTestCases; // Each question is worth 5 marks
          totalMarks += questionMarks;
          return { questionId: question._id, passedTestCases, totalMarks: questionMarks };
        })
        .catch(error => ({ questionId: question._id, error: error.message }));
    });

    Promise.all(results)
      .then(allResults => {
        // Save results to the database with timestamp
        axios.post('http://localhost:8080/api/user/saveresults', {
          roomId: roomID,
          rollnumber: rollnumber,
          totalmarks: totalMarks,
          timestamp: new Date().toISOString(),
        })
          .then(() => {
            navigate('/exam-results', {
              state: {
                totalMarks,
                maxMarks: questions.length * 5,
                percentage: (totalMarks / (questions.length * 5)) * 100,
              }
            });
          })
          .catch(error => console.error('Error saving results:', error));
      });
  };

  return (
    <div className="min-h-screen flex flex-col bg-black p-8 text-[#FAFAFA]">
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomID}
          onChange={(e) => setRoomID(e.target.value)}
          className="p-2 border border-[#686868] rounded bg-[#27272a] text-[#FAFAFA]"
        />
        <input
          type="text"
          placeholder="Enter Roll Number"
          value={rollnumber}
          onChange={(e) => setRollNumber(e.target.value)}
          className="p-2 border border-[#686868] rounded bg-[#27272A] text-[#FAFAFA] ml-4"
        />
        <button
          onClick={handleFetchQuestions}
          className="ml-4 py-2 px-4 bg-white text-[#1E1E1E] rounded-lg hover:bg-black hover:text-white border border-white"
        >
          Fetch Questions
        </button>
      </div>

      {questions.map((question) => (
        <div key={question._id} className="mb-8 p-4 bg-[#292929] shadow-lg rounded">
          <h2 className="text-xl font-semibold text-white">{question.questionText}</h2>
          <p className="text-[#FAFAFA] mb-4">{question.description}</p>
          <h3 className="text-lg font-semibold text-white">Test Cases:</h3>
          {question.testCases.length > 0 && (
            <div>
              <p className="text-[#bcb7b7]">Input: {question.testCases[0].input}</p>
              <p className="text-[#bcb7b7]">Expected Output: {question.testCases[0].expectedOutput}</p>
            </div>
          )}

          <div className="mb-4">
            <label className="text-xl block mb-2 text-white">Language:</label>
            <select value={lang} onChange={(e) => setLang(e.target.value)} className="block w-full p-2 border border-[#686868] rounded bg-[#292929] text-[#FAFAFA]">
              <option value="C">C</option>
              <option value="Java">Java</option>
              <option value="Python">Python</option>
            </select>
          </div>

          <div className="code-mirror-wrapper mb-4" style={{ height: '600px' }}>
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
            <label className="text-xl block mb-2 text-White">Test Cases Input:</label>
            <textarea
              value={userTestCases[question._id] || question.testCases[0]?.input || ''}
              onChange={(e) => setUserTestCases(prevTestCases => ({
                ...prevTestCases,
                [question._id]: e.target.value
              }))}
              className="block w-full p-2 border border-[#686868] rounded bg-[#27272a] text-[#FAFAFA]"
              rows="4"
            />
          </div>

          <div className="flex justify-between mb-4">
            <button
              className="py-2 px-4 bg-[#10b937] text-[#1E1E1E] rounded-lg border border-[#686868] hover:bg-[#292929] hover:text-[#10B981] "
              onClick={() => handleRunCode(question._id)}
            >
              Run Code
            </button>
            <button
              className="py-2 px-4 bg-white text-[#1E1E1E] rounded-lg hover:bg-black hover:text-white border border-white"
              onClick={() => handleSubmitCode(question._id)}
            >
              Submit Code
            </button>
          </div>

          <div className="p-4 border border-[#686868] rounded bg-[#27272a] text-[#FAFAFA]">
            <h3 className="text-xl font-semibold text-white mb-2">Output:</h3>
            <pre className="whitespace-pre-wrap text-[#FAFAFA] code-output">{output[question._id]}</pre>
          </div>
        </div>
      ))}
      <button
        className="py-2 px-4 bg-white text-black rounded-lg hover:bg-black hover:text-white self-center mb-8 border border-white"
        onClick={handleSubmitExam}
      >
        Submit Exam
      </button>
    </div>
  );
};

export default QuestionSolving;
