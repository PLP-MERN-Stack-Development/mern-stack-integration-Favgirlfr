import express from 'express';
import { validationResult } from 'express-validator';
import Comment from '../models/Comment.js';
import { commentRules } from '../utils/validate.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// GET /api/posts/:id/comments
router.get('/:id/comments', async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.id }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) { next(err); }
});

// POST /api/posts/:id/comments
router.post('/:id/comments', requireAuth, commentRules, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const comment = await Comment.create({
      post: req.params.id,
      author: req.user.email, // or name
      content: req.body.content
    });
    res.status(201).json(comment);
  } catch (err) { next(err); }
});

export default router;