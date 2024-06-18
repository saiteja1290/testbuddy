import React from 'react'
//Teacher can set questions, set exam, view results - create 3 seperate buttons
const TeacherDashboard = () => {
    const handleSetQuestions = () => {
        console.log('Set Questions button clicked');
        // Add functionality to navigate to the set questions page or open a modal
    };

    const handleSetRoom = () => {
        console.log('Set Room button clicked');
        // Add functionality to navigate to the set room page or open a modal
    };

    const handleViewResults = () => {
        console.log('View Results button clicked');
        // Add functionality to navigate to the view results page or open a modal
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Teacher Dashboard</h1>
            <div style={{ marginBottom: '10px' }}>
                <button onClick={handleSetQuestions} style={buttonStyle}>Set Questions</button>
            </div>
            <div style={{ marginBottom: '10px' }}>
                <button onClick={handleSetRoom} style={buttonStyle}>Set Room</button>
            </div>
            <div style={{ marginBottom: '10px' }}>
                <button onClick={handleViewResults} style={buttonStyle}>View Results</button>
            </div>
        </div>
    );
};

const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    margin: '5px'
};
export default TeacherDashboard