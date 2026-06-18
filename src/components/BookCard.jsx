import { FiEdit2, FiTrash2, FiStar, FiUser, FiCheckCircle, FiBookmark } from "react-icons/fi";

const genreColors = {
  Fiction: "bg-pink-500/15 text-pink-300 border-pink-500/30",
  "Non-Fiction": "bg-slate-500/15 text-slate-300 border-slate-500/30",
  "Self Help": "bg-violet-500/15 text-violet-300 border-violet-500/30",
  Science: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  Technology: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  Biography: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  History: "bg-orange-500/15 text-orange-300 border-orange-500/30",
  Fantasy: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
  "Sci-Fi": "bg-teal-500/15 text-teal-300 border-teal-500/30",
  Thriller: "bg-red-500/15 text-red-300 border-red-500/30",
  Mystery: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  Horror: "bg-stone-500/15 text-stone-300 border-stone-500/30",
  Romance: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  "Dark Romance": "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30",
  "Young Adult": "bg-lime-500/15 text-lime-300 border-lime-500/30",
  Poetry: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  Philosophy: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  Business: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  Psychology: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  Adventure: "bg-green-500/15 text-green-300 border-green-500/30",
};

const BookCard = ({ book, onEdit, onDelete, onToggleFavorite }) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
      onDelete(book.id);
    }
  };

  const genreBadge = genreColors[book.genre] || "bg-slate-500/15 text-slate-300 border-slate-500/30";

  return (
    <article
      className={`group relative bg-slate-900/70 backdrop-blur-sm rounded-2xl shadow-lg shadow-black/30 hover:shadow-xl hover:shadow-amber-500/10 border p-5 flex flex-col h-full transition-all duration-300 hover:-translate-y-1 animate-fade-in-up ${book.isFavorite
          ? "border-amber-500/50 ring-1 ring-amber-500/20"
          : "border-slate-800 hover:border-amber-500/30"
        }`}
    >
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-400/10 to-transparent rounded-tr-2xl rounded-bl-3xl pointer-events-none" />

      {/* Favorite / Pin toggle */}
      <button
        onClick={() => onToggleFavorite(book.id)}
        aria-label={book.isFavorite ? "Remove from favorites" : "Add to favorites"}
        aria-pressed={book.isFavorite}
        className={`absolute top-3 right-3 z-10 p-1.5 rounded-full transition-all duration-200 active:scale-90 focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${book.isFavorite
            ? "text-amber-400 bg-amber-500/15"
            : "text-slate-500 bg-slate-800/60 hover:text-amber-300 hover:bg-amber-500/10 opacity-0 group-hover:opacity-100"
          }`}
      >
        <FiStar size={16} className={book.isFavorite ? "fill-amber-400" : ""} />
      </button>

      <div className="flex justify-between items-start gap-2 mb-2 relative pr-7">
        <h3 className="text-base sm:text-lg font-bold text-slate-100 leading-snug group-hover:text-amber-300 transition-colors duration-200 break-words font-[Playfair_Display]">
          {book.title}
        </h3>
        <span
          className={`shrink-0 flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border whitespace-nowrap ${book.status === "Read"
              ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
              : "bg-amber-500/15 text-amber-300 border-amber-500/30"
            }`}
        >
          {book.status === "Read" ? <FiCheckCircle size={11} /> : <FiBookmark size={11} />}
          {book.status}
        </span>
      </div>

      <p className="flex items-center gap-1.5 text-sm text-slate-400 mb-3">
        <FiUser className="text-slate-500 shrink-0" size={14} />
        <span className="truncate">{book.author}</span>
      </p>

      <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${genreBadge}`}>
          {book.genre}
        </span>
        <div
          className="flex items-center gap-0.5"
          aria-label={`Rating: ${book.rating} out of 5`}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <FiStar
              key={star}
              size={14}
              className={
                star <= book.rating
                  ? "text-amber-400 fill-amber-400"
                  : "text-slate-700"
              }
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      <p className="text-sm text-slate-400 leading-relaxed flex-grow mb-4 line-clamp-3">
        {book.description}
      </p>

      <div className="flex gap-2 mt-auto pt-3 border-t border-slate-800 relative">
        <button
          onClick={() => onEdit(book)}
          className="flex-1 flex items-center justify-center gap-1.5 text-sm font-medium bg-slate-800 text-amber-300 px-3 py-2 rounded-xl hover:bg-amber-500/15 hover:text-amber-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all duration-150"
        >
          <FiEdit2 size={14} aria-hidden="true" /> Edit
        </button>
        <button
          onClick={handleDelete}
          className="flex-1 flex items-center justify-center gap-1.5 text-sm font-medium bg-slate-800 text-rose-300 px-3 py-2 rounded-xl hover:bg-rose-500/15 hover:text-rose-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-rose-400/50 transition-all duration-150"
        >
          <FiTrash2 size={14} aria-hidden="true" /> Delete
        </button>
      </div>
    </article>
  );
};

export default BookCard;