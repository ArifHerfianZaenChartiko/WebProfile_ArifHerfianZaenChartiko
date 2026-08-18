/*
 * CARD PERAN — sorot yang berpindah di bagian Keahlian.
 *
 * ══ TEKNIS
 *
 * initGlyphRings dan initRoleCards dipisahkan dari reveal biasa karena keduanya
 * memegang KEADAAN: card mana yang sedang disorot, dan itu digerakkan hover di
 * desktop maupun posisi scroll di perangkat sentuh. Reveal lain tidak punya
 * keadaan sama sekali.
 *
 * ══ BAHASA AWAMNYA
 *
 * Ini yang membuat satu dari tiga kartu peran tampil lebih terang dan sedikit
 * terangkat, mengikuti kursor di komputer atau posisi gulir di ponsel.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { $, $$, prefersReducedMotion } from "./dom.js";
import { EASE, EASE_SCRUB, SCRUB } from "./tokens.js";

/*
 * LOGO CINCIN YANG DIGAMBAR — satu-satunya motion milik bagian Keahlian.
 *
 * KENAPA ADA. Sebelum ini seluruh bagian Keahlian memakai satu motion yang
 * sama persis untuk dua puluhan elemen: card peran, lima card kemampuan,
 * empat baris perkakas, dua baris bahasa — semuanya `scrub-reveal`. Bukan
 * sepi, tapi seragam, dan yang seragam terbaca datar. Tiap bagian lain
 * punya satu ide motion-nya sendiri (stack card di Pengalaman, akordeon
 * di Sertifikat, typewriter di Beranda); bagian ini tidak punya. Cincin di
 * card peran adalah satu-satunya bentuk yang cuma dimiliki bagian ini,
 * jadi di situlah idenya ditaruh.
 *
 * CARANYA SAMA DENGAN MONOGRAM PEMBUKA, dan itu disengaja — bukan kosakata
 * baru, melainkan yang sudah ada dipakai di tempat kedua. Keliling tiap
 * cincin diukur getTotalLength(), lalu strokeDasharray DAN strokeDashoffset
 * disetel sebesar itu, sehingga cincinnya jadi satu strip putus-putus yang
 * seluruhnya tergeser keluar. Menarik offset-nya kembali ke 0 menggambarnya
 * dari titik jam 3 searah jarum jam.
 *
 * DARI DALAM KE LUAR. Urutan DOM cincin sudah dari radius terkecil ke
 * terbesar, jadi stagger positif otomatis membaca sebagai riak yang menyebar
 * keluar. Jangan dibalik jadi negatif: yang menyusut ke dalam terbaca
 * seperti sesuatu yang menutup, bukan terbentuk.
 *
 * KENAPA TIDAK BERPUTAR. Sempat direncanakan cincinnya berputar pelan saat
 * disentuh kursor. Itu dibatalkan sebelum ditulis: cincin sepusat yang
 * diputar mengelilingi pusatnya sendiri tidak menghasilkan satu piksel pun
 * yang berubah. Yang menggantikannya riak melebar, dan itu seluruhnya CSS —
 * lihat blok "LOGO CINCIN" di src/styles/skills.css.
 *
 * `once: true`, bukan scrub. Menggambar garis adalah peristiwa sekali jadi;
 * memetakannya ke scroll berarti cincinnya terhapus lagi saat di-scroll balik,
 * dan logo yang terurai sendiri terbaca sebagai rusak.
 */
