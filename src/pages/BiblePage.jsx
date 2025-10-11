import { BibleProvider } from "../context/BibleContext";
import SidebarNav from "../components/SidebarNav";
import VerseDisplay from "../components/VerseDisplay";
import QuickSearch from "../components/QuickSearch";
import Bookmarks from "../components/Bookmarks";
import DailyVerse from "../components/DailyVerse";
import Header from "../components/Header";
import Footer from "../components/Footer";

const BiblePage = () => {
  return (
    <BibleProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar - Navigasi dan Bookmark */}
          <aside className="w-full md:w-80 bg-white border-r border-gray-200 overflow-y-auto flex-shrink-0">
            <SidebarNav />
            <Bookmarks />
          </aside>

          {/* Main Content - Ayat Harian, Pencarian, dan Konten Pasal */}
          <main className="flex-1 p-4 md:p-6 overflow-y-auto space-y-6">
            {/* Fitur Cepat: Ayat Harian & Pencarian */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DailyVerse />
              <QuickSearch />
            </div>

            {/* Konten Pasal */}
            <VerseDisplay />
          </main>
        </div>
      </div>
      <Footer />
    </BibleProvider>
  );
};

export default BiblePage;
