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
  Icon.jsx                16 ikon SVG sebaris (pengganti Font Awesome)
  LanguageSwitch.jsx      tombol EN | ID di pojok kanan atas
src/i18n/lang.jsx         bahasa aktif, simpanannya, dan useText()
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
  ambient.js              jaringan simpul di latar + band berjalan
  behaviors.js            typewriter, bar status, tombol, formulir
  intro.js                monogram pembuka
public/assets/            foto, sertifikat, logo tool, gambar proyek (projects/)
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

Situsnya **dua bahasa — Inggris (bawaan) dan Indonesia**. Teks tiap bagian
ada di objek `TEXT = { en: {...}, id: {...} }` di kepala berkas
`src/components/` yang bersangkutan, bukan di dalam markup-nya. Ubah
kalimatnya **di kedua bahasa**; kalau cuma satu yang diubah, versi lainnya
tertinggal tanpa satu pun tanda. HMR menyegarkan sendiri.

Tiga teks tidak ada di komponen karena ditulis oleh kode animasi, dan
ketiganya di `src/lib/animations/`:

| teks | berkas |
|---|---|
| label bar status (About, Experience, …) | `behaviors.js`, `CHAPTER_LABELS` |
| pesan yang terkirim lewat WhatsApp/surel, dan peringatan form kosong | `behaviors.js`, `FORM_TEXT` |
| label titik pemilih kartu Pengalaman | `card-swap.js` |

Yang dibaca **sebelum** JavaScript jalan — `<title>`, deskripsi meta,
`og:*`, blok `<noscript>` di `index.html`, dan `public/assets/og.png` —
hanya ada dalam bahasa Inggris, sebab perayap dan pratinjau tautan tidak
pernah menekan tombol bahasanya.

*Bahasa awamnya:* tiap kalimat di situs ditulis dua kali, Inggris dan
Indonesia, di bagian atas berkas bagiannya masing-masing. Yang tampil di
Google dan di pratinjau WhatsApp selalu versi Inggris.

### Foto

Timpa `public/assets/photo/foto.jpeg`, lalu **buka Beranda dan periksa
hasilnya.** Bingkainya `aspect-[7/10]` di `src/components/Hero.jsx` dan fotonya
`cover`, jadi berkas dengan rasio lain tidak akan menyisakan band kosong — ia
akan **dipotong tanpa memberi tanda**, dan yang hilang duluan bagian atas kepala.
Berkas yang sekarang 853x1280 (rasio 0,666 lawan 0,7 bingkai) dan potongannya
6,4px; makin jauh rasionya dari 0,7, makin banyak yang terbuang. Kalau selisihnya
besar, ubah `aspect-[7/10]`-nya mendekati rasio berkas baru itu.

### Sertifikat

1. Taruh PDF **dan** gambar preview-nya (JPG, lebar sekitar 900px) di
   `public/assets/certificate/`, dengan **nama dasar yang sama** — nama itu
   dipakai dua kali, untuk `.pdf` yang dibuka dan `.jpg` yang di-render.
   Namanya **huruf kecil, kata dipisah tanda hubung, tanpa spasi**
   (`sql-basic-hackerrank`), bukan nama bawaan unduhan seperti
   `SQL Basic_Nama Lengkap.pdf` — spasi di URL jadi `%20` dan rawan patah
   saat link-nya disalin. *Bahasa awamnya:* ganti nama berkas hasil unduhan
   jadi huruf kecil tanpa spasi sebelum ditaruh di folder itu.
   **Jaga PDF-nya di kisaran 100–450 KB.** Dua berkas pernah datang jauh
   lebih besar — SQL (Basic) 7,6 MB dan UKBIng 2,2 MB — karena gambar di
   dalamnya disimpan tanpa kompresi. Caranya berbeda per berkas: PDF yang
   isinya **cuma gambar** boleh dibangun ulang jadi PDF ber-JPEG; PDF yang
   punya **teks asli** (bisa diseleksi) hanya boleh dikompres gambarnya,
   teksnya jangan dirender jadi gambar. Rinciannya di komentar kedua entri itu
   di `Certificates.jsx`. *Bahasa awamnya:* berkas sertifikat yang terlalu
   besar lama dibuka di ponsel, jadi kecilkan dulu sebelum dipasang.
