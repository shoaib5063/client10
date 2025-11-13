import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCars } from '../hooks/useCars';
import CarCard from '../components/CarCard';
import LoadingSpinner from '../components/LoadingSpinner';

const BrowseCars = () => {
  const [filters, setFilters] = useState({
    category: '',
    search: '',
    sort: ''
  });

  const { cars, loading, error } = useCars(filters);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFilters({ category: '', search: '', sort: '' });
  };

  const categories = [
    { value: '', label: 'All Categories', icon: '🚗' },
    { value: 'Sedan', label: 'Sedan', icon: '🚙' },
    { value: 'SUV', label: 'SUV', icon: '🚐' },
    { value: 'Hatchback', label: 'Hatchback', icon: '🚗' },
    { value: 'Luxury', label: 'Luxury', icon: '✨' },
    { value: 'Electric', label: 'Electric', icon: '⚡' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
              🚗 Browse Our Fleet
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 font-light">
              Discover the perfect ride for your next adventure
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilters(prev => ({ ...prev, category: cat.value }))}
                className={`px-6 py-3 rounded-xl font-bold text-base transition-all transform hover:scale-105 shadow-lg ${
                  filters.category === cat.value
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/50'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Advanced Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white p-8 rounded-2xl shadow-xl mb-10 border border-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-bold text-gray-700 mb-3">
                🔍 Search by Name
              </label>
              <input
                type="text"
                id="search"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Type car name..."
                className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
              />
            </div>

            {/* Sort */}
            <div>
              <label htmlFor="sort" className="block text-sm font-bold text-gray-700 mb-3">
                📊 Sort By
              </label>
              <select
                id="sort"
                name="sort"
                value={filters.sort}
                onChange={handleFilterChange}
                className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base appearance-none bg-white cursor-pointer"
              >
                <option value="">Newest First</option>
                <option value="price-asc">💰 Price: Low to High</option>
                <option value="price-desc">💎 Price: High to Low</option>
              </select>
            </div>

            {/* Reset Button */}
            <div className="flex items-end">
              <button
                onClick={handleReset}
                className="w-full px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all font-bold text-base shadow-lg transform hover:scale-105"
              >
                🔄 Reset All
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        {loading ? (
          <div className="py-20">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white rounded-2xl shadow-xl"
          >
            <div className="text-6xl mb-4">⚠️</div>
            <p className="text-red-600 text-xl font-semibold">{error}</p>
          </motion.div>
        ) : cars.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20 bg-white rounded-2xl shadow-xl"
          >
            <div className="text-8xl mb-6">🔍</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-3">No Cars Found</h3>
            <p className="text-xl text-gray-500 mb-8">Try adjusting your search filters</p>
            <button
              onClick={handleReset}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8 flex items-center justify-between bg-white px-6 py-4 rounded-xl shadow-md"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">✨</span>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {cars.length} {cars.length === 1 ? 'Car' : 'Cars'} Available
                  </p>
                  <p className="text-sm text-gray-500">Ready for your next journey</p>
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
                  <CarCard car={car} />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BrowseCars;
