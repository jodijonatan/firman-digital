// src/components/VerseDisplay.jsx
import React, { useState, useEffect } from "react";
import { useBible } from "../context/BibleContext";
import { getChapterContent } from "../api/bibleApi";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import { BookmarkIcon as BookmarkOutline } from "@heroicons/react/24/outline";
import SkeletonLoader from "./SkeletonLoader";

const VerseDisplay = () => {
  const { selectedChapterId, toggleBookmark, getBookAndChapterRef, bookmarks } =
    useBible();
  const [contentHtml, setContentHtml] = useState(null);
  const [loading, setLoading] = useState(false);

  const isBookmarked = bookmarks.some(b => b.chapterId === selectedChapterId);

  useEffect(() => {
    let isMounted = true;
    if (selectedChapterId) {
      setLoading(true);
      getChapterContent(selectedChapterId)
        .then((data) => {
          if (!isMounted) return;
          if (data && data.content) {
            setContentHtml(data.content);
          } else {
            setContentHtml(
              '<p class="text-red-500 font-bold p-4 bg-red-50 rounded-xl">Maaf, konten pasal tidak dapat ditemukan saat ini.</p>'
            );
          }
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
    }
    return () => { isMounted = false; };
  }, [selectedChapterId]);

  if (!selectedChapterId) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-3xl shadow-sm border border-slate-100">
        <div className="bg-sky-50 p-6 rounded-full mb-6">
          <BookmarkOutline className="w-12 h-12 text-sky-200" />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Pilih Bacaan</h3>
        <p className="text-slate-500 max-w-xs">Pilih Kitab dan Pasal dari navigasi untuk mulai membaca Firman Tuhan.</p>
      </div>
    );
  }

  const handleToggleChapterBookmark = () => {
    const { chapterRef } = getBookAndChapterRef;
    const snippet = contentHtml
      ? contentHtml.replace(/<[^>]*>?/gm, "").substring(0, 80).trim() + "..."
      : "Pasal";
    toggleBookmark(chapterRef, snippet);
  };

  return (
    <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-100 transition-all duration-500">
      {/* Header Ayat */}
      <div className="p-6 md:p-8 border-b border-slate-50 bg-gradient-to-br from-white to-slate-50/50 flex justify-between items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-sky-900 tracking-tighter uppercase">
            {getBookAndChapterRef.chapterRef}
          </h2>
          <div className="h-1.5 w-16 bg-sky-500 rounded-full mt-2" />
        </div>
        
        <button
          onClick={handleToggleChapterBookmark}
          className={`p-3 rounded-2xl transition-all duration-300 transform active:scale-90 shadow-lg ${
            isBookmarked 
              ? "bg-yellow-400 text-white shadow-yellow-100" 
              : "bg-white text-slate-300 hover:text-sky-500 shadow-slate-100 border border-slate-100"
          }`}
          title={isBookmarked ? "Hapus Bookmark" : "Simpan Pasal Ini"}
        >
          {isBookmarked ? (
            <BookmarkIcon className="w-7 h-7" />
          ) : (
            <BookmarkOutline className="w-7 h-7" />
          )}
        </button>
      </div>

      {/* Konten Ayat */}
      <div className="p-6 md:p-10 min-h-[400px]">
        {loading ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
               <div className="w-8 h-8 rounded-full bg-slate-100 animate-pulse" />
               <div className="h-6 bg-slate-100 rounded-full w-48 animate-pulse" />
            </div>
            <SkeletonLoader type="line" count={12} className="!h-6" />
          </div>
        ) : (
          <div
            className="prose prose-sky max-w-none text-slate-700 leading-[1.8] text-xl font-serif tracking-tight"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        )}
      </div>
      
      {/* Footer / Navigasi Cepat (Optional) */}
      {!loading && contentHtml && (
         <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-50 text-center">
            <p className="text-slate-400 text-sm italic font-medium">"Firman-Mu itu pelita bagi kakiku dan terang bagi jalanku."</p>
         </div>
      )}
    </div>
  );
};

export default VerseDisplay;
