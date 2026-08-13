import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/upload.js"; // This imports the configured multer instance

const router = express.Router();

// Public routes
router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

// Admin routes
router.route("/")
  .post(protect, admin, upload.single("image"), createProduct);

router.route("/:id")
  .put(protect, admin, (req, res, next) => {
    // Check if a file is uploaded in the request
    if (req.file) {
      upload.single("image")(req, res, next);
    } else {
      next(); // Skip the upload middleware if no file is present
    }
  }, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;