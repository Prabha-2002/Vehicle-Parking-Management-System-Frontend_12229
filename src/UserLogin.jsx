import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:7894/api/users/login', { username, password });
            const data = response.data;
            sessionStorage.setItem("id", data.id);
            const userdata = response.data;
            if (userdata.username) {
                setLoginStatus('success');
                localStorage.setItem('userId', userdata.id);
                navigate('/book-slot');
            } else {
                setLoginStatus('failure');
            }
        } catch (error) {
            setLoginStatus('failure');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-extrabold text-blue-900 mb-6 text-center">User Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-700 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Login
                    </button>
                </form>

                {loginStatus && (
                    <div
                        className={`mt-6 p-4 rounded-md text-center ${
                            loginStatus === 'success'
                                ? 'bg-green-100 text-green-700 border border-green-300'
                                : 'bg-red-100 text-red-700 border border-red-300'
                        }`}
                    >
                        {loginStatus === 'success' ? (
                            <div>
                                <svg
                                    className="w-6 h-6 inline-block mb-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <p className="font-semibold">Login Successful!</p>
                            </div>
                        ) : (
                            <div>
                                <svg
                                    className="w-6 h-6 inline-block mb-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                                <p className="font-semibold">Login Failed. Please try again.</p>
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-4 text-center">
                    <p className="text-gray-600">
                        New user?{' '}
                        <a href="/register" className="text-blue-700 hover:underline">
                            Register here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;
