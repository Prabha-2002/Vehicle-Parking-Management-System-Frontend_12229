import React from 'react';

const DateSelector = ({ onDateChange }) => {
    return (
        <div>
            <h3>Select Date:</h3>
            <input
                type="date"
                onChange={(e) => onDateChange(e.target.value)}
            />
        </div>
    );
};

export default DateSelector;
