
import express from "express";
import { createOrder, getOrders, deleteOrder } from "../controllers/orderController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();
// Admin: Delete order
router.delete('/:id', protect, admin, deleteOrder);

// Public: Create order
router.post("/", createOrder);

// Admin: Get all orders
router.get("/", protect, admin, getOrders);

export default router;
