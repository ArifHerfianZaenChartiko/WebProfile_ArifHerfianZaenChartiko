/*
 * REVEAL — motion masuk yang digerakkan posisi scroll.
 *
 * ══ TEKNIS
 *
 * Keenam fungsi di sini satu keluarga: semuanya memulihkan elemen dari keadaan
 * tersembunyi (clip-path terpotong, huruf di bawah mask, opacity rendah) dan
 * semuanya dikemudikan `scrub` alih-alih waktu. Yang membedakannya cuma bentuk
 * penyembunyiannya.
 *
 * ══ BAHASA AWAMNYA
 *
 * Ini yang membuat teks dan gambar muncul perlahan saat halaman di-scroll,
 * bukan langsung tampil sekaligus.
 */
import { gsap } from "gsap";
import { $, $$, visibleOnLoad, prefersReducedMotion } from "./dom.js";
import { CLIP, DEVICE, DURATION, EASE, EASE_SCRUB, SCRUB, STAGGER } from "./tokens.js";

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
export function initLineMasks(ctx) {
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
export function initScrubReveals(ctx) {
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
export function initRevealImages(ctx) {
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
export function initWordScrub(ctx) {
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
export function initSplitWords(ctx) {
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
export function initOdometers(ctx) {
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
