import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaCreditCard, FaCalendarAlt, FaLock, FaMoneyBillWave } from 'react-icons/fa';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const amountFromState = location.state?.amount || '';
    const bookingId = sessionStorage.getItem('bookingId');
    const userId = sessionStorage.getItem('id');

    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        amount: amountFromState,
        paymentDate: ''
    });

    useEffect(() => {
        const now = new Date().toISOString().slice(0, 16); // Include date and time up to minutes
        setPaymentDetails(prevDetails => ({
            ...prevDetails,
            paymentDate: now
        }));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const validateCardNumber = (number) => {
        const cleanNumber = number.replace(/\s+/g, '');
        return /^\d{16}$/.test(cleanNumber);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateCardNumber(paymentDetails.cardNumber)) {
            Swal.fire({
                title: 'Validation Error',
                text: 'Card number must be 16 digits',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        if (!bookingId || !userId) {
            Swal.fire({
                title: 'Error',
                text: 'No booking ID or user ID found',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        try {
            const paymentResponse = await axios.post('http://localhost:7894/api/payments/process', {
                booking: { id: bookingId },
                user: { id: userId },
                cardNumber: paymentDetails.cardNumber.replace(/\s+/g, ''), // Clean card number before sending
                expiryDate: paymentDetails.expiryDate,
                cvv: paymentDetails.cvv,
                amount: paymentDetails.amount,
                paymentDate: paymentDetails.paymentDate
            });

            await Swal.fire({
                title: 'Payment Successful',
                text: paymentResponse.data,
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/userbookinghistory');
            });

            await axios.put(`http://localhost:7894/api/bookings/${bookingId}/update-prepayment-status`, null, {
                params: { status: 'PAID' }
            });

            navigate('/userdashboard');
        } catch (error) {
            console.error('Payment processing error:', error);
            Swal.fire({
                title: 'Payment Failed',
                text: 'Payment processing failed. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200 p-8 flex items-center justify-center">
            <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-xl border border-gray-300">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Payment Information</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="cardNumber" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                            <FaCreditCard className="text-gray-500 mr-2" /> Card Number
                        </label>
                        <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={paymentDetails.cardNumber}
                            onChange={handleInputChange}
                            className="border border-gray-300 p-3 rounded-lg w-full"
                            pattern="\d{4} \d{4} \d{4} \d{4}|\d{16}"
                            title="Card number must be 16 digits with or without spaces"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="expiryDate" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                            <FaCalendarAlt className="text-gray-500 mr-2" /> Expiry Date (MM/YY)
                        </label>
                        <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={paymentDetails.expiryDate}
                            onChange={handleInputChange}
                            className="border border-gray-300 p-3 rounded-lg w-full"
                            pattern="\d{2}/\d{2}"
                            title="Expiry date must be in the format: MM/YY"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="cvv" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                            <FaLock className="text-gray-500 mr-2" /> CVV
                        </label>
                        <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            value={paymentDetails.cvv}
                            onChange={handleInputChange}
                            className="border border-gray-300 p-3 rounded-lg w-full"
                            pattern="\d{3}"
                            title="CVV must be a 3-digit number"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                            <FaMoneyBillWave className="text-gray-500 mr-2" /> Amount
                        </label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            placeholder="100.00"
                            value={paymentDetails.amount}
                            onChange={handleInputChange}
                            className="border border-gray-300 p-3 rounded-lg w-full"
                            step="0.01"
                            min="0.01"
                            title="Amount must be a positive number"
                            required
                        />
                    </div>
                    <input
                        type="hidden"
                        id="paymentDate"
                        name="paymentDate"
                        value={paymentDetails.paymentDate}
                        onChange={handleInputChange}
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-500 transition w-full"
                    >
                        Pay Now
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Payment;
