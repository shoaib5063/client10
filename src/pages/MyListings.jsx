import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useProviderCars, useCarActions } from '../hooks/useCars';
import CarCard from '../components/CarCard';
import Modal from '../components/Modal';
import LoadingSpinner from '../components/LoadingSpinner';
import Swal from 'sweetalert2';

const MyListings = () => {
  const { user } = useAuth();
  const { cars, loading, refetch } = useProviderCars(user?.email);
  const { editCar, removeCar, loading: actionLoading } = useCarActions();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [formData, setFormData] = useState({
    carName: '',
    description: '',
    category: '',
    rentPrice: '',
    location: '',
    imageUrl: ''
  });

  const categories = [
    { value: 'Sedan', icon: '🚙' },
    { value: 'SUV', icon: '🚐' },
    { value: 'Hatchback', icon: '🚗' },
    { value: 'Luxury', icon: '✨' },
    { value: 'Electric', icon: '⚡' },
  ];

  const handleUpdate = (car) => {
    setSelectedCar(car);
    setFormData({
      carName: car.carName,
      description: car.description,
      category: car.category,
      rentPrice: car.rentPrice,
      location: car.location,
      imageUrl: car.imageUrl
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (carId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        await removeCar(carId);
        refetch();
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    
    try {
      await editCar(selectedCar._id, {
        ...formData,
        rentPrice: parseFloat(formData.rentPrice)
      });
      setIsModalOpen(false);
      refetch();
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return <LoadingSpinner fullScreen={true} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-center gap-6"
          >
            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold mb-3">
                🚗 My Listings
              </h1>
              <p className="text-xl md:text-2xl text-purple-100 font-light">
                Manage and track your car listings
              </p>
            </div>
            <Link
              to="/add-car"
              className="px-8 py-4 bg-white text-purple-600 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl flex items-center gap-2"
            >
              <span className="text-2xl">➕</span>
              Add New Car
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Listings */}
        {cars.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20 bg-white rounded-3xl shadow-2xl"
          >
            <div className="text-8xl mb-6">🚗</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-3">No Listings Yet</h3>
            <p className="text-xl text-gray-500 mb-8">Start earning by listing your first car</p>
            <Link
              to="/add-car"
              className="inline-block px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-xl"
            >
              ➕ Add Your First Car
            </Link>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8 bg-white px-8 py-6 rounded-2xl shadow-xl flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl">
                  📊
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">
                    {cars.length} {cars.length === 1 ? 'Listing' : 'Listings'}
                  </p>
                  <p className="text-base text-gray-500">Active on the platform</p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">💰</p>
                  <p className="text-sm text-gray-500">Earning</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-pink-600">⭐</p>
                  <p className="text-sm text-gray-500">Quality</p>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map((car, index) => (
                <motion.div
                  key={car._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CarCard
                    car={car}
                    showActions={true}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                  />
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* Update Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="✏️ Update Car Listing"
        >
          <form onSubmit={handleSubmitUpdate} className="space-y-6">
            <div>
              <label className="block text-base font-bold text-gray-700 mb-3">
                🏷️ Car Name
              </label>
              <input
                type="text"
                name="carName"
                value={formData.carName}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-base"
              />
            </div>

            <div>
              <label className="block text-base font-bold text-gray-700 mb-3">
                📝 Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-base"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-base font-bold text-gray-700 mb-3">
                  🚙 Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-base appearance-none bg-white cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.icon} {cat.value}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-base font-bold text-gray-700 mb-3">
                  💰 Rent Price
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-gray-500 font-bold">$</span>
                  <input
                    type="number"
                    name="rentPrice"
                    value={formData.rentPrice}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full pl-10 pr-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-base"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-base font-bold text-gray-700 mb-3">
                📍 Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-base"
              />
            </div>

            <div>
              <label className="block text-base font-bold text-gray-700 mb-3">
                📸 Image URL
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-base"
              />
              {formData.imageUrl && (
                <div className="mt-4 rounded-xl overflow-hidden">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-bold text-base"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={actionLoading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all font-bold text-base shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionLoading ? '⏳ Updating...' : '✅ Update Car'}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default MyListings;
