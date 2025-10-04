const Footer = () => {
  return (
    <footer className="text-center py-6 px-6 bg-gray-800 text-gray-300 text-sm">
      <p className="mb-2">
        &copy; 2025 Firman Digital - by Jodi Jonatan. Semua Hak Dilindungi.
      </p>
      <div className="space-x-4">
        <a href="#privacy" className="hover:text-white transition duration-300">
          Kebijakan Privasi
        </a>
        <span className="text-gray-500">|</span>
        <a href="#terms" className="hover:text-white transition duration-300">
          Ketentuan Layanan
        </a>
      </div>
    </footer>
  );
};

export default Footer;
