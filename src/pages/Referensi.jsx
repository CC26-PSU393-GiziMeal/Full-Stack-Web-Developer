// src/pages/Referensi.jsx

const PAL_TABLE = [
  { aktivitas: "Sedentary (Sangat jarang olahraga)",              pal: "1.2" },
  { aktivitas: "Lightly Active (Olahraga ringan 1–3 hari/minggu)", pal: "1.375" },
  { aktivitas: "Moderately Active (Olahraga sedang 3–5 hari/minggu)", pal: "1.55" },
  { aktivitas: "Very Active (Olahraga berat 6–7 hari/minggu)",    pal: "1.725" },
];

export default function ReferensiPage() {
  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-container-margin md:px-lg py-xl md:py-xxl space-y-xxl">

      {/* ── Hero Section ── */}
      <section className="text-center max-w-3xl mx-auto space-y-md reveal">
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary">
          Referensi Sains &amp; Metodologi
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          GiziMeal didasarkan pada pedoman Kemenkes RI, standar nutrisi nasional, dan literatur publikasi ilmiah internasional untuk memastikan setiap informasi gizi dan rekomendasi diet akurat serta terpercaya.
        </p>
      </section>

      {/* ── Peraturan Menteri Kesehatan RI ── */}
      <section className="space-y-md reveal reveal-delay-100">
        <h2 className="font-title-lg text-title-lg text-primary flex items-center gap-sm">
          <span className="material-symbols-outlined text-[32px] text-secondary">gavel</span>
          Peraturan Menteri Kesehatan RI
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <div className="bg-surface-container-low p-lg rounded-[24px] border border-outline-variant hover-lift cursor-pointer group">
            <div className="flex justify-between items-start mb-sm">
              <h3 className="font-title-md text-title-md text-primary group-hover:text-primary-fixed transition-colors font-semibold">Permenkes No. 28 Tahun 2019</h3>
              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary-fixed transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-[20px]">arrow_outward</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Tentang Angka Kecukupan Gizi (AKG) yang dianjurkan untuk Masyarakat Indonesia. Menjadi basis perhitungan kebutuhan energi, protein, lemak, karbohidrat, dan mikronutrien lainnya.
            </p>
          </div>
          <div className="bg-surface-container-low p-lg rounded-[24px] border border-outline-variant hover-lift cursor-pointer group">
            <div className="flex justify-between items-start mb-sm">
              <h3 className="font-title-md text-title-md text-primary group-hover:text-primary-fixed transition-colors font-semibold">Permenkes No. 41 Tahun 2014</h3>
              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary-fixed transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-[20px]">arrow_outward</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Tentang Pedoman Gizi Seimbang. Menjadi acuan dalam penyusunan rekomendasi porsi makan, jenis makanan, dan pola hidup sehat yang terintegrasi dalam platform GiziMeal.
            </p>
          </div>
        </div>
      </section>

      {/* ── Publikasi Ilmiah Internasional ── */}
      <section className="space-y-md reveal reveal-delay-200">
        <h2 className="font-title-lg text-title-lg text-primary flex items-center gap-sm">
          <span className="material-symbols-outlined text-[32px] text-secondary">public</span>
          Publikasi Ilmiah Internasional
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
          {[
            {
              title: "WHO Healthy Diet (2020)",
              desc: "Panduan diet sehat dari World Health Organization untuk pencegahan malnutrisi dan penyakit tidak menular (NCDs).",
            },
            {
              title: "Mifflin–St Jeor (1990)",
              desc: '"A new predictive equation for resting energy expenditure in healthy individuals." — Dasar perhitungan Basal Metabolic Rate (BMR) di GiziMeal.',
            },
            {
              title: "FAO/WHO/UNU (2001)",
              desc: '"Human energy requirements." — Referensi untuk nilai Physical Activity Level (PAL) dan Total Daily Energy Expenditure (TDEE).',
            },
          ].map((pub) => (
            <div
              key={pub.title}
              className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant hover:border-secondary transition-colors cursor-pointer group hover-lift flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-sm">
                  <h3 className="font-title-md text-title-md text-primary group-hover:text-secondary transition-colors font-semibold pr-4">
                    {pub.title}
                  </h3>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-[18px] flex-shrink-0">arrow_outward</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant">{pub.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Dataset Pelatihan Model ── */}
      <section className="space-y-md reveal">
        <h2 className="font-title-lg text-title-lg text-primary flex items-center gap-sm">
          <span className="material-symbols-outlined text-[32px] text-primary">dataset</span>
          Dataset Pelatihan Model
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          {[
            {
              icon: "image",
              title: "Kaggle Dataset (Gambar)",
              desc: "Dataset citra makanan yang digunakan untuk melatih model klasifikasi gambar (Food Image Recognition) GiziMeal.",
            },
            {
              icon: "table_view",
              title: "Kaggle Dataset (CSV Gizi)",
              desc: "Dataset nilai gizi makro dan mikro berbagai bahan makanan yang digunakan untuk memperkaya database nutrisi GiziMeal.",
            },
          ].map((ds) => (
            <div
              key={ds.title}
              className="bg-surface-container-low p-lg rounded-[24px] border border-outline-variant flex items-start gap-md hover-lift"
            >
              <span className="material-symbols-outlined text-[32px] text-secondary flex-shrink-0">
                {ds.icon}
              </span>
              <div>
                <h3 className="font-title-md text-title-md text-primary mb-sm font-semibold">{ds.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{ds.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Rumus & Perhitungan ── */}
      <section className="space-y-lg reveal reveal-delay-100">
        <h2 className="font-title-lg text-title-lg text-primary flex items-center gap-sm">
          <span className="material-symbols-outlined text-[32px] text-primary">calculate</span>
          Rumus &amp; Perhitungan
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl">
          {/* BMR card */}
          <div className="bg-surface-container-lowest p-lg rounded-[24px] border border-outline-variant flex flex-col justify-between hover-lift">
            <div>
              <h3 className="font-title-md text-title-md font-bold mb-lg text-primary">BMR (Basal Metabolic Rate)</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-md">Mifflin-St Jeor Equation (1990)</p>
              <div className="space-y-md">
                {[
                  {
                    label: "Pria",
                    formula: (
                      <>
                        BMR = (10 × <span className="text-[#005236] font-bold">berat kg</span>) + (6.25 × <span className="text-[#005236] font-bold">tinggi cm</span>) − (5 × <span className="text-[#005236] font-bold">umur thn</span>) + 5
                      </>
                    ),
                  },
                  {
                    label: "Wanita",
                    formula: (
                      <>
                        BMR = (10 × <span className="text-[#005236] font-bold">berat kg</span>) + (6.25 × <span className="text-[#005236] font-bold">tinggi cm</span>) − (5 × <span className="text-[#005236] font-bold">umur thn</span>) − 161
                      </>
                    ),
                  },
                ].map((f) => (
                  <div key={f.label} className="bg-white border border-outline-variant/60 p-md rounded-xl text-neutral-900">
                    <div className="font-label-sm text-label-sm text-[#00724d] mb-sm uppercase tracking-wider font-bold">
                      {f.label}
                    </div>
                    <div className="font-body-md text-body-md text-neutral-900 font-mono text-sm leading-relaxed whitespace-nowrap overflow-x-auto">
                      {f.formula}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* TDEE card */}
          <div className="bg-surface-container-lowest p-lg rounded-[24px] border border-outline-variant flex flex-col hover-lift">
            <h3 className="font-title-md text-title-md font-medium text-primary mb-sm">
              TDEE (Total Daily Energy Expenditure)
            </h3>
            <div className="font-mono text-sm bg-surface-container-low border border-surface-container-high p-sm rounded-lg inline-flex items-center gap-sm mb-lg text-on-surface-variant w-fit">
              <span className="text-secondary font-bold">TDEE</span> = <span className="text-primary font-bold">BMR</span> × <span className="text-primary font-bold">PAL</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-outline-variant">
                    <th className="py-md px-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Aktivitas</th>
                    <th className="py-md px-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider whitespace-nowrap text-right">Nilai PAL</th>
                  </tr>
                </thead>
                <tbody>
                  {PAL_TABLE.map((row) => (
                    <tr
                      key={row.pal}
                      className="border-b border-surface-variant hover:bg-surface-container-low transition-colors"
                    >
                      <td className="py-md px-md font-body-md text-body-md text-on-surface font-light">
                        {row.aktivitas.split(" (")[0]} <span className="text-on-surface-variant block text-sm">({row.aktivitas.split(" (")[1]}</span>
                      </td>
                      <td className="py-md px-md font-numeric-data text-numeric-data text-on-surface text-lg text-right font-medium">{row.pal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Target Kalori */}
          <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant hover-lift">
            <h3 className="font-title-md text-title-md text-primary mb-sm font-semibold">Target Kalori Harian</h3>
            <ul className="space-y-sm list-disc pl-md font-body-md text-body-md text-on-surface-variant">
              <li>
                <strong className="text-primary">Weight Loss (Penurunan Berat Badan):</strong> TDEE − 500 kcal
              </li>
              <li>
                <strong className="text-primary">Maintenance (Pemeliharaan):</strong> = TDEE
              </li>
              <li>
                <strong className="text-primary">Weight Gain (Penaikan Berat Badan):</strong> TDEE + 500 kcal
              </li>
            </ul>
          </div>

          {/* Menu AKG Score */}
          <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant hover-lift">
            <h3 className="font-title-md text-title-md text-primary mb-sm font-semibold">Menu AKG Score</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-sm">
              Skor kecocokan menu dihitung berdasarkan seberapa dekat total kalori dan makronutrien menu dengan sisa kebutuhan harian pengguna (dalam persentase).
            </p>
            <code className="block font-mono text-[13px] bg-surface-container p-sm rounded-md text-on-surface-variant">
              Score = 100 − (|Target − Aktual| / Target) × 100
            </code>
          </div>
        </div>
      </section>

      {/* ── Catatan Sitasi & Disclaimer ── */}
      <section className="space-y-md border-t border-outline-variant pt-lg reveal">
        <div className="bg-surface-container-low p-md rounded-xl font-body-md text-body-md text-on-surface-variant">
          <strong className="text-primary">Catatan Sitasi: </strong>
          Referensi di atas merupakan sumber data dan metodologi yang digunakan dalam pengembangan sistem GiziMeal. Kami berkomitmen untuk selalu memperbarui basis data kami sesuai dengan temuan ilmiah terbaru dan regulasi pemerintah yang berlaku.
        </div>

        <div className="bg-error-container/30 border border-error/20 p-md rounded-xl font-body-md text-body-md text-on-surface-variant flex gap-sm">
          <span className="material-symbols-outlined text-error mt-0.5 flex-shrink-0">warning</span>
          <p>
            <strong className="text-error block mb-1 font-bold">Disclaimer Medis:</strong>
            Hasil perhitungan dan rekomendasi yang diberikan oleh GiziMeal bersifat informatif dan didasarkan pada perhitungan standar. GiziMeal bukan pengganti nasihat medis profesional, diagnosis, atau perawatan. Selalu konsultasikan dengan dokter atau ahli gizi terdaftar untuk kebutuhan diet khusus atau kondisi medis Anda.
          </p>
        </div>
      </section>
    </main>
  );
}