// src/context/BibleContext.jsx
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { getBooks } from "../api/bibleApi";

const BibleContext = createContext();

export const useBible = () => useContext(BibleContext);

const BIBLE_ID_FROM_ENV = import.meta.env.VITE_BIBLE_ID;

// Referensi default ke Kejadian 1
const DEFAULT_CHAPTER_ID = `${BIBLE_ID_FROM_ENV}.GEN.1`;

export const BibleProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [selectedChapterId, setSelectedChapterId] =
    useState(DEFAULT_CHAPTER_ID);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loadingBooks, setLoadingBooks] = useState(true);

  // Fungsionalitas Bookmark menggunakan localStorage dengan validasi
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem("bible_bookmarks");
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      // Validasi sederhana: pastikan ini adalah array
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Failed to parse bookmarks from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    // Muat daftar kitab
    let isMounted = true;
    getBooks().then((data) => {
      if (!isMounted) return;
      setBooks(data);
      const defaultBook = data.find((b) => b.id === "GEN"); // Set default book
      setSelectedBook(defaultBook);
      setLoadingBooks(false);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    // Sinkronisasi bookmark ke localStorage
    localStorage.setItem("bible_bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = useCallback(
    (reference, contentSnippet) => {
      setBookmarks((prev) => {
        const existingBookmark = prev.find((b) => b.reference === reference);
        if (existingBookmark) {
          return prev.filter((b) => b.reference !== reference);
        } else {
          return [
            ...prev,
            {
              reference,
              contentSnippet,
              chapterId: selectedChapterId,
              id: Date.now(),
            },
          ];
        }
      });
    },
    [selectedChapterId]
  );

  const getBookAndChapterRef = useMemo(() => {
    if (!selectedChapterId || !books.length)
      return { bookName: "", chapterRef: "" };

    const parts = selectedChapterId.split(".");
    let bookId = "";
    let chapterNumber = "";

    // Cari ID kitab & nomor pasal sesuai format yang ada
    if (parts.length === 3) {
      // Format: BIBLEID.BOOKID.CHAPTERNO
      bookId = parts[1];
      chapterNumber = parts[2];
    } else if (parts.length === 2) {
      // Format: BOOKID.CHAPTERNO
      bookId = parts[0];
      chapterNumber = parts[1];
    }

    const currentBook = books.find((b) => b.id === bookId);

    return {
      bookName: currentBook ? currentBook.name : "Memuat...",
      chapterRef: currentBook
        ? `${currentBook.name} Pasal ${chapterNumber}`
        : `Pasal ${chapterNumber || ""}`,
    };
  }, [selectedChapterId, books]);

  const value = useMemo(
    () => ({
      books,
      loadingBooks,
      selectedBook,
      setSelectedBook,
      selectedChapterId,
      setSelectedChapterId,
      bookmarks,
      toggleBookmark,
      getBookAndChapterRef,
    }),
    [
      books,
      loadingBooks,
      selectedBook,
      selectedChapterId,
      bookmarks,
      toggleBookmark,
      getBookAndChapterRef,
    ]
  );

  return (
    <BibleContext.Provider value={value}>{children}</BibleContext.Provider>
  );
};
