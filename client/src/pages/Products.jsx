import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { productService } from '../services/productService';
import { orderService } from '../services/orderService';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

/** CONFIG: put your cloud name here */
const CLOUD_NAME = 'your-cloud-name'; // <- replace

/* Helper: returns transformed Cloudinary URL.
   Accepts either a full Cloudinary URL or a public id.
*/
function cloudinaryTransformed(urlOrId, w = 600) {
  if (!urlOrId) return '';
  // if it's a full URL and contains '/upload/', inject transformation after '/upload/'
  try {
    if (urlOrId.startsWith('http') && urlOrId.includes('/upload/')) {
      return urlOrId.replace('/upload/', `/upload/f_auto,q_auto,w_${w}/`);
    }
  } catch (e) {}
  // otherwise assume it's public id
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,w_${w}/${urlOrId}`;
}

function srcSetFor(urlOrId) {
  const widths = [320, 480, 768, 1024, 1400];
  return widths.map((w) => `${cloudinaryTransformed(urlOrId, w)} ${w}w`).join(', ');
}

const ITEMS_PER_BATCH = 10;


const ProductCard = React.memo(function ProductCard({ product, onView, onOrder }) {
  return (
    <motion.div
      key={product._id}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.45 }}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
    >
      <div className="relative w-full aspect-[3/4] group overflow-hidden"> 
        {product.imageUrl ? (
          <LazyLoadImage
            alt={product.name}
            src={cloudinaryTransformed(product.imageUrl, 600)}
            srcSet={srcSetFor(product.imageUrl)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            effect="blur"
            loading="lazy"
            wrapperClassName="w-full h-full"
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
        <h3 className="font-bold text-black text-lg truncate stylish-font" title={product.name}>
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">
          {product.description}
        </p>

        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-extrabold text-pink-600">₹ {product.price.toLocaleString()}</span>
        </div>

        <div className="flex justify-between items-center">
          <button
            className="text-sm text-pink-600 font-semibold hover:underline"
            onClick={() => onView(product._id)}
          >
            View Details
          </button>
          <button
            className="bg-pink-500 text-white px-5 py-2 rounded-lg hover:bg-pink-600 transition-colors duration-300 font-semibold text-sm shadow-md"
            onClick={() => onOrder(product)}
          >
            ORDER ONLINE
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

  const [orderModal, setOrderModal] = useState({ open: false, product: null });
  const [orderForm, setOrderForm] = useState({ mobile: '', name: '' });
  const [orderSuccess, setOrderSuccess] = useState('');
  const [orderError, setOrderError] = useState('');

  /* Progressive rendering state */
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

  /* Memoize sorting so we don't re-sort on every render */
  const sortedProducts = useMemo(() => {
    const arr = [...products];
    arr.sort((a, b) => {
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
    return arr;
  }, [products, sortBy]);


  useEffect(() => {
    setVisibleCount(ITEMS_PER_BATCH);
  }, [products.length, sortBy]);

 
  useEffect(() => {
    const sentinel = loadMoreRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCount((v) => Math.min(v + ITEMS_PER_BATCH, sortedProducts.length));
          }
        });
      },
      { rootMargin: '200px' }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [sortedProducts.length]);

  /* Handlers */
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
    } catch (err) {
      setOrderError('❌ Failed to place order. Please try again.');
    }
  };

  const viewDetails = (id) => {
    window.location.href = `/products/${id}`;
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

  const visibleProducts = sortedProducts.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-100 font-sans">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
     
        <div className="flex justify-end mb-8">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-52 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 bg-white shadow-sm focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Oldest First</option>
          </select>
        </div>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-5 py-4 rounded-xl mb-8">{error}</div>}

        {sortedProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl p-12 border border-gray-200 shadow-lg">
              <h2 className="text-3xl font-bold text-pink-700 mb-4 stylish-font">No Products Available</h2>
              <p className="text-lg text-gray-600 mb-4">We’re updating our inventory. Please check back soon!</p>
            </div>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
          >
            {visibleProducts.map((product) => (
              <ProductCard key={product._id} product={product} onView={viewDetails} onOrder={openOrderModal} />
            ))}
          </motion.div>
        )}

    
        <div ref={loadMoreRef} />

   
        {visibleCount < sortedProducts.length && (
          <div className="text-center mt-8">
            <button
              onClick={() => setVisibleCount((v) => Math.min(v + ITEMS_PER_BATCH, sortedProducts.length))}
              className="px-6 py-2 rounded-lg bg-pink-500 text-white shadow-md"
            >
              Load more
            </button>
          </div>
        )}
      </div>

   
      {orderModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }} className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-pink-600 text-2xl font-bold" onClick={closeOrderModal} aria-label="Close">
              &times;
            </button>
            <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center stylish-font">Order: {orderModal.product?.name}</h2>
            <form onSubmit={handleOrderSubmit} className="space-y-5">
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number <span className="text-pink-600">*</span></label>
                <input type="tel" id="mobile" name="mobile" value={orderForm.mobile} onChange={handleOrderInput} required pattern="[0-9]{10,15}" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400" placeholder="Enter your mobile number" />
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name <span className="text-pink-600">*</span></label>
                <input type="text" id="name" name="name" value={orderForm.name} onChange={handleOrderInput} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400" placeholder="Enter your name" />
              </div>
              {orderError && <div className="text-red-600 text-sm text-center">{orderError}</div>}
              {orderSuccess && <div className="text-green-600 text-sm text-center">{orderSuccess}</div>}
              <button type="submit" className="w-full bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors duration-300 font-semibold text-lg shadow-md">Place Order</button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Products;
