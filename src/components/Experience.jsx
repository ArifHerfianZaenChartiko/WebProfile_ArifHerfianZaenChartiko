import { useText } from "../i18n/lang.jsx";

/*
 * ══ TEKNIS
 *
 * Kedua pengalaman ditulis sebagai data, sama dengan CERTIFICATES di
 * Certificates.jsx. Dua <article> kembar yang hanya berbeda isi, dikali dua
 * bahasa, berarti empat blok yang harus dijaga tetap sebangun; sebagai data
 * cuma satu blok markup.
 *
 * `id` panelnya TIDAK ikut diterjemahkan: initCardSwap() menyambungkan titik
 * selector ke panel lewat id itu (aria-controls), dan id yang berganti per
 * bahasa tidak menambah apa pun selain kemungkinan sambungannya putus.
 *
 * NAMA INSTANSI: SMKN 3 Malang dibiarkan apa adanya — itu nama resmi sekolah,
 * dan tidak ada padanan Inggris yang dipakai sekolahnya sendiri. Dinas
 * Pendidikan Kota Malang diterjemahkan jadi "Malang City Education Office",
 * sebab pembaca Inggris tidak bisa menebak dari "Dinas" bahwa itu instansi
 * pemerintah; tautannya tetap ke situs resminya.
 *
 * "Disposisi" diterjemahkan "routing slips", BUKAN "dispositions": dalam
 * bahasa Inggris kata itu berarti putusan atau watak, bukan lembar instruksi
 * pimpinan yang menyertai surat. BOSDA dan NPHD dibiarkan sebagai singkatan —
 * keduanya nama program, dan perekrut yang mengenalnya mencari singkatan itu.
 *
 * ══ BAHASA AWAMNYA
 *
 * Isi kartu Pengalaman dalam dua bahasa.
 */
const TEXT = {
  en: {
    marquee: ["Data Analyst", "Informatics Educator", "Universitas Negeri Malang"],
    label: "Experience",
    title: ["Work", "Experience"],
    sub: "The roles I have held so far",
    tablist: "Choose a work experience",
    jobs: [
      {
        period: "February – June 2024",
        title: "Informatics Teacher",
        place: "SMKN 3 Malang",
        href: "https://smkn3malang.sch.id/",
        tags: ["Basic Programming", "Basic Networking", "Network Services", "Student Management"],
        points: [
          "Taught basic programming, basic networking, and network services technology (TLJ)",
          "Supervised and evaluated students to make sure they truly understood the material and completed their final projects on schedule and on target",
          "Planned, organized, and coordinated the SEMAR (“Seminar Marketing”) work program",
          "Digitized school archives and supported the school’s day-to-day operations",
        ],
      },
      {
        period: "June – August 2024",
        title: "Administrative Staff",
        place: "Malang City Education Office",
        href: "https://dikbud.malangkota.go.id/",
        tags: ["Digital Administration", "Data Entry", "Public Service", "Attention to Detail"],
        points: [
          "Recorded, managed, and handled the distribution of school uniforms and curriculum textbooks",
          "Digitized and logged routing slips, incoming mail, and outgoing mail",
          "Handled requests to correct errors on students’ diplomas",
          "Recorded and processed BOSDA and NPHD funding applications",
        ],
      },
    ],
  },
  id: {
    marquee: ["Data Analyst", "Pendidik Informatika", "Universitas Negeri Malang"],
    label: "Pengalaman",
    title: ["Pengalaman", "Kerja"],
    sub: "Riwayat pekerjaan yang pernah saya jalani",
    tablist: "Pilih pengalaman kerja",
    jobs: [
      {
        period: "Februari – Juni 2024",
        title: "Guru Informatika",
        place: "SMKN 3 Malang",
        href: "https://smkn3malang.sch.id/",
        tags: ["Pemrograman Dasar", "Jaringan Dasar", "TLJ", "Manajemen Siswa"],
        points: [
          "Mengajar mata pelajaran pemrograman dasar, jaringan dasar, dan teknologi layanan jaringan (TLJ)",
          "Mengawasi, mengevaluasi, serta memastikan pemahaman dan proyek akhir siswa terpenuhi sesuai timeline dan target",
          "Merencanakan, mengadakan, dan mengoordinasi berjalannya program kerja SEMAR “Seminar Marketing”",
          "Mendigitalisasi arsip sekolah dan mendukung kegiatan operasional sekolah",
        ],
      },
      {
        period: "Juni – Agustus 2024",
        title: "Staf Administrasi",
        place: "Dinas Pendidikan Kota Malang",
        href: "https://dikbud.malangkota.go.id/",
        tags: ["Administrasi Digital", "Pendataan", "Pelayanan", "Ketelitian"],
        points: [
          "Mendata, mengelola, dan melayani serah terima seragam sekolah serta buku kurikulum",
          "Mendigitalisasi dan mendata disposisi, surat masuk, dan surat keluar",
          "Melayani koreksi kesalahan penulisan ijazah siswa",
          "Mendata dan melayani pengajuan dana BOSDA dan NPHD",
        ],
      },
    ],
  },
};

