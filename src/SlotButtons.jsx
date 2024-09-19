import React, { useState } from 'react';
import { fetchAvailableSlots } from './services/bookingService';

const SlotButtons = () => {
    const [date, setDate] = useState('');
    const [slots, setSlots] = useState([]);
    const [error, setError] = useState(null);

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleFetchSlots = async () => {
        try {
            const fetchedSlots = await fetchAvailableSlots(date);
            setSlots(fetchedSlots);
            setError(null);
        } catch (error) {
            setError('Error fetching slots');
            setSlots([]);
        }
    };

    return (
        <div>
            <input
                type="date"
                value={date}
                onChange={handleDateChange}
            />
            <button onClick={handleFetchSlots}>Get Slots</button>
            {error && <p>{error}</p>}
            <div>
                {slots.length > 0 ? (
                    slots.map((slot, index) => (
                        <button key={index}>{slot}</button>
                    ))
                ) : (
                    <p>No slots available</p>
                )}
            </div>
        </div>
    );
};

export default SlotButtons;
