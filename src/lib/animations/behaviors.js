/*
 * PERILAKU — yang menanggapi pengunjung, bukan menghias.
 *
 * ══ TEKNIS
 *
 * Kelima fungsi di sini bukan animasi: typewriter, bar status, tombol kembali ke
 * atas, lompatan antar bagian, dan formulir kontak. Semuanya menanggapi klik,
 * ketikan, atau posisi baca — jadi kalau ada yang rusak, yang hilang FUNGSI,
 * bukan tampilan. Itu sebabnya mereka dipisahkan dari modul motion.
 *
 * ══ BAHASA AWAMNYA
 *
 * Bagian ini yang membuat tombol, formulir, dan penanda posisi di bawah layar
 * benar-benar bekerja saat diklik.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { $, $$, prefersReducedMotion } from "./dom.js";
import { EASE } from "./tokens.js";

/* ── 6. PERILAKU ────────────────────────────────────────────────────────*/

/*
 * TIMER-NYA DIDAFTARKAN, dan sampai 9 Agustus 2026 ia satu-satunya side
 * effect di file ini yang TIDAK — melanggar aturan yang ditulis di
 * kepala file ini sendiri.
 *
 * Gejalanya persis yang diperingatkan komentar itu, dan persis jenis cacat
 * yang tidak pernah melempar error: StrictMode memasang efek dua kali pada
 * node DOM yang SAMA, jadi ada dua putaran ketik menulisi satu <span>
 * bergantian. Yang terlihat huruf yang berkedut dan kata yang kadang
 * melompat — mudah disalahartikan sebagai masalah performa, padahal murni
 * dua timer yang berebut.
 *
 * Di produksi StrictMode tidak menggandakan, jadi cacatnya tidak terlihat
 * di sana. Yang tetap berlaku di produksi: tanpa pendaftaran ini timernya
 * hidup selamanya setelah di-teardown.
 */
/*
 * JSON.parse DIJAGA, dan taruhannya jauh lebih besar daripada typewriter-nya
 * sendiri. Ditambahkan 15 Agustus 2026.
 *
 * Fungsi ini dipanggil PALING AWAL di antara kelompok "perilaku" di
 * setupRest(). Satu tanda kutip yang salah ketik di attribute
 * data-typewriter melempar SyntaxError, dan exception itu menghentikan
 * seluruh sisa setupRest() — bar status, tombol panah ke atas, semua
 * lompatan anchor, dan form kontak ikut mati bersamanya. Kerusakan yang
 * tampak di halaman karena itu tidak akan menunjuk ke sebabnya sama sekali.
 *
 * Isinya ikut diperiksa, bukan cuma sintaksnya: `[]` lolos JSON.parse tapi
 * membuat words[0] undefined, dan .substring() pada undefined melempar di
 * dalam timer — di tempat yang bahkan tidak punya jalur untuk dijaga.
 *
 * Gagal = typewriter-nya diam, sisanya tetap hidup. Peran-perannya masih
 * terbaca di judul halaman, deskripsi meta, dan card Keahlian.
 *
 * Bahasa awamnya: dulu satu salah ketik kecil di satu baris bisa mematikan
 * tombol kirim pesan dan tombol-tombol lompat sekaligus. Sekarang paling
 * jauh cuma tulisan berjalan di halaman sampul yang berhenti.
 */
export function initTypewriter(ctx) {
  const { cleanups } = ctx;
  var el = $("[data-typewriter]");
  if (!el) return;

  var words;
  try {
    words = JSON.parse(el.getAttribute("data-typewriter"));
  } catch (e) {
    return;
  }
  if (!Array.isArray(words) || !words.length) return;
  for (var w = 0; w < words.length; w++) {
    if (typeof words[w] !== "string" || words[w] === "") return;
  }

  var wordIndex = 0, indexHuruf = 0, sedangHapus = false;
  var id = 0;
  cleanups.push(function () { clearTimeout(id); });

  (function ketik() {
    var word = words[wordIndex];
    var gap = sedangHapus ? 50 : 100;
    indexHuruf += sedangHapus ? -1 : 1;
    el.textContent = word.substring(0, indexHuruf);

    if (!sedangHapus && indexHuruf === word.length) {
      sedangHapus = true; gap = 1500;
    } else if (sedangHapus && indexHuruf === 0) {
      sedangHapus = false;
      wordIndex = (wordIndex + 1) % words.length;
      gap = 300;
    }
    id = setTimeout(ketik, gap);
  })();
}

