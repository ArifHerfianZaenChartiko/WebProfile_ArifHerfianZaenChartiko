/*
 * STACK CARD PENGALAMAN — kartu bertumpuk yang bergilir.
 *
 * ══ TEKNIS
 *
 * Berdiri sendiri karena ia satu-satunya motion di situs ini yang berjalan pada
 * jadwalnya sendiri (interval), bukan mengikuti scroll — dan karena ia mengukur
 * tinggi kartu tertinggi lalu menyamakan seluruh stack ke sana.
 *
 * ══ BAHASA AWAMNYA
 *
 * Ini kartu riwayat pekerjaan yang bertumpuk dan bergilir sendiri tiap beberapa
 * detik.
 */
import { gsap } from "gsap";
import { $, $$, prefersReducedMotion } from "./dom.js";
import { EASE } from "./tokens.js";

/*
 * STACK CARD PENGALAMAN — yang depan dibaca utuh, yang belakang
 * mengintip di sudut, dan tiap beberapa detik yang depan jatuh lalu masuk
 * ke belakang stack. Polanya CardSwap dari reactbits.dev.
 *
 * SLOT. Card di slot ke-i digeser x +i*dx, y -i*dy, z -i*dz, diperkecil,
 * dan zIndex-nya menurun. Posisinya diturunkan dari NOMOR SLOT, bukan
 * disimpan per card; berputar cuma berarti memutar isi array `urutan` lalu
 * menata ulang. Tidak ada keadaan yang bisa menyimpang sendiri.
 *
 * TINGGINYA DIUKUR, TIDAK DIPATOK. CardSwap aslinya memakai ukuran tetap
 * 500x400 dan isi yang lebih panjang terpotong begitu saja. Di sini tinggi
 * stack = card TERTINGGI + ruang untuk card belakang mengintip,
 * dihitung ulang lewat ResizeObserver di tiap card. Rincian pekerjaan
 * boleh sepanjang apa pun tanpa satu baris pun hilang.
 *
 * HANYA CARD BELAKANG YANG DIMIRINGKAN. Aslinya seluruh stack di-skew,
 * termasuk yang sedang dibaca. Teks CV yang miring melelahkan dibaca, dan
 * card depan di sini justru satu-satunya yang memang untuk dibaca.
 *
 * TANPA JAVASCRIPT CARD-nya TETAP TERBACA. Posisi absolut baru dipasang
 * setelah class .swap-ready ditambahkan dari sini; sebelum itu card-nya
 * mengalir ke bawah sebagai daftar biasa. Kalau skripnya gagal dimuat, yang
 * tersisa daftar pengalaman yang utuh, bukan stack yang saling menimpa.
 */
