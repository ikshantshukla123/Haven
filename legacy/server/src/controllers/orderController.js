// @desc    Delete an order
// @route   DELETE /api/orders/:id
// @access  Admin
export const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  await order.deleteOne();
  res.json({ message: 'Order deleted' });
});
import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

// @desc    Create a new order
// @route   POST /api/orders
// @access  Public
export const createOrder = asyncHandler(async (req, res) => {
  const { productId, userName, userMobile, customDetails, isCustom } = req.body;
  if (!userMobile || !userName) {
    res.status(400);
    throw new Error("Name and mobile number are required");
  }
  if (isCustom) {
    // Custom gift order
    const order = await Order.create({
      userName,
      userMobile,
      customDetails,
      isCustom: true,
    });
    res.status(201).json(order);
    return;
  }
  if (!productId) {
    res.status(400);
    throw new Error("Product is required");
  }
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  const order = await Order.create({
    productId,
    productName: product.name,
    userName,
    userMobile,
  });
  res.status(201).json(order);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Admin
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).sort({ createdAt: -1 });
  res.json(orders);
});
