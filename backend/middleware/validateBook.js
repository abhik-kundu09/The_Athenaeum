import { body, param, query, validationResult } from 'express-validator';
import { errorResponse } from '../utils/apiResponse.js';

export const validateBook = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Title must be between 2 and 100 characters'),
  body('author')
    .trim()
    .notEmpty()
    .withMessage('Author is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Author must be between 2 and 100 characters'),
  body('genre')
    .trim()
    .notEmpty()
    .withMessage('Genre is required')
    .isLength({ min: 2 })
    .withMessage('Genre must be at least 2 characters'),
  body('rating')
    .notEmpty()
    .withMessage('Rating is required')
    .isNumeric()
    .withMessage('Rating must be a number')
    .custom((value) => {
      const num = Number(value);
      if (num < 1 || num > 5) {
        throw new Error('Rating must be between 1 and 5');
      }
      return true;
    }),
  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['Read', 'Unread'])
    .withMessage('Status must be either Read or Unread'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
];

export const validateBookId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid book ID format'),
];

export const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('sort')
    .optional()
    .isIn(['title', '-title', 'author', '-author', 'rating', '-rating', 'createdAt', '-createdAt', 'updatedAt', '-updatedAt'])
    .withMessage('Invalid sort field'),
];

export const validateSearch = [
  query('q')
    .trim()
    .notEmpty()
    .withMessage('Search query is required')
    .isLength({ min: 1 })
    .withMessage('Search query cannot be empty'),
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const allErrors = errors.array();
    const paramErrors = allErrors.filter(e => e.location === 'params');
    if (paramErrors.length > 0) {
      return errorResponse(res, 400, 'Validation failed', paramErrors);
    }
    return errorResponse(res, 400, 'Validation failed', allErrors);
  }
  next();
};