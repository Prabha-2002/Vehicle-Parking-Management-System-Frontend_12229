import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const correctUsername = 'admin';
        const correctPassword = 'Admin@123';

        if (username === correctUsername && password === correctPassword) {
            setLoginStatus('success');
            navigate('/dashboard');
        } else {
            setLoginStatus('failure');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm md:max-w-md lg:max-w-lg transform transition-transform duration-300 hover:scale-105">
                <h2 className="text-3xl font-extrabold text-blue-800 mb-6 text-center">Admin Login</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-300"
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
                            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-300"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105"
                    >
                        Login
                    </button>
                </form>

                {/* Login Status Message */}
                {loginStatus && (
                    <div
                        className={`mt-6 p-4 rounded-lg text-center ${
                            loginStatus === 'success'
                                ? 'bg-green-100 text-green-700 border border-green-300'
                                : 'bg-red-100 text-red-700 border border-red-300'
                        } transition-opacity duration-300`}
                    >
                        {loginStatus === 'success' ? (
                            <div>
                                <svg
                                    className="w-6 h-6 inline-block mb-2 text-green-600"
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
                                    className="w-6 h-6 inline-block mb-2 text-red-600"
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
            </div>
        </div>
    );
};

export default AdminLogin;
