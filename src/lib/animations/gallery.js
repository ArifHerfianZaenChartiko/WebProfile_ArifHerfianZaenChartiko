/*
 * GALERI AKORDEON — bagian Sertifikat.
 *
 * ══ TEKNIS
 *
 * Modul terpanjang, dan berdiri sendiri karena ia punya DUA cara menelusuri yang
 * sepenuhnya berbeda: kursor di pointer halus, posisi scroll di perangkat sentuh.
 * Keduanya berbagi satu fungsi pemilih, dan itu yang membuatnya sulit dipecah
 * lebih kecil lagi tanpa memotong alur yang memang satu.
 *
 * ══ BAHASA AWAMNYA
 *
 * Ini deretan sertifikat yang satu panelnya terbuka lebar sementara sisanya
 * menyempit jadi bilah tipis.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { $, $$, prefersReducedMotion } from "./dom.js";
import { EASE, EASE_SCRUB, SCRUB } from "./tokens.js";

/*
 * GALERI AKORDEON — satu panel terbuka, sisanya menyempit jadi bar.
 *
 * Menggantikan panggung kedatangan sertifikat yang lama (grid yang di-pin
 * setinggi satu screen, card hanyut dari empat sudut, gelombang kertas di
 * ticker). Yang itu animasi SEKALI JALAN saat di-scroll; ini interaksi yang
 * bisa dijelajahi, dan enam sertifikat memang lebih masuk akal ditelusuri
 * satu per satu daripada ditabur sekaligus.
 *
 * CARA MEMBAGI RUANGNYA. Semua panel flex item. Yang aktif diberi flexGrow
 * `tumbuh`, sisanya 1, jadi pembagiannya proporsional dan tidak pernah
 * dihitung dalam piksel -- lebar container boleh berubah tanpa satu angka pun
 * ikut disesuaikan. `tumbuh` diturunkan dari RATIO, porsi screen yang ingin
 * ditempati panel aktif:
 *
 *     tumbuh = RATIO * (n - 1) / (1 - RATIO)
 *
 * Dengan RATIO 0,52 dan n 6: tumbuh = 0,52*5/0,48 = 5,42. Panel aktif jadi
 * 5,42 bagian dari total 10,42 bagian, yaitu 52%. Sisanya 9,6% seorang.
 *
 * KENAPA TIDAK ADA grayscale. Component aslinya meredupkan panel non-aktif
 * dengan filter: grayscale(). Filter dihitung ulang oleh browser tiap
 * frame untuk seluruh piksel gambar, dan di sini gambarnya enam pindaian
 * sertifikat berukuran penuh. Repo ini sudah pernah membuang dua filter
 * karena alasan yang sama (blur kabut dan backdrop-filter card, +6 fps di
 * ponsel). Peredupnya di sini <span> hitam ber-opacity: compositor cuma
 * menyusun ulang layer, tidak menghitung ulang piksel.
 *
 * TIGA JALAN MASUK, SATU KEADAAN. select() satu-satunya pintu, dipanggil
 * oleh hover (hanya di fine pointer), fokus keyboard, dan posisi scroll
 * (hanya di perangkat tanpa hover — lihat blok panjang di bawah). Ketiganya
 * cuma memindahkan `aktif`; apply() yang menggambar.
 *
 * KETUK PERTAMA MEMILIH, KETUK KEDUA MEMBUKA. Di perangkat sentuh tidak ada
 * hover, jadi tanpa aturan ini panel pertama yang disentuh langsung membuka
 * PDF-nya tanpa pernah sempat dilihat. Sejak scroll ikut memilih, aturan ini
 * bukan lagi satu-satunya jalan menelusuri, melainkan jalan pintas — dan
 * itu yang membuatnya tidak lagi terasa seperti ketukan yang gagal.
 */
