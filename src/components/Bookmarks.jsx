import React from "react";
import { useBible } from "../context/BibleContext";
import { TrashIcon, BookOpenIcon } from "@heroicons/react/24/outline";

const Bookmarks = () => {
  const { bookmarks, toggleBookmark, setSelectedChapterId } = useBible();

  const handleGoToBookmark = (chapterId) => {
    setSelectedChapterId(chapterId);
  };

  return (
    <div className="p-4 border-t border-gray-200 mt-4">
      <h3 className="text-xl font-semibold mb-3 text-sky-700">
        Tersimpan (Bookmark)
      </h3>

      {bookmarks.length === 0 ? (
        <p className="text-sm text-gray-500">
          Belum ada ayat atau pasal yang di-bookmark.
        </p>
      ) : (
        <ul className="space-y-3">
          {bookmarks.map((b) => (
            <li
              key={b.id}
              className="flex justify-between items-start p-3 bg-gray-50 rounded-lg border border-gray-100"
            >
              <div
                className="flex-1 cursor-pointer"
                onClick={() => handleGoToBookmark(b.chapterId)}
              >
                <p className="font-bold text-sky-700 hover:text-sky-900 transition">
                  {b.reference}
                </p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {b.contentSnippet}
                </p>
              </div>
              <button
                onClick={() => toggleBookmark(b.reference, b.contentSnippet)}
                className="ml-3 p-1 text-red-500 hover:text-red-700 transition"
                title="Hapus Bookmark"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Bookmarks;
