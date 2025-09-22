import express from "express";
import {
  registerUser,
  verifyEmail,       
  authUser,
  getUserProfile,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.get("/verify/:token", verifyEmail); 
router.post("/login", authUser);


// Protected route
router.get("/profile", protect, getUserProfile);

export default router;
