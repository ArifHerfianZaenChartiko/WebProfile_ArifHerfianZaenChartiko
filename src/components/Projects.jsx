import { useText } from "../i18n/lang.jsx";

/*
 * 04 PROYEK — dipasang 1 Oktober 2026, di antara Keahlian dan Pendidikan.
 *
 * ══ TEKNIS
 *
 * LETAKNYA SESUDAH KEAHLIAN, SEBELUM PENDIDIKAN. Keahlian MENGAKU (SQL,
 * Python, Power BI), bagian ini MEMBUKTIKAN — urutan klaim lalu bukti. Ia
 * juga masih di zona gelap: gradien ke terang milik Education.jsx, jadi
 * bagian ini cukup disisipkan di App.jsx tanpa menyentuh band mana pun.
 *
 * DITULIS SEBAGAI DATA, sama dengan `jobs` di Experience.jsx dan
 * CERTIFICATES di Certificates.jsx. Satu proyek = satu entri di `projects`,
 * di KEDUA bahasa, dengan urutan yang sama; nomor "01 / 04", arah zig-zag,
 * dan rantai jedanya ikut sendiri.
 *
 * URUTANNYA DIMINTA PEMILIKNYA: Olist, web profil, Asistensi Mengajar, Dinas
 * Pendidikan. Analisis data paling depan karena itu peran yang dilamar —
 * hierarki yang sama dengan typewriter Beranda dan card Analisis Data.
 *
 * ISINYA DIAMBIL DARI REPO MASING-MASING, BUKAN DIKARANG. Angka Olist dari
 * README dan insight_report proyek itu; isi dua magang dari laporan akhirnya
 * (Bab III dan Bab IV/V). Saran "tambah tenaga di penyortiran seragam" kutipan
 * langsung dari Bab 4.2 laporan Dinas. Kalau ada angka yang mau diubah, ubah
 * dulu sumbernya.
 *
 * GAMBAR:
 *   Olist        05_dashboard/dashboard_overview.png (2075x1200) dari repo
 *                proyeknya, diperkecil ke 1600x925 (JPEG ~85) — 2 Oktober
 *                2026, setelah grafik "10 Penjual" diganti scatter. Rasionya
 *                sedikit lebih tinggi dari 16:9, jadi object-fit: cover
 *                memotong ~12px atas-bawah; yang terpotong margin putih.
 *   Web profil   tangkapan Beranda situs ini, 1440x810 @1,25
 *   Dua magang   foto kegiatan diambil APA ADANYA dari PDF laporannya —
 *                resolusi aslinya memang cuma 365-687px. Karena itu
 *                ditampilkan sebagai KOLASE tiga petak, bukan satu foto
 *                besar: petak kecil tidak menuntut piksel sebanyak bingkai
 *                penuh, jadi fotonya tidak terlihat pecah.
 *
 * GAMBARNYA <a> YANG aria-hidden DAN tabIndex -1, dan itu disengaja. Tautan
 * yang sama persis sudah ada sebagai teks di bawah judul; kalau gambarnya ikut
 * jadi tab stop, pengguna keyboard menekan Tab dua kali untuk satu tujuan dan
 * pembaca layar mengumumkan tautan yang sama dua kali. Mouse tetap bisa
 * mengekliknya.
 *
 * ANGKA KUNCI KARTU WEB PROFIL = SKOR LIGHTHOUSE, diukur 1 Oktober 2026 pada
 * situs yang tayang (lighthouse@12, tiga kali per mode): desktop Performa
 * 100/100/100, SEO 100, Best Practices 100 di ketiga percobaan. Ponsel 92-94
 * untuk Performa, jadi label Performa SENGAJA menulis "(desktop)" — tanpa
 * itu angkanya menjanjikan lebih dari yang terukur. Aksesibilitas waktu itu
 * 96; dua penyebabnya dibetulkan di hari yang sama (tabpanel di <article>
 * pada Experience.jsx, kontras awal kalimat Tentang di reveals.js), dan
 * ukuran ulang pada build sesudahnya 100 di desktop maupun ponsel — jadi
 * Aksesibilitas menggantikan Best Practices (juga 100) di angka ketiga,
 * sebab bagi perekrut ia yang lebih bermakna. Kalau angkanya mau diganti, UKUR ULANG dulu:
 *   npx lighthouse <url> --preset=desktop
 * Teks "Hasil"-nya menggantikan daftar fitur (320px, keyboard, tanpa JS)
 * yang dianggap pemiliknya kurang berguna bagi perekrut; yang ditulis
 * sekarang guna situsnya dan alur deploy-nya (~30 detik, terukur saat
 * deploy sebelumnya).
 *
 * TAG KARTU WEB PROFIL: React, Vercel, Desain Responsif, Aksesibilitas —
 * urutan dan isinya atas permintaan pemiliknya, 1 Oktober 2026. React
 * sengaja disebut DI SINI sebagai bukti proyek, sementara grid Teknologi di
 * src/components/Skills.jsx tetap belum mencantumkannya (lihat catatan
 * "REACT BELUM DISEBUT" di sana) — kalau suatu saat ditambahkan ke grid,
 * keputusannya tetap ditanyakan dulu. Tag "Dwibahasa EN/ID" dibuang atas
 * permintaan; dwibahasanya sendiri sudah disebut di kalimat Konteks dan
 * angka kunci kartu yang sama.
 *
 * ══ BAHASA AWAMNYA
 *
 * Bagian baru berisi empat proyek, urut dari yang paling relevan untuk
 * lowongan data analyst. Tiap kartu menampilkan gambar, masalah yang
 * dijawab, apa yang dikerjakan, hasilnya, tiga angka ringkas, dan tautan ke
 * GitHub atau laporannya. Untuk menambah proyek, cukup tambah satu entri di
 * daftar di bawah — dalam bahasa Inggris dan Indonesia.
 */