export function initAccordionGallery(ctx) {
  const { listen, observe } = ctx;
  var root = $('[data-component="gallery"]');
  if (!root) return;

  var panel = $$("[data-panel]", root);
  if (!panel.length) return;

  var RATIO = 0.52;
  var TILT = 6;
  var DUR = 0.55;
  var grow = panel.length > 1 ? (RATIO * (panel.length - 1)) / (1 - RATIO) : 1;

  /* Pergantian yang di-trigger scroll lebih short dari yang di-trigger hover.
     Alasannya KECEPATAN TANGGAP, bukan performa: band scroll-nya ~190px, dan
     transisi 0,55 detik belum selesai saat band berikutnya sudah masuk,
     sehingga panel selalu tertinggal di belakang jari.

     Sempat diduga ini juga menghemat layout -- flex-grow memaksa layout
      ulang tiap frame, dan saat di-trigger scroll itu terjadi BERSAMAAN
     dengan scroll. Diukur di 390x844 dengan CPU dicekik 6x, tiga jalan
     masing-masing: 43,2 fps rata-rata pada 0,55 dan 44,7 pada 0,35. Selisih
     itu di dalam derau; jangan pakai angka ini untuk membenarkan
     memperpendek durasi di tempat lain. */
  /* 0,3 bukan 0,35 lagi. Band scroll per panel dipendekkan drastis (lihat
     blok SCROLL YANG MEMILIH di bawah) jadi ~63px di ponsel; transisi yang
     lebih lama dari waktu tempuh satu band membuat panel selalu tertinggal
     di belakang jari, dan yang terlihat bukan pergantian melainkan antrean
     pergantian yang saling menyusul. */
  var DUR_SCROLL = 0.3;
  var active = 0;
  var tl = null;
  var first = true;
  var durOnce = null;

  /* Reduced motion = tidak ada kedatangan sama sekali; gallery sudah berdiri
     lengkap sejak awal. Disimpan sekali, bukan ditanya ulang tiap kali,
     supaya keadaan awal dan trigger-nya tidak mungkin berbeda pendapat. */
  var reducedMotion = prefersReducedMotion();

  /*
   * TITIK BERANGKAT KEDATANGAN — diukur ke TEPI KANAN SCREEN, bukan ke tepi
   * kanan gallery. Galeri berhenti di 1180px di tengah screen 1440, jadi
   * berangkat dari tepinya berarti keenam panel menyembul dari titik yang
   * mengambang 130px di dalam screen, di ruang yang jelas kosong. Yang
   * terbaca bukan sertifikat yang datang dari luar, melainkan sertifikat
   * yang muncul begitu saja di tengah halaman. Pelajaran yang sama dengan
   * card Keahlian, lihat #keahlian di index.css.
   *
   * offsetLeft, BUKAN getBoundingClientRect(). Fungsi ini dipanggil ulang
   * tiap kali ukuran berubah, termasuk SAAT panelnya masih terparkir di
   * kanan — dan rect ikut menghitung transform yang sedang terpasang, jadi
   * ia akan mengukur jarak dari posisi parkirnya sendiri dan mendorong
   * panel makin jauh tiap kali dipanggil. offsetLeft murni layout.
   *
   * Semuanya berangkat dari satu titik yang sama di luar screen, jadi yang
   * terlihat seperti setumpuk card yang dibagikan: panel pertama menempuh
   * jarak paling jauh ke kiri, yang terakhir nyaris tidak bergerak.
   */
  function enterDistance(p) {
    var left = root.getBoundingClientRect().left + (p.offsetLeft - root.offsetLeft);
    return Math.max(0, window.innerWidth - left + 24);
  }

  /* Panel sebelum yang aktif miring ke satu arah, sesudahnya ke arah
     sebaliknya, jadi keduanya seolah membuka jalan ke tengah. Dipisah jadi
     fungsi karena kedatangan juga harus mendarat tepat di sudut ini --
     kalau ia mendarat di 0 lalu apply() membetulkannya, ada sentakan
     kecil di akhir tiap lipatan. */
  function degrees(i) {
    return i === active ? 0 : i < active ? TILT : -TILT;
  }

  function apply() {
    var dur = first || prefersReducedMotion()
      ? 0
      : durOnce != null ? durOnce : DUR;
    durOnce = null;

    if (tl) tl.kill();
    tl = gsap.timeline();

    panel.forEach(function (p, i) {
      var self = i === active;
      var media = $("[data-panel-media] img", p);
      var veil = $("[data-panel-veil]", p);
      var text = $("[data-panel-text]", p);

      /* Selama masih terlipat, layout-nya tetap dihitung dan dipasang --
         yang ditahan cuma tampilannya. Jadi mengubah ukuran screen sebelum
         galerinya tiba tidak membatalkan kedatangan, dan tidak ada satu
         frame pun yang menampilkan panel tegak sebelum waktunya. */
      /* x dan opacity panel SENGAJA tidak disebut di sini. Keduanya milik
         penuh timeline kedatangan di bawah, yang bisa dibalik arah kapan
         saja; kalau apply() ikut menulisinya, tiap pergantian panel di
         tengah kedatangan akan menariknya kembali ke tempat. Yang diurus
         apply() hanya lebar, sudut, dan isi panel. */
      tl.to(p, {
        flexGrow: self ? grow : 1,
        rotationY: degrees(i),
        duration: dur, ease: EASE,
      }, 0);

      p.setAttribute("aria-current", self ? "true" : "false");

      if (media) {
        /*
         * PARALAKS. Yang digeser GAMBARNYA DI DALAM FRAME, bukan
         * frame-nya. Dulu yang ditweenkan .gallery-media -- span
         * `position:absolute; inset:0` yang sekaligus jadi kotak
         * pengguntingnya -- jadi menggesernya memindahkan gunting dan
         * isinya sekaligus, dan yang ter-reveal di sisi berlawanan adalah
         * latar panel. Sekarang frame-nya diam dan <img>-nya yang bergerak
         * di baliknya, persis arti kata paralaks.
         *
         * xPercent, BUKAN x. Offset 26px tetap masih masuk akal pada bar
         * desktop selebar ~106px, tapi bar ponsel cuma 28px -- gambarnya
         * praktis terdorong keluar seluruhnya. Persen mengikat offset ke
         * lebar panelnya sendiri, jadi satu angka benar di semua lebar.
         *
         * SKALANYA TERIKAT KE OFFSET, dan syaratnya: setengah kelebihan
         * skala harus menutupi offset terbesar. Offset maksimum 1,5 x 4%
         * = 6%; skala 1,18 menggantung (1,18-1)/2 = 9% di tiap sisi, jadi
         * tersisa 3% sebagai kelonggaran. Kelonggaran itu bukan hiasan:
         * 6% lawan 7% sempat dipakai dan sisanya cuma 1% — pada bar
         * ponsel selebar 28px itu 0,28px, cukup untuk menyisakan garis
         * rambut latar panel di tepi setelah pembulatan subpiksel. Kalau
         * salah satu angka diubah, hitung ulang pertidaksamaan ini.
         *
         * Batas 1,5 langkah BUKAN kasus tepi: dengan enam panel, setiap
         * panel yang berjarak dua atau lebih dari yang aktif kena batas itu,
         * jadi 6% adalah offset yang paling sering dipakai — bukan yang
         * paling jarang. Batasnya sendiri ada supaya panel di ujung tidak
         * melompat sejauh jaraknya dari yang aktif.
         */
        var distance = Math.max(-1.5, Math.min(1.5, active - i));
        tl.to(media, {
          xPercent: self ? 0 : distance * 4,
          scale: self ? 1 : 1.18,
          duration: dur, ease: EASE,
        }, 0);
      }

      if (veil) tl.to(veil, { opacity: self ? 0 : 0.55, duration: dur, ease: EASE }, 0);
      if (text) {
        tl.to(text, {
          opacity: self ? 1 : 0,
          x: self ? 0 : -12,
          duration: self ? dur : dur * 0.6,
          ease: EASE,
        }, 0);
      }
    });

    first = false;
  }

  function select(i, dur) {
    if (i === active) return;
    active = (i + panel.length) % panel.length;
    durOnce = typeof dur === "number" ? dur : null;
    apply();
  }

  /* Hover hanya dipasang di pointer yang benar-benar bisa melayang. Di
     touch screen pointerenter tetap terkirim saat jari menyentuh, dan itu
     membuat panel berganti tepat sebelum klik diproses. */
  var canHover = window.matchMedia("(hover: hover) and (pointer: fine)");

  panel.forEach(function (p, i) {
    listen(p, "pointerenter", function () { if (canHover.matches) select(i); });
    listen(p, "focus", function () { select(i); });
    listen(p, "click", function (e) {
      if (i !== active) { e.preventDefault(); select(i); }
    });
    listen(p, "keydown", function (e) {
      var forward = e.key === "ArrowRight" || e.key === "ArrowDown";
      var backward = e.key === "ArrowLeft" || e.key === "ArrowUp";
      if (!forward && !backward) return;
      e.preventDefault();
      var destIdx = (i + (forward ? 1 : -1) + panel.length) % panel.length;
      select(destIdx);
      panel[destIdx].focus();
    });
  });

  /*
   * KEDATANGAN — enam sertifikat masuk satu per satu dari luar tepi kanan
   * screen, seperti setumpuk card yang dibagikan.
   *
   * Sebelumnya kedatangannya berupa lipatan: rotationY dari -74 derajat ke
   * sudut istirahatnya. Secara teknis itu lebih hemat — ia menumpang ruang
   * tiga dimensi yang memang sudah tergelar untuk akordeonnya. Tapi panel
   * yang melipat di tempat tidak menempuh jarak apa pun, dan pada bar
   * selebar 28px di ponsel yang terjadi praktis cuma perubahan lebar
   * beberapa piksel. Motion yang tidak berpindah tempat tidak terbaca
   * sebagai kedatangan.
   *
   * SUMBUNYA X, DAN rotationY DIBIARKAN DIAM di sudut istirahatnya sejak
   * awal. Dua sumbu yang bergerak sekaligus pada enam elemen bertingkah
   * saling menutupi: lipatannya menyamarkan offset, offset-nya menyamarkan
   * lipatan. Satu sumbu yang jelas mengalahkan dua sumbu yang ramai.
   *
   * OPACITY LEBIH PENDEK DARIPADA OFFSET (0,6 lawan 1). Panel berangkat
   * dari luar screen, jadi bagian awal lintasannya toh tak terlihat;
   * membiarkan pudarnya berjalan sepanjang offset membuat panel masih
   * setengah tembus pandang saat sudah lama di dalam screen — yang terlihat
   * seperti hantu yang lewat, bukan card padat yang meluncur.
   *
   * Sudut istirahat tiap panel berbeda (0 untuk yang aktif, ±6 untuk
   * sisanya) dan itu sudah dipasang apply() sejak sebelum kedatangan,
   * jadi tidak ada pembetulan sudut di ujung lintasan yang bisa menyentak.
   *
   * opacity, BUKAN autoAlpha. autoAlpha menambahkan visibility:hidden, dan
   * itu mengeluarkan keenam <a>-nya dari urutan tab DAN dari pohon
   * aksesibilitas selama masih terparkir — pengguna keyboard tidak akan
   * pernah bisa men-tab ke sana.
   *
   * DIIKAT KE POSISI SCROLL, BUKAN KE JAM. Ini perbaikan atas percobaan
   * pertama, dan alasannya seluruhnya soal kepulangan.
   *
   * Versi pertama memakai satu timeline berjam yang di-play() saat turun
   * dan di-reverse() saat naik. Kedatangannya bagus. Kepulangannya
   * praktis tidak pernah terlihat, dan itu bukan soal threshold yang kurang
   * pas: animasi berjam ikut lomba dengan scroll, dan scroll selalu menang.
   * Kepulangan 0,5 detik menuntut galerinya masih terlihat selama 0,5
   * detik penuh SESUDAH trigger-nya menyala — padahal saat itu pengguna
   * sedang men-scroll menjauh. Diukur di 1222x900, 1440x900, 768x1024, dan
   * 390x844 pada dua kecepatan scroll naik: pada scroll cepat (~1000px/detik)
   * cuma 0-1% lintasan kepulangan yang tergambar selagi gallery masih
   * separuh terlihat; pada scroll sedang (~440px/detik) 4% di ponsel dan
   * 60% di kasus terbaiknya. Memindahkan threshold-nya, memendekkan
   * durasinya, mempercepat pemutarannya — semuanya cuma menggeser angka
   * itu, tidak pernah memperbaikinya, sebab kecepatan scroll bukan sesuatu
   * yang bisa dianggap tetap.
   *
   * Terikat scroll, pertanyaannya hilang: sejauh apa panel sudah masuk
   * SELALU merupakan fungsi dari seberapa jauh galerinya sudah naik. Tidak
   * ada yang bisa selesai di luar screen, di kecepatan scroll mana pun, di
   * perangkat mana pun. Di-scroll naik ia mundur persis di jalan yang sama —
   * kepulangan yang diminta tidak perlu ditulis sebagai animasi kedua.
   *
   * Yang HILANG dengan ini cuma satu: kedatangannya tidak lagi berjalan
   * sendiri kalau pengguna berhenti men-scroll tepat di tengah band.
   * Sebagai gantinya ia tidak pernah salah waktu.
   *
   * EASE_SCRUB ("none"), bukan power4.out. Pada motion yang diikat scroll,
   * ease memetakan jarak scroll ke jarak tempuh, jadi power4.out berarti
   * 23% lintasan habis di 3% band pertama lalu sisanya merayap. Rasa
   * meredamnya datang dari scrub 0,35, bukan dari kurva easenya — persis
   * seperti semua motion terikat scroll lain di file ini.
   *
   * BAND-nya PENDEK DAN LETAKNYA TINGGI: "top 88%" sampai "center 80%",
   * bukan "top bottom" sampai "top 65%" seperti percobaan pertama. Dua
   * batasan menjepitnya dari kedua sisi.
   *
   * Dari atas: pemilih di bawah mulai saat pusat gallery di 75% tinggi
   * viewport, jadi band ini harus tuntas sebelum itu — berhenti di pusat 80%
   * menyisakan jarak, dan tidak pernah ada panel yang sedang dibagikan dan
   * sedang dipilih pada saat yang sama.
   *
   * Dari bawah: pangkal band adalah tempat panel PERTAMA menyelesaikan
   * kepulangannya, sebab urutan mundur membuatnya yang terakhir pergi.
   * Dipangkal di "top bottom" — gallery baru menyembul setinggi nol — panel
   * itu pulang sepenuhnya di luar screen. Diukur di tujuh ukuran, saat tiap
   * panel berada di separuh kepulangannya: dengan pangkal "top bottom"
   * galerinya cuma 0-10% terlihat di kasus terburuk tiap perangkat; dengan
   * pangkal "top 88%" jadi 27-44%. Band-nya memang lebih short (275px di
   * 1440x900, 152px di 390x844), dan itu justru yang membuat seluruh
   * urutannya muat di bagian screen yang benar-benar dilihat orang.
   *
   * invalidateOnRefresh + nilai berupa fungsi: jarak berangkat diukur
   * dalam piksel dan ikut lebar viewport, jadi ia harus diukur ulang tiap
   * ScrollTrigger menghitung ulang. Itu juga yang membereskan pengukuran
   * pertama di init, saat flexGrow panel aktif belum tentu sudah
   * terpasang.
   */
  if (!reducedMotion) {
    var tlEnter = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top 88%",
        end: "center 80%",
        scrub: SCRUB,
        invalidateOnRefresh: true,
      },
    });

    panel.forEach(function (p, i) {
      /* 0,15 jeda x 5 + 1 durasi = 1,75 satuan untuk keenamnya; tiap panel
         berangkat setelah 8,6% band berlalu. Perbandingan yang sama dengan
         versi berjamnya (0,075 dari 0,875 detik), jadi iramanya tidak
         berubah — cuma jamnya yang berganti jadi posisi scroll. */
      tlEnter.fromTo(p,
        { x: function () { return enterDistance(p); } },
        { x: 0, duration: 1, ease: EASE_SCRUB }, i * 0.15);
      tlEnter.fromTo(p,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: EASE_SCRUB }, i * 0.15);
    });
  }

  /*
   * SCROLL YANG MEMILIH, UNTUK PERANGKAT TANPA HOVER.
   *
   * Di fine pointer menelusuri gallery ini gratis: arahkan kursor, panel
   * terbuka. Di touch screen tidak ada motion yang setara. Yang tersisa cuma
   * ketuk, dan ketuk pertama sudah habis dipakai untuk memilih — jadi
   * melihat keenam sertifikat menuntut sebelas ketukan, dan ketukan pertama
   * yang tidak membuka apa pun terbaca sebagai kegagalan, bukan pilihan.
   *
   * Peran hover karena itu diambil alih posisi scroll: lintasan gallery
   * melewati screen dibagi rata sejumlah panel, dan panel yang band-nya
   * sedang dilewati adalah yang terbuka. Menelusuri kembali gratis, nol
   * ketukan; ketuk kembali murni berarti "buka yang ini".
   *
   * KENAPA BUKAN GARIS TENGAH VIEWPORT. Cara yang biasa dipakai —
   * IntersectionObserver dengan rootMargin "-50% 0px -50% 0px" — rusak di
   * sini justru karena panelnya berubah ukuran: yang terbuka mengambil 52%
   * ruang dan lima sisanya berbagi 48%, jadi melewati panel terbuka
   * menuntut sekitar lima kali lebih banyak scroll daripada melewati bar.
   * Pemilihannya menempel pada dirinya sendiri, dan dalam satu lintasan
   * screen dua panel terakhir tidak akan pernah tercapai. Band berbasis
   * kemajuan tidak bergantung pada ukuran yang sedang dianimasikan, jadi
   * keenamnya kebagian jarak scroll yang persis sama.
   *
   * Argumen ini SELAMAT dari perubahan 8 Agustus 2026 yang membuat gallery
   * mendatar di semua lebar, dan itu bukan kebetulan: ia ditulis dalam
   * porsi, bukan piksel. Yang berganti cuma sumbu pembagiannya — dulu
   * tinggi, sekarang lebar — sementara ketimpangan 52:48 yang jadi
   * pokok masalahnya tidak berubah sama sekali.
   *
   * `lastScroll` yang membuat ketukan manual tidak langsung ditimpa:
   * scroll hanya bicara saat band-nya BERGANTI, bukan tiap frame. Setelah
   * mengetuk panel lain, offset beberapa piksel karena jari tidak
   * mengembalikan pilihan — scroll baru mengambil alih lagi saat pengguna
   * memang berpindah band.
   *
   * Trigger-nya tetap dibuat di fine pointer, cuma diam. Menanyakan
   * canHover di dalam onUpdate, bukan saat membuat, membuat perangkat
   * hibrida yang berpindah modus pointer langsung benar tanpa perlu
   * membangun ulang trigger-nya.
   */
  var lastScroll = -1;
  ScrollTrigger.create({
    trigger: root,
    /*
     * BAND-nya DIPUSATKAN DI TENGAH SCREEN, DAN PENDEK.
     *
     * Sebelum ini "top 85%" sampai "bottom 15%": pemilihan mulai begitu
     * tepi atas gallery menyembul dari dasar screen dan baru habis saat tepi
     * bawahnya nyaris keluar dari puncak. Lintasannya ~809px di ponsel,
     * 135px per panel, dan yang lebih parah dari panjangnya adalah LETAKNYA
     * — dua panel pertama sudah lewat sebelum galerinya sempat berada di
     * tempat yang enak dipandang, dan dua terakhir baru datang saat ia
     * sedang pergi. Menelusurinya menuntut men-scroll sepanjang seluruh
     * lintasan gallery melewati screen.
     *
     * Sekarang yang dijadikan patokan TITIK TENGAH gallery, bukan tepinya.
     *
     * UJUNGNYA DINAIKKAN DARI 17% KE 40%, dan itu perbaikan atas percobaan
     * pertama. Pada 17%, titik tengah gallery sudah nyaris menyentuh puncak
     * screen saat sertifikat terakhir baru terbuka — bagiannya praktis sudah
     * lewat, jadi lipatan terakhir tidak pernah sempat dilihat. Sekarang
     * seluruh urutan tuntas saat pusat gallery masih di 40% tinggi viewport,
     * yaitu masih di atas garis tengah dan seluruh galerinya masih utuh
     * di screen.
     *
     * Pangkalnya ikut turun 62% -> 75% supaya band-nya tidak jadi terlalu
     * sempit setelah ujungnya dinaikkan: 35% tinggi viewport, bukan 45%.
     *
     * PERSEN TINGGI viewport, BUKAN PIKSEL — itu yang membuatnya benar di
     * semua perangkat tanpa satu pun titik henti: 35% dari 844 (ponsel)
     * = 295px, 49px per panel; 35% dari 1024 (tablet) = 358px, 60px per
     * panel. Jarak per panelnya ikut tumbuh bersama screen-nya, jadi rasanya
     * sama di keduanya.
     */
    start: "center 75%",
    end: "center 40%",
    onUpdate: function (diri) {
      if (canHover.matches) return;
      var i = Math.min(panel.length - 1, Math.floor(diri.progress * panel.length));
      if (i === lastScroll) return;
      lastScroll = i;
      select(i, DUR_SCROLL);
    },
  });

  /* Satu-satunya yang perlu men-trigger gambar ulang sekarang adalah perubahan
     ukuran container. Dulu ada listener kedua di media query 900px, karena di
     bawahnya gallery ini menumpuk ke bawah dan sumbu miring ikut bertukar;
     sejak ia mendatar di semua lebar, tidak ada lagi orientasi yang bisa
     berganti — dan ResizeObserver ini toh sudah menangkap setiap pergantian
     titik henti, sebab semuanya mengubah tinggi container-nya. */
  observe(root, function () { apply(); });

  apply();
}
