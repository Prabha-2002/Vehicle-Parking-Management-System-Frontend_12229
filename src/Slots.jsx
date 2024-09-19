import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const Slots = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [availableSlots, setAvailableSlots] = useState([]);

    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const response = await fetch(`http://localhost:7894/api/slots/availability/${format(new Date(), 'yyyy-MM-ddTHH:mm:ss')}`);
                const data = await response.json();
                setAvailableSlots(data);
            } catch (error) {
                console.error('Error fetching slots:', error);
            }
        };

        fetchSlots();
    }, []);

    useEffect(() => {
        if (selectedDate) {
            const fetchAvailableSlots = async () => {
                try {
                    const response = await fetch(`http://localhost:7894/api/slots/availability/${format(selectedDate, 'yyyy-MM-ddTHH:mm:ss')}`);
                    const data = await response.json();
                    setAvailableSlots(data);
                } catch (error) {
                    console.error('Error fetching available slots:', error);
                }
            };

            fetchAvailableSlots();
        } else {
            setAvailableSlots([]);
        }
    }, [selectedDate]);

    const renderSlotButtons = () => {
        const slots = ['A1', 'A2', 'A3', 'A4', 'A5', 'B1', 'B2', 'B3', 'B4', 'B5'];

        return slots.map((slotId) => {
            const slot = availableSlots.find(slot => slot.slotId === slotId);
            const isAvailable = slot?.isAvailable;

            return (
                <button
                    key={slotId}
                    className={`p-4 rounded-md transition duration-300 ${
                        isAvailable ? 'bg-green-400' : 'bg-red-500'
                    } text-white hover:${isAvailable ? 'bg-green-600' : 'bg-red-600'}`}
                    disabled={!isAvailable}
                >
                    {slotId}
                </button>
            );
        });
    };

    return (
        <div className="container mx-auto p-8 max-w-3xl">
            <h2 className="text-2xl font-bold mb-6">Select Date and View Slots</h2>

            <div className="mb-6">
                <label htmlFor="datePicker" className="block text-gray-700 font-medium mb-2">Select Date</label>
                <DatePicker
                    id="datePicker"
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    minDate={new Date('2024-09-11')}
                    maxDate={new Date('2024-09-25')}
                    dateFormat="dd/MM/yyyy"
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                />
            </div>

            {selectedDate && (
                <div>
                    <h3 className="text-xl font-semibold mb-4">Available Slots for {format(selectedDate, 'dd/MM/yyyy')}</h3>
                    <div className="grid grid-cols-5 gap-4">
                        {renderSlotButtons()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Slots;
