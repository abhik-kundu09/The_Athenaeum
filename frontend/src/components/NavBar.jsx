import { FiSearch, FiX } from "react-icons/fi";
import { GiBookshelf } from "react-icons/gi";

const Navbar = ({ searchQuery, onSearchChange, onAddClick }) => {
  return (
    <nav className="sticky top-0 z-30 backdrop-blur-md bg-slate-950/80 border-b border-amber-500/20 shadow-lg shadow-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        {/* App title */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <div className="bg-gradient-to-br from-amber-400 to-amber-600 text-slate-900 p-2.5 rounded-xl shadow-md shadow-amber-500/30">
            <GiBookshelf size={20} />
          </div>
          <h1 className="text-lg sm:text-2xl font-extrabold text-slate-100 tracking-tight whitespace-nowrap">
            The{" "}
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-200 bg-clip-text text-transparent">
              Athenaeum
            </span>
          </h1>
        </div>

        {/* Search + Add button */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <label htmlFor="search" className="sr-only">
              Search books by title or author
            </label>
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
              size={16}
              aria-hidden="true"
            />
            <input
              id="search"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search title or author..."
              className="w-full pl-9 pr-9 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-100 shadow-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-400/60 transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-amber-400 transition-colors duration-150"
              >
                <FiX size={16} />
              </button>
            )}
          </div>

          <button
            onClick={onAddClick}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 px-4 sm:px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-amber-500/30 hover:shadow-lg hover:shadow-amber-500/40 hover:-translate-y-0.5 active:translate-y-0 active:from-amber-500 active:to-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-slate-950 transition-all duration-200 shrink-0"
          >
            <span className="text-lg leading-none">+</span>
            <span className="hidden sm:inline">Add Book</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;