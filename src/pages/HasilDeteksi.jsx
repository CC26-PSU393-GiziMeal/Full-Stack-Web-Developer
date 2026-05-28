import { Link, useNavigate, useLocation } from "react-router-dom";

const MOCK_RESULT = {
  success: true,
  mode: "multiple",
  predictions: [
    { detected_item: "Cabbage", confidence_percent: "90.04%", filename: "brokoli.jpg" },
    { detected_item: "Chilli",  confidence_percent: "77.85%", filename: "daging sapi.jpg" },
  ],
  menu_recommendations: [
    {
      rank: 1, is_best: true,
      menu_name: "Carrot Apple Sandwich",
      matched_ingredients: 1,
      score_akg: 41.16,
      explanation: "Menu terbaik berdasarkan skor AKG tertinggi dari bahan yang terdeteksi.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBY9aQq5fxrcpIrq1DZ999kqafcc2uEBeCsLIbfEfdiAvbdy0AcKWqGWj6h0tv0TJdEr5Au1XHdssYnGWgEvXUdj96RfJzgGagcApp4AfuYmmiF-K5z9uDyQSJpRkKxZOhTerEzrOBglkVZvsX34rmd0bbZ46mAJgAZ3pi5HGcCUAInGyEjBNJbEAbfFTiJzHkhbIMu2fducvQSBt7rCISCFHUmkUCiP7JNqiSOxOrBJRl2g8G7ZEyWExdzzI9LHKiQ6_VWKsz3qRQ",
      kalori: 245.5,
    },
    {
      rank: 2, is_best: false,
      menu_name: "Vegetable & Mayo Sandwich",
      matched_ingredients: 1,
      score_akg: 26.63,
      explanation: "Perpaduan sayuran segar dengan saus mayones yang lezat.",
      image: "https://lh3.googleusercontent.com/aida/ADBb0uhHuqVQFzPM-SuY6-fBGMX_nPyK3lRTQljxt4uc3NnF9JVMu3Wae0pdRBpxllu2-qp95lY85qi1AHT8h5J_nsrqMsDe5yMcLDjjZErzcZsQyu6nn-5dtPr_PWI8iM4KiYIkF3h14ogP7rofDy9lgmD1AP6QcC6AvJVNuz-lU7TXNbPAhusyCWrk17xbAJpnV83YGFDlIUaQ41j92omqZbuKcOT2BMrPqL1_MmbXmQr3rvwd8aLLd1OmySE",
      kalori: 185.2,
    },
  ],
};

