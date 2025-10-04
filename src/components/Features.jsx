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

const Features = () => {
  return (
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
  );
};

export default Features;
