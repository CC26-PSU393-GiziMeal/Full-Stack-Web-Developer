import { useState } from "react";

// ── Konstanta PAL ──────────────────────────────────────────────────
const ACTIVITY_LEVELS = [
  { value: "", label: "Pilih tingkat aktivitas harian Anda", disabled: true },
  { value: "1.2",   label: "Sedenter (jarang olahraga)" },
  { value: "1.375", label: "Ringan (1–3x/minggu)" },
  { value: "1.55",  label: "Moderat (3–5x/minggu)" },
  { value: "1.725", label: "Aktif (6–7x/minggu)" },
  { value: "1.9",   label: "Sangat Aktif (pekerjaan fisik berat)" },
];

const GOALS = [
  { value: "turun",  label: "Turunkan BB",    delta: -500, desc: "-500 kkal / hari" },
  { value: "tahan",  label: "Pertahankan BB", delta: 0,    desc: "0 kkal / hari" },
  { value: "naik",   label: "Naikkan BB",     delta: 500,  desc: "+500 kkal / hari" },
];

// ── Rumus Mifflin-St Jeor ──────────────────────────────────────────
function hitungBMR(gender, berat, tinggi, usia) {
  if (!gender || !berat || !tinggi || !usia) return null;
  const base = 10 * berat + 6.25 * tinggi - 5 * usia;
  return gender === "pria" ? base + 5 : base - 161;
}

function formatNum(n) {
  if (n == null) return "–";
  return n.toLocaleString("id-ID", { maximumFractionDigits: 0 });
}

