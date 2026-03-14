// src/components/SidebarNav.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useBible } from "../context/BibleContext";
import { getChapters } from "../api/bibleApi";
import SkeletonLoader from "./SkeletonLoader";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

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
  const [bookSearch, setBookSearch] = useState("");

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

  const filteredBooks = useMemo(() => {
    return books.filter(b => b.name.toLowerCase().includes(bookSearch.toLowerCase()));
  }, [books, bookSearch]);

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setIsBookListOpen(false);
    setBookSearch("");
    // Secara default, muat pasal 1 saat kitab baru dipilih
    setSelectedChapterId(`${ACTIVE_BIBLE_ID}.${book.id}.1`);
  };

  const handleChapterSelect = (chapterId) => {
    setSelectedChapterId(chapterId);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-50 bg-slate-50/50">
        <h2 className="text-xl font-black text-sky-900 tracking-tighter uppercase italic">Navigasi Sabda</h2>
      </div>

      <div className="p-6 space-y-8">
        {/* Pemilih Kitab */}
        <div>
           <label className="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-[0.2em] px-1">Pilih Kitab</label>
           <div className="relative">
            <button
              onClick={() => setIsBookListOpen(!isBookListOpen)}
              disabled={loadingBooks}
              className={`w-full bg-white border-2 text-left font-extrabold py-4 px-5 rounded-2xl flex justify-between items-center transition-all duration-300 shadow-sm ${isBookListOpen ? 'border-sky-500 ring-4 ring-sky-50' : 'border-slate-100 hover:border-sky-200 text-slate-700'}`}
            >
              <span className="truncate pr-4">
                {selectedBook ? selectedBook.name : loadingBooks ? "Memuat..." : "Pilih Kitab"}
              </span>
              <svg
                className={`w-5 h-5 text-sky-500 transition-transform duration-500 ${isBookListOpen ? "rotate-180" : "rotate-0"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isBookListOpen && (
              <div className="absolute z-20 w-full mt-3 bg-white border border-slate-100 rounded-3xl shadow-2xl max-h-[70vh] md:max-h-96 overflow-hidden flex flex-col scale-in-center">
                <div className="p-3 border-b border-slate-50 bg-slate-50/30">
                    <div className="relative flex items-center">
                        <MagnifyingGlassIcon className="size-4 absolute left-3 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Cari kitab..." 
                            className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-sky-400 transition-colors"
                            value={bookSearch}
                            onChange={(e) => setBookSearch(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
                <div className="overflow-y-auto p-2 scrollbar-thin flex-1">
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map((book) => (
                        <div
                            key={book.id}
                            onClick={() => handleBookSelect(book)}
                            className={`py-3 px-4 rounded-xl cursor-pointer transition-all duration-200 mb-1 ${
                            selectedBook?.id === book.id 
                                ? "bg-sky-600 text-white font-black shadow-lg shadow-sky-100" 
                                : "text-slate-600 hover:bg-sky-50 font-bold"
                            }`}
                        >
                            {book.name}
                        </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-slate-400 text-sm font-medium">Kitab tidak ditemukan</div>
                    )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Daftar Pasal */}
        <div>
          <div className="flex justify-between items-center mb-4 px-1">
             <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Pilih Pasal</label>
             {!loadingChapters && chapters.length > 0 && (
                <span className="text-[10px] font-black text-sky-400">{chapters.length} PASAL</span>
             )}
          </div>
          
          {loadingChapters ? (
            <SkeletonLoader type="sidebar" />
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 max-h-96 overflow-y-auto p-1 scrollbar-thin">
              {chapters.map((chapter) => (
                <button
                  key={chapter.id}
                  onClick={() => handleChapterSelect(chapter.id)}
                  className={`aspect-square flex items-center justify-center rounded-2xl text-base font-black transition-all duration-300 transform active:scale-90
                    ${
                      selectedChapterId === chapter.id
                        ? "bg-sky-600 text-white shadow-xl shadow-sky-100 scale-110 z-10"
                        : "bg-slate-100 hover:bg-sky-100 text-slate-500 hover:text-sky-700"
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