const GH = "https://github.com/ArifHerfianZaenChartiko/";
const OLIST = GH + "Diagnosis-Keterlambatan-Pengiriman-Marketplace-Olist";
const WEB = GH + "WebProfile_ArifHerfianZaenChartiko";
const AM = GH + "Magang_Asistensi-Mengajar_SMKN-3-Malang";
const DINAS = GH + "Magang_Staf-Administrasi_Dinas-Pendidikan-Kota-Malang";
const SITE = "https://webprofile-arifherfianzaenchartiko.vercel.app/";

/* Gambar dan tautan sama di kedua bahasa, jadi ditulis sekali di sini;
   yang berbeda per bahasa cuma teksnya. `pos` = object-position petak itu,
   dipilih supaya orangnya tidak terpotong di petak yang lebih sempit
   daripada fotonya. */
const MEDIA = [
  {
    images: [{ src: "assets/projects/olist-dashboard.jpg", w: 1600, h: 925 }],
    links: [
      { key: "dashboard", href: OLIST + "/blob/main/05_dashboard/olist_ops_dashboard.pdf" },
      { key: "report", href: OLIST + "/blob/main/06_report/insight_report.pdf" },
      { key: "repo", href: OLIST },
    ],
  },
  {
    images: [{ src: "assets/projects/web-profil.jpg", w: 1600, h: 900 }],
    links: [
      { key: "live", href: SITE },
      { key: "repo", href: WEB },
    ],
  },
  {
    images: [
      { src: "assets/projects/asistensi-mengajar-1.jpg", w: 590, h: 453, pos: "50% 50%" },
      { src: "assets/projects/asistensi-mengajar-2.jpg", w: 544, h: 367, pos: "50% 50%" },
      { src: "assets/projects/asistensi-mengajar-3.jpg", w: 365, h: 423, pos: "50% 40%" },
    ],
    links: [
      { key: "report", href: AM + "/blob/main/Laporan%20Akhir%20AM/Laporan%20Akhir%20Asistensi%20Mengajar_210533616009_Arif%20Herfian%20Zaen%20Chartiko.pdf" },
      { key: "repo", href: AM },
    ],
  },
  {
    images: [
      { src: "assets/projects/dinas-pendidikan-1.jpg", w: 687, h: 401, pos: "72% 50%" },
      { src: "assets/projects/dinas-pendidikan-2.jpg", w: 604, h: 688, pos: "50% 30%" },
      /* Gambar 3.7.1 laporan (penggolongan seragam), atas permintaan
         1 Oktober 2026 — menggantikan foto tumpukan seragam (Gambar 3.7.2)
         yang tidak menampilkan orang. Orangnya di 55% lebar foto. */
      { src: "assets/projects/dinas-pendidikan-3.jpg", w: 556, h: 416, pos: "55% 50%" },
    ],
    links: [
      { key: "report", href: DINAS + "/blob/main/Laporan%20Akhir%20Magang/Laporan%20Magang_Arif%20Herfian%20Zaen%20Chartiko_210533616009.pdf" },
      { key: "repo", href: DINAS },
    ],
  },
];

