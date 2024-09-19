import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';

const AdminFinal = () => {
    const [bookings, setBookings] = useState([]);
    const [editStates, setEditStates] = useState({});
    const [calculatedCosts, setCalculatedCosts] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:7894/api/bookings')
            .then(response => {
                setBookings(response.data);
            })
            .catch(error => {
                console.error('Error fetching bookings:', error);
            });
    }, []);

    const handleArrivalTimeChange = (id, value) => {
        setEditStates(prevState => ({
            ...prevState,
            [id]: {
                ...(prevState[id] || {}),
                arrivalTime: value,
            }
        }));
    };

    const handleArrivedClick = (id) => {
        const arrivalTime = editStates[id]?.arrivalTime || '';
        axios.put(`http://localhost:7894/api/bookings/updateArrival/${id}`, null, {
            params: { arrivalTime }
        })
        .then(response => {
            setBookings(bookings.map(booking => booking.id === id ? response.data : booking));
        })
        .catch(error => {
            console.error('Error updating arrival time:', error);
        });
    };

    const handleCheckoutTimeChange = (id, value) => {
        setEditStates(prevState => ({
            ...prevState,
            [id]: {
                ...(prevState[id] || {}),
                checkout: value
            }
        }));
    };

    const handleCheckoutClick = (id) => {
        const checkoutTime = editStates[id]?.checkout || '';

        if (!checkoutTime) {
            console.error('Checkout time is empty.');
            return;
        }

        axios.put(`http://localhost:7894/api/bookings/updateCheckout/${id}`, null, {
            params: { checkout: checkoutTime }
        })
        .then(response => {
            setBookings(bookings.map(booking => booking.id === id ? response.data : booking));
        })
        .catch(error => {
            console.error('Error updating checkout time:', error);
        });
    };

    const calculateCost = (checkout, endTime) => {
        if (!checkout || !endTime) return 0;

        const [checkoutHours, checkoutMinutes] = checkout.split(':').map(Number);
        const [endHours, endMinutes] = endTime.split(':').map(Number);

        const checkoutTotalMinutes = checkoutHours * 60 + checkoutMinutes;
        const endTotalMinutes = endHours * 60 + endMinutes;

        let diffMinutes = checkoutTotalMinutes - endTotalMinutes;

        if (diffMinutes < 0) diffMinutes = 0;

        let hours = diffMinutes / 60;
        hours = Math.ceil(hours);

        if (hours === 1) {
            return 40;
        } else if (hours === 2) {
            return 60;
        } else if (hours >= 3) {
            return 80;
        } else {
            return 0;
        }
    };

    const handleCalculateClick = (id) => {
        const booking = bookings.find(b => b.id === id);
        if (!booking) return;

        const { checkout, endTime } = booking;
        const cost = calculateCost(checkout, endTime);

        setCalculatedCosts(prevState => ({
            ...prevState,
            [id]: cost
        }));

        axios.put(`http://localhost:7894/api/bookings/updateNewcostStatus/${id}`, null, {
            params: { newCostStatus: 'Calculated' }
        })
        .then(response => {
            setBookings(bookings.map(booking => booking.id === id ? response.data : booking));
        })
        .catch(error => {
            console.error('Error updating new cost status:', error);
        });
    };

    const handlePayClick = (id) => {
        const cost = calculatedCosts[id] || 0;

        axios.put(`http://localhost:7894/api/bookings/updateNewCost/${id}`, null, {
            params: { newCost: cost }
        })
        .then(response => {
            setBookings(bookings.map(booking => booking.id === id ? response.data : booking));
            setCalculatedCosts(prevState => ({
                ...prevState,
                [id]: 0
            }));
            setSuccessMessage(`Payment successful for booking ID ${id}.`);
            setTimeout(() => setSuccessMessage(''), 5000);
        })
        .catch(error => {
            console.error('Error updating new cost:', error);
        });
    };

    const columns = React.useMemo(
        () => [
            { Header: 'ID', accessor: 'id' },
            { Header: 'Slot Name', accessor: 'slotName' },
            { Header: 'Vehicle Number', accessor: 'vehicleNumber' },
            { Header: 'Driver Name', accessor: 'driverName' },
            { Header: 'Driver Email', accessor: 'driverEmail' },
            { Header: 'Driver Phone', accessor: 'driverPhone' },
            { Header: 'Date', accessor: 'date' },
            { Header: 'Start Time', accessor: 'startTime' },
            { Header: 'End Time', accessor: 'endTime' },
            { Header: 'Number of Hours', accessor: 'numberOfHours' },
            { Header: 'Amount', accessor: 'amount' },
            { Header: 'Status', accessor: 'status' },
            { Header: 'Prepayment Status', accessor: 'prepaymentStatus' },
            { Header: 'Arrival Time', accessor: 'arrivalTime', Cell: ({ row }) => {
                const { arrivalTime, id } = row.original;
                const editable = editStates[id] || {};
                return (
                    <div className="flex items-center">
                        <input
                            type="time"
                            value={editable.arrivalTime || arrivalTime || ''}
                            onChange={(e) => handleArrivalTimeChange(id, e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1"
                        />
                        <button
                            onClick={() => handleArrivedClick(id)}
                            className="ml-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow-md"
                        >
                            Arrived
                        </button>
                    </div>
                );
            }},
            { Header: 'Checkout', accessor: 'checkout', Cell: ({ row }) => {
                const { checkout, id } = row.original;
                const editable = editStates[id] || {};
                return (
                    <div className="flex items-center">
                        <input
                            type="time"
                            value={editable.checkout || checkout || ''}
                            onChange={(e) => handleCheckoutTimeChange(id, e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1"
                        />
                        <button
                            onClick={() => handleCheckoutClick(id)}
                            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md"
                        >
                            Checkout
                        </button>
                    </div>
                );
            }},
            { Header: 'New Cost', Cell: ({ row }) => {
                const { id, newCostStatus } = row.original;
                const cost = calculatedCosts[id] || 0;

                return (
                    <div className="flex items-center">
                        {newCostStatus === 'Paid' ? (
                            <span className="text-green-600 font-semibold">{`₹${row.original.newCost.toFixed(2)}`}</span>
                        ) : (
                            <>
                                {newCostStatus === 'Calculated' ? (
                                    <>
                                        <span className="text-green-600 font-semibold">{`₹${cost.toFixed(2)}`}</span>
                                        <button
                                            onClick={() => handlePayClick(id)}
                                            className="ml-2 px-4 py-2 bg-red-600 text-white rounded-lg shadow-md"
                                        >
                                            Pay
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => handleCalculateClick(id)}
                                        className="px-4 py-2 bg-yellow-600 text-white rounded-lg shadow-md"
                                    >
                                        Calculate
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                );
            }},
            { Header: 'New Cost Status', accessor: 'newCostStatus' }
        ],
        [editStates, bookings, calculatedCosts]
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: bookings });

    return (
        <div className="flex flex-col h-screen p-8 bg-gray-100">
            <div className="flex-1 overflow-auto">
                <div className="bg-white shadow-md border border-gray-300 rounded-lg p-6 w-full">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard - Bookings</h2>
                    {successMessage && (
                        <div className="mb-6 p-4 bg-green-100 text-green-800 border border-green-300 rounded-lg">
                            {successMessage}
                        </div>
                    )}
                    <div className="overflow-x-auto">
                        <table {...getTableProps()} className="min-w-full bg-white divide-y divide-gray-200">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th colSpan={columns.length} className="border-b border-blue-800"></th>
                                </tr>
                                {headerGroups.map(headerGroup => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map(column => (
                                            <th {...column.getHeaderProps()} className="px-6 py-3 text-left font-medium text-sm uppercase tracking-wide">
                                                {column.render('Header')}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
                                {rows.map(row => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()} className="text-sm text-gray-700">
                                            {row.cells.map(cell => (
                                                <td {...cell.getCellProps()} className="px-6 py-4 whitespace-nowrap">
                                                    {cell.render('Cell')}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminFinal;
