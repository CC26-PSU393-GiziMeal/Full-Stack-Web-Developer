import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// Mock data — nanti diganti fetch dari BE berdasarkan params.id
const MOCK_RECIPES = {
  1: {
    id: 1,
    title: "Carrot apple sandwich",
    description: "Carrot apple sandwich menempati posisi teratas dengan Skor AKG 41.16/100, tertinggi di antara menu yang cocok dengan bahan terdeteksi. Meskipun skornya belum optimal, menu ini tetap menjadi opsi terbaik yang tersedia berdasarkan perhitungan kesesuaian gizi.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBY9aQq5fxrcpIrq1DZ999kqafcc2uEBeCsLIbfEfdiAvbdy0AcKWqGWj6h0tv0TJdEr5Au1XHdssYnGWgEvXUdj96RfJzgGagcApp4AfuYmmiF-K5z9uDyQSJpRkKxZOhTerEzrOBglkVZvsX34rmd0bbZ46mAJgAZ3pi5HGcCUAInGyEjBNJbEAbfFTiJzHkhbIMu2fducvQSBt7rCISCFHUmkUCiP7JNqiSOxOrBJRl2g8G7ZEyWExdzzI9LHKiQ6_VWKsz3qRQ",
    akg: 41.16,
    nutrition: {
      kalori: { value: "245.50", unit: "kkal", akg: 12, color: "bg-primary", textColor: "text-primary" },
      protein: { value: "6.20", unit: "g", akg: 10, color: "bg-secondary", textColor: "text-secondary" },
      lemak: { value: "8.40", unit: "g", akg: 12, color: "bg-surface-tint", textColor: "text-surface-tint" },
      karbohidrat: { value: "35.80", unit: "g", akg: 11, color: "bg-primary", textColor: "text-primary" },
      serat: { value: "4.50", unit: "g", akg: 15, color: "bg-primary", textColor: "text-primary" },
      kalsium: { value: "42.00", unit: "mg", akg: 4, color: "bg-primary", textColor: "text-primary" },
    },
    bahan: [
      { nama: "Roti gandum utuh", jumlah: "2 lembar" },
      { nama: "Wortel parut halus", jumlah: "50 gram" },
      { nama: "Apel merah, iris tipis", jumlah: "30 gram" },
      { nama: "Yoghurt plain rendah lemak", jumlah: "2 sdm" },
      { nama: "Madu murni", jumlah: "1 sdt" },
    ],
    steps: [
      "Siapkan dua lembar roti gandum utuh.",
      "Campurkan wortel parut dengan yoghurt plain dan madu murni dalam wadah kecil hingga merata.",
      "Oleskan campuran wortel di atas satu lembar roti gandum.",
      "Susun irisan tipis apel merah di atas olesan wortel.",
      "Tutup dengan lembaran roti gandum lainnya. Potong secara diagonal dan sajikan segera."
    ],
  },
  2: {
    id: 2,
    title: "Vegetable and mayonnaise sandwich",
    description: "Vegetable and mayonnaise sandwich menempati posisi kedua dengan Skor AKG 26.63/100, menyajikan perpaduan sayuran segar dengan saus mayones yang lezat.",
    image: "https://lh3.googleusercontent.com/aida/ADBb0uhHuqVQFzPM-SuY6-fBGMX_nPyK3lRTQljxt4uc3NnF9JVMu3Wae0pdRBpxllu2-qp95lY85qi1AHT8h5J_nsrqMsDe5yMcLDjjZErzcZsQyu6nn-5dtPr_PWI8iM4KiYIkF3h14ogP7rofDy9lgmD1AP6QcC6AvJVNuz-lU7TXNbPAhusyCWrk17xbAJpnV83YGFDlIUaQ41j92omqZbuKcOT2BMrPqL1_MmbXmQr3rvwd8aLLd1OmySE",
    akg: 26.63,
    nutrition: {
      kalori: { value: "185.20", unit: "kkal", akg: 9, color: "bg-primary", textColor: "text-primary" },
      protein: { value: "4.50", unit: "g", akg: 7, color: "bg-secondary", textColor: "text-secondary" },
      lemak: { value: "11.20", unit: "g", akg: 16, color: "bg-surface-tint", textColor: "text-surface-tint" },
      karbohidrat: { value: "18.50", unit: "g", akg: 6, color: "bg-primary", textColor: "text-primary" },
      serat: { value: "2.10", unit: "g", akg: 7, color: "bg-primary", textColor: "text-primary" },
      kalsium: { value: "22.50", unit: "mg", akg: 2, color: "bg-primary", textColor: "text-primary" },
    },
    bahan: [
      { nama: "Roti tawar putih / gandum", jumlah: "2 lembar" },
      { nama: "Kubis iris halus", jumlah: "20 gram" },
      { nama: "Wortel serut halus", jumlah: "15 gram" },
      { nama: "Mayones rendah lemak", jumlah: "1.5 sdm" },
      { nama: "Lada hitam bubuk", jumlah: "secukupnya" },
    ],
    steps: [
      "Siapkan roti tawar.",
      "Campurkan kubis iris, wortel serut, mayones, dan lada hitam bubuk ke dalam mangkok.",
      "Oleskan campuran sayur mayones tersebut ke salah satu permukaan roti.",
      "Tutup dengan roti tawar lainnya dan sajikan."
    ],
  }
};

