import { useEffect, useRef, useState } from "react";
import Icon from "./Icon.jsx";
import { LANGS, useLangState } from "../i18n/lang.jsx";

/*
 * ══════════════════════════════════════════════════════════════════════════
 * SEMBUNYI SAAT DIGULIR KE BAWAH — ditambahkan 1 Oktober 2026.
 *
 * ══ TEKNIS
 *
 * Tombol ini `fixed`, jadi selama halaman dibaca ia menutupi pojok kanan atas
 * apa pun yang lewat — terukur di 390px ia menimpa judul kartu "Data
 * Analysis". Polanya sekarang: gulir ke bawah = tombol naik keluar layar;
 * gulir ke atas, atau berada di 80px teratas halaman = tombol kembali.
 * Pembaca yang sedang membaca ke bawah tidak terganggu, dan yang mencari
 * tombolnya cukup menggulir sedikit ke atas.
 *
 *   AMBANG 6px, DAN IA MENUMPUK. `lastY` baru diperbarui setelah selisihnya
 *   melewati 6px, jadi guliran trackpad yang datang dalam langkah 1-2px tetap
 *   terhitung — tapi getaran kecil saat jari berhenti tidak membuat tombolnya
 *   berkedip naik-turun.
 *
 *   TIDAK PERNAH SEMBUNYI SELAMA FOKUS ADA DI DALAMNYA, dan langsung muncul
 *   begitu menerima fokus. Ia tetap bisa dicapai lewat Tab saat tersembunyi
 *   — sengaja tidak memakai `visibility: hidden` atau `inert`, yang akan
 *   mengeluarkannya dari urutan Tab — jadi pengguna keyboard yang menekan
 *   Tab pertama kali selalu melihat apa yang sedang ia fokuskan.
 *
 *   800ms SESUDAH GANTI BAHASA, GULIRAN DIABAIKAN. Pemasangan ulang halaman
 *   memulihkan posisi baca dengan melompat (restoreScrollAnchor), dan
 *   lompatan ke bawah itu akan langsung menyembunyikan tombol yang baru saja
 *   ditekan. Efeknya dipasang ulang setiap `lang` berganti, dan itulah yang
 *   membuka jendela abaian itu lagi.
 *
 * Membaca window.scrollY, bukan event Lenis: Lenis menggulir window itu
 * sendiri, jadi event `scroll` biasa tetap datang — dan komponen ini berdiri
 * di luar <Page>, sehingga ia tidak boleh bergantung pada instans Lenis yang
 * dibongkar dan dibuat ulang tiap ganti bahasa.
 *
 * ══ BAHASA AWAMNYA
 *
 * Tombol bahasa sekarang menyingkir saat Anda membaca ke bawah, dan muncul
 * lagi begitu Anda menggulir sedikit ke atas atau kembali ke puncak halaman.
 * ═══════════════════════════════════════════════════════════════════════ */
const REVEAL_TOP = 80;
const DELTA = 6;
const IGNORE_AFTER_SWITCH = 800;

/*
 * ══ TEKNIS
 *
 * Nama tiap bahasa DITULIS DALAM BAHASANYA SENDIRI, bukan diterjemahkan
 * mengikuti halaman. Orang yang tersesat di halaman berbahasa asing mencari
 * nama bahasanya sendiri — "Bahasa Indonesia", bukan "Indonesian". Attribute
 * `lang` di tiap tombol membuat pembaca layar melafalkannya dengan aturan
 * bahasanya sendiri.
 *
 * ══ BAHASA AWAMNYA
 *
 * Saat kursor diarahkan ke tombol, nama bahasanya muncul dalam bahasa itu
 * sendiri, jadi orang yang tidak paham bahasa halaman tetap bisa menemukannya.
 */
const NAMES = { en: "English", id: "Bahasa Indonesia" };

const TEXT = {
  en: { group: "Choose language" },
  id: { group: "Pilih bahasa" },
};

