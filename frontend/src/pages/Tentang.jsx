const TEAM = [
  { initials: "AK", name: "Azharangga Kusuma",      role: "AI Engineer & PM",  cohort: "CACC370D6Y0721", path: "AI Engineer",         bg: "bg-secondary", text: "text-white", github: "https://github.com/azharanggakusuma", email: "CACC370D6Y0721@student.devacademy.id" },
  { initials: "PN", name: "Putri Nabilla",          role: "AI Engineer",       cohort: "CACC370D6X1171", path: "AI Engineer",         bg: "bg-secondary", text: "text-white", github: "https://github.com/putribila", email: "CACC370D6X1171@student.devacademy.id" },
  { initials: "FR", name: "Farina Setya Rahesti",   role: "Data Scientist",    cohort: "CDCC796D6X0089", path: "Data Scientist",      bg: "bg-secondary", text: "text-white", github: "https://github.com/farinasetyarahesti", email: "CDCC796D6X0089@student.devacademy.id" },
  { initials: "MB", name: "Mahaputri Buana Devwitasari",   role: "Data Scientist",    cohort: "CDCC796D6X0088", path: "Data Scientist",      bg: "bg-secondary", text: "text-white", github: "https://github.com/mahaputribuanaa", email: "CDCC796D6X0088@student.devacademy.id" },
  { initials: "MD", name: "M. Dava Arya Nada Putra",role: "Frontend Developer", cohort: "CFCC258D6Y1955", path: "Full-Stack Web Dev", bg: "bg-secondary", text: "text-white", github: "https://github.com/mdavaarya", email: "CFCC258D6Y1955@student.devacademy.id" },
  { initials: "MI", name: "Muhammad Ihsanul Dzaky",role: "Backend Developer",  cohort: "CFCC308D6Y1451", path: "Full-Stack Web Dev", bg: "bg-secondary", text: "text-white", github: "https://github.com/ihsanulDzaky", email: "CFCC308D6Y1451@student.devacademy.id" },
];

const STEPS = [
  { num: "01", icon: "photo_camera",    text: "Foto bahan makanan yang ada di dapur" },
  { num: "02", icon: "send",            text: "Foto dikirim ke sistem GiziMeal untuk dianalisis" },
  { num: "03", icon: "memory",          text: "Sistem mengenali jenis bahan dari foto" },
  { num: "04", icon: "restaurant_menu", text: "GiziMeal menyiapkan rekomendasi menu" },
  { num: "05", icon: "done_all",        text: "Hasil deteksi dan menu tampil di layar" },
];

const PENDEKATAN = [
  {
    icon: "report_problem",
    iconBg: "bg-destructive/10",
    iconText: "text-destructive",
    title: "Masalah",
    items: [
      "Kurangnya pemahaman kebutuhan gizi harian",
      "Kesulitan menentukan menu gizi seimbang",
      "Minim literasi gizi di kalangan masyarakat",
    ],
  },
  {
    icon: "lightbulb",
    iconBg: "bg-primary/20",
    iconText: "text-primary",
    title: "Solusi",
    items: [
      "Klasifikasi bahan makanan dari foto",
      "Rekomendasi menu gizi seimbang dengan skor AKG",
      "Dataset Kaggle diverifikasi dengan AKG & Pedoman Gizi",
      "Kalkulator BMR & TDEE Mifflin–St Jeor",
    ],
  },
  {
    icon: "tune",
    iconBg: "bg-surface-alt",
    iconText: "text-muted-foreground",
    title: "Batasan",
    items: [
      "Sistem prototype edukasi",
      "Dataset terbatas pada 15 bahan utama",
      "Informasi gizi bersifat informatif",
      "Bukan pengganti konsultasi medis",
    ],
  },
];