export default function Experience() {
  const t = useText(TEXT);
  return (
    <>
      {/* Band berjalan sebagai jeda antar bagian. Salinannya digandakan oleh
           src/lib/animations/builders.js — cukup tulis satu, sisanya diurus di sana. */}
      <div data-anim="marquee" data-speed="30" className="border-y border-line py-5">
        <div className="marquee-track">
          <div className="flex shrink-0" data-marquee-copy>
            {t.marquee.map(function (item) {
              return <span key={item} className="-caption flex items-center gap-8 pr-8 text-text-muted">{item}<span aria-hidden="true" className="text-accent">✦</span></span>;
            })}
          </div>
        </div>
      </div>


      {/* ══════════════════════════════════════════════════════════════════════════
           02 PENGALAMAN — card bertumpuk. Yang terdepan dibaca utuh, yang di
           belakang mengintip di sudut sebagai tanda masih ada lagi. Tiap beberapa
           detik yang depan jatuh turun lalu masuk ke belakang stack.

           TIGA HAL YANG SENGAJA BERBEDA DARI CardSwap ASLINYA:

           1. Card-nya TIDAK berukuran tetap. Aslinya dipatok 500x400 dan isinya
              dipotong; di sini tinggi stack diukur dari card tertinggi
              (initCardSwap di animations.js), jadi tidak ada satu baris pun yang
              terpotong berapa pun panjang rincian pekerjaannya.

           2. Hanya card BELAKANG yang dimiringkan. Aslinya seluruh stack
              di-skew, termasuk yang sedang dibaca. Teks CV yang miring 6 derajat
              melelahkan dibaca dan tidak ada gunanya di sini.

           3. Susunannya dua kolom di >=900px. Card selebar 56rem dengan rincian
              satu kolom penuh menghasilkan baris sekitar 120 karakter — mata
              kehilangan tempat saat berpindah baris. Kiri identitas pekerjaan,
              kanan rinciannya.

           Urutannya KRONOLOGIS (yang paling awal di depan), bukan terbalik
           seperti CV.
           ═══════════════════════════════════════════════════════════════════════ */}
      <section id="pengalaman" data-component="chapter" className="relative">
        <div data-component="container" className="mx-auto w-full px-gutter max-w-[1500px] py-16 sm:py-20 nav:py-28">

          <div data-component="scrub-reveal" className="mb-6 flex items-center gap-4 sm:mb-7">
            <span className="-mono tabular-nums text-text-muted">02</span>
            <span className="h-px w-12 bg-line"></span>
            <span className="-caption-small text-text-muted">{t.label}</span>
          </div>

          <h2 className="-h1 mb-7" data-line-mask>
            <span data-anim="line-mask" className="last:text-text-muted"><span>{t.title[0]}</span></span>
            <span data-anim="line-mask" className="last:text-text-muted"><span>{t.title[1]}</span></span>
          </h2>

          <p data-component="scrub-reveal" className="-body-small mb-12 max-w-md text-text-muted sm:mb-16">
            {t.sub}
          </p>

          <div className="swap mx-auto w-full max-w-[56rem]" data-component="swap">
            <div className="swap-stack" data-swap-stack>

              {/* id + role="tabpanel" ditambahkan 15 Agustus 2026, dan keduanya
                   WAJIB berpasangan dengan titik selector di bawah.

                   Titik itu sudah lama diberi role="tab", tapi tanpa panel yang
                   ditunjuknya — padahal peran `tab` justru didefinisikan sebagai
                   pemilih sebuah `tabpanel`. Akibatnya bukan pelanggaran formal
                   belaka: kartu belakang di-inert DAN aria-hidden, jadi pengguna
                   screen reader menekan titiknya lalu tidak mendengar apa pun.

                   `aria-controls` dan `aria-labelledby` dipasang dari
                   initCardSwap() supaya id-nya cuma ditulis sekali (di sini).
                   Sejak 1 Oktober 2026 kartunya dibuat dari array `jobs` di
                   TEXT, dan id serta role-nya ikut dibuat di map di bawah —
                   menambah pengalaman cukup menambah satu entri di kedua
                   bahasa. Jangan pindahkan id keluar dari map itu: tanpa id,
                   sambungannya diam-diam tidak terpasang.

                   Bahasa awamnya: dua titik kecil di bawah kartu ini sekarang
                   benar-benar tersambung ke kartunya, jadi pembaca layar bisa
                   mengumumkan kartu mana yang barusan terbuka. */}
              {t.jobs.map(function (job, i) {
                return (
                  <article key={i} data-card id={"swap-panel-" + (i + 1)} role="tabpanel" className="swap-card">
                    <div className="swap-body">
                      <div className="swap-left">
                        <div className="mb-8 flex items-baseline justify-between gap-4 border-b border-line pb-5">
                          <span className="-mono tabular-nums text-text-muted">{"0" + (i + 1) + " / 0" + t.jobs.length}</span>
                          <span className="-caption-small text-text-muted">{job.period}</span>
                        </div>
                        <h3 className="-h2 mb-3">{job.title}</h3>
                        <a href={job.href} target="_blank" rel="noopener noreferrer" className="link-mono text-text-muted hover:text-text">
                          <span data-letter-hover={job.place}></span><span className="arrow" aria-hidden="true">↗</span>
                        </a>
                        <div className="mt-8 flex flex-wrap gap-2 nav:mt-auto nav:pt-10">
                          {job.tags.map(function (tag) {
                            return <span key={tag} className="-caption-small border border-line px-3 py-2 text-text-muted">{tag}</span>;
                          })}
                        </div>
                      </div>

                      <ul className="swap-details">
                        {job.points.map(function (point) {
                          return <li key={point} className="-body-small flex gap-3 text-text-muted"><span aria-hidden="true" className="h-px w-3 shrink-0 bg-line"></span>{point}</li>;
                        })}
                      </ul>
                    </div>
                  </article>
                );
              })}

            </div>

            {/* Selector dot dibuat di animations.js dari JUMLAH card, bukan
                ditulis tangan di sini: menambah pengalaman berarti menambah satu
                <article>, dan titiknya ikut sendiri. Ia juga yang memberi jalan
                keyboard ke card yang tidak sedang di depan. */}
            <div className="swap-controls" data-swap-controls role="tablist" aria-label={t.tablist}></div>
          </div>

        </div>
      </section>
    </>
  );
}
