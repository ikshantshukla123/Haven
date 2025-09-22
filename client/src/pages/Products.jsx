import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import { orderService } from '../services/orderService';
import { motion } from 'framer-motion';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [orderModal, setOrderModal] = useState({ open: false, product: null });
  const [orderForm, setOrderForm] = useState({ mobile: '', name: '' });
  const [orderSuccess, setOrderSuccess] = useState('');
  const [orderError, setOrderError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productService.getProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to fetch products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const openOrderModal = (product) => {
    setOrderModal({ open: true, product });
    setOrderForm({ mobile: '', name: '' });
    setOrderSuccess('');
    setOrderError('');
  };

  const closeOrderModal = () => {
    setOrderModal({ open: false, product: null });
    setOrderForm({ mobile: '', name: '' });
    setOrderSuccess('');
    setOrderError('');
  };

  const handleOrderInput = (e) => {
    setOrderForm({ ...orderForm, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setOrderSuccess('');
    setOrderError('');
    if (!orderForm.mobile) {
      setOrderError('Mobile number is required');
      return;
    }
    if (!orderForm.name) {
      setOrderError('Name is required');
      return;
    }
    try {
      await orderService.createOrder({
        productId: orderModal.product._id,
        userName: orderForm.name,
        userMobile: orderForm.mobile,
      });
      setOrderSuccess('✅ Order placed successfully! We will contact you soon.');
      setOrderForm({ mobile: '', name: '' });
    } catch (err) {
      setOrderError('❌ Failed to place order. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-pink-500 mx-auto"></div>
          <p className="mt-6 text-lg text-pink-700 font-semibold stylish-font">
            Loading our sweetest treats...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-100 font-sans">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
      
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl font-extrabold text-pink-700 stylish-font mb-4">
            Our Irresistible Collection
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Handpicked delights, crafted with love & perfection. 
            Find your perfect treat or a gift for someone special.
          </p>
        </motion.div>

       
        <div className="flex justify-end mb-8">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-52 border border-gray-300 rounded-lg px-4 py-2 
              text-gray-700 bg-white shadow-sm focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Oldest First</option>
          </select>
        </div>

       
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-5 py-4 rounded-xl mb-8">
            {error}
          </div>
        )}

       
        {sortedProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl p-12 border border-gray-200 shadow-lg">
              <h2 className="text-3xl font-bold text-pink-700 mb-4 stylish-font">
                No Products Available
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                We’re updating our inventory. Please check back soon!
              </p>
              <p className="text-base text-gray-500">
                Admins can add products from the admin panel.
              </p>
            </div>
          </div>
        ) : (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
          >
            {sortedProducts.map((product) => (
              <motion.div
                key={product._id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6 }}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm 
                  transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
              > 
                <div className="relative w-full h-74 group overflow-hidden">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-pink-100 flex items-center justify-center">
                      <span className="text-pink-500 text-lg">No Image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

               
                <div className="p-6">
                 <h3 
  className="font-bold text-black text-lg trancate stylish-font"
  title={product.name}
>
  {product.name}
</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-extrabold text-pink-600">
                      ₹ {product.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      className="text-sm text-pink-600 font-semibold hover:underline"
                      onClick={() => (window.location.href = `/products/${product._id}`)}
                    >
                      View Details
                    </button>
                    <button
                      className="bg-pink-500 text-white px-5 py-2 rounded-lg 
                        hover:bg-pink-600 transition-colors duration-300 font-semibold text-sm shadow-md"
                      onClick={() => openOrderModal(product)}
                    >
                      ORDER ONLINE
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

     
      {orderModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative"
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-pink-600 text-2xl font-bold"
              onClick={closeOrderModal}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center stylish-font">
              Order: {orderModal.product?.name}
            </h2>
            <form onSubmit={handleOrderSubmit} className="space-y-5">
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number <span className="text-pink-600">*</span>
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={orderForm.mobile}
                  onChange={handleOrderInput}
                  required
                  pattern="[0-9]{10,15}"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                  placeholder="Enter your mobile number"
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-pink-600">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={orderForm.name}
                  onChange={handleOrderInput}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                  placeholder="Enter your name"
                />
              </div>
              {orderError && <div className="text-red-600 text-sm text-center">{orderError}</div>}
              {orderSuccess && <div className="text-green-600 text-sm text-center">{orderSuccess}</div>}
              <button
                type="submit"
                className="w-full bg-pink-500 text-white px-6 py-3 rounded-lg 
                  hover:bg-pink-600 transition-colors duration-300 font-semibold text-lg shadow-md"
              >
                Place Order
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Products;