function TeamCard({ member }) {
  return (
    <div className="bg-card rounded-[16px] p-md border border-border flex flex-col items-center text-center hover:shadow-md hover:border-primary/30 transition-all hover:-translate-y-1 group w-full h-full relative overflow-hidden">
      <div className={`w-16 h-16 rounded-full ${member.bg} ${member.text} flex items-center justify-center text-[20px] font-semibold shadow-sm mb-sm flex-shrink-0`}>
        {member.initials}
      </div>
      <h3 className="text-[15px] font-semibold text-foreground leading-snug">{member.name}</h3>
      <p className="text-[12px] font-medium text-secondary mt-xs mb-md">{member.role}</p>
      
      <div className="w-full bg-surface rounded-xl p-sm space-y-xs text-left mb-sm mt-auto">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-semibold tracking-[0.22em] text-muted-foreground uppercase">Cohort</span>
          <span className="text-[11px] font-semibold text-foreground tabular-nums">{member.cohort}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-semibold tracking-[0.22em] text-muted-foreground uppercase">Path</span>
          <span className="text-[11px] font-semibold text-foreground">{member.path}</span>
        </div>
      </div>

      <div className="flex justify-center items-center gap-sm mt-xs border-t border-border/50 pt-sm w-full">
        {member.github && (
          <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors p-1 flex items-center justify-center" title="GitHub">
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        )}
        {member.email && (
          <a href={`mailto:${member.email}`} className="text-muted-foreground hover:text-foreground transition-colors p-1 flex items-center justify-center" title="Email">
            <span className="material-symbols-outlined text-[20px]">mail</span>
          </a>
        )}
      </div>
    </div>
  );
}

