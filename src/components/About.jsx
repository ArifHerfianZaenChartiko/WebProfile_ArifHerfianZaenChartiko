export default function About() {
  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════════
           01 TENTANG — transisi paling tenang di seluruh situs, dan itu disengaja:
           isinya paragraf yang memang ingin dibaca, jadi teksnya ditawarkan lebih
           dulu (redup) dan scroll hanya mengatur temponya.
           ═══════════════════════════════════════════════════════════════════════ */}
      <section id="tentang" data-component="chapter" className="relative">
        <div data-component="container"
          className="mx-auto w-full px-4 sm:px-6 nav:px-10 max-w-[1180px] grid grid-cols-1 gap-x-8 gap-y-10 py-16 sm:py-20 nav:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] nav:gap-x-16 nav:gap-y-12 nav:py-28">

          <div>
            <header className="nav:sticky nav:top-28">
              <div data-component="scrub-reveal" className="flex items-center gap-4 mb-7">
                <span className="-mono text-text-muted tabular-nums">01</span>
                <span className="h-px w-12 bg-line"></span>
                <span className="-caption-small text-text-muted">Tentang</span>
              </div>

              <h2 className="-h1" data-line-mask>
                <span data-anim="line-mask" className="last:text-text-muted"><span>Tentang</span></span>
                <span data-anim="line-mask" className="last:text-text-muted"><span>Saya</span></span>
              </h2>

              <p data-component="scrub-reveal" className="-body-small text-text-muted mt-7 max-w-[17rem]">
                Latar belakang dan cara saya bekerja
              </p>
            </header>
          </div>

          <div className="min-w-0 nav:min-h-[62vh]">
            <div className="flex flex-col gap-16">
              {/* ══════════════════════════════════════════════════════════
                   KALIMAT PEMBUKA — TIGA ATURAN, semuanya hasil salah coba.

                   1. JANGAN MENYEBUT NAMA PERANNYA. Ketiganya sudah jadi
                      judul 01/02/03 tepat di bawah ini; mengulangnya di sini
                      cuma memanjangkan tanpa menambah apa pun. Versi yang
                      menyebut ketiganya memenuhi satu layar penuh di desktop
                      — 258 huruf, 10 baris, 420px.

                   2. JANGAN MENGANGKAT SALAH SATU JADI YANG UTAMA. Situs ini
                      dipakai melamar KETIGA peran, bukan satu. Versi yang
                      sempat berbunyi "analisis data inti pekerjaan saya, dua
                      peran lain menopangnya" merugikan lamaran untuk dua peran
                      lainnya: pewawancara membaca halaman yang sama, dan yang
                      terbaca adalah peran yang diakui sendiri sebagai
                      pelengkap. Pelamarnya dicap mencari pelarian, dan itu
                      tidak bisa ditarik kembali di ruang wawancara.

                   3. PENDEK. Ini teks display 40px — tiap huruf mahal di sini,
                      dan yang membaca pertama kali biasanya HR yang memindai,
                      bukan yang menekuni.

                   Ketiganya bertemu di satu bentuk: SATU JATI DIRI yang
                   kebetulan berlaku di tiga bidang, bukan tiga aktivitas yang
                   dideretkan. Tiga peran itu memang satu pekerjaan yang sama
                   kalau dilihat dari cukup jauh — menjadikan sesuatu yang
                   rumit bisa dipakai orang lain — dan ekornya menyebut
                   bidangnya lewat BENDA, bukan lewat nama jabatan:

                     angka       analisis data
                     pelajaran   pendidik informatika
                     berkas      staf administrasi

                   Benda lebih pendek daripada nama jabatan, dan tidak satu pun
                   dari ketiganya bisa terbaca lebih tinggi dari yang lain —
                   dua syarat di atas terpenuhi sekaligus.

                   VERSI SEBELUMNYA DITOLAK KARENA JANGGAL, bukan karena
                   panjang: "Membaca persoalan sampai ke angkanya,
                   menjelaskannya sampai dimengerti, mengerjakannya sampai
                   tuntas." Tiga kata kerja tanpa subjek yang menggantung,
                   tiga akhiran "-nya" beruntun yang rujukannya kabur, dan
                   isinya PROSES — padahal yang dicari pembaca pertama
                   biasanya nilai, bukan langkah kerja.

                   ══ KENAPA text-balance, DAN KENAPA BUKAN text-align: justify

                   Yang membuat blok ini tampak miring sebelah bukan tepi
                   kanannya yang bergerigi, melainkan BARIS TERAKHIR YANG
                   TINGGAL SATU KATA: 124px di samping tiga baris ~550px.

                   justify TIDAK MEMPERBAIKI ITU. Menurut spesifikasi, baris
                   terakhir tidak pernah ikut diregangkan — jadi orphan-nya
                   tetap 124px — sementara tiga baris di atasnya harus menyerap
                   sisa ruang di antara empat kata saja. Terukur di 608px/40px:

                     justify        608, 608, 608, 124px   celah kata 40px
                     text-balance   495, 397, 410, 467px   celah kata 10px
                     biasa          567, 560, 518, 124px   celah kata 10px

                   Celah 40px itu empat kali spasi normal, dan pada teks 40px
                   ia terbaca sebagai sungai putih yang membelah kalimat.
                   Disapu juga: empat panjang kalimat x tiga lebar kolom,
                   celah terbaiknya tetap 3,7x; hyphens:auto tidak mengubah
                   apa pun karena Chrome tidak memuat kamus untuk lang="id".
                   Justify memang butuh baris panjang (60+ huruf) supaya sisa
                   ruangnya terbagi halus, dan teks display 40px di kolom
                   608px cuma memuat sekitar 26 huruf.

                   text-balance menyamakan panjang antar baris, jadi baris
                   terakhir ikut terisi dan selisih terpanjang-terpendek turun
                   dari 443px ke 98px — tanpa satu pun celah kata melebar.
                   Browser lama yang belum mengenalnya jatuh ke pembungkusan
                   biasa, jadi tidak ada yang rusak.
                   ══════════════════════════════════════════════════════════ */}
              <p className="-h2 max-w-[38rem] text-balance" data-word-scrub>Menerjemahkan yang rumit jadi sesuatu yang bisa dipakai, baik itu angka, pelajaran, maupun berkas</p>

              {/* Baris bergaris, bukan card. Tiga card bertumpuk di kolom sempit
                   terbaca sebagai tiga hal setara yang saling bersaing; baris
                   bernomor terbaca sebagai satu daftar yang bisa dipindai.

                   ══════════════════════════════════════════════════════════
                   JANGAN MENYALIN BUTIR DARI BAGIAN PENGALAMAN KE SINI.

                   Pembagiannya: bagian Pengalaman mendaftar TUGAS DI TEMPAT
                   TERTENTU (lengkap dengan nama instansi, tanggal, dan butir
                   apa adanya dari CV). Bagian ini menyebut CARA KERJANYA
                   sebagai kemampuan yang terbawa ke mana pun.

                   Pernah dilanggar 14 Agustus 2026: baris 02 dan 03 diisi
                   ringkasan butir CV, dan hasilnya persis sama dengan card
                   Pengalaman beberapa layar di bawah. Yang terbaca bukan dua
                   sudut pandang melainkan satu isi yang diulang, dan
                   pengulangan membuat keduanya terasa lebih tipis, bukan
                   lebih meyakinkan.

                   Ujinya gampang: kalau satu frasa di sini bisa dipindahkan
                   ke card Pengalaman tanpa terasa aneh, ia salah tempat.

                   ══════════════════════════════════════════════════════════
                   DI DAFTAR INI TIAP PERAN BERDIRI SENDIRI — JANGAN DICAMPUR.

                   Baris 01 hanya bicara analisis data, 02 hanya pengajaran,
                   03 hanya administrasi. Tidak ada satu pun yang meminjam
                   pengalaman tetangganya.

                   BATASNYA DI SINI, BUKAN DI SELURUH BAGIAN. Kalimat pembuka
                   di atas justru bertugas sebaliknya — menyatukan ketiganya
                   sebagai satu cara kerja, tanpa mengangkat satu pun jadi yang
                   utama. Alasan pembagian itu ditulis di komentar kalimat
                   tersebut; jangan menyeragamkan keduanya ke satu arah, sebab
                   keduanya menjawab pertanyaan yang berbeda.

                   Aturan daftar ini dipasang 14 Agustus 2026 atas permintaan,
                   dan ia membalik cara ketiganya ditulis sebelumnya. Dulu tiap
                   baris sengaja disambungkan: 02 ditutup "kebiasaan yang sama
                   terpakai saat memaparkan temuan data", dan 01 ditutup soal
                   menyampaikan hasil kepada pengambil keputusan.

                   Maksudnya waktu itu menunjukkan benang merah — dan benang
                   merah itu memang ada, cuma tempatnya bukan di sini.
                   Ongkosnya: pembaca yang mencari SATU peran, dan perekrut
                   selalu mencari satu, harus memilah mana yang benar-benar
                   pengalaman peran itu dan mana yang pinjaman dari sebelahnya.
                   Tiga keterangan yang bersih lebih mudah dinilai daripada
                   tiga keterangan yang saling menunjuk.
                   ══════════════════════════════════════════════════════════ */}
              <div className="border-t border-line">
                <div data-component="scrub-reveal">
                  <div className="group relative grid grid-cols-1 gap-x-8 gap-y-3 border-b border-line py-8 nav:grid-cols-[3rem_minmax(0,13rem)_minmax(0,1fr)]">
                    <span className="-mono tabular-nums text-text-muted">01</span>
                    <h3 className="-title-3 transition-transform duration-500 ease-brand nav:group-hover:translate-x-1">Data Analyst</h3>
                    <p className="-body-small max-w-xl text-text-muted">Menarik dan merapikan data dengan Python, menyusun serta mengueri basis data PostgreSQL, menyajikannya sebagai dashboard Power BI dan Tableau, menjelaskan arti temuannya, lalu memberi rekomendasi langkah yang bisa diambil.</p>
                    <span aria-hidden="true" className="absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-text transition-transform duration-700 ease-brand group-hover:scale-x-100"></span>
                  </div>
                </div>

                <div data-component="scrub-reveal">
                  <div className="group relative grid grid-cols-1 gap-x-8 gap-y-3 border-b border-line py-8 nav:grid-cols-[3rem_minmax(0,13rem)_minmax(0,1fr)]">
                    <span className="-mono tabular-nums text-text-muted">02</span>
                    <h3 className="-title-3 transition-transform duration-500 ease-brand nav:group-hover:translate-x-1">Pendidik Informatika</h3>
                    <p className="-body-small max-w-xl text-text-muted">Menyusun materi dari nol, menyampaikannya dengan bahasa yang bisa diikuti pemula, mengukur seberapa jauh yang benar-benar dipahami, lalu membenahi cara mengajarnya berdasarkan hasil pengukuran itu.</p>
                    <span aria-hidden="true" className="absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-text transition-transform duration-700 ease-brand group-hover:scale-x-100"></span>
                  </div>
                </div>

                <div data-component="scrub-reveal">
                  <div className="group relative grid grid-cols-1 gap-x-8 gap-y-3 border-b border-line py-8 nav:grid-cols-[3rem_minmax(0,13rem)_minmax(0,1fr)]">
                    <span className="-mono tabular-nums text-text-muted">03</span>
                    <h3 className="-title-3 transition-transform duration-500 ease-brand nav:group-hover:translate-x-1">Staf Administrasi</h3>
                    <p className="-body-small max-w-xl text-text-muted">Menerima dan memeriksa kelengkapan berkas, mencatat lalu mendigitalkannya supaya mudah ditelusuri kembali, menuntaskan tiap permintaan yang masuk, serta menjaga arsip tetap rapi dan tidak ada satu dokumen pun yang tercecer.</p>
                    <span aria-hidden="true" className="absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-text transition-transform duration-700 ease-brand group-hover:scale-x-100"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
