import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const UserBookingHistory = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const userId = location.state?.userId || sessionStorage.getItem('id'); 

    useEffect(() => {
        const fetchBookings = async () => {
            if (!userId) {
                setError('User ID is not available.');
                return;
            }

            try {
                const response = await axios.get(`http://localhost:7894/api/bookings/user/${userId}`);
                setBookings(response.data);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setError('No bookings found for this user.');
                } else {
                    setError('Error fetching bookings: ' + error.message);
                }
            }
        };

        fetchBookings();
    }, [userId]);

    const handleAction = async (id, action) => {
        try {
            const url = action === 'approve'
                ? `http://localhost:7894/api/bookings/${id}/approve`
                : `http://localhost:7894/api/bookings/${id}/cancel`;

            await axios.post(url);
            setBookings(prevBookings =>
                prevBookings.map(booking =>
                    booking.id === id
                        ? { ...booking, status: action.toUpperCase() }
                        : booking
                )
            );
        } catch (error) {
            console.error(`Error ${action} booking:`, error);
        }
    };

    const handlePay = async (booking) => {
        try {
            sessionStorage.setItem("bookingId", booking.id);
            await axios.put(`http://localhost:7894/api/bookings/${booking.id}/update-prepayment-status`, null, {
                params: { status: 'PAID' }
            });
            setBookings(prevBookings =>
                prevBookings.map(b =>
                    b.id === booking.id
                        ? { ...b, prepaymentStatus: 'PAID' }
                        : b
                )
            );
            navigate('/payment', { state: { amount: booking.amount } });
        } catch (error) {
            console.error('Error updating prepayment status:', error);
        }
    };

    if (error) return <p className="text-center text-red-600">{error}</p>;
    if (!bookings.length) return <p className="text-center text-gray-600">Loading...</p>;

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 p-8">
            <div className="container mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Booking History</h2>
                <table className="w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            {['Slot Name', 'Vehicle Number', 'Driver Name', 'Driver Email', 'Driver Phone', 'Date', 'Start Time', 'End Time', 'Number of Hours', 'Amount', 'Status', 'Your Action'].map(header => (
                                <th key={header} className="border-b border-gray-300 p-4 text-left text-sm font-medium">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => (
                            <tr key={booking.id} className="even:bg-gray-50 hover:bg-gray-100 transition-colors">
                                <td className="border-b border-gray-300 p-4 text-sm text-gray-700">{booking.slotName}</td>
                                <td className="border-b border-gray-300 p-4 text-sm text-gray-700">{booking.vehicleNumber}</td>
                                <td className="border-b border-gray-300 p-4 text-sm text-gray-700">{booking.driverName}</td>
                                <td className="border-b border-gray-300 p-4 text-sm text-gray-700">{booking.driverEmail}</td>
                                <td className="border-b border-gray-300 p-4 text-sm text-gray-700">{booking.driverPhone}</td>
                                <td className="border-b border-gray-300 p-4 text-sm text-gray-700">{booking.date}</td>
                                <td className="border-b border-gray-300 p-4 text-sm text-gray-700">{booking.startTime}</td>
                                <td className="border-b border-gray-300 p-4 text-sm text-gray-700">{booking.endTime}</td>
                                <td className="border-b border-gray-300 p-4 text-sm text-gray-700">{booking.numberOfHours}</td>
                                <td className="border-b border-gray-300 p-4 text-sm text-gray-700">₹{booking.amount}</td>
                                <td className="border-b border-gray-300 p-4 text-sm text-gray-700">{booking.status}</td>
                                <td className="border-b border-gray-300 p-4 text-sm text-gray-700">
                                    {booking.status === 'PENDING' && (
                                        <>
                                            <button
                                                onClick={() => handleAction(booking.id, 'approve')}
                                                className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-500 transition mr-2"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleAction(booking.id, 'cancel')}
                                                className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-500 transition"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    )}
                                    {booking.status === 'APPROVED' && (
                                        <>
                                            <button
                                                onClick={() => handlePay(booking)}
                                                disabled={booking.prepaymentStatus === 'PAID'}
                                                className={`py-1 px-3 rounded transition ${booking.prepaymentStatus === 'PAID' ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-500'} text-white`}
                                            >
                                                {booking.prepaymentStatus === 'PAID' ? ' Paid' : 'Pay'}
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserBookingHistory;
