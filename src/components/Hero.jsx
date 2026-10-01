import { useText } from "../i18n/lang.jsx";

/*
 * ══ TEKNIS
 *
 * PERAN DI TYPEWRITER INGGRIS MEMBAWA ARTIKELNYA SENDIRI ("a Data Analyst",
 * "an Informatics Educator"), sedangkan kalimat depannya cuma "I'm". Artikel
 * bahasa Inggris ditentukan bunyi awal kata BERIKUTNYA, dan kata itu berganti
 * tiap beberapa detik: "I'm a" yang dipatok akan menghasilkan "I'm a
 * Informatics Educator" — salah tata bahasa yang paling mudah ditangkap
 * perekrut berbahasa Inggris.
 *
 * Yang ketiga "an Administrative Staff Member", bukan "an Administrative
 * Staff". "Staff" kata benda kolektif — sekelompok pegawai, bukan satu orang —
 * jadi "I'm an administrative staff" keliru, sekalipun lazim ditulis di CV.
 * Sebagai JUDUL (kartu Tentang, Pengalaman, deskripsi meta) "Administrative
 * Staff" tetap dipakai, sebab judul tidak membutuhkan artikel.
 *
 * Panjang terpanjangnya: "I'm an Administrative Staff Member", 34 huruf,
 * selawan "Saya seorang Pendidik Informatika" yang 33. Batas pembungkusan di
 * 320px yang dicatat di bawah karena itu tidak bergeser.
 *
 * ══ BAHASA AWAMNYA
 *
 * Teks Beranda dalam dua bahasa. Dalam bahasa Inggris kata "a"/"an" ikut
 * diketik bersama perannya, supaya kalimatnya selalu benar.
 */
const TEXT = {
  en: {
    greeting: "Hello, I'm",
    photoAlt: "Photo of Arif Herfian Zaen Chartiko",
    rolePrefix: "I'm",
    roles: ["a Data Analyst", "an Informatics Educator", "an Administrative Staff Member"],
    location: "Blitar Regency, East Java",
    contact: "Contact Me",
    projects: "View Projects",
  },
  id: {
    greeting: "Halo, perkenalkan saya",
    photoAlt: "Foto Arif Herfian Zaen Chartiko",
    rolePrefix: "Saya seorang",
    roles: ["Data Analyst", "Pendidik Informatika", "Staf Administrasi"],
    location: "Kab. Blitar, Jawa Timur",
    contact: "Hubungi Saya",
    projects: "Lihat Proyek",
  },
};

