import Book from '../models/Book.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../middleware/errorMiddleware.js';

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const parsePositiveInt = (val, defaultVal) => {
  const n = parseInt(val);
  return (Number.isInteger(n) && n >= 1) ? n : defaultVal;
};

export const createBook = asyncHandler(async (req, res) => {
  const book = await Book.create(req.body);
  return successResponse(res, 201, 'Book created successfully', book);
});

export const getAllBooks = asyncHandler(async (req, res) => {
  const page = parsePositiveInt(req.query.page, 1);
  const limit = parsePositiveInt(req.query.limit, 10);
  const sort = req.query.sort || '-createdAt';
  const skip = (page - 1) * limit;

  const [books, total] = await Promise.all([
    Book.find().sort(sort).skip(skip).limit(limit),
    Book.countDocuments(),
  ]);

  return paginatedResponse(res, 200, 'Books retrieved successfully', books, total, page, limit);
});

export const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return errorResponse(res, 404, 'Book not found');
  }
  return successResponse(res, 200, 'Book retrieved successfully', book);
});

export const updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!book) {
    return errorResponse(res, 404, 'Book not found');
  }
  return successResponse(res, 200, 'Book updated successfully', book);
});

export const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) {
    return errorResponse(res, 404, 'Book not found');
  }
  return successResponse(res, 200, 'Book deleted successfully');
});

export const toggleFavorite = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return errorResponse(res, 404, 'Book not found');
  }
  book.isFavorite = !book.isFavorite;
  await book.save();
  return successResponse(res, 200, `Book ${book.isFavorite ? 'added to' : 'removed from'} favorites`, book);
});

export const searchBooks = asyncHandler(async (req, res) => {
  const query = req.query.q;
  const page = parsePositiveInt(req.query.page, 1);
  const limit = parsePositiveInt(req.query.limit, 10);
  const skip = (page - 1) * limit;

  const searchRegex = new RegExp(escapeRegex(query), 'i');

  const [books, total] = await Promise.all([
    Book.find({
      $or: [
        { title: searchRegex },
        { author: searchRegex },
      ],
    })
      .sort('-createdAt')
      .skip(skip)
      .limit(limit),
    Book.countDocuments({
      $or: [
        { title: searchRegex },
        { author: searchRegex },
      ],
    }),
  ]);

  return paginatedResponse(res, 200, 'Search results', books, total, page, limit);
});