2. Tambahkan satu entri ke array `CERTIFICATES` di paling atas
   `src/components/Certificates.jsx`: `file`, `title`, `source`, `icon`,
   `detail`.

Tidak ada markup yang perlu disalin — ketujuh panelnya dihasilkan dari array itu,
dan tidak ada angka di bagian lain yang perlu ikut disesuaikan. (Sampai
27 Agustus 2026 ada satu: baris "Sertifikat" di kartu Pendidikan, yang
menghitung sendiri jumlah `[data-panel]`. Barisnya sudah dibuang atas
permintaan, berikut cabang penghitungnya di `builders.js`.)

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
band**: lintasannya 35% tinggi layar, jadi tujuh panel dapat sekitar 42px
scroll masing-masing di ponsel 844px. Kalau
jumlahnya digandakan, tiap band jadi separuhnya dan panel akan berkedip cepat
saat di-scroll — itu batas praktis yang lain, di samping lebar bar.

Kalimat petunjuk di atas gallery ada **dua**, dan yang tampil dipilih
`@media (hover: hover)` di `src/styles/certificates.css`, bukan JavaScript. Kalau cara
berinteraksinya diubah, ubah keduanya. Kalimat yang menjanjikan sesuatu yang
tidak terjadi lebih buruk daripada tidak ada kalimat.

### Pengalaman kerja

Tambahkan satu entri ke array `jobs` di `TEXT` paling atas
`src/components/Experience.jsx` — **di `en` dan di `id`, dengan urutan yang
sama**. Kartu, id panelnya, nomor `01 / 0n`, dan selector dot di bawah stack
ikut sendiri.

Stack-nya **menyamakan tinggi semua card ke yang tertinggi**, dan tinggi itu
diukur, bukan dipatok. Jadi rincian pekerjaan boleh sepanjang apa pun tanpa ada
yang terpotong. Kalau satu card jauh lebih panjang dari yang lain, yang pendek
akan menyisakan ruang kosong di bawah, jadi seimbangkan jumlah butirnya.

**Judul kartu ditulis `Program – Peran`**, dengan en dash berspasi:
`Asistensi Mengajar – Guru Informatika`, `Magang Industri – Staf
Administrasi`. Tampilannya dipecah di tanda itu — program jadi label kecil
di atas, peran jadi judul besar di bawah — karena kolom kiri kartu cuma
~304px di desktop dan judul utuh di ukuran besar pecah sampai empat baris.
Pembaca layar tetap mendengar judul lengkapnya. Judul tanpa ` – ` tampil apa
adanya sebagai satu judul besar. Istilahnya disamakan dengan judul kartu di
bagian Proyek; kalau salah satu diubah, ubah keduanya.

*Bahasa awamnya:* tulis judul pengalaman sebagai "nama program – peran", dan
situsnya akan menampilkan nama program kecil di atas peran.

### Proyek

Bagian 04, di antara Keahlian dan Pendidikan — Keahlian menyebut alatnya,
Proyek menunjukkan hasilnya. Isinya di `src/components/Projects.jsx`, dalam
**dua array yang urutannya harus sama**:

| array | isi | per bahasa? |
|---|---|---|
| `MEDIA` | gambar (`src`, `w`, `h`, `pos`) dan tautan (`key`, `href`) | tidak — sama di keduanya |
| `projects` di `TEXT.en` dan `TEXT.id` | tahun, jenis, judul, konteks, pengerjaan, hasil, tiga angka, label | ya |

Menambah proyek = satu entri di `MEDIA` **dan** satu di tiap `projects`, di
posisi yang sama. Nomor `01 / 0n`, arah zig-zag (gambar kiri pada proyek
ganjil, kanan pada yang genap, di ≥1024px; di bawahnya bertumpuk supaya
gambarnya tetap besar), dan tombol tautannya ikut sendiri.
`key` tautan memilih labelnya dari `linkLabels`: `dashboard`, `report`,
`repo`, `live`. Tautan pertama juga yang dibuka saat gambarnya diklik.

