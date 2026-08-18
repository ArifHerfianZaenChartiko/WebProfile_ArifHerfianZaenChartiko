import Icon from "./Icon.jsx";

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

        <div data-component="container" className="mx-auto w-full px-gutter max-w-[1180px] flex flex-col gap-14 py-16 sm:gap-16 sm:py-20 nav:gap-20 nav:py-28">
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
              {/* BATAS LEBAR TEKSNYA DIBUANG pada 15 Agustus 2026 atas permintaan:
                   keterangan ini harus memenuhi card sampai tepi kanan, tidak lagi
                   menyempil di kiri.

                   Dulu `max-w-2xl` (42rem, 672px) sementara ruang isi card 1044px
                   di 1180px — jadi teksnya berhenti di 64% lebar card dan
                   menyisakan 372px kosong di kanan, di bawah judul yang justru
                   merentang penuh. Yang terbaca bukan kolom teks yang sengaja
                   dipersempit melainkan blok yang lupa dilebarkan.

                   ONGKOSNYA NYATA DAN SUDAH DIUKUR, jadi jangan dikira gratis:
                   pada 1044px baris penuh memuat sekitar 150 karakter, naik dari
                   88. Itu di atas rentang 45-90 karakter yang biasa dianjurkan
                   untuk teks berjalan, dan alasan batas lama ada memang itu —
                   mata kehilangan tempat saat berpindah baris. Yang menahannya
                   tetap terbaca di sini: teksnya cuma 208 karakter, jadi ia
                   selesai dalam dua baris, dan dua baris tidak menuntut mata
                   melakukan perpindahan berulang seperti paragraf panjang.

                   Kalau nanti keterangannya diperpanjang jauh melewati ini,
                   pertimbangkan mengembalikan batas lebarnya — di angka yang
                   lebih besar dari 42rem, misalnya 64rem, supaya tetap memenuhi
                   card tanpa jatuh ke baris sepanjang 150 karakter. */}
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
              <p className="-body-small text-text-muted">Menarik dan merapikan data dengan Python, menyusun serta mengueri basis data PostgreSQL, membangun dashboard Power BI dan Tableau, menjelaskan arti temuannya, lalu memberi rekomendasi yang bisa ditindaklanjuti.</p>
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
               lengkapnya ada di bagian "KEMAMPUAN PROFESIONAL" di src/styles/skills.css.

               Yang penting diketahui di sini: JANGAN membungkus ikon, judul, dan
               keterangan ke dalam div. Ketiganya harus jadi anak LANGSUNG .skill-card
               supaya masing-masing menempati barisnya sendiri di subgrid. Dulu judul
               dan keterangan dibungkus satu div demi efek naik saat disentuh kursor;
               efek itu sekarang dipasang langsung ke keduanya lewat CSS.

               KELIMA KETERANGANNYA DITULIS ULANG pada 15 Agustus 2026, dan
               panjangnya naik tajam — dari 37-54 huruf jadi 99-148. Bentuknya
               sekarang seragam: apa yang dikerjakan, lalu "sehingga" atau
               "supaya" yang menyebut hasilnya. Yang lama cuma menyebut
               kegiatannya dan berhenti di situ ("Menjelaskan hal teknis ke orang
               awam"), jadi pembaca harus menyimpulkan sendiri apa gunanya.

               INILAH UJI SUNGGUHAN PERTAMA UNTUK subgrid DI BLOK INI. Sampai
               kemarin kelima keterangannya sama-sama muat dua baris di hampir
               semua lebar, jadi kesejajarannya tidak pernah benar-benar
               dibuktikan — persis keadaan "kebetulan sejajar" yang dulu bikin
               cara lama gagal, dan yang alasan lengkapnya ditulis di blok
               KEMAMPUAN PROFESIONAL di src/styles/skills.css. Sekarang selisihnya nyata:
               Adaptabilitas 148 huruf lawan Komunikasi Teknis 99, cukup untuk
               berbeda satu sampai dua baris di lebar yang sama. Kalau nanti ada
               keterangan yang ditambahkan dan barisnya tampak tidak lurus lagi,
               yang pertama diperiksa BUKAN panjang tulisannya melainkan apakah
               ikon, judul, dan keterangan masih jadi anak langsung .skill-card.

               Ejaan tiga kata dibetulkan dari sumber tulisannya: produktifitas ->
               produktivitas, efisensi -> efisiensi, penyelsaian -> penyelesaian.

               Bahasa awamnya: lima kotak kemampuan di bawah judul ini sekarang
               menjelaskan bukan cuma APA yang Anda bisa, tapi juga apa gunanya
               bagi tempat kerja. Karena kalimatnya lebih panjang, kotaknya ikut
               lebih tinggi — tapi ikon, judul, dan keterangannya tetap lurus
               sejajar antar kotak. */}
          <div>
            <h3 data-component="scrub-reveal" className="-caption-small mb-8 text-text-muted">Kemampuan Profesional</h3>
            <div className="skill-grid border-t border-l border-line">
              <div data-component="scrub-reveal" data-delay="0" className="skill-card border-r border-b border-line p-4 transition-colors duration-500 ease-brand hover:bg-text/4 sm:p-5">
                <Icon name="comments" className="text-text-muted" />
                <span className="-body-small font-medium">Komunikasi Teknis</span>
                <p className="-body-smaller text-text-muted">Menjelaskan hal teknis dengan bahasa sederhana beserta analogi supaya lebih mudah dipahami orang awam.</p>
              </div>
              <div data-component="scrub-reveal" data-delay="0.04" className="skill-card border-r border-b border-line p-4 transition-colors duration-500 ease-brand hover:bg-text/4 sm:p-5">
                <Icon name="magnifying-glass-chart" className="text-text-muted" />
                <span className="-body-small font-medium">Analisis &amp; Pemecahan Masalah</span>
                <p className="-body-smaller text-text-muted">Menelusuri akar masalah dengan menimbang berbagai kemungkinan sehingga bisa memutuskan penyelesaian terbaik dan cara menempuhnya.</p>
              </div>
              <div data-component="scrub-reveal" data-delay="0.08" className="skill-card border-r border-b border-line p-4 transition-colors duration-500 ease-brand hover:bg-text/4 sm:p-5">
                <Icon name="arrows-rotate" className="text-text-muted" />
                <span className="-body-small font-medium">Adaptabilitas</span>
                <p className="-body-smaller text-text-muted">Melek terhadap perubahan dan perkembangan lingkungan serta teknologi sehingga bisa meningkatkan produktivitas dan efisiensi dalam penyelesaian tugas.</p>
              </div>
              <div data-component="scrub-reveal" data-delay="0.12" className="skill-card border-r border-b border-line p-4 transition-colors duration-500 ease-brand hover:bg-text/4 sm:p-5">
                <Icon name="list-check" className="text-text-muted" />
                <span className="-body-small font-medium">Ketelitian</span>
                <p className="-body-smaller text-text-muted">Memeriksa data dan dokumen sampai ke rinciannya sehingga kekeliruan tertangkap sebelum sampai ke tangan berikutnya.</p>
              </div>
              <div data-component="scrub-reveal" data-delay="0.16" className="skill-card border-r border-b border-line p-4 transition-colors duration-500 ease-brand hover:bg-text/4 sm:p-5">
                <Icon name="people-group" className="text-text-muted" />
                <span className="-body-small font-medium">Koordinasi Tim</span>
                <p className="-body-smaller text-text-muted">Menyelaraskan pembagian tugas dan alur komunikasi antaranggota sehingga pekerjaan tuntas sesuai target tanpa ada yang tumpang tindih.</p>
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

               ISINYA MENYUSUT JADI SATU pada 14 Agustus 2026, lalu NAIK JADI
               DUA pada 16 Agustus 2026 waktu SQL masuk. Sebelum penyusutan itu
               ada dua baris berisi delapan entri — Frontend (HTML, CSS,
               JavaScript, Tailwind CSS) dan Backend (PHP, Laravel, Blade,
               MySQL) — dan keduanya dibuang atas permintaan beserta ketujuh
               file ikonnya. Rincian kenapa Laravel dan Blade dulu ditaruh di
               Backend ikut dibuang bersama barisnya; kalau susunan itu suatu
               saat kembali, alasannya ada di git history commit 6e86f17.

               LABEL BARISNYA "BAHASA PEMROGRAMAN", BUKAN "BACKEND". Python
               memang jalan di server, tapi kelompok Data di bawahnya
               menyiratkan arah analisis data, bukan backend web — dan label
               yang menyebut JENIS bendanya tidak akan keliru lagi kalau nanti
               bahasa kedua ditambahkan.

               DAN ITU YANG TERJADI, dua hari kemudian. SQL memang bahasa
               kedua di bagian ini, tapi ia BUKAN bahasa pemrograman — ia
               bahasa kueri, yang menyatakan data apa yang diminta dan bukan
               langkah-langkah mendapatkannya. Karena labelnya menyebut jenis
               benda, salahnya ketahuan seketika dan jalan keluarnya cuma satu:
               baris kedua dengan label sendiri, "Bahasa Kueri". Kalau label
               lama dulu ditulis "Backend", SQL akan masuk ke sana tanpa
               terlihat janggal sedikit pun, dan salah kategorinya menetap.

               KENAPA BUKAN DIGABUNG ke satu baris berlabel "Bahasa": kata itu
               sudah dipakai blok terakhir bagian ini untuk bahasa manusia
               (Indonesia dan Inggris). Dua "Bahasa" di satu halaman yang
               menunjuk hal berbeda lebih merugikan daripada satu baris
               tambahan.

               KEDUANYA TETAP DI BAWAH "TEKNOLOGI", bukan dipindah ke Perkakas.
               Batas antara kedua bagian itu APLIKASI lawan BUKAN APLIKASI, dan
               SQL jelas bukan aplikasi — PostgreSQL yang aplikasinya, dan ia
               memang sudah berdiri di baris Data milik Perkakas. Keduanya
               bertetangga tapi bukan hal yang sama: yang satu bahasa untuk
               bertanya, yang satu program yang menjawab.

               JEDANYA TINGGAL DUA ANGKA, dan rantainya berdiri sendiri:
               bagian ini mulai di 0 dan berakhir di 0,03, Perkakas di bawah
               mulai lagi dari 0. Jangan disambung — dua bagian yang punya
               judulnya sendiri-sendiri dibaca sebagai dua blok terpisah.

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
                   Lebar .tool-label di src/styles/tools-grid.css dinaikkan dari 10,5rem ke
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
                      <span className="tool-icon flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/python.svg" alt="" loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">Python</span>
                  </div>

                </div>
              </div>

              {/* BAHASA KUERI — 12 huruf, jadi ia TIDAK menggeser lebar
                   .tool-label. Yang mengikat angka 12rem di src/styles/tools-grid.css tetap
                   "BAHASA PEMROGRAMAN" (18 huruf, 168,5px); label ini berhenti
                   di 112,3px dan menyisakan lebih dari cukup. Tidak ada yang
                   perlu dihitung ulang di sana.

                   IKONNYA IKON DATABASE AZURE (judul aslinya di dalam berkas
                   "Icon-databases-130"), dan itu memang pilihan yang tersedia:
                   SQL sebuah standar ISO, bukan produk, jadi tidak ada pemilik
                   merek yang menerbitkan logo resminya. Yang beredar semua
                   milik salah satu vendor atau buatan pihak ketiga. Tabung
                   basis data bertuliskan SQL ini setidaknya menggambarkan
                   bendanya, bukan meminjam merek yang keliru — tapi kalau
                   suatu saat diganti, jangan ambil logo yang jelas-jelas
                   milik satu produk (MySQL, MSSQL) untuk mewakili SQL sebagai
                   bahasa.

                   DINAIKKAN 1,06, dan sebabnya KOTAKNYA — persoalan yang sama
                   dengan PostgreSQL dan Power BI di baris Data, cuma paling
                   kecil di antara ketiganya. viewBox-nya "0 0 18 18" tapi
                   tintanya berhenti di y 0,5 sampai 17,5, jadi tinggi tintanya
                   17 dari 18 satuan alias 94,4% tinggi kotak. Dengan
                   object-contain itu 30,2px di kotak 32px, sementara Python di
                   baris atas mendarat di 31,8px.

                   18/17 = 1,0588, dibulatkan ke 1,06, dan hasilnya 32,0px —
                   yang dikoreksi RASIO, jadi satu angka ini benar di kedua
                   ukuran kotak sekaligus. Kotak elemennya jadi 33,9px dan
                   menjulur 0,95px ke tiap sisi; bagian itu transparan, tidak
                   ada `overflow: hidden` di jalur induknya, dan jarak ke label
                   di bawahnya 12px.

                   SELISIH 1,6px ITU LEBIH KECIL daripada yang biasanya dianggap
                   perlu dikoreksi di repo ini (PostgreSQL 2,9px), dan tetap
                   dikerjakan karena letaknya: ia satu-satunya card di barisnya,
                   persis di bawah Python yang juga sendirian. Keduanya
                   bertumpuk di titik x yang sama, jadi matanya membandingkan
                   langsung — beda yang tersamar di baris berisi enam logo
                   justru terlihat di sini.

                   Bahasa awamnya: logo SQL ini dibesarkan sedikit supaya
                   tingginya sama persis dengan logo Python tepat di atasnya.
                   Tanpa itu ia tampak sedikit lebih kecil, bukan karena salah
                   pasang tapi karena berkas logonya punya ruang kosong bawaan
                   di tepi atas dan bawahnya. */}
              <div className="tool-row border-b border-line">
                <h4 data-component="scrub-reveal" data-delay="0.03" className="-caption-small tool-label text-text-muted">Bahasa Kueri</h4>
                <span data-component="scrub-reveal" data-delay="0.03" className="h-px w-8 self-center bg-line"></span>

                <div className="tool-items">

                  <div data-component="scrub-reveal" data-delay="0.03" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="tool-icon flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/sql.svg" alt="" loading="lazy" decoding="async" style={{ transform: "scale(1.06)" }} className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">SQL</span>
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

               Isinya sekarang 6-2-2-2 dan jedanya berakhir di 0,33. Rantainya
               berdiri sendiri, tidak menyambung dari bagian Teknologi — lihat
               alasannya di komentar bagian itu. Menambah atau menghapus card
               berarti SELURUH rantai di bawahnya dihitung ulang: tiap card naik
               0,03 berurutan menembus kelompok, dan label tiap kelompok memakai
               jeda card pertamanya.

               EKORNYA 0,33 DETIK, DAN ITU SUDAH DEKAT BATAS. Tiga card yang
               ditambahkan ke baris Data pada 15 Agustus 2026 mendorong ujung
               rantai dari 0,27 ke 0,36; dibuangnya Stitch di hari yang sama
               menariknya kembali ke 0,33. Peringatan di bagian Teknologi soal
               rantai yang terlalu panjang — card terakhir jatuh terlalu jauh
               dan pembaca sudah melewatinya sebelum ikonnya datang — berlaku
               di sini juga. Kalau nanti ada card lagi yang ditambahkan,
               pertimbangkan memulai rantai baru per kelompok alih-alih terus
               menyambung, sebab keempat kelompok ini toh punya labelnya
               sendiri-sendiri.

               Bahasa awamnya: logo-logo di bagian ini tidak muncul serentak,
               melainkan menyusul satu per satu dari kiri ke kanan saat
               di-scroll. Angka-angka di atas yang mengatur giliran itu, dan
               logo terakhir sekarang datang 0,36 detik setelah yang pertama. */}
          <div>
            <h3 data-component="scrub-reveal" className="-caption-small mb-8 text-text-muted">Perkakas</h3>
            <div className="border-t border-line">

              {/* Urutannya ditentukan pemiliknya, dan alurnya alat kerja dulu
                   baru penyajinya: Excel dan PostgreSQL tempat datanya tinggal,
                   VS Code dan Anaconda tempat mengolahnya, Power BI dan Tableau
                   yang menyajikannya. Pola yang sama dipakai baris lain di grid
                   ini — yang menopang berdiri di depan.

                   TUJUH CARD sejak 18 Agustus 2026, dan ini baris terpanjang di
                   seluruh grid — jumlah itu yang mengikat kedua angka pembagi
                   di `.tool-items` pada src/styles/tools-grid.css.

                   SATU BARIS DI DESKTOP SUDAH TIDAK MUNGKIN LAGI, dan itu
                   terukur, bukan diperkirakan. Isi baris ini tidak pernah lebih
                   dari 844px (lihat hitungannya di komentar `.tool-items > *`),
                   jadi tujuh card menuntut lebar <= 120,6px. Nama terpanjang di
                   seluruh grid, "Google Workspace", selebar 108,1px pada 12px
                   Inter dan card-nya ber-padding 8px di tiap sisi — jadi card
                   di bawah 124,1px memecah nama itu jadi dua baris. Kedua
                   syarat itu tidak bisa dipenuhi bersamaan; selisihnya 3,5px.

                   Jadi yang dipilih PECAH 4+3, bukan card yang dipersempit.
                   Alasannya sama dengan waktu baris ini berisi enam: yang
                   dijaga bukan jumlah barisnya melainkan pecahnya yang RATA dan
                   SAMA di semua lebar. 4+3 pembagian paling rata yang mungkin
                   untuk tujuh; 6+1 di desktop dan 3+3+1 di ponsel keduanya
                   menyisakan satu card menggantung sendiri — persis cacat
                   "Tableau berdiri sendiri" yang dulu diperbaiki.

                   `tool-items--four` DILEPAS pada 18 Agustus 2026, dan barisnya
                   tetap pecah 4+3. Class itu dulu memaksa pecahnya di desktop
                   dengan membatasi lebar blok; sejak lebar card jadi 25% di
                   semua lebar viewport, empat per baris terjadi dengan
                   sendirinya — persis seperti yang selama ini sudah berlaku di
                   bawah 1180px. Aturan CSS-nya ikut dibuang, bukan ditinggalkan
                   menganggur; ceritanya ada di src/styles/tools-grid.css.

                   BARISNYA SEKARANG MENGISI PENUH, dan itu yang berubah paling
                   kelihatan di desktop. Dulu empat card cuma memakai 544px dari
                   844px yang tersedia dan menyisakan 300px kosong di kanan;
                   kelompok berisi dua bahkan menyisakan 572px. Card 25%
                   membuat keempatnya membagi rata seluruh lebar itu, dan
                   kelompok yang lebih pendek dipusatkan.

                   Bahasa awamnya: baris "Data" sekarang berisi tujuh logo, dan
                   di semua ukuran layar ia tampil dua baris — empat di atas,
                   tiga di bawah, dan yang tiga itu dipusatkan di bawah yang
                   empat. Sengaja tidak dipaksa muat satu baris di layar
                   komputer, sebab logonya harus dipersempit sampai nama
                   "Google Workspace" di baris lain ikut pecah dua baris. */}
              <div className="tool-row border-b border-line">
                <h4 data-component="scrub-reveal" data-delay="0" className="-caption-small tool-label text-text-muted">Data</h4>
                <span data-component="scrub-reveal" data-delay="0" className="h-px w-8 self-center bg-line"></span>

                <div className="tool-items">

                  {/* viewBox "0 0 486 500" dan tintanya mengisinya PERSIS
                       (terukur getBBox: 0,0 486,01x500) — jadi tidak
                       diskalakan, sama seperti Tableau. Ia satu-satunya logo
                       di baris ini yang lebih tinggi daripada lebarnya, jadi
                       object-contain memaskan tingginya dan lebarnya menyisakan
                       1px; itu memang bentuk logonya, bukan salah ukuran. */}
                  <div data-component="scrub-reveal" data-delay="0" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="tool-icon flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/microsoft-excel.svg" alt="" loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">Excel</span>
                  </div>

                  {/* Gajah Slonik, biru #336791 dengan garis luar putih. Garis
                       putih itu BUKAN tambahan dan bukan salah unduh: ia bagian
                       dari logo resmi versi latar gelap, dan justru itu yang
                       membuat siluetnya terbaca di atas #040508. Kalau nanti
                       diganti, jangan pakai versi tanpa garis luar — di latar
                       segelap ini badannya menyatu dengan halaman.

                       DINAIKKAN 1,09 pada 15 Agustus 2026, dan sebabnya KOTAKNYA,
                       bukan warnanya — persoalan yang sama dengan Power BI di
                       bawah, cuma lebih kecil. viewBox-nya "0 0 432.071 445.383"
                       tapi tintanya hanya mengisi 394,86x409,44 di dalamnya
                       (terukur getBBox), jadi tinggi tintanya 91,9% tinggi kotak.
                       Dengan object-contain itu berarti 33,1px di kotak 36px,
                       sementara kelima tetangganya mendarat di 35,5-36,0px — ia
                       satu-satunya yang meleset, dan di baris berisi enam logo
                       selisih itu jadi terlihat.

                       445,383/409,44 = 1,0878, dibulatkan ke 1,09, dan hasilnya
                       36,1px. Yang dikoreksi RASIO, jadi satu angka ini benar di
                       kedua ukuran kotak sekaligus — 32px di bawah 900px maupun
                       36px di atasnya.

                       Kotak elemennya jadi 39,2px dan menjulur 1,6px ke tiap
                       sisi; bagian itu transparan, tidak ada `overflow: hidden`
                       di jalur induknya, dan jarak ke label di bawahnya 12px,
                       jadi tidak ada yang bersentuhan.

                       Komentar Power BI di bawah pernah mengklaim keempat logo
                       lama sama-sama 36,0px termasuk yang ini. Klaim itu keliru
                       waktu ditulis; sejak baris ini ada, ia jadi benar.

                       Bahasa awamnya: logo gajah PostgreSQL dulu tampil sedikit
                       lebih kecil daripada logo di sebelahnya — bukan karena
                       salah pasang, tapi karena file logonya punya ruang kosong
                       bawaan di tepinya. Sekarang tingginya sudah sama dengan
                       kelima logo lain di barisnya. */}
                  <div data-component="scrub-reveal" data-delay="0.03" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="tool-icon flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/postgresql.svg" alt="" loading="lazy" decoding="async" style={{ transform: "scale(1.09)" }} className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">PostgreSQL</span>
                  </div>

                  {/* DBEAVER — ditaruh SETELAH PostgreSQL atas permintaan, dan
                       urutan itu memang mengikuti alur baris ini: basis
                       datanya dulu, baru program yang dipakai membukanya.

                       WARNANYA DITERANGKAN, DAN INI PEMAKAI PERTAMA ATURAN ITU
                       SEJAK WAYGROUND. Berkasnya datang dengan warna merek
                       resmi #382923, cokelat tua — dan di atas latar #040508
                       kontrasnya cuma 1,47:1. Itu bukan "agak redup",
                       melainkan praktis tidak terlihat: yang tampak di
                       barisnya cuma petak kosong di antara PostgreSQL dan
                       VS Code, tanpa satu pun pesan galat. Persis nasib
                       wordmark Quizizz dulu (#5D2057), dan jalan keluarnya
                       yang sama.

                       DITERANGKAN PADA RONA ASLINYA, BUKAN DIGANTI WARNANYA.
                       Rona 17,14 derajat dan kejenuhan 23,08% dipertahankan
                       PERSIS; yang dinaikkan cuma kecerahannya, 17,84% ->
                       60%. Hasilnya #B18F81, dan kontrasnya jadi 6,91:1.

                       ANGKA ITU DIPILIH DARI TETANGGANYA, bukan dari ambang
                       aksesibilitas mana pun. Terukur di baris yang sama:
                       Tableau 6,85:1, Anaconda 6,69:1, Excel 6,30:1, VS Code
                       4,52:1, PostgreSQL 3,39:1. Menaikkannya sampai
                       #d8d8d8 (14,3:1) akan membuat DBeaver jadi logo paling
                       terang di barisnya dan menarik mata lebih dulu daripada
                       enam tetangganya — bukan itu yang diminta. 60%
                       menaruhnya persis di tengah kelompok.

                       TIDAK DISKALAKAN. viewBox-nya "0 0 24 24" dan tintanya
                       mengisi tingginya penuh (terukur getBBox: y -0,001,
                       tinggi 24,000 dari 24 satuan). Lebarnya 19,773, jadi ia
                       lebih tinggi daripada lebar — seperti Excel di ujung
                       kiri baris ini — dan object-contain memaskan tingginya:
                       36,0px di kotak 36px, sama dengan tetangganya. Tidak ada
                       yang perlu dikoreksi.

                       Bahasa awamnya: berkas logo DBeaver aslinya berwarna
                       cokelat sangat tua, dan di atas latar hitam situs ini ia
                       nyaris tak terlihat sama sekali. Warnanya dicerahkan
                       tanpa diganti — tetap cokelat yang sama, cuma lebih
                       terang — sampai setara dengan logo-logo di sebelahnya. */}
                  <div data-component="scrub-reveal" data-delay="0.06" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="tool-icon flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/dbeaver.svg" alt="" loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">DBeaver</span>
                  </div>

                  {/* DIBANGUN DARI PNG RESMI DI code.visualstudio.com, bukan
                       diambil dari kumpulan ikon pihak ketiga — dan bukan pula
                       file lama yang dibuang 14 Agustus 2026. Yang itu memakai
                       #2196f3, biru Material generik yang BUKAN warna merek
                       VS Code; jangan dipulihkan dari git history.

                       Microsoft tidak menerbitkan logo ini sebagai SVG. Situs
                       resminya memuatnya sebagai PNG base64 1024x1024 di dalam
                       aturan `.navbar-brand` pada /dist/style.css. File ini
                       hasil menelusuri artwork itu: tiga region warnanya
                       dipisah per luminance, konturnya ditelusuri, lalu
                       disederhanakan Douglas-Peucker pada toleransi 2,2 dari
                       1024 satuan — sekitar 0,08px pada ukuran tampilnya.

                       Warnanya BUKAN hasil sampel piksel, melainkan tiga warna
                       resmi #0065A9 / #007ACC / #1F9CF0. Sampelnya sendiri
                       terbaca lebih terang (#006EB1 / #0081C9 / #22A8F1) karena
                       artwork resminya menumpuk kilau putih tembus pandang di
                       atas ketiganya. Kilau itu sengaja tidak ikut ditiru: pada
                       36px ia tidak terlihat, dan ia menuntut mix-blend-mode
                       yang mahal.

                       Tinta mengisi 99,7% viewBox-nya, jadi tidak diskalakan.

                       Bahasa awamnya: logo VS Code di halaman ini digambar
                       ulang dari logo asli di situs resmi Microsoft, bukan
                       diunduh dari situs kumpulan logo. Warnanya karena itu
                       warna biru VS Code yang sebenarnya — yang dipakai versi
                       lama dulu birunya salah. */}
                  <div data-component="scrub-reveal" data-delay="0.09" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="tool-icon flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/vscode.svg" alt="" loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">VS Code</span>
                  </div>

                  {/* Hijau #44A833, warna merek resminya, dan file-nya satu
                       path satu warna — tidak ada versi terang/gelap yang bisa
                       tertukar seperti Wayground. viewBox "0 0 24 24" dengan
                       tinta 24x23,93: rapat, jadi tidak diskalakan. */}
                  <div data-component="scrub-reveal" data-delay="0.12" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="tool-icon flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/anaconda.svg" alt="" loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">Anaconda</span>
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
                       35,5px, Excel 36,0px, VS Code 35,9px, Anaconda 35,9px,
                       PostgreSQL 36,1px, Power BI 36,0px. Kotak elemennya
                       sendiri jadi 43,2px dan menjulur 3,6px ke tiap sisi, tapi
                       bagian itu transparan dan tidak ada `overflow: hidden` di
                       jalur induknya — jarak ke label di bawahnya 12px, jadi
                       tidak ada yang bersentuhan.

                       Angka PostgreSQL di daftar itu sempat KELIRU: ia ditulis
                       36,0px padahal tintanya cuma 91,9% viewBox sehingga
                       mendarat di 33,1px. Cacatnya diperbaiki di card-nya
                       sendiri pada 15 Agustus 2026 dengan scale(1.09), jadi
                       daftar ini sekarang benar apa adanya. Kalau nanti ada
                       logo baru masuk, ukur — jangan salin angka dari sini.

                       DISKALAKAN, BUKAN viewBox-nya dirapatkan seperti
                       Wayground. Keduanya sama benarnya. Yang ini dipilih
                       karena file ikonnya tidak perlu disentuh sama sekali,
                       jadi kalau nanti diganti dengan unduhan baru dari
                       Microsoft, satu-satunya yang perlu diperiksa ulang angka
                       di baris ini — bukan isi file yang sudah diedit tangan. */}
                  <div data-component="scrub-reveal" data-delay="0.15" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="tool-icon flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
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
                  <div data-component="scrub-reveal" data-delay="0.18" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="tool-icon flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/tableau.svg" alt="" loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">Tableau</span>
                  </div>

                </div>
              </div>

              {/* PENGAJARAN. Isinya cuma dua karena sisanya sudah berdiri di baris
                   lain: Word dan PowerPoint untuk modul ajar dan penilaian ada di
                   MS Office (Administrasi), dan VS Code — yang dipakai mengajar
                   pemrograman dasar — ada di baris Data. Perkakas yang sama tidak
                   ditulis dua kali; yang memberi tahu perannya adalah card pengalaman
                   "Guru Informatika" di bagian Pengalaman.

                   Rujukan ke "baris Pengembangan" di sini sudah salah sejak
                   kelompok itu dibuang 14 Agustus 2026, dan Excel disebut dua
                   kali sejak ia berdiri sendiri di baris Data 15 Agustus 2026.
                   Keduanya diluruskan. */}
              <div className="tool-row border-b border-line">
                <h4 data-component="scrub-reveal" data-delay="0.21" className="-caption-small tool-label text-text-muted">Pengajaran</h4>
                <span data-component="scrub-reveal" data-delay="0.21" className="h-px w-8 self-center bg-line"></span>

                <div className="tool-items">

                  <div data-component="scrub-reveal" data-delay="0.21" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="tool-icon flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
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
                  <div data-component="scrub-reveal" data-delay="0.24" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="tool-icon flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/wayground.svg" alt="" loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">Wayground</span>
                  </div>

                </div>
              </div>

              <div className="tool-row border-b border-line">
                <h4 data-component="scrub-reveal" data-delay="0.27" className="-caption-small tool-label text-text-muted">Administrasi</h4>
                <span data-component="scrub-reveal" data-delay="0.27" className="h-px w-8 self-center bg-line"></span>

                <div className="tool-items">

                  <div data-component="scrub-reveal" data-delay="0.27" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="tool-icon flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/ms-office.svg" alt="" loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">MS Office</span>
                  </div>

                  {/* Google Workspace memakai wordmark penuhnya, perbandingan 7,76:1.
                       Ia memang tampil lebih short daripada logo persegi di
                       sebelahnya — itu sifat wordmark sepanjang ini, bukan salah ukuran. */}
                  <div data-component="scrub-reveal" data-delay="0.3" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="tool-icon flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/google-workspace.svg" alt="" loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">Google Workspace</span>
                  </div>

                </div>
              </div>

              <div className="tool-row border-b border-line">
                <h4 data-component="scrub-reveal" data-delay="0.33" className="-caption-small tool-label text-text-muted">AI</h4>
                <span data-component="scrub-reveal" data-delay="0.33" className="h-px w-8 self-center bg-line"></span>

                <div className="tool-items">

                  <div data-component="scrub-reveal" data-delay="0.33" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="tool-icon flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/claude.svg" alt="" loading="lazy" decoding="async" style={{ transform: "scale(1.14)" }} className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">Claude</span>
                  </div>

                  {/* 1,26 — DAN INI SATU-SATUNYA LOGO DI GRID YANG TIDAK
                       DISAMAKAN TINGGINYA. Turun dari 1,6 pada 18 Agustus 2026
                       atas permintaan, sebab pada angka itu ia terbaca jelas
                       lebih besar daripada tetangganya meski tingginya sudah
                       sama persis.

                       Duduk perkaranya ada di bentuk logonya. viewBox-nya
                       "0 0 24 24" tapi tintanya cuma 24 x 15 (terukur getBBox),
                       jadi tintanya BUJUR PANJANG 1,6:1 sementara hampir semua
                       logo lain di grid ini bujur sangkar. Menyamakan tinggi dua
                       bentuk yang berbeda perbandingan TIDAK menyamakan besarnya
                       di mata: pada 1,6 tintanya 57,6 x 36px, terlebar di
                       seluruh grid setelah wordmark Workspace, dan luasnya 1,6
                       kali Claude yang 35,7 x 35,9px tepat di sebelahnya.

                       YANG DISAMAKAN SEKARANG RATA-RATA GEOMETRIKNYA, akar dari
                       lebar dikali tinggi — ukuran yang dipakai justru karena ia
                       tidak berpihak pada satu sumbu. Claude 35,8; Claude Code
                       pada 1,6 sebesar 45,5. Supaya keduanya bertemu di 36,
                       skalanya cukup diakarkan: v1,6 = 1,2649, dibulatkan 1,26.
                       Tintanya jadi 45,4 x 28,4px, rata-rata geometrik 35,9 —
                       meleset 0,1px dari Claude.

                       JADI IA MEMANG LEBIH PENDEK DARIPADA LOGO LAIN (28,4
                       lawan ~36px), dan itu bukan kelalaian melainkan harga yang
                       dibayar: bentuk 1,6:1 tidak bisa sekaligus setinggi DAN
                       seramping bentuk bujur sangkar. Yang dipilih besar yang
                       terbaca sama, bukan angka yang sama.

                       WAYGROUND KASUS YANG SAMA DAN BELUM DIKERJAKAN. Tintanya
                       52,4 x 36px, rata-rata geometrik 43,4 — juga di atas
                       norma grid. Ia dibiarkan karena tidak diminta dan
                       selisihnya dengan tetangganya jauh lebih kecil (Google
                       Classroom 38,3), tapi kalau aturan rata-rata geometrik ini
                       mau ditegakkan menyeluruh, ia yang berikutnya: skalanya
                       0,83.

                       Kotak elemennya jadi 45,4x45,4px dan menjulur 8,5px ke
                       atas dan bawah; bagian itu transparan, tidak ada
                       `overflow: hidden` di jalur induknya, dan pagar
                       `.tool-icon` di src/styles/tools-grid.css ada di 120px, jadi tidak
                       ikut terpangkas.

                       Bahasa awamnya: logo Claude Code tampil kelewat besar di
                       samping logo Claude, karena bentuknya melebar sementara
                       yang lain kotak. Sekarang ukurannya disetel supaya
                       terlihat sama besar, bukan supaya angkanya sama tinggi. */}
                  <div data-component="scrub-reveal" data-delay="0.36" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="tool-icon flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/claude-code.svg" alt="" loading="lazy" decoding="async" style={{ transform: "scale(1.26)" }} className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">Claude Code</span>
                  </div>

                  {/* GOOGLE STITCH DIBUANG pada 15 Agustus 2026 atas permintaan,
                       beserta public/assets/icons/stitch.svg. Kelompok AI tinggal
                       dua card, dan rantai data-delay Perkakas karenanya berakhir
                       di 0,33, bukan 0,36 lagi.

                       Yang ikut hilang bersamanya sebuah catatan pembuatan yang
                       panjang, dan ia disebut di sini supaya tidak dikira tidak
                       pernah ada: Google tidak menerbitkan logo Stitch sebagai
                       SVG, dan halaman mereka tidak memuat file logo apa pun --
                       wordmark di pojok kiri atasnya teks hidup ber-font Google
                       Sans. File yang dibuang itu dibangun dengan mengurai woff2
                       yang dimuat halaman tersebut, mengambil lekuk keenam
                       hurufnya dari tabel glyf, lalu menyusunnya jadi satu path,
                       lengkap dengan dua pasang kerning GPOS (S-t dan t-c,
                       masing-masing -25 unit). Kalau suatu saat Stitch kembali,
                       jangan menelusuri ulang dari gambar -- ambil file lamanya
                       dari git history commit ini, sebab lekuknya lekuk asli dari
                       fontnya.

                       Satu aturan yang ikut kehilangan pemakainya: #d8d8d8 sebagai
                       perlakuan baku untuk logo yang aslinya putih atau hitam
                       polos. Stitch pemakai terakhirnya setelah Vercel dibuang
                       14 Agustus 2026. Aturannya sendiri masih benar dan layak
                       dipakai lagi kalau nanti ada logo semacam itu masuk. */}
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
