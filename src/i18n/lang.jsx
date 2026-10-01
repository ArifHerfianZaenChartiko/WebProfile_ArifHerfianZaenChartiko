/*
 * BAHASA HALAMAN — Inggris dan Indonesia, dipasang 1 Oktober 2026.
 *
 * ══ TEKNIS
 *
 * Satu context React yang memegang tiga hal: bahasa yang aktif, apakah bahasa
 * itu PERNAH diganti sejak halaman dibuka, dan titik baca yang harus
 * dipulihkan sesudah gantinya.
 *
 * TEKSNYA TIDAK DI SINI. Tiap komponen menulis kamusnya sendiri sebagai
 * `const TEXT = { en: {...}, id: {...} }` di kepala berkasnya, sama dengan pola
 * array CERTIFICATES — teks tetap berdiri di sebelah markup yang memakainya,
 * jadi menyunting satu kalimat tidak menuntut membuka dua berkas. useText()
 * di bawah cuma memilih separuh yang benar.
 *
 * BAWAANNYA INGGRIS, atas permintaan. Pilihan pengunjung disimpan di
 * localStorage supaya kunjungan berikutnya membuka bahasa yang sama. Simpanan
 * itu kemudahan per pengunjung, bukan keadaan yang harus selamat: setiap baca
 * dan tulisnya dijaga try/catch, sebab di jendela privat atau saat data situs
 * diblokir aksesornya MELEMPAR, bukan sekadar mengembalikan null. Gagal = jatuh
 * ke Inggris, tanpa satu pun pesan galat.
 *
 * DIBACA SINKRON DI PENGINISIALISASI useState, bukan di efek. Kalau dibaca di
 * efek, render pertama selalu Inggris lalu sekejap kemudian berganti ke
 * Indonesia, dan pengunjung yang memilih Indonesia melihat halamannya berkedip
 * di setiap kunjungan.
 *
 * GANTI BAHASA = HALAMANNYA DIPASANG ULANG, bukan teksnya ditukar di tempat.
 * Lihat komentar di src/App.jsx untuk alasannya; ringkasnya, modul animasi
 * menulis ulang isi elemen yang dimiliki React (kalimat yang dipecah per kata,
 * huruf hover, salinan marquee), dan React tidak bisa memperbarui teks di
 * dalam node yang strukturnya sudah diganti orang lain.
 *
 * ══ BAHASA AWAMNYA
 *
 * Berkas ini mengingat bahasa yang sedang dipakai situs. Pertama kali dibuka
 * situsnya berbahasa Inggris; kalau pengunjung memilih Indonesia, pilihan itu
 * diingat browsernya untuk kunjungan berikutnya.
 */
import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from "react";
import { captureScrollAnchor } from "../lib/animations/scroller.js";

export const LANGS = ["en", "id"];
const DEFAULT_LANG = "en";
const STORAGE_KEY = "lang";

function readSaved() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return LANGS.indexOf(saved) !== -1 ? saved : DEFAULT_LANG;
  } catch (e) {
    return DEFAULT_LANG;
  }
}

function save(lang) {
  try { window.localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* lihat kepala berkas */ }
}

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [state, setState] = useState(function () {
    return { lang: readSaved(), switched: false, anchor: null };
  });

  /*
   * TITIK BACA DIAMBIL DI SINI, SEBELUM setState, bukan di dalam updater-nya.
   * Updater harus murni — StrictMode memanggilnya dua kali — dan yang diukur
   * di sini justru DOM halaman LAMA, yang sesudah commit sudah tidak ada.
   *
   * Bahasa awamnya: sebelum halaman diganti bahasanya, posisi yang sedang
   * dibaca dicatat dulu, supaya sesudahnya bisa kembali ke tempat yang sama.
   */
  const setLang = useCallback(function (next) {
    if (LANGS.indexOf(next) === -1) return;
    const anchor = captureScrollAnchor();
    setState(function (s) {
      return s.lang === next ? s : { lang: next, switched: true, anchor: anchor };
    });
    save(next);
  }, []);

  /* `lang` di <html> ikut berganti: pembaca layar memilih suara dan aturan
     pelafalan dari attribute ini, dan peramban memakainya untuk tanda hubung
     serta terjemahan otomatis. index.html menulis "en" sebagai bawaannya.

     Bahasa awamnya: browser dan pembaca layar tunanetra diberi tahu bahasa
     apa yang sedang tampil, supaya teksnya dibacakan dengan logat yang
     benar. */
  useLayoutEffect(function () {
    document.documentElement.lang = state.lang;
  }, [state.lang]);

  const value = useMemo(function () {
    return { lang: state.lang, switched: state.switched, anchor: state.anchor, setLang: setLang };
  }, [state, setLang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLangState() {
  return useContext(LangContext);
}

export function useLang() {
  return useContext(LangContext).lang;
}

/* Pemakaian di komponen: `const t = useText(TEXT);` lalu `{t.judul}`. */
export function useText(TEXT) {
  return TEXT[useContext(LangContext).lang];
}