**Gambar** di `public/assets/projects/`, nama huruf kecil bertanda hubung
seperti sertifikat. Satu gambar ditampilkan 16:9 penuh; tiga gambar jadi
kolase (satu besar, dua kecil) di bingkai 16:9 yang sama. Kolase dipakai
untuk foto kegiatan magang karena foto itu diambil dari PDF laporan dan
aslinya cuma 365–687px — di petak kecil ia tidak terlihat pecah, di bingkai
penuh ia akan pecah. `pos` menggeser potongan foto (`object-position`) supaya
orangnya tidak terpotong. Tangkapan situs dibuat 1600×900, JPEG kualitas
~86; gambar dashboard Olist 1600×925 (JPEG ~85, dari `dashboard_overview.png`
proyeknya) — sedikit lebih tinggi dari 16:9, sisanya terpotong di margin
putih.

**Isinya diambil dari repo masing-masing**: angka Olist dari README dan
`insight_report`, isi kedua magang dari laporan akhirnya. Kalau angkanya
berubah, ubah sumbernya dulu.

Menambah bagian juga menambah satu titik di bar status: `CHAPTER_IDS` dan
`CHAPTER_LABELS` di `src/lib/animations/behaviors.js`. Nomor bagian sesudahnya
digeser satu (Pendidikan 05, Sertifikat 06, Kontak 07), dan tombol kedua di
Beranda sekarang "Lihat Proyek" — menggantikan "Lihat Profil", bukan
ditambahkan, supaya foto Beranda di ponsel tidak ikut menyusut.

**Angka kunci kartu Web Profil adalah skor Lighthouse** — Performa (desktop),
Aksesibilitas, dan SEO, ketiganya 100 di situs yang tayang, diukur tiga kali
per mode pada 1 Oktober 2026. Performa di ponsel 83–94, karena itu labelnya
menulis "(desktop)". Skor ini bisa turun kalau situsnya ditambah konten berat,
jadi **ukur ulang di situs yang tayang** sesudah perubahan besar, sebelum
angkanya dipertahankan:

```
npx lighthouse https://webprofile-arifherfianzaenchartiko.vercel.app/ --preset=desktop
npx lighthouse https://webprofile-arifherfianzaenchartiko.vercel.app/
```

Jangan ukur dari `npm run preview`: server lokal itu menjawab `robots.txt`
dengan halaman HTML, dan SEO-nya terbaca 92 padahal situs yang tayang 100.

*Bahasa awamnya:* tiap proyek ditulis sekali sebagai daftar di
`Projects.jsx` — gambar dan tautannya satu kali, teksnya dua kali (Inggris
dan Indonesia). Kartunya dibuat otomatis dari daftar itu. Angka 100 di kartu
situs ini adalah nilai dari alat uji Google; ukur ulang kalau situsnya banyak
berubah.

### Aksesibilitas — dua aturan yang pernah dilanggar

- **`role="tabpanel"` tidak boleh di `<article>`.** Kartu Pengalaman memakai
  `<div>` karena itu; Lighthouse menurunkan skornya (aria-allowed-role) kalau
  dikembalikan ke `<article>`.
- **Kalimat pembuka Tentang mulai menyala dari opacity 0,42, bukan lebih
  rendah.** Di bawah itu kontrasnya jatuh di bawah 3:1 (pada 0,16 tinggal
  1,36:1), dan kata yang belum menyala praktis tak terbaca. Angkanya ditulis
  di dua tempat — `buildWordScrub()` di `builders.js` dan `initWordScrub()` di
  `reveals.js` — dan keduanya wajib sama.

Dengan keduanya, Aksesibilitas Lighthouse 100 di desktop dan ponsel.
*Bahasa awamnya:* dua hal kecil ini yang membuat situs ramah untuk pengguna
pembaca layar dan tetap terbaca sebelum animasinya jalan; jangan diubah
tanpa mengukur ulang.

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
Teknologi   (tanpa label)        SQL, Python, NumPy, pandas, matplotlib   (5)

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

