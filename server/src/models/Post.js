import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  content: { type: String, required: true },
  excerpt: { type: String },
  featuredImageUrl: { type: String },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  author: { type: String, default: 'Anonymous' },
  published: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Post', postSchema);