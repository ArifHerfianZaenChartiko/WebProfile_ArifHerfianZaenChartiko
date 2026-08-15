import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

/*
 * Font Awesome DIBUNDEL, bukan dipanggil dari CDN.
 *
 * Sampai 9 Agustus 2026 index.html memuat all.min.css 6.5.0 dari cdnjs.
 * Tiga masalahnya sekaligus: ia <link> di <head> jadi MEMBLOKIR render
 * sampai permintaan pihak ketiga itu selesai; ia tanpa integrity hash; dan
 * ia titik gagal tunggal — kalau cdnjs tidak terjangkau, kedua belas ikon di
 * halaman ini lenyap tanpa jejak.
 *
 * Diimpor dari sini, Vite yang mengurusnya: CSS-nya masuk ke file gaya
 * yang sudah di-download, file fontnya keluar ke dist dengan nama ber-hash
 * dan dilayani dari domain sendiri. Jumlah bytenya tidak berubah banyak —
 * yang hilang perjalanan ke host asing dan ketergantungan padanya.
 *
 * TIGA FILE, BUKAN all.min.css. Halaman ini cuma memakai dua keluarga —
 * 13 ikon solid dan 2 brands. `all` menyeret juga `regular` dan shim
 * kompatibilitas v4 beserta file fontnya, yang tidak dirujuk satu class
 * pun di sini. Kalau nanti ada ikon `fa-regular` ditambahkan, tambahkan
 * barisnya di sini — kalau tidak, ikonnya akan muncul sebagai kotak kosong.
 *
 * Diimpor SETELAH index.css supaya kalau suatu saat ada nama class yang
 * bertabrakan, milik situs ini yang menang.
 */
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";
import "@fortawesome/fontawesome-free/css/brands.min.css";

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
