import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinkClass = (path) =>
    `relative py-2 px-4 font-medium rounded-lg transition-all duration-300 overflow-hidden ${
      location.pathname === path
        ? "bg-pink-700 text-white shadow-md"
        : "text-brown-700 hover:text-blue-900 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-900 after:transition-all after:duration-300 hover:after:w-full"
    }`;

  const mobileNavLinkClass = (path) =>
    `block py-3 px-4 text-lg font-medium transition-colors duration-300 ${
      location.pathname === path
        ? "text-white bg-pink-900"
        : "text-brown-800 hover:text-white hover:bg-blue-800"
    }`;

  return (
    <nav className="sticky top-0 z-50 font-sans 
      bg-pink-200/20 backdrop-blur-md shadow-lg border border-pink-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

         
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="p-2 rounded-md border border-pink-400/60 bg-white/20 
                         text-brown-800 hover:bg-blue-900 hover:text-white 
                         transition duration-300 shadow-md"
            >
              <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} className="text-xl" />
            </button>
          </div>

         
          <div className="flex flex-col items-center md:items-start text-center md:text-left ml-4">
            <Link to="/">
             <img
              src="/abhi.jpeg"
              alt="Logo"
              className="h-12 rounded-full shadow-lg border-2 border-pink-300/50"
            /></Link>
           
          </div>

       
          <div className="hidden lg:flex flex-1 justify-center items-center space-x-10">
            <Link to="/about" className={navLinkClass("/about")}>ABOUT US</Link>
            <Link to="/products" className={navLinkClass("/products")}>PRODUCTS</Link>
            <Link to="/speciality-cakes" className={navLinkClass("/speciality-cakes")}>SPECIAL ONE</Link>
            <Link to="/contact-us" className={navLinkClass("/contact-us")}>CONTACT US</Link>
          </div>

        
          <div className="flex items-center ml-auto space-x-3">
            {user && user.isAdmin && (
              <Link
                to="/admin"
                className="bg-pink-700 text-white px-4 py-2 rounded-md font-semibold hover:bg-pink-900 transition-colors duration-200 shadow-lg border border-pink-900"
              >
                Admin Panel
              </Link>
            )}
            {user && user.isAdmin ? (
              <button
                onClick={handleLogout}
                className="bg-pink-400/60 text-white px-4 py-2 rounded-md font-semibold 
                           hover:bg-pink-900 transition-colors duration-200 shadow-lg"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/admin" 
                className="bg-pink-400/60 text-white px-4 py-2 rounded-md font-semibold 
                           hover:bg-pink-900 transition-colors duration-200 shadow-lg"
              >
                Admin
              </Link>
            )}
          </div>
        </div>
      </div>

     
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 
                        bg-pink-200/20 backdrop-blur-md border-t border-pink-200/40 shadow-lg">
          <Link to="/about" className={mobileNavLinkClass("/about")} onClick={() => setIsMobileMenuOpen(false)}>ABOUT US</Link>
          <Link to="/products" className={mobileNavLinkClass("/products")} onClick={() => setIsMobileMenuOpen(false)}>PRODUCTS</Link>
          <Link to="/speciality-cakes" className={mobileNavLinkClass("/speciality-cakes")} onClick={() => setIsMobileMenuOpen(false)}>SPECIAL ONE</Link>
          <Link to="/contact-us" className={mobileNavLinkClass("/contact-us")} onClick={() => setIsMobileMenuOpen(false)}>CONTACT US</Link>

          <div className="pt-2 border-t border-gray-200/50">
            {user && user.isAdmin ? (
              <button
                onClick={handleLogout}
                className="block w-full text-center bg-pink-400/60 text-white px-4 py-2 rounded-md font-semibold 
                           hover:bg-blue-900 transition-colors duration-200 mt-2"
              >
                Logout
              </button>
            ) : (
              <Link to="/admin" className="block text-center bg-pink-400/60 text-white px-4 py-2 rounded-md font-semibold 
                                          hover:bg-blue-900 transition-colors duration-200 mt-2">
                Admin
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
