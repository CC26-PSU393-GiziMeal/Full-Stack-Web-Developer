/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react"; // Tambahkan useRef di sini

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

function usePexelsImage(query) {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!query) {
      setImageLoading(false);
      setImageError(true);
      return;
    }

    async function fetchImage() {
      setImageLoading(true);
      setImageError(false);
      try {
        const res = await fetch(
          `${API_BASE}/api/pexels/image?query=${encodeURIComponent(query)}`
        );
        if (!res.ok) throw new Error(`Backend error: ${res.status}`);
        const json = await res.json();
        if (json.success && json.data?.imageUrl) {
          setImageUrl(json.data.imageUrl);
        } else {
          setImageError(true);
        }
      } catch (err) {
        console.error("Fetch image error:", err);
        setImageError(true);
      } finally {
        setImageLoading(false);
      }
    }

    fetchImage();
  }, [query]);

  return { imageUrl, imageLoading, imageError };
}

function ImageSkeleton() {
  return (
    <div className="w-full h-full bg-border animate-pulse rounded-lg flex items-center justify-center">
      <span className="material-symbols-outlined text-muted-foreground text-[48px]">image</span>
    </div>
  );
}

function ImageFallback() {
  return (
    <div className="w-full h-full bg-surface-alt rounded-lg flex flex-col items-center justify-center gap-sm text-muted-foreground">
      <span className="material-symbols-outlined text-[48px]">broken_image</span>
      <span className="text-[13px]">Gambar tidak tersedia</span>
    </div>
  );
}

const NutriBento = ({ icon, value, unit, bg, textColor, border }) => (
  <div className={`${bg} ${textColor} ${border || ""} rounded-lg p-sm flex flex-col items-center justify-center text-center gap-xs hover:scale-105 transition-transform duration-300`}>
    <span className="material-symbols-outlined text-[24px]">{icon}</span>
    <span className="text-[16px] font-semibold leading-tight tabular-nums">{value}</span>
    <span className="text-[11px] font-medium tracking-[0.05em] uppercase opacity-80">{unit}</span>
  </div>
);

