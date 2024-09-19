
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import AdminLogin from './AdminLogin';
import UserLogin from './UserLogin';
import UserDashboard from './UserDashboard';
import Register from './Register';
import BookSlot from './BookSlot';
import Dashboard from './Dashboard';
import Slots from './Slots';
import AdminTracking from './AdminTracking';
import UserBookingHistory from './User Booking History';
import Payment from './Payment';
import Profile from './Profile';
import TotalEarnings from './TotalEarnings';
import Gallery from './Gallery';
import AdminFinal from './AdminFinal';
import ExtendedPaymentPage from './ExtendedPaymentPage';
import PaymentPages from './PaymentPages';


function App() {
  return (
    <Router>
      <Routes>
      {/* <Route path="/" element={<Gallery />} /> */}

        <Route path="/" element={<LandingPage />} />
        <Route path="/gallery" element={<Gallery />} />

    <Route path="/userlogin" element={<UserLogin />} /> 
        <Route path="/adminlogin" element={<AdminLogin />} /> 
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book-slot" element={<BookSlot />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/slots" element={<Slots />} />
        <Route path="/admintracking" element={<AdminTracking />} />
        <Route path="/userbookinghistory" element={<UserBookingHistory />} />

        <Route path="/payment" element={<Payment />} />

        <Route path="/profile" element={<Profile />} />
        
        <Route path="/total-earnings" element={<TotalEarnings />} />
        
        <Route path="/bookings" element={<AdminFinal />} />
        <Route path="/extended-payment" element={<ExtendedPaymentPage />} />

        <Route path="/paymentpages" element={<PaymentPages />} />



      </Routes>
    </Router>
  );
}

export default App;
