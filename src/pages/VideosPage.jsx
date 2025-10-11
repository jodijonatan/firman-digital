import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const mockVideos = [
  {
    id: 1,
    title: "Kehidupan Yesus",
    channel: "Jesus.net",
    thumbnailUrl:
      "https://i.ytimg.com/vi/JzKyVbOx1lA/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLC-qu1oZVFGdE2yoiCisC5dLaJUBg",
    duration: "2:56:23",
    link: "https://www.youtube.com/watch?v=X_ica-hQu8k",
  },
  {
    id: 2,
    title: "The Passion of the Christ",
    channel: "Elisabeth",
    thumbnailUrl:
      "https://i.ytimg.com/vi/BxeelICKWrs/hqdefault.jpg?sqp=-oaymwEnCOADEI4CSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLA4TmODz0cdlgPoqIAR3phmhaPUgg",
    duration: "2:06:32",
    link: "https://www.youtube.com/watch?v=BxeelICKWrs",
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
    <>
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
              Perdalam iman kamu dengan berbagai video pilihan seputar ajaran,
              sakramen, dan sejarah Gereja.
            </p>
          </div>

          {/* Kotak Pencarian */}
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
          {/* {mockVideos.length > 0 && (
          <div className="text-center mt-12">
            <button
              className="px-8 py-3 rounded-lg font-bold text-white bg-sky-700 hover:bg-sky-800 transition duration-300 shadow-md"
              // onClick={() => handleLoadMore()} // Implementasikan fungsi ini di proyek nyata
            >
              Lihat Video Lainnya
            </button>
          </div>
        )} */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VideosPage;
