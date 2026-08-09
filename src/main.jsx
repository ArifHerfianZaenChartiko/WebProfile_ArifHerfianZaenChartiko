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
 * Diimpor dari sini, Vite yang mengurusnya: CSS-nya masuk ke berkas gaya
 * yang sudah diunduh, berkas fontnya keluar ke dist dengan nama ber-hash
 * dan dilayani dari domain sendiri. Jumlah bytenya tidak berubah banyak —
 * yang hilang perjalanan ke host asing dan ketergantungan padanya.
 *
 * TIGA BERKAS, BUKAN all.min.css. Halaman ini cuma memakai dua keluarga —
 * 13 ikon solid dan 2 brands. `all` menyeret juga `regular` dan shim
 * kompatibilitas v4 beserta berkas fontnya, yang tidak dirujuk satu kelas
 * pun di sini. Kalau nanti ada ikon `fa-regular` ditambahkan, tambahkan
 * barisnya di sini — kalau tidak, ikonnya akan muncul sebagai kotak kosong.
 *
 * Diimpor SETELAH index.css supaya kalau suatu saat ada nama kelas yang
 * bertabrakan, milik situs ini yang menang.
 */
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";
import "@fortawesome/fontawesome-free/css/brands.min.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
