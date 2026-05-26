import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";


// ── Mock data — nanti diganti fetch dari Supabase/CSV ──────────────
const MOCK_DATA = [
  { id: 1, SearchKey: "butternaan", "Food Items": "Butternaan", "Energy kcal": 300, Carbs: 50, "Protein(g)": 7, "Fat(g)": 10, "Fibre(g)": 2, "Calcium(mg)": 50, score_akg: 40.35 },
  { id: 2, SearchKey: "cupcake", "Food Items": "Cupcake", "Energy kcal": 200, Carbs: 30, "Protein(g)": 2, "Fat(g)": 8, "Fibre(g)": 0.5, "Calcium(mg)": 20, score_akg: 22.45 },
  { id: 3, SearchKey: "donuts", "Food Items": "Donuts", "Energy kcal": 250, Carbs: 30, "Protein(g)": 3, "Fat(g)": 12, "Fibre(g)": 1, "Calcium(mg)": 20, score_akg: 18.90 },
  { id: 4, SearchKey: "garlicbread", "Food Items": "Garlic Bread", "Energy kcal": 200, Carbs: 25, "Protein(g)": 4, "Fat(g)": 10, "Fibre(g)": 1, "Calcium(mg)": 30, score_akg: 25.10 },
  { id: 5, SearchKey: "grilledcheesesandwich", "Food Items": "Grilled Cheese Sandwich", "Energy kcal": 400, Carbs: 30, "Protein(g)": 12, "Fat(g)": 25, "Fibre(g)": 2, "Calcium(mg)": 200, score_akg: 35.80 },
  { id: 6, SearchKey: "icecream", "Food Items": "Ice Cream", "Energy kcal": 207, Carbs: 24, "Protein(g)": 3.5, "Fat(g)": 11, "Fibre(g)": 0.5, "Calcium(mg)": 100, score_akg: 15.30 },
  { id: 7, SearchKey: "onionrings", "Food Items": "Onion Rings", "Energy kcal": 275, Carbs: 31, "Protein(g)": 3, "Fat(g)": 15, "Fibre(g)": 2, "Calcium(mg)": 30, score_akg: 12.40 },
  { id: 8, SearchKey: "strawberryshortcake", "Food Items": "Strawberry Shortcake", "Energy kcal": 250, Carbs: 35, "Protein(g)": 3, "Fat(g)": 12, "Fibre(g)": 1, "Calcium(mg)": 50, score_akg: 16.75 },
  { id: 9, SearchKey: "waffles", "Food Items": "Waffles", "Energy kcal": 220, Carbs: 20, "Protein(g)": 13, "Fat(g)": 11, "Fibre(g)": 3, "Calcium(mg)": 100, score_akg: 32.20 },
  { id: 10, SearchKey: "hottea", "Food Items": "Hot tea", "Energy kcal": 16.14, Carbs: 2.58, "Protein(g)": 0.39, "Fat(g)": 0.53, "Fibre(g)": 0, "Calcium(mg)": 14.2, score_akg: 5.10 },
  { id: 11, SearchKey: "ayambakar", "Food Items": "Ayam Bakar", "Energy kcal": 298, Carbs: 5, "Protein(g)": 32, "Fat(g)": 16, "Fibre(g)": 0, "Calcium(mg)": 18, score_akg: 45.50 },
  { id: 12, SearchKey: "tempegoreng", "Food Items": "Tempe Goreng", "Energy kcal": 190, Carbs: 10, "Protein(g)": 14, "Fat(g)": 11, "Fibre(g)": 3.5, "Calcium(mg)": 111, score_akg: 38.60 },
  { id: 13, SearchKey: "sayurbayam", "Food Items": "Sayur Bayam", "Energy kcal": 36, Carbs: 3.6, "Protein(g)": 3.5, "Fat(g)": 0.4, "Fibre(g)": 2.2, "Calcium(mg)": 99, score_akg: 52.10 },
  { id: 14, SearchKey: "nasiputih", "Food Items": "Nasi Putih", "Energy kcal": 175, Carbs: 38, "Protein(g)": 3.2, "Fat(g)": 0.4, "Fibre(g)": 0.6, "Calcium(mg)": 10, score_akg: 21.00 },
  { id: 15, SearchKey: "telurrebus", "Food Items": "Telur Rebus", "Energy kcal": 155, Carbs: 1.1, "Protein(g)": 13, "Fat(g)": 11, "Fibre(g)": 0, "Calcium(mg)": 50, score_akg: 42.00 },
  { id: 16, SearchKey: "tahugoreng", "Food Items": "Tahu Goreng", "Energy kcal": 150, Carbs: 4, "Protein(g)": 10, "Fat(g)": 11, "Fibre(g)": 0.3, "Calcium(mg)": 204, score_akg: 34.00 },
  { id: 17, SearchKey: "ikansalmonbakar", "Food Items": "Ikan Salmon Bakar", "Energy kcal": 208, Carbs: 0, "Protein(g)": 20, "Fat(g)": 13, "Fibre(g)": 0, "Calcium(mg)": 13, score_akg: 48.00 },
  { id: 18, SearchKey: "brokolikukus", "Food Items": "Brokoli Kukus", "Energy kcal": 55, Carbs: 11, "Protein(g)": 3.7, "Fat(g)": 0.6, "Fibre(g)": 5.1, "Calcium(mg)": 47, score_akg: 56.40 },
  { id: 19, SearchKey: "dagingsapirendang", "Food Items": "Daging Sapi Rendang", "Energy kcal": 468, Carbs: 7, "Protein(g)": 35, "Fat(g)": 34, "Fibre(g)": 1, "Calcium(mg)": 30, score_akg: 39.50 },
  { id: 20, SearchKey: "supwortel", "Food Items": "Sup Wortel", "Energy kcal": 90, Carbs: 14, "Protein(g)": 3, "Fat(g)": 2.5, "Fibre(g)": 3, "Calcium(mg)": 40, score_akg: 44.00 },
];

