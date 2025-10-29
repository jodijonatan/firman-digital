import { useState } from "react";
import { BibleProvider } from "../context/BibleContext";
import SidebarNav from "../components/SidebarNav";
import VerseDisplay from "../components/VerseDisplay";
import QuickSearch from "../components/QuickSearch";
import Bookmarks from "../components/Bookmarks";
import DailyVerse from "../components/DailyVerse";
import Header from "../components/Header";
import Footer from "../components/Footer";

const BiblePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BibleProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
        {/* HEADER */}
        <Header />

        <div className="flex flex-1 relative">
          {/* Sidebar untuk desktop */}
          <aside
            className={`${
              sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full md:translate-x-0"
            } fixed md:static top-0 left-0 h-full md:h-auto w-72 md:w-80 bg-white border-r border-gray-200 shadow-md md:shadow-none overflow-y-auto transform transition-transform duration-300 z-40`}
          >
            <div className="p-4 space-y-4">
              <SidebarNav />
              <Bookmarks />
            </div>
          </aside>

          {/* Tombol toggle sidebar di HP (hanya muncul kalau sidebar tertutup) */}
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="cursor-pointer absolute top-4 left-4 z-50 md:hidden bg-sky-600 text-white px-3 py-2 rounded-lg shadow-md"
            >
              Menu
            </button>
          )}

          {/* Overlay (untuk menutup sidebar di HP) */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
              onClick={() => setSidebarOpen(false)}
            ></div>
          )}

          {/* Konten utama */}
          <main className="flex-1 p-4 md:p-6 overflow-y-auto space-y-6">
            {/* Fitur cepat (Ayat harian + Pencarian) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <DailyVerse />
              {/* Biar pencarian tetap lebar di HP */}
              <div className="lg:col-span-2">
                <QuickSearch />
              </div>
            </div>

            {/* Tampilan ayat/pasal */}
            <VerseDisplay />
          </main>
        </div>

        {/* FOOTER */}
        <Footer />
      </div>
    </BibleProvider>
  );
};

export default BiblePage;