**Baris `Teknologi` pengecualiannya sejak 1 Oktober 2026** (masuknya NumPy):
ia berisi lima, dan 25% akan memecahnya 4+1 dengan Matplotlib menggantung
sendirian. Baris itu memakai `.tool-items--five` — **lima satu baris di
≥640px, 3+2 di bawahnya**. Lima satu baris tidak muat di ponsel: "Matplotlib"
(56px, satu kata, tidak bisa dipecah) melebihi ruang tulisan 20% di 320–390px.
Hitungannya di komentar aturan itu di `src/styles/tools-grid.css`. Akibatnya
card `Teknologi` tidak lagi segaris dengan card `Perkakas` di bawah 1180px.
*Bahasa awamnya:* lima logo Teknologi berjajar satu baris di tablet dan
komputer, dan tiga-dua di ponsel.

**Satu angka yang mengaturnya: lebar card `25%`**, di `src/styles/tools-grid.css`, berlaku di
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
Teknologi   (tanpa label)        0 → 0,12   (lima card)
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
lebar tetap supaya garis rambut tiap kelompok lurus sejajar, dan lebarnya
12rem — cukup untuk 20 huruf. Label yang lebih panjang akan pecah dua baris dan
kelurusannya hilang; hitungannya ada di komentar aturan `.tool-label` di
`src/styles/tools-grid.css`.

Angka itu dulu dihitung pas-pasan untuk "BAHASA PEMROGRAMAN" (168,5px). Sejak
bagian `Teknologi` jadi satu baris tanpa label pada 22 Agustus 2026, label
terpanjang tinggal "ADMINISTRASI" (112,3px) dan kelonggarannya melompat dari
23,5px ke 79,7px. **Angkanya sengaja dibiarkan 12rem** — menurunkannya
menggeser garis rambut keempat kelompok `Perkakas` sekaligus, dan itu perubahan
tampilan yang tidak diminta.

**`Teknologi` satu-satunya baris tanpa `.tool-label`,** dan itu punya dua akibat
yang disengaja: card-nya lebih lebar daripada card `Perkakas` (275px lawan
211px, sebab `.tool-items` menempati seluruh lebar baris), dan card pertamanya
tidak segaris dengan card pertama kelompok `Perkakas` yang masuk 256px ke dalam.
Keduanya diterima karena bagian itu berdiri di bawah judulnya sendiri dan tidak
punya garis rambut yang bisa terbaca zigzag.

**Keduanya hanya berlaku di ≥1180px.** Di bawah itu label naik ke atas deretan
dan `.tool-items` jadi `width: 100%` untuk semua baris, jadi lebar card dan titik
x-nya sama persis di kedua bagian — terukur di 320, 360, 390, 430, 768, 844, dan
1024px.

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
- **Ikon satu warna dari kumpulan pihak ketiga hampir selalu salah warna di
  sini.** `numpy.svg` pertama kali masuk dari Simple Icons: satu warna
  `#013243`, biru tua yang di atas `#040508` berkontras ~1,3:1 — tak
  terlihat. Logo resmi numpy.org dua biru (`#4DABCF`/`#4D77CF`) dan terbaca
  tanpa diapa-apakan. Simple Icons memang sengaja satu warna; jangan ambil
  logo dari sana untuk grid ini. *Bahasa awamnya:* ambil logo dari situs
  resmi pembuatnya; logo dari situs kumpulan ikon sering berwarna gelap dan
  hilang di latar hitam situs ini.
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
dan akibatnya logo itu tampil lebih kecil tanpa terlihat salah. Delapan sudah
dikoreksi dengan `scale()`: Data Studio 1,27, Google Classroom 1,25, Power BI
1,2, Claude 1,14, PostgreSQL 1,09, SQL 1,06, dan Claude Code 1,26 — ditambah
NumPy 1,21 sejak 1 Oktober 2026 (tintanya 82,78% tinggi `viewBox`-nya).
Keenam yang pertama, dan NumPy, memakai **rasio kotak dibagi rasio tinta**, bukan tebakan — dengan begitu
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

