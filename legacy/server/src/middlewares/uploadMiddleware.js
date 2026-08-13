
import upload from '../controllers/uploadController.js';

export const optionalUpload = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ message: 'A Multer error occurred when uploading.' });
    } else if (err) {
      return res.status(500).json({ message: 'An unknown error occurred during upload.' });
    }
    next();
  });
};