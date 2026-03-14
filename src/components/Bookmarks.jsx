// src/components/Bookmarks.jsx
import React from "react";
import { useBible } from "../context/BibleContext";
import { TrashIcon, BookOpenIcon } from "@heroicons/react/24/outline";

const Bookmarks = () => {
  const { bookmarks, toggleBookmark, setSelectedChapterId } = useBible();

  const handleGoToBookmark = (chapterId) => {
    setSelectedChapterId(chapterId);
  };

  return (
    <div className="p-5 border-t border-slate-50 mt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-black text-sky-900 tracking-tight">TERSIMPAN</h3>
        <span className="bg-sky-100 text-sky-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
            {bookmarks.length} ITEM
        </span>
      </div>

      {bookmarks.length === 0 ? (
        <div className="p-6 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <BookOpenIcon className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs text-slate-400 font-medium">
            Belum ada ayat yang di-bookmark.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {bookmarks.map((b) => (
            <li
              key={b.id}
              className="group flex justify-between items-start p-3 bg-white hover:bg-sky-50 rounded-2xl border border-slate-100 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
              onClick={() => handleGoToBookmark(b.chapterId)}
            >
              <div className="flex-1 overflow-hidden">
                <p className="font-extrabold text-sky-800 group-hover:text-sky-900 transition text-sm">
                  {b.reference}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1 italic">
                  {b.contentSnippet}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBookmark(b.reference, b.contentSnippet);
                }}
                className="ml-2 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300"
                title="Hapus Bookmark"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Bookmarks;
