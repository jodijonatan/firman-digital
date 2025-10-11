import React, { useState, useRef } from "react";
import { useBible } from "../context/BibleContext";
import { searchBible } from "../api/bibleApi";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

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
    const chapterId =
      verse.chapterId ||
      verse.id.split(":").pop().split(".").slice(0, 2).join(".");

    setSelectedChapterId(chapterId);
    setQuery("");
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
        <div className="absolute z-20 w-full top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-xl max-h-60 overflow-y-auto">
          {loading && (
            <div className="p-3 text-center text-sky-600">Mencari...</div>
          )}

          {!loading && results.length === 0 && query.length >= 3 && (
            <div className="p-3 text-center text-gray-500">
              Tidak ada hasil ditemukan.
            </div>
          )}

          {results.map((verse) => (
            <div
              key={verse.id}
              onClick={() => handleResultClick(verse)}
              className="p-3 border-b cursor-pointer hover:bg-sky-50"
            >
              <p className="font-semibold text-sky-700">{verse.reference}</p>
              <p className="text-sm text-gray-600 line-clamp-2">{verse.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuickSearch;
