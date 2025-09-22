import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 font-sans">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
       
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img
            src="/abhi.jpeg"
            alt="Logo"
            className="h-12 mb-2 rounded-full"
          />
          <p className="text-sm leading-relaxed">
            Delivering happiness across campus.
          </p>
        </div>

       
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="text-white font-semibold mb-2 text-md">Contact Us</h4>
          <div className="space-y-1 text-sm">
            <p className="flex items-center gap-2 justify-center md:justify-start">
              📞 +91 971-7150-055
            </p>
            <p className="flex items-center gap-2 justify-center md:justify-start">
              📧 pratyushrohilla6527@gmail.com
            </p>
          </div>
        </div>

       
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="text-white font-semibold mb-2 text-md">Follow Us</h4>
          <div className="flex gap-4 mb-4">
            <a href="#" className="text-gray-400 hover:text-white transition">
              <FaYoutube className="text-xl" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <FaInstagram className="text-xl" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <FaFacebookF className="text-xl" />
            </a>
          </div>

          <h4 className="text-white font-semibold mb-2 text-md">Created By</h4>
          <div className="flex items-center gap-4">
            <p className="text-sm">Ikshant shukla</p>
            <a href="https://www.linkedin.com/in/ikshant-shukla-097771327/" className="text-gray-400 hover:text-white transition">
              <FaLinkedinIn className="text-xl" />
            </a>
          </div>
        </div>
      </div>

     
      <div className="max-w-7xl mx-auto mt-8 pt-4 border-t border-gray-700 text-center text-xs">
        <p>&copy; {new Date().getFullYear()} Hamper Havens. All Rights Reserved.</p>
        <div className="mt-1 text-gray-500">
          <p>Note: We do not have any return policy.</p>
          <p>Note: We require at least 5 days to make products.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;