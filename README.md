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
index.html                kerangka: meta tag, favicon, satu <div id="root">
src/main.jsx              entry point React, tempat font dibundel
src/App.jsx               susunan bagian halaman
src/index.css             HANYA daftar @import — tidak ada aturan di sini
src/components/           satu berkas per bagian halaman
  Icon.jsx                14 ikon SVG sebaris (pengganti Font Awesome)
src/styles/               CSS, dipecah per bidang
  theme.css               @theme, custom variant, alias token
  base.css                body, skala tipografi, aturan lintas bagian
  tools-grid.css          grid Teknologi & Perkakas
  hero.css                Beranda: container query + judul fluid
  skills.css              card peran, kemampuan profesional, logo cincin
  intro.css               panel pembuka
  certificates.css        galeri akordeon
  experience.css          stack card pengalaman
src/lib/animations/       motion, dipecah per bidang
  index.js                pintu masuk + urutan penyalaan + teardown
  lifecycle.js            keempat pendaftar teardown (ini `ctx`)
  tokens.js               angka dan lengkung motion
  dom.js                  pembantu pencari elemen, deteksi perangkat
  scroller.js             Lenis + satu-satunya pintu untuk melompat
  builders.js             penyuntik struktur, jalan paling awal
  reveals.js              motion masuk yang digerakkan scroll
  role-cards.js           sorot berpindah di bagian Keahlian
  card-swap.js            stack card pengalaman
  gallery.js              galeri akordeon sertifikat
  ambient.js              garis latar + band berjalan
  behaviors.js            typewriter, bar status, tombol, formulir
  intro.js                monogram pembuka
public/assets/            foto, sertifikat, logo tool
tools/og-template.html    sumber gambar OG preview (tidak ikut di-deploy)
```

Yang perlu Anda sunting hampir selalu ada di `src/components/`.

**Dipecah pada 19 Agustus 2026, dan pemecahannya mekanis.** Sebelumnya CSS-nya
satu berkas 1.711 baris dan motion-nya satu berkas 2.336 baris. Tidak ada satu
aturan CSS atau satu baris logika pun yang ditulis ulang — badan tiap fungsi
dipotong apa adanya. Buktinya: CSS hasil build sebelum dan sesudah dipecah
identik bita per bita setelah spasinya dinormalkan.

Dua hal yang perlu diketahui sebelum memindahkan sesuatu antar berkas:

- **Urutan `@import` di `src/index.css` adalah urutan kaskade.** Aturan tulisan
  tangan di situs ini menang atas utilitas Tailwind karena ia berdiri di luar
  `@layer` mana pun dan diimpor sesudahnya. Mengacak urutannya mematahkan itu.
- **`ctx` dioper, bukan diimpor.** Keempat pendaftar teardown memegang keadaan —
  daftar apa saja yang sudah dipasang — dan keadaan itu harus mati bersama satu
  kali pemasangan. Kalau ia diimpor sebagai singleton, mount kedua React
  StrictMode akan menumpuk ke daftar yang sama. Token dan pembantu DOM tidak
  punya keadaan, jadi keduanya memang diimpor.

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

Perkakas    Data                 Excel, PostgreSQL, DBeaver, VS Code,
                                 Anaconda, Data Studio, Power BI,
                                 Tableau                                  (8)
            Pengajaran           Google Classroom, Wayground              (2)
            Administrasi         MS Office, Google Workspace              (2)
            AI                   Claude, Claude Code                      (2)
```

**Pengelompokannya ditentukan oleh Anda, bukan lebar viewport** — kelompok berisi
delapan card selamanya berisi delapan. Yang ikut lebar viewport hanya berapa baris
yang dipakai untuk menampungnya, dan sejak kelompok `Data` berisi tujuh ia **dua
baris di semua lebar**. Sejak berisi delapan (22 Agustus 2026, masuknya Data
Studio) pecahnya jadi **4+4** — dua baris penuh, tanpa card yang menggantung
sendiri di baris kedua. Pecahnya sengaja dibuat **rata dan sama di semua lebar** —
bukan 4+4 di satu lebar dan 6+2 di lebar lain.

Delapan card tidak menuntut satu pun angka CSS dihitung ulang: pembagi `25%`
sudah menghasilkan 4+4 dengan sendirinya. Itu satu-satunya penambahan card di
grid ini yang gratis dari sisi layout.

