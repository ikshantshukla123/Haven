import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { productService } from '../services/productService';
import { orderService } from '../services/orderService';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('view');
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    countInStock: '10',
    image: null,
  });

  const [editingProduct, setEditingProduct] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [deletingOrderId, setDeletingOrderId] = useState(null);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/login?redirect=/admin');
      return;
    }
    fetchProducts();
    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [isAdmin, navigate, activeTab]);

  const fetchOrders = async () => {
    setOrdersLoading(true);
    setOrdersError('');
    try {
      const data = await orderService.getOrders();
      setOrders(data);
    } catch (err) {
      setOrdersError('Failed to fetch orders');
    } finally {
      setOrdersLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const data = await productService.getProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === 'image') {
      const file = e.target.files[0];
      
      // File validation
      if (file) {
        const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
        if (file.size > MAX_FILE_SIZE) {
          setError(`File size too large! Please select an image under 5MB. Current size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
          e.target.value = '';
          return;
        }
        
        if (!file.type.startsWith('image/')) {
          setError('Please select a valid image file (JPEG, PNG, WebP, etc.)');
          e.target.value = '';
          return;
        }
        
        setFormData({ ...formData, image: file });
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    
    // Clear errors when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    setUploadProgress(0);

    // Validation
    if (!formData.name || !formData.description || !formData.price || !formData.countInStock) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (!formData.image && !editingProduct) {
      setError('Product image is required');
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('countInStock', formData.countInStock);
      
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      if (editingProduct) {
        await productService.updateProduct(editingProduct._id, formDataToSend);
        setSuccess('Product updated successfully!');
      } else {
        await productService.createProduct(formDataToSend);
        setSuccess('Product created successfully!');
      }

      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        countInStock: '10',
        image: null,
      });
      setEditingProduct(null);
      setUploadProgress(0);
      fetchProducts();
      setActiveTab('view');
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.message || 'Operation failed. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      countInStock: product.countInStock,
      image: null,
    });
    setActiveTab('create');
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(productId);
        setSuccess('Product deleted successfully!');
        fetchProducts();
      } catch (err) {
        setError('Failed to delete product');
      }
    }
  };

  const handleOrderDelete = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setDeletingOrderId(orderId);
      try {
        await orderService.deleteOrder(orderId);
        // Remove the order from local state without refreshing the page
        setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
        setSuccess('Order deleted successfully!');
      } catch (err) {
        setError('Failed to delete order');
      } finally {
        setDeletingOrderId(null);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      countInStock: '10',
      image: null,
    });
    setEditingProduct(null);
    setError('');
    setSuccess('');
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-4 stylish-font">
            Admin <span className="text-transparent bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text">Panel</span>
          </h1>
          <p className="text-gray-600 text-lg">Manage your products and orders</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-8 border border-pink-100">
          <div className="flex border-b">
            <button
              onClick={() => {setActiveTab('view'); resetForm();}}
              className={`flex-1 px-6 py-4 font-semibold transition-all duration-300 ${
                activeTab === 'view'
                  ? 'text-pink-600 border-b-2 border-pink-600 bg-pink-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              📦 View Products
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`flex-1 px-6 py-4 font-semibold transition-all duration-300 ${
                activeTab === 'create'
                  ? 'text-pink-600 border-b-2 border-pink-600 bg-pink-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {editingProduct ? '✏️ Edit Product' : '➕ Add Product'}
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 px-6 py-4 font-semibold transition-all duration-300 ${
                activeTab === 'orders'
                  ? 'text-pink-600 border-b-2 border-pink-600 bg-pink-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              📋 Orders
            </button>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm">!</span>
              </div>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm">✓</span>
              </div>
              <p className="text-green-700 font-medium">{success}</p>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-pink-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All Orders</h2>
            {ordersLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
                <p className="mt-3 text-gray-600">Loading orders...</p>
              </div>
            ) : ordersError ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-red-500">❌</span>
                </div>
                <p className="text-red-600">{ordersError}</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-gray-500">📋</span>
                </div>
                <p className="text-gray-600 text-lg">No orders found yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Details</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Mobile</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                            order.isCustom 
                              ? 'bg-purple-100 text-purple-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {order.isCustom ? 'Custom' : 'Product'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="max-w-xs">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {order.isCustom ? order.customDetails : order.productName}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{order.userName || '-'}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-mono text-gray-600">{order.userMobile}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleOrderDelete(order._id)}
                            disabled={deletingOrderId === order._id}
                            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                              deletingOrderId === order._id
                                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                : 'bg-red-100 text-red-700 hover:bg-red-200'
                            }`}
                          >
                            {deletingOrderId === order._id ? (
                              <div className="flex items-center space-x-1">
                                <div className="w-3 h-3 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                <span>Deleting...</span>
                              </div>
                            ) : (
                              'Delete'
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* View Products Tab */}
        {activeTab === 'view' && (
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-pink-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">All Products</h2>
              <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-semibold">
                {products.length} products
              </span>
            </div>
            
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
                <p className="mt-3 text-gray-600">Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-gray-500">📦</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Add your first product to get started!</p>
                <button
                  onClick={() => setActiveTab('create')}
                  className="bg-pink-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-600 transition-colors"
                >
                  Add First Product
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-16 w-16">
                              {product.imageUrl ? (
                                <img
                                  className="h-16 w-16 rounded-xl object-cover border border-gray-200"
                                  src={product.imageUrl}
                                  alt={product.name}
                                />
                              ) : (
                                <div className="h-16 w-16 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center">
                                  <span className="text-gray-400 text-xs">No Image</span>
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-semibold text-gray-900">{product.name}</div>
                              <div className="text-sm text-gray-500 line-clamp-2 max-w-md">{product.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-lg font-bold text-pink-600">₹{product.price}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                            product.countInStock > 10 
                              ? 'bg-green-100 text-green-800'
                              : product.countInStock > 0
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {product.countInStock} in stock
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-semibold"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Create/Edit Product Tab */}
        {activeTab === 'create' && (
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-pink-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              {editingProduct && (
                <button 
                  onClick={resetForm}
                  className="text-pink-600 hover:text-pink-700 font-semibold flex items-center space-x-2"
                >
                  <span>✕</span>
                  <span>Cancel Edit</span>
                </button>
              )}
            </div>

            {editingProduct && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-blue-700 font-medium">
                  Editing: <span className="font-bold">{editingProduct.name}</span>
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                    placeholder="Enter product name"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                    placeholder="0.00"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all resize-none"
                  placeholder="Describe your product..."
                  disabled={loading}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="countInStock" className="block text-sm font-semibold text-gray-700 mb-2">
                    Stock Quantity *
                  </label>
                 <input
  type="number"
  id="countInStock"
  name="countInStock"
  required
  min="0"
  value={formData.countInStock}
  onChange={handleInputChange}
  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
  placeholder="10"
  disabled={loading}
/>
                </div>

                <div>
                  <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Image {!editingProduct && '*'}
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    required={!editingProduct}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                    disabled={loading}
                  />
                  {formData.image && (
                    <p className="text-sm text-green-600 mt-2">
                      ✅ Selected: {formData.image.name} ({(formData.image.size / (1024 * 1024)).toFixed(2)} MB)
                    </p>
                  )}
                  {editingProduct && (
                    <p className="text-sm text-gray-500 mt-2">
                      Leave empty to keep current image
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Maximum file size: 5MB • Supported formats: JPEG, PNG, WebP
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:from-pink-600 hover:to-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{editingProduct ? 'Updating Product...' : 'Creating Product...'}</span>
                  </div>
                ) : editingProduct ? (
                  'Update Product'
                ) : (
                  'Add Product'
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;