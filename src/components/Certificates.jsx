import Icon from "./Icon.jsx";
import { useLang } from "../i18n/lang.jsx";

/*
 * Daftar sertifikat ditulis sebagai data, bukan tujuh blok markup kembar.
 * Ketujuh panelnya hanya berbeda pada lima nilai ini, dan menyalin markup
 * berarti lima tempat yang bisa lupa diganti. Menambah sertifikat = menambah
 * satu baris di sini, dan tidak ada satu pun angka di bagian lain yang perlu
 * ikut disesuaikan. (Sampai 27 Agustus 2026 ada satu: baris "Sertifikat" di
 * bagian Pendidikan, yang menghitung sendiri jumlah [data-panel] di sini.
 * Barisnya sudah dibuang.)
 *
 * `file` dipakai dua kali: .pdf yang dibuka, dan .jpg preview-nya. Itu
 * sebabnya nama dasar keduanya WAJIB sama di public/assets/certificate/.
 *
 * ══ DUA BAHASA, sejak 1 Oktober 2026
 *
 * `title`, `source`, dan `detail` boleh berupa string ATAU objek { en, id }.
 * String berarti sama di kedua bahasa — nama sertifikat resmi seperti
 * "Python Essentials 1" atau "SQL (Basic)" memang tidak diterjemahkan. Objek
 * hanya dipakai untuk yang memang berbeda, supaya entri yang tidak perlu
 * diterjemahkan tidak dipaksa menulis teks yang sama dua kali.
 *
 * Bahasa awamnya: nama sertifikat yang memang berbahasa Inggris cukup ditulis
 * sekali; yang perlu terjemahan ditulis dua kali, Inggris dan Indonesia.
 */
const CERTIFICATES = [
  /* ══ TEKNIS
   *
   * Masuk 1 Oktober 2026, sengaja di URUTAN PERTAMA — sebelum Python
   * Essentials 1 — atas permintaan: SQL keahlian yang paling dicari untuk
   * peran Data Analyst, dan panel pertama yang terbuka saat galeri tiba.
   *
   * PDF-NYA DIBANGUN ULANG, BUKAN BERKAS ASLI HACKERRANK. Yang asli 7,6 MB —
   * 30 kali tetangganya — sebab isinya satu gambar 1600x1200 yang disimpan
   * TANPA kompresi, ditambah lapisan alfa terpisah untuk sudut membulatnya.
   * Gambar itu diekstrak, ditumpuk di atas putih mengikuti alfanya, lalu
   * disimpan lagi sebagai PDF satu halaman ber-JPEG kualitas 90: 173 KB,
   * resolusi piksel sama persis. Kualitas 85 cuma menghemat 26 KB lagi dan
   * mulai melunakkan tepi tanda tangan, jadi tidak dipakai.
   *
   * Kesahihannya tidak ikut hilang: sertifikat HackerRank diverifikasi lewat
   * ID-nya (38E28687536A) di situs mereka, bukan lewat berkasnya.
   *
   * .jpg 900px-nya (61 KB) diekstrak dari gambar yang sama.
   *
   * ══ BAHASA AWAMNYA
   *
   * Sertifikat SQL dari HackerRank, ditaruh paling kiri di galeri. Berkas
   * PDF-nya dikecilkan dari 7,6 MB jadi 173 KB supaya cepat dibuka di
   * ponsel; isinya tetap sama persis. */
  {
    file: "sql-basic-hackerrank",
    title: "SQL (Basic)",
    source: "HackerRank",
    icon: "database",
    detail: "HackerRank Skill Certification",
  },
  {
    file: "python-essentials-1-cisco",
    title: "Python Essentials 1",
    source: "Cisco",
    icon: "python",
    detail: "Cisco Networking Academy & Python Institute",
  },
  /* ══ TEKNIS
   *
   * PDF-NYA DIKOMPRES 1 OKTOBER 2026, 2,2 MB -> 416 KB, dan BERBEDA CARA
   * dengan SQL (Basic) di atas: yang ini punya LAPISAN TEKS ASLI (nama, nomor,
   * skor — font tertanam, bisa diseleksi dan dicari), jadi ia TIDAK boleh
   * dirender ulang jadi gambar. Yang disentuh hanya ketiga gambar di dalamnya,
   * lewat pikepdf; teks, font, dan tata letaknya tidak berubah satu bita pun.
   *
   *   latar halaman 1123x794 RGB      Flate 457 KB  -> JPEG q85
   *   stempel + tanda tangan RGB      Flate 1,1 MB  -> JPEG q85, 2866 -> 1433px
   *   alfa stempel (SMask) gray       Flate 618 KB  -> Flate,    2866 -> 1433px
   *
   * Lapisan stempel diturunkan separuh karena alfanya yang memakan ukuran, dan
   * alfa itu harus tetap LOSSLESS (JPEG membuat tepi stempel bergerigi).
   * 1433px di atas halaman 842pt masih ~122 dpi, tajam di layar. Tanpa
   * penurunan itu hasilnya 1,03 MB.
   *
   * ══ BAHASA AWAMNYA
   *
   * Berkas sertifikat UKBIng dikecilkan dari 2,2 MB jadi 416 KB. Tulisannya
   * tetap tulisan asli yang bisa disalin; yang dikecilkan hanya gambar latar
   * dan stempelnya, dan tampilannya tidak berubah. */
  {
    file: "ukbing-arif-herfian",
    title: "UKBIng",
    source: { en: "English Proficiency", id: "Bahasa Inggris" },
    icon: "language",
    detail: { en: "Pre-Advanced — Score 444", id: "Pre-Advanced — Skor 444" },
  },
  {
    file: "sertifikat-keorganisasian-wse",
    title: { en: "Service Center Lead", id: "PJ Service Center" },
    source: "WSE",
    icon: "screwdriver-wrench",
    detail: { en: "Hardware & Software Maintenance Coordination", id: "Koordinasi Perawatan Hardware & Software" },
  },
  {
    file: "sertifikat-keorganisasian-wats",
    title: { en: "IoT Speaker", id: "Pemateri IoT" },
    source: "WSE",
    icon: "microchip",
    detail: { en: "Internet of Things Instructor", id: "Instruktur Internet of Things" },
  },
  {
    file: "sertifikat-keorganisasian-lktin",
    title: { en: "LKTIN PESC Committee", id: "Panitia LKTIN PESC" },
    source: "WSE",
    icon: "pen-nib",
    detail: { en: "National Scientific Paper Competition", id: "Lomba Karya Tulis Ilmiah Nasional" },
  },
  {
    file: "sertifikat-keorganisasian-ltdc",
    title: { en: "LTDC Committee", id: "Panitia LTDC" },
    source: "WSE",
    icon: "robot",
    detail: { en: "National Line Tracer Design and Contest", id: "Line Tracer Design and Contest Nasional" },
  },
];

