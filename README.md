# Web Profil — Arif Herfian Zaen Chartiko

Situs satu halaman. **React 19 + Vite + Tailwind CSS v4**, dengan GSAP
(ScrollTrigger) dan Lenis sebagai mesin motion-nya.

## Prasyarat

Node 18 atau lebih baru, dan npm.

## Cara menjalankan

```
npm install     # sekali saja
npm run dev     # buka alamat yang muncul, biasanya http://localhost:5173
```

`npm run build` menghasilkan folder `dist/`. `npm run preview` menayangkan hasil
build itu supaya bisa diperiksa sebelum deploy.

**Klik dua kali `index.html` TIDAK bekerja.** File itu cuma kerangka; isinya
di-mount React saat runtime. Ini konsekuensi yang disengaja dari kembali ke
React — versi situs ini yang lebih lama memang benar-benar bisa dijalankan
langsung dari filesystem.

## Struktur proyek

```
index.html            kerangka: meta tag, favicon, satu <div id="root">
src/main.jsx          entry point React, dan tempat font + ikon dibundel
src/App.jsx           susunan bagian halaman
src/index.css         theme Tailwind + seluruh CSS tulisan tangan
src/components/       satu file per bagian halaman
src/lib/animations.js    seluruh motion situs, dalam satu file
public/assets/        foto, sertifikat, logo tool
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
bekerja sejak file itu dibuat, dan `mt-10` mati waktu dipasang. Sekarang class
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
di `src/components/Hero.jsx`: `aspect-[853/1280]` adalah rasio file yang
sekarang. Kalau terlewat, akan muncul band kosong di satu sumbu dan jarak foto
ke garis frame tidak lagi sama di keempat sisinya.

### Sertifikat

1. Taruh PDF **dan** gambar preview-nya (JPG, lebar sekitar 900px) di
   `public/assets/certificate/`, dengan **nama dasar yang sama** — nama itu
   dipakai dua kali, untuk `.pdf` yang dibuka dan `.jpg` yang di-render.
2. Tambahkan satu entri ke array `CERTIFICATES` di paling atas
   `src/components/Certificates.jsx`: `file`, `title`, `source`, `icon`,
   `detail`.

Tidak ada markup yang perlu disalin — keenam panelnya dihasilkan dari array itu.
Angka jumlah sertifikat di bagian Pendidikan juga ikut sendiri, karena ia
menghitung `[data-panel]`.

Bagian ini **accordion gallery**: satu panel terbuka, sisanya menyempit jadi
bar. Mendatar di semua lebar viewport. Menambah sertifikat membuat tiap bar
makin sempit, jadi di atas sekitar sepuluh panel pertimbangkan layout lain.

**Yang membuka panel berbeda per device**, dan ini yang paling mudah terlewat
saat menyunting bagian ini:

| device | cara menelusuri | cara membuka PDF |
|---|---|---|
| pointer halus | hover | klik |
| sentuh | **scroll** — lintasan gallery dibagi jadi satu band per panel | ketuk panel yang terbuka |

Hover tidak punya padanan di touch screen, jadi di sana posisi scroll yang
mengambil perannya. Konsekuensinya **jumlah sertifikat menentukan lebar tiap
band**: enam panel dapat sekitar 63px scroll masing-masing di ponsel. Kalau
jumlahnya digandakan, tiap band jadi separuhnya dan panel akan berkedip cepat
saat di-scroll — itu batas praktis yang lain, di samping lebar bar.

Kalimat petunjuk di atas gallery ada **dua**, dan yang tampil dipilih
`@media (hover: hover)` di `index.css`, bukan JavaScript. Kalau cara
berinteraksinya diubah, ubah keduanya. Kalimat yang menjanjikan sesuatu yang
tidak terjadi lebih buruk daripada tidak ada kalimat.

### Pengalaman kerja

Salin satu blok `<article data-card>` di `src/components/Experience.jsx`. Selector
dot di bawah stack ikut sendiri — jumlahnya dihitung dari jumlah card.

Stack-nya **menyamakan tinggi semua card ke yang tertinggi**, dan tinggi itu
diukur, bukan dipatok. Jadi rincian pekerjaan boleh sepanjang apa pun tanpa ada
yang terpotong. Kalau satu card jauh lebih panjang dari yang lain, yang pendek
akan menyisakan ruang kosong di bawah, jadi seimbangkan jumlah butirnya.

### Kemampuan profesional

Lima card berikon di `src/components/Skills.jsx`. Dua hal kalau menambah atau
menghapus:

- **Ikon, judul, dan keterangan harus jadi anak langsung `.skill-card`.**
  Ketiganya menempati row-nya masing-masing lewat `grid-template-rows: subgrid`,
  dan itulah yang membuatnya lurus sejajar dengan card sebelahnya.
- **Jumlah kolomnya terikat ke jumlah card.** Sekarang grid-nya enam kolom: tiga
  card pertama merentang dua kolom, dua terakhir merentang tiga.

### Teknologi dan Perkakas

Ini **dua bagian terpisah**, dan batasnya satu pertanyaan: apakah ia aplikasi?
`Teknologi` berisi yang bukan — bahasa, yang ditulis dan dibaca. `Perkakas`
berisi aplikasi yang dibuka lalu dipakai. Menaruh bahasa pemrograman di bawah
judul "Perkakas" kira-kira sama dengan menyebut bahasa Indonesia sebagai alat
tulis.

Batas itu juga yang menjawab kenapa SQL dan PostgreSQL berdiri di bagian yang
berbeda padahal keduanya soal basis data: SQL bahasa untuk bertanya, PostgreSQL
program yang menjawab.

```
Teknologi   Bahasa Pemrograman   Python                                   (1)
            Bahasa Kueri         SQL                                      (1)

