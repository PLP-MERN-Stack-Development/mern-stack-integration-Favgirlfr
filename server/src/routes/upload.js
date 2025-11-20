import express from 'express';
import { upload } from '../services/upload.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', requireAuth, upload.single('image'), (req, res) => {
  res.json({ url: `/uploads/${req.file.filename}` });
});

export default router;