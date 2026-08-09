/*
 * ══════════════════════════════════════════════════════════════════════════
 * SELURUH GERAK SITUS INI, DALAM SATU BERKAS.
 *
 * Dipanggil sekali dari useLayoutEffect di src/App.jsx, dan MENGEMBALIKAN
 * fungsi pembongkar. Itu bukan kerapian belaka: React StrictMode sengaja
 * memasang lalu melepas lalu memasang lagi tiap efek waktu pengembangan,
 * dan simpul DOM-nya TIDAK dibuat ulang. Tanpa pembongkaran, tiap pendengar
 * peristiwa, ticker, dan pemicu scroll akan terpasang dua kali — gejalanya
 * animasi jadi dua kali lebih cepat dan scroll terasa berat, hanya di mode
 * pengembangan, jadi mudah disalahartikan sebagai masalah performa.
 *
 * Karena itu SETIAP efek samping di berkas ini didaftarkan lewat empat
 * pembantu di bawah: dengar(), tambahTicker(), amati(), dan tambahSimpul().
 * Kalau menambah efek samping baru, pakai keempatnya — jangan panggil
 * addEventListener, gsap.ticker.add, new ResizeObserver, atau appendChild
 * secara langsung.
 *
 * URUTAN ISI BERKAS INI:
 *   1. Token gerak        kosakata bersama: kurva, durasi, jeda
 *   2. Deteksi perangkat  ambang layar dan mode ringan
 *   3. Bantu-bantu        pemecah huruf, pembangun lambang
 *   4. Scroll halus       Lenis, dan satu-satunya pintu untuk melompat
 *   5. Transisi           satu fungsi per jenis gerak
 *   6. Perilaku           mesin ketik, formulir, bilah status, tombol
 *   7. Penyalaan          urutan pemanggilan, dan kenapa urutannya begitu
 * ══════════════════════════════════════════════════════════════════════════
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export function pasangAnimasi() {
  "use strict";

  /* Daftar pembongkar. Diisi oleh ketiga pembantu di bawah, dijalankan
     terbalik saat bongkar() dipanggil. */
  var bersih = [];

  function dengar(sasaran, jenis, fn, opsi) {
    sasaran.addEventListener(jenis, fn, opsi);
    bersih.push(function () { sasaran.removeEventListener(jenis, fn, opsi); });
  }
  function tambahTicker(fn) {
    gsap.ticker.add(fn);
    bersih.push(function () { gsap.ticker.remove(fn); });
  }
  function amati(simpul, fn) {
    var ro = new ResizeObserver(fn);
    ro.observe(simpul);
    bersih.push(function () { ro.disconnect(); });
    return ro;
  }

  /*
   * appendChild() tidak bisa dibatalkan lewat removeEventListener(): melepas
   * pendengar tidak mengeluarkan simpulnya dari pohon DOM. Jadi ia efek
   * samping tersendiri dan butuh pendaftarnya sendiri.
   *
   * Kenapa itu jadi masalah di sini: StrictMode menjalankan efek dengan
   * urutan mount -> unmount -> mount pada simpul host yang SAMA — React tidak
   * membuat ulang DOM-nya di antara keduanya. Setiap appendChild yang tidak
   * terdaftar karena itu berjalan dua kali dan hasilnya menumpuk, bukan
   * menimpa.
   *
   * Terukur sebelum diperbaiki: .chapter-dot berjumlah 12 (seharusnya 6),
   * anak .marquee-track 7 (seharusnya 4). Tidak ada satu pun galat yang
   * terlempar. Yang tersisa dari mount pertama sudah kehilangan
   * pendengarnya, jadi bilah babnya tampil utuh tapi separuh titiknya diam
   * saat diklik — dan marquee ikut salah karena `half = scrollWidth / 2`
   * dihitung dari lebar yang sudah telanjur berlipat.
   *
   * Khusus appendChild. Penetapan innerHTML tidak perlu lewat sini: ia
   * mengganti isi, bukan menambah, jadi sudah idempoten.
   */
  function tambahSimpul(induk, simpul) {
    induk.appendChild(simpul);
    bersih.push(function () {
      if (simpul.parentNode === induk) induk.removeChild(simpul);
    });
    return simpul;
  }



  /* Lenis yang menggerakkan scroll, jadi ticker GSAP yang harus memanggil rAF —
     dua loop rAF terpisah membuat scroll dan animasi beda satu frame. */
  gsap.ticker.lagSmoothing(0);

  /* ── 1. TOKEN GERAK ─────────────────────────────────────────────────────
   *
   * Ada DUA kurva, bukan satu, dan pembagiannya sengaja:
   *
   *   EASE       gerak masuk berjarak jauh (judul naik, kartu terbang masuk).
   *              Melambat panjang di ujung, jadi elemen terasa mendarat.
   *   EASE_STATE perpindahan keadaan kecil (hover, aktif/nonaktif). Simetris
   *              dan pendek; kurva mendarat panjang pada jarak 6px justru
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
     menyebut DI MANA elemen menempel saat tersembunyi — bukan arah geraknya. */
  var CLIP = {
    collapsedTop: "inset(0% 0% 100% 0%)",
    collapsedBottom: "inset(100% 0% 0% 0%)",
    visible: "inset(0% 0% 0% 0%)",
  };

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  /*
   * PERANGKAT LEMAH — diukur dari KEMAMPUANNYA, bukan dari lebar layarnya.
   *
   * Ini bukan "mode ringan" lama yang dibuang. Yang itu memakai lebar layar
   * sebagai ambang, dan itu memang salah: lebar layar bukan ukuran kekuatan,
   * sehingga laptop lemah 1920px justru mendapat jalur terberat sementara
   * tablet kuat mendapat jalur ringan. Yang ini menanyakan langsung.
   *
   * navigator.deviceMemory melaporkan RAM dalam GiB, DIBULATKAN KE BAWAH ke
   * pangkat dua dan dibatasi maksimal 8 — sengaja dibuat kasar supaya tidak
   * bisa dipakai melacak orang. Nilai yang mungkin hanya 0,25 / 0,5 / 1 / 2 /
   * 4 / 8. Jadi ponsel 6 GB melaporkan 4, dan laptop 16 GB melaporkan 8:
   * keduanya jatuh di sisi ambang yang berbeda, persis yang dibutuhkan.
   *
   * hardwareConcurrency hanya dipakai kalau deviceMemory tidak tersedia
   * (Safari belum punya). Ia tidak dipakai bersamaan, karena banyak laptop
   * yang sepenuhnya mampu cuma punya 4 inti — memakainya sebagai syarat
   * tambahan akan memangkas animasi dari perangkat yang sebenarnya sanggup.
   *
   * Kalau kedua-duanya diam, perangkat dianggap KUAT. Lebih baik keliru
   * memberi animasi penuh kepada satu perangkat lemah daripada mencabutnya
   * dari semua orang karena satu peramban tidak mau menjawab.
   */
  function perangkatLemah() {
    var ram = navigator.deviceMemory;
    if (typeof ram === "number" && ram > 0) return ram <= 4;
    var inti = navigator.hardwareConcurrency;
    if (typeof inti === "number" && inti > 0) return inti <= 4;
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

  /* Lambang cincin di kartu keahlian. Jumlah cincinnya berbeda-beda supaya
     keempat kartu tidak terbaca sebagai satu ikon yang diulang.

     `--i` adalah nomor urut cincin dari dalam ke luar, dan ia dipakai CSS
     untuk menunda riak hover per cincin — lihat blok "LAMBANG CINCIN" di
     src/index.css. Ditulis di sini, bukan dihitung CSS lewat :nth-child,
     karena jumlah cincin tiap kartu berbeda dan urutannya sudah diketahui
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
   * Odometer: tiap digit adalah kolom 0-9 yang digulung di dalam jendela
   * setinggi satu baris, seperti argo taksi. Karakter non-digit (titik desimal)
   * dibiarkan diam di tempat.
   *
   * Salinan utuh ber-`sr-only` wajib ada: tiap kolom memuat SELURUH digit dan
   * hanya satu yang terlihat lewat overflow — tanpa salinan itu, menyalin
   * "3.62" menghasilkan deretan angka penuh dan pembaca layar membacakan
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
       jumlah sertifikat diambil dari jumlah kartunya sendiri, jadi menambah
       sertifikat tidak menyisakan angka yang meleset di bagian lain. */
    $$("[data-odometer-count]").forEach(function (el) {
      buildOdometer(el, String($$(el.getAttribute("data-odometer-count")).length));
    });
  }

  /*
   * Stagger per huruf saat hover. Yang membuatnya hidup bukan gerak naiknya,
   * melainkan bahwa tiap huruf berangkat pada saat yang sedikit berbeda.
   * Seluruhnya CSS — yang dikerjakan di sini cuma menyiapkan strukturnya.
   */
  function buildLetterHover() {
    $$("[data-letter-hover]").forEach(function (el) {
      var teks = el.getAttribute("data-letter-hover");
      el.className = "inline-flex flex-wrap " + el.className;
      var html = '<span class="sr-only">' + teks + "</span>";
      for (var i = 0; i < teks.length; i++) {
        var c = teks[i];
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
   * Terukur, paragrafnya jadi 118px alih-alih 147px — satu baris lebih pendek,
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

  /*
   * PAPAN BALIK — kotak-kotaknya dibangun dari TEKS YANG SUDAH ADA di markup,
   * bukan dari atribut data.
   *
   * Urutan itu yang membuatnya tahan gagal: kalau berkas ini tidak pernah
   * dimuat, atau melempar sebelum sampai ke sini, yang tersisa judul -h1
   * biasa yang utuh dan terbaca. Membangunnya dari atribut akan menyisakan
   * wadah kosong — dan judul yang hilang jauh lebih buruk daripada judul yang
   * tidak beranimasi. Pola yang sama dipakai buildWordScrub().
   *
   * innerHTML, bukan appendChild: ia MENGGANTI isi, bukan menambah, jadi
   * sudah idempoten terhadap pemasangan ganda StrictMode dan karena itu tidak
   * perlu didaftarkan lewat tambahSimpul().
   */
  function buildPapanBalik() {
    $$("[data-papan-balik]").forEach(function (papan) {
      var teks = papan.textContent.trim();
      if (!teks) return;

      /* Teks aslinya disimpan ke atribut karena textContent-nya sebentar lagi
         berisi salinan sr-only DITAMBAH kedelapan hurufnya — membacanya lagi
         setelah ini menghasilkan "KeahlianKeahlian". */
      papan.setAttribute("data-papan-teks", teks);

      var html = '<span class="sr-only">' + teks + "</span>";
      for (var i = 0; i < teks.length; i++) {
        /* Spasi pun dapat kotaknya sendiri supaya kisi papannya tidak
           terputus — papan sungguhan juga punya daun kosong. Judulnya
           sekarang satu kata, jadi ini belum terpakai; ia ada supaya menambah
           kata kedua nanti tidak menuntut kode ini diubah. */
        html += '<span class="papan-kotak" aria-hidden="true">' +
          '<span class="papan-huruf">' +
          (teks[i] === " " ? "&nbsp;" : teks[i]) +
          "</span></span>";
      }
      papan.innerHTML = html;
    });
  }

  /* Isi marquee digandakan empat kali: saat salinan pertama habis, salinan
     kedua sudah menempati tempatnya persis — tidak pernah ada ujung yang
     terlihat, dan tidak ada lompatan saat ia mengulang. */
  function buildMarquees() {
    $$('[data-anim="marquee"]').forEach(function (root) {
      var track = $(".marquee-track", root);
      var asli = $("[data-marquee-copy]", track);
      for (var i = 1; i < 4; i++) {
        var salinan = asli.cloneNode(true);
        salinan.setAttribute("aria-hidden", "true");
        tambahSimpul(track, salinan);
      }
    });
  }

  /* ── 4. SCROLL HALUS ────────────────────────────────────────────────────*/
  var lenis = null;

  function initScroller() {
    if (prefersReducedMotion()) return;
    lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    tambahTicker(function (time) { lenis.raf(time * 1000); });
  }

  /* Satu-satunya pintu untuk melompat antar bagian. Jalur cadangan dipakai
     kalau Lenis tidak menyala (gerak dikurangi); ia tidak bisa meniru durasi
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
   * berhenti di bawah topengnya.
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
   * REVEAL TER-SCRUB — bukan dipicu lalu jalan sendiri.
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

      /* Jendelanya sengaja PENDEK dan RENDAH: penyingkapan selesai tak lama
         setelah elemennya masuk dari tepi bawah layar. Pada bagian yang isinya
         bertumpuk, tiap blok menunggu gilirannya sendiri — jadi keterlambatan
         kecil di satu elemen berlipat jadi bagian yang tak pernah terlihat
         utuh meski sudah di-scroll jauh. */
      var desktop = window.matchMedia(DEVICE.desktop).matches;
      gsap.fromTo(
        el,
        { clipPath: CLIP.collapsedTop, y: 40 },
        {
          clipPath: CLIP.visible, y: 0, ease: EASE_SCRUB,
          /* clamp() menahan jendela pemicu tetap di dalam rentang scroll yang
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
   * GAMBAR DENGAN PITA SAPUAN — sebuah bidang warna mengisi area dari atas ke
   * bawah, lalu meluncur terus ke bawah dan keluar sambil gambarnya terbuka di
   * belakangnya. Yang terbaca mata adalah satu pita warna yang menyapu turun
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
          /* Jaraknya pendek supaya selalu ada beberapa kata setengah menyala
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
      var atas = $(".top-word", el);
      var bawah = $(".bottom-word", el);
      if (!atas || !bawah) return;

      /*
       * JENDELANYA PANJANG, DAN SENGAJA PALING PANJANG DI SITUS INI.
       *
       * Dulu "top 95%" sampai "center 80%" — sekitar 227px gulir di ponsel.
       * Pada jarak sependek itu kedua barisnya sudah bertemu sebelum mata
       * sempat mendaftar bahwa mereka datang dari arah berlawanan, dan yang
       * tersisa cuma kesan judul yang berkedut.
       *
       * Sekarang "top 100%" sampai "center 52%": ~505px, lebih dari dua kali
       * lipat. Ini transisi paling mencolok di halaman dan dipakai SEKALI
       * saja, di titik halaman berbalik dari gelap ke terang — ia satu-satunya
       * yang pantas menuntut jarak sepanjang itu. Jangan jadikan angka ini
       * patokan untuk penyingkapan lain; yang lain justru harus pendek.
       */
      var tl = gsap.timeline({
        defaults: { ease: EASE_SCRUB },
        scrollTrigger: { trigger: el, start: "clamp(top 100%)", end: "clamp(center 52%)", scrub: SCRUB },
      });
      tl.fromTo(atas, { xPercent: -70 }, { xPercent: 0, duration: 1 }, 0);
      tl.fromTo(bawah, { xPercent: 70 }, { xPercent: 0, duration: 1 }, 0);
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
   * LAMBANG CINCIN YANG DIGAMBAR — satu-satunya gerak milik bagian Keahlian.
   *
   * KENAPA ADA. Sebelum ini seluruh bagian Keahlian memakai satu gerak yang
   * sama persis untuk dua puluhan elemen: kartu peran, lima kartu kemampuan,
   * empat baris perkakas, dua baris bahasa — semuanya `scrub-reveal`. Bukan
   * sepi, tapi seragam, dan yang seragam terbaca datar. Tiap bagian lain
   * punya satu ide geraknya sendiri (tumpukan kartu di Pengalaman, akordeon
   * di Sertifikat, mesin ketik di Beranda); bagian ini tidak punya. Cincin di
   * kartu peran adalah satu-satunya bentuk yang cuma dimiliki bagian ini,
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
   * lihat blok "LAMBANG CINCIN" di src/index.css.
   *
   * `once: true`, bukan scrub. Menggambar garis adalah peristiwa sekali jadi;
   * memetakannya ke gulir berarti cincinnya terhapus lagi saat digulir balik,
   * dan lambang yang terurai sendiri terbaca sebagai rusak.
   */
  function initGlyphRings() {
    $$("[data-glyph]").forEach(function (slot) {
      var cincin = $$("circle", slot);
      if (!cincin.length) return;

      /* Gerak dikurangi: lambangnya dibiarkan apa adanya. Tidak ada yang perlu
         disetel ulang — tanpa strokeDasharray, cincinnya memang sudah utuh. */
      if (prefersReducedMotion()) return;

      cincin.forEach(function (c) {
        var keliling = c.getTotalLength();
        c.style.strokeDasharray = keliling;
        c.style.strokeDashoffset = keliling;
      });

      gsap.to(cincin, {
        strokeDashoffset: 0,
        duration: 0.7,
        ease: EASE,
        stagger: 0.09,
        /* Ambangnya 92%, lebih rendah dari penyingkapan kartunya sendiri
           (95%), supaya cincinnya mulai tergambar saat kartunya sudah
           terbuka — bukan di balik clip-path yang masih menutup. */
        scrollTrigger: { trigger: slot, start: "top 92%", once: true },
      });
    });
  }

  /*
   * PAPAN BALIK — judulnya mendarat kotak demi kotak, seperti papan jadwal.
   *
   * Polanya SplitFlapText dari reactbits.dev; alasan memilihnya bukan karena
   * ia paling ramai, melainkan karena ia BERIMA dengan yang sudah ada. Situs
   * ini sudah punya odometer di bagian Pendidikan — roda angka mekanis yang
   * berputar sampai mendarat. Papan balik keluarga yang sama, dipakai untuk
   * hal berbeda. Jadi ia terbaca sebagai bahasa situs ini, bukan efek impor.
   *
   * MEKANISMENYA DISEDERHANAKAN DARI ASLINYA, dan bukan karena malas.
   * Rujukannya menumpuk empat lapis per kotak (separuh atas, separuh bawah,
   * daun depan, daun belakang) supaya baliknya akurat secara fisik. Di sini
   * satu lapis: hurufnya berputar keluar bidang di engsel atas, teksnya
   * ditukar saat ia tak terlihat, lalu ia berputar masuk lagi. Pada tujuh
   * balik per kotak dengan durasi 0,085 detik, mata tidak punya waktu
   * membedakan keduanya — yang terbaca cuma daun yang berjatuhan. Empat lapis
   * berarti empat kali lebih banyak simpul yang ditransformasi, untuk
   * ketelitian yang tidak pernah sempat terlihat.
   *
   * KOTAKNYA DIKOSONGKAN LEBIH DULU, dan itu bukan sekadar keadaan awal.
   * buildPapanBalik() sengaja menaruh huruf yang BENAR di dalam kotak supaya
   * kegagalan skrip menyisakan judul yang terbaca. Konsekuensinya, tanpa
   * baris ini jawabannya sudah terpampang sebelum papannya sempat berputar,
   * dan yang terlihat bukan penyingkapan melainkan kedutan. rotationX 90 di
   * engsel atas mengayunkan hurufnya keluar pandangan tanpa menyentuh
   * teksnya — papan kosong yang menunggu, persis keadaan yang benar.
   */
  function initPapanBalik() {
    $$("[data-papan-balik]").forEach(function (papan) {
      var teks = papan.getAttribute("data-papan-teks") || "";
      var huruf = $$(".papan-huruf", papan);
      if (!huruf.length || !teks) return;

      /* Gerak dikurangi: kotaknya sudah berisi huruf yang benar sejak
         dibangun, jadi tidak ada yang perlu disetel ulang di sini. */
      if (prefersReducedMotion()) return;

      var ABJAD = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var BALIK = 6;
      var DURASI = 0.085;
      var JEDA = 0.055;

      gsap.set(huruf, { rotationX: 90 });

      /* SATU timeline untuk seluruh papan, dengan tiap kotak ditempatkan di
         detik i*JEDA. Bukan delapan timeline ber-delay masing-masing: satu
         pemicu gulir yang menghidupkan satu timeline jauh lebih mudah
         ditelusuri saat salah, dan tidak ada yang bisa menyimpang sendiri. */
      var tl = gsap.timeline({
        scrollTrigger: { trigger: papan, start: "top 88%", once: true },
      });

      huruf.forEach(function (h, i) {
        var target = teks[i] === " " ? " " : teks[i];
        var urut = [];
        for (var f = 0; f < BALIK; f++) {
          urut.push(ABJAD[Math.floor(Math.random() * ABJAD.length)]);
        }
        urut.push(target);

        var t = i * JEDA;
        urut.forEach(function (c) {
          tl.set(h, { rotationX: 90 }, t)
            .call(function () { h.textContent = c; }, null, t)
            .to(h, { rotationX: 0, duration: DURASI, ease: "power2.out" }, t);
          t += DURASI;
        });
      });
    });
  }

  /*
   * KARTU PERAN — datang dari samping berurutan, lalu satu disorot bergantian.
   *
   * Dua gerak, dan keduanya menjawab kekurangan yang berbeda.
   *
   * KEDATANGAN. Ketiga kartu ini dulu memakai scrub-reveal yang sama persis
   * dengan dua puluhan elemen lain di bagian ini — tidak ada yang menandai
   * bahwa merekalah pokok bagiannya. Sekarang ketiganya meluncur masuk dari
   * kanan berurutan, sekali jalan. Atribut scrub-reveal-nya DIBUANG dari
   * Keahlian.jsx, bukan ditumpuk: keduanya sama-sama menganimasikan
   * pergeseran dan kejernihan, jadi memasang dua-duanya berarti dua tween
   * berebut properti yang sama pada elemen yang sama.
   *
   * SOROT. Tiga kartu setara yang diam berdampingan tidak memberi mata satu
   * pun tempat untuk berpijak. Yang disorot naik sedikit dan tampil penuh,
   * dua lainnya turun ke 0,78 — REDUP, BUKAN TERSEMBUNYI. Itu batas yang
   * disengaja: menyempitkan kartu jadi bilah seperti galeri sertifikat akan
   * menyembunyikan dua dari tiga peran, dan tiga peran inilah yang justru
   * paling tidak boleh disembunyikan di halaman lamaran kerja. Karena tidak
   * ada isi yang hilang, tidak ada urusan aksesibilitas sama sekali di sini:
   * peredupannya murni hiasan.
   *
   * JALAN MASUKNYA MENIRU GALERI SERTIFIKAT, dan itu bukan kemalasan —
   * kursor di penunjuk halus, posisi gulir di perangkat tanpa hover, pita
   * gulir dipatok ke TITIK TENGAH blok dan diukur dalam persen tinggi layar.
   * Dua tempat di halaman yang sama-sama "telusuri satu per satu" sebaiknya
   * terasa sama; kalau yang satu digulir dan yang lain diketuk, pengunjung
   * harus belajar dua kali.
   */
  function initKartuPeran() {
    var orbit = $(".stage-orbit");
    if (!orbit) return;

    var kartu = $$("[data-kartu-peran]", orbit);
    if (kartu.length < 2) return;

    /* Gerak dikurangi: kartunya dibiarkan berdiri apa adanya, dan sorotnya
       tidak dipasang sama sekali. Sorot yang berpindah-pindah tanpa transisi
       berkedip, dan berkedip persis yang dihindari pengaturan ini. */
    if (prefersReducedMotion()) return;

    var sudahDatang = false;
    var tertunda = -1;

    gsap.fromTo(
      kartu,
      { xPercent: 12, opacity: 0 },
      {
        xPercent: 0, opacity: 1, duration: 0.6, ease: EASE, stagger: 0.09,
        scrollTrigger: { trigger: orbit, start: "top 88%", once: true },
        onComplete: function () {
          sudahDatang = true;
          /* Mendarat di kartu pertama, bukan tanpa sorotan. Tanpa keadaan
             istirahat ini, pengunjung desktop yang tidak pernah mengarahkan
             kursor ke sini melihat tiga kartu setara yang diam — persis
             masalah yang jadi alasan sorot ini ada. Kartu pertama yang
             dipilih karena ia peran yang dilamar lebih dulu, sama dengan
             alasan ia melebar dua kolom. */
          sorot(tertunda >= 0 ? tertunda : 0);
        },
      },
    );

    /*
     * Sorot ditahan sampai kedatangan tuntas, dan yang tertunda disimpan
     * bukan dibuang. Tanpa penahan ini, kursor yang mendarat di kartu saat
     * lipatannya masih meluncur membuat dua tween berebut opacity: yang satu
     * menuju 1, yang lain menuju 0,78, dan yang menang bergantung urutan
     * frame. Tanpa `tertunda`, sorotan yang datang lebih awal hilang begitu
     * saja dan kartunya baru menyala saat kursor digerakkan ulang.
     */
    var sorotKe = -1;
    var tlSorot = null;
    function sorot(i) {
      if (!sudahDatang) { tertunda = i; return; }
      if (i === sorotKe) return;
      sorotKe = i;

      if (tlSorot) tlSorot.kill();
      tlSorot = gsap.timeline();
      kartu.forEach(function (k, j) {
        var ini = j === i;
        k.classList.toggle("stage-card--sorot", ini);
        /* 1,012 bukan 1,05: kartu utama merentang penuh 1100px di desktop,
           jadi tiap 1% skala menjulur 5,5px ke tiap sisi. Pada 1,012 ia
           menjulur 6,6px ke dalam padding wadah yang 40px — aman. Pada 1,05
           ia menjulur 27,5px dan mulai menyentuh tepi layar. */
        tlSorot.to(k, {
          opacity: ini ? 1 : 0.78,
          scale: ini ? 1.012 : 1,
          y: ini ? -6 : 0,
          duration: 0.45, ease: EASE,
        }, 0);
      });
    }
    bersih.push(function () {
      if (tlSorot) tlSorot.kill();
      kartu.forEach(function (k) { k.classList.remove("stage-card--sorot"); });
    });

    /*
     * SOROTAN YANG MENGIKUTI KURSOR — pola spotlight MagicBento, tapi bagian
     * JavaScript-nya tinggal dua baris karena bentuk dan warnanya sepenuhnya
     * diurus CSS (lihat blok "SOROTAN KURSOR DI KARTU PERAN" di index.css).
     * Yang dikerjakan di sini cuma memberi tahu CSS di mana kursornya.
     *
     * DIBATASI SATU TULISAN PER FRAME. Tanpa penjaga rAF ini, pointermove
     * bisa terkirim jauh lebih sering daripada layar menggambar — di penunjuk
     * bertingkat tinggi ratusan kali per detik — dan tiap tulisan ke --mx/--my
     * membatalkan gambar ulang gradien kartunya. Yang tergambar toh cuma nilai
     * terakhir sebelum frame, jadi sisanya kerja yang dibuang.
     *
     * getBoundingClientRect dipanggil di dalam frame, bukan disimpan: kartu
     * yang sedang disorot punya skala 1,012 dan naik 6px, jadi kotaknya
     * memang bergerak selama transisi. Menyimpannya membuat sorotan meleset
     * dari kursor selama 0,45 detik pertama.
     */
    var titik = { el: null, x: 0, y: 0 };
    var rafTitik = 0;
    function tulisTitik() {
      rafTitik = 0;
      if (!titik.el) return;
      var r = titik.el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      titik.el.style.setProperty("--mx", ((titik.x - r.left) / r.width) * 100 + "%");
      titik.el.style.setProperty("--my", ((titik.y - r.top) / r.height) * 100 + "%");
    }
    bersih.push(function () {
      if (rafTitik) cancelAnimationFrame(rafTitik);
      kartu.forEach(function (k) {
        k.style.removeProperty("--mx");
        k.style.removeProperty("--my");
      });
    });

    var bisaHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    kartu.forEach(function (k, i) {
      dengar(k, "pointerenter", function () { if (bisaHover.matches) sorot(i); });
      dengar(k, "pointermove", function (e) {
        if (!bisaHover.matches) return;
        titik.el = k;
        titik.x = e.clientX;
        titik.y = e.clientY;
        if (!rafTitik) rafTitik = requestAnimationFrame(tulisTitik);
      }, { passive: true });
      /* Titiknya dikembalikan ke bawaan CSS saat kursor pergi, bukan
         dibiarkan di posisi terakhir. Kalau tidak, kartu yang nanti dipilih
         gulir di perangkat hibrida menyala dengan sorotan di tepi acak —
         sisa dari kursor yang sudah lama tidak ada. */
      dengar(k, "pointerleave", function () {
        k.style.removeProperty("--mx");
        k.style.removeProperty("--my");
      });
    });

    /* Pita gulir untuk perangkat tanpa hover, bentuknya sama dengan galeri
       sertifikat: dipatok ke titik tengah blok, panjangnya 35% tinggi layar,
       jadi tiap kartu kebagian ~11,7vh — sekitar 98px di ponsel. Ditanyakan
       di dalam onUpdate, bukan saat membuat, supaya perangkat hibrida yang
       berpindah modus penunjuk langsung benar tanpa membangun ulang pemicu. */
    var terakhirGulir = -1;
    ScrollTrigger.create({
      trigger: orbit,
      start: "center 70%",
      end: "center 35%",
      onUpdate: function (diri) {
        if (bisaHover.matches) return;
        var i = Math.min(kartu.length - 1, Math.floor(diri.progress * kartu.length));
        if (i === terakhirGulir) return;
        terakhirGulir = i;
        sorot(i);
      },
    });
  }

  /*
   * MARQUEE TAK BERUJUNG YANG MEMBACA ARAH SCROLL.
   *
   * Satu-satunya gerak yang berjalan sendiri tanpa menunggu scroll — denyut
   * latar, supaya layar tidak pernah benar-benar mati. Arahnya mengikuti arah
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

      tambahTicker(function (_t, deltaMs) {
        /* deltaMs dari ticker GSAP, bukan selisih timestamp sendiri — supaya
           kecepatannya sama di layar 60Hz maupun 120Hz. */
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

      amati(track, function () { half = track.scrollWidth / 2; });
    });
  }

  /*
   * TUMPUKAN KARTU PENGALAMAN — yang depan dibaca utuh, yang belakang
   * mengintip di sudut, dan tiap beberapa detik yang depan jatuh lalu masuk
   * ke belakang tumpukan. Polanya CardSwap dari reactbits.dev.
   *
   * SLOT. Kartu di slot ke-i digeser x +i*dx, y -i*dy, z -i*dz, diperkecil,
   * dan zIndex-nya menurun. Posisinya diturunkan dari NOMOR SLOT, bukan
   * disimpan per kartu; berputar cuma berarti memutar isi array `urutan` lalu
   * menata ulang. Tidak ada keadaan yang bisa menyimpang sendiri.
   *
   * TINGGINYA DIUKUR, TIDAK DIPATOK. CardSwap aslinya memakai ukuran tetap
   * 500x400 dan isi yang lebih panjang terpotong begitu saja. Di sini tinggi
   * tumpukan = kartu TERTINGGI + ruang untuk kartu belakang mengintip,
   * dihitung ulang lewat ResizeObserver di tiap kartu. Rincian pekerjaan
   * boleh sepanjang apa pun tanpa satu baris pun hilang.
   *
   * HANYA KARTU BELAKANG YANG DIMIRINGKAN. Aslinya seluruh tumpukan di-skew,
   * termasuk yang sedang dibaca. Teks CV yang miring melelahkan dibaca, dan
   * kartu depan di sini justru satu-satunya yang memang untuk dibaca.
   *
   * TANPA JAVASCRIPT KARTUNYA TETAP TERBACA. Posisi absolut baru dipasang
   * setelah kelas .tukar-siap ditambahkan dari sini; sebelum itu kartunya
   * mengalir ke bawah sebagai daftar biasa. Kalau skripnya gagal dimuat, yang
   * tersisa daftar pengalaman yang utuh, bukan tumpukan yang saling menimpa.
   */
  function initTukarKartu() {
    var akar = $('[data-component="tukar"]');
    if (!akar) return;

    var tumpuk = $("[data-tukar-tumpuk]", akar);
    var kartu = $$("[data-kartu]", tumpuk || akar);
    if (!tumpuk || kartu.length < 2) return;

    var kendali = $("[data-tukar-kendali]", akar);
    var JEDA_AUTO = 5200;
    var kecilQ = window.matchMedia("(max-width: 639px)");

    var urutan = kartu.map(function (_, i) { return i; });
    var otomatis = null;
    var diambilAlih = false;

    function ukuran() {
      return kecilQ.matches
        ? { dx: 12, dy: 12, dz: 40, susut: 0.045, miring: 0, jatuh: 90 }
        : { dx: 26, dy: 22, dz: 60, susut: 0.04, miring: 4, jatuh: 150 };
    }

    function slot(i) {
      var u = ukuran();
      return {
        x: i * u.dx, y: -i * u.dy, z: -i * u.dz,
        scale: 1 - i * u.susut,
        skewY: i === 0 ? 0 : u.miring,
        /* 0,8 bukan 0,55: kartu belakang berlatar --surface (#101218) di atas
           --background (#040508), jadi meredupkannya terlalu jauh membuatnya
           lenyap dan tumpukan terbaca sebagai satu kartu biasa. */
        autoAlpha: i === 0 ? 1 : 0.8,
        zIndex: kartu.length - i,
      };
    }

    /* Kartu belakang dikeluarkan dari urutan tab DAN dari pembaca layar.
       aria-hidden saja tidak cukup: tautan di dalamnya tetap bisa difokus
       keyboard, dan fokus yang mendarat di sesuatu yang tidak terlihat adalah
       cara tercepat membuat halaman terasa rusak. */
    function tandai() {
      urutan.forEach(function (idx, i) {
        kartu[idx].inert = i !== 0;
        kartu[idx].setAttribute("aria-hidden", i === 0 ? "false" : "true");
      });
      if (!kendali) return;
      $$("[data-titik]", kendali).forEach(function (b, i) {
        var aktif = urutan[0] === i;
        b.setAttribute("aria-selected", aktif ? "true" : "false");
        b.tabIndex = aktif ? 0 : -1;
      });
    }

    /*
     * SATU timeline hidup pada satu waktu, dan yang lama DIBUNUH lebih dulu.
     *
     * Ini memperbaiki cacat yang terlihat sebagai kartu belakang menembus
     * kartu depan. Penyebabnya bukan z-index atau latar tembus pandang --
     * keduanya terukur benar (z 2 lawan 1, opacity 1, latar rgb(16,18,24)
     * opak). Penyebabnya balapan: putar() menjadwalkan tl.set(zIndex) pada
     * detik 0,4 dan tl.to(autoAlpha) pada 0,42. Kalau pengguna menekan titik
     * pemilih sebelum itu, tata() memasang nilai yang benar, lalu penjadwalan
     * lama menimpanya sepersekian detik kemudian.
     *
     * zIndex disetel langsung ke style, bukan lewat GSAP, supaya ia berpindah
     * SEKETIKA -- kartu yang naik harus sudah berada di atas sebelum satu
     * frame pun digambar.
     */
    var tlAktif = null;
    function bunuhTl() {
      if (tlAktif) { tlAktif.kill(); tlAktif = null; }
    }
    bersih.push(bunuhTl);

    function tata(beranimasi) {
      bunuhTl();
      var d = beranimasi && !prefersReducedMotion() ? 0.55 : 0;
      var tl = gsap.timeline();
      urutan.forEach(function (idx, i) {
        var s = slot(i);
        kartu[idx].style.zIndex = s.zIndex;
        tl.to(kartu[idx], {
          x: s.x, y: s.y, z: s.z, scale: s.scale, skewY: s.skewY,
          autoAlpha: s.autoAlpha, duration: d, ease: EASE,
        }, 0);
      });
      tlAktif = tl;
      tandai();
    }

    function putar() {
      bunuhTl();
      var keluarIdx = urutan[0];
      var keluar = kartu[keluarIdx];
      urutan.push(urutan.shift());

      var u = ukuran();
      var akhir = slot(urutan.indexOf(keluarIdx));
      var tl = gsap.timeline();

      /* Jatuh sampai hilang DULU, baru dipindahkan ke slot belakang. Kalau
         langsung ditweenkan ke sana, ia terlihat menyelinap menembus kartu
         yang sedang naik. */
      tl.to(keluar, { y: "+=" + u.jatuh, autoAlpha: 0, duration: 0.4, ease: "power2.in" }, 0);
      tl.call(function () { keluar.style.zIndex = akhir.zIndex; }, null, 0.4);
      tl.set(keluar, {
        x: akhir.x, y: akhir.y, z: akhir.z, scale: akhir.scale,
        skewY: akhir.skewY,
      }, 0.4);
      tl.to(keluar, { autoAlpha: akhir.autoAlpha, duration: 0.45, ease: EASE }, 0.42);

      urutan.forEach(function (idx, i) {
        if (idx === keluarIdx) return;
        var s = slot(i);
        tl.call(function () { kartu[idx].style.zIndex = s.zIndex; }, null, 0.1);
        tl.to(kartu[idx], {
          x: s.x, y: s.y, z: s.z, scale: s.scale, skewY: s.skewY,
          autoAlpha: s.autoAlpha, duration: 0.55, ease: EASE,
        }, 0.1);
      });

      tlAktif = tl;
      tandai();
    }

    function pilih(idx) {
      if (urutan[0] === idx) return;
      var pos = urutan.indexOf(idx);
      urutan = urutan.slice(pos).concat(urutan.slice(0, pos));
      tata(true);
    }

    function mulaiOtomatis() {
      if (otomatis || diambilAlih || prefersReducedMotion()) return;
      otomatis = setInterval(putar, JEDA_AUTO);
    }
    function jedaOtomatis() {
      if (otomatis) { clearInterval(otomatis); otomatis = null; }
    }
    bersih.push(jedaOtomatis);

    /* Titik pemilih dibuat dari JUMLAH kartu, lewat tambahSimpul() supaya ikut
       dibongkar. Ia juga satu-satunya jalan keyboard ke kartu yang sedang
       tidak di depan, karena kartu belakang sengaja di-inert. */
    if (kendali) {
      kartu.forEach(function (_, i) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "tukar-titik";
        b.setAttribute("data-titik", "");
        b.setAttribute("role", "tab");
        b.setAttribute("aria-label", "Pengalaman ke-" + (i + 1));
        dengar(b, "click", function () {
          /* Sekali pengguna memilih sendiri, perputaran otomatis berhenti
             untuk seterusnya. Kartu yang bergeser sendiri saat sedang dibaca
             adalah gangguan, bukan animasi. */
          diambilAlih = true;
          jedaOtomatis();
          pilih(i);
        });
        dengar(b, "keydown", function (e) {
          var maju = e.key === "ArrowRight" || e.key === "ArrowDown";
          var mundur = e.key === "ArrowLeft" || e.key === "ArrowUp";
          if (!maju && !mundur) return;
          e.preventDefault();
          diambilAlih = true;
          jedaOtomatis();
          var tujuan = (i + (maju ? 1 : -1) + kartu.length) % kartu.length;
          pilih(tujuan);
          $$("[data-titik]", kendali)[tujuan].focus();
        });
        tambahSimpul(kendali, b);
      });
    }

    /*
     * SEMUA KARTU DISAMAKAN SETINGGI YANG TERTINGGI, bukan cuma wadahnya.
     *
     * Ini bukan kerapian. Terukur di 390x844: kartu Guru Informatika 761px
     * (lima butir rincian) dan Staf Administrasi 615px (empat butir). Saat
     * yang pendek berada di depan, yang tinggi di belakangnya menyembul 146px
     * di bawah dan isinya terbaca di samping kartu depan -- tumpukannya
     * terlihat seperti dua kartu yang salah tumpuk, bukan satu tumpukan.
     * Skala 0,955 tidak menolong karena 761 x 0,955 masih lebih besar dari
     * 615.
     *
     * Tinggi dilepas ke auto DULU sebelum diukur: tanpa itu yang terbaca
     * adalah tinggi yang dipasang putaran sebelumnya, dan kartunya tidak akan
     * pernah bisa mengecil lagi saat layar melebar.
     *
     * Penjaga `sedangUkur` memutus umpan balik: menyetel tinggi kartu memicu
     * ResizeObserver yang mengamati kartu itu sendiri.
     */
    var sedangUkur = false;
    function ukur() {
      if (sedangUkur) return;
      sedangUkur = true;

      var u = ukuran();
      var ruang = (kartu.length - 1) * u.dy;

      kartu.forEach(function (k) { k.style.height = "auto"; });
      var tinggi = 0;
      kartu.forEach(function (k) { tinggi = Math.max(tinggi, k.offsetHeight); });
      kartu.forEach(function (k) { k.style.height = tinggi + "px"; });

      tumpuk.style.setProperty("--tukar-atas", ruang + "px");
      tumpuk.style.height = tinggi + ruang + "px";

      requestAnimationFrame(function () { sedangUkur = false; });
    }

    akar.classList.add("tukar-siap");
    bersih.push(function () { akar.classList.remove("tukar-siap"); });

    kartu.forEach(function (k) { amati(k, ukur); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(ukur);

    dengar(akar, "pointerenter", jedaOtomatis);
    dengar(akar, "pointerleave", mulaiOtomatis);
    dengar(akar, "focusin", jedaOtomatis);
    dengar(akar, "focusout", mulaiOtomatis);
    dengar(document, "visibilitychange", function () {
      if (document.hidden) jedaOtomatis(); else mulaiOtomatis();
    });
    dengar(kecilQ, "change", function () { ukur(); tata(false); });

    ukur();
    tata(false);
    mulaiOtomatis();
  }


  /*
   * GALERI AKORDEON — satu panel terbuka, sisanya menyempit jadi bilah.
   *
   * Menggantikan panggung kedatangan sertifikat yang lama (kisi yang di-pin
   * setinggi satu layar, kartu hanyut dari empat sudut, gelombang kertas di
   * ticker). Yang itu animasi SEKALI JALAN saat digulir; ini interaksi yang
   * bisa dijelajahi, dan enam sertifikat memang lebih masuk akal ditelusuri
   * satu per satu daripada ditabur sekaligus.
   *
   * CARA MEMBAGI RUANGNYA. Semua panel flex item. Yang aktif diberi flexGrow
   * `tumbuh`, sisanya 1, jadi pembagiannya proporsional dan tidak pernah
   * dihitung dalam piksel -- lebar wadah boleh berubah tanpa satu angka pun
   * ikut disesuaikan. `tumbuh` diturunkan dari RASIO, porsi layar yang ingin
   * ditempati panel aktif:
   *
   *     tumbuh = RASIO * (n - 1) / (1 - RASIO)
   *
   * Dengan RASIO 0,52 dan n 6: tumbuh = 0,52*5/0,48 = 5,42. Panel aktif jadi
   * 5,42 bagian dari total 10,42 bagian, yaitu 52%. Sisanya 9,6% seorang.
   *
   * KENAPA TIDAK ADA grayscale. Komponen aslinya meredupkan panel non-aktif
   * dengan filter: grayscale(). Filter dihitung ulang oleh peramban tiap
   * frame untuk seluruh piksel gambar, dan di sini gambarnya enam pindaian
   * sertifikat berukuran penuh. Repo ini sudah pernah membuang dua filter
   * karena alasan yang sama (blur kabut dan backdrop-filter kartu, +6 fps di
   * ponsel). Peredupnya di sini <span> hitam ber-opacity: compositor cuma
   * menyusun ulang lapisan, tidak menghitung ulang piksel.
   *
   * TIGA JALAN MASUK, SATU KEADAAN. pilih() satu-satunya pintu, dipanggil
   * oleh hover (hanya di penunjuk halus), fokus keyboard, dan posisi gulir
   * (hanya di perangkat tanpa hover — lihat blok panjang di bawah). Ketiganya
   * cuma memindahkan `aktif`; terapkan() yang menggambar.
   *
   * KETUK PERTAMA MEMILIH, KETUK KEDUA MEMBUKA. Di perangkat sentuh tidak ada
   * hover, jadi tanpa aturan ini panel pertama yang disentuh langsung membuka
   * PDF-nya tanpa pernah sempat dilihat. Sejak gulir ikut memilih, aturan ini
   * bukan lagi satu-satunya jalan menelusuri, melainkan jalan pintas — dan
   * itu yang membuatnya tidak lagi terasa seperti ketukan yang gagal.
   */
  function initGaleriAkordeon() {
    var akar = $('[data-component="galeri"]');
    if (!akar) return;

    var panel = $$("[data-panel]", akar);
    if (!panel.length) return;

    var RASIO = 0.52;
    var MIRING = 6;
    var DURASI = 0.55;
    var tumbuh = panel.length > 1 ? (RASIO * (panel.length - 1)) / (1 - RASIO) : 1;

    /* Pergantian yang dipicu gulir lebih pendek dari yang dipicu hover.
       Alasannya KECEPATAN TANGGAP, bukan performa: pita gulirnya ~190px, dan
       transisi 0,55 detik belum selesai saat pita berikutnya sudah masuk,
       sehingga panel selalu tertinggal di belakang jari.

       Sempat diduga ini juga menghemat tata letak -- flex-grow memaksa tata
       letak ulang tiap frame, dan saat dipicu gulir itu terjadi BERSAMAAN
       dengan gulir. Diukur di 390x844 dengan CPU dicekik 6x, tiga jalan
       masing-masing: 43,2 fps rata-rata pada 0,55 dan 44,7 pada 0,35. Selisih
       itu di dalam derau; jangan pakai angka ini untuk membenarkan
       memperpendek durasi di tempat lain. */
    /* 0,3 bukan 0,35 lagi. Pita gulir per panel dipendekkan drastis (lihat
       blok GULIR YANG MEMILIH di bawah) jadi ~63px di ponsel; transisi yang
       lebih lama dari waktu tempuh satu pita membuat panel selalu tertinggal
       di belakang jari, dan yang terlihat bukan pergantian melainkan antrean
       pergantian yang saling menyusul. */
    var DURASI_GULIR = 0.3;
    var aktif = 0;
    var tl = null;
    var pertama = true;
    var durasiSekali = null;

    /* Sudut terlipat panel sebelum kedatangannya. -74, bukan -90: pada 90
       derajat panel benar-benar tegak lurus layar dan lebarnya jadi nol, jadi
       yang terlihat cuma garis dan kedatangannya terbaca sebagai kedip, bukan
       sebagai lipatan yang membuka. */
    var TERLIPAT = -74;
    var tersembunyi = !prefersReducedMotion();

    /* Panel sebelum yang aktif miring ke satu arah, sesudahnya ke arah
       sebaliknya, jadi keduanya seolah membuka jalan ke tengah. Dipisah jadi
       fungsi karena kedatangan juga harus mendarat tepat di sudut ini --
       kalau ia mendarat di 0 lalu terapkan() membetulkannya, ada sentakan
       kecil di akhir tiap lipatan. */
    function derajat(i) {
      return i === aktif ? 0 : i < aktif ? MIRING : -MIRING;
    }

    function terapkan() {
      var durasi = pertama || prefersReducedMotion()
        ? 0
        : durasiSekali != null ? durasiSekali : DURASI;
      durasiSekali = null;

      if (tl) tl.kill();
      tl = gsap.timeline();

      panel.forEach(function (p, i) {
        var ini = i === aktif;
        var media = $("[data-panel-media] img", p);
        var tirai = $("[data-panel-tirai]", p);
        var teks = $("[data-panel-teks]", p);

        /* Selama masih terlipat, tata letaknya tetap dihitung dan dipasang --
           yang ditahan cuma tampilannya. Jadi mengubah ukuran layar sebelum
           galerinya tiba tidak membatalkan kedatangan, dan tidak ada satu
           frame pun yang menampilkan panel tegak sebelum waktunya. */
        tl.to(p, {
          flexGrow: ini ? tumbuh : 1,
          rotationY: tersembunyi ? TERLIPAT : derajat(i),
          opacity: tersembunyi ? 0 : 1,
          duration: durasi, ease: EASE,
        }, 0);

        p.setAttribute("aria-current", ini ? "true" : "false");

        if (media) {
          /*
           * PARALAKS. Yang digeser GAMBARNYA DI DALAM BINGKAI, bukan
           * bingkainya. Dulu yang ditweenkan .galeri-media -- span
           * `position:absolute; inset:0` yang sekaligus jadi kotak
           * pengguntingnya -- jadi menggesernya memindahkan gunting dan
           * isinya sekaligus, dan yang tersingkap di sisi berlawanan adalah
           * latar panel. Sekarang bingkainya diam dan <img>-nya yang bergerak
           * di baliknya, persis arti kata paralaks.
           *
           * xPercent, BUKAN x. Geseran 26px tetap masih masuk akal pada bilah
           * desktop selebar ~106px, tapi bilah ponsel cuma 28px -- gambarnya
           * praktis terdorong keluar seluruhnya. Persen mengikat geseran ke
           * lebar panelnya sendiri, jadi satu angka benar di semua lebar.
           *
           * SKALANYA TERIKAT KE GESERAN, dan syaratnya: setengah kelebihan
           * skala harus menutupi geseran terbesar. Geseran maksimum 1,5 x 4%
           * = 6%; skala 1,18 menggantung (1,18-1)/2 = 9% di tiap sisi, jadi
           * tersisa 3% sebagai kelonggaran. Kelonggaran itu bukan hiasan:
           * 6% lawan 7% sempat dipakai dan sisanya cuma 1% — pada bilah
           * ponsel selebar 28px itu 0,28px, cukup untuk menyisakan garis
           * rambut latar panel di tepi setelah pembulatan subpiksel. Kalau
           * salah satu angka diubah, hitung ulang pertidaksamaan ini.
           *
           * Batas 1,5 langkah BUKAN kasus tepi: dengan enam panel, setiap
           * panel yang berjarak dua atau lebih dari yang aktif kena batas itu,
           * jadi 6% adalah geseran yang paling sering dipakai — bukan yang
           * paling jarang. Batasnya sendiri ada supaya panel di ujung tidak
           * melompat sejauh jaraknya dari yang aktif.
           */
          var jarak = Math.max(-1.5, Math.min(1.5, aktif - i));
          tl.to(media, {
            xPercent: ini ? 0 : jarak * 4,
            scale: ini ? 1 : 1.18,
            duration: durasi, ease: EASE,
          }, 0);
        }

        if (tirai) tl.to(tirai, { opacity: ini ? 0 : 0.55, duration: durasi, ease: EASE }, 0);
        if (teks) {
          tl.to(teks, {
            opacity: ini ? 1 : 0,
            x: ini ? 0 : -12,
            duration: ini ? durasi : durasi * 0.6,
            ease: EASE,
          }, 0);
        }
      });

      pertama = false;
    }

    function pilih(i, durasi) {
      if (i === aktif) return;
      aktif = (i + panel.length) % panel.length;
      durasiSekali = typeof durasi === "number" ? durasi : null;
      terapkan();
    }

    /* Hover hanya dipasang di penunjuk yang benar-benar bisa melayang. Di
       layar sentuh pointerenter tetap terkirim saat jari menyentuh, dan itu
       membuat panel berganti tepat sebelum klik diproses. */
    var bisaHover = window.matchMedia("(hover: hover) and (pointer: fine)");

    panel.forEach(function (p, i) {
      dengar(p, "pointerenter", function () { if (bisaHover.matches) pilih(i); });
      dengar(p, "focus", function () { pilih(i); });
      dengar(p, "click", function (e) {
        if (i !== aktif) { e.preventDefault(); pilih(i); }
      });
      dengar(p, "keydown", function (e) {
        var maju = e.key === "ArrowRight" || e.key === "ArrowDown";
        var mundur = e.key === "ArrowLeft" || e.key === "ArrowUp";
        if (!maju && !mundur) return;
        e.preventDefault();
        var tujuan = (i + (maju ? 1 : -1) + panel.length) % panel.length;
        pilih(tujuan);
        panel[tujuan].focus();
      });
    });

    /*
     * KEDATANGAN — enam panel membuka satu per satu, seperti sekat lipat.
     *
     * Sebelum ini galeri sudah berdiri lengkap begitu bagiannya tersingkap:
     * tidak ada yang menandai bahwa ia baru tiba, dan bagian ini jadi
     * satu-satunya di halaman yang isinya muncul tanpa gerak masuk sama
     * sekali.
     *
     * MENUMPANG rotationY YANG SUDAH ADA, bukan sumbu baru. Akordeonnya
     * memang sudah memiringkan panel non-aktif di sumbu Y dengan perspective
     * di wadahnya, jadi melipat dari -74 derajat ke sudut istirahatnya
     * memakai ruang tiga dimensi yang sudah tergelar — bukan efek asing yang
     * ditempelkan di atasnya.
     *
     * MENDARAT DI derajat(i), BUKAN DI NOL. Sudut istirahat tiap panel
     * berbeda (0 untuk yang aktif, ±6 untuk sisanya). Kalau kedatangan
     * mendarat di 0 lalu terapkan() membetulkannya, ada sentakan kecil di
     * ujung tiap lipatan.
     *
     * opacity, BUKAN autoAlpha. autoAlpha menambahkan visibility:hidden, dan
     * itu mengeluarkan keenam <a>-nya dari urutan tab DAN dari pohon
     * aksesibilitas selama masih terlipat. Pengguna keyboard tidak akan
     * pernah bisa men-tab ke sana — dan karena ia tidak bisa fokus ke sana,
     * halamannya tidak pernah tergulir ke sana, jadi pemicu di bawah tidak
     * pernah menyala dan galerinya tidak pernah tiba. Kebutaan yang mengunci
     * dirinya sendiri.
     *
     * Karena itu ada DUA jalan masuk, dan yang duluan tiba yang menang:
     * posisi gulir, atau fokus keyboard yang mendarat di dalamnya.
     */
    var sudahTiba = false;
    function kedatangan() {
      if (sudahTiba) return;
      sudahTiba = true;
      tersembunyi = false;

      if (prefersReducedMotion()) { terapkan(); return; }

      if (tl) tl.kill();
      tl = gsap.timeline();
      panel.forEach(function (p, i) {
        /* 0,075 x 5 + 0,5 = 0,875 detik untuk keenamnya. Cukup lama untuk
           terbaca satu per satu, cukup pendek untuk tidak menahan orang yang
           sudah menggulir melewatinya. */
        tl.to(p, {
          rotationY: derajat(i), opacity: 1,
          duration: 0.5, ease: EASE,
        }, i * 0.075);
      });
    }

    /* Dipasang di akar, bukan di tiap panel: fokus yang mendarat di panel
       mana pun berarti galerinya sudah harus berdiri seluruhnya. */
    dengar(akar, "focusin", kedatangan);

    ScrollTrigger.create({
      trigger: akar,
      /* Lebih awal dari pita pemilih di bawah, dan jaraknya disengaja: pada
         ponsel 844px, kedatangan menyala saat tepi atas galeri di 717px
         sementara pita pemilih baru mulai di 414px. Selisih ~300px gulir itu
         jauh lebih panjang daripada 0,875 detik yang dibutuhkan lipatannya,
         jadi galerinya selalu sudah berdiri utuh sebelum gulir mulai
         memindah-mindah panelnya. */
      start: "top 85%",
      once: true,
      onEnter: kedatangan,
    });

    /*
     * GULIR YANG MEMILIH, UNTUK PERANGKAT TANPA HOVER.
     *
     * Di penunjuk halus menelusuri galeri ini gratis: arahkan kursor, panel
     * terbuka. Di layar sentuh tidak ada gerak yang setara. Yang tersisa cuma
     * ketuk, dan ketuk pertama sudah habis dipakai untuk memilih — jadi
     * melihat keenam sertifikat menuntut sebelas ketukan, dan ketukan pertama
     * yang tidak membuka apa pun terbaca sebagai kegagalan, bukan pilihan.
     *
     * Peran hover karena itu diambil alih posisi gulir: lintasan galeri
     * melewati layar dibagi rata sejumlah panel, dan panel yang pitanya
     * sedang dilewati adalah yang terbuka. Menelusuri kembali gratis, nol
     * ketukan; ketuk kembali murni berarti "buka yang ini".
     *
     * KENAPA BUKAN GARIS TENGAH VIEWPORT. Cara yang biasa dipakai —
     * IntersectionObserver dengan rootMargin "-50% 0px -50% 0px" — rusak di
     * sini justru karena panelnya berubah ukuran: yang terbuka mengambil 52%
     * ruang dan lima sisanya berbagi 48%, jadi melewati panel terbuka
     * menuntut sekitar lima kali lebih banyak gulir daripada melewati bilah.
     * Pemilihannya menempel pada dirinya sendiri, dan dalam satu lintasan
     * layar dua panel terakhir tidak akan pernah tercapai. Pita berbasis
     * kemajuan tidak bergantung pada ukuran yang sedang dianimasikan, jadi
     * keenamnya kebagian jarak gulir yang persis sama.
     *
     * Argumen ini SELAMAT dari perubahan 8 Agustus 2026 yang membuat galeri
     * mendatar di semua lebar, dan itu bukan kebetulan: ia ditulis dalam
     * porsi, bukan piksel. Yang berganti cuma sumbu pembagiannya — dulu
     * tinggi, sekarang lebar — sementara ketimpangan 52:48 yang jadi
     * pokok masalahnya tidak berubah sama sekali.
     *
     * `terakhirGulir` yang membuat ketukan manual tidak langsung ditimpa:
     * gulir hanya bicara saat pitanya BERGANTI, bukan tiap frame. Setelah
     * mengetuk panel lain, geseran beberapa piksel karena jari tidak
     * mengembalikan pilihan — gulir baru mengambil alih lagi saat pengguna
     * memang berpindah pita.
     *
     * Pemicunya tetap dibuat di penunjuk halus, cuma diam. Menanyakan
     * bisaHover di dalam onUpdate, bukan saat membuat, membuat perangkat
     * hibrida yang berpindah modus penunjuk langsung benar tanpa perlu
     * membangun ulang pemicunya.
     */
    var terakhirGulir = -1;
    ScrollTrigger.create({
      trigger: akar,
      /*
       * PITANYA DIPUSATKAN DI TENGAH LAYAR, DAN PENDEK.
       *
       * Sebelum ini "top 85%" sampai "bottom 15%": pemilihan mulai begitu
       * tepi atas galeri menyembul dari dasar layar dan baru habis saat tepi
       * bawahnya nyaris keluar dari puncak. Lintasannya ~809px di ponsel,
       * 135px per panel, dan yang lebih parah dari panjangnya adalah LETAKNYA
       * — dua panel pertama sudah lewat sebelum galerinya sempat berada di
       * tempat yang enak dipandang, dan dua terakhir baru datang saat ia
       * sedang pergi. Menelusurinya menuntut menggulir sepanjang seluruh
       * lintasan galeri melewati layar.
       *
       * Sekarang yang dijadikan patokan TITIK TENGAH galeri, bukan tepinya.
       *
       * UJUNGNYA DINAIKKAN DARI 17% KE 40%, dan itu perbaikan atas percobaan
       * pertama. Pada 17%, titik tengah galeri sudah nyaris menyentuh puncak
       * layar saat sertifikat terakhir baru terbuka — bagiannya praktis sudah
       * lewat, jadi lipatan terakhir tidak pernah sempat dilihat. Sekarang
       * seluruh urutan tuntas saat pusat galeri masih di 40% tinggi layar,
       * yaitu masih di atas garis tengah dan seluruh galerinya masih utuh
       * di layar.
       *
       * Pangkalnya ikut turun 62% -> 75% supaya pitanya tidak jadi terlalu
       * sempit setelah ujungnya dinaikkan: 35% tinggi layar, bukan 45%.
       *
       * PERSEN TINGGI LAYAR, BUKAN PIKSEL — itu yang membuatnya benar di
       * semua perangkat tanpa satu pun titik henti: 35% dari 844 (ponsel)
       * = 295px, 49px per panel; 35% dari 1024 (tablet) = 358px, 60px per
       * panel. Jarak per panelnya ikut tumbuh bersama layarnya, jadi rasanya
       * sama di keduanya.
       */
      start: "center 75%",
      end: "center 40%",
      onUpdate: function (diri) {
        if (bisaHover.matches) return;
        var i = Math.min(panel.length - 1, Math.floor(diri.progress * panel.length));
        if (i === terakhirGulir) return;
        terakhirGulir = i;
        pilih(i, DURASI_GULIR);
      },
    });

    /* Satu-satunya yang perlu memicu gambar ulang sekarang adalah perubahan
       ukuran wadah. Dulu ada pendengar kedua di media query 900px, karena di
       bawahnya galeri ini menumpuk ke bawah dan sumbu miring ikut bertukar;
       sejak ia mendatar di semua lebar, tidak ada lagi orientasi yang bisa
       berganti — dan ResizeObserver ini toh sudah menangkap setiap pergantian
       titik henti, sebab semuanya mengubah tinggi wadahnya. */
    amati(akar, function () { terapkan(); });

    terapkan();
  }


  /*
   * LATAR HIDUP — MEDAN GARIS.
   *
   * Bidang gelap sebesar layar penuh tanpa apa-apa di belakangnya terbaca
   * sebagai halaman gagal muat, bukan keputusan desain. Kontrasnya sangat
   * rendah; yang dirasakan pengunjung adalah ruangnya "bernafas". Kursor
   * menariknya — satu-satunya hal di situs yang menanggapi gerak mouse tanpa
   * harus diklik. Berhenti sendiri saat di luar layar.
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

      /* Canvas di luar layar tidak perlu menggambar apa pun. */
      var io = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          if (!running) { running = true; raf = requestAnimationFrame(draw); }
        } else {
          running = false; cancelAnimationFrame(raf);
        }
      }, { threshold: 0 });
      io.observe(canvas);
      bersih.push(function () { io.disconnect(); running = false; cancelAnimationFrame(raf); });

      amati(canvas, build);

      dengar(window, "pointermove", function (e) {
        var rect = canvas.getBoundingClientRect();
        pointer.x = e.clientX - rect.left;
        pointer.y = e.clientY - rect.top;
      }, { passive: true });
      dengar(window, "pointerleave", function () { pointer.x = -9999; pointer.y = -9999; });
    });
  }

  /* ── 6. PERILAKU ────────────────────────────────────────────────────────*/

  /*
   * TIMER-NYA DIDAFTARKAN, dan sampai 9 Agustus 2026 ia satu-satunya efek
   * samping di berkas ini yang TIDAK — melanggar aturan yang ditulis di
   * kepala berkas ini sendiri.
   *
   * Gejalanya persis yang diperingatkan komentar itu, dan persis jenis cacat
   * yang tidak pernah melempar galat: StrictMode memasang efek dua kali pada
   * simpul DOM yang SAMA, jadi ada dua putaran ketik menulisi satu <span>
   * bergantian. Yang terlihat huruf yang berkedut dan kata yang kadang
   * melompat — mudah disalahartikan sebagai masalah performa, padahal murni
   * dua timer yang berebut.
   *
   * Di produksi StrictMode tidak menggandakan, jadi cacatnya tidak terlihat
   * di sana. Yang tetap berlaku di produksi: tanpa pendaftaran ini timernya
   * hidup selamanya setelah dibongkar.
   */
  function initTypewriter() {
    var el = $("[data-typewriter]");
    if (!el) return;
    var words = JSON.parse(el.getAttribute("data-typewriter"));
    var indexKata = 0, indexHuruf = 0, sedangHapus = false;
    var id = 0;
    bersih.push(function () { clearTimeout(id); });

    (function ketik() {
      var kata = words[indexKata];
      var jeda = sedangHapus ? 50 : 100;
      indexHuruf += sedangHapus ? -1 : 1;
      el.textContent = kata.substring(0, indexHuruf);

      if (!sedangHapus && indexHuruf === kata.length) {
        sedangHapus = true; jeda = 1500;
      } else if (sedangHapus && indexHuruf === 0) {
        sedangHapus = false;
        indexKata = (indexKata + 1) % words.length;
        jeda = 300;
      }
      id = setTimeout(ketik, jeda);
    })();
  }

  /*
   * BILAH STATUS — pengganti navbar. Fungsinya sama, memberi tahu posisi, tapi
   * tanpa meminta perhatian.
   *
   * Pergantiannya bukan fade. Kata lama naik keluar dan kata baru menyusul dari
   * bawah, di dalam jendela setinggi satu baris. Fade antar dua kata berbeda
   * menghasilkan momen di mana keduanya terbaca sekaligus dan tak satu pun
   * terbaca jelas; gerak vertikal tidak pernah punya masalah itu.
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

    CHAPTERS.forEach(function (bab, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", bab.label);
      b.className = "chapter-dot group pointer-events-auto relative flex h-6 w-6 cursor-pointer items-center justify-center" +
        (i === CHAPTERS.length - 1 ? " chapter-dot--last" : "");
      /* Nama bagiannya muncul tepat di atas garis saat disentuh. `aria-hidden`
         karena tombolnya sudah punya aria-label dengan teks yang sama. */
      b.innerHTML = '<span aria-hidden="true" class="chapter-tip -caption-small">' + bab.label + "</span>" +
        '<span data-dot class="block h-px transition-all duration-500 ease-brand w-2 bg-line group-hover:w-4 group-hover:bg-text-muted"></span>';
      dengar(b, "click", function () { scrollTo("#" + bab.id); });
      tambahSimpul(dotsEl, b);
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

    CHAPTERS.forEach(function (bab, i) {
      var el = document.getElementById(bab.id);
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        /* Ambang di tengah layar: bagian dianggap aktif begitu ia melewati
           titik pandang, bukan begitu tepi atasnya menyentuh layar. Tanpa itu
           penanda berkedip bolak-balik di batas antar bagian. */
        start: "top 50%", end: "bottom 50%",
        onToggle: function (self) { if (self.isActive) { index = i; render(); } },
      });
    });

    dengar(jumpBtn, "click", function () { scrollTo("#" + CHAPTERS[index].id); });

    /*
     * WARNA BILAH MENGIKUTI PITA DI BELAKANGNYA.
     *
     * Bilah ini `fixed`, jadi ia melayang DI LUAR pita nada mana pun — dan
     * karena itu tidak ikut membalik warna saat bagian terang lewat di
     * belakangnya. AMBANGNYA BUKAN TEPI BAGIAN, MELAINKAN TENGAH GRADIEN
     * PENGHUBUNG: bilah duduk di sekitar 96% tinggi layar, jadi ambangnya
     * 96% ± separuh tinggi gradien.
     *
     * ANGKANYA TERIKAT KE TINGGI PITA DI Pendidikan.jsx DAN Kontak.jsx. Dulu
     * pita itu 50vh di desktop, jadi separuhnya 25 dan ambangnya 121/71.
     * Sejak pitanya dipendekkan jadi 20/24/28vh, separuhnya ~12 dan
     * ambangnya jadi 108/84.
     *
     * SATU ANGKA UNTUK TIGA TITIK HENTI, dan itu memang kompromi — tapi
     * kompromi yang JAUH lebih kecil dari sebelumnya. Dengan pita 20/24/28,
     * separuhnya 10/12/14, jadi meleset paling jauh 2vh (~17px di ponsel).
     * Dengan pita lama 28/40/50 sementara angkanya dipatok ke 50, melesetnya
     * 11vh di ponsel — sekitar 93px, cukup untuk membalik warna bilah saat
     * latarnya masih jelas gelap. Merapatkan rentang pita itulah yang
     * membereskannya, bukan angka di sini.
     *
     * Kalau tinggi pita diubah lagi, ambang ini WAJIB ikut dihitung ulang:
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
   * ribu piksel, durasi yang sama berarti kecepatan berlipat — semua pemicu
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
    var terlihat = null;
    function sync() {
      var next = window.scrollY > 600;
      if (next === terlihat) return;
      terlihat = next;
      btn.style.opacity = next ? "1" : "0";
      btn.style.transform = next ? "translateY(0)" : "translateY(8px)";
      btn.style.pointerEvents = next ? "auto" : "none";
    }
    sync();
    dengar(window, "scroll", sync, { passive: true });

    dengar(btn, "click", function () {
      var jarak = window.scrollY;
      scrollTo(0, { duration: Math.min(Math.max(jarak / SPEED, MIN), MAX), easing: easeInOutCubic });
    });
  }

  /* Lenis yang memegang scroll, jadi lompatan anchor bawaan browser harus
     dicegah — kalau tidak, halaman menyentak lalu Lenis menariknya balik. */
  function initAnchors() {
    $$('a[href^="#"]').forEach(function (a) {
      dengar(a, "click", function (e) {
        var target = document.querySelector(a.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        scrollTo(target);
      });
    });
  }

  /*
   * FORMULIR KONTAK — dua jalur, satu isian. Keduanya mengirim pesan yang
   * bentuknya sama; yang berbeda hanya aplikasi yang membukanya.
   *
   * wa.me hanya menerima format internasional TANPA "+" dan tanpa nol depan,
   * dan gagalnya DIAM: halaman wa.me tetap terbuka, cuma tidak menemukan
   * nomornya. Jadi nomor dinormalkan di sini.
   */
  function initContactForm() {
    var form = $("#form-kontak");
    if (!form) return;

    var TELEPON = "6285790226536";
    var SUREL = "arif.herfian@gmail.com";

    function ambilIsian() {
      var nama = $("#namaPengirim").value.trim();
      var email = $("#emailPengirim").value.trim();
      var pesan = $("#isiPesan").value.trim();
      /* Pemeriksaan yang sama dipakai kedua tombol. Kalau masing-masing
         memeriksa sendiri, cepat atau lambat salah satunya ketinggalan saat
         aturannya berubah — dan yang lolos adalah pesan kosong. */
      if (nama === "" || pesan === "") {
        alert("Mohon isi nama dan pesan terlebih dahulu!");
        return null;
      }
      return { nama: nama, email: email, pesan: pesan };
    }

    function susunPesan(isian) {
      var teks = "Halo Arif! Saya " + isian.nama;
      if (isian.email) teks += " (" + isian.email + ")";
      return teks + "\n\n" + isian.pesan;
    }

    dengar(form, "submit", function (e) {
      e.preventDefault();
      var isian = ambilIsian();
      if (!isian) return;
      var nomor = TELEPON.replace(/\D/g, "");
      if (nomor.indexOf("0") === 0) nomor = "62" + nomor.slice(1);
      window.open("https://wa.me/" + nomor + "?text=" + encodeURIComponent(susunPesan(isian)),
        "_blank", "noopener,noreferrer");
    });

    dengar($("#kirim-email"), "click", function () {
      var isian = ambilIsian();
      if (!isian) return;
      window.location.href = "https://mail.google.com/mail/?view=cm&fs=1&to=" +
        encodeURIComponent(SUREL) +
        "&su=" + encodeURIComponent("Pesan dari " + isian.nama + " — lewat portofolio") +
        "&body=" + encodeURIComponent(susunPesan(isian));
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
   * Pembuka.jsx tidak menuntut angka di berkas ini ikut diperbarui.
   *
   * KENAPA `lanjut` DIPANGGIL SEBAGAI CALLBACK, BUKAN SETELAH initPembuka.
   *
   * Seluruh animasi situs dipasang lewat parameter itu, dan pemasangannya
   * ditunda sampai panelnya mulai terangkat. Alasannya: gerak masuk Beranda
   * -- topeng judul, clip foto, mesin ketik -- berjalan begitu dipasang. Kalau
   * dipasang bersamaan dengan pembuka, semuanya sudah selesai di balik panel
   * dan yang terlihat saat panel naik cuma halaman diam. Ini persis jenis
   * cacat yang tidak akan pernah muncul sebagai galat.
   *
   * BEDANYA DENGAN PRELOADER YANG DIBUANG PADA 2 AGUSTUS 2026. Yang itu
   * menahan halaman sampai skripnya jalan. Panel ini sudah tergambar sejak
   * frame pertama lewat CSS biasa, jadi tidak ada yang ditunda; ia hanya
   * menutupi. Ia juga punya batas keras 3,5 detik dan dilewati sama sekali
   * kalau pengguna minta gerak dikurangi.
   */
  function initPembuka(lanjut) {
    var panel = $('[data-component="pembuka"]');
    if (!panel) { lanjut(); return; }

    var isi = $("[data-pembuka-isi]", panel);

    /* Batas keras dipasang PALING AWAL, sebelum satu baris pun yang bisa
       melempar. Kalau ada yang gagal di bawah, panelnya tetap terbuka dan
       situs tidak tertutup selamanya. */
    var sudah = false;
    var pemaksa = setTimeout(function () { keluar(); }, 3000);
    bersih.push(function () { clearTimeout(pemaksa); });
    bersih.push(function () {
      document.documentElement.classList.remove("pembuka-aktif");
    });

    /* StrictMode memasang ulang efek ini pada simpul DOM yang SAMA, jadi
       panelnya bisa mewarisi display:none dan opacity 0 dari putaran
       sebelumnya. Dikembalikan dulu ke keadaan berangkat. */
    gsap.set([panel, isi], { clearProps: "all" });
    panel.style.display = "";

    function bereskan() {
      panel.style.display = "none";
      document.documentElement.classList.remove("pembuka-aktif");
      if (lenis) lenis.start();
    }

    function keluar() {
      if (sudah) return;
      sudah = true;
      clearTimeout(pemaksa);

      if (prefersReducedMotion()) { lanjut(); bereskan(); return; }

      /*
       * ANGKA 0,45 ITU HASIL UKUR, BUKAN SELERA.
       *
       * Percobaan pertama memanggil lanjut() di awal fungsi ini. Terukur:
       * panel pergi pada 2180ms, dan sesudah itu baris judul bergeser 0px --
       * seluruh gerak masuk Beranda sudah habis di balik panel, jadi yang
       * terlihat saat halaman terbuka justru halaman diam.
       *
       * Sapuan membuka dari bawah ke atas (inset bawah 0% -> 100%). Memanggil
       * lanjut() pada 0,45 detik menaruh awal gerak Beranda di saat sapuan
       * sudah membuka sebagian: ekornya tersembunyi di balik sisa panel, dan
       * bagian terbesarnya berjalan di halaman yang sudah terbuka penuh.
       */
      gsap.timeline({ onComplete: bereskan })
        .to(isi, { autoAlpha: 0, duration: 0.25, ease: "power2.in" })
        .to(panel, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.6, ease: EASE }, "-=0.1")
        .call(lanjut, null, 0.45);
    }

    if (prefersReducedMotion()) { keluar(); return; }

    document.documentElement.classList.add("pembuka-aktif");
    if (lenis) lenis.stop();
    /* Peramban memulihkan posisi gulir kunjungan sebelumnya; tanpa ini situs
       terbuka di tengah halaman begitu panelnya naik. */
    window.scrollTo(0, 0);

    var bingkai = $$("[data-pembuka-bingkai] path", panel);
    var goresan = $$("[data-pembuka-goresan] path", panel);
    var kunci = $$("[data-pembuka-kunci] path", panel);

    bingkai.concat(goresan, kunci).forEach(function (p) {
      var panjang = p.getTotalLength();
      p.style.strokeDasharray = panjang;
      p.style.strokeDashoffset = panjang;
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
        var siapFont = (document.fonts && document.fonts.ready) || Promise.resolve();
        var batasFont = new Promise(function (lepas) {
          var id = setTimeout(lepas, 500);
          bersih.push(function () { clearTimeout(id); });
        });
        Promise.race([siapFont, batasFont]).then(keluar);
      },
    });

    /*
     * Urutannya menceritakan bentuknya terbentuk, bukan sekadar muncul:
     * heksagon menggariskan wilayahnya, satu goresan menyusur naik dari kaki
     * kiri melewati puncak lalu turun ke kaki kanan, baru palangnya mengunci
     * keduanya jadi satu tanda. Palang itu sengaja paling akhir DAN sendirian
     * di ujung timeline -- sampai ia turun, bentuknya masih terbaca sebagai
     * gerbang kosong. Seluruh lambang satu warna, jadi urutan inilah
     * satu-satunya yang membedakan perannya.
     */
    tl.to(bingkai, { strokeDashoffset: 0, duration: 0.45, stagger: 0.07, ease: "power2.out" }, 0);
    tl.to(goresan, { strokeDashoffset: 0, duration: 0.8, ease: "power1.inOut" }, 0.22);
    tl.to(kunci, { strokeDashoffset: 0, duration: 0.38, ease: "power2.out" }, 0.98);
  }

  /* ── 7. PENYALAAN ───────────────────────────────────────────────────────
   *
   * Urutannya bukan selera. Struktur dibangun lebih dulu (huruf, lambang,
   * odometer, salinan marquee) karena setiap transisi di bawahnya mencari
   * elemen yang baru saja dibuat itu. Baru setelah semuanya ada di DOM,
   * animasi dipasang.
   *
   * Lenis dinyalakan sebelum pembuka supaya ada yang bisa dihentikan selama
   * panelnya menutup; sisanya menunggu panggilan balik dari initPembuka().
   */
  function start() {
    buildGlyphs();
    buildOdometers();
    buildLetterHover();
    buildWordScrub();
    buildPapanBalik();
    buildMarquees();

    initScroller();
    initPembuka(pasangSisanya);
  }

  function pasangSisanya() {
    initLineMasks();
    initScrubReveals();
    initRevealImages();
    initWordScrub();
    initSplitWords();
    initOdometers();
    initGlyphRings();
    initPapanBalik();
    initKartuPeran();
    initMarquees();
    initTukarKartu();
    initGaleriAkordeon();
    initAmbientLines();

    initTypewriter();
    initStatusBar();
    initBackToTop();
    initAnchors();
    initContactForm();

    /*
     * Hitung ulang semua posisi pemicu setelah tata letak benar-benar final.
     *
     * Ini bukan kehati-hatian berlebih. Panggung yang di-pin menyisipkan
     * spacer setinggi lebih dari seribu piksel, dan itu mendorong turun SEMUA
     * bagian di bawahnya. Pemicu milik bagian-bagian itu sudah menghitung titik
     * start dan end-nya lebih dulu, saat spacer belum ada.
     *
     * Dijalankan di rAF supaya jatuh setelah frame pertama selesai digambar.
     */
    requestAnimationFrame(function () { ScrollTrigger.refresh(); });

    /* SEKALI LAGI setelah font khusus benar-benar terpasang: tata letak sudah
       tergambar memakai font cadangan, dan begitu Inter menggantikannya, tinggi
       tiap blok teks berubah dan SEMUA titik pemicu di bawahnya ikut bergeser. */
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
    }
  }

  start();

  /*
   * PEMBONGKAR. Urutannya penting: Lenis dimatikan lebih dulu supaya ia tidak
   * lagi memanggil ScrollTrigger.update saat pemicunya sedang dibunuh.
   */
  return function bongkar() {
    if (lenis) { lenis.destroy(); lenis = null; }
    ScrollTrigger.getAll().forEach(function (t) { t.kill(true); });
    gsap.globalTimeline.clear();
    for (var i = bersih.length - 1; i >= 0; i--) bersih[i]();
    bersih = [];
  };
}