**Satu angka yang mengaturnya: lebar card `25%`**, di `src/index.css`, berlaku di
semua lebar viewport. Empat per baris karena itu terjadi dengan sendirinya, dan
card ikut ruang yang tersedia — 211px pada desktop, 180px pada 768px, 89,5px pada
390px. Sampai 18 Agustus 2026 angkanya ada tiga (`25%` di bawah 1180px, `8,5rem`
di atasnya, dan batas `34rem` pada `.tool-items--four`); dua yang terakhir dibuang
karena syarat yang dulu melahirkannya — enam card muat satu baris — sudah gugur
sejak baris `Data` pecah 4+3. Yang tersisa dari keduanya cuma akibatnya: empat
card berhenti di 544px dari 844px yang ada, dan kelompok berisi dua di 272px,
sehingga tiap baris di desktop menyisakan 300-572px kosong di kanan.

**Isinya rata kiri**, dan itu keputusan yang sempat dibalik dua kali dalam sehari
pada 18 Agustus 2026 — dipusatkan, lalu dikembalikan atas permintaan. Riwayatnya
dicatat di komentar `.tool-items` supaya tidak dibalik lagi tanpa sengaja.

Hasilnya terukur: di 320, 360, 375, 390, 430, 768, 1024, 1180, 1440, dan 1920px,
card pertama **kelima kelompok berdiri di titik x yang sama persis**, dan keempat
kolomnya lurus menembus semuanya — termasuk baris kedua kelompok `Data`. Yang
membuat itu berlaku di semua lebar adalah card 25%; dulu kelurusan ini dijaga
lebar tetap 8,5rem yang cuma hidup di desktop. Tidak ada satu lebar pun yang
meluber mendatar.

**Nama yang pecah dua baris di layar sempit**, diukur pada build produksi:

| lebar | nama yang pecah dua baris |
|---|---|
| 320px | Data Studio, Google Classroom, MS Office, Google Workspace, Claude Code |
| 360px | Data Studio, Google Classroom, Google Workspace, Claude Code |
| 375–390px | Google Classroom, Google Workspace, Claude Code |
| ≥430px | Google Classroom, Google Workspace |

Itu konsekuensi card 25%, bukan cacat: yang hilang kelonggarannya, bukan
keterbacaannya. Kalau salah satu mau dipaksa muat, yang disentuh **padding card**
(`px-2`), bukan pembagi 25% — dan padding itu ikut dihitung di dua tempat lain di
`src/styles/tools-grid.css`.

Kalau suatu saat ada yang berpikir memusatkannya lagi: pemusatan bekerja per
baris, bukan per kelompok, jadi kelompok yang berisi satu atau dua card terlepas
jauh dari labelnya — Python dan SQL berhenti di tengah baris, 316px dari garis
rambutnya — sementara baris `Data` tetap mulai dari kiri.

Satu baris berisi delapan **tetap tidak bisa** dipaksakan di desktop, dan itu
sudah diukur: isi baris tidak pernah lebih dari 844px sehingga delapan card
menuntut lebar ≤ 105,5px, sementara nama terpanjang di grid ini — "Google
Workspace", 108,1px pada 12px Inter — menuntut card ≥ 124,1px. Selisihnya 18,6px
(waktu card-nya masih tujuh: 3,5px), jadi pintunya tertutup lebih rapat, bukan
terbuka sedikit. Kalau tetap dipaksakan, yang pecah dua baris justru nama di
kelompok `Administrasi`.

**Kalau menambah atau menghapus card, `data-delay`-nya harus dihitung ulang —
tapi sekarang hanya di kelompoknya sendiri.** Tiap card naik 0,03 detik
berurutan, dan label tiap kelompok memakai delay card pertamanya.

**Sejak 22 Agustus 2026 tiap kelompok punya rantainya sendiri, mulai dari nol:**

```
Teknologi   Bahasa Pemrograman   0
            Bahasa Kueri         0,03
Perkakas    Data                 0 → 0,21   (delapan card)
            Pengajaran           0 → 0,03
            Administrasi         0 → 0,03
            AI                   0 → 0,03
```

Sebelumnya `Perkakas` satu rantai menyambung yang berakhir di 0,36, dan masuknya
Data Studio akan mendorongnya ke 0,42. Angka 0,36 itu sendiri sudah pernah
dianggap terlalu panjang dan ditarik ke 0,33 pada 15 Agustus 2026, lalu kembali
ke 0,36 waktu DBeaver masuk — dan catatan waktu itu sudah menuliskan syaratnya:
kalau ada satu card lagi ditambahkan, mulai rantai baru per kelompok. Card
kesembilan itu Data Studio.

