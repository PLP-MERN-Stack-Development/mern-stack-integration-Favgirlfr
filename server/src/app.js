import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import postsRouter from './routes/posts.js';
import categoriesRouter from './routes/categories.js';
import authRouter from './routes/auth.js';
import commentsRouter from './routes/comments.js';
import uploadRouter from './routes/upload.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.json({ status: 'OK' }));

app.use('/api/posts', postsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', commentsRouter);
app.use('/api/upload', uploadRouter);
app.use('/uploads', express.static('uploads'));

app.use(errorHandler);

export default app;