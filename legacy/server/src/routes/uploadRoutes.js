import express from "express";
import upload from "../controllers/uploadController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Upload single image (only admin)
router.post("/single", protect, admin, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  }
  res.status(201).json({
    imageUrl: req.file.path, // Cloudinary URL
  });
});

// Upload multiple images (optional)
router.post("/multiple", protect, admin, upload.array("images", 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No images uploaded" });
  }
  const urls = req.files.map((file) => file.path);
  res.status(201).json({ imageUrls: urls });
});

export default router;
