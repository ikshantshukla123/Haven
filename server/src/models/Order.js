import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: false,
  },
  productName: {
    type: String,
    required: false,
  },
  userName: {
    type: String,
    required: true,
  },
  userMobile: {
    type: String,
    required: true,
  },
  customDetails: {
    type: String,
    required: false,
  },
  isCustom: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
