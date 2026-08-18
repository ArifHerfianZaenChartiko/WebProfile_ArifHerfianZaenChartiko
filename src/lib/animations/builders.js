/*
 * PEMBANGUN STRUKTUR — dijalankan sebelum animasi apa pun dipasang.
 *
 * ══ TEKNIS
 *
 * Kelima fungsi di sini menyuntikkan elemen ke DOM: cincin logo, kolom
 * odometer, huruf-huruf hover, kata-kata paragraf scrub, dan salinan marquee.
 * Setiap transisi di modul lain mencari elemen yang baru saja dibuat di sini,
 * jadi urutannya tidak bisa dibalik — lihat urutan pemanggilan di index.js.
 *
 * ══ BAHASA AWAMNYA
 *
 * Berkas ini menyiapkan potongan-potongan kecil yang nanti digerakkan:
 * misalnya memecah satu kalimat jadi kata-kata terpisah supaya tiap kata bisa
 * menyala sendiri saat di-scroll.
 */
import { $, $$ } from "./dom.js";
import { STAGGER_LETTER } from "./tokens.js";

/* Logo cincin di card keahlian. Jumlah cincinnya berbeda-beda supaya
   keempat card tidak terbaca sebagai satu ikon yang diulang.

   `--i` adalah nomor urut cincin dari dalam ke luar, dan ia dipakai CSS
   untuk menunda riak hover per cincin — lihat blok "LOGO CINCIN" di
   src/styles/skills.css. Ditulis di sini, bukan dihitung CSS lewat :nth-child,
   karena jumlah cincin tiap card berbeda dan urutannya sudah diketahui
   persis di titik ini. */
export function buildGlyphs() {
  $$("[data-glyph]").forEach(function (slot) {
    var index = Number(slot.getAttribute("data-glyph")) || 0;
    var rings = 4 + (index % 3);
    var svg = '<svg viewBox="0 0 64 64" aria-hidden="true" class="h-12 w-12 shrink-0">';
    for (var i = 0; i < rings; i++) {
      svg += '<circle class="stage-ring" style="--i:' + i + '" cx="32" cy="32" r="' +
        (5 + i * (26 / rings)) +
        '" fill="none" stroke="currentColor" stroke-width="1" opacity="' + (0.25 + i * 0.14) + '"/>';
    }
    slot.innerHTML = svg + "</svg>";
  });
}

/*
 * Odometer: tiap digit adalah kolom 0-9 yang digulung di dalam window
 * setinggi satu baris, seperti argo taksi. Karakter non-digit (titik desimal)
 * dibiarkan diam di tempat.
 *
 * Salinan utuh ber-`sr-only` wajib ada: tiap kolom memuat SELURUH digit dan
 * hanya satu yang terlihat lewat overflow — tanpa salinan itu, menyalin
 * "3.62" menghasilkan deretan angka penuh dan screen reader membacakan
 * sepuluh digit per angka.
 */
function buildOdometer(el, nilai) {
  var html = '<span class="sr-only">' + nilai + "</span>";
  for (var i = 0; i < nilai.length; i++) {
    var c = nilai[i];
    if (!/\d/.test(c)) {
      html += '<span aria-hidden="true" class="select-none">' + c + "</span>";
      continue;
    }
    html += '<span class="odometer select-none" aria-hidden="true"><span class="odometer-col" data-target="' + c + '">';
    for (var d = 0; d < 10; d++) html += "<span>" + d + "</span>";
    html += "</span></span>";
  }
  el.innerHTML = html;
}

export function buildOdometers() {
  $$("[data-odometer]").forEach(function (el) {
    buildOdometer(el, el.getAttribute("data-odometer"));
  });
  /* Yang satu ini MENGHITUNG, bukan membaca angka yang ditulis tangan —
     jumlah sertifikat diambil dari jumlah card-nya sendiri, jadi menambah
     sertifikat tidak menyisakan angka yang meleset di bagian lain. */
  $$("[data-odometer-count]").forEach(function (el) {
    buildOdometer(el, String($$(el.getAttribute("data-odometer-count")).length));
  });
}

/*
 * Stagger per huruf saat hover. Yang membuatnya hidup bukan motion naiknya,
 * melainkan bahwa tiap huruf berangkat pada saat yang sedikit berbeda.
 * Seluruhnya CSS — yang dikerjakan di sini cuma menyiapkan strukturnya.
 */
export function buildLetterHover() {
  $$("[data-letter-hover]").forEach(function (el) {
    var text = el.getAttribute("data-letter-hover");
    el.className = "inline-flex flex-wrap " + el.className;
    var html = '<span class="sr-only">' + text + "</span>";
    for (var i = 0; i < text.length; i++) {
      var c = text[i];
      if (c === " ") {
        html += '<span aria-hidden="true" class="inline-block w-[0.32em]"></span>';
        continue;
      }
      var delay = "transition-delay:" + i * STAGGER_LETTER + "s";
      html += '<span class="letter-hover relative select-none" aria-hidden="true">' +
        '<span style="' + delay + '">' + c +
        '<span class="absolute left-0 top-full select-none" style="' + delay + '">' + c + "</span>" +
        "</span></span>";
    }
    el.innerHTML = html;
  });
}

/*
 * Paragraf dipecah per kata di sini supaya HTML-nya tetap satu kalimat utuh
 * yang bisa dibaca dan disunting.
 *
 * SPASINYA DI ANTARA SPAN, BUKAN DI DALAMNYA — dan ini bukan selera penulisan.
 * Tiap kata adalah `inline-block`, dan CSS membuang spasi yang jatuh di akhir
 * baris sebuah kotak. Spasi yang ditaruh di dalam span karena itu lenyap, dan
 * seluruh kalimat menempel jadi satu kata panjang: "Sayamerancangantarmuka…".
 * Terukur, paragrafnya jadi 118px alih-alih 147px — satu baris lebih short,
 * karena tidak ada lagi tempat untuk memutus baris.
 *
 * Di antara span, spasi itu milik aliran teks induknya, bukan milik kotaknya
 * — jadi ia tetap tergambar DAN tetap jadi titik putus baris yang sah.
 */
export function buildWordScrub() {
  $$("[data-word-scrub]").forEach(function (el) {
    el.innerHTML = el.textContent
      .trim()
      .split(" ")
      .map(function (w) {
        return '<span data-word class="inline-block opacity-[0.16]">' + w + "</span>";
      })
      .join(" ");
  });
}

/* Isi marquee digandakan empat kali: saat salinan pertama habis, salinan
   kedua sudah menempati tempatnya persis — tidak pernah ada ujung yang
   terlihat, dan tidak ada lompatan saat ia mengulang. */
export function buildMarquees(ctx) {
  const { addNode } = ctx;
  $$('[data-anim="marquee"]').forEach(function (root) {
    var track = $(".marquee-track", root);
    var original = $("[data-marquee-copy]", track);
    for (var i = 1; i < 4; i++) {
      var copies = original.cloneNode(true);
      copies.setAttribute("aria-hidden", "true");
      addNode(track, copies);
    }
  });
}