export default function Hero() {
  const t = useText(TEXT);
  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════════
           BERANDA — intro, bukan salah satu bab, jadi tidak diberi nomor urut.

           Susunannya dipilih dari BENTUK screen, bukan lebarnya: `wide:` hanya
           berlaku di screen mendatar (@custom-variant di src/styles/theme.css), jadi tablet
           potret selebar apa pun tetap bertumpuk.

           ══ TINGGINYA `h-svh`, DAN FOTONYA YANG MENYERAP SISANYA

           Ini yang dibalik pada 18 Agustus 2026. Riwayat lengkapnya ada di
           komentar blok foto di bawah; ringkasnya: tinggi bagian ini dipatok
           tapi ukuran isinya dihitung tanpa melihat patokan itu, sehingga yang
           menyerap selisih adalah JARAK antar blok — dan jarak tidak bisa
           negatif. Terukur di 375x667: judul dan foto bertabrakan (-3px).

           `h-svh`, BUKAN `min-h-svh`. `min-height` boleh tumbuh, jadi ketika isi
           lebih tinggi daripada layar tidak ada satu pun yang terpaksa menyusut
           dan seluruh bagian ikut memanjang. Tinggi yang dipatok memaksa
           flexbox membagi ruang, dan yang mengalah foto — `flex-1 min-h-0` di
           bawah.

           Terukur sesudahnya: foto menempati 31-33,5% tinggi layar di SEMUA
           ukuran tegak (320x568 sampai 768x1024), 35% di ponsel mendatar, dan
           40% di desktop. Tidak ada satu ukuran pun yang meluber.

           Jarak tegaknya `clamp()` yang mengalir, bukan rantai breakpoint. Itu
           yang membuat varian `short:` bisa dibuang seluruhnya — kelima
           pemakaiannya dulu semua di berkas ini dan semuanya soal jarak tegak.

           ══ LANTAI PADDING ATAS 4rem DI LAYAR TEGAK — 1 Oktober 2026

           TEKNIS: tombol ganti bahasa (src/components/LanguageSwitch.jsx)
           `fixed` di pojok kanan atas, 12px dari puncak dan setinggi 38px —
           tepi bawahnya di 50px. Di layar tegak sapaan Beranda berdiri DI
           TENGAH atas, dan lantai lama 1,25rem membuatnya mulai di 7svh: 40px
           pada 320x568, jadi "HALO, PERKENALKAN SAYA" menabrak tombolnya.
           4rem (64px) menyisakan 14px di bawah tombol. Selisihnya diserap
           foto seperti sisa tinggi lainnya, sebab ia satu-satunya yang
           `flex-1`; di 812px ke atas 7svh sudah melewati 4rem, jadi tidak ada
           yang bergeser di sana.

           HANYA `portrait:`. Di layar mendatar sapaan rata kiri dan tombolnya
           di kanan, jadi keduanya tidak pernah bertemu — dan ponsel yang
           diputar (844x390) justru yang paling tidak punya tinggi untuk
           dibagi.

           BAHASA AWAMNYA: di ponsel, tulisan sapaan di atas nama sekarang
           turun sedikit supaya tidak tertutup tombol bahasa.
           ═══════════════════════════════════════════════════════════════════════ */}
      <section id="home" data-component="chapter"
        className="relative flex h-svh flex-col justify-center overflow-hidden pt-[clamp(1.25rem,7svh,5.5rem)] portrait:pt-[clamp(4rem,7svh,5.5rem)] pb-[clamp(2.75rem,8svh,6.5rem)]">

        {/* JARINGAN SIMPUL DI LATAR — titik melayang yang saling tersambung dan
             menanggapi kursor. Kodenya di src/lib/animations/ambient.js.

             `data-density="52"` bukan jumlah simpul mutlak melainkan jumlahnya
             PADA 1440x900; angka sebenarnya diskalakan terhadap luas canvas, jadi
             390x844 dapat 18 dan tidak ikut sesak. Rinciannya di komentar
             initAmbientNetwork().

             `pointer-events-none` WAJIB: canvas ini menutup seluruh bagian
             Beranda, termasuk kedua tombol di bawah. Tanpa itu tombolnya tidak
             bisa diklik sama sekali dan tidak ada satu pun pesan galat yang
             memberi tahu kenapa.

             `relative z-2` di container bawah yang membuat isi Beranda berdiri
             di atas canvas ini. */}
        <canvas data-component="ambient-network" data-density="52" aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"></canvas>

        {/* `min-h-0` DI SINI, DAN TANPA ITU FOTO TIDAK BISA MENYERAP APA PUN.
             Ditambahkan 1 Oktober 2026.

             TEKNIS: kontainer ini item flex di dalam <section>, jadi bawaannya
             `min-height: auto` — ia menolak lebih pendek daripada isinya. Dua
             `min-h-0` di lapisan dalam karena itu tidak pernah berpengaruh:
             begitu ruangnya habis, yang berhenti menyusut bukan foto,
             melainkan kontainer ini, dan isinya meluber dari bawah Beranda.
             Ia lolos selama ini karena setiap ukuran yang pernah diuji masih
             menyisakan ruang; lantai padding 4rem di atas menghabiskan sisa
             itu di 320x568 dan Beranda meluber 7px. Sesudah ini fotonya
             menyusut 159 -> 146px dan luberannya 0 — perilaku yang sudah
             dijanjikan komentar di atas sejak 18 Agustus 2026.

             BAHASA AWAMNYA: di ponsel yang layarnya pendek, foto sekarang
             benar-benar mengecil untuk memberi tempat, bukan mendorong isi
             lain keluar dari layar. */}
        <div data-component="container"
          className="mx-auto w-full px-gutter max-w-[1500px] relative z-2 flex min-h-0 flex-1 flex-col text-center wide:block wide:flex-none wide:text-left">

          {/* Tumpukan lentur, bukan grid berbaris tetap. Sisa tinggi mengalir ke
               foto (flex-1 di bawah), bukan ke jaraknya — itu yang membuat
               tabrakan mustahil di layar pendek. */}
          <div className="flex min-h-0 flex-1 flex-col gap-[clamp(0.75rem,3.5cqi,2rem)] wide:grid wide:grid-cols-[1.35fr_0.65fr] wide:items-center wide:justify-center wide:gap-[clamp(1.5rem,4cqi,4rem)]">

            {/* BARIS 1 — sapaan dan nama */}
            <div>
              <div data-component="scrub-reveal" data-delay="0.07"
                className="mb-[clamp(0.5rem,2.5cqi,2rem)] flex items-center justify-center gap-3 wide:justify-start">
                <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
                <p className="-caption-small text-text-muted">{t.greeting}</p>
              </div>

              <h1 className="-display" data-line-mask data-delay="0.14" data-stagger="0.09">
                <span data-anim="line-mask" className="last:text-text-muted"><span>Arif Herfian</span></span>
                <span data-anim="line-mask" className="last:text-text-muted"><span>Zaen Chartiko</span></span>
              </h1>
            </div>

            {/* BARIS 2 — FOTO, DAN INILAH PENYERAP SISA TINGGINYA.
                 Ini pembalikan yang dikerjakan 18 Agustus 2026. Dulu fotonya
                 dipatok `min(34svh,58vw)` dan diangkat keluar aliran, jadi yang
                 menyerap selisih adalah JARAK antar blok — padahal jarak tidak
                 bisa negatif. Terukur di 375x667: jarak judul ke foto -3px, dan
                 garis pemisah baris ketiga memotong bingkai fotonya.

                 Sekarang ia `flex-1 min-h-0`: sisa tinggi mengalir ke sini, dan
                 kalau tidak ada sisa, fotonya yang menyusut. Angka `min()` yang
                 dulu menentukan ukuran kini cuma LANGIT-LANGIT (max-h), supaya
                 di layar jangkung ia tidak membesar tanpa henti. 68cqi berpasangan
                 dengan 28svh di bawah: 68% lebar container x rasio 7/10 = 47,6%,
                 batas lebar yang diukur dari kotaknya sendiri, bukan dari layar.

                 ══ DIKECILKAN PADA 27 AGUSTUS 2026 — FOTO BUKAN SOROTAN

                 Sebelum hari itu tingginya 36% layar di semua ukuran tegak dan
                 42,9% di desktop maupun ponsel mendatar. Angka kedua itu tidak
                 pernah ditulis siapa pun sebagai keputusan: ia akibat aritmetika
                 yang tersembunyi. Yang dipatok `max-w`, dan tinggi bingkai =
                 lebar / 0,7 — jadi `30svh` lebar diam-diam berarti 42,9svh
                 TINGGI. Sekitar dua per lima layar untuk satu pas foto,
                 sementara nama dan peran berbagi sisanya.

                 Sekarang kedua sumbunya dinyatakan sebagai TINGGI supaya tidak
                 ada lagi angka yang menyamar: 28svh di layar tegak, dan `22svh`
                 lebar di layar mendatar yang berarti 31,4svh tinggi. Terukur
                 sesudahnya: 28,0% di 320x568 sampai 768x1024, dan 31,4% di
                 844x390, 1024x768, 1440x900, serta 1920x1080.

                 12,5rem (200px) itu langit-langit mutlaknya di layar sangat
                 lebar, turun dari 17rem. Tanpa itu, 1920x1080 memberi bingkai
                 selebar 237px semata karena layarnya jangkung.

                 7rem (112px) LANTAINYA, dan ia cuma mengikat pada layar yang
                 tingginya di bawah ±509px — praktis hanya ponsel yang diputar.
                 Tanpa lantai itu, 844x390 memberi bingkai selebar 85,8px:
                 wajahnya jadi seukuran kuku dan bagian itu terbaca seperti ada
                 gambar yang gagal dimuat, bukan seperti pas foto. Terukur pada
                 1024x768 ke atas lantai ini tidak mengubah satu piksel pun. */}
            <div className="flex min-h-0 flex-1 items-center justify-center wide:col-start-2 wide:row-start-1 wide:row-span-2 wide:block wide:flex-none wide:max-w-[min(12.5rem,max(22svh,7rem))]">
              {/* RASIO DIPASANG DI BINGKAI, PADDING-NYA TETAP 12px.

                   Rasio tidak bisa dipasang di elemen dalam lalu bingkainya
                   dibuat memeluk (`w-fit`): lebar shrink-to-fit dihitung dari
                   lebar max-content anaknya, dan anak ber-rasio yang tingginya
                   baru pasti setelah flex selesai melapor lebar asli berkas
                   fotonya. Terukur: bingkai jadi 338px di layar 375px.

                   PADDING PERSEN JUGA SUDAH DICOBA DAN GAGAL, dan sebabnya perlu
                   dicatat supaya tidak diulang: persentase padding dihitung dari
                   lebar CONTAINER, bukan lebar elemennya sendiri. Terukur pada
                   `p-[7%]`: jarak foto ke garis jadi 23,6px di ponsel, 48,4px di
                   tablet, dan 18,9px di desktop — tablet paling parah justru
                   karena barisnya paling lebar. Yang terlihat: fotonya seperti
                   tenggelam di tengah bingkai yang kelewat longgar.

                   12px tetap, jadi jaraknya sama di semua device.

                   ══ PITA-NYA SUDAH NOL SEJAK 27 AGUSTUS 2026

                   Sampai hari itu img di bawah memakai `contain`, dan ongkosnya
                   sepita kosong di satu sumbu: jaraknya jadi 14,1px kiri-kanan
                   lawan 12,0px atas-bawah di 1440x900, dan 12,0 lawan 13,4 di
                   320x568 — terbalik arahnya, karena rasio bingkai mengukur kotak
                   LUAR sementara yang harus 853/1280 kotak DALAM, dan padding
                   12px + garis 1px itu porsi yang lebih besar di bingkai kecil.
                   Rasio idealnya karena itu bukan satu angka melainkan rentang
                   0,689-0,718, dan tidak ada satu nilai `aspect` pun yang bisa
                   menutupnya di semua ukuran. (Catatan lama di sini menyebut
                   pitanya 0,5-2,3px. Angka itu keliru: diukur ulang di sembilan
                   viewport, ia 1,1-4,6px.)

                   Yang menutupnya `cover` — persis jalan keluar yang sudah
                   ditulis di catatan lama ini sebagai satu-satunya yang benar.
                   Foto MENGISI kotak dalam, jadi jaraknya tepat 12px di keempat
                   sisi di setiap ukuran layar, tanpa satu pun angka yang perlu
                   dihitung ulang.

                   ONGKOSNYA: selisih rasio itu sekarang dipangkas, bukan diberi
                   pita — paling banyak 6,4px dari 1280px tinggi berkas (0,5%),
                   terambil rata atas dan bawah. Kalau suatu saat foto diganti
                   dengan rasio yang jauh berbeda, PERIKSA HASILNYA: `cover`
                   memangkas diam-diam, dan yang hilang duluan bagian atas kepala.
                   Rasio berkas sekarang 853/1280 = 0,666, bingkai 0,7. */}
              <div className="corner-marks relative aspect-[7/10] h-full max-h-[min(28svh,68cqi)] max-w-full border border-line p-3 wide:h-auto wide:w-full wide:max-h-none">
                <div data-component="image-reveal" data-delay="0.21" className="h-full w-full">
                  <span className="bg" aria-hidden="true"></span>
                  {/* TIDAK ADA `object-fit` DI SINI, dan itu keputusan, bukan
                       kelupaan. `[data-component=image-reveal] .media` di
                       src/styles/base.css sudah menyetel `cover`, yang sejak
                       27 Agustus 2026 memang yang diinginkan — alasannya di
                       komentar bingkai tepat di atas.

                       Sampai hari itu di baris ini ada `style={{objectFit:
                       "contain"}}` sebaris. Ia harus sebaris karena aturan di
                       base.css itu CSS tak-berlapis — di luar @layer mana pun —
                       sehingga ia mengalahkan class utilitas apa pun, yang oleh
                       Tailwind ditaruh di dalam layer. Kalau suatu saat ada yang
                       perlu mengembalikan `contain`, itu sebabnya `object-contain`
                       sebagai class TIDAK akan bekerja: pakai style sebaris.

                       Sampai 7 Agustus 2026 baris ini memakai `wide:aspect-[4/5]`
                       khusus desktop. Itu yang membuat frame-nya lebih gemuk dari
                       fotonya dan menyisakan 34,6px band gelap di kiri dan kanan
                       SAJA — atas-bawah tetap menempel. Jadi di desktop frame-nya
                       terlihat renggang sebelah, di ponsel dan tablet menempel
                       rapat. Jangan dipatok ulang ke rasio yang berbeda dari
                       file-nya. */}
                  <img src="assets/photo/foto.jpeg" alt={t.photoAlt} className="media" />
                </div>
              </div>
            </div>

            {/* BARIS 3 — peran, lokasi, tombol */}
            <div className="flex flex-col gap-[clamp(0.75rem,3cqi,1.5rem)] border-t border-line pt-[clamp(0.75rem,3cqi,1.5rem)] wide:row-start-2 wide:border-t-0 wide:pt-0">
              <div className="flex flex-col gap-2 min-[640px]:gap-3">
                {/* `{" "}` WAJIB, bukan spasi biasa. JSX membuang whitespace yang
                    mengandung baris baru di antara teks dan elemen, jadi
                    "Saya seorang" + newline + <span> ter-render rapat jadi
                    "Saya seorangData Analyst". Di HTML lama newline itu tetap
                    jadi satu spasi, karena itu cacat ini baru muncul setelah
                    markupnya jadi JSX. Spasi eksplisit lolos dari
                    pembuangan. */}
                {/* "Pendidik Informatika" (20 huruf) KEMBALI jadi yang
                    terpanjang di daftar ini sejak peran utama berganti dari
                    "Fullstack Web Developer" (23) ke "Data Analyst" (12) pada
                    14 Agustus 2026. Barisnya jadi lebih longgar, bukan lebih
                    sesak — jadi tidak ada yang perlu diperiksa ulang kali ini.
                    Kalau nanti ada peran yang lebih panjang dari 20 huruf
                    ditambahkan, periksa screen 320px: di sanalah barisnya
                    pertama kali membungkus. */}
                <p className="-body text-text-muted">
                  {t.rolePrefix}{" "}
                  <span className="font-medium text-text" data-typewriter={JSON.stringify(t.roles)}></span><span className="animate-blink text-accent">_</span>
                </p>
                <p className="-caption-small text-text-muted">{t.location}</p>
              </div>

              <div className="mt-[clamp(0.25rem,2cqi,1.5rem)] flex flex-col gap-3 min-[640px]:flex-row min-[640px]:flex-wrap min-[640px]:justify-center min-[640px]:gap-4 wide:justify-start">
                <a href="#kontak" data-component="button"
                  className="group relative inline-flex cursor-pointer items-center justify-center rounded-full border px-8 py-4 transition-colors duration-300 ease-power bg-text text-background border-text w-full min-[640px]:w-auto">
                  <span className="relative block overflow-hidden">
                    <span className="-caption-small flex items-center justify-center gap-2 transition-transform duration-500 ease-brand group-hover:-translate-y-full">{t.contact}</span>
                    <span aria-hidden="true" className="-caption-small absolute inset-x-0 top-full flex items-center justify-center gap-2 transition-transform duration-500 ease-brand group-hover:-translate-y-full">{t.contact}</span>
                  </span>
                </a>
                {/* "Lihat Profil" (#tentang) JADI "Lihat Proyek" (#proyek) pada
                    1 Oktober 2026.

                    ══ TEKNIS — tombol lama melompat ke Tentang, bagian yang
                    toh langsung tampil begitu halaman digulir sedikit, jadi ia
                    tidak mengantar ke mana pun yang tidak akan ditemukan
                    sendiri. Proyek berdiri tiga bagian lebih jauh, dan itulah
                    yang paling dicari perekrut. DIGANTI, BUKAN DITAMBAH: di
                    bawah 640px tombolnya bertumpuk, dan tombol ketiga memakan
                    sekitar 64px dari tinggi `h-svh` yang diserap foto — foto
                    yang sudah dipatok 28% tinggi layar (lihat README, bagian
                    Beranda).

                    ══ BAHASA AWAMNYA — tombol kedua di halaman pembuka
                    sekarang langsung membawa pengunjung ke daftar proyek. */}
                <a href="#proyek" data-component="button"
                  className="group relative inline-flex cursor-pointer items-center justify-center rounded-full border px-8 py-4 transition-colors duration-300 ease-power border-line text-text hover:border-text/60 w-full min-[640px]:w-auto">
                  <span className="relative block overflow-hidden">
                    <span className="-caption-small flex items-center justify-center gap-2 transition-transform duration-500 ease-brand group-hover:-translate-y-full">{t.projects}</span>
                    <span aria-hidden="true" className="-caption-small absolute inset-x-0 top-full flex items-center justify-center gap-2 transition-transform duration-500 ease-brand group-hover:-translate-y-full">{t.projects}</span>
                  </span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
