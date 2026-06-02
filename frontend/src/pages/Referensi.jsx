const PAL_TABLE = [
  { aktivitas: "Sedentary (Sangat jarang olahraga)", pal: "1.2" },
  { aktivitas: "Lightly Active (Olahraga ringan 1–3 hari/minggu)", pal: "1.375" },
  { aktivitas: "Moderately Active (Olahraga sedang 3–5 hari/minggu)", pal: "1.55" },
  { aktivitas: "Very Active (Olahraga berat 6–7 hari/minggu)", pal: "1.725" },
];

const DATASETS = [
  {
    type: "KAGGLE DATASET (GAMBAR)",
    title: "Ingredients Bahan Makanan Image Gambar",
    author: "Kaggle, byrux12 · 2024",
    desc: "Dataset gambar 15 kelas bahan makanan lokal untuk pelatihan model klasifikasi pada fitur Deteksi Bahan GiziMeal.",
    url: "https://www.kaggle.com/datasets/byrux12/ingredients-bahan-makanan-image-gambar",
  },
  {
    type: "KAGGLE DATASET (GAMBAR)",
    title: "Fruits and Vegetables Image Recognition Dataset",
    author: "Kaggle, Kritik Seth · 2020",
    desc: "Dataset gambar 36 kelas buah dan sayuran (100 gambar per kelas) untuk memperkaya variasi data pelatihan model klasifikasi bahan makanan.",
    url: "https://www.kaggle.com/datasets/kritikseth/fruit-and-vegetable-image-recognition",
  },
  {
    type: "KAGGLE DATASET (GAMBAR)",
    title: "Vegetable Image Dataset",
    author: "Kaggle, M Israk Ahmed · 2021",
    desc: "Dataset 21.000 gambar dari 15 kelas sayuran (resolusi 224×224) yang dikumpulkan dari kebun dan pasar untuk klasifikasi dan pengenalan sayuran.",
    url: "https://www.kaggle.com/datasets/misrakahmed/vegetable-image-dataset",
  },
  {
    type: "KAGGLE DATASET (CSV)",
    title: "Foods Nutrition Dataset",
    author: "Kaggle, adarshzolekar · 2023",
    desc: "File CSV berisi daftar nama menu makanan beserta kandungan gizinya (energi, karbohidrat, protein, lemak, serat, kalsium). Digunakan sebagai sumber data Database Makanan dan perhitungan skor AKG.",
    url: "https://www.kaggle.com/datasets/adarshzolekar/foods-nutrition-dataset",
  },
];

function FormulaBox({ children }) {
  return (
    <div className="py-sm flex items-center min-h-[40px] my-xs">
      <div className="font-serif text-primary text-[18px] md:text-[20px] leading-relaxed select-none">
        {children}
      </div>
    </div>
  );
}

function Frac({ top, bottom }) {
  return (
    <span className="inline-flex flex-col items-center mx-2 align-middle">
      <span className="border-b border-primary px-2 text-center leading-snug">{top}</span>
      <span className="px-2 text-center leading-snug">{bottom}</span>
    </span>
  );
}

function Sigma() {
  return (
    <span className="inline-flex flex-col items-center mx-2 align-middle text-center" style={{ lineHeight: 1 }}>
      <span className="text-[11px] font-sans font-semibold leading-none">n</span>
      <span className="text-[28px] font-serif leading-none">∑</span>
      <span className="text-[11px] font-sans font-semibold leading-none">i=1</span>
    </span>
  );
}

