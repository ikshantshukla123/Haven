import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import { useParams, useNavigate } from 'react-router-dom';
import { orderService } from '../services/orderService';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [orderModal, setOrderModal] = useState(false);
  const [orderForm, setOrderForm] = useState({ mobile: '', name: '' });
  const [orderSuccess, setOrderSuccess] = useState('');
  const [orderError, setOrderError] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Mock multiple images for demonstration
  const productImages = product?.imageUrl ? 
    [product.imageUrl, product.imageUrl, product.imageUrl] : [];

  const openOrderModal = () => {
    setOrderModal(true);
    setOrderForm({ mobile: '', name: '' });
    setOrderSuccess('');
    setOrderError('');
  };

  const closeOrderModal = () => {
    setOrderModal(false);
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
    if (!orderForm.mobile) return setOrderError('Mobile number is required');
    if (!orderForm.name) return setOrderError('Name is required');

    try {
      await orderService.createOrder({
        productId: product._id,
        userName: orderForm.name,
        userMobile: orderForm.mobile,
        quantity: quantity
      });
      setOrderSuccess('✅ Order placed successfully! We will contact you soon.');
      setOrderForm({ mobile: '', name: '' });
      setTimeout(() => {
        closeOrderModal();
      }, 2000);
    } catch {
      setOrderError('❌ Failed to place order. Please try again.');
    }
  };

  useEffect(() => {
    fetchProductDetails();
    fetchRelatedProducts();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const data = await productService.getProductById(id);
      setProduct(data);
    } catch {
      setError('Failed to fetch product details');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async () => {
    try {
      const allProducts = await productService.getProducts();
      const filtered = allProducts.filter((p) => p._id !== id);
      const shuffled = filtered.sort(() => 0.5 - Math.random());
      setRelatedProducts(shuffled.slice(0, 4));
    } catch {}
  };

  const handleBackToProducts = () => navigate('/products');
  const handleRelatedProductClick = (productId) => navigate(`/products/${productId}`);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-lg shadow-sm border text-center max-w-md w-full">
          <h2 className="text-xl text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'This product does not exist.'}</p>
          <button
            onClick={handleBackToProducts}
            className="px-6 py-2 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-600"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Simple Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={handleBackToProducts}
            className="flex items-center text-pink-600 hover:text-pink-700 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Products
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 p-4 lg:p-6">
            {/* Image Gallery - Fixed for Mobile */}
            <div className="space-y-4">
              <div className="bg-white border rounded-lg overflow-hidden flex items-center justify-center h-[300px] sm:h-[400px] lg:h-[500px]">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-contain p-4"
                />
              </div>
              <div className="flex space-x-2 justify-center overflow-x-auto py-2">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 border-2 rounded-md overflow-hidden ${
                      selectedImage === index ? 'border-pink-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              </div>

              <div className="border-t border-b py-4">
                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl lg:text-4xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                  <span className="text-lg text-gray-500 line-through">₹{(product.price * 1.2).toLocaleString()}</span>
                  <span className="text-sm bg-green-100 text-green-800 font-medium px-2 py-1 rounded">20% OFF</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">Inclusive of all taxes</p>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-3">
                <label className="text-lg font-semibold text-gray-900">Quantity:</label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 text-xl font-bold"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xl font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 text-xl font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 pt-4">
                <button
                  onClick={openOrderModal}
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white py-4 px-8 rounded-lg font-bold text-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                >
                  🛒 BUY NOW - ₹{(product.price * quantity).toLocaleString()}
                </button>
                
                {/* Additional Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Easy Returns</span>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="border-2 border-pink-100 rounded-xl p-4 bg-pink-50">
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-pink-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <span className="font-semibold text-gray-900">Delivery Information:</span>
                    <p className="text-gray-700 mt-1 text-sm">Order 5 days in advance for guaranteed delivery. Contact us for customization options after ordering.</p>
                  </div>
                </div>
              </div>

              {/* Quick Features */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Why Choose This Product?</h3>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    "✨ Premium Quality Materials",
                    "🎨 Customization Available", 
                    "🔒 Secure Online Ordering",
                    "🚚 5-Day Advance Order",
                    "⭐ Trusted by 1000+ Customers"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-pink-500 rounded-full flex-shrink-0"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="border-t mt-8">
            <div className="p-4 lg:p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Details</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Description</h3>
                  <p className="text-gray-600 leading-relaxed text-base lg:text-lg">{product.description}</p>
                </div>
               
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Customers Also Bought</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct._id}
                  className="bg-white rounded-xl border-2 border-gray-100 hover:border-pink-300 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => handleRelatedProductClick(relatedProduct._id)}
                >
                  <div className="aspect-square bg-gray-50 rounded-t-xl overflow-hidden">
                    {relatedProduct.imageUrl ? (
                      <img
                        src={relatedProduct.imageUrl}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-3 lg:p-4">
                    <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 h-10">{relatedProduct.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">
                        ₹{relatedProduct.price.toLocaleString()}
                      </span>
                      <button className="bg-pink-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-pink-600 transition-colors">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Order Modal */}
        {orderModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
            <div className="bg-white p-4 lg:p-6 rounded-xl shadow-2xl w-full max-w-md border border-gray-200 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Complete Your Order</h2>
                <button
                  onClick={closeOrderModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              
              <div className="bg-pink-50 rounded-lg p-3 lg:p-4 mb-4">
                <div className="flex items-center space-x-3">
                  <img 
                    src={productImages[0]} 
                    alt={product.name}
                    className="w-14 h-14 lg:w-16 lg:h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm lg:text-base">{product.name}</h3>
                    <p className="text-lg font-bold text-pink-600">₹{(product.price * quantity).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleOrderSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={orderForm.name}
                    onChange={handleOrderInput}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={orderForm.mobile}
                    onChange={handleOrderInput}
                    placeholder="Enter your mobile number"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                    required
                    pattern="[0-9]{10}"
                    maxLength="10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 lg:w-12 lg:h-12 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 text-xl font-bold"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xl font-bold">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 lg:w-12 lg:h-12 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 text-xl font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                {orderError && (
                  <p className="text-red-600 text-sm bg-red-50 py-3 px-4 rounded-lg border border-red-200">{orderError}</p>
                )}
                {orderSuccess && (
                  <p className="text-green-600 text-sm bg-green-50 py-3 px-4 rounded-lg border border-green-200">{orderSuccess}</p>
                )}
                
                <div className="flex space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={closeOrderModal}
                    className="flex-1 py-3 px-4 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-lg font-bold hover:shadow-lg transition-all"
                  >
                    Place Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;