import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Mock user data — nanti diganti dari API/Supabase
const MOCK_USER = {
  name: "Muhammad Dava Arya Nada Putra",
  email: "dava@example.com",
  joined: "Mei 2025",
  avatar: null, // null = pakai inisial
};

function getInitials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const isLogged = !!localStorage.getItem("authToken");
  const [calcData, setCalcData] = useState(null);
  useEffect(() => {
    const saved = localStorage.getItem('kalkulatorProfile');
    if (saved) {
      try {
        setCalcData(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse kalkulator profile', e);
      }
    }
  }, []);

  const user = MOCK_USER;

  // Redirect kalau belum login
  if (!isLogged) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen p-8">
        <h2 className="text-2xl font-bold text-primary mb-4">Akses Terbatas</h2>
        <p className="mb-6 text-center text-on-surface-variant max-w-md">
          Untuk melihat profil, silakan masuk terlebih dahulu.
        </p>
        <button
          className="bg-primary text-on-primary font-semibold px-md py-sm rounded-lg hover:opacity-90 transition-colors"
          onClick={() => navigate("/auth/login")}
        >
          Masuk
        </button>
      </main>
    );
  }

  const formatNum = (n) => n ? Math.round(n).toLocaleString('id-ID') : "";
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const menuItems = [
    {
      icon: "calculate",
      label: "Kalkulator AKG",
      desc: "Hitung kebutuhan kalori harianmu",
      to: "/kalkulator",
    },
    {
      icon: "troubleshoot",
      label: "Deteksi Bahan",
      desc: "Scan bahan makanan & dapatkan rekomendasi",
      to: "/deteksi",
    },
    {
      icon: "database",
      label: "Database Gizi",
      desc: "Cari informasi nutrisi bahan makanan",
      to: "/database",
    },
  ];

  return (
    <main className="flex-grow w-full max-w-3xl mx-auto px-container-margin md:px-lg py-xl md:py-xxl space-y-lg">

      {/* ── Avatar & Info ── */}
      <section className="flex flex-col items-center text-center gap-md">

        {/* Avatar */}
        <div className="relative">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-primary"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center border-4 border-outline-variant">
              <span className="text-on-primary text-[32px] font-bold">
                {getInitials(user.name)}
              </span>
            </div>
          )}
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-secondary rounded-full border-2 border-surface flex items-center justify-center">
            <span className="material-symbols-outlined text-on-secondary text-[14px]">check</span>
          </div>
        </div>

        {/* Name & Email */}
        <div className="space-y-xs">
          <h1 className="font-title-lg text-title-lg text-on-surface font-bold">
            {user.name}
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">{user.email}</p>
          <span className="inline-flex items-center gap-xs bg-surface-container px-sm py-xs rounded-full text-label-sm text-on-surface-variant border border-outline-variant">
            <span className="material-symbols-outlined text-[14px]">calendar_month</span>
            Bergabung {user.joined}
          </span>
        </div>
      </section>

      {/* ── Info Card ── */}
      <section className="bg-surface-container-low rounded-[24px] border border-outline-variant p-lg space-y-md reveal reveal-delay-100">
        <h2 className="font-title-md text-title-md text-primary font-semibold flex items-center gap-sm">
          <span className="material-symbols-outlined text-[22px]">person</span>
          Informasi Akun
        </h2>
        <div className="space-y-sm">
          {[
            { label: "Nama Lengkap", value: user.name, icon: "badge" },
            { label: "Email", value: user.email, icon: "mail" },
            { label: "Bergabung Sejak", value: user.joined, icon: "calendar_month" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-md bg-surface-container-lowest p-md rounded-xl border border-outline-variant"
            >
              <span className="material-symbols-outlined text-secondary text-[20px] flex-shrink-0">
                {item.icon}
              </span>
              <div className="flex-grow min-w-0">
                <p className="text-label-sm text-on-surface-variant">{item.label}</p>
                <p className="font-body-md text-body-md text-on-surface font-medium truncate">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Quick Access ── */}
      <section className="space-y-md reveal reveal-delay-200">
        <h2 className="font-title-md text-title-md text-primary font-semibold flex items-center gap-sm">
          <span className="material-symbols-outlined text-[22px]">apps</span>
          Akses Cepat
        </h2>
        <div className="grid grid-cols-1 gap-sm">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.to)}
              className="flex items-center gap-md bg-surface-container-lowest p-md rounded-xl border border-outline-variant hover:border-secondary hover-lift cursor-pointer group text-left transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-on-secondary-container text-[20px]">
                  {item.icon}
                </span>
              </div>
              <div className="flex-grow">
                <p className="font-body-md text-body-md text-on-surface font-semibold group-hover:text-secondary transition-colors">
                  {item.label}
                </p>
                <p className="text-label-sm text-on-surface-variant">{item.desc}</p>
              </div>
              <span className="material-symbols-outlined text-outline group-hover:text-secondary transition-colors text-[20px]">
                chevron_right
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ── Kalkulator Data (if saved) ── */}
      {calcData && calcData.hasil && (
        <section className="bg-surface-container-low rounded-[24px] border border-outline-variant p-lg space-y-md reveal reveal-delay-300">
          <h2 className="font-title-md text-title-md text-primary font-semibold flex items-center gap-sm">
            <span className="material-symbols-outlined text-[22px]">calculate</span>
            Data Kalkulator Terakhir
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
            <p><strong>Target:</strong> {formatNum(calcData.hasil.target)} kkal</p>
            <p><strong>TDEE:</strong> {formatNum(calcData.hasil.tdee)} kkal</p>
            <p><strong>BMR:</strong> {formatNum(calcData.hasil.bmr)} kkal</p>
            <p><strong>Karbo:</strong> {calcData.hasil.karbo} g</p>
            <p><strong>Protein:</strong> {calcData.hasil.protein} g</p>
            <p><strong>Lemak:</strong> {calcData.hasil.lemak} g</p>
          </div>
        </section>
      )}

      {/* ── Logout ── */}
      <section className="pt-sm reveal reveal-delay-300">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-sm bg-error-container/30 border border-error/20 text-error font-semibold py-md rounded-xl hover:bg-error-container/50 transition-colors active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          Keluar dari Akun
        </button>
      </section>

    </main>
  );
}