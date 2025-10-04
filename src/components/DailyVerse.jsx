// src/components/DailyVerse.jsx
import React, { useState, useEffect } from "react";
import { getChapterContent } from "../api/bibleApi";
import { useBible } from "../context/BibleContext";

const DailyVerse = () => {
  const { setSelectedChapterId } = useBible();
  const [verseText, setVerseText] = useState(
    "TUHAN adalah gembalaku, takkan kekurangan aku."
  );
  const [reference, setReference] = useState("Mazmur 23:1");
  const [loading, setLoading] = useState(false);

  const BIBLE_ID_FROM_ENV = import.meta.env.VITE_BIBLE_ID;

  const dailyChapterId = `${BIBLE_ID_FROM_ENV}.PSA.23`;

  useEffect(() => {
    setLoading(true);
    // Mengambil konten pasal dan mengekstrak ayat 1
    getChapterContent(dailyChapterId)
      .then((data) => {
        if (data && data.content) {
          // Cara yang sangat sederhana: Cari teks di dalam tag <span data-verse-id="...23001">
          // Ini sangat bergantung pada struktur HTML API.Bible.
          // Untuk keandalan, disarankan menggunakan endpoint /verses/{verseId} atau parsing HTML yang lebih baik.
          const verseMatch = data.content.match(
            /<span data-verse-id="[^"]+23001">(.+?)<\/span>/
          );
          if (verseMatch && verseMatch[1]) {
            const cleanedText = verseMatch[1].replace(/<[^>]*>?/gm, "").trim();
            setVerseText(cleanedText);
          }
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleGoToVerse = () => {
    setSelectedChapterId(dailyChapterId);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg border-l-4 border-yellow-500">
      <h3 className="text-xl font-bold text-yellow-700 mb-2">Ayat Harian ✨</h3>
      <p className="italic text-gray-700 mb-3 text-base">
        {loading ? "Memuat ayat..." : verseText}
      </p>
      <button
        onClick={handleGoToVerse}
        className="text-sm font-semibold text-sky-600 hover:text-sky-800 transition"
      >
        {reference} &rarr;
      </button>
    </div>
  );
};

export default DailyVerse;
