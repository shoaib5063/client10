import { useState, useEffect } from 'react';
import {
  getAllCars,
  getFeaturedCars,
  getCarById,
  getCarsByProvider,
  createCar,
  updateCar,
  deleteCar
} from '../services/carService';
import toast from 'react-hot-toast';

/**
 * Custom hook for car operations
 */
export const useCars = (filters = {}) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCars = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllCars(filters);
      setCars(data.data);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [JSON.stringify(filters)]);

  return { cars, loading, error, refetch: fetchCars };
};

/**
 * Hook for featured cars
 */
export const useFeaturedCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedCars = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getFeaturedCars();
        setCars(data.data);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCars();
  }, []);

  return { cars, loading, error };
};

/**
 * Hook for single car
 */
export const useCar = (id) => {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchCar = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCarById(id);
        setCar(data.data);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  return { car, loading, error };
};

/**
 * Hook for provider's cars
 */
export const useProviderCars = (email) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProviderCars = async () => {
    if (!email) return;

    setLoading(true);
    setError(null);
    try {
      const data = await getCarsByProvider(email);
      setCars(data.data);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviderCars();
  }, [email]);

  return { cars, loading, error, refetch: fetchProviderCars };
};

/**
 * Hook for car CRUD operations
 */
export const useCarActions = () => {
  const [loading, setLoading] = useState(false);

  const addCar = async (carData) => {
    setLoading(true);
    try {
      const data = await createCar(carData);
      toast.success('Car listing created successfully!');
      return data;
    } catch (err) {
      toast.error(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const editCar = async (id, carData) => {
    setLoading(true);
    try {
      const data = await updateCar(id, carData);
      toast.success('Car listing updated successfully!');
      return data;
    } catch (err) {
      toast.error(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeCar = async (id) => {
    setLoading(true);
    try {
      const data = await deleteCar(id);
      toast.success('Car listing deleted successfully!');
      return data;
    } catch (err) {
      toast.error(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { addCar, editCar, removeCar, loading };
};