Perkakas    Data                 Excel, PostgreSQL, VS Code,
                                 Anaconda, Power BI, Tableau              (6)
            Pengajaran           Google Classroom, Wayground              (2)
            Administrasi         MS Office, Google Workspace              (2)
            AI                   Claude, Claude Code                      (2)
```

**Pengelompokannya ditentukan oleh Anda, bukan lebar viewport** — kelompok berisi
enam card selamanya berisi enam. Yang ikut lebar viewport hanya berapa baris yang
dipakai untuk menampungnya: sampai 1180px, kelompok `Data` turun jadi dua baris
berisi tiga-tiga, dan dari 1180px ke atas keenamnya berjajar satu baris. Pecahnya
sengaja dibuat **rata dan sama di semua lebar** — bukan 4+2 di satu lebar dan 5+1
di lebar lain. Dua angka yang mengaturnya ada di `src/index.css`: `33,3333%` di
bawah 1180px dan `8,5rem` di atasnya, keduanya dihitung dari jumlah card
terbanyak.

**Kalau menambah atau menghapus card, `data-delay`-nya harus dihitung ulang.**
Tiap card naik 0,03 detik berurutan, dan label tiap kelompok memakai delay card
pertamanya. Kedua bagian itu **rantai terpisah** yang sama-sama mulai dari nol —
`Teknologi` 0 → 0,03, `Perkakas` 0 → 0,33. Jangan disambung: satu rantai yang menembus
keduanya membuat card terakhir jatuh terlalu jauh dan pembaca sudah melewatinya
sebelum ikonnya datang. Rantai `.skill-grid` di blok kemampuan profesional
(0 / 0,04 / 0,08 / 0,12 / 0,16) terpisah lagi dan kebetulan memakai attribute
yang sama.

Ekor 0,33 detik itu sudah dekat batas. Kalau kelompoknya bertambah lagi,
pertimbangkan memulai rantai baru per kelompok alih-alih terus menyambung —
keempat kelompok itu toh punya labelnya sendiri-sendiri.

**Nama kelompok terpanjang mengikat satu angka di CSS.** `.tool-label` dipatok
lebar tetap supaya garis rambut kelima kelompok lurus sejajar, dan lebarnya
sekarang 12rem — pas untuk "BAHASA PEMROGRAMAN" (168,5px) plus kelonggaran.
Label yang lebih panjang dari itu akan pecah dua baris dan kelurusannya hilang;
hitungannya ada di komentar aturan `.tool-label` di `src/index.css`.

Untuk logo-nya, **buka situs resmi tool-nya, bukan kumpulan icon pihak
ketiga.** Tiga jebakan yang sudah pernah kena:

- **Warna di halaman mereka belum tentu warna mereknya.** Logo Wayground
  tampil krem di situs mereka semata karena latar halamannya merah tua; warna
  mereknya merah muda. Kalau ragu, buka favicon-nya.
- **Sebagian merek tidak menerbitkan SVG sama sekali.** Logo VS Code di situs
  resminya berupa PNG base64 yang ditanam di dalam aturan `.navbar-brand` pada
  `/dist/style.css` — tidak ada file SVG yang bisa diunduh. SVG di repo ini
  dibangun dari PNG itu, dan warnanya diambil dari palet resmi
  (`#0065A9` / `#007ACC` / `#1F9CF0`), bukan disampel dari pikselnya — sampel
  mentahnya terbaca lebih terang karena artwork resminya menumpuk kilau putih
  tembus pandang di atasnya.