/*
 * BAR STATUS — pengganti navbar. Fungsinya sama, memberi tahu posisi, tapi
 * tanpa meminta perhatian.
 *
 * Pergantiannya bukan fade. Kata lama naik keluar dan kata baru menyusul dari
 * bawah, di dalam window setinggi satu baris. Fade antar dua kata berbeda
 * menghasilkan momen di mana keduanya terbaca sekaligus dan tak satu pun
 * terbaca jelas; motion vertikal tidak pernah punya masalah itu.
 */
var CHAPTERS = [
  { id: "tentang", label: "Tentang" },
  { id: "pengalaman", label: "Pengalaman" },
  { id: "keahlian", label: "Keahlian" },
  { id: "pendidikan", label: "Pendidikan" },
  { id: "sertifikat", label: "Sertifikat" },
  { id: "kontak", label: "Kontak" },
];

export function initStatusBar(ctx) {
  const { listen, addNode, scrollTo } = ctx;
  var bar = $(".status-bar");
  if (!bar) return;

  var labelEl = $("[data-status-label]", bar);
  var countEl = $("[data-status-count]", bar);
  var dotsEl = $("[data-status-dots]", bar);
  var jumpBtn = $("[data-status-jump]", bar);
  var index = 0, prevIndex = 0;
  var total = String(CHAPTERS.length).padStart(2, "0");

  CHAPTERS.forEach(function (chapter, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", chapter.label);
    b.className = "chapter-dot group pointer-events-auto relative flex h-6 w-6 cursor-pointer items-center justify-center" +
      (i === CHAPTERS.length - 1 ? " chapter-dot--last" : "");
    /* Nama bagiannya muncul tepat di atas garis saat disentuh. `aria-hidden`
       karena tombolnya sudah punya aria-label dengan teks yang sama. */
    b.innerHTML = '<span aria-hidden="true" class="chapter-tip -caption-small">' + chapter.label + "</span>" +
      '<span data-dot class="block h-px transition-all duration-500 ease-brand w-2 bg-line group-hover:w-4 group-hover:bg-text-muted"></span>';
    listen(b, "click", function () { scrollTo("#" + chapter.id); });
    addNode(dotsEl, b);
  });
  var dots = $$("[data-dot]", dotsEl);

  function render() {
    labelEl.textContent = CHAPTERS[index].label;
    countEl.textContent = String(index + 1).padStart(2, "0") + "/" + total;
    dots.forEach(function (d, i) {
      /* Titik kecil yang memanjang jadi garis saat aktif — perubahan bentuk
         terbaca lebih cepat daripada perubahan warna saja. */
      d.className = "block h-px transition-all duration-500 ease-brand " +
        (i === index ? "w-6 bg-text" : "w-2 bg-line group-hover:w-4 group-hover:bg-text-muted");
    });

    if (prefersReducedMotion() || prevIndex === index) { prevIndex = index; return; }
    /* Arah masuknya mengikuti arah perpindahan bagian: maju berarti kata baru
       datang dari bawah, mundur berarti dari atas. */
    var down = index > prevIndex;
    prevIndex = index;
    gsap.fromTo(labelEl, { yPercent: down ? 110 : -110 }, { yPercent: 0, duration: 0.55, ease: EASE });
  }
  render();

  CHAPTERS.forEach(function (chapter, i) {
    var el = document.getElementById(chapter.id);
    if (!el) return;
    ScrollTrigger.create({
      trigger: el,
      /* Threshold di tengah screen: bagian dianggap aktif begitu ia melewati
         titik pandang, bukan begitu tepi atasnya menyentuh screen. Tanpa itu
         marker berkedip bolak-balik di batas antar bagian. */
      start: "top 50%", end: "bottom 50%",
      onToggle: function (self) { if (self.isActive) { index = i; render(); } },
    });
  });

  listen(jumpBtn, "click", function () { scrollTo("#" + CHAPTERS[index].id); });

  /*
   * WARNA BAR MENGIKUTI BAND DI BELAKANGNYA.
   *
   * Bar ini `fixed`, jadi ia melayang DI LUAR band nada mana pun — dan
   * karena itu tidak ikut membalik warna saat bagian terang lewat di
   * belakangnya. THRESHOLD-nya BUKAN TEPI BAGIAN, MELAINKAN TENGAH GRADIEN
   * PENGHUBUNG: bar duduk di sekitar 96% tinggi viewport, jadi threshold-nya
   * 96% ± separuh tinggi gradien.
   *
   * ANGKANYA TERIKAT KE TINGGI BAND DI Education.jsx DAN Contact.jsx. Dulu
   * band itu 50vh di desktop, jadi separuhnya 25 dan threshold-nya 121/71.
   * Sejak band-nya dipendekkan jadi 20/24/28vh, separuhnya ~12 dan
   * threshold-nya jadi 108/84.
   *
   * SATU ANGKA UNTUK TIGA TITIK HENTI, dan itu memang kompromi — tapi
   * kompromi yang JAUH lebih kecil dari sebelumnya. Dengan band 20/24/28,
   * separuhnya 10/12/14, jadi meleset paling jauh 2vh (~17px di ponsel).
   * Dengan band lama 28/40/50 sementara angkanya dipatok ke 50, melesetnya
   * 11vh di ponsel — sekitar 93px, cukup untuk membalik warna bar saat
   * latarnya masih jelas gelap. Merapatkan rentang band itulah yang
   * membereskannya, bukan angka di sini.
   *
   * Kalau tinggi band diubah lagi, threshold ini WAJIB ikut dihitung ulang:
   * start = 96 + separuhPita, end = 96 - separuhPita.
   */
  var panels = $$('[data-band="panel"]');
  if (panels.length) {
    ScrollTrigger.create({
      trigger: panels[0], endTrigger: panels[panels.length - 1],
      start: "top 108%", end: "bottom 84%",
      onToggle: function (self) { bar.classList.toggle("status-bar--panel", self.isActive); },
    });
  }
}

