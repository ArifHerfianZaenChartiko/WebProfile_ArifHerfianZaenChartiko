import { useLayoutEffect } from "react";
import { setupAnimations } from "./lib/animations.js";

import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Experience from "./components/Experience.jsx";
import Skills from "./components/Skills.jsx";
import Education from "./components/Education.jsx";
import Certificates from "./components/Certificates.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Interface from "./components/Interface.jsx";
import Intro from "./components/Intro.jsx";

export default function App() {
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
   * di src/lib/animations.js untuk kenapa itu tidak boleh dilewat.
   */
  useLayoutEffect(() => setupAnimations(), []);

  /*
   * <main> membungkus tujuh bagian isi, tapi TIDAK footer dan bar status.
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
        <Education />
        <Certificates />
        <Contact />
      </main>
      <Footer />
      <Interface />

      {/* Ditaruh paling akhir supaya ia berada di atas saudara-saudaranya
          tanpa mengandalkan z-index semata. Ia `position: fixed`, jadi tetap
          menutup seluruh screen meski bersarang di dalam pembungkus scroller. */}
      <Intro />
    </div>
  );
}
