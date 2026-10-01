import { useLayoutEffect } from "react";
import { setupAnimations } from "./lib/animations/index.js";
import { useLangState } from "./i18n/lang.jsx";

import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Experience from "./components/Experience.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Education from "./components/Education.jsx";
import Certificates from "./components/Certificates.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Interface from "./components/Interface.jsx";
import Intro from "./components/Intro.jsx";
import LanguageSwitch from "./components/LanguageSwitch.jsx";

/*
 * ══ GANTI BAHASA = <Page> DIPASANG ULANG — dipasang 1 Oktober 2026.
 *
 * ══ TEKNIS
 *
 * `key={lang}` membuat React membuang seluruh pohon halaman lalu membangunnya
 * lagi dari nol setiap kali bahasa berganti. Itu disengaja, dan alternatifnya
 * — menukar teks di tempat — RUSAK DIAM-DIAM di sini:
 *
 *   buildWordScrub()    mengganti isi kalimat pembuka Tentang dengan
 *                       <span data-word> per kata
 *   buildLetterHover()  mengganti nama instansi di kartu Pengalaman dengan
 *                       satu <span> per huruf
 *   buildMarquees()     menggandakan isi band berjalan tiga kali
 *   initTypewriter()    menulisi <span> peran di Beranda lewat textContent
 *
 * Keempatnya menulis ke node yang dimiliki React. Begitu React mencoba
 * memperbarui teks di dalamnya, yang ia temukan bukan lagi struktur yang ia
 * buat: teks baru menempel di sebelah span lama, atau removeChild melempar
 * NotFoundError dan seluruh halaman putih.
 *
 * Dipasang ulang, semua itu lenyap sebagai soal: teardown dari
 * setupAnimations() membongkar yang lama, React merender teks baru ke node
 * yang benar-benar baru, dan setupAnimations() memecahnya lagi. Ini jalur
 * yang SAMA PERSIS dengan mount kedua StrictMode di mode pengembangan, jadi ia
 * sudah teruji setiap kali `npm run dev` dibuka.
 *
 * DUA HAL YANG MEMBEDAKAN PEMASANGAN ULANG DARI KUNJUNGAN PERTAMA:
 *
 *   intro   panel monogram TIDAK dirender lagi. Memutarnya ulang setiap ganti
 *           bahasa membuat tombolnya terasa seperti me-reload situs.
 *   anchor  titik baca dipulihkan ke paragraf yang sama — lihat
 *           captureScrollAnchor() di src/lib/animations/scroller.js.
 *
 * <LanguageSwitch> BERDIRI DI LUAR <Page>, supaya ia tidak ikut dibuang:
 * fokus keyboard tetap di tombol yang baru saja ditekan, dan penanda gesernya
 * sempat beranimasi alih-alih muncul seketika di posisi akhirnya.
 *
 * IA DITULIS SEBELUM <Page>, BUKAN SESUDAHNYA — dibetulkan di hari yang sama.
 * Urutan Tab mengikuti urutan DOM, bukan posisi di layar. Ditaruh sesudah
 * <Page>, tombolnya baru tercapai di Tab ke-28 dari 29: pengguna keyboard
 * harus melewati seluruh tautan, form, dan tombol halaman dulu sebelum bisa
 * mengganti bahasa. Sekarang ia yang pertama. Tampilannya tidak bergeser
 * sedikit pun, sebab ia `fixed` dan tumpukannya diatur z-index, bukan urutan.
 *
 * ══ BAHASA AWAMNYA
 *
 * Saat bahasa diganti, seluruh halaman dibangun ulang dalam bahasa baru dalam
 * sekejap, tanpa animasi pembuka dan tanpa berpindah dari bagian yang sedang
 * dibaca. Tombol bahasanya sendiri tidak ikut dibangun ulang, dan ia yang
 * pertama tercapai saat orang menelusuri halaman dengan tombol Tab.
 */
export default function App() {
  const { lang, switched, anchor } = useLangState();
  return (
    <>
      <LanguageSwitch />
      <Page key={lang} lang={lang} intro={!switched} anchor={switched ? anchor : null} />
    </>
  );
}

function Page({ lang, intro, anchor }) {
  /*
   * useLayoutEffect, BUKAN useEffect.
   *
   * Seluruh motion situs ini dimulai dari keadaan tersembunyi: elemen
   * ber-scrub-reveal punya clip-path yang memotongnya habis, huruf judul
   * menunggu di bawah mask-nya. Yang memulihkannya adalah kode di
   * setupAnimations(). useEffect berjalan SETELAH frame pertama digambar, jadi
   * akan ada satu frame di mana halaman tampil dengan bagian-bagian yang
   * terpotong. useLayoutEffect berjalan sebelum gambar pertama.
   *
   * Nilai kembaliannya wajib dikembalikan lagi dari sini — itu yang
   * mem-teardown semua listener, ticker, dan scroll trigger. Lihat komentar
   * di src/lib/animations/lifecycle.js untuk kenapa itu tidak boleh dilewat.
   *
   * Dependensinya sengaja kosong: ketiga prop di atas tidak pernah berubah
   * selama satu <Page> hidup, sebab bahasa baru berarti <Page> baru.
   *
   * Bahasa awamnya: semua animasi dipasang sekali tiap kali halaman dibangun,
   * dan dibongkar bersih saat halaman diganti — termasuk saat ganti bahasa.
   */
  useLayoutEffect(() => setupAnimations({ lang, anchor }), []);

  /*
   * <main> membungkus delapan bagian isi (Beranda + tujuh bab sejak Proyek
   * masuk 1 Oktober 2026), tapi TIDAK footer dan bar status.
   * Itu bukan selera: screen reader memakai <main> untuk melompat langsung ke
   * isi, melewati navigasi dan hiasan. Kalau footer ikut masuk, lompatannya
   * kehilangan gunanya.
   */
  /*
   * Pembungkus scroller harus tetap ada dan harus membungkus SEMUANYA,
   * termasuk footer dan bar status. Lenis memakainya sebagai container scroll;
   * kalau ada yang berdiri di luar, bagian itu tidak ikut ter-scroll halus dan
   * terlihat menyentak sendiri saat yang lain mengalir.
   */
  return (
    <div data-component="scroller" className="main scroller">
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Certificates />
        <Contact />
      </main>
      <Footer />
      <Interface />

      {/* Ditaruh paling akhir supaya ia berada di atas saudara-saudaranya
          tanpa mengandalkan z-index semata. Ia `position: fixed`, jadi tetap
          menutup seluruh screen meski bersarang di dalam pembungkus scroller.

          Hanya di kunjungan pertama — lihat komentar App() di atas. */}
      {intro && <Intro />}
    </div>
  );
}
