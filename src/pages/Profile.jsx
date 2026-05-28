import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const USER_KEY = "gizimeal_user";
const CALC_KEY = "kalkulatorProfile";
const SCAN_KEY = "gizimeal_scan_history";

const DEFAULT_USER = {
  name: "Muhammad Dava Arya Nada Putra",
  username: "mdavaarya",
  email: "dava@example.com",
  joined: "Mei 2025",
  avatar: null,
};

function getInitials(name = "") {
  return name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}

function formatNum(n) {
  return n ? Math.round(n).toLocaleString("id-ID") : "–";
}

function getAktivitasLabel(val) {
  const map = {
    "1.2": "Sangat Ringan (Sedenter)",
    "1.375": "Ringan",
    "1.55": "Sedang (Moderat)",
    "1.725": "Berat (Aktif)",
    "1.9": "Sangat Berat"
  };
  return map[val] || val;
}

function ModalGantiPassword({ onClose }) {
  const [form, setForm] = useState({ lama: "", baru: "", konfirmasi: "" });
  const [show, setShow] = useState({ lama: false, baru: false, konfirmasi: false });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const toggle = (k) => setShow((s) => ({ ...s, [k]: !s[k] }));
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = () => {
    if (!form.lama || !form.baru || !form.konfirmasi) { setError("Semua field wajib diisi."); return; }
    if (form.baru.length < 8) { setError("Password baru minimal 8 karakter."); return; }
    if (form.baru !== form.konfirmasi) { setError("Konfirmasi password tidak cocok."); return; }
    setError("");
    setSuccess(true);
    setTimeout(onClose, 1500);
  };

  const inputClass = "w-full bg-surface-alt border border-border rounded-lg py-md pl-md pr-12 text-foreground focus:outline-none focus:ring-1 focus:ring-secondary text-[15px]";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-md">
      <div className="bg-card rounded-[24px] border border-border p-xl w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-lg">
          <h3 className="text-[20px] tracking-tight text-primary font-semibold">Ganti Password</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-1 rounded-full transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        {success ? (
          <div className="flex flex-col items-center gap-md py-lg text-center">
            <span className="material-symbols-outlined text-secondary text-[48px]">check_circle</span>
            <p className="text-foreground font-semibold">Password berhasil diubah!</p>
          </div>
        ) : (
          <div className="space-y-md">
            {[
              { key: "lama", label: "Password Lama" },
              { key: "baru", label: "Password Baru" },
              { key: "konfirmasi", label: "Konfirmasi Password Baru" },
            ].map(({ key, label }) => (
              <div key={key} className="space-y-xs">
                <label className="text-[13px] font-semibold text-foreground">{label}</label>
                <div className="relative">
                  <input
                    type={show[key] ? "text" : "password"}
                    value={form[key]}
                    onChange={set(key)}
                    placeholder="••••••••"
                    className={inputClass}
                  />
                  <button type="button" onClick={() => toggle(key)} className="absolute right-md top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    <span className="material-symbols-outlined text-[18px]">{show[key] ? "visibility_off" : "visibility"}</span>
                  </button>
                </div>
              </div>
            ))}
            {error && <p className="text-[13px] text-destructive font-medium">{error}</p>}
            <button onClick={submit} className="w-full bg-primary text-primary-foreground font-semibold py-md rounded-xl hover:opacity-90 transition-all active:scale-[0.98] mt-sm">
              Simpan Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ModalHapusAkun({ onClose, onConfirm }) {
  const [confirm, setConfirm] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-md">
      <div className="bg-card rounded-[24px] border border-destructive/30 p-xl w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-md">
          <h3 className="text-[20px] tracking-tight text-destructive font-semibold">Hapus Akun</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-1 rounded-full transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-md mb-lg flex gap-sm">
          <span className="material-symbols-outlined text-destructive text-[20px] flex-shrink-0 mt-0.5">warning</span>
          <p className="text-[14px] leading-relaxed text-muted-foreground">
            Tindakan ini <strong className="text-destructive font-semibold">tidak dapat dibatalkan</strong>. Seluruh data akun, riwayat scan, dan data kalkulator akan dihapus permanen.
          </p>
        </div>
        <div className="space-y-sm mb-lg">
          <label className="text-[13px] font-semibold text-foreground">Ketik <span className="text-destructive font-mono">HAPUS</span> untuk konfirmasi</label>
          <input
            type="text"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="HAPUS"
            className="w-full bg-surface-alt border border-border rounded-lg py-md px-md text-foreground focus:outline-none focus:ring-1 focus:ring-destructive text-[15px]"
          />
        </div>
        <div className="flex gap-sm">
          <button onClick={onClose} className="flex-1 bg-surface border border-border text-foreground font-semibold py-md rounded-xl hover:bg-surface-alt transition-colors">
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={confirm !== "HAPUS"}
            className="flex-1 bg-destructive text-destructive-foreground font-semibold py-md rounded-xl hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Hapus Akun
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const isLogged = !!localStorage.getItem("authToken");
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(USER_KEY)) || DEFAULT_USER; } catch { return DEFAULT_USER; }
  });
  const [calcData, setCalcData] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    try {
      const c = localStorage.getItem(CALC_KEY);
      if (c) setCalcData(JSON.parse(c));
    } catch { }
    try {
      const s = localStorage.getItem(SCAN_KEY);
      if (s) setScanHistory(JSON.parse(s));
    } catch { }
  }, []);

  if (!isLogged) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen p-8">
        <h2 className="text-[28px] md:text-[36px] tracking-tight font-semibold text-primary mb-4">Akses Terbatas</h2>
        <p className="mb-6 text-center text-muted-foreground leading-relaxed max-w-md">Untuk melihat profil, silakan masuk terlebih dahulu.</p>
        <button className="bg-primary text-primary-foreground font-semibold px-lg py-sm rounded-lg hover:opacity-90 transition-colors" onClick={() => navigate("/auth/login")}>
          Masuk
        </button>
      </main>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const handleHapusAkun = () => {
    localStorage.clear();
    navigate("/");
  };

  const quickAccess = [
    { icon: "calculate", label: "Kalkulator AKG", desc: "Hitung kebutuhan kalori harianmu", to: "/kalkulator" },
    { icon: "troubleshoot", label: "Deteksi Bahan", desc: "Scan bahan makanan & dapatkan rekomendasi", to: "/deteksi" },
    { icon: "database", label: "Database Gizi", desc: "Cari informasi nutrisi bahan makanan", to: "/database" },
  ];

  const infoItems = [
    { label: "Nama Lengkap", value: user.name, icon: "badge" },
    { label: "Username", value: `@${user.username}`, icon: "alternate_email" },
    { label: "Email", value: user.email, icon: "mail" },
  ];

  const displayHistory = scanHistory.length > 0 ? scanHistory : [
    { id: 1, bahan: "Bayam, Wortel, Tempe", waktu: "Hari ini, 12:34", skor: 87 },
    { id: 2, bahan: "Ayam, Brokoli, Nasi", waktu: "Kemarin, 19:10", skor: 92 },
    { id: 3, bahan: "Tahu, Kangkung", waktu: "2 hari lalu, 08:22", skor: 78 },
  ];

  return (
    <>
      {modal === "password" && <ModalGantiPassword onClose={() => setModal(null)} />}
      {modal === "hapus" && <ModalHapusAkun onClose={() => setModal(null)} onConfirm={handleHapusAkun} />}

      <main className="flex-grow w-full max-w-5xl mx-auto px-container-margin md:px-lg py-xl md:py-lg space-y-lg">

        <section className="flex flex-col items-center text-center gap-md reveal">
          <div className="relative">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full object-cover border-4 border-primary" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border-4 border-surface">
                <span className="text-primary text-[32px] font-semibold">{getInitials(user.name)}</span>
              </div>
            )}
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-secondary rounded-full border-2 border-surface flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary-foreground text-[14px]">check</span>
            </div>
          </div>
          <div className="space-y-xs">
            <h1 className="text-[24px] tracking-tight text-foreground font-semibold">{user.name}</h1>
            <p className="text-[14px] text-secondary font-medium">@{user.username}</p>
            <p className="text-[15px] text-muted-foreground">{user.email}</p>
          </div>
        </section>

        <section className="bg-card rounded-[24px] border border-border p-md md:p-xl space-y-md reveal reveal-delay-100 shadow-sm">
          <h2 className="text-[18px] tracking-tight text-primary font-semibold flex items-center gap-sm">
            <span className="material-symbols-outlined text-[22px]">person</span>
            Informasi Akun
          </h2>
          <ul className="flex flex-col">
            {infoItems.map((item, idx) => (
              <li key={item.label} className={`flex items-center gap-md py-md ${idx !== infoItems.length - 1 ? 'border-b border-border/50' : ''}`}>
                <span className="material-symbols-outlined text-muted-foreground text-[24px] flex-shrink-0">{item.icon}</span>
                <div className="flex-grow min-w-0">
                  <p className="text-[12px] font-medium tracking-[0.05em] uppercase text-muted-foreground">{item.label}</p>
                  <p className="text-[15px] text-foreground font-medium truncate">{item.value}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-card rounded-[24px] border border-border p-md md:p-xl space-y-md reveal reveal-delay-100 shadow-sm">
          <div className="flex justify-between items-center mb-sm">
            <h2 className="text-[18px] tracking-tight text-primary font-semibold flex items-center gap-sm">
              <span className="material-symbols-outlined text-[22px]">monitor_weight</span>
              Data Biometrik & Nutrisi
            </h2>
          </div>

          {(!calcData || !calcData.form || !calcData.hasil) ? (
            <div className="flex flex-col items-center justify-center py-xl text-center">
              <div className="w-16 h-16 bg-surface-alt rounded-full flex items-center justify-center mb-md border border-border">
                <span className="material-symbols-outlined text-[32px] text-muted-foreground">calculate</span>
              </div>
              <p className="text-muted-foreground mb-md font-medium">Belum ada data kalkulator yang disimpan.</p>
              <button onClick={() => navigate("/kalkulator")} className="bg-primary text-primary-foreground font-semibold px-lg py-sm rounded-xl hover:opacity-90 transition-all active:scale-[0.98]">
                Hitung Sekarang
              </button>
            </div>
          ) : (
            <div className="space-y-xl">
              <div>
                <h3 className="text-[14px] font-semibold text-foreground mb-md border-b border-border/50 pb-xs">Profil Biometrik</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-md gap-x-lg">
                  <div>
                    <p className="text-[12px] text-muted-foreground mb-1">Jenis Kelamin</p>
                    <p className="font-medium text-foreground capitalize">{calcData.form.gender === 'pria' ? 'Laki-laki' : 'Perempuan'}</p>
                  </div>
                  <div>
                    <p className="text-[12px] text-muted-foreground mb-1">Usia</p>
                    <p className="font-medium text-foreground tabular-nums">{calcData.form.usia} Tahun</p>
                  </div>
                  <div>
                    <p className="text-[12px] text-muted-foreground mb-1">Berat Badan</p>
                    <p className="font-medium text-foreground tabular-nums">{calcData.form.berat} kg</p>
                  </div>
                  <div>
                    <p className="text-[12px] text-muted-foreground mb-1">Tinggi Badan</p>
                    <p className="font-medium text-foreground tabular-nums">{calcData.form.tinggi} cm</p>
                  </div>
                  <div className="col-span-2 md:col-span-2">
                    <p className="text-[12px] text-muted-foreground mb-1">Tingkat Aktivitas Fisik (PAL)</p>
                    <p className="font-medium text-foreground">{getAktivitasLabel(calcData.form.aktivitas)}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-[14px] font-semibold text-foreground mb-md border-b border-border/50 pb-xs">Target Nutrisi Harian</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-md gap-x-lg">
                  <div>
                    <p className="text-[12px] text-muted-foreground mb-1">Target ({calcData.hasil.goalLabel})</p>
                    <p className="font-semibold text-primary text-[18px] tabular-nums">{formatNum(calcData.hasil.target)} kkal</p>
                  </div>
                  <div>
                    <p className="text-[12px] text-muted-foreground mb-1">TDEE</p>
                    <p className="font-medium text-foreground tabular-nums">{formatNum(calcData.hasil.tdee)} kkal</p>
                  </div>
                  <div>
                    <p className="text-[12px] text-muted-foreground mb-1">BMR</p>
                    <p className="font-medium text-foreground tabular-nums">{formatNum(calcData.hasil.bmr)} kkal</p>
                  </div>
                  <div>
                    <p className="text-[12px] text-muted-foreground mb-1">Karbohidrat</p>
                    <p className="font-medium text-foreground tabular-nums">{calcData.hasil.karbo} g</p>
                  </div>
                  <div>
                    <p className="text-[12px] text-muted-foreground mb-1">Protein</p>
                    <p className="font-medium text-foreground tabular-nums">{calcData.hasil.protein} g</p>
                  </div>
                  <div>
                    <p className="text-[12px] text-muted-foreground mb-1">Lemak</p>
                    <p className="font-medium text-foreground tabular-nums">{calcData.hasil.lemak} g</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="bg-card rounded-[24px] border border-border p-md md:p-xl space-y-md reveal reveal-delay-200 shadow-sm">
          <div className="flex justify-between items-center">
            <h2 className="text-[18px] tracking-tight text-primary font-semibold flex items-center gap-sm">
              <span className="material-symbols-outlined text-[22px]">history</span>
              Riwayat Scan
            </h2>
            <button onClick={() => navigate("/deteksi")} className="text-secondary text-[13px] font-semibold hover:underline flex items-center gap-xs">
              Scan baru <span className="material-symbols-outlined text-[16px]">add</span>
            </button>
          </div>
          <ul className="space-y-sm">
            {displayHistory.map((item) => (
              <li key={item.id} className="flex items-center gap-md bg-surface p-md rounded-xl border border-border hover:border-secondary transition-colors group cursor-pointer shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-secondary text-[20px]">document_scanner</span>
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-[15px] text-foreground font-medium truncate">{item.bahan}</p>
                  <p className="text-[12px] text-muted-foreground mt-0.5">{item.waktu}</p>
                </div>
                <div className="flex items-center gap-sm flex-shrink-0">
                  <span className={`text-[13px] font-semibold px-sm py-xs rounded-full tabular-nums ${item.skor >= 85 ? "bg-secondary/10 text-secondary" : item.skor >= 70 ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>
                    {item.skor}
                  </span>
                  <span className="material-symbols-outlined text-muted-foreground group-hover:text-secondary transition-colors text-[18px]">chevron_right</span>
                </div>
              </li>
            ))}
          </ul>
          {scanHistory.length === 0 && (
            <p className="text-[12px] text-muted-foreground/60 italic text-center pt-xs leading-relaxed">* Data riwayat ini adalah contoh tampilan. Riwayat asli tersimpan setelah scan.</p>
          )}
        </section>

        <section className="space-y-md reveal reveal-delay-200">
          <h2 className="text-[18px] tracking-tight text-primary font-semibold flex items-center gap-sm">
            <span className="material-symbols-outlined text-[22px]">apps</span>
            Akses Cepat
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-md">
            {quickAccess.map((item) => (
              <li key={item.label}>
                <button onClick={() => navigate(item.to)}
                  className="w-full flex items-center gap-md bg-card p-md rounded-xl border border-border hover:border-secondary hover:-translate-y-0.5 shadow-sm cursor-pointer group text-left transition-all">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-secondary text-[20px]">{item.icon}</span>
                  </div>
                  <div className="flex-grow">
                    <p className="text-[15px] text-foreground font-semibold group-hover:text-secondary transition-colors">{item.label}</p>
                    <p className="text-[13px] text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                  <span className="material-symbols-outlined text-muted-foreground group-hover:text-secondary transition-colors text-[20px]">chevron_right</span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-md reveal reveal-delay-300">
          <h2 className="text-[18px] tracking-tight text-primary font-semibold flex items-center gap-sm">
            <span className="material-symbols-outlined text-[22px]">settings</span>
            Pengaturan Akun
          </h2>
          <ul className="space-y-sm">
            <li>
              <button onClick={() => setModal("password")}
                className="w-full flex items-center gap-md bg-card p-md rounded-xl border border-border hover:border-secondary transition-colors group text-left shadow-sm">
                <span className="material-symbols-outlined text-muted-foreground text-[20px] flex-shrink-0 group-hover:text-secondary transition-colors">lock_reset</span>
                <div className="flex-grow">
                  <p className="text-[15px] text-foreground font-semibold group-hover:text-secondary transition-colors">Ganti Password</p>
                  <p className="text-[13px] text-muted-foreground mt-0.5">Perbarui kata sandi akunmu</p>
                </div>
                <span className="material-symbols-outlined text-muted-foreground group-hover:text-secondary transition-colors text-[20px]">chevron_right</span>
              </button>
            </li>
            <li>
              <button onClick={handleLogout}
                className="w-full flex items-center justify-center gap-sm bg-surface border border-border text-foreground font-semibold py-md rounded-xl hover:bg-surface-alt transition-colors active:scale-[0.98]">
                <span className="material-symbols-outlined text-[20px] text-muted-foreground">logout</span>
                Keluar dari Akun
              </button>
            </li>
            <li>
              <button onClick={() => setModal("hapus")}
                className="w-full flex items-center justify-center gap-sm text-muted-foreground text-[13px] font-medium hover:text-destructive transition-colors py-sm">
                <span className="material-symbols-outlined text-[16px]">delete_forever</span>
                Hapus Akun
              </button>
            </li>
          </ul>
        </section>

      </main>
    </>
  );
}