import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const BookSlot = () => {
    const navigate = useNavigate();
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [driverName, setDriverName] = useState('');
    const [driverEmail, setDriverEmail] = useState('');
    const [driverPhone, setDriverPhone] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [numberOfHours, setNumberOfHours] = useState(1);
    const [slotName, setSlotName] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const bookingDetails = JSON.parse(sessionStorage.getItem('bookingDetails'));
        if (!bookingDetails) {
            navigate('/');
            return;
        }
        setVehicleNumber(bookingDetails.vehicleNumber || '');
        setDriverName(bookingDetails.driverName || '');
        setDriverEmail(bookingDetails.driverEmail || '');
        setDriverPhone(bookingDetails.driverPhone || '');
        setStartDate(bookingDetails.date || '');
        setStartTime(bookingDetails.startTime || '');
        setEndTime(bookingDetails.endTime || '');
        setNumberOfHours(bookingDetails.numberOfHours || 1);
        setSlotName(bookingDetails.slot || '');
    }, [navigate]);

    const validateForm = () => {
        const newErrors = {};
        const vehicleNumberPattern = /^[A-Z]{2} \d{2} [A-Z]{2} \d{4}$/;

        if (!vehicleNumberPattern.test(vehicleNumber)) {
            newErrors.vehicleNumber = 'Invalid vehicle number format. Use "AB 12 CD 1234"';
        }

        if (!driverName) {
            newErrors.driverName = 'Driver name is required';
        }

        if (!driverEmail || !/\S+@\S+\.\S+/.test(driverEmail)) {
            newErrors.driverEmail = 'Invalid email address';
        }

        if (!driverPhone || !/^\d{10}$/.test(driverPhone)) {
            newErrors.driverPhone = 'Invalid phone number. It should be exactly 10 digits';
        } else if (driverPhone.length > 10) {
            newErrors.driverPhone = 'Phone number should not exceed 10 digits';
        }

        if (!startDate) {
            newErrors.startDate = 'Start date is required';
        }

        if (!startTime) {
            newErrors.startTime = 'Start time is required';
        }

        if (!endTime) {
            newErrors.endTime = 'End time is required';
        }

        if (!slotName) {
            newErrors.slotName = 'Slot name is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const bookingData = {
            user: { id: parseInt(localStorage.getItem('userId')) },
            vehicleNumber,
            driverName,
            driverEmail,
            driverPhone,
            date: startDate,
            startTime,
            endTime,
            numberOfHours,
            amount: calculateAmount(numberOfHours),
            slotName
        };

        try {
            const response = await axios.post('http://localhost:7894/api/bookings/create', bookingData);
            console.log('Booking created:', response.data);
            Swal.fire({
                title: 'Success!',
                text: 'Your booking has been successfully created.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/userbookinghistory');
            });
        } catch (error) {
            console.error('Error creating booking:', error.response?.data || error.message);
            Swal.fire({
                title: 'Error!',
                text: 'There was a problem creating your booking. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const calculateAmount = (hours) => hours * 30;

    return (
        <>
            <button
                onClick={() => navigate('/userdashboard')}
                className="absolute top-4 left-4 text-blue-600 font-bold text-lg hover:text-blue-800 focus:outline-none"
            >
                &larr; Back
            </button>

            <div className="relative max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200 mt-16">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Book a Slot</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="vehicleNumber" className="block text-gray-700 text-sm font-medium mb-2">Vehicle Number</label>
                        <input
                            type="text"
                            id="vehicleNumber"
                            value={vehicleNumber}
                            onChange={(e) => setVehicleNumber(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white"
                        />
                        {errors.vehicleNumber && <p className="text-red-600 text-sm">{errors.vehicleNumber}</p>}
                    </div>

                    <div>
                        <label htmlFor="driverName" className="block text-gray-700 text-sm font-medium mb-2">Driver Name</label>
                        <input
                            type="text"
                            id="driverName"
                            value={driverName}
                            onChange={(e) => setDriverName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white"
                        />
                        {errors.driverName && <p className="text-red-600 text-sm">{errors.driverName}</p>}
                    </div>

                    <div>
                        <label htmlFor="driverEmail" className="block text-gray-700 text-sm font-medium mb-2">Driver Email</label>
                        <input
                            type="email"
                            id="driverEmail"
                            value={driverEmail}
                            onChange={(e) => setDriverEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white"
                        />
                        {errors.driverEmail && <p className="text-red-600 text-sm">{errors.driverEmail}</p>}
                    </div>

                    <div>
                        <label htmlFor="driverPhone" className="block text-gray-700 text-sm font-medium mb-2">Driver Phone</label>
                        <input
                            type="text"
                            id="driverPhone"
                            value={driverPhone}
                            onChange={(e) => setDriverPhone(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white"
                        />
                        {errors.driverPhone && <p className="text-red-600 text-sm">{errors.driverPhone}</p>}
                    </div>

                    <div>
                        <label htmlFor="startDate" className="block text-gray-700 text-sm font-medium mb-2">Start Date</label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white"
                        />
                        {errors.startDate && <p className="text-red-600 text-sm">{errors.startDate}</p>}
                    </div>

                    <div>
                        <label htmlFor="startTime" className="block text-gray-700 text-sm font-medium mb-2">Start Time</label>
                        <input
                            type="time"
                            id="startTime"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white"
                        />
                        {errors.startTime && <p className="text-red-600 text-sm">{errors.startTime}</p>}
                    </div>

                    <div>
                        <label htmlFor="numberOfHours" className="block text-gray-700 text-sm font-medium mb-2">Number of Hours</label>
                        <select
                            id="numberOfHours"
                            value={numberOfHours}
                            onChange={(e) => setNumberOfHours(Number(e.target.value))}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white"
                        >
                            {[1, 2, 3].map((hour) => (
                                <option key={hour} value={hour}>{hour} Hour{hour > 1 ? 's' : ''}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="endTime" className="block text-gray-700 text-sm font-medium mb-2">End Time</label>
                        <input
                            type="time"
                            id="endTime"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white"
                        />
                        {errors.endTime && <p className="text-red-600 text-sm">{errors.endTime}</p>}
                    </div>

                    <div>
                        <label htmlFor="slotName" className="block text-gray-700 text-sm font-medium mb-2">Slot Name</label>
                        <input
                            type="text"
                            id="slotName"
                            value={slotName}
                            onChange={(e) => setSlotName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white"
                        />
                        {errors.slotName && <p className="text-red-600 text-sm">{errors.slotName}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Book Slot
                    </button>
                </form>
            </div>
        </>
    );
};

export default BookSlot;
