import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import {Analytics} from '@vercel/analytics/react';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import AdminPanel from './pages/AdminPanel';
import SpecialOne from './pages/SpecialOne';
// Scroll to top on route change and on refresh
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  return null;
};

const App = () => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-white">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
            
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/speciality-cakes" element={<SpecialOne />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </main>
          <Footer/>
         <Analytics />
        </div>
      </Router>
    </AuthProvider>
    
  );
}

export default App;
