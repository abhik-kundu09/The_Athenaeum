import { useState } from "react";
import Navbar from "../components/NavBar";
import BookForm from "../components/BookForm";
import BookCard from "../components/BookCard";
import { FiSearch } from "react-icons/fi";
import { GiBookshelf } from "react-icons/gi";

const initialBooks = [
    {
        id: 1,
        title: "Atomic Habits",
        author: "James Clear",
        genre: "Self Help",
        rating: 5,
        status: "Read",
        description: "A practical guide to building good habits and breaking bad ones.",
        isFavorite: false,
    },
    {
        id: 2,
        title: "Clean Code",
        author: "Robert C. Martin",
        genre: "Technology",
        rating: 5,
        status: "Read",
        description: "A handbook of agile software craftsmanship.",
        isFavorite: false,
    },
    {
        id: 3,
        title: "The Alchemist",
        author: "Paulo Coelho",
        genre: "Fiction",
        rating: 4,
        status: "Unread",
        description: "A philosophical novel about following one's dreams.",
        isFavorite: false,
    },
];

const Home = () => {
    const [books, setBooks] = useState(initialBooks);
    const [searchQuery, setSearchQuery] = useState("");
    const [editingBook, setEditingBook] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [duplicateError, setDuplicateError] = useState("");

    const handleAddBook = (newBook) => {
        const exists = books.some(
            (book) =>
            book.title.toLowerCase().trim() ===
            newBook.title.toLowerCase().trim() &&
            book.author.toLowerCase().trim() ===
             newBook.author.toLowerCase().trim()
        );
        if (exists) {
            setDuplicateError("This book already exists in your collection.");
             return;
        }

        setDuplicateError("");      

        const bookWithId = { ...newBook, id: Date.now(), isFavorite: false };
        setBooks((prev) => [...prev, bookWithId]);
        setIsFormOpen(false);
    };

    const handleUpdateBook = (updatedBook) => {

        const exists = books.some(
            (book) =>
                book.id !== updatedBook.id &&
                book.title.toLowerCase().trim() === updatedBook.title.toLowerCase().trim() &&
                book.author.toLowerCase().trim() === updatedBook.author.toLowerCase().trim()
        );

        if (exists) {
         setDuplicateError("This book already exists in your collection.");
         return;
         }

        setDuplicateError("");
        setBooks((prev) =>
            prev.map((book) => (book.id === updatedBook.id ? { ...book, ...updatedBook } : book))
        );
        setEditingBook(null);
        setIsFormOpen(false);
    };

    const handleDeleteBook = (id) => {
        setBooks((prev) => prev.filter((book) => book.id !== id));
    };

    const handleEditClick = (book) => {
        setEditingBook(book);
        setIsFormOpen(true);
        setDuplicateError("");
    };

    const handleAddClick = () => {
        setEditingBook(null);
        setIsFormOpen(true);
        setDuplicateError("");
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingBook(null);
        setDuplicateError("");
    };

    // Toggle the favorite/pin status of a book
    const handleToggleFavorite = (id) => {
        setBooks((prev) =>
            prev.map((book) =>
                book.id === id ? { ...book, isFavorite: !book.isFavorite } : book
            )
        );
    };

    const filteredBooks = books.filter((book) => {
        const query = searchQuery.toLowerCase();
        return (
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query)
        );
    });

    // Show favorites first, then the rest (each group keeps insertion order)
    const sortedBooks = [...filteredBooks].sort((a, b) => {
        if (a.isFavorite === b.isFavorite) return 0;
        return a.isFavorite ? -1 : 1;
    });

    return (
        <div className="min-h-screen">
            <Navbar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onAddClick={handleAddClick}
            />

            {isFormOpen && (
                <BookForm
                    onAddBook={handleAddBook}
                    onUpdateBook={handleUpdateBook}
                    editingBook={editingBook}
                    onClose={handleCloseForm}
                    duplicateError={duplicateError}

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
                            {filteredBooks.length} {filteredBooks.length === 1 ? "book" : "books"}
                        </span>
                    </div>

                    {sortedBooks.length === 0 ? (
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
                            {sortedBooks.map((book) => (
                                <BookCard
                                    key={book.id}
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