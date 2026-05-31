import { Link } from "react-router-dom";
import heroImage from '../assets/hero.png';

export default function HeroSection() {
  const isLogged = !!localStorage.getItem("authToken");

  return (
    <section className="w-full bg-surface py-xl md:py-xxl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-container-margin md:px-lg grid grid-cols-1 lg:grid-cols-12 gap-xl items-center">
        {/* Left */}
        <div className="lg:col-span-6 flex flex-col gap-lg reveal-left">
          <h1 className="text-[28px] sm:text-[36px] md:text-[50px] font-semibold tracking-tight leading-[1.05] text-foreground">
            Kenali bahan, pahami gizinya, sajikan menu dengan gizi seimbang.
          </h1>
          <p className="text-[15px] sm:text-[16px] md:text-[17px] leading-relaxed text-muted-foreground max-w-xl">
            Foto bahan makanan yang kamu punya, lalu dapatkan rekomendasi menu
            lengkap beserta informasi gizinya berdasarkan{" "}
            <a href="#" className="text-primary font-medium underline hover:opacity-80 transition-opacity">Pedoman Gizi Seimbang</a>{" "}
            dan{" "}
            <a href="#" className="text-primary font-medium underline hover:opacity-80 transition-opacity">Angka Kecukupan Gizi (AKG)</a>{" "}
            Kemenkes RI.
          </p>

          <div className="flex flex-col sm:flex-row gap-md">
            {/* ── TOMBOL CTA UTAMA DINAMIS BERDASARKAN STATUS LOGIN ── */}
            {isLogged ? (
              <Link 
                to="/deteksi" 
                className="bg-primary text-primary-foreground px-lg py-md rounded-full text-[14px] font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95 shadow-md animate-fade-in"
              >
                <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
                Mulai Deteksi Bahan
              </Link>
            ) : (
              <Link 
                to="/auth/login" 
                className="bg-primary text-primary-foreground px-lg py-md rounded-full text-[14px] font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95 shadow-md"
              >
                <span className="material-symbols-outlined text-[18px]">login</span>
                Masuk untuk Memulai
              </Link>
            )}

            <Link to="/referensi" className="bg-secondary text-secondary-foreground px-lg py-md rounded-full text-[14px] font-medium flex items-center justify-center gap-2 hover:bg-secondary/80 transition-all active:scale-95 border border-border">
              <span className="material-symbols-outlined text-[18px]">menu_book</span>
              Lihat Sumber Referensi
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-lg pt-md mt-md border-t border-border-soft">
            {[
              { value: "15", label: "Bahan Terklasifikasi" },
              { value: "400+", label: "Item Komposisi Pangan" },
              { value: "5", label: "Referensi Resmi" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl md:text-4xl font-semibold tracking-tight text-primary">{s.value}</div>
                <div className="text-[11px] font-normal tracking-[0.05em] uppercase text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right image */}
        <div className="lg:col-span-6 relative h-full min-h-[400px] reveal-right">
          <div className="absolute inset-0 rounded-[32px] overflow-hidden shadow-2xl border border-border">
            <img
              alt="Fresh Indonesian Ingredients"
              className="w-full h-full object-cover"
              src={heroImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}