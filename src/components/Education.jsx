export default function Education() {
  return (
    <>
      {/* Jembatan gelap → terang. Batas keras antara hitam dan putih terbaca
           sebagai bug render, jadi perlu peralihan — tapi TIDAK setinggi
           setengah screen seperti dulu (28/40/50vh). Yang dibutuhkan mata cuma
           gradien yang cukup panjang untuk tidak terbaca sebagai garis; sisanya
           jadi ruang kosong yang harus di-scroll. Bersama band kembarnya sebelum
           Kontak, keduanya dulu menyumbang 100vh ruang kosong di desktop.

           Rentangnya juga DIRAPATKAN, bukan cuma dikecilkan: 20/24/28vh, bukan
           20/30/40. Alasannya ada di initStatusBar() — threshold pembalik warna
           bar status satu angka untuk semua lebar, jadi makin jauh jarak
           antar titik henti, makin besar melesetnya di salah satu ujung. */}
      <div aria-hidden="true" className="band-fade-to-panel h-[20vh] sm:h-[24vh] nav:h-[28vh]"></div>


      {/* ══════════════════════════════════════════════════════════════════════════
           04 PENDIDIKAN — titik balik halaman, dari gelap ke terang. Karena itu ia
           mendapat transisi paling mencolok: dua baris judul datang dari arah
           berlawanan lalu bertemu di tengah. Dipakai SEKALI saja di seluruh halaman.
           ═══════════════════════════════════════════════════════════════════════ */}
      <section id="pendidikan" data-band="panel" data-component="chapter">
        <div data-component="container" className="mx-auto w-full px-gutter max-w-[1500px] py-16 sm:py-20 nav:py-28">

          <div className="mb-16 flex items-center gap-4">
            <span className="-mono tabular-nums text-text-muted">04</span>
            <span className="h-px w-12 bg-line"></span>
            <span className="-caption-small text-text-muted">Pendidikan</span>
          </div>

          <div className="mb-20" data-split-words>
            <div className="overflow-hidden pb-[0.2em] mb-[-0.2em] -display leading-[0.95]">
              <div className="top-word will-change-transform -display leading-[0.95]">Riwayat</div>
              <div className="bottom-word will-change-transform -display leading-[0.95]">Pendidikan</div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-16 gap-y-12 border-t border-line pt-14 nav:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
            <div>
              <h3 data-component="scrub-reveal" className="-h2 mb-4">S1 Pendidikan Teknik Informatika</h3>

              <div data-component="scrub-reveal">
                <a href="https://um.ac.id/" target="_blank" rel="noopener noreferrer" className="link-mono mb-9 text-text-muted hover:text-text">
                  Universitas Negeri Malang<span className="arrow" aria-hidden="true">↗</span>
                </a>
              </div>

              <p data-component="scrub-reveal" className="-body mb-10 max-w-2xl text-text-muted">
                Program studi yang memadukan ilmu pendidikan dengan teknologi informatika, berfokus pada kompetensi calon pendidik di bidang pemrograman, jaringan, dan sistem informasi.
              </p>

              <div data-component="scrub-reveal" className="flex flex-wrap gap-2">
                <span className="-caption-small border border-line px-3 py-2 text-text-muted">Pendidikan Teknologi</span>
                <span className="-caption-small border border-line px-3 py-2 text-text-muted">Pemrograman</span>
                <span className="-caption-small border border-line px-3 py-2 text-text-muted">Jaringan Komputer</span>
                <span className="-caption-small border border-line px-3 py-2 text-text-muted">Sistem Informasi</span>
              </div>
            </div>

            {/* ══ BARIS "SERTIFIKAT 6" DIBUANG PADA 27 AGUSTUS 2026

                 Di bawah IPK dulu ada satu baris lagi — label "Sertifikat" dan
                 angkanya di kanan, dipisah garis `border-t`. Angka itu tidak
                 ditulis tangan: ia DIHITUNG dari jumlah `[data-panel]` di bagian
                 Sertifikat oleh buildOdometers() di
                 src/lib/animations/builders.js, lewat attribute
                 `data-odometer-count`. Barisnya dibuang atas permintaan, dan
                 karena ia satu-satunya pemakai attribute itu, cabang
                 penghitungnya ikut dibuang dari builders.js — kode yang tidak
                 lagi menunjuk apa pun cuma menyesatkan pembaca berikutnya.
                 Kalau suatu saat baris ini dikembalikan, keduanya harus
                 dikembalikan bersama.

                 `mb-8` PADA BLOK IPK IKUT DIBUANG. Ia jarak ke garis pemisah
                 baris yang dibuang itu; kalau ditinggal, jarak isi ke tepi bawah
                 kartu jadi 64px sementara ke tepi atas 32px, dan kartunya
                 terlihat berat sebelah. Sekarang keempat sisinya sama-sama 32px
                 dari `p-8`.

                 `self-start` supaya kartunya SETINGGI ISINYA. Item grid
                 meregang penuh setinggi barisnya secara bawaan, dan kolom kiri
                 jauh lebih panjang — dulu itu tidak terasa karena kartunya
                 berisi tiga blok, tapi dengan tinggal dua, yang tersisa kotak
                 bergaris dengan ruang kosong menganga di bawahnya.

                 Terukur: 252,4px kalau meregang lawan 214,5px setinggi isi di
                 1440x900, dan 362,8 lawan 192,8 di 1024x768. Yang paling parah
                 justru tablet mendatar, sebab di sanalah kolom kiri paling
                 jangkung — lebarnya sudah dipepet dua kolom sementara layarnya
                 belum lebar. Di bawah 900px pertanyaannya tidak muncul: grid-nya
                 satu kolom, jadi tiap kartu setinggi isinya sendiri. */}
            <div className="corner-marks self-start border border-line p-8">
              <p className="-caption-small mb-8 text-text-muted">Lulus 2025</p>

              <div>
                <p className="-caption-small mb-2 text-text-muted">IPK</p>
                <div className="flex items-baseline gap-2">
                  <span className="odometer-value -display-stat block shrink-0" data-odometer="3.62"></span>
                  <span className="-caption-small whitespace-nowrap text-text-muted">/ 4.00</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
