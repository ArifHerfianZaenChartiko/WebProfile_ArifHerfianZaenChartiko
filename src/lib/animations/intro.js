/*
 * PEMBUKA — monogram yang tergambar sendiri sebelum situs muncul.
 *
 * ══ TEKNIS
 *
 * Berdiri sendiri karena ia satu-satunya yang MENUNDA pemasangan seluruh animasi
 * lain: parameter `next`-nya baru dipanggil saat panelnya mulai terangkat.
 * Alasannya ada di dalam berkasnya.
 *
 * ══ BAHASA AWAMNYA
 *
 * Layar hitam dengan tanda 'AH' yang tergambar sendiri saat situs dibuka.
 */
import { gsap } from "gsap";
import { $, $$, prefersReducedMotion } from "./dom.js";
import { EASE } from "./tokens.js";

/*
 * PEMBUKA — monogram AH digambar bertahap, lalu situsnya masuk.
 *
 * MEKANISMENYA. Tiap <path> di Intro.jsx digambar dengan trik
 * stroke-dasharray: panjang garisnya diukur getTotalLength(), lalu
 * strokeDasharray DAN strokeDashoffset disetel sebesar panjang itu --
 * garisnya jadi satu strip putus-putus yang seluruhnya digeser keluar,
 * sehingga tidak ada yang terlihat. Menganimasikan offset-nya kembali ke 0
 * menariknya masuk dari pangkal ke ujung, jadi garisnya seolah ditulis.
 *
 * Panjangnya DIUKUR, bukan ditulis tangan, supaya mengubah koordinat di
 * Intro.jsx tidak menuntut angka di file ini ikut diperbarui.
 *
 * KENAPA `lanjut` DIPANGGIL SEBAGAI CALLBACK, BUKAN SETELAH initIntro.
 *
 * Seluruh animasi situs dipasang lewat parameter itu, dan pemasangannya
 * ditunda sampai panelnya mulai terangkat. Alasannya: motion masuk Beranda
 * -- mask judul, clip foto, typewriter -- berjalan begitu dipasang. Kalau
 * dipasang bersamaan dengan intro, semuanya sudah selesai di balik panel
 * dan yang terlihat saat panel naik cuma halaman diam. Ini persis jenis
 * cacat yang tidak akan pernah muncul sebagai error.
 *
 * BEDANYA DENGAN PRELOADER YANG DIBUANG PADA 2 AGUSTUS 2026. Yang itu
 * menahan halaman sampai skripnya jalan. Panel ini sudah tergambar sejak
 * frame pertama lewat CSS biasa, jadi tidak ada yang ditunda; ia hanya
 * menutupi. Ia juga punya batas keras 3 detik (angka itu ada di setTimeout
 * beberapa baris di bawah; komentar ini sempat menulis 3,5 dan itu keliru)
 * dan dilewati sama sekali kalau pengguna minta reduced motion.
 */
