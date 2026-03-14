// src/pages/WelcomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import About from "../components/About";
import Features from "../components/Features";

const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-white font-sans antialiased overflow-x-hidden">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-24 md:py-40 bg-slate-900 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-500/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="absolute inset-0 z-0 opacity-20">
            <img
              src="/images/hero.jpg"
              alt="Cahaya Ilahi"
              className="w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-transparent to-slate-900" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-bold tracking-widest uppercase animate-fade-in">
              Selamat Datang di Firman Digital
            </div>
            
            <h2 className="text-4xl md:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tighter uppercase italic">
              "Firman-Mu itu pelita bagi kakiku dan terang bagi jalanku."
            </h2>
            
            <p className="text-xl md:text-2xl font-serif italic text-sky-200/80 mb-10 tracking-wide">
              — Mazmur 119:105
            </p>

            <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              Temukan kedalaman iman kamu melalui Kitab Suci. Jelajahi Alkitab
              Katolik, renungkan Sabda Tuhan, dan biarkan Ia membimbing setiap
              langkah hidup kamu melalui teknologi digital yang modern.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                to="/alkitab"
                className="w-full sm:w-auto px-10 py-4 rounded-2xl font-black text-white bg-sky-600 hover:bg-sky-500 transition-all duration-300 shadow-xl shadow-sky-900/40 hover:-translate-y-1 active:scale-95 uppercase tracking-wider"
              >
                Baca Firman Tuhan
              </Link>
              <Link
                to="/video"
                className="w-full sm:w-auto px-10 py-4 rounded-2xl font-black text-white bg-white/5 backdrop-blur-md border-2 border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 active:scale-95 uppercase tracking-wider"
              >
                Jelajahi Video
              </Link>
            </div>
          </div>
        </section>

        {/* Features & About Section */}
        <div className="bg-white relative z-10 -mt-10 rounded-t-[50px] shadow-[0_-20px_50px_-15px_rgba(0,0,0,0.1)]">
            <Features />
            <About />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WelcomePage;
