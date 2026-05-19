import { Link, useNavigate } from "react-router-dom";

// Mock data — nanti diganti response dari BE
const MOCK_RESULT = {
  success: true,
  mode: "single",
  filename: "apel.jpg",
  prediction: {
    detected_item: "Apple",
    class_id: 0,
    confidence_score: 0.9508,
    confidence_percent: "95.08%",
    predicted_kcal: 0.61
  },
  menu_recommendations: [
    {
      rank: 1,
      is_best: true,
      menu_name: "Carrot apple sandwich",
      matched_ingredients: 1,
      score_akg: 41.16,
      explanation: "Carrot apple sandwich menempati posisi teratas dengan Skor AKG 41.16/100, tertinggi di antara menu yang cocok dengan bahan terdeteksi. Meskipun skornya belum optimal, menu ini tetap menjadi opsi terbaik yang tersedia berdasarkan perhitungan kesesuaian gizi.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBY9aQq5fxrcpIrq1DZ999kqafcc2uEBeCsLIbfEfdiAvbdy0AcKWqGWj6h0tv0TJdEr5Au1XHdssYnGWgEvXUdj96RfJzgGagcApp4AfuYmmiF-K5z9uDyQSJpRkKxZOhTerEzrOBglkVZvsX34rmd0bbZ46mAJgAZ3pi5HGcCUAInGyEjBNJbEAbfFTiJzHkhbIMu2fducvQSBt7rCISCFHUmkUCiP7JNqiSOxOrBJRl2g8G7ZEyWExdzzI9LHKiQ6_VWKsz3qRQ",
      kalori: 245.5,
    },
    {
      rank: 2,
      is_best: false,
      menu_name: "Vegetable and mayonnaise sandwich",
      matched_ingredients: 1,
      score_akg: 26.63,
      explanation: "Vegetable and mayonnaise sandwich menempati posisi kedua dengan Skor AKG 26.63/100, menyajikan perpaduan sayuran segar dengan saus mayones yang lezat.",
      image: "https://lh3.googleusercontent.com/aida/ADBb0uhHuqVQFzPM-SuY6-fBGMX_nPyK3lRTQljxt4uc3NnF9JVMu3Wae0pdRBpxllu2-qp95lY85qi1AHT8h5J_nsrqMsDe5yMcLDjjZErzcZsQyu6nn-5dtPr_PWI8iM4KiYIkF3h14ogP7rofDy9lgmD1AP6QcC6AvJVNuz-lU7TXNbPAhusyCWrk17xbAJpnV83YGFDlIUaQ41j92omqZbuKcOT2BMrPqL1_MmbXmQr3rvwd8aLLd1OmySE",
      kalori: 185.2,
    },
  ],
};

const FILTERS = ["Semua", "Rendah Kalori", "Tinggi Protein", "Sesuai Target"];

