// src/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = "Email wajib diisi.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Format email tidak valid.";
    if (!form.password) errs.password = "Password wajib diisi.";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("authToken", "demo-token");
      navigate("/");
    }, 1200);
  };

  const inputBase =
    "w-full bg-surface-container-low border border-outline-variant rounded-lg py-[14px] font-[16px] text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all";

  return (
    <main className="flex w-full min-h-screen">

      {/* ── Left Panel ─────────────────────────────────────────────── */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-xxl relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #1b4332 0%, #2d6a4f 60%, #012d1d 100%)" }}
      >
        {/* Background texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
          <img
            src="https://lh3.googleusercontent.com/aida/ADBb0ui7QisIG3zTtjtaKohsnlZvFjYcBLYloWmvwz0zeXKMYaQIE0J1-2k4q9dY0krWV3fbAJxBYX92Q7anDIowZ3gf0YN1-2-2GhSpciAX_LLyBqp0b9nl3Ckn1Hr2MN6rql_RGvK2L74TvS_uo3PH25kzSKoH0HH4Fu0iIquzWiPFKk8COmAt1jZjTcpaQZIO0ZR51BdZG4i_jMmpg9d7rGDQHCvRBujtg7DGuYvS4M2rfTxD_efJNH3xk7U"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        {/* Glow blob */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none z-0" />

        {/* Logo */}
        <div className="flex items-center gap-sm relative z-10">
          <span className="material-symbols-outlined text-tertiary-fixed text-[32px]" style={{ fontVariationSettings: '"FILL" 1' }}>eco</span>
          <span className="text-[32px] font-bold text-white tracking-tight">GiziMeal</span>
        </div>

        {/* Tagline */}
        <div className="relative z-10 max-w-lg">
          <h1 className="text-[40px] leading-[48px] font-bold text-white mb-lg tracking-tight">
            Kenali bahan, pahami gizinya, sajikan menu dengan gizi seimbang.
          </h1>
          <p className="text-[18px] leading-7 text-primary-fixed-dim">
            Foto bahan makanan yang kamu punya, lalu dapatkan rekomendasi menu lengkap beserta informasi gizinya berdasarkan Pedoman Gizi Seimbang dan Angka Kecukupan Gizi (AKG) Kemenkes RI.
          </p>
        </div>

        {/* Bottom label */}
        <div className="relative z-10">
          <div className="flex items-center gap-md mb-xs opacity-50">
            <div className="h-px w-8 bg-white" />
            <span className="text-[11px] tracking-widest text-white uppercase">CAPSTONE PROJECT CC26-PSU393</span>
          </div>
        </div>
      </div>

      {/* ── Right Panel: Form ──────────────────────────────────────── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-surface-container-lowest px-container-margin md:px-xl lg:px-xxl py-xxl overflow-y-auto">

        <div className="w-full max-w-[420px] flex flex-col mt-xl lg:mt-0">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-sm text-primary mb-xl">
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: '"FILL" 1' }}>eco</span>
            <span className="text-[24px] font-bold tracking-tight">GiziMeal</span>
          </div>

          {/* Back link */}
          <Link
            to="/"
            className="flex items-center gap-xs text-on-surface-variant hover:text-on-surface transition-colors text-[14px] font-semibold mb-lg w-fit"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            Kembali ke Beranda
          </Link>

          {/* Header */}
          <div className="mb-xl">
            <span className="block text-[12px] font-semibold tracking-widest text-secondary uppercase mb-sm">MASUK AKUN</span>
            <h2 className="text-[32px] font-bold text-on-surface mb-sm leading-tight">
              Selamat datang kembali.
            </h2>
            <p className="text-[16px] text-on-surface-variant leading-6">
              Masukkan kredensial untuk melanjutkan ke sistem GiziMeal.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-lg" noValidate>

            {/* Email */}
            <div className="flex flex-col gap-sm">
              <label className="text-[14px] font-semibold text-on-surface" htmlFor="email">Email</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">mail</span>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="nama@email.com"
                  className={`${inputBase} pl-12 pr-md ${errors.email ? "ring-2 ring-error border-error" : ""}`}
                />
              </div>
              {errors.email && <p className="text-[12px] text-error font-medium">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-sm">
              <div className="flex justify-between items-center">
                <label className="text-[14px] font-semibold text-on-surface" htmlFor="password">Password</label>
                <a href="#" className="text-[12px] text-outline hover:text-secondary transition-colors">Lupa password?</a>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">lock</span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={set("password")}
                  placeholder="••••••••••••"
                  className={`${inputBase} pl-12 pr-12 ${errors.password ? "ring-2 ring-error border-error" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-md top-1/2 -translate-y-1/2 text-outline hover:text-on-surface-variant transition-colors"
                  aria-label="Toggle password visibility"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
              {errors.password && <p className="text-[12px] text-error font-medium">{errors.password}</p>}
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-sm">
              <input
                id="remember"
                type="checkbox"
                checked={form.remember}
                onChange={set("remember")}
                className="w-5 h-5 rounded border-outline-variant accent-secondary cursor-pointer"
              />
              <label htmlFor="remember" className="text-[16px] text-on-surface-variant cursor-pointer select-none">
                Ingat saya di perangkat ini
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-on-primary rounded-lg py-md text-[14px] font-semibold shadow-sm hover:bg-surface-tint transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-sm disabled:opacity-60 disabled:cursor-not-allowed mt-xs"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                  Memproses...
                </>
              ) : (
                <>
                  Masuk Sekarang
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* Sign up link */}
          <div className="mt-xl text-center">
            <p className="text-[16px] text-on-surface-variant">
              Belum punya akun?{" "}
              <Link to="/auth/register" className="text-[14px] font-semibold text-on-surface hover:text-secondary transition-colors underline underline-offset-4">
                Daftar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}