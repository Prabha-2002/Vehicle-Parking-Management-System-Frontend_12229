import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ExtendedPaymentPage = () => {
    const navigate = useNavigate();
    const [newCost, setNewCost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    const [isPaid, setIsPaid] = useState(false);

    useEffect(() => {
        const userId = sessionStorage.getItem('id');
        const bookingId = sessionStorage.getItem('bookingId');

        if (!userId || !bookingId) {
            setError('User ID or Booking ID not found.');
            setLoading(false);
            return;
        }

        axios.get(`http://localhost:7894/api/bookings/${userId}/new-cost`)
            .then(response => {
                if (response.status === 200) {
                    setNewCost(response.data.newCost);
                } else {
                    setError('Failed to fetch new cost.');
                }
                setLoading(false);
            })
            .catch(error => {
                setError(`Failed to fetch new cost. ${error.message}`);
                setLoading(false);
                console.error('Error fetching new cost:', error);
            });
    }, []);

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        if (query.get('paymentStatus') === 'success') {
            setPaymentStatus('Payment was successful!');
            setIsPaid(true);        }
    }, []);

    const handlePayClick = () => {
        const userId = sessionStorage.getItem('id');
        const bookingId = sessionStorage.getItem('bookingId');

        if (newCost <= 0 || !userId || !bookingId) return;

        sessionStorage.setItem('amount', newCost);
        sessionStorage.setItem('bookingId', bookingId);

        navigate('/paymentpages');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200">
                <div className="text-xl font-semibold text-gray-800">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200">
                <div className="text-xl font-semibold text-red-600">{error}</div>
            </div>
        );
    }

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200 p-6">
            {/* Back Button */}
            <button
                className="absolute top-4 left-4 flex items-center justify-center h-12 w-24 bg-gray-100 border-none rounded-md shadow-md hover:shadow-lg transition-transform transform hover:translate-x-[-5px] hover:scale-105 cursor-pointer"
                onClick={() => navigate('/userdashboard')}
            >
                <svg className="h-5 w-5 text-red-500 mr-2 transition-transform duration-200 hover:scale-110" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                    <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
                </svg>
                <span className="text-red-500">Back</span>
            </button>

            <div className="relative w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                {isPaid && (
                    <div className="absolute inset-0 flex items-center justify-center bg-opacity-70 bg-white rounded-lg z-10">
                        <h2 className="text-4xl font-extrabold text-red-600">Paid</h2>
                    </div>
                )}
                <div className={`transition-all duration-300 ₹{isPaid ? 'filter blur-sm' : ''}`}>
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Payment Details</h2>
                    {paymentStatus && (
                        <div className="bg-green-100 text-green-800 p-4 rounded-md mb-4 text-center">
                            {paymentStatus}
                        </div>
                    )}
                    {newCost === null ? (
                        <p className="text-lg text-gray-700 text-center">You haven't checked out yet.</p>
                    ) : (
                        <div className="text-center">
                            <p className="text-lg text-gray-700 mb-4">Amount to Pay: <span className="font-bold">₹{newCost.toFixed(2)}</span></p>
                            <button
                                onClick={handlePayClick}
                                className={`bg-blue-600 text-white px-6 py-3 rounded-md transition duration-300 ₹{isPaid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50'}`}
                                disabled={isPaid}
                                title={isPaid ? 'You have already paid' : ''}
                            >
                                {isPaid ? 'Paid' : 'Pay Now'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExtendedPaymentPage;