const NutriBento = ({ icon, value, unit, bg, textColor, border }) => (
  <div className={`${bg} ${textColor} ${border || ""} rounded-lg p-sm flex flex-col items-center justify-center text-center gap-xs hover:scale-105 transition-transform duration-300`}>
    <span className="material-symbols-outlined text-[24px]">{icon}</span>
    <span className="text-[18px] font-bold leading-tight">{value}</span>
    <span className="text-label-sm">{unit}</span>
  </div>
);

export default function DetailResepPage() {
  const { id } = useParams();
  const recipe = MOCK_RECIPES[id] || MOCK_RECIPES[1];
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex-grow max-w-7xl mx-auto w-full px-container-margin md:px-lg py-lg md:py-xxl flex flex-col gap-xl">

      {/* Back */}
      <Link
        to="/deteksi/hasil"
        className="inline-flex items-center gap-xs text-on-surface-variant hover:text-primary transition-colors text-label-md font-semibold w-fit group active:scale-95 transition-transform"
      >
        <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">
          arrow_back
        </span>
        Kembali ke Hasil
      </Link>

      {/* Hero: Image + Summary */}
      <section className="flex flex-col md:flex-row gap-xl bg-surface-container-lowest rounded-xl border border-surface-variant p-md md:p-lg shadow-[0_4px_24px_rgba(1,45,29,0.04)] reveal">
        {/* Image */}
        <div className="w-full md:w-[45%] lg:w-1/2 aspect-square md:aspect-[4/3] rounded-lg overflow-hidden bg-surface-container relative shrink-0">
          <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
        </div>

        {/* Right side */}
        <div className="w-full md:w-[55%] lg:w-1/2 flex flex-col justify-center gap-lg reveal-right">
          <div>
            <h1 className="text-headline-lg-mobile md:text-headline-lg text-on-surface mb-sm font-bold">{recipe.title}</h1>
            <p className="text-body-md text-on-surface-variant">{recipe.description}</p>
          </div>

          {/* AKG Bar */}
          <div className="bg-surface p-md rounded-lg border border-surface-variant">
            <div className="flex justify-between items-end mb-sm">
              <span className="text-label-md text-on-surface-variant">Kecocokan AKG Harian</span>
              <span className="text-headline-lg text-primary font-bold">{recipe.akg}%</span>
            </div>
            <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                style={{ width: animated ? `${recipe.akg}%` : "0%" }}
              />
            </div>
            <p className="text-label-sm text-on-surface-variant mt-xs text-right">
              Berdasarkan profil GiziMeal Anda
            </p>
          </div>

          {/* Nutrition Bento */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-sm">
            <NutriBento icon="local_fire_department" value={recipe.nutrition.kalori.value} unit={recipe.nutrition.kalori.unit} bg="bg-primary-container" textColor="text-on-primary-container" />
            <NutriBento icon="egg_alt" value={recipe.nutrition.protein.value + recipe.nutrition.protein.unit} unit="Protein" bg="bg-secondary-container" textColor="text-on-secondary-container" />
            <NutriBento icon="water_drop" value={recipe.nutrition.lemak.value + recipe.nutrition.lemak.unit} unit="Lemak" bg="bg-surface-container" textColor="text-on-surface" border="border border-surface-variant" />
            <NutriBento icon="grain" value={recipe.nutrition.karbohidrat.value + recipe.nutrition.karbohidrat.unit} unit="Karbo" bg="bg-surface-container" textColor="text-on-surface" border="border border-surface-variant" />
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
        {/* Left: Bahan + Cara Memasak */}
        <div className="lg:col-span-2 flex flex-col gap-xl">

          {/* Bahan */}
          <section className="bg-surface-container-lowest rounded-xl border border-surface-variant p-lg reveal">
            <h2 className="text-title-md text-on-surface flex items-center gap-sm mb-md pb-sm border-b border-surface-variant font-bold">
              <span className="material-symbols-outlined">assignment</span> BAHAN-BAHAN
            </h2>
            <ul className="space-y-sm text-body-md text-on-surface">
              {recipe.bahan.map((b) => (
                <li key={b.nama} className="flex items-start gap-md py-sm border-b border-surface-container-high last:border-0 hover:bg-surface-container-lowest/40 transition-colors">
                  <span className="material-symbols-outlined text-on-surface-variant text-[20px] mt-[2px] flex-shrink-0">check_circle</span>
                  <div className="flex-grow flex justify-between gap-md">
                    <span>{b.nama}</span>
                    <span className="text-label-md text-on-surface-variant whitespace-nowrap">{b.jumlah}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Cara Memasak */}
          <section className="bg-surface-container-lowest rounded-xl border border-surface-variant p-lg reveal reveal-delay-100">
            <h2 className="text-title-md text-on-surface flex items-center gap-sm mb-md pb-sm border-b border-surface-variant font-bold">
              <span className="material-symbols-outlined">cooking</span> CARA MEMASAK
            </h2>
            <div className="space-y-md">
              {recipe.steps.map((step, i) => (
                <div key={i} className="flex gap-md bg-surface-container-low p-md rounded-lg border border-surface-variant hover:border-primary/30 transition-all duration-300">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-on-primary text-label-md font-bold flex items-center justify-center">
                    {i + 1}
                  </div>
                  <p className="text-body-md text-on-surface pt-1">{step}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right: Nutrition Table */}
        <div className="lg:col-span-1">
          <section className="bg-surface-container-lowest rounded-xl border border-surface-variant p-lg sticky top-[100px] reveal-right">
            <h2 className="text-title-md text-on-surface flex items-center gap-sm mb-md pb-sm border-b border-surface-variant font-bold">
              <span className="material-symbols-outlined">analytics</span> INFORMASI GIZI PER PORSI
            </h2>
            <p className="text-label-sm text-on-surface-variant mb-md">
              Persentase dihitung berdasarkan standar AKG Kemenkes 2019 (Diet 2000 kkal).
            </p>
            <div className="space-y-md">
              {Object.entries(recipe.nutrition).map(([key, n]) => (
                <div key={key}>
                  <div className="flex justify-between items-end mb-xs">
                    <span className="text-label-md text-on-surface capitalize">{key}</span>
                    <div className="text-right">
                      <span className="text-label-md text-on-surface font-bold">
                        {n.value} {n.unit}
                      </span>
                      <span className="text-label-sm text-on-surface-variant ml-2">{n.akg}% AKG</span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <div className={`h-full ${n.color} rounded-full transition-all duration-1000 ease-out`} style={{ width: animated ? `${n.akg}%` : "0%" }} />
                  </div>
                </div>
              ))}

              {/* Note */}
              <div className="mt-lg pt-md border-t border-surface-variant">
                <div className="bg-surface-container-low p-sm rounded-lg border border-surface-variant">
                  <p className="text-label-sm text-on-surface leading-relaxed">
                    {recipe.title} menempati posisi teratas dengan Skor AKG {recipe.akg}/100.
                    Penilaian ini mengacu pada Permenkes RI No. 28 Tahun 2019 tentang Angka Kecukupan Gizi.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}