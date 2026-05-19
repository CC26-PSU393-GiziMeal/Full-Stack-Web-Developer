const STEPS = [
  {
    icon: "photo_camera",
    title: "Foto Bahan",
    desc: "Ambil foto bahan makanan mentah yang tersedia di dapur Anda.",
  },
  {
    icon: "analytics",
    title: "Analisis AI",
    desc: "Sistem otomatis mendeteksi bahan dan memetakan kandungan gizinya.",
  },
  {
    icon: "person_search",
    title: "Cek Kebutuhan",
    desc: "Kalkulasi kecocokan nutrisi bahan dengan profil kalori harian Anda.",
  },
  {
    icon: "lunch_dining",
    title: "Masak & Nikmati",
    desc: "Terima rekomendasi resep menu gizi seimbang yang siap dimasak.",
  },
];

const TESTIMONIALS = [
  { quote: "Sangat membantu saya mengatur gizi keluarga sehari-hari! Aplikasinya mudah digunakan dan informasinya jelas.", name: "Sari H.", role: "Ibu Rumah Tangga, Jakarta", stars: 5 },
  { quote: "Fitur deteksi bahannya canggih banget, saya jadi tahu apa yang saya makan dan berapa kalorinya dengan cepat.", name: "Budi T.", role: "Pegawai Kantor, Surabaya", stars: 4.5 },
  { quote: "Kalkulator kalorinya akurat dan mudah digunakan untuk diet saya. Suka banget dengan rekomendasi resepnya.", name: "Lina M.", role: "Mahasiswi, Bandung", stars: 5 },
  { quote: "Rekomendasi menunya sehat-sehat dan porsinya pas untuk latihan. Sangat merekomendasikan untuk yang aktif.", name: "Andi K.", role: "Atlet Lari, Bali", stars: 5 },
];

function StarRating({ count }) {
  return (
    <div className="flex text-yellow-400">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
          {count >= i ? "star" : count >= i - 0.5 ? "star_half" : "star_outline"}
        </span>
      ))}
    </div>
  );
}

export default function HowItWorksSection() {
  return (
    <>
      {/* How it works */}
      <section className="py-xxl bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-container-margin md:px-lg">
          <h2 className="text-[32px] font-bold text-primary-container text-center mb-xl reveal">
            Bagaimana Cara Kerjanya?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-lg">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                className={`bg-surface-container-lowest p-lg rounded-2xl shadow-sm border border-outline-variant text-center flex flex-col items-center hover:shadow-md transition-shadow reveal reveal-delay-${i * 100}`}
              >
                <div className="w-16 h-16 rounded-full border border-outline-variant bg-surface-container-lowest text-primary-container flex items-center justify-center mb-md">
                  <span className="material-symbols-outlined text-3xl">{step.icon}</span>
                </div>
                <h4 className="text-[20px] font-bold text-primary-container mb-xs">
                  {i + 1}. {step.title}
                </h4>
                <p className="text-[16px] text-on-surface-variant">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-xxl overflow-hidden border-t border-outline-variant bg-background">
        <div className="max-w-7xl mx-auto px-container-margin md:px-lg mb-xl reveal">
          <span className="uppercase tracking-[0.2em] text-on-surface-variant font-bold mb-sm block text-[14px]">
            LAYANAN UTAMA KAMI
          </span>
          <h2 className="text-[40px] font-bold text-primary-container max-w-2xl leading-tight">
            Edukasi gizi yang terasa dekat dengan dapur sehari-hari.
          </h2>
        </div>

        {/* Scrolling track */}
        <div className="flex w-full overflow-hidden reveal reveal-delay-200">
          <div className="flex gap-lg animate-[scroll_40s_linear_infinite] hover:[animation-play-state:paused]"
            style={{ width: "max-content" }}>
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <div
                key={i}
                className="w-[340px] bg-surface-container-lowest p-xl rounded-[24px] border border-outline-variant shadow-sm flex flex-col gap-sm justify-between flex-shrink-0"
              >
                <div>
                  <div className="mb-sm text-outline-variant">
                    <span className="material-symbols-outlined text-3xl">format_quote</span>
                  </div>
                  <p className="text-[16px] text-on-surface-variant mb-lg leading-relaxed">"{t.quote}"</p>
                </div>
                <div className="flex justify-between items-end border-t border-outline-variant pt-md">
                  <div>
                    <div className="text-[14px] font-bold text-on-surface">{t.name}</div>
                    <div className="text-[12px] text-on-surface-variant">{t.role}</div>
                  </div>
                  <StarRating count={t.stars} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}