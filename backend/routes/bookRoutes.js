import express from 'express';
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  searchBooks,
  toggleFavorite,
} from '../controllers/bookController.js';
import {
  validateBook,
  validateBookId,
  validatePagination,
  validateSearch,
  handleValidationErrors,
} from '../middleware/validateBook.js';

const router = express.Router();

router.post(
  '/',
  validateBook,
  handleValidationErrors,
  createBook
);

router.get(
  '/',
  validatePagination,
  handleValidationErrors,
  getAllBooks
);

router.get(
  '/search',
  validateSearch,
  validatePagination,
  handleValidationErrors,
  searchBooks
);

router.get(
  '/:id',
  validateBookId,
  handleValidationErrors,
  getBookById
);

router.patch(
  '/:id/favorite',
  validateBookId,
  handleValidationErrors,
  toggleFavorite
);

router.put(
  '/:id',
  validateBookId,
  validateBook,
  handleValidationErrors,
  updateBook
);

router.delete(
  '/:id',
  validateBookId,
  handleValidationErrors,
  deleteBook
);

export default router;