Alasannya bukan angkanya semata. Card terakhir yang jatuh terlalu jauh membuat
pembaca sudah melewatinya sebelum ikonnya datang, dan di rantai menyambung ongkos
itu ditanggung kelompok yang paling tidak bersalah: `AI` cuma berisi dua card tapi
menunggu paling lama, semata karena berdiri paling bawah.

Rantai `.skill-grid` di blok kemampuan profesional (0 / 0,04 / 0,08 / 0,12 / 0,16)
terpisah lagi dan kebetulan memakai attribute yang sama.

**Nama kelompok terpanjang mengikat satu angka di CSS.** `.tool-label` dipatok
lebar tetap supaya garis rambut kelima kelompok lurus sejajar, dan lebarnya
sekarang 12rem — pas untuk "BAHASA PEMROGRAMAN" (168,5px) plus kelonggaran.
Label yang lebih panjang dari itu akan pecah dua baris dan kelurusannya hilang;
hitungannya ada di komentar aturan `.tool-label` di `src/index.css`.

Untuk logo-nya, **buka situs resmi tool-nya, bukan kumpulan icon pihak
ketiga.** Jebakan yang sudah pernah kena:

- **URL yang menjawab 200 tidak membuktikan asetnya masih dipakai.** Google
  melayani dua berkas berjudul sama persis, `ic_data_studio.svg`, di dua path
  berbeda: `analytics-lego` (dua simpul terhubung — yang dipakai sekarang) dan
  `analytics-suite/header/suite/v2` (tiga bar bertitik — lambang generasi
  sebelumnya). Keduanya menjawab 200. Yang kedua sempat terpasang di situs ini
  dan tidak ada satu pun tanda bahwa itu keliru — yang menemukannya pemiliknya
  sendiri, karena ia membuka aplikasinya dan logonya berbeda. **Ambil URL-nya
  dari HTML halaman yang sedang tayang**, jangan menebak nama berkas: nama
  berkas bertahan melewati pergantian logo.
- **Warna di halaman mereka belum tentu warna mereknya.** Logo Wayground
  tampil krem di situs mereka semata karena latar halamannya merah tua; warna
  mereknya merah muda. Kalau ragu, buka favicon-nya.
- **Warna merek yang benar pun belum tentu terbaca di latar segelap ini.**
  Warna resmi DBeaver `#382923` cuma berkontras 1,47:1 di atas `#040508` —
  bukan "agak redup" melainkan praktis tak terlihat, dan yang tampak di grid
  cuma petak kosong tanpa satu pun pesan galat. Jalan keluarnya **terangkan
  pada rona aslinya, jangan diganti warnanya**: rona dan kejenuhannya
  dipertahankan persis, hanya kecerahannya yang dinaikkan (DBeaver 17,84% →
  60%, jadi `#B18F81`). Sasarannya bukan ambang aksesibilitas melainkan
  **tetangga di barisnya sendiri** — Tableau 6,85:1, Anaconda 6,69:1, Excel
  6,30:1 — supaya logo baru tidak jadi yang paling terang dan menarik mata
  lebih dulu. Logo yang aslinya putih atau hitam polos beda urusan: itu
  dipukul rata `#d8d8d8`.
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
- **Pastikan `viewBox`-nya memang ada.** `google-classroom.svg` ternyata tidak
  punya sama sekali — cuma `width`/`height` 108 — dan itu lolos bertahun-tahun
  karena kebetulan: peramban memakai kedua angka itu sebagai ukuran bawaan lalu
  menskalakan seluruh gambarnya. Yang membuatnya berbahaya adalah aturan di
  atas: siapa pun yang membuang `width`/`height` sesuai anjuran itu akan
  menghapus satu-satunya keterangan ukuran yang dimiliki berkas ini, dan
  logonya melar memenuhi petaknya. `viewBox="0 0 108 108"` sudah ditambahkan;
  tampilannya tidak berubah sedikit pun.

Sesudah logonya terpasang, **bandingkan tingginya dengan tetangga di baris atau
kolom yang sama.** Banyak berkas logo membawa ruang kosong bawaan di tepinya,
dan akibatnya logo itu tampil lebih kecil tanpa terlihat salah. Tujuh sudah
dikoreksi dengan `scale()`: Data Studio 1,27, Google Classroom 1,25, Power BI
1,2, Claude 1,14, PostgreSQL 1,09, SQL 1,06, dan Claude Code 1,26. Keenam yang
pertama memakai **rasio kotak dibagi rasio tinta**, bukan tebakan — dengan begitu
satu angka benar di kedua ukuran kotak sekaligus. Hitungan tiap logo ada di
komentar card-nya masing-masing.

