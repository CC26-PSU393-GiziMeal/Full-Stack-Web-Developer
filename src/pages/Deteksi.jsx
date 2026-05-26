import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

const SUPPORTED_INGREDIENTS = [
  "Wortel", "Tomat", "Bawang", "Bayam", "Ikan", "Ayam",
  "Daging Sapi", "Telur", "Tahu", "Tempe",
];

export default function DeteksiPage() {
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const isLogged = !!localStorage.getItem('authToken');

  // If not logged, show lock screen
  if (!isLogged) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen p-8">
        <h2 className="text-2xl font-bold text-primary mb-4">Akses Terbatas</h2>
        <p className="mb-6 text-center text-on-surface-variant max-w-md">
          Untuk menggunakan fitur deteksi, silakan masuk terlebih dahulu.
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
  const MAX_IMAGES = 15;

  const addFiles = (files) => {
    const valid = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, MAX_IMAGES - images.length);
    const previews = valid.map((file) => ({
      id: crypto.randomUUID(),
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    if (previews.length > 0) {
      setImages((prev) => [...prev, ...previews]);
    }
  };

  const removeImage = (id) => setImages((prev) => prev.filter((img) => img.id !== id));
  const handleDrop = (e) => { e.preventDefault(); setIsDragging(false); addFiles(e.dataTransfer.files); };
  const handleFileInput = (e) => {
    addFiles(e.target.files);
    e.target.value = "";
  };

  return (
    <main className="flex-grow max-w-7xl mx-auto w-full px-container-margin md:px-lg py-xl md:py-xxl grid grid-cols-1 md:grid-cols-12 gap-lg md:gap-xl">
      {/* ── Left Column ─────────────────────────────── */}
      <section className="md:col-span-8 flex flex-col gap-lg md:gap-xl reveal-left">

        {/* Header */}
        <div className="flex flex-col gap-sm">
          <h1 className="text-[40px] leading-[48px] tracking-tight font-bold text-on-background">
            Deteksi Bahan
          </h1>
          <p className="text-[20px] leading-7 font-semibold text-primary mt-xs">
            Foto bahan makananmu, dapatkan rekomendasi menu gizi seimbang.
          </p>
          <p className="text-[16px] leading-6 text-on-surface-variant max-w-2xl mt-xs">
            Cukup unggah foto bahan yang ada di dapurmu. GiziMeal akan mengenali
            bahan tersebut dan memberikan rekomendasi menu lengkap dengan informasi gizinya.
          </p>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-md mt-lg">
            {["Unggah foto bahan", "Sistem mendeteksi", "Dapat rekomendasi menu"].map((label, i) => (
              <div key={i} className="flex items-center gap-sm p-sm bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-on-primary font-bold text-[12px] flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-[14px] font-semibold text-on-surface">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Drop Zone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`bg-surface-container-lowest border-2 border-dashed rounded-2xl p-xl flex flex-col items-center justify-center text-center gap-md min-h-[360px] cursor-pointer transition-all group
            ${isDragging ? "border-primary bg-primary-fixed/20" : "border-outline-variant hover:border-primary"}`}
        >
          <div className={`p-lg rounded-full transition-colors shadow-sm ${isDragging ? "bg-primary-container text-on-primary-container" : "bg-surface-container-low group-hover:bg-primary-container group-hover:text-on-primary-container"}`}>
            <span className="material-symbols-outlined text-4xl">cloud_upload</span>
          </div>
          <div>
            <p className="text-[20px] font-semibold text-on-surface mb-xs">Drag &amp; Drop foto di sini</p>
            <p className="text-[16px] text-on-surface-variant">atau klik untuk menelusuri dari perangkat</p>
          </div>
          <p className="text-[12px] tracking-wide text-outline mt-sm">
            Mendukung JPG, PNG, WEBP. Maks 5MB per file.
          </p>
          <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden" onChange={handleFileInput} onClick={(e) => e.stopPropagation()} />
        </div>

        {/* Preview Grid */}
        {images.length > 0 && (
          <div className="flex flex-col gap-md">
            <h3 className="text-[14px] font-semibold tracking-wide text-on-surface">
              Foto Terpilih ({images.length}/{MAX_IMAGES})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-sm">
              {images.map((img) => (
                <div key={img.id} className="aspect-square rounded-xl bg-surface-container-high relative overflow-hidden group">
                  <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                  <button
                    onClick={(e) => { e.stopPropagation(); removeImage(img.id); }}
                    className="absolute top-xs right-xs bg-error text-on-error p-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="material-symbols-outlined text-sm leading-none">close</span>
                  </button>
                </div>
              ))}
              {images.length < MAX_IMAGES && (
                <button
                  onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                  className="aspect-square border border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center text-outline hover:border-primary hover:text-primary hover:bg-surface-container-low transition-colors bg-surface-container-lowest"
                >
                  <span className="material-symbols-outlined mb-xs">add_photo_alternate</span>
                  <span className="text-[12px] font-medium">Tambah Foto</span>
                </button>
              )}
            </div>

            {/* CTA — centered per mockup */}
            <div className="flex justify-center mt-lg">
              <button
                onClick={() => { if (images.length > 0) navigate("/deteksi/hasil"); }}
                disabled={images.length === 0}
                className="bg-primary text-on-primary text-[14px] font-semibold px-xl py-md rounded-xl flex items-center gap-sm hover:bg-surface-tint transition-colors active:scale-95 shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none"
              >
                <span className="material-symbols-outlined">troubleshoot</span>
                Mulai Deteksi
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ── Right Sidebar ────────────────────────────── */}
      <aside className="md:col-span-4 flex flex-col gap-lg reveal-right reveal-delay-100">
        {/* Tips Card */}
        <div className="bg-secondary-container text-on-secondary-container rounded-2xl p-lg border border-secondary-fixed-dim shadow-sm">
          <div className="flex items-center gap-sm mb-lg pb-sm border-b border-secondary-fixed-dim">
            <span className="material-symbols-outlined text-secondary">lightbulb</span>
            <h3 className="text-[20px] font-semibold text-secondary">TIPS FOTO</h3>
          </div>
          <ul className="flex flex-col gap-md text-[16px]">
            {[
              ["Cahaya cukup", "Pastikan foto terang dan tidak buram."],
              ["1 bahan per foto", "Hindari menumpuk bahan berbeda."],
              ["Background polos", "Gunakan latar belakang yang kontras."],
            ].map(([bold, rest]) => (
              <li key={bold} className="flex items-start gap-sm">
                <span className="material-symbols-outlined text-secondary text-base mt-1 flex-shrink-0">check_circle</span>
                <span className="leading-relaxed"><strong>{bold}:</strong> {rest}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Supported Ingredients */}
        <div className="bg-surface-container-lowest rounded-2xl p-lg border border-outline-variant shadow-sm">
          <div className="flex items-center gap-sm mb-lg pb-sm border-b border-outline-variant">
            <span className="material-symbols-outlined text-on-surface">format_list_bulleted</span>
            <h3 className="text-[20px] font-semibold text-on-surface">BAHAN DIDUKUNG</h3>
          </div>
          <div className="flex flex-wrap gap-sm">
            {SUPPORTED_INGREDIENTS.map((item) => (
              <span key={item} className="bg-surface-container px-md py-xs rounded-full text-[12px] font-medium tracking-wide text-on-surface-variant border border-outline-variant">
                {item}
              </span>
            ))}
            <span className="bg-surface-container px-md py-xs rounded-full text-[12px] font-semibold text-primary border border-outline-variant">
              + 50 lainnya
            </span>
          </div>
          <div className="mt-lg pt-md border-t border-outline-variant text-center">
            <Link to="/database" className="text-[14px] font-semibold text-primary hover:text-surface-tint underline hover:no-underline transition-all">
              Lihat Database Lengkap
            </Link>
          </div>
        </div>
      </aside>
    </main>
  );
}