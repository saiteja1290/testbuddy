import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleViewResults = () => {
    // Navigate to the ExamResults page with some example state data
    navigate('/StudentResult', {
      state: {
        roomId: 'exampleRoomId', // Replace with actual roomId if applicable
        rollnumber: 'exampleRollNumber' // Replace with actual rollnumber if applicable
      }
    });
  };

  const handleLeavePage = () => {
    // Implement your leave page logic here
    alert('You chose to leave the page');
    // Example of navigation to another route
    // navigate('/another-page');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
      <h1 className="text-4xl font-bold mb-8">Student Dashboard</h1>
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <p className="text-lg mb-4">Welcome to your dashboard!</p>
        <div className="flex justify-between">
            <Link
                to="/StudentResult"
                className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >View Results</Link>
          <button
            className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 ml-4"
            onClick={handleLeavePage}
          >
            Leave Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
