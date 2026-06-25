import { useState, useEffect } from "react";
import {
  FiX,
  FiAlertCircle,
  FiBookOpen,
  FiUser,
  FiTag,
  FiStar,
  FiCheckCircle,
  FiFileText,
  FiSave,
} from "react-icons/fi";
import CustomSelect from "./CustomSelect";

const genreOptions = [
  "Fiction",
  "Non-Fiction",
  "Self Help",
  "Science",
  "Technology",
  "Biography",
  "History",
  "Fantasy",
  "Sci-Fi",
  "Thriller",
  "Mystery",
  "Horror",
  "Romance",
  "Dark Romance",
  "Young Adult",
  "Poetry",
  "Philosophy",
  "Business",
  "Psychology",
  "Adventure",
];

const getInitialForm = (book) => book
  ? {
      title: book.title || "",
      author: book.author || "",
      genre: book.genre || "Fiction",
      rating: book.rating ?? "",
      status: book.status || "Unread",
      description: book.description || "",
    }
  : {
      title: "",
      author: "",
      genre: "Fiction",
      rating: "",
      status: "Unread",
      description: "",
    };

const BookForm = ({ onAddBook, onUpdateBook, editingBook, onClose, duplicateError, isSubmitting = false }) => {
  const [formData, setFormData] = useState(() => getInitialForm(editingBook));
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
       onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
     window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
    } else if (formData.title.trim().length < 2) {
      newErrors.title = "Title must be at least 2 characters.";
    } else if (formData.title.trim().length > 100) {
      newErrors.title = "Title cannot exceed 100 characters.";
    }

    if (!formData.author.trim()) {
      newErrors.author = "Author is required.";
    } else if (formData.author.trim().length < 2) {
      newErrors.author = "Author must be at least 2 characters.";
    } else if (formData.author.trim().length > 100) {
      newErrors.author = "Author cannot exceed 100 characters.";
    }

    if (!formData.genre.trim()) {
      newErrors.genre = "Genre is required.";
    } else if (formData.genre.trim().length < 2) {
      newErrors.genre = "Genre must be at least 2 characters.";
    }

    if (formData.description && formData.description.length > 1000) {
      newErrors.description = "Description cannot exceed 1000 characters.";
    }

    const ratingNum = Number(formData.rating);
    if (formData.rating === "" || isNaN(ratingNum)) {
      newErrors.rating = "Rating is required.";
    } else if (ratingNum < 1 || ratingNum > 5) {
      newErrors.rating = "Rating must be between 1 and 5.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const bookData = {
      ...formData,
      rating: Number(formData.rating),
    };

    if (editingBook) {
      onUpdateBook(bookData);
    } else {
      onAddBook(bookData);
    }

    setErrors({});
  };

  const inputBase =
    "w-full pl-10 pr-3.5 py-2.5 bg-slate-800/70 border rounded-xl text-sm text-slate-100 shadow-sm placeholder:text-slate-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50";
  const inputNormal = "border-slate-700 hover:border-slate-600";
  const inputError = "border-rose-500/60 ring-1 ring-rose-500/30";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-overlay-in"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="book-form-title"
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-amber-500/20 rounded-2xl shadow-2xl shadow-black/60 animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-5 sm:px-8 py-5 sm:py-6 border-b border-slate-800 sticky top-0 bg-slate-900/95 backdrop-blur-sm z-10">
          <div className="flex items-center gap-3 min-w-0">
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 text-slate-900 p-2.5 rounded-xl shadow-md shadow-amber-500/30 shrink-0">
              <FiBookOpen size={20} />
            </div>
            <h2 id="book-form-title" className="text-lg sm:text-2xl font-bold text-slate-100 truncate">
              {editingBook ? "Edit Book" : "Add a New Book"}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-slate-400 hover:text-amber-400 hover:bg-slate-800 p-2 rounded-xl transition-all duration-150 shrink-0 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-5 sm:px-8 py-5 sm:py-6 space-y-4 sm:space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-slate-300 mb-1.5">
                Title <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <FiBookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input
                  autoFocus
                  id="title"
                  name="title"
                  type="text"
                  placeholder="e.g. Atomic Habits"
                  value={formData.title}
                  onChange={handleChange}
                  className={`${inputBase} ${errors.title ? inputError : inputNormal}`}
                />
              </div>
              {errors.title && (
                <p className="flex items-center gap-1 text-xs text-rose-400 mt-1.5 animate-fade-in-up">
                  <FiAlertCircle size={13} /> {errors.title}
                </p>
              )}
            </div>

            {/* Author */}
            <div>
              <label htmlFor="author" className="block text-sm font-semibold text-slate-300 mb-1.5">
                Author <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input
                  id="author"
                  name="author"
                  type="text"
                  placeholder="e.g. James Clear"
                  value={formData.author}
                  onChange={handleChange}
                  className={`${inputBase} ${errors.author ? inputError : inputNormal}`}
                />
              </div>
              {errors.author && (
                <p className="flex items-center gap-1 text-xs text-rose-400 mt-1.5 animate-fade-in-up">
                  <FiAlertCircle size={13} /> {errors.author}
                </p>
              )}
            </div>
            {duplicateError && (
               <div className="sm:col-span-2">
                 <p className="flex items-center gap-1 text-xs text-rose-400 mt-1.5 animate-fade-in-up">
                 <FiAlertCircle size={13} />
                 {duplicateError}
                 </p>
               </div>
            )}

            {/* Genre */}
            <div>
              <label htmlFor="genre" className="block text-sm font-semibold text-slate-300 mb-1.5">
                Genre
              </label>
              <CustomSelect
                id="genre"
                icon={FiTag}
                value={formData.genre}
                onChange={(val) => setFormData((prev) => ({ ...prev, genre: val }))}
                options={genreOptions}
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                Rating <span className="text-amber-400">*</span>
              </label>
              <div
                className={`flex items-center gap-2 px-3.5 py-2.5 bg-slate-800/70 border rounded-xl transition-all duration-200 ${errors.rating ? inputError : inputNormal
                  }`}
                role="radiogroup"
                aria-label="Rating from 1 to 5"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    role="radio"
                    aria-checked={Number(formData.rating) === star}
                    aria-label={`${star} star${star > 1 ? "s" : ""}`}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, rating: star }))
                    }
                    className="focus:outline-none focus:ring-2 focus:ring-amber-400/50 rounded-full transition-transform duration-150 hover:scale-110 active:scale-95"
                  >
                    <FiStar
                      size={22}
                      className={
                        star <= Number(formData.rating)
                          ? "text-amber-400 fill-amber-400"
                          : "text-slate-600 hover:text-amber-300"
                      }
                    />
                  </button>
                ))}
                {formData.rating !== "" && (
                  <span className="ml-1 text-sm text-slate-400">
                    {formData.rating} / 5
                  </span>
                )}
              </div>
            </div>
            {errors.rating && (
              <div className="sm:col-span-2">
                <p className="flex items-center gap-1 text-xs text-rose-400 mt-1.5 animate-fade-in-up">
                <FiAlertCircle size={13} />
                {errors.rating}
                </p>
              </div>
            )}

            {/* Status */}
            <div className="sm:col-span-2 sm:max-w-xs">
              <label htmlFor="status" className="block text-sm font-semibold text-slate-300 mb-1.5">
                Status
              </label>
              <CustomSelect
                id="status"
                icon={FiCheckCircle}
                value={formData.status}
                onChange={(val) => setFormData((prev) => ({ ...prev, status: val }))}
                options={["Read", "Unread"]}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-slate-300 mb-1.5">
              Description
            </label>
            <div className="relative">
              <FiFileText className="absolute left-3 top-3 text-slate-500" size={16} />
              <textarea
                id="description"
                name="description"
                rows="3"
                placeholder="A short summary of the book..."
                value={formData.description}
                onChange={handleChange}
                className={`${inputBase} ${inputNormal} resize-none`}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 pt-1 sm:pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 px-5 sm:px-6 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-amber-500/30 hover:shadow-lg hover:shadow-amber-500/40 hover:-translate-y-0.5 active:translate-y-0 active:from-amber-500 active:to-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 w-full sm:w-auto"
            >
              <FiSave />
              {isSubmitting ? "Saving..." : editingBook ? "Update Book" : "Add Book"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center gap-2 bg-slate-800 text-slate-300 px-5 sm:px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-700 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200 w-full sm:w-auto"
            >
              <FiX /> Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;