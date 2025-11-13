import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCars, useCarActions, useProviderCars } from '../hooks/useCars';
import { useBookingActions } from '../hooks/useBookings';

/**
 * Example component showing how to use CRUD operations
 */
const CRUDExample = () => {
  const { user } = useAuth();
  const { cars, loading, refetch } = useCars();
  const { addCar, editCar, removeCar, loading: actionLoading } = useCarActions();
  const { bookCar, loading: bookingLoading } = useBookingActions();
  const { cars: myCars, refetch: refetchMyCars } = useProviderCars(user?.email);

  const [formData, setFormData] = useState({
    carName: '',
    description: '',
    category: 'Sedan',
    rentPrice: '',
    location: '',
    imageUrl: ''
  });

  // CREATE - Add a new car
  const handleCreateCar = async (e) => {
    e.preventDefault();
    try {
      await addCar(formData);
      // Reset form
      setFormData({
        carName: '',
        description: '',
        category: 'Sedan',
        rentPrice: '',
        location: '',
        imageUrl: ''
      });
      refetch(); // Refresh car list
      refetchMyCars(); // Refresh my listings
    } catch (error) {
      console.error('Create error:', error);
    }
  };

  // UPDATE - Edit a car
  const handleUpdateCar = async (carId) => {
    try {
      const updatedData = {
        carName: 'Updated Car Name',
        rentPrice: 150
      };
      await editCar(carId, updatedData);
      refetch(); // Refresh car list
      refetchMyCars(); // Refresh my listings
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  // DELETE - Remove a car
  const handleDeleteCar = async (carId) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await removeCar(carId);
        refetch(); // Refresh car list
        refetchMyCars(); // Refresh my listings
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  // BOOK - Book a car
  const handleBookCar = async (carId) => {
    try {
      await bookCar(carId);
      refetch(); // Refresh car list to show updated availability
    } catch (error) {
      console.error('Booking error:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">CRUD Operations Example</h1>

      {/* CREATE FORM */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4">Add New Car</h2>
        <form onSubmit={handleCreateCar} className="space-y-4">
          <input
            type="text"
            placeholder="Car Name"
            value={formData.carName}
            onChange={(e) => setFormData({ ...formData, carName: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <textarea
            placeholder="Description (min 20 characters)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
            rows="3"
            required
          />
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Luxury">Luxury</option>
            <option value="Electric">Electric</option>
          </select>
          <input
            type="number"
            placeholder="Rent Price (per day)"
            value={formData.rentPrice}
            onChange={(e) => setFormData({ ...formData, rentPrice: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="url"
            placeholder="Image URL"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <button
            type="submit"
            disabled={actionLoading}
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary disabled:opacity-50"
          >
            {actionLoading ? 'Adding...' : 'Add Car'}
          </button>
        </form>
      </div>

      {/* READ - Display all cars */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4">All Cars</h2>
        {loading ? (
          <p>Loading cars...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cars.map((car) => (
              <div key={car._id} className="border rounded-lg p-4">
                <img
                  src={car.imageUrl}
                  alt={car.carName}
                  className="w-full h-48 object-cover rounded-lg mb-2"
                />
                <h3 className="font-bold text-lg">{car.carName}</h3>
                <p className="text-gray-600">{car.category}</p>
                <p className="text-primary font-bold">${car.rentPrice}/day</p>
                <p className="text-sm text-gray-500">{car.location}</p>
                <span
                  className={`inline-block px-2 py-1 rounded text-xs ${
                    car.availabilityStatus === 'Available'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {car.availabilityStatus}
                </span>

                {/* Action buttons */}
                <div className="mt-4 space-x-2">
                  {user?.email === car.providerEmail ? (
                    <>
                      <button
                        onClick={() => handleUpdateCar(car._id)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteCar(car._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    car.availabilityStatus === 'Available' && (
                      <button
                        onClick={() => handleBookCar(car._id)}
                        disabled={bookingLoading}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                      >
                        Book Now
                      </button>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* My Listings */}
      {user && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">My Listings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myCars.map((car) => (
              <div key={car._id} className="border rounded-lg p-4">
                <h3 className="font-bold">{car.carName}</h3>
                <p className="text-gray-600">{car.category}</p>
                <p className="text-primary font-bold">${car.rentPrice}/day</p>
                <span
                  className={`inline-block px-2 py-1 rounded text-xs ${
                    car.availabilityStatus === 'Available'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {car.availabilityStatus}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CRUDExample;
