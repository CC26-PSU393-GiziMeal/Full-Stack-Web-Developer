/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 10;

const SORT_OPTIONS = [
  { key: "default", label: "Default", icon: null },
  { key: "kalori_asc", label: "Kalori", icon: "arrow_upward" },
  { key: "kalori_desc", label: "Kalori", icon: "arrow_downward" },
  { key: "protein_desc", label: "Protein tinggi", icon: null },
  { key: "serat_desc", label: "Serat tinggi", icon: null },
];

function sortData(data, sortKey) {
  const d = [...data];
  switch (sortKey) {
    case "kalori_asc": return d.sort((a, b) => a["Energy kcal"] - b["Energy kcal"]);
    case "kalori_desc": return d.sort((a, b) => b["Energy kcal"] - a["Energy kcal"]);
    case "protein_desc": return d.sort((a, b) => b["Protein(g)"] - a["Protein(g)"]);
    case "serat_desc": return d.sort((a, b) => b["Fibre(g)"] - a["Fibre(g)"]);
    default: return d.sort((a, b) => a.id - b.id);
  }
}

function buildPages(total, current) {
  const pages = [];
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
    return pages;
  }
  pages.push(1);
  if (current > 3) pages.push("...");
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
  if (current < total - 2) pages.push("...");
  pages.push(total);
  return pages;
}

