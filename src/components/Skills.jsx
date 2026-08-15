export default function Skills() {
  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════════
           03 KEAHLIAN — tiga card, satu untuk tiap peran.

           Bagian ini dulu panggung selebar screen yang di-pin: kata raksasa
           bertumpuk di atas monolit 3D berputar, lalu hurufnya PECAH ke segala
           arah, lalu card masuk dari ruang yang ditinggalkannya. Monolit, kabut
           abu di belakangnya, dan ledakan hurufnya dibuang seluruhnya pada
           8 Agustus 2026 — beserta pin dan scrub yang jadi mesinnya, karena
           ketiganya memang satu-satunya alasan mesin itu ada.

           Yang tersisa mengikuti pola bagian lain di halaman ini: satu container biasa
           yang ikut aliran, dengan reveal scrub-reveal yang sama seperti
           Kemampuan Profesional dan Perkakas di bawahnya.
           ═══════════════════════════════════════════════════════════════════════ */}
      <section id="keahlian" data-component="chapter" className="relative">

        <div data-component="container" className="mx-auto w-full px-4 sm:px-6 nav:px-10 max-w-[1180px] flex flex-col gap-14 py-16 sm:gap-16 sm:py-20 nav:gap-20 nav:py-28">
          <div>

          <h3 data-component="scrub-reveal" className="-caption-small mb-5 text-text-muted">03 — Keahlian</h3>

          {/* Judul yang terlihat, dan bentuknya SAMA PERSIS dengan Tentang,
               Pengalaman, Sertifikat, dan Kontak: -h1 dengan mask baris.

               Sempat dibuat sebagai papan balik ber-kotak pada 9 Agustus 2026,
               dibatalkan sehari kemudian. Alasannya bukan ia gagal — ia
               berjalan seperti seharusnya — melainkan bahwa judul bagian
               adalah tempat paling salah untuk berbeda sendiri. Enam judul
               bergerak dengan satu cara dan satu judul dengan cara lain
               membuat yang satu itu terbaca sebagai anomali, bukan sebagai
               penekanan. Penekanan bagian ini sudah dikerjakan kartu-kartu
               di bawahnya.

               Kalau nanti ingin ditonjolkan lagi, yang dinaikkan UKURANNYA
               (-display seperti Pendidikan), bukan jenis motion-nya. */}
          <h2 className="-h1 mb-10" data-line-mask>
            <span data-anim="line-mask"><span>Keahlian</span></span>
          </h2>

          {/* Tiga card, dan jumlahnya bukan kebetulan: ia persis tiga peran yang
               diketikkan typewriter di halaman sampul. Card pertama melebar dua
               kolom karena ia peran yang dilamar lebih dulu — hierarkinya jadi
               terlihat, tanpa perlu satu kata label pun.

               Dulu ada card keempat, "Antarmuka & Responsif", yang berdiri sendiri
               di samping "Pengembangan Web". Keempatnya lalu tampil setara padahal
               tiga di antaranya peran dan satu cuma kemampuan penunjang — pembaca
               tidak punya cara membedakannya, jadi card itu dibubarkan.

               NAMA CARD PERTAMA SUDAH BERGANTI DUA KALI: "Pengembangan Web" jadi
               "Pengembangan Fullstack" pada 9 Agustus 2026, lalu jadi "Analisis
               Data" pada 14 Agustus 2026 — keduanya mengikuti peran utama di
               typewriter, yang sekarang "Data Analyst".

               NAMANYA KEGIATAN, BUKAN JABATAN: "Analisis Data", bukan "Data
               Analyst". Itu menjaganya sebangun dengan dua card di sebelahnya,
               "Pengajaran Teknis" dan "Administrasi Digital" — yang juga
               kegiatan, bukan jabatan. Jabatannya sendiri sudah berdiri di tiga
               tempat yang memang dibaca mesin pencari dan penyaring lamaran:
               judul halaman, deskripsi meta, dan typewriter.

               Baris 01 di bagian Tentang justru memakai "Data Analyst", dan
               perbedaan register itu memang disengaja — ia sudah berlaku sejak
               sebelum pergantian ini, waktu bagian Tentang menulis "Fullstack
               Web Developer" sementara card ini menulis "Pengembangan
               Fullstack". Jangan diseragamkan. */}
          {/* KENAPA TIAP CARD DIBUNGKUS .stage-slot, dan jangan dibuang.
               Ada DUA motion yang bekerja pada card yang sama sekaligus, dan
               keduanya butuh `opacity`:

                 slot   masuk dan keluar mengikuti scroll (opacity + geser)
                 card  highlight yang berpindah (opacity + skala + naik)

               Dipasang di satu elemen, keduanya berebut properti yang sama dan
               yang menang bergantung urutan frame. Bersarang, opacity-nya
               justru MENGALIKAN dengan sendirinya — card redup di dalam slot
               yang sedang masuk tampil di 0,78 x kemajuan masuknya, yang
               memang perilaku yang benar tanpa satu baris kode penyelaras pun.

               Slot juga yang memegang penempatan grid-nya, bukan card-nya:
               .stage-slot--lead yang merentang dua kolom. Ketiganya TIDAK
               ber-scrub-reveal seperti blok lain di bagian ini — itu akan jadi
               motion ketiga yang berebut properti yang sama lagi. */}
          <div className="stage-orbit">
            <div className="stage-slot stage-slot--lead" data-card-slot data-direction="fade">
            <article data-role-card className="stage-card stage-card--lead">
              <div className="mb-6 flex items-start justify-between gap-6">
                <h3 className="-h2 max-w-[9em]">Analisis Data</h3>
                <span data-glyph="1"></span>
              </div>
              {/* Lebar teks dibatasi meski card-nya melebar. Tanpa ini satu baris
                   memuat sekitar 130 karakter di desktop, dan mata kehilangan tempat
                   saat berpindah ke baris berikutnya. 42rem menahannya di sekitar
                   88 karakter. */}
              {/* KALIMAT INI MENYEBUT TEKNOLOGINYA HARFIAH, bukan meringkasnya
                   jadi "mengolah data" saja — alasannya sama dengan deskripsi
                   meta di index.html: penyaring lamaran mencocokkan teks apa
                   adanya.

                   Yang disebut di sini PERSIS isi grid Teknologi dan Perkakas
                   di bawahnya, tidak lebih. Kalimat yang menjanjikan perkakas
                   yang tidak muncul di grid mana pun akan dibantah oleh
                   halamannya sendiri beberapa layar kemudian, dan kalimat yang
                   dibantah halaman tempat ia berdiri adalah yang paling mahal
                   ongkosnya. Pelajaran itu sudah pernah dibayar: sampai
                   9 Agustus 2026 kalimat ini berbunyi "tanpa kerangka kerja"
                   di halaman yang dibangun dengan React. */}
              <p className="-body-small max-w-2xl text-text-muted">Menarik dan merapikan data dengan Python, menyusun serta mengueri basis data PostgreSQL, membangun dashboard Power BI dan Tableau, menjelaskan arti temuannya, lalu memberi rekomendasi yang bisa ditindaklanjuti.</p>
            </article>
            </div>

            <div className="stage-slot" data-card-slot data-direction="left">
            <article data-role-card className="stage-card">
              <div className="mb-6 flex items-start justify-between gap-6">
                <h3 className="-h2 max-w-[9em]">Pengajaran Teknis</h3>
                <span data-glyph="2"></span>
              </div>
              <p className="-body-small text-text-muted">Mengajar pemrograman dasar, jaringan dasar, dan teknologi layanan jaringan, termasuk mengawasi dan mengevaluasi proyek akhir siswa.</p>
            </article>
            </div>

            <div className="stage-slot" data-card-slot data-direction="right">
            <article data-role-card className="stage-card">
              <div className="mb-6 flex items-start justify-between gap-6">
                <h3 className="-h2 max-w-[9em]">Administrasi Digital</h3>
                <span data-glyph="3"></span>
              </div>
              <p className="-body-small text-text-muted">Pendataan, pencatatan surat masuk dan keluar, pengelolaan disposisi, serta digitalisasi arsip.</p>
            </article>
            </div>
          </div>

          {/* mt-7 = 28px, dan itu ritme bagian ini: judul ke card 32px, card
               ke caption 28px, blok ke blok 64px di ponsel dan 80px di atasnya.

               Di sini dulu tertulis peringatan lain: mt-10 katanya class mati
               karena tidak ikut terkompilasi ke css/style.css, dan yang tersedia
               cuma mt-2, mt-3, mt-7, mt-16. Itu SUDAH TIDAK BERLAKU sejak
               Tailwind berjalan sungguhan. Buktinya bukan teori: Hero.jsx
               memakai `roomy:mt-10` dan .mt-10 ada di CSS hasil build. Jadi
               angka ini dipilih karena ritmenya, bukan karena keterbatasan.
               Class apa pun boleh dipakai; yang masih mengikat tinggal
               grid 4px. */}
          <p data-component="scrub-reveal" className="-caption-small mt-7 text-center">
            <span aria-hidden="true" className="mr-2 text-accent">✦</span>Tiga peran. Satu cara kerja.
          </p>
      </div>


          {/* KEMAMPUAN PROFESIONAL — lima card, tiga kolom (lima di >=1024px).

               Tiap card punya tiga baris: ikon, judul, keterangan. Ketiganya harus
               lurus sejajar dengan card di sebelahnya meski panjang judulnya
               berbeda-beda, dan itu diurus `grid-template-rows: subgrid` di
               .skill-card — bukan oleh tinggi cadangan yang ditebak. Alasan
               lengkapnya ada di bagian "KEMAMPUAN PROFESIONAL" di src/index.css.

               Yang penting diketahui di sini: JANGAN membungkus ikon, judul, dan
               keterangan ke dalam div. Ketiganya harus jadi anak LANGSUNG .skill-card
               supaya masing-masing menempati barisnya sendiri di subgrid. Dulu judul
               dan keterangan dibungkus satu div demi efek naik saat disentuh kursor;
               efek itu sekarang dipasang langsung ke keduanya lewat CSS. */}
          <div>
            <h3 data-component="scrub-reveal" className="-caption-small mb-8 text-text-muted">Kemampuan Profesional</h3>
            <div className="skill-grid border-t border-l border-line">
              <div data-component="scrub-reveal" data-delay="0" className="skill-card border-r border-b border-line p-4 transition-colors duration-500 ease-brand hover:bg-text/4 sm:p-5">
                <i className="fa-solid fa-comments text-text-muted"></i>
                <span className="-body-small font-medium">Komunikasi Teknis</span>
                <p className="-body-smaller text-text-muted">Menjelaskan hal teknis ke orang awam.</p>
              </div>
              <div data-component="scrub-reveal" data-delay="0.04" className="skill-card border-r border-b border-line p-4 transition-colors duration-500 ease-brand hover:bg-text/4 sm:p-5">
                <i className="fa-solid fa-magnifying-glass-chart text-text-muted"></i>
                <span className="-body-small font-medium">Analisis &amp; Pemecahan Masalah</span>
                <p className="-body-smaller text-text-muted">Menelusuri akar masalah sebelum memilih solusinya.</p>
              </div>
              <div data-component="scrub-reveal" data-delay="0.08" className="skill-card border-r border-b border-line p-4 transition-colors duration-500 ease-brand hover:bg-text/4 sm:p-5">
                <i className="fa-solid fa-arrows-rotate text-text-muted"></i>
                <span className="-body-small font-medium">Adaptabilitas</span>
                <p className="-body-smaller text-text-muted">Terbiasa berganti peran dan perkakas sesuai kebutuhan.</p>
              </div>
              <div data-component="scrub-reveal" data-delay="0.12" className="skill-card border-r border-b border-line p-4 transition-colors duration-500 ease-brand hover:bg-text/4 sm:p-5">
                <i className="fa-solid fa-list-check text-text-muted"></i>
                <span className="-body-small font-medium">Ketelitian</span>
                <p className="-body-smaller text-text-muted">Terlatih dari pendataan dan pengelolaan surat dinas.</p>
              </div>
              <div data-component="scrub-reveal" data-delay="0.16" className="skill-card border-r border-b border-line p-4 transition-colors duration-500 ease-brand hover:bg-text/4 sm:p-5">
                <i className="fa-solid fa-people-group text-text-muted"></i>
                <span className="-body-small font-medium">Koordinasi Tim</span>
                <p className="-body-smaller text-text-muted">Kepanitiaan proker dan pengarahan tim service center.</p>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
               TEKNOLOGI — DIPISAH DARI PERKAKAS pada 9 Agustus 2026, dan
               pemisahan itu tetap berlaku meski isinya sekarang tinggal satu.

               Dua jenis benda yang berbeda tidak boleh berbagi satu judul.
               PostgreSQL, Power BI, dan Tableau di bawah adalah APLIKASI —
               sesuatu yang dibuka lalu dipakai. Python bukan: ia bahasa
               pemrograman. Menaruh bahasa pemrograman di bawah judul
               "Perkakas" kira-kira sama dengan menyebut bahasa Indonesia
               sebagai alat tulis.

               PEMBEDAANNYA DIPIKUL JUDUL BAGIAN, BUKAN NAMA KELOMPOK. Itu
               sebabnya "Sisi Server" yang sempat berdiri di bawah Perkakas
               dibubarkan lagi di hari yang sama: ia memindahkan isinya tanpa
               membereskan judul yang menaunginya, jadi salah kategorinya cuma
               bergeser satu tingkat, tidak hilang.

               Ditaruh SEBELUM Perkakas karena apa yang dibangun lebih menjawab
               pertanyaan "bisa apa" daripada apa yang dipakai membangunnya.

               ISINYA MENYUSUT JADI SATU pada 14 Agustus 2026. Sebelumnya dua
               baris berisi delapan entri — Frontend (HTML, CSS, JavaScript,
               Tailwind CSS) dan Backend (PHP, Laravel, Blade, MySQL) — dan
               keduanya dibuang atas permintaan beserta ketujuh file ikonnya.
               Rincian kenapa Laravel dan Blade dulu ditaruh di Backend ikut
               dibuang bersama barisnya; kalau susunan itu suatu saat kembali,
               alasannya ada di git history commit 6e86f17.

               LABEL BARISNYA "BAHASA PEMROGRAMAN", BUKAN "BACKEND". Python
               memang jalan di server, tapi kelompok Data di bawahnya
               menyiratkan arah analisis data, bukan backend web — dan label
               yang menyebut JENIS bendanya tidak akan keliru lagi kalau nanti
               bahasa kedua ditambahkan.

               JEDANYA TINGGAL SATU ANGKA, dan rantainya berdiri sendiri:
               bagian ini mulai dan berakhir di 0, Perkakas di bawah mulai lagi
               dari 0. Jangan disambung — dua bagian yang punya judulnya
               sendiri-sendiri dibaca sebagai dua blok terpisah.

               REACT BELUM DISEBUT, DAN ITU DITUNDA — BUKAN DITOLAK. Situs ini
               memang dibangun dengan React, jadi buktinya ada di repo, tapi
               pemiliknya memilih menunggu sampai ia benar-benar menguasainya
               lebih dulu. Alasannya masuk akal dan layak dipertahankan: apa
               pun yang tertulis di sini akan digali saat wawancara, dan
               teknologi yang dicantumkan tapi tidak bisa dijelaskan lebih
               merugikan daripada yang tidak dicantumkan sama sekali.

               Jadi kalau suatu saat React ditambahkan, itu memang rencananya
               — tapi tanyakan dulu, jangan diputuskan sendiri.
               ═════════════════════════════════════════════════════════════ */}
          <div>
            <h3 data-component="scrub-reveal" className="-caption-small mb-8 text-text-muted">Teknologi</h3>
            <div className="border-t border-line">

              {/* "BAHASA PEMROGRAMAN" (18 huruf) kini label TERPANJANG di
                   seluruh grid ini, menggeser "PENGEMBANGAN" yang ikut dibuang.
                   Lebar .tool-label di src/index.css dinaikkan dari 10,5rem ke
                   12rem karenanya — pada 10,5rem label ini pecah dua baris dan
                   kelurusan garis rambut seluruh kelompok ikut hilang.
                   Hitungannya ada di komentar aturan itu. */}
              <div className="tool-row border-b border-line">
                <h4 data-component="scrub-reveal" data-delay="0" className="-caption-small tool-label text-text-muted">Bahasa Pemrograman</h4>
                <span data-component="scrub-reveal" data-delay="0" className="h-px w-8 self-center bg-line"></span>

                <div className="tool-items">

                  {/* Logo dua warna resminya — biru #366994/#387EB8 dan kuning
                       #FFC331/#FFE052 — dipakai apa adanya. viewBox-nya sudah
                       rapat ("16 16 32 32"), jadi tintanya mengisi penuh kotak
                       32px dan tidak perlu diskalakan. Bandingkan dengan Power
                       BI di baris Data, yang kotaknya justru kelonggaran. */}
                  <div data-component="scrub-reveal" data-delay="0" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/python.svg" alt="" loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">Python</span>
                  </div>

                </div>
              </div>

            </div>
          </div>


          {/* PERKAKAS — APLIKASI yang dipakai bekerja, bukan yang dibangun.
               Bahasa pemrogramannya berdiri di bagian Teknologi di atas;
               alasan pemisahannya ditulis lengkap di sana.

               Urutan kelompoknya mengikuti urutan peran di typewriter bagian
               sampul, lalu ditutup AI sebagai cara kerja. Nama ditulis lengkap
               karena penyaring lamaran mencocokkan teks secara harfiah.

               KELOMPOK PERTAMANYA "DATA" sejak 14 Agustus 2026, menggantikan
               "Pengembangan" (VS Code, GitHub, Vercel, Figma) yang dibuang
               seluruhnya atas permintaan, beserta ketiga file ikonnya — logo
               GitHub tidak punya file, ia SVG sebaris di markup ini.

               Ini pergantian KEDUA di slot yang sama, dan itu perlu dicatat
               supaya polanya kelihatan: sebelumnya "Riset & Desain" (Figma,
               Google Analytics, Maze, Notion) yang berdiri di sini, dibuang
               waktu peran utama berganti dari UI/UX Designer jadi Web
               Developer. Slot pertama memang selalu ikut peran yang dilamar,
               jadi ia yang paling sering berganti isi.

               Isinya sekarang 3-2-2-3 dan jedanya berakhir di 0,27. Rantainya
               berdiri sendiri, tidak menyambung dari bagian Teknologi — lihat
               alasannya di komentar bagian itu. Menambah atau menghapus card
               berarti SELURUH rantai di bawahnya dihitung ulang: tiap card naik
               0,03 berurutan menembus kelompok, dan label tiap kelompok memakai
               jeda card pertamanya. */}
          <div>
            <h3 data-component="scrub-reveal" className="-caption-small mb-8 text-text-muted">Perkakas</h3>
            <div className="border-t border-line">

              {/* Urutannya sumber dulu, penyajinya belakangan: PostgreSQL
                   tempat datanya tinggal, Power BI dan Tableau yang
                   membacanya. Pola yang sama dipakai baris lain di grid ini —
                   yang menopang berdiri di depan, sama seperti bahasa
                   mendahului kerangka kerja. */}
              <div className="tool-row border-b border-line">
                <h4 data-component="scrub-reveal" data-delay="0" className="-caption-small tool-label text-text-muted">Data</h4>
                <span data-component="scrub-reveal" data-delay="0" className="h-px w-8 self-center bg-line"></span>

                <div className="tool-items">

                  {/* Gajah Slonik, biru #336791 dengan garis luar putih. Garis
                       putih itu BUKAN tambahan dan bukan salah unduh: ia bagian
                       dari logo resmi versi latar gelap, dan justru itu yang
                       membuat siluetnya terbaca di atas #040508. Kalau nanti
                       diganti, jangan pakai versi tanpa garis luar — di latar
                       segelap ini badannya menyatu dengan halaman. */}
                  <div data-component="scrub-reveal" data-delay="0" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/postgresql.svg" alt="" loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">PostgreSQL</span>
                  </div>

                  {/* POWER BI DINAIKKAN ke 1,2, dan sebabnya KOTAKNYA, bukan
                       warnanya. viewBox-nya "0 0 48 48" tapi tintanya cuma
                       menempati 30x40 di dalamnya (x 9-39, y 4-44) — kelonggaran
                       yang terbawa dari file aslinya. Tintanya terpusat di kedua
                       sumbu (sisa 9 di kiri-kanan, 4 di atas-bawah), jadi
                       menskalakannya dari titik tengah tetap menaruhnya di tengah.

                       Dengan object-contain, tinggi tintanya cuma 40/48 = 83%
                       tinggi kotak: 30px di kotak 36px (nav:h-9, >=900px) dan
                       26,7px di kotak 32px (h-8, di bawahnya). Dua-duanya 17%
                       lebih pendek daripada Python dan Tableau yang viewBox-nya
                       rapat. 48/40 = 1,2 mengembalikannya ke tinggi penuh di
                       KEDUA kotak sekaligus, karena yang dikoreksi rasio, bukan
                       piksel.

                       Terukur setelahnya di 1180px: Python 36,0px, Tableau
                       36,0px, PostgreSQL 36,0px, Power BI 36,0px. Kotak
                       elemennya sendiri jadi 43,2px dan menjulur 3,6px ke tiap
                       sisi, tapi bagian itu transparan dan tidak ada
                       `overflow: hidden` di jalur induknya — jarak ke label di
                       bawahnya 12px, jadi tidak ada yang bersentuhan.

                       DISKALAKAN, BUKAN viewBox-nya dirapatkan seperti
                       Wayground. Keduanya sama benarnya. Yang ini dipilih
                       karena file ikonnya tidak perlu disentuh sama sekali,
                       jadi kalau nanti diganti dengan unduhan baru dari
                       Microsoft, satu-satunya yang perlu diperiksa ulang angka
                       di baris ini — bukan isi file yang sudah diedit tangan. */}
                  <div data-component="scrub-reveal" data-delay="0.03" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/microsoft-power-bi.svg" alt="" loading="lazy" decoding="async" style={{ transform: "scale(1.2)" }} className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">Power BI</span>
                  </div>

                  {/* Tableau TIDAK diskalakan: viewBox "0 0 500 500" dan tintanya
                       benar-benar mengisi kotak itu (x 0-500, y 3,4-496,6).
                       Sembilan tanda plus berwarna-warni membuatnya paling ramai
                       di barisnya, tapi tidak ada satu pun bidang terisi penuh
                       seperti kotak kuning JavaScript dulu — jadi bobot tampaknya
                       tetap sepadan dengan tetangganya tanpa perlu diturunkan. */}
                  <div data-component="scrub-reveal" data-delay="0.06" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/tableau.svg" alt="" loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">Tableau</span>
                  </div>

                </div>
              </div>

              {/* PENGAJARAN. Isinya cuma dua karena sisanya sudah berdiri di baris
                   lain: Word, Excel, dan PowerPoint untuk modul ajar dan penilaian ada
                   di MS Office (Administrasi), dan VS Code — yang dipakai mengajar
                   pemrograman dasar — ada di Pengembangan. Perkakas yang sama tidak
                   ditulis dua kali; yang memberi tahu perannya adalah card pengalaman
                   "Guru Informatika" di bagian Pengalaman. */}
              <div className="tool-row border-b border-line">
                <h4 data-component="scrub-reveal" data-delay="0.09" className="-caption-small tool-label text-text-muted">Pengajaran</h4>
                <span data-component="scrub-reveal" data-delay="0.09" className="h-px w-8 self-center bg-line"></span>

                <div className="tool-items">

                  <div data-component="scrub-reveal" data-delay="0.09" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/google-classroom.svg" alt="" loading="lazy" decoding="async" style={{ transform: "scale(1.25)" }} className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">Google Classroom</span>
                  </div>

                  {/* Quizizz berganti nama jadi Wayground pada 2025, dan sejak
                       7 Agustus 2026 yang dipakai di sini nama serta logo barunya.
                       Sebelumnya sengaja tetap "Quizizz" dengan alasan itu nama yang
                       dikenal pendidik Indonesia; alasan itu dilepas karena situsnya
                       sendiri sudah wayground.com dan logo lamanya tidak muncul
                       lagi di mana pun.

                       Logo-nya tiga bar bersudut membentuk huruf W, diambil apa
                       adanya dari SVG di halaman mereka. viewBox-nya dirapatkan dari
                       "0 0 48 48" jadi "8 13 32 22" — itu kotak isi sebenarnya,
                       diukur lewat getBBox, kebetulan bilangan bulat semua. Tanpa
                       dirapatkan, logo-nya cuma mengisi separuh kotak 32px di
                       grid ini dan terlihat lebih kecil dari logo tetangganya.

                       Warnanya #FF319F, merah muda. Sempat dipasang krem #F3EFDA —
                       itu memang warna yang mereka pakai untuk logo ini, tapi
                       hanya SEBAGAI VERSI DI LATAR GELAP di halaman mereka sendiri,
                       dan hasilnya di sini terbaca seperti logo tak berwarna.
                       Warna mereknya yang sebenarnya diambil dari favicon resmi
                       mereka, yang isinya logo merah muda di atas putih; piksel
                       dominannya persis #FF319F.

                       Pelajarannya: satu halaman bisa menampilkan logo dalam
                       warna yang BUKAN warna mereknya, semata karena latar halaman
                       itu gelap. Kalau ragu, buka favicon-nya — di sana logo-nya
                       hampir selalu tampil pada latar netral dengan warna aslinya.

                       Aturan lama tetap berlaku kalau nanti ada logo gelap yang
                       ditambahkan: terangkan pada rona aslinya, jangan diganti
                       warnanya. Wordmark Quizizz dulu aslinya #5D2057 dan nyaris
                       tak terlihat di latar #040508. */}
                  <div data-component="scrub-reveal" data-delay="0.12" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/wayground.svg" alt="" loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">Wayground</span>
                  </div>

                </div>
              </div>

              <div className="tool-row border-b border-line">
                <h4 data-component="scrub-reveal" data-delay="0.15" className="-caption-small tool-label text-text-muted">Administrasi</h4>
                <span data-component="scrub-reveal" data-delay="0.15" className="h-px w-8 self-center bg-line"></span>

                <div className="tool-items">

                  <div data-component="scrub-reveal" data-delay="0.15" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/ms-office.svg" alt="" loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">MS Office</span>
                  </div>

                  {/* Google Workspace memakai wordmark penuhnya, perbandingan 7,76:1.
                       Ia memang tampil lebih short daripada logo persegi di
                       sebelahnya — itu sifat wordmark sepanjang ini, bukan salah ukuran. */}
                  <div data-component="scrub-reveal" data-delay="0.18" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/google-workspace.svg" alt="" loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">Google Workspace</span>
                  </div>

                </div>
              </div>

              <div className="tool-row border-b border-line">
                <h4 data-component="scrub-reveal" data-delay="0.21" className="-caption-small tool-label text-text-muted">AI</h4>
                <span data-component="scrub-reveal" data-delay="0.21" className="h-px w-8 self-center bg-line"></span>

                <div className="tool-items">

                  <div data-component="scrub-reveal" data-delay="0.21" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/claude.svg" alt="" loading="lazy" decoding="async" style={{ transform: "scale(1.14)" }} className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">Claude</span>
                  </div>

                  <div data-component="scrub-reveal" data-delay="0.24" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/claude-code.svg" alt="" loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">Claude Code</span>
                  </div>

                  {/* Yang dipakai di sini WORDMARK tulisan "Stitch", bukan logo
                       kapsulnya. Pernah diganti ke logo kapsul (SVG buatan sendiri,
                       dibangun ulang dari PNG resmi 512px mereka) supaya sebaris
                       dengan perkakas lain yang memakai logo; hasilnya justru
                       janggal — kapsul dengan dua titik itu tidak terbaca sebagai
                       apa-apa dalam ukuran 32px, apalagi berdampingan dengan logo
                       yang punya bentuk khas seperti Claude dan VS Code. Wordmark-nya
                       dikembalikan pada 7 Agustus 2026. Jangan diganti lagi ke kapsul.

                       Google tidak menerbitkan logo Stitch dalam bentuk SVG, dan
                       halaman mereka tidak memuat file logo APA PUN — wordmark
                       di pojok kiri atasnya teks hidup ber-font Google Sans. Jadi
                       file ini dibuat dengan mengurai woff2 yang dimuat halaman
                       itu, mengambil lekuk keenam hurufnya dari tabel glyf, lalu
                       menyusunnya jadi satu path. Bukan penelusuran ulang dari
                       gambar: lekuknya lekuk asli dari fontnya.

                       Jarak antar hurufnya bukan jumlah advance mentah. Ada dua
                       pasangan yang dirapatkan GPOS, S-t dan t-c, masing-masing
                       -25 unit; posisinya diukur dari penataan Chrome memakai font
                       yang sama. Tanpa kerning itu wordmark-nya 50 unit terlalu
                       lebar. Hasilnya diadu piksel dengan render Chrome: tinggi
                       tinta sama persis, lebar meleset 1 piksel dari 982, tumpang
                       tindih 97,8% (sisanya pelunakan tepi).

                       Warnanya #d8d8d8, sama dengan Vercel di baris Pengembangan —
                       itu perlakuan baku situs ini untuk logo yang aslinya putih
                       atau hitam polos. Aslinya di halaman Stitch memang putih
                       penuh, tapi putih penuh di sini lebih terang dari semua
                       logo lain dan menarik perhatian melebihi porsinya.

                       scale(0.85) menahannya supaya tidak lebih dominan dari
                       logo tetangganya yang bujur sangkar. */}
                  <div data-component="scrub-reveal" data-delay="0.27" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/stitch.svg" alt="" loading="lazy" decoding="async" style={{ transform: "scale(0.85)" }} className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">Stitch</span>
                  </div>

                </div>
              </div>

            </div>
          </div>

          <div>
            <h3 data-component="scrub-reveal" className="-caption-small mb-8 text-text-muted">Bahasa</h3>
            <div className="border-t border-line">
              <div data-component="scrub-reveal" className="flex flex-wrap items-baseline gap-x-4 gap-y-2 border-b border-line py-5 sm:gap-x-5 sm:py-6">
                <span className="-mono text-text-muted">ID</span>
                <span className="h-px w-8 self-center bg-line"></span>
                <h4 className="-title-4">Bahasa Indonesia</h4>
                <span className="-body-smaller w-full text-text-muted nav:ml-auto nav:w-auto">Aktif — lisan dan tulisan, penutur asli</span>
              </div>
              <div data-component="scrub-reveal" className="flex flex-wrap items-baseline gap-x-4 gap-y-2 border-b border-line py-5 sm:gap-x-5 sm:py-6">
                <span className="-mono text-text-muted">EN</span>
                <span className="h-px w-8 self-center bg-line"></span>
                <h4 className="-title-4">Bahasa Inggris</h4>
                <span className="-body-smaller w-full text-text-muted nav:ml-auto nav:w-auto">Pasif — membaca dan mendengarkan, tersertifikasi UKBING 444</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
