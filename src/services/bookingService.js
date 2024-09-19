// src/services/bookingService.js
const API_BASE_URL = 'http://localhost:8080/api/bookings'; // Update with your actual backend URL

export const fetchAvailableSlots = async (date) => {
    try {
        const response = await fetch(`${API_BASE_URL}/available-slots?date=${date}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch available slots:', error);
        throw error;
    }
};
