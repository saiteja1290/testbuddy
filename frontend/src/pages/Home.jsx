import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <div className="bg-gray-100 dark:bg-gray-800 min-h-screen">
                <div className="max-w-6xl m-auto text-gray-800 dark:text-gray-100 flex flex-wrap justify-center py-12">
                    <div className="w-5/6 md:w-2/4 p-6">
                        <h1 className="text-2xl md:text-4xl text-center font-bold mb-5">Welcome to TestBuddy</h1>
                        <p className="text-center mb-8">
                            TestBuddy is an online platform that allows teachers to create and manage coding questions and students to solve them.
                        </p>
                        <div className="flex justify-center mb-8">
                            <Link to='/studentsignup' className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full mx-2">
                                Student Signup
                            </Link>
                            <Link to='/adminsignup' className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full mx-2">
                                Admin Signup
                            </Link>
                        </div>
                       
                    </div>
                </div>
                <div className="bg-indigo-100 dark:bg-gray-700 py-12">
                    <div className="max-w-6xl m-auto text-gray-800 dark:text-gray-100 flex flex-wrap justify-center">
                        <div className="w-full md:w-1/2 p-6">
                            <h2 className="text-2xl md:text-3xl font-bold mb-3">Why Choose TestBuddy?</h2>
                            <ul className="list-disc list-inside">
                                <li className="mb-2">Interactive platform for learning coding</li>
                                <li className="mb-2">Comprehensive question database</li>
                                <li className="mb-2">Real-time performance analytics</li>
                                <li className="mb-2">Teacher-friendly question creation tools</li>
                            </ul>
                        </div>
                        <div className="w-full md:w-1/2 p-6">
                            <h2 className="text-2xl md:text-3xl font-bold mb-3">Get Started Today!</h2>
                            <p className="mb-4">
                                Join TestBuddy today and revolutionize the way coding is taught and learned. Whether you are a student eager to improve your coding skills or an educator looking for better tools to engage your students, TestBuddy is the platform for you.
                            </p>
                            <div className="flex justify-center">
                                <Link to='/studentsignup' className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full mx-2">
                                    Sign Up as a Student
                                </Link>
                                <Link to='/adminsignup' className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full mx-2">
                                    Sign Up as an Admin
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="bg-indigo-800 dark:bg-gray-900 text-gray-100 py-6 text-center">
                    <p>&copy; 2024 TestBuddy. All rights reserved.</p>
                </footer>
            </div>
        </>
    );
};

export default Home;
