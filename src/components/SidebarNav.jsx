// src/components/SidebarNav.jsx
import React, { useState, useEffect } from "react";
import { useBible } from "../context/BibleContext";
import { getChapters } from "../api/bibleApi";

const ACTIVE_BIBLE_ID = import.meta.env.VITE_BIBLE_ID;

const SidebarNav = () => {
  const {
    books,
    loadingBooks,
    selectedBook,
    setSelectedBook,
    selectedChapterId,
    setSelectedChapterId,
  } = useBible();

  const [chapters, setChapters] = useState([]);
  const [loadingChapters, setLoadingChapters] = useState(false);
  const [isBookListOpen, setIsBookListOpen] = useState(false);

  // Muat pasal saat selectedBook berubah
  useEffect(() => {
    if (selectedBook) {
      setLoadingChapters(true);
      getChapters(selectedBook.id)
        .then(setChapters)
        .finally(() => setLoadingChapters(false));
    } else {
      setChapters([]);
    }
  }, [selectedBook]);

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setIsBookListOpen(false);
    // Secara default, muat pasal 1 saat kitab baru dipilih
    setSelectedChapterId(`${ACTIVE_BIBLE_ID}.${book.id}.1`);
  };

  const handleChapterSelect = (chapterId) => {
    setSelectedChapterId(chapterId);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold text-sky-700">Navigasi Alkitab</h2>

      {/* Pemilih Kitab */}
      <div className="relative">
        <button
          onClick={() => setIsBookListOpen(!isBookListOpen)}
          className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-lg flex justify-between items-center transition duration-200"
        >
          {selectedBook
            ? selectedBook.name
            : loadingBooks
            ? "Memuat Kitab..."
            : "Pilih Kitab"}
          <svg
            className={`w-4 h-4 transition-transform ${
              isBookListOpen ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        {isBookListOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-xl max-h-80 overflow-y-auto">
            {books.map((book) => (
              <div
                key={book.id}
                onClick={() => handleBookSelect(book)}
                className={`py-2 px-4 cursor-pointer hover:bg-sky-50 ${
                  selectedBook?.id === book.id ? "bg-sky-100 font-bold" : ""
                }`}
              >
                {book.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Daftar Pasal */}
      <h3 className="text-xl font-semibold mt-4 text-sky-700">Pasal</h3>
      {loadingChapters ? (
        <p className="text-gray-500">Memuat pasal...</p>
      ) : (
        <div className="grid grid-cols-5 gap-2 max-h-80 overflow-y-auto p-1">
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => handleChapterSelect(chapter.id)}
              className={`p-2 rounded-lg text-sm transition duration-200 
                ${
                  selectedChapterId === chapter.id
                    ? "bg-sky-700 text-white shadow-md"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                }`}
            >
              {/* Ambil hanya nomor pasal (misal: '1') */}
              {chapter.number}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarNav;
