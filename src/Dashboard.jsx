import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userId');
        navigate('/');
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <nav className="bg-blue-900 text-white p-4 fixed w-full z-20 top-0 left-0 shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-2xl font-bold">Car Parking Management System</div>
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/bookings" className="text-blue-300">Bookings</Link>
                        <Link to="/admintracking" className="text-blue-300">Admin Tracking</Link>
                        <Link to="/total-earnings" className="text-blue-300">Total Earnings</Link>
                        <button
                            onClick={handleLogout}
                            className="bg-blue-700 text-white px-4 py-2 rounded-md"
                        >
                            Logout
                        </button>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button className="text-white">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            <main className="pt-16">
                <Carousel
                    autoPlay
                    infiniteLoop
                    showThumbs={false}
                    interval={3000}
                    className="my-4"
                >
                    <div>
                        <img src="https://img.playbuzz.com/image/upload/ar_1.8867924528301887,c_crop/v1562241889/ilwdgiihjfvhorlxcwwg.jpg" alt="Image 1" className="object-cover w-full h-96" />
                    </div>
                    <div>
                        <img src="https://www.thewizfair.com/images/slider/facilites-slider/car-parking003.png" alt="Image 2" className="object-cover w-full h-96" />
                    </div>
                </Carousel>

                <section className="bg-white p-8 mx-auto max-w-4xl mt-8 rounded-lg shadow-lg relative">
                    <div className="absolute top-[-60px] left-0 right-0 flex justify-center"></div>
                    <div className="pt-18">
                        <h2 className="text-3xl font-bold mb-4 text-center">About Us</h2>
                        <p className="text-gray-700 text-center">
                            Welcome to the Vehicle Parking Management System. Our mission is to provide an efficient and user-friendly platform for managing parking spaces in shopping malls. With real-time availability updates, seamless booking processes, and advanced features for both users and administrators, we aim to enhance your parking experience and simplify management tasks.
                        </p>
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
                                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"/></svg>
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
                                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                ))}
                            </div>
                        </div>

                        <div className="relative bg-white p-6 rounded-lg shadow-lg">
                            <div className="absolute inset-0 flex items-center justify-center p-4 opacity-0 hover:opacity-100 bg-gray-900 bg-opacity-50 transition-opacity duration-300 rounded-lg">
                                <p className="text-white text-lg font-semibold">Alice Johnson</p>
                            </div>
                            <p className="text-gray-700">
                                “A very helpful tool for managing parking spots. The system is reliable, and customer support is fantastic!”
                            </p>
                            <div className="flex mt-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-blue-900 text-white py-6 mt-8">
                <div className="container mx-auto text-center">
                    <p className="mb-4">Follow us on social media:</p>
                    <div className="flex justify-center space-x-6">
                        <a href="#" className="text-blue-300">Facebook</a>
                        <a href="#" className="text-blue-300">Twitter</a>
                        <a href="#" className="text-blue-300">Instagram</a>
                        <a href="#" className="text-blue-300">LinkedIn</a>
                    </div>
                    <p className="text-sm mt-4">&copy; {new Date().getFullYear()} Vehicle Parking Management. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;
