import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import About from "../components/About";
import Features from "../components/Features";

const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      <div className="bg-white shadow-xl">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <section className="relative text-center py-20 md:py-32 bg-gray-100 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                src="/images/hero.jpg"
                alt="Cahaya Ilahi"
                className="w-full h-full object-cover opacity-15"
              />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-2 leading-tight">
                "Firman-Mu itu pelita bagi kakiku dan terang bagi jalanku."
              </h2>
              <p className="text-lg italic text-gray-600 mb-8">
                Mazmur 119:105
              </p>
              <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
                Temukan kedalaman iman kamu melalui Kitab Suci. Jelajahi Alkitab
                Katolik, renungkan Sabda Tuhan, dan biarkan Ia membimbing setiap
                langkah hidup kamu.
              </p>

              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/alkitab"
                  className="px-8 py-3 rounded-lg font-bold text-white bg-sky-700 hover:bg-sky-800 transition duration-300 shadow-md"
                >
                  Baca Firman Tuhan
                </Link>
                <Link
                  to="/video"
                  className="px-8 py-3 rounded-lg font-bold text-sky-700 bg-transparent border-2 border-sky-700 hover:bg-sky-700 hover:text-white transition duration-300"
                >
                  Jelalahi Video
                </Link>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <Features />

          {/* About Section */}
          <About />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default WelcomePage;
