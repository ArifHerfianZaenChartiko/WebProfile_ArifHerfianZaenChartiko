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
               tidak punya cara membedakannya. Isinya sekarang masuk ke card
               Pengembangan Fullstack, karena memang di situ tempatnya: menyusun
               tampilan adalah bagian dari membangunnya.

               Card itu berganti nama dari "Pengembangan Web" jadi "Pengembangan
               Fullstack" pada 9 Agustus 2026, seiring peran utama di typewriter.
               Namanya sengaja menyebut cakupan, bukan teknologinya: nama kerangka
               kerja berganti setiap beberapa tahun, sedangkan "dua sisi" tidak.
               Teknologinya disebut di kalimat bawahnya dan di grid Perkakas. */}
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
                <h3 className="-h2 max-w-[9em]">Pengembangan Fullstack</h3>
                <span data-glyph="1"></span>
              </div>
              {/* Lebar teks dibatasi meski card-nya melebar. Tanpa ini satu baris
                   memuat sekitar 130 karakter di desktop, dan mata kehilangan tempat
                   saat berpindah ke baris berikutnya. 42rem menahannya di sekitar
                   88 karakter. */}
              {/* "tanpa kerangka kerja" DIBUANG dari kalimat ini pada 9 Agustus
                   2026, dan bukan cuma karena Laravel masuk. Frasa itu memang
                   sudah keliru sejak situs ini dikembalikan ke React sehari
                   sebelumnya — halaman yang memuat kalimatnya sendiri dibangun
                   dengan kerangka kerja. Kalimat yang dibantah oleh halaman
                   tempat ia berdiri adalah yang paling mahal ongkosnya. */}
              <p className="-body-small max-w-2xl text-text-muted">Mengerjakan dua sisi sekaligus: antarmuka dengan HTML, CSS, dan JavaScript — menyusun layout, hierarki visual, dan gerak yang terukur supaya tetap ringan di perangkat kelas menengah — lalu sisi server dengan PHP dan Laravel, merangkai tampilannya lewat Blade, serta merancang skema dan kueri MySQL yang menopangnya.</p>
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

          {/* mt-7 (28px), bukan mt-10: .mt-10 tidak ikut terkompilasi ke
               css/style.css, jadi ia class mati dan jaraknya akan jadi nol. Yang
               tersedia mt-2, mt-3, mt-7, mt-16. */}
          <p data-component="scrub-reveal" className="-caption-small mt-7 text-center">
            <span aria-hidden="true" className="mr-2 text-accent">✦</span>Tiga peran. Satu cara kerja.
          </p>
      </div>


          {/* KEMAMPUAN PROFESIONAL — lima card, tiga kolom (lima di >=1024px).

               Tiap card punya tiga baris: ikon, judul, keterangan. Ketiganya harus
               lurus sejajar dengan card di sebelahnya meski panjang judulnya
               berbeda-beda, dan itu diurus `grid-template-rows: subgrid` di
               .skill-card — bukan oleh tinggi cadangan yang ditebak. Alasan
               lengkapnya ada di bagian "KEMAMPUAN PROFESIONAL" di css/style.css.

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
               pemisahan ini membereskan salah kategori yang sudah lama ada.

               Sebelumnya semuanya tumpah ke satu bagian bernama "Perkakas",
               padahal isinya dua jenis benda yang berbeda. VS Code, GitHub,
               Vercel, dan Figma adalah APLIKASI — sesuatu yang dibuka lalu
               dipakai. HTML, PHP, Laravel, dan MySQL bukan: yang pertama
               bahasa markah, yang kedua bahasa pemrograman, yang ketiga
               kerangka kerja, yang keempat basis data. Menaruh bahasa
               pemrograman di bawah judul "Perkakas" kira-kira sama dengan
               menyebut bahasa Indonesia sebagai alat tulis.

               PEMBEDAANNYA DIPIKUL JUDUL BAGIAN, BUKAN NAMA KELOMPOK. Itu
               sebabnya "Sisi Server" yang sempat berdiri di bawah Perkakas
               dibubarkan lagi di hari yang sama: ia memindahkan isinya tanpa
               membereskan judul yang menaunginya, jadi salah kategorinya cuma
               bergeser satu tingkat, tidak hilang.

               Ditaruh SEBELUM Perkakas karena apa yang dibangun lebih menjawab
               pertanyaan "bisa apa" daripada apa yang dipakai membangunnya.

               JEDANYA MULAI DARI NOL LAGI DI SINI, tidak menyambung ke bagian
               Perkakas di bawahnya. Dua bagian yang punya judulnya
               sendiri-sendiri dibaca sebagai dua blok terpisah, dan satu
               rantai yang menembus keduanya membuat card terakhir jatuh di
               sekitar 0,48 detik — pembaca sudah melewatinya sebelum ikon itu
               sempat datang. Di dalam satu bagian aturannya tetap: 0,03
               berurutan menembus kelompok, label memakai jeda card pertamanya.

               REACT BELUM DISEBUT, DAN ITU DITUNDA — BUKAN DITOLAK. Situs ini
               memang dibangun dengan React, jadi buktinya ada di repo, tapi
               pemiliknya memilih menunggu sampai ia benar-benar menguasainya
               lebih dulu. Alasannya masuk akal dan layak dipertahankan: apa
               pun yang tertulis di sini akan digali saat wawancara, dan
               teknologi yang dicantumkan tapi tidak bisa dijelaskan lebih
               merugikan daripada yang tidak dicantumkan sama sekali.

               Jadi kalau suatu saat React ditambahkan, itu memang rencananya
               — tapi tanyakan dulu, jangan diputuskan sendiri.

               CATATAN YANG PERLU DILURUSKAN kalau pertanyaan ini muncul lagi:
               React TIDAK bertabrakan dengan Laravel. Laravel punya Inertia
               yang didukung resmi, yang membuat component React dipakai
               langsung sebagai view Laravel tanpa perlu API terpisah, dan
               starter kit resminya menyediakan opsi React. Alasan menundanya
               murni kesiapan, bukan kecocokan teknologi.
               ═════════════════════════════════════════════════════════════ */}
          <div>
            <h3 data-component="scrub-reveal" className="-caption-small mb-8 text-text-muted">Teknologi</h3>
            <div className="border-t border-line">

              {/* Urutannya dasar dulu, kerangka kerja belakangan — HTML, CSS,
                   JavaScript, baru Tailwind. Pola yang sama dipakai di baris
                   Backend: PHP dulu, Laravel sesudahnya. Kerangka kerja berdiri
                   di atas bahasanya, jadi membacanya terbalik menyiratkan
                   Tailwind bisa dipakai tanpa tahu CSS. */}
              <div className="tool-row border-b border-line">
                <h4 data-component="scrub-reveal" data-delay="0" className="-caption-small tool-label text-text-muted">Frontend</h4>
                <span data-component="scrub-reveal" data-delay="0" className="h-px w-8 self-center bg-line"></span>

                <div className="tool-items">

                  <div data-component="scrub-reveal" data-delay="0" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/html5.svg" alt="" loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">HTML</span>
                  </div>

                  <div data-component="scrub-reveal" data-delay="0.03" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/css.svg" alt="" loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">CSS</span>
                  </div>

                  {/* JavaScript DITURUNKAN ke 0,86, alasan yang sama dengan PHP
                       tapi sebabnya berbeda. Logo ini satu-satunya BIDANG
                       TERISI PENUH di seluruh grid: kotak kuning #F0DB4F
                       memenuhi 100% bounding box-nya, sementara perisai HTML
                       dan CSS berongga dan logo lain bergaris. Pada 36px
                       dan skala 1,0 ia terbaca sebagai blok paling menyala di
                       barisnya, mengalahkan tetangganya yang sama besar.

                       Terukur berdampingan dengan VS Code, Figma, dan Laravel:
                       0,86 menyamakan bobot tampaknya tanpa membuat huruf "JS"
                       mengecil. Warnanya tidak disentuh.

                       CATATAN SUMBER, dan ini pengecualian yang perlu ditulis:
                       JavaScript TIDAK PUNYA logo resmi. Ecma tidak pernah
                       menerbitkan satu pun, jadi kotak kuning ini logo
                       komunitas yang sudah jadi kesepakatan de facto. Aturan
                       repo ini — ambil dari situs resmi mereknya — tidak bisa
                       dipenuhi untuk yang satu ini karena tidak ada situs
                       resminya. Sama halnya dengan wordmark Stitch di bagian
                       AI, yang harus dibangun sendiri dari font. */}
                  <div data-component="scrub-reveal" data-delay="0.06" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/javascript.svg" alt="" loading="lazy" decoding="async" style={{ transform: "scale(0.86)" }} className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">JavaScript</span>
                  </div>

                  {/* "Tailwind CSS", bukan "Tailwind". Nama lengkap dipakai di
                       seluruh grid ini dengan alasan yang sama seperti Google
                       Workspace dan MS Office: penyaring lamaran mencocokkan
                       teks secara harfiah. */}
                  <div data-component="scrub-reveal" data-delay="0.09" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/tailwind.svg" alt="" loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">Tailwind CSS</span>
                  </div>

                </div>
              </div>

              {/* KENAPA LARAVEL DAN BLADE ADA DI BACKEND, bukan di Frontend
                   atau di kelompok tersendiri. Pertanyaan ini sudah pernah
                   diajukan pada 9 Agustus 2026, ditimbang, lalu susunan ini
                   dipertahankan — dicatat di sini supaya tidak di-teardown ulang
                   dengan alasan yang sama.

                   KEBERATANNYA MASUK AKAL: Blade menghasilkan HTML, jadi
                   sekilas ia terasa milik sisi antarmuka. Tapi Blade tidak
                   pernah berjalan di browser. Ia dijalankan PHP di server, dan
                   yang dikirim ke pengunjung cuma HTML hasil jadinya —
                   kode Blade-nya sendiri tidak ikut. Bandingkan dengan
                   Tailwind, yang class-nya benar-benar sampai ke browser.
                   Laravel pun begitu: ia memang disebut full-stack framework,
                   tapi inti kerjanya (rute, controller, ORM) di server, dan
                   pasar kerja menyebutnya backend — "Backend Developer
                   (Laravel)" itu judul lowongan yang baku.

                   ALTERNATIF YANG DITOLAK: mengelompokkan per jenis (Bahasa /
                   Kerangka / Basis Data). Susunan itu lebih presisi soal jenis
                   benda, tapi membuang justru hal yang paling dicari pembaca —
                   sisi mana yang dikerjakan. Menghilangkannya berarti kembali
                   ke keadaan sebelum seluruh perubahan ini dimulai, sebab
                   pertanyaan "frontend, backend, atau yang mana" itulah yang
                   men-trigger-nya. Ia juga menyisakan kelompok Basis Data berisi
                   satu ikon sendirian.

                   Pengelompokan per jenis TETAP ADA, tapi sebagai URUTAN di
                   dalam kelompok, bukan sebagai namanya: bahasa dulu, kerangka
                   kerja menyusul, basis data menutup. Lihat komentar urutan di
                   baris Frontend. */}
              <div className="tool-row border-b border-line">
                <h4 data-component="scrub-reveal" data-delay="0.12" className="-caption-small tool-label text-text-muted">Backend</h4>
                <span data-component="scrub-reveal" data-delay="0.12" className="h-px w-8 self-center bg-line"></span>

                <div className="tool-items">

                  {/* Logo resmi PHP adalah wordmark "php" DI DALAM elips
                       lavender berlis putih — ia satu-satunya di baris ini yang
                       membawa latarnya sendiri. Di halaman segelap ini elips itu
                       terbaca sebagai gumpalan paling terang di barisnya, jauh
                       melebihi porsinya dibanding Laravel dan MySQL.

                       Diukur pada 36px berdampingan dengan tetangganya: pada
                       skala 1,0 ia mendominasi, pada 0,80 ia jadi terlalu kecil
                       untuk terbaca hurufnya. 0,88 titik tengahnya — bobotnya
                       setara GitHub dan VS Code, tulisan "php"-nya masih terbaca.

                       Ini perlakuan yang sama dengan Vercel (0,86), Stitch
                       (0,85), dan JavaScript (0,86) di baris atas: SKALANYA
                       yang diturunkan, bukan warnanya diganti. Mengubah warna
                       logo resmi orang lain melanggar pedoman mereknya;
                       mengecilkannya tidak. */}
                  <div data-component="scrub-reveal" data-delay="0.12" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/php.svg" alt="" loading="lazy" decoding="async" style={{ transform: "scale(0.88)" }} className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">PHP</span>
                  </div>

                  <div data-component="scrub-reveal" data-delay="0.15" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/laravel.svg" alt="" loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">Laravel</span>
                  </div>

                  {/* BLADE ADALAH SATU-SATUNYA ENTRI DI GRID INI YANG BUKAN
                       LOGO MEREK, dan itu tidak bisa dihindari: Blade tidak
                       punya logo resmi karena ia bukan produk tersendiri —
                       ia mesin templating DI DALAM Laravel. Tidak ada situs
                       resmi yang bisa dibuka untuk mengunduhnya, jadi aturan
                       baku repo ini tidak berlaku di sini. Pengecualian yang
                       sama sudah pernah ditulis untuk JavaScript (tidak punya
                       logo resmi) dan Stitch (harus dibangun dari font).

                       Dipakai glyph Font Awesome fa-code, bukan file SVG.
                       Font Awesome sudah dibundel lewat src/main.jsx, jadi ini
                       tidak menambah satu pun permintaan jaringan.

                       PILIHAN GLYPH-NYA DIUKUR, bukan diambil yang pertama
                       terlihat. fa-file-code — file terisi penuh — sempat
                       dicoba dan bobotnya terlalu berat berdampingan dengan
                       logo Laravel yang bergaris tipis, persis masalah yang
                       sama dengan kotak JavaScript. fa-code yang berupa tanda
                       kurung sudut justru sebangun dengan Laravel, dan bentuk
                       "</>": itu sendiri memang membaca sebagai markah — yang
                       persis pekerjaan Blade.

                       WARNANYA #FF2D20, merah Laravel, dan itu disengaja.
                       Blade bagian dari Laravel, jadi warna yang sama menandai
                       kekerabatannya tanpa menggandakan logo-nya. Sempat
                       dicoba abu #d8d8d8 mengikuti perlakuan logo tak
                       berwarna seperti Vercel, tapi hasilnya justru memutus
                       hubungan itu — ia tampak seperti entri asing.

                       28px, bukan 30px yang tampak paling pas di mata: 28
                       salah satu dari sepuluh langkah font size situs ini,
                       30 bukan. Selisihnya tidak terlihat, keseragamannya
                       terlihat. */}
                  <div data-component="scrub-reveal" data-delay="0.18" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <i className="fa-solid fa-code text-[28px]" style={{ color: "#FF2D20" }} aria-hidden="true"></i>
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">Blade</span>
                  </div>

                  {/* MySQL DINAIKKAN ke 1,06, kebalikan dari PHP. Logo-nya
                       lumba-lumba di atas wordmark, jadi tingginya terbagi dua
                       dan tulisan "MySQL" cuma kebagian sekitar 40% dari 36px.
                       Pada skala 1,0 tulisannya mengecil sampai hampir tak
                       terbaca; 1,06 mengembalikannya tanpa membuat lumba-lumbanya
                       melewati tinggi kotak. */}
                  <div data-component="scrub-reveal" data-delay="0.21" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/mysql.svg" alt="" loading="lazy" decoding="async" style={{ transform: "scale(1.06)" }} className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">MySQL</span>
                  </div>

                </div>
              </div>

            </div>
          </div>


          {/* PERKAKAS — APLIKASI yang dipakai bekerja, bukan yang dibangun.
               Bahasa, kerangka kerja, dan basis data pindah ke bagian Teknologi
               di atas pada 9 Agustus 2026; alasan pemisahannya ditulis lengkap
               di sana.

               Urutan kelompoknya mengikuti urutan peran di typewriter bagian
               sampul — pengembangan → pengajaran → administrasi — supaya tiap
               peran yang diklaim di sana punya alasnya di sini, lalu ditutup AI
               sebagai cara kerja. Nama ditulis lengkap karena penyaring lamaran
               mencocokkan teks secara harfiah.

               Kelompok "Riset & Desain" (Figma, Google Analytics, Maze, Notion)
               dibuang bersama keempat file ikonnya waktu peran utama berganti
               dari UI/UX Designer jadi Web Developer: ia berdiri paling depan
               padahal tidak lagi mewakili peran mana pun yang diklaim di sampul.

               Isinya kembali 4-2-2-3 dan jedanya kembali berakhir di 0,30,
               sama persis seperti sebelum Laravel, PHP, dan MySQL sempat
               disisipkan ke sini. Rantainya berdiri sendiri, tidak menyambung
               dari bagian Teknologi — lihat alasannya di komentar bagian itu. */}
          <div>
            <h3 data-component="scrub-reveal" className="-caption-small mb-8 text-text-muted">Perkakas</h3>
            <div className="border-t border-line">

              <div className="tool-row border-b border-line">
                <h4 data-component="scrub-reveal" data-delay="0" className="-caption-small tool-label text-text-muted">Pengembangan</h4>
                <span data-component="scrub-reveal" data-delay="0" className="h-px w-8 self-center bg-line"></span>

                <div className="tool-items">

                  <div data-component="scrub-reveal" data-delay="0" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/vscode.svg" alt="" loading="lazy" decoding="async" style={{ transform: "scale(1.14)" }} className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">VS Code</span>
                  </div>

                  {/* GitHub dan Notion tampil satu warna, dan itu BUKAN
                       penambal: logo resmi keduanya memang tidak punya versi
                       berwarna menurut pedoman mereknya sendiri. */}
                  <div data-component="scrub-reveal" data-delay="0.03" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="aspect-square h-full"><path d="M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">GitHub</span>
                  </div>

                  {/* Vercel digambar satu warna: logo resminya memang hanya
                       hitam atau putih. Aslinya hitam, dibalik ke #d8d8d8 karena
                       latar bagian ini gelap. */}
                  <div data-component="scrub-reveal" data-delay="0.06" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/vercel.svg" alt="" loading="lazy" decoding="async" style={{ transform: "scale(0.86)" }} className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">Vercel</span>
                  </div>

                  {/* Figma ditaruh PALING BELAKANG di baris ini, bukan paling depan,
                       meski di alur kerja ia datang lebih dulu dari menulis kode.
                       Baris ini dibaca dari kiri sebagai apa yang paling mewakili
                       peran Fullstack Web Developer, dan yang harus berdiri di depan
                       adalah perkakas membangunnya — sejak 9 Agustus 2026 itu berarti
                       Laravel, PHP, dan MySQL. Kalau nanti barisnya mau dibaca sebagai
                       alur — rancang, tulis, simpan, terbitkan — pindahkan Figma ke
                       depan dan hitung ulang jedanya.

                       Logo-nya lima bentuk berwarna, diambil apa adanya dari
                       halaman unduhan Figma. Warnanya rona baru mereka (#FF7237,
                       #FF3737, #00B6FF, #874FFF, #24CB71), bukan rona lama yang
                       masih banyak beredar di kumpulan logo pihak ketiga. */}
                  <div data-component="scrub-reveal" data-delay="0.09" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/figma.svg" alt="" loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">Figma</span>
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
                <h4 data-component="scrub-reveal" data-delay="0.12" className="-caption-small tool-label text-text-muted">Pengajaran</h4>
                <span data-component="scrub-reveal" data-delay="0.12" className="h-px w-8 self-center bg-line"></span>

                <div className="tool-items">

                  <div data-component="scrub-reveal" data-delay="0.12" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
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
                  <div data-component="scrub-reveal" data-delay="0.15" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
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
                <h4 data-component="scrub-reveal" data-delay="0.18" className="-caption-small tool-label text-text-muted">Administrasi</h4>
                <span data-component="scrub-reveal" data-delay="0.18" className="h-px w-8 self-center bg-line"></span>

                <div className="tool-items">

                  <div data-component="scrub-reveal" data-delay="0.18" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
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
                  <div data-component="scrub-reveal" data-delay="0.21" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
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
                <h4 data-component="scrub-reveal" data-delay="0.24" className="-caption-small tool-label text-text-muted">AI</h4>
                <span data-component="scrub-reveal" data-delay="0.24" className="h-px w-8 self-center bg-line"></span>

                <div className="tool-items">

                  <div data-component="scrub-reveal" data-delay="0.24" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/claude.svg" alt="" loading="lazy" decoding="async" style={{ transform: "scale(1.14)" }} className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">Claude</span>
                  </div>

                  <div data-component="scrub-reveal" data-delay="0.27" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
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
                  <div data-component="scrub-reveal" data-delay="0.30" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
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
