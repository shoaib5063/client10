# Car Rental Platform - Frontend

A modern, responsive car rental platform built with React, Vite, and Tailwind CSS.

## 🚀 Features

- **User Authentication**: Firebase Authentication with email/password and Google OAuth
- **Car Browsing**: Browse and search available cars with advanced filtering
- **Car Management**: Add, update, and delete car listings
- **Booking System**: Book cars and manage your bookings
- **Responsive Design**: Beautiful UI that works on all devices
- **Modern Animations**: Smooth animations using Framer Motion
- **Real-time Updates**: Live data synchronization

## 🛠️ Tech Stack

- **React 18+** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Firebase** - Authentication
- **Framer Motion** - Animation library
- **React Hot Toast** - Toast notifications
- **SweetAlert2** - Beautiful alerts
- **Axios** - HTTP client

## 📋 Prerequisites

- Node.js 16+ and npm/yarn
- Firebase project with Authentication enabled
- Backend API running (see server repository)

## 🔧 Installation

1. Clone the repository:
```bash
git clone <your-client-repo-url>
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in the root directory:
```env
VITE_API_URL=https://server10-mu.vercel.app/api
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
client/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── CarCard.jsx
│   │   ├── Footer.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── Modal.jsx
│   │   └── Navbar.jsx
│   ├── context/         # React Context
│   │   └── AuthContext.jsx
│   ├── firebase/        # Firebase configuration
│   │   └── config.js
│   ├── hooks/           # Custom React hooks
│   │   ├── useBookings.js
│   │   └── useCars.js
│   ├── pages/           # Page components
│   │   ├── AddCar.jsx
│   │   ├── BrowseCars.jsx
│   │   ├── CarDetails.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── MyBookings.jsx
│   │   ├── MyListings.jsx
│   │   └── Register.jsx
│   ├── services/        # API services
│   │   └── carService.js
│   ├── App.tsx          # Main app component
│   ├── index.css        # Global styles
│   └── main.tsx         # Entry point
├── .env.example         # Environment variables template
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## 🔑 Environment Variables

Create a `.env` file based on `.env.example`:

- `VITE_API_URL` - Backend API URL (default: https://server10-mu.vercel.app/api)
- `VITE_FIREBASE_API_KEY` - Firebase API key
- `VITE_FIREBASE_AUTH_DOMAIN` - Firebase auth domain
- `VITE_FIREBASE_PROJECT_ID` - Firebase project ID
- `VITE_FIREBASE_STORAGE_BUCKET` - Firebase storage bucket
- `VITE_FIREBASE_MESSAGING_SENDER_ID` - Firebase messaging sender ID
- `VITE_FIREBASE_APP_ID` - Firebase app ID

## 🎨 Features Overview

### Authentication
- Email/password registration and login
- Google OAuth integration
- Password validation (6+ chars, uppercase, lowercase)
- Protected routes for authenticated users

### Car Management
- Add new car listings with images
- Update existing listings
- Delete listings with confirmation
- View all your listings

### Car Browsing
- Browse all available cars
- Filter by category
- Search by car name
- Sort by price
- View detailed car information

### Booking System
- Book available cars
- View booking history
- Track booking status
- Availability indicators

### UI/UX
- Responsive design for all devices
- Smooth animations and transitions
- Loading states and error handling
- Toast notifications for user feedback
- Beautiful gradient designs
- Glassmorphism effects

## 🚀 Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## 🧪 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔗 Backend Repository

This frontend requires the backend API to be running. See the server repository for setup instructions.

Backend API should be running at: `http://localhost:5000`

## 📝 API Endpoints Used

- `GET /api/cars` - Get all cars
- `GET /api/cars/:id` - Get car by ID
- `POST /api/cars` - Create new car
- `PUT /api/cars/:id` - Update car
- `DELETE /api/cars/:id` - Delete car
- `GET /api/cars/provider/:email` - Get cars by provider
- `POST /api/bookings` - Create booking
- `GET /api/bookings/user/:email` - Get user bookings

## 🎯 Key Features

### Modern Design
- Gradient backgrounds throughout
- Animated blob effects
- Glassmorphism UI elements
- Smooth hover animations
- Responsive grid layouts

### User Experience
- Typewriter effect on hero section
- Staggered animations for cards
- Loading spinners during operations
- Success/error toast notifications
- Confirmation dialogs for destructive actions

### Performance
- Optimized with Vite
- Code splitting with React Router
- Lazy loading for images
- Efficient state management
- Custom hooks for data fetching

## 🐛 Troubleshooting

### CORS Issues
Make sure the backend server has CORS enabled for your frontend URL.

### Firebase Authentication Errors
- Verify Firebase configuration in `.env`
- Check Firebase console for enabled authentication methods
- Ensure authorized domains are configured

### API Connection Issues
- Verify backend server is running
- Check `VITE_API_URL` in `.env`
- Ensure network connectivity

## 📄 License

This project is licensed under the MIT License.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Support

For support, email your-email@example.com or open an issue in the repository.

## 🙏 Acknowledgments

- React team for the amazing library
- Tailwind CSS for the utility-first CSS framework
- Firebase for authentication services
- All open-source contributors
