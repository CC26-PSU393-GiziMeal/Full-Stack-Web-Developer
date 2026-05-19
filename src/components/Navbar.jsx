import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Beranda", to: "/" },
  { label: "Deteksi", to: "/deteksi" },
  { label: "Kalkulator", to: "/kalkulator" },
  { label: "Database Gizi", to: "/database" },
  { label: "About (Tentang Kami)", to: "/tentang" },
  { label: "Referensi", to: "/referensi" },
  { label: "FAQ", to: "/faq" },
];

export default function Navbar({ darkMode, toggleDark }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-surface/80 backdrop-blur-md shadow-sm border-b border-outline-variant sticky top-0 z-50">
      <div className="flex justify-between items-center w-full px-lg py-md max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-brand-green font-bold text-[20px]">
          <img
            src="https://lh3.googleusercontent.com/aida/ADBb0ujZZi9EkoFBl9gbbFfiUvlxG6zmOVoG1NAxELrjmgE6pDcYPAu6xDQ1kWvbokt5XujWkjv2S4HePO38svw6_hb8th9y1pHpfPxbRyg6baMORmiToS6EG2lMQ1uMVxR6b1JtvkCSvj94VZKfXxqBGIZ4_rQc1RZ5WT4axH0p6ygIBzkzinPT0ijH0DTNMFhJgme1lVa-7r5HDh-aFztAPVey6Bdl31EaqvZyowPEj4JufKq52RvyV7c3WnE"
            alt="GiziMeal Logo"
            className="w-8 h-8 filter invert"
          />
          <span>GiziMeal</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-lg">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.label}
                to={link.to}
                className={
                  isActive
                    ? "text-brand-green font-bold border-b-2 border-brand-green pb-1 text-[16px]"
                    : "text-on-surface-variant hover:text-brand-green transition-all duration-200 px-2 py-1 text-[16px]"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-md">
          <button
            onClick={toggleDark}
            aria-label="Toggle dark mode"
            className="text-on-surface hover:text-brand-green hover:bg-surface-container-low transition-all duration-200 p-1 rounded-full active:scale-95"
          >
            <span className="material-symbols-outlined">
              {darkMode ? "light_mode" : "dark_mode"}
            </span>
          </button>
          <button
            aria-label="Account"
            className="text-on-surface hover:text-brand-green hover:bg-surface-container-low transition-all duration-200 p-1 rounded-full active:scale-95"
          >
            <span className="material-symbols-outlined">account_circle</span>
          </button>
          <button className="bg-primary-container text-on-primary-container font-semibold text-[14px] px-md py-sm rounded-lg hover:bg-surface-tint hover:text-on-primary transition-colors active:scale-95 hidden md:block"
            onClick={() => window.location.href = "/auth/login"}
          >
            Masuk
          </button>
          {/* Mobile hamburger */}
          <button
            className="md:hidden text-on-surface p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">
              {menuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface/95 backdrop-blur-md border-t border-outline-variant px-lg py-md flex flex-col gap-sm">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={
                  isActive
                    ? "text-on-primary-container font-bold bg-primary-container px-3 py-2 rounded-lg text-[16px]"
                    : "text-on-surface-variant hover:text-brand-green hover:bg-surface-container-low px-3 py-2 rounded-lg text-[16px]"
                }
              >
                {link.label}
              </Link>
            );
          })}
          <button
            className="bg-primary-container text-on-primary-container font-semibold text-[14px] px-md py-sm rounded-lg hover:bg-surface-tint hover:text-on-primary transition-colors mt-sm"
            onClick={() => window.location.href = "/auth/login"}
          >
            Masuk
          </button>
        </div>
      )}
    </nav>
  );
}