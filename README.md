# Web Profil — Arif Herfian Zaen Chartiko

Situs satu halaman. **React 19 + Vite + Tailwind CSS v4**, dengan GSAP
(ScrollTrigger) dan Lenis sebagai mesin geraknya.

## Prasyarat

Node 18 atau lebih baru, dan npm.

## Cara menjalankan

```
npm install     # sekali saja
npm run dev     # buka alamat yang muncul, biasanya http://localhost:5173
```

`npm run build` menghasilkan folder `dist/`. `npm run preview` menayangkan hasil
build itu supaya bisa diperiksa sebelum deploy.

**Klik dua kali `index.html` TIDAK bekerja.** Berkas itu cuma kerangka; isinya
di-mount React saat runtime. Ini konsekuensi yang disengaja dari kembali ke
React — versi situs ini yang lebih lama memang benar-benar bisa dijalankan
langsung dari filesystem.

## Struktur proyek

```
index.html            kerangka: meta tag, font, satu <div id="root">
src/main.jsx          entry point React
src/App.jsx           susunan bagian halaman
src/index.css         theme Tailwind + seluruh CSS tulisan tangan
src/components/       satu berkas per bagian halaman
src/lib/animasi.js    seluruh gerak situs, dalam satu berkas
public/assets/        foto, sertifikat, lambang tool
tools/og-template.html  sumber gambar OG preview (tidak ikut di-deploy)
```

Yang perlu Anda sunting hampir selalu ada di `src/components/`.

## Kenapa React, dan apa yang ikut berubah

Situs ini pernah React + Vite, lalu ditulis ulang jadi HTML/CSS/JS biasa tanpa
build step, lalu **dikembalikan ke React pada 8 Agustus 2026**. Satu hal ikut
terbawa pulang, dan itu yang paling penting diketahui:

**Tailwind sekarang benar-benar jalan.** Versi HTML biasa memakai `style.css`
yang merupakan build artifact yang dibekukan: ia cuma berisi class yang kebetulan
sudah dipakai, dan **class baru tidak berefek apa-apa — diam-diam, tanpa pesan
error**. Itu memakan korban berkali-kali: `p-3` di frame foto tidak pernah
bekerja sejak berkas itu dibuat, dan `mt-10` mati waktu dipasang. Sekarang class
apa pun hidup.

### Satu perbedaan render yang perlu diketahui

Di build beku, varian `sm:` menimpa `nav:` untuk properti yang sama, jadi di
≥900px semua nilai `nav:` diabaikan tanpa tanda. Tailwind sungguhan
menerapkannya dengan benar, jadi di desktop:

| di ≥900px | dulu (keliru) | sekarang | class yang memang ditulis |
|---|---|---|---|
| padding samping | 24px | 40px | `nav:px-10` |
| jarak antar blok | 80px | 96px | `nav:gap-24` |
| padding atas-bawah | 112px | 144px | `nav:py-36` |

Halaman jadi sekitar 650px lebih tinggi di 1440px. Kalau proporsi lama yang
diinginkan, ubah nilai `nav:`-nya — jangan mengembalikan build beku.

## Cara mengubah isi

### Teks

Cari kalimatnya di `src/components/`, ketik ulang. HMR menyegarkan sendiri.

### Foto

Timpa `public/assets/photo/foto.jpeg`, lalu **sesuaikan aspect ratio frame-nya**
di `src/components/Hero.jsx`: `aspect-[853/1280]` adalah rasio berkas yang
sekarang. Kalau terlewat, akan muncul pita kosong di satu sumbu dan jarak foto
ke garis frame tidak lagi sama di keempat sisinya.

### Sertifikat

1. Taruh PDF **dan** gambar preview-nya (JPG, lebar sekitar 900px) di
   `public/assets/certificate/`, dengan **nama dasar yang sama** — nama itu
   dipakai dua kali, untuk `.pdf` yang dibuka dan `.jpg` yang di-render.
2. Tambahkan satu entri ke array `SERTIFIKAT` di paling atas
   `src/components/Sertifikat.jsx`: `berkas`, `judul`, `sumber`, `ikon`,
   `rinci`.

Tidak ada markup yang perlu disalin — keenam panelnya dihasilkan dari array itu.
Angka jumlah sertifikat di bagian Pendidikan juga ikut sendiri, karena ia
menghitung `[data-panel]`.

Bagian ini **galeri akordeon**: satu panel terbuka, sisanya menyempit jadi
bilah. Mendatar di semua lebar viewport. Menambah sertifikat membuat tiap bilah
makin sempit, jadi di atas sekitar sepuluh panel pertimbangkan layout lain.

