# GiziMeal - Panduan Desain Visual

> Dokumentasi lengkap sistem desain website GiziMeal mencakup tipografi, palet warna, skala ukuran teks, spacing, dan aturan visual yang diterapkan di seluruh halaman.

---

## Daftar Isi

1. [Font Family](#font-family)
2. [Palet Warna](#palet-warna)
3. [Skala Ukuran Teks](#skala-ukuran-teks)
4. [Hierarki Tipografi](#hierarki-tipografi)
5. [Skala Display](#skala-display)
6. [Skala Heading](#skala-heading)
7. [Skala Body dan UI](#skala-body-dan-ui)
8. [Eyebrow dan Label](#eyebrow-dan-label)
9. [Monospace dan Kode](#monospace-dan-kode)
10. [Konfigurasi CSS](#konfigurasi-css)
11. [Penggunaan di Komponen](#penggunaan-di-komponen)
12. [Prinsip Desain Tipografi](#prinsip-desain-tipografi)
13. [Responsif dan Adaptasi](#responsif-dan-adaptasi)
14. [Aturan Penerapan](#aturan-penerapan)

---

## Font Family

### Font Utama - Inter

GiziMeal menggunakan **Inter** sebagai satu-satunya typeface untuk seluruh elemen UI.
Inter dipilih karena karakter geometric-humanist yang bersih, keterbacaan tinggi di layar, dan dukungan OpenType feature yang lengkap.

```
Font Stack (Sans):
"Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif
```

Font dimuat melalui `next/font/google` dengan konfigurasi:

| Parameter     | Nilai       |
|---------------|-------------|
| Subset        | `latin`     |
| Variable      | `--font-sans` |
| Display       | `swap`      |

### Font Monospace

Untuk blok kode dan elemen numerik tabular, digunakan system monospace stack:

```
Font Stack (Mono):
ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace
```

---

## Palet Warna

Sistem warna GiziMeal didefinisikan sebagai CSS custom properties dan berubah otomatis antara mode terang dan gelap. Berikut adalah seluruh kode warna yang digunakan beserta konversi hex-nya.

### Warna Utama (Primary)

| Token | Light Mode | Dark Mode | Fungsi |
|-------|-----------|-----------|--------|
| `--primary` | `#00935d` | `#00ac6c` | Warna aksen utama (emerald green), tombol CTA, link aktif |
| `--primary-foreground` | `#fcfcfc` | `#fcfcfc` | Teks di atas elemen primary |
| `--primary-hover` | `#00804c` | `#00935d` | State hover pada tombol primary |

### Warna Teks (Text Colors)

| Token | Light Mode | Dark Mode | Fungsi |
|-------|-----------|-----------|--------|
| `--foreground` | `#101a21` | `#e5e8eb` | Teks utama, heading, body |
| `--ink` | `#09131a` | `#eeeeee` | Teks paling gelap/terang, penekanan maksimal |
| `--muted-foreground` | `#5c656b` | `#7b8186` | Teks sekunder, deskripsi, placeholder |

### Warna Permukaan (Surface Colors)

| Token | Light Mode | Dark Mode | Fungsi |
|-------|-----------|-----------|--------|
| `--background` | `#ffffff` | `#060a0d` | Latar belakang halaman utama |
| `--surface` | `#ffffff` | `#060a0d` | Permukaan dasar |
| `--surface-alt` | `#f7fbf9` | `#0c1013` | Permukaan alternatif, section bergantian |
| `--surface-warm` | `#f1f7f3` | `#0e1216` | Permukaan hangat, area highlight |
| `--card` | `#ffffff` | `#0e1216` | Latar belakang card |
| `--card-foreground` | `#101a21` | `#e5e8eb` | Teks di dalam card |

### Warna Sekunder dan Muted

| Token | Light Mode | Dark Mode | Fungsi |
|-------|-----------|-----------|--------|
| `--secondary` | `#f2f6f4` | `#12171a` | Background elemen sekunder |
| `--secondary-foreground` | `#101a21` | `#e5e8eb` | Teks pada elemen sekunder |
| `--muted` | `#eff3f1` | `#171b1f` | Background muted/subtle |
| `--accent` | `#e4f3ea` | `#151d18` | Background aksen ringan |
| `--accent-foreground` | `#101a21` | `#e5e8eb` | Teks pada elemen aksen |

### Warna Border dan Input

| Token | Light Mode | Dark Mode | Fungsi |
|-------|-----------|-----------|--------|
| `--border` | `#e2e5e8` | `#252a2d` | Border default pada card, section |
| `--border-soft` | `#eceff1` | `#1b2024` | Border halus, pemisah ringan |
| `--input` | `#e2e5e8` | `#252a2d` | Border field input |
| `--ring` | `#00935d` | `#00ac6c` | Focus ring pada elemen interaktif |

### Warna Destructive

| Token | Light Mode | Dark Mode | Fungsi |
|-------|-----------|-----------|--------|
| `--destructive` | `#de3c37` | `#de3c37` | Aksi berbahaya, hapus, error |
| `--destructive-foreground` | `#fcfcfc` | `#fcfcfc` | Teks pada elemen destructive |

### Warna Aksen Tambahan

| Token | Light Mode | Dark Mode | Fungsi |
|-------|-----------|-----------|--------|
| `--clay` | `#cd753f` | `#da8757` | Aksen warm/oranye untuk variasi visual |

### Warna Chart (Grafik dan Visualisasi)

| Token | Light Mode | Dark Mode | Fungsi |
|-------|-----------|-----------|--------|
| `--chart-1` | `#00935d` | `#00ac6c` | Seri data pertama (emerald) |
| `--chart-2` | `#3ea576` | `#50b584` | Seri data kedua (green light) |
| `--chart-3` | `#cd753f` | `#da8757` | Seri data ketiga (warm/clay) |
| `--chart-4` | `#3179a6` | `#4188b6` | Seri data keempat (blue) |
| `--chart-5` | `#aa9e7b` | `#baad8a` | Seri data kelima (yellow-green) |

### Warna Popover

| Token | Light Mode | Dark Mode | Fungsi |
|-------|-----------|-----------|--------|
| `--popover` | `#ffffff` | `#0e1216` | Background dropdown/popover |
| `--popover-foreground` | `#101a21` | `#e5e8eb` | Teks di dalam popover |

### Ringkasan Identitas Warna

Secara keseluruhan, palet GiziMeal dibangun di atas prinsip berikut:

- **Emerald green** (`#00935d`) sebagai satu-satunya warna kromatik utama. Digunakan hemat: hanya pada tombol CTA, link aktif, dan focus ring.
- **Monokrom netral** untuk semua elemen lainnya. Hierarki dicapai melalui gradasi dari near-black (`#09131a`) ke light grey (`#eceff1`).
- **Dual mode** (terang/gelap) dengan transisi yang menjaga kontras rasio WCAG AA di kedua mode.
- **Destructive red** (`#de3c37`) hanya untuk aksi berbahaya dan pesan error.
- **Clay/warm** (`#cd753f`) sebagai aksen sekunder pada chart dan variasi visual.

---

## Skala Ukuran Teks

Berikut adalah seluruh ukuran teks yang digunakan di website GiziMeal, diurutkan dari terbesar ke terkecil:

| Ukuran | Tailwind Class | Penggunaan | Konteks |
|--------|---------------|------------|---------|
| 50px | `text-[50px]` | Hero headline utama | Halaman beranda, H1 desktop |
| 48px | `text-[48px]` | CTA section headline | Section penutup halaman |
| 44px | `text-[44px]` | Section headline | H2 pada setiap section utama |
| 36px | `text-4xl` / `text-[36px]` | Headline tablet | H1/H2 pada breakpoint sm |
| 30px | `text-3xl` | Step number, heading besar | Nomor urut metodologi |
| 28px | `text-[28px]` | Headline mobile | H1/H2 pada mobile |
| 24px | `text-2xl` | Counter statistik | Angka animasi di hero |
| 20px | `text-xl` | Card title | Judul fitur, judul card |
| 18px | `text-lg` | Sub-heading | Menu sheet title, heading kecil |
| 16px | `text-base` | Body standard | Paragraf utama, subtitle |
| 15px | `text-[15px]` | Body lead mobile | Paragraf pembuka di sm |
| 14px | `text-sm` | Body small, label | Deskripsi card, form label, button, link |
| 13px | `text-[13px]` | Nav link | Link navigasi di navbar |
| 12px | `text-xs` | Caption | Footer, email user, role |
| 11px | `text-[11px]` | Eyebrow, micro | Label section, stat label, disclaimer |

### Skala Font Weight

| Weight | Tailwind Class | Penggunaan |
|--------|---------------|------------|
| 400 | `font-normal` | Body text, paragraf, deskripsi, placeholder |
| 500 | `font-medium` | Button label, form label, heading H4-H6 |
| 600 | `font-semibold` | Display H1-H3, eyebrow, nama user, nav aktif |

### Skala Letter Spacing

| Nilai | Tailwind Class | Penggunaan |
|-------|---------------|------------|
| -0.02em | `tracking-tight` | Display headline, heading H1-H3 |
| -0.015em | (custom di CSS) | Heading H4-H6 |
| 0 | default | Body text, button, form |
| ~0.05em | `tracking-wide` | Nav link |
| ~0.075em | `tracking-wider` | Eyebrow (SectionHeader) |
| 0.18em | `tracking-[0.18em]` | Reference code label |
| 0.2em | `tracking-[0.2em]` | Footer category label |
| 0.22em | `tracking-[0.22em]` | Eyebrow (PageHeader, home section) |

### Skala Line Height

| Nilai | Tailwind Class | Penggunaan |
|-------|---------------|------------|
| 1.0 | `leading-none` | Button label |
| 1.05 | `leading-[1.05]` | Hero headline desktop |
| 1.1 | `leading-[1.1]` | Display headline mobile/tablet |
| 1.2 | (default heading) | Heading medium |
| 1.4 | (default h4-h6) | Sub-heading |
| 1.45 | (caption) | Caption, micro text |
| 1.5 | `leading-normal` | Body standard |
| 1.625 | `leading-relaxed` | Body lead, deskripsi panjang |

---

## Hierarki Tipografi

Sistem tipografi GiziMeal dibangun dengan pendekatan **tight tracking pada display** dan **relaxed line-height pada body**, menciptakan kontras visual antara headline yang padat dan teks baca yang nyaman.

### Ringkasan Hierarki

| Level | Ukuran (Desktop) | Weight | Letter Spacing | Line Height |
|-------|-----------------|--------|----------------|-------------|
| Display Hero | 50px | 600 | -0.02em | 1.05 |
| Display Section | 44px | 600 | -0.02em | 1.05 |
| Display Mobile | 28px | 600 | -0.02em | 1.1 |
| Heading Large | 30px | 600 | -0.02em | 1.2 |
| Heading Medium | 20px | 600 | -0.015em | 1.2 |
| Heading Small | 18px | 500 | -0.015em | 1.4 |
| Body Large | 17px | 400 | 0 | 1.625 |
| Body Default | 15-16px | 400 | 0 | 1.625 |
| Body Small | 14px | 400 | 0 | 1.625 |
| Caption | 13px | 400 | 0 | 1.45 |
| Micro/Label | 12px | 400 | 0 | 1.45 |
| Eyebrow | 11px | 600 | 0.22em | 1.0 |

---

## Skala Display

Display digunakan untuk hero headline dan section opener. Karakteristik utama: **weight 600 (semibold)** dengan **negative letter-spacing** yang merapatkan letterform untuk kesan editorial dan teknis.

### Hero Headline (H1)

```css
font-size: 50px;
font-weight: 600;
line-height: 1.05;
letter-spacing: -0.02em;
```

Stair-step responsif:
- Mobile: `28px`, line-height `1.1`
- Tablet (sm): `36px`
- Desktop (md): `50px`, line-height `1.05`

### Section Headline (H2)

```css
font-size: 44px;
font-weight: 600;
line-height: 1.05;
letter-spacing: -0.02em;
```

Stair-step responsif:
- Mobile: `28px`, line-height `1.1`
- Tablet (sm): `36px`
- Desktop (md): `44px`, line-height `1.05`

---

## Skala Heading

### Heading Large (H2 - Komponen)

Digunakan pada `SectionHeader` dan card title besar.

```css
font-size: 30px;
font-weight: 600;
letter-spacing: -0.02em;
```

### Heading Medium (H3)

Digunakan pada judul card fitur dan sub-section.

```css
font-size: 20px;
font-weight: 600;
letter-spacing: -0.015em;
```

### Heading Small (H4-H6)

```css
font-size: 18px;
font-weight: 500;
letter-spacing: -0.015em;
line-height: 1.4;
```

---

## Skala Body dan UI

### Body Lead

Paragraf pembuka di bawah hero atau section headline.

```css
font-size: 17px;
font-weight: 400;
line-height: 1.625;
color: var(--muted-foreground);
```

Responsif: `15px` (mobile) > `16px` (sm) > `17px` (md)

### Body Default

Teks utama di seluruh halaman.

```css
font-size: 14px;
font-weight: 400;
line-height: 1.625;
color: var(--muted-foreground);
```

### Button Label

```css
font-size: 14px;
font-weight: 500;
line-height: 1.0;
letter-spacing: 0;
```

### Form Label

```css
font-size: 14px;
font-weight: 500;
margin-bottom: 6px;
```

---

## Eyebrow dan Label

### Eyebrow Text

Teks kecil uppercase yang muncul di atas section headline sebagai konteks kategori.

```css
font-size: 11px;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.22em;
color: var(--muted-foreground);
```

Contoh penggunaan: "Empat Pilar Layanan", "Metodologi", "Berbasis Bukti", "Hubungi Kami"

### Stat Label

Label di bawah angka statistik pada hero section.

```css
font-size: 11px;
font-weight: 400;
text-transform: uppercase;
letter-spacing: 0.05em;
color: var(--muted-foreground);
```

### Footer Category Label

```css
font-size: 12px;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.2em;
color: var(--muted-foreground);
```

---

## Monospace dan Kode

### Konfigurasi

```css
font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
font-variant-numeric: tabular-nums;
font-feature-settings: "tnum", "ss01";
```

### Penggunaan

- Blok kode dan snippet teknis
- Angka tabular pada tabel data gizi
- Elemen dengan class `.tnum` atau `.font-mono`

---

## Konfigurasi CSS

### CSS Custom Properties

```css
:root {
  --font-sans: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-serif: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}
```

### Base Layer Rules

```css
html {
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: "ss01", "cv11";
}

body {
  font-family: var(--font-sans);
  font-weight: 400;
}

h1, h2, h3 {
  font-family: var(--font-sans);
  letter-spacing: -0.02em;
  font-weight: 600;
}

h4, h5, h6 {
  font-family: var(--font-sans);
  letter-spacing: -0.015em;
  font-weight: 500;
}
```

### OpenType Features

| Feature | Keterangan |
|---------|------------|
| `ss01` | Stylistic Set 1 - alternate letterforms untuk keterbacaan |
| `cv11` | Character Variant 11 - single-storey 'a' (opsional) |
| `tnum` | Tabular Nums - angka lebar seragam untuk tabel |

### Utility Class: font-display

```css
@utility font-display {
  font-family: var(--font-sans);
  font-weight: 600;
  letter-spacing: -0.02em;
}
```

### Selection Style

```css
::selection {
  background: color-mix(in oklab, var(--primary) 22%, transparent);
  color: var(--foreground);
}
```

---

## Penggunaan di Komponen

### PageHeader

Komponen header halaman dengan animasi entrance.

| Elemen | Class Tipografi |
|--------|-----------------|
| Eyebrow | `text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground` |
| Title (H1) | `font-semibold text-[28px] leading-[1.1] tracking-tight sm:text-[34px] md:text-[44px]` |
| Lead | `text-sm leading-relaxed text-muted-foreground sm:text-[15px] md:text-base` |

### SectionHeader

| Elemen | Class Tipografi |
|--------|-----------------|
| Eyebrow | `text-xs font-semibold uppercase tracking-wider text-muted-foreground` |
| Title (H2) | `text-3xl font-semibold tracking-tight md:text-4xl` |
| Subtitle | `text-base text-muted-foreground` |

### Navbar

| Elemen | Class Tipografi |
|--------|-----------------|
| Nav Link | `text-[13px] tracking-wide text-muted-foreground` |
| Active Link | `font-semibold text-primary` |
| User Name | `text-sm font-semibold` |
| User Email | `text-xs text-muted-foreground` |

### Footer

| Elemen | Class Tipografi |
|--------|-----------------|
| Description | `text-sm leading-relaxed text-muted-foreground` |
| Category Label | `text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground` |
| Link | `text-sm text-foreground/80` |
| Copyright | `text-xs text-muted-foreground` |
| Sub-footer | `text-[11px] tracking-wide` |

### Card (Testimonial)

| Elemen | Class Tipografi |
|--------|-----------------|
| Quote | `text-[14px] leading-relaxed text-foreground/85` |
| Name | `text-sm font-semibold` |
| Role | `text-xs text-muted-foreground` |

### Form

| Elemen | Class Tipografi |
|--------|-----------------|
| Label | `text-sm font-medium` |
| Input | `text-sm` (inherited) |
| Placeholder | `text-muted-foreground` |

---

## Prinsip Desain Tipografi

### 1. Satu Typeface, Banyak Ekspresi

Inter digunakan di seluruh sistem tanpa font tambahan. Variasi dicapai melalui kombinasi weight (400, 500, 600), ukuran, letter-spacing, dan text-transform.

### 2. Negative Tracking pada Display

Heading besar (H1, H2) menggunakan `letter-spacing: -0.02em` untuk merapatkan letterform, menciptakan kesan editorial yang padat dan teknis. Ini adalah ciri khas visual GiziMeal.

### 3. Relaxed Line-Height pada Body

Semua teks body menggunakan `line-height: 1.625` untuk kenyamanan baca, terutama pada paragraf panjang yang berisi informasi gizi.

### 4. Eyebrow sebagai Konteks

Setiap section besar diawali dengan eyebrow text (11px, uppercase, wide tracking) yang memberi konteks kategori sebelum headline utama.

### 5. Warna sebagai Hierarki

| Level | Warna | Keterangan |
|-------|-------|------------|
| Primary Text | `var(--foreground)` | Near-black, teks utama |
| Secondary | `var(--muted-foreground)` | Grey, deskripsi dan helper |
| Tertiary | `text-foreground/85` | Slightly faded, quote |
| Disabled | `text-foreground/50` | Elemen non-aktif |
| Accent | `var(--primary)` | Emerald green, link dan CTA |

### 6. Weight sebagai Sinyal

| Weight | Penggunaan |
|--------|------------|
| 400 | Body text, paragraf, deskripsi |
| 500 | Button label, heading kecil (H4-H6), nav link aktif |
| 600 | Display, heading besar (H1-H3), eyebrow, nama pengguna |

---

## Responsif dan Adaptasi

### Stair-Step Scaling

Tipografi GiziMeal menggunakan pendekatan stair-step (bukan fluid/clamp) untuk kontrol presisi di setiap breakpoint.

| Breakpoint | Display Hero | Section H2 | Body Lead |
|------------|-------------|------------|-----------|
| Mobile (<640px) | 28px | 28px | 15px |
| Tablet (sm: 640px) | 36px | 36px | 16px |
| Desktop (md: 768px) | 50px | 44px | 17px |

### Dark Mode

Tipografi tidak berubah ukuran atau weight di dark mode. Yang berubah hanya warna:

| Token | Light | Dark |
|-------|-------|------|
| `--foreground` | `#101a21` | `#e5e8eb` |
| `--muted-foreground` | `#5c656b` | `#7b8186` |
| `--primary` | `#00935d` | `#00ac6c` |

### Font Rendering

```css
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
```

Antialiasing diaktifkan secara global untuk memastikan rendering yang konsisten di semua platform.

---

## Aturan Penerapan

### Yang Harus Dilakukan

- Gunakan `font-semibold` (600) untuk semua heading H1-H3 dan eyebrow.
- Terapkan `tracking-tight` (-0.02em) pada display dan heading besar.
- Gunakan `leading-relaxed` pada semua body text untuk keterbacaan.
- Awali section dengan eyebrow text (11px, uppercase, tracking 0.22em).
- Gunakan `text-muted-foreground` untuk teks sekunder dan deskripsi.
- Aktifkan OpenType features `ss01` dan `cv11` untuk konsistensi letterform.
- Gunakan tabular-nums (`.tnum`) pada data numerik dan tabel gizi.
- Pastikan kontras warna memenuhi standar WCAG AA di kedua mode (terang/gelap).
- Gunakan emerald green (`--primary`) secara hemat, hanya untuk CTA dan elemen interaktif.

### Yang Harus Dihindari

- Jangan gunakan font selain Inter di UI. Konsistensi satu typeface adalah prinsip utama.
- Jangan gunakan weight 700 (bold) atau lebih. Batas atas adalah 600 (semibold).
- Jangan gunakan letter-spacing positif pada heading. Tracking harus negatif atau nol.
- Jangan gunakan font-size di bawah 11px. Batas minimum untuk aksesibilitas.
- Jangan campur unit px dan rem dalam satu komponen. Pilih salah satu secara konsisten.
- Jangan gunakan italic untuk penekanan. Gunakan weight atau warna sebagai gantinya.
- Jangan hapus antialiasing. Rendering subpixel tanpa smoothing merusak konsistensi visual.
- Jangan tambahkan warna kromatik baru selain emerald green sebagai warna sistem.
- Jangan gunakan opacity di bawah 50% untuk teks yang masih harus terbaca.

---

## Referensi Token Tailwind

### Classes yang Digunakan

| Kategori | Classes |
|----------|---------|
| Size | `text-[11px]`, `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, `text-4xl`, `text-[28px]`, `text-[34px]`, `text-[44px]`, `text-[50px]` |
| Weight | `font-normal` (400), `font-medium` (500), `font-semibold` (600) |
| Tracking | `tracking-tight`, `tracking-wide`, `tracking-wider`, `tracking-[0.18em]`, `tracking-[0.2em]`, `tracking-[0.22em]` |
| Leading | `leading-[1.05]`, `leading-[1.1]`, `leading-relaxed`, `leading-none` |
| Transform | `uppercase`, `normal-case` |
| Color | `text-foreground`, `text-muted-foreground`, `text-primary`, `text-destructive`, `text-foreground/85`, `text-foreground/80`, `text-foreground/50` |
