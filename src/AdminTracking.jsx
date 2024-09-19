import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AdminTracking = () => {
    const [bookings, setBookings] = useState([]);
    const [approvalStatus, setApprovalStatus] = useState(null);
    const navigate = useNavigate();
    const [showNextButton, setShowNextButton] = useState(false);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('http://localhost:7894/api/bookings');
                console.log(response.data);
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching bookings:', error.response?.data || error.message);
            }
        };

        fetchBookings();
    }, []);

    const handleAction = async (id, action) => {
        try {
            const response = await axios.post(`http://localhost:7894/api/bookings/${id}/${action}`);
            setApprovalStatus({ id, action });

            if (response.status === 200) {
                if (action === 'approve') {
                    await Swal.fire({
                        title: 'Approved!',
                        text: 'The booking has been approved.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    setShowNextButton(true);
                } else {
                    await Swal.fire({
                        title: 'Cancelled!',
                        text: 'The booking has been cancelled.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }

                setBookings(prevBookings =>
                    prevBookings.map(booking =>
                        booking.id === id
                            ? { ...booking, status: action }
                            : booking
                    )
                );
            }
        } catch (error) {
            console.error(`Error ${action} booking:`, error.response?.data || error.message);
        }
    };

    const handleNextClick = () => {
        navigate('/bookings');
    };

    return (
        <div className="p-4">
            <h2 className="text-3xl font-extrabold mb-6 text-gray-900">Admin Tracking</h2>
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden border border-gray-300 rounded-lg shadow-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-bold uppercase">User ID</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold uppercase">Slot Name</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold uppercase">Vehicle Number</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold uppercase">Driver Name</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold uppercase">Driver Email</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold uppercase">Driver Phone</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold uppercase">Date</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold uppercase">Start Time</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold uppercase">End Time</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold uppercase">Number of Hours</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold uppercase">Amount</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {bookings.length > 0 ? (
                                    bookings.map((booking) => (
                                        booking ? (
                                            <tr key={booking.id}>
                                                <td className="px-4 py-3 text-sm font-bold text-gray-900">{booking.user?.id || 'N/A'}</td>
                                                <td className="px-4 py-3 text-sm font-bold text-gray-700 bg-white-50">{booking.slotName || 'N/A'}</td>
                                                <td className="px-4 py-3 text-sm font-bold text-gray-700 bg-white-50">{booking.vehicleNumber || 'N/A'}</td>
                                                <td className="px-4 py-3 text-sm font-bold text-gray-700 bg-white-50">{booking.driverName || 'N/A'}</td>
                                                <td className="px-4 py-3 text-sm font-bold text-gray-700 bg-white-50">{booking.driverEmail || 'N/A'}</td>
                                                <td className="px-4 py-3 text-sm font-bold text-gray-700 bg-white-50">{booking.driverPhone || 'N/A'}</td>
                                                <td className="px-4 py-3 text-sm font-bold text-gray-700 bg-white-50">{booking.date || 'N/A'}</td>
                                                <td className="px-4 py-3 text-sm font-bold text-gray-700 bg-white-50">{booking.startTime || 'N/A'}</td>
                                                <td className="px-4 py-3 text-sm font-bold text-gray-700 bg-white-50">{booking.endTime || 'N/A'}</td>
                                                <td className="px-4 py-3 text-sm font-bold text-gray-700 bg-white-50">{booking.numberOfHours || 'N/A'}</td>
                                                <td className="px-4 py-3 text-sm font-bold text-gray-700 bg-white-50">₹{booking.amount || 'N/A'}</td>
                                                <td className="px-4 py-3 text-sm font-bold font-medium flex white-x-2">
                                                    {booking.status === 'APPROVED' ? (
                                                        <span className="text-green-600 font-bold">Approved</span>
                                                    ) : booking.status === 'CANCELLED' ? (
                                                        <span className="text-red-600 font-bold">Cancelled</span>
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={() => handleAction(booking.id, 'approve')}
                                                                className="bg-green-600 text-white py-1 px-3 rounded-lg hover:bg-green-500 transition duration-300"
                                                            >
                                                                Approve
                                                            </button> &nbsp; &nbsp;
                                                            <button
                                                                onClick={() => handleAction(booking.id, 'cancel')}
                                                                className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-500 transition duration-300"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        ) : (
                                            <tr key="empty">
                                                <td colSpan="12" className="px-4 py-3 text-center text-sm font-medium text-gray-500">No data available</td>
                                            </tr>
                                        )
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="12" className="px-4 py-3 text-center text-sm font-medium text-gray-500">Loading...</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                {approvalStatus && (
                    <div className={`mt-4 p-4 rounded-lg text-center ${approvalStatus.action === 'approve' ? 'bg-green-100 border border-green-300 text-green-700' : 'bg-red-100 border border-red-300 text-red-700'}`}>
                        {approvalStatus.action === 'approve' ? (
                            <div className="flex items-center justify-center">
                                <svg
                                    className="w-6 h-6 text-green-600 inline-block mr-2"
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
                                <p className="font-semibold">Booking approved!</p>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center">
                                <svg
                                    className="w-6 h-6 text-red-600 inline-block mr-2"
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
                                <p className="font-semibold">Booking cancelled!</p>
                            </div>
                        )}
                    </div>
                )}
                {showNextButton && (
                    <div className="mt-4 text-center">
                        <button
                            onClick={handleNextClick}
                            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminTracking;
