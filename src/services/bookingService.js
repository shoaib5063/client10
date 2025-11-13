import api from '../utils/api';

/**
 * Booking Service - Handles all booking-related API calls
 */

// Get all bookings for a user
export const getUserBookings = async (email) => {
  const response = await api.get(`/bookings/user/${email}`);
  return response.data;
};

// Check if a car is booked
export const getCarBookingStatus = async (carId) => {
  const response = await api.get(`/bookings/car/${carId}`);
  return response.data;
};

// Create a new booking
export const createBooking = async (bookingData) => {
  const response = await api.post('/bookings', bookingData);
  return response.data;
};
