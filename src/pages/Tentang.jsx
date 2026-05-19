// src/pages/Tentang.jsx
import { Link } from "react-router-dom";

const TEAM = [
  {
    initials: "AK",
    name: "Azharangga Kusuma",
    role: "AI Engineer & Project Manager",
    cohort: "CACC270D4Y0721",
    path: "AI Engineer",
    bg: "bg-primary-container",
    text: "text-on-primary",
  },
  {
    initials: "PN",
    name: "Putri Nabilla",
    role: "AI Engineer",
    cohort: "CACC270D4X1171",
    path: "AI Engineer",
    bg: "bg-secondary",
    text: "text-on-secondary",
  },
  {
    initials: "FR",
    name: "Farina Setya Rahesti",
    role: "Data Scientist",
    cohort: "CDCC768D4X3089",
    path: "Data Scientist",
    bg: "bg-primary-fixed",
    text: "text-on-primary-fixed",
  },
  {
    initials: "MB",
    name: "Mahaputri Buana Devi",
    role: "Data Scientist",
    cohort: "CDCC768D4X0068",
    path: "Data Scientist",
    bg: "bg-primary",
    text: "text-on-primary",
  },
  {
    initials: "MD",
    name: "M. Dava Arya Nada Putra",
    role: "Frontend Developer",
    cohort: "CFCC258D4Y1663",
    path: "Full-Stack Web Dev",
    bg: "bg-tertiary-container",
    text: "text-on-tertiary-container",
  },
  {
    initials: "MI",
    name: "Muhammad Ihsanul Dzikri",
    role: "Backend Developer",
    cohort: "CFCC308D4Y1181",
    path: "Full-Stack Web Dev",
    bg: "bg-secondary-fixed",
    text: "text-on-secondary-fixed",
  },
];

const STEPS = [
  { num: "01", icon: "photo_camera",    text: "Kamu foto bahan makanan yang ada di dapur", align: "right" },
  { num: "02", icon: "send",            text: "Foto dikirim ke sistem GiziMeal untuk dianalisis", align: "left" },
  { num: "03", icon: "memory",          text: "Sistem mengenali jenis bahan dari foto", align: "right" },
  { num: "04", icon: "restaurant_menu", text: "GiziMeal menyiapkan rekomendasi menu untukmu", align: "left" },
  { num: "05", icon: "done_all",        text: "Hasil deteksi dan menu langsung tampil di layar", align: "right" },
];

function TeamCard({ member }) {
  return (
    <div className="bg-surface rounded-[20px] p-6 border border-surface-variant flex flex-col items-center text-center hover:shadow-md hover:border-outline-variant transition-all hover-lift">
      {/* Avatar */}
      <div className={`w-24 h-24 rounded-full ${member.bg} ${member.text} flex items-center justify-center text-[28px] font-bold shadow-sm mb-4`}>
        {member.initials}
      </div>

      <h3 className="text-[20px] font-bold text-on-surface">{member.name}</h3>
      <p className="text-[14px] font-semibold text-secondary mb-md">{member.role}</p>

      {/* Info strip */}
      <div className="w-full bg-surface-container-low rounded-[16px] p-4 mt-auto space-y-3">
        <div className="flex justify-between items-center">
          <p className="text-[11px] font-semibold tracking-wider text-outline uppercase">ID Cohort</p>
          <p className="text-[13px] font-bold text-on-surface">{member.cohort}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-[11px] font-semibold tracking-wider text-outline uppercase">Path</p>
          <p className="text-[13px] font-bold text-on-surface">{member.path}</p>
        </div>
      </div>

      {/* Social icons */}
      <div className="flex gap-4 mt-6 text-outline">
        <button className="hover:text-primary transition-colors bg-surface-container w-8 h-8 rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-[18px]">mail</span>
        </button>
        <button className="hover:text-primary transition-colors bg-surface-container w-8 h-8 rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-[18px]">link</span>
        </button>
      </div>
    </div>
  );
}

