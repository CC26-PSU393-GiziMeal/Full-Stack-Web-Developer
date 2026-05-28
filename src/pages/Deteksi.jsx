import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

const SUPPORTED_INGREDIENTS = [
  "Wortel", "Tomat", "Bawang", "Bayam", "Ikan", "Ayam",
  "Daging Sapi", "Telur", "Tahu", "Tempe",
];

export default function DeteksiPage() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const isLogged = !!localStorage.getItem('authToken');

  // If not logged, show lock screen
  if (!isLogged) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen p-8">
        <h2 className="text-[24px] md:text-[32px] font-semibold tracking-tight text-primary mb-4">Akses Terbatas</h2>
        <p className="mb-6 text-center text-muted-foreground leading-relaxed max-w-md">
          Untuk menggunakan fitur deteksi, silakan masuk terlebih dahulu.
        </p>
        <button
          className="bg-primary text-primary-foreground font-semibold px-lg py-sm rounded-lg hover:opacity-90 transition-opacity"
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
          <h1 className="text-[28px] sm:text-[36px] md:text-[44px] leading-[1.05] tracking-tight font-semibold text-foreground">
            Deteksi Bahan
          </h1>
          <p className="text-[18px] md:text-[20px] font-medium text-primary mt-xs">
            Foto bahan makananmu, dapatkan rekomendasi menu gizi seimbang.
          </p>
          <p className="text-[15px] sm:text-[16px] md:text-[17px] leading-relaxed text-muted-foreground max-w-2xl mt-xs">
            Cukup unggah foto bahan yang ada di dapurmu. GiziMeal akan mengenali
            bahan tersebut dan memberikan rekomendasi menu lengkap dengan informasi gizinya.
          </p>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-md mt-lg">
            {["Unggah foto bahan", "Sistem mendeteksi", "Dapat rekomendasi menu"].map((label, i) => (
              <div key={i} className="flex items-center gap-sm p-sm bg-card rounded-xl border border-border shadow-sm">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold text-[12px] flex-shrink-0 tabular-nums">
                  {i + 1}
                </span>
                <span className="text-[14px] font-semibold text-foreground">{label}</span>
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
          className={`bg-card border-2 border-dashed rounded-2xl p-xl flex flex-col items-center justify-center text-center gap-md min-h-[360px] cursor-pointer transition-all group
            ${isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary"}`}
        >
          <div className={`p-lg rounded-full transition-colors shadow-sm ${isDragging ? "bg-primary/20 text-primary" : "bg-surface group-hover:bg-primary/10 group-hover:text-primary"}`}>
            <span className="material-symbols-outlined text-4xl text-muted-foreground group-hover:text-primary">cloud_upload</span>
          </div>
          <div>
            <p className="text-[20px] font-semibold text-foreground tracking-tight mb-xs">Drag & Drop foto di sini</p>
            <p className="text-[15px] text-muted-foreground">atau klik untuk menelusuri dari perangkat</p>
          </div>
          <p className="text-[12px] font-medium tracking-wide text-muted-foreground/60 mt-sm">
            Mendukung JPG, PNG, WEBP. Maks 5MB per file.
          </p>
          <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden" onChange={handleFileInput} onClick={(e) => e.stopPropagation()} />
        </div>

        {/* Preview Grid */}
        {images.length > 0 && (
          <div className="flex flex-col gap-md">
            <h3 className="text-[14px] font-semibold tracking-wide text-foreground">
              Foto Terpilih ({images.length}/{MAX_IMAGES})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-sm">
              {images.map((img) => (
                <div key={img.id} className="aspect-square rounded-xl bg-surface-alt relative overflow-hidden group border border-border">
                  <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                  <button
                    onClick={(e) => { e.stopPropagation(); removeImage(img.id); }}
                    className="absolute top-xs right-xs bg-destructive text-destructive-foreground p-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="material-symbols-outlined text-sm leading-none">close</span>
                  </button>
                </div>
              ))}
              {images.length < MAX_IMAGES && (
                <button
                  onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                  className="aspect-square border border-dashed border-border rounded-xl flex flex-col items-center justify-center text-muted-foreground hover:border-primary hover:text-primary hover:bg-surface transition-colors bg-card"
                >
                  <span className="material-symbols-outlined mb-xs">add_photo_alternate</span>
                  <span className="text-[12px] font-medium">Tambah Foto</span>
                </button>
              )}
            </div>

            {/* CTA — centered per mockup */}
            <div className="flex justify-center mt-lg">
              <button
                onClick={() => {
                  if (images.length === 0) return;
                  const resultData = images.length === 1 ? {
                    success: true,
                    mode: "single",
                    predictions: [
                      {
                        detected_item: "Cabbage",
                        confidence_percent: "90%",
                        filename: images[0].name
                      }
                    ],
                    menu_recommendations: [
                      {
                        rank: 1,
                        is_best: true,
                        menu_name: "Cabbage rolls",
                        matched_ingredients: 1,
                        score_akg: 36.65,
                        explanation: "Kubis/Cabbage gulung kukus isi daging gizi seimbang dengan porsi karbohidrat dan protein tinggi.",
                        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBY9aQq5fxrcpIrq1DZ999kqafcc2uEBeCsLIbfEfdiAvbdy0AcKWqGWj6h0tv0TJdEr5Au1XHdssYnGWgEvXUdj96RfJzgGagcApp4AfuYmmiF-K5z9uDyQSJpRkKxZOhTerEzrOBglkVZvsX34rmd0bbZ46mAJgAZ3pi5HGcCUAInGyEjBNJbEAbfFTiJzHkhbIMu2fducvQSBt7rCISCFHUmkUCiP7JNqiSOxOrBJRl2g8G7ZEyWExdzzI9LHKiQ6_VWKsz3qRQ",
                        kalori: 142.48,
                      },
                      {
                        rank: 2,
                        is_best: false,
                        menu_name: "Cabbage rolls alternative",
                        matched_ingredients: 1,
                        score_akg: 33.08,
                        explanation: "Sup kubis bening segar rendah kalori yang kaya serat dan vitamin.",
                        image: "https://lh3.googleusercontent.com/aida/ADBb0uhHuqVQFzPM-SuY6-fBGMX_nPyK3lRTQljxt4uc3NnF9JVMu3Wae0pdRBpxllu2-qp95lY85qi1AHT8h5J_nsrqMsDe5yMcLDjjZErzcZsQyu6nn-5dtPr_PWI8iM4KiYIkF3h14ogP7rofDy9lgmD1AP6QcC6AvJVNuz-lU7TXNbPAhusyCWrk17xbAJpnV83YGFDlIUaQ41j92omqZbuKcOT2BMrPqL1_MmbXmQr3rvwd8aLLd1OmySE",
                        kalori: 124.63,
                      }
                    ]
                  } : {
                    success: true,
                    mode: "multiple",
                    predictions: images.map((img, idx) => ({
                      detected_item: idx % 2 === 0 ? "Cabbage" : "Chilli",
                      confidence_percent: idx % 2 === 0 ? "90.04%" : "77.85%",
                      filename: img.name
                    })),
                    menu_recommendations: [
                      {
                        rank: 1,
                        is_best: true,
                        menu_name: "Carrot apple sandwich",
                        matched_ingredients: 1,
                        score_akg: 41.16,
                        explanation: "Carrot apple sandwich menempati posisi teratas dengan Skor AKG 41.16/100, tertinggi di antara menu yang cocok dengan bahan terdeteksi.",
                        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBY9aQq5fxrcpIrq1DZ999kqafcc2uEBeCsLIbfEfdiAvbdy0AcKWqGWj6h0tv0TJdEr5Au1XHdssYnGWgEvXUdj96RfJzgGagcApp4AfuYmmiF-K5z9uDyQSJpRkKxZOhTerEzrOBglkVZvsX34rmd0bbZ46mAJgAZ3pi5HGcCUAInGyEjBNJbEAbfFTiJzHkhbIMu2fducvQSBt7rCISCFHUmkUCiP7JNqiSOxOrBJRl2g8G7ZEyWExdzzI9LHKiQ6_VWKsz3qRQ",
                        kalori: 245.5,
                      },
                      {
                        rank: 2,
                        is_best: false,
                        menu_name: "Vegetable and mayonnaise sandwich",
                        matched_ingredients: 1,
                        score_akg: 26.63,
                        explanation: "Vegetable and mayonnaise sandwich menempati posisi kedua dengan Skor AKG 26.63/100, menyajikan perpaduan sayuran segar dengan saus mayones yang lezat.",
                        image: "https://lh3.googleusercontent.com/aida/ADBb0uhHuqVQFzPM-SuY6-fBGMX_nPyK3lRTQljxt4uc3NnF9JVMu3Wae0pdRBpxllu2-qp95lY85qi1AHT8h5J_nsrqMsDe5yMcLDjjZErzcZsQyu6nn-5dtPr_PWI8iM4KiYIkF3h14ogP7rofDy9lgmD1AP6QcC6AvJVNuz-lU7TXNbPAhusyCWrk17xbAJpnV83YGFDlIUaQ41j92omqZbuKcOT2BMrPqL1_MmbXmQr3rvwd8aLLd1OmySE",
                        kalori: 185.2,
                      }
                    ]
                  };
                  navigate("/deteksi/hasil", { state: { result: resultData } });
                }}
                disabled={images.length === 0}
                className="bg-primary text-primary-foreground text-[14px] font-semibold px-xl py-md rounded-xl flex items-center gap-sm hover:opacity-90 transition-colors active:scale-95 shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none"
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
        <div className="bg-secondary/10 text-secondary-foreground rounded-2xl p-lg border border-secondary/20 shadow-sm">
          <div className="flex items-center gap-sm mb-lg pb-sm border-b border-secondary/20">
            <span className="material-symbols-outlined text-secondary">lightbulb</span>
            <h3 className="text-[18px] font-semibold tracking-tight text-secondary">TIPS FOTO</h3>
          </div>
          <ul className="flex flex-col gap-md text-[15px]">
            {[
              ["Cahaya cukup", "Pastikan foto terang dan tidak buram."],
              ["1 bahan per foto", "Hindari menumpuk bahan berbeda."],
              ["Background polos", "Gunakan latar belakang yang kontras."],
            ].map(([bold, rest]) => (
              <li key={bold} className="flex items-start gap-sm">
                <span className="material-symbols-outlined text-secondary text-base mt-1 flex-shrink-0">check_circle</span>
                <span className="leading-relaxed"><span className="font-semibold">{bold}:</span> {rest}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Supported Ingredients */}
        <div className="bg-card rounded-2xl p-lg border border-border shadow-sm">
          <div className="flex items-center gap-sm mb-lg pb-sm border-b border-border">
            <span className="material-symbols-outlined text-foreground">format_list_bulleted</span>
            <h3 className="text-[18px] font-semibold tracking-tight text-foreground">BAHAN DIDUKUNG</h3>
          </div>
          <div className="flex flex-wrap gap-sm">
            {SUPPORTED_INGREDIENTS.map((item) => (
              <span key={item} className="bg-surface px-md py-xs rounded-full text-[12px] font-medium tracking-wide text-muted-foreground border border-border">
                {item}
              </span>
            ))}
            <span className="bg-primary/10 px-md py-xs rounded-full text-[12px] font-semibold text-primary border border-primary/20">
              + 50 lainnya
            </span>
          </div>
          <div className="mt-lg pt-md border-t border-border text-center">
            <Link to="/database" className="text-[14px] font-semibold text-primary hover:opacity-80 underline hover:no-underline transition-all">
              Lihat Data Makanan
            </Link>
          </div>
        </div>
      </aside>
    </main>
  );
}