**Sebelum menskalakan, pastikan `getBBox()` mengukur tinta — bukan kotak kosong.**
Berkas Data Studio dari Google datang dengan sebuah `<path fill="none">` selebar
viewBox-nya, sisa perkakas gambar yang tidak menggambar apa pun. `getBBox()`
menghitung elemen tak berisi juga, jadi ia melaporkan tinta 512x512 di dalam
viewBox 512x512 — rapat sempurna — padahal tinta sebenarnya 404x404. Siapa pun
yang mengukur berkas itu apa adanya akan menyimpulkan tidak perlu diskalakan, dan
logonya tampil 21% lebih kecil daripada tetangganya tanpa satu pun pesan galat.
Path itu sudah dibuang; kalau ada berkas baru yang membawanya, buang juga.

**Claude Code satu-satunya yang tidak disamakan tingginya**, dan itu perubahan
18 Agustus 2026. Ia sempat 1,6 — angka yang benar menurut aturan di atas, sebab
tintanya cuma mengisi 62,5% tinggi `viewBox`-nya. Tapi tintanya **bujur panjang
1,6:1** sementara hampir semua logo lain bujur sangkar, dan menyamakan tinggi
dua bentuk yang berbeda perbandingan tidak menyamakan besarnya di mata: pada 1,6
ia tergambar 57,6 × 36px, terlebar di seluruh grid setelah wordmark Workspace,
dan luasnya 1,6 kali Claude tepat di sebelahnya.

Yang disamakan sekarang **rata-rata geometriknya** (akar dari lebar dikali
tinggi), ukuran yang tidak berpihak pada satu sumbu. Claude 35,8; Claude Code
pada 1,6 sebesar 45,5. Supaya keduanya bertemu di 36, skalanya cukup diakarkan:
√1,6 = 1,2649 → **1,26**, dan tintanya jadi 45,4 × 28,4px dengan rata-rata
geometrik 35,9. Jadi ia memang lebih pendek daripada logo lain, dan itu harga
yang dibayar: bentuk 1,6:1 tidak bisa sekaligus setinggi dan seramping bentuk
bujur sangkar.

**Wayground kasus yang sama dan belum dikerjakan** — tintanya 52,4 × 36px,
rata-rata geometrik 43,4. Ia dibiarkan karena selisihnya dengan tetangganya jauh
lebih kecil (Google Classroom 38,3), tapi kalau aturan ini mau ditegakkan
menyeluruh, ia yang berikutnya: skalanya 0,83.

Di luar kedua logo melebar itu, **rentang tinggi tinta seluruh grid 0,5px**
(35,5–36,0px di desktop, 31,6–32,0px di bawah 900px), dan pusat tiap logo maupun
namanya meleset paling jauh 0,01px dari sumbu card-nya. Kedua angka itu terukur
di sembilan lebar viewport, 320px sampai 1920px.

**Lebar logo dipagari `.tool-icon` di 7,5rem**, dan itu perlu karena kotak
ikonnya `w-full` — selebar card-nya. Logo bujur sangkar tidak terpengaruh
(mereka dibatasi tinggi), tapi wordmark Google Workspace yang 7,76:1 dulu
memakan seluruh ruang yang diberikan: 220px pada 1024px, lalu jatuh ke 120px
begitu melewati 1180px. Sekarang ia berhenti di 120px dan sama di 640px ke atas.
(Angka itu dulu diturunkan dari lebar isi card di desktop, waktu card masih
dipatok 8,5rem; sejak card jadi 25% ia berdiri sebagai batas mutlak, dan itu
justru membuatnya tidak ikut bergeser saat lebar card diutak-atik.) Di bawah
640px ia tetap menyusut
bersama card-nya (73,5x9,5px pada 390px), dan **itu tidak bisa dibereskan dari
CSS**: perbandingan 7,76:1 dalam petak setinggi 32px menuntut lebar 248px,
sementara card ponsel cuma 89,5px. Jalan keluar sungguhannya mengganti
berkasnya dengan logomark persegi Google Workspace, bukan wordmark penuhnya.

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
pecahan seperti `py-1.5`.

