import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCar } from '../hooks/useCars';
import { useBookingActions } from '../hooks/useBookings';
import LoadingSpinner from '../components/LoadingSpinner';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { car, loading } = useCar(id);
  const { bookCar, loading: bookingLoading } = useBookingActions();

  const handleBooking = async () => {
    if (!car) return;

    if (car.providerEmail === user?.email) {
      return;
    }

    try {
      await bookCar(car._id);
      navigate('/my-bookings');
    } catch (error) {
      console.error('Booking error:', error);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen={true} />;
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Car not found</h2>
          <button
            onClick={() => navigate('/browse-cars')}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
          >
            Browse Cars
          </button>
        </div>
      </div>
    );
  }

  const isAvailable = car.availabilityStatus === 'Available';
  const isOwnCar = car.providerEmail === user?.email;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image */}
            <div className="relative">
              <img
                src={car.imageUrl}
                alt={car.carName}
                className="w-full h-96 lg:h-full object-cover"
              />
              {/* Availability Badge */}
              <div className="absolute top-4 right-4">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    isAvailable
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}
                >
                  {car.availabilityStatus}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="p-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{car.carName}</h1>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-primary">${car.rentPrice}</span>
                <span className="text-xl text-gray-600">/day</span>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-semibold">{car.category}</p>
                  </div>
                </div>

                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold">{car.location}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">{car.description}</p>
              </div>

              {/* Provider Info */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Provider Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="font-medium">{car.providerName}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{car.providerEmail}</span>
                  </div>
                </div>
              </div>

              {/* Book Button */}
              {isOwnCar ? (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                  <p className="text-blue-800">This is your car listing</p>
                </div>
              ) : !isAvailable ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                  <p className="text-red-800">This car is currently unavailable</p>
                </div>
              ) : (
                <button
                  onClick={handleBooking}
                  disabled={bookingLoading}
                  className="w-full py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 hover:shadow-lg transition-all font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                >
                  {bookingLoading ? 'Booking...' : '🚗 Book Now'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
