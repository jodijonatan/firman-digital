// src/components/QuickSearch.jsx
import React, { useState } from "react";
import { useBible } from "../context/BibleContext";
import { searchBible } from "../api/bibleApi";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"; // Asumsi Heroicons terinstal

const QuickSearch = () => {
  const { setSelectedChapterId } = useBible();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Implementasi Debounce sederhana (untuk performa)
  const debounceSearch = React.useCallback((newQuery) => {
    if (newQuery.length < 3) {
      setResults([]);
      return;
    }
    setLoading(true);
    searchBible(newQuery).then((data) => {
      setResults(data);
      setLoading(false);
    });
  }, []);

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debounceSearch(newQuery);
  };

  const handleResultClick = (chapterId) => {
    setSelectedChapterId(chapterId);
    setQuery(""); // Kosongkan input setelah navigasi
    setResults([]);
  };

  return (
    <div className="relative p-4 bg-white shadow-md rounded-lg col-span-2">
      <div className="flex items-center border border-gray-300 rounded-lg p-2">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Cari kata kunci atau referensi cepat (min 3 huruf)..."
          className="w-full focus:outline-none text-gray-700"
          value={query}
          onChange={handleChange}
        />
      </div>

      {(loading || results.length > 0) && (
        <div className="absolute z-20 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-xl max-h-60 overflow-y-auto left-0 right-0 mx-auto transform translate-y-full">
          {loading && (
            <div className="p-3 text-center text-indigo-600">Mencari...</div>
          )}

          {results.map((verse) => (
            <div
              key={verse.id}
              onClick={() => handleResultClick(verse.chapterId)}
              className="p-3 border-b cursor-pointer hover:bg-indigo-50"
            >
              <p className="font-semibold text-indigo-700">{verse.reference}</p>
              <p className="text-sm text-gray-600 line-clamp-2">{verse.text}</p>
            </div>
          ))}

          {results.length === 0 && !loading && query.length >= 3 && (
            <div className="p-3 text-center text-gray-500">
              Tidak ada hasil ditemukan.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuickSearch;
