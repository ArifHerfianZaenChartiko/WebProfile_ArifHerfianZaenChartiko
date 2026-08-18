/*
 * LATAR HIDUP — garis ambient dan band berjalan.
 *
 * ══ TEKNIS
 *
 * Kedua motion di sini satu-satunya yang berjalan TANPA menunggu scroll, jadi
 * keduanya juga satu-satunya yang menempel di gsap.ticker sepanjang halaman
 * terbuka. Menaruhnya bersama membuat ongkos per-frame situs ini terkumpul di
 * satu berkas alih-alih tersebar.
 *
 * ══ BAHASA AWAMNYA
 *
 * Garis-garis samar yang melayang di latar, dan tulisan berjalan yang arahnya
 * mengikuti arah gulir Anda.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { $, $$, prefersReducedMotion } from "./dom.js";

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
 * LATAR HIDUP — MEDAN GARIS.
 *
 * Bidang gelap sebesar screen penuh tanpa apa-apa di belakangnya terbaca
 * sebagai halaman gagal muat, bukan keputusan desain. Kontrasnya sangat
 * rendah; yang dirasakan pengunjung adalah ruangnya "bernafas". Kursor
 * menariknya — satu-satunya hal di situs yang menanggapi motion mouse tanpa
 * harus diklik. Berhenti sendiri saat di luar screen.
 */
export function initAmbientLines(ctx) {
  const { cleanups, listen, observe } = ctx;
  $$('canvas[data-component="ambient-lines"]').forEach(function (canvas) {
    if (prefersReducedMotion()) return;

    var density = Number(canvas.getAttribute("data-density")) || 46;
    var ctx = canvas.getContext("2d");
    var raf = 0, running = false, w = 0, h = 0;
    var pointer = { x: -9999, y: -9999 };
    var lines = [];

    function build() {
      var rect = canvas.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width; h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lines = [];
      for (var i = 0; i < density; i++) {
        lines.push({
          x: Math.random() * w, y: Math.random() * h,
          len: 40 + Math.random() * 190,
          angle: (Math.random() - 0.5) * 1.5 + Math.PI / 2.6,
          speed: 0.04 + Math.random() * 0.16,
          alpha: 0.05 + Math.random() * 0.16,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        /* Hanyut pelan ke bawah; yang keluar dari bawah dikembalikan ke atas
           supaya medannya tidak pernah habis. */
        line.y += line.speed;
        if (line.y - line.len > h) { line.y = -line.len; line.x = Math.random() * w; }

        var angle = line.angle, alpha = line.alpha;
        var dx = pointer.x - line.x, dy = pointer.y - line.y;
        var dist = Math.hypot(dx, dy);
        var REACH = 190;
        if (dist < REACH) {
          /* Makin dekat kursor, makin kuat garis ikut menghadap ke arahnya. */
          var pull = 1 - dist / REACH;
          angle += (Math.atan2(dy, dx) - angle) * pull * 0.55;
          alpha += pull * 0.5;
        }

        ctx.beginPath();
        ctx.strokeStyle = "rgba(216, 216, 216, " + Math.min(alpha, 0.7) + ")";
        ctx.lineWidth = 1;
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x + Math.cos(angle) * line.len, line.y + Math.sin(angle) * line.len);
        ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    }

    build();

    /* Canvas di luar screen tidak perlu menggambar apa pun. */
    var io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        if (!running) { running = true; raf = requestAnimationFrame(draw); }
      } else {
        running = false; cancelAnimationFrame(raf);
      }
    }, { threshold: 0 });
    io.observe(canvas);
    cleanups.push(function () { io.disconnect(); running = false; cancelAnimationFrame(raf); });

    observe(canvas, build);

    listen(window, "pointermove", function (e) {
      var rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    }, { passive: true });
    listen(window, "pointerleave", function () { pointer.x = -9999; pointer.y = -9999; });
  });
}