export function initIntro(ctx, next) {
  const { cleanups, scrollTo, lenis } = ctx;
  var panel = $('[data-component="intro"]');
  if (!panel) { next(); return; }

  var content = $("[data-intro-inner]", panel);

  /* Batas keras dipasang PALING AWAL, sebelum satu baris pun yang bisa
     melempar. Kalau ada yang gagal di bawah, panelnya tetap terbuka dan
     situs tidak tertutup selamanya. */
  var done = false;
  var forcer = setTimeout(function () { exit(); }, 3000);
  cleanups.push(function () { clearTimeout(forcer); });
  cleanups.push(function () {
    document.documentElement.classList.remove("intro-active");
  });

  /* StrictMode memasang ulang efek ini pada node DOM yang SAMA, jadi
     panelnya bisa mewarisi display:none dan opacity 0 dari putaran
     sebelumnya. Dikembalikan dulu ke keadaan berangkat. */
  gsap.set([panel, content], { clearProps: "all" });
  panel.style.display = "";

  function reset() {
    panel.style.display = "none";
    document.documentElement.classList.remove("intro-active");
    if (lenis) lenis.start();
  }

  function exit() {
    if (done) return;
    done = true;
    clearTimeout(forcer);

    if (prefersReducedMotion()) { next(); reset(); return; }

    /*
     * ANGKA 0,45 ITU HASIL UKUR, BUKAN SELERA.
     *
     * Percobaan pertama memanggil next() di awal fungsi ini. Terukur:
     * panel pergi pada 2180ms, dan sesudah itu baris judul bergeser 0px --
     * seluruh motion masuk Beranda sudah habis di balik panel, jadi yang
     * terlihat saat halaman terbuka justru halaman diam.
     *
     * Sapuan membuka dari bawah ke atas (inset bawah 0% -> 100%). Memanggil
     * next() pada 0,45 detik menaruh awal motion Beranda di saat sapuan
     * sudah membuka sebagian: ekornya tersembunyi di balik sisa panel, dan
     * bagian terbesarnya berjalan di halaman yang sudah terbuka penuh.
     */
    gsap.timeline({ onComplete: reset })
      .to(content, { autoAlpha: 0, duration: 0.25, ease: "power2.in" })
      .to(panel, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.6, ease: EASE }, "-=0.1")
      .call(next, null, 0.45);
  }

  if (prefersReducedMotion()) { exit(); return; }

  document.documentElement.classList.add("intro-active");
  if (lenis) lenis.stop();
  /* Browser memulihkan posisi scroll kunjungan sebelumnya; tanpa ini situs
     terbuka di tengah halaman begitu panelnya naik.

     scrollRestoration DIMATIKAN LEBIH DULU, ditambahkan 15 Agustus 2026.
     scrollTo(0,0) saja tidak cukup: pemulihan itu dijadwalkan browser secara
     asinkron di sekitar event load, sedangkan baris ini berjalan dari
     useLayoutEffect. Urutannya tidak dijamin, jadi sesekali pemulihannya
     mendarat BELAKANGAN dan menang. "manual" menutup lombanya, bukan
     memenangkannya.

     Nilai lamanya dikembalikan saat teardown supaya kami tidak mengubah
     perilaku dokumen di luar masa hidup situs ini.

     Sengaja HANYA di jalur ini, bukan di kepala setupAnimations(): jalur
     reduced motion di atas memang tidak memaksa halaman ke puncak, dan
     mematikan pemulihan di sana akan mengubah perilaku yang sudah benar. */
  var restorasiLama = history.scrollRestoration;
  if (restorasiLama) {
    history.scrollRestoration = "manual";
    cleanups.push(function () { history.scrollRestoration = restorasiLama; });
  }
  window.scrollTo(0, 0);

  var strokeEl = $$("[data-intro-stroke] path", panel);
  var lockEl = $$("[data-intro-lock] path", panel);

  strokeEl.concat(lockEl).forEach(function (p) {
    var length = p.getTotalLength();
    p.style.strokeDasharray = length;
    p.style.strokeDashoffset = length;
  });

  var tl = gsap.timeline({
    onComplete: function () {
      /*
       * Font ditunggu supaya nama di bawah monogram tidak berganti bentuk
       * tepat saat panelnya terangkat -- TAPI dengan batas.
       *
       * Terukur: pada muat dingin document.fonts.ready baru selesai sekitar
       * 2,9 detik, dan pembukanya jadi 3,6 detik; pada muat panas ia selesai
       * seketika dan pembukanya 2,0 detik. Selisih 1,6 detik itu terlalu
       * besar untuk sesuatu yang menghalangi situs, dan yang paling parah
       * justru dialami pengunjung pertama kali.
       *
       * Jadi yang duluan selesai, itu yang dipakai: font atau 500ms.
       */
      var fontReady = (document.fonts && document.fonts.ready) || Promise.resolve();
      var fontLimit = new Promise(function (lepas) {
        var id = setTimeout(lepas, 500);
        cleanups.push(function () { clearTimeout(id); });
      });
      Promise.race([fontReady, fontLimit]).then(exit);
    },
  });

  /*
   * Urutannya menceritakan bentuknya terbentuk, bukan sekadar muncul: satu
   * stroke menyusur naik dari kaki kiri melewati puncak lalu turun ke kaki
   * kanan, baru palangnya mengunci keduanya jadi satu tanda. Palang itu
   * sengaja paling akhir DAN sendirian di ujung timeline -- sampai ia turun,
   * bentuknya masih terbaca sebagai gerbang kosong. Seluruh logo satu warna,
   * jadi urutan inilah satu-satunya yang membedakan perannya.
   *
   * TWEEN HEKSAGON DIBUANG pada 15 Agustus 2026 bersama path-nya di
   * Intro.jsx. Yang itu berbunyi:
   *
   *   tl.to(frameEl, { strokeDashoffset: 0, duration: 0.45,
   *                    stagger: 0.07, ease: "power2.out" }, 0);
   *
   * KEDUA TWEEN SISANYA DIMAJUKAN 0,22 DETIK, dan itu bukan sekadar
   * kerapian. Angka 0,22 dan 0,98 dulu dipilih relatif terhadap heksagon
   * yang mengisi detik pertama: stroke berangkat saat heksagonnya sudah
   * separuh tergambar. Membuang tween-nya tanpa menggeser sisanya akan
   * meninggalkan 0,22 detik layar hitam yang benar-benar diam di awal --
   * bukan jeda yang disengaja, melainkan lubang yang ditinggalkan sesuatu
   * yang sudah tidak ada, dan pada pembuka sependek ini ia terbaca sebagai
   * situs yang lambat memuat.
   *
   * Jarak ANTAR keduanya sengaja dipertahankan persis: palang dulu turun
   * 0,04 detik sebelum stroke selesai (0,98 lawan 1,02), sekarang 0,76
   * lawan 0,80. Tumpang tindih kecil itulah yang membuat palangnya terbaca
   * mengunci bentuk yang baru saja jadi, bukan menyusul belakangan.
   *
   * Total timeline 1,36 -> 1,14 detik. Batas keras 3 detik di atas tidak
   * perlu ikut disesuaikan; ia memang cuma jaring pengaman.
   */
  tl.to(strokeEl, { strokeDashoffset: 0, duration: 0.8, ease: "power1.inOut" }, 0);
  tl.to(lockEl, { strokeDashoffset: 0, duration: 0.38, ease: "power2.out" }, 0.76);
}
