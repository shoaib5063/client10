import { useState, useEffect } from 'react';
import {
  getUserBookings,
  getCarBookingStatus,
  createBooking
} from '../services/bookingService';
import toast from 'react-hot-toast';

/**
 * Hook for user's bookings
 */
export const useUserBookings = (email) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    if (!email) return;

    setLoading(true);
    setError(null);
    try {
      const data = await getUserBookings(email);
      setBookings(data.data);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [email]);

  return { bookings, loading, error, refetch: fetchBookings };
};

/**
 * Hook for car booking status
 */
export const useCarBookingStatus = (carId) => {
  const [isBooked, setIsBooked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!carId) return;

    const checkStatus = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCarBookingStatus(carId);
        setIsBooked(data.isBooked);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, [carId]);

  return { isBooked, loading, error };
};

/**
 * Hook for booking actions
 */
export const useBookingActions = () => {
  const [loading, setLoading] = useState(false);

  const bookCar = async (carId) => {
    setLoading(true);
    try {
      const data = await createBooking({ carId });
      toast.success('Car booked successfully!');
      return data;
    } catch (err) {
      toast.error(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { bookCar, loading };
};
