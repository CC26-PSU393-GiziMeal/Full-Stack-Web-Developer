import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ACTIVITY_LEVELS = [
  { value: "1.2",   label: "Sangat Ringan (Sedenter)", freq: "Sangat jarang / tidak pernah olahraga", met: "Intensitas: MET < 1.5" },
  { value: "1.375", label: "Ringan", freq: "Olahraga ringan 1–3 hari/minggu", met: "Intensitas: MET 1.5 – 3.0" },
  { value: "1.55",  label: "Sedang (Moderat)", freq: "Olahraga sedang 3–5 hari/minggu", met: "Intensitas: MET 3.0 – 6.0" },
  { value: "1.725", label: "Berat (Aktif)", freq: "Olahraga berat 6–7 hari/minggu", met: "Intensitas: MET 6.0 – 8.0" },
  { value: "1.9",   label: "Sangat Berat", freq: "Pekerjaan fisik berat / atlet (setiap hari)", met: "Intensitas: MET > 8.0" },
];
const GOALS = [
  { value: "turun",  label: "Turunkan BB",    delta: -500, desc: "-500 kkal / hari" },
  { value: "tahan",  label: "Pertahankan BB", delta: 0,    desc: "0 kkal / hari" },
  { value: "naik",   label: "Naikkan BB",     delta: 500,  desc: "+500 kkal / hari" },
];

function hitungBMR(gender, berat, tinggi, usia) {
  if (!gender || !berat || !tinggi || !usia) return null;
  const base = 10 * berat + 6.25 * tinggi - 5 * usia;
  return gender === "pria" ? base + 5 : base - 161;
}

function formatNum(n) {
  if (n == null) return "–";
  return n.toLocaleString("id-ID", { maximumFractionDigits: 0 });
}

