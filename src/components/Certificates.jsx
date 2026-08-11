/*
 * Daftar sertifikat ditulis sebagai data, bukan enam blok markup kembar.
 * Keenam panelnya hanya berbeda pada lima nilai ini, dan menyalin markup
 * berarti lima tempat yang bisa lupa diganti. Menambah sertifikat = menambah
 * satu baris di sini; angka di bagian Pendidikan ikut sendiri karena ia
 * menghitung [data-panel].
 *
 * `file` dipakai dua kali: .pdf yang dibuka, dan .jpg preview-nya. Itu
 * sebabnya nama dasar keduanya WAJIB sama di public/assets/certificate/.
 */
const CERTIFICATES = [
  {
    file: "python-essentials-1-cisco",
    title: "Python Essentials 1",
    source: "Cisco",
    icon: "fa-brands fa-python",
    detail: "Cisco Networking Academy & Python Institute",
  },
  {
    file: "ukbing-arif-herfian",
    title: "UKBIng",
    source: "Bahasa Inggris",
    icon: "fa-solid fa-language",
    detail: "Pre-Advanced — Skor 444",
  },
  {
    file: "sertifikat-keorganisasian-wse",
    title: "PJ Service Center",
    source: "WSE",
    icon: "fa-solid fa-screwdriver-wrench",
    detail: "Koordinasi Perawatan Hardware & Software",
  },
  {
    file: "sertifikat-keorganisasian-wats",
    title: "Pemateri IoT",
    source: "WSE",
    icon: "fa-solid fa-microchip",
    detail: "Instruktur Internet of Things",
  },
  {
    file: "sertifikat-keorganisasian-lktin",
    title: "Panitia LKTIN PESC",
    source: "WSE",
    icon: "fa-solid fa-pen-nib",
    detail: "Lomba Karya Tulis Ilmiah Nasional",
  },
  {
    file: "sertifikat-keorganisasian-ltdc",
    title: "Panitia LTDC",
    source: "WSE",
    icon: "fa-solid fa-robot",
    detail: "Line Tracer Design and Contest Nasional",
  },
];

export default function Certificates() {
  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════════
           05 CERTIFICATES — gallery akordeon. Satu panel terbuka, sisanya menyempit
           jadi bar dan miring menjauh. Yang terbuka mengikuti kursor di
           fine pointer, POSISI SCROLL di perangkat sentuh, dan fokus keyboard
           di keduanya — sebab hover tidak punya padanan di touch screen, dan
           gallery yang cuma bisa ditelusuri dengan mengetuk berulang kali sama
           saja dengan gallery yang tidak bisa ditelusuri.

           Panelnya <a> ke PDF, bukan <div> yang dibuat bisa diklik. Konsekuensinya
           disengaja: ia dapat fokus keyboard, bisa dibuka di tab baru lewat klik
           tengah, dan screen reader mengumumkannya sebagai link. Perilaku
           ketuk-pertama-memilih diurus di animasi.js dengan preventDefault, jadi
           tanpa JavaScript keenam link-nya tetap berfungsi apa adanya.

           Preview-nya gambar statis, bukan PDF yang dirender di browser — hasilnya
           sama, tanpa 1,7 MB JavaScript. File PDF aslinya tetap yang dibuka.
           ═══════════════════════════════════════════════════════════════════════ */}
      <section id="sertifikat" data-band="panel" data-component="chapter">
        <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 nav:px-10 py-16 sm:py-20 nav:py-28">
          <div className="mb-5 flex items-center gap-4">
            <span className="-mono tabular-nums text-text-muted">05</span>
            <span className="h-px w-12 bg-line"></span>
            <span className="-caption-small text-text-muted">Sertifikat</span>
          </div>

          <div className="mb-8 flex flex-col gap-4 nav:mb-12 nav:flex-row nav:items-end nav:justify-between">
            <h2 className="-h1" data-line-mask>
              <span data-anim="line-mask"><span>Sertifikat</span></span>
            </h2>
            {/* Dua kalimat, satu ditampilkan CSS lewat @media (hover: hover),
                bukan satu kalimat kompromi. Cara menelusurinya memang berbeda
                per perangkat: di fine pointer cukup diarahkan, di sentuh
                gulirlah yang memilih. Kalimat sebelumnya berbunyi "ketuk untuk
                membuka file-nya" di keduanya, padahal di sentuh ketukan
                pertama pada panel yang tertutup hanya memilih — petunjuk yang
                menjanjikan sesuatu yang tidak terjadi lebih buruk daripada
                tidak ada petunjuk sama sekali. */}
            <p className="-body-small max-w-[22rem] text-text-muted" data-component="scrub-reveal">
              <span className="hint-pointer">
                Arahkan kursor untuk melihat, klik untuk membuka berkasnya.
              </span>
              <span className="hint-touch">
                Gulir untuk menelusuri, ketuk panel yang terbuka untuk membuka berkasnya.
              </span>
            </p>
          </div>

          <div data-component="gallery" className="gallery" role="list" aria-label="Galeri sertifikat">
            {CERTIFICATES.map(function (s) {
              return (
                <a key={s.file} data-panel role="listitem" className="gallery-panel"
                  href={"assets/certificate/" + s.file + ".pdf"}
                  target="_blank" rel="noopener noreferrer"
                  aria-label={"Buka " + s.title + " — " + s.detail}>
                  <span className="gallery-media" data-panel-media>
                    <img src={"assets/certificate/" + s.file + ".jpg"} alt="" loading="lazy" decoding="async" />
                  </span>
                  {/* Tirai peredup: <span> ber-opacity, BUKAN filter grayscale
                      seperti component aslinya. Alasannya di komentar
                      initAccordionGallery() -- filter dihitung ulang tiap frame,
                      opacity cuma disusun ulang oleh compositor. */}
                  <span className="gallery-veil" data-panel-veil aria-hidden="true"></span>

                  <span className="gallery-label">
                    <i className={s.icon + " gallery-icon"} aria-hidden="true"></i>
                    <span className="gallery-text" data-panel-text>
                      <span className="gallery-title">{s.title}</span>
                      <span className="gallery-source">{s.source}</span>
                    </span>
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
