/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoDark from '../assets/logo-dark-transparan.png';
import logoLight from '../assets/logo-light-transparan.png'

const navLinks = [
  { label: "Beranda", to: "/" },
  { label: "Tentang", to: "/tentang" },
  { label: "Deteksi", to: "/deteksi" },
  { label: "Kalkulator", to: "/kalkulator" },
  { label: "Tabel Gizi", to: "/database" },
  { label: "Referensi", to: "/referensi" },
  { label: "FAQ", to: "/faq" },
];

export default function Navbar({ darkMode, toggleDark }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const prevScroll = useRef(0);
  const profileRef = useRef(null);
  const isLogged = !!localStorage.getItem("authToken");

  useEffect(() => {
    const handleScroll = () => {
      const cur = window.scrollY;
      setShowNav(!(cur > prevScroll.current) || cur < 50);
      setScrollY(cur);
      prevScroll.current = cur;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navBg = showNav
    ? scrollY < 50 ? "bg-surface/30" : "bg-surface/80 backdrop-blur-md"
    : "-translate-y-full";

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setProfileOpen(false);
    navigate("/");
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-transform duration-300 ${navBg}`}>
        <div className="flex justify-between items-center w-full px-lg py-sm max-w-5xl mx-auto">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-primary font-bold text-[18px]">
            <img
              src={darkMode ? logoDark : logoLight}
              alt="GiziMeal"
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-md">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  className={
                    isActive
                      ? "text-primary font-bold border-b-2 border-primary pb-0.5 text-[14px] px-1"
                      : "text-on-surface-variant hover:text-primary transition-all duration-200 px-1 text-[14px]"
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right — Controls Area */}
          <div className="flex items-center gap-xs sm:gap-sm h-full">

            {/* TOMBOL THEME GLOBAL */}
            <button
              onClick={toggleDark}
              aria-label="Toggle dark mode"
              className="text-on-surface hover:text-primary hover:bg-surface-container-low transition-all p-1 rounded-full active:scale-95 flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[22px]">
                {darkMode ? "light_mode" : "dark_mode"}
              </span>
            </button>

            {/* Profile area */}
            {/* Perubahan: Tambahkan flex dan items-center agar pembungkusnya tidak melar */}
            <div className="relative flex items-center" ref={profileRef}>
              <button
                onClick={() => isLogged ? setProfileOpen(!profileOpen) : navigate("/auth/login")}
                className="flex items-center justify-center text-on-surface hover:text-primary hover:bg-surface-container-low transition-all p-1 rounded-full active:scale-95"
                aria-label="Profil"
              >
                <span className="material-symbols-outlined text-[22px]">account_circle</span>
              </button>

              {/* Dropdown menu */}
              {/* Perubahan: top diubah ke [28px] agar mendesak naik ke atas mendekati tombol */}
              {isLogged && profileOpen && (
                <div className="absolute right-0 top-[28px] w-48 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="px-md py-sm border-b border-outline-variant">
                    <p className="text-[12px] font-semibold text-on-surface truncate">
                      {(() => {
                        const userRaw = localStorage.getItem("user");
                        if (!userRaw) return "Pengguna";

                        try {
                          const userObj = JSON.parse(userRaw);
                          const metadata = userObj.user_metadata || userObj.meta || {};
                          const first = metadata.firstName || metadata.first_name || "";
                          const last = metadata.lastName || metadata.last_name || "";
                          const fullName = `${first} ${last}`.trim();
                          if (fullName) return fullName;
                          if (userObj.email) return userObj.email.split("@")[0];

                          return "Pengguna";
                        } catch (e) {
                          return "Pengguna";
                        }
                      })()}
                    </p>
                    <p className="text-[11px] text-on-surface-variant truncate">
                      {(() => {
                        const userRaw = localStorage.getItem("user");
                        if (!userRaw) return "";
                        try {
                          return JSON.parse(userRaw).email || "";
                        } catch (e) {
                          return "";
                        }
                      })()}
                    </p>
                  </div>
                  <button
                    onClick={() => { setProfileOpen(false); navigate("/profile"); }}
                    className="w-full flex items-center gap-sm px-md py-sm text-[13px] text-on-surface hover:bg-surface-container transition-colors text-left"
                  >
                    <span className="material-symbols-outlined text-[16px]">person</span>
                    Profil Saya
                  </button>
                  <div className="border-t border-outline-variant">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-sm px-md py-sm text-[13px] text-error hover:bg-error-container/20 transition-colors text-left"
                    >
                      <span className="material-symbols-outlined text-[16px]">logout</span>
                      Keluar
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Masuk button (Hanya tampil saat tidak login) */}
            {!isLogged && (
              <button
                className="bg-primary text-on-primary font-semibold text-[13px] px-md py-xs rounded-lg hover:opacity-90 transition-colors active:scale-95 hidden md:block"
                onClick={() => navigate("/auth/login")}
              >
                Masuk
              </button>
            )}

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-on-surface p-1 flex items-center justify-center"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined">{menuOpen ? "close" : "menu"}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden" onClick={() => setMenuOpen(false)} />
          <div
            style={{ backgroundColor: darkMode ? "#0c0e0c" : "#ffffff" }}
            className="fixed top-0 right-0 h-full w-[260px] border-l border-outline-variant/30 z-50 shadow-2xl p-md flex flex-col gap-md md:hidden"
          >
            <div className="flex justify-between items-center pb-sm border-b border-outline-variant">
              <span className="font-bold text-[16px] text-primary">Menu</span>
              <button onClick={() => setMenuOpen(false)} className="text-on-surface hover:text-primary p-xs rounded-full active:scale-95">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-xs">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className={
                      isActive
                        ? "text-primary font-bold bg-primary/10 px-md py-sm rounded-lg text-[14px] flex items-center justify-between"
                        : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low px-md py-sm rounded-lg text-[14px] transition-colors"
                    }
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="material-symbols-outlined text-[16px]">chevron_right</span>}
                  </Link>
                );
              })}
            </div>

            <div className="mt-auto pt-sm border-t border-outline-variant flex flex-col gap-xs">
              {/* Di mobile drawer, tombol mode gelap tetap dipertahankan di bagian bawah demi kemudahan akses */}
              <button
                onClick={toggleDark}
                className="flex items-center gap-sm px-md py-sm text-[14px] text-on-surface hover:bg-surface-container rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">{darkMode ? "light_mode" : "dark_mode"}</span>
                {darkMode ? "Mode Terang" : "Mode Gelap"}
              </button>
              {isLogged ? (
                <>
                  <button
                    onClick={() => { setMenuOpen(false); navigate("/profile"); }}
                    className="w-full bg-surface-container text-on-surface font-semibold text-[14px] px-md py-sm rounded-lg hover:bg-surface-container-high transition-all"
                  >
                    Profil Saya
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-error-container/30 text-error font-semibold text-[14px] px-md py-sm rounded-lg"
                  >
                    Keluar
                  </button>
                </>
              ) : (
                <button
                  className="w-full bg-primary text-on-primary font-semibold text-[14px] px-md py-sm rounded-lg"
                  onClick={() => { setMenuOpen(false); navigate("/auth/login"); }}
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