
import React, { useState } from 'react';
import axios from 'axios';

const QuestionSetting = () => {
  const [numQuestions, setNumQuestions] = useState(0);
  const [studentQuestions, setStudentQuestions] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [roomId, setRoomId] = useState('');

  const generateQuestionForms = () => {
    const newQuestions = [];
    for (let i = 1; i <= numQuestions; i++) {
      newQuestions.push({
        questionText: '',
        testCases: [
          { input: '', expectedOutput: '' },
          { input: '', expectedOutput: '' },
          { input: '', expectedOutput: '' },
          { input: '', expectedOutput: '' },
          { input: '', expectedOutput: '' }
        ]
      });
    }
    setQuestions(newQuestions);
  };

  const handleInputChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleTestCaseChange = (questionIndex, testCaseIndex, field, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].testCases[testCaseIndex][field] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/user/questions', {
        roomId,
        numQuestions,
        studentQuestions,
        questions
      });
      console.log(response.data);
      alert('Exam created successfully');
    } catch (error) {
      console.error(error);
      alert('An error occurred while creating the exam');
    }
  };

  return (
    <div className="bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Create Questions for Room</h1>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roomId">
            Room ID
          </label>
          <input
            type="text"
            id="roomId"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Room ID..."
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numQuestions">
            Number of Questions
          </label>
          <input
            type="number"
            id="numQuestions"
            value={numQuestions}
            onChange={(e) => setNumQuestions(Number(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter number of questions..."
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="studentQuestions">
            Number of Questions per Student
          </label>
          <input
            type="number"
            id="studentQuestions"
            value={studentQuestions}
            onChange={(e) => setStudentQuestions(Number(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter number of questions per student..."
          />
        </div>
        <div className="mb-6">
          <button
            onClick={generateQuestionForms}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Generate Questions
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            {questions.map((question, questionIndex) => (
              <div key={questionIndex} className="mb-8">
                <h2 className="text-xl font-bold mb-4">Question {questionIndex + 1}</h2>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`question${questionIndex}`}>
                    Question
                  </label>
                  <textarea
                    id={`question${questionIndex}`}
                    value={question.questionText}
                    onChange={(e) => handleInputChange(questionIndex, 'questionText', e.target.value)}
                    rows="2"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder={`Enter question ${questionIndex + 1}...`}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Test Cases (5)
                  </label>
                  {question.testCases.map((testCase, testCaseIndex) => (
                    <div key={testCaseIndex} className="mb-2">
                      <label className="block text-gray-700 text-sm font-bold mb-1">
                        Test Case {testCaseIndex + 1}
                      </label>
                      <input
                        type="text"
                        value={testCase.input}
                        onChange={(e) => handleTestCaseChange(questionIndex, testCaseIndex, 'input', e.target.value)}
                        className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-1"
                        placeholder={`Input for test case ${testCaseIndex + 1}`}
                      />
                      <input
                        type="text"
                        value={testCase.expectedOutput}
                        onChange={(e) => handleTestCaseChange(questionIndex, testCaseIndex, 'expectedOutput', e.target.value)}
                        className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder={`Expected output for test case ${testCaseIndex + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Set Exam
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionSetting;
