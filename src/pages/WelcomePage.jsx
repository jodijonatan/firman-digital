import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const features = [
  {
    icon: "📖",
    title: "Akses Penuh",
    description:
      "Telusuri seluruh kitab Perjanjian Lama dan Baru dengan mudah.",
  },
  {
    icon: "✨",
    title: "Renungan Harian",
    description:
      "Dapatkan inspirasi dengan ayat dan renungan yang diperbarui setiap hari.",
  },
  {
    icon: "🔍",
    title: "Pencarian Cepat",
    description: "Temukan ayat, bab, atau kata kunci spesifik dalam sekejap.",
  },
];

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
              {/* Gambar latar belakang yang sangat lembut */}
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
                Temukan kedalaman iman Anda melalui Kitab Suci. Jelajahi Alkitab
                Katolik, renungkan Sabda Tuhan, dan biarkan Ia membimbing setiap
                langkah hidup Anda.
              </p>

              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <a
                  href="/app/home"
                  className="px-8 py-3 rounded-lg font-bold text-white bg-sky-700 hover:bg-sky-800 transition duration-300 shadow-md transform hover:scale-[1.02]"
                >
                  Mulai Membaca Sekarang
                </a>
                <a
                  href="/app/daily-verse"
                  className="px-8 py-3 rounded-lg font-bold text-sky-700 bg-transparent border-2 border-sky-700 hover:bg-sky-700 hover:text-white transition duration-300 transform hover:scale-[1.02]"
                >
                  Ayat Harian
                </a>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-20 px-6 bg-white">
            <h3 className="text-3xl font-serif font-bold text-center text-gray-800 mb-12">
              Apa yang Kami Tawarkan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="p-8 text-center bg-gray-50 rounded-xl shadow-lg transition duration-300 hover:shadow-xl hover:translate-y-[-5px]"
                >
                  <span className="text-5xl block mb-4 text-amber-800">
                    {feature.icon}
                  </span>
                  <h4 className="text-xl font-serif font-semibold text-gray-800 mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-20 px-6 bg-gray-100">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-3xl font-serif font-bold text-gray-800 mb-6">
                Tentang Alkitab Katolik Online
              </h3>
              <p className="text-lg text-gray-700 mb-4">
                Kami hadir untuk memfasilitasi perjalanan spiritual Anda,
                menyediakan platform yang bersih dan mudah diakses untuk membaca
                serta merenungkan Kitab Suci. Dengan fokus pada tradisi
                **Katolik**, kami menyajikan Alkitab dalam antarmuka yang
                modern.
              </p>
              <p className="text-lg text-gray-700">
                Komunitas kami berdedikasi untuk mendukung pertumbuhan iman
                melalui pembelajaran dan refleksi. Mari bersama-sama menggali
                kekayaan Sabda Allah, kapan saja dan di mana saja.
              </p>
            </div>
          </section>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default WelcomePage;
