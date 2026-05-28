import { Link } from "react-router-dom";
import logoGiziMeal from '../assets/logo.png';

const NAV_COLS = [
  {
    title: "Navigasi",
    links: [
      { label: "Beranda", to: "/" },
      { label: "Deteksi", to: "/deteksi" },
      { label: "Kalkulator", to: "/kalkulator" },
    ],
  },
  {
    title: "Informasi",
    links: [
      { label: "Referensi", to: "/referensi" },
      { label: "FAQ", to: "/faq" },
      { label: "Tentang", to: "/tentang" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-surface-alt border-t border-border pt-xxl pb-xl">
      <div className="max-w-7xl mx-auto px-lg">
        <div className="flex flex-col lg:flex-row justify-between gap-xl mb-xl">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2 mb-md">
              <img
                alt="Logo GiziMeal"
                className="h-8 w-auto"
                src={logoGiziMeal}
              />
            </div>
            <p className="text-sm text-muted-foreground mb-md leading-relaxed">
              Platform edukasi gizi untuk mengenali bahan makanan, menyajikan informasi gizi, 
              dan menyusun rekomendasi menu gizi seimbang berdasarkan pedoman resmi.
            </p>
            <div className="flex gap-md">
              {["public", "mail", "share"].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="p-2 rounded-full bg-secondary hover:bg-primary/10 transition-colors"
                >
                  <span className="material-symbols-outlined text-primary">{icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-xl">
            {NAV_COLS.map((col) => (
              <div key={col.title}>
                <h5 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-md">{col.title}</h5>
                <ul className="flex flex-col gap-sm">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-[14px] text-foreground/80 hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border-soft pt-lg flex flex-col md:flex-row justify-between items-center gap-md">
          <p className="text-[12px] text-muted-foreground">
            © 2026 GiziMeal. Berdasarkan standar AKG Kemenkes 2019 (Scientific Disclaimer).
          </p>
          <div className="flex items-center gap-2">
          </div>
        </div>
      </div>
    </footer>
  );
}