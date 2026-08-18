/*
 * PEMBANTU DOM DAN DETEKSI PERANGKAT.
 *
 * ══ TEKNIS
 *
 * Kelima fungsi di sini murni: ia membaca, tidak pernah menulis, dan tidak
 * menyimpan keadaan apa pun. Itu sebabnya ia tidak lewat ctx seperti pendaftar
 * teardown di lifecycle.js — tidak ada yang perlu dibongkar.
 *
 * `$$` mengembalikan array sungguhan, bukan NodeList, supaya `.forEach`,
 * `.map`, dan `.filter` bisa dipakai apa adanya di seluruh modul.
 *
 * ══ BAHASA AWAMNYA
 *
 * Pembantu kecil untuk mencari elemen di halaman, plus pemeriksaan apakah
 * pengunjung meminta animasi dikurangi dan apakah perangkatnya tergolong lemah.
 */

export const $ = function (sel, root) { return (root || document).querySelector(sel); };
export const $$ = function (sel, root) {
  return Array.prototype.slice.call((root || document).querySelectorAll(sel));
};


export function prefersReducedMotion() {
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
export function weakDevice() {
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
export function visibleOnLoad(el, ratio) {
  return el.getBoundingClientRect().top < window.innerHeight * (ratio || 0.92);
}