export default function TentangPage() {
  return (
    <main className="flex-grow w-full max-w-5xl mx-auto px-4 md:px-lg py-md md:py-lg space-y-xl md:space-y-xxl">

      {/* ── Hero ── */}
      <section className="flex flex-col lg:grid lg:grid-cols-2 gap-md md:gap-lg items-center reveal">
        <div className="space-y-sm md:space-y-md text-center lg:text-left order-2 lg:order-1">
          <div className="inline-flex items-center gap-xs bg-primary/10 text-primary px-sm py-xs rounded-full border border-primary/20 mt-sm lg:mt-0">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
            <span className="text-[11px] font-semibold tracking-[0.22em] uppercase">Tentang Kami</span>
          </div>
          <h1 className="text-[28px] md:text-[36px] lg:text-[44px] tracking-tight leading-[1.05] font-semibold text-primary">
            Edukasi gizi berbasis pedoman resmi.
          </h1>
          <p className="text-[15px] md:text-[16px] leading-relaxed text-muted-foreground px-4 lg:px-0">
            GiziMeal adalah capstone project CC26-PSU393 bertema Healthy Lives & Well-Being.
            Platform ini menyatukan klasifikasi bahan otomatis dengan acuan Permenkes RI agar
            setiap rekomendasi dapat ditelusuri sumbernya.
          </p>
        </div>
        <div className="relative w-full h-[200px] md:h-[240px] rounded-2xl bg-surface-alt overflow-hidden order-1 lg:order-2 shadow-sm border border-border">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVOOZWLQ-7chDHPvBP9e1mFeKVlbhgHSrmfrbPrgmzqViw-JPUOo4Xn9USUH4KBuQHAhWUXw7iBvvtHcz71LZlaCrkWwdJFOrrxLPiGHtWel9TrFQ4o76fplYtDU_yd2D5WbFmuk9gRd0Y9mzqxm3VOnb7E3SpxlW0gN_HHPDDWnwvC_pRaLxb8vOqWh3roxYSI6-P2sC8eUd4mfFaLpbtRJWFNu_TQbg7MwfOjLS6gON7pjcFHb3ZQ1h563pBeRXODDZeQSB_3N4"
            alt="Fresh ingredients"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/10" />
        </div>
      </section>

      {/* ── Pendekatan Kami ── */}
      <section className="space-y-md reveal reveal-delay-100">
        <h2 className="text-[24px] md:text-[28px] tracking-tight font-semibold text-primary text-center">Pendekatan Kami</h2>
        <div className="flex flex-col md:grid md:grid-cols-3 gap-sm md:gap-md items-stretch">
          {PENDEKATAN.map((p) => (
            <div key={p.title} className="bg-card border border-border rounded-[20px] p-md transition-all hover:-translate-y-1 hover:shadow-md hover:bg-secondary/10 hover:border-secondary/30 flex flex-col w-full">
              <div className={`w-10 h-10 rounded-xl ${p.iconBg} flex items-center justify-center ${p.iconText} mb-sm flex-shrink-0`}>
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>{p.icon}</span>
              </div>
              <h3 className="text-[16px] font-semibold text-primary mb-sm">{p.title}</h3>
              <ul className="space-y-xs flex-grow">
                {p.items.map((item) => (
                  <li key={item} className="flex items-start gap-xs">
                    <span className="material-symbols-outlined text-[16px] text-muted-foreground mt-0.5 flex-shrink-0">arrow_right</span>
                    <span className="text-[14px] leading-relaxed text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Alur Sistem ── */}
      <section className="space-y-md reveal reveal-delay-200">
        <div className="text-center space-y-xs">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-secondary uppercase">Alur Sistem</p>
          <h2 className="text-[24px] md:text-[28px] tracking-tight font-semibold text-primary">Bagaimana GiziMeal bekerja</h2>
        </div>
        <div className="relative max-w-2xl mx-auto mt-md px-2 md:px-0">
          {/* Garis Vertikal */}
          <div className="absolute left-[32px] md:left-1/2 -translate-x-1/2 top-0 h-full w-px bg-border" />
          
          <div className="space-y-md md:space-y-lg relative z-10">
            {STEPS.map((step, i) => {
              const isRight = i % 2 === 0;
              return (
                <div key={step.num} className="relative flex items-start md:items-center justify-start md:justify-between group">
                  {/* Left (Hanya terlihat di Desktop) */}
                  <div className={`hidden md:block md:w-5/12 px-sm ${isRight ? "text-right" : ""}`}>
                    {isRight && (
                      <>
                        <span className="text-[36px] font-semibold text-border block leading-none tabular-nums">{step.num}</span>
                        <p className="text-[14px] font-semibold text-foreground leading-snug mt-xs">{step.text}</p>
                      </>
                    )}
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-md transition-transform group-hover:scale-110 ${
                    i === STEPS.length - 1 ? "bg-primary text-primary-foreground" : i % 2 === 0 ? "bg-secondary text-secondary-foreground" : "bg-surface-alt text-muted-foreground"
                  }`}>
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>{step.icon}</span>
                  </div>
                  
                  {/* Right (Hanya terlihat di Desktop) */}
                  <div className={`hidden md:block md:w-5/12 px-sm ${!isRight ? "text-left" : ""}`}>
                    {!isRight && (
                      <>
                        <span className="text-[36px] font-semibold text-border block leading-none tabular-nums">{step.num}</span>
                        <p className="text-[14px] font-semibold text-foreground leading-snug mt-xs">{step.text}</p>
                      </>
                    )}
                  </div>
                  
                  {/* Mobile (Hanya terlihat di Layar Kecil) */}
                  <div className="md:hidden ml-md flex-1 pt-1 pb-2">
                    <span className="text-[20px] font-semibold text-border block leading-none mb-1 tabular-nums">{step.num}</span>
                    <p className="text-[14px] font-medium text-foreground leading-relaxed pr-2">{step.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Tim Pengembang ── */}
      <section className="space-y-lg reveal mt-xxl">
        <div className="text-center space-y-sm">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-secondary uppercase">Tim Pengembang</p>
          <h2 className="text-[24px] md:text-[28px] tracking-tight font-semibold text-primary">Siapa yang membangun GiziMeal</h2>
          <p className="text-[14px] md:text-[15px] leading-relaxed text-muted-foreground max-w-xl mx-auto px-md">
            Capstone project CC26-PSU393 oleh enam mahasiswa lintas learning path dari Coding Camp 2026 by DBS Foundation.
          </p>
        </div>
        <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 gap-md md:gap-lg mt-xl pt-md">
          {TEAM.map((member, i) => (
            <div key={member.initials} className={`reveal reveal-delay-${(i % 3) * 100}`}>
              <TeamCard member={member} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}