export default function TentangPage() {
  return (
    <main className="flex-grow w-full max-w-[1200px] mx-auto px-container-margin py-xxl space-y-32">

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-center reveal">
        <div className="space-y-lg relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-sm bg-primary/10 text-primary px-sm py-xs rounded-full border border-primary/20">
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              spa
            </span>
            <span className="text-[12px] font-medium tracking-widest uppercase">Tentang Kami</span>
          </div>

          <h1 className="text-[40px] leading-[48px] tracking-tight font-bold text-primary">
            Edukasi gizi yang berbasis pedoman resmi.
          </h1>
          <p className="text-[18px] leading-7 text-on-surface-variant">
            GiziMeal adalah capstone project CC26-PSU393 bertema Healthy Lives &amp; Well-Being.
            Platform ini menyatukan klasifikasi bahan otomatis dengan acuan Permenkes RI agar
            setiap rekomendasi dapat ditelusuri sumbernya.
          </p>
        </div>

        {/* Hero image */}
        <div className="relative min-h-[300px] rounded-3xl bg-secondary-container overflow-hidden">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVOOZWLQ-7chDHPvBP9e1mFeKVlbhgHSrmfrbPrgmzqViw-JPUOo4Xn9USUH4KBuQHAhWUXw7iBvvtHcz71LZlaCrkWwdJFOrrxLPiGHtWel9TrFQ4o76fplYtDU_yd2D5WbFmuk9gRd0Y9mzqxm3VOnb7E3SpxlW0gN_HHPDDWnwvC_pRaLxb8vOqWh3roxYSI6-P2sC8eUd4mfFaLpbtRJWFNu_TQbg7MwfOjLS6gON7pjcFHb3ZQ1h563pBeRXODDZeQSB_3N4"
            alt="Fresh ingredients"
            className="absolute inset-0 w-full h-full object-cover rounded-3xl"
          />
          <div className="absolute inset-0 bg-primary/10 rounded-3xl" />
        </div>
      </section>

      {/* ── Pendekatan Kami ───────────────────────────── */}
      <section className="space-y-xl reveal reveal-delay-100">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-[32px] font-bold text-primary">Pendekatan Kami</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg items-start">
          {/* Masalah */}
          <div className="bg-surface rounded-[24px] p-lg shadow-sm border border-outline-variant hover:border-primary-fixed-dim hover:shadow-md transition-all h-full">
            <div className="w-12 h-12 rounded-xl bg-error-container flex items-center justify-center text-on-error-container mb-md">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                report_problem
              </span>
            </div>
            <h3 className="text-[20px] font-semibold text-primary mb-md">Masalah</h3>
            <ul className="space-y-sm">
              {[
                "Kurangnya pemahaman kebutuhan gizi harian",
                "Kesulitan menentukan menu gizi seimbang sehari-hari",
                "Minim literasi gizi di kalangan masyarakat",
              ].map((item) => (
                <li key={item} className="flex items-start gap-sm">
                  <span className="material-symbols-outlined text-error text-base mt-1 flex-shrink-0">remove</span>
                  <span className="text-[16px] text-on-surface-variant">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solusi — staggered down */}
          <div className="bg-primary-container rounded-[24px] p-lg shadow-md border border-primary text-on-primary md:mt-12 h-full hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed mb-md">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                lightbulb
              </span>
            </div>
            <h3 className="text-[20px] font-semibold text-on-primary mb-md">Solusi</h3>
            <ul className="space-y-sm">
              {[
                "Klasifikasi bahan makanan dari foto",
                "Rekomendasi menu gizi seimbang dengan skor AKG",
                "Dataset gambar & CSV gizi dari Kaggle, diverifikasi ulang dengan acuan AKG & Pedoman Gizi Seimbang",
                "Kalkulator BMR & TDEE Mifflin–St Jeor",
              ].map((item) => (
                <li key={item} className="flex items-start gap-sm">
                  <span className="material-symbols-outlined text-secondary-fixed text-base mt-1 flex-shrink-0">check</span>
                  <span className="text-[16px] text-on-primary/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Batasan */}
          <div className="bg-surface rounded-[24px] p-lg shadow-sm border border-outline-variant hover:border-primary-fixed-dim hover:shadow-md transition-all h-full md:mt-6">
            <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface-variant mb-md">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                tune
              </span>
            </div>
            <h3 className="text-[20px] font-semibold text-primary mb-md">Batasan</h3>
            <ul className="space-y-sm">
              {[
                "Sistem prototype edukasi",
                "Dataset terbatas pada 15 bahan utama",
                "Informasi gizi bersifat informatif",
                "Bukan pengganti konsultasi medis",
              ].map((item) => (
                <li key={item} className="flex items-start gap-sm">
                  <span className="material-symbols-outlined text-outline text-base mt-1 flex-shrink-0">arrow_right</span>
                  <span className="text-[16px] text-on-surface-variant">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Alur Sistem zig-zag timeline ─────────────── */}
      <section className="space-y-xl reveal reveal-delay-200">
        <div className="text-center max-w-2xl mx-auto space-y-sm">
          <p className="text-[12px] font-medium tracking-widest text-secondary uppercase">Alur Sistem</p>
          <h2 className="text-[32px] font-bold text-primary">Bagaimana GiziMeal bekerja</h2>
        </div>

        <div className="relative max-w-3xl mx-auto py-md">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-primary-fixed-dim opacity-50" />

          <div className="space-y-xl">
            {STEPS.map((step, i) => {
              const isRight = step.align === "right";
              const isLast  = i === STEPS.length - 1;
              const circleBg = isLast
                ? "bg-primary text-on-primary ring-8 ring-primary-container/20 w-20 h-20 shadow-lg"
                : i % 2 === 0
                  ? "bg-secondary text-on-secondary ring-4 ring-surface-container-lowest w-16 h-16 shadow-md"
                  : "bg-surface-container-highest text-on-surface-variant ring-4 ring-surface-container-lowest w-16 h-16 shadow-sm";

              return (
                <div
                  key={step.num}
                  className="relative flex flex-col md:flex-row items-center justify-between w-full group"
                >
                  {/* Left content */}
                  <div
                    className={`order-1 md:w-5/12 px-4 transition-transform ${
                      isRight ? "text-center md:text-right group-hover:md:-translate-x-2" : "hidden md:block"
                    }`}
                  >
                    {isRight && (
                      <>
                        <span className="text-6xl font-extrabold text-surface-container-highest mb-2 block tracking-tighter">
                          {step.num}
                        </span>
                        <p className="font-title-md text-title-md text-on-surface font-semibold">{step.text}</p>
                      </>
                    )}
                  </div>

                  {/* Circle icon */}
                  <div
                    className={`z-10 flex items-center justify-center order-1 rounded-full ${circleBg} my-4 md:my-0`}
                  >
                    <span
                      className="material-symbols-outlined text-2xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {step.icon}
                    </span>
                  </div>

                  {/* Right content */}
                  <div
                    className={`order-1 md:w-5/12 px-4 transition-transform ${
                      !isRight ? "text-center md:text-left group-hover:md:translate-x-2" : "hidden md:block"
                    }`}
                  >
                    {!isRight && (
                      <>
                        <span className="text-6xl font-extrabold text-surface-container-highest mb-2 block tracking-tighter">
                          {step.num}
                        </span>
                        <p className="font-title-md text-title-md text-on-surface font-semibold">{step.text}</p>
                      </>
                    )}
                  </div>

                  {/* Mobile text fallback */}
                  <div className="md:hidden text-center mt-2 order-2 px-4">
                    <span className="text-4xl font-extrabold text-surface-container-highest block">{step.num}</span>
                    <p className="text-[16px] leading-relaxed font-semibold text-on-surface">{step.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Tim Pengembang ────────────────────────────── */}
      <section className="space-y-xl pt-xl reveal">
        <div className="text-center max-w-2xl mx-auto space-y-sm">
          <p className="text-[12px] font-medium tracking-widest text-secondary uppercase">Tim Pengembang</p>
          <h2 className="text-[32px] font-bold text-primary">Siapa yang membangun GiziMeal</h2>
          <p className="text-[16px] text-on-surface-variant">
            Capstone project CC26-PSU393 yang dikerjakan oleh enam mahasiswa lintas learning path
            dari Coding Camp 2026 by DBS Foundation.
          </p>
        </div>

        {/* Grid with top margin for avatar overflow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {TEAM.map((member, i) => (
            <div key={member.initials} className={`reveal reveal-delay-${(i % 3) * 100}`}>
              <TeamCard member={member} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}