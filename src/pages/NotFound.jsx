// src/pages/NotFound.jsx
import { Link, useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="flex-grow flex items-center justify-center min-h-[80vh] px-container-margin">
      <div className="text-center max-w-md mx-auto flex flex-col items-center gap-lg">

        {/* Icon */}
        <div className="w-24 h-24 rounded-full bg-surface-container flex items-center justify-center">
          <span className="material-symbols-outlined text-[56px] text-outline">
            search_off
          </span>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-sm">
          <h1 className="text-[80px] font-bold text-primary leading-none tracking-tight">
            404
          </h1>
          <h2 className="text-[24px] font-bold text-on-surface">
            Halaman tidak ditemukan
          </h2>
          <p className="text-[16px] text-on-surface-variant leading-6">
            Halaman yang kamu cari tidak ada atau sudah dipindahkan.
            Coba kembali ke beranda.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-md mt-sm w-full sm:w-auto">
          <Link
            to="/"
            className="w-full sm:w-auto bg-primary text-on-primary text-[14px] font-semibold px-xl py-sm rounded-lg hover:bg-surface-tint transition-colors active:scale-95 flex items-center justify-center gap-sm"
          >
            <span className="material-symbols-outlined text-[18px]">home</span>
            Kembali ke Beranda
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto bg-surface-container text-on-surface text-[14px] font-semibold px-xl py-sm rounded-lg hover:bg-surface-container-high transition-colors active:scale-95 flex items-center justify-center gap-sm border border-outline-variant"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Halaman Sebelumnya
          </button>
        </div>

      </div>
    </main>
  );
}