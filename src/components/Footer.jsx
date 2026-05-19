import { Link } from "react-router-dom";

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
      { label: "About", to: "/tentang" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Kebijakan Privasi", to: "#" },
      { label: "Syarat & Ketentuan", to: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-surface-container-highest border-t border-outline-variant pt-xxl pb-xl">
      <div className="max-w-7xl mx-auto px-lg">
        <div className="flex flex-col lg:flex-row justify-between gap-xl mb-xl">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2 mb-md">
              <img
                alt="Logo"
                className="w-8 h-8"
                src="https://lh3.googleusercontent.com/aida/ADBb0ujZZi9EkoFBl9gbbFfiUvlxG6zmOVoG1NAxELrjmgE6pDcYPAu6xDQ1kWvbokt5XujWkjv2S4HePO38svw6_hb8th9y1pHpfPxbRyg6baMORmiToS6EG2lMQ1uMVxR6b1JtvkCSvj94VZKfXxqBGIZ4_rQc1RZ5WT4axH0p6ygIBzkzinPT0ijH0DTNMFhJgme1lVa-7r5HDh-aFztAPVey6Bdl31EaqvZyowPEj4JufKq52RvyV7c3WnE"
              />
              <span className="text-[20px] font-bold text-primary-container">GiziMeal</span>
            </div>
            <p className="text-[16px] text-on-surface-variant mb-md leading-relaxed">
              Solusi cerdas berbasis edukasi gizi untuk mendukung gaya hidup sehat
              masyarakat Indonesia sesuai standar nasional.
            </p>
            <div className="flex gap-md">
              {["public", "mail", "share"].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="p-2 rounded-full bg-surface-container hover:bg-primary-fixed transition-colors"
                >
                  <span className="material-symbols-outlined text-primary-container">{icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-xl">
            {NAV_COLS.map((col) => (
              <div key={col.title}>
                <h5 className="text-[14px] font-semibold text-on-surface mb-md">{col.title}</h5>
                <ul className="flex flex-col gap-sm">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-[16px] text-on-surface-variant hover:text-primary-container transition-colors"
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
        <div className="border-t border-outline-variant pt-lg flex flex-col md:flex-row justify-between items-center gap-md">
          <p className="text-[12px] text-on-surface-variant italic">
            © 2024 GiziMeal. Berdasarkan standar AKG Kemenkes 2019 (Scientific Disclaimer).
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[12px] text-on-surface-variant">Sistem AI Aktif</span>
          </div>
        </div>
      </div>
    </footer>
  );
}