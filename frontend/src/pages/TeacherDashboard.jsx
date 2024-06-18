import React from 'react'
import { Link } from 'react-router-dom';
//Teacher can set questions, set exam, view results - create 3 seperate buttons
const TeacherDashboard = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
                <h1 className="text-3xl font-bold mb-8 text-center">Teacher Dashboard</h1>
                
                {/* Navigation Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <Link to="/QuestionSetting" className="block w-full">
                    <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Set Questions
                    </button>
                </Link>
                <button className="py-2 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
                    View Results
                </button>
                
                <button className="py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50">
                    Assignments
                </button>
            
                
            </div>
            </div>
        </div>
    )
};
export default TeacherDashboard