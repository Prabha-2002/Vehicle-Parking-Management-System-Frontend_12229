export const fetchSlotNames = async (date) => {
    const response = await fetch(`http://localhost:8080/api/bookings/slots/${date}`);
    if (!response.ok) {
        throw new Error('Failed to fetch slot names');
    }
    return response.json();
};
