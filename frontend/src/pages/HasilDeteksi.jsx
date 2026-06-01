/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

function translateIngredient(englishName) {
  if (!englishName) return "Bahan";
  const trimmed = String(englishName).trim().toLowerCase();

  // Fallback jika tidak ada di kamus, kapitalisasi huruf pertama
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

function usePexelsImage(query) {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    if (!query) {
      setImageLoading(false);
      return;
    }

    async function fetchImage() {
      setImageLoading(true);
      try {
        const res = await fetch(
          `${API_BASE}/api/pexels/image?query=${encodeURIComponent(query)}`
        );
        if (!res.ok) throw new Error(`${res.status}`);
        const json = await res.json();
        if (json.success && json.data?.imageUrl) {
          setImageUrl(json.data.imageUrl);
        }
      } catch (err) {
        console.error("Pexels error:", err);
      } finally {
        setImageLoading(false);
      }
    }

    fetchImage();
  }, [query]);

  return { imageUrl, imageLoading };
}

function RecipeCard({ recipe, index, onClick }) {
  const { imageUrl, imageLoading } = usePexelsImage(recipe.menu_name);

  return (
    <div
      onClick={onClick}
      className="bg-card border border-border rounded-xl overflow-hidden flex flex-col group cursor-pointer hover-lift shadow-sm hover:shadow-md transition-all"
    >
      <div className="relative h-44 w-full overflow-hidden bg-surface">
        {imageLoading ? (
          <div className="w-full h-full bg-border animate-pulse" />
        ) : imageUrl ? (
          <img
            alt={recipe.menu_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            src={imageUrl}
          />
        ) : (
          <div className="w-full h-full bg-surface-alt flex items-center justify-center">
            <span className="material-symbols-outlined text-muted-foreground text-[32px]">broken_image</span>
          </div>
        )}
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
        <p className="text-[13px] text-muted-foreground line-clamp-3 leading-relaxed">
          {recipe.explanation || "Rekomendasi menu sehat kaya nutrisi harian."}
        </p>

        <div className="bg-surface p-sm rounded-lg flex flex-col gap-xs mt-auto border border-border/50">
          <div className="flex justify-between items-center">
            <span className="text-[12px] text-muted-foreground font-medium">Skor AKG</span>
            <span className="text-[14px] text-primary font-semibold tabular-nums">{recipe.score_akg || "–"}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[12px] text-muted-foreground font-medium">Kalori</span>
            <span className="text-[13px] text-foreground font-medium tabular-nums">
              {recipe.kalori || recipe.nutrients?.["Energy kcal"] || "–"} kkal
            </span>
          </div>
          <div className="w-full bg-border rounded-full h-1.5 overflow-hidden mt-1">
            <div className="h-full rounded-full bg-primary" style={{ width: `${recipe.score_akg || 0}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HasilDeteksiPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const rawResult = location.state?.result;

  useEffect(() => {
    if (!rawResult) {
      navigate("/deteksi", { replace: true });
    }
  }, [rawResult, navigate]);

  const result = rawResult?.data ? rawResult.data : rawResult;

  const predictions = Array.isArray(result?.detected_ingredients)
    ? result.detected_ingredients
    : Array.isArray(result)
      ? result
      : Array.isArray(result?.prediction)
        ? result.prediction
        : Array.isArray(result?.predictions)
          ? result.predictions
          : result?.prediction
            ? [result.prediction]
            : [];

  const isSingle = predictions.length === 1;
  const singlePred = isSingle ? predictions[0] : null;
  const menuRecommendations = result?.menu_recommendations || [];

  if (!rawResult) return null;

  // Mendapatkan nilai akurasi item pertama
  const confidenceValue = predictions.length > 0
    ? parseFloat(predictions[0].confidence_percent || (predictions[0].confidence_score ? predictions[0].confidence_score * 100 : 0))
    : 0;

  // Gambar dinyatakan gagal terdeteksi hanya jika array hasil ekstraksi kosong
  const isDetectionFailed = predictions.length === 0;

  return (
    <main className="flex-grow w-full max-w-5xl mx-auto px-container-margin md:px-lg py-lg flex flex-col gap-lg">

      <Link
        to="/deteksi"
        className="inline-flex items-center gap-xs text-muted-foreground text-[13px] hover:text-primary group w-fit transition-colors"
      >
        <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
        Kembali ke unggah
      </Link>

      {/* Tampilan Kondisional jika deteksi total kosong */}
      {isDetectionFailed ? (
        <div className="bg-card border border-border rounded-xl p-xl text-center text-muted-foreground max-w-2xl mx-auto w-full shadow-sm my-md">
          <span className="material-symbols-outlined text-[48px] mb-sm text-destructive">image_not_supported</span>
          <h2 className="text-[18px] font-semibold text-foreground mb-xs">Gambar Tidak Terdeteksi</h2>
          <p className="text-[14px] text-muted-foreground leading-relaxed max-w-md mx-auto">
            Sistem tidak dapat mengidentifikasi adanya bahan makanan dari foto yang Anda unggah. Pastikan foto objek bahan makanan terlihat jelas, mendapatkan pencahayaan yang cukup, dan tidak terpotong.
          </p>
          <Link
            to="/deteksi"
            className="mt-lg inline-flex items-center gap-xs bg-primary text-primary-foreground text-[14px] font-semibold px-md py-sm rounded-xl hover:opacity-90 transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">photo_camera</span>
            Coba Ambil Foto Ulang
          </Link>
        </div>
      ) : (
        <>
          {/* Tampilan Konten Utama Hasil Deteksi */}
          {isSingle ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-md items-center border-b border-border pb-md">
              <div className="lg:col-span-8 flex flex-col gap-xs">
                <span className="text-[11px] text-muted-foreground tracking-[0.22em] uppercase font-semibold">Hasil Deteksi</span>
                <h1 className="text-[24px] sm:text-[32px] md:text-[40px] font-semibold text-foreground tracking-tight leading-[1.05]">
                  Bahan terdeteksi: <span className="text-primary">{translateIngredient(singlePred?.detected_item || singlePred?.label)}</span>
                </h1>
              </div>
              <div className="lg:col-span-4">
                <div className="flex items-center gap-md bg-card border border-border rounded-xl p-md">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="32" cy="32" r="26" className="stroke-surface-alt" strokeWidth="5" fill="transparent" />
                      <circle cx="32" cy="32" r="26" className="stroke-primary" strokeWidth="5" fill="transparent"
                        strokeDasharray={2 * Math.PI * 26}
                        strokeDashoffset={2 * Math.PI * 26 * (1 - confidenceValue / 100)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-[12px] font-semibold text-foreground tabular-nums">
                        {singlePred?.confidence_percent || `${confidenceValue.toFixed(0)}%`}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] text-muted-foreground font-semibold uppercase tracking-[0.22em] block mb-1">Bahan</span>
                    <span className="text-[16px] font-semibold text-foreground leading-tight block">
                      {translateIngredient(singlePred?.detected_item || singlePred?.label)}
                    </span>
                    <span className="text-[12px] text-muted-foreground block mt-0.5">{result.filename || "Kamera Pengguna"}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-md border-b border-border pb-md">
              <div className="flex flex-col gap-xs">
                <span className="text-[11px] text-muted-foreground tracking-[0.22em] uppercase font-semibold">Hasil Deteksi</span>
                <h1 className="text-[24px] sm:text-[32px] md:text-[40px] font-semibold text-foreground tracking-tight leading-[1.05]">
                  <span className="text-primary">{predictions.length} bahan berhasil dikenali</span>
                </h1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
                {predictions.map((namaBahanMentah, i) => {
                  const detailPrediksiGambar = result?.per_image_predictions?.[i];
                  return (
                    <div key={i} className="bg-card border border-border rounded-xl p-sm flex items-center justify-between">
                      <div className="flex items-center gap-sm">
                        <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center font-semibold text-foreground text-[13px] tabular-nums">
                          {i + 1}
                        </div>
                        <div>
                          <span className="text-[15px] font-semibold text-foreground block leading-none capitalize">
                            {translateIngredient(namaBahanMentah)}
                          </span>
                          <span className="text-[12px] text-muted-foreground mt-2 block">
                            {detailPrediksiGambar?.filename || `Gambar ${i + 1}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bagian Bawah: Rekomendasi Menu Masakan */}
          <section className="flex flex-col gap-md">
            <div className="flex items-center gap-xs border-b border-border pb-sm">
              <span className="material-symbols-outlined text-[22px] text-primary">restaurant</span>
              <h2 className="text-[20px] font-semibold tracking-tight text-primary">Rekomendasi Menu</h2>
            </div>

            {menuRecommendations.length === 0 ? (
              <p className="text-center py-xl text-muted-foreground">Tidak ada rekomendasi menu masakan yang terikat dengan bahan ini.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
                {menuRecommendations.map((recipe, index) => (
                  <RecipeCard
                    key={recipe.rank || index}
                    recipe={recipe}
                    index={index}
                    onClick={() => navigate(`/deteksi/hasil/${encodeURIComponent(recipe.menu_name)}`, { state: { recipe } })}
                  />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}