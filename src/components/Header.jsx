import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="p-4 bg-sky-800 text-white shadow-xl flex justify-around">
      <div className="flex gap-4 items-center">
        <img src="/favicon.png" alt="icon" className="size-10" />
        <h1 className="text-3xl font-extrabold tracking-tight cursor-pointer">
          <Link to="/" className="block">
            Firman Digital
          </Link>
        </h1>
      </div>
      <nav className="bg-white/65 flex items-center px-18 rounded-full border border-slate-300">
        <ul className="flex gap-7 list-none text-slate-700 font-semibold text-md">
          <li className="hover:text-slate-900 cursor-pointer">
            <Link to="/bible" className="block">
              Bible
            </Link>
          </li>

          <li className="hover:text-slate-900 cursor-pointer">
            <Link to="/videos" className="block">
              Videos
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