/*
 * Perjalanan pulang dihitung dari JARAK, bukan durasi tetap. Lenis memakai
 * satu durasi untuk semua tujuan; dari dasar halaman yang panjangnya belasan
 * ribu piksel, durasi yang sama berarti kecepatan berlipat — semua trigger
 * scrub dan bagian ter-pin harus melewati seluruh rentangnya dalam waktu itu
 * juga, dan hasilnya patah-patah.
 *
 * ANGKANYA SUDAH TIDAK DI SINI LAGI sejak 15 Agustus 2026. SPEED 2200,
 * MIN 0,9, MAX 3, dan easeInOutCubic dipindahkan ke scrollTo() supaya
 * SEMUA lompatan memakainya, bukan tombol ini saja. Tombol ini karena itu
 * tinggal memanggil scrollTo(0) tanpa argumen kedua — perilakunya tidak
 * berubah satu milidetik pun, cuma tidak lagi jadi satu-satunya yang benar.
 */
export function initBackToTop(ctx) {
  const { listen, scrollTo } = ctx;
  var btn = $('[data-component="back-to-top"]');
  if (!btn) return;

  btn.style.transition = "opacity .25s ease, transform .25s ease";
  var visible = null;
  function sync() {
    var next = window.scrollY > 600;
    if (next === visible) return;
    visible = next;
    btn.style.opacity = next ? "1" : "0";
    btn.style.transform = next ? "translateY(0)" : "translateY(8px)";
    btn.style.pointerEvents = next ? "auto" : "none";
  }
  sync();
  listen(window, "scroll", sync, { passive: true });

  listen(btn, "click", function () { scrollTo(0); });
}


