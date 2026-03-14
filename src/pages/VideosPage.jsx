// src/pages/VideosPage.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { PlayIcon } from "@heroicons/react/24/solid";

const mockVideos = [
  {
    id: 1,
    title: "Kehidupan Yesus - Film Kehidupan Yesus Kristus (Indonesia)",
    channel: "Jesus.net",
    thumbnailUrl:
      "https://i.ytimg.com/vi/JzKyVbOx1lA/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLC-qu1oZVFGdE2yoiCisC5dLaJUBg",
    duration: "2:56:23",
    link: "https://www.youtube.com/watch?v=X_ica-hQu8k",
  },
  {
    id: 2,
    title: "The Passion of the Christ - Penderitaan Kristus",
    channel: "Elisabeth",
    thumbnailUrl:
      "https://i.ytimg.com/vi/BxeelICKWrs/hqdefault.jpg?sqp=-oaymwEnCOADEI4CSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLA4TmODz0cdlgPoqIAR3phmhaPUgg",
    duration: "2:06:32",
    link: "https://www.youtube.com/watch?v=BxeelICKWrs",
  },
];

const VideoCard = ({ video }) => {
  return (
    <a
      href={video.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-100"
    >
      <div className="relative overflow-hidden">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full object-cover aspect-video group-hover:scale-110 transition-transform duration-700"
        />
        {/* Overlay Play Button */}
        <div className="absolute inset-0 bg-sky-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30 transform scale-75 group-hover:scale-100 transition-transform duration-500">
                <PlayIcon className="w-10 h-10 text-white" />
            </div>
        </div>
        
        {/* Durasi Video (Overlay) */}
        <span className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-white text-[10px] font-black px-2 py-1 rounded-lg">
          {video.duration}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-black text-slate-900 line-clamp-2 mb-3 leading-tight tracking-tight group-hover:text-sky-700 transition-colors">
          {video.title}
        </h3>
        <div className="flex items-center gap-2">
            <div className="size-6 rounded-full bg-sky-100 flex items-center justify-center">
                <span className="text-[10px] font-bold text-sky-600">{video.channel.charAt(0)}</span>
            </div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{video.channel}</p>
        </div>
      </div>
    </a>
  );
};

const VideosPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Judul Halaman */}
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-sky-100 border border-sky-200 text-sky-600 text-[10px] font-black tracking-widest uppercase">
            Jelajah Media
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6 uppercase italic">
            Renungan & Pembelajaran <span className="text-sky-600">Video</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Perdalam iman kamu dengan berbagai video pilihan seputar ajaran,
            sakramen, dan sejarah Gereja dalam format digital yang modern.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {mockVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
        
        {/* Empty State / Footer Call to Action */}
        <div className="mt-20 p-12 bg-white rounded-[40px] border border-slate-100 shadow-sm text-center">
            <h4 className="text-2xl font-black text-slate-800 mb-2 uppercase tracking-tight">Butuh Bahan Renungan Lain?</h4>
            <p className="text-slate-400 mb-8 max-w-sm mx-auto font-medium">Anda bisa menjelajahi pasal-pasal Alkitab untuk mendapatkan inspirasi harian.</p>
            <div className="flex justify-center">
                 <a href="/alkitab" className="px-8 py-3 bg-sky-600 text-white rounded-2xl font-black text-sm tracking-widest uppercase hover:bg-sky-500 transition-all shadow-lg shadow-sky-100">Baca Alkitab</a>
            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VideosPage;
