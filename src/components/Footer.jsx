import { useText } from "../i18n/lang.jsx";

/* ══ TEKNIS — teks penutup dalam dua bahasa. Nama dan kontak tidak
   diterjemahkan, jadi yang berganti hanya label dan band berjalannya.
   ══ BAHASA AWAMNYA — isi bagian paling bawah halaman dalam dua bahasa. */
const TEXT = {
  en: {
    marquee: ["Open to collaboration", "Data Analysis", "Informatics Education"],
    cta: "Let’s work together",
    email: "Email",
    almaMater: "Alma Mater",
    degree: "Bachelor of Informatics Engineering Education",
    location: "Blitar Regency, East Java",
  },
  id: {
    marquee: ["Terbuka untuk kolaborasi", "Analisis Data", "Pendidikan Informatika"],
    cta: "Mari bekerja sama",
    email: "Surel",
    almaMater: "Almamater",
    degree: "S1 Pendidikan Teknik Informatika",
    location: "Kab. Blitar, Jawa Timur",
  },
};

export default function Footer() {
  const t = useText(TEXT);
  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════════
           PENUTUP — satu-satunya bidang yang lebih gelap dari latar dasar. Setelah
           dua bagian terang, turun ke hitam pekat menandai bahwa halaman memang
           berakhir di sini, bukan sekadar bagian berikutnya yang belum termuat.
           ═══════════════════════════════════════════════════════════════════════ */}
      <footer data-component="footer" data-band="void" className="relative overflow-hidden">

        <div data-anim="marquee" data-speed="38" className="relative z-2 border-y border-line py-6">
          <div className="marquee-track">
            <div className="flex shrink-0" data-marquee-copy>
              {t.marquee.map(function (item) {
                return <span key={item} className="-caption flex items-center gap-8 pr-8 text-text-muted">{item}<span aria-hidden="true" className="text-accent">✦</span></span>;
              })}
            </div>
          </div>
        </div>

        {/* PEMBUNGKUS `relative` INI ADA UNTUK MEMBATASI CANVAS DI BAWAH.
             Tanpanya canvas akan mengacu ke <footer>, dan jaringannya ikut
             tergambar di belakang band berjalan di atas — bidang yang sudah
             punya garis pembatas sendiri di atas dan bawah, jadi titik-titik
             yang melintas di sana terbaca sebagai kotoran, bukan latar. */}
        <div className="relative">
          {/* Jaringan simpul yang sama dengan Beranda, kodenya di
               src/lib/animations/ambient.js. Kerapatannya lebih rendah (30 lawan
               52 pada 1440x900) karena bidang ini lebih pendek dan isinya lebih
               padat teks; kerapatan Beranda di sini membuat benangnya beradu
               dengan tiga kolom keterangan.

               `pointer-events-none` WAJIB — surel dan nomor WhatsApp di bawah
               harus tetap bisa diseleksi. */}
          <canvas data-component="ambient-network" data-density="30" aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"></canvas>

          {/* `relative z-2` WAJIB, dan bukan cuma karena canvas di atas.
               `[data-band=void]:after` di src/styles/base.css memasang lapisan
               noise `position: absolute; inset: 0; z-index: 0` di atas footer
               ini. Karena ia pseudo-element terakhir dalam urutan DOM, ia
               tergambar di ATAS anak yang cuma `relative`. Tanpa z-2, seluruh
               isi penutup ini tertutup lapisan noise itu. */}
          <div data-component="container" className="mx-auto w-full px-gutter max-w-[1500px] relative z-2 py-16 nav:py-24">
            <p data-component="scrub-reveal" className="-caption-small mb-8 text-text-muted">{t.cta}</p>

            <p className="-display mb-16" data-line-mask>
              <span data-anim="line-mask" className="last:text-text-muted"><span>Arif Herfian</span></span>
              <span data-anim="line-mask" className="last:text-text-muted"><span>Zaen Chartiko</span></span>
            </p>

            <div className="grid grid-cols-1 gap-10 border-t border-line pt-10 nav:grid-cols-3">
              <div data-component="scrub-reveal">
                <p className="-caption-small mb-4 text-text-muted">{t.email}</p>
                <p className="-body-small">arif.herfian@gmail.com</p>
              </div>
              <div data-component="scrub-reveal">
                <p className="-caption-small mb-4 text-text-muted">WhatsApp</p>
                <p className="-body-small">+62 857-9022-6536</p>
              </div>
              <div data-component="scrub-reveal">
                <p className="-caption-small mb-4 text-text-muted">{t.almaMater}</p>
                <p className="-body-small text-text-muted">{t.degree}<span className="block">Universitas Negeri Malang</span></p>
              </div>
            </div>

            {/* Tanpa tahun. Angka tahun di baris hak cipta menua sendiri — begitu
                 berganti tahun ia langsung menandai situs ini sebagai sesuatu yang
                 sudah lama tidak disentuh. */}
            <div data-component="scrub-reveal" className="mt-16 flex flex-wrap items-baseline justify-between gap-4 border-t border-line pt-8">
              <p className="-caption-small text-text-muted">© Arif Herfian Zaen Chartiko</p>
              <p className="-caption-small text-text-muted">{t.location}</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
