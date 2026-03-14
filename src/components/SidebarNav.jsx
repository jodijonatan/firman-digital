// src/components/SidebarNav.jsx
import React, { useState, useEffect } from "react";
import { useBible } from "../context/BibleContext";
import { getChapters } from "../api/bibleApi";
import SkeletonLoader from "./SkeletonLoader";

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
    let isMounted = true;
    if (selectedBook) {
      setLoadingChapters(true);
      getChapters(selectedBook.id)
        .then(data => {
          if (isMounted) setChapters(data);
        })
        .finally(() => {
          if (isMounted) setLoadingChapters(false);
        });
    } else {
      setChapters([]);
    }
    return () => { isMounted = false; };
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
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-5 border-b border-slate-50 bg-slate-50/50">
        <h2 className="text-xl font-black text-sky-900 tracking-tight">NAVIGASI ALKITAB</h2>
      </div>

      <div className="p-5 space-y-6">
        {/* Pemilih Kitab */}
        <div>
           <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Pilih Kitab</label>
           <div className="relative">
            <button
              onClick={() => setIsBookListOpen(!isBookListOpen)}
              disabled={loadingBooks}
              className="w-full bg-white border-2 border-slate-100 hover:border-sky-200 text-slate-700 font-bold py-3 px-4 rounded-xl flex justify-between items-center transition-all duration-300 shadow-sm"
            >
              <span className="truncate">
                {selectedBook ? selectedBook.name : loadingBooks ? "Memuat..." : "Pilih Kitab"}
              </span>
              <svg
                className={`w-5 h-5 text-sky-500 transition-transform duration-300 ${isBookListOpen ? "rotate-180" : "rotate-0"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isBookListOpen && (
              <div className="absolute z-20 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl max-h-80 overflow-y-auto p-2 scrollbar-thin">
                {books.map((book) => (
                  <div
                    key={book.id}
                    onClick={() => handleBookSelect(book)}
                    className={`py-3 px-4 rounded-xl cursor-pointer transition-colors ${
                      selectedBook?.id === book.id 
                        ? "bg-sky-600 text-white font-bold" 
                        : "text-slate-600 hover:bg-sky-50"
                    }`}
                  >
                    {book.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Daftar Pasal */}
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Pilih Pasal</label>
          {loadingChapters ? (
            <SkeletonLoader type="sidebar" />
          ) : (
            <div className="grid grid-cols-5 gap-2 max-h-80 overflow-y-auto p-1 scrollbar-thin">
              {chapters.map((chapter) => (
                <button
                  key={chapter.id}
                  onClick={() => handleChapterSelect(chapter.id)}
                  className={`aspect-square flex items-center justify-center rounded-xl text-sm font-bold transition-all duration-300 transform active:scale-95
                    ${
                      selectedChapterId === chapter.id
                        ? "bg-sky-600 text-white shadow-lg shadow-sky-200 scale-105"
                        : "bg-slate-100 hover:bg-sky-100 text-slate-600"
                    }`}
                >
                  {chapter.number}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarNav;
