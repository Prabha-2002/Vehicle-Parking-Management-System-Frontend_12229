import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const UserDashboard = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const userId = sessionStorage.getItem('id');

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/userlogin');
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="font-sans">
            <nav className="bg-blue-900 text-white p-4 fixed w-full z-20 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-2xl font-bold">Car Parking Management System</div>
                    <div className="flex items-center space-x-4">
                        <Link
                            to="/extended-payment"
                            state={{ userId }}
                            className="hover:text-blue-300 transition duration-300"
                        >
                            Extended Payment
                        </Link>
                        <Link to="/book-slot" className="hover:text-blue-300 transition duration-300">Book a Slot</Link>
                        <Link to="/profile" className="hover:text-blue-300 transition duration-300">Profile</Link>
                        <Link
                            to="/userbookinghistory"
                            state={{ userId }}
                            className="hover:text-blue-300 transition duration-300"
                        >
                            User Booking History
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <main className="pt-20">
                <Carousel
                    autoPlay
                    infiniteLoop
                    showThumbs={false}
                    interval={3000}
                    className="my-4 mx-auto max-w-full"
                >
                    <div>
                        <img src="https://img.playbuzz.com/image/upload/ar_1.8867924528301887,c_crop/v1562241889/ilwdgiihjfvhorlxcwwg.jpg" alt="Parking Lot 1" className="object-cover w-full h-80 md:h-96" />
                    </div>
                    <div>
                        <img src="https://www.thewizfair.com/images/slider/facilites-slider/car-parking003.png" alt="Parking Lot 2" className="object-cover w-full h-80 md:h-96" />
                    </div>
                </Carousel>

                <section className="py-16 bg-gradient-to-r from-blue-50 to-gray-100">
                    <div className="container mx-auto px-6 md:px-12">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-extrabold text-gray-800 mb-4">About Us</h2>
                            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                                Welcome to the Car Parking Management System! Our mission is to provide an efficient and user-friendly solution for managing parking slots in shopping malls. We aim to eliminate the stress of finding parking by offering a seamless booking experience with real-time updates.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center">
                            <div className="bg-white p-8 rounded-lg shadow-lg">
                                <div className="mb-6">
                                    <svg className="w-12 h-12 mx-auto text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2L2 7v11l10 5 10-5V7l-10-5zm0 2.57L18.43 9 12 11.43 5.57 9 12 4.57zM4 10.43L12 13.57 20 10.43V16L12 19.57 4 16v-5.57z"/>
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-800 mb-2">Our Vision</h3>
                                <p className="text-gray-600">
                                    We strive to revolutionize the parking experience by offering a streamlined and innovative platform. Our goal is to simplify the process of finding and managing parking spots, making it easier for everyone to enjoy their time at shopping malls and other busy locations.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-lg shadow-lg">
                                <div className="mb-6">
                                    <svg className="w-12 h-12 mx-auto text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2L2 7v11l10 5 10-5V7l-10-5zm0 2.57L18.43 9 12 11.43 5.57 9 12 4.57zM4 10.43L12 13.57 20 10.43V16L12 19.57 4 16v-5.57z"/>
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-800 mb-2">Our Mission</h3>
                                <p className="text-gray-600">
                                    Our mission is to enhance the convenience of parking through a reliable and easy-to-use system. By providing real-time updates and a user-friendly interface, we ensure that our users can manage their parking needs efficiently and effectively.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="my-8 mx-auto max-w-4xl p-4">
                    <h2 className="text-3xl font-bold mb-4 text-center">User Reviews</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="relative bg-white p-6 rounded-lg shadow-lg">
                            <div className="absolute inset-0 flex items-center justify-center p-4 opacity-0 hover:opacity-100 bg-gray-900 bg-opacity-50 transition-opacity duration-300 rounded-lg">
                                <p className="text-white text-lg font-semibold">John Doe</p>
                            </div>
                            <p className="text-gray-700">
                                “The parking management system is fantastic! It’s incredibly easy to use, and I love the real-time updates on space availability.”
                            </p>
                            <div className="flex mt-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"/>
                                    </svg>
                                ))}
                            </div>
                        </div>

                        <div className="relative bg-white p-6 rounded-lg shadow-lg">
                            <div className="absolute inset-0 flex items-center justify-center p-4 opacity-0 hover:opacity-100 bg-gray-900 bg-opacity-50 transition-opacity duration-300 rounded-lg">
                                <p className="text-white text-lg font-semibold">Jane Smith</p>
                            </div>
                            <p className="text-gray-700">
                                “I had a great experience using this system. The booking process was smooth, and the dashboard is very intuitive.”
                            </p>
                            <div className="flex mt-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"/>
                                    </svg>
                                ))}
                            </div>
                        </div>

                        <div className="relative bg-white p-6 rounded-lg shadow-lg">
                            <div className="absolute inset-0 flex items-center justify-center p-4 opacity-0 hover:opacity-100 bg-gray-900 bg-opacity-50 transition-opacity duration-300 rounded-lg">
                                <p className="text-white text-lg font-semibold">Alice Johnson</p>
                            </div>
                            <p className="text-gray-700">
                                “A very helpful tool for managing parking spots. The system is reliable, and I highly recommend it!”
                            </p>
                            <div className="flex mt-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"/>
                                    </svg>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default UserDashboard;