/*
 * ══════════════════════════════════════════════════════════════════════════
 * TOMBOL GANTI BAHASA — pojok kanan atas, dipasang 1 Oktober 2026.
 *
 * ══ TEKNIS
 *
 * DUA TOMBOL BERSEGMEN, BUKAN SATU TOMBOL YANG BERGANTI LABEL. Tombol tunggal
 * berlabel "ID" terbaca ganda — bahasa yang sedang aktif, atau bahasa yang
 * akan dipilih? — dan tidak ada jawaban yang benar untuk semua orang.
 * Bersegmen, keduanya selalu terlihat dan yang aktif ditandai penanda terang.
 * `aria-pressed` yang menyampaikan hal yang sama ke pembaca layar.
 *
 * PENANDANYA SATU <span> YANG DIGESER, bukan latar per tombol yang berganti.
 * Geseran memperlihatkan ARAH pergantiannya; dua latar yang bertukar cuma
 * memperlihatkan hasil akhirnya. Ia hanya `transform`, jadi digerakkan
 * compositor tanpa layout ulang, dan lengkungnya `ease-brand` yang sama
 * dengan seluruh situs. Reduced motion mematikan geserannya.
 *
 * LATARNYA PEKAT (`bg-background/92`), sama dengan tombol kembali ke atas, dan
 * alasannya sama: ia `fixed`, jadi bagian TERANG (Pendidikan, Sertifikat)
 * juga lewat di belakangnya. Bar status mengatasi soal itu dengan membalik
 * warnanya lewat ScrollTrigger; tombol ini tidak perlu, sebab ia membawa
 * latarnya sendiri. Tanpa backdrop-filter, dengan alasan yang tertulis di
 * src/components/Interface.jsx (blur ulang tiap frame scroll).
 *
 * z-60: DI ATAS bar status (40) dan tombol naik (50), DI BAWAH panel intro
 * (80) — jadi ia tertutup selama monogram tergambar, lalu muncul bersama isi
 * halaman.
 *
 * KANANNYA `right-gutter`, token yang sama dengan tepi isi halaman, jadi
 * tepi kanannya lurus dengan tepi kanan isi di lebar berapa pun.
 *
 * IKON BOLA DUNIA HANYA DI >=640px. Di ponsel Beranda menaruh sapaan di
 * tengah atas, dan pil yang lebih lebar mulai memakan ruang di sebelahnya.
 *
 * TINGGI TOMBOLNYA 28px, di atas minimum 24x24 WCAG 2.5.8 untuk sasaran
 * pointer — angka yang sama yang dikejar tombol bar status.
 *
 * `pl-[0.18em]` di tiap label membalas letter-spacing `-caption-small`
 * (.18em): spasi huruf ditambahkan SESUDAH tiap huruf, termasuk yang
 * terakhir, jadi tanpa ini "EN" terlihat bergeser ke kiri di dalam penandanya.
 *
 * ══ BAHASA AWAMNYA
 *
 * Tombol kecil di pojok kanan atas untuk memilih bahasa Inggris atau
 * Indonesia. Pilihan yang aktif ditandai blok terang yang bergeser saat
 * diganti, dan tombolnya tetap terbaca di bagian gelap maupun terang.
 * ═══════════════════════════════════════════════════════════════════════ */
export default function LanguageSwitch() {
  const { lang, setLang } = useLangState();
  const t = TEXT[lang];
  const index = LANGS.indexOf(lang);
  const [hidden, setHidden] = useState(false);
  const focused = useRef(false);

  useEffect(function () {
    setHidden(false);
    var lastY = window.scrollY;
    var ignoreUntil = performance.now() + IGNORE_AFTER_SWITCH;
    function onScroll() {
      var y = window.scrollY;
      if (performance.now() < ignoreUntil) { lastY = y; return; }
      if (y < REVEAL_TOP) { setHidden(false); lastY = y; return; }
      var dy = y - lastY;
      if (Math.abs(dy) < DELTA) return;
      lastY = y;
      if (dy > 0) { if (!focused.current) setHidden(true); }
      else setHidden(false);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return function () { window.removeEventListener("scroll", onScroll); };
  }, [lang]);

  return (
    <div role="group" aria-label={t.group}
      onFocus={function () { focused.current = true; setHidden(false); }}
      onBlur={function (e) { if (!e.currentTarget.contains(e.relatedTarget)) focused.current = false; }}
      className={"fixed top-3 right-gutter z-60 flex items-center gap-2 rounded-full border border-line bg-background/92 p-1 nav:top-5 sm:pl-3 transition-[translate,opacity] duration-500 ease-brand motion-reduce:transition-none " +
        (hidden ? "pointer-events-none -translate-y-[calc(100%+1.5rem)] opacity-0" : "")}>
      <Icon name="globe" className="hidden text-sm text-text-muted sm:inline-block" />

      <div className="relative grid grid-cols-2">
        <span aria-hidden="true"
          className="absolute inset-y-0 left-0 w-1/2 rounded-full bg-text transition-transform duration-500 ease-brand motion-reduce:transition-none"
          style={{ transform: "translateX(" + index * 100 + "%)" }}></span>

        {LANGS.map(function (code) {
          const active = code === lang;
          return (
            /* TANPA aria-label: ia akan MENIMPA "ID" yang terlihat dengan
               "Bahasa Indonesia", dan pengguna kendali suara yang mengucapkan
               "klik ID" tidak menemukan tombolnya (WCAG 2.5.3). Nama
               lengkapnya cukup jadi keterangan lewat `title`.

               Bahasa awamnya: orang yang memakai perintah suara cukup bilang
               "klik ID" sesuai tulisan di tombolnya, dan itu berhasil. */
            <button key={code} type="button" lang={code} title={NAMES[code]}
              aria-pressed={active}
              onClick={function () { setLang(code); }}
              className={"-caption-small relative flex h-7 w-11 cursor-pointer items-center justify-center rounded-full pl-[0.18em] transition-colors duration-500 ease-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text " +
                (active ? "text-background" : "text-text-muted hover:text-text")}>
              {code.toUpperCase()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
