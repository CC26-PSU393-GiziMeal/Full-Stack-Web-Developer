import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function DeteksiPage() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef(null);
  const isLogged = !!localStorage.getItem('authToken');

  const [supportedIngredients, setSupportedIngredients] = useState([]);
  const [isLoadingClasses, setIsLoadingClasses] = useState(true);

  useEffect(() => {
    if (!isLogged) return;

    const fetchClasses = async () => {
      try {
        setIsLoadingClasses(true);
        const response = await fetch("https://cc26-psu393-gizimeal-api.hf.space/classes");
        
        if (!response.ok) {
          throw new Error("Gagal memuat daftar bahan.");
        }
        
        const data = await response.json();
        const classesArray = Array.isArray(data) ? data : (data.classes || data.data || []);
        setSupportedIngredients(classesArray);
      } catch (err) {
        console.error("Gagal mengambil rute classes:", err);
        setSupportedIngredients([
          "Wortel", "Tomat", "Bawang", "Bayam", "Ikan", "Ayam",
          "Daging Sapi", "Telur", "Tahu", "Tempe"
        ]);
      } finally {
        setIsLoadingClasses(false);
      }
    };

    fetchClasses();
  }, [isLogged]);

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
      rawFile: file
    }));
    
    if (previews.length > 0) {
      setImages((prev) => [...prev, ...previews]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(e.target.files);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (!isAnalyzing && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
    }
  };

  const removeImage = (id) => {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (target) URL.revokeObjectURL(target.url); 
      return prev.filter((img) => img.id !== id);
    });
  };

  const handleMulaiDeteksi = async () => {
    if (images.length === 0) return;

    setIsAnalyzing(true);
    Swal.fire({
      title: "Menganalisis Foto...",
      text: "GiziMeal AI sedang mengidentifikasi semua bahan makanan dari foto-foto Anda.",
      allowOutsideClick: false,
      didOpen: () => { Swal.showLoading(); }
    });

    try {
      const formData = new FormData();
      
      images.forEach((img) => {
        formData.append("files", img.rawFile);
      });

      let currentUserId = null;
      const userRaw = localStorage.getItem("user");
      if (userRaw) {
        currentUserId = JSON.parse(userRaw).id;
      }

      const response = await fetch("https://gizimeal.up.railway.app/predict", {
        method: "POST",
        headers: {
          ...(currentUserId && { "X-User-Id": String(currentUserId) })
        },
        body: formData, 
      });

      const jsonResult = await response.json();

      if (!response.ok || !jsonResult.success) {
        throw new Error(jsonResult.message || "Gagal melakukan deteksi citra.");
      }

      Swal.close();
      
      const resultData = jsonResult.data;
      if (images.length === 1) {
        resultData.filename = images[0].name;
      }
      if (resultData.per_image_predictions && Array.isArray(resultData.per_image_predictions)) {
        resultData.per_image_predictions.forEach((pred, i) => {
          if (images[i]) {
            pred.filename = images[i].name;
          }
        });
      }

      navigate("/deteksi/hasil", { state: { result: resultData } });

    } catch (err) {
      console.error("Deteksi Alur Error di Frontend:", err);
      Swal.fire({
        icon: "error",
        title: "Deteksi Gagal",
        text: err.message || "Terjadi kesalahan saat memproses gambar.",
        confirmButtonColor: "#f44336",
      });
    } finally {
      setIsAnalyzing(false);
    }
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
          onClick={() => !isAnalyzing && fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); if(!isAnalyzing) setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`bg-card border-2 border-dashed rounded-2xl p-xl flex flex-col items-center justify-center text-center gap-md min-h-[360px] cursor-pointer transition-all group
            ${isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary"}
            ${isAnalyzing ? "opacity-50 pointer-events-none cursor-not-allowed" : ""}`}
        >
          <div className={`p-lg rounded-full transition-colors shadow-sm ${isDragging ? "bg-primary/20 text-primary" : "bg-surface group-hover:bg-primary/10 group-hover:text-primary"}`}>
            <span className="material-symbols-outlined text-4xl text-muted-foreground group-hover:text-primary">
              {isAnalyzing ? "sync" : "cloud_upload"}
            </span>
          </div>
          <div>
            <p className="text-[20px] font-semibold text-foreground tracking-tight mb-xs">
              {isAnalyzing ? "Sedang memproses..." : "Drag & Drop foto di sini"}
            </p>
            <p className="text-[15px] text-muted-foreground">
              {isAnalyzing ? "Mohon tunggu sejenak" : "atau klik untuk menelusuri dari perangkat"}
            </p>
          </div>
          <p className="text-[12px] font-medium tracking-wide text-muted-foreground/60 mt-sm">
            Mendukung JPG, PNG, WEBP. Maks 1MB per file.
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
                    disabled={isAnalyzing}
                    onClick={(e) => { e.stopPropagation(); removeImage(img.id); }}
                    className="absolute top-xs right-xs bg-destructive text-destructive-foreground p-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:pointer-events-none"
                  >
                    <span className="material-symbols-outlined text-sm leading-none">close</span>
                  </button>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex justify-center mt-lg">
              <button
                onClick={handleMulaiDeteksi}
                disabled={images.length === 0 || isAnalyzing}
                className="bg-primary text-primary-foreground text-[14px] font-semibold px-xl py-md rounded-xl flex items-center gap-sm hover:opacity-90 transition-all active:scale-95 shadow-sm hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined">
                  {isAnalyzing ? "progress_activity" : "troubleshoot"}
                </span>
                {isAnalyzing ? "Menganalisis Citra..." : "Mulai Deteksi"}
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
              ["Fokus pada objek", "Ambil gambar dari sudut atas tegak lurus."],
              ["Background polos", "Gunakan latar belakang yang kontras."],
            ].map(([bold, rest]) => (
              <li key={bold} className="flex items-start gap-sm">
                <span className="material-symbols-outlined text-secondary text-base mt-1 flex-shrink-0">check_circle</span>
                <span className="leading-relaxed"><span className="font-semibold">{bold}:</span> {rest}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bahan Didukung */}
        <div className="bg-card rounded-2xl p-lg border border-border shadow-sm">
          <div className="flex items-center gap-sm mb-lg pb-sm border-b border-border">
            <span className="material-symbols-outlined text-foreground">format_list_bulleted</span>
            <h3 className="text-[18px] font-semibold tracking-tight text-foreground">BAHAN DIDUKUNG</h3>
          </div>
          
          {isLoadingClasses ? (
            <div className="flex items-center justify-center py-md text-[13px] text-muted-foreground gap-xs">
              <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
              Memanggil bahan...
            </div>
          ) : (
            <div className="flex flex-wrap gap-sm">
              {supportedIngredients.map((item, idx) => (
                <span key={idx} className="bg-surface px-md py-xs rounded-full text-[12px] font-medium tracking-wide text-muted-foreground border border-border capitalize">
                  {item}
                </span>
              ))}
            </div>
          )}

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