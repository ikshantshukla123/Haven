import React, { useState } from 'react';
import { orderService } from '../services/orderService';
import { motion } from 'framer-motion';

const SpecialOne = () => {
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    details: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear errors when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    
    if (!form.name || !form.mobile || !form.details) {
      setError('All fields are required');
      return;
    }
    
    if (form.mobile.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    try {
      await orderService.createOrder({
        userName: form.name,
        userMobile: form.mobile,
        customDetails: form.details,
        isCustom: true,
      });
      setSuccess('🎉 Your custom gift request has been sent! We will contact you within 24 hours.');
      setForm({ name: '', mobile: '', details: '' });
    } catch (err) {
      setError('❌ Failed to submit request. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 flex items-center justify-center py-8 px-4">
      <div className="max-w-2xl w-full">
        {/* Header Section */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
          >
            <span className="text-2xl text-white">🎁</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 stylish-font">
            Create Your <span className="text-transparent bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text">Special One</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Tell us about your dream gift. We'll craft something extraordinary just for you!
          </p>
        </div>

       
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-pink-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Why Custom?</h2>
                <p className="text-gray-600 leading-relaxed">
                  Our custom gifts are handcrafted with love and attention to detail. Perfect for:
                </p>
              </div>
              
              <div className="space-y-4">
                {[
                  { icon: "💝", text: "Special Occasions" },
                  { icon: "🎂", text: "Birthdays & Anniversaries" },
                  { icon: "💍", text: "Weddings & Engagements" },
                  { icon: "🏆", text: "Corporate Gifts" },
                  { icon: "🎓", text: "Graduations" },
                  { icon: "👶", text: "Baby Showers" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm">{item.icon}</span>
                    </div>
                    <span className="text-gray-700 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="bg-rose-50 rounded-xl p-4 border border-rose-200">
                <h3 className="font-semibold text-rose-800 mb-2">What happens next?</h3>
                <ul className="text-sm text-rose-700 space-y-1">
                  <li>• We'll contact you within 24 hours</li>
                  <li>• Discuss your requirements in detail</li>
                  <li>• Provide design options and pricing</li>
                  <li>• Create your perfect gift!</li>
                </ul>
              </div>
            </div>

      
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
             
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all placeholder-gray-400"
                      placeholder="Enter your full name"
                      disabled={loading}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

               
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={form.mobile}
                      onChange={handleChange}
                      required
                      pattern="[0-9]{10}"
                      maxLength="10"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all placeholder-gray-400"
                      placeholder="Enter 10-digit mobile number"
                      disabled={loading}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>

              
                <div>
                  <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-2">
                    Gift Details *
                  </label>
                  <textarea
                    id="details"
                    name="details"
                    value={form.details}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all placeholder-gray-400 resize-none"
                    placeholder="Tell us about your custom gift requirements... 
• Occasion
• Budget range
• Preferred colors
• Any specific items you'd like to include
• Special messages or themes"
                    disabled={loading}
                  />
                </div>

             
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-center">
                      <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-xs">!</span>
                      </div>
                      <p className="text-red-700 text-sm font-medium">{error}</p>
                    </div>
                  </div>
                )}

                {success && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <p className="text-green-700 text-sm font-medium">{success}</p>
                    </div>
                  </div>
                )}

               
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:from-pink-600 hover:to-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Your Special Gift...</span>
                    </div>
                  ) : (
                    'Create My Special Gift'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Need immediate assistance? Call us at <span className="text-pink-600 font-semibold">+91 971-7150-055</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpecialOne;