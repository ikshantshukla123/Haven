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
  const [imageLoading, setImageLoading] = useState(true);

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
});
      setOrderSuccess('✅ Order placed successfully! We will contact you soon.');
      setOrderForm({ mobile: '', name: '' });
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-brown-50">
        <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-pink-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <div className="bg-white shadow-2xl p-10 rounded-2xl border border-pink-200 text-center">
          <h2 className="text-3xl text-brown-800 mb-4 font-[Playfair_Display]">
            Product Not Found
          </h2>
          <p className="text-lg text-brown-600 mb-6">{error || 'This product does not exist.'}</p>
          <button
            onClick={handleBackToProducts}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold hover:shadow-lg"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-brown-50 font-[Inter]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        
        <button
          onClick={handleBackToProducts}
          className="mb-8 flex items-center text-pink-600 hover:text-rose-700 font-semibold"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </button>

 
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
         
          <div className="relative group">
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
              </div>
            )}
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full object-cover rounded-2xl shadow-xl transition-transform duration-500 group-hover:scale-105"
                onLoad={() => setImageLoading(false)}
              />
            ) : (
              <div className="w-full h-[500px] bg-pink-100 flex items-center justify-center rounded-xl">
                <span className="text-pink-600 text-xl">No Image Available</span>
              </div>
            )}
          </div>

   
          <div className="bg-white  object-contain rounded-2xl shadow-lg p-8 border border-pink-100">
            <h1 className="text-4xl text-brown-900 mb-4 font-[Playfair_Display]">{product.name}</h1>
            <p className="text-3xl font-extrabold text-pink-600 mb-6">₹ {product.price.toLocaleString()}</p>

            <h3 className="text-xl font-semibold text-brown-800 mb-2">Description</h3>
            <p className="text-brown-700 leading-relaxed mb-6">{product.description}</p>

          

        
            <div className="mt-8 grid gap-4">
              <div className="flex items-center px-4 py-2 bg-pink-50 rounded-full text-brown-700 shadow-sm">
                <span className="mr-2 text-pink-500">🔒</span> Secure Online Ordering
              </div>
              <div className="flex items-center px-4 py-2 bg-pink-50 rounded-full text-brown-700 shadow-sm">
                <span className="mr-2 text-pink-500">⭐</span> Pocket Familier
              </div>
              <div className="flex items-center px-4 py-2 bg-pink-50 rounded-full text-brown-700 shadow-sm">
                <span className="mr-2 text-pink-500">⭐</span> Premium Quality Products

              </div>
               <div className="flex items-center px-4 py-2 bg-pink-50 rounded-full text-brown-700 shadow-sm">
                <span className="mr-2 text-pink-500">⭐</span> You can Customize Your Order contact us after ordering
                
              </div>
               <div className="flex items-center px-4 py-2 bg-pink-50 rounded-full text-brown-700 shadow-sm">
                <span className="mr-2 text-pink-500">⭐</span> No return Policy
                
                
              </div>

                <div className="flex items-center px-4 py-2 bg-pink-50 rounded-full text-brown-700 shadow-sm">
                <span className="mr-2 text-pink-500">⭐</span>Order 5 days in advance
                
                
              </div>
                <div className="flex items-center px-4 py-2 bg-pink-50 rounded-full text-brown-700 shadow-sm">
                <span className="mr-2 text-pink-500">⭐</span> Contact us to add extra
                
                
              </div>
              
            </div>
              <button
              className="w-full py-4 rounded-lg bg-gradient-to-r from-pink-500  my-3 to-rose-600 text-white font-bold text-lg shadow-md hover:shadow-xl transition-transform hover:scale-[1.02]"
              onClick={openOrderModal}
            >
              ORDER ONLINE – ₹ {product.price.toLocaleString()}
            </button>
          </div>
        </div>

       
        {orderModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md relative animate-fade-in">
              <button
                onClick={closeOrderModal}
                className="absolute top-3 right-3 text-gray-400 hover:text-pink-500 text-2xl font-bold"
              >
                ×
              </button>
              <h2 className="text-2xl text-pink-600 mb-6 text-center font-[Playfair_Display]">
                Order: {product?.name}
              </h2>
              <form onSubmit={handleOrderSubmit} className="space-y-5">
                <input
                  type="tel"
                  name="mobile"
                  value={orderForm.mobile}
                  onChange={handleOrderInput}
                  placeholder="Enter your mobile number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                  required
                  pattern="[0-9]{10,15}"
                />
                <input
                  type="text"
                  name="name"
                  value={orderForm.name}
                  onChange={handleOrderInput}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                  required
                />
                {orderError && <p className="text-red-600 text-sm text-center">{orderError}</p>}
                {orderSuccess && <p className="text-green-600 text-sm text-center">{orderSuccess}</p>}
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold hover:shadow-lg"
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>
        )}

     
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl text-brown-900 mb-10 text-center font-[Playfair_Display]">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct._id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer group border border-pink-100"
                  onClick={() => handleRelatedProductClick(relatedProduct._id)}
                >
                  <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
                    {relatedProduct.imageUrl ? (
                      <img
                        src={relatedProduct.imageUrl}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-pink-100 flex items-center justify-center">
                        <span className="text-pink-500">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-brown-900 text-lg mb-2 truncate">{relatedProduct.name}</h3>
                    <p className="text-brown-600 text-sm line-clamp-2 mb-3">{relatedProduct.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-pink-600">
                        ₹ {relatedProduct.price.toLocaleString()}
                      </span>
                      <button className="px-3 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-rose-600 text-white text-sm font-semibold hover:shadow-md">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <button
                onClick={handleBackToProducts}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-rose-600 to-pink-500 text-white font-semibold hover:shadow-lg"
              >
                View All Products
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