export default function HasilDeteksiPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state?.result || MOCK_RESULT;
  const isSingle = result.predictions?.length === 1;
  const singlePred = isSingle ? result.predictions[0] : null;

  return (
    <main className="flex-grow w-full max-w-5xl mx-auto px-container-margin md:px-lg py-lg flex flex-col gap-lg">

      {/* Back */}
      <Link
        to="/deteksi"
        className="inline-flex items-center gap-xs text-muted-foreground text-[13px] hover:text-primary group w-fit transition-colors"
      >
        <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
        Kembali ke unggah
      </Link>

      {/* Hasil Deteksi */}
      {isSingle ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-md items-center border-b border-border pb-md">
          <div className="lg:col-span-8 flex flex-col gap-xs">
            <span className="text-[11px] text-muted-foreground tracking-[0.22em] uppercase font-semibold">Hasil Deteksi</span>
            <h1 className="text-[24px] sm:text-[32px] md:text-[40px] font-semibold text-foreground tracking-tight leading-[1.05]">
              Bahan terdeteksi: <span className="text-primary">{singlePred.detected_item}</span>
            </h1>
          </div>
          <div className="lg:col-span-4">
            <div className="flex items-center gap-md bg-card border border-border rounded-xl p-md">
              <div className="relative w-16 h-16 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="32" cy="32" r="26" className="stroke-surface-alt" strokeWidth="5" fill="transparent" />
                  <circle cx="32" cy="32" r="26" className="stroke-primary" strokeWidth="5" fill="transparent"
                    strokeDasharray={2 * Math.PI * 26}
                    strokeDashoffset={2 * Math.PI * 26 * (1 - parseFloat(singlePred.confidence_percent) / 100)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[13px] font-semibold text-foreground tabular-nums">{singlePred.confidence_percent}</span>
                </div>
              </div>
              <div>
                <span className="text-[11px] text-muted-foreground font-semibold uppercase tracking-[0.22em] block mb-1">Bahan</span>
                <span className="text-[16px] font-semibold text-foreground leading-tight block">{singlePred.detected_item}</span>
                <span className="text-[12px] text-muted-foreground block mt-0.5">{singlePred.filename}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-md border-b border-border pb-md">
          <div className="flex flex-col gap-xs">
            <span className="text-[11px] text-muted-foreground tracking-[0.22em] uppercase font-semibold">Hasil Deteksi</span>
            <h1 className="text-[24px] sm:text-[32px] md:text-[40px] font-semibold text-foreground tracking-tight leading-[1.05]">
              <span className="text-primary">{result.predictions.length} bahan berhasil dikenali</span> 
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
            {result.predictions.map((pred, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-sm flex items-center justify-between">
                <div className="flex items-center gap-sm">
                  <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center font-semibold text-foreground text-[13px] tabular-nums">{i + 1}</div>
                  <div>
                    <span className="text-[15px] font-semibold text-foreground block leading-none">{pred.detected_item}</span>
                    <span className="text-[12px] text-muted-foreground mt-1 block">{pred.filename}</span>
                  </div>
                </div>
                <span className="text-[14px] text-secondary font-semibold tabular-nums">{pred.confidence_percent}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rekomendasi Menu */}
      <section className="flex flex-col gap-md">
        <div className="flex items-center gap-xs border-b border-border pb-sm">
          <span className="material-symbols-outlined text-[22px] text-primary">restaurant</span>
          <h2 className="text-[20px] font-semibold tracking-tight text-primary">Rekomendasi Menu</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
          {result.menu_recommendations.map((recipe, index) => (
            <div
              key={recipe.rank}
              onClick={() => navigate(`/deteksi/resep/${recipe.rank}`)}
              className={`bg-card border border-border rounded-xl overflow-hidden flex flex-col group cursor-pointer hover-lift reveal reveal-delay-${index * 100}`}
            >
              <div className="relative h-44 w-full overflow-hidden bg-surface">
                <img
                  alt={recipe.menu_name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={recipe.image}
                />
                {recipe.is_best && (
                  <div className="absolute top-sm left-sm bg-primary text-primary-foreground text-[11px] font-medium tracking-wide px-sm py-xs rounded-full flex items-center gap-xs shadow">
                    <span className="material-symbols-outlined text-[14px]">star</span>
                    Rekomendasi
                  </div>
                )}
              </div>
              <div className="p-md flex flex-col flex-grow gap-sm">
                <h3 className="text-[16px] font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors leading-snug">
                  {recipe.menu_name}
                </h3>
                <p className="text-[13px] text-muted-foreground line-clamp-2 leading-relaxed">{recipe.explanation}</p>
                <div className="bg-surface p-sm rounded-lg flex flex-col gap-xs mt-auto border border-border/50">
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] text-muted-foreground font-medium">Skor AKG</span>
                    <span className="text-[14px] text-primary font-semibold tabular-nums">{recipe.score_akg}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] text-muted-foreground font-medium">Kalori</span>
                    <span className="text-[13px] text-foreground font-medium tabular-nums">{recipe.kalori} kkal</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-1.5 overflow-hidden mt-1">
                    <div className={`h-full rounded-full ${recipe.is_best ? "bg-primary" : "bg-primary"}`} style={{ width: `${recipe.score_akg}%` }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}