export function initGlyphRings(ctx) {
  $$("[data-glyph]").forEach(function (slot) {
    var ringSet = $$("circle", slot);
    if (!ringSet.length) return;

    /* Reduced motion: logo-nya dibiarkan apa adanya. Tidak ada yang perlu
       disetel ulang — tanpa strokeDasharray, cincinnya memang sudah utuh. */
    if (prefersReducedMotion()) return;

    ringSet.forEach(function (c) {
      var circumference = c.getTotalLength();
      c.style.strokeDasharray = circumference;
      c.style.strokeDashoffset = circumference;
    });

    gsap.to(ringSet, {
      strokeDashoffset: 0,
      duration: 0.7,
      ease: EASE,
      stagger: 0.09,
      /* Threshold-nya 92%, lebih rendah dari reveal card-nya sendiri
         (95%), supaya cincinnya mulai tergambar saat card-nya sudah
         terbuka — bukan di balik clip-path yang masih menutup. */
      scrollTrigger: { trigger: slot, start: "top 92%", once: true },
    });
  });
}

/*
 * CARD PERAN — datang dari samping berurutan, lalu satu disorot bergantian.
 *
 * Dua motion, dan keduanya menjawab kekurangan yang berbeda.
 *
 * KEDATANGAN. Ketiga card ini dulu memakai scrub-reveal yang sama persis
 * dengan dua puluhan elemen lain di bagian ini — tidak ada yang menandai
 * bahwa merekalah pokok bagiannya. Sekarang ketiganya meluncur masuk dari
 * kanan berurutan, sekali jalan. Attribute scrub-reveal-nya DIBUANG dari
 * Skills.jsx, bukan ditumpuk: keduanya sama-sama menganimasikan
 * pergeseran dan kejernihan, jadi memasang dua-duanya berarti dua tween
 * berebut properti yang sama pada elemen yang sama.
 *
 * SOROT. Tiga card setara yang diam berdampingan tidak memberi mata satu
 * pun tempat untuk berpijak. Yang disorot naik sedikit dan tampil penuh,
 * dua lainnya turun ke 0,78 — REDUP, BUKAN TERSEMBUNYI. Itu batas yang
 * disengaja: menyempitkan card jadi bar seperti gallery sertifikat akan
 * menyembunyikan dua dari tiga peran, dan tiga peran inilah yang justru
 * paling tidak boleh disembunyikan di halaman lamaran kerja. Karena tidak
 * ada isi yang hilang, tidak ada urusan aksesibilitas sama sekali di sini:
 * peredupannya murni hiasan.
 *
 * JALAN MASUKNYA MENIRU GALERI SERTIFIKAT, dan itu bukan kemalasan —
 * kursor di fine pointer, posisi scroll di perangkat tanpa hover, band
 * scroll dipatok ke TITIK TENGAH blok dan diukur dalam persen tinggi viewport.
 * Dua tempat di halaman yang sama-sama "telusuri satu per satu" sebaiknya
 * terasa sama; kalau yang satu di-scroll dan yang lain diketuk, pengunjung
 * harus belajar dua kali.
 */
