import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const predefinedSlots = [
    'A1', 'A2', 'A3', 'A4', 'A5',
    'B1', 'B2', 'B3', 'B4', 'B5'
];

const Gallery = () => {
    const [date, setDate] = useState('');
    const [availableSlots, setAvailableSlots] = useState(new Set());
    const [error, setError] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');
    const [bookingDetails, setBookingDetails] = useState({
        startTime: '09:00',
        numberOfHours: 1,
        endTime: '10:00'
    });
    const [showForm, setShowForm] = useState(false);
    const [showMessage, setShowMessage] = useState(true);
    const [slotsFetched, setSlotsFetched] = useState(false);
    const navigate = useNavigate();

    const fetchAvailableSlots = async () => {
        try {
            const response = await axios.get('http://localhost:7894/api/bookings/availableSlots', {
                params: { date }
            });
            setAvailableSlots(new Set(response.data));
            setError('');
            setShowMessage(false);
            setSlotsFetched(true);
        } catch (err) {
            setError('Error fetching available slots');
            setAvailableSlots(new Set());
            setSlotsFetched(false);
        }
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
        setSlotsFetched(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchAvailableSlots();
    };

    const handleSlotClick = (slot) => {
        if (!availableSlots.has(slot)) {
            setSelectedSlot(slot);
            setShowForm(true);
        }
    };

    const calculateEndTime = (startTime, numberOfHours) => {
        const [hours, minutes] = startTime.split(':').map(Number);
        const startDate = new Date();
        startDate.setHours(hours, minutes, 0);

        const endDate = new Date(startDate.getTime() + numberOfHours * 60 * 60 * 1000);
        const endHours = String(endDate.getHours()).padStart(2, '0');
        const endMinutes = String(endDate.getMinutes()).padStart(2, '0');

        return `${endHours}:${endMinutes}`;
    };

    const handleNumberOfHoursChange = (event) => {
        const newNumberOfHours = parseInt(event.target.value, 10);
        setBookingDetails({
            ...bookingDetails,
            numberOfHours: newNumberOfHours,
            endTime: calculateEndTime(bookingDetails.startTime, newNumberOfHours)
        });
    };

    const handleStartTimeChange = (event) => {
        const newStartTime = event.target.value;
        setBookingDetails({
            ...bookingDetails,
            startTime: newStartTime,
            endTime: calculateEndTime(newStartTime, bookingDetails.numberOfHours)
        });
    };

    const handleBookingSubmit = (event) => {
        event.preventDefault();
        sessionStorage.setItem('bookingDetails', JSON.stringify({
            date,
            slot: selectedSlot,
            ...bookingDetails
        }));
        navigate('/userlogin'); 
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
            <div className="text-center mt-8 mb-6">
                <h1 className="text-4xl font-extrabold text-gray-900">Shopping Mall Car Parking System</h1>
            </div>

            <div className="relative flex flex-col md:flex-row justify-center items-start w-full max-w-7xl mx-auto">
                <div className="w-full md:w-1/2 md:pr-8 mb-8 md:mb-0">
                    {showMessage && (
                        <div className="mb-6 p-4 bg-yellow-200 border border-yellow-400 rounded-lg text-yellow-800 text-center">
                            <p className="text-lg font-semibold">🚗 Hey! You can view the available slots by choosing the date. Please choose it.</p>
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
                        <label className="block mb-4 text-lg font-medium text-gray-700">
                            Date:
                            <input
                                type="date"
                                value={date}
                                onChange={handleDateChange}
                                required
                                min={today}
                                className="block mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 sm:text-sm w-full"
                            />
                        </label>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg focus:ring-2 focus:ring-blue-500"
                        >
                            Get Slots
                        </button>
                    </form>
                    
                    {error && <p className="text-red-600 text-center mt-4">{error}</p>}
                    
                    {slotsFetched && (
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                            {predefinedSlots.map((slot) => (
                                <button
                                    key={slot}
                                    onClick={() => handleSlotClick(slot)}
                                    disabled={availableSlots.has(slot)}
                                    className={`w-full h-12 text-white font-semibold rounded-lg shadow-md ${
                                        availableSlots.has(slot)
                                            ? 'bg-red-500 cursor-not-allowed'
                                            : 'bg-green-500'
                                    }`}
                                >
                                    {slot}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {showForm && (
                    <div className="w-full md:w-1/2 md:pl-8">
                        <form onSubmit={handleBookingSubmit} className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Booking Details</h2>
                            <label className="block mb-4 text-lg font-medium text-gray-700">
                                Date:
                                <input
                                    type="text"
                                    value={date}
                                    readOnly
                                    className="block mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 sm:text-sm w-full"
                                />
                            </label>
                            <label className="block mb-4 text-lg font-medium text-gray-700">
                                Slot Name:
                                <input
                                    type="text"
                                    value={selectedSlot}
                                    readOnly
                                    className="block mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 sm:text-sm w-full"
                                />
                            </label>
                            <label className="block mb-4 text-lg font-medium text-gray-700">
                                Start Time:
                                <input
                                    type="time"
                                    value={bookingDetails.startTime}
                                    onChange={handleStartTimeChange}
                                    className="block mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm sm:text-sm w-full"
                                />
                            </label>
                            <label className="block mb-4 text-lg font-medium text-gray-700">
                                Number of Hours:
                                <select
                                    value={bookingDetails.numberOfHours}
                                    onChange={handleNumberOfHoursChange}
                                    className="block mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm sm:text-sm w-full"
                                >
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                </select>
                            </label>
                            <label className="block mb-4 text-lg font-medium text-gray-700">
                                End Time:
                                <input
                                    type="text"
                                    value={bookingDetails.endTime}
                                    readOnly
                                    className="block mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 sm:text-sm w-full"
                                />
                            </label>
                            <button
                                type="submit"
                                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg focus:ring-2 focus:ring-green-500"
                            >
                                Book Now
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Gallery;
