import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <>
            <div className='flex space-x-3.5 justify-center items-center min-h-screen '>
                <Link to='/studentlogin'>StudentLogin</Link>
                <Link to='/studentsignup'>StudentSignup</Link>
                <Link to='/adminlogin'>AdminLogin</Link>
                <Link to='/adminsignup'>adminsignup</Link>
            </div>
            
        </>
    )
}

export default Home