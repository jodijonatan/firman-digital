// src/components/DailyVerse.jsx
import React, { useState, useEffect } from "react";
import { getChapterContent } from "../api/bibleApi";
import { useBible } from "../context/BibleContext";
import { SparklesIcon } from "@heroicons/react/24/solid";

const DailyVerse = () => {
  const { setSelectedChapterId } = useBible();
  const [verseText, setVerseText] = useState(
    "TUHAN adalah gembalaku, takkan kekurangan aku."
  );
  const [reference, setReference] = useState("Mazmur 23:1");
  const [loading, setLoading] = useState(false);

  const BIBLE_ID_FROM_ENV = import.meta.env.VITE_BIBLE_ID;

  // Untuk keperluan demo/MVP, kita ambil ayat pertama dari Kejadian 1
  // Di masa depan, ini bisa berupa list ayat yang diundi secara harian.
  const dailyChapterId = `${BIBLE_ID_FROM_ENV}.GEN.1`;

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    
    getChapterContent(dailyChapterId)
      .then((data) => {
        if (!isMounted || !data || !data.content) return;

        // Parsing HTML yang lebih aman menggunakan DOMParser (jika di browser)
        // Jika tidak, kita gunakan regex yang sedikit lebih robust tapi tetap waspada
        // API Bible sering membungkus teks ayat dalam span dengan data-verse-id
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.content, "text/html");
        
        // Cari ayat pertama (biasanya diakhiri dengan '001')
        const firstVerseSpan = doc.querySelector('span[data-verse-id$="001"]');
        
        if (firstVerseSpan) {
          setVerseText(firstVerseSpan.textContent.trim());
          setReference("Kejadian 1:1"); // Sesuai dengan GEN.1 ayat 001
        }
      })
      .catch(err => {
        console.error("DailyVerse fetch error:", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [dailyChapterId]);

  const handleGoToVerse = () => {
    setSelectedChapterId(dailyChapterId);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-white to-sky-50 shadow-lg rounded-2xl border-l-8 border-yellow-400 relative overflow-hidden group">
      {/* Background decoration */}
      <div className="absolute -right-4 -top-4 text-yellow-100 opacity-50 group-hover:scale-110 transition-transform duration-500">
        <SparklesIcon className="w-24 h-24" />
      </div>

      <h3 className="text-xl font-bold text-yellow-600 mb-3 flex items-center gap-2">
        <SparklesIcon className="w-5 h-5" />
        Ayat Harian
      </h3>
      
      {loading ? (
        <div className="space-y-2 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      ) : (
        <p className="italic text-slate-700 mb-4 text-lg leading-relaxed font-serif">
          "{verseText}"
        </p>
      )}

      <button
        onClick={handleGoToVerse}
        disabled={loading}
        className="text-sm font-bold text-sky-700 hover:text-sky-900 transition flex items-center gap-1 group/btn"
      >
        <span>{reference}</span>
        <span className="group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
      </button>
    </div>
  );
};

export default DailyVerse;
