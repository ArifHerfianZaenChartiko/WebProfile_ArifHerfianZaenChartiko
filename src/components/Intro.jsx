export default function Intro() {
  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════════
           PEMBUKA — panel yang menutup screen sampai monogramnya selesai terbentuk.

           BUKAN "A di sebelah H". Keduanya berbagi bagian yang sama sehingga
           jadi SATU bentuk: gerbang bersegi.

             dua tiang tegak   -> batang kiri dan kanan huruf H
             puncak lancip     -> huruf A, memakai kedua tiang itu sebagai kaki
             palang            -> palang A DAN palang H sekaligus

           Jadi tiap stroke dipakai dua kali. Palangnya berdiri sebagai
           kelompok sendiri bukan karena warnanya -- seluruh logo satu
           warna -- melainkan karena WAKTUNYA: ia digambar paling akhir,
           sebab sampai ia turun bentuknya masih terbaca sebagai gerbang
           kosong. Ia yang mengunci dua huruf jadi satu tanda.

           HEKSAGON PEMBINGKAINYA DIBUANG pada 15 Agustus 2026, atas
           permintaan. Dulu ada <g data-intro-frame> berisi dua path yang
           menggariskan segi enam mengelilingi monogram ini -- puncak (88,6),
           bahu (158,46) dan (18,46), pinggang (158,122) dan (18,122), dasar
           (88,162) -- digambar setipis 1,5 satuan supaya tandanya tetap yang
           dibaca lebih dulu. Ia dibelah dua path supaya bisa tumbuh dari
           puncak ke bawah di kiri dan kanan sekaligus, bukan melingkar satu
           arah. Aturan CSS dan tween GSAP miliknya ikut dibuang, bukan
           ditinggalkan menganggur; kalau suatu saat dipulihkan, ketiga
           tempatnya ada di git history commit ini.

           VIEWBOX-NYA SENGAJA TIDAK DIRAPATKAN ke tanda yang tersisa.
           Heksagonlah yang dulu mengisi 176x168 itu; monogramnya sendiri
           cuma menempati x 42-134 dan y 34-138 setelah stroke setebal 12
           diperhitungkan. Merapatkan viewBox akan membuat tandanya melar
           jadi hampir dua kali lipat, sebab .intro-mark dipatok
           `width: min(52vw,168px)` -- lebar itu berlaku untuk viewBox, bukan
           untuk tintanya. Dibiarkan apa adanya, tandanya tetap PERSIS
           seukuran dan sepenempatan seperti sebelum heksagonnya dibuang, dan
           ruang kosong di sekelilingnya tidak terlihat karena panelnya
           memang hitam polos dan tandanya dipusatkan.

           GEOMETRI, viewBox 176x168, semua angka dalam satuan itu:

             gerbang    M 48 132 L 48 84 L 88 40 L 128 84 L 128 132
                        kaki di y=132, bahu di y=84, puncak di (88,40)
             palang     M 48 106 L 128 106

           Digambar TEBAL (stroke-width 12 dari 176 satuan lebar) supaya ia
           bertubuh, bukan garis rambut. Ujungnya butt dan sikunya miter --
           sudut lancip di puncak itu hasil miter join pada sudut 84,6 derajat,
           bukan bentuk yang digambar terpisah.

           Semua <path> hanya bergaris tanpa isi supaya bisa digambar bertahap
           lewat stroke-dashoffset; panjangnya diukur getTotalLength() di
           src/lib/animations/intro.js, tidak ditulis tangan di sini.

           Bahasa awamnya: inilah tanda "AH" yang tergambar sendiri di layar
           hitam sebelum situsnya muncul. Segi enam yang dulu mengelilinginya
           sudah dibuang, jadi yang tergambar sekarang tinggal hurufnya saja --
           dan karena garis segi enam itu yang dulu muncul lebih dulu,
           pembukanya juga jadi sepersekian detik lebih cepat.
           ═══════════════════════════════════════════════════════════════════════ */}
      <div data-component="intro" className="intro" aria-hidden="true">
        <div className="intro-inner" data-intro-inner>
          <svg className="intro-mark" viewBox="0 0 176 168" role="img"
            aria-label="Monogram A H">
            {/* SATU garis menerus, bukan tiga potong.

                Versi pertama memakai tiga <path> terpisah: tiang kiri, tiang
                kanan, lalu diagonal puncaknya. Hasilnya bertakik di kedua
                bahu -- ujung diagonal yang dipotong rata (linecap butt)
                bertemu sisi tiang pada sudut 42 derajat, dan selisihnya
                menganga sebagai coakan kecil. Digambar sebagai satu path,
                keempat sikunya jadi miter join yang menyambung rapat, dan
                puncaknya jadi sudut lancip tanpa sambungan sama sekali.

                Side effect-nya justru yang diinginkan: stroke-nya menyusur
                naik dari kaki kiri, melewati puncak, lalu turun ke kaki
                kanan -- satu tarikan, bukan tiga bagian yang muncul
                bergantian. */}
            <g data-intro-stroke>
              <path d="M 48 132 L 48 84 L 88 40 L 128 84 L 128 132" />
            </g>

            <g data-intro-lock>
              <path d="M 48 106 L 128 106" />
            </g>
          </svg>
        </div>
      </div>
    </>
  );
}
