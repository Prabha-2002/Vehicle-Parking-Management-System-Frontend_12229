import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhoneAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const userId = sessionStorage.getItem('id');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:7894/api/users/${userId}`);
                const data = await response.json();
                setUser(data);
                setFormData(data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [userId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:7894/api/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            setUser(data);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    if (!user) return <div className="text-center text-gray-600">Loading...</div>;

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
                <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>
                {isEditing ? (
                    <div>
                        <div className="mb-4 flex items-center">
                            <FaUser className="text-gray-500 mr-2" />
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Username"
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-4 flex items-center">
                            <FaEnvelope className="text-gray-500 mr-2" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-4 flex items-center">
                            <FaPhoneAlt className="text-gray-500 mr-2" />
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
                                <FaSave className="mr-2" />
                                Save
                            </button>
                            <button onClick={() => setIsEditing(false)} className="ml-4 bg-gray-400 text-white px-4 py-2 rounded-md flex items-center">
                                <FaTimes className="mr-2" />
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="mb-4 flex items-center">
                            <FaUser className="text-gray-500 mr-2" />
                            <p className="text-gray-700">{user.username}</p>
                        </div>
                        <div className="mb-4 flex items-center">
                            <FaEnvelope className="text-gray-500 mr-2" />
                            <p className="text-gray-700">{user.email}</p>
                        </div>
                        <div className="mb-4 flex items-center">
                            <FaPhoneAlt className="text-gray-500 mr-2" />
                            <p className="text-gray-700">{user.phoneNumber}</p>
                        </div>
                        <button onClick={() => setIsEditing(true)} className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center mt-4">
                            <FaEdit className="mr-2" />
                            Edit
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
