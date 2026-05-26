import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const prevScroll = useRef(0);
  const isLogged = !!localStorage.getItem('authToken');

  useEffect(() => {
    const handleScroll = () => {
      const cur = window.scrollY;
      const scrollingDown = cur > prevScroll.current;
      setShowNav(!scrollingDown || cur < 50);
      setScrollY(cur);
      prevScroll.current = cur;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navBackgroundClass = showNav ? (scrollY < 50 ? 'bg-transparent' : 'bg-surface/80 backdrop-blur-md') : '-translate-y-full';
  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-transform duration-300 ${navBackgroundClass}`}>
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
            {isLogged ? (
              <button
                className="bg-primary-container text-on-primary-container font-semibold text-[14px] px-md py-sm rounded-lg hover:bg-surface-tint hover:text-on-primary transition-colors active:scale-95 hidden md:block"
                onClick={() => {
                  localStorage.removeItem('authToken');
                  navigate('/');
                }}
              >
                Logout
              </button>
            ) : (
              <button
                className="bg-primary-container text-on-primary-container font-semibold text-[14px] px-md py-sm rounded-lg hover:bg-surface-tint hover:text-on-primary transition-colors active:scale-95 hidden md:block"
                onClick={() => window.location.href = "/auth/login"}
              >
                Masuk
              </button>
            )}
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
      </nav>

      {/* Mobile Drawer */}
      {menuOpen && (
        <>
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
          {/* Sidebar Drawer Container */}
          <div
            style={{ backgroundColor: darkMode ? "#0c0e0c" : "#ffffff" }}
            className="fixed top-0 right-0 h-full w-[280px] border-l border-outline-variant/30 z-50 shadow-2xl p-lg flex flex-col gap-lg md:hidden animate-slide-in"
          >
            {/* Header inside drawer */}
            <div className="flex justify-between items-center pb-md border-b border-outline-variant">
              <span className="font-bold text-[18px] text-brand-green">Menu</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-on-surface hover:text-brand-green p-xs rounded-full flex items-center justify-center active:scale-95 transition-transform"
                aria-label="Close menu"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Navigation links */}
            <div className="flex flex-col gap-sm">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className={
                      isActive
                        ? "text-brand-green font-bold bg-primary/10 px-md py-sm rounded-xl text-[16px] flex items-center justify-between"
                        : "text-on-surface-variant hover:text-brand-green hover:bg-surface-container-low px-md py-sm rounded-xl text-[16px] transition-colors"
                    }
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="material-symbols-outlined text-[18px]">chevron_right</span>}
                  </Link>
                );
              })}
            </div>

            {/* CTA action button at bottom */}
            <div className="mt-auto pt-md border-t border-outline-variant">
              {isLogged ? (
                <button
                  className="w-full bg-primary-container text-on-primary-container font-semibold text-[16px] px-md py-md rounded-xl hover:bg-surface-tint hover:text-on-primary transition-all active:scale-95"
                  onClick={() => {
                    localStorage.removeItem('authToken');
                    setMenuOpen(false);
                    navigate('/');
                  }}
                >
                  Logout
                </button>
              ) : (
                <button
                  className="w-full bg-primary-container text-on-primary-container font-semibold text-[16px] px-md py-md rounded-xl hover:bg-surface-tint hover:text-on-primary transition-all active:scale-95"
                  onClick={() => {
                    setMenuOpen(false);
                    window.location.href = "/auth/login";
                  }}
                >
                  Masuk
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}