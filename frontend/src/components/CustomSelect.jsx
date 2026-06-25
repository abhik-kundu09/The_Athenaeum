import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiCheck } from "react-icons/fi";

// A custom dropdown with full control over hover/active states for each option.
// Props:
// - icon: React icon component to show on the left
// - value: currently selected value
// - onChange: (newValue) => void
// - options: array of strings
// - id: for label association
const CustomSelect = ({ icon: Icon, value, onChange, options, id }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close on Escape key
    const handleKeyDown = (e) => {
        if (e.key === "Escape") setIsOpen(false);
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen((prev) => !prev);
        }
    };

    const handleSelect = (option) => {
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={containerRef}>
            {/* Trigger button */}
            <button
                id={id}
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                onKeyDown={handleKeyDown}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-2 pl-10 pr-3.5 py-2.5 bg-slate-800/70 border border-slate-700 hover:border-amber-400/50 rounded-xl text-sm text-slate-100 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50"
            >
                {Icon && (
                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                )}
                <span className="truncate text-left">{value}</span>
                <FiChevronDown
                    size={16}
                    className={`text-slate-500 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 text-amber-400" : ""
                        }`}
                />
            </button>

            {/* Dropdown list */}
            {isOpen && (
                <ul
                    role="listbox"
                    className="absolute z-20 mt-2 w-full max-h-60 overflow-y-auto bg-slate-800 border border-slate-700 rounded-xl shadow-lg shadow-black/40 animate-fade-in-up py-1.5"
                >
                    {options.map((option) => {
                        const isSelected = option === value;
                        return (
                            <li
                                key={option}
                                role="option"
                                aria-selected={isSelected}
                                tabIndex={0}
                                onClick={() => handleSelect(option)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        handleSelect(option);
                                    }
                                }}
                                className={`flex items-center justify-between gap-2 px-3.5 py-2 text-sm cursor-pointer transition-all duration-150 ${isSelected
                                        ? "bg-amber-500/15 text-amber-300"
                                        : "text-slate-200 hover:bg-amber-500/10 hover:text-amber-200 hover:pl-5"
                                    }`}
                            >
                                <span className="truncate">{option}</span>
                                {isSelected && <FiCheck size={14} className="text-amber-400 shrink-0" />}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default CustomSelect;