import { useState, useEffect } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatbotFAB from "./components/ChatbotFAB";

// Pages
import HomePage from "./pages/Home";
import DeteksiPage from "./pages/Deteksi";
import HasilDeteksiPage from "./pages/HasilDeteksi";
import DetailResepPage from "./pages/DetailResep";
import KalkulatorPage from "./pages/Kalkulator";
import DatabaseGiziPage from "./pages/DatabaseGizi";
import TentangPage from "./pages/Tentang";
import ReferensiPage from "./pages/Referensi";
import FAQPage from "./pages/FAQ";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import NotFoundPage from "./pages/NotFound";
import ProfilePage from "./pages/Profile";

function PlaceholderPage({ title }) {
  return (
    <main className="flex-grow flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <span className="material-symbols-outlined text-[64px] text-outline mb-md block">
          construction
        </span>
        <h1 className="text-[32px] font-bold text-primary mb-sm">{title}</h1>
        <p className="text-[16px] text-on-surface-variant">Halaman ini sedang dalam pengembangan.</p>
      </div>
    </main>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark";
  });
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    let observer;

    // A small timeout to let the page render first
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
            } else {
              entry.target.classList.remove("in-view");
            }
          });
        },
        { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
      );

      elements.forEach((el) => observer.observe(el));
    }, 150);

    return () => {
      clearTimeout(timer);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [location.pathname]); // Run on every route change

  const toggleDark = () => {
    setDarkMode((prev) => !prev);
  };

  const isAuthPage = location.pathname.startsWith("/auth");

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      {!isAuthPage && <Navbar darkMode={darkMode} toggleDark={toggleDark} />}

      <div className={isAuthPage ? "" : "pt-[72px]"}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/deteksi" element={<DeteksiPage />} />
          <Route path="/deteksi/hasil" element={<HasilDeteksiPage />} />
          <Route path="/deteksi/resep/:id" element={<DetailResepPage />} />
          <Route path="/kalkulator" element={<KalkulatorPage />} />
          <Route path="/database" element={<DatabaseGiziPage />} />
          <Route path="/tentang" element={<TentangPage />} />
          <Route path="/referensi" element={<ReferensiPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="*" element={<PlaceholderPage title="404 — Halaman tidak ditemukan" />} />
        </Routes>
      </div>

      {/* Disclaimer Banner Global */}
      {!location.pathname.startsWith("/auth") && !location.pathname.startsWith("/dashboard") && (
        <div className="w-full max-w-7xl mx-auto px-container-margin md:px-lg mt-xxl mb-lg reveal">
          <div className="border-l-4 border-primary-fixed bg-surface-container rounded-r-xl p-lg flex gap-md items-start shadow-sm border-outline-variant/30">
            <span
              className="material-symbols-outlined text-primary text-[28px] flex-shrink-0"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              info
            </span>
            <div>
              <h4 className="text-[20px] font-semibold text-primary mb-xs">Disclaimer</h4>
              <p className="text-[16px] leading-relaxed text-on-surface-variant">
                GiziMeal adalah platform edukasi gizi. Estimasi kalori, klasifikasi bahan, dan rekomendasi
                menu disusun berdasarkan{" "}
                <span className="font-semibold text-secondary">Permenkes No. 28 Tahun 2019 (AKG)</span> dan{" "}
                <span className="font-semibold text-secondary">Pedoman Gizi Seimbang Kemenkes RI</span>. Hasil
                bersifat informatif dan tidak menggantikan konsultasi dengan dokter, ahli gizi, maupun tenaga
                kesehatan profesional. Daftar lengkap sumber referensi tersedia pada halaman{" "}
                <Link
                  to="/referensi"
                  className="font-semibold underline decoration-primary underline-offset-2 text-primary hover:opacity-80 transition-opacity"
                >
                  Referensi
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      )}

      <ChatbotFAB />
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;
