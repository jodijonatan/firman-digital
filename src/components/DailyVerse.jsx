// src/components/DailyVerse.jsx
import React, { useState, useEffect, useMemo } from "react";
import { getChapterContent } from "../api/bibleApi";
import { useBible } from "../context/BibleContext";
import { SparklesIcon } from "@heroicons/react/24/solid";

const CURATED_VERSES = [
  { id: "PSA.23", verse: "001", ref: "Mazmur 23:1" },
  { id: "JER.29", verse: "011", ref: "Yeremia 29:11" },
  { id: "PHP.4", verse: "013", ref: "Filipi 4:13" },
  { id: "PRO.3", verse: "005", ref: "Amsal 3:5" },
  { id: "ISA.41", verse: "010", ref: "Yesaya 41:10" },
  { id: "MAT.6", verse: "033", ref: "Matius 6:33" },
  { id: "ROM.8", verse: "028", ref: "Roma 8:28" },
  { id: "JHN.3", verse: "016", ref: "Yohanes 3:16" },
  { id: "1CO.13", verse: "004", ref: "1 Korintus 13:4" },
  { id: "MAT.11", verse: "028", ref: "Matius 11:28" },
  { id: "HEB.11", verse: "001", ref: "Ibrani 11:1" },
  { id: "GAL.5", verse: "022", ref: "Galatia 5:22" },
  { id: "GAL.5", verse: "001", ref: "Galatia 5:1" },
  { id: "PRO.16", verse: "003", ref: "Amsal 16:3" },
  { id: "2TI.1", verse: "007", ref: "2 Timotius 1:7" },
  { id: "PSA.27", verse: "001", ref: "Mazmur 27:1" },
  { id: "JOS.1", verse: "009", ref: "Yosua 1:9" },
  { id: "ROM.12", verse: "012", ref: "Roma 12:12" },
  { id: "MAT.28", verse: "020", ref: "Matius 28:20" },
  { id: "JAM.4", verse: "007", ref: "Yakobus 4:7" },
  { id: "1PE.5", verse: "007", ref: "1 Petrus 5:7" },
  { id: "PSA.46", verse: "001", ref: "Mazmur 46:1" },
  { id: "PRO.3", verse: "006", ref: "Amsal 3:6" },
  { id: "MAT.7", verse: "007", ref: "Matius 7:7" },
  { id: "GAL.2", verse: "020", ref: "Galatia 2:20" },
  { id: "PHP.4", verse: "006", ref: "Filipi 4:6" },
  { id: "COL.3", verse: "023", ref: "Kolose 3:23" },
  { id: "2CO.5", verse: "017", ref: "2 Korintus 5:17" },
  { id: "EPH.2", verse: "008", ref: "Efesus 2:8" },
  { id: "PSA.37", verse: "004", ref: "Mazmur 37:4" },
  { id: "JHN.14", verse: "006", ref: "Yohanes 14:6" },
];

const DailyVerse = () => {
  const { setSelectedChapterId } = useBible();
  const [verseText, setVerseText] = useState("");
  const [loading, setLoading] = useState(true);

  const BIBLE_ID_FROM_ENV = import.meta.env.VITE_BIBLE_ID;

  // Mendapatkan index ayat berdasarkan hari dalam setahun (Day of Year)
  const activeVerse = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return CURATED_VERSES[dayOfYear % CURATED_VERSES.length];
  }, []);

  const dailyChapterId = `${BIBLE_ID_FROM_ENV}.${activeVerse.id}`;

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    
    getChapterContent(dailyChapterId)
      .then((data) => {
        if (!isMounted || !data || !data.content) return;

        const parser = new DOMParser();
        const doc = parser.parseFromString(data.content, "text/html");
        
        // Cari ayat spesifik berdasarkan verseId dalam list
        const verseSpan = doc.querySelector(`span[data-verse-id$="${activeVerse.verse}"]`);
        
        if (verseSpan) {
          // Bersihkan text dari nomor ayat yang mungkin ada di dalam span
          const cleanText = verseSpan.textContent.replace(/^\d+\s*/, "").trim();
          setVerseText(cleanText);
        } else {
          // Fallback if specific verse not found in content
          setVerseText("Tetaplah berdoa dan bersukacitalah senantiasa.");
        }
      })
      .catch(err => {
        console.error("DailyVerse fetch error:", err);
        setVerseText("Tuhan adalah perlindunganku dan kekuatanku.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [dailyChapterId, activeVerse]);

  const handleGoToVerse = () => {
    setSelectedChapterId(dailyChapterId);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-white to-sky-50 shadow-lg rounded-3xl border-l-[12px] border-yellow-400 relative overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:shadow-sky-100">
      {/* Background decoration */}
      <div className="absolute -right-6 -top-6 text-yellow-200/30 group-hover:text-yellow-200/50 group-hover:scale-125 transition-all duration-700">
        <SparklesIcon className="w-32 h-32" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-yellow-100 rounded-xl">
                <SparklesIcon className="w-5 h-5 text-yellow-600" />
            </div>
            <h3 className="text-sm font-black text-yellow-700 uppercase tracking-[0.2em]">Ayat Harian</h3>
        </div>
        
        {loading ? (
            <div className="space-y-3 animate-pulse py-2">
                <div className="h-4 bg-slate-200 rounded-full w-full"></div>
                <div className="h-4 bg-slate-200 rounded-full w-5/6"></div>
                <div className="h-4 bg-slate-200 rounded-full w-4/6"></div>
            </div>
        ) : (
            <p className="text-slate-800 mb-6 text-xl leading-relaxed font-serif italic font-medium">
            "{verseText}"
            </p>
        )}

        <button
            onClick={handleGoToVerse}
            disabled={loading}
            className="group/btn inline-flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-slate-100 hover:border-sky-200 transition-all duration-300"
        >
            <span className="text-sm font-black text-sky-800 tracking-tight uppercase italic">{activeVerse.ref}</span>
            <div className="size-6 bg-sky-50 rounded-full flex items-center justify-center group-hover/btn:bg-sky-600 transition-colors">
                <span className="text-sky-600 group-hover/btn:text-white group-hover/btn:translate-x-0.5 transition-all">&rarr;</span>
            </div>
        </button>
      </div>
    </div>
  );
};

export default DailyVerse;
