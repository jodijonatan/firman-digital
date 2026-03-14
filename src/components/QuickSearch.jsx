// src/components/QuickSearch.jsx
import React, { useState, useRef } from "react";
import { useBible } from "../context/BibleContext";
import { searchBible } from "../api/bibleApi";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

const QuickSearch = () => {
  const { setSelectedChapterId } = useBible();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceTimer = useRef(null);

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      if (newQuery.length < 3) {
        setResults([]);
        return;
      }

      setLoading(true);
      searchBible(newQuery)
        .then((data) => setResults(data))
        .catch(() => setResults([]))
        .finally(() => setLoading(false));
    }, 400);
  };

  const handleResultClick = (verse) => {
    // API Bible search results sometimes have different ID formats
    const chapterId =
      verse.chapterId ||
      verse.id.split(":").pop().split(".").slice(0, 2).join(".");

    setSelectedChapterId(chapterId);
    setQuery("");
    setResults([]);
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
  };

  return (
    <div className="relative group">
      <div className={`flex items-center bg-white border-2 rounded-2xl p-1 transition-all duration-300 shadow-sm ${query ? 'border-sky-400 ring-4 ring-sky-50' : 'border-slate-100 hover:border-slate-200'}`}>
        <div className="p-2">
            <MagnifyingGlassIcon className={`w-6 h-6 ${query ? 'text-sky-500' : 'text-slate-400'}`} />
        </div>
        <input
          type="text"
          placeholder="Cari ayat atau topik (contoh: Kasih)..."
          className="w-full focus:outline-none text-slate-700 font-medium placeholder:text-slate-300 py-2 bg-transparent"
          value={query}
          onChange={handleChange}
        />
        {query && (
            <button onClick={clearSearch} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                <XMarkIcon className="w-5 h-5" />
            </button>
        )}
      </div>

      {(loading || results.length > 0 || (query.length >= 3 && !loading && results.length === 0)) && (
        <div className="absolute z-30 w-full top-full mt-3 bg-white border border-slate-100 rounded-2xl shadow-2xl max-h-80 overflow-y-auto p-2 scrollbar-thin">
          {loading && (
            <div className="p-8 text-center">
                <div className="flex justify-center space-x-1 mb-2">
                    <div className="w-2 h-2 bg-sky-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-sky-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-sky-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <p className="text-sky-600 font-bold text-sm">Sedang mencari Firman...</p>
            </div>
          )}

          {!loading && results.length === 0 && query.length >= 3 && (
            <div className="p-8 text-center">
              <p className="text-slate-400 font-medium">Hulu, hasil tidak ditemukan.</p>
              <p className="text-xs text-slate-300 mt-1">Coba kata kunci lain.</p>
            </div>
          )}

          {results.map((verse) => (
            <div
              key={verse.id}
              onClick={() => handleResultClick(verse)}
              className="p-4 rounded-xl mb-1 cursor-pointer hover:bg-sky-50 transition-colors border-b border-slate-50 last:border-0"
            >
              <div className="flex justify-between items-start mb-1">
                <p className="font-black text-sky-800 text-sm tracking-tight">{verse.reference}</p>
                <span className="text-[10px] font-bold bg-sky-100 text-sky-600 px-2 py-0.5 rounded-full">AYAT</span>
              </div>
              <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed italic">"{verse.text}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuickSearch;