export default function DatabaseGiziPage() {
  const navigate = useNavigate();
  const isLogged = !!localStorage.getItem('authToken');

  const [foodsData, setFoodsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("default");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!isLogged) return;

    const fetchFoods = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://cc26-psu393-gizimeal-api.hf.space/foods");

        if (!response.ok) {
          throw new Error("Gagal mengambil dataset dari server gizi.");
        }

        const jsonResult = await response.json();

        const rawRows = jsonResult.data || (Array.isArray(jsonResult) ? jsonResult : []);

        const formattedData = rawRows.map((item, index) => {
          const namaMakanan = item["Food Items"] || item.food_items || "Tidak Diketahui";
          const searchKey = item.SearchKey || (typeof namaMakanan === 'string' ? namaMakanan.toLowerCase().replace(/\s+/g, '') : "");

          return {
            id: item.id || index + 1,
            SearchKey: searchKey,
            "Food Items": namaMakanan,
            "Energy kcal": parseFloat(item["Energy kcal"] || 0),
            Carbs: parseFloat(item.Carbs || item.carbohydrates || 0),
            "Protein(g)": parseFloat(item["Protein(g)"] || 0),
            "Fat(g)": parseFloat(item["Fat(g)"] || 0),
            "Fibre(g)": parseFloat(item["Fibre(g)"] || 0),
            "Calcium(mg)": parseFloat(item["Calcium(mg)"] || 0),
            score_akg: parseFloat(item.score_akg || 0),
          };
        });

        setFoodsData(formattedData);
        setErrorMessage("");
      } catch (err) {
        console.error("Database Gizi Error:", err);
        setErrorMessage(err.message);
      } {
        setIsLoading(false);
      }
    };

    fetchFoods();
  }, [isLogged]);

  if (!isLogged) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen p-8">
        <h2 className="text-[28px] md:text-[36px] font-semibold tracking-tight text-primary mb-4">Akses Terbatas</h2>
        <p className="mb-6 text-center text-muted-foreground leading-relaxed max-w-md">
          Untuk melihat Data makanan, silakan masuk terlebih dahulu.
        </p>
        <button
          className="bg-primary/10 text-primary font-semibold px-md py-sm rounded-lg hover:bg-primary/20 transition-colors"
          onClick={() => navigate('/auth/login')}
        >
          Masuk
        </button>
      </main>
    );
  }

  const filtered = useMemo(() => {
    let d = foodsData;
    if (search.trim()) {
      const q = search.toLowerCase();
      d = d.filter((r) => r["Food Items"].toLowerCase().includes(q) || r.SearchKey.toLowerCase().includes(q));
    }
    return sortData(d, sortKey);
  }, [foodsData, search, sortKey]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pageData = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);
  const pageButtons = buildPages(totalPages, safePage);

  function goPage(p) {
    if (typeof p === "number") setPage(p);
  }

  function handleSearch(e) {
    setSearch(e.target.value);
    setPage(1);
  }

  function handleSort(key) {
    setSortKey(key);
    setPage(1);
  }

  const numFmt = (n) =>
    Number.isInteger(n) ? n : parseFloat(n).toFixed(2);

  return (
    <main className="max-w-[1200px] mx-auto px-container-margin py-xxl">

      {/* ── Header Section ── */}
      <section className="text-center max-w-2xl mx-auto mb-xl reveal">
        <div className="text-left">
          <button
            onClick={() => navigate('/deteksi')}
            className="inline-flex items-center gap-xs text-[14px] text-primary font-medium hover:opacity-80 transition-colors mb-md group"
          >
            <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            Kembali ke Deteksi
          </button>
        </div>

        <h1 className="text-[28px] md:text-[36px] tracking-tight font-semibold text-primary mb-md leading-[1.05]">
          Data Makanan & Resep
        </h1>
        <p className="text-[15px] leading-relaxed text-muted-foreground mb-lg">
          Pencarian informasi nutrisi terintegrasi real-time diverifikasi menggunakan acuan AKG dan Pedoman Gizi Seimbang Kemenkes RI.
        </p>
        <div className="relative w-full max-w-2xl mx-auto shadow-sm rounded-2xl group">
          <span className="material-symbols-outlined absolute left-lg top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-primary transition-colors">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            disabled={isLoading}
            className="w-full bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-black:text-grey placeholder:text-neutral-500 text-[16px] rounded-2xl py-md pl-[52px] pr-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all disabled:opacity-50"
            placeholder={isLoading ? "Menghubungkan ke server gizi..." : "Cari resep atau bahan makanan..."}
          />
        </div>
      </section>

      {/* ── Table Section ── */}
      <section className="mb-xxl w-full overflow-x-auto border border-border rounded-2xl bg-card shadow-sm reveal reveal-delay-100">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-lg border-b border-border bg-card gap-md">
          <div className="flex items-center gap-sm text-[14px] font-medium text-muted-foreground bg-surface-alt px-md py-sm rounded-lg">
            <span className="material-symbols-outlined text-[20px]">list</span>
            Menampilkan <span className="font-semibold text-primary">{isLoading ? "..." : filtered.length}</span> item
          </div>
          <div className="flex flex-wrap items-center gap-sm">
            <span className="text-[12px] font-medium tracking-wide text-muted-foreground flex items-center gap-xs">
              <span className="material-symbols-outlined text-[18px]">swap_vert</span> Urutkan:
            </span>
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                disabled={isLoading}
                onClick={() => handleSort(opt.key)}
                className={`border border-border rounded-full px-md py-sm text-[12px] font-medium tracking-wide transition-colors flex items-center gap-xs disabled:opacity-50
                  ${sortKey === opt.key
                    ? "text-foreground bg-surface-alt"
                    : "text-muted-foreground hover:bg-surface"
                  }`}
              >
                {opt.label}
                {opt.icon && <span className="material-symbols-outlined text-[16px]">{opt.icon}</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full table-auto text-left border-collapse">
            <thead className="bg-surface-alt text-[13px] font-semibold text-foreground border-b border-border">
              <tr>
                <th className="px-md py-sm w-16">No</th>
                <th className="px-md py-sm">Food Items</th>
                <th className="px-md py-sm text-right">Energi (kcal)</th>
                <th className="px-md py-sm text-right">Karbohidrat (g)</th>
                <th className="px-md py-sm text-right">Protein (g)</th>
                <th className="px-md py-sm text-right">Lemak (g)</th>
                <th className="px-md py-sm text-right">Serat (g)</th>
                <th className="px-md py-sm text-right">Kalsium (mg)</th>
                <th className="px-md py-sm text-right">AKG</th>
              </tr>
            </thead>
            <tbody className="text-[14px] text-foreground divide-y divide-border/50">
              {isLoading ? (
                <tr>
                  <td colSpan={9} className="px-md py-xl text-center text-muted-foreground">
                    <span className="material-symbols-outlined text-[24px] animate-spin mb-1 block">progress_activity</span>
                    Sinkronisasi basis data nutrisi cloud...
                  </td>
                </tr>
              ) : errorMessage ? (
                <tr>
                  <td colSpan={9} className="px-md py-xl text-center text-destructive font-medium">
                    <span className="material-symbols-outlined text-[24px] mb-1 block">cloud_off</span>
                    Gagal memuat data: {errorMessage}
                  </td>
                </tr>
              ) : pageData.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-md py-sm text-center text-muted-foreground">
                    Tidak ada data yang sesuai.
                  </td>
                </tr>
              ) : (
                pageData.map((row, i) => (
                  <tr key={row.id} className="hover:bg-surface-alt/50 transition-colors">
                    <td className="px-md py-sm text-muted-foreground tabular-nums">
                      {(safePage - 1) * ITEMS_PER_PAGE + i + 1}
                    </td>
                    <td className="px-md py-sm font-semibold text-foreground">{row["Food Items"]}</td>
                    <td className="px-md py-sm font-semibold text-primary text-right tabular-nums">{numFmt(row["Energy kcal"])}</td>
                    <td className="px-md py-sm text-right tabular-nums">{numFmt(row.Carbs)}</td>
                    <td className="px-md py-sm text-right tabular-nums">{numFmt(row["Protein(g)"])}</td>
                    <td className="px-md py-sm text-right tabular-nums">{numFmt(row["Fat(g)"])}</td>
                    <td className="px-md py-sm text-right tabular-nums">{numFmt(row["Fibre(g)"])}</td>
                    <td className="px-md py-sm text-right tabular-nums">{numFmt(row["Calcium(mg)"])}</td>
                    <td className="px-md py-sm text-right tabular-nums text-primary font-semibold">{numFmt(row.score_akg)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Panel Navigasi Halaman */}
        <div className="flex flex-col sm:flex-row justify-between items-center p-lg bg-card border-t border-border gap-md">
          <div className="text-[14px] font-medium text-muted-foreground">
            Halaman <span className="font-semibold text-foreground">{safePage}</span> dari {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => goPage(safePage - 1)}
              disabled={safePage === 1 || isLoading}
              className="flex items-center justify-center w-10 h-10 border border-border rounded-xl text-muted-foreground hover:bg-surface transition-colors disabled:opacity-50 material-symbols-outlined"
            >
              chevron_left
            </button>
            {pageButtons.map((p, idx) =>
              p === "..." ? (
                <span key={`ellipsis-${idx}`} className="flex items-center justify-center w-10 h-10 text-muted-foreground tabular-nums">
                  ...
                </span>
              ) : (
                <button
                  key={p}
                  disabled={isLoading}
                  onClick={() => goPage(p)}
                  className={`flex items-center justify-center w-10 h-10 rounded-xl text-[14px] font-medium shadow-sm transition-colors tabular-nums
                    ${p === safePage
                      ? "bg-primary text-primary-foreground"
                      : "border border-border text-muted-foreground hover:bg-surface"
                    }`}
                >
                  {p}
                </button>
              )
            )}
            <button
              onClick={() => goPage(safePage + 1)}
              disabled={safePage === totalPages || isLoading}
              className="flex items-center justify-center w-10 h-10 border border-border rounded-xl text-muted-foreground hover:bg-surface transition-colors disabled:opacity-50 material-symbols-outlined"
            >
              chevron_right
            </button>
          </div>
        </div>
      </section>

      <div className="flex items-center gap-sm p-md bg-surface-alt rounded-xl text-[12px] font-medium tracking-wide text-muted-foreground mt-lg border border-border/50 reveal">
        <span className="material-symbols-outlined text-[20px] text-primary">info</span>
        Informasi bersifat edukatif dan bukan pengganti konsultasi tenaga kesehatan. Lihat{" "}
        <Link className="underline font-semibold hover:text-primary transition-colors ml-1" to="/referensi">
          sumber referensi
        </Link>.
      </div>
    </main>
  );
}