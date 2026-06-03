/* eslint-disable no-useless-assignment */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoGiziMeal from "../assets/logo-dark-transparan.png";
import Swal from "sweetalert2";

// ── Password strength logic ─────────────────────────────────────────
function getStrength(pwd) {
  let score = 0;
  const checks = {
    length: pwd.length >= 8,
    lower: /[a-z]/.test(pwd),
    upper: /[A-Z]/.test(pwd),
    number: /[0-9]/.test(pwd),
    symbol: /[^A-Za-z0-9]/.test(pwd),
  };
  score = Object.values(checks).filter(Boolean).length;
  const labels = ["", "Sangat Lemah", "Lemah", "Cukup", "Kuat", "Sangat Kuat"];
  const colors = ["", "bg-error", "bg-error", "bg-[#E8A020]", "bg-secondary", "bg-secondary"];
  return { score, checks, label: labels[score] || "", color: colors[score] || "" };
}

const STRENGTH_CHECKS = [
  { key: "length", label: "Minimal 8 karakter" },
  { key: "lower", label: "Huruf kecil (a-z)" },
  { key: "upper", label: "Huruf besar (A-Z)" },
  { key: "number", label: "Angka (0-9)" },
  { key: "symbol", label: "Simbol (!@#$..)" },
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirm: "", agree: false });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [strength, setStrength] = useState({ score: 0, checks: {}, label: "", color: "" });

  useEffect(() => {
    setStrength(getStrength(form.password));
  }, [form.password]);

  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "Nama depan wajib diisi.";
    if (!form.email) errs.email = "Email wajib diisi.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Format email tidak valid.";
    if (!form.password) errs.password = "Password wajib diisi.";
    else if (strength.score < 3) errs.password = "Password terlalu lemah.";
    if (!form.confirm) errs.confirm = "Konfirmasi password wajib diisi.";
    else if (form.password !== form.confirm) errs.confirm = "Konfirmasi password tidak cocok.";
    if (!form.agree) errs.agree = "Anda harus menyetujui Syarat & Ketentuan.";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setErrors({});
    setServerError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors && Array.isArray(data.errors)) {
          throw new Error(data.errors.join(", "));
        }
        throw new Error(data.error || "Terjadi kesalahan saat registrasi.");
      }

      Swal.fire({
        icon: "success",
        title: "Selamat",
        text: "Akun anda berhasil didaftarkan",
        confirmButtonColor: "var(--color-secondary, #2196f3)",
      });
      navigate("/auth/login");

    } catch (err) {
      if (err.message.toLowerCase().includes("registered") || err.message.toLowerCase().includes("email")) {
        setErrors(prev => ({ ...prev, email: err.message }));
        setServerError("");
      } else {
        setServerError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const inputBase =
    "w-full bg-surface border border-outline-variant rounded-xl py-sm font-[16px] text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary transition-all";

  return (
    <main className="flex w-full min-h-screen">

      {/* ── Left Panel ─────────────────────────────────────────────── */}
      <div
        className="hidden lg:flex flex-col justify-between lg:w-1/2 p-xxl relative overflow-hidden h-screen sticky top-0"
        style={{ background: "linear-gradient(160deg, #1b4332 0%, #2d6a4f 60%, #012d1d 100%)" }}
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none z-0" />

        <div className="flex items-center gap-sm relative z-10">
          <img src={logoGiziMeal} alt="Logo GiziMeal" className="w-32 h-auto" />
        </div>

        <div className="relative z-10 max-w-lg">
          <h1 className="text-[40px] leading-[48px] font-bold text-white mb-lg tracking-tight">
            Kenali bahan, pahami gizinya, sajikan menu dengan gizi seimbang.
          </h1>
          <p className="text-[18px] leading-7 text-primary-fixed-dim">
            Foto bahan makanan yang kamu punya, lalu dapatkan rekomendasi menu lengkap beserta informasi gizinya berdasarkan Pedoman Gizi Seimbang dan Angka Kecukupan Gizi (AKG) Kemenkes RI.
          </p>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-md mb-xs opacity-50">
            <div className="h-px w-8 bg-white" />
            <span className="text-[11px] tracking-widest text-white uppercase">CAPSTONE PROJECT CC26-PSU393</span>
          </div>
        </div>
      </div>

      {/* ── Right Panel: Form ──────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center items-center bg-surface-container-lowest px-container-margin md:px-xl lg:px-12 py-xl overflow-y-auto">

        <div className="flex lg:hidden items-center gap-sm text-primary mb-xl self-start w-full max-w-md mx-auto">
          <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: '"FILL" 1' }}>eco</span>
          <span className="text-[24px] font-bold tracking-tight">GiziMeal</span>
        </div>

        <div className="w-full max-w-md flex flex-col gap-lg">
          <Link to="/" className="flex items-center gap-xs text-on-surface-variant hover:text-primary transition-colors text-[14px] font-semibold w-fit">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Kembali ke Beranda
          </Link>

          <div>
            <h1 className="text-[40px] font-bold text-on-background leading-tight">Daftar Akun</h1>
            <p className="text-[16px] text-on-surface-variant mt-xs leading-6">Lengkapi data di bawah ini untuk membuat akun baru.</p>
          </div>

          {serverError && (
            <div className="p-sm bg-error-container text-on-error-container rounded-lg text-[14px] font-medium border border-error mb-1">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-sm" noValidate>

            {/* Name row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
              <div className="flex flex-col gap-xs">
                <label className="text-[12px] font-semibold text-on-surface">Nama Depan</label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={set("firstName")}
                  placeholder="Budi"
                  className={`${inputBase} px-md ${errors.firstName ? "ring-1 ring-error border-error" : ""}`}
                />
                {errors.firstName && <p className="text-[11px] text-error font-medium">{errors.firstName}</p>}
              </div>
              <div className="flex flex-col gap-xs">
                <label className="text-[12px] font-semibold text-on-surface">Nama Belakang</label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={set("lastName")}
                  placeholder="Santoso"
                  className={`${inputBase} px-md`}
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-xs">
              <label className="text-[12px] font-semibold text-on-surface">Alamat Email</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline text-[20px]">mail</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="anda@email.com"
                  className={`w-full border rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
                    errors.email
                      ? "border-red-500 focus:ring-red-400 bg-red-50"
                      : "border-gray-300 focus:ring-blue-400 bg-surface"
                  }`}
                />
              </div>
              {errors.email && <p className="text-[11px] text-error font-medium">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-xs">
              <label className="text-[12px] font-semibold text-on-surface">Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline text-[20px]">lock</span>
                <input
                  type={showPwd ? "text" : "password"}
                  value={form.password}
                  onChange={set("password")}
                  placeholder="••••••••"
                  className={`${inputBase} pl-[44px] pr-xl ${errors.password ? "ring-1 ring-error border-error" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-sm top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
                  aria-label="Toggle password"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPwd ? "visibility" : "visibility_off"}
                  </span>
                </button>
              </div>

              {/* Strength bar */}
              {form.password && (
                <div className="mt-xs">
                  <div className="flex gap-1 mb-xs items-center">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength.score ? strength.color : "bg-surface-container-high"}`}
                      />
                    ))}
                    {strength.label && (
                      <span className={`text-[10px] font-bold px-xs py-[2px] rounded ml-sm whitespace-nowrap ${strength.score >= 4
                          ? "bg-secondary/10 text-secondary"
                          : strength.score >= 3
                            ? "bg-[#E8A020]/10 text-[#B87A10]"
                            : "bg-error/10 text-error"
                        }`}>
                        {strength.label}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-y-xs mt-xs">
                    {STRENGTH_CHECKS.map(({ key, label }) => (
                      <div key={key} className="flex items-center gap-xs">
                        <span className={`material-symbols-outlined text-[13px] ${strength.checks[key] ? "text-secondary" : "text-outline"}`}>
                          {strength.checks[key] ? "check" : "remove"}
                        </span>
                        <span className={`text-[11px] ${strength.checks[key] ? "text-on-surface-variant" : "text-outline"}`}>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {errors.password && <p className="text-[11px] text-error font-medium">{errors.password}</p>}
            </div>

            {/* Confirm password */}
            <div className="flex flex-col gap-xs">
              <label className="text-[12px] font-semibold text-on-surface">Konfirmasi Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline text-[20px]">lock</span>
                <input
                  type={showConf ? "text" : "password"}
                  value={form.confirm}
                  onChange={set("confirm")}
                  placeholder="••••••••"
                  className={`${inputBase} pl-[44px] pr-xl ${errors.confirm ? "ring-1 ring-error border-error" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConf((v) => !v)}
                  className="absolute right-sm top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
                  aria-label="Toggle confirm password"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showConf ? "visibility" : "visibility_off"}
                  </span>
                </button>
              </div>
              {form.confirm && !errors.confirm && form.password === form.confirm && (
                <div className="flex items-center gap-xs">
                  <span className="material-symbols-outlined text-secondary text-[14px]">check_circle</span>
                  <span className="text-[11px] text-secondary font-medium">Password cocok</span>
                </div>
              )}
              {errors.confirm && <p className="text-[11px] text-error font-medium">{errors.confirm}</p>}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-sm mt-sm">
              <div className="flex items-center h-5 mt-[2px]">
                <input
                  type="checkbox"
                  checked={form.agree}
                  onChange={set("agree")}
                  className="w-4 h-4 rounded border-outline-variant accent-secondary cursor-pointer"
                />
              </div>
              <label className="text-[12px] text-on-surface-variant leading-relaxed cursor-pointer select-none">
                Saya setuju dengan{" "}
                <a href="#" className="text-secondary hover:underline font-semibold">Syarat & Ketentuan</a>{" "}
                dan{" "}
                <a href="#" className="text-secondary hover:underline font-semibold">Kebijakan Privasi</a>{" "}
                yang berlaku.
              </label>
            </div>
            {errors.agree && <p className="text-[11px] text-error font-medium -mt-xs">{errors.agree}</p>}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-sm w-full bg-primary text-on-primary text-[14px] font-semibold py-[14px] rounded-xl hover:bg-surface-tint active:scale-[0.98] transition-all flex justify-center items-center gap-sm shadow-[0_4px_12px_rgba(1,45,29,0.15)] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                  Memproses...
                </>
              ) : (
                "Daftar Sekarang"
              )}
            </button>
          </form>

          {/* Login link */}
          <div className="text-center pt-md border-t border-surface-variant">
            <p className="text-[16px] text-on-surface-variant">
              Sudah punya akun?{" "}
              <Link to="/auth/login" className="text-secondary font-semibold text-[14px] hover:text-primary transition-colors hover:underline">
                Masuk
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}