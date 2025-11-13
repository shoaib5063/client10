import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import { useFeaturedCars } from '../hooks/useCars';
import CarCard from '../components/CarCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const { cars: featuredCars, loading } = useFeaturedCars();

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <div 
        className="relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'linear-gradient(rgba(37, 99, 235, 0.85), rgba(30, 64, 175, 0.85)), url(https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=80)',
          minHeight: '600px'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Find Your{' '}
              <span className="text-yellow-300">
                <Typewriter
                  words={['Perfect Ride', 'Dream Car', 'Next Adventure', 'Ideal Vehicle']}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
            </h1>
            <p className="text-2xl md:text-3xl mb-10 text-gray-100 font-light">
              Rent premium cars from trusted providers at unbeatable rates
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Link
                to="/browse-cars"
                className="group relative px-12 py-5 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 rounded-2xl font-extrabold text-xl hover:from-yellow-300 hover:to-orange-400 transition-all transform hover:scale-110 shadow-2xl hover:shadow-yellow-500/50 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <span className="text-3xl">🚗</span>
                  <span>Browse Cars</span>
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </Link>
              <Link
                to="/add-car"
                className="group relative px-12 py-5 bg-gradient-to-r from-emerald-400 to-cyan-500 text-gray-900 rounded-2xl font-extrabold text-xl hover:from-emerald-300 hover:to-cyan-400 transition-all transform hover:scale-110 shadow-2xl hover:shadow-emerald-500/50 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <span className="text-3xl">💼</span>
                  <span>List Your Car</span>
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Featured Cars Section */}
      {loading ? (
        <div className="py-16">
          <LoadingSpinner />
        </div>
      ) : featuredCars.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-extrabold text-center mb-4 text-gray-900">
              Featured Cars
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Check out our newest and most popular vehicles
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCars.slice(0, 6).map((car, index) => (
                <motion.div
                  key={car._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <CarCard car={car} />
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                to="/browse-cars"
                className="inline-block px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-secondary transition-all transform hover:scale-105 shadow-lg"
              >
                View All Cars →
              </Link>
            </div>
          </motion.div>
        </div>
      )}

      {/* Features Section */}
      <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-24 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Why Choose Us
              </h2>
              <p className="text-2xl text-gray-600 font-light">
                Experience the best car rental service
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: '⚡',
                  title: 'Easy Booking',
                  description: 'Book your car in just a few clicks with our simple process',
                  gradient: 'from-yellow-400 to-orange-500'
                },
                {
                  icon: '💰',
                  title: 'Affordable Rates',
                  description: 'Competitive pricing for all budgets without hidden fees',
                  gradient: 'from-green-400 to-emerald-500'
                },
                {
                  icon: '🛡️',
                  title: 'Trusted Providers',
                  description: 'Verified car owners you can trust with quality vehicles',
                  gradient: 'from-blue-400 to-cyan-500'
                },
                {
                  icon: '🌟',
                  title: '24/7 Support',
                  description: "We're here to help anytime you need assistance",
                  gradient: 'from-purple-400 to-pink-500'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -15, scale: 1.05 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                  <div className="relative bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-gray-100">
                    <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center text-4xl shadow-lg transform group-hover:rotate-12 transition-transform`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                    <p className="text-base text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-24 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-extrabold mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-blue-100">
              Numbers that speak for themselves
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { number: '1000+', label: 'Happy Customers', icon: '😊' },
              { number: '500+', label: 'Cars Available', icon: '🚗' },
              { number: '50+', label: 'Cities Covered', icon: '🌍' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                className="text-center"
              >
                <div className="inline-block bg-white/10 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-white/20">
                  <div className="text-6xl mb-4">{stat.icon}</div>
                  <div className="text-6xl md:text-7xl font-extrabold mb-3 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-2xl font-light text-blue-100">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-28 overflow-hidden">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 md:p-16 shadow-2xl border border-white/20">
              <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-white">
                Ready to Get Started?
              </h2>
              <p className="text-2xl md:text-3xl text-purple-100 mb-12 font-light">
                Join thousands of satisfied customers today
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/register"
                  className="group relative px-12 py-6 bg-white text-purple-600 rounded-2xl font-extrabold text-xl hover:bg-gray-100 transition-all transform hover:scale-110 shadow-2xl overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <span className="text-2xl">🚀</span>
                    <span>Create Free Account</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </Link>
                <Link
                  to="/browse-cars"
                  className="px-12 py-6 bg-transparent border-4 border-white text-white rounded-2xl font-extrabold text-xl hover:bg-white hover:text-purple-600 transition-all transform hover:scale-110 shadow-2xl"
                >
                  Explore Cars →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
