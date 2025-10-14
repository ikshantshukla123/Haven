import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars, 
  faTimes, 
  faUser, 
  faCrown,
  faGem,
  faStar,
  faHeart
} from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const navLinkClass = (path) =>
    `relative py-3 px-6 font-semibold rounded-xl transition-all duration-500 group overflow-hidden ${
      location.pathname === path
        ? "text-black shadow-2xl"
        : "text-rose-800 hover:text-rose-900"
    }`;

  const mobileNavLinkClass = (path) =>
    `block py-4 px-6 text-lg font-semibold transition-all duration-300 rounded-xl mx-2 ${
      location.pathname === path
        ? "text-white bg-gradient-to-r from-rose-600 to-pink-600 shadow-lg"
        : "text-rose-800 hover:text-white hover:bg-gradient-to-r hover:from-rose-500 hover:to-pink-500"
    }`;

  const backgroundStyle = scrolled 
    ? "bg-white/95 backdrop-blur-xl shadow-2xl border-b border-rose-200/50"
    : "bg-gradient-to-r from-rose-50/95 via-pink-50/95 to-rose-100/95 backdrop-blur-lg shadow-lg border-b border-rose-200/30";

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`sticky top-0 z-50 font-sans transition-all duration-500 ${backgroundStyle}`}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="p-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 
                         text-white hover:from-rose-600 hover:to-pink-600 
                         transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <FontAwesomeIcon 
                icon={isMobileMenuOpen ? faTimes : faBars} 
                className="text-lg" 
              />
            </motion.button>
          </div>

          {/* Logo/Brand */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <img
                  src="/abhi.jpeg"
                  alt="Hamper Heaven Logo"
                  className="h-14 w-14 rounded-2xl shadow-2xl border-4 border-rose-300/50 
                             group-hover:border-rose-400/70 transition-all duration-500"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-2 rounded-2xl border-2 border-rose-400/30 border-t-rose-500/60"
                />
              </motion.div>
              <div className="hidden sm:block">
                <motion.h1 
                  className="text-2xl font-black bg-gradient-to-r from-rose-600 to-pink-600 
                             bg-clip-text text-transparent"
                  whileHover={{ scale: 1.02 }}
                >
                  Hamper Heaven
                </motion.h1>
                <p className="text-xs text-rose-500 font-medium mt-1">
                  Premium Gift Experiences
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-center items-center space-x-6">
            {[
              { path: "/about", label: "ABOUT US", icon: faHeart },
              { path: "/products", label: "PRODUCTS", icon: faGem },
              { path: "/speciality-cakes", label: "SPECIAL ONE", icon: faStar },
              { path: "/contact-us", label: "CONTACT US", icon: faUser }
            ].map((item) => (
              <motion.div
                key={item.path}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <Link 
                  to={item.path} 
                  className={navLinkClass(item.path)}
                >
                  <div className={`relative z-10 flex items-center space-x-2 ${
                    location.pathname === item.path ? 'group-hover:text-rose-400' : 'group-hover:text-rose-900'
                  }`}>
                    <FontAwesomeIcon 
                      icon={item.icon} 
                      className="text-sm" 
                    />
                    <span>{item.label}</span>
                  </div>
                  
                  {/* Animated background for active state */}
                 
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-pink-500/10 
                                  rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Admin/User Section */}
          <div className="flex items-center space-x-3">
            {user && user.isAdmin && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/admin"
                  className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-500 
                             text-white px-5 py-2.5 rounded-xl font-bold hover:from-amber-600 
                             hover:to-orange-600 transition-all duration-300 shadow-lg 
                             hover:shadow-xl border border-amber-400/50"
                >
                  <FontAwesomeIcon icon={faCrown} className="text-sm" />
                  <span>Admin Panel</span>
                </Link>
              </motion.div>
            )}
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {user && user.isAdmin ? (
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-5 py-2.5 
                             rounded-xl font-semibold hover:from-rose-600 hover:to-pink-600 
                             transition-all duration-300 shadow-lg hover:shadow-xl 
                             border border-rose-400/50"
                >
                  Logout
                </button>
              ) : (
                <Link 
                  to="/admin" 
                  className="flex items-center space-x-2 bg-gradient-to-r from-rose-500 to-pink-500 
                             text-white px-5 py-2.5 rounded-xl font-semibold 
                             hover:from-rose-600 hover:to-pink-600 transition-all duration-300 
                             shadow-lg hover:shadow-xl border border-rose-400/50"
                >
                  <FontAwesomeIcon icon={faUser} className="text-sm" />
                  <span>Admin</span>
                </Link>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden"
          >
            <div className="px-2 pt-2 pb-4 space-y-2 sm:px-3 
                          bg-gradient-to-b from-white/95 to-rose-50/95 backdrop-blur-xl 
                          border-t border-rose-200/50 shadow-2xl">
              {[
                { path: "/about", label: "ABOUT US", icon: faHeart },
                { path: "/products", label: "PRODUCTS", icon: faGem },
                { path: "/speciality-cakes", label: "SPECIAL ONE", icon: faStar },
                { path: "/contact-us", label: "CONTACT US", icon: faUser }
              ].map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    to={item.path} 
                    className={mobileNavLinkClass(item.path)}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-3">
                      <FontAwesomeIcon icon={item.icon} className="text-base" />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Admin Section */}
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="pt-4 mt-4 border-t border-rose-200/50 mx-2"
              >
                {user && user.isAdmin ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center space-x-3 w-full 
                               bg-gradient-to-r from-rose-500 to-pink-500 text-white 
                               px-4 py-3 rounded-xl font-semibold hover:from-rose-600 
                               hover:to-pink-600 transition-all duration-300 shadow-lg"
                  >
                    <FontAwesomeIcon icon={faUser} />
                    <span>Logout</span>
                  </button>
                ) : (
                  <Link 
                    to="/admin" 
                    className="flex items-center justify-center space-x-3 
                               bg-gradient-to-r from-rose-500 to-pink-500 text-white 
                               px-4 py-3 rounded-xl font-semibold hover:from-rose-600 
                               hover:to-pink-600 transition-all duration-300 shadow-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FontAwesomeIcon icon={faUser} />
                    <span>Admin Login</span>
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-400/50 to-transparent" />
    </motion.nav>
  );
};

export default Navbar;