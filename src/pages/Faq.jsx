import { useState } from "react";

const CATEGORIES = [
  { id: "umum",    label: "Umum",          icon: "info" },
  { id: "akurasi", label: "Akurasi",       icon: "verified" },
  { id: "teknis",  label: "Teknis & Privasi", icon: "settings" },
];

const FAQ_DATA = {
  umum: [
    { q: "Apa itu GiziMeal?", a: "GiziMeal adalah platform edukasi gizi berbasis AI yang membantu Anda mengenali bahan makanan melalui foto, mendapatkan rekomendasi menu sehat, dan memahami kebutuhan nutrisi harian berdasarkan standar Angka Kecukupan Gizi (AKG) Kemenkes RI." },
    { q: "Bagaimana AI mendeteksi bahan makanan?", a: "GiziMeal menggunakan teknologi visi komputer canggih untuk menganalisis gambar makanan yang Anda unggah. AI kami dilatih dengan ribuan dataset makanan lokal Indonesia. Sistem mengidentifikasi komponen makanan, memperkirakan porsi, dan mencocokkannya dengan database nutrisi terstandarisasi untuk memberikan perkiraan kandungan gizi yang mendekati akurat sesuai pedoman Angka Kecukupan Gizi (AKG)." },
  ],
  akurasi: [
    { q: "Seberapa akurat deteksi bahan?", a: "Model klasifikasi GiziMeal dilatih dengan dataset 15 bahan makanan utama dan mencapai akurasi rata-rata di atas 80% pada kondisi foto yang optimal (pencahayaan cukup, latar belakang polos, satu bahan per foto). Confidence score ditampilkan secara transparan di setiap hasil deteksi." },
    { q: "Apakah data nutrisi dapat dipercaya?", a: "Data nutrisi GiziMeal bersumber dari dataset Kaggle yang telah diverifikasi ulang menggunakan acuan Permenkes No. 28 Tahun 2019 tentang AKG dan Pedoman Gizi Seimbang Kemenkes RI. Semua informasi bersifat edukatif dan tidak dimaksudkan sebagai pengganti konsultasi ahli gizi." },
  ],
  teknis: [
    { q: "Cara menggunakan Kalkulator Energi", a: "Buka menu Kalkulator, isi data biometrik Anda (jenis kelamin, berat badan, tinggi badan, usia), pilih tingkat aktivitas fisik, dan tentukan tujuan kebugaran. Sistem akan menghitung BMR menggunakan formula Mifflin–St Jeor (1990) dan TDEE berdasarkan standar FAO/WHO/UNU (2001) secara otomatis." },
    { q: "Bagaimana GiziMeal melindungi data saya?", a: "GiziMeal adalah platform edukasi yang tidak menyimpan foto yang Anda unggah secara permanen. Data kalkulasi energi disimpan secara lokal di sesi browser Anda. Kami berkomitmen untuk tidak membagikan data pribadi kepada pihak ketiga tanpa persetujuan Anda." },
  ],
};

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-lg flex justify-between items-center text-left hover:bg-surface transition-colors"
      >
        <h3 className={`text-[16px] font-semibold pr-8 leading-snug ${isOpen ? "text-primary" : "text-foreground"}`}>
          {item.q}
        </h3>
        <span className={`material-symbols-outlined flex-shrink-0 transition-transform duration-300 ${isOpen ? "text-primary rotate-180" : "text-muted-foreground"}`}>
          expand_more
        </span>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-lg pb-lg pt-0 text-[15px] leading-relaxed text-muted-foreground bg-card border-t border-border mt-sm pt-sm">
          {item.a}
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("umum");
  const [openIndex, setOpenIndex]           = useState({ umum: 0, akurasi: null, teknis: null });

  const toggle = (cat, idx) => {
    setOpenIndex((prev) => ({ ...prev, [cat]: prev[cat] === idx ? null : idx }));
  };

  const scrollTo = (id) => {
    setActiveCategory(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="flex-grow">
      <section className="bg-surface py-xxl px-container-margin md:px-lg text-center relative overflow-hidden reveal border-b border-border">
        <div className="max-w-[800px] mx-auto relative z-10">
          <span className="text-[11px] font-semibold tracking-[0.22em] text-secondary uppercase mb-md block">BANTUAN & DUKUNGAN</span>
          <h1 className="text-[28px] md:text-[40px] tracking-tight font-semibold text-primary mb-md leading-[1.05]">
            Pertanyaan yang Sering Diajukan
          </h1>
          <p className="text-[16px] leading-relaxed text-muted-foreground max-w-2xl mx-auto">
            Temukan jawaban atas pertanyaan Anda mengenai bagaimana GiziMeal membantu Anda mencapai
            tujuan nutrisi dengan panduan standar AKG dan teknologi AI.
          </p>
        </div>
      </section>

      <section className="py-xxl px-container-margin md:px-lg max-w-[1000px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
          <aside className="hidden lg:block lg:col-span-3 reveal-left">
            <div className="sticky top-24 bg-card rounded-xl p-md shadow-sm border border-border">
              <h3 className="text-[11px] font-semibold text-muted-foreground mb-sm uppercase tracking-[0.22em]">
                Kategori
              </h3>
              <nav className="flex flex-col gap-sm">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => scrollTo(cat.id)}
                    className={`text-left text-[14px] py-2 px-3 rounded-md transition-colors border-l-2 ${
                      activeCategory === cat.id
                        ? "text-primary font-semibold border-primary bg-primary/5"
                        : "text-muted-foreground hover:text-primary hover:bg-surface border-transparent"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          <div className="lg:col-span-9 space-y-xl">
            {CATEGORIES.map((cat, i) => (
              <div key={cat.id} id={cat.id} className={`scroll-mt-24 reveal reveal-delay-${i * 100}`}>
                <div className="flex items-center gap-3 mb-md">
                  <span className="material-symbols-outlined text-secondary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {cat.icon}
                  </span>
                  <h2 className="text-[20px] font-semibold tracking-tight text-primary">{cat.label}</h2>
                </div>

                <div className="space-y-sm">
                  {FAQ_DATA[cat.id].map((item, idx) => (
                    <AccordionItem key={item.q} item={item} isOpen={openIndex[cat.id] === idx} onToggle={() => toggle(cat.id, idx)} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-xl px-container-margin md:px-lg mb-xxl reveal">
        <div className="max-w-[800px] mx-auto bg-surface-alt rounded-3xl p-lg md:p-xl text-center border border-border flex flex-col items-center gap-md relative overflow-hidden">
          <div className="absolute right-[-20px] top-[-20px] opacity-5">
            <span className="material-symbols-outlined text-[120px] text-primary">help_center</span>
          </div>
          <div className="relative z-10">
            <h3 className="text-[20px] font-semibold text-primary mb-sm tracking-tight">Masih butuh bantuan?</h3>
            <p className="text-[15px] leading-relaxed text-muted-foreground mb-lg">
              Tim dukungan klinis kami siap membantu Anda memahami kebutuhan nutrisi Anda lebih lanjut.
            </p>
            <button className="bg-secondary text-secondary-foreground px-6 py-3 rounded-full text-[14px] font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mx-auto">
              <span className="material-symbols-outlined text-[18px]">mail</span>
              Hubungi Dukungan
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}