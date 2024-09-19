import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registerStatus, setRegisterStatus] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneNumberRegex = /^[0-9]{10}$/;

        if (!username.trim()) {
            errors.username = 'Username is required.';
        }

        if (!email.trim() || !emailRegex.test(email)) {
            errors.email = 'Valid email is required.';
        }

        if (!phoneNumber.trim() || !phoneNumberRegex.test(phoneNumber)) {
            errors.phoneNumber = 'Phone number should be 10 digits.';
        }

        if (!password.trim()) {
            errors.password = 'Password is required.';
        } else {
            const passwordRegex = /^(?=.*[a-zA-Z].*[a-zA-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
            if (!passwordRegex.test(password)) {
                errors.password = 'Password must be at least 8 characters long, contain at least 2 letters, 2 numbers, and 1 symbol.';
            }
        }

        if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match.';
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            const response = await axios.post('http://localhost:7894/api/users', {
                username,
                email,
                phoneNumber,
                password
            });

            setRegisterStatus('success');
            setTimeout(() => navigate('/userlogin'), 2000);
        } catch (error) {
            setRegisterStatus('failure');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-extrabold text-blue-900 mb-6 text-center">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setFormErrors({ ...formErrors, username: '' });
                            }}
                            className={`w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.username ? 'border-red-500' : ''}`}
                            required
                        />
                        {formErrors.username && <p className="text-red-500 text-sm">{formErrors.username}</p>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setFormErrors({ ...formErrors, email: '' });
                            }}
                            className={`w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.email ? 'border-red-500' : ''}`}
                            required
                        />
                        {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2">Phone Number</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => {
                                setPhoneNumber(e.target.value);
                                setFormErrors({ ...formErrors, phoneNumber: '' });
                            }}
                            className={`w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.phoneNumber ? 'border-red-500' : ''}`}
                            required
                        />
                        {formErrors.phoneNumber && <p className="text-red-500 text-sm">{formErrors.phoneNumber}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setFormErrors({ ...formErrors, password: '' });
                            }}
                            className={`w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.password ? 'border-red-500' : ''}`}
                            required
                        />
                        {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setFormErrors({ ...formErrors, confirmPassword: '' });
                            }}
                            className={`w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.confirmPassword ? 'border-red-500' : ''}`}
                            required
                        />
                        {formErrors.confirmPassword && <p className="text-red-500 text-sm">{formErrors.confirmPassword}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-700 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Register
                    </button>
                </form>

                {registerStatus && (
                    <div
                        className={`mt-6 p-4 rounded-md text-center ${
                            registerStatus === 'success'
                                ? 'bg-green-100 text-green-700 border border-green-300'
                                : 'bg-red-100 text-red-700 border border-red-300'
                        }`}
                    >
                        {registerStatus === 'success' ? (
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
                                <p className="font-semibold">Registration Successful! Redirecting to login...</p>
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
                                <p className="font-semibold">Registration Failed. Please try again.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Register;