export default function HasilDeteksiPage() {
  const navigate = useNavigate();
  // Nanti: const { state } = useLocation() untuk terima data dari DeteksiPage
  const result = MOCK_RESULT;
  const accuracyNum = parseFloat(result.prediction.confidence_percent);

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-container-margin md:px-lg py-xl flex flex-col gap-xxl">

      {/* Header: Success Message */}
      <div className="flex flex-col gap-sm reveal">
        <Link
          to="/deteksi"
          className="inline-flex items-center gap-xs text-primary-container text-label-md hover:underline w-fit group active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
          Kembali ke unggah
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-xl lg:items-center justify-between border-b border-outline-variant pb-xl reveal">
        {/* Left side */}
        <div className="flex flex-col gap-sm lg:w-1/2">
          <span className="text-label-sm text-on-surface-variant tracking-wider uppercase">Hasil Deteksi</span>
          <h1 className="text-headline-xl text-on-surface flex items-center gap-2 flex-wrap">
            Bahan terdeteksi: <span className="font-extrabold">{result.prediction.detected_item}</span>
          </h1>
          <p className="text-body-lg text-on-surface-variant mt-xs">
            Pilih salah satu rekomendasi menu di bawah untuk melihat resep, cara memasak, dan informasi gizinya.
          </p>
        </div>

        {/* Right side (Main Result Card) */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-lg flex flex-wrap sm:flex-nowrap items-center gap-lg shadow-sm reveal-right">
          <div className="flex flex-col items-center justify-center relative w-32 h-32 flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-surface-variant"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="text-primary-container transition-all duration-1000 ease-out"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray={`${accuracyNum}, 100`}
                strokeLinecap="round"
                strokeWidth="4"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="font-bold leading-none text-on-surface text-headline-lg">{result.prediction.confidence_percent}</span>
              <span className="text-label-sm text-[10px] text-on-surface-variant tracking-wider mt-1 uppercase">Akurasi</span>
            </div>
          </div>
          <div className="hidden sm:block w-px h-24 bg-outline-variant"></div>
          <div className="flex flex-col gap-xs">
            <span className="text-label-sm text-on-surface-variant tracking-wider uppercase">Bahan Terdeteksi</span>
            <h3 className="text-title-md text-on-surface font-extrabold">{result.prediction.detected_item}</h3>
            <p className="text-label-md text-primary-container flex items-center gap-xs">
              <span className="material-symbols-outlined text-[18px]">image</span>{result.filename}
            </p>
          </div>
        </div>
      </div>

      {/* Recipe Recommendations Section */}
      <section className="flex flex-col gap-lg mt-md reveal">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-md border-b border-outline-variant pb-md">
          <div>
            <h2 className="text-headline-lg-mobile md:text-headline-lg text-primary-container flex items-center gap-xs">
              <span className="material-symbols-outlined text-3xl">restaurant</span> Rekomendasi Menu
            </h2>
            <p className="text-body-md text-on-surface-variant mt-xs">menu gizi seimbang untuk bahan ini</p>
            <p className="text-label-sm text-on-surface-variant mt-xs italic">
              Klik salah satu menu untuk melihat resep lengkap dan informasi gizinya.
            </p>
          </div>
          {/* Filters */}
          <div className="flex items-center gap-sm overflow-x-auto pb-xs">
            {FILTERS.map((f, i) => (
              <button
                key={f}
                className={`whitespace-nowrap text-label-sm font-semibold tracking-wide px-md py-sm rounded-full border transition-all duration-300 active:scale-95 ${
                  i === 0
                    ? "bg-primary text-on-primary border-primary hover:bg-primary-container"
                    : "bg-surface-container text-on-surface-variant border-outline-variant hover:bg-surface-variant"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl pt-md">
          {result.menu_recommendations.map((recipe, index) => (
            <div
              key={recipe.rank}
              onClick={() => navigate(`/deteksi/resep/${recipe.rank}`)}
              className={`bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden flex flex-col group cursor-pointer hover-lift reveal reveal-delay-${index * 100}`}
            >
              <div className="relative h-56 w-full overflow-hidden bg-surface-variant">
                <img
                  alt={recipe.menu_name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={recipe.image}
                />
                {recipe.is_best && (
                  <div className="absolute top-md left-md bg-primary-container text-on-primary text-label-sm px-md py-xs rounded-full flex items-center gap-xs shadow-md">
                    <span className="material-symbols-outlined text-[16px]">star</span>
                    TERBAIK
                  </div>
                )}
              </div>
              <div className="p-lg flex flex-col flex-grow gap-md">
                <div>
                  <h3 className="text-headline-lg-mobile text-on-surface group-hover:text-primary-container transition-colors font-bold mb-xs">
                    {recipe.menu_name}
                  </h3>
                  <p className="text-label-sm text-on-surface-variant line-clamp-3 leading-relaxed">
                    {recipe.explanation}
                  </p>
                </div>
                <div className="bg-surface-container-low p-md rounded-xl flex flex-col gap-sm mt-auto border border-outline-variant/50">
                  <div className="flex justify-between items-center w-full">
                    <span className="text-label-md text-on-surface-variant">AKG</span>
                    <span className="text-[18px] text-primary-container font-bold">{recipe.score_akg}%</span>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <span className="text-label-md text-on-surface-variant">Kalori</span>
                    <span className="text-body-md text-on-surface">{recipe.kalori} kcal</span>
                  </div>
                  <div className="w-full bg-surface-variant rounded-full h-2 overflow-hidden mt-xs">
                    <div
                      className={`h-full rounded-full ${recipe.is_best ? "bg-primary-container" : "bg-secondary"}`}
                      style={{ width: `${recipe.score_akg}%` }}
                    ></div>
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