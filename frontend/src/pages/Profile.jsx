/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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
  const [loading, setLoading] = useState(false);

  const toggle = (k) => setShow((s) => ({ ...s, [k]: !s[k] }));
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async () => {
    if (!form.lama || !form.baru || !form.konfirmasi) { setError("Semua field wajib diisi."); return; }
    if (form.baru.length < 8) { setError("Password baru minimal 8 karakter."); return; }
    if (form.baru !== form.konfirmasi) { setError("Konfirmasi password tidak cocok."); return; }

    setError("");
    setLoading(true);

    try {
      const userRaw = localStorage.getItem("user");
      if (!userRaw) {
        throw new Error("Sesi Anda telah berakhir. Silakan login kembali.");
      }
      const userId = JSON.parse(userRaw).id;

      const response = await fetch("https://gizimeal.up.railway.app/users/changePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: userId,
          passwordBaru: form.baru
        }),
      });

      const jsonResult = await response.json();

      if (!response.ok) {
        throw new Error(jsonResult.error || "Gagal memperbarui kata sandi.");
      }

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Kata sandi Anda berhasil diperbarui.",
        confirmButtonColor: "var(--color-primary, #00935D)",
      });
      onClose();
    } catch (err) {
      console.error("Ganti Password Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-surface-container-low border border-outline-variant rounded-lg py-[14px] pl-md pr-12 text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all text-[15px]";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-md">
      <div className="bg-surface-container-lowest rounded-[24px] border border-outline-variant p-xl w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-lg">
          <h3 className="text-[20px] tracking-tight text-primary font-semibold">Ganti Password</h3>
          <button onClick={onClose} disabled={loading} className="text-on-surface-variant hover:text-on-surface p-1 rounded-full transition-colors disabled:opacity-30">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="space-y-md">
          {[
            { key: "lama", label: "Password Lama" },
            { key: "baru", label: "Password Baru" },
            { key: "konfirmasi", label: "Konfirmasi Password Baru" },
          ].map(({ key, label }) => (
            <div key={key} className="space-y-xs">
              <label className="text-[14px] font-semibold text-on-surface">{label}</label>
              <div className="relative">
                <input
                  type={show[key] ? "text" : "password"}
                  value={form[key]}
                  onChange={set(key)}
                  disabled={loading}
                  placeholder="••••••••"
                  className={`${inputClass} disabled:opacity-50`}
                />
                <button type="button" onClick={() => toggle(key)} disabled={loading} className="absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface disabled:opacity-30">
                  <span className="material-symbols-outlined text-[18px]">{show[key] ? "visibility_off" : "visibility"}</span>
                </button>
              </div>
            </div>
          ))}
          {error && <p className="text-[13px] text-destructive font-medium">{error}</p>}
          <button
            onClick={submit}
            disabled={loading}
            className="w-full bg-primary text-on-primary font-semibold py-md rounded-xl hover:bg-surface-tint transition-all active:scale-[0.98] mt-sm flex items-center justify-center gap-sm shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading && <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>}
            {loading ? "Menyimpan..." : "Simpan Password"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ModalHapusAkun({ onClose, onConfirm }) {
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    if (confirm !== "HAPUS") return;
    setError("");
    setLoading(true);
    try {
      const userRaw = localStorage.getItem("user");
      if (!userRaw) throw new Error("Sesi tidak ditemukan. Silakan login kembali.");
      const userId = JSON.parse(userRaw).id;

      const res = await fetch(`https://gizimeal.up.railway.app/users/account/${userId}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menghapus akun");

      onConfirm();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-surface-container-low border border-outline-variant rounded-lg py-[14px] px-md text-on-surface placeholder:text-outline/60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-[15px]";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-md">
      <div className="bg-surface-container-lowest rounded-[24px] border border-outline-variant p-xl w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-md">
          <h3 className="text-[20px] tracking-tight text-destructive font-semibold">Hapus Akun</h3>
          <button onClick={onClose} disabled={loading} className="text-on-surface-variant hover:text-on-surface p-1 rounded-full transition-colors disabled:opacity-30">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div className="bg-red-50 dark:bg-red-950/80 border border-red-200 dark:border-red-900/50 rounded-xl p-md mb-lg flex gap-sm">
          <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-[20px] flex-shrink-0 mt-0.5">warning</span>
          <p className="text-[14px] leading-relaxed text-red-800 dark:text-red-200">
            Tindakan ini <strong className="text-red-700 dark:text-red-300 font-bold bg-red-100 dark:bg-red-900/40 px-1.5 py-0.5 rounded border border-red-200 dark:border-red-800/50 mx-0.5">tidak dapat dibatalkan</strong>. Seluruh data akun, riwayat scan, dan data kalkulator akan dihapus secara permanen.
          </p>
        </div>

        <div className="space-y-sm mb-lg">
          <label className="text-[14px] font-semibold text-on-surface">Ketik <span className="text-red-600 dark:text-red-400 font-mono font-bold bg-red-100 dark:bg-red-900/40 px-2 py-0.5 rounded border border-red-200 dark:border-red-800/50 mx-1">HAPUS</span> untuk konfirmasi</label>
          <input
            type="text"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            disabled={loading}
            placeholder="HAPUS"
            className={inputClass}
          />
        </div>

        {error && <p className="text-[13px] text-destructive font-medium mb-md">{error}</p>}

        <div className="flex gap-sm">
          <button onClick={onClose} disabled={loading} className="flex-1 bg-surface border border-outline-variant text-on-surface font-semibold py-md rounded-xl hover:bg-surface-container-low transition-colors disabled:opacity-50">
            Batal
          </button>
          <button
            onClick={submit}
            disabled={confirm !== "HAPUS" || loading}
            className="flex-1 bg-destructive text-destructive-foreground font-semibold py-md rounded-xl hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-xs"
          >
            {loading && <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>}
            {loading ? "Menghapus..." : "Hapus Akun"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const isLogged = !!localStorage.getItem("authToken");

  const [userProfile, setUserProfile] = useState({ name: "Pengguna", email: "", username: "" });
  const [calcData, setCalcData] = useState(null);
  const [biometrik, setBiometrik] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);
  const [recipeHistory, setRecipeHistory] = useState([]);
  const [modal, setModal] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingRecipeHistory, setLoadingRecipeHistory] = useState(true);

  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [formEdit, setFormEdit] = useState({ firstName: "", lastName: "" });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");

  const handleStartEdit = () => {
    try {
      const userRaw = localStorage.getItem("user");
      if (userRaw) {
        const parsed = JSON.parse(userRaw);
        const metadata = parsed.user_metadata || {};
        setFormEdit({
          firstName: metadata.firstName || "",
          lastName: metadata.lastName || ""
        });
      }
    } catch (err) {
      console.error(err);
    }
    setIsEditingAccount(true);
    setEditError("");
  };

  const handleSaveAccount = async () => {
    if (!formEdit.firstName.trim()) {
      setEditError("Nama depan wajib diisi.");
      return;
    }
    setEditError("");
    setEditLoading(true);
    try {
      const userRaw = localStorage.getItem("user");
      if (!userRaw) throw new Error("Sesi tidak ditemukan. Silakan login kembali.");
      const parsed = JSON.parse(userRaw);
      const userId = parsed.id;

      const res = await fetch(`https://gizimeal.up.railway.app/users/account/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formEdit)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal update akun");

      const oldUser = JSON.parse(userRaw);
      oldUser.user_metadata = { 
        ...oldUser.user_metadata, 
        firstName: formEdit.firstName, 
        lastName: formEdit.lastName 
      };
      localStorage.setItem("user", JSON.stringify(oldUser));

      const first = formEdit.firstName || "";
      const last = formEdit.lastName || "";
      setUserProfile(prev => ({ 
        ...prev, 
        name: `${first} ${last}`.trim() || "Pengguna GiziMeal" 
      }));

      setIsEditingAccount(false);

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Informasi akun berhasil diperbarui.",
        confirmButtonColor: "var(--color-primary, #00935D)",
      });
    } catch (err) {
      setEditError(err.message);
    } finally {
      setEditLoading(false);
    }
  };

  useEffect(() => {
    if (!isLogged) return;
    const userRaw = localStorage.getItem("user");
    if (userRaw) {
      try {
        const parsed = JSON.parse(userRaw);
        const metadata = parsed.user_metadata || {};
        const first = metadata.firstName || "";
        const last = metadata.lastName || "";
        setUserProfile({
          name: `${first} ${last}`.trim() || "Pengguna GiziMeal",
          email: parsed.email || "",
          username: parsed.email ? parsed.email.split("@")[0] : "user"
        });
      } catch (err) {
        console.error("Gagal membaca session user lokal", err);
      }
    }

    const fetchBackendData = async () => {
      try {
        const userRaw = localStorage.getItem("user");
        if (!userRaw) return;
        const userId = JSON.parse(userRaw).id;

        const response = await fetch(`https://gizimeal.up.railway.app/users/profile/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setCalcData(data.calcData);
          setBiometrik(data.biometrikData);
          setScanHistory(data.scanHistory || []);
        }
      } catch (err) {
        console.error("Gagal memuat data profil dari server:", err);
      } finally {
        setLoadingData(false);
      }
    };

    const fetchRecipeHistoryFromSupabase = async () => {
      try {
        setLoadingRecipeHistory(true);
        const userRaw = localStorage.getItem("user");
        if (!userRaw) return;
        const userId = JSON.parse(userRaw).id;

        const response = await fetch(`https://gizimeal.up.railway.app/recipe-history/${userId}`);
        const json = await response.json();

        if (response.ok && json.success) {
          setRecipeHistory(json.data);
        }
      } catch (err) {
        console.error("Gagal memuat riwayat resep dari Supabase:", err);
      } finally {
        setLoadingRecipeHistory(false);
      }
    };

    fetchBackendData();
    fetchRecipeHistoryFromSupabase();
  }, [isLogged]);

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
    localStorage.clear();
    navigate("/");
  };

  const handleHapusAkun = () => {
    localStorage.clear();
    navigate("/");
  };

  const quickAccess = [
    { icon: "calculate", label: "Kalkulator AKG", desc: "Hitung kebutuhan kalori harianmu", to: "/kalkulator" },
    { icon: "troubleshoot", label: "Deteksi Bahan", desc: "Scan bahan makanan & dapatkan rekomendasi", to: "/deteksi" },
    { icon: "database", label: "Tabel Gizi", desc: "Cari informasi nutrisi bahan makanan", to: "/database" },
  ];

  const accountItems = [
    { label: "Nama Lengkap", value: userProfile.name, icon: "badge" },
    { label: "Username", value: `@${userProfile.username}`, icon: "alternate_email" },
    { label: "Email", value: userProfile.email, icon: "mail" },
  ];

  const biometrikItems = [
    {
      label: "Jenis Kelamin",
      value: biometrik ? (biometrik.gender === 'pria' ? 'Laki-laki' : 'Perempuan') : "–",
      icon: "wc"
    },
    {
      label: "Usia Pengguna",
      value: biometrik ? `${biometrik.usia} Tahun` : "–",
      icon: "cake"
    },
    {
      label: "Berat Badan",
      value: biometrik ? `${biometrik.berat} kg` : "–",
      icon: "weight"
    },
    {
      label: "Tinggi Badan",
      value: biometrik ? `${biometrik.tinggi} cm` : "–",
      icon: "straighten"
    },
  ];

  return (
    <>
      {modal === "password" && <ModalGantiPassword onClose={() => setModal(null)} />}
      {modal === "hapus" && <ModalHapusAkun onClose={() => setModal(null)} onConfirm={handleHapusAkun} />}


      <main className="flex-grow w-full max-w-5xl mx-auto px-container-margin md:px-lg py-xl md:py-lg space-y-lg">

        {/* Top Header Card */}
        <section className="flex flex-col items-center text-center gap-md reveal">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border-4 border-surface">
              <span className="text-primary text-[32px] font-semibold">{getInitials(userProfile.name)}</span>
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-secondary rounded-full border-2 border-surface flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary-foreground text-[14px]">check</span>
            </div>
          </div>
          <div className="space-y-xs">
            <h1 className="text-[24px] tracking-tight text-foreground font-semibold">{userProfile.name}</h1>
            <p className="text-[14px] text-secondary font-medium">
              @{userProfile.username}
              {biometrik && ` • ${biometrik.gender === 'pria' ? 'Laki-laki' : 'Perempuan'}, ${biometrik.usia} Thn`}
            </p>
            <p className="text-[15px] text-muted-foreground">{userProfile.email}</p>
          </div>
        </section>

        {/* SECTION 1: Informasi Akun */}
        <section className="bg-card rounded-[24px] border border-border p-md md:p-xl space-y-md reveal shadow-sm">
          <div className="flex justify-between items-center">
            <h2 className="text-[18px] tracking-tight text-primary font-semibold flex items-center gap-sm">
              <span className="material-symbols-outlined text-[22px]">person</span>
              Informasi Akun
            </h2>
            {!isEditingAccount && (
              <button onClick={handleStartEdit} className="text-muted-foreground hover:text-primary transition-colors p-1" title="Edit Informasi Akun">
                <span className="material-symbols-outlined text-[20px]">edit</span>
              </button>
            )}
          </div>
          {isEditingAccount ? (
            <div className="space-y-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                <div className="space-y-xs">
                  <label className="text-[14px] font-semibold text-on-surface">Nama Depan</label>
                  <input
                    type="text"
                    value={formEdit.firstName}
                    onChange={(e) => setFormEdit({ ...formEdit, firstName: e.target.value })}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg py-[12px] px-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all text-[15px]"
                    disabled={editLoading}
                    placeholder="Masukkan nama depan"
                  />
                </div>
                <div className="space-y-xs">
                  <label className="text-[14px] font-semibold text-on-surface">Nama Belakang</label>
                  <input
                    type="text"
                    value={formEdit.lastName}
                    onChange={(e) => setFormEdit({ ...formEdit, lastName: e.target.value })}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg py-[12px] px-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all text-[15px]"
                    disabled={editLoading}
                    placeholder="Masukkan nama belakang"
                  />
                </div>
              </div>
              <div className="flex items-center gap-md py-md border-b border-border/50 opacity-60">
                <span className="material-symbols-outlined text-muted-foreground text-[24px] flex-shrink-0">alternate_email</span>
                <div className="flex-grow min-w-0">
                  <p className="text-[12px] font-medium tracking-[0.05em] uppercase text-muted-foreground">Username</p>
                  <p className="text-[15px] text-foreground font-medium truncate">@{userProfile.username}</p>
                </div>
              </div>
              <div className="flex items-center gap-md py-md opacity-60">
                <span className="material-symbols-outlined text-muted-foreground text-[24px] flex-shrink-0">mail</span>
                <div className="flex-grow min-w-0">
                  <p className="text-[12px] font-medium tracking-[0.05em] uppercase text-muted-foreground">Email</p>
                  <p className="text-[15px] text-foreground font-medium truncate">{userProfile.email}</p>
                </div>
              </div>
              {editError && <p className="text-[13px] text-destructive font-medium">{editError}</p>}
              <div className="flex gap-sm pt-sm border-t border-border/30">
                <button
                  onClick={() => setIsEditingAccount(false)}
                  disabled={editLoading}
                  className="flex-1 bg-surface border border-outline-variant text-on-surface font-semibold py-md rounded-xl hover:bg-surface-container-low transition-colors disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveAccount}
                  disabled={editLoading}
                  className="flex-1 bg-primary text-on-primary font-semibold py-md rounded-xl hover:bg-surface-tint transition-all active:scale-[0.98] flex items-center justify-center gap-sm shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {editLoading && <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>}
                  {editLoading ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>
            </div>
          ) : (
            <ul className="flex flex-col">
              {accountItems.map((item, idx) => (
                <li key={item.label} className={`flex items-center gap-md py-md ${idx !== accountItems.length - 1 ? 'border-b border-border/50' : ''}`}>
                  <span className="material-symbols-outlined text-muted-foreground text-[24px] flex-shrink-0">{item.icon}</span>
                  <div className="flex-grow min-w-0">
                    <p className="text-[12px] font-medium tracking-[0.05em] uppercase text-muted-foreground">{item.label}</p>
                    <p className="text-[15px] text-foreground font-medium truncate">{item.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* SECTION 2: Informasi Fisik & Biometrik */}
        <section className="bg-card rounded-[24px] border border-border p-md md:p-xl space-y-md reveal shadow-sm">
          <div className="flex justify-between items-center">
            <h2 className="text-[18px] tracking-tight text-primary font-semibold flex items-center gap-sm">
              <span className="material-symbols-outlined text-[22px]">accessibility_new</span>
              Informasi Fisik & Biometrik
            </h2>
            <button onClick={() => navigate("/kalkulator")} className="text-muted-foreground hover:text-primary transition-colors p-1" title="Edit Informasi Fisik & Biometrik">
              <span className="material-symbols-outlined text-[20px]">edit</span>
            </button>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-lg">
            {biometrikItems.map((item) => (
              <li key={item.label} className="flex items-center gap-md py-md border-b border-border/50">
                <span className="material-symbols-outlined text-muted-foreground text-[24px] flex-shrink-0">{item.icon}</span>
                <div className="flex-grow min-w-0">
                  <p className="text-[12px] font-medium tracking-[0.05em] uppercase text-muted-foreground">{item.label}</p>
                  <p className="text-[15px] text-foreground font-medium truncate">{item.value}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Target Kebutuhan Nutrisi Harian */}
        <section className="bg-card rounded-[24px] border border-border p-md md:p-xl space-y-md reveal shadow-sm">
          <h2 className="text-[18px] tracking-tight text-primary font-semibold flex items-center gap-sm">
            <span className="material-symbols-outlined text-[22px]">monitor_weight</span>
            Target Kebutuhan Nutrisi Harian
          </h2>

          {loadingData ? (
            <p className="text-center py-md text-muted-foreground text-[14px]">Menyelaraskan data nutrisi...</p>
          ) : !calcData ? (
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
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-md gap-x-lg">
                  <div>
                    <p className="text-[12px] text-muted-foreground mb-1">Target Kalori ({calcData.goalLabel})</p>
                    <p className="font-semibold text-primary text-[18px] tabular-nums">{formatNum(calcData.target)} kkal</p>
                  </div>
                  <div>
                    <p className="text-[12px] text-muted-foreground mb-1">TDEE</p>
                    <p className="font-medium text-foreground tabular-nums">{formatNum(calcData.tdee)} kkal</p>
                  </div>
                  <div>
                    <p className="text-[12px] text-muted-foreground mb-1">BMR</p>
                    <p className="font-medium text-foreground tabular-nums">{formatNum(calcData.bmr)} kkal</p>
                  </div>
                </div>

                <div className="mt-lg pt-md border-t border-border/30">
                  <h4 className="text-[13px] font-semibold text-foreground mb-sm">Kebutuhan Zat Gizi Makro</h4>
                  <div className="grid grid-cols-3 gap-md">
                    <div className="bg-surface-alt p-sm rounded-xl border border-border/50 text-center">
                      <p className="text-[11px] text-muted-foreground uppercase font-medium">Karbohidrat</p>
                      <p className="font-bold text-foreground text-[16px] mt-xs tabular-nums">{calcData.karbo} g</p>
                    </div>
                    <div className="bg-surface-alt p-sm rounded-xl border border-border/50 text-center">
                      <p className="text-[11px] text-muted-foreground uppercase font-medium">Protein</p>
                      <p className="font-bold text-foreground text-[16px] mt-xs tabular-nums">{calcData.protein} g</p>
                    </div>
                    <div className="bg-surface-alt p-sm rounded-xl border border-border/50 text-center">
                      <p className="text-[11px] text-muted-foreground uppercase font-medium">Lemak</p>
                      <p className="font-bold text-foreground text-[16px] mt-xs tabular-nums">{calcData.lemak} g</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Riwayat Scan */}
<section className="bg-card rounded-[24px] border border-border p-md md:p-xl space-y-md reveal shadow-sm">
  <div className="flex justify-between items-center">
    <h2 className="text-[18px] tracking-tight text-primary font-semibold flex items-center gap-sm">
      <span className="material-symbols-outlined text-[22px]">history</span>
      Riwayat Scan
    </h2>
    <button onClick={() => navigate("/deteksi")} className="text-secondary text-[13px] font-semibold hover:underline flex items-center gap-xs">
      Scan baru <span className="material-symbols-outlined text-[16px]">add</span>
    </button>
  </div>

  {loadingData ? (
    <p className="text-center py-sm text-muted-foreground">Memuat riwayat...</p>
  ) : scanHistory.length === 0 ? (
    <div className="text-center py-lg border border-dashed border-border rounded-xl">
      <p className="text-muted-foreground text-[14px]">Belum ada riwayat hasil deteksi makanan.</p>
    </div>
  ) : (
    <ul className="space-y-sm">
      {scanHistory.slice(0, 5).map((item, index) => (
        <li key={item.id || index} className="flex items-center gap-md bg-surface p-md rounded-xl border border-border hover:border-secondary transition-colors group cursor-pointer shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-secondary text-[20px]">document_scanner</span>
          </div>
          <div className="flex-grow min-w-0">
            <p className="text-[15px] text-foreground font-medium truncate">{item.bahan || "Bahan Makanan"}</p>
            <p className="text-[12px] text-muted-foreground mt-0.5">{item.waktu || "Baru saja"}</p>
          </div>
          <div className="flex items-center gap-sm flex-shrink-0">
            <span className={`text-[13px] font-semibold px-sm py-xs rounded-full tabular-nums ${item.skor >= 85 ? "bg-secondary/10 text-secondary" : item.skor >= 70 ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>
              {item.skor}%
            </span>
            <span className="material-symbols-outlined text-muted-foreground group-hover:text-secondary transition-colors text-[18px]">chevron_right</span>
          </div>
        </li>
      ))}
    </ul>
  )}
</section>

        {/* ========================================================== */}
        {/* SEKSI RIWAYAT RESEP AI (TERINTEGRASI SUPABASE BACKEND)     */}
        {/* ========================================================== */}
        <section className="bg-card rounded-[24px] border border-border p-md md:p-xl space-y-md reveal shadow-sm">
          <div className="flex justify-between items-center">
            <h2 className="text-[18px] tracking-tight text-primary font-semibold flex items-center gap-sm">
              <span className="material-symbols-outlined text-[22px]">menu_book</span>
              Riwayat Resep AI
            </h2>
          </div>

          {loadingRecipeHistory ? (
            <p className="text-center py-md text-muted-foreground text-[14px]">Mengambil data resep dari database...</p>
          ) : recipeHistory.length === 0 ? (
            <div className="text-center py-lg border border-dashed border-border rounded-xl">
              <div className="w-14 h-14 bg-surface-alt rounded-full flex items-center justify-center mx-auto mb-sm border border-border">
                <span className="material-symbols-outlined text-[28px] text-muted-foreground">restaurant</span>
              </div>
              <p className="text-muted-foreground text-[14px]">Belum ada riwayat resep yang tersimpan.</p>
              <p className="text-muted-foreground text-[12px] mt-xs">Coba deteksi bahan makanan lalu buka detail menu untuk menyimpan resep.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[13px]">
                <thead>
                  <tr className="border-b border-border text-muted-foreground font-semibold">
                    <th className="pb-sm font-semibold text-[14px]">Nama Menu</th>
                    <th className="pb-sm font-semibold text-right text-[14px]">Waktu Dilihat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50 text-foreground">
                  {recipeHistory.slice(0, 5).map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => {
                        navigate(`/deteksi/hasil/${encodeURIComponent(item.menu_name)}`, {
                          state: {
                            recipe: item.recipe_data
                          }
                        });
                      }}
                      className="hover:bg-surface-alt/50 transition-all group cursor-pointer"
                    >
                      <td className="py-md font-medium text-foreground group-hover:text-primary transition-colors text-[14px]">
                        <div className="flex items-center gap-sm">
                          <span className="material-symbols-outlined text-primary text-[18px]">restaurant_menu</span>
                          {item.menu_name}
                        </div>
                      </td>
                      <td className="py-md text-right text-muted-foreground tabular-nums text-[13px]">
                        {new Date(item.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Akses Cepat */}
        <section className="space-y-md reveal">
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
                    <span className="material-symbols-outlined text-secondary text-[20px]"> {item.icon}</span>
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

        {/* Pengaturan Akun */}
        <section className="space-y-md reveal">
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