function ResultCard({ label, value, unit, variant = "default", sub }) {
  if (variant === "primary") {
    return (
      <div className="bg-primary text-primary-foreground rounded-lg p-lg shadow-sm">
        <div className="flex justify-between items-start mb-sm">
          <div className="text-[14px] font-semibold opacity-90">{label}</div>
          <span className="material-symbols-outlined opacity-70">local_fire_department</span>
        </div>
        <div className="flex items-end gap-sm tabular-nums">
          <span className="text-[32px] leading-10 font-semibold tracking-tight">{value}</span>
          <span className="text-[16px] opacity-90 pb-1">{unit}</span>
        </div>
        {sub && <p className="text-[12px] mt-sm opacity-80 leading-relaxed">{sub}</p>}
      </div>
    );
  }
  if (variant === "secondary") {
    return (
      <div className="bg-surface border border-secondary/30 rounded-lg p-md">
        <div className="text-[12px] font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-xs">{label}</div>
        <div className="flex items-end gap-xs tabular-nums">
          <span className="text-[20px] font-semibold text-secondary">{value}</span>
          <span className="text-[12px] text-muted-foreground pb-[2px]">{unit}</span>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-surface border border-border/50 rounded-lg p-md">
      <div className="text-[12px] font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-xs">{label}</div>
      <div className="flex items-end gap-xs tabular-nums">
        <span className="text-[20px] font-semibold text-foreground">{value}</span>
        <span className="text-[12px] text-muted-foreground pb-[2px]">{unit}</span>
      </div>
      {sub && <p className="text-[12px] mt-xs text-muted-foreground/70">{sub}</p>}
    </div>
  );
}

export default function KalkulatorPage() {
  const isLogged = !!localStorage.getItem('authToken');
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('kalkulatorProfile');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.form) setForm(data.form);
        if (data.hasil) setHasil(data.hasil);
      } catch (e) {
        console.error('Failed to parse saved profile', e);
      }
    }
  }, []);

  if (!isLogged) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen p-8">
        <h2 className="text-[28px] md:text-[36px] font-semibold tracking-tight text-primary mb-4">Akses Terbatas</h2>
        <p className="mb-6 text-center text-muted-foreground leading-relaxed max-w-md">
          Untuk menggunakan kalkulator, silakan masuk terlebih dahulu.
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

  const [form, setForm] = useState({ gender: "", usia: "", berat: "", tinggi: "", aktivitas: "", tujuan: "tahan" });
  const [hasil, setHasil] = useState(null);
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function hitung() {
    const bmr = hitungBMR(form.gender, parseFloat(form.berat), parseFloat(form.tinggi), parseFloat(form.usia));
    if (!bmr) return;
    const pal = parseFloat(form.aktivitas) || 1.55;
    const tdee = bmr * pal;
    const goal = GOALS.find((g) => g.value === form.tujuan) || GOALS[1];
    const target = tdee + goal.delta;
    const karbo   = Math.round((target * 0.5) / 4);
    const protein = Math.round((target * 0.2) / 4);
    const lemak   = Math.round((target * 0.3) / 9);
    setHasil({ bmr, tdee, target, karbo, protein, lemak, goalLabel: goal.label });
  }

  function saveProfile() {
    const data = { form, hasil };
    localStorage.setItem('kalkulatorProfile', JSON.stringify(data));
    alert('Profil berhasil disimpan');
  }

  const inputClass = "w-full bg-surface-alt border border-border rounded-lg py-md px-md focus:border-secondary focus:ring-1 focus:ring-secondary transition-all text-[15px] text-foreground outline-none tabular-nums";

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-container-margin md:px-lg py-xl lg:py-xxl">
      {/* ── Header ── */}
      <div className="mb-xl text-center md:text-left reveal">
        <h1 className="text-[28px] md:text-[36px] tracking-tight font-semibold text-primary mb-sm leading-[1.05]">
          Kalkulator Energi Harian
        </h1>
        <p className="text-[15px] leading-relaxed text-muted-foreground max-w-2xl">
          Hitung kebutuhan kalori harian Anda berdasarkan standar AKG Kemenkes RI
          untuk mencapai tujuan kesehatan dengan presisi klinis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg lg:gap-xl">
        {/* ════════════ INPUT PANEL ════════════ */}
        <section className="lg:col-span-7 bg-card rounded-xl p-lg md:p-xl shadow-sm border border-border reveal-left">
          <div className="space-y-xl">
            {/* 1. Profil Biometrik */}
            <fieldset className="space-y-sm">
              <legend className="text-[18px] tracking-tight font-semibold text-primary mb-md">
                1. Profil Biometrik
              </legend>
              <div className="text-[13px] font-semibold text-foreground mb-xs">Jenis Kelamin</div>
              <div className="flex gap-md">
                {["pria", "wanita"].map((g) => (
                  <label
                    key={g}
                    className={`flex items-center gap-sm p-md border rounded-lg cursor-pointer flex-1 transition-colors
                      ${form.gender === g
                        ? "border-secondary bg-secondary/10 ring-1 ring-secondary"
                        : "border-border bg-surface hover:border-primary"
                      }`}
                  >
                    <input type="radio" name="gender" value={g} checked={form.gender === g} onChange={set("gender")} className="w-5 h-5 accent-primary" />
                    <span className="text-[15px] font-medium text-foreground capitalize">{g}</span>
                  </label>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-md mt-md">
                {[
                  { key: "usia",   label: "Usia",         placeholder: "Misal: 25",  unit: "thn" },
                  { key: "berat",  label: "Berat Badan",  placeholder: "Misal: 65",  unit: "kg" },
                  { key: "tinggi", label: "Tinggi Badan", placeholder: "Misal: 170", unit: "cm" },
                ].map(({ key, label, placeholder, unit }) => (
                  <div key={key} className="space-y-xs">
                    <label className="text-[13px] font-semibold text-foreground block">{label}</label>
                    <div className="relative">
                      <input type="number" value={form[key]} onChange={set(key)} placeholder={placeholder} className={`${inputClass} pr-12`} min="0" />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[14px] text-muted-foreground select-none tabular-nums">{unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>

            <div className="w-full h-px bg-border/50" />

            {/* 2. Tujuan Nutrisi */}
            <fieldset className="space-y-sm">
              <legend className="text-[18px] tracking-tight font-semibold text-primary mb-md">2. Tujuan Nutrisi</legend>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                {GOALS.map((g) => (
                  <label
                    key={g.value}
                    className={`flex flex-col items-start p-md border rounded-lg cursor-pointer transition-all relative overflow-hidden
                      ${form.tujuan === g.value
                        ? "border-secondary ring-1 ring-secondary bg-surface"
                        : "border-border bg-surface hover:border-primary"
                      }`}
                  >
                    <div className="flex items-center gap-sm mb-sm w-full">
                      <input type="radio" name="tujuan" value={g.value} checked={form.tujuan === g.value} onChange={set("tujuan")} className="w-5 h-5 accent-secondary flex-shrink-0" />
                      <span className="text-[14px] font-semibold text-foreground">{g.label}</span>
                    </div>
                    <span className="text-[12px] text-muted-foreground ml-7">{g.desc}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="w-full h-px bg-border/50" />

            {/* 3. Gaya Hidup */}
            <fieldset className="space-y-sm">
              <legend className="text-[18px] tracking-tight font-semibold text-primary mb-md">3. Gaya Hidup</legend>
              <label className="text-[13px] font-semibold text-foreground block mb-xs">Tingkat Aktivitas Fisik (PAL)</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                {ACTIVITY_LEVELS.map((a) => (
                  <label
                    key={a.value}
                    className={`flex flex-col items-start p-md border rounded-lg cursor-pointer transition-all relative overflow-hidden
                      ${form.aktivitas === a.value
                        ? "border-secondary ring-1 ring-secondary bg-surface"
                        : "border-border bg-surface hover:border-primary"
                      }`}
                  >
                    <div className="flex items-center gap-sm mb-sm w-full">
                      <input type="radio" name="aktivitas" value={a.value} checked={form.aktivitas === a.value} onChange={set("aktivitas")} className="w-5 h-5 accent-secondary flex-shrink-0" />
                      <span className="text-[14px] font-semibold text-foreground">{a.label}</span>
                    </div>
                    <div className="flex flex-col gap-xs ml-7">
                      <div className="flex items-start gap-xs">
                        <span className="material-symbols-outlined text-[14px] text-muted-foreground mt-0.5">calendar_month</span>
                        <span className="text-[12px] text-muted-foreground">{a.freq}</span>
                      </div>
                      <div className="flex items-start gap-xs">
                        <span className="material-symbols-outlined text-[14px] text-muted-foreground mt-0.5">monitor_heart</span>
                        <span className="text-[12px] text-muted-foreground">{a.met}</span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="flex flex-col md:flex-row gap-md pt-md">
              <button onClick={hitung} className="flex-1 bg-primary text-primary-foreground text-[14px] font-semibold py-md px-lg rounded-lg hover:opacity-90 transition-all active:scale-[0.98] flex justify-center items-center gap-sm shadow-sm">
                <span className="material-symbols-outlined text-[20px]">calculate</span>
                Hitung Sekarang
              </button>
              <button onClick={saveProfile} className="flex-1 bg-secondary text-secondary-foreground text-[14px] font-semibold py-md px-lg rounded-lg hover:opacity-90 transition-all active:scale-[0.98] flex justify-center items-center gap-sm shadow-sm">
                <span className="material-symbols-outlined text-[20px]">bookmark</span>
                Simpan ke Profil
              </button>
            </div>
          </div>
        </section>

        {/* ════════════ HASIL PANEL ════════════ */}
        <section className="lg:col-span-5 flex flex-col gap-lg reveal-right reveal-delay-100">
          <div className="bg-card rounded-xl p-lg md:p-xl shadow-sm border border-border relative overflow-hidden flex-grow">
            <h2 className="text-[20px] font-semibold tracking-tight text-primary mb-lg relative z-10">
              Hasil Analisis Nutrisi
            </h2>
            <div className="space-y-md relative z-10">
              <ResultCard variant="primary" label="Kebutuhan Kalori Harian (TDEE)" value={hasil ? formatNum(hasil.tdee) : "–"} unit="kkal/hari" sub="Total energi yang dibakar tubuh dalam sehari dengan tingkat aktivitasmu." />
              <ResultCard variant="secondary" label={`Target Sesuai Tujuan (${hasil?.goalLabel ?? "Pertahankan BB"})`} value={hasil ? formatNum(hasil.target) : "–"} unit="kkal / hari" />
              <ResultCard label="Basal Metabolic Rate (BMR)" value={hasil ? formatNum(hasil.bmr) : "–"} unit="kkal" sub="Energi minimal untuk fungsi dasar tubuh saat istirahat." />
            </div>
            
            <div className="mt-lg pt-lg border-t border-border/50 relative z-10">
              <div className="text-[13px] font-semibold text-foreground mb-md">Estimasi Makronutrien</div>
              <div className="grid grid-cols-3 gap-sm">
                {[
                  { label: "Karbo",   value: hasil ? `${hasil.karbo}g`   : "–", color: "text-primary" },
                  { label: "Protein", value: hasil ? `${hasil.protein}g` : "–", color: "text-secondary" },
                  { label: "Lemak",   value: hasil ? `${hasil.lemak}g`   : "–", color: "text-muted-foreground" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="bg-surface rounded-md p-sm text-center border border-border">
                    <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-1">{label}</div>
                    <div className={`text-[15px] font-semibold tabular-nums ${color}`}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-xl relative z-10">
              <p className="text-[11px] text-muted-foreground/80 mb-2 leading-relaxed">
                Hasil bersifat informatif dan tidak digunakan sebagai acuan medis.
              </p>
              <p className="text-[11px] text-muted-foreground/60 leading-relaxed">
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