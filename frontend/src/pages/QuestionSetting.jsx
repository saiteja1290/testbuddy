import React, { useState } from 'react';

const QuestionSetting = () => {
    const [numQuestions, setNumQuestions] = useState(0);
    const [studentQuestions, setStudentQuestions] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [roomId, setRoomId] = useState('');

    const generateQuestionForms = () => {
        const newQuestions = [];
        for (let i = 1; i <= numQuestions; i++) {
            newQuestions.push({ questionText: '', testCases: '', answers: '' });
        }
        setQuestions(newQuestions);
    };

    const handleInputChange = (index, field, value) => {
        const newQuestions = [...questions];
        newQuestions[index][field] = value;
        setQuestions(newQuestions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit form logic here
        console.log({ roomId, questions, studentQuestions });
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
                        {questions.map((_, index) => (
                            <div key={index} className="mb-8">
                                <h2 className="text-xl font-bold mb-4">Question {index + 1}</h2>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`question${index}`}>
                                        Question
                                    </label>
                                    <textarea
                                        id={`question${index}`}
                                        value={questions[index].questionText}
                                        onChange={(e) => handleInputChange(index, 'questionText', e.target.value)}
                                        rows="2"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder={`Enter question ${index + 1}...`}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`testcases${index}`}>
                                        Test Cases
                                    </label>
                                    <textarea
                                        id={`testcases${index}`}
                                        value={questions[index].testCases}
                                        onChange={(e) => handleInputChange(index, 'testCases', e.target.value)}
                                        rows="2"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder={`Enter test cases for question ${index + 1}...`}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`answers${index}`}>
                                        Answers for Test Cases
                                    </label>
                                    <textarea
                                        id={`answers${index}`}
                                        value={questions[index].answers}
                                        onChange={(e) => handleInputChange(index, 'answers', e.target.value)}
                                        rows="2"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder={`Enter answers for question ${index + 1}...`}
                                    />
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