export default function DetailResepPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [animated, setAnimated] = useState(false);

  const [aiRecipe, setAiRecipe] = useState(null);
  const [isGeneratingRecipe, setIsGeneratingRecipe] = useState(false);
  const [aiError, setAiError] = useState(null);

  const recipe = location.state?.recipe;

  // Membuat reference kunci pembatas render ganda React Strict Mode
  const hasSaved = useRef(false);

  useEffect(() => {
    if (!recipe) {
      navigate("/deteksi/hasil", { replace: true });
      return;
    }
    const timer = setTimeout(() => setAnimated(true), 100);
    const menuName = recipe.menu_name;

    // =================================================================
    // FUNGSI BARU: LANGSUNG SIMPAN KE SUPABASE BEGITU HALAMAN DIBUKA
    // =================================================================
    async function saveToHistoryDirectly() {
      // JIKA sudah pernah terkunci/tersimpan dalam siklus render ini, batalkan request kedua
      if (hasSaved.current) return;

      const userRaw = localStorage.getItem("user");
      if (!userRaw) return;

      try {
        const parsedUser = JSON.parse(userRaw);
        const userId = parsedUser.id;

        // JIKA userId tidak valid, batalkan request agar tidak memicu error 404/400
        if (!userId || userId === "null" || userId === "undefined") {
          console.warn("userId tidak valid, proses simpan dibatalkan.");
          return;
        }

        // Kunci benderanya secara instan sebelum melakukan fetch
        hasSaved.current = true;

        // Tembak endpoint POST ke backend untuk langsung catat ke Supabase
        const resHistory = await fetch(`${API_BASE}/api/recipe-history`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            menuName: menuName,
            recipeData: recipe
          }),
        });

        if (resHistory.ok) {
          console.log(`[Supabase] Riwayat untuk ${menuName} sukses tersimpan.`);
        } else {
          console.error(`[Backend Error] Status: ${resHistory.status}`);
          // Jika server gagal memproses, buka kembali kuncinya agar bisa dicoba ulang saat refresh
          hasSaved.current = false;
        }
      } catch (err) {
        console.error("Gagal menyimpan riwayat instan:", err);
        hasSaved.current = false;
      }
    }

    // Fetch AI Recipe (Tugas mengambil teks dari Gemini)
    async function fetchAiRecipe() {
      const cacheKey = `gizimeal_recipe_${menuName}`;

      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        try {
          setAiRecipe(JSON.parse(cached));
          return;
        } catch (e) {
          console.error("Cache parsing error", e);
        }
      }

      setIsGeneratingRecipe(true);
      setAiError(null);

      try {
        const response = await fetch(`${API_BASE}/api/recipe-details?menu_name=${encodeURIComponent(menuName)}`);
        const result = await response.json();

        if (response.ok && result.success && result.data) {
          setAiRecipe(result.data);
          localStorage.setItem(cacheKey, JSON.stringify(result.data));

          // Simpan riwayat cadangan ke localStorage
          try {
            const historyRaw = localStorage.getItem("recipeHistory");
            let history = historyRaw ? JSON.parse(historyRaw) : [];
            const newEntry = {
              id: Date.now(),
              menu_name: result.data.nama_masakan || menuName,
              waktu: new Date().toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
              recipeState: recipe
            };
            history = [newEntry, ...history.filter(h => h.menu_name !== newEntry.menu_name)].slice(0, 20);
            localStorage.setItem("recipeHistory", JSON.stringify(history));
          } catch (e) {
            console.error("Gagal menyimpan riwayat resep lokal", e);
          }
        } else {
          throw new Error(result.message || "Gagal mengambil resep dari AI");
        }
      } catch (err) {
        console.error("Generate recipe error:", err);
        setAiError(err.message);
      } finally {
        setIsGeneratingRecipe(false);
      }
    }

    // JALANKAN KEDUA FUNGSI SAAT HALAMAN DIBUKA
    saveToHistoryDirectly(); // <--- Ini langsung jalan instan di background
    fetchAiRecipe();         // <--- Ini berjalan sembari menunggu loading Gemini

    return () => clearTimeout(timer);
  }, [recipe, navigate]);

  const { imageUrl, imageLoading, imageError } = usePexelsImage(recipe?.menu_name);

  if (!recipe) return null;

  const nuts = recipe?.nutrients || {};

  const nutrition = {
    kalori: {
      value: recipe["Energy kcal"] ?? recipe.kalori ?? nuts["Energy kcal"] ?? "–",
      unit: "kkal",
      akg: Math.round((parseFloat(recipe["Energy kcal"] ?? recipe.kalori ?? nuts["Energy kcal"] ?? 0)) / 2000 * 100)
    },
    protein: {
      value: recipe["Protein(g)"] ?? nuts["Protein(g)"] ?? "–",
      unit: "g",
      akg: Math.round((parseFloat(recipe["Protein(g)"] ?? nuts["Protein(g)"] ?? 0)) / 60 * 100)
    },
    lemak: {
      value: recipe["Fat(g)"] ?? nuts["Fat(g)"] ?? "–",
      unit: "g",
      akg: Math.round((parseFloat(recipe["Fat(g)"] ?? nuts["Fat(g)"] ?? 0)) / 67 * 100)
    },
    karbohidrat: {
      value: recipe["Carbs"] ?? nuts["Carbs"] ?? "–",
      unit: "g",
      akg: Math.round((parseFloat(recipe["Carbs"] ?? nuts["Carbs"] ?? 0)) / 300 * 100)
    },
    serat: {
      value: recipe["Fibre(g)"] ?? nuts["Fibre(g)"] ?? "–",
      unit: "g",
      akg: Math.round((parseFloat(recipe["Fibre(g)"] ?? nuts["Fibre(g)"] ?? 0)) / 30 * 100)
    },
    kalsium: {
      value: recipe["Calcium(mg)"] ?? nuts["Calcium(mg)"] ?? "–",
      unit: "mg",
      akg: Math.round((parseFloat(recipe["Calcium(mg)"] ?? nuts["Calcium(mg)"] ?? 0)) / 1000 * 100)
    },
  };

  return (
    <main className="flex-grow max-w-7xl mx-auto w-full px-container-margin md:px-lg py-lg md:py-xxl flex flex-col gap-xl">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-xs text-muted-foreground hover:text-primary transition-colors text-[13px] font-medium w-fit group active:scale-95 transition-transform"
      >
        <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
        Kembali ke Hasil
      </button>

      <section className="flex flex-col md:flex-row gap-xl bg-card rounded-xl border border-border p-md md:p-lg shadow-sm reveal">
        <div className="w-full md:w-[45%] lg:w-1/2 aspect-square md:aspect-[4/3] rounded-lg overflow-hidden bg-surface relative shrink-0 border border-border">
          {imageLoading ? (
            <ImageSkeleton />
          ) : imageError || !imageUrl ? (
            <ImageFallback />
          ) : (
            <img
              src={imageUrl}
              alt={recipe.menu_name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          )}
        </div>

        <div className="w-full md:w-[55%] lg:w-1/2 flex flex-col justify-center gap-lg reveal-right">
          <div>
            <h1 className="text-[28px] md:text-[36px] tracking-tight text-foreground mb-sm font-semibold leading-[1.05]">
              {recipe.menu_name}
            </h1>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              {recipe.explanation || "Rekomendasi menu sehat kaya nutrisi harian."}
            </p>
          </div>

          <div className="bg-surface-alt p-md rounded-lg border border-border">
            <div className="flex justify-between items-end mb-sm">
              <span className="text-[13px] font-medium text-muted-foreground">Kecocokan AKG Harian</span>
              <span className="text-[28px] tracking-tight text-primary font-semibold tabular-nums leading-none">
                {recipe.score_akg ?? "–"}%
              </span>
            </div>
            <div className="h-2 w-full bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                style={{ width: animated ? `${recipe.score_akg ?? 0}%` : "0%" }}
              />
            </div>
            <p className="text-[11px] text-muted-foreground mt-xs text-right">Berdasarkan profil GiziMeal Anda</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-sm">
            <NutriBento icon="local_fire_department" value={nutrition.kalori.value} unit={nutrition.kalori.unit} bg="bg-primary/10" textColor="text-primary" />
            <NutriBento icon="egg_alt" value={`${nutrition.protein.value}${nutrition.protein.unit}`} unit="Protein" bg="bg-secondary/10" textColor="text-secondary" />
            <NutriBento icon="water_drop" value={`${nutrition.lemak.value}${nutrition.lemak.unit}`} unit="Lemak" bg="bg-card" textColor="text-foreground" border="border border-border" />
            <NutriBento icon="grain" value={`${nutrition.karbohidrat.value}${nutrition.karbohidrat.unit}`} unit="Karbo" bg="bg-card" textColor="text-foreground" border="border border-border" />
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
        <div className="lg:col-span-2 flex flex-col gap-xl">
          {/* Bahan-bahan */}
          {isGeneratingRecipe ? (
            <section className="bg-card rounded-xl border border-border p-lg reveal">
              <h2 className="text-[16px] text-foreground flex items-center gap-sm mb-md pb-sm border-b border-border font-semibold tracking-tight">
                <span className="material-symbols-outlined text-primary">assignment</span> BAHAN-BAHAN
              </h2>
              <div className="animate-pulse space-y-sm">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex gap-md py-sm">
                    <div className="w-5 h-5 rounded-full bg-neutral-200 dark:bg-neutral-700 flex-shrink-0" />
                    <div className="h-5 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4" />
                  </div>
                ))}
              </div>
            </section>
          ) : aiRecipe?.bahan_bahan && aiRecipe.bahan_bahan.length > 0 ? (
            <section className="bg-card rounded-xl border border-border p-lg reveal">
              <h2 className="text-[16px] text-foreground flex items-center gap-sm mb-md pb-sm border-b border-border font-semibold tracking-tight">
                <span className="material-symbols-outlined text-primary">assignment</span> BAHAN-BAHAN
              </h2>
              <ul className="space-y-sm text-[15px] leading-relaxed text-foreground">
                {aiRecipe.bahan_bahan.map((b, i) => (
                  <li key={i} className="flex items-start gap-md py-sm border-b border-border/50 last:border-0 hover:bg-surface-alt/50 transition-colors">
                    <span className="material-symbols-outlined text-muted-foreground text-[18px] mt-[2px] flex-shrink-0">check_circle</span>
                    <div className="flex-grow flex justify-between gap-md">
                      <span>{b.nama ?? b}</span>
                      {b.jumlah && <span className="text-[14px] text-muted-foreground whitespace-nowrap tabular-nums">{b.jumlah}</span>}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* Steps */}
          {isGeneratingRecipe ? (
            <section className="bg-card rounded-xl border border-border p-lg reveal reveal-delay-100">
              <h2 className="text-[16px] text-foreground flex items-center gap-sm mb-md pb-sm border-b border-border font-semibold tracking-tight">
                <span className="material-symbols-outlined text-primary">cooking</span> CARA MEMASAK
              </h2>
              <div className="animate-pulse space-y-md">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex gap-md bg-surface-alt/50 p-md rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex-shrink-0" />
                    <div className="flex flex-col gap-2 flex-grow pt-1">
                      <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-full" />
                      <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-5/6" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : aiRecipe?.cara_memasak && aiRecipe.cara_memasak.length > 0 ? (
            <section className="bg-card rounded-xl border border-border p-lg reveal reveal-delay-100">
              <h2 className="text-[16px] text-foreground flex items-center gap-sm mb-md pb-sm border-b border-border font-semibold tracking-tight">
                <span className="material-symbols-outlined text-primary">cooking</span> CARA MEMASAK
              </h2>
              <div className="space-y-md">
                {aiRecipe.cara_memasak.map((step, i) => (
                  <div key={i} className="flex gap-md bg-surface-alt p-md rounded-lg border border-border hover:border-primary/30 transition-all duration-300">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary text-[14px] font-semibold flex items-center justify-center tabular-nums">
                      {i + 1}
                    </div>
                    <p className="text-[15px] leading-relaxed text-foreground pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {/* Catatan Gizi */}
          {!isGeneratingRecipe && aiRecipe?.catatan_gizi && (
            <section className="bg-primary/10 rounded-xl border border-primary/20 p-lg reveal">
              <h2 className="text-[16px] text-primary flex items-center gap-sm mb-sm font-semibold tracking-tight">
                <span className="material-symbols-outlined">lightbulb</span> CATATAN GIZI
              </h2>
              <p className="text-[14px] text-foreground leading-relaxed">
                {aiRecipe.catatan_gizi}
              </p>
            </section>
          )}

          {/* Fallback / Error */}
          {!isGeneratingRecipe && (!aiRecipe?.bahan_bahan || aiRecipe.bahan_bahan.length === 0) && (!aiRecipe?.cara_memasak || aiRecipe.cara_memasak.length === 0) && (
            <section className="bg-card rounded-xl border border-border p-lg reveal">
              <div className="text-center py-xl text-muted-foreground flex flex-col items-center gap-sm">
                <span className="material-symbols-outlined text-[32px]">{aiError ? "error" : "info"}</span>
                <p className="text-[14px]">{aiError ? `Gagal memuat resep: ${aiError}` : "Detail bahan dan cara memasak belum tersedia untuk menu ini."}</p>
              </div>
            </section>
          )}
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
              {Object.entries(nutrition).map(([key, n]) => (
                <div key={key}>
                  <div className="flex justify-between items-end mb-xs">
                    <span className="text-[13px] font-medium text-foreground capitalize">{key}</span>
                    <div className="text-right tabular-nums">
                      <span className="text-[13px] text-foreground font-semibold">{n.value} {n.unit}</span>
                      <span className="text-[11px] text-muted-foreground ml-2">{n.akg}% AKG</span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                      style={{ width: animated ? `${Math.min(n.akg, 100)}%` : "0%" }}
                    />
                  </div>
                </div>
              ))}

              <div className="mt-lg pt-md border-t border-border">
                <div className="bg-surface-alt p-sm rounded-lg border border-border">
                  <p className="text-[12px] text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">{recipe.menu_name}</span> menempati posisi{" "}
                    {recipe.rank === 1 ? "teratas" : `ke-${recipe.rank}`} dengan Skor AKG {recipe.score_akg}/100.
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