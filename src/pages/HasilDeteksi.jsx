import { Link, useNavigate, useLocation } from "react-router-dom";

// Mock data — nanti diganti response dari BE
const MOCK_RESULT = {
  success: true,
  mode: "multiple",
  predictions: [
    {
      detected_item: "Cabbage",
      confidence_percent: "90.04%",
      filename: "brokoli.jpg"
    },
    {
      detected_item: "Chilli",
      confidence_percent: "77.85%",
      filename: "daging sapi.jpg"
    }
  ],
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

export default function HasilDeteksiPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state?.result || MOCK_RESULT;

  const isSingle = result.predictions?.length === 1;
  const singlePred = isSingle ? result.predictions[0] : null;

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

      {isSingle ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-center border-b border-outline-variant pb-xl reveal">
          <div className="lg:col-span-8 flex flex-col gap-sm">
            <span className="text-label-sm text-on-surface-variant tracking-wider uppercase font-semibold">Hasil Deteksi</span>
            <h1 className="text-[32px] md:text-[40px] leading-[48px] tracking-tight font-extrabold text-on-surface">
              Bahan terdeteksi: {singlePred.detected_item}
            </h1>
            <p className="text-[16px] text-on-surface-variant max-w-2xl mt-1 leading-relaxed">
              Pilih salah satu rekomendasi menu di bawah untuk melihat resep, cara memasak, dan informasi gizinya.
            </p>
          </div>
          <div className="lg:col-span-4">
            <div className="flex items-center gap-md bg-surface-container-lowest border border-outline-variant rounded-2xl p-md shadow-sm">
              <div className="relative w-20 h-20 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="34"
                    className="stroke-surface-container"
                    strokeWidth="6"
                    fill="transparent"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="34"
                    className="stroke-primary-container dark:stroke-primary"
                    strokeWidth="6"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 34}
                    strokeDashoffset={2 * Math.PI * 34 * (1 - parseFloat(singlePred.confidence_percent) / 100)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[16px] font-bold text-on-surface">{singlePred.confidence_percent}</span>
                  <span className="text-[8px] text-on-surface-variant font-semibold tracking-wider uppercase">Akurasi</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-on-surface-variant font-semibold uppercase tracking-wider">Bahan Terdeteksi</span>
                <span className="text-[18px] font-extrabold text-on-surface leading-tight mt-0.5">{singlePred.detected_item}</span>
                <span className="text-label-sm text-on-surface-variant flex items-center gap-xs mt-1">
                  <span className="material-symbols-outlined text-[16px]">image</span>
                  {singlePred.filename}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-lg border-b border-outline-variant pb-xl reveal">
          {/* Left side info */}
          <div className="flex flex-col gap-sm">
            <span className="text-label-sm text-on-surface-variant tracking-wider uppercase font-semibold">Hasil Deteksi</span>
            <h1 className="text-[32px] md:text-[40px] leading-[48px] tracking-tight font-extrabold text-on-surface">
              {result.predictions.length} bahan berhasil dikenali
            </h1>
            <p className="text-[16px] text-on-surface-variant max-w-3xl mt-1">
              Dari {result.predictions.length} gambar yang diunggah, berikut bahan yang terdeteksi beserta tingkat akurasinya.
            </p>
          </div>

          {/* Prediction Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md mt-sm">
            {result.predictions.map((pred, i) => (
              <div
                key={i}
                className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-md flex items-center justify-between shadow-sm hover:shadow transition-shadow"
              >
                <div className="flex items-center gap-md">
                  {/* Index badge */}
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center font-bold text-on-surface">
                    {i + 1}
                  </div>
                  {/* Info */}
                  <div className="flex flex-col">
                    <span className="text-title-md text-on-surface font-extrabold leading-snug">{pred.detected_item}</span>
                    <span className="text-label-sm text-on-surface-variant font-medium mt-0.5">{pred.filename}</span>
                  </div>
                </div>
                {/* Accuracy percentage */}
                <div className="text-title-md text-brand-green font-bold mr-sm">
                  {pred.confidence_percent}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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