export default function ReferensiPage() {
  return (
    <main className="flex-grow w-full max-w-4xl mx-auto px-container-margin md:px-lg py-xl md:py-xxl space-y-xl md:space-y-xxl">

      <section className="max-w-3xl space-y-md reveal">
        <h1 className="text-[28px] md:text-[36px] tracking-tight font-semibold text-primary leading-[1.05]">
          Referensi Sains & Metodologi
        </h1>
        <p className="text-[15px] md:text-[16px] leading-relaxed text-muted-foreground">
          GiziMeal didasarkan pada pedoman Kemenkes RI, standar nutrisi nasional, dan literatur publikasi ilmiah internasional untuk memastikan setiap informasi gizi dan rekomendasi diet akurat serta terpercaya.
        </p>
      </section>

      <section className="space-y-lg reveal reveal-delay-100">
        <h2 className="text-[20px] md:text-[24px] tracking-tight font-semibold text-primary flex items-center gap-sm border-b border-border/50 pb-sm">
          <span className="material-symbols-outlined text-[28px] text-secondary">gavel</span>
          Peraturan Menteri Kesehatan RI
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          {[
            {
              title: "Permenkes No. 28 Tahun 2019",
              desc: "Menjadi basis perhitungan kebutuhan energi, protein, lemak, karbohidrat, dan mikronutrien lainnya.",
              url: "https://peraturan.go.id/id/permenkes-no-28-tahun-2019",
            },
            {
              title: "Permenkes No. 41 Tahun 2014",
              desc: "Menjadi acuan dalam penyusunan rekomendasi menu porsi makan dan jenis makanan di platform GiziMeal.",
              url: "https://peraturan.go.id/id/permenkes-no-41-tahun-2014",
            },
          ].map((item) => (
            <a key={item.title} href={item.url} target="_blank" rel="noopener noreferrer" className="bg-card p-md rounded-xl border border-border hover:border-secondary transition-colors cursor-pointer group no-underline block shadow-sm">
              <div className="flex justify-between items-start mb-sm">
                <h3 className="text-[16px] font-semibold text-primary group-hover:text-secondary transition-colors leading-snug">{item.title}</h3>
                <span className="material-symbols-outlined text-muted-foreground group-hover:text-secondary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-[20px] flex-shrink-0 ml-sm">arrow_outward</span>
              </div>
              <p className="text-[14px] leading-relaxed text-muted-foreground">{item.desc}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="space-y-lg reveal reveal-delay-200">
        <h2 className="text-[20px] md:text-[24px] tracking-tight font-semibold text-primary flex items-center gap-sm border-b border-border/50 pb-sm">
          <span className="material-symbols-outlined text-[28px] text-secondary">public</span>
          Publikasi Ilmiah Internasional
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
          {[
            { title: "WHO Healthy Diet (2020)", desc: "Panduan diet sehat dari World Health Organization untuk pencegahan malnutrisi.", url: "https://www.who.int/news-room/fact-sheets/detail/healthy-diet" },
            { title: "Mifflin–St Jeor (1990)", desc: '"A new predictive equation for resting energy expenditure." — Dasar perhitungan BMR.', url: "https://pubmed.ncbi.nlm.nih.gov/2305711/" },
            { title: "FAO/WHO/UNU (2001)", desc: '"Human energy requirements." — Referensi nilai Physical Activity Level (PAL) dan TDEE.', url: "https://www.fao.org/3/a-y5686e.pdf" },
          ].map((pub) => (
            <a key={pub.title} href={pub.url} target="_blank" rel="noopener noreferrer" className="bg-card p-md rounded-xl border border-border hover:border-secondary transition-colors cursor-pointer group flex flex-col justify-between no-underline block shadow-sm">
              <div>
                <div className="flex justify-between items-start mb-sm">
                  <h3 className="text-[15px] font-semibold text-primary group-hover:text-secondary transition-colors leading-snug pr-4">{pub.title}</h3>
                  <span className="material-symbols-outlined text-muted-foreground group-hover:text-secondary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-[18px] flex-shrink-0">arrow_outward</span>
                </div>
                <p className="text-[13px] leading-relaxed text-muted-foreground">{pub.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="space-y-lg reveal">
        <h2 className="text-[20px] md:text-[24px] tracking-tight font-semibold text-primary flex items-center gap-sm border-b border-border/50 pb-sm">
          <span className="material-symbols-outlined text-[28px] text-secondary">dataset</span>
          Dataset Pelatihan Model
        </h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground max-w-3xl">
          Sumber data gambar dan nutrisi yang digunakan untuk melatih model klasifikasi dan menyusun database makanan GiziMeal.
        </p>
        
        <div className="flex flex-col mt-md">
          {DATASETS.map((ds, idx) => (
            <a key={idx} href={ds.url} target="_blank" rel="noopener noreferrer" className={`pb-md mb-md group no-underline block ${idx !== DATASETS.length - 1 ? "border-b border-border/50" : ""}`}>
              <div className="flex justify-between items-start mb-xs">
                <span className="text-[11px] font-semibold text-secondary uppercase tracking-[0.22em]">{ds.type}</span>
                <span className="material-symbols-outlined text-muted-foreground group-hover:text-secondary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-[20px] flex-shrink-0 ml-sm">arrow_outward</span>
              </div>
              <h3 className="text-[16px] font-semibold text-foreground group-hover:text-secondary transition-colors mb-xs">{ds.title}</h3>
              <p className="text-[14px] leading-relaxed text-muted-foreground max-w-3xl">{ds.desc}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="reveal reveal-delay-100">
        <h2 className="text-[20px] md:text-[24px] tracking-tight font-semibold text-primary flex items-center gap-sm border-b border-border/50 pb-sm mb-xl">
          <span className="material-symbols-outlined text-[28px] text-primary">calculate</span>
          Rumus & Perhitungan
        </h2>

        <div className="flex flex-col space-y-xxl">
          <div className="flex flex-col gap-sm">
            <div>
              <h3 className="text-[18px] font-semibold text-primary">BMR (Basal Metabolic Rate)</h3>
              <p className="text-[14px] text-muted-foreground mt-xs">Mifflin-St Jeor Equation (1990)</p>
            </div>
            <p className="text-[15px] leading-relaxed text-muted-foreground max-w-3xl">
              <strong className="text-foreground font-semibold">BMR</strong> adalah jumlah kalori minimum yang dibutuhkan tubuh untuk menjalankan fungsi dasar seperti bernapas, sirkulasi darah, dan regulasi suhu saat istirahat penuh.
            </p>
            
            <div className="space-y-md mt-md ml-md border-l-2 border-border/50 pl-lg">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-secondary block">Pria</span>
                <FormulaBox>
                  <span className="flex flex-wrap items-center gap-1 text-left tabular-nums">
                    <span>BMR = (10 × <i>W</i>) + (6.25 × <i>H</i>) − (5 × <i>A</i>) + 5</span>
                  </span>
                </FormulaBox>
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-secondary block">Wanita</span>
                <FormulaBox>
                  <span className="flex flex-wrap items-center gap-1 text-left tabular-nums">
                    <span>BMR = (10 × <i>W</i>) + (6.25 × <i>H</i>) − (5 × <i>A</i>) − 161</span>
                  </span>
                </FormulaBox>
              </div>
            </div>
            <p className="text-[13px] text-muted-foreground mt-sm">
              Dimana: <i>W</i> = berat badan (kg), <i>H</i> = tinggi badan (cm), <i>A</i> = usia (tahun)
            </p>
          </div>

          <div className="flex flex-col gap-sm">
            <h3 className="text-[18px] font-semibold text-primary">TDEE (Total Daily Energy Expenditure)</h3>
            <div className="ml-md border-l-2 border-border/50 pl-lg my-sm">
              <FormulaBox>
                <span className="flex items-center gap-2 tabular-nums">
                  <span>TDEE = BMR × PAL</span>
                </span>
              </FormulaBox>
            </div>
            <p className="text-[15px] leading-relaxed text-muted-foreground max-w-3xl mb-md">
              <strong className="text-foreground font-semibold">PAL (Physical Activity Level)</strong> adalah faktor pengali yang mencerminkan tingkat aktivitas fisik harian seseorang. Semakin tinggi aktivitas, semakin besar kebutuhan energi total per hari.
            </p>
            
            <div className="overflow-x-auto mt-sm border border-border rounded-lg bg-card">
              <table className="w-full text-left border-collapse max-w-3xl">
                <thead>
                  <tr className="border-b border-border bg-surface">
                    <th className="py-sm px-md text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Aktivitas</th>
                    <th className="py-sm px-md text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground text-right whitespace-nowrap">Nilai PAL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {PAL_TABLE.map((row) => (
                    <tr key={row.pal} className="hover:bg-surface-alt/50 transition-colors">
                      <td className="py-md px-md text-[14px] text-foreground">
                        {row.aktivitas.split(" (")[0]}
                        <span className="text-muted-foreground inline md:block text-[12px] md:mt-xs ml-2 md:ml-0">({row.aktivitas.split(" (")[1]}</span>
                      </td>
                      <td className="py-md px-md text-secondary text-[16px] text-right font-semibold tabular-nums">{row.pal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col gap-sm">
            <h3 className="text-[18px] font-semibold text-primary">Target Kalori Harian</h3>
            <ul className="space-y-md list-disc pl-lg text-[15px] leading-relaxed text-muted-foreground mt-sm max-w-3xl">
              <li>
                <strong className="text-foreground font-semibold">Weight Loss (Penurunan Berat Badan):</strong> <br className="block md:hidden"/> 
                <span className="font-mono bg-surface px-2 py-0.5 rounded-md text-[13px] md:ml-2 border border-border tabular-nums">TDEE − 500 kcal</span>
              </li>
              <li>
                <strong className="text-foreground font-semibold">Maintenance (Pemeliharaan):</strong> <br className="block md:hidden"/> 
                <span className="font-mono bg-surface px-2 py-0.5 rounded-md text-[13px] md:ml-2 border border-border tabular-nums">= TDEE</span>
              </li>
              <li>
                <strong className="text-foreground font-semibold">Weight Gain (Penaikan Berat Badan):</strong> <br className="block md:hidden"/> 
                <span className="font-mono bg-surface px-2 py-0.5 rounded-md text-[13px] md:ml-2 border border-border tabular-nums">TDEE + 500 kcal</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-sm">
            <div>
              <h3 className="text-[18px] font-semibold mb-xs text-primary">Skor AKG Menu</h3>
              <p className="text-[15px] leading-relaxed text-muted-foreground max-w-3xl">
                Skor kesesuaian menu terhadap Angka Kecukupan Gizi per porsi (0–100). Dihitung dengan mengurangi 100 dari total deviasi tertimbang tiap zat gizi terhadap nilai ideal AKG per porsi. Semakin tinggi skor, semakin seimbang gizinya.
              </p>
            </div>

            <div className="flex flex-col gap-md mt-md ml-md border-l-2 border-border/50 pl-lg my-sm">
              <div>
                <FormulaBox>
                  <span className="flex items-center gap-1 flex-wrap text-left tabular-nums">
                    <span>Skor<sub>AKG</sub></span>
                    <span className="mx-2">=</span>
                    <span>max</span>
                    <span className="text-[28px] font-light leading-none">(</span>
                    <span>0, 100 −</span>
                    <Sigma />
                    <span>D<sub>i</sub></span>
                    <span className="text-[28px] font-light leading-none">)</span>
                  </span>
                </FormulaBox>
              </div>
              <div className="mt-sm">
                <FormulaBox>
                  <span className="flex items-center gap-2 text-left tabular-nums">
                    <span>D<sub>i</sub></span>
                    <span className="mx-2">=</span>
                    <Frac
                      top={<span>| Nilai<sub>i</sub> − AKG<sub>i</sub> |</span>}
                      bottom={<span>AKG<sub>i</sub></span>}
                    />
                    <span>× W<sub>i</sub></span>
                  </span>
                </FormulaBox>
              </div>
            </div>

            <div className="text-[14px] leading-relaxed text-muted-foreground mt-md max-w-3xl space-y-sm">
              <p>
                <strong className="text-foreground font-semibold">Keterangan:</strong><br/>
                <span className="font-mono bg-surface px-1 py-0.5 rounded text-[12px] border border-border">D_i</span> = Deviasi tertimbang untuk zat gizi <span className="italic">i</span>.<br/>
                <span className="font-mono bg-surface px-1 py-0.5 rounded text-[12px] border border-border">W_i</span> = Bobot prioritas (Energi = 20, Protein = 30, Lemak = 15, Serat = 20, Kalsium = 15).
              </p>
              <p className="text-[12px] opacity-80 pt-sm border-t border-border/50">
                * AKG per porsi dihitung dari rata-rata kebutuhan dewasa (Permenkes No. 28/2019) dibagi 3 kali makan.
              </p>
            </div>
          </div>

        </div>
      </section>

      <section className="pt-xl mt-xxl border-t border-border/50 reveal">
        <div className="text-[13px] leading-relaxed text-muted-foreground max-w-3xl">
          <strong className="text-foreground font-semibold">Catatan Sitasi: </strong>
          Daftar di atas merupakan referensi utama. Untuk publikasi akademik atau penggunaan profesional, mohon merujuk langsung ke dokumen sumber terbaru yang dikeluarkan oleh Kementerian Kesehatan RI atau instansi berwenang.
        </div>
      </section>
    </main>
  );
}