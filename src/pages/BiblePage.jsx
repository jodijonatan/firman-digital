// src/pages/BiblePage.jsx
import { useState } from "react";
import { BibleProvider } from "../context/BibleContext";
import SidebarNav from "../components/SidebarNav";
import VerseDisplay from "../components/VerseDisplay";
import QuickSearch from "../components/QuickSearch";
import Bookmarks from "../components/Bookmarks";
import DailyVerse from "../components/DailyVerse";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const BiblePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BibleProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-sky-100">
        {/* HEADER */}
        <Header />

        <div className="flex flex-1 relative overflow-hidden">
          {/* Sidebar Drawer for Mobile & Persistent for Desktop */}
          <aside
            className={`
              fixed md:static top-[72px] md:top-0 bottom-0 left-0 z-40
              w-[85vw] md:w-80 lg:w-96
              bg-white border-r border-slate-200 
              transform transition-all duration-500 ease-in-out
              ${sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"}
              overflow-y-auto overflow-x-hidden
            `}
          >
            {/* Mobile Header for Sidebar - Reduced padding for tighter fit */}
            <div className="flex items-center justify-between p-4 md:hidden border-b border-slate-50">
                <span className="font-black text-sky-900 tracking-tighter uppercase italic">Navigasi</span>
                <button 
                    onClick={() => setSidebarOpen(false)}
                    className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:text-red-500 transition-colors"
                >
                    <XMarkIcon className="size-6" />
                </button>
            </div>

            <div className="p-4 md:p-6 space-y-8">
              <SidebarNav />
              <Bookmarks />
            </div>
          </aside>

          {/* Sticky Mobile Fab/Toggle - Minimalist design */}
          <button
            onClick={() => setSidebarOpen(true)}
            className={`
              fixed bottom-6 right-6 z-30 
              md:hidden 
              bg-sky-600 text-white 
              p-4 rounded-3xl shadow-2xl shadow-sky-600/40
              transition-all duration-300 transform active:scale-90
              ${sidebarOpen ? "opacity-0 scale-50 pointer-events-none" : "opacity-100 scale-100"}
            `}
            aria-label="Open Navigation"
          >
            <Bars3Icon className="size-7" />
          </button>

          {/* Overlay for Mobile - Starts below header */}
          <div
            className={`
              fixed top-[72px] inset-x-0 bottom-0 bg-slate-900/40 backdrop-blur-sm z-30 md:hidden
              transition-all duration-500
              ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
            `}
            onClick={() => setSidebarOpen(false)}
          />

          {/* Main Content Area */}
          <main className="flex-1 min-w-0 bg-white md:bg-transparent overflow-y-auto">
            <div className="max-w-5xl mx-auto p-4 md:p-8 lg:p-12 space-y-8 md:space-y-12">
              
              {/* Features Grid - Quick Access */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
                <div className="lg:col-span-5 order-2 lg:order-1">
                  <DailyVerse />
                </div>
                
                <div className="lg:col-span-7 order-1 lg:order-2">
                  <div className="bg-white md:bg-transparent -mx-4 md:mx-0 px-4 md:px-0 py-2 md:py-0">
                    <QuickSearch />
                  </div>
                </div>
              </div>

              {/* Reader Display */}
              <div className="transition-all duration-500">
                <VerseDisplay />
              </div>
            </div>
            
            {/* Mobile-only Bottom Safety Margin */}
            <div className="h-24 md:hidden" />
          </main>
        </div>

        {/* FOOTER */}
        <Footer />
      </div>
    </BibleProvider>
  );
};

export default BiblePage;
