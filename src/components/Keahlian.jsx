export default function Keahlian() {
  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════════
           03 KEAHLIAN — tiga kartu, satu untuk tiap peran.

           Bagian ini dulu panggung selebar layar yang di-pin: kata raksasa
           bertumpuk di atas monolit 3D berputar, lalu hurufnya PECAH ke segala
           arah, lalu kartu masuk dari ruang yang ditinggalkannya. Monolit, kabut
           abu di belakangnya, dan ledakan hurufnya dibuang seluruhnya pada
           8 Agustus 2026 — beserta pin dan scrub yang jadi mesinnya, karena
           ketiganya memang satu-satunya alasan mesin itu ada.

           Yang tersisa mengikuti pola bagian lain di halaman ini: satu wadah biasa
           yang ikut aliran, dengan penyingkapan scrub-reveal yang sama seperti
           Kemampuan Profesional dan Perkakas di bawahnya.
           ═══════════════════════════════════════════════════════════════════════ */}
      <section id="keahlian" data-component="chapter" className="relative">

        <div data-component="container" className="mx-auto w-full px-4 sm:px-6 nav:px-10 max-w-[1180px] flex flex-col gap-14 py-16 sm:gap-16 sm:py-20 nav:gap-20 nav:py-28">
          <div>

          <h3 data-component="scrub-reveal" className="-caption-small mb-5 text-text-muted">03 — Keahlian</h3>

          {/* Judul yang terlihat, dan bentuknya SAMA PERSIS dengan Tentang,
               Pengalaman, Sertifikat, dan Kontak: -h1 dengan topeng baris.

               Sempat dibuat sebagai papan balik ber-kotak pada 9 Agustus 2026,
               dibatalkan sehari kemudian. Alasannya bukan ia gagal — ia
               berjalan seperti seharusnya — melainkan bahwa judul bagian
               adalah tempat paling salah untuk berbeda sendiri. Enam judul
               bergerak dengan satu cara dan satu judul dengan cara lain
               membuat yang satu itu terbaca sebagai anomali, bukan sebagai
               penekanan. Penekanan bagian ini sudah dikerjakan kartu-kartu
               di bawahnya.

               Kalau nanti ingin ditonjolkan lagi, yang dinaikkan UKURANNYA
               (-display seperti Pendidikan), bukan jenis geraknya. */}
          <h2 className="-h1 mb-10" data-line-mask>
            <span data-anim="line-mask"><span>Keahlian</span></span>
          </h2>

          {/* Tiga kartu, dan jumlahnya bukan kebetulan: ia persis tiga peran yang
               diketikkan mesin ketik di halaman sampul. Kartu pertama melebar dua
               kolom karena ia peran yang dilamar lebih dulu — hierarkinya jadi
               terlihat, tanpa perlu satu kata label pun.

               Dulu ada kartu keempat, "Antarmuka & Responsif", yang berdiri sendiri
               di samping "Pengembangan Web". Keempatnya lalu tampil setara padahal
               tiga di antaranya peran dan satu cuma kemampuan penunjang — pembaca
               tidak punya cara membedakannya. Isinya sekarang masuk ke kartu
               Pengembangan Fullstack, karena memang di situ tempatnya: menyusun
               tampilan adalah bagian dari membangunnya.

               Kartu itu berganti nama dari "Pengembangan Web" jadi "Pengembangan
               Fullstack" pada 9 Agustus 2026, seiring peran utama di mesin ketik.
               Namanya sengaja menyebut cakupan, bukan teknologinya: nama kerangka
               kerja berganti setiap beberapa tahun, sedangkan "dua sisi" tidak.
               Teknologinya disebut di kalimat bawahnya dan di kisi Perkakas. */}
          {/* KENAPA TIAP KARTU DIBUNGKUS .stage-slot, dan jangan dibuang.
               Ada DUA gerak yang bekerja pada kartu yang sama sekaligus, dan
               keduanya butuh `opacity`:

                 slot   masuk dan keluar mengikuti gulir (opacity + geser)
                 kartu  sorotan yang berpindah (opacity + skala + naik)

               Dipasang di satu elemen, keduanya berebut properti yang sama dan
               yang menang bergantung urutan frame. Bersarang, opacity-nya
               justru MENGALIKAN dengan sendirinya — kartu redup di dalam slot
               yang sedang masuk tampil di 0,78 x kemajuan masuknya, yang
               memang perilaku yang benar tanpa satu baris kode penyelaras pun.

               Slot juga yang memegang penempatan kisinya, bukan kartunya:
               .stage-slot--lead yang merentang dua kolom. Ketiganya TIDAK
               ber-scrub-reveal seperti blok lain di bagian ini — itu akan jadi
               gerak ketiga yang berebut properti yang sama lagi. */}
          <div className="stage-orbit">
            <div className="stage-slot stage-slot--lead" data-kartu-slot data-arah="pudar">
            <article data-kartu-peran className="stage-card stage-card--lead">
              <div className="mb-6 flex items-start justify-between gap-6">
                <h3 className="-h2 max-w-[9em]">Pengembangan Fullstack</h3>
                <span data-glyph="1"></span>
              </div>
              {/* Lebar teks dibatasi meski kartunya melebar. Tanpa ini satu baris
                   memuat sekitar 130 karakter di desktop, dan mata kehilangan tempat
                   saat berpindah ke baris berikutnya. 42rem menahannya di sekitar
                   88 karakter. */}
              {/* "tanpa kerangka kerja" DIBUANG dari kalimat ini pada 9 Agustus
                   2026, dan bukan cuma karena Laravel masuk. Frasa itu memang
                   sudah keliru sejak situs ini dikembalikan ke React sehari
                   sebelumnya — halaman yang memuat kalimatnya sendiri dibangun
                   dengan kerangka kerja. Kalimat yang dibantah oleh halaman
                   tempat ia berdiri adalah yang paling mahal ongkosnya. */}
              <p className="-body-small max-w-2xl text-text-muted">Mengerjakan dua sisi sekaligus: antarmuka dengan HTML, CSS, dan JavaScript — menyusun layout, hierarki visual, dan gerak yang terukur supaya tetap ringan di perangkat kelas menengah — lalu sisi server dengan PHP dan Laravel, termasuk merancang skema serta kueri MySQL yang menopangnya.</p>
            </article>
            </div>

            <div className="stage-slot" data-kartu-slot data-arah="kiri">
            <article data-kartu-peran className="stage-card">
              <div className="mb-6 flex items-start justify-between gap-6">
                <h3 className="-h2 max-w-[9em]">Pengajaran Teknis</h3>
                <span data-glyph="2"></span>
              </div>
              <p className="-body-small text-text-muted">Mengajar pemrograman dasar, jaringan dasar, dan teknologi layanan jaringan, termasuk mengawasi dan mengevaluasi proyek akhir siswa.</p>
            </article>
            </div>

            <div className="stage-slot" data-kartu-slot data-arah="kanan">
            <article data-kartu-peran className="stage-card">
              <div className="mb-6 flex items-start justify-between gap-6">
                <h3 className="-h2 max-w-[9em]">Administrasi Digital</h3>
                <span data-glyph="3"></span>
              </div>
              <p className="-body-small text-text-muted">Pendataan, pencatatan surat masuk dan keluar, pengelolaan disposisi, serta digitalisasi arsip.</p>
            </article>
            </div>
          </div>

          {/* mt-7 (28px), bukan mt-10: .mt-10 tidak ikut terkompilasi ke
               css/style.css, jadi ia kelas mati dan jaraknya akan jadi nol. Yang
               tersedia mt-2, mt-3, mt-7, mt-16. */}
          <p data-component="scrub-reveal" className="-caption-small mt-7 text-center">
            <span aria-hidden="true" className="mr-2 text-accent">✦</span>Tiga peran. Satu cara kerja.
          </p>
      </div>


          {/* KEMAMPUAN PROFESIONAL — lima kartu, tiga kolom (lima di >=1024px).

               Tiap kartu punya tiga baris: ikon, judul, keterangan. Ketiganya harus
               lurus sejajar dengan kartu di sebelahnya meski panjang judulnya
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

          {/* PERKAKAS. Urutan kelompoknya mengikuti urutan peran di mesin ketik
               bagian sampul — pengembangan → pengajaran → administrasi — supaya
               tiap peran yang diklaim di sana punya alasnya di sini, lalu ditutup
               AI sebagai cara kerja. Nama ditulis lengkap karena penyaring lamaran
               mencocokkan teks secara harfiah.

               Kelompok "Riset & Desain" (Figma, Google Analytics, Maze, Notion)
               dibuang bersama keempat berkas ikonnya waktu peran utama berganti
               dari UI/UX Designer jadi Web Developer: ia berdiri paling depan
               padahal tidak lagi mewakili peran mana pun yang diklaim di sampul.
               Jeda animasi seluruh baris di bawah ikut dihitung ulang supaya
               kembali berurutan 0,03 dari nol.

               LARAVEL, PHP, DAN MYSQL DITAMBAHKAN pada 9 Agustus 2026, waktu
               peran utama berganti dari Web Developer jadi Fullstack Web
               Developer. Tanpa ketiganya klaim di sampul tidak punya alas sama
               sekali: kisi ini seluruhnya perkakas sisi antarmuka, sehingga
               kata "fullstack" cuma jadi label yang dibantah oleh isinya
               sendiri. Ketiganya berdiri sebagai kelompok PERTAMA, dengan
               alasan yang ditulis panjang tepat di atas barisnya.

               Kelompoknya jadi lima, isinya 3-4-2-2-3, dan jeda seluruh kisi
               digeser: yang tadinya berakhir di 0,30 sekarang 0,39. Aturannya
               tidak berubah — 0,03 berurutan dari nol menembus semua kelompok,
               dan label tiap kelompok memakai jeda kartu pertamanya. */}
          <div>
            <h3 data-component="scrub-reveal" className="-caption-small mb-8 text-text-muted">Perkakas</h3>
            <div className="border-t border-line">

              {/* SISI SERVER BERDIRI SEBAGAI KELOMPOK SENDIRI, bukan disatukan
                   ke Pengembangan, dan ada dua alasan yang kebetulan sejalan.

                   YANG PERTAMA, TATA LETAK. Sempat dicoba satu kelompok berisi
                   tujuh, dan itu memecahkan sifat yang dijaga kisi ini sejak
                   awal: jumlah kartu per baris ditentukan penulisnya, bukan
                   lebar layar. Terukur pada tujuh — desktop memuat enam lalu
                   melempar Figma sendirian ke baris kedua (982px ruang isi
                   dibagi 152px per kartu = 6,4), sementara ponsel yang dipatok
                   25% memuat empat lalu tiga. Dua susunan berbeda untuk kisi
                   yang sama. Dipecah jadi 3 dan 4, keduanya muat satu baris
                   penuh di semua lebar, persis seperti kelompok lainnya.

                   YANG KEDUA, DAN INI YANG SEBENARNYA LEBIH PENTING: label
                   inilah yang membuat klaim "fullstack" bisa DILIHAT, bukan
                   cuma dibaca. Satu baris berlabel "Sisi Server" menjawab
                   pertanyaan yang paling wajar diajukan pembaca — frontend,
                   backend, atau yang mana — tanpa satu kalimat penjelasan pun.

                   Namanya "Sisi Server", bukan "Backend", supaya seragam dengan
                   kalimat di kartu Pengembangan Fullstack di atas yang juga
                   memakai frasa itu. Dua nama untuk satu hal di halaman yang
                   sama membuat pembaca berhenti menimbang apakah keduanya
                   memang hal yang berbeda.

                   Kelompok Pengembangan di bawahnya sengaja TIDAK diberi nama
                   "Frontend": isinya editor, kendali versi, tempat terbit, dan
                   perkakas rancang — tidak satu pun khusus sisi antarmuka.
                   Menamainya begitu akan jadi label yang dibantah isinya. */}
              <div className="tool-row border-b border-line">
                <h4 data-component="scrub-reveal" data-delay="0" className="-caption-small tool-label text-text-muted">Sisi Server</h4>
                <span data-component="scrub-reveal" data-delay="0" className="h-px w-8 self-center bg-line"></span>

                <div className="tool-items">

                  <div data-component="scrub-reveal" data-delay="0" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/laravel.svg" alt="" loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">Laravel</span>
                  </div>

                  {/* Lambang resmi PHP adalah wordmark "php" DI DALAM elips
                       lavender berlis putih — ia satu-satunya di kisi ini yang
                       membawa latarnya sendiri. Di halaman segelap ini elips itu
                       terbaca sebagai gumpalan paling terang di barisnya, jauh
                       melebihi porsinya dibanding Laravel dan VS Code.

                       Diukur pada 36px berdampingan dengan tetangganya: pada
                       skala 1,0 ia mendominasi, pada 0,80 ia jadi terlalu kecil
                       untuk terbaca hurufnya. 0,88 titik tengahnya — bobotnya
                       setara GitHub dan VS Code, tulisan "php"-nya masih terbaca.

                       Ini perlakuan yang sama dengan Vercel (0,86) dan Stitch
                       (0,85): SKALANYA yang diturunkan, bukan warnanya diganti.
                       Mengubah warna lambang resmi orang lain melanggar pedoman
                       mereknya; mengecilkannya tidak. */}
                  <div data-component="scrub-reveal" data-delay="0.03" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/php.svg" alt="" loading="lazy" decoding="async" style={{ transform: "scale(0.88)" }} className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">PHP</span>
                  </div>

                  {/* MySQL DINAIKKAN ke 1,06, kebalikan dari PHP. Lambangnya
                       lumba-lumba di atas wordmark, jadi tingginya terbagi dua
                       dan tulisan "MySQL" cuma kebagian sekitar 40% dari 36px.
                       Pada skala 1,0 tulisannya mengecil sampai hampir tak
                       terbaca; 1,06 mengembalikannya tanpa membuat lumba-lumbanya
                       melewati tinggi kotak. */}
                  <div data-component="scrub-reveal" data-delay="0.06" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/mysql.svg" alt="" loading="lazy" decoding="async" style={{ transform: "scale(1.06)" }} className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">MySQL</span>
                  </div>

                </div>
              </div>

              <div className="tool-row border-b border-line">
                <h4 data-component="scrub-reveal" data-delay="0.09" className="-caption-small tool-label text-text-muted">Pengembangan</h4>
                <span data-component="scrub-reveal" data-delay="0.09" className="h-px w-8 self-center bg-line"></span>

                <div className="tool-items">

                  <div data-component="scrub-reveal" data-delay="0.09" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/vscode.svg" alt="" loading="lazy" decoding="async" style={{ transform: "scale(1.14)" }} className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">VS Code</span>
                  </div>

                  {/* GitHub dan Notion tampil satu warna, dan itu BUKAN
                       penambal: lambang resmi keduanya memang tidak punya versi
                       berwarna menurut pedoman mereknya sendiri. */}
                  <div data-component="scrub-reveal" data-delay="0.12" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="aspect-square h-full"><path d="M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">GitHub</span>
                  </div>

                  {/* Vercel digambar satu warna: lambang resminya memang hanya
                       hitam atau putih. Aslinya hitam, dibalik ke #d8d8d8 karena
                       latar bagian ini gelap. */}
                  <div data-component="scrub-reveal" data-delay="0.15" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
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

                       Lambangnya lima bentuk berwarna, diambil apa adanya dari
                       halaman unduhan Figma. Warnanya rona baru mereka (#FF7237,
                       #FF3737, #00B6FF, #874FFF, #24CB71), bukan rona lama yang
                       masih banyak beredar di kumpulan lambang pihak ketiga. */}
                  <div data-component="scrub-reveal" data-delay="0.18" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
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
                   ditulis dua kali; yang memberi tahu perannya adalah kartu pengalaman
                   "Guru Informatika" di bagian Pengalaman. */}
              <div className="tool-row border-b border-line">
                <h4 data-component="scrub-reveal" data-delay="0.21" className="-caption-small tool-label text-text-muted">Pengajaran</h4>
                <span data-component="scrub-reveal" data-delay="0.21" className="h-px w-8 self-center bg-line"></span>

                <div className="tool-items">

                  <div data-component="scrub-reveal" data-delay="0.21" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/google-classroom.svg" alt="" loading="lazy" decoding="async" style={{ transform: "scale(1.25)" }} className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">Google Classroom</span>
                  </div>

                  {/* Quizizz berganti nama jadi Wayground pada 2025, dan sejak
                       7 Agustus 2026 yang dipakai di sini nama serta lambang barunya.
                       Sebelumnya sengaja tetap "Quizizz" dengan alasan itu nama yang
                       dikenal pendidik Indonesia; alasan itu dilepas karena situsnya
                       sendiri sudah wayground.com dan lambang lamanya tidak muncul
                       lagi di mana pun.

                       Lambangnya tiga bilah bersudut membentuk huruf W, diambil apa
                       adanya dari SVG di halaman mereka. viewBox-nya dirapatkan dari
                       "0 0 48 48" jadi "8 13 32 22" — itu kotak isi sebenarnya,
                       diukur lewat getBBox, kebetulan bilangan bulat semua. Tanpa
                       dirapatkan, lambangnya cuma mengisi separuh kotak 32px di
                       kisi ini dan terlihat lebih kecil dari lambang tetangganya.

                       Warnanya #FF319F, merah muda. Sempat dipasang krem #F3EFDA —
                       itu memang warna yang mereka pakai untuk lambang ini, tapi
                       hanya SEBAGAI VERSI DI LATAR GELAP di halaman mereka sendiri,
                       dan hasilnya di sini terbaca seperti lambang tak berwarna.
                       Warna mereknya yang sebenarnya diambil dari favicon resmi
                       mereka, yang isinya lambang merah muda di atas putih; piksel
                       dominannya persis #FF319F.

                       Pelajarannya: satu halaman bisa menampilkan lambang dalam
                       warna yang BUKAN warna mereknya, semata karena latar halaman
                       itu gelap. Kalau ragu, buka favicon-nya — di sana lambangnya
                       hampir selalu tampil pada latar netral dengan warna aslinya.

                       Aturan lama tetap berlaku kalau nanti ada lambang gelap yang
                       ditambahkan: terangkan pada rona aslinya, jangan diganti
                       warnanya. Wordmark Quizizz dulu aslinya #5D2057 dan nyaris
                       tak terlihat di latar #040508. */}
                  <div data-component="scrub-reveal" data-delay="0.24" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
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
                <h4 data-component="scrub-reveal" data-delay="0.27" className="-caption-small tool-label text-text-muted">Administrasi</h4>
                <span data-component="scrub-reveal" data-delay="0.27" className="h-px w-8 self-center bg-line"></span>

                <div className="tool-items">

                  <div data-component="scrub-reveal" data-delay="0.27" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/ms-office.svg" alt="" loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">MS Office</span>
                  </div>

                  {/* Google Workspace memakai wordmark penuhnya, perbandingan 7,76:1.
                       Ia memang tampil lebih pendek daripada lambang persegi di
                       sebelahnya — itu sifat wordmark sepanjang ini, bukan salah ukuran. */}
                  <div data-component="scrub-reveal" data-delay="0.30" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
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
                <h4 data-component="scrub-reveal" data-delay="0.33" className="-caption-small tool-label text-text-muted">AI</h4>
                <span data-component="scrub-reveal" data-delay="0.33" className="h-px w-8 self-center bg-line"></span>

                <div className="tool-items">

                  <div data-component="scrub-reveal" data-delay="0.33" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/claude.svg" alt="" loading="lazy" decoding="async" style={{ transform: "scale(1.14)" }} className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">Claude</span>
                  </div>

                  <div data-component="scrub-reveal" data-delay="0.36" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/claude-code.svg" alt="" loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">Claude Code</span>
                  </div>

                  {/* Yang dipakai di sini WORDMARK tulisan "Stitch", bukan lambang
                       kapsulnya. Pernah diganti ke lambang kapsul (SVG buatan sendiri,
                       dibangun ulang dari PNG resmi 512px mereka) supaya sebaris
                       dengan perkakas lain yang memakai lambang; hasilnya justru
                       janggal — kapsul dengan dua titik itu tidak terbaca sebagai
                       apa-apa dalam ukuran 32px, apalagi berdampingan dengan lambang
                       yang punya bentuk khas seperti Claude dan VS Code. Wordmark-nya
                       dikembalikan pada 7 Agustus 2026. Jangan diganti lagi ke kapsul.

                       Google tidak menerbitkan lambang Stitch dalam bentuk SVG, dan
                       halaman mereka tidak memuat berkas lambang APA PUN — wordmark
                       di pojok kiri atasnya teks hidup ber-font Google Sans. Jadi
                       berkas ini dibuat dengan mengurai woff2 yang dimuat halaman
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
                       itu perlakuan baku situs ini untuk lambang yang aslinya putih
                       atau hitam polos. Aslinya di halaman Stitch memang putih
                       penuh, tapi putih penuh di sini lebih terang dari semua
                       lambang lain dan menarik perhatian melebihi porsinya.

                       scale(0.85) menahannya supaya tidak lebih dominan dari
                       lambang tetangganya yang bujur sangkar. */}
                  <div data-component="scrub-reveal" data-delay="0.39" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
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
