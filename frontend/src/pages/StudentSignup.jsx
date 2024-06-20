import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const StudentSignup = () => {
    const [rollNumber, setRollNumber] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/user/studentsignup', {
                rollnumber: rollNumber, // Ensure this matches the backend field name
                password
            });
            console.log(response.data);
            alert('User created successfully!');
            navigate('/studentlogin'); // Navigate to the login page after successful signup
        } catch (error) {
            console.error(error);
            alert('An error occurred while creating the user');
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign Up as a Student
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="rollNumber" className="block text-sm font-medium leading-6 text-gray-900">
                            Roll Number
                        </label>
                        <div className="mt-2">
                            <input
                                id="rollNumber"
                                name="rollNumber"
                                type="number" // Changed to number
                                autoComplete="rollNumber"
                                required
                                value={rollNumber}
                                onChange={(e) => setRollNumber(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <div className='flex gap-2 mt-5'>
                    <p> Have an account?</p>
                    <Link to={'/studentlogin'}>
                        <span className='text-blue-700'>Sign Up</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default StudentSignup;