export function initCardSwap(ctx) {
  const { cleanups, listen, observe, addNode } = ctx;
  var root = $('[data-component="swap"]');
  if (!root) return;

  var stack = $("[data-swap-stack]", root);
  var cards = $$("[data-card]", stack || root);
  if (!stack || cards.length < 2) return;

  var controls = $("[data-swap-controls]", root);

  var order = cards.map(function (_, i) { return i; });

  /*
   * SATU UKURAN UNTUK SEMUA LEBAR.
   *
   * Sampai 10 Agustus 2026 ponsel punya angkanya sendiri: dx 12, dy 12, dan
   * `miring: 0`. Yang terakhir itu yang paling terasa — tanpa kemiringan,
   * card belakang cuma jadi garis tipis yang mengintip 12px di atas card
   * depan, dan stack-nya tidak terbaca sebagai stack sama sekali. Yang
   * dilihat pengunjung ponsel praktis satu card biasa.
   *
   * dx 22, BUKAN 26 seperti angka desktop lama, dan itu batas yang dihitung
   * bukan dikira. Card belakang digeser dx ke kanan lalu diperkecil 0,96.
   * Pada screen tersempit yang diuji (320px): padding halaman 16, lebar
   * card 288, lebar tampak setelah skala 276,5, dan sisa 5,8 di tiap sisi.
   * Tepi kanannya jadi 16 + dx + 5,8 + 276,5 = 298,3 + dx, jadi dx di atas
   * 21,7 mendorongnya keluar screen. 22 pas di bawah itu, dan di desktop
   * selisih 4px dari angka lama tidak terlihat.
   *
   * skewY tidak menambah lebar — ia menggeser secara vertikal sebagai fungsi
   * x — jadi ia tidak ikut dihitung di atas.
   */
  function metrics() {
    return { dx: 22, dy: 22, dz: 60, susut: 0.04, miring: 4, jatuh: 140 };
  }

  function slot(i) {
    var u = metrics();
    return {
      x: i * u.dx, y: -i * u.dy, z: -i * u.dz,
      scale: 1 - i * u.susut,
      skewY: i === 0 ? 0 : u.miring,
      /* 0,8 bukan 0,55: card belakang berlatar --surface (#101218) di atas
         --background (#040508), jadi meredupkannya terlalu jauh membuatnya
         lenyap dan stack terbaca sebagai satu card biasa. */
      autoAlpha: i === 0 ? 1 : 0.8,
      zIndex: cards.length - i,
    };
  }

  /* Card belakang dikeluarkan dari urutan tab DAN dari screen reader.
     aria-hidden saja tidak cukup: link di dalamnya tetap bisa difokus
     keyboard, dan fokus yang mendarat di sesuatu yang tidak terlihat adalah
     cara tercepat membuat halaman terasa rusak. */
  function mark() {
    order.forEach(function (idx, i) {
      cards[idx].inert = i !== 0;
      cards[idx].setAttribute("aria-hidden", i === 0 ? "false" : "true");
    });
    if (!controls) return;
    $$("[data-swap-dot]", controls).forEach(function (b, i) {
      var active = order[0] === i;
      b.setAttribute("aria-selected", active ? "true" : "false");
      b.tabIndex = active ? 0 : -1;
    });
  }

  /*
   * SATU timeline hidup pada satu waktu, dan yang lama DIBUNUH lebih dulu.
   *
   * Ini memperbaiki cacat yang terlihat sebagai card belakang menembus
   * card depan. Penyebabnya bukan z-index atau latar tembus pandang --
   * keduanya terukur benar (z 2 lawan 1, opacity 1, latar rgb(16,18,24)
   * opak). Penyebabnya balapan: rotate() menjadwalkan tl.set(zIndex) pada
   * detik 0,4 dan tl.to(autoAlpha) pada 0,42. Kalau pengguna menekan selector
   * dot sebelum itu, relayout() memasang nilai yang benar, lalu penjadwalan
   * lama menimpanya sepersekian detik kemudian.
   *
   * zIndex disetel langsung ke style, bukan lewat GSAP, supaya ia berpindah
   * SEKETIKA -- card yang naik harus sudah berada di atas sebelum satu
   * frame pun digambar.
   */
  var tlActive = null;
  function killTl() {
    if (tlActive) { tlActive.kill(); tlActive = null; }
  }
  cleanups.push(killTl);

  function relayout(beranimasi) {
    killTl();
    var d = beranimasi && !prefersReducedMotion() ? 0.55 : 0;
    var tl = gsap.timeline();
    order.forEach(function (idx, i) {
      var s = slot(i);
      cards[idx].style.zIndex = s.zIndex;
      tl.to(cards[idx], {
        x: s.x, y: s.y, z: s.z, scale: s.scale, skewY: s.skewY,
        autoAlpha: s.autoAlpha, duration: d, ease: EASE,
      }, 0);
    });
    tlActive = tl;
    mark();
  }

  function rotate() {
    killTl();
    var exitIdx = order[0];
    var exit = cards[exitIdx];
    order.push(order.shift());

    var u = metrics();
    var akhir = slot(order.indexOf(exitIdx));
    var tl = gsap.timeline();

    /* Jatuh sampai hilang DULU, baru dipindahkan ke slot belakang. Kalau
       langsung ditweenkan ke sana, ia terlihat menyelinap menembus card
       yang sedang naik. */
    tl.to(exit, { y: "+=" + u.jatuh, autoAlpha: 0, duration: 0.4, ease: "power2.in" }, 0);
    tl.call(function () { exit.style.zIndex = akhir.zIndex; }, null, 0.4);
    tl.set(exit, {
      x: akhir.x, y: akhir.y, z: akhir.z, scale: akhir.scale,
      skewY: akhir.skewY,
    }, 0.4);
    tl.to(exit, { autoAlpha: akhir.autoAlpha, duration: 0.45, ease: EASE }, 0.42);

    order.forEach(function (idx, i) {
      if (idx === exitIdx) return;
      var s = slot(i);
      tl.call(function () { cards[idx].style.zIndex = s.zIndex; }, null, 0.1);
      tl.to(cards[idx], {
        x: s.x, y: s.y, z: s.z, scale: s.scale, skewY: s.skewY,
        autoAlpha: s.autoAlpha, duration: 0.55, ease: EASE,
      }, 0.1);
    });

    tlActive = tl;
    mark();
  }

  /*
   * Dua jalan, dan yang dipilih bergantung SEBERAPA JAUH lompatannya.
   *
   * Kalau yang diminta card tepat berikutnya, rotate() yang dipakai: card
   * depan jatuh sampai hilang DULU, baru dipindahkan ke slot belakang.
   * relayout() akan menweenkannya langsung ke sana, dan ia terlihat menyelinap
   * menembus card yang sedang naik — cacat yang justru jadi alasan rotate()
   * ditulis, dan yang dulu tidak pernah muncul karena rotate() selalu
   * dipanggil timer. Begitu timer-nya dibuang, rotate()
   * sempat jadi kode mati dan cacat itu ikut kembali.
   *
   * Untuk lompatan lebih jauh relayout() yang benar: rotate() cuma tahu cara
   * maju satu langkah. Dengan dua card cabang itu belum pernah terpakai,
   * tapi ia yang membuat penambahan card ketiga nanti tidak diam-diam
   * salah.
   */
  function select(idx) {
    if (order[0] === idx) return;
    if (order[1] === idx) { rotate(); return; }
    var pos = order.indexOf(idx);
    order = order.slice(pos).concat(order.slice(0, pos));
    relayout(true);
  }

  /*
   * SELECTOR dot — dan sejak 10 Agustus 2026 ia SATU-SATUNYA cara stack
   * ini berpindah.
   *
   * Perputaran otomatis tiap 5,2 detik dibuang seluruhnya. Alasannya sudah
   * separuh tertulis di kode lamanya sendiri: begitu pengunjung memilih
   * sendiri, perputaran dimatikan untuk seterusnya, "card yang bergeser
   * sendiri saat sedang dibaca adalah gangguan, bukan animasi". Kalimat itu
   * benar sebelum ada yang mengetuk juga — isi card-nya paragraf pekerjaan
   * yang menuntut waktu baca, dan lima detik tidak cukup untuk card
   * terpanjang. Sekarang ia diam sampai diminta pindah.
   *
   * Dibuat dari JUMLAH card lewat addNode() supaya ikut di-teardown.
   * Ia juga satu-satunya jalan keyboard ke card yang sedang tidak di depan,
   * karena card belakang sengaja di-inert — itulah sebabnya area sentuhnya
   * 44px meski bar yang terlihat cuma 4px.
   */
  if (controls) {
    cards.forEach(function (_, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "swap-dot";
      b.setAttribute("data-swap-dot", "");
      b.setAttribute("role", "tab");
      b.setAttribute("aria-label", "Pengalaman ke-" + (i + 1));

      /* SAMBUNGAN tab <-> tabpanel, dipasang 15 Agustus 2026. Sampai saat itu
         tombol ini mengaku `tab` tanpa pernah menunjuk panel mana pun, jadi
         screen reader mengumumkan "tab 1 dari 2" lalu tidak punya apa-apa
         untuk dituju — dan karena kartu belakang di-inert DAN aria-hidden,
         menekannya tidak menghasilkan satu pun pengumuman.

         Dibaca DARI kartunya (cards[i].id), bukan dinomori ulang di sini:
         penomoran kedua adalah tempat kedua yang bisa meleset. Kalau
         <article>-nya lupa diberi id, sambungannya dilewat — atribut yang
         menunjuk id yang tidak ada lebih buruk daripada tidak ada atribut.

         Tidak perlu didaftarkan ke cleanups: menulis atribut itu mengganti
         nilai, bukan menambah, jadi sudah idempoten terhadap pemasangan ulang
         StrictMode — alasan yang sama dengan innerHTML di addNode().

         Bahasa awamnya: ini yang memberi tahu pembaca layar bahwa titik
         nomor 2 berpasangan dengan kartu pengalaman nomor 2. */
      b.id = "swap-tab-" + (i + 1);
      if (cards[i].id) {
        b.setAttribute("aria-controls", cards[i].id);
        cards[i].setAttribute("aria-labelledby", b.id);
      }
      listen(b, "click", function () { select(i); });
      listen(b, "keydown", function (e) {
        var forward = e.key === "ArrowRight" || e.key === "ArrowDown";
        var backward = e.key === "ArrowLeft" || e.key === "ArrowUp";
        if (!forward && !backward) return;
        e.preventDefault();
        var destIdx = (i + (forward ? 1 : -1) + cards.length) % cards.length;
        select(destIdx);
        $$("[data-swap-dot]", controls)[destIdx].focus();
      });
      addNode(controls, b);
    });
  }

  /*
   * SEMUA CARD DISAMAKAN SETINGGI YANG TERTINGGI, bukan cuma container-nya.
   *
   * Ini bukan kerapian. Terukur di 390x844: card Guru Informatika 761px
   * (lima butir rincian) dan Staf Administrasi 615px (empat butir). Saat
   * yang short berada di depan, yang tinggi di belakangnya menyembul 146px
   * di bawah dan isinya terbaca di samping card depan -- stack-nya
   * terlihat seperti dua card yang salah tumpuk, bukan satu stack.
   * Skala 0,955 tidak menolong karena 761 x 0,955 masih lebih besar dari
   * 615.
   *
   * Tinggi dilepas ke auto DULU sebelum diukur: tanpa itu yang terbaca
   * adalah tinggi yang dipasang putaran sebelumnya, dan card-nya tidak akan
   * pernah bisa mengecil lagi saat screen melebar.
   *
   * Penjaga `measuring` memutus umpan balik: menyetel tinggi card men-trigger
   * ResizeObserver yang mengamati card itu sendiri.
   */
  var measuring = false;
  function measure() {
    if (measuring) return;
    measuring = true;

    var u = metrics();
    var space = (cards.length - 1) * u.dy;

    cards.forEach(function (k) { k.style.height = "auto"; });
    var height = 0;
    cards.forEach(function (k) { height = Math.max(height, k.offsetHeight); });
    cards.forEach(function (k) { k.style.height = height + "px"; });

    stack.style.setProperty("--swap-top", space + "px");
    stack.style.height = height + space + "px";

    requestAnimationFrame(function () { measuring = false; });
  }

  root.classList.add("swap-ready");
  cleanups.push(function () { root.classList.remove("swap-ready"); });

  cards.forEach(function (k) { observe(k, measure); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);

  /*
   * TIDAK ADA LAGI LISTENER DI SINI, dan itu akibat dibuangnya perputaran
   * otomatis. Kelima listener yang dulu berdiri di tempat ini —
   * pointerenter, pointerleave, focusin, focusout, dan visibilitychange —
   * semuanya cuma melayani satu hal: menjeda dan melanjutkan timer.
   * Tidak ada timer, tidak ada yang perlu dijeda.
   *
   * Listener media query juga hilang bersama ukuran khusus ponsel; sejak
   * ukurannya satu untuk semua lebar, ResizeObserver di tiap card sudah
   * menangkap semua perubahan yang perlu diukur ulang.
   */
  measure();
  relayout(false);
}
