import { body, param, query } from 'express-validator';

export const createPostRules = [
  body('title').isString().isLength({ min: 3 }),
  body('slug').isString().isLength({ min: 3 }),
  body('content').isString().isLength({ min: 10 }),
  body('categories').optional().isArray()
];

export const updatePostRules = [
  body('title').optional().isString().isLength({ min: 3 }),
  body('slug').optional().isString().isLength({ min: 3 }),
  body('content').optional().isString().isLength({ min: 10 }),
  body('categories').optional().isArray()
];

export const idParamRule = [param('id').isMongoId()];

export const createCategoryRules = [
  body('name').isString().isLength({ min: 2 }),
  body('slug').isString().isLength({ min: 2 })
];

export const paginationRules = [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('q').optional().isString(),
  query('category').optional().isString()
];

export const registerRules = [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('name').optional().isString()
];

export const loginRules = [
  body('email').isEmail(),
  body('password').exists()
];

export const commentRules = [
  body('content').isString().isLength({ min: 1 })
];