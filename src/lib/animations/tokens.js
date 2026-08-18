/*
 * TOKEN MOTION — kosakata bersama seluruh modul animasi.
 *
 * ══ TEKNIS
 *
 * Dipisahkan ke berkas sendiri pada 19 Agustus 2026, waktu animations.js dipecah
 * jadi modul. Nilainya tidak berubah satu pun. Yang berubah cuma tempatnya: dulu
 * ia `var` di dalam closure setupAnimations(), sekarang `export const` yang
 * diimpor tiap modul yang memakainya.
 *
 * Kenapa satu berkas dan bukan dititipkan ke salah satu modul: kalau angka
 * kelambatan scrub dititipkan di reveals.js, modul lain yang memakainya jadi
 * bergantung pada reveals.js untuk alasan yang tidak ada hubungannya dengan
 * reveal. Token tidak punya perilaku, jadi ia tidak boleh punya pemilik.
 *
 * ══ BAHASA AWAMNYA
 *
 * Ini daftar angka dan lengkung gerak yang dipakai bersama seluruh animasi
 * situs — semacam palet, tapi untuk gerakan alih-alih warna. Mengubah satu
 * angka di sini mengubah seluruh situs sekaligus.
 */

/* ── KURVA ────────────────────────────────────────────────────────────────
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
export const EASE = "power4.out";
export const EASE_SCRUB = "none";
export const DURATION = { quick: 0.3, reveal: 0.7, long: 1.1 };

/*
 * Kelambatan scrub, dalam detik. Angka (bukan `true`) membuat animasi
 * mengejar posisi scroll selama sekian detik, bukan menempel 1:1. Menempel
 * persis terasa gemetar karena tiap getaran roda mouse langsung tergambar.
 * Yang ter-pin dibuat lebih rapat: saat halaman diam di tempat, kelambatan
 * besar terbaca sebagai kendali yang lepas dari jari.
 */
export const SCRUB = 0.35;
export const SCRUB_PIN = 0.3;
export const STAGGER = 0.07;
export const STAGGER_LETTER = 0.03;

/* Urutan nilai inset() adalah (atas kanan bawah kiri), jadi nama di bawah
   menyebut DI MANA elemen menempel saat tersembunyi — bukan arah motion-nya. */
export const CLIP = {
  collapsedTop: "inset(0% 0% 100% 0%)",
  collapsedBottom: "inset(100% 0% 0% 0%)",
  visible: "inset(0% 0% 0% 0%)",
};
/* ── 2. DETEKSI PERANGKAT ───────────────────────────────────────────────*/
export const DEVICE = {
  desktop: "(min-width: 900px)",
  tablet: "(min-width: 640px) and (max-width: 899px)",
  mobile: "(max-width: 639px)",
};

