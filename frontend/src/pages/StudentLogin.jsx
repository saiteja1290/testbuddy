import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const StudentLogin = () => {
    const [rollNumber, setRollNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/user/studentlogin', {
                rollnumber: rollNumber,
                password
            });
            console.log(response.data);
            alert('Login successful!');
            // Save the token and user information in localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/studentdashboard'); // Redirect to the dashboard or another page
        } catch (error) {
            console.error(error);
            setErrorMessage('Invalid roll number or password');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen shadow-lg">
        <Card className="w-[350px]">
            <CardHeader className="justify-center">
                <CardTitle>Student Login Portal</CardTitle>
                <CardDescription>Login to enter the portal</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>     
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Roll Number</Label>
                    <Input id="rollNumber"
                        name="rollNumber"
                        type="number"
                        autoComplete="rollNumber"
                        required
                        value={rollNumber}
                        onChange={(e) => setRollNumber(e.target.value)} 
                        placeholder="Enter your Roll Number" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter the Password" 
                    />

                    </div>
                </div>
                {errorMessage && (
                    <div className="text-red-500 text-sm">
                            {errorMessage}
                    </div>
                )}

                <div className="flex  flex-col items-center mt-4">
                    <Button type="submit">Sign in</Button>
                </div>          
                </form>
            </CardContent>
            <CardFooter className="flex justify-center">
                <div className='flex gap-2 mt-0'>
                <p> Don't Have an account?</p>
                <Link to={'/studentsignup'}>
                    <span className='text-blue-700'>Sign in</span>
                </Link>
                </div>
            </CardFooter>
        </Card>
        </div>
    )
}

export default StudentLogin;