const TEXT = {
  en: {
    label: "Certificates",
    title: "Certificates",
    hintPointer: "Hover to preview, click to open the file.",
    hintTouch: "Scroll to browse, then tap the open panel to view the file.",
    gallery: "Certificate gallery",
    open: "Open",
  },
  id: {
    label: "Sertifikat",
    title: "Sertifikat",
    hintPointer: "Arahkan kursor untuk melihat, klik untuk membuka berkasnya.",
    hintTouch: "Gulir untuk menelusuri, ketuk panel yang terbuka untuk membuka berkasnya.",
    gallery: "Galeri sertifikat",
    open: "Buka",
  },
};

export default function Certificates() {
  const lang = useLang();
  const t = TEXT[lang];
  /* String = sama di kedua bahasa; objek = { en, id }. */
  function pick(v) { return typeof v === "string" ? v : v[lang]; }
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
           ketuk-pertama-memilih diurus di animations.js dengan preventDefault, jadi
           tanpa JavaScript ketujuh link-nya tetap berfungsi apa adanya.

           Preview-nya gambar statis, bukan PDF yang dirender di browser — hasilnya
           sama, tanpa 1,7 MB JavaScript. File PDF aslinya tetap yang dibuka.
           ═══════════════════════════════════════════════════════════════════════ */}
      <section id="sertifikat" data-band="panel" data-component="chapter">
        <div className="mx-auto w-full max-w-[1180px] px-gutter py-16 sm:py-20 nav:py-28">
          <div className="mb-5 flex items-center gap-4">
            <span className="-mono tabular-nums text-text-muted">05</span>
            <span className="h-px w-12 bg-line"></span>
            <span className="-caption-small text-text-muted">{t.label}</span>
          </div>

          <div className="mb-8 flex flex-col gap-4 nav:mb-12 nav:flex-row nav:items-end nav:justify-between">
            <h2 className="-h1" data-line-mask>
              <span data-anim="line-mask"><span>{t.title}</span></span>
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
                {t.hintPointer}
              </span>
              <span className="hint-touch">
                {t.hintTouch}
              </span>
            </p>
          </div>

          {/* role="group", BUKAN role="list" — dan panelnya tanpa role sama
              sekali. Diperbaiki 15 Agustus 2026.

              Dulu container ini role="list" dan tiap <a> diberi role="listitem".
              Role eksplisit MENIMPA peran bawaan, bukan menambahinya, jadi
              keenam <a> berhenti jadi `link` di pohon aksesibilitas — dan
              daftar link yang dipakai pengguna screen reader untuk menjelajah
              (NVDA Insert+F7, rotor VoiceOver) menyusun isinya dari peran itu.
              Keenam sertifikat tidak pernah muncul di sana.

              Membungkus tiap <a> dengan <div role="listitem"> bukan jalan
              keluar di sini: keenamnya anak flex LANGSUNG dari .gallery dan
              flexGrow-nya dianimasikan satu per satu di initAccordionGallery().
              Pembungkus akan memutus rantai flex itu. Semantik daftar toh tidak
              dibutuhkan enam link berjajar; yang perlu cuma namanya, dan
              role="group" mendukung aria-label tanpa menyentuh anak-anaknya.

              Bahasa awamnya: pembaca layar tunanetra punya fitur "tampilkan
              semua tautan di halaman ini". Sertifikat Anda dulu tidak muncul di
              daftar itu sama sekali; sekarang muncul. */}
          <div data-component="gallery" className="gallery" role="group" aria-label={t.gallery}>
            {CERTIFICATES.map(function (s) {
              return (
                <a key={s.file} data-panel className="gallery-panel"
                  href={"assets/certificate/" + s.file + ".pdf"}
                  target="_blank" rel="noopener noreferrer"
                  aria-label={t.open + " " + pick(s.title) + " — " + pick(s.detail)}>
                  <span className="gallery-media" data-panel-media>
                    <img src={"assets/certificate/" + s.file + ".jpg"} alt="" loading="lazy" decoding="async" />
                  </span>
                  {/* Tirai peredup: <span> ber-opacity, BUKAN filter grayscale
                      seperti component aslinya. Alasannya di komentar
                      initAccordionGallery() -- filter dihitung ulang tiap frame,
                      opacity cuma disusun ulang oleh compositor. */}
                  <span className="gallery-veil" data-panel-veil aria-hidden="true"></span>

                  <span className="gallery-label">
                    <Icon name={s.icon} className="gallery-icon" />
                    <span className="gallery-text" data-panel-text>
                      <span className="gallery-title">{pick(s.title)}</span>
                      <span className="gallery-source">{pick(s.source)}</span>
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