- **Palet lama masih banyak beredar.** Jangan ambil dari kumpulan icon pihak
  ketiga: file VS Code yang dulu dipakai di sini memakai `#2196f3`, biru
  Material generik yang bukan warna merek mereka.
- **`width` dan `height` di tag `<svg>` harus dibuang kalau nilainya di bawah
  36.** Kotak logonya 32px (36px di atas 900px) dan img-nya memakai
  `max-h-full max-w-full`, yang cuma mengecilkan dan tidak pernah membesarkan.
  SVG berukuran bawaan 18x18 karena itu tergambar 18px apa adanya, separuh
  tetangganya, tanpa satu pun pesan galat — persis yang terjadi pada `sql.svg`
  waktu ia ditambahkan. Yang bawaannya lebih besar dari 36 aman karena ikut
  terpangkas (Power BI 48, Google Classroom 108); sisanya cukup dibuang kedua
  atributnya, `viewBox` yang menentukan bentuknya.

Sesudah logonya terpasang, **bandingkan tingginya dengan tetangga di baris atau
kolom yang sama.** Banyak berkas logo membawa ruang kosong bawaan di tepinya,
dan akibatnya logo itu tampil lebih kecil tanpa terlihat salah. Lima sudah
dikoreksi dengan `scale()`: Google Classroom 1,25, Power BI 1,2, Claude 1,14,
PostgreSQL 1,09, SQL 1,06. Angkanya selalu **rasio kotak dibagi rasio tinta**,
bukan tebakan — dengan begitu satu angka benar di kedua ukuran kotak sekaligus.
Hitungan tiap logo ada di komentar card-nya masing-masing.

### Kartu pratinjau (OG image)

`public/assets/og.png` adalah gambar yang muncul saat link situs ini dibagikan
lewat WhatsApp, LinkedIn, atau X. Ia **hasil render** dari
`tools/og-template.html`, bukan gambar yang digambar terpisah — jadi warna,
tipografi, dan monogramnya persis sama dengan situsnya.

Kalau peran, nama, atau lokasi berubah, sunting templatnya lalu render ulang:

```
chrome --headless=new --disable-gpu --hide-scrollbars \
       --force-device-scale-factor=1 --window-size=1200,630 \
       --virtual-time-budget=10000 \
       --screenshot=public/assets/og.png \
       file:///…/tools/og-template.html
```

Dua flag itu wajib, dan keduanya gagal **diam-diam** kalau dilewat:

- `--force-device-scale-factor=1` — tanpa ini Chrome ikut skala layar yang
  sedang aktif, dan di layar HiDPI hasilnya 2400x630 atau 2400x1260. Masih
  terbaca, tapi bukan ukuran yang dijanjikan `<meta property="og:image:width">`.
- `--virtual-time-budget=10000` — kedua fontnya diambil dari Google Fonts lewat
  jaringan. Tanpa menunggu, tangkapannya jadi memakai font cadangan sistem, dan
  yang keluar bukan pesan error melainkan kartu yang hurufnya meleset.

  Ini **satu-satunya tempat yang masih menyentuh Google Fonts**, dan itu tidak
  apa-apa: `tools/og-template.html` cuma dijalankan di komputer Anda saat
  membuat ulang gambar OG, tidak pernah dikirim ke pengunjung. Situsnya sendiri
  membundel kedua font itu sejak 15 Agustus 2026 — lihat `src/main.jsx`. Jadi
  butuh koneksi saat merender kartu, tapi tidak saat orang membuka situsnya.