**Yang membuka panel berbeda per device**, dan ini yang paling mudah terlewat
saat menyunting bagian ini:

| device | cara menelusuri | cara membuka PDF |
|---|---|---|
| pointer halus | hover | klik |
| sentuh | **scroll** — lintasan galeri dibagi jadi satu pita per panel | ketuk panel yang terbuka |

Hover tidak punya padanan di layar sentuh, jadi di sana posisi scroll yang
mengambil perannya. Konsekuensinya **jumlah sertifikat menentukan lebar tiap
pita**: enam panel dapat sekitar 63px scroll masing-masing di ponsel. Kalau
jumlahnya digandakan, tiap pita jadi separuhnya dan panel akan berkedip cepat
saat di-scroll — itu batas praktis yang lain, di samping lebar bilah.

Kalimat petunjuk di atas galeri ada **dua**, dan yang tampil dipilih
`@media (hover: hover)` di `index.css`, bukan JavaScript. Kalau cara
berinteraksinya diubah, ubah keduanya. Kalimat yang menjanjikan sesuatu yang
tidak terjadi lebih buruk daripada tidak ada kalimat.

### Pengalaman kerja

Salin satu blok `<article data-kartu>` di `src/components/Pengalaman.jsx`. Titik
pemilih di bawah tumpukan ikut sendiri — jumlahnya dihitung dari jumlah card.

Tumpukannya **menyamakan tinggi semua card ke yang tertinggi**, dan tinggi itu
diukur, bukan dipatok. Jadi rincian pekerjaan boleh sepanjang apa pun tanpa ada
yang terpotong. Kalau satu card jauh lebih panjang dari yang lain, yang pendek
akan menyisakan ruang kosong di bawah, jadi seimbangkan jumlah butirnya.

### Kemampuan profesional

Lima card berikon di `src/components/Keahlian.jsx`. Dua hal kalau menambah atau
menghapus:

- **Ikon, judul, dan keterangan harus jadi anak langsung `.skill-card`.**
  Ketiganya menempati row-nya masing-masing lewat `grid-template-rows: subgrid`,
  dan itulah yang membuatnya lurus sejajar dengan card sebelahnya.
- **Jumlah kolomnya terikat ke jumlah card.** Sekarang grid-nya enam kolom: tiga
  card pertama merentang dua kolom, dua terakhir merentang tiga.

### Teknologi dan Perkakas

Ini **dua bagian terpisah**, dan pemisahan itu disengaja. `Teknologi` berisi apa
yang dipakai membangun situs — bahasa, framework, basis data. `Perkakas` berisi
aplikasi yang dibuka lalu dipakai. Menaruh bahasa pemrograman di bawah judul
"Perkakas" kira-kira sama dengan menyebut bahasa Indonesia sebagai alat tulis.

```
Teknologi   Frontend        HTML, CSS, JavaScript, Tailwind CSS   (4)
            Backend         PHP, Laravel, Blade, MySQL            (4)

Perkakas    Pengembangan    VS Code, GitHub, Vercel, Figma        (4)
            Pengajaran      Google Classroom, Wayground           (2)
            Administrasi    MS Office, Google Workspace           (2)
            AI              Claude, Claude Code, Stitch           (3)
```

Jumlah card per baris ditentukan oleh Anda, bukan lebar layar: sama persis di
ponsel, tablet, maupun desktop.

**Kalau menambah atau menghapus card, `data-delay`-nya harus dihitung ulang.**
Tiap card naik 0,03 detik berurutan, dan label tiap kelompok memakai delay card
pertamanya. Kedua bagian itu **rantai terpisah** yang sama-sama mulai dari nol —
`Teknologi` 0 → 0,21, `Perkakas` 0 → 0,30. Jangan disambung: dengan satu rantai,
card terakhir jatuh di sekitar 0,48 detik dan pembaca sudah melewatinya sebelum
ikonnya datang. Rantai `.skill-grid` di blok kemampuan profesional (0 / 0,04 /
0,08 / 0,12 / 0,16) terpisah lagi dan kebetulan memakai atribut yang sama.

Untuk lambangnya, **buka situs resmi tool-nya, bukan kumpulan icon pihak
ketiga.** Tiga jebakan yang sudah pernah kena:

- **Warna di halaman mereka belum tentu warna mereknya.** Lambang Wayground
  tampil krem di situs mereka semata karena latar halamannya merah tua; warna
  mereknya merah muda. Kalau ragu, buka favicon-nya.