Semua di blok `@theme` paling atas `src/styles/theme.css`. Ubah satu nilai dan seluruh
situs ikut, termasuk class seperti `bg-accent` dan `text-text-muted`, karena
keduanya dihasilkan dari token yang sama.

### Bahasa (Inggris / Indonesia)

Tombolnya di pojok kanan atas. Bawaannya **Inggris**; pilihan pengunjung
disimpan di `localStorage` browsernya, jadi kunjungan berikutnya terbuka di
bahasa yang sama.

**Ganti bahasa memasang ulang seluruh halaman**, bukan menukar teks di
tempat. Itu disengaja: kode animasi menulis ulang isi beberapa elemen
(kalimat pembuka Tentang dipecah per kata, nama instansi per huruf, band
berjalan digandakan), dan React tidak bisa memperbarui teks di dalam node
yang strukturnya sudah diganti. Dua hal menjaga pemasangan ulang itu tidak
terasa seperti reload:

- **Intro tidak diputar lagi** — panel monogram hanya ada di kunjungan
  pertama.
- **Posisi baca dipulihkan ke paragraf yang sama**, bukan ke angka piksel
  yang sama. Teks Inggris dan Indonesia tidak sama panjang, jadi yang
  dicatat bagian yang sedang dibaca dan berapa persen sudah terlewati.
  Terukur: meleset paling jauh 8px, di 375px maupun 1440px.

Alasan lengkapnya di komentar `App()` di `src/App.jsx`.

**Tombolnya menyingkir saat halaman digulir ke bawah** dan kembali saat
digulir ke atas atau di 80px teratas halaman — tanpa itu ia menutupi pojok
kanan atas konten selama dibaca. Ia tidak pernah sembunyi selama difokus
keyboard, tetap tercapai lewat Tab (urutan Tab pertama di halaman), dan
mengabaikan guliran 800ms sesudah ganti bahasa supaya lompatan pemulihan
posisi tidak menyembunyikan tombol yang baru ditekan. Angka-angkanya di
kepala `src/components/LanguageSwitch.jsx`. *Bahasa awamnya:* tombol bahasa
tidak menghalangi bacaan; gulir sedikit ke atas untuk memunculkannya.