Sesudah render, **buka gambarnya dan bandingkan dengan yang lama** sebelum
menimpanya. Yang boleh berbeda hanya bagian yang memang Anda ubah.

Satu hal yang di luar kendali repo ini: **link yang sudah terlanjur tersebar
menyimpan kartu lamanya.** WhatsApp dan LinkedIn men-cache gambar OG, jadi
memperbarui `og.png` tidak mengubah pratinjau di percakapan yang sudah ada.

### Warna

Semua di blok `@theme` paling atas `src/index.css`. Ubah satu nilai dan seluruh
situs ikut, termasuk class seperti `bg-accent` dan `text-text-muted`, karena
keduanya dihasilkan dari token yang sama.

## Yang perlu diketahui sebelum mengutak-atik

**Semua spacing kelipatan 4px, dan hampir semua font size juga.** Satu satuan
Tailwind 0,25rem = 4px: `mb-4` jadi 16px, `gap-6` jadi 24px. Jangan pakai class
pecahan seperti `py-1.5`. Margin tepi halaman `px-4` (16px).

Font size memakai sepuluh langkah: 12, 14, 16, 18, 20, 24, 28, 40, 52, 68.
Delapan di antaranya kelipatan 4; **14 dan 18 sengaja dikecualikan**, karena
tanpa keduanya `-body-small` dan `-title-4` runtuh jadi 16px dan tiga tingkat
hierarki hilang sekaligus.

**`wide:` dan `roomy:` bukan sekadar lebar.** Keduanya juga menanyakan
orientation, dan `roomy:` menanyakan height, supaya tablet potret tidak dipaksa
layout dua kolom. Definisinya `@custom-variant` di `src/index.css`, bersama
`short:` untuk ponsel yang diputar.

**Motion dipasang lewat `useLayoutEffect` dan WAJIB men-teardown dirinya.** React
StrictMode melakukan mount-unmount-mount tiap effect di mode development, dan
node DOM-nya tidak dibuat ulang. Tanpa teardown, tiap listener dan scroll
trigger terpasang dua kali. Karena itu setiap side effect di `src/lib/animations.js`
didaftarkan lewat `listen()`, `addTicker()`, `observe()`, dan `addNode()` —
jangan panggil `addEventListener`, `gsap.ticker.add`, `new ResizeObserver`, atau
`appendChild` secara langsung.

`addNode()` yang paling mudah terlupa, karena `removeEventListener()` tidak
mengeluarkan node dari DOM — jadi `appendChild()` adalah side effect tersendiri.
StrictMode menjalankan mount → unmount → mount pada host node yang sama,
sehingga `appendChild` yang tidak terdaftar berjalan dua kali dan **menumpuk,
bukan menimpa**: `.chapter-dot` pernah jadi 12 (seharusnya 6) dan anak
`.marquee-track` jadi 7 (seharusnya 4), tanpa satu pun error terlempar. Chapter
bar tampil utuh tapi separuh titiknya diam saat diklik.

### Lompatan antar bagian harus mendarat di 0

Semua lompatan bermuara ke satu `scrollTo()` di `animations.js`, dan tepi atas
section tujuan harus berhenti **persis** di tepi atas viewport.

**Jangan memasang `scroll-mt-*` pada `<section id>`.** Class itu menghasilkan
`scroll-margin-top`, yang dibaca Lenis (juga `scrollIntoView()` bawaan) sebagai
cadangan ruang, sehingga titik berhentinya jadi `offsetTop - nilai` — dulu
`scroll-mt-24` membuat setiap lompatan meleset tetap 96px di semua lebar.
Cadangan itu gunanya menghindari header `position: fixed`; halaman ini tidak
punya, chapter bar-nya di bawah. Jarak di atas judul sudah dari padding section.

**Komentar di dalam file menjelaskan KENAPA, bukan apa.** Sebagian besar angka
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
