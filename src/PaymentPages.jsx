import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const PaymentPages = () => {
    const [amount, setAmount] = useState(null);
    const [error, setError] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedAmount = sessionStorage.getItem('amount');
        if (storedAmount) {
            setAmount(Number(storedAmount));
        } else {
            setError('No amount specified.');
        }
    }, []);

    const validateCardNumber = (number) => {
        return /^[\d\s]{13,19}$/.test(number.replace(/\s/g, ''));
    };

    const validateExpiryDate = (date) => {
        return /^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(date);
    };

    const validateCvv = (cvv) => {
        return /^\d{3,4}$/.test(cvv);
    };

    const handlePayment = async () => {
        if (!cardNumber || !expiryDate || !cvv) {
            setError('Please enter all card details.');
            return;
        }

        if (!validateCardNumber(cardNumber)) {
            setError('Invalid card number. Please enter a valid card number.');
            return;
        }

        if (!validateExpiryDate(expiryDate)) {
            setError('Invalid expiry date. Please enter a date in MM/YY format.');
            return;
        }

        if (!validateCvv(cvv)) {
            setError('Invalid CVV. Please enter a 3 or 4 digit CVV.');
            return;
        }

        try {
            const bookingId = sessionStorage.getItem('bookingId');

            if (bookingId) {
                await axios.post(`http://localhost:7894/api/bookings/processNewCostStatus/${bookingId}`, null, {
                    params: { newCostStatus: 'Paid' }
                });

                await Swal.fire({
                    title: 'Payment Successful',
                    text: 'Your payment has been successfully processed.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    navigate(`/extended-payment?paymentStatus=success`);
                });
            } else {
                setError('Booking ID not found.');
            }
        } catch (error) {
            setError('Failed to update new cost status. Please try again.');
            console.error('Error updating new cost status:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200 p-6">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl border border-gray-200">
                <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Payment Page</h2>
                {error && (
                    <div className="bg-red-100 text-red-800 p-4 rounded-md mb-4 text-center">
                        {error}
                    </div>
                )}
                <p className="text-lg text-gray-700 text-center mb-4">Amount to Pay: <span className="font-bold">₹{amount}</span></p>
                <div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="cardNumber">
                            Card Number
                        </label>
                        <input
                            type="text"
                            id="cardNumber"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="1234 5678 9012 3456"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="expiryDate">
                            Expiry Date
                        </label>
                        <input
                            type="text"
                            id="expiryDate"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="MM/YY"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="cvv">
                            CVV
                        </label>
                        <input
                            type="text"
                            id="cvv"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="123"
                        />
                    </div>
                    <button
                        onClick={handlePayment}
                        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 w-full"
                    >
                        Pay Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentPages;
