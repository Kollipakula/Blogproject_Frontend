import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate,Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/login', {
                email,
                password,
            });

            const { token } = response.data;
            localStorage.setItem('token', token);

            console.log('Login successful');
            setEmail('');
            setPassword('');
            setErrorMessage('');

            navigate('/dashboard');
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data);
            } else {
                console.error('Error logging in:', error.message);
                setErrorMessage('An error occurred. Please try again.');
            }
        }
    }

    return (
        <div className="bg-gradient-to-r from-violet-200 to-pink-200 min-h-screen">
        <nav className="bg-gradient-to-r from-violet-200 to-pink-200 shadow-md">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative grid grid-cols-3 gap-4 items-center h-16">
                        {/* Logo */}
                        <div className="col-span-1">
                            <span className="text-lg font-bold text-gray-800">Blog Website</span>
                        </div>
                        {/* Empty Center Placeholder */}
                        <div className="col-span-1"></div>
                        {/* Navigation Links */}
                        <div className="col-span-1 flex justify-end space-x-4">
                            <Link to="/" className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                            <Link to="/login" className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                            <Link to="/register" className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Sign Up</Link>
                        </div>
                    </div>
                </div>
            </nav>
        <div className="centered-form">
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type='email'
                            placeholder='Enter your email'
                            className='form-control'
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type='password'
                            placeholder='Enter your password'
                            className='form-control'
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <div className="button-container">
                        <button type="submit" className='button'>Login</button>
                    </div>
                </form>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
        </div>
        </div>
    )
}

export default Login;
