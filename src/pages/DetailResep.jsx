import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
const MOCK_RECIPES = {
  1: {
    id: 1,
    title: "Carrot apple sandwich",
    description: "Carrot apple sandwich menempati posisi teratas dengan Skor AKG 41.16/100, tertinggi di antara menu yang cocok dengan bahan terdeteksi. Meskipun skornya belum optimal, menu ini tetap menjadi opsi terbaik yang tersedia berdasarkan perhitungan kesesuaian gizi.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBY9aQq5fxrcpIrq1DZ999kqafcc2uEBeCsLIbfEfdiAvbdy0AcKWqGWj6h0tv0TJdEr5Au1XHdssYnGWgEvXUdj96RfJzgGagcApp4AfuYmmiF-K5z9uDyQSJpRkKxZOhTerEzrOBglkVZvsX34rmd0bbZ46mAJgAZ3pi5HGcCUAInGyEjBNJbEAbfFTiJzHkhbIMu2fducvQSBt7rCISCFHUmkUCiP7JNqiSOxOrBJRl2g8G7ZEyWExdzzI9LHKiQ6_VWKsz3qRQ",
    akg: 41.16,
    nutrition: {
      kalori: { value: "245.50", unit: "kkal", akg: 12, color: "bg-primary" },
      protein: { value: "6.20", unit: "g", akg: 10, color: "bg-primary" },
      // 👇 Ubah warna lemak di sini
      lemak: { value: "8.40", unit: "g", akg: 12, color: "bg-primary" }, 
      karbohidrat: { value: "35.80", unit: "g", akg: 11, color: "bg-primary" },
      serat: { value: "4.50", unit: "g", akg: 15, color: "bg-primary" },
      kalsium: { value: "42.00", unit: "mg", akg: 4, color: "bg-primary" },
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
      kalori: { value: "185.20", unit: "kkal", akg: 9, color: "bg-primary" },
      protein: { value: "4.50", unit: "g", akg: 7, color: "bg-primary" },
      // 👇 Dan ubah warna lemak di sini juga
      lemak: { value: "11.20", unit: "g", akg: 16, color: "bg-primary" },
      karbohidrat: { value: "18.50", unit: "g", akg: 6, color: "bg-primary" },
      serat: { value: "2.10", unit: "g", akg: 7, color: "bg-primary" },
      kalsium: { value: "22.50", unit: "mg", akg: 2, color: "bg-primary" },
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
    <span className="text-[16px] font-semibold leading-tight tabular-nums">{value}</span>
    <span className="text-[11px] font-medium tracking-[0.05em] uppercase opacity-80">{unit}</span>
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

      <Link
        to="/deteksi/hasil"
        className="inline-flex items-center gap-xs text-muted-foreground hover:text-primary transition-colors text-[13px] font-medium w-fit group active:scale-95 transition-transform"
      >
        <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">
          arrow_back
        </span>
        Kembali ke Hasil
      </Link>

      <section className="flex flex-col md:flex-row gap-xl bg-card rounded-xl border border-border p-md md:p-lg shadow-sm reveal">
        <div className="w-full md:w-[45%] lg:w-1/2 aspect-square md:aspect-[4/3] rounded-lg overflow-hidden bg-surface relative shrink-0 border border-border">
          <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
        </div>

        <div className="w-full md:w-[55%] lg:w-1/2 flex flex-col justify-center gap-lg reveal-right">
          <div>
            <h1 className="text-[28px] md:text-[36px] tracking-tight text-foreground mb-sm font-semibold leading-[1.05]">{recipe.title}</h1>
            <p className="text-[15px] leading-relaxed text-muted-foreground">{recipe.description}</p>
          </div>

          <div className="bg-surface-alt p-md rounded-lg border border-border">
            <div className="flex justify-between items-end mb-sm">
              <span className="text-[13px] font-medium text-muted-foreground">Kecocokan AKG Harian</span>
              <span className="text-[28px] tracking-tight text-primary font-semibold tabular-nums leading-none">{recipe.akg}%</span>
            </div>
            <div className="h-2 w-full bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                style={{ width: animated ? `${recipe.akg}%` : "0%" }}
              />
            </div>
            <p className="text-[11px] text-muted-foreground mt-xs text-right">
              Berdasarkan profil GiziMeal Anda
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-sm">
            <NutriBento icon="local_fire_department" value={recipe.nutrition.kalori.value} unit={recipe.nutrition.kalori.unit} bg="bg-primary/10" textColor="text-primary" />
            <NutriBento icon="egg_alt" value={recipe.nutrition.protein.value + recipe.nutrition.protein.unit} unit="Protein" bg="bg-secondary/10" textColor="text-secondary" />
            <NutriBento icon="water_drop" value={recipe.nutrition.lemak.value + recipe.nutrition.lemak.unit} unit="Lemak" bg="bg-card" textColor="text-foreground" border="border border-border" />
            <NutriBento icon="grain" value={recipe.nutrition.karbohidrat.value + recipe.nutrition.karbohidrat.unit} unit="Karbo" bg="bg-card" textColor="text-foreground" border="border border-border" />
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
        <div className="lg:col-span-2 flex flex-col gap-xl">
          <section className="bg-card rounded-xl border border-border p-lg reveal">
            <h2 className="text-[16px] text-foreground flex items-center gap-sm mb-md pb-sm border-b border-border font-semibold tracking-tight">
              <span className="material-symbols-outlined text-primary">assignment</span> BAHAN-BAHAN
            </h2>
            <ul className="space-y-sm text-[15px] leading-relaxed text-foreground">
              {recipe.bahan.map((b) => (
                <li key={b.nama} className="flex items-start gap-md py-sm border-b border-border/50 last:border-0 hover:bg-surface-alt/50 transition-colors">
                  <span className="material-symbols-outlined text-muted-foreground text-[18px] mt-[2px] flex-shrink-0">check_circle</span>
                  <div className="flex-grow flex justify-between gap-md">
                    <span>{b.nama}</span>
                    <span className="text-[14px] text-muted-foreground whitespace-nowrap tabular-nums">{b.jumlah}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-card rounded-xl border border-border p-lg reveal reveal-delay-100">
            <h2 className="text-[16px] text-foreground flex items-center gap-sm mb-md pb-sm border-b border-border font-semibold tracking-tight">
              <span className="material-symbols-outlined text-primary">cooking</span> CARA MEMASAK
            </h2>
            <div className="space-y-md">
              {recipe.steps.map((step, i) => (
                <div key={i} className="flex gap-md bg-surface-alt p-md rounded-lg border border-border hover:border-primary/30 transition-all duration-300">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary text-[14px] font-semibold flex items-center justify-center tabular-nums">
                    {i + 1}
                  </div>
                  <p className="text-[15px] leading-relaxed text-foreground pt-1">{step}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-1">
          <section className="bg-card rounded-xl border border-border p-lg sticky top-[100px] reveal-right">
            <h2 className="text-[16px] text-foreground flex items-center gap-sm mb-md pb-sm border-b border-border font-semibold tracking-tight">
              <span className="material-symbols-outlined text-secondary">analytics</span> INFO GIZI PER PORSI
            </h2>
            <p className="text-[12px] text-muted-foreground mb-md leading-relaxed">
              Persentase dihitung berdasarkan standar AKG Kemenkes 2019 (Diet 2000 kkal).
            </p>
            <div className="space-y-md">
              {Object.entries(recipe.nutrition).map(([key, n]) => (
                <div key={key}>
                  <div className="flex justify-between items-end mb-xs">
                    <span className="text-[13px] font-medium text-foreground capitalize">{key}</span>
                    <div className="text-right tabular-nums">
                      <span className="text-[13px] text-foreground font-semibold">
                        {n.value} {n.unit}
                      </span>
                      <span className="text-[11px] text-muted-foreground ml-2">{n.akg}% AKG</span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                    <div className={`h-full ${n.color} rounded-full transition-all duration-1000 ease-out`} style={{ width: animated ? `${n.akg}%` : "0%" }} />
                  </div>
                </div>
              ))}

              <div className="mt-lg pt-md border-t border-border">
                <div className="bg-surface-alt p-sm rounded-lg border border-border">
                  <p className="text-[12px] text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">{recipe.title}</span> menempati posisi teratas dengan Skor AKG {recipe.akg}/100.
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