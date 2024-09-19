import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { BanknotesIcon } from '@heroicons/react/24/outline'; 

const TotalEarnings = () => {
    const [totalEarnings, setTotalEarnings] = useState(0);

    useEffect(() => {
        fetch('http://localhost:7894/api/bookings/totalEarnings')
            .then(response => response.json())
            .then(data => setTotalEarnings(data))
            .catch(error => console.error('Error fetching total earnings:', error));
    }, []);

    return (
        <div className="p-8 mx-auto max-w-4xl mt-8 rounded-lg shadow-lg bg-white">
            <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">Total Earnings</h2>
            <div className="flex items-center justify-center">
                <div className="flex items-center bg-blue-100 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                    <BanknotesIcon className="h-12 w-12 text-blue-600 mr-4" />
                    <div className="text-center">
                        <div className="text-6xl font-bold text-blue-900">Rs.{totalEarnings.toFixed(2)}</div>
                        <p className="text-gray-600 mt-2 text-lg">Total Earnings</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TotalEarnings;  