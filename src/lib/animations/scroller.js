/*
 * SCROLL HALUS DAN SATU-SATUNYA PINTU UNTUK MELOMPAT.
 *
 * ══ TEKNIS
 *
 * initScroller() menyalakan Lenis lalu MENITIPKAN dua hal ke ctx: instansnya dan
 * fungsi scrollTo(). Semua pemanggil melompat lewat fungsi itu, tidak ada yang
 * memanggil lenis.scrollTo() langsung — itu yang membuat tempo lompatan seragam
 * di seluruh situs.
 *
 * scrollTo() DIDEFINISIKAN DI LUAR cabang reduced motion, sengaja: kalau
 * pengunjung meminta animasi dikurangi, Lenis tidak menyala tapi tombol lompat
 * tetap harus bekerja. Cabang cadangan di dalamnya yang mengurusnya.
 *
 * ══ BAHASA AWAMNYA
 *
 * Ini yang membuat gulir halaman terasa halus, dan yang mengatur laju saat Anda
 * menekan tombol untuk melompat ke bagian lain.
 */
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { $, prefersReducedMotion } from "./dom.js";

/*
 * ══════════════════════════════════════════════════════════════════════════
 * TEMPO LOMPATAN — SATU TEMPAT UNTUK SEMUA, sejak 15 Agustus 2026.
 *
 * Angka-angka ini dulu hidup di dalam initBackToTop() dan hanya dipakai
 * tombol panah. Akibatnya lompatan lain -- "Hubungi Saya", "Lihat Profil",
 * chapter marker di bar status, dan tombol bagian-yang-sedang-dibaca --
 * jatuh ke bawaan Lenis: durasi 1,1 detik untuk jarak SEBERAPA PUN, dengan
 * kurva expo-out.
 *
 * Dua-duanya bermasalah, dan yang kedua yang paling terasa.
 *
 *   DURASI TETAP berarti kecepatan berbanding lurus dengan jarak. Lompatan
 *   Beranda -> Kontak menempuh belasan ribu piksel dalam 1,1 detik yang
 *   sama dengan lompatan Beranda -> Tentang yang cuma sekitar 900px.
 *   Halaman terbaca seperti disentak, bukan diantar.
 *
 *   EXPO-OUT berangkat dengan sentakan: sekitar 23% lintasan habis di 3%
 *   waktu pertama. Itulah yang terbaca sebagai "kecepetan" bahkan pada
 *   jarak pendek, dan itu sudah tertulis di komentar tombol panah sejak
 *   awal -- cuma perbaikannya waktu itu tidak ikut dibagikan ke pemanggil
 *   lain.
 *
 * Sekarang keduanya dihitung DI SINI, jadi semua lompatan otomatis
 * seragam tanpa satu pun pemanggil perlu tahu angkanya. Menambah tombol
 * lompat baru tidak menuntut apa-apa selain memanggil scrollTo().
 *
 * Bahasa awamnya: ke bagian mana pun Anda melompat -- lewat tombol di
 * halaman sampul, lewat garis-garis kecil di bar bawah, atau lewat tombol
 * panah ke atas -- lajunya sekarang sama dan tidak lagi menyentak di awal.
 * Lompatan jauh memakan waktu lebih lama daripada lompatan dekat, seperti
 * seharusnya.
 * ═══════════════════════════════════════════════════════════════════════ */
const JUMP = { speed: 2200, min: 0.9, max: 3 };

/* easeInOutCubic: berangkat pelan, cepat di tengah, mendarat pelan.
   Menggantikan expo-out bawaan Lenis, yang sentakan awalnya itulah yang
   terbaca sebagai kecepetan. */
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/* Tepi atas tujuan dalam koordinat dokumen. rect + scrollY, BUKAN
   offsetTop: offsetTop diukur relatif ke offsetParent terdekat, dan itu
   benar hanya selama section-nya anak langsung <body>. Rect selalu benar
   berapa pun dalamnya ia bersarang. */
function targetTop(target) {
  if (typeof target === "number") return target;
  var el = typeof target === "string" ? $(target) : target;
  if (!el) return 0;
  return el.getBoundingClientRect().top + window.scrollY;
}

export function initScroller(ctx) {
  const { addTicker } = ctx;
  let lenis = null;

  /* Reduced motion: Lenis tidak dinyalakan sama sekali, dan scrollTo() di bawah
     jatuh ke cabang cadangannya. */
  if (!prefersReducedMotion()) {
    lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    addTicker(function (time) { lenis.raf(time * 1000); });
  }

  ctx.lenis = lenis;

  /* Satu-satunya pintu untuk melompat antar bagian. Jalur cadangan dipakai
     kalau Lenis tidak menyala (reduced motion); ia tidak bisa meniru durasi
     dan kurva per panggilan — scroll bawaan browser hanya kenal "smooth". */
  ctx.scrollTo = function scrollTo(target, opts) {
    if (!lenis) {
      /* "auto", BUKAN "smooth" — dibetulkan 15 Agustus 2026.
         Cabang ini HANYA pernah dijalankan saat pengunjung minta reduced
         motion, sebab itulah satu-satunya sebab lenis tidak menyala. Jadi
         "smooth" di sini berarti satu-satunya kelompok yang secara tegas
         meminta tidak ada animasi adalah satu-satunya yang mendapatkannya.
         Bahasa awamnya: lompatan antar bagian sekarang seketika bagi yang
         mematikan animasi lewat pengaturan perangkatnya. */
      window.scrollTo({ top: targetTop(target), behavior: "auto" });
      return;
    }

    /* Salinan dangkal, bukan objek pemanggil yang disunting di tempat:
       pemanggil boleh mengoper literal yang sama berulang kali, dan
       menuliskan durasi ke dalamnya membuat panggilan kedua memakai durasi
       hasil hitungan panggilan pertama. */
    var given = opts || {};
    var o = {};
    for (var k in given) o[k] = given[k];

    /* Keduanya hanya diisi kalau pemanggil TIDAK menentukan sendiri, supaya
       masih ada jalan keluar kalau suatu saat ada lompatan yang memang perlu
       tempo lain. Sampai sekarang tidak ada satu pun yang memakainya. */
    if (o.duration == null) {
      var distance = Math.abs(targetTop(target) - window.scrollY);
      o.duration = Math.min(Math.max(distance / JUMP.speed, JUMP.min), JUMP.max);
    }
    if (o.easing == null) o.easing = easeInOutCubic;

    lenis.scrollTo(target, o);
  };
}
