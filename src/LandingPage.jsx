import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    return (
        <div className="bg-gray-100 min-h-screen relative">
            <Link
                to="/"
                className="absolute top-4 left-4 text-blue-900 font-bold text-xl flex items-center space-x-2"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                <span>Back</span>
            </Link>

            <nav className="bg-blue-900 text-white p-4 fixed w-full z-20 top-0 left-0 shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-2xl font-bold">Car Parking Management System</div>
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="#about-us" className="text-blue-300 transition duration-300">About Us</Link>
                        <Link to="gallery" className="text-blue-300 transition duration-300">Choose slot</Link>

                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="bg-blue-700 text-white px-4 py-2 rounded-md"
                            >
                                Login
                            </button>
                            <div
                                className={`${
                                    isDropdownOpen ? 'block' : 'hidden'
                                } absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg z-30 w-40`}
                            >
                                <Link
                                    to="/userdashboard"
                                    className="block px-4 py-2 transition duration-300"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    Guest View
                                </Link>
                                <Link
                                    to="/adminlogin"
                                    className="block px-4 py-2 transition duration-300"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    Admin Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="relative mt-16">
                <div className="carousel-item relative w-full h-80 bg-gray-300">
                    <img
                        src="https://images.summitmedia-digital.com/topgear/images/2019/01/11/estancia-parking-main-1547194312.jpg"
                        alt="Carousel"
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                </div>
            </div>

            <section
                id="about-us"
                className="py-16 bg-blue-50 text-center mt-4"
            >
                <div className="container mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
                        <h2 className="text-4xl font-extrabold text-blue-900 mb-6">About Us</h2>
                        <p className="text-lg text-blue-700 leading-relaxed">
                            The Car Parking Management System, we strive to revolutionize parking solutions.
                            Our platform provides an intuitive interface for managing parking reservations,
                            tracking vehicle details, and ensuring a seamless parking experience. 
                            Whether you are a driver seeking convenience or an admin managing multiple
                            parking spaces, our system is designed with you in mind. We are dedicated
                            to improving the efficiency and ease of parking management through innovative
                            technology.
                        </p>
                    </div>
                </div>
            </section>
            <footer className="bg-blue-900 text-white py-6 mt-8">
                <div className="container mx-auto text-center">
                    <p className="mb-4">Follow us on social media:</p>
                    <div className="flex justify-center space-x-6">
                        <a href="#" className="text-blue-300 transition duration-300">Facebook</a>
                        <a href="#" className="text-blue-300 transition duration-300">Twitter</a>
                        <a href="#" className="text-blue-300 transition duration-300">Instagram</a>
                        <a href="#" className="text-blue-300 transition duration-300">LinkedIn</a>
                    </div>
                    <p className="text-sm mt-4">&copy; {new Date().getFullYear()} Vehicle Parking Management. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
