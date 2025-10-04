import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State untuk menu mobile

  // Class untuk menavigasi link di desktop
  const navLinkClasses =
    "hover:text-slate-900 transition duration-300 px-4 py-2";

  // Class untuk menavigasi link di mobile
  const mobileLinkClasses =
    "block py-3 px-4 text-slate-700 hover:bg-slate-100 transition duration-300";

  return (
    <header className="bg-sky-800 text-white shadow-xl">
      {/* Container utama untuk membatasi lebar di desktop */}
      <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
        {/* Logo/Nama Aplikasi */}
        <div className="flex gap-3 items-center flex-shrink-0">
          <img src="/favicon.png" alt="icon" className="size-10" />
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            <Link to="/" className="block">
              Firman Digital
            </Link>
          </h1>
        </div>

        {/* 1. Navigasi Desktop (Hanya tampil di ukuran md ke atas) */}
        <nav className="hidden md:flex items-center">
          {/* Hapus background transparan di desktop untuk tampilan yang lebih bersih */}
          <ul className="flex gap-4 list-none text-slate-500 font-semibold text-md bg-white rounded-full border border-slate-300 py-1 px-12">
            <li className="cursor-pointer hover:underline">
              <Link to="/alkitab" className={navLinkClasses}>
                Alkitab
              </Link>
            </li>

            <li className="cursor-pointer hover:underline">
              <Link to="/video" className={navLinkClasses}>
                Video
              </Link>
            </li>
          </ul>
        </nav>

        {/* 2. Tombol Hamburger (Hanya tampil di bawah ukuran md) */}
        <button
          className="md:hidden text-white hover:text-gray-200 transition duration-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {/* Ikon Hamburger atau Close */}
          <svg
            className="size-8 cursor-pointer"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              // Ikon Close (X)
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              // Ikon Hamburger
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* 3. Menu Mobile (Tampil berdasarkan state) */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-96 opacity-100 py-2" : "max-h-0 opacity-0"
        }`}
        // Background putih untuk kontras di mobile
        style={{ backgroundColor: "#fff" }}
      >
        <ul className="list-none text-base font-medium">
          <li onClick={() => setIsMenuOpen(false)}>
            <Link to="/alkitab" className={mobileLinkClasses}>
              Alkitab
            </Link>
          </li>
          <li onClick={() => setIsMenuOpen(false)}>
            <Link to="/video" className={mobileLinkClasses}>
              Video
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
