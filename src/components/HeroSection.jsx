import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="w-full bg-[#012d1d] dark:bg-[#0c0e0c] py-xl md:py-xxl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-container-margin md:px-lg grid grid-cols-1 lg:grid-cols-12 gap-xl items-center text-white">
        {/* Left */}
        <div className="lg:col-span-6 flex flex-col gap-lg reveal-left">
          <h1 className="text-[24px] md:text-[40px] md:leading-[48px] md:tracking-tight font-bold text-white leading-tight">
            Kenali bahan, pahami gizinya, sajikan menu dengan gizi seimbang.
          </h1>
          <p className="text-[18px] leading-7 text-white/80 max-w-xl">
            Foto bahan makanan yang kamu punya, lalu dapatkan rekomendasi menu
            lengkap beserta informasi gizinya berdasarkan{" "}
            <a href="#" className="text-primary-fixed font-bold underline hover:text-primary-fixed-dim transition-colors">Pedoman Gizi Seimbang</a>{" "}
            dan{" "}
            <a href="#" className="text-primary-fixed font-bold underline hover:text-primary-fixed-dim transition-colors">Angka Kecukupan Gizi (AKG)</a>{" "}
            Kemenkes RI.
          </p>

          <div className="flex flex-col sm:flex-row gap-md">
            <Link to="/auth/login" className="bg-primary-fixed text-on-primary-fixed px-lg py-md rounded-full text-[14px] font-semibold flex items-center justify-center gap-2 hover:bg-primary-fixed-dim transition-all active:scale-95 shadow-md">
              <span className="material-symbols-outlined text-[18px]">login</span>
              Masuk untuk Memulai
            </Link>
            <Link to="/referensi" className="bg-white/10 text-white px-lg py-md rounded-full text-[14px] font-semibold flex items-center justify-center gap-2 hover:bg-white/20 transition-all active:scale-95 border border-white/20">
              Lihat Sumber Referensi
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-lg pt-md mt-md border-t border-white/10">
            {[
              { value: "15+", label: "Bahan Terklasifikasi" },
              { value: "500+", label: "Item Komposisi Pangan" },
              { value: "5+", label: "Referensi Resmi" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-[32px] font-bold leading-10 text-primary-fixed">{s.value}</div>
                <div className="text-[12px] font-medium tracking-widest uppercase text-white/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right image */}
        <div className="lg:col-span-6 relative h-full min-h-[400px] reveal-right">
          <div className="absolute inset-0 rounded-[32px] overflow-hidden shadow-2xl border-4 border-white/10">
            <img
              alt="Fresh Indonesian Ingredients"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOl9sNWiEU11IiauMMW2TZ8WRJhF-EWvf_bChMTmffxNhgi5_uwnbsq-0pGgkNC2nzkgCJwL2hR4Gcaf2IAqchnwGkDnbEj5FlZ5KNIzF7KxsYLk_iqM2xHAJPd4PALt026eO8XsbxiH_cCu1lbXG5UnPo1y7Qmm8-NHBigVbePXTDjqFE1blLqxz_CB0CjOmrGyL7IRlk-x8eOC7GWXZRQwRI5L5vI1JLClNG3lJx-YPuSndSj-KFmSO3r23sajeWhTjw0l-7_iE"
            />
          </div>
        </div>
      </div>
    </section>
  );
}