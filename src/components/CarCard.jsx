import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CarCard = ({ car, showActions = false, onUpdate, onDelete }) => {
  const isAvailable = car.availabilityStatus === 'Available';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={car.imageUrl}
          alt={car.carName}
          className="w-full h-full object-cover"
        />
        {/* Availability Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              isAvailable
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            {car.availabilityStatus}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{car.carName}</h3>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-600 text-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span>{car.category}</span>
            </div>
            
            <div className="flex items-center text-gray-600 text-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{car.location}</span>
            </div>
            
            <div className="flex items-center text-gray-600 text-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{car.providerName}</span>
            </div>
          </div>

          <div className="text-2xl font-bold text-primary mb-4">
            ${car.rentPrice}
            <span className="text-sm text-gray-600 font-normal">/day</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          {showActions ? (
            <div className="flex gap-2">
              <button
                onClick={() => onUpdate(car)}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
              >
                Update
              </button>
              <button
                onClick={() => onDelete(car._id)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
              >
                Delete
              </button>
            </div>
          ) : (
            <Link
              to={`/car/${car._id}`}
              className="block w-full px-5 py-3 bg-gray-900 text-white text-center rounded-xl hover:bg-gray-800 hover:shadow-lg transition-all font-bold text-base transform hover:scale-105"
            >
              {isAvailable ? '🚗 View Details & Book' : '👁️ View Details'}
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;
