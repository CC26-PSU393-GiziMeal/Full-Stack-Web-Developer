// src/pages/FAQ.jsx
import { useState } from "react";

const CATEGORIES = [
  { id: "umum",    label: "Umum",           icon: "info" },
  { id: "akurasi", label: "Akurasi",        icon: "verified" },
  { id: "teknis",  label: "Teknis & Privasi", icon: "settings" },
];

const FAQ_DATA = {
  umum: [
    {
      q: "Apa itu GiziMeal?",
      a: "GiziMeal adalah platform edukasi gizi berbasis AI yang membantu Anda mengenali bahan makanan melalui foto, mendapatkan rekomendasi menu sehat, dan memahami kebutuhan nutrisi harian berdasarkan standar Angka Kecukupan Gizi (AKG) Kemenkes RI.",
    },
    {
      q: "Bagaimana AI mendeteksi bahan makanan?",
      a: "GiziMeal menggunakan teknologi visi komputer canggih untuk menganalisis gambar makanan yang Anda unggah. AI kami dilatih dengan ribuan dataset makanan lokal Indonesia. Sistem mengidentifikasi komponen makanan, memperkirakan porsi, dan mencocokkannya dengan database nutrisi terstandarisasi untuk memberikan perkiraan kandungan gizi yang mendekati akurat sesuai pedoman Angka Kecukupan Gizi (AKG).",
    },
  ],
  akurasi: [
    {
      q: "Seberapa akurat deteksi bahan?",
      a: "Model klasifikasi GiziMeal dilatih dengan dataset 15 bahan makanan utama dan mencapai akurasi rata-rata di atas 80% pada kondisi foto yang optimal (pencahayaan cukup, latar belakang polos, satu bahan per foto). Confidence score ditampilkan secara transparan di setiap hasil deteksi.",
    },
    {
      q: "Apakah data nutrisi dapat dipercaya?",
      a: "Data nutrisi GiziMeal bersumber dari dataset Kaggle yang telah diverifikasi ulang menggunakan acuan Permenkes No. 28 Tahun 2019 tentang AKG dan Pedoman Gizi Seimbang Kemenkes RI. Semua informasi bersifat edukatif dan tidak dimaksudkan sebagai pengganti konsultasi ahli gizi.",
    },
  ],
  teknis: [
    {
      q: "Cara menggunakan Kalkulator Energi",
      a: "Buka menu Kalkulator, isi data biometrik Anda (jenis kelamin, berat badan, tinggi badan, usia), pilih tingkat aktivitas fisik, dan tentukan tujuan kebugaran. Sistem akan menghitung BMR menggunakan formula Mifflin–St Jeor (1990) dan TDEE berdasarkan standar FAO/WHO/UNU (2001) secara otomatis.",
    },
    {
      q: "Bagaimana GiziMeal melindungi data saya?",
      a: "GiziMeal adalah platform edukasi yang tidak menyimpan foto yang Anda unggah secara permanen. Data kalkulasi energi disimpan secara lokal di sesi browser Anda. Kami berkomitmen untuk tidak membagikan data pribadi kepada pihak ketiga tanpa persetujuan Anda.",
    },
  ],
};

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div className="bg-surface rounded-xl border border-surface-variant shadow-[0_2px_10px_rgba(1,45,29,0.03)] overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-lg flex justify-between items-center text-left hover:bg-surface-container-lowest transition-colors"
      >
        <h3
          className={`text-[20px] font-semibold pr-8 ${
            isOpen ? "text-primary" : "text-on-surface"
          }`}
        >
          {item.q}
        </h3>
        <span
          className={`material-symbols-outlined flex-shrink-0 transition-all duration-300 ${
            isOpen ? "text-primary rotate-180" : "text-outline"
          }`}
        >
          expand_more
        </span>
      </button>

      {/* Answer — animated */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-lg pb-lg pt-0 text-[16px] leading-relaxed text-on-surface-variant bg-surface-container-lowest border-t border-surface-variant">
          {item.a}
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("umum");
  const [openIndex, setOpenIndex]           = useState({ umum: 1, akurasi: null, teknis: null });

  const toggle = (cat, idx) => {
    setOpenIndex((prev) => ({ ...prev, [cat]: prev[cat] === idx ? null : idx }));
  };

  const scrollTo = (id) => {
    setActiveCategory(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="flex-grow">

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="bg-surface-container-low py-xxl px-container-margin md:px-lg text-center relative overflow-hidden reveal">
        <div className="max-w-[800px] mx-auto relative z-10">
          <h1 className="text-[24px] md:text-[40px] font-bold text-primary mb-md">
            Pertanyaan yang Sering Diajukan
          </h1>
          <p className="text-[18px] leading-7 text-on-surface-variant max-w-2xl mx-auto">
            Temukan jawaban atas pertanyaan Anda mengenai bagaimana GiziMeal membantu Anda mencapai
            tujuan nutrisi dengan panduan standar AKG dan teknologi AI.
          </p>
        </div>
      </section>

      {/* ── FAQ Content ──────────────────────────────── */}
      <section className="py-xxl px-container-margin md:px-lg max-w-[1000px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">

          {/* Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 reveal-left">
            <div className="sticky top-24 bg-surface rounded-xl p-md shadow-[0_4px_20px_rgba(1,45,29,0.04)] border border-surface-variant">
              <h3 className="text-[14px] font-semibold text-on-surface mb-sm uppercase tracking-widest">
                Kategori
              </h3>
              <nav className="flex flex-col gap-sm">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => scrollTo(cat.id)}
                    className={`text-left text-[16px] py-2 px-3 rounded-md transition-colors border-l-2 ${
                      activeCategory === cat.id
                        ? "text-primary font-semibold border-primary"
                        : "text-on-surface-variant hover:text-primary hover:bg-surface-container border-transparent"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Accordion area */}
          <div className="lg:col-span-9 space-y-xl">
            {CATEGORIES.map((cat, i) => (
              <div key={cat.id} id={cat.id} className={`scroll-mt-24 reveal reveal-delay-${i * 100}`}>
                {/* Category heading */}
                <div className="flex items-center gap-3 mb-md">
                  <span
                    className="material-symbols-outlined text-secondary text-[28px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {cat.icon}
                  </span>
                  <h2 className="text-[24px] font-bold text-primary">{cat.label}</h2>
                </div>

                <div className="space-y-sm">
                  {FAQ_DATA[cat.id].map((item, idx) => (
                    <AccordionItem
                      key={item.q}
                      item={item}
                      isOpen={openIndex[cat.id] === idx}
                      onToggle={() => toggle(cat.id, idx)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact CTA ──────────────────────────────── */}
      <section className="py-xl px-container-margin md:px-lg mb-xxl reveal">
        <div className="max-w-[800px] mx-auto bg-surface-container rounded-3xl p-lg md:p-xl text-center border border-primary-fixed flex flex-col items-center gap-md relative overflow-hidden">
          <div className="absolute right-[-20px] top-[-20px] opacity-10">
            <span className="material-symbols-outlined text-[120px] text-primary">help_center</span>
          </div>
          <div className="relative z-10">
            <h3 className="text-[20px] font-semibold text-primary mb-sm">Masih butuh bantuan?</h3>
            <p className="text-[16px] text-on-surface-variant mb-lg">
              Tim dukungan klinis kami siap membantu Anda memahami kebutuhan nutrisi Anda lebih lanjut.
            </p>
            <button className="bg-secondary text-on-secondary px-6 py-3 rounded-[16px] text-[14px] font-semibold hover:bg-primary transition-colors flex items-center justify-center gap-2 mx-auto">
              <span className="material-symbols-outlined text-[20px]">mail</span>
              Hubungi Dukungan
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}