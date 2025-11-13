import api from '../utils/api';

/**
 * Car Service - Handles all car-related API calls
 */

// Get all cars with optional filters
export const getAllCars = async (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.category) params.append('category', filters.category);
  if (filters.search) params.append('search', filters.search);
  if (filters.limit) params.append('limit', filters.limit);
  if (filters.sort) params.append('sort', filters.sort);
  
  const response = await api.get(`/cars?${params.toString()}`);
  return response.data;
};

// Get featured cars (6 newest)
export const getFeaturedCars = async () => {
  const response = await api.get('/cars/featured');
  return response.data;
};

// Get single car by ID
export const getCarById = async (id) => {
  const response = await api.get(`/cars/${id}`);
  return response.data;
};

// Get cars by provider email
export const getCarsByProvider = async (email) => {
  const response = await api.get(`/cars/provider/${email}`);
  return response.data;
};

// Create new car listing
export const createCar = async (carData) => {
  const response = await api.post('/cars', carData);
  return response.data;
};

// Update car listing
export const updateCar = async (id, carData) => {
  const response = await api.put(`/cars/${id}`, carData);
  return response.data;
};

// Delete car listing
export const deleteCar = async (id) => {
  const response = await api.delete(`/cars/${id}`);
  return response.data;
};
