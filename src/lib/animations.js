/*
 * ══════════════════════════════════════════════════════════════════════════
 * SELURUH MOTION SITUS INI, DALAM SATU FILE.
 *
 * Dipanggil sekali dari useLayoutEffect di src/App.jsx, dan MENGEMBALIKAN
 * fungsi teardown. Itu bukan kerapian belaka: React StrictMode sengaja
 * memasang lalu melepas lalu memasang lagi tiap efek waktu pengembangan,
 * dan node DOM-nya TIDAK dibuat ulang. Tanpa teardown, tiap event
 * listener, ticker, dan scroll trigger akan terpasang dua kali — gejalanya
 * animasi jadi dua kali lebih cepat dan scroll terasa berat, hanya di mode
 * pengembangan, jadi mudah disalahartikan sebagai masalah performa.
 *
 * Karena itu SETIAP side effect di file ini didaftarkan lewat empat
 * pembantu di bawah: listen(), addTicker(), observe(), dan addNode().
 * Kalau menambah side effect baru, pakai keempatnya — jangan panggil
 * addEventListener, gsap.ticker.add, new ResizeObserver, atau appendChild
 * secara langsung.
 *
 * URUTAN ISI FILE INI:
 *   1. Token motion        kosakata bersama: kurva, durasi, jeda
 *   2. Deteksi perangkat  threshold screen dan mode ringan
 *   3. Bantu-bantu        pemecah huruf, pembangun logo
 *   4. Scroll halus       Lenis, dan satu-satunya pintu untuk melompat
 *   5. Transisi           satu fungsi per jenis motion
 *   6. Perilaku           typewriter, form, bar status, tombol
 *   7. Penyalaan          urutan pemanggilan, dan kenapa urutannya begitu
 * ══════════════════════════════════════════════════════════════════════════
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export function setupAnimations() {
  "use strict";

  /* Daftar teardown. Diisi oleh ketiga pembantu di bawah, dijalankan
     terbalik saat bongkar() dipanggil. */
  var cleanups = [];

  function listen(target, type, fn, opts) {
    target.addEventListener(type, fn, opts);
    cleanups.push(function () { target.removeEventListener(type, fn, opts); });
  }
  function addTicker(fn) {
    gsap.ticker.add(fn);
    cleanups.push(function () { gsap.ticker.remove(fn); });
  }
  function observe(node, fn) {
    var ro = new ResizeObserver(fn);
    ro.observe(node);
    cleanups.push(function () { ro.disconnect(); });
    return ro;
  }

  /*
   * appendChild() tidak bisa dibatalkan lewat removeEventListener(): melepas
   * listener tidak mengeluarkan node-nya dari DOM tree. Jadi ia side
   * effect tersendiri dan butuh pendaftarnya sendiri.
   *
   * Kenapa itu jadi masalah di sini: StrictMode menjalankan efek dengan
   * urutan mount -> unmount -> mount pada node host yang SAMA — React tidak
   * membuat ulang DOM-nya di antara keduanya. Setiap appendChild yang tidak
   * terdaftar karena itu berjalan dua kali dan hasilnya menumpuk, bukan
   * menimpa.
   *
   * Terukur sebelum diperbaiki: .chapter-dot berjumlah 12 (seharusnya 6),
   * anak .marquee-track 7 (seharusnya 4). Tidak ada satu pun error yang
   * terlempar. Yang tersisa dari mount pertama sudah kehilangan
   * listener-nya, jadi chapter bar-nya tampil utuh tapi separuh titiknya diam
   * saat diklik — dan marquee ikut salah karena `half = scrollWidth / 2`
   * dihitung dari lebar yang sudah telanjur berlipat.
   *
   * Khusus appendChild. Penetapan innerHTML tidak perlu lewat sini: ia
   * mengganti isi, bukan menambah, jadi sudah idempoten.
   */
  function addNode(parent, node) {
    parent.appendChild(node);
    cleanups.push(function () {
      if (node.parentNode === parent) parent.removeChild(node);
    });
    return node;
  }



  /* Lenis yang menggerakkan scroll, jadi ticker GSAP yang harus memanggil rAF —
     dua loop rAF terpisah membuat scroll dan animasi beda satu frame. */
  gsap.ticker.lagSmoothing(0);

  /* ── 1. TOKEN MOTION ─────────────────────────────────────────────────────
   *
   * Ada DUA kurva, bukan satu, dan pembagiannya sengaja:
   *
   *   EASE       motion masuk berjarak jauh (judul naik, card terbang masuk).
   *              Melambat panjang di ujung, jadi elemen terasa mendarat.
   *   EASE_STATE perpindahan keadaan kecil (hover, aktif/nonaktif). Simetris
   *              dan short; kurva mendarat panjang pada jarak 6px justru
   *              terbaca sebagai lag.
   *
   * Untuk apa pun yang digerakkan scroll, easing HARUS "none": kurva di atas
   * posisi yang sudah ditentukan scroll membuat animasi terasa menolak jari.
   */
  var EASE = "power4.out";
  var EASE_SCRUB = "none";
  var DURATION = { quick: 0.3, reveal: 0.7, long: 1.1 };

  /*
   * Kelambatan scrub, dalam detik. Angka (bukan `true`) membuat animasi
   * mengejar posisi scroll selama sekian detik, bukan menempel 1:1. Menempel
   * persis terasa gemetar karena tiap getaran roda mouse langsung tergambar.
   * Yang ter-pin dibuat lebih rapat: saat halaman diam di tempat, kelambatan
   * besar terbaca sebagai kendali yang lepas dari jari.
   */
  var SCRUB = 0.35;
  var SCRUB_PIN = 0.3;
  var STAGGER = 0.07;
  var STAGGER_LETTER = 0.03;

  /* Urutan nilai inset() adalah (atas kanan bawah kiri), jadi nama di bawah
     menyebut DI MANA elemen menempel saat tersembunyi — bukan arah motion-nya. */
  var CLIP = {
    collapsedTop: "inset(0% 0% 100% 0%)",
    collapsedBottom: "inset(100% 0% 0% 0%)",
    visible: "inset(0% 0% 0% 0%)",
  };

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  /*
   * PERANGKAT LEMAH — diukur dari KEMAMPUANNYA, bukan dari lebar viewport-nya.
   *
   * Ini bukan "mode ringan" lama yang dibuang. Yang itu memakai lebar viewport
   * sebagai threshold, dan itu memang salah: lebar viewport bukan ukuran kekuatan,
   * sehingga laptop lemah 1920px justru mendapat jalur terberat sementara
   * tablet kuat mendapat jalur ringan. Yang ini menanyakan langsung.
   *
   * navigator.deviceMemory melaporkan RAM dalam GiB, DIBULATKAN KE BAWAH ke
   * pangkat dua dan dibatasi maksimal 8 — sengaja dibuat kasar supaya tidak
   * bisa dipakai melacak orang. Nilai yang mungkin hanya 0,25 / 0,5 / 1 / 2 /
   * 4 / 8. Jadi ponsel 6 GB melaporkan 4, dan laptop 16 GB melaporkan 8:
   * keduanya jatuh di sisi threshold yang berbeda, persis yang dibutuhkan.
   *
   * hardwareConcurrency hanya dipakai kalau deviceMemory tidak tersedia
   * (Safari belum punya). Ia tidak dipakai bersamaan, karena banyak laptop
   * yang sepenuhnya mampu cuma punya 4 inti — memakainya sebagai syarat
   * tambahan akan memangkas animasi dari perangkat yang sebenarnya sanggup.
   *
   * Kalau kedua-duanya diam, perangkat dianggap KUAT. Lebih baik keliru
   * memberi animasi penuh kepada satu perangkat lemah daripada mencabutnya
   * dari semua orang karena satu browser tidak mau menjawab.
   */
  function weakDevice() {
    var ram = navigator.deviceMemory;
    if (typeof ram === "number" && ram > 0) return ram <= 4;
    var core = navigator.hardwareConcurrency;
    if (typeof core === "number" && core > 0) return core <= 4;
    return false;
  }

  /*
   * Elemen yang sudah terlihat saat halaman dibuka tidak boleh digerakkan
   * scroll: pada scrollY 0 belum ada jarak scroll untuk menggerakkannya, jadi
   * animasinya diam di frame pertama dan isinya tampak terpotong permanen.
   * Yang seperti itu harus digerakkan waktu.
   */
  function visibleOnLoad(el, ratio) {
    return el.getBoundingClientRect().top < window.innerHeight * (ratio || 0.92);
  }

  /* ── 2. DETEKSI PERANGKAT ───────────────────────────────────────────────*/
  var DEVICE = {
    desktop: "(min-width: 900px)",
    tablet: "(min-width: 640px) and (max-width: 899px)",
    mobile: "(max-width: 639px)",
  };

  /* ── 3. BANTU-BANTU ─────────────────────────────────────────────────────*/
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  };

  /* Logo cincin di card keahlian. Jumlah cincinnya berbeda-beda supaya
     keempat card tidak terbaca sebagai satu ikon yang diulang.

     `--i` adalah nomor urut cincin dari dalam ke luar, dan ia dipakai CSS
     untuk menunda riak hover per cincin — lihat blok "LOGO CINCIN" di
     src/index.css. Ditulis di sini, bukan dihitung CSS lewat :nth-child,
     karena jumlah cincin tiap card berbeda dan urutannya sudah diketahui
     persis di titik ini. */
  function buildGlyphs() {
    $$("[data-glyph]").forEach(function (slot) {
      var index = Number(slot.getAttribute("data-glyph")) || 0;
      var rings = 4 + (index % 3);
      var svg = '<svg viewBox="0 0 64 64" aria-hidden="true" class="h-12 w-12 shrink-0">';
      for (var i = 0; i < rings; i++) {
        svg += '<circle class="stage-ring" style="--i:' + i + '" cx="32" cy="32" r="' +
          (5 + i * (26 / rings)) +
          '" fill="none" stroke="currentColor" stroke-width="1" opacity="' + (0.25 + i * 0.14) + '"/>';
      }
      slot.innerHTML = svg + "</svg>";
    });
  }

  /*
   * Odometer: tiap digit adalah kolom 0-9 yang digulung di dalam window
   * setinggi satu baris, seperti argo taksi. Karakter non-digit (titik desimal)
   * dibiarkan diam di tempat.
   *
   * Salinan utuh ber-`sr-only` wajib ada: tiap kolom memuat SELURUH digit dan
   * hanya satu yang terlihat lewat overflow — tanpa salinan itu, menyalin
   * "3.62" menghasilkan deretan angka penuh dan screen reader membacakan
   * sepuluh digit per angka.
   */
  function buildOdometer(el, nilai) {
    var html = '<span class="sr-only">' + nilai + "</span>";
    for (var i = 0; i < nilai.length; i++) {
      var c = nilai[i];
      if (!/\d/.test(c)) {
        html += '<span aria-hidden="true" class="select-none">' + c + "</span>";
        continue;
      }
      html += '<span class="odometer select-none" aria-hidden="true"><span class="odometer-col" data-target="' + c + '">';
      for (var d = 0; d < 10; d++) html += "<span>" + d + "</span>";
      html += "</span></span>";
    }
    el.innerHTML = html;
  }

  function buildOdometers() {
    $$("[data-odometer]").forEach(function (el) {
      buildOdometer(el, el.getAttribute("data-odometer"));
    });
    /* Yang satu ini MENGHITUNG, bukan membaca angka yang ditulis tangan —
       jumlah sertifikat diambil dari jumlah card-nya sendiri, jadi menambah
       sertifikat tidak menyisakan angka yang meleset di bagian lain. */
    $$("[data-odometer-count]").forEach(function (el) {
      buildOdometer(el, String($$(el.getAttribute("data-odometer-count")).length));
    });
  }

  /*
   * Stagger per huruf saat hover. Yang membuatnya hidup bukan motion naiknya,
   * melainkan bahwa tiap huruf berangkat pada saat yang sedikit berbeda.
   * Seluruhnya CSS — yang dikerjakan di sini cuma menyiapkan strukturnya.
   */
  function buildLetterHover() {
    $$("[data-letter-hover]").forEach(function (el) {
      var text = el.getAttribute("data-letter-hover");
      el.className = "inline-flex flex-wrap " + el.className;
      var html = '<span class="sr-only">' + text + "</span>";
      for (var i = 0; i < text.length; i++) {
        var c = text[i];
        if (c === " ") {
          html += '<span aria-hidden="true" class="inline-block w-[0.32em]"></span>';
          continue;
        }
        var delay = "transition-delay:" + i * STAGGER_LETTER + "s";
        html += '<span class="letter-hover relative select-none" aria-hidden="true">' +
          '<span style="' + delay + '">' + c +
          '<span class="absolute left-0 top-full select-none" style="' + delay + '">' + c + "</span>" +
          "</span></span>";
      }
      el.innerHTML = html;
    });
  }

  /*
   * Paragraf dipecah per kata di sini supaya HTML-nya tetap satu kalimat utuh
   * yang bisa dibaca dan disunting.
   *
   * SPASINYA DI ANTARA SPAN, BUKAN DI DALAMNYA — dan ini bukan selera penulisan.
   * Tiap kata adalah `inline-block`, dan CSS membuang spasi yang jatuh di akhir
   * baris sebuah kotak. Spasi yang ditaruh di dalam span karena itu lenyap, dan
   * seluruh kalimat menempel jadi satu kata panjang: "Sayamerancangantarmuka…".
   * Terukur, paragrafnya jadi 118px alih-alih 147px — satu baris lebih short,
   * karena tidak ada lagi tempat untuk memutus baris.
   *
   * Di antara span, spasi itu milik aliran teks induknya, bukan milik kotaknya
   * — jadi ia tetap tergambar DAN tetap jadi titik putus baris yang sah.
   */
  function buildWordScrub() {
    $$("[data-word-scrub]").forEach(function (el) {
      el.innerHTML = el.textContent
        .trim()
        .split(" ")
        .map(function (w) {
          return '<span data-word class="inline-block opacity-[0.16]">' + w + "</span>";
        })
        .join(" ");
    });
  }

  /* Isi marquee digandakan empat kali: saat salinan pertama habis, salinan
     kedua sudah menempati tempatnya persis — tidak pernah ada ujung yang
     terlihat, dan tidak ada lompatan saat ia mengulang. */
  function buildMarquees() {
    $$('[data-anim="marquee"]').forEach(function (root) {
      var track = $(".marquee-track", root);
      var original = $("[data-marquee-copy]", track);
      for (var i = 1; i < 4; i++) {
        var copies = original.cloneNode(true);
        copies.setAttribute("aria-hidden", "true");
        addNode(track, copies);
      }
    });
  }

  /* ── 4. SCROLL HALUS ────────────────────────────────────────────────────*/
  var lenis = null;

  function initScroller() {
    if (prefersReducedMotion()) return;
    lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    addTicker(function (time) { lenis.raf(time * 1000); });
  }

  /* Satu-satunya pintu untuk melompat antar bagian. Jalur cadangan dipakai
     kalau Lenis tidak menyala (reduced motion); ia tidak bisa meniru durasi
     dan kurva per panggilan — scroll bawaan browser hanya kenal "smooth". */
  function scrollTo(target, opts) {
    if (lenis) {
      lenis.scrollTo(target, opts || {});
      return;
    }
    var top = typeof target === "number" ? target : ($(target) || {}).offsetTop || 0;
    window.scrollTo({ top: top, behavior: "smooth" });
  }

  /* ── 5. TRANSISI ────────────────────────────────────────────────────────*/

  /*
   * MASK NAIK — dipakai untuk judul. Tiap baris berdiri di dalam kotak
   * overflow-hidden dan didorong dari bawah kotak itu, sehingga huruf seolah
   * muncul dari balik garis alih-alih memudar di tempat.
   *
   * `y: 0` di kedua ujung itu WAJIB, bukan hiasan. Keadaan awal ditulis di CSS
   * sebagai transform supaya teks tidak sempat berkedip sebelum GSAP mengambil
   * alih. Tapi GSAP membaca transform yang sudah menempel, mengurainya jadi
   * offset piksel, lalu menumpuk yPercent DI ATASNYA — sehingga saat animasi
   * mendarat di yPercent 0, sisa piksel dari CSS masih tertinggal dan barisnya
   * berhenti di bawah mask-nya.
   */
  function initLineMasks() {
    $$("[data-line-mask]").forEach(function (el) {
      var inner = $$('[data-anim="line-mask"] > span', el);
      if (!inner.length) return;

      if (prefersReducedMotion()) {
        gsap.set(inner, { yPercent: 0 });
        return;
      }

      var delay = Number(el.getAttribute("data-delay")) || 0;
      var stagger = Number(el.getAttribute("data-stagger")) || STAGGER;
      var onLoad = visibleOnLoad(el);

      gsap.fromTo(
        inner,
        { yPercent: 125, y: 0 },
        onLoad
          ? { yPercent: 0, y: 0, duration: DURATION.long, ease: EASE, delay: delay, stagger: stagger }
          : {
              yPercent: 0, y: 0, duration: DURATION.long, ease: EASE, stagger: stagger,
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            },
      );
    });
  }

  /*
   * REVEAL TER-SCRUB — bukan di-trigger lalu jalan sendiri.
   *
   * Bedanya mendasar. Versi terpicu hanya menunggu elemen masuk viewport lalu
   * memutar animasi sampai habis; berhenti men-scroll tidak menghentikan apa
   * pun, dan scroll mundur tidak mengembalikan apa pun. Versi ini memetakan
   * kemajuan animasi ke jarak scroll.
   */
  function initScrubReveals() {
    $$('[data-component="scrub-reveal"]').forEach(function (el) {
      if (prefersReducedMotion()) {
        gsap.set(el, { clipPath: CLIP.visible, y: 0 });
        return;
      }

      var delay = Number(el.getAttribute("data-delay")) || 0;

      if (visibleOnLoad(el)) {
        gsap.fromTo(
          el,
          { clipPath: CLIP.collapsedTop, y: 40 },
          { clipPath: CLIP.visible, y: 0, duration: DURATION.reveal, delay: delay, ease: EASE },
        );
        return;
      }

      /* Window-nya sengaja PENDEK dan RENDAH: reveal selesai tak lama
         setelah elemennya masuk dari tepi bawah screen. Pada bagian yang isinya
         bertumpuk, tiap blok menunggu gilirannya sendiri — jadi keterlambatan
         kecil di satu elemen berlipat jadi bagian yang tak pernah terlihat
         utuh meski sudah di-scroll jauh. */
      var desktop = window.matchMedia(DEVICE.desktop).matches;
      gsap.fromTo(
        el,
        { clipPath: CLIP.collapsedTop, y: 40 },
        {
          clipPath: CLIP.visible, y: 0, ease: EASE_SCRUB,
          /* clamp() menahan window trigger tetap di dalam rentang scroll yang
             benar-benar ada. Tanpa itu, elemen di dasar dokumen punya titik
             akhir di luar jangkauan scroll — animasinya tidak pernah selesai
             dan teksnya tinggal terpotong selamanya. */
          scrollTrigger: {
            trigger: el,
            start: desktop ? "clamp(top 95%)" : "clamp(top 100%)",
            end: desktop ? "clamp(top 80%)" : "clamp(top 76%)",
            scrub: SCRUB,
          },
        },
      );
    });
  }

  /*
   * GAMBAR DENGAN BAND SAPUAN — sebuah bidang warna mengisi area dari atas ke
   * bawah, lalu meluncur terus ke bawah dan keluar sambil gambarnya terbuka di
   * belakangnya. Yang terbaca mata adalah satu band warna yang menyapu turun
   * dan meninggalkan gambar — bukan gambar yang memudar masuk.
   */
  function initRevealImages() {
    $$('[data-component="image-reveal"]').forEach(function (el) {
      var bg = $(".bg", el);
      var media = $(".media", el);
      if (!media) return;

      if (prefersReducedMotion()) {
        gsap.set(media, { clipPath: CLIP.visible });
        return;
      }

      var delay = Number(el.getAttribute("data-delay")) || 0;
      var onLoad = el.getBoundingClientRect().top < window.innerHeight * 0.9;

      var tl = gsap.timeline(
        onLoad
          ? { defaults: { ease: EASE }, delay: delay }
          : {
              defaults: { ease: "none" },
              scrollTrigger: { trigger: el, start: "clamp(top 90%)", end: "clamp(bottom 88%)", scrub: SCRUB },
            },
      );

      var unit = onLoad ? 1 : 0.6;
      tl.to(bg, { clipPath: CLIP.visible, duration: unit * 0.7 })
        .to(bg, { clipPath: CLIP.collapsedBottom, duration: unit })
        .to(media, { clipPath: CLIP.visible, duration: unit }, "<");
    });
  }

  /*
   * PARAGRAF YANG MENYALA KATA DEMI KATA — kebalikan dari reveal biasa. Reveal
   * yang menyembunyikan teks memaksa pengunjung menunggu sebelum boleh
   * membaca; di sini teksnya justru ditawarkan lebih dulu, dan scroll hanya
   * mengatur temponya.
   */
  function initWordScrub() {
    $$("[data-word-scrub]").forEach(function (el) {
      var spans = $$("[data-word]", el);
      if (!spans.length) return;

      if (prefersReducedMotion()) {
        gsap.set(spans, { opacity: 1 });
        return;
      }

      gsap.fromTo(
        spans,
        { opacity: 0.16 },
        {
          opacity: 1, ease: EASE_SCRUB,
          /* Jaraknya short supaya selalu ada beberapa kata setengah menyala
             sekaligus — kalau tiap kata menunggu kata sebelumnya selesai,
             hasilnya terbaca patah-patah seperti mesin tik. */
          stagger: { each: 0.25 / spans.length, from: "start" },
          scrollTrigger: { trigger: el, start: "clamp(top 82%)", end: "clamp(bottom 80%)", scrub: 0.4 },
        },
      );
    });
  }

  /*
   * DUA BARIS YANG SALING MENUTUP — baris atas datang dari kiri, baris bawah
   * dari kanan, bertemu di tengah. Transisi paling mencolok di situs ini, jadi
   * hanya dipakai sekali: di titik halaman berbalik dari gelap ke terang.
   */
  function initSplitWords() {
    $$("[data-split-words]").forEach(function (el) {
      if (prefersReducedMotion()) return;
      var top = $(".top-word", el);
      var bottom = $(".bottom-word", el);
      if (!top || !bottom) return;

      /*
       * WINDOW-nya PANJANG, DAN SENGAJA PALING PANJANG DI SITUS INI.
       *
       * Dulu "top 95%" sampai "center 80%" — sekitar 227px scroll di ponsel.
       * Pada jarak sependek itu kedua barisnya sudah bertemu sebelum mata
       * sempat mendaftar bahwa mereka datang dari arah berlawanan, dan yang
       * tersisa cuma kesan judul yang berkedut.
       *
       * Sekarang "top 100%" sampai "center 52%": ~505px, lebih dari dua kali
       * lipat. Ini transisi paling mencolok di halaman dan dipakai SEKALI
       * saja, di titik halaman berbalik dari gelap ke terang — ia satu-satunya
       * yang pantas menuntut jarak sepanjang itu. Jangan jadikan angka ini
       * patokan untuk reveal lain; yang lain justru harus short.
       */
      var tl = gsap.timeline({
        defaults: { ease: EASE_SCRUB },
        scrollTrigger: { trigger: el, start: "clamp(top 100%)", end: "clamp(center 52%)", scrub: SCRUB },
      });
      tl.fromTo(top, { xPercent: -70 }, { xPercent: 0, duration: 1 }, 0);
      tl.fromTo(bottom, { xPercent: 70 }, { xPercent: 0, duration: 1 }, 0);
    });
  }

  /*
   * ODOMETER — tiap kolom punya durasi yang sedikit berbeda (semakin ke kanan
   * semakin lama). Kalau semua kolom mendarat bersamaan, hasilnya terbaca
   * sebagai satu gambar yang digeser; perbedaan kecil itulah yang membuatnya
   * terbaca sebagai mesin dengan beberapa roda.
   */
  function initOdometers() {
    $$(".odometer-value").forEach(function (el) {
      var cols = $$(".odometer-col", el);
      if (!cols.length) return;

      if (prefersReducedMotion()) {
        cols.forEach(function (col) {
          gsap.set(col, { yPercent: -10 * Number(col.dataset.target) });
        });
        return;
      }

      cols.forEach(function (col, i) {
        gsap.fromTo(
          col,
          { yPercent: 0 },
          {
            yPercent: -10 * Number(col.dataset.target),
            duration: 1.5 + i * 0.16,
            ease: EASE,
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          },
        );
      });
    });
  }

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
   * lihat blok "LOGO CINCIN" di src/index.css.
   *
   * `once: true`, bukan scrub. Menggambar garis adalah peristiwa sekali jadi;
   * memetakannya ke scroll berarti cincinnya terhapus lagi saat di-scroll balik,
   * dan logo yang terurai sendiri terbaca sebagai rusak.
   */
  function initGlyphRings() {
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
   * Keahlian.jsx, bukan ditumpuk: keduanya sama-sama menganimasikan
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
  function initRoleCards() {
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
     * HIGHLIGHT YANG MENGIKUTI KURSOR — pola spotlight MagicBento, tapi bagian
     * JavaScript-nya tinggal dua baris karena bentuk dan warnanya sepenuhnya
     * diurus CSS (lihat blok "HIGHLIGHT KURSOR DI CARD PERAN" di index.css).
     * Yang dikerjakan di sini cuma memberi tahu CSS di mana kursornya.
     *
     * DIBATASI SATU TULISAN PER FRAME. Tanpa penjaga rAF ini, pointermove
     * bisa terkirim jauh lebih sering daripada screen menggambar — di pointer
     * bertingkat tinggi ratusan kali per detik — dan tiap tulisan ke --mx/--my
     * membatalkan gambar ulang gradien card-nya. Yang tergambar toh cuma nilai
     * terakhir sebelum frame, jadi sisanya kerja yang dibuang.
     *
     * getBoundingClientRect dipanggil di dalam frame, bukan disimpan: card
     * yang sedang disorot punya skala 1,012 dan naik 6px, jadi kotaknya
     * memang bergerak selama transisi. Menyimpannya membuat highlight meleset
     * dari kursor selama 0,45 detik pertama.
     */
    var dots = { el: null, x: 0, y: 0 };
    var rafDots = 0;
    function buildDots() {
      rafDots = 0;
      if (!dots.el) return;
      var r = dots.el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      dots.el.style.setProperty("--mx", ((dots.x - r.left) / r.width) * 100 + "%");
      dots.el.style.setProperty("--my", ((dots.y - r.top) / r.height) * 100 + "%");
    }
    cleanups.push(function () {
      if (rafDots) cancelAnimationFrame(rafDots);
      cards.forEach(function (k) {
        k.style.removeProperty("--mx");
        k.style.removeProperty("--my");
      });
    });

    var canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    cards.forEach(function (k, i) {
      listen(k, "pointerenter", function () { if (canHover.matches) highlight(i); });
      listen(k, "pointermove", function (e) {
        if (!canHover.matches) return;
        dots.el = k;
        dots.x = e.clientX;
        dots.y = e.clientY;
        if (!rafDots) rafDots = requestAnimationFrame(buildDots);
      }, { passive: true });
      /* Titiknya dikembalikan ke bawaan CSS saat kursor pergi, bukan
         dibiarkan di posisi terakhir. Kalau tidak, card yang nanti dipilih
         scroll di perangkat hibrida menyala dengan highlight di tepi acak —
         sisa dari kursor yang sudah lama tidak ada. */
      listen(k, "pointerleave", function () {
        k.style.removeProperty("--mx");
        k.style.removeProperty("--my");
      });
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

  /*
   * MARQUEE TAK BERUJUNG YANG MEMBACA ARAH SCROLL.
   *
   * Satu-satunya motion yang berjalan sendiri tanpa menunggu scroll — denyut
   * latar, supaya screen tidak pernah benar-benar mati. Arahnya mengikuti arah
   * scroll, jadi ia terasa terhubung dengan tangan pengunjung.
   */
  function initMarquees() {
    if (prefersReducedMotion()) return;

    $$('[data-anim="marquee"]').forEach(function (root) {
      var track = $(".marquee-track", root);
      var speed = Number(root.getAttribute("data-speed")) || 45;
      var half = track.scrollWidth / 2;
      var offset = 0;
      var direction = 1;

      var setX = gsap.quickSetter(track, "x", "px");

      addTicker(function (_t, deltaMs) {
        /* deltaMs dari ticker GSAP, bukan selisih timestamp sendiri — supaya
           kecepatannya sama di screen 60Hz maupun 120Hz. */
        offset += (speed * direction * deltaMs) / 1000;
        /* Modulo dua arah: sisa negatif dikembalikan ke rentang positif, kalau
           tidak marquee melompat saat arahnya berbalik. */
        offset = ((offset % half) + half) % half;
        setX(-offset);
      });

      ScrollTrigger.create({
        trigger: document.body, start: 0, end: "max",
        onUpdate: function (self) {
          direction = self.direction === -1 ? -1 : 1;
          offset += Math.min(Math.abs(self.getVelocity()) / 260, 7) * direction;
        },
      });

      observe(track, function () { half = track.scrollWidth / 2; });
    });
  }

  /*
   * STACK CARD PENGALAMAN — yang depan dibaca utuh, yang belakang
   * mengintip di sudut, dan tiap beberapa detik yang depan jatuh lalu masuk
   * ke belakang stack. Polanya CardSwap dari reactbits.dev.
   *
   * SLOT. Card di slot ke-i digeser x +i*dx, y -i*dy, z -i*dz, diperkecil,
   * dan zIndex-nya menurun. Posisinya diturunkan dari NOMOR SLOT, bukan
   * disimpan per card; berputar cuma berarti memutar isi array `urutan` lalu
   * menata ulang. Tidak ada keadaan yang bisa menyimpang sendiri.
   *
   * TINGGINYA DIUKUR, TIDAK DIPATOK. CardSwap aslinya memakai ukuran tetap
   * 500x400 dan isi yang lebih panjang terpotong begitu saja. Di sini tinggi
   * stack = card TERTINGGI + ruang untuk card belakang mengintip,
   * dihitung ulang lewat ResizeObserver di tiap card. Rincian pekerjaan
   * boleh sepanjang apa pun tanpa satu baris pun hilang.
   *
   * HANYA CARD BELAKANG YANG DIMIRINGKAN. Aslinya seluruh stack di-skew,
   * termasuk yang sedang dibaca. Teks CV yang miring melelahkan dibaca, dan
   * card depan di sini justru satu-satunya yang memang untuk dibaca.
   *
   * TANPA JAVASCRIPT CARD-nya TETAP TERBACA. Posisi absolut baru dipasang
   * setelah class .swap-ready ditambahkan dari sini; sebelum itu card-nya
   * mengalir ke bawah sebagai daftar biasa. Kalau skripnya gagal dimuat, yang
   * tersisa daftar pengalaman yang utuh, bukan stack yang saling menimpa.
   */
  function initCardSwap() {
    var root = $('[data-component="swap"]');
    if (!root) return;

    var stack = $("[data-swap-stack]", root);
    var cards = $$("[data-card]", stack || root);
    if (!stack || cards.length < 2) return;

    var controls = $("[data-swap-controls]", root);

    var order = cards.map(function (_, i) { return i; });

    /*
     * SATU UKURAN UNTUK SEMUA LEBAR.
     *
     * Sampai 10 Agustus 2026 ponsel punya angkanya sendiri: dx 12, dy 12, dan
     * `miring: 0`. Yang terakhir itu yang paling terasa — tanpa kemiringan,
     * card belakang cuma jadi garis tipis yang mengintip 12px di atas card
     * depan, dan stack-nya tidak terbaca sebagai stack sama sekali. Yang
     * dilihat pengunjung ponsel praktis satu card biasa.
     *
     * dx 22, BUKAN 26 seperti angka desktop lama, dan itu batas yang dihitung
     * bukan dikira. Card belakang digeser dx ke kanan lalu diperkecil 0,96.
     * Pada screen tersempit yang diuji (320px): padding halaman 16, lebar
     * card 288, lebar tampak setelah skala 276,5, dan sisa 5,8 di tiap sisi.
     * Tepi kanannya jadi 16 + dx + 5,8 + 276,5 = 298,3 + dx, jadi dx di atas
     * 21,7 mendorongnya keluar screen. 22 pas di bawah itu, dan di desktop
     * selisih 4px dari angka lama tidak terlihat.
     *
     * skewY tidak menambah lebar — ia menggeser secara vertikal sebagai fungsi
     * x — jadi ia tidak ikut dihitung di atas.
     */
    function metrics() {
      return { dx: 22, dy: 22, dz: 60, susut: 0.04, miring: 4, jatuh: 140 };
    }

    function slot(i) {
      var u = metrics();
      return {
        x: i * u.dx, y: -i * u.dy, z: -i * u.dz,
        scale: 1 - i * u.susut,
        skewY: i === 0 ? 0 : u.miring,
        /* 0,8 bukan 0,55: card belakang berlatar --surface (#101218) di atas
           --background (#040508), jadi meredupkannya terlalu jauh membuatnya
           lenyap dan stack terbaca sebagai satu card biasa. */
        autoAlpha: i === 0 ? 1 : 0.8,
        zIndex: cards.length - i,
      };
    }

    /* Card belakang dikeluarkan dari urutan tab DAN dari screen reader.
       aria-hidden saja tidak cukup: link di dalamnya tetap bisa difokus
       keyboard, dan fokus yang mendarat di sesuatu yang tidak terlihat adalah
       cara tercepat membuat halaman terasa rusak. */
    function mark() {
      order.forEach(function (idx, i) {
        cards[idx].inert = i !== 0;
        cards[idx].setAttribute("aria-hidden", i === 0 ? "false" : "true");
      });
      if (!controls) return;
      $$("[data-swap-dot]", controls).forEach(function (b, i) {
        var active = order[0] === i;
        b.setAttribute("aria-selected", active ? "true" : "false");
        b.tabIndex = active ? 0 : -1;
      });
    }

    /*
     * SATU timeline hidup pada satu waktu, dan yang lama DIBUNUH lebih dulu.
     *
     * Ini memperbaiki cacat yang terlihat sebagai card belakang menembus
     * card depan. Penyebabnya bukan z-index atau latar tembus pandang --
     * keduanya terukur benar (z 2 lawan 1, opacity 1, latar rgb(16,18,24)
     * opak). Penyebabnya balapan: rotate() menjadwalkan tl.set(zIndex) pada
     * detik 0,4 dan tl.to(autoAlpha) pada 0,42. Kalau pengguna menekan selector
     * dot sebelum itu, relayout() memasang nilai yang benar, lalu penjadwalan
     * lama menimpanya sepersekian detik kemudian.
     *
     * zIndex disetel langsung ke style, bukan lewat GSAP, supaya ia berpindah
     * SEKETIKA -- card yang naik harus sudah berada di atas sebelum satu
     * frame pun digambar.
     */
    var tlActive = null;
    function killTl() {
      if (tlActive) { tlActive.kill(); tlActive = null; }
    }
    cleanups.push(killTl);

    function relayout(beranimasi) {
      killTl();
      var d = beranimasi && !prefersReducedMotion() ? 0.55 : 0;
      var tl = gsap.timeline();
      order.forEach(function (idx, i) {
        var s = slot(i);
        cards[idx].style.zIndex = s.zIndex;
        tl.to(cards[idx], {
          x: s.x, y: s.y, z: s.z, scale: s.scale, skewY: s.skewY,
          autoAlpha: s.autoAlpha, duration: d, ease: EASE,
        }, 0);
      });
      tlActive = tl;
      mark();
    }

    function rotate() {
      killTl();
      var exitIdx = order[0];
      var exit = cards[exitIdx];
      order.push(order.shift());

      var u = metrics();
      var akhir = slot(order.indexOf(exitIdx));
      var tl = gsap.timeline();

      /* Jatuh sampai hilang DULU, baru dipindahkan ke slot belakang. Kalau
         langsung ditweenkan ke sana, ia terlihat menyelinap menembus card
         yang sedang naik. */
      tl.to(exit, { y: "+=" + u.jatuh, autoAlpha: 0, duration: 0.4, ease: "power2.in" }, 0);
      tl.call(function () { exit.style.zIndex = akhir.zIndex; }, null, 0.4);
      tl.set(exit, {
        x: akhir.x, y: akhir.y, z: akhir.z, scale: akhir.scale,
        skewY: akhir.skewY,
      }, 0.4);
      tl.to(exit, { autoAlpha: akhir.autoAlpha, duration: 0.45, ease: EASE }, 0.42);

      order.forEach(function (idx, i) {
        if (idx === exitIdx) return;
        var s = slot(i);
        tl.call(function () { cards[idx].style.zIndex = s.zIndex; }, null, 0.1);
        tl.to(cards[idx], {
          x: s.x, y: s.y, z: s.z, scale: s.scale, skewY: s.skewY,
          autoAlpha: s.autoAlpha, duration: 0.55, ease: EASE,
        }, 0.1);
      });

      tlActive = tl;
      mark();
    }

    /*
     * Dua jalan, dan yang dipilih bergantung SEBERAPA JAUH lompatannya.
     *
     * Kalau yang diminta card tepat berikutnya, rotate() yang dipakai: card
     * depan jatuh sampai hilang DULU, baru dipindahkan ke slot belakang.
     * relayout() akan menweenkannya langsung ke sana, dan ia terlihat menyelinap
     * menembus card yang sedang naik — cacat yang justru jadi alasan rotate()
     * ditulis, dan yang dulu tidak pernah muncul karena rotate() selalu
     * dipanggil timer. Begitu timer-nya dibuang, rotate()
     * sempat jadi kode mati dan cacat itu ikut kembali.
     *
     * Untuk lompatan lebih jauh relayout() yang benar: rotate() cuma tahu cara
     * maju satu langkah. Dengan dua card cabang itu belum pernah terpakai,
     * tapi ia yang membuat penambahan card ketiga nanti tidak diam-diam
     * salah.
     */
    function select(idx) {
      if (order[0] === idx) return;
      if (order[1] === idx) { rotate(); return; }
      var pos = order.indexOf(idx);
      order = order.slice(pos).concat(order.slice(0, pos));
      relayout(true);
    }

    /*
     * SELECTOR dot — dan sejak 10 Agustus 2026 ia SATU-SATUNYA cara stack
     * ini berpindah.
     *
     * Perputaran otomatis tiap 5,2 detik dibuang seluruhnya. Alasannya sudah
     * separuh tertulis di kode lamanya sendiri: begitu pengunjung memilih
     * sendiri, perputaran dimatikan untuk seterusnya, "card yang bergeser
     * sendiri saat sedang dibaca adalah gangguan, bukan animasi". Kalimat itu
     * benar sebelum ada yang mengetuk juga — isi card-nya paragraf pekerjaan
     * yang menuntut waktu baca, dan lima detik tidak cukup untuk card
     * terpanjang. Sekarang ia diam sampai diminta pindah.
     *
     * Dibuat dari JUMLAH card lewat addNode() supaya ikut di-teardown.
     * Ia juga satu-satunya jalan keyboard ke card yang sedang tidak di depan,
     * karena card belakang sengaja di-inert — itulah sebabnya area sentuhnya
     * 44px meski bar yang terlihat cuma 4px.
     */
    if (controls) {
      cards.forEach(function (_, i) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "swap-dot";
        b.setAttribute("data-swap-dot", "");
        b.setAttribute("role", "tab");
        b.setAttribute("aria-label", "Pengalaman ke-" + (i + 1));
        listen(b, "click", function () { select(i); });
        listen(b, "keydown", function (e) {
          var forward = e.key === "ArrowRight" || e.key === "ArrowDown";
          var backward = e.key === "ArrowLeft" || e.key === "ArrowUp";
          if (!forward && !backward) return;
          e.preventDefault();
          var destIdx = (i + (forward ? 1 : -1) + cards.length) % cards.length;
          select(destIdx);
          $$("[data-swap-dot]", controls)[destIdx].focus();
        });
        addNode(controls, b);
      });
    }

    /*
     * SEMUA CARD DISAMAKAN SETINGGI YANG TERTINGGI, bukan cuma container-nya.
     *
     * Ini bukan kerapian. Terukur di 390x844: card Guru Informatika 761px
     * (lima butir rincian) dan Staf Administrasi 615px (empat butir). Saat
     * yang short berada di depan, yang tinggi di belakangnya menyembul 146px
     * di bawah dan isinya terbaca di samping card depan -- stack-nya
     * terlihat seperti dua card yang salah tumpuk, bukan satu stack.
     * Skala 0,955 tidak menolong karena 761 x 0,955 masih lebih besar dari
     * 615.
     *
     * Tinggi dilepas ke auto DULU sebelum diukur: tanpa itu yang terbaca
     * adalah tinggi yang dipasang putaran sebelumnya, dan card-nya tidak akan
     * pernah bisa mengecil lagi saat screen melebar.
     *
     * Penjaga `measuring` memutus umpan balik: menyetel tinggi card men-trigger
     * ResizeObserver yang mengamati card itu sendiri.
     */
    var measuring = false;
    function measure() {
      if (measuring) return;
      measuring = true;

      var u = metrics();
      var space = (cards.length - 1) * u.dy;

      cards.forEach(function (k) { k.style.height = "auto"; });
      var height = 0;
      cards.forEach(function (k) { height = Math.max(height, k.offsetHeight); });
      cards.forEach(function (k) { k.style.height = height + "px"; });

      stack.style.setProperty("--swap-top", space + "px");
      stack.style.height = height + space + "px";

      requestAnimationFrame(function () { measuring = false; });
    }

    root.classList.add("swap-ready");
    cleanups.push(function () { root.classList.remove("swap-ready"); });

    cards.forEach(function (k) { observe(k, measure); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);

    /*
     * TIDAK ADA LAGI LISTENER DI SINI, dan itu akibat dibuangnya perputaran
     * otomatis. Kelima listener yang dulu berdiri di tempat ini —
     * pointerenter, pointerleave, focusin, focusout, dan visibilitychange —
     * semuanya cuma melayani satu hal: menjeda dan melanjutkan timer.
     * Tidak ada timer, tidak ada yang perlu dijeda.
     *
     * Listener media query juga hilang bersama ukuran khusus ponsel; sejak
     * ukurannya satu untuk semua lebar, ResizeObserver di tiap card sudah
     * menangkap semua perubahan yang perlu diukur ulang.
     */
    measure();
    relayout(false);
  }


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
  function initAccordionGallery() {
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


  /*
   * LATAR HIDUP — MEDAN GARIS.
   *
   * Bidang gelap sebesar screen penuh tanpa apa-apa di belakangnya terbaca
   * sebagai halaman gagal muat, bukan keputusan desain. Kontrasnya sangat
   * rendah; yang dirasakan pengunjung adalah ruangnya "bernafas". Kursor
   * menariknya — satu-satunya hal di situs yang menanggapi motion mouse tanpa
   * harus diklik. Berhenti sendiri saat di luar screen.
   */
  function initAmbientLines() {
    $$('canvas[data-component="ambient-lines"]').forEach(function (canvas) {
      if (prefersReducedMotion()) return;

      var density = Number(canvas.getAttribute("data-density")) || 46;
      var ctx = canvas.getContext("2d");
      var raf = 0, running = false, w = 0, h = 0;
      var pointer = { x: -9999, y: -9999 };
      var lines = [];

      function build() {
        var rect = canvas.getBoundingClientRect();
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = rect.width; h = rect.height;
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        lines = [];
        for (var i = 0; i < density; i++) {
          lines.push({
            x: Math.random() * w, y: Math.random() * h,
            len: 40 + Math.random() * 190,
            angle: (Math.random() - 0.5) * 1.5 + Math.PI / 2.6,
            speed: 0.04 + Math.random() * 0.16,
            alpha: 0.05 + Math.random() * 0.16,
          });
        }
      }

      function draw() {
        ctx.clearRect(0, 0, w, h);
        for (var i = 0; i < lines.length; i++) {
          var line = lines[i];
          /* Hanyut pelan ke bawah; yang keluar dari bawah dikembalikan ke atas
             supaya medannya tidak pernah habis. */
          line.y += line.speed;
          if (line.y - line.len > h) { line.y = -line.len; line.x = Math.random() * w; }

          var angle = line.angle, alpha = line.alpha;
          var dx = pointer.x - line.x, dy = pointer.y - line.y;
          var dist = Math.hypot(dx, dy);
          var REACH = 190;
          if (dist < REACH) {
            /* Makin dekat kursor, makin kuat garis ikut menghadap ke arahnya. */
            var pull = 1 - dist / REACH;
            angle += (Math.atan2(dy, dx) - angle) * pull * 0.55;
            alpha += pull * 0.5;
          }

          ctx.beginPath();
          ctx.strokeStyle = "rgba(216, 216, 216, " + Math.min(alpha, 0.7) + ")";
          ctx.lineWidth = 1;
          ctx.moveTo(line.x, line.y);
          ctx.lineTo(line.x + Math.cos(angle) * line.len, line.y + Math.sin(angle) * line.len);
          ctx.stroke();
        }
        raf = requestAnimationFrame(draw);
      }

      build();

      /* Canvas di luar screen tidak perlu menggambar apa pun. */
      var io = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          if (!running) { running = true; raf = requestAnimationFrame(draw); }
        } else {
          running = false; cancelAnimationFrame(raf);
        }
      }, { threshold: 0 });
      io.observe(canvas);
      cleanups.push(function () { io.disconnect(); running = false; cancelAnimationFrame(raf); });

      observe(canvas, build);

      listen(window, "pointermove", function (e) {
        var rect = canvas.getBoundingClientRect();
        pointer.x = e.clientX - rect.left;
        pointer.y = e.clientY - rect.top;
      }, { passive: true });
      listen(window, "pointerleave", function () { pointer.x = -9999; pointer.y = -9999; });
    });
  }

  /* ── 6. PERILAKU ────────────────────────────────────────────────────────*/

  /*
   * TIMER-NYA DIDAFTARKAN, dan sampai 9 Agustus 2026 ia satu-satunya side
   * effect di file ini yang TIDAK — melanggar aturan yang ditulis di
   * kepala file ini sendiri.
   *
   * Gejalanya persis yang diperingatkan komentar itu, dan persis jenis cacat
   * yang tidak pernah melempar error: StrictMode memasang efek dua kali pada
   * node DOM yang SAMA, jadi ada dua putaran ketik menulisi satu <span>
   * bergantian. Yang terlihat huruf yang berkedut dan kata yang kadang
   * melompat — mudah disalahartikan sebagai masalah performa, padahal murni
   * dua timer yang berebut.
   *
   * Di produksi StrictMode tidak menggandakan, jadi cacatnya tidak terlihat
   * di sana. Yang tetap berlaku di produksi: tanpa pendaftaran ini timernya
   * hidup selamanya setelah di-teardown.
   */
  function initTypewriter() {
    var el = $("[data-typewriter]");
    if (!el) return;
    var words = JSON.parse(el.getAttribute("data-typewriter"));
    var wordIndex = 0, indexHuruf = 0, sedangHapus = false;
    var id = 0;
    cleanups.push(function () { clearTimeout(id); });

    (function ketik() {
      var word = words[wordIndex];
      var gap = sedangHapus ? 50 : 100;
      indexHuruf += sedangHapus ? -1 : 1;
      el.textContent = word.substring(0, indexHuruf);

      if (!sedangHapus && indexHuruf === word.length) {
        sedangHapus = true; gap = 1500;
      } else if (sedangHapus && indexHuruf === 0) {
        sedangHapus = false;
        wordIndex = (wordIndex + 1) % words.length;
        gap = 300;
      }
      id = setTimeout(ketik, gap);
    })();
  }

  /*
   * BAR STATUS — pengganti navbar. Fungsinya sama, memberi tahu posisi, tapi
   * tanpa meminta perhatian.
   *
   * Pergantiannya bukan fade. Kata lama naik keluar dan kata baru menyusul dari
   * bawah, di dalam window setinggi satu baris. Fade antar dua kata berbeda
   * menghasilkan momen di mana keduanya terbaca sekaligus dan tak satu pun
   * terbaca jelas; motion vertikal tidak pernah punya masalah itu.
   */
  var CHAPTERS = [
    { id: "tentang", label: "Tentang" },
    { id: "pengalaman", label: "Pengalaman" },
    { id: "keahlian", label: "Keahlian" },
    { id: "pendidikan", label: "Pendidikan" },
    { id: "sertifikat", label: "Sertifikat" },
    { id: "kontak", label: "Kontak" },
  ];

  function initStatusBar() {
    var bar = $(".status-bar");
    if (!bar) return;

    var labelEl = $("[data-status-label]", bar);
    var countEl = $("[data-status-count]", bar);
    var dotsEl = $("[data-status-dots]", bar);
    var jumpBtn = $("[data-status-jump]", bar);
    var index = 0, prevIndex = 0;
    var total = String(CHAPTERS.length).padStart(2, "0");

    CHAPTERS.forEach(function (chapter, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", chapter.label);
      b.className = "chapter-dot group pointer-events-auto relative flex h-6 w-6 cursor-pointer items-center justify-center" +
        (i === CHAPTERS.length - 1 ? " chapter-dot--last" : "");
      /* Nama bagiannya muncul tepat di atas garis saat disentuh. `aria-hidden`
         karena tombolnya sudah punya aria-label dengan teks yang sama. */
      b.innerHTML = '<span aria-hidden="true" class="chapter-tip -caption-small">' + chapter.label + "</span>" +
        '<span data-dot class="block h-px transition-all duration-500 ease-brand w-2 bg-line group-hover:w-4 group-hover:bg-text-muted"></span>';
      listen(b, "click", function () { scrollTo("#" + chapter.id); });
      addNode(dotsEl, b);
    });
    var dots = $$("[data-dot]", dotsEl);

    function render() {
      labelEl.textContent = CHAPTERS[index].label;
      countEl.textContent = String(index + 1).padStart(2, "0") + "/" + total;
      dots.forEach(function (d, i) {
        /* Titik kecil yang memanjang jadi garis saat aktif — perubahan bentuk
           terbaca lebih cepat daripada perubahan warna saja. */
        d.className = "block h-px transition-all duration-500 ease-brand " +
          (i === index ? "w-6 bg-text" : "w-2 bg-line group-hover:w-4 group-hover:bg-text-muted");
      });

      if (prefersReducedMotion() || prevIndex === index) { prevIndex = index; return; }
      /* Arah masuknya mengikuti arah perpindahan bagian: maju berarti kata baru
         datang dari bawah, mundur berarti dari atas. */
      var down = index > prevIndex;
      prevIndex = index;
      gsap.fromTo(labelEl, { yPercent: down ? 110 : -110 }, { yPercent: 0, duration: 0.55, ease: EASE });
    }
    render();

    CHAPTERS.forEach(function (chapter, i) {
      var el = document.getElementById(chapter.id);
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        /* Threshold di tengah screen: bagian dianggap aktif begitu ia melewati
           titik pandang, bukan begitu tepi atasnya menyentuh screen. Tanpa itu
           marker berkedip bolak-balik di batas antar bagian. */
        start: "top 50%", end: "bottom 50%",
        onToggle: function (self) { if (self.isActive) { index = i; render(); } },
      });
    });

    listen(jumpBtn, "click", function () { scrollTo("#" + CHAPTERS[index].id); });

    /*
     * WARNA BAR MENGIKUTI BAND DI BELAKANGNYA.
     *
     * Bar ini `fixed`, jadi ia melayang DI LUAR band nada mana pun — dan
     * karena itu tidak ikut membalik warna saat bagian terang lewat di
     * belakangnya. THRESHOLD-nya BUKAN TEPI BAGIAN, MELAINKAN TENGAH GRADIEN
     * PENGHUBUNG: bar duduk di sekitar 96% tinggi viewport, jadi threshold-nya
     * 96% ± separuh tinggi gradien.
     *
     * ANGKANYA TERIKAT KE TINGGI BAND DI Pendidikan.jsx DAN Kontak.jsx. Dulu
     * band itu 50vh di desktop, jadi separuhnya 25 dan threshold-nya 121/71.
     * Sejak band-nya dipendekkan jadi 20/24/28vh, separuhnya ~12 dan
     * threshold-nya jadi 108/84.
     *
     * SATU ANGKA UNTUK TIGA TITIK HENTI, dan itu memang kompromi — tapi
     * kompromi yang JAUH lebih kecil dari sebelumnya. Dengan band 20/24/28,
     * separuhnya 10/12/14, jadi meleset paling jauh 2vh (~17px di ponsel).
     * Dengan band lama 28/40/50 sementara angkanya dipatok ke 50, melesetnya
     * 11vh di ponsel — sekitar 93px, cukup untuk membalik warna bar saat
     * latarnya masih jelas gelap. Merapatkan rentang band itulah yang
     * membereskannya, bukan angka di sini.
     *
     * Kalau tinggi band diubah lagi, threshold ini WAJIB ikut dihitung ulang:
     * start = 96 + separuhPita, end = 96 - separuhPita.
     */
    var panels = $$('[data-band="panel"]');
    if (panels.length) {
      ScrollTrigger.create({
        trigger: panels[0], endTrigger: panels[panels.length - 1],
        start: "top 108%", end: "bottom 84%",
        onToggle: function (self) { bar.classList.toggle("status-bar--panel", self.isActive); },
      });
    }
  }

  /*
   * Perjalanan pulang dihitung dari JARAK, bukan durasi tetap. Lenis memakai
   * satu durasi untuk semua tujuan; dari dasar halaman yang panjangnya belasan
   * ribu piksel, durasi yang sama berarti kecepatan berlipat — semua trigger
   * scrub dan bagian ter-pin harus melewati seluruh rentangnya dalam waktu itu
   * juga, dan hasilnya patah-patah.
   */
  function initBackToTop() {
    var btn = $('[data-component="back-to-top"]');
    if (!btn) return;

    var SPEED = 2200, MIN = 0.9, MAX = 3;
    /* easeInOutCubic menggantikan bawaan Lenis (expo-out): sentakan awal
       expo-out itulah yang terbaca sebagai "kecepetan". */
    var easeInOutCubic = function (t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    btn.style.transition = "opacity .25s ease, transform .25s ease";
    var visible = null;
    function sync() {
      var next = window.scrollY > 600;
      if (next === visible) return;
      visible = next;
      btn.style.opacity = next ? "1" : "0";
      btn.style.transform = next ? "translateY(0)" : "translateY(8px)";
      btn.style.pointerEvents = next ? "auto" : "none";
    }
    sync();
    listen(window, "scroll", sync, { passive: true });

    listen(btn, "click", function () {
      var distance = window.scrollY;
      scrollTo(0, { duration: Math.min(Math.max(distance / SPEED, MIN), MAX), easing: easeInOutCubic });
    });
  }

  /* Lenis yang memegang scroll, jadi lompatan anchor bawaan browser harus
     dicegah — kalau tidak, halaman menyentak lalu Lenis menariknya balik. */
  function initAnchors() {
    $$('a[href^="#"]').forEach(function (a) {
      listen(a, "click", function (e) {
        var target = document.querySelector(a.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        scrollTo(target);
      });
    });
  }

  /*
   * FORM KONTAK — dua jalur, satu isian. Keduanya mengirim pesan yang
   * bentuknya sama; yang berbeda hanya aplikasi yang membukanya.
   *
   * wa.me hanya menerima format internasional TANPA "+" dan tanpa nol depan,
   * dan gagalnya DIAM: halaman wa.me tetap terbuka, cuma tidak menemukan
   * nomornya. Jadi nomor dinormalkan di sini.
   */
  function initContactForm() {
    var form = $("#contact-form");
    if (!form) return;

    var PHONE = "6285790226536";
    var EMAIL_ADDR = "arif.herfian@gmail.com";

    function readFields() {
      var name = $("#senderName").value.trim();
      var email = $("#senderEmail").value.trim();
      var message = $("#messageBody").value.trim();
      /* Pemeriksaan yang sama dipakai kedua tombol. Kalau masing-masing
         memeriksa sendiri, cepat atau lambat salah satunya ketinggalan saat
         aturannya berubah — dan yang lolos adalah pesan kosong. */
      if (name === "" || message === "") {
        alert("Mohon isi nama dan pesan terlebih dahulu!");
        return null;
      }
      return { name: name, email: email, message: message };
    }

    function composeMessage(fields) {
      var text = "Halo Arif! Saya " + fields.name;
      if (fields.email) text += " (" + fields.email + ")";
      return text + "\n\n" + fields.message;
    }

    listen(form, "submit", function (e) {
      e.preventDefault();
      var fields = readFields();
      if (!fields) return;
      var number = PHONE.replace(/\D/g, "");
      if (number.indexOf("0") === 0) number = "62" + number.slice(1);
      window.open("https://wa.me/" + number + "?text=" + encodeURIComponent(composeMessage(fields)),
        "_blank", "noopener,noreferrer");
    });

    listen($("#send-email"), "click", function () {
      var fields = readFields();
      if (!fields) return;
      window.location.href = "https://mail.google.com/mail/?view=cm&fs=1&to=" +
        encodeURIComponent(EMAIL_ADDR) +
        "&su=" + encodeURIComponent("Pesan dari " + fields.name + " — lewat portofolio") +
        "&body=" + encodeURIComponent(composeMessage(fields));
    });
  }

  /*
   * PEMBUKA — monogram AH digambar bertahap, lalu situsnya masuk.
   *
   * MEKANISMENYA. Tiap <path> di Pembuka.jsx digambar dengan trik
   * stroke-dasharray: panjang garisnya diukur getTotalLength(), lalu
   * strokeDasharray DAN strokeDashoffset disetel sebesar panjang itu --
   * garisnya jadi satu strip putus-putus yang seluruhnya digeser keluar,
   * sehingga tidak ada yang terlihat. Menganimasikan offset-nya kembali ke 0
   * menariknya masuk dari pangkal ke ujung, jadi garisnya seolah ditulis.
   *
   * Panjangnya DIUKUR, bukan ditulis tangan, supaya mengubah koordinat di
   * Pembuka.jsx tidak menuntut angka di file ini ikut diperbarui.
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
   * menutupi. Ia juga punya batas keras 3,5 detik dan dilewati sama sekali
   * kalau pengguna minta reduced motion.
   */
  function initIntro(next) {
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
       terbuka di tengah halaman begitu panelnya naik. */
    window.scrollTo(0, 0);

    var frameEl = $$("[data-intro-frame] path", panel);
    var strokeEl = $$("[data-intro-stroke] path", panel);
    var lockEl = $$("[data-intro-lock] path", panel);

    frameEl.concat(strokeEl, lockEl).forEach(function (p) {
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
     * Urutannya menceritakan bentuknya terbentuk, bukan sekadar muncul:
     * heksagon menggariskan wilayahnya, satu stroke menyusur naik dari kaki
     * kiri melewati puncak lalu turun ke kaki kanan, baru palangnya mengunci
     * keduanya jadi satu tanda. Palang itu sengaja paling akhir DAN sendirian
     * di ujung timeline -- sampai ia turun, bentuknya masih terbaca sebagai
     * gerbang kosong. Seluruh logo satu warna, jadi urutan inilah
     * satu-satunya yang membedakan perannya.
     */
    tl.to(frameEl, { strokeDashoffset: 0, duration: 0.45, stagger: 0.07, ease: "power2.out" }, 0);
    tl.to(strokeEl, { strokeDashoffset: 0, duration: 0.8, ease: "power1.inOut" }, 0.22);
    tl.to(lockEl, { strokeDashoffset: 0, duration: 0.38, ease: "power2.out" }, 0.98);
  }

  /* ── 7. PENYALAAN ───────────────────────────────────────────────────────
   *
   * Urutannya bukan selera. Struktur dibangun lebih dulu (huruf, logo,
   * odometer, salinan marquee) karena setiap transisi di bawahnya mencari
   * elemen yang baru saja dibuat itu. Baru setelah semuanya ada di DOM,
   * animasi dipasang.
   *
   * Lenis dinyalakan sebelum intro supaya ada yang bisa dihentikan selama
   * panelnya menutup; sisanya menunggu panggilan balik dari initIntro().
   */
  function start() {
    buildGlyphs();
    buildOdometers();
    buildLetterHover();
    buildWordScrub();
    buildMarquees();

    initScroller();
    initIntro(setupRest);
  }

  function setupRest() {
    initLineMasks();
    initScrubReveals();
    initRevealImages();
    initWordScrub();
    initSplitWords();
    initOdometers();
    initGlyphRings();
    initRoleCards();
    initMarquees();
    initCardSwap();
    initAccordionGallery();
    initAmbientLines();

    initTypewriter();
    initStatusBar();
    initBackToTop();
    initAnchors();
    initContactForm();

    /*
     * Hitung ulang semua posisi trigger setelah layout benar-benar final.
     *
     * Ini bukan kehati-hatian berlebih. Panggung yang di-pin menyisipkan
     * spacer setinggi lebih dari seribu piksel, dan itu mendorong turun SEMUA
     * bagian di bawahnya. Trigger milik bagian-bagian itu sudah menghitung titik
     * start dan end-nya lebih dulu, saat spacer belum ada.
     *
     * Dijalankan di rAF supaya jatuh setelah frame pertama selesai digambar.
     */
    requestAnimationFrame(function () { ScrollTrigger.refresh(); });

    /* SEKALI LAGI setelah font khusus benar-benar terpasang: layout sudah
       tergambar memakai font cadangan, dan begitu Inter menggantikannya, tinggi
       tiap blok teks berubah dan SEMUA titik trigger di bawahnya ikut bergeser. */
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
    }
  }

  start();

  /*
   * TEARDOWN. Urutannya penting: Lenis dimatikan lebih dulu supaya ia tidak
   * lagi memanggil ScrollTrigger.update saat trigger-nya sedang dibunuh.
   */
  return function bongkar() {
    if (lenis) { lenis.destroy(); lenis = null; }
    ScrollTrigger.getAll().forEach(function (t) { t.kill(true); });
    gsap.globalTimeline.clear();
    for (var i = cleanups.length - 1; i >= 0; i--) cleanups[i]();
    cleanups = [];
  };
}
