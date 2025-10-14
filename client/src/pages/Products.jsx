import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { productService } from '../services/productService';
import { orderService } from '../services/orderService';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

/** CONFIG: put your cloud name here */
const CLOUD_NAME = 'your-cloud-name'; // <- replace

/* Optimized Cloudinary helper with mobile-first approach */
function cloudinaryTransformed(urlOrId, w = 400, q = 'auto') {
  if (!urlOrId) return '';
  
  try {
    if (urlOrId.startsWith('http') && urlOrId.includes('/upload/')) {
      return urlOrId.replace('/upload/', `/upload/f_webp,q_${q},w_${w}/`);
    }
  } catch (e) {}
  
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_webp,q_${q},w_${w}/${urlOrId}`;
}

/* Mobile-optimized srcSet with smaller sizes */
function srcSetFor(urlOrId) {
  const widths = [200, 320, 480, 640, 800, 1024];
  return widths.map((w) => {
    const quality = w <= 480 ? '70' : 'auto';
    return `${cloudinaryTransformed(urlOrId, w, quality)} ${w}w`;
  }).join(', ');
}

const ITEMS_PER_BATCH = 8;

const ProductCard = React.memo(function ProductCard({ product, onView, onOrder }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <motion.div
      key={product._id}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group border border-pink-100"
    >
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gradient-to-br from-pink-50 to-rose-50"> 
        {product.imageUrl ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
              </div>
            )}
            
            <LazyLoadImage
              alt={product.name}
              src={cloudinaryTransformed(product.imageUrl, 400, '70')}
              srcSet={srcSetFor(product.imageUrl)}
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 23vw"
              effect="blur"
              threshold={100}
              wrapperClassName="w-full h-full"
              className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <div className="w-16 h-16 bg-pink-200 rounded-2xl flex items-center justify-center mb-3">
              <span className="text-2xl text-pink-500">🎁</span>
            </div>
            <span className="text-pink-500 text-sm font-medium text-center">Image Coming Soon</span>
          </div>
        )}
        
        {/* Price badge */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
          <span className="text-pink-600 font-bold text-sm">₹{product.price.toLocaleString()}</span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1 group-hover:text-pink-700 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px] leading-relaxed">
          {product.description}
        </p>

        <div className="flex justify-between items-center gap-3">
          <button
            onClick={() => onView(product._id)}
            className="flex-1 text-pink-600 hover:text-pink-700 font-semibold text-sm py-2 rounded-lg hover:bg-pink-50 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Details
          </button>
          <button
            onClick={() => onOrder(product)}
            className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-sm py-2 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            ORDER NOW
          </button>
        </div>
      </div>
    </motion.div>
  );
});

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');

  const [orderModal, setOrderModal] = useState({ open: false, product: null });
  const [orderForm, setOrderForm] = useState({ mobile: '', name: '' });
  const [orderSuccess, setOrderSuccess] = useState('');
  const [orderError, setOrderError] = useState('');

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_BATCH);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await productService.getProducts();
      setProducts(data || []);
    } catch (err) {
      setError('Failed to fetch products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    const sorted = [...filtered];
    sorted.sort((a, b) => {
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
    return sorted;
  }, [products, sortBy, searchTerm]);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_BATCH);
  }, [filteredAndSortedProducts.length, sortBy, searchTerm]);

  useEffect(() => {
    const sentinel = loadMoreRef.current;
    if (!sentinel || visibleCount >= filteredAndSortedProducts.length) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCount((v) => Math.min(v + ITEMS_PER_BATCH, filteredAndSortedProducts.length));
          }
        });
      },
      { rootMargin: '300px' }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [filteredAndSortedProducts.length, visibleCount]);

  const openOrderModal = useCallback((product) => {
    setOrderModal({ open: true, product });
    setOrderForm({ mobile: '', name: '' });
    setOrderSuccess('');
    setOrderError('');
  }, []);

  const closeOrderModal = useCallback(() => {
    setOrderModal({ open: false, product: null });
    setOrderForm({ mobile: '', name: '' });
    setOrderSuccess('');
    setOrderError('');
  }, []);

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
      setTimeout(closeOrderModal, 2000);
    } catch (err) {
      setOrderError('❌ Failed to place order. Please try again.');
    }
  };

  const viewDetails = (id) => {
    window.location.href = `/products/${id}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">🎁</span>
            </div>
          </div>
          <p className="mt-6 text-lg text-pink-700 font-semibold">
            Loading our beautiful collection...
          </p>
        </div>
      </div>
    );
  }

  const visibleProducts = filteredAndSortedProducts.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-600 text-white py-12">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4 stylish-font">
            Our Premium Collection
          </h1>
          <p className="text-lg text-pink-100 max-w-2xl mx-auto">
            Discover beautifully crafted hampers for every special occasion
          </p>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-pink-100">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            {/* Search Bar */}
            <div className="flex-1 w-full sm:max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-48 border border-gray-300 rounded-xl px-4 py-3 text-gray-700 bg-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm">!</span>
              </div>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl p-12 border border-pink-100 shadow-lg max-w-2xl mx-auto">
              <div className="w-24 h-24 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🎁</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {searchTerm ? 'No products found' : 'No Products Available'}
              </h2>
              <p className="text-gray-600 mb-6">
                {searchTerm 
                  ? `No products match "${searchTerm}". Try a different search term.`
                  : 'We are updating our inventory with new beautiful hampers. Please check back soon!'
                }
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="bg-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-pink-600 transition-colors"
                >
                  Clear Search
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Products Count */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {Math.min(visibleCount, filteredAndSortedProducts.length)} of {filteredAndSortedProducts.length} products
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            </div>

            {/* Products Grid */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {visibleProducts.map((product) => (
                <ProductCard 
                  key={product._id} 
                  product={product} 
                  onView={viewDetails} 
                  onOrder={openOrderModal} 
                />
              ))}
            </motion.div>

            {/* Load More */}
            <div ref={loadMoreRef} className="h-8" />

            {visibleCount < filteredAndSortedProducts.length && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setVisibleCount((v) => Math.min(v + ITEMS_PER_BATCH, filteredAndSortedProducts.length))}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300"
                >
                  Load More Products
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Order Modal */}
      {orderModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative border border-pink-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Place Your Order</h2>
                <button 
                  className="text-white hover:text-pink-200 text-2xl font-bold transition-colors"
                  onClick={closeOrderModal}
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>
              <p className="text-pink-100 mt-1">{orderModal.product?.name}</p>
            </div>
            
            {/* Form */}
            <form onSubmit={handleOrderSubmit} className="p-6 space-y-5">
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number <span className="text-pink-500">*</span>
                </label>
                <input 
                  type="tel" 
                  id="mobile" 
                  name="mobile" 
                  value={orderForm.mobile} 
                  onChange={handleOrderInput} 
                  required 
                  pattern="[0-9]{10}"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                  placeholder="Enter 10-digit mobile number" 
                />
              </div>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name <span className="text-pink-500">*</span>
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={orderForm.name} 
                  onChange={handleOrderInput} 
                  required 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                  placeholder="Enter your full name" 
                />
              </div>
              
              {orderError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-700 text-sm">{orderError}</p>
                </div>
              )}
              
              {orderSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-green-700 text-sm">{orderSuccess}</p>
                </div>
              )}
              
              <button 
                type="submit"
                disabled={orderSuccess}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:from-pink-600 hover:to-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {orderSuccess ? 'Order Placed!' : `Place Order - ₹${orderModal.product?.price.toLocaleString()}`}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Products;