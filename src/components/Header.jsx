// src/components/Header.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinkClasses = (path) => 
    `transition-all duration-300 px-6 py-2 rounded-full font-bold text-sm tracking-wide ${
      isActive(path) 
        ? "bg-white text-sky-800 shadow-md" 
        : "text-sky-100 hover:text-white hover:bg-sky-700/50"
    }`;

  const mobileLinkClasses = (path) =>
    `block py-4 px-6 text-lg font-semibold transition-all duration-300 ${
      isActive(path)
        ? "bg-sky-50 text-sky-800 border-l-4 border-sky-600"
        : "text-slate-600 hover:bg-slate-50"
    }`;

  return (
    <header className="bg-gradient-to-r from-sky-900 via-sky-800 to-sky-900 text-white shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex gap-3 items-center group flex-shrink-0">
          <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm group-hover:bg-white/20 transition-colors">
            <img src="/favicon.png" alt="icon" className="size-8" />
          </div>
          <h1 className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-sky-200">
            FIRMAN DIGITAL
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-2 list-none bg-sky-950/30 backdrop-blur-md rounded-full p-1.5 border border-white/10">
            <li>
              <Link to="/alkitab" className={navLinkClasses("/alkitab")}>
                ALKITAB
              </Link>
            </li>
            <li>
              <Link to="/video" className={navLinkClasses("/video")}>
                VIDEO
              </Link>
            </li>
          </ul>
        </nav>

        {/* Hamburger Button */}
        <button
          className="md:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="size-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />
      
      <div
        className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-out md:hidden z-[60] ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex justify-between items-center border-b">
          <span className="font-extrabold text-sky-800 text-xl">Menu</span>
          <button onClick={() => setIsMenuOpen(false)} className="p-2 text-slate-400 hover:text-sky-600 transition-colors">
            <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <nav className="py-4">
          <ul className="list-none">
            <li>
              <Link to="/alkitab" className={mobileLinkClasses("/alkitab")} onClick={() => setIsMenuOpen(false)}>
                Alkitab Digital
              </Link>
            </li>
            <li>
              <Link to="/video" className={mobileLinkClasses("/video")} onClick={() => setIsMenuOpen(false)}>
                Video Renungan
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="absolute bottom-10 left-0 w-full p-8 text-center">
            <p className="text-slate-400 text-sm font-medium">✨ Pelayanan Firman Digital</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