export function initRoleCards(ctx) {
  const { cleanups, listen } = ctx;
  var orbit = $(".stage-orbit");
  if (!orbit) return;

  var cards = $$("[data-role-card]", orbit);
  if (cards.length < 2) return;

  /* Reduced motion: card-nya dibiarkan berdiri apa adanya, dan sorotnya
     tidak dipasang sama sekali. Sorot yang berpindah-pindah tanpa transisi
     berkedip, dan berkedip persis yang dihindari pengaturan ini. */
  if (prefersReducedMotion()) return;

  /*
   * MASUK DAN KELUAR, DIGERAKKAN SCROLL — bukan kedatangan sekali jalan.
   *
   * Tiap slot punya arahnya sendiri, dibaca dari data-direction di markup:
   *
   *   pudar  card utama, memudar masuk lalu memudar keluar di tempat
   *   kiri   masuk dari tepi kiri, keluar kembali ke kiri
   *   kanan  masuk dari tepi kanan, keluar kembali ke kanan
   *
   * Card utama sengaja TIDAK ikut bergeser. Ia merentang penuh dua kolom;
   * menggesernya sejauh dua card di bawahnya akan membuat card selebar
   * 1100px melintas separuh screen, dan yang terbaca bukan motion masuk
   * melainkan layout yang sedang rusak. Memudar di tempat juga yang
   * membuat hierarkinya terbaca: yang utama muncul, yang penunjang datang.
   *
   * KELUARNYA KE ARAH ASALNYA, bukan menerus ke seberang. Kembali ke tepi
   * yang sama membuat keduanya terbaca sebagai sepasang pintu yang menutup;
   * menerus ke seberang berarti keduanya harus melintasi card utama.
   *
   * TIAP SLOT DI-TRIGGER OLEH DIRINYA SENDIRI, BUKAN OLEH BLOKNYA — dan ini
   * satu-satunya hal yang membuat motion MASUK benar-benar sempat dilihat.
   *
   * Dua percobaan sebelumnya keduanya men-trigger dari .stage-orbit, dan
   * keduanya gagal karena alasan yang sama. Dua card penunjang duduk di
   * DASAR blok, jadi merekalah yang paling terakhir masuk screen; sementara
   * kemajuan animasinya dihitung dari perjalanan SELURUH blok. Terukur di
   * screen 900px dengan blok 420px: saat kedua card itu benar-benar
   * terlihat, kemajuannya sudah sekitar 85 persen. Yang tersisa untuk
   * dilihat cuma sisa offset terakhir, lalu langsung diam — praktis tidak
   * ada animasi masuk sama sekali, cuma animasi keluar.
   *
   * Cacat itu sempat lolos dari pengujian karena marker "terlihat" yang
   * dipakai cuma `bawah > 0 && atas < tinggiviewport`. Itu bernilai benar
   * meski card-nya menyembul SATU PIKSEL di tepi bawah screen. Angkanya
   * benar, yang diukurnya yang salah.
   *
   * Di-trigger dari slotnya sendiri, rentangnya jadi tinggiviewport + tinggiSlot,
   * dan sepertiga pertamanya jatuh persis saat slot itu sedang naik masuk
   * ke screen. Untuk slot samping setinggi ~190px di screen 900px: masuknya
   * memakai 363px pertama, dan di ujungnya tepi atas slot ada di 537px
   * dengan tepi bawah 727px — seluruhnya di dalam screen. Tidak ada satu
   * bagian pun dari motion masuk yang jatuh di luar pandangan.
   *
   * KONSEKUENSINYA KETIGANYA TIDAK LAGI SEREMPAK, dan itu memang benar:
   * card utama berada lebih tinggi, jadi ia datang lebih dulu, lalu dua
   * card penunjang menyusul bersamaan karena keduanya sebaris. Yang
   * serempak justru yang tadi mustahil dilihat.
   *
   * SATU TIMELINE PER SLOT, bukan dua trigger terpisah untuk masuk dan
   * keluar: dua trigger yang rentangnya bertindihan akan menganimasikan
   * properti yang sama pada elemen yang sama sekaligus.
   */
  var slot = $$("[data-card-slot]", orbit);
  slot.forEach(function (s) {
    var direction = s.getAttribute("data-direction");
    var shift = direction === "left" ? -55 : direction === "right" ? 55 : 0;

    var tl = gsap.timeline({
      defaults: { ease: EASE_SCRUB },
      scrollTrigger: {
        trigger: s,
        start: "clamp(top bottom)",
        end: "clamp(bottom top)",
        scrub: SCRUB,
      },
    });
    tl.fromTo(s,
      { xPercent: shift, opacity: 0 },
      { xPercent: 0, opacity: 1, duration: 1 }, 0);
    tl.to(s, { xPercent: shift, opacity: 0, duration: 1 }, 2);
  });

  var highlightTo = -1;
  var tlHighlight = null;
  function highlight(i) {
    if (i === highlightTo) return;
    highlightTo = i;

    if (tlHighlight) tlHighlight.kill();
    tlHighlight = gsap.timeline();
    cards.forEach(function (k, j) {
      var self = j === i;
      k.classList.toggle("stage-card--highlight", self);
      /* 1,012 bukan 1,05: card utama merentang penuh 1100px di desktop,
         jadi tiap 1% skala menjulur 5,5px ke tiap sisi. Pada 1,012 ia
         menjulur 6,6px ke dalam padding container yang 40px — aman. Pada 1,05
         ia menjulur 27,5px dan mulai menyentuh tepi screen. */
      tlHighlight.to(k, {
        opacity: self ? 1 : 0.78,
        scale: self ? 1.012 : 1,
        y: self ? -6 : 0,
        duration: 0.45, ease: EASE,
      }, 0);
    });
  }
  cleanups.push(function () {
    if (tlHighlight) tlHighlight.kill();
    cards.forEach(function (k) { k.classList.remove("stage-card--highlight"); });
  });

  /*
   * PELACAK KURSOR DIBUANG pada 18 Agustus 2026, bersama cahaya sorot yang
   * jadi satu-satunya pembacanya.
   *
   * Yang berdiri di sini dulu: handler `pointermove` per card yang menulis
   * --mx/--my (posisi kursor dalam persen kotak card) supaya gradien di
   * `.stage-card::after` mengikuti kursor, ditambah penjaga rAF supaya
   * penulisannya paling banyak sekali per frame — tanpa penjaga itu pointer
   * bertingkat tinggi mengirim ratusan kejadian per detik dan tiap
   * penulisan membatalkan gambar ulang gradiennya. `pointerleave`
   * mengembalikan kedua variabel ke bawaan CSS, supaya card yang nanti
   * dipilih scroll di perangkat hibrida tidak menyala dengan cahaya di tepi
   * acak, sisa dari kursor yang sudah lama tidak ada.
   *
   * Semuanya ikut dibuang karena cahayanya sudah tidak ada — lihat komentar
   * di src/styles/skills.css untuk kenapa. `pointerenter` TETAP: itu yang memilih
   * card mana yang disorot di desktop, dan sorotnya sendiri (naik, skala,
   * redup tetangganya, tepi menajam) masih berjalan.
   */
  var canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
  cards.forEach(function (k, i) {
    listen(k, "pointerenter", function () { if (canHover.matches) highlight(i); });
  });

  /* Band scroll untuk perangkat tanpa hover, bentuknya sama dengan gallery
     sertifikat: dipatok ke titik tengah blok, panjangnya 35% tinggi viewport,
     jadi tiap card kebagian ~11,7vh — sekitar 98px di ponsel. Ditanyakan
     di dalam onUpdate, bukan saat membuat, supaya perangkat hibrida yang
     berpindah modus pointer langsung benar tanpa membangun ulang trigger. */
  var lastScroll = -1;
  ScrollTrigger.create({
    trigger: orbit,
    start: "center 70%",
    end: "center 35%",
    onUpdate: function (diri) {
      if (canHover.matches) return;
      var i = Math.min(cards.length - 1, Math.floor(diri.progress * cards.length));
      if (i === lastScroll) return;
      lastScroll = i;
      highlight(i);
    },
  });

  /* Keadaan istirahat: card pertama disorot sejak awal. Tanpa ini
     pengunjung desktop yang tidak pernah mengarahkan kursor ke sini melihat
     tiga card setara yang diam — persis masalah yang jadi alasan sorot ini
     ada. Card pertama yang dipilih karena ia peran yang dilamar lebih dulu,
     alasan yang sama dengan kenapa ia melebar dua kolom.

     Dulu ini dipasang dari onComplete kedatangan sekali jalan. Sejak masuk
     dan keluarnya digerakkan scroll, tidak ada lagi "selesai" untuk
     ditumpangi — dan tidak perlu: opacity sorot hidup di card, opacity
     masuk-keluar hidup di slot, jadi memasangnya sekarang tidak berebut
     dengan apa pun. */
  highlight(0);
}
