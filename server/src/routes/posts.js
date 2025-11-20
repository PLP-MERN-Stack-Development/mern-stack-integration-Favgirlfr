import express from 'express';
import { validationResult } from 'express-validator';
import Post from '../models/Post.js';
import Category from '../models/Category.js';
import { createPostRules, updatePostRules, idParamRule, paginationRules } from '../utils/validate.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// GET /api/posts?page=&limit=&q=&category=
router.get('/', paginationRules, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { page = 1, limit = 10, q = '', category } = req.query;
    const query = {};
    if (q) query.$or = [
      { title: { $regex: q, $options: 'i' } },
      { content: { $regex: q, $options: 'i' } }
    ];
    if (category) {
      const cat = await Category.findOne({ slug: category });
      if (cat) query.categories = cat._id;
    }

    const [items, total] = await Promise.all([
      Post.find(query).populate('categories').sort({ createdAt: -1 })
        .skip((page - 1) * limit).limit(Number(limit)),
      Post.countDocuments(query)
    ]);

    res.json({ items, page: Number(page), limit: Number(limit), total });
  } catch (err) { next(err); }
});

// GET /api/posts/:id
router.get('/:id', idParamRule, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const post = await Post.findById(req.params.id).populate('categories');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) { next(err); }
});

// POST /api/posts
router.post('/', requireAuth, createPostRules, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { title, slug, content, categories = [], featuredImageUrl, excerpt, author, published } = req.body;
    const catDocs = await Category.find({ _id: { $in: categories } });

    const post = await Post.create({
      title, slug, content, categories: catDocs.map(c => c._id),
      featuredImageUrl, excerpt, author, published, createdBy: req.user.sub
    });
    res.status(201).json(post);
  } catch (err) { next(err); }
});

// PUT /api/posts/:id
router.put('/:id', requireAuth, [...idParamRule, ...updatePostRules], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const update = { ...req.body };
    if (update.categories) {
      const catDocs = await Category.find({ _id: { $in: update.categories } });
      update.categories = catDocs.map(c => c._id);
    }
    const post = await Post.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) { next(err); }
});

// DELETE /api/posts/:id
router.delete('/:id', requireAuth, idParamRule, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
});

export default router;