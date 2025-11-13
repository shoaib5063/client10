import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BrowseCars from './pages/BrowseCars';
import CarDetails from './pages/CarDetails';
import AddCar from './pages/AddCar';
import MyListings from './pages/MyListings';
import MyBookings from './pages/MyBookings';
import NotFound from './pages/NotFound';

// Layout wrapper to conditionally show Navbar and Footer
function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const hideLayout = location.pathname === '/404' || location.pathname === '*';

  return (
    <>
      {!hideLayout && <Navbar />}
      <main className="min-h-screen">{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/browse-cars" element={<BrowseCars />} />

            {/* Private Routes */}
            <Route
              path="/add-car"
              element={
                <PrivateRoute>
                  <AddCar />
                </PrivateRoute>
              }
            />
            <Route
              path="/my-listings"
              element={
                <PrivateRoute>
                  <MyListings />
                </PrivateRoute>
              }
            />
            <Route
              path="/my-bookings"
              element={
                <PrivateRoute>
                  <MyBookings />
                </PrivateRoute>
              }
            />
            <Route path="/car/:id" element={<CarDetails />} />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </AuthProvider>
    </Router>
  );
}

export default App;
