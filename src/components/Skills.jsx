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

          {/* <p>, BUKAN <h3> — dibetulkan 27 Agustus 2026.

               Baris nomor ini sempat ditulis sebagai <h3> dan itu keliru dua
               kali sekaligus. Pertama, ia berdiri SEBELUM <h2>Keahlian</h2> di
               bawahnya, jadi kerangka judul halaman berbunyi h1 → h3 → h2:
               pembaca layar yang melompat antar judul mendengar sub-judul lebih
               dulu daripada judul induknya. Kedua, isinya kata yang sama persis
               dengan judul itu, jadi "Keahlian" terdengar dua kali berturut-turut
               tanpa menambah satu keterangan pun.

               Lima bagian lain menulis baris nomornya sebagai <span> biasa di
               dalam <div> — bagian ini satu-satunya yang tidak. Sekarang ia
               <p>: tetap terbaca berurutan, tapi tidak lagi mengaku judul.
               Tampilannya tidak berubah sedikit pun, sebab seluruh tipografi
               situs ini datang dari class `-caption-small`, bukan dari nama
               tag-nya. */}
          <p data-component="scrub-reveal" className="-caption-small mb-5 text-text-muted">03 — Keahlian</p>

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
                   tetap terbaca di sini: teksnya 268 karakter, jadi ia selesai
                   dalam dua baris, dan dua baris tidak menuntut mata melakukan
                   perpindahan berulang seperti paragraf panjang.

                   ANGKA ITU SUDAH BERGERAK DUA KALI pada 23 Agustus 2026:
                   208 -> 188 waktu nama perkakasnya dibuang, lalu 188 -> 268
                   waktu urutan langkahnya dibetulkan jadi tujuh. Keduanya
                   dijelaskan di blok komentar tepat di atas kalimatnya.

                   268 MASIH DUA BARIS, tapi kelonggarannya tinggal tipis: pada
                   1044px satu baris penuh memuat sekitar 150 karakter, jadi
                   dua baris menampung sekitar 300. Sisa 32 karakter. Kalau
                   nanti kalimat ini diperpanjang lagi, ia akan jatuh ke tiga
                   baris — dan di situlah batas lebar teksnya perlu
                   dipertimbangkan ulang, di angka yang lebih besar dari 42rem
                   (misalnya 64rem) supaya tetap memenuhi card tanpa jatuh ke
                   baris sepanjang 150 karakter.

                   Kalau nanti keterangannya diperpanjang jauh melewati ini,
                   pertimbangkan mengembalikan batas lebarnya — di angka yang
                   lebih besar dari 42rem, misalnya 64rem, supaya tetap memenuhi
                   card tanpa jatuh ke baris sepanjang 150 karakter. */}
              {/* NAMA PERKAKASNYA DIBUANG pada 23 Agustus 2026, dan itu
                   MEMBALIK aturan yang berdiri di tempat ini sebelumnya —
                   jadi bacalah seluruh blok ini sebelum memulihkannya.

                   Yang dulu tertulis di sini: kalimat ini WAJIB menyebut
                   teknologinya harfiah (Python, PostgreSQL, Power BI,
                   Tableau), dengan alasan yang sama seperti deskripsi meta di
                   index.html — penyaring lamaran mencocokkan teks apa adanya.
                   Alasan itu benar, dan tetap berlaku DI META. Yang keliru
                   memperluasnya sampai ke card ini.

                   DUA SEBAB, DAN YANG KEDUA LEBIH MENENTUKAN.

                   Pertama, KETIGA CARD DI BLOK INI HARUS SATU REGISTER.
                   "Pengajaran Teknis" dan "Administrasi Digital" di sebelahnya
                   hanya menyebut langkah kerja; card ini satu-satunya yang
                   mendaftar nama program. Di tiga kotak yang berdampingan,
                   satu yang berbeda cara bicaranya terbaca sebagai penekanan
                   — dan mengangkat satu dari tiga peran adalah hal yang paling
                   dihindari halaman ini. Alasan lengkapnya di komentar kalimat
                   pembuka src/components/About.jsx, aturan nomor dua.

                   Kedua, PERKAKASNYA KONDISIONAL. Yang menentukan dipakainya
                   Python, PostgreSQL, atau Tableau adalah pertanyaan yang
                   sedang dijawab, bukan perannya. Mendaftarnya sebagai isi
                   peran menjanjikan sesuatu yang tidak selalu benar, dan
                   menuntut kalimat ini direvisi tiap kali perkakasnya
                   berganti. Dua card tetangganya tidak pernah punya utang itu.

                   YANG MENGGANTIKANNYA BENDANYA, BUKAN PROGRAMNYA — data
                   mentah, basis data, dashboard.

                   URUTAN DAN JUMLAH LANGKAHNYA IKUT BERUBAH di hari yang sama,
                   dan itu perbaikan terpisah dari pembuangan nama perkakas di
                   atas. Ringkasnya: versi lama mulai dari "menarik data"
                   (padahal pekerjaan analis mulai dari PERTANYAAN, dan
                   pertanyaan itu datang dari orang lain), menaruh "merapikan"
                   sebelum datanya sempat diambil, dan melompat dari data yang
                   sudah rapi langsung ke dashboard — melewatkan analisisnya
                   sendiri. Sekarang tujuh langkah, urut: pertanyaan, basis
                   data, pembersihan, pola dan model, dashboard, penjelasan,
                   rekomendasi.

                   Alasan lengkap tiap perubahan ditulis di komentar baris 01
                   src/components/About.jsx supaya tidak ditulis dua kali; yang
                   di sini sengaja cuma ringkasannya.

                   TIGA KATA SAMBUNG UNTUK TUJUH LANGKAH. Draf awalnya lima dan
                   terbaca tersendat. Dua dipangkas tanpa membuang langkah:
                   pasangan sinonim "membersihkan dan merapikan" jadi satu
                   kata, "mengeksplorasi dengan mencari pola" jadi "menggali
                   pola". Kalau ada langkah baru nanti, pangkas dengan cara yang
                   sama — cari kata yang artinya bertindihan, jangan membuang
                   langkahnya.

                   PENYARING LAMARAN TIDAK KEHILANGAN SATU KATA PUN, dan itu
                   diperiksa sebelum diputuskan, bukan diandaikan: keenam nama
                   itu masih berdiri di judul halaman, di deskripsi meta, dan —
                   yang paling menentukan — sebagai card di grid Teknologi dan
                   Perkakas beberapa layar di bawah. Aturan satu arah di
                   index.html karena itu tetap terpenuhi: yang disebut meta
                   harus ada di halaman, dan grid itulah tempatnya.
                   Konsekuensinya grid itu sekarang SATU-SATUNYA tempat di
                   badan halaman yang menyebut keenamnya, jadi jangan
                   memangkasnya dengan alasan sudah disebut di tempat lain.

                   YANG TETAP BERLAKU DARI ATURAN LAMA: kalimat ini tidak boleh
                   menjanjikan sesuatu yang dibantah halamannya sendiri
                   beberapa layar kemudian. Ongkos pelajaran itu sudah pernah
                   dibayar — sampai 9 Agustus 2026 kalimat ini berbunyi "tanpa
                   kerangka kerja" di halaman yang dibangun dengan React.
                   Sekarang ia tidak menyebut perkakas sama sekali, jadi tidak
                   ada lagi yang bisa dibantah.

                   Perubahan kembarannya ada di baris 01 bagian Tentang
                   (src/components/About.jsx). Kalau salah satunya dipulihkan,
                   pulihkan keduanya. */}
              <p className="-body-small text-text-muted">Menerima pertanyaan dari atasan atau pengguna, menyusun serta mengueri basis datanya, merapikan data mentahnya, menggali pola dan membangun modelnya, menyajikan hasilnya sebagai dashboard, menjelaskan arti temuannya, lalu memberi rekomendasi yang bisa ditindaklanjuti.</p>
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

               ══ URUTANNYA DIUBAH pada 23 Agustus 2026, atas permintaan

               Dari komunikasi teknis / analisis / adaptabilitas / perhatian
               pada detail / koordinasi tim, jadi:

                 1  Analisis & Pemecahan Masalah
                 2  Komunikasi Teknis
                 3  Perhatian pada Detail
                 4  Adaptabilitas
                 5  Koordinasi Tim

               YANG DIBERESKAN URUTAN LAMA: ia membuka dengan Komunikasi
               Teknis, kemampuan yang paling lekat dengan peran KEDUA. Setiap
               blok lain di halaman ini menaruh analisis data di depan —
               typewriter di sampul, baris 01 di Tentang, dan card "Analisis
               Data" yang merentang dua kolom tepat di atas blok ini. Satu blok
               yang membuka dengan kemampuan peran lain membantah hierarki yang
               sudah ditegakkan empat kali, dan yang dibaca lebih dulu selalu
               terbaca sebagai yang paling diunggulkan.

               TIGA YANG PERTAMA SEKARANG SATU KELUARGA, dan itu bukan
               kebetulan: analisis, komunikasi, dan perhatian pada detail
               ketiganya syarat yang benar-benar ditulis di lowongan analis
               data. Dua yang terakhir — adaptabilitas dan koordinasi tim —
               berlaku untuk pekerjaan apa pun, jadi tempatnya memang di
               belakang. Pembacanya karena itu mendapat yang paling menentukan
               lebih dulu, bukan yang paling umum.

               LETAK ITU JUGA YANG DIBACA GRID-nya. Tiga card pertama duduk di
               baris atas (merentang dua kolom), dua terakhir di baris bawah
               (merentang tiga) — lihat .skill-grid di src/styles/skills.css.
               Jadi "tiga yang pertama" bukan sekadar urutan baca melainkan
               satu baris utuh yang terpisah secara visual dari dua di
               bawahnya. Di >=1024px kelimanya sebaris dan pembagian itu larut,
               tapi urutan bacanya tetap.

               DUA HAL YANG POSISIONAL DAN TIDAK IKUT PINDAH BERSAMA CARD-nya
               — ini yang paling mudah salah kalau urutannya diubah lagi:

                 data-delay      tetap 0 / 0,04 / 0,08 / 0,12 / 0,16 menurut
                                 urutan DOM. Ia menyatakan giliran masuk, bukan
                                 milik card tertentu. Membawanya ikut pindah
                                 membuat card kedua masuk lebih dulu daripada
                                 card pertama.
                 aturan CSS      .skill-card:nth-child(n+4) dan :last-child
                                 menghitung POSISI. Yang berpindah ke slot 4
                                 dan 5 otomatis jadi card lebar, tanpa satu
                                 class pun disentuh.

               Yang IKUT pindah bersama card-nya cuma ikon, judul, dan
               keterangannya. Ikon Adaptabilitas tetap arrows-rotate meski
               sekarang berdiri di slot keempat.

               Bahasa awamnya: lima kotak kemampuan ini ditukar urutannya
               supaya yang paling menentukan untuk peran analis data dibaca
               lebih dulu. Isi tiap kotak tidak berubah sama sekali — yang
               berpindah cuma tempatnya, dan giliran munculnya saat di-scroll
               otomatis menyesuaikan urutan barunya.

               ══ ADAPTABILITAS DAN KOORDINASI TIM DITULIS ULANG, 23 Agustus 2026

               Keduanya diminta lebih lengkap: Adaptabilitas kini menyebut
               tindakan menyesuaikan dirinya (bukan cuma kesadarannya) dan
               menjanjikan produktivitas TERJAGA sebelum meningkat; Koordinasi
               Tim kini menyebut dasar pembagian tugasnya dan mekanisme
               komunikasinya, bukan cuma hasilnya.

               TIGA HAL DIRAPIKAN DARI DRAF ASLINYA, dan ketiganya melanggar
               aturan yang sudah berdiri di blok ini:

                 KOMA DI DRAF KOORDINASI TIM DIBUANG. Ia berdiri sebelum
                 "sehingga". Aturan "satu klausa tanpa tanda baca" beberapa
                 paragraf di atas ditegakkan atas permintaan pada hari kartu
                 Perhatian pada Detail dipasang; membiarkan koma di sini
                 membatalkannya untuk seluruh blok, bukan cuma satu kartu.

                 "JOBDESK" DAN "CHECKPOINT" DIGANTI jadi "peran" dan
                 "pengecekan berkala". Halaman ini seluruhnya bahasa
                 Indonesia, dan satu-satunya istilah asing yang dibiarkan
                 berdiri adalah yang memang tidak punya padanan mapan
                 (dashboard di card Analisis Data). Keduanya punya padanan.

                 "MAMPU UNTUK MENYESUAIKAN" dibetulkan. "Mampu" tidak diikuti
                 "untuk"; di sini frasanya dibuang seluruhnya karena
                 "sehingga" sudah menyatakan kemampuannya.

               KATA BERULANG YANG DIPANGKAS: "perubahan dan perkembangan"
               (sepasang kata searti) jadi "perubahan"; "sehingga ... guna ..."
               (dua penanda tujuan bertumpuk) jadi satu "sehingga"; dan
               "sesuai divisi atau jobdesknya ... sesuai target" ("sesuai" dua
               kali) jadi "menurut peran ... sesuai target".

               JUMLAH KATA SAMBUNGNYA DIHITUNG, BUKAN DITAKSIR, dan hasilnya
               jujur saja tidak seindah yang diharapkan (dihitung atas dan,
               serta, atau, sehingga, supaya, lewat, dengan, untuk, guna,
               bahkan, tanpa, lalu, menurut):

                 Adaptabilitas    draf 7  ->  sekarang 5
                 Koordinasi Tim   draf 5  ->  sekarang 5
                 Analisis 3, Komunikasi 2, Perhatian 2

               Jadi Adaptabilitas memang jauh lebih rapat, tapi Koordinasi Tim
               TIDAK berkurang sama sekali — yang dibereskan di sana komanya,
               istilah asingnya, dan "sesuai" yang dipakai dua kali, bukan
               kepadatannya. Keduanya sekarang dua kartu terpadat di blok ini,
               dua sampai tiga kata sambung di atas ketiga tetangganya.

               ITU DITERIMA DENGAN SADAR, sebab keduanya memang diminta
               memuat lebih banyak: Adaptabilitas menanggung kesadaran DAN
               tindakan DAN dua macam hasil; Koordinasi Tim menanggung dasar
               pembagian DAN mekanisme komunikasi DAN dua macam hasil. Isi
               sebanyak itu tidak bisa dibawa dua kata sambung. Kalau suatu
               saat keduanya terasa tersendat dibaca, yang dipangkas ISINYA —
               pilih satu hasil, bukan dua — bukan kata sambungnya, sebab
               memangkas sambungan tanpa memangkas isi cuma menghasilkan
               kalimat yang menumpuk.

               PANJANGNYA NAIK, DAN KEDUANYA SEKARANG YANG TERPANJANG:
               Adaptabilitas 149 -> 171, Koordinasi Tim 133 -> 178. Keduanya
               kebetulan duduk di slot 4 dan 5, yaitu dua kartu LEBAR di baris
               bawah pada 640-1023px, jadi tambahan huruf itu jatuh di kartu
               yang memang paling banyak ruangnya. Di >=1024px kelimanya
               sebaris dan tinggi barisnya ditentukan yang tertinggi, jadi blok
               ini ikut sedikit lebih tinggi — itu konsekuensi yang diterima,
               bukan cacat.

               ══ "KETELITIAN" JADI "PERHATIAN PADA DETAIL" pada 22 Agustus 2026

               Yang diganti bukan cuma namanya. "Ketelitian" kata sifat yang
               dibendakan — sebuah WATAK — sementara blok ini seharusnya berisi
               CARA KERJA yang terbawa ke mana pun (pembagiannya dijelaskan di
               komentar daftar bernomor di src/components/About.jsx). Ia juga
               tidak pernah muncul di teks lowongan mana pun, sedangkan syarat
               yang dicari untuk ketiga peran pemiliknya berbunyi "detail
               oriented" atau "perhatian terhadap detail".

               JUDULNYA FRASA BENDA, DAN ITU BUKAN SELERA. Kelima judul di blok
               ini kata benda semua — Komunikasi Teknis, Analisis & Pemecahan
               Masalah, Adaptabilitas, Koordinasi Tim. "Berorientasi Detail",
               terjemahan yang paling harfiah dan paling sering dipakai di
               lowongan, adalah frasa KERJA; memakainya membuat satu judul
               berdiri beda sendiri di antara empat lainnya. "Perhatian pada
               Detail" membawa arti yang sama, sepola dengan tetangganya, dan
               tetap cerminan langsung dari "attention to detail".

               KETERANGANNYA BERPINDAH POROS: DARI MEMERIKSA KE MENJAGA. Yang
               lama berbunyi "Memeriksa data dan dokumen sampai ke rinciannya
               sehingga kekeliruan tertangkap sebelum sampai ke tangan
               berikutnya" — itu kegiatan pemeriksaan di HILIR, terbaca sebagai
               tugas administratif, dan cuma menjelaskan satu dari tiga peran.

               Yang sekarang menyebut sesuatu yang jauh lebih menentukan, dan
               ini alasan pemilihannya: KEKELIRUAN DI PEKERJAAN INI TIDAK
               BERSUARA. Kode yang salah gagal jalan dan melempar galat;
               dashboard yang angkanya salah tampil persis sama bagusnya dengan
               yang benar. Tidak ada kompilator, tidak ada uji yang merah —
               satu-satunya penahannya kebiasaan orangnya sendiri, dan yang
               keluar di ujungnya bukan berkas rusak melainkan keputusan yang
               salah. Itu yang membuat syarat ini selalu ada di lowongan analis
               dan hampir tidak pernah dijelaskan. Di kalimatnya, gagasan itu
               dibawa frasa "yang luput dari perhatian" — kekeliruannya bukan
               yang mencolok, melainkan yang memang tidak terlihat.

               ══ KELIMA KETERANGAN SATU KLAUSA, TANPA TANDA BACA DI DALAMNYA

               Aturan ini baru ditulis di sini karena baru sekarang dilanggar,
               tapi ia sudah berlaku sejak kelimanya ditulis ulang: tidak satu
               pun memakai koma, titik koma, atau tanda pisah. Semuanya
               [kegiatan] + "sehingga"/"supaya" + [hasil], mengalir sampai titik
               di ujung.

               Versi pertama card ini melanggarnya dengan koma sebelum "sebab"
               dan tanda pisah sebelum anak kalimat terakhir. Di kotak selebar
               ini keduanya terlihat: mata membandingkan lima blok teks yang
               berdampingan, dan yang satu tampak lebih tersendat daripada empat
               lainnya. Dibetulkan atas permintaan pada hari yang sama ia
               dipasang.

               Yang dikorbankan untuk memenuhinya: klausa "sebab" tidak bisa
               dipertahankan sebagai kalimat tersendiri, jadi gagasannya
               dimampatkan jadi frasa keterangan yang menempel pada
               "kekeliruan". Artinya sama, jalannya lebih pendek.

               Panjangnya 147 huruf, jadi ia TIDAK merebut rekor terpanjang dari
               Adaptabilitas. Tinggi kotaknya karena itu tidak berubah di lebar
               mana pun.

               Kelimanya dihitung ulang saat ini, apa adanya dari berkas ini
               (termasuk titik di ujung), didaftar menurut urutan tampilnya
               sekarang: Analisis & Pemecahan Masalah 129, Komunikasi Teknis
               102, Perhatian pada Detail 147, Adaptabilitas 171, Koordinasi
               Tim 178. Rentang "99-148" yang ditulis di
               paragraf atas berasal dari hitungan 15 Agustus 2026 dan meleset
               satu sampai tiga huruf dari cara hitung ini — kemungkinan besar
               titik di ujungnya dulu tidak ikut dihitung. Angka lama itu
               dibiarkan berdiri sebagai catatan sejarahnya; yang dipakai kalau
               ada keterangan baru ditambahkan angka di paragraf ini.

               IKONNYA TETAP `list-check`, dan itu keterbatasan yang disadari.
               Daftar bercentang lebih menggambarkan "memeriksa" daripada
               "menjaga sejak awal", tapi dari 14 ikon yang tersedia di
               src/components/Icon.jsx ia yang paling dekat — sisanya sudah
               terpakai atau jelas tidak cocok. Kalau suatu saat ada ikon baru
               ditambahkan, ini card pertama yang layak diperiksa ulang.

               TAG "Ketelitian" DI CARD PENGALAMAN SENGAJA TIDAK IKUT DIGANTI.
               Yang di sana menandai tugas di SATU tempat kerja (Staf
               Administrasi, Dinas Pendidikan Kota Malang) dan diambil apa adanya
               dari CV; yang di sini kemampuan yang terbawa ke mana pun. Kedua
               bagian itu memang menjawab pertanyaan yang berbeda, dan
               menyeragamkan katanya justru mengaburkan pembagian yang sudah
               ditegakkan di About.jsx.

               Bahasa awamnya: lima kotak kemampuan di bawah judul ini sekarang
               menjelaskan bukan cuma APA yang Anda bisa, tapi juga apa gunanya
               bagi tempat kerja. Karena kalimatnya lebih panjang, kotaknya ikut
               lebih tinggi — tapi ikon, judul, dan keterangannya tetap lurus
               sejajar antar kotak. */}
          <div>
            <h3 data-component="scrub-reveal" className="-caption-small mb-8 text-text-muted">Kemampuan Profesional</h3>
            <div className="skill-grid border-t border-l border-line">
              <div data-component="scrub-reveal" data-delay="0" className="skill-card border-r border-b border-line p-4 transition-colors duration-500 ease-brand hover:bg-text/4 sm:p-5">
                <Icon name="magnifying-glass-chart" className="text-text-muted" />
                <span className="-body-small font-medium">Analisis &amp; Pemecahan Masalah</span>
                <p className="-body-smaller text-text-muted">Menelusuri akar masalah dengan menimbang berbagai kemungkinan sehingga bisa memutuskan penyelesaian terbaik dan cara menempuhnya.</p>
              </div>
              <div data-component="scrub-reveal" data-delay="0.04" className="skill-card border-r border-b border-line p-4 transition-colors duration-500 ease-brand hover:bg-text/4 sm:p-5">
                <Icon name="comments" className="text-text-muted" />
                <span className="-body-small font-medium">Komunikasi Teknis</span>
                <p className="-body-smaller text-text-muted">Menjelaskan konsep teknis yang rumit dengan bahasa sederhana beserta analogi yang tepat supaya mudah dipahami oleh anggota tim non-teknis maupun pihak eksternal.</p>
              </div>
              <div data-component="scrub-reveal" data-delay="0.08" className="skill-card border-r border-b border-line p-4 transition-colors duration-500 ease-brand hover:bg-text/4 sm:p-5">
                <Icon name="list-check" className="text-text-muted" />
                <span className="-body-small font-medium">Perhatian pada Detail</span>
                <p className="-body-smaller text-text-muted">Menjaga rincian data dan berkas tetap benar sejak awal pengerjaan supaya kekeliruan yang luput dari perhatian tidak menjadi kesimpulan yang keliru.</p>
              </div>
              <div data-component="scrub-reveal" data-delay="0.12" className="skill-card border-r border-b border-line p-4 transition-colors duration-500 ease-brand hover:bg-text/4 sm:p-5">
                <Icon name="arrows-rotate" className="text-text-muted" />
                <span className="-body-small font-medium">Adaptabilitas</span>
                <p className="-body-smaller text-text-muted">Peka terhadap perubahan lingkungan dan teknologi serta menyesuaikan diri sejak dini sehingga produktivitas dan efisiensi penyelesaian tugas tetap terjaga bahkan meningkat.</p>
              </div>
              <div data-component="scrub-reveal" data-delay="0.16" className="skill-card border-r border-b border-line p-4 transition-colors duration-500 ease-brand hover:bg-text/4 sm:p-5">
                <Icon name="people-group" className="text-text-muted" />
                <span className="-body-small font-medium">Kolaborasi Tim</span>
                <p className="-body-smaller text-text-muted">Bekerja sama dengan anggota tim maupun divisi lain untuk menyelaraskan pemikiran guna meminimalkan miskomunikasi dan mempercepat penyelesaian target bersama.</p>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
               TEKNOLOGI — SATU BARIS TANPA LABEL, sejak 23 Agustus 2026.

               ══ APA YANG DIBATALKAN, DAN KENAPA ITU TIDAK APA-APA

               Sampai hari ini bagian ini punya DUA baris berlabel, "Bahasa
               Pemrograman" (Python) dan "Bahasa Kueri" (SQL). Pemisahan itu
               dipasang 16 Agustus 2026 dengan alasan yang masih benar sampai
               sekarang: SQL bukan bahasa pemrograman melainkan bahasa kueri —
               ia menyatakan data apa yang diminta, bukan langkah-langkah
               mendapatkannya — dan label yang menyebut JENIS benda tidak boleh
               menaungi benda berjenis lain.

               Yang membuat pemisahan itu bisa dibubarkan bukan alasannya yang
               gugur, melainkan LABELNYA YANG HILANG. Tidak ada lagi label
               baris di sini, jadi tidak ada lagi yang bisa salah menaungi.
               Judul bagian "Teknologi" cukup luas untuk memayungi bahasa
               pemrograman, bahasa kueri, dan pustaka sekaligus — dan itu
               memang batas yang selama ini dipikulnya (lihat blok Perkakas di
               bawah: batasnya APLIKASI lawan BUKAN APLIKASI, dan keempat isi
               di sini bukan aplikasi).

               PEMICU SEBENARNYA MASUKNYA PANDAS DAN MATPLOTLIB. Keduanya
               PUSTAKA, bukan bahasa — jadi di susunan lama mereka menuntut
               label KETIGA ("Pustaka"), dan bagian ini akan berisi tiga label
               untuk empat card. Label yang jumlahnya hampir sebanyak isinya
               berhenti mengelompokkan; ia cuma menambah baris. Membuang
               seluruh label menyelesaikannya tanpa satu pun salah kategori.

               ══ URUTANNYA SQL, PYTHON, PANDAS, MATPLOTLIB — BUKAN ABJAD,
                  MELAINKAN ALUR KERJA

               Sama polanya dengan baris Data di Perkakas ("yang menopang
               berdiri di depan"): SQL mengambil datanya, Python mengolahnya,
               pandas merapikannya di dalam Python, matplotlib menggambarkannya.
               Jadi urutannya mengikuti tujuh langkah yang ditulis di card
               Analisis Data beberapa layar di atas.

               PANDAS DAN MATPLOTLIB SENGAJA TIDAK DIPISAH DARI PYTHON meski
               keduanya pustaka Python, bukan bahasa berdiri sendiri.
               Memisahkannya menuntut label lagi, dan itu persis yang baru saja
               dibubarkan.

               ══ TIDAK ADA .tool-label DI BARIS INI, DAN AKIBATNYA TERUKUR

               Ini satu-satunya baris di seluruh grid yang tidak punya label,
               dan itu mengubah dua hal yang perlu diketahui sebelum menyunting:

                 LEBAR CARD. `.tool-items` di baris berlabel menempati sisa
                 baris setelah label 12rem + garis rambut 2rem + dua celah
                 1rem. Tanpa label ia menempati SELURUH lebar baris, jadi card
                 25% di sini lebih lebar daripada card di Perkakas — 275px
                 lawan 211px.

                 KELURUSAN KOLOM. Card pertama di sini berdiri di tepi kiri
                 baris, sementara card pertama keempat kelompok Perkakas
                 berdiri 256px ke dalam (label 192 + celah 16 + garis rambut 32
                 + celah 16). Keduanya karena itu TIDAK segaris.

               KEDUANYA HANYA BERLAKU DI >=1180px, dan itu terukur — bukan
               dugaan. Di bawah titik henti itu label naik ke atas deretan dan
               `.tool-items` jadi `width: 100%` untuk SEMUA baris, jadi kedua
               bagian punya lebar card DAN titik x yang sama persis. Terukur di
               320, 360, 390, 430, 768, 844, dan 1024px: card Teknologi dan
               card Data sama lebar sampai piksel terakhir, dan keduanya mulai
               dari x yang sama. Jadi seluruh ponsel dan tablet tidak
               terpengaruh sama sekali.

               KEDUANYA DITERIMA DENGAN SADAR, dan alasannya: kelurusan yang
               dijaga repo ini selalu kelurusan ANTAR KELOMPOK DI DALAM SATU
               grid berlabel — supaya garis rambutnya sejajar dan tidak terbaca
               sebagai zigzag. Bagian ini sekarang tidak punya garis rambut
               sama sekali dan berdiri di bawah judulnya sendiri, jadi tidak
               ada yang bisa zigzag. Card yang lebih lebar juga tidak mengubah
               ukuran logonya: tingginya dipatok h-8/nav:h-9, jadi yang
               bertambah cuma jarak antar card dan ruang untuk namanya.

               Kalau suatu saat keduanya ingin disamakan dengan Perkakas,
               jalannya BUKAN mengembalikan label melainkan memberi baris ini
               spacer selebar label + garis rambut + celah. Jangan dikerjakan
               tanpa diminta: yang dipilih hari ini kesederhanaan, bukan
               kelurusan.

               ══ JEDANYA MULAI DARI NOL, EMPAT ANGKA

               0 / 0,03 / 0,06 / 0,09, satu rantai untuk empat card. Perkakas
               di bawah mulai lagi dari 0 — jangan disambung, dua bagian yang
               punya judulnya sendiri dibaca sebagai dua blok terpisah. Label
               yang dulu memakai jeda card pertamanya ikut hilang bersama
               labelnya.

               ══ SATU ANGKA CSS YANG IKUT LONGGAR

               `.tool-label` dipatok 12rem di src/styles/tools-grid.css, dan
               angka itu dihitung untuk "BAHASA PEMROGRAMAN" (18 huruf,
               168,5px) yang baru saja dibuang. Label terpanjang yang tersisa
               sekarang "ADMINISTRASI" (12 huruf, 112,3px), jadi kelonggarannya
               melompat dari 23,5px ke 79,7px. ANGKANYA SENGAJA TIDAK
               DITURUNKAN: menurunkannya menggeser keempat garis rambut
               Perkakas sekaligus, dan itu perubahan tampilan yang tidak
               diminta. Yang diperbarui cuma catatannya di berkas tersebut.

               ══ REACT BELUM DISEBUT, DAN ITU DITUNDA — BUKAN DITOLAK

               Situs ini memang dibangun dengan React, jadi buktinya ada di
               repo, tapi pemiliknya memilih menunggu sampai benar-benar
               menguasainya lebih dulu. Alasannya masuk akal dan layak
               dipertahankan: apa pun yang tertulis di sini akan digali saat
               wawancara, dan teknologi yang dicantumkan tapi tidak bisa
               dijelaskan lebih merugikan daripada yang tidak dicantumkan sama
               sekali. Kalau suatu saat ditambahkan, tanyakan dulu.

               ══ RIWAYAT YANG TIDAK BOLEH HILANG

               Bagian ini pernah berisi delapan entri dalam dua baris —
               Frontend (HTML, CSS, JavaScript, Tailwind CSS) dan Backend (PHP,
               Laravel, Blade, MySQL) — dibuang atas permintaan 14 Agustus 2026
               beserta ketujuh berkas ikonnya. Kalau susunan itu suatu saat
               kembali, alasannya ada di git history commit 6e86f17.

               Bahasa awamnya: bagian Teknologi tadinya punya dua sub-judul
               ("Bahasa Pemrograman" dan "Bahasa Kueri") untuk dua logo saja.
               Sekarang sub-judulnya dibuang dan keempat logonya berbaris
               langsung di bawah judul "Teknologi", urut sesuai alur kerja:
               SQL mengambil data, Python mengolah, pandas merapikan,
               matplotlib menggambarkan.
               ═════════════════════════════════════════════════════════════ */}
          <div>
            <h3 data-component="scrub-reveal" className="-caption-small mb-8 text-text-muted">Teknologi</h3>
            <div className="border-t border-line">

              <div className="tool-row border-b border-line">
                <div className="tool-items">

                  {/* SQL — IKON DATABASE AZURE (judul aslinya di dalam berkas
                       "Icon-databases-130"), dan itu memang pilihan yang
                       tersedia: SQL sebuah standar ISO, bukan produk, jadi
                       tidak ada pemilik merek yang menerbitkan logo resminya.
                       Yang beredar semua milik salah satu vendor atau buatan
                       pihak ketiga. Tabung basis data bertuliskan SQL ini
                       setidaknya menggambarkan bendanya, bukan meminjam merek
                       yang keliru — tapi kalau suatu saat diganti, jangan ambil
                       logo yang jelas-jelas milik satu produk (MySQL, MSSQL)
                       untuk mewakili SQL sebagai bahasa.

                       DINAIKKAN 1,06 karena KOTAKNYA. viewBox-nya "0 0 18 18"
                       tapi tintanya berhenti di y 0,5 sampai 17,5, jadi tinggi
                       tintanya 17 dari 18 satuan alias 94,4% tinggi kotak.
                       18/17 = 1,0588, dibulatkan 1,06. Yang dikoreksi RASIO,
                       jadi satu angka ini benar di kedua ukuran kotak (32px di
                       bawah 900px, 36px di atasnya).

                       IA SEKARANG PALING DEPAN, bukan sendirian di baris
                       keduanya seperti dulu. Alasan lama untuk mengoreksi
                       selisih 1,6px yang kecil itu — ia bertumpuk tepat di
                       bawah Python sehingga mata membandingkannya langsung —
                       sudah tidak berlaku, tapi koreksinya dipertahankan sebab
                       sekarang ia bersebelahan LANGSUNG dengan Python, dan
                       bersebelahan lebih ketat daripada bertumpuk. */}
                  <div data-component="scrub-reveal" data-delay="0" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="tool-icon flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/sql.svg" alt="" loading="lazy" decoding="async" style={{ transform: "scale(1.06)" }} className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">SQL</span>
                  </div>

                  {/* Logo dua warna resminya — biru #366994/#387EB8 dan kuning
                       #FFC331/#FFE052 — dipakai apa adanya. viewBox-nya sudah
                       rapat ("16 16 32 32"), jadi tintanya mengisi penuh kotak
                       dan tidak perlu diskalakan. */}
                  <div data-component="scrub-reveal" data-delay="0.03" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="tool-icon flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/python.svg" alt="" loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">Python</span>
                  </div>

                  {/* PANDAS — LOGOMARK SAJA, TANPA WORDMARK, dan berkasnya
                       varian latar gelap resmi mereka.

                       ══ KENAPA MARK, BUKAN WORDMARK

                       Versi pertama memakai pandas_white.svg, yaitu berkas
                       yang dirujuk HTML pojok kiri atas pandas.pydata.org.
                       Dibatalkan atas permintaan pada hari yang sama, dengan
                       alasan yang benar dan berlaku untuk SELURUH grid ini:
                       wordmark memuat nama merek sebagai gambar, padahal
                       namanya sudah ditulis sebagai teks tepat di bawah
                       logonya. Yang terbaca "pandas pandas".

                       Aturan itu sekarang punya satu pelanggar tersisa,
                       Google Workspace di kelompok Administrasi, dan komentar
                       di src/styles/tools-grid.css memang sudah menganjurkan
                       menggantinya dengan logomark persegi. Anjuran itu jadi
                       lebih kuat setelah hari ini, sebab sekarang ia
                       satu-satunya.

                       Berkas yang dipakai static/img/pandas_mark_white.svg —
                       tidak dirujuk halaman depan, jadi ia ditemukan dengan
                       mencoba nama; keberadaannya diperiksa dari isi
                       berkasnya (SVG sungguhan, bukan halaman 404), bukan dari
                       kode HTTP semata. Itu pelajaran yang sama dengan Data
                       Studio: URL yang menjawab 200 tidak membuktikan apa pun.

                       KENAPA VARIAN PUTIH, BUKAN YANG BERWARNA MEREK. Wordmark
                       biasanya (static/img/pandas.svg) memakai navy #130754,
                       dan di atas #040508 kontrasnya 1,15:1 — LEBIH PARAH
                       daripada DBeaver yang 1,47:1 dan dulu tampil sebagai
                       petak kosong. Aturan "terangkan pada rona aslinya"
                       memang ada untuk kasus itu, tapi di sini tidak perlu
                       dipakai: pandas MENERBITKAN SENDIRI varian latar gelap,
                       persis seperti PostgreSQL yang versi bergaris luar putih
                       di baris Data. Memakai varian resmi selalu lebih baik
                       daripada mengarang turunan sendiri.

                       PUTIHNYA DIPUKUL RATA #d8d8d8, mengikuti aturan baku
                       untuk logo yang aslinya putih atau hitam polos — aturan
                       yang kehilangan pemakainya waktu Stitch dibuang
                       15 Agustus 2026, dan inilah pemakai barunya. #ffffff
                       berkontras 20,38:1, terang mutlak dan jauh di atas
                       seluruh grid; #d8d8d8 turun ke 14,30:1, sama dengan
                       warna teks situs ini.

                       KUNING #ffca00 DAN MERAH MUDA #e70488 TIDAK DISENTUH.
                       Kuningnya 13,30:1, memang terang — tapi itu warna merek
                       apa adanya, dan aturan "jangan jadi yang paling terang"
                       hanya berlaku untuk warna yang KITA pilih sendiri
                       (alasan lengkapnya di card Data Studio). Sama seperti di
                       sana, tintanya juga cuma empat batang tipis, bukan
                       bidang penuh.

                       BERKASNYA DIBERSIHKAN, DAN ISINYA SEPARUH SAMPAH EDITOR.
                       Aslinya 2.581 bita berisi deklarasi XML, blok metadata
                       RDF/Dublin Core, <sodipodi:namedview> lengkap dengan
                       posisi jendela dan tingkat zoom Inkscape penulisnya,
                       plus <defs><style> berisi .cls-1/2/3. Semua dibuang dan
                       kelasnya ditulis ulang sebagai atribut fill; sisanya
                       867 bita, turun 66%.

                       Itu bukan penghematan yang sia-sia: berkas di public/
                       DISALIN APA ADANYA ke dist, komentarnya tidak dibuang
                       saat build (lihat catatan favicon di index.html).

                       Satu jebakan yang perlu diketahui kalau berkasnya suatu
                       saat diunduh ulang: `pagecolor="#ffffff"` dan
                       `bordercolor="#666666"` di dalam <sodipodi:namedview>
                       IKUT TERBACA kalau warna disarikan dengan mencari
                       "#rrggbb" di seluruh berkas — padahal keduanya setelan
                       kanvas editor, bukan tinta. Sempat terbaca begitu waktu
                       varian ini pertama disurvei.

                       ══ WARNANYA: PUTIH DIPUKUL RATA, AKSENNYA TIDAK

                       Kelima batang utamanya #fff di berkas aslinya, jadi
                       dipukul rata #d8d8d8 mengikuti aturan baku logo putih
                       polos — aturan yang kehilangan pemakainya waktu Stitch
                       dibuang 15 Agustus 2026, dan inilah pemakai barunya.
                       20,38:1 turun ke 14,30:1, sama dengan warna teks situs
                       ini.

                       Dua batang aksennya, kuning #ffca00 (13,30:1) dan merah
                       muda #e70488 (4,63:1), TIDAK disentuh — itu warna merek
                       apa adanya, dan aturan "jangan jadi yang paling terang"
                       hanya mengikat warna yang KITA pilih sendiri (alasan
                       lengkapnya di card Data Studio).

                       VERSI BERWARNA MEREK TIDAK BISA DIPAKAI, dan itu sudah
                       diperiksa sebelum varian putih dipilih: pandas_mark.svg
                       memakai navy #130754 untuk kelima batang utamanya, dan
                       di atas #040508 kontrasnya 1,15:1 — LEBIH PARAH daripada
                       DBeaver yang 1,47:1 dan dulu tampil sebagai petak
                       kosong. Aturan "terangkan pada rona aslinya" memang ada
                       untuk kasus itu, tapi tidak perlu dipakai di sini sebab
                       pandas menerbitkan sendiri varian latar gelapnya.
                       Memakai varian resmi selalu lebih baik daripada
                       mengarang turunan sendiri.

                       ══ DINAIKKAN 1,27 KARENA KOTAKNYA

                       Terukur dari koordinat kedelapan rect-nya: viewBox
                       210,21 x 280,43, tinta 138,58 x 220,42 — jadi tintanya
                       mengisi 78,6% tinggi kotak. Dengan object-contain itu
                       28,3px di kotak 36px, sementara ketiga tetangganya ~36px.
                       280,43/220,42 = 1,272, dibulatkan 1,27. Yang dikoreksi
                       RASIO, jadi satu angka ini benar di kedua ukuran kotak.

                       DISAMAKAN TINGGINYA, BUKAN RATA-RATA GEOMETRIKNYA, dan
                       itu memang perlakuan yang benar untuk bentuk TEGAK.
                       Aturan rata-rata geometrik lahir untuk Claude Code yang
                       tintanya melebar 1,6:1; logo tegak di grid ini semuanya
                       disamakan tingginya — SQL (0,75), DBeaver (0,82), Excel
                       (0,97). Tinta ini 0,629, jadi ia keluarga yang sama,
                       cuma paling ramping. */}
                  <div data-component="scrub-reveal" data-delay="0.06" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="tool-icon flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/pandas.svg" alt="" loading="lazy" decoding="async" style={{ transform: "scale(1.27)" }} className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">Pandas</span>
                  </div>

                  {/* MATPLOTLIB — logo resminya, cakram bergaris jari-jari
                       dengan batang berwarna. viewBox "0 0 128 128", tanpa
                       atribut width/height, jadi tidak ada yang perlu dibuang.

                       DINAIKKAN 1,03 karena KOTAKNYA. Terukur getBBox: tinta
                       124 x 124 di dalam viewBox 128 x 128, jadi 96,9% tinggi
                       kotak — tergambar 34,9px di kotak 36px sementara Python
                       di sebelahnya 35,8px. 128/124 = 1,032, dibulatkan 1,03,
                       dan hasilnya 36,0px. Yang dikoreksi RASIO, jadi satu
                       angka ini benar di kedua ukuran kotak sekaligus.

                       Selisih 1,1px itu memang di bawah PostgreSQL (2,9px)
                       dan setara SQL (1,6px) yang tetap dikoreksi karena
                       letaknya bersebelahan langsung. Alasan yang sama berlaku
                       di sini: ia bertetangga dengan Python dan pandas dalam
                       satu baris berisi empat.

                       ══ CAKRAM PUTIHNYA DIBIARKAN, DAN INI PERLU DIKETAHUI

                       Berkasnya membawa cakram latar `fill="#fff"` selebar
                       seluruh logo. Di atas #040508 kontrasnya 20,38:1 —
                       TERTINGGI di seluruh grid, dan tidak seperti kelabu Data
                       Studio (7,72:1) yang cuma garis tipis, ini BIDANG PENUH.
                       Jadi luas piksel terangnya jauh lebih besar daripada
                       logo mana pun di halaman ini.

                       Aturan "jangan jadi yang paling terang" di card DBeaver
                       hanya mengikat warna yang KITA pilih sendiri, dan ini
                       warna berkas resminya apa adanya — jadi secara aturan ia
                       boleh berdiri. Tapi ia dibiarkan karena BELUM DIMINTA
                       diubah, bukan karena sudah dinilai baik.

                       Kalau nanti ia terasa merebut perhatian, ada dua jalan
                       dan keduanya keputusan aset:

                         cakramnya dibuat tembus pandang, sehingga garis
                         jari-jari (#858585/#818181) dan batang berwarnanya
                         berdiri langsung di atas latar halaman; atau

                         putihnya dipukul rata #d8d8d8 seperti pandas di
                         sebelahnya, yang menurunkannya ke 14,30:1 dan
                         menyamakannya dengan warna teks situs ini.

                       Yang pertama lebih sesuai dengan latar segelap ini; yang
                       kedua lebih setia pada bentuk aslinya. Jangan pilih
                       sendiri — tanyakan. */}
                  <div data-component="scrub-reveal" data-delay="0.09" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="tool-icon flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/matplotlib.svg" alt="" loading="lazy" decoding="async" style={{ transform: "scale(1.03)" }} className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">Matplotlib</span>
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

               Isinya sekarang 8-2-2-2, dan SEJAK 22 AGUSTUS 2026 TIAP KELOMPOK
               PUNYA RANTAI JEDANYA SENDIRI — tidak lagi satu rantai panjang
               yang menembus keempatnya. Yang berlaku sekarang:

                 Data          0 -> 0,21   (delapan card)
                 Pengajaran    0 -> 0,03
                 Administrasi  0 -> 0,03
                 AI            0 -> 0,03

               Label tiap kelompok tetap memakai jeda card pertamanya, jadi
               keempat label sekarang berjeda 0.

               INI PERSIS JALAN KELUAR YANG SUDAH DIANJURKAN DI SINI SEBELUMNYA,
               dan masuknya Data Studio yang memicunya. Rantai menyambung sempat
               berakhir di 0,36, ditarik ke 0,33 waktu Stitch dibuang, lalu
               kembali ke 0,36 waktu DBeaver masuk — dan catatan di tempat ini
               sudah menuliskan syaratnya: kalau ada satu card lagi ditambahkan,
               mulai rantai baru per kelompok. Card kesembilan itu Data Studio,
               dan rantai menyambung akan mendorong ujungnya ke 0,42.

               ALASANNYA BUKAN ANGKANYA SEMATA. Card terakhir yang jatuh terlalu
               jauh membuat pembaca sudah melewatinya sebelum ikonnya datang, dan
               di rantai menyambung ongkos itu ditanggung kelompok yang paling
               tidak bersalah: AI cuma berisi dua card, tapi ia menunggu paling
               lama semata karena berdiri paling bawah. Keempat kelompok ini
               punya labelnya sendiri-sendiri dan terbaca sebagai empat blok
               terpisah, jadi tidak ada yang hilang saat rantainya dipotong —
               ini pola yang sama yang sudah dipakai di antara bagian Teknologi
               dan Perkakas.

               MENAMBAH ATAU MENGHAPUS CARD SEKARANG CUMA MENYENTUH KELOMPOKNYA
               SENDIRI, dan itu keuntungan yang ikut terbawa: dulu satu card baru
               di baris Data memaksa seluruh rantai di bawahnya dihitung ulang.

               Bahasa awamnya: logo-logo di bagian ini tidak muncul serentak,
               melainkan menyusul satu per satu dari kiri ke kanan saat
               di-scroll. Sekarang tiap kelompok memulai giliran itu dari nol
               lagi, jadi kelompok yang isinya sedikit tidak perlu ikut menunggu
               antrean kelompok di atasnya. */}
          <div>
            <h3 data-component="scrub-reveal" className="-caption-small mb-8 text-text-muted">Perkakas</h3>
            <div className="border-t border-line">

              {/* Urutannya ditentukan pemiliknya, dan alurnya alat kerja dulu
                   baru penyajinya: Excel dan PostgreSQL tempat datanya tinggal,
                   DBeaver yang membukanya, VS Code dan Anaconda tempat
                   mengolahnya, lalu Data Studio, Power BI, dan Tableau yang
                   menyajikannya. Pola yang sama dipakai baris lain di grid ini
                   — yang menopang berdiri di depan.

                   DELAPAN CARD sejak 22 Agustus 2026, dan ini baris terpanjang
                   di seluruh grid — jumlah itu yang mengikat angka pembagi di
                   `.tool-items` pada src/styles/tools-grid.css.

                   DELAPAN JUSTRU LEBIH RAPI DARIPADA TUJUH, dan itu perlu
                   ditulis supaya tidak dikira kebetulan yang beruntung. Yang
                   dijaga di baris ini sejak dulu bukan jumlah barisnya melainkan
                   pecahnya yang RATA dan SAMA di semua lebar. Pada card 25%,
                   delapan pecah 4+4 — dua baris penuh, tidak ada card yang
                   menggantung sendiri di baris kedua, dan tidak ada ruang kosong
                   di ujung kanan. Tujuh dulu pecah 4+3, pembagian paling rata
                   yang mungkin untuk bilangan ganjil, tapi baris keduanya tetap
                   berhenti satu card lebih pendek daripada baris pertamanya.

                   Jadi masuknya card ini TIDAK menyentuh satu angka pun di CSS.
                   Pembagi 25% tetap, `.tool-label` 12rem tetap, `.tool-icon`
                   7,5rem tetap.

                   SATU BARIS DI DESKTOP MEMANG TIDAK MUNGKIN, dan itu terukur
                   sejak baris ini berisi tujuh. Isi baris ini tidak pernah lebih
                   dari 844px (lihat hitungannya di komentar `.tool-items > *`),
                   jadi delapan card menuntut lebar <= 105,5px. Nama terpanjang
                   di seluruh grid, "Google Workspace", selebar 108,1px pada 12px
                   Inter dan card-nya ber-padding 8px di tiap sisi — jadi card di
                   bawah 124,1px memecah nama itu jadi dua baris. Kedua syarat
                   itu tidak bisa dipenuhi bersamaan, dan selisihnya sekarang
                   18,6px — jauh lebih lebar daripada 3,5px waktu card-nya tujuh,
                   jadi pintunya tertutup lebih rapat, bukan terbuka sedikit.

                   `tool-items--four` DILEPAS pada 18 Agustus 2026. Class itu
                   dulu memaksa pecah 4+3 di desktop dengan membatasi lebar blok;
                   sejak lebar card jadi 25% di semua lebar viewport, empat per
                   baris terjadi dengan sendirinya — persis seperti yang selama
                   ini sudah berlaku di bawah 1180px. Aturan CSS-nya ikut
                   dibuang, bukan ditinggalkan menganggur; ceritanya ada di
                   src/styles/tools-grid.css.

                   BARISNYA MENGISI PENUH, dan sejak berisi delapan ia mengisi
                   penuh di KEDUA barisnya. Dulu empat card cuma memakai 544px
                   dari 844px yang tersedia dan menyisakan 300px kosong di kanan;
                   card 25% membuat keempatnya membagi rata seluruh lebar itu.
                   Isinya rata kiri, bukan dipusatkan — alasannya ditulis lengkap
                   di komentar `.tool-items`, beserta riwayat pembalikannya.

                   Bahasa awamnya: baris "Data" sekarang berisi delapan logo, dan
                   di ponsel, tablet, maupun komputer ia tampil dua baris berisi
                   empat — sama rata, tanpa ada yang menggantung sendirian di
                   baris bawah. Sengaja tidak dipaksa muat satu baris di layar
                   komputer, sebab logonya harus dipersempit sampai nama "Google
                   Workspace" di baris lain ikut pecah dua baris. */}
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

                  {/* DATA STUDIO — ditaruh SETELAH Anaconda atas permintaan, dan
                       letak itu kebetulan jatuh persis di sambungan alur baris
                       ini: Anaconda menutup kelompok pengolah, dan ia membuka
                       kelompok penyaji bersama Power BI dan Tableau di
                       sebelahnya. Ketiganya berdiri berurutan, bukan berselang.

                       BERKASNYA ASET RESMI GOOGLE, dan yang dipakai DUA SIMPUL
                       TERHUBUNG — bukan tiga bar bertitik. Dua-duanya berjudul
                       "ic_data_studio.svg" dan dua-duanya masih dilayani server
                       Google; yang membedakan cuma path-nya. Yang benar
                       `analytics-lego`, yaitu yang dirujuk HTML
                       lookerstudio.google.com dan yang tergambar di pojok kiri
                       atas aplikasinya. Yang salah `analytics-suite/header/
                       suite/v2`, lambang generasi sebelumnya, dan ia SEMPAT
                       TERPASANG DI SINI.

                       Pelajarannya, dan ini tambahan baru untuk daftar jebakan
                       logo di README: URL yang menjawab 200 tidak membuktikan
                       asetnya masih dipakai. Ambil dari HTML halaman yang sedang
                       tayang, bukan dari tebakan nama berkas — nama berkas
                       bertahan melewati pergantian logo.

                       Warnanya #4285f4 dan #9aa0a6 apa adanya, tidak perlu
                       ditelusuri ulang dari gambar seperti VS Code dan tidak
                       perlu diterangkan seperti DBeaver. Catatan lengkap soal apa
                       yang dibuang dari berkas aslinya ada di dalam berkas itu
                       sendiri.

                       KONTRASNYA SUDAH DI DALAM RENTANG TANPA DISENTUH, dan itu
                       diperiksa sebelum diputuskan — aturan "terangkan pada rona
                       aslinya" (lihat DBeaver di atas) berlaku kalau kontrasnya
                       jatuh, dan di sini tidak. Di atas #040508: birunya 5,72:1,
                       kelabunya 7,72:1. Terukur di baris yang sama: DBeaver
                       6,91:1, Tableau 6,85:1, Anaconda 6,69:1, Excel 6,30:1,
                       VS Code 4,52:1, PostgreSQL 3,39:1.

                       KELABUNYA MEMANG YANG PALING TERANG DI BARIS INI, meleset
                       0,81 dari DBeaver yang sebelumnya memegangnya, dan itu
                       dibiarkan dengan sadar. Aturan "jangan jadi yang paling
                       terang" ditulis untuk warna yang KITA ubah sendiri —
                       di sana kita memilih angkanya, jadi memilih yang menonjol
                       adalah kelalaian. Ini warna merek apa adanya, dan
                       menurunkannya berarti memalsukan logo demi selisih yang di
                       bawah satu tingkat kontras. Yang lebih menentukan lagi:
                       tintanya garis tipis, bukan bidang penuh, jadi luas piksel
                       terangnya jauh lebih kecil daripada Excel atau Tableau di
                       sebelahnya.

                       DINAIKKAN 1,27, dan sebabnya KOTAKNYA — persoalan yang
                       sama dengan PostgreSQL, Power BI, dan SQL. viewBox-nya
                       "0 0 512 512" tapi tintanya cuma 404x404 di dalamnya
                       (x 54-458, y 54-458), jadi tinggi tintanya 78,9% tinggi
                       kotak. Dengan object-contain itu 25,3px di kotak 32px dan
                       28,4px di kotak 36px — sekitar 21% lebih pendek daripada
                       tetangganya di kedua ukuran.

                       512/404 = 1,2673, dibulatkan ke 1,27, dan hasilnya 32,1px
                       dan 36,1px. Yang dikoreksi RASIO, jadi satu angka ini
                       benar di kedua ukuran kotak sekaligus, sama seperti kelima
                       logo lain yang diskalakan di grid ini.

                       TINTANYA BUJUR SANGKAR PERSIS (404x404, rasio 1,0000) DAN
                       SIMETRIS DI KEDUA SUMBU (sisa 54 satuan di keempat sisi).
                       Dua sifat itu yang membuat kasus ini bersih: menskalakan
                       dari titik tengah tetap menaruhnya di tengah, dan
                       penyamaan tinggi sekaligus menyamakan rata-rata
                       geometriknya — tidak ada perdebatan seperti pada Claude
                       Code, yang tintanya 1,6:1. Ikon lama yang sempat terpasang
                       di sini 1,09:1 dan rata-rata geometriknya meleset 4,7% ke
                       atas; yang ini tepat.

                       Kotak elemennya jadi 45,7px di desktop dan menjulur 4,9px
                       ke tiap sisi; bagian itu transparan, tidak ada
                       `overflow: hidden` di jalur induknya, dan pagar
                       `.tool-icon` di src/styles/tools-grid.css ada di 120px,
                       jadi tidak ikut terpangkas.

                       TERUKUR SESUDAHNYA di sembilan lebar viewport (320, 360,
                       375, 390, 430, 768, 1024, 1180, 1440, 1920), pada build
                       produksi: tinggi tintanya 32,1px di bawah 900px dan 36,1px
                       di atasnya, sementara ketujuh tetangganya di baris ini
                       31,6-32,1px dan 35,5-36,1px. Ia duduk di ujung atas
                       rentang itu, meleset paling jauh 0,6px. Baris ini pecah
                       4+4 di kesembilan lebar, keempat kolomnya lurus di kedua
                       barisnya, dan tidak ada satu lebar pun yang meluber
                       mendatar.

                       NAMANYA PECAH DUA BARIS DI BAWAH 375px, dan itu diukur,
                       bukan ditaksir: dua baris pada 320 dan 360px, satu baris
                       dari 375px ke atas. Di kedua lebar itu ia tidak sendirian
                       — "Google Classroom", "Google Workspace", dan "Claude
                       Code" sudah pecah di sana sejak sebelumnya (ditambah "MS
                       Office" khusus di 320px), jadi tidak ada anomali satu card
                       yang tampak lebih tinggi daripada tetangganya. Kalau suatu
                       saat nama ini mau dipaksa muat, yang disentuh padding card
                       (px-2), bukan pembagi 25% — dan padding itu ikut dihitung
                       di dua tempat lain di src/styles/tools-grid.css.

                       Bahasa awamnya: logo Data Studio dibesarkan seperempat
                       supaya tingginya sama dengan logo di sebelahnya. Tanpa itu
                       ia tampak lebih kecil — bukan karena salah pasang, tapi
                       karena berkas logonya punya ruang kosong bawaan di
                       tepinya. Warnanya tidak disentuh sama sekali.

                       Dan satu catatan supaya tidak terulang: logo yang sempat
                       terpasang di sini tiga bar bertitik, lambang Data Studio
                       yang lama. Ia diunduh dari server resmi Google dengan nama
                       berkas yang benar, jadi tidak ada tanda apa pun bahwa itu
                       keliru — yang menemukannya pemiliknya sendiri, karena ia
                       membuka aplikasinya dan logonya berbeda. */}
                  <div data-component="scrub-reveal" data-delay="0.15" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
                    <span className="flex w-full justify-center text-text">
                      <span className="tool-icon flex h-8 w-full shrink-0 items-center justify-center nav:h-9">
                        <img src="assets/icons/google-data-studio.svg" alt="" loading="lazy" decoding="async" style={{ transform: "scale(1.27)" }} className="max-h-full max-w-full object-contain" />
                      </span>
                    </span>
                    <span className="-body-smaller leading-tight text-text-muted transition-colors duration-500 ease-brand group-hover:text-text">Data Studio</span>
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
                  <div data-component="scrub-reveal" data-delay="0.18" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
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
                  <div data-component="scrub-reveal" data-delay="0.21" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
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
                <h4 data-component="scrub-reveal" data-delay="0" className="-caption-small tool-label text-text-muted">Pengajaran</h4>
                <span data-component="scrub-reveal" data-delay="0" className="h-px w-8 self-center bg-line"></span>

                <div className="tool-items">

                  <div data-component="scrub-reveal" data-delay="0" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
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
                  <div data-component="scrub-reveal" data-delay="0.03" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
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
                <h4 data-component="scrub-reveal" data-delay="0" className="-caption-small tool-label text-text-muted">Administrasi</h4>
                <span data-component="scrub-reveal" data-delay="0" className="h-px w-8 self-center bg-line"></span>

                <div className="tool-items">

                  <div data-component="scrub-reveal" data-delay="0" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
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
                  <div data-component="scrub-reveal" data-delay="0.03" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
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
                <h4 data-component="scrub-reveal" data-delay="0" className="-caption-small tool-label text-text-muted">AI</h4>
                <span data-component="scrub-reveal" data-delay="0" className="h-px w-8 self-center bg-line"></span>

                <div className="tool-items">

                  <div data-component="scrub-reveal" data-delay="0" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
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
                  <div data-component="scrub-reveal" data-delay="0.03" className="group flex flex-col items-center justify-start gap-3 px-2 text-center nav:gap-4">
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
