/*
 * LATAR HIDUP — jaringan simpul dan band berjalan.
 *
 * ══ TEKNIS
 *
 * Kedua motion di sini satu-satunya yang berjalan TANPA menunggu scroll, jadi
 * keduanya juga satu-satunya yang menempel sepanjang halaman terbuka. Menaruh
 * keduanya bersama membuat ongkos per-frame situs ini terkumpul di satu berkas
 * alih-alih tersebar.
 *
 * ══ RIWAYAT LATAR BERANDA DAN PENUTUP
 *
 * Sampai 27 Agustus 2026 di sini berdiri initAmbientLines(): medan garis yang
 * hanyut turun dan ikut menghadap ke kursor. Ia dibuang pagi itu, lalu hari yang
 * sama diminta diganti jaringan simpul — dua titik yang berdekatan disambung
 * benang, dan kursor menariknya. Yang di bawah ini penggantinya.
 *
 * ══ BAHASA AWAMNYA
 *
 * Titik-titik samar yang melayang pelan di latar halaman pertama dan terakhir,
 * saling tersambung benang tipis saat berdekatan, dan mendekat ke kursor Anda —
 * ditambah tulisan berjalan yang arahnya mengikuti arah gulir.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { $, $$, prefersReducedMotion, weakDevice } from "./dom.js";

/*
 * MARQUEE TAK BERUJUNG YANG MEMBACA ARAH SCROLL.
 *
 * Satu-satunya motion yang berjalan sendiri tanpa menunggu scroll — denyut
 * latar, supaya screen tidak pernah benar-benar mati. Arahnya mengikuti arah
 * scroll, jadi ia terasa terhubung dengan tangan pengunjung.
 */
export function initMarquees(ctx) {
  const { addTicker, observe } = ctx;
  if (prefersReducedMotion()) return;

  $$('[data-anim="marquee"]').forEach(function (root) {
    var track = $(".marquee-track", root);
    var speed = Number(root.getAttribute("data-speed")) || 45;
    var half = track.scrollWidth / 2;
    var offset = 0;
    var direction = 1;

    var setX = gsap.quickSetter(track, "x", "px");

    addTicker(function (_t, deltaMs) {
      /* deltaMs dari ticker GSAP, bukan selisih timestamp sendiri — supaya
         kecepatannya sama di screen 60Hz maupun 120Hz. */
      offset += (speed * direction * deltaMs) / 1000;
      /* Modulo dua arah: sisa negatif dikembalikan ke rentang positif, kalau
         tidak marquee melompat saat arahnya berbalik. */
      offset = ((offset % half) + half) % half;
      setX(-offset);
    });

    ScrollTrigger.create({
      trigger: document.body, start: 0, end: "max",
      onUpdate: function (self) {
        direction = self.direction === -1 ? -1 : 1;
        offset += Math.min(Math.abs(self.getVelocity()) / 260, 7) * direction;
      },
    });

    observe(track, function () { half = track.scrollWidth / 2; });
  });
}

