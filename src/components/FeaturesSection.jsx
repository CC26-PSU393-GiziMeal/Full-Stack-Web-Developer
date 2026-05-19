import { Link } from "react-router-dom";

const PILLARS = [
  {
    icon: "center_focus_strong",
    title: "Klasifikasi Bahan",
    desc: "Saran menu gizi seimbang lengkap dengan resep, bahan, dan informasi nutrisi per porsi.",
    to: "/deteksi",
  },
  {
    icon: "monitor_heart",
    title: "Kalkulator AKG",
    desc: "Hitung kebutuhan kalori harian berdasarkan standar AKG Kemenkes RI dengan presisi klinis.",
    to: "/kalkulator",
  },
  {
    icon: "receipt_long",
    title: "Database Gizi",
    desc: "Eksplorasi ribuan data komposisi pangan yang dikurasi berdasarkan referensi ilmiah resmi.",
    to: "/database",
  },
  {
    icon: "restaurant",
    title: "Rekomendasi Menu",
    desc: "Saran menu gizi seimbang lengkap dengan resep, bahan, dan informasi nutrisi per porsi.",
    to: "/deteksi",
  },
];

export default function FeaturesSection() {
  return (
    <div className="bg-background">
      {/* Disclaimer Banner */}
      <section className="py-sm border-b border-outline-variant">
        <div className="max-w-7xl mx-auto px-container-margin flex flex-col md:flex-row items-center justify-center gap-2 text-center">
          <span className="material-symbols-outlined text-sm text-on-surface-variant">info</span>
          <p className="text-[12px] font-medium text-on-surface-variant">
            GiziMeal adalah platform edukasi gizi. Informasi bersifat informatif dan bukan pengganti konsultasi tenaga kesehatan profesional.{" "}
            <Link to="/referensi" className="underline ml-1 hover:text-primary-container transition-colors font-bold">
              Lihat Referensi
            </Link>
          </p>
        </div>
      </section>

      {/* Empat Pilar Bento */}
      <section className="py-xxl">
        <div className="max-w-7xl mx-auto px-container-margin md:px-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
            {/* Left text */}
            <div className="lg:col-span-4 flex flex-col justify-center reveal-left">
              <span className="uppercase tracking-[0.2em] text-on-surface-variant font-bold mb-md block text-[14px]">
                EMPAT PILAR LAYANAN
              </span>
              <h2 className="text-primary-container mb-md leading-[1.1] font-bold text-[40px] md:text-[56px]">
                Pendekatan sederhana untuk gizi seimbang sehari-hari.
              </h2>
              <p className="text-[18px] md:text-[20px] text-on-surface-variant leading-relaxed">
                Setiap modul mengikuti alur yang mudah dipahami yaitu identifikasi
                bahan, perhitungan kebutuhan, penyusunan menu, dan edukasi pendukung.
              </p>
            </div>

            {/* Bento Grid */}
            <div className="lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-[32px] p-lg md:p-xl shadow-sm reveal-right">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {PILLARS.map((p, i) => {
                  const borderClass = [
                    "border-b md:border-r border-outline-variant",
                    "border-b border-outline-variant",
                    "md:border-r border-outline-variant",
                    "",
                  ][i];
                  return (
                    <div
                      key={p.title}
                      className={`flex flex-col group p-lg md:p-xl ${borderClass} transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
                    >
                      <div className="mb-md text-on-surface-variant">
                        <span className="material-symbols-outlined text-4xl">{p.icon}</span>
                      </div>
                      <h3 className="text-[20px] font-bold text-primary-container mb-sm">{p.title}</h3>
                      <p className="text-[14px] font-semibold text-on-surface-variant mb-lg flex-grow leading-relaxed">{p.desc}</p>
                      <Link
                        to={p.to}
                        className="text-primary-container text-[14px] font-bold flex items-center gap-1 group-hover:gap-2 transition-all mt-auto"
                      >
                        Pelajari modul{" "}
                        <span className="material-symbols-outlined text-sm">arrow_outward</span>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}