// ── Komponen Hasil Card ────────────────────────────────────────────
function ResultCard({ label, value, unit, variant = "default", sub }) {
  if (variant === "primary") {
    return (
      <div className="bg-primary text-on-primary rounded-lg p-lg shadow-sm">
        <div className="flex justify-between items-start mb-sm">
          <div className="text-[14px] font-semibold opacity-90">{label}</div>
          <span className="material-symbols-outlined opacity-70">local_fire_department</span>
        </div>
        <div className="flex items-end gap-sm">
          <span className="text-[32px] leading-10 font-bold">{value}</span>
          <span className="text-[16px] opacity-90 pb-1">{unit}</span>
        </div>
        {sub && <p className="text-[12px] mt-sm opacity-80">{sub}</p>}
      </div>
    );
  }
  if (variant === "secondary") {
    return (
      <div className="bg-surface-container-low border border-secondary/30 rounded-lg p-md">
        <div className="text-[12px] font-medium tracking-wide text-on-surface-variant mb-xs">{label}</div>
        <div className="flex items-end gap-xs">
          <span className="text-[20px] font-bold text-secondary">{value}</span>
          <span className="text-[12px] text-on-surface-variant pb-[2px]">{unit}</span>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-surface-container-low border border-outline-variant/50 rounded-lg p-md">
      <div className="text-[12px] font-medium tracking-wide text-on-surface-variant mb-xs">{label}</div>
      <div className="flex items-end gap-xs">
        <span className="text-[20px] font-bold text-on-surface">{value}</span>
        <span className="text-[12px] text-on-surface-variant pb-[2px]">{unit}</span>
      </div>
      {sub && <p className="text-[12px] mt-xs text-on-surface-variant/70">{sub}</p>}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────
export default function KalkulatorPage() {
  const [form, setForm] = useState({
    gender: "",
    usia: "",
    berat: "",
    tinggi: "",
    aktivitas: "",
    tujuan: "tahan",
  });
  const [hasil, setHasil] = useState(null);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function hitung() {
    const bmr = hitungBMR(
      form.gender,
      parseFloat(form.berat),
      parseFloat(form.tinggi),
      parseFloat(form.usia)
    );
    if (!bmr) return;

    const pal = parseFloat(form.aktivitas) || 1.55;
    const tdee = bmr * pal;
    const goal = GOALS.find((g) => g.value === form.tujuan) || GOALS[1];
    const target = tdee + goal.delta;

    // Makronutrien: 50% karbo, 20% protein, 30% lemak (dari target)
    const karbo   = Math.round((target * 0.5) / 4);
    const protein = Math.round((target * 0.2) / 4);
    const lemak   = Math.round((target * 0.3) / 9);

    setHasil({ bmr, tdee, target, karbo, protein, lemak, goalLabel: goal.label });
  }

  function reset() {
    setForm({ gender: "", usia: "", berat: "", tinggi: "", aktivitas: "", tujuan: "tahan" });
    setHasil(null);
  }

  const inputClass =
    "w-full bg-surface-container-low border border-outline-variant rounded-lg py-md px-md focus:border-secondary focus:ring-1 focus:ring-secondary transition-all text-[16px] text-on-surface outline-none";

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-container-margin md:px-lg py-xl lg:py-xxl">

      {/* ── Header ── */}
      <div className="mb-xl text-center md:text-left reveal">
        <h1 className="text-[24px] md:text-[32px] font-bold text-primary mb-sm">
          Kalkulator Energi Harian
        </h1>
        <p className="text-[16px] text-on-surface-variant max-w-2xl">
          Hitung kebutuhan kalori harian Anda berdasarkan standar AKG Kemenkes RI
          untuk mencapai tujuan kesehatan dengan presisi klinis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg lg:gap-xl">

        {/* ════════════ INPUT PANEL ════════════ */}
        <section className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-lg md:p-xl shadow-[0_4px_24px_rgba(1,45,29,0.04)] border border-outline-variant/50 reveal-left">
          <div className="space-y-xl">

            {/* 1. Profil Biometrik */}
            <fieldset className="space-y-sm">
              <legend className="text-[20px] font-semibold text-primary mb-md">
                1. Profil Biometrik
              </legend>

              {/* Gender */}
              <div className="text-[14px] font-semibold text-on-surface mb-xs">Jenis Kelamin</div>
              <div className="flex gap-md">
                {["pria", "wanita"].map((g) => (
                  <label
                    key={g}
                    className={`flex items-center gap-sm p-md border rounded-lg cursor-pointer flex-1 transition-colors
                      ${form.gender === g
                        ? "border-secondary bg-secondary-fixed/30 ring-1 ring-secondary"
                        : "border-outline-variant bg-surface-container-low hover:border-primary"
                      }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={form.gender === g}
                      onChange={set("gender")}
                      className="w-5 h-5 accent-primary"
                    />
                    <span className="text-[16px] text-on-surface capitalize">{g}</span>
                  </label>
                ))}
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-md mt-md">
                {[
                  { key: "usia",   label: "Usia",         placeholder: "Misal: 25",  unit: "tahun" },
                  { key: "berat",  label: "Berat Badan",  placeholder: "Misal: 65",  unit: "kg" },
                  { key: "tinggi", label: "Tinggi Badan", placeholder: "Misal: 170", unit: "cm" },
                ].map(({ key, label, placeholder, unit }) => (
                  <div key={key} className="space-y-xs">
                    <label className="text-[14px] font-semibold text-on-surface block">{label}</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={form[key]}
                        onChange={set(key)}
                        placeholder={placeholder}
                        className={`${inputClass} pr-14`}
                        min="0"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[16px] text-on-surface-variant select-none">
                        {unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>

            <div className="w-full h-px bg-outline-variant/50" />

            {/* 2. Gaya Hidup */}
            <fieldset className="space-y-sm">
              <legend className="text-[20px] font-semibold text-primary mb-md">2. Gaya Hidup</legend>
              <label className="text-[14px] font-semibold text-on-surface block mb-xs">
                Tingkat Aktivitas Fisik
              </label>
              <div className="relative">
                <select
                  value={form.aktivitas}
                  onChange={set("aktivitas")}
                  className={`${inputClass} appearance-none pr-10`}
                >
                  {ACTIVITY_LEVELS.map((a) => (
                    <option key={a.value} value={a.value} disabled={a.disabled}>
                      {a.label}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
                  expand_more
                </span>
              </div>
            </fieldset>

            <div className="w-full h-px bg-outline-variant/50" />

            {/* 3. Tujuan Nutrisi */}
            <fieldset className="space-y-sm">
              <legend className="text-[20px] font-semibold text-primary mb-md">3. Tujuan Nutrisi</legend>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                {GOALS.map((g) => (
                  <label
                    key={g.value}
                    className={`flex flex-col items-start p-md border rounded-lg cursor-pointer transition-all relative overflow-hidden
                      ${form.tujuan === g.value
                        ? "border-secondary ring-1 ring-secondary bg-surface-container-low"
                        : "border-outline-variant bg-surface-container-low hover:border-primary"
                      }`}
                  >
                    <div className="flex items-center gap-sm mb-sm w-full">
                      <input
                        type="radio"
                        name="tujuan"
                        value={g.value}
                        checked={form.tujuan === g.value}
                        onChange={set("tujuan")}
                        className="w-5 h-5 accent-secondary"
                      />
                      <span className="text-[14px] font-semibold text-on-surface">{g.label}</span>
                    </div>
                    <span className="text-[12px] text-on-surface-variant ml-7">{g.desc}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Actions */}
            <div className="flex flex-col md:flex-row gap-md pt-md">
              <button
                onClick={hitung}
                className="flex-1 bg-primary text-on-primary text-[14px] font-semibold py-md px-lg rounded-lg hover:bg-surface-tint transition-all active:scale-[0.98] flex justify-center items-center gap-sm"
              >
                <span className="material-symbols-outlined text-[20px]">calculate</span>
                Hitung Sekarang
              </button>
              <button
                onClick={reset}
                className="flex-1 bg-secondary-fixed text-on-secondary-fixed text-[14px] font-semibold py-md px-lg rounded-lg hover:bg-secondary-fixed-dim transition-all active:scale-[0.98] flex justify-center items-center gap-sm"
              >
                <span className="material-symbols-outlined text-[20px]">bookmark</span>
                Simpan ke Profil
              </button>
            </div>
          </div>
        </section>

        {/* ════════════ HASIL PANEL ════════════ */}
        <section className="lg:col-span-5 flex flex-col gap-lg reveal-right reveal-delay-100">
          <div className="bg-surface-container-lowest rounded-xl p-lg md:p-xl shadow-[0_4px_24px_rgba(1,45,29,0.04)] border border-outline-variant/50 relative overflow-hidden flex-grow">

            {/* Decorative blob */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-secondary-fixed/20 rounded-full blur-3xl pointer-events-none" />

            <h2 className="text-[20px] font-semibold text-primary mb-lg relative z-10">
              Hasil Analisis Nutrisi
            </h2>

            <div className="space-y-md relative z-10">
              {/* TDEE */}
              <ResultCard
                variant="primary"
                label="Kebutuhan Kalori Harian (TDEE)"
                value={hasil ? formatNum(hasil.tdee) : "–"}
                unit="kkal/hari"
                sub="Total energi yang dibakar tubuh dalam sehari dengan tingkat aktivitasmu."
              />

              {/* Target */}
              <ResultCard
                variant="secondary"
                label={`Target Sesuai Tujuan (${hasil?.goalLabel ?? "Pertahankan BB"})`}
                value={hasil ? formatNum(hasil.target) : "–"}
                unit="kkal / hari"
              />

              {/* BMR */}
              <ResultCard
                label="Basal Metabolic Rate (BMR)"
                value={hasil ? formatNum(hasil.bmr) : "–"}
                unit="kkal"
                sub="Energi minimal untuk fungsi dasar tubuh saat istirahat."
              />
            </div>

            {/* Makronutrien */}
            <div className="mt-lg pt-lg border-t border-outline-variant/50 relative z-10">
              <div className="text-[14px] font-semibold text-on-surface mb-md">Estimasi Makronutrien</div>
              <div className="grid grid-cols-3 gap-sm">
                {[
                  { label: "Karbo",   value: hasil ? `${hasil.karbo}g`   : "–", color: "text-primary" },
                  { label: "Protein", value: hasil ? `${hasil.protein}g` : "–", color: "text-secondary" },
                  { label: "Lemak",   value: hasil ? `${hasil.lemak}g`   : "–", color: "text-surface-tint" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="bg-surface-container rounded-md p-sm text-center">
                    <div className="text-[12px] text-on-surface-variant mb-1">{label}</div>
                    <div className={`text-[14px] font-bold ${color}`}>{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-xl relative z-10">
              <p className="text-[12px] text-on-surface-variant/80 italic mb-2">
                Hasil bersifat informatif dan tidak digunakan sebagai acuan medis.
              </p>
              <p className="text-[12px] text-on-surface-variant/60">
                * Perhitungan menggunakan formula Mifflin-St Jeor (1990) dan disesuaikan
                dengan Standar AKG Kemenkes RI.
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
