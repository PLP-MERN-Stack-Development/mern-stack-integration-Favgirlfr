import express from 'express';
import { validationResult } from 'express-validator';
import Category from '../models/Category.js';
import { createCategoryRules } from '../utils/validate.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const cats = await Category.find().sort({ name: 1 });
    res.json(cats);
  } catch (err) { next(err); }
});

router.post('/', requireAuth, requireAdmin, createCategoryRules, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, slug } = req.body;
    const exists = await Category.findOne({ slug });
    if (exists) return res.status(409).json({ message: 'Category exists' });

    const cat = await Category.create({ name, slug });
    res.status(201).json(cat);
  } catch (err) { next(err); }
});

export default router;