const TEXT = {
  en: {
    label: "Projects",
    title: ["Selected", "Projects"],
    sub: "From data analysis to the classroom: what I worked on, and what came out of it.",
    fields: { context: "Context", work: "What I did", result: "Outcome" },
    linkLabels: { dashboard: "Dashboard", report: "Report", repo: "GitHub", live: "Live site" },
    all: "All repositories on GitHub",
    projects: [
      {
        year: "2026",
        kind: "Data Analysis",
        title: "Diagnosing Delivery Delays at Olist Marketplace",
        context: "Olist’s on-time delivery rate of 91.87% looked healthy. The question was how bad the late orders really were, where the delay came from, and what it cost.",
        work: "Modeled seven raw CSV files in PostgreSQL, audited data quality, answered five business questions in SQL, cross-checked the key figures in Python (pandas) and Excel, and built a Power BI dashboard.",
        result: "The delay sits in courier transit, not with sellers, and bad reviews jump from 19% to 61% between day 3 and day 7 of lateness. Recommended target: never more than 3 days late, starting with courier networks in the North and Northeast.",
        stats: [
          { value: "96,184", label: "orders analyzed" },
          { value: "86%", label: "of the extra delay is in courier transit" },
          { value: "3,435", label: "estimated unhappy customers caused by delays" },
        ],
        tags: ["PostgreSQL", "SQL", "Python", "pandas", "Excel", "Power BI"],
      },
      {
        year: "2026",
        kind: "Web Development",
        title: "Personal Web Profile",
        context: "A paper CV cannot show how I work. I wanted one page that presents my profile, experience, and projects clearly, in English and Indonesian.",
        work: "Designed and built this one-page site: layout, typography, scroll-driven animation, an English/Indonesian switch, and automatic deployment from GitHub to Vercel.",
        result: "A public portfolio that serves as the front door to my job applications: recruiters can see my profile, projects, and certificates through one link, then contact me directly via WhatsApp or email. Every change goes live automatically about 30 seconds after a push to GitHub.",
        stats: [
          { value: "100", label: "Lighthouse Performance (desktop)" },
          { value: "100", label: "Lighthouse Accessibility" },
          { value: "100", label: "Lighthouse SEO" },
        ],
        tags: ["React", "Vercel", "Responsive Design", "Accessibility"],
      },
      {
        year: "2024",
        kind: "Teaching",
        title: "Teaching Assistantship as an Informatics Teacher at SMKN 3 Malang",
        context: "A campus teaching-assistant program (MBKM) at a vocational high school: teaching computer and network engineering (TKJ) classes while supporting the school’s daily operations.",
        work: "Taught Basic Programming and Basic Networking in grade X and Network Services Technology in grade XI, wrote teaching modules and assessments, co-organized the SEMAR, Speak with Confidence, and Future in College programs, and helped with administration, attendance, and admissions (PPDB) screening.",
        result: "Hands-on practice in lesson planning, matching methods to each class, and classroom management. The program also produced a scientific article, a published essay, and a short film.",
        stats: [
          { value: "3", label: "classes taught" },
          { value: "3", label: "subjects" },
          { value: "4", label: "months, Feb–Jun 2024" },
        ],
        tags: ["Lesson Planning", "Classroom Management", "Event Coordination", "School Administration"],
      },
      {
        year: "2024",
        kind: "Administration",
        title: "Industrial Internship as Administrative Staff at Malang City Education Office",
        context: "An industrial-practice internship in the Primary Education (PENDAS) division, which serves elementary and junior high schools across Malang.",
        work: "Logged incoming mail and routing slips in the ledger and in Excel, recorded schools’ curriculum documents for verification, handled outgoing letters and diploma corrections, served BOSDA and NPHD funding submissions, and sorted school uniforms for distribution.",
        result: "First-hand understanding of how a government office coordinates with schools and the public. My report recommended assigning more staff to uniform sorting so distribution runs more efficiently.",
        stats: [
          { value: "6", label: "areas of duty" },
          { value: "2", label: "months, Jun–Aug 2024" },
          { value: "40", label: "hours a week" },
        ],
        tags: ["Digital Administration", "Data Entry", "Public Service", "Attention to Detail"],
      },
    ],
  },
  id: {
    label: "Proyek",
    title: ["Proyek", "Pilihan"],
    sub: "Dari analisis data sampai ruang kelas: apa yang saya kerjakan, dan apa hasilnya.",
    fields: { context: "Konteks", work: "Yang saya kerjakan", result: "Hasil" },
    linkLabels: { dashboard: "Dashboard", report: "Laporan", repo: "GitHub", live: "Situs" },
    all: "Semua repositori di GitHub",
    projects: [
      {
        year: "2026",
        kind: "Analisis Data",
        title: "Diagnosis Keterlambatan Pengiriman Marketplace Olist",
        context: "Tingkat pengiriman tepat waktu Olist 91,87% tampak sehat. Pertanyaannya: seberapa parah sebenarnya pesanan yang telat, dari mana keterlambatannya berasal, dan berapa kerugiannya.",
        work: "Memodelkan tujuh berkas CSV mentah di PostgreSQL, mengaudit kualitas datanya, menjawab lima pertanyaan bisnis dengan SQL, mencocokkan ulang angka-angka utama di Python (pandas) dan Excel, lalu menyusun dashboard Power BI.",
        result: "Keterlambatan ada di transit kurir, bukan di penjual, dan ulasan buruk melonjak dari 19% ke 61% antara hari ke-3 dan ke-7 keterlambatan. Rekomendasinya: target jangan sampai telat lebih dari 3 hari, dimulai dari jaringan kurir wilayah Utara dan Timur Laut.",
        stats: [
          { value: "96.184", label: "pesanan dianalisis" },
          { value: "86%", label: "selisih waktu telat ada di transit kurir" },
          { value: "3.435", label: "perkiraan pelanggan kecewa akibat keterlambatan" },
        ],
        tags: ["PostgreSQL", "SQL", "Python", "pandas", "Excel", "Power BI"],
      },
      {
        year: "2026",
        kind: "Pengembangan Web",
        title: "Web Profil Pribadi",
        context: "CV di atas kertas tidak bisa menunjukkan cara saya bekerja. Saya ingin satu halaman yang menyajikan profil, pengalaman, dan proyek saya dengan jelas, dalam bahasa Inggris dan Indonesia.",
        work: "Merancang dan membangun situs satu halaman ini: tata letak, tipografi, animasi yang mengikuti guliran, tombol bahasa Inggris/Indonesia, dan deploy otomatis dari GitHub ke Vercel.",
        result: "Portofolio publik yang jadi pintu utama lamaran kerja saya: perekrut bisa melihat profil, proyek, dan sertifikat lewat satu tautan, lalu langsung menghubungi saya lewat WhatsApp atau surel. Setiap perubahan tayang otomatis sekitar 30 detik setelah di-push ke GitHub.",
        stats: [
          { value: "100", label: "Lighthouse Performa (desktop)" },
          { value: "100", label: "Lighthouse Aksesibilitas" },
          { value: "100", label: "Lighthouse SEO" },
        ],
        tags: ["React", "Vercel", "Desain Responsif", "Aksesibilitas"],
      },
      {
        year: "2024",
        kind: "Pengajaran",
        title: "Asistensi Mengajar sebagai Guru Informatika di SMKN 3 Malang",
        context: "Program Asistensi Mengajar (MBKM) di sekolah menengah kejuruan: mengajar kelas Teknik Komputer dan Jaringan (TKJ) sambil mendukung operasional harian sekolah.",
        work: "Mengajar Pemrograman Dasar dan Jaringan Dasar di kelas X serta Teknologi Layanan Jaringan di kelas XI, menyusun modul ajar dan penilaian, ikut menyelenggarakan program SEMAR, Speak with Confidence, dan Future in College, serta membantu tata usaha, rekap kehadiran, dan seleksi berkas PPDB.",
        result: "Pengalaman langsung menyusun rencana ajar, memilih metode yang cocok untuk tiap kelas, dan mengelola kelas. Program ini juga menghasilkan artikel ilmiah, esai yang terbit, dan film pendek.",
        stats: [
          { value: "3", label: "kelas diajar" },
          { value: "3", label: "mata pelajaran" },
          { value: "4", label: "bulan, Feb–Jun 2024" },
        ],
        tags: ["Modul Ajar", "Manajemen Kelas", "Koordinasi Acara", "Administrasi Sekolah"],
      },
      {
        year: "2024",
        kind: "Administrasi",
        title: "Magang Industri sebagai Staf Administrasi di Dinas Pendidikan Kota Malang",
        context: "Praktik industri di bidang Pendidikan Dasar (PENDAS), yang melayani SD dan SMP se-Kota Malang.",
        work: "Mencatat surat masuk dan disposisi di buku agenda dan Excel, mendata dokumen kurikulum sekolah untuk diverifikasi, menangani surat keluar dan koreksi ijazah, melayani pengajuan dana BOSDA dan NPHD, serta memilah seragam sekolah untuk dibagikan.",
        result: "Memahami langsung cara instansi pemerintah berkoordinasi dengan sekolah dan masyarakat. Laporan saya menyarankan penambahan tenaga di penyortiran seragam supaya pembagiannya lebih efektif dan efisien.",
        stats: [
          { value: "6", label: "bidang tugas" },
          { value: "2", label: "bulan, Jun–Agu 2024" },
          { value: "40", label: "jam per minggu" },
        ],
        tags: ["Administrasi Digital", "Pendataan", "Pelayanan", "Ketelitian"],
      },
    ],
  },
};

