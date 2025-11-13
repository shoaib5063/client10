import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useUserBookings } from '../hooks/useBookings';
import LoadingSpinner from '../components/LoadingSpinner';

const MyBookings = () => {
  const { user } = useAuth();
  const { bookings, loading } = useUserBookings(user?.email);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'bg-gradient-to-r from-green-500 to-emerald-500';
      case 'pending':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      case 'cancelled':
        return 'bg-gradient-to-r from-red-500 to-pink-500';
      default:
        return 'bg-gradient-to-r from-blue-500 to-indigo-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return '✅';
      case 'pending':
        return '⏳';
      case 'cancelled':
        return '❌';
      default:
        return '📋';
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen={true} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white py-16 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
              📅 My Bookings
            </h1>
            <p className="text-xl md:text-2xl text-cyan-100 font-light">
              Track and manage all your car reservations
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Bookings */}
        {bookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20 bg-white rounded-3xl shadow-2xl"
          >
            <div className="text-8xl mb-6">📅</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-3">No Bookings Yet</h3>
            <p className="text-xl text-gray-500 mb-8">Start your journey by booking your first car</p>
            <Link
              to="/browse-cars"
              className="inline-block px-10 py-5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-2xl font-bold text-xl hover:from-cyan-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-xl"
            >
              🚗 Browse Cars
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
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center text-3xl">
                  🎫
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">
                    {bookings.length} {bookings.length === 1 ? 'Booking' : 'Bookings'}
                  </p>
                  <p className="text-base text-gray-500">Total reservations</p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-cyan-600">🚗</p>
                  <p className="text-sm text-gray-500">Active</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">⭐</p>
                  <p className="text-sm text-gray-500">Trips</p>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bookings.map((booking, index) => (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105"
                >
                  {/* Image */}
                  <div className="relative h-56">
                    <img
                      src={booking.carImage}
                      alt={booking.carName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-4 py-2 ${getStatusColor(booking.status)} text-white rounded-xl text-sm font-bold shadow-lg flex items-center gap-2`}>
                        <span>{getStatusIcon(booking.status)}</span>
                        {booking.status}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-extrabold text-white drop-shadow-lg">
                        {booking.carName}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-xl">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white text-lg">
                          💰
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Daily Rate</p>
                          <p className="text-xl font-bold text-gray-900">${booking.rentPrice}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-xl">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white text-lg">
                          👤
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500 font-medium">Provider</p>
                          <p className="text-sm font-bold text-gray-900 truncate">{booking.providerEmail}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-xl">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-lg">
                          📅
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Booking Date</p>
                          <p className="text-sm font-bold text-gray-900">
                            {new Date(booking.bookingDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Link
                      to={`/car/${booking.carId}`}
                      className="block w-full text-center px-6 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all font-bold text-base shadow-lg transform hover:scale-105"
                    >
                      View Car Details →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
