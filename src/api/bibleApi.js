// src/api/bibleApi.js
import axios from "axios";

const BASE_URL = "https://api.scripture.api.bible/v1";
const API_KEY = import.meta.env.VITE_API_KEY;
const BIBLE_ID = import.meta.env.VITE_BIBLE_ID;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "api-key": API_KEY,
  },
});

export const getBooks = async () => {
  try {
    const response = await api.get(`/bibles/${BIBLE_ID}/books`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

export const getChapters = async (bookId) => {
  try {
    const response = await api.get(
      `/bibles/${BIBLE_ID}/books/${bookId}/chapters`
    );
    // Filter chapter dengan property reference (ini adalah pasal)
    return response.data.data.filter((c) => c.reference);
  } catch (error) {
    console.error("Error fetching chapters:", error);
    return [];
  }
};

export const getChapterContent = async (chapterId) => {
  try {
    // Bersihkan jika chapterId punya prefix Bible ID
    const cleanedId = chapterId.replace(`${BIBLE_ID}.`, "");

    const response = await api.get(
      `/bibles/${BIBLE_ID}/chapters/${cleanedId}`,
      {
        params: {
          "content-type": "text",
          "include-notes": false,
          "include-titles": true,
          "include-chapter-numbers": false,
          "include-verse-numbers": true,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching chapter content:",
      error.response?.data || error.message
    );
    return null;
  }
};

export const searchBible = async (query) => {
  try {
    if (query.length < 3) return [];
    const response = await api.get(`/bibles/${BIBLE_ID}/search`, {
      params: {
        query: query,
        limit: 10,
        sort: "relevance",
      },
    });

    const verses = response.data.data.verses || []; // ganti struktur di sini
    console.log("Search results:", verses);
    return verses;
  } catch (error) {
    console.error("Error searching:", error.response?.data || error.message);
    return [];
  }
};
