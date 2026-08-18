export default function Hero() {
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
           ═══════════════════════════════════════════════════════════════════════ */}
      <section id="home" data-component="chapter"
        className="relative flex h-svh flex-col justify-center overflow-hidden pt-[clamp(1.25rem,7svh,5.5rem)] pb-[clamp(2.75rem,8svh,6.5rem)]">

        <canvas data-component="ambient-lines" data-density="52" aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"></canvas>

        <div data-component="container"
          className="mx-auto w-full px-gutter max-w-[1500px] relative z-2 flex flex-1 flex-col text-center wide:block wide:flex-none wide:text-left">

          {/* Tumpukan lentur, bukan grid berbaris tetap. Sisa tinggi mengalir ke
               foto (flex-1 di bawah), bukan ke jaraknya — itu yang membuat
               tabrakan mustahil di layar pendek. */}
          <div className="flex min-h-0 flex-1 flex-col gap-[clamp(0.75rem,3.5cqi,2rem)] wide:grid wide:grid-cols-[1.35fr_0.65fr] wide:items-center wide:justify-center wide:gap-[clamp(1.5rem,4cqi,4rem)]">

            {/* BARIS 1 — sapaan dan nama */}
            <div>
              <div data-component="scrub-reveal" data-delay="0.07"
                className="mb-[clamp(0.5rem,2.5cqi,2rem)] flex items-center justify-center gap-3 wide:justify-start">
                <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
                <p className="-caption-small text-text-muted">Halo, perkenalkan saya</p>
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
                 di layar jangkung ia tidak membesar tanpa henti. 87cqi
                 menggantikan 58vw: 87% lebar container x rasio 853/1280 = 58%,
                 jadi batas lebarnya sama, tapi diukur dari kotaknya sendiri. */}
            <div className="flex min-h-0 flex-1 items-center justify-center wide:col-start-2 wide:row-start-1 wide:row-span-2 wide:block wide:flex-none wide:max-w-[min(17rem,30svh)]">
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

                   12px tetap, jadi jaraknya sama di semua device — terukur 13px
                   di sembilan ukuran viewport.

                   ONGKOSNYA SATU PITA TIPIS, dan angkanya jangan ditaksir. Rasio
                   bingkai mengukur kotak LUAR sementara yang harus 853/1280 kotak
                   DALAM, dan padding 12px + garis 1px itu porsi yang lebih besar
                   di bingkai kecil daripada di bingkai besar. Rasio idealnya
                   karena itu bukan satu angka: 0,718 pada bingkai setinggi 168px
                   sampai 0,689 pada 388px. 7/10 duduk di tengah rentang itu, dan
                   pita yang tersisa 0,5-2,3px — terukur di enam ukuran viewport.
                   Di bawah dua setengah piksel, jadi dibiarkan.

                   Kalau suatu saat pita itu harus nol, jalannya BUKAN padding
                   persen (lihat di atas) melainkan mengganti `contain` jadi
                   `cover` di img di bawah — ia memangkas selisihnya alih-alih
                   memberinya pita. Itu tukar yang beda, bukan perbaikan gratis:
                   `contain` dipilih supaya foto pengganti dengan rasio lain tidak
                   terpotong diam-diam. */}
              <div className="corner-marks relative aspect-[7/10] h-full max-h-[min(36svh,87cqi)] max-w-full border border-line p-3 wide:h-auto wide:w-full wide:max-h-none">
                <div data-component="image-reveal" data-delay="0.21" className="h-full w-full">
                  <span className="bg" aria-hidden="true"></span>
                  {/* `object-fit` ditulis SEBARIS, bukan sebagai class:
                       `[data-component=image-reveal] .media` di src/styles/base.css
                       sudah menyetel `cover`, dan ia CSS tak-berlapis -- di luar
                       @layer mana pun -- jadi ia mengalahkan class utilitas apa
                       pun, yang oleh Tailwind ditaruh di dalam layer. Selector-nya
                       juga lebih spesifik. Yang sebaris menang atas keduanya.

                       (Rujukan lamanya `style.css`; file itu sudah tidak ada sejak
                       pindah ke Tailwind sungguhan. Aturannya sendiri tidak
                       berubah, cuma pindah ke src/styles/base.css.)

                       `contain` berarti foto DIPASKAN utuh ke dalam frame, dan
                       sejak rasio pindah ke bingkai (7/10, lihat komentar di
                       atas) ia menyisakan pita 0,5-2,3px di satu sumbu — bukan
                       nol seperti waktu rasionya masih dipasang di sini.
                       `contain` tetap yang dipilih karena ia yang aman kalau
                       suatu saat fotonya diganti dengan rasio lain: yang muncul
                       foto utuh dengan sedikit pita, bukan wajah yang terpotong
                       diam-diam.

                       Sampai 7 Agustus 2026 baris ini memakai `wide:aspect-[4/5]`
                       khusus desktop. Itu yang membuat frame-nya lebih gemuk dari
                       fotonya dan menyisakan 34,6px band gelap di kiri dan kanan
                       SAJA — atas-bawah tetap menempel. Jadi di desktop frame-nya
                       terlihat renggang sebelah, di ponsel dan tablet menempel
                       rapat. Jangan dipatok ulang ke rasio yang berbeda dari
                       file-nya. */}
                  <img src="assets/photo/foto.jpeg" alt="Foto Arif Herfian Zaen Chartiko" className="media" style={{ objectFit: "contain" }} />
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
                  Saya seorang{" "}
                  <span className="font-medium text-text" data-typewriter='["Data Analyst","Pendidik Informatika","Staf Administrasi"]'></span><span className="animate-blink text-accent">_</span>
                </p>
                <p className="-caption-small text-text-muted">Kab. Blitar, Jawa Timur</p>
              </div>

              <div className="mt-[clamp(0.25rem,2cqi,1.5rem)] flex flex-col gap-3 min-[640px]:flex-row min-[640px]:flex-wrap min-[640px]:justify-center min-[640px]:gap-4 wide:justify-start">
                <a href="#kontak" data-component="button"
                  className="group relative inline-flex cursor-pointer items-center justify-center rounded-full border px-8 py-4 transition-colors duration-300 ease-power bg-text text-background border-text w-full min-[640px]:w-auto">
                  <span className="relative block overflow-hidden">
                    <span className="-caption-small flex items-center justify-center gap-2 transition-transform duration-500 ease-brand group-hover:-translate-y-full">Hubungi Saya</span>
                    <span aria-hidden="true" className="-caption-small absolute inset-x-0 top-full flex items-center justify-center gap-2 transition-transform duration-500 ease-brand group-hover:-translate-y-full">Hubungi Saya</span>
                  </span>
                </a>
                <a href="#tentang" data-component="button"
                  className="group relative inline-flex cursor-pointer items-center justify-center rounded-full border px-8 py-4 transition-colors duration-300 ease-power border-line text-text hover:border-text/60 w-full min-[640px]:w-auto">
                  <span className="relative block overflow-hidden">
                    <span className="-caption-small flex items-center justify-center gap-2 transition-transform duration-500 ease-brand group-hover:-translate-y-full">Lihat Profil</span>
                    <span aria-hidden="true" className="-caption-small absolute inset-x-0 top-full flex items-center justify-center gap-2 transition-transform duration-500 ease-brand group-hover:-translate-y-full">Lihat Profil</span>
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
