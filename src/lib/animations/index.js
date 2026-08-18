/*
 * ══════════════════════════════════════════════════════════════════════════
 * SELURUH MOTION SITUS INI — PINTU MASUK DAN URUTAN PENYALAANNYA.
 *
 * ══ TEKNIS
 *
 * Dipanggil sekali dari useLayoutEffect di src/App.jsx, dan MENGEMBALIKAN
 * fungsi teardown. Itu bukan kerapian belaka: React StrictMode sengaja memasang
 * lalu melepas lalu memasang lagi tiap efek waktu pengembangan, dan node DOM-nya
 * TIDAK dibuat ulang. Tanpa teardown, tiap event listener, ticker, dan scroll
 * trigger akan terpasang dua kali — gejalanya animasi jadi dua kali lebih cepat
 * dan scroll terasa berat, hanya di mode pengembangan, jadi mudah
 * disalahartikan sebagai masalah performa.
 *
 * ══ DIPECAH JADI MODUL PADA 19 AGUSTUS 2026
 *
 * Sebelumnya seluruh isi folder ini berdiri di satu berkas, src/lib/animations.js,
 * sepanjang 2.336 baris. Pemecahannya MEKANIS: badan tiap fungsi dipotong apa
 * adanya, tidak ada satu baris logika pun yang ditulis ulang.
 *
 * Yang berubah cuma cara keadaan bersama dioper. Dulu semuanya closure di dalam
 * satu fungsi raksasa; sekarang:
 *
 *   tokens.js      angka dan lengkung motion — diimpor, tidak dioper
 *   dom.js         pembantu pencari elemen dan deteksi perangkat — diimpor
 *   lifecycle.js   keempat pendaftar teardown + slot lenis/scrollTo — INI ctx
 *   scroller.js    menyalakan Lenis lalu menitipkan lenis + scrollTo ke ctx
 *
 * Sisanya modul motion, masing-masing menerima `ctx` sebagai argumen pertama.
 * Pola di dalamnya selalu sama: destructuring di baris pertama, lalu badan yang
 * tidak berubah sama sekali dari versi satu berkas.
 *
 * KENAPA ctx DIOPER, BUKAN DIIMPOR. Keempat pendaftar teardown memegang KEADAAN
 * — daftar apa saja yang sudah dipasang — dan keadaan itu harus mati bersama
 * satu kali pemasangan. Kalau ia diimpor sebagai singleton, mount kedua di
 * StrictMode akan menumpuk ke daftar yang sama dan teardown mount pertama akan
 * membongkar milik mount kedua. Token dan pembantu DOM tidak punya keadaan, jadi
 * keduanya boleh diimpor.
 *
 * KALAU MENAMBAH SIDE EFFECT BARU, pakai keempat pendaftar itu — jangan panggil
 * addEventListener, gsap.ticker.add, new ResizeObserver, atau appendChild secara
 * langsung. Alasannya lengkap di lifecycle.js.
 *
 * ══ BAHASA AWAMNYA
 *
 * Semua gerakan di situs ini — teks yang muncul saat di-scroll, kartu yang
 * bergilir, galeri sertifikat, garis-garis di latar — dulu ditulis dalam satu
 * berkas raksasa yang harus di-scroll ribuan baris untuk menemukan apa pun.
 * Sekarang ia dibagi jadi dua belas berkas kecil menurut bagian halamannya,
 * tanpa satu pun gerakan berubah.
 *
 * Berkas ini sendiri tidak berisi gerakan apa pun. Ia cuma daftar urutan: siapa
 * dinyalakan lebih dulu, dan siapa menunggu.
 * ══════════════════════════════════════════════════════════════════════════
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { createLifecycle } from "./lifecycle.js";
import { initScroller } from "./scroller.js";
import {
  buildGlyphs,
  buildLetterHover,
  buildMarquees,
  buildOdometers,
  buildWordScrub,
} from "./builders.js";
import {
  initLineMasks,
  initOdometers,
  initRevealImages,
  initScrubReveals,
  initSplitWords,
  initWordScrub,
} from "./reveals.js";
import { initGlyphRings, initRoleCards } from "./role-cards.js";
import { initCardSwap } from "./card-swap.js";
import { initAccordionGallery } from "./gallery.js";
import { initAmbientLines, initMarquees } from "./ambient.js";
import {
  initAnchors,
  initBackToTop,
  initContactForm,
  initStatusBar,
  initTypewriter,
} from "./behaviors.js";
import { initIntro } from "./intro.js";

gsap.registerPlugin(ScrollTrigger);

/* Lenis yang menggerakkan scroll, jadi ticker GSAP yang harus memanggil rAF —
   dua loop rAF terpisah membuat scroll dan animasi beda satu frame. */
gsap.ticker.lagSmoothing(0);

export function setupAnimations() {
  const ctx = createLifecycle();

  /*
   * URUTANNYA BUKAN SELERA. Struktur dibangun lebih dulu (huruf, logo,
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
    buildMarquees(ctx);

    initScroller(ctx);
    initIntro(ctx, setupRest);
  }

  function setupRest() {
    initLineMasks(ctx);
    initScrubReveals(ctx);
    initRevealImages(ctx);
    initWordScrub(ctx);
    initSplitWords(ctx);
    initOdometers(ctx);
    initGlyphRings(ctx);
    initRoleCards(ctx);
    initMarquees(ctx);
    initCardSwap(ctx);
    initAccordionGallery(ctx);
    initAmbientLines(ctx);

    initTypewriter(ctx);
    initStatusBar(ctx);
    initBackToTop(ctx);
    initAnchors(ctx);
    initContactForm(ctx);

    /*
     * Hitung ulang semua posisi trigger setelah layout benar-benar final.
     *
     * Ini bukan kehati-hatian berlebih. Bagian-bagian di bawah bisa bergeser
     * setelah trigger-nya menghitung titik start dan end-nya, dan trigger yang
     * menghitung dari layout lama berhenti di tempat yang salah.
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
    if (ctx.lenis) { ctx.lenis.destroy(); ctx.lenis = null; }
    ScrollTrigger.getAll().forEach(function (t) { t.kill(true); });
    gsap.globalTimeline.clear();
    ctx.teardown();
  };
}
