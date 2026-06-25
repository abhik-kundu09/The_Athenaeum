import { useState, useCallback, useEffect, useMemo } from "react";
import Navbar from "../components/NavBar";
import BookForm from "../components/BookForm";
import BookCard from "../components/BookCard";
import { FiSearch } from "react-icons/fi";
import { GiBookshelf } from "react-icons/gi";
import { useBooks, useCreateBook, useUpdateBook, useDeleteBook, useSearchBooks, useToggleFavorite } from "../hooks/useBooks";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [editingBook, setEditingBook] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [duplicateError, setDuplicateError] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: searchResults, isLoading: searchLoading } = useSearchBooks(debouncedQuery, { limit: 50 });

  const queryParams = useMemo(() => ({ sort: "-createdAt", limit: 50 }), []);

  const { data: booksData, isLoading: booksLoading, error: booksError } = useBooks(queryParams);

  const createBook = useCreateBook();
  const updateBook = useUpdateBook();
  const deleteBook = useDeleteBook();
  const toggleFavorite = useToggleFavorite();

  const books = debouncedQuery ? searchResults : booksData;

  const handleAddBook = useCallback(async (newBook) => {
    setDuplicateError("");
    try {
      await createBook.mutateAsync(newBook);
      setIsFormOpen(false);
    } catch (err) {
      if (err.errors?.length > 0) {
        setDuplicateError(err.errors.map((e) => e.msg || e.message).join(", "));
      } else {
        setDuplicateError(err.message || "Failed to add book");
      }
    }
  }, [createBook]);

  const handleUpdateBook = useCallback(async (updatedBook) => {
    setDuplicateError("");
    try {
      const cleanData = {
        title: updatedBook.title,
        author: updatedBook.author,
        genre: updatedBook.genre,
        rating: updatedBook.rating,
        status: updatedBook.status,
        description: updatedBook.description,
      };
      await updateBook.mutateAsync({ id: updatedBook._id, data: cleanData });
      setEditingBook(null);
      setIsFormOpen(false);
    } catch (err) {
      if (err.errors?.length > 0) {
        setDuplicateError(err.errors.map((e) => e.msg || e.message).join(", "));
      } else {
        setDuplicateError(err.message || "Failed to update book");
      }
    }
  }, [updateBook]);

  const handleDeleteBook = useCallback(async (id) => {
    try {
      await deleteBook.mutateAsync(id);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }, [deleteBook]);

  const handleEditClick = useCallback((book) => {
    setEditingBook(book);
    setIsFormOpen(true);
    setDuplicateError("");
  }, []);

  const handleAddClick = useCallback(() => {
    setEditingBook(null);
    setIsFormOpen(true);
    setDuplicateError("");
  }, []);

  const handleCloseForm = useCallback(() => {
    setIsFormOpen(false);
    setEditingBook(null);
    setDuplicateError("");
  }, []);

  const handleToggleFavorite = useCallback(async (id) => {
    try {
      await toggleFavorite.mutateAsync(id);
    } catch (err) {
      console.error("Toggle favorite failed:", err);
    }
  }, [toggleFavorite]);

  const isLoading = booksLoading || searchLoading;

  return (
    <div className="min-h-screen">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddClick={handleAddClick}
      />

      {isFormOpen && (
        <BookForm
          key={editingBook ? editingBook._id : 'add'}
          onAddBook={handleAddBook}
          onUpdateBook={handleUpdateBook}
          editingBook={editingBook}
          onClose={handleCloseForm}
          duplicateError={duplicateError}
          isSubmitting={createBook.isPending || updateBook.isPending}
        />
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <section>
          <div className="flex items-center justify-between mb-5 sm:mb-6 gap-3">
            <h2 className="text-xl sm:text-3xl font-bold text-slate-100 flex items-center gap-2.5 min-w-0">
              <span className="bg-gradient-to-br from-amber-400 to-amber-600 text-slate-900 p-2 rounded-xl shrink-0 shadow-md shadow-amber-500/20">
                <GiBookshelf size={18} />
              </span>
              <span className="truncate">My Collection</span>
            </h2>
            <span className="text-xs sm:text-sm font-medium text-amber-300 bg-slate-900/70 border border-amber-500/20 px-3 py-1 rounded-full shadow-sm shrink-0 whitespace-nowrap">
              {books?.length || 0} {books?.length === 1 ? "book" : "books"}
            </span>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-amber-400"></div>
            </div>
          ) : booksError ? (
            <div className="flex flex-col items-center justify-center text-center py-16 sm:py-20 px-4 bg-slate-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-dashed border-red-700">
              <p className="text-red-400 text-sm">Failed to load books. Make sure the backend server is running.</p>
            </div>
          ) : !books || books.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-16 sm:py-20 px-4 bg-slate-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-dashed border-slate-700 animate-fade-in-up">
              <div className="bg-amber-500/10 text-amber-400 p-4 rounded-full mb-4">
                <FiSearch size={28} />
              </div>
              <h3 className="text-lg font-semibold text-slate-200 mb-1">
                No books found
              </h3>
              <p className="text-sm text-slate-400 max-w-xs">
                Try adjusting your search or add a new book to your collection.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {books.map((book) => (
                <BookCard
                  key={book._id}
                  book={book}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteBook}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="text-center text-xs sm:text-sm text-slate-500 py-6 sm:py-8 px-4 border-t border-slate-800/50">
        The Athenaeum — Curated with care
      </footer>
    </div>
  );
};

export default Home;