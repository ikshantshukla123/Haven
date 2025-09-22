import React, { useState } from 'react';
import { orderService } from '../services/orderService';

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    if (!form.name || !form.mobile || !form.details) {
      setError('All fields are required');
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
      setSuccess('Your custom gift request has been sent! We will contact you soon.');
      setForm({ name: '', mobile: '', details: '' });
    } catch (err) {
      setError('Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-primary-pink mb-6 text-center stylish-font">Custom Gift Request</h1>
        <p className="mb-6 text-gray-700 text-center">Fill out the form below to request a custom gift. Our team will contact you to discuss your requirements.</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-pink focus:border-primary-pink"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number *</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              required
              pattern="[0-9]{10,15}"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-pink focus:border-primary-pink"
              placeholder="Enter your mobile number"
            />
          </div>
          <div>
            <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">Custom Gift Details *</label>
            <textarea
              id="details"
              name="details"
              value={form.details}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-pink focus:border-primary-pink"
              placeholder="Describe your custom gift requirements"
            />
          </div>
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center">{success}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-pink text-white px-6 py-3 rounded-md hover:bg-secondary-pink transition-colors duration-200 font-semibold text-lg disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SpecialOne;