**Margin tepi halaman satu-satunya yang dikecualikan dari aturan 4px itu.** Ia
`px-gutter`, dan nilainya `clamp(1rem, 5vw, 2.5rem)` — token `--spacing-gutter`
di blok `@theme`. Jadi 16px pada 320px, 19,5px pada 390px, 32px pada 640px, dan
berhenti di 40px dari 800px ke atas. Sampai 18 Agustus 2026 ia rantai
`px-4 sm:px-6 nav:px-10` di sembilan tempat: 16px yang sama rata untuk semua
ponsel, lalu melompat 16px sekaligus di 900px. Yang dijaga sekarang
proporsinya terhadap lebar screen (5%), bukan kelipatannya — dan kedua hal itu
tidak bisa dipenuhi bersamaan. Alasan lengkapnya di komentar token itu.

Kalau nilainya diubah, kesembilan tempat ikut sendiri, termasuk bar status —
yang memang harus lurus dengan tepi isi halaman, dan sebelum ini tidak.

Font size memakai sepuluh langkah: 12, 14, 16, 18, 20, 24, 28, 40, 52, 68.
Delapan di antaranya kelipatan 4; **14 dan 18 sengaja dikecualikan**, karena
tanpa keduanya `-body-small` dan `-title-4` runtuh jadi 16px dan tiga tingkat
hierarki hilang sekaligus.

**`wide:` dan `roomy:` bukan sekadar lebar.** Keduanya juga menanyakan
orientation, dan `roomy:` menanyakan height, supaya tablet potret tidak dipaksa
layout dua kolom. Definisinya `@custom-variant` di `src/index.css`. `short:`
sudah dibuang pada 18 Agustus 2026 — lihat bagian Beranda di bawah.

### Beranda: fotonya yang menyerap, bukan jaraknya

Beranda pernah jadi bagian paling sering berantakan saat ganti device, dan
sebabnya struktural: tingginya dipatok `100svh` tapi ukuran isinya dihitung
tanpa melihat tinggi itu, sehingga yang menyerap selisih adalah **jarak** antar
blok — padahal jarak tidak bisa negatif. Terukur di 375x667: jarak judul ke foto
**−3px**, dan garis pemisah baris ketiga memotong bingkai fotonya.

Yang dibalik pada 18 Agustus 2026: **foto** jadi elemen lenturnya
(`flex-1 min-h-0`), jaraknya jadi `clamp()` yang mengalir, dan tingginya
`h-svh` — bukan `min-h-svh`, sebab `min-height` boleh tumbuh dan itulah yang
dulu membuat tidak ada satu pun yang terpaksa menyusut. Angka `min()` yang dulu
menentukan ukuran foto kini cuma langit-langitnya.

Hasilnya foto menempati **36% tinggi layar di semua ukuran tegak** — 320x568,
375x667, 390x844, 430x932, dan 768x1024 semuanya 35,9–36,1% — dan tidak ada satu
lebar pun yang meluber, termasuk 844x390 (ponsel diputar).

Tiga hal lain yang ikut:

- **Beranda jadi container** (`container-type: inline-size`), dan semua `clamp()`
  di dalamnya memakai `cqi`, bukan `vw`.
- **Judulnya fluid**: `clamp(2.25rem, min(9.2cqi, 13svh), 6.75rem)`. Skala lama
  mematoknya 40px yang **sama persis untuk semua ponsel** (375, 390, dan 430
  tidak berbeda sedikit pun) sementara fotonya ikut mengecil — satu sumbu, dua
  aturan. `13svh` di dalamnya penjaga ponsel mendatar; tanpa itu 844x390 dapat
  judul 77,6px dan meluber 47px.
- **Rasio dipasang di bingkai** (`aspect-[7/10]`), bukan di elemen dalam: lebar
  shrink-to-fit dihitung dari max-content anaknya, dan anak ber-rasio yang
  tingginya baru pasti setelah flex selesai melapor lebar asli berkas fotonya —
  terukur bingkai jadi 338px di layar 375px.
- **Padding bingkai TETAP 12px, jangan persen.** Persentase padding dihitung
  dari lebar container, bukan lebar elemennya sendiri; `p-[7%]` yang sempat
  dipakai menghasilkan jarak foto ke garis 23,6px di ponsel, **48,4px di
  tablet**, dan 18,9px di desktop — tablet paling parah justru karena barisnya
  paling lebar, dan fotonya terlihat tenggelam di bingkai yang longgar. Dengan
  12px tetap, jaraknya 13px di semua device.
- **Foto tidak boleh jadi spotlight.** Terukur sekarang: 31–33,5% tinggi layar
  di semua ukuran tegak, 35% di ponsel diputar, 40% di desktop.

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
