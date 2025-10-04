import React from "react";
import Header from "../components/Header"; // Asumsi Anda menggunakan Header yang sama

// --- MOCK DATA (Ganti dengan data dari API di proyek nyata) ---
const mockVideos = [
  {
    id: 1,
    title: "Mengapa Kita Perlu Mengikuti Misa Setiap Minggu?",
    channel: "Gereja Katolik Official",
    thumbnailUrl:
      "https://via.placeholder.com/320x180/4682b4/ffffff?text=MISA+MINGGU",
    duration: "12:45",
    link: "https://www.youtube.com/watch?v=...", // Ganti dengan link YouTube yang sebenarnya
  },
  {
    id: 2,
    title: "Sejarah Singkat Kehidupan Santo Fransiskus Assisi",
    channel: "Kisah Para Kudus",
    thumbnailUrl:
      "https://via.placeholder.com/320x180/8fbc8f/ffffff?text=SANTO+FRANSISKUS",
    duration: "08:10",
    link: "https://www.youtube.com/watch?v=...",
  },
  {
    id: 3,
    title: "Doa Rosario dan Maknanya di Bulan Maria",
    channel: "Katolik Renungan",
    thumbnailUrl:
      "https://via.placeholder.com/320x180/cd5c5c/ffffff?text=DOA+ROSARIO",
    duration: "20:00",
    link: "https://www.youtube.com/watch?v=...",
  },
  {
    id: 4,
    title: "Tanya Jawab Seputar Sakramen Ekaristi",
    channel: "Veritas Channel",
    thumbnailUrl:
      "https://via.placeholder.com/320x180/ffebcd/000000?text=SAKRAMEN+EKARISTI",
    duration: "15:30",
    link: "https://www.youtube.com/watch?v=...",
  },
];
// ----------------------------------------------------------------

const VideoCard = ({ video }) => {
  return (
    <a
      href={video.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
    >
      <div className="relative">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full object-cover aspect-video"
        />
        {/* Durasi Video (Overlay) */}
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs font-semibold px-2 py-0.5 rounded">
          {video.duration}
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
          {video.title}
        </h3>
        <p className="text-sm text-sky-700 font-medium">{video.channel}</p>
      </div>
    </a>
  );
};

const VideosPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header (Asumsi sudah full-width) */}
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Judul Halaman */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 font-serif mb-2">
            Video Renungan & Pembelajaran Katolik
          </h1>
          <p className="text-xl text-gray-600">
            Perdalam iman Anda dengan berbagai video pilihan seputar ajaran,
            sakramen, dan sejarah Gereja.
          </p>
        </div>

        {/* Kotak Pencarian (Opsional - Bisa diimplementasikan di sini) */}
        {/* <div className="mb-10 max-w-xl mx-auto">
          <input 
            type="text" 
            placeholder="Cari topik video..." 
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition duration-150"
          />
        </div> */}

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {mockVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        {/* Tombol Load More (Opsional) */}
        {mockVideos.length > 0 && (
          <div className="text-center mt-12">
            <button
              className="px-8 py-3 rounded-lg font-bold text-white bg-sky-700 hover:bg-sky-800 transition duration-300 shadow-md"
              // onClick={() => handleLoadMore()} // Implementasikan fungsi ini di proyek nyata
            >
              Lihat Video Lainnya
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideosPage;
