import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCarActions } from '../hooks/useCars';

const AddCar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addCar, loading } = useCarActions();

  const [formData, setFormData] = useState({
    carName: '',
    description: '',
    category: 'Sedan',
    rentPrice: '',
    location: '',
    imageUrl: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.carName.trim() || formData.carName.length < 3) {
      newErrors.carName = 'Car name must be at least 3 characters';
    }

    if (!formData.description.trim() || formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    if (!formData.rentPrice || formData.rentPrice <= 0) {
      newErrors.rentPrice = 'Rent price must be a positive number';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      await addCar({
        ...formData,
        rentPrice: parseFloat(formData.rentPrice)
      });
      navigate('/my-listings');
    } catch (error) {
      console.error('Add car error:', error);
    }
  };

  const categories = [
    { value: 'Sedan', icon: '🚙', color: 'from-blue-500 to-blue-600' },
    { value: 'SUV', icon: '🚐', color: 'from-green-500 to-green-600' },
    { value: 'Hatchback', icon: '🚗', color: 'from-purple-500 to-purple-600' },
    { value: 'Luxury', icon: '✨', color: 'from-yellow-500 to-yellow-600' },
    { value: 'Electric', icon: '⚡', color: 'from-cyan-500 to-cyan-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-16 shadow-xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
              💼 List Your Car
            </h1>
            <p className="text-xl md:text-2xl text-emerald-100 font-light">
              Share your vehicle and start earning today
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-3xl shadow-2xl space-y-8 border border-gray-100"
        >
          {/* Section 1: Basic Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-2xl">
                🚗
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
            </div>

            {/* Car Name */}
            <div>
              <label htmlFor="carName" className="block text-base font-bold text-gray-700 mb-3">
                🏷️ Car Name *
              </label>
              <input
                type="text"
                id="carName"
                name="carName"
                value={formData.carName}
                onChange={handleChange}
                className={`w-full px-5 py-4 border-2 ${
                  errors.carName ? 'border-red-500' : 'border-gray-200'
                } rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-base`}
                placeholder="e.g., Tesla Model 3, BMW X5"
              />
              {errors.carName && <p className="mt-2 text-sm text-red-600 font-medium">{errors.carName}</p>}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-base font-bold text-gray-700 mb-3">
                📝 Description * (minimum 20 characters)
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                className={`w-full px-5 py-4 border-2 ${
                  errors.description ? 'border-red-500' : 'border-gray-200'
                } rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-base`}
                placeholder="Describe your car's features, condition, and what makes it special..."
              />
              <div className="flex justify-between mt-2">
                {errors.description ? (
                  <p className="text-sm text-red-600 font-medium">{errors.description}</p>
                ) : (
                  <p className="text-sm text-gray-500">
                    {formData.description.length} / 20 characters minimum
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Category Selection */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-2xl">
                🎯
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Category & Pricing</h2>
            </div>

            {/* Category Buttons */}
            <div>
              <label className="block text-base font-bold text-gray-700 mb-4">
                🚙 Select Category *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, category: cat.value }))}
                    className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
                      formData.category === cat.value
                        ? `bg-gradient-to-r ${cat.color} text-white border-transparent shadow-lg`
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">{cat.icon}</div>
                    <div className={`text-sm font-bold ${
                      formData.category === cat.value ? 'text-white' : 'text-gray-700'
                    }`}>
                      {cat.value}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Rent Price */}
            <div>
              <label htmlFor="rentPrice" className="block text-base font-bold text-gray-700 mb-3">
                💰 Rent Price (per day) *
              </label>
              <div className="relative">
                <span className="absolute left-5 top-5 text-gray-500 text-lg font-bold">$</span>
                <input
                  type="number"
                  id="rentPrice"
                  name="rentPrice"
                  value={formData.rentPrice}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className={`w-full pl-12 pr-5 py-4 border-2 ${
                    errors.rentPrice ? 'border-red-500' : 'border-gray-200'
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-base`}
                  placeholder="100.00"
                />
              </div>
              {errors.rentPrice && <p className="mt-2 text-sm text-red-600 font-medium">{errors.rentPrice}</p>}
            </div>
          </div>

          {/* Section 3: Location & Image */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl">
                📍
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Location & Photos</h2>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-base font-bold text-gray-700 mb-3">
                📍 Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full px-5 py-4 border-2 ${
                  errors.location ? 'border-red-500' : 'border-gray-200'
                } rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-base`}
                placeholder="e.g., Dhaka, Bangladesh"
              />
              {errors.location && <p className="mt-2 text-sm text-red-600 font-medium">{errors.location}</p>}
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="imageUrl" className="block text-base font-bold text-gray-700 mb-3">
                📸 Image URL *
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className={`w-full px-5 py-4 border-2 ${
                  errors.imageUrl ? 'border-red-500' : 'border-gray-200'
                } rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-base`}
                placeholder="https://example.com/car-image.jpg"
              />
              {errors.imageUrl && <p className="mt-2 text-sm text-red-600 font-medium">{errors.imageUrl}</p>}
              <p className="mt-2 text-sm text-gray-500">
                💡 Tip: Use Unsplash, Imgur, or any image hosting service
              </p>
              
              {/* Image Preview */}
              {formData.imageUrl && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6"
                >
                  <p className="text-base font-bold text-gray-700 mb-3">Preview:</p>
                  <div className="relative rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Provider Info */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-2xl border-2 border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">👤</span>
              <h3 className="text-lg font-bold text-gray-800">Provider Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">Name</label>
                <input
                  type="text"
                  value={user?.displayName || ''}
                  disabled
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-700 text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">Email</label>
                <input
                  type="text"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-700 text-base"
                />
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-bold text-lg"
            >
              ← Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? '⏳ Adding Car...' : '✅ Add Car to Listings'}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default AddCar;
