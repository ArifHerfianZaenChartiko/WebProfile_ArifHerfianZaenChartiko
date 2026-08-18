import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

/*
 * FONT AWESOME DILEPAS SELURUHNYA pada 18 Agustus 2026.
 *
 * ══ TEKNIS
 *
 * Di sini dulu berdiri tiga impor CSS-nya (fontawesome, solid, brands).
 * Riwayatnya: sampai 9 Agustus 2026 ia dimuat dari cdnjs lewat <link> di
 * <head> — memblokir render, tanpa integrity hash, dan titik gagal tunggal —
 * lalu dipindahkan ke sini supaya Vite membundelnya dan melayaninya dari
 * domain sendiri. Impornya juga sengaja tiga berkas, bukan `all.min.css`,
 * supaya `regular` dan shim v4 tidak ikut terseret.
 *
 * Yang tidak bisa diperbaiki dari sisi pemakai: BOBOT BERKAS FONTNYA. Vite
 * menyalin fa-solid-900 dan fa-brands-400 utuh (woff2 dan ttf) ke dist —
 * 913 KB di disk, 277 KB yang benar-benar diunduh peramban — sementara yang
 * dirujuk halaman ini cuma 14 glif. Berkas font memuat ribuan glif dan tidak
 * bisa dipangkas dari sini.
 *
 * Penggantinya src/components/Icon.jsx: keempat belas path SVG yang sama,
 * dikutip dari berkas SVG di paket itu, seluruhnya 9,6 KB dan ikut masuk ke
 * bundel JS yang memang sudah diunduh. Tidak ada permintaan jaringan baru,
 * tampilannya tidak berubah, dan paketnya sudah dilepas dari package.json.
 * Alasan lengkap dan catatan lisensinya ada di berkas itu.
 *
 * ══ BAHASA AWAMNYA
 *
 * Ikon-ikon kecil di situs ini dulu ikut mengunduh dua berkas huruf khusus
 * berisi ribuan gambar, padahal yang dipakai cuma 14. Sekarang keempat belas
 * gambar itu ditulis langsung di dalam kode, jadi 277 KB unduhan hilang tanpa
 * satu pun tampilan berubah.
 */

/*
 * KEDUA FONT JUGA DIBUNDEL, sejak 15 Agustus 2026 — alasan yang sama persis
 * dengan Font Awesome di atas, dan ini yang terakhir tersisa.
 *
 * Sampai hari itu index.html memuat fonts.googleapis.com lewat <link> di
 * <head>. Tiga ongkosnya: ia MEMBLOKIR render sampai permintaan ke host asing
 * itu selesai; ia titik gagal tunggal; dan ia mengirimkan alamat IP setiap
 * pengunjung ke Google — yang di Eropa sudah beberapa kali dinyatakan
 * melanggar GDPR. Tidak ada satu pun dari ketiganya yang bisa ditutup dengan
 * SRI, sebab CSS yang dikirim Google berbeda-beda per peramban sehingga
 * hash-nya tidak pernah tetap.
 *
 * SUBSET `latin` SAJA, bukan berkas penuh. Halaman ini seluruhnya bahasa
 * Indonesia, dan subset latin sudah memuat tanda baca yang dipakai (em dash,
 * tanda kutip melengkung, elipsis). Berkas penuh menyeret pula sirilik,
 * yunani, dan vietnam yang tidak akan pernah tergambar satu huruf pun.
 *
 * BOBOTNYA PERSIS YANG DIMINTA URL LAMA: Inter 400 dan 500, JetBrains Mono
 * 400. Kalau nanti ada class bobot baru dipakai, tambahkan barisnya di sini —
 * kalau tidak, peramban akan menebalkan sendiri secara sintetis dan hurufnya
 * terlihat kotor.
 *
 * `font-display: swap` sudah ada di dalam berkasnya, sama dengan parameter
 * `&display=swap` di URL lama, jadi perilaku muatnya tidak berubah.
 */
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/jetbrains-mono/latin-400.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