/*
 * LATAR HIDUP — JARINGAN SIMPUL.
 *
 * ══ TEKNIS
 *
 * Bidang gelap sebesar screen penuh tanpa apa-apa di belakangnya terbaca sebagai
 * halaman gagal muat, bukan keputusan desain. Kontrasnya karena itu dijaga
 * sangat rendah: yang dirasakan pengunjung ruangnya "bernafas", bukan ada gambar
 * di belakang teks. Kursor menariknya — ini satu-satunya hal di situs yang
 * menanggapi gerak mouse tanpa harus diklik. Berhenti sendiri saat di luar
 * screen.
 *
 * DITULIS TANGAN, BUKAN PUSTAKA. particles.js dan tsparticles sama-sama
 * mengerjakan efek ini, tapi keduanya 25-100 KB untuk dua canvas, dan
 * Content-Security-Policy di vercel.json berbunyi `default-src 'self'` sehingga
 * memuatnya dari CDN akan diblokir peramban tanpa satu pun pesan di halaman.
 * Yang di bawah ini 60 baris dan ikut ke bundel yang memang sudah diunduh.
 *
 * ══ TIGA ANGKA YANG DIHITUNG, BUKAN DIPATOK
 *
 * `data-density` adalah jumlah simpul PADA LAYAR DESKTOP ACUAN (1440x900),
 * bukan jumlah mutlak. Jumlah sebenarnya diskalakan terhadap luas canvas, sebab
 * jumlah tetap menghasilkan dua kesalahan sekaligus: sesak di ponsel dan lowong
 * di layar lebar. Untuk `data-density="52"` di Beranda: 18 simpul pada 390x844,
 * 32 pada 768x1024, 52 pada 1440x900, dan 83 pada 1920x1080.
 *
 * KEDUA UJUNGNYA DIPAGARI, dan pagarnya bukan angka bulat asal pilih. Lantai
 * 0,35: di bawah itu ponsel dapat kurang dari 18 simpul dan jaringannya pecah
 * jadi titik-titik lepas tanpa benang. Langit-langit 1,6: ia yang menahan agar
 * layar 4K tidak menuntut 148 simpul — pemeriksaannya kuadratik, dan 83 simpul
 * sudah 3.403 pasang per frame.
 *
 * `link`, jarak maksimum dua simpul masih disambung, juga ikut: 1,35 x akar
 * (luas / jumlah simpul). Akar itu jarak rata-rata antar simpul, jadi yang
 * dijaga tetap bukan jaraknya melainkan JUMLAH TETANGGA tiap simpul — terhitung
 * 5,0 di 1280x800, 1440x900, dan 1920x1080; 5,1 di 768x1024; 5,7 di 390x844.
 * Kalau `link` dipatok satu angka, ponsel yang simpulnya lebih renggang
 * kehilangan hampir seluruh benangnya. Batas atasnya 200px (yang mengikat di
 * semua lebar desktop) supaya benang terpanjang tidak melintasi separuh screen;
 * batas bawahnya 110px, yang belum pernah tercapai — 320x568 pun masih 136px.
 *
 * Perangkat lemah dapat 60% simpulnya (lihat weakDevice() di dom.js). Ongkosnya
 * kuadratik, jadi memangkas 40% simpul memangkas 64% pemeriksaan: 1.326 pasang
 * jadi 465 di 1440x900.
 *
 * ══ TARIKAN KURSOR TIDAK MENGUBAH POSISI SIMPUL
 *
 * Ini yang paling mudah salah kalau ada yang menyunting bagian ini. Tarikannya
 * dihitung ulang tiap frame sebagai OFFSET GAMBAR (`px`/`py`), bukan ditambahkan
 * ke posisi simpulnya (`x`/`y`). Kalau ia ditambahkan, tiap sapuan mouse
 * meninggalkan sisa yang menumpuk, dan setelah semenit jaringannya menggumpal di
 * jalur yang paling sering dilewati kursor lalu tidak pernah kembali. Dengan
 * offset gambar, simpulnya kembali sendiri begitu kursor menjauh.
 *
 * Benang antar simpul memakai posisi GAMBAR itu juga, supaya benangnya ikut
 * tertarik bersama titiknya alih-alih terlepas menggantung.
 *
 * ══ BAHASA AWAMNYA
 *
 * Titik-titik samar melayang pelan di latar. Dua titik yang berdekatan otomatis
 * disambung benang tipis, dan titik di dekat kursor ikut mendekat serta menyala
 * — jadi latarnya terasa hidup dan menanggapi Anda, tanpa pernah cukup terang
 * untuk mengganggu bacaan.
 */
