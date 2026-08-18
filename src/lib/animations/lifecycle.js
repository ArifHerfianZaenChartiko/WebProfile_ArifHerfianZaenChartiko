/*
 * PENDAFTAR TEARDOWN — empat pembantu yang membuat animasi bisa dibongkar.
 *
 * ══ TEKNIS
 *
 * React StrictMode sengaja memasang lalu melepas lalu memasang lagi tiap efek
 * waktu pengembangan, dan node DOM-nya TIDAK dibuat ulang. Tanpa teardown, tiap
 * event listener, ticker, dan scroll trigger terpasang dua kali — gejalanya
 * animasi jadi dua kali lebih cepat dan scroll terasa berat, hanya di mode
 * pengembangan, jadi mudah disalahartikan sebagai masalah performa.
 *
 * Karena itu SETIAP side effect di seluruh modul animasi didaftarkan lewat empat
 * pembantu di bawah. Kalau menambah side effect baru, pakai keempatnya — jangan
 * panggil addEventListener, gsap.ticker.add, new ResizeObserver, atau
 * appendChild secara langsung.
 *
 * createLifecycle() mengembalikan objek yang dioper ke tiap modul sebagai `ctx`.
 * Sebelum 19 Agustus 2026 keempatnya closure di dalam satu berkas raksasa; yang
 * berubah cuma cara mengopernya, bukan mekanismenya.
 *
 * ══ BAHASA AWAMNYA
 *
 * Setiap animasi yang dipasang harus bisa dilepas lagi dengan bersih. Berkas ini
 * yang mencatat semua yang dipasang, supaya saat halaman ditutup atau dimuat
 * ulang tidak ada sisa yang menumpuk dan memperlambat situs.
 */
import { gsap } from "gsap";

export function createLifecycle() {
  /* Daftar teardown. Diisi oleh keempat pembantu di bawah, dijalankan
     terbalik saat teardown() dipanggil. */
  const cleanups = [];

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

  return {
    cleanups,
    listen,
    addTicker,
    observe,
    addNode,

    /* lenis dan scrollTo diisi initScroller(); modul lain membacanya dari sini.
       Ditulis sebagai slot kosong supaya urutan penyalaan yang salah gagal
       terang-terangan (undefined is not a function) alih-alih diam-diam
       melompat tanpa animasi. */
    lenis: null,
    scrollTo: null,

    teardown() {
      for (let i = cleanups.length - 1; i >= 0; i--) cleanups[i]();
      cleanups.length = 0;
    },
  };
}