**Peran Inggris di typewriter Beranda membawa artikelnya sendiri** ("a Data
Analyst", "an Informatics Educator"). Jangan pindahkan "a" ke kalimat
depannya: artikel Inggris ikut kata sesudahnya, dan kata itu berganti tiap
beberapa detik.

*Bahasa awamnya:* tombol EN | ID di pojok kanan atas mengganti bahasa
seluruh halaman dalam sekejap, tanpa memutar ulang animasi pembuka dan tanpa
memindahkan pembaca dari bagian yang sedang dibacanya. Pilihannya diingat
untuk kunjungan berikutnya.

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
layout dua kolom. Definisinya `@custom-variant` di `src/styles/theme.css`. `short:`
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

Hasilnya foto menempati porsi yang sama di semua ukuran tegak dan tidak ada satu
lebar pun yang meluber, termasuk 844x390 (ponsel diputar).

**Porsinya dikecilkan pada 27 Agustus 2026** karena fotonya terbaca sebagai
sorotan halaman. Sebelumnya 36% tinggi layar di semua ukuran tegak dan **42,9%**
di layar mendatar; sekarang **28%** dan **31,4%**. Angka 42,9% itu tidak pernah
ditulis siapa pun sebagai keputusan — ia akibat aritmetika yang menyamar: yang
dipatok `max-w`, dan tinggi bingkai = lebar ÷ 0,7, jadi `30svh` lebar berarti
42,9svh tinggi. Sekarang kedua sumbunya dinyatakan sebagai tinggi.

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
  paling lebar, dan fotonya terlihat tenggelam di bingkai yang longgar.
- **Fotonya `cover`, jadi jaraknya persis 12px di keempat sisi.** Sampai
  27 Agustus 2026 ia `contain`, dan itu menyisakan sepita kosong di satu sumbu:
  14,1px kiri-kanan lawan 12,0px atas-bawah di 1440x900, dan terbalik arahnya di
  320x568 (12,0 lawan 13,4). Sebabnya struktural — `aspect` mengukur kotak luar
  sementara yang harus serasio foto kotak dalam, dan rasio idealnya sendiri
  bergerak 0,689–0,718 mengikuti ukuran bingkai, jadi tidak ada satu nilai
  `aspect` yang menutupnya. `cover` memangkas selisih itu alih-alih memberinya
  pita: paling banyak 6,4px dari 1280px tinggi berkas. **Kalau fotonya diganti
  dengan rasio yang jauh berbeda, periksa hasilnya** — `cover` memotong tanpa
  memberi tanda, dan yang hilang duluan bagian atas kepala.
- **Yang ditebalkan sudutnya, bukan garisnya.** Garis rambut bingkai tetap
  `--line` seperti dua kotak ber-`.corner-marks` lainnya; yang naik ke 2px dan
  `--text` hanya kedua tanda sudutnya (16px, kiri-atas dan kanan-bawah), lewat
  aturan di `src/styles/hero.css`. Garis 1px itu sempat diterangkan seluruhnya
  dan hasilnya **tampak kabur di sisi atas-bawah**: keempat tepi bingkai jatuh
  di pecahan piksel — terukur 364,813 dan 651,531 pada 768x1024 — sehingga garis
  setipis itu tergambar sebagai dua baris setengah gelap. Pecahannya sama di
  dpr 1 maupun dpr 2, jadi layar retina pun tidak menyembuhkannya; yang
  menyembuhkan cuma garis yang lebih tebal.
- **Jangan pakai `border-width` pada tanda sudut.** Preflight Tailwind menyetel
  `*, ::before, ::after { border: 0 solid }`, jadi keempat sisinya sudah bergaya
  solid dan hanya lebarnya yang nol. `border-width: 2px` menaikkan keempatnya
  sekaligus dan yang muncul **dua kotak putih**, bukan siku — tanpa pesan galat.
  Naikkan sisi per sisi: `border-top-width`/`border-left-width` untuk `:before`,
  `border-bottom-width`/`border-right-width` untuk `:after`.
- **Foto tidak boleh jadi spotlight.** Terukur di sembilan viewport 320x568
  sampai 1920x1080: 28% tinggi layar di semua ukuran tegak, 31,4% di desktop dan
  tablet mendatar, 26,5% di 1920x1080 (langit-langit 200px yang mengikat), dan
  41% di ponsel diputar — yang terakhir itu lantai 7rem, supaya di layar setinggi
  390px wajahnya tidak menyusut jadi 86px.

**Motion dipasang lewat `useLayoutEffect` dan WAJIB men-teardown dirinya.** React
StrictMode melakukan mount-unmount-mount tiap effect di mode development, dan
node DOM-nya tidak dibuat ulang. Tanpa teardown, tiap listener dan scroll
trigger terpasang dua kali. Karena itu setiap side effect di `src/lib/animations/`
didaftarkan lewat `listen()`, `addTicker()`, `observe()`, dan `addNode()` —
jangan panggil `addEventListener`, `gsap.ticker.add`, `new ResizeObserver`, atau
`appendChild` secara langsung.

`addNode()` yang paling mudah terlupa, karena `removeEventListener()` tidak
mengeluarkan node dari DOM — jadi `appendChild()` adalah side effect tersendiri.
StrictMode menjalankan mount → unmount → mount pada host node yang sama,
sehingga `appendChild` yang tidak terdaftar berjalan dua kali dan **menumpuk,
bukan menimpa**: `.chapter-dot` pernah jadi 12 (seharusnya 6 — waktu itu enam bagian; sejak Proyek masuk tujuh) dan anak
`.marquee-track` jadi 7 (seharusnya 4), tanpa satu pun error terlempar. Chapter
bar tampil utuh tapi separuh titiknya diam saat diklik.

### Lompatan antar bagian harus mendarat di 0

Semua lompatan bermuara ke satu `scrollTo()` di `src/lib/animations/scroller.js`, dan tepi atas
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