const ITEMS_PER_PAGE = 10;

// ── Sort helpers ───────────────────────────────────────────────────
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

// ── Pagination helper ──────────────────────────────────────────────
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

// ── Main Page ──────────────────────────────────────────────────────
export default function DatabaseGiziPage() {
  const navigate = useNavigate();
  const isLogged = !!localStorage.getItem('authToken');

  // If not logged, show lock screen
  if (!isLogged) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen p-8">
        <h2 className="text-2xl font-bold text-primary mb-4">Akses Terbatas</h2>
        <p className="mb-6 text-center text-on-surface-variant max-w-md">
          Untuk melihat database gizi, silakan masuk terlebih dahulu.
        </p>
        <button
          className="bg-primary-container text-on-primary-container font-semibold px-md py-sm rounded-lg hover:bg-surface-tint hover:text-on-primary transition-colors"
          onClick={() => navigate('/auth/login')}
        >
          Masuk
        </button>
      </main>
    );
  }

  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("default");
  const [page, setPage] = useState(1);

  // Filter + sort + paginate
  const filtered = useMemo(() => {
    let d = MOCK_DATA;
    if (search.trim()) {
      const q = search.toLowerCase();
      d = d.filter((r) => r["Food Items"].toLowerCase().includes(q) || r.SearchKey.toLowerCase().includes(q));
    }
    return sortData(d, sortKey);
  }, [search, sortKey]);

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
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary mb-md">
          Database Gizi &amp; Resep Sehat
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mb-lg">
          Pencarian informasi nutrisi dengan dataset awal dari Kaggle yang diverifikasi ulang menggunakan acuan AKG dan Pedoman Gizi Seimbang Kemenkes RI.
        </p>
        {/* Search Bar */}
        <div className="relative w-full max-w-2xl mx-auto shadow-sm rounded-2xl group">
          <span className="material-symbols-outlined absolute left-lg top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">search</span>
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface font-body-lg text-body-lg rounded-2xl py-md pl-[52px] pr-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            placeholder="Cari resep atau bahan makanan..."
          />
        </div>
      </section>

      {/* ── Table Section ── */}
      <section className="mb-xxl w-full overflow-x-auto border border-outline-variant rounded-2xl bg-surface-container-lowest shadow-sm reveal reveal-delay-100">

        {/* Header toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-lg border-b border-outline-variant bg-surface-container-lowest gap-md">
          <div className="flex items-center gap-sm font-label-md text-label-md text-on-surface-variant bg-surface-container-low px-md py-sm rounded-lg">
            <span className="material-symbols-outlined text-[20px]">list</span>
            Menampilkan <span className="font-bold text-primary">{filtered.length}</span> item
          </div>
          <div className="flex flex-wrap items-center gap-sm">
            <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-xs">
              <span className="material-symbols-outlined text-[18px]">swap_vert</span> Urutkan:
            </span>
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                onClick={() => handleSort(opt.key)}
                className={`border border-outline-variant rounded-full px-md py-sm font-label-sm text-label-sm transition-colors flex items-center gap-xs
                  ${sortKey === opt.key
                    ? "text-on-surface bg-surface-variant font-medium"
                    : "text-on-surface-variant hover:bg-surface-container"
                  }`}
              >
                {opt.label}
                {opt.icon && <span className="material-symbols-outlined text-[16px]">{opt.icon}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Table layout */}
          <div className="w-full overflow-x-auto">
            <table className="w-full table-auto text-left border-collapse">
              <thead className="bg-surface-container-low font-label-md text-label-md text-on-surface border-b border-outline-variant">
              <tr>
                <th className="px-lg py-md font-bold w-16">No</th>
                <th className="px-lg py-md font-bold">Food Items</th>
                <th className="px-lg py-md font-bold text-right">Energi (kcal)</th>
                <th className="px-lg py-md font-bold text-right">Karbohidrat (g)</th>
                <th className="px-lg py-md font-bold text-right">Protein (g)</th>
                <th className="px-lg py-md font-bold text-right">Lemak (g)</th>
                <th className="px-lg py-md font-bold text-right">Serat (g)</th>
                <th className="px-lg py-md font-bold text-right">Kalsium (mg)</th>
              </tr>
            </thead>
            <tbody className="font-body-md text-body-md text-on-surface divide-y divide-outline-variant/50">
              {pageData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-lg py-md text-center text-on-surface-variant">
                    Tidak ada data yang sesuai.
                  </td>
                </tr>
              ) : (
                pageData.map((row, i) => (
                  <tr key={row.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-lg py-md text-on-surface-variant">
                      {(safePage - 1) * ITEMS_PER_PAGE + i + 1}
                    </td>
                    <td className="px-lg py-md font-bold text-on-surface">{row["Food Items"]}</td>
                    <td className="px-lg py-md font-bold text-primary text-right">{numFmt(row["Energy kcal"])}</td>
                    <td className="px-lg py-md text-right font-numeric-data">{numFmt(row.Carbs)}</td>
                    <td className="px-lg py-md text-right font-numeric-data">{numFmt(row["Protein(g)"])}</td>
                    <td className="px-lg py-md text-right font-numeric-data">{numFmt(row["Fat(g)"])}</td>
                    <td className="px-lg py-md text-right font-numeric-data">{numFmt(row["Fibre(g)"])}</td>
                    <td className="px-lg py-md text-right font-numeric-data">{numFmt(row["Calcium(mg)"])}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center p-lg bg-surface-container-lowest border-t border-outline-variant gap-md">
          <div className="font-label-md text-label-md text-on-surface-variant">
            Halaman <span className="font-bold text-on-surface">{safePage}</span> dari {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => goPage(safePage - 1)}
              disabled={safePage === 1}
              className="flex items-center justify-center w-10 h-10 border border-outline-variant rounded-xl text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-50 material-symbols-outlined"
            >
              chevron_left
            </button>
            {pageButtons.map((p, idx) =>
              p === "..." ? (
                <span key={`ellipsis-${idx}`} className="flex items-center justify-center w-10 h-10 text-on-surface-variant">
                  ...
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => goPage(p)}
                  className={`flex items-center justify-center w-10 h-10 rounded-xl font-label-md shadow-sm transition-colors
                    ${p === safePage
                      ? "bg-primary text-on-primary"
                      : "border border-outline-variant text-on-surface-variant hover:bg-surface-container"
                    }`}
                >
                  {p}
                </button>
              )
            )}
            <button
              onClick={() => goPage(safePage + 1)}
              disabled={safePage === totalPages}
              className="flex items-center justify-center w-10 h-10 border border-outline-variant rounded-xl text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-50 material-symbols-outlined"
            >
              chevron_right
            </button>
          </div>
        </div>
      </section>

      {/* Info Warning */}
      <div className="flex items-center gap-sm p-md bg-surface-container-low rounded-xl font-label-sm text-label-sm text-on-surface-variant mt-lg border border-outline-variant/50 reveal reveal-delay-300">
        <span className="material-symbols-outlined text-[20px] text-primary">info</span>
        Informasi bersifat edukatif dan bukan pengganti konsultasi tenaga kesehatan. Lihat{" "}
        <Link className="underline font-medium hover:text-primary transition-colors ml-1" to="/referensi">
          sumber referensi
        </Link>.
      </div>

    </main>
  );
}