export default function Projects() {
  const t = useText(TEXT);
  const total = "0" + t.projects.length;
  return (
    <section id="proyek" data-component="chapter" className="relative">
      <div data-component="container" className="mx-auto w-full px-gutter max-w-[1180px] py-16 sm:py-20 nav:py-28">

        <div data-component="scrub-reveal" className="mb-6 flex items-center gap-4 sm:mb-7">
          <span className="-mono tabular-nums text-text-muted">04</span>
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

        {/* ZIG-ZAG DI >=1024px (lg), BUKAN >=900px (nav) — dinaikkan 1 Oktober
             2026. Di 900-1023px dua kolom membuat bingkai 16:9 cuma ~224px
             tinggi (terukur di 900x1000), dan detail dashboard Olist tidak
             terbaca. Di rentang itu kartunya sekarang bertumpuk seperti di
             tablet, jadi gambarnya selebar isi halaman. Bahasa awamnya: di
             laptop kecil gambar proyek tampil besar di atas teksnya.

             ZIG-ZAG: gambar kiri pada proyek ganjil, kanan pada
             yang genap. Empat kartu yang semuanya gambar-kiri terbaca seperti
             daftar; yang bergantian memberi mata jalur turun yang berkelok,
             dan tiap kartu terasa satu halaman tersendiri. Di bawah 1024px
             semuanya bertumpuk: gambar dulu, lalu teksnya.

             GAMBARNYA `sticky` di >=1024px. Kolom teks jauh lebih tinggi
             daripada bingkai 16:9, jadi tanpa itu separuh bawah kartu berdiri
             di sebelah ruang kosong; dengan sticky, gambarnya ikut turun
             sampai teksnya habis. */}
        <ol className="flex flex-col">
          {t.projects.map(function (p, i) {
            const media = MEDIA[i];
            const flip = i % 2 === 1;
            const primary = media.links[0];
            return (
              <li key={i} className="border-t border-line py-12 last:border-b sm:py-14 nav:py-20">
                <article className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">

                  <div className={"lg:sticky lg:top-24 lg:self-start" + (flip ? " lg:order-2" : "")}>
                    <a href={primary.href} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true"
                      className="group corner-marks block border border-line p-2 sm:p-3">
                      {media.images.length === 1 ? (
                        <div data-component="image-reveal" className="aspect-video w-full">
                          <div className="bg"></div>
                          <img src={media.images[0].src} width={media.images[0].w} height={media.images[0].h} alt="" loading="lazy" decoding="async"
                            className="media transition-transform duration-700 ease-brand group-hover:scale-[1.03]" />
                        </div>
                      ) : (
                        /* KOLASE: satu petak besar (2/3 lebar, dua baris) dan
                           dua petak kecil bertumpuk. Bingkai luarnya tetap
                           16:9 seperti kartu bergambar tunggal, jadi keempat
                           kartu sama tinggi gambarnya. */
                        <div className="grid aspect-video w-full grid-cols-3 grid-rows-2 gap-1 sm:gap-2">
                          {media.images.map(function (img, k) {
                            return (
                              <div key={img.src} data-component="image-reveal" data-delay={String(k * 0.08)}
                                className={k === 0 ? "col-span-2 row-span-2" : ""}>
                                <div className="bg"></div>
                                <img src={img.src} width={img.w} height={img.h} alt="" loading="lazy" decoding="async"
                                  style={{ objectPosition: img.pos }}
                                  className="media transition-transform duration-700 ease-brand group-hover:scale-[1.05]" />
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </a>
                  </div>

                  <div className="flex flex-col">
                    <div data-component="scrub-reveal" className="mb-6 flex items-baseline justify-between gap-4 border-b border-line pb-5">
                      <span className="-mono tabular-nums text-text-muted">{"0" + (i + 1) + " / " + total}</span>
                      <span className="-caption-small text-right text-text-muted">{p.year + " · " + p.kind}</span>
                    </div>

                    <h3 data-component="scrub-reveal" className="-h2 mb-8">{p.title}</h3>

                    <dl className="mb-10 flex flex-col gap-6">
                      {["context", "work", "result"].map(function (field) {
                        return (
                          <div key={field} data-component="scrub-reveal">
                            <dt className="-caption-small mb-2 text-text-muted">{t.fields[field]}</dt>
                            <dd className={"-body-small " + (field === "result" ? "text-text" : "text-text-muted")}>{p[field]}</dd>
                          </div>
                        );
                      })}
                    </dl>

                    {/* `dt` sebelum `dd` di DOM — urutan yang diwajibkan <dl> —
                         tapi angkanya tampil DI ATAS labelnya lewat
                         flex-col-reverse. Pembaca layar mendengar "pesanan
                         dianalisis: 96.184", mata melihat angkanya dulu.

                         TANPA aria-label. <dl> tidak punya peran ARIA yang
                         boleh diberi nama, jadi label di sini dilarang
                         spesifikasi dan diabaikan pembaca layar; tiap `dt`
                         sudah menamai angkanya sendiri. */}
                    <dl data-component="scrub-reveal" className="mb-10 grid grid-cols-3 border-y border-line">
                      {p.stats.map(function (s, k) {
                        return (
                          <div key={k} className={"flex flex-col-reverse justify-end gap-1 py-4 pr-3 sm:pr-4" + (k > 0 ? " border-l border-line pl-3 sm:pl-4" : "")}>
                            <dt className="-body-smaller text-text-muted">{s.label}</dt>
                            <dd className="-title-3 tabular-nums">{s.value}</dd>
                          </div>
                        );
                      })}
                    </dl>

                    <div data-component="scrub-reveal" className="mb-10 flex flex-wrap gap-2">
                      {p.tags.map(function (tag) {
                        return <span key={tag} className="-caption-small border border-line px-3 py-2 text-text-muted">{tag}</span>;
                      })}
                    </div>

                    <div data-component="scrub-reveal" className="flex flex-wrap gap-x-8 gap-y-4">
                      {media.links.map(function (l) {
                        return (
                          <a key={l.key} href={l.href} target="_blank" rel="noopener noreferrer" className="link-mono text-text-muted hover:text-text">
                            {t.linkLabels[l.key]}<span className="arrow" aria-hidden="true">↗</span>
                          </a>
                        );
                      })}
                    </div>
                  </div>

                </article>
              </li>
            );
          })}
        </ol>

        <div data-component="scrub-reveal" className="mt-12 flex justify-center sm:mt-16">
          <a href={GH} target="_blank" rel="noopener noreferrer" className="link-mono text-text-muted hover:text-text">
            {t.all}<span className="arrow" aria-hidden="true">↗</span>
          </a>
        </div>

      </div>
    </section>
  );
}