- **Sebagian merek tidak punya berkas lambang sama sekali.** Wordmark Stitch
  adalah teks hidup. SVG-nya di sini dibuat dengan mengurai font yang dimuat
  halaman itu.
- **Palet lama masih banyak beredar.** Figma sudah berganti.

### Warna

Semua di blok `@theme` paling atas `src/index.css`. Ubah satu nilai dan seluruh
situs ikut, termasuk class seperti `bg-accent` dan `text-text-muted`, karena
keduanya dihasilkan dari token yang sama.

## Yang perlu diketahui sebelum mengutak-atik

**Semua spacing kelipatan 4px, dan hampir semua ukuran font juga.** Satu satuan
Tailwind 0,25rem = 4px: `mb-4` jadi 16px, `gap-6` jadi 24px. Jangan pakai class
pecahan seperti `py-1.5`. Margin tepi halaman `px-4` (16px).

Ukuran font memakai sepuluh langkah: 12, 14, 16, 18, 20, 24, 28, 40, 52, 68.
Delapan di antaranya kelipatan 4; **14 dan 18 sengaja dikecualikan**, karena
tanpa keduanya `-body-small` dan `-title-4` runtuh jadi 16px dan tiga tingkat
hierarki hilang sekaligus.

**`wide:` dan `roomy:` bukan sekadar lebar.** Keduanya juga menanyakan
orientation, dan `roomy:` menanyakan height, supaya tablet potret tidak dipaksa
layout dua kolom. Definisinya `@custom-variant` di `src/index.css`, bersama
`pendek:` untuk ponsel yang diputar.

**Gerak dipasang lewat `useLayoutEffect` dan WAJIB men-teardown dirinya.** React
StrictMode melakukan mount-unmount-mount tiap effect di mode development, dan
node DOM-nya tidak dibuat ulang. Tanpa teardown, tiap listener dan scroll
trigger terpasang dua kali. Karena itu setiap side effect di `src/lib/animasi.js`
didaftarkan lewat `dengar()`, `tambahTicker()`, `amati()`, dan `tambahSimpul()` —
jangan panggil `addEventListener`, `gsap.ticker.add`, `new ResizeObserver`, atau
`appendChild` secara langsung.

`tambahSimpul()` yang paling mudah terlupa, karena `removeEventListener()` tidak
mengeluarkan node dari DOM — jadi `appendChild()` adalah side effect tersendiri.
StrictMode menjalankan mount → unmount → mount pada host node yang sama,
sehingga `appendChild` yang tidak terdaftar berjalan dua kali dan **menumpuk,
bukan menimpa**: `.chapter-dot` pernah jadi 12 (seharusnya 6) dan anak
`.marquee-track` jadi 7 (seharusnya 4), tanpa satu pun error terlempar. Chapter
bar tampil utuh tapi separuh titiknya diam saat diklik.

### Lompatan antar bagian harus mendarat di 0

Semua lompatan bermuara ke satu `scrollTo()` di `animasi.js`, dan tepi atas
section tujuan harus berhenti **persis** di tepi atas viewport.

**Jangan memasang `scroll-mt-*` pada `<section id>`.** Class itu menghasilkan
`scroll-margin-top`, yang dibaca Lenis (juga `scrollIntoView()` bawaan) sebagai
cadangan ruang, sehingga titik berhentinya jadi `offsetTop - nilai` — dulu
`scroll-mt-24` membuat setiap lompatan meleset tetap 96px di semua lebar.
Cadangan itu gunanya menghindari header `position: fixed`; halaman ini tidak
punya, chapter bar-nya di bawah. Jarak di atas judul sudah dari padding section.

**Komentar di dalam berkas menjelaskan KENAPA, bukan apa.** Sebagian besar angka
di proyek ini hasil pengukuran, bukan selera.

## Cara deploy

Ada build step, jadi tidak bisa lagi sekadar menyeret folder.

Di Vercel: framework preset **Vite**, build command `npm run build`, output
directory `dist`. Kalau di-import dari repo ini, Vercel memilih itu sendiri.

Setelah mengubah apa pun yang berhubungan dengan deployment, **buka situs yang
tayang dan pastikan perubahannya benar-benar ada di sana.** Pernah terjadi
`git push` sukses berminggu-minggu sementara Vercel diam-diam terus menayangkan
build lama yang berhasil, karena setiap build baru gagal. `git push` yang sukses
tidak membuktikan apa pun.
