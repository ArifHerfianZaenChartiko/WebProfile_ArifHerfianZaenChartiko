import Icon from "./Icon.jsx";
import { useText } from "../i18n/lang.jsx";

/* ══ TEKNIS — `first` cuma isi awal label bar status; sesudah animasi
   menyala, initStatusBar() yang menulisinya dari CHAPTER_LABELS di
   src/lib/animations/behaviors.js. Keduanya harus sama, supaya tidak ada
   kedipan kata lain di frame pertama.
   ══ BAHASA AWAMNYA — tulisan di bar bawah dan tombol kembali ke atas,
   dalam dua bahasa. */
const TEXT = {
  en: { first: "About", top: "Back to top" },
  id: { first: "Tentang", top: "Kembali ke atas" },
};

export default function Interface() {
  const t = useText(TEXT);
  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════════
           BAR STATUS — pengganti navbar. Fungsinya sama, memberi tahu posisi, tapi
           tanpa meminta perhatian dan tanpa deretan link yang harus dihindari mata.
           Hanya kata terakhirnya yang berganti mengikuti bagian yang sedang dibaca.

           `px-gutter` SAMA DENGAN ISI HALAMAN, dan itu perbaikan yang ikut
           terbawa pada 18 Agustus 2026. Bar ini dulu `px-6 nav:px-10` — 24px di
           bawah 900px — sementara isi halamannya `px-4` alias 16px. Jadi di
           ponsel kata "01/06 TENTANG" berdiri 8px lebih ke dalam daripada
           tepi kiri seluruh isi yang lewat di atasnya, dan di desktop keduanya
           kebetulan sama-sama 40px sehingga ketidaksejajaran itu cuma muncul di
           layar kecil. Sekarang keduanya membaca token yang sama, jadi lurus di
           lebar berapa pun.
           ═══════════════════════════════════════════════════════════════════════ */}
      <div className="status-bar pointer-events-none fixed inset-x-0 bottom-5 z-40 px-gutter">
        <div className="flex items-end justify-between gap-6">
          {/* `-my-1 py-1` MENAMBAH SASARAN SENTUH TANPA MENGGESER APA PUN.

               Tombol ini isinya dua baris teks kecil, jadi kotak sentuhnya
               terukur 117x19px — di bawah minimum 24x24 yang diminta WCAG 2.5.8
               untuk sasaran pointer. Itu paling terasa di ponsel, sebab deretan
               titik bab di sebelah kanan `hidden nav:flex` sehingga TOMBOL INI
               satu-satunya kendali lompat yang tampak di sana.

               Padding 4px atas-bawah menaikkannya ke 27px; margin -4px menarik
               kotak layoutnya kembali ke ukuran semula, jadi teksnya berdiri di
               titik yang persis sama dengan sebelumnya dan tidak ada satu
               piksel pun yang bergeser. Yang tumbuh cuma daerah yang menerima
               ketukan. */}
          <button type="button" data-status-jump className="pointer-events-auto group -my-1 flex items-baseline gap-2 py-1 text-left">
            <span className="-caption-small text-text-muted transition-colors duration-500 ease-brand" data-status-count>01/07</span>
            <span className="relative block h-[1.15em] overflow-hidden">
              <span className="-caption block whitespace-nowrap will-change-transform" data-status-label>{t.first}</span>
            </span>
          </button>

          <div className="hidden nav:flex items-center gap-3" data-status-dots></div>
        </div>
      </div>

      {/* `backdrop-blur-md` DIBUANG pada 9 Agustus 2026, dan latarnya dinaikkan
          dari /70 ke /92 sebagai gantinya.

          Repo ini sudah mematikan backdrop-filter di .stage-card dengan alasan
          tertulis panjang (+6 fps di ponsel), tapi yang ini lolos — padahal ia
          jauh lebih mahal daripada yang sudah dibuang itu. Card keahlian diam
          di tempatnya; tombol ini `fixed`, jadi isi halaman mengalir di
          belakangnya SEPANJANG halaman di-scroll, dan browser harus memburamkan
          ulang petak itu di tiap frame scroll, bukan sesekali.

          /92 hampir pekat, jadi ikon panahnya tetap terbaca di atas apa pun
          yang lewat — yang justru tidak dijamin oleh /70 berblur. */}
      <button type="button" data-component="back-to-top" title={t.top} aria-label={t.top}
        className="fixed right-6 bottom-6 z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-line bg-background/92 text-text-muted transition-colors duration-300 ease-power nav:bottom-24 hover:border-text/50 hover:text-text">
        <Icon name="arrow-up" className="text-sm" />
      </button>
    </>
  );
}
