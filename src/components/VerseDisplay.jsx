// src/components/VerseDisplay.jsx
import React, { useState, useEffect } from "react";
import { useBible } from "../context/BibleContext";
import { getChapterContent } from "../api/bibleApi";
import { BookmarkIcon } from "@heroicons/react/24/solid"; // Asumsi Heroicons terinstal

const VerseDisplay = () => {
  const { selectedChapterId, toggleBookmark, getBookAndChapterRef } =
    useBible();
  const [contentHtml, setContentHtml] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedChapterId) {
      setLoading(true);
      getChapterContent(selectedChapterId)
        .then((data) => {
          if (data && data.content) {
            setContentHtml(data.content);
          } else {
            setContentHtml(
              '<p class="text-red-500">Konten pasal tidak ditemukan. Cek BIBLE_ID atau API Key Anda.</p>'
            );
          }
        })
        .finally(() => setLoading(false));
    }
  }, [selectedChapterId]);

  if (!selectedChapterId) {
    return (
      <div className="p-8 text-center text-gray-500 text-xl">
        Pilih Kitab dan Pasal dari navigasi untuk mulai membaca.
      </div>
    );
  }

  const handleToggleChapterBookmark = () => {
    const { chapterRef } = getBookAndChapterRef;
    // Gunakan 50 karakter pertama sebagai snippet
    const snippet = contentHtml
      ? contentHtml.replace(/<[^>]*>?/gm, "").substring(0, 50) + "..."
      : "Pasal";
    toggleBookmark(chapterRef, snippet);
  };

  return (
    <div className="p-4 md:p-8 bg-white shadow-xl rounded-lg">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-3xl font-extrabold text-indigo-800">
          {getBookAndChapterRef.chapterRef}
        </h2>
        <button
          onClick={handleToggleChapterBookmark}
          className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition duration-200"
          title="Bookmark Pasal Ini"
        >
          <BookmarkIcon className="w-6 h-6" />
        </button>
      </div>

      {loading ? (
        <div className="text-center text-xl text-indigo-600 animate-pulse">
          Memuat Firman Tuhan...
        </div>
      ) : (
        <div
          className="prose max-w-none text-gray-800 leading-relaxed text-lg"
          // API.Bible mengembalikan konten dalam bentuk HTML
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      )}
    </div>
  );
};

export default VerseDisplay;
