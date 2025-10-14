import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaHeart, FaGift } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-rose-900 text-white pt-12 pb-6 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <img
                  src="/abhi.jpeg"
                  alt="Hamper Heaven Logo"
                  className="h-14 w-14 rounded-2xl shadow-lg border-2 border-rose-300/50"
                />
                <div className="absolute -inset-1 rounded-2xl border border-rose-400/30 animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-rose-200 to-pink-200 bg-clip-text text-transparent">
                  Hamper Heaven
                </h3>
                <p className="text-rose-200 text-sm">Premium Gift Experiences</p>
              </div>
            </div>
            <p className="text-rose-100 text-sm leading-relaxed max-w-xs">
              Creating unforgettable moments with beautifully crafted gift hampers that spread joy and happiness.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold mb-4 text-white flex items-center">
              <FaGift className="mr-2 text-rose-300" />
              Quick Links
            </h4>
            <div className="space-y-2 text-sm">
              <a href="/about" className="text-rose-100 hover:text-white transition-colors duration-300 block hover:translate-x-1 transform">
                About Us
              </a>
              <a href="/products" className="text-rose-100 hover:text-white transition-colors duration-300 block hover:translate-x-1 transform">
                Our Products
              </a>
              <a href="/speciality-cakes" className="text-rose-100 hover:text-white transition-colors duration-300 block hover:translate-x-1 transform">
                Special Collection
              </a>
              <a href="/contact-us" className="text-rose-100 hover:text-white transition-colors duration-300 block hover:translate-x-1 transform">
                Contact Us
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3 text-rose-100">
                <div className="w-8 h-8 bg-rose-600 rounded-full flex items-center justify-center">
                  <span className="text-xs">📞</span>
                </div>
                <div>
                  <p className="font-medium">+91 971-7150-055</p>
                  <p className="text-rose-200 text-xs">Mon-Sun: 9AM-8PM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-rose-100">
                <div className="w-8 h-8 bg-rose-600 rounded-full flex items-center justify-center">
                  <span className="text-xs">📧</span>
                </div>
                <div>
                  <p className="font-medium">pratyushrohilla6527@gmail.com</p>
                  <p className="text-rose-200 text-xs">We reply within 2 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social & Creator */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold mb-4 text-white">Connect With Us</h4>
            
            {/* Social Links */}
            <div className="flex space-x-4 mb-6">
              <a 
                href="#" 
                className="w-10 h-10 bg-rose-700 hover:bg-rose-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <FaYoutube className="text-white text-sm" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-rose-700 hover:bg-rose-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <FaInstagram className="text-white text-sm" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-rose-700 hover:bg-rose-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <FaFacebookF className="text-white text-sm" />
              </a>
            </div>

            {/* Creator Info */}
           
          </div>
        </div>

        {/* Policy Notes */}
        <div className="bg-rose-800/30 rounded-xl p-6 mb-6 border border-rose-700/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-rose-100">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-rose-600 rounded-full flex items-center justify-center">
                <span className="text-xs">ℹ️</span>
              </div>
              <p>Note: We do not have any return policy</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-rose-600 rounded-full flex items-center justify-center">
                <span className="text-xs">⏰</span>
              </div>
              <p>Note: We require at least 5 days to make products</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-rose-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-rose-200 text-sm">
              &copy; {new Date().getFullYear()} Hamper Heaven. All Rights Reserved.
            </p>
            <div className="flex space-x-6 text-rose-200 text-sm">
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="/shipping" className="hover:text-white transition-colors">Shipping Info</a>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="text-center mt-6">
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent mx-auto rounded-full"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;