export function initAmbientNetwork(ctx) {
  const { cleanups, listen, observe } = ctx;
  $$('canvas[data-component="ambient-network"]').forEach(function (canvas) {
    if (prefersReducedMotion()) return;

    /* `paint`, bukan `ctx`: nama itu sudah dipakai lifecycle di atas, dan
       versi lama berkas ini sempat menimpanya di dalam forEach. */
    var paint = canvas.getContext("2d");
    var density = Number(canvas.getAttribute("data-density")) || 46;
    var raf = 0, running = false, last = 0, w = 0, h = 0, link = 160;
    var pointer = { x: -9999, y: -9999 };
    var nodes = [];

    /* Jangkauan kursor. Lebih besar daripada `link` supaya benang ke kursor
       muncul sedikit lebih dulu daripada benang antar simpul di sekitarnya. */
    var REACH = 200;

    /* Warna mengikuti --color-text dan --color-accent di src/styles/theme.css.
       Ditulis sebagai angka, bukan dibaca dari getComputedStyle: nilainya
       dipakai ribuan kali per frame. Kalau token itu diubah, ubah di sini. */
    var INK = "216, 216, 216";
    var ACCENT = "255, 106, 61";

    function build() {
      var rect = canvas.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width; h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      paint.setTransform(dpr, 0, 0, dpr, 0, 0);

      var area = w * h;
      var scale = Math.min(1.6, Math.max(0.35, area / (1440 * 900)));
      var count = Math.max(6, Math.round(density * scale * (weakDevice() ? 0.6 : 1)));
      link = Math.min(200, Math.max(110, 1.35 * Math.sqrt(area / count)));

      nodes = [];
      for (var i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w, y: Math.random() * h,
          /* ±0,34px per frame 60Hz ≈ 20px per detik: cukup untuk terlihat
             hidup kalau diperhatikan, tidak cukup untuk menarik mata dari
             teks di depannya. */
          vx: (Math.random() - 0.5) * 0.34,
          vy: (Math.random() - 0.5) * 0.34,
          px: 0, py: 0, pull: 0,
        });
      }
    }

    function draw(now) {
      /* Waktu nyata, bukan hitungan frame: tanpa ini screen 120Hz menggerakkan
         simpulnya dua kali lebih cepat. Dibatasi 2,5 frame supaya kembali dari
         tab yang lama ditinggalkan tidak melompatkan semuanya sekaligus. */
      var dt = last ? Math.min((now - last) / 16.667, 2.5) : 1;
      last = now;

      paint.clearRect(0, 0, w, h);

      /* Satu lintasan: gerakkan, bungkus di tepi, lalu hitung posisi gambarnya
         setelah ditarik kursor. */
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        /* Keluar satu tepi, masuk dari tepi seberangnya. Marginnya `link`
           supaya simpul yang muncul kembali tidak berkedip bersama benangnya. */
        if (n.x < -link) n.x = w + link; else if (n.x > w + link) n.x = -link;
        if (n.y < -link) n.y = h + link; else if (n.y > h + link) n.y = -link;

        var dx = pointer.x - n.x, dy = pointer.y - n.y;
        var dist = Math.hypot(dx, dy);
        n.pull = dist < REACH ? 1 - dist / REACH : 0;
        n.px = n.x + dx * n.pull * 0.28;
        n.py = n.y + dy * n.pull * 0.28;
      }

      /* Benang antar simpul. Makin dekat, makin pekat — batas atasnya 0,16
         supaya jaringan yang rapat tidak pernah menumpuk jadi bidang abu. */
      paint.lineWidth = 1;
      for (var a = 0; a < nodes.length; a++) {
        for (var b = a + 1; b < nodes.length; b++) {
          var p = nodes[a], q = nodes[b];
          var lx = p.px - q.px, ly = p.py - q.py;
          var d = Math.hypot(lx, ly);
          if (d >= link) continue;
          paint.beginPath();
          paint.strokeStyle = "rgba(" + INK + ", " + (1 - d / link) * 0.16 + ")";
          paint.moveTo(p.px, p.py);
          paint.lineTo(q.px, q.py);
          paint.stroke();
        }
      }

      /* Benang ke kursor, satu-satunya yang memakai warna aksen. */
      for (var c = 0; c < nodes.length; c++) {
        var m = nodes[c];
        if (!m.pull) continue;
        paint.beginPath();
        paint.strokeStyle = "rgba(" + ACCENT + ", " + m.pull * 0.32 + ")";
        paint.moveTo(m.px, m.py);
        paint.lineTo(pointer.x, pointer.y);
        paint.stroke();
      }

      /* Titiknya digambar paling akhir supaya ia duduk di atas benangnya,
         bukan terpotong garis yang melintas. */
      for (var k = 0; k < nodes.length; k++) {
        var s = nodes[k];
        paint.beginPath();
        paint.fillStyle = "rgba(" + INK + ", " + (0.3 + s.pull * 0.5) + ")";
        paint.arc(s.px, s.py, 1.1 + s.pull * 1.1, 0, Math.PI * 2);
        paint.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    build();

    /* Canvas di luar screen tidak perlu menggambar apa pun. `last` dinolkan
       saat berhenti supaya frame pertama sesudahnya tidak menghitung delta
       sepanjang waktu ia tidak terlihat. */
    var io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        if (!running) { running = true; last = 0; raf = requestAnimationFrame(draw); }
      } else {
        running = false; cancelAnimationFrame(raf);
      }
    }, { threshold: 0 });
    io.observe(canvas);
    cleanups.push(function () { io.disconnect(); running = false; cancelAnimationFrame(raf); });

    /* Membangun ulang mengacak posisi simpul. Itu diterima karena resize jarang
       terjadi saat halaman dibaca, dan tinggi Beranda `svh` — viewport KECIL —
       jadi bilah alamat ponsel yang menyusut tidak ikut memicunya. */
    observe(canvas, build);

    listen(window, "pointermove", function (e) {
      var rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    }, { passive: true });
    listen(window, "pointerleave", function () { pointer.x = -9999; pointer.y = -9999; });
  });
}