/* Lenis yang memegang scroll, jadi lompatan anchor bawaan browser harus
   dicegah — kalau tidak, halaman menyentak lalu Lenis menariknya balik. */
export function initAnchors(ctx) {
  const { listen, scrollTo } = ctx;
  $$('a[href^="#"]').forEach(function (a) {
    listen(a, "click", function (e) {
      var target = document.querySelector(a.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      scrollTo(target);
    });
  });
}

/*
 * FORM KONTAK — dua jalur, satu isian. Keduanya mengirim pesan yang
 * bentuknya sama; yang berbeda hanya aplikasi yang membukanya.
 *
 * wa.me hanya menerima format internasional TANPA "+" dan tanpa nol depan,
 * dan gagalnya DIAM: halaman wa.me tetap terbuka, cuma tidak menemukan
 * nomornya. Jadi nomor dinormalkan di sini.
 */
export function initContactForm(ctx) {
  const { listen } = ctx;
  var form = $("#contact-form");
  if (!form) return;

  var PHONE = "6285790226536";
  var EMAIL_ADDR = "arif.herfian@gmail.com";

  function readFields() {
    var name = $("#senderName").value.trim();
    var email = $("#senderEmail").value.trim();
    var message = $("#messageBody").value.trim();
    /* Pemeriksaan yang sama dipakai kedua tombol. Kalau masing-masing
       memeriksa sendiri, cepat atau lambat salah satunya ketinggalan saat
       aturannya berubah — dan yang lolos adalah pesan kosong. */
    if (name === "" || message === "") {
      alert("Mohon isi nama dan pesan terlebih dahulu!");
      return null;
    }
    return { name: name, email: email, message: message };
  }

  function composeMessage(fields) {
    var text = "Halo Arif! Saya " + fields.name;
    if (fields.email) text += " (" + fields.email + ")";
    return text + "\n\n" + fields.message;
  }

  listen(form, "submit", function (e) {
    e.preventDefault();
    var fields = readFields();
    if (!fields) return;
    var number = PHONE.replace(/\D/g, "");
    if (number.indexOf("0") === 0) number = "62" + number.slice(1);
    window.open("https://wa.me/" + number + "?text=" + encodeURIComponent(composeMessage(fields)),
      "_blank", "noopener,noreferrer");
  });

  /* window.open("_blank"), BUKAN window.location.href — disamakan dengan
     tombol WhatsApp di atas pada 15 Agustus 2026.

     Yang lama mengganti isi tab yang sedang dibuka, jadi halaman ini
     dibongkar dan isian formnya ikut pergi. Itu paling merugikan justru saat
     jalurnya gagal: URL compose Gmail menuntut sesi Google yang aktif, dan
     pengunjung bersurel kantor mendarat di halaman login TANPA portofolio
     ini tersisa di layar. Dibuka di tab baru, form-nya masih utuh di
     belakangnya — teksnya bisa disalin, atau tombol WhatsApp dipakai tanpa
     mengetik ulang.

     Bahasa awamnya: tombol ini dulu menutup web profil Anda dan menggantinya
     dengan Gmail. Sekarang Gmail terbuka di tab baru dan situs Anda tetap
     terbuka di sebelahnya. */
  listen($("#send-email"), "click", function () {
    var fields = readFields();
    if (!fields) return;
    window.open("https://mail.google.com/mail/?view=cm&fs=1&to=" +
      encodeURIComponent(EMAIL_ADDR) +
      "&su=" + encodeURIComponent("Pesan dari " + fields.name + " — lewat portofolio") +
      "&body=" + encodeURIComponent(composeMessage(fields)),
      "_blank", "noopener,noreferrer");
  });
}
