import Icon from "./Icon.jsx";
import { useText } from "../i18n/lang.jsx";

/*
 * ══ TEKNIS
 *
 * Teks yang terkirim lewat WhatsApp dan surel TIDAK di sini, melainkan di
 * initContactForm() di src/lib/animations/behaviors.js — ia ikut bahasa
 * halaman lewat ctx.lang. Yang di sini cuma yang terlihat di halaman.
 *
 * ══ BAHASA AWAMNYA
 *
 * Isi bagian Kontak dalam dua bahasa.
 */
const TEXT = {
  en: {
    label: "Contact",
    title: ["Get in", "Touch"],
    sub: "Open to opportunities in data analysis, collaborations, or conversations about data and education",
    rows: [["Email", "arif.herfian@gmail.com"], ["WhatsApp", "+62 857-9022-6536"], ["Location", "Blitar Regency, East Java"], ["Alma Mater", "Universitas Negeri Malang"]],
    form: "Send a Message",
    name: "Name",
    namePh: "Your name",
    email: "Email",
    emailPh: "email@example.com",
    message: "Message",
    messagePh: "Hi Arif! I came across your portfolio and would like to discuss a possible collaboration.",
    viaWa: "Send via WhatsApp",
    viaEmail: "Send via Email",
  },
  id: {
    label: "Kontak",
    title: ["Hubungi", "Saya"],
    sub: "Terbuka untuk peluang di bidang analisis data, kolaborasi, atau diskusi seputar data dan pendidikan",
    rows: [["Email", "arif.herfian@gmail.com"], ["WhatsApp", "+62 857-9022-6536"], ["Lokasi", "Kab. Blitar, Jawa Timur"], ["Almamater", "Universitas Negeri Malang"]],
    form: "Kirim Pesan",
    name: "Nama",
    namePh: "Nama Anda",
    email: "Email",
    emailPh: "email@contoh.com",
    message: "Pesan",
    messagePh: "Halo Arif! Saya melihat portofolio Anda dan ingin berdiskusi soal peluang kerja sama.",
    viaWa: "Kirim via WhatsApp",
    viaEmail: "Kirim via Email",
  },
};

export default function Contact() {
  const t = useText(TEXT);
  return (
    <>
      {/* Kembaran band di Pendidikan, arah sebaliknya. Tingginya WAJIB sama
          persis dengan pasangannya: threshold pembalik warna bar status di
          initStatusBar() menghitung keduanya dengan satu angka yang sama. */}
      <div aria-hidden="true" className="band-fade-to-dark h-[20vh] sm:h-[24vh] nav:h-[28vh]"></div>


      {/* ══════════════════════════════════════════════════════════════════════════
           06 KONTAK — kembali ke gelap. SELURUH BARIS DI SINI HANYA KETERANGAN,
           tidak ada yang bisa diklik: semua jalan menuju WhatsApp dan surel sengaja
           dikumpulkan ke satu pintu, yaitu form di bawahnya.
           ═══════════════════════════════════════════════════════════════════════ */}
      {/* SENGAJA tanpa `scroll-mt-*` — berlaku untuk keenam <section id>.

          Mekanismenya: `scroll-mt-24` menghasilkan `scroll-margin-top: 6rem`,
          dan Lenis membaca properti itu saat `scrollTo()` diberi elemen, sama
          seperti `scrollIntoView()` bawaan. Titik berhentinya jadi
          `offsetTop - 96px`, bukan `offsetTop`. Terukur +96px di 390, 768, dan
          1440 — konstan, karena `rem` tidak ikut lebar viewport.

          Akibatnya di screen: bagian tujuan berhenti satu jengkal di bawah tepi
          atas, sehingga ekor bagian sebelumnya masih terlihat dan lompatannya
          terbaca seperti gagal sampai. Cadangan itu gunanya menghindari header
          `position: fixed`; di sini chapter bar-nya di bawah, jadi tidak ada yang
          perlu dihindari. Jarak di atas judul sudah disediakan padding section
          (`py-28`, `nav:py-36`). */}
      <section id="kontak" data-component="chapter" className="relative">
        <div data-component="container"
          className="mx-auto w-full px-gutter max-w-[1180px] grid grid-cols-1 gap-x-8 gap-y-10 py-16 sm:py-20 nav:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] nav:gap-x-16 nav:gap-y-12 nav:py-28">

          <div>
            <header className="nav:sticky nav:top-28">
              <div data-component="scrub-reveal" className="flex items-center gap-4 mb-7">
                <span className="-mono text-text-muted tabular-nums">06</span>
                <span className="h-px w-12 bg-line"></span>
                <span className="-caption-small text-text-muted">{t.label}</span>
              </div>

              <h2 className="-h1" data-line-mask>
                <span data-anim="line-mask" className="last:text-text-muted"><span>{t.title[0]}</span></span>
                <span data-anim="line-mask" className="last:text-text-muted"><span>{t.title[1]}</span></span>
              </h2>

              <p data-component="scrub-reveal" className="-body-small text-text-muted mt-7 max-w-[17rem]">
                {t.sub}
              </p>
            </header>
          </div>

          <div className="min-w-0 nav:min-h-[62vh]">
            <div className="flex flex-col gap-16">

              <div className="border-t border-line">
                {t.rows.map(function (row) {
                  return (
                    <div key={row[0]} data-component="scrub-reveal">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-line py-6">
                        <span className="-caption-small text-text-muted">{row[0]}</span>
                        <span className="-title-4">{row[1]}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div data-component="scrub-reveal">
                <div className="corner-marks border border-line p-5 sm:p-7 nav:p-10">
                  <h3 className="-caption-small mb-8 text-text-muted">{t.form}</h3>

                  <form id="contact-form" className="flex flex-col gap-6 sm:gap-7">
                    <div className="grid grid-cols-1 gap-6 sm:gap-7 nav:grid-cols-2">
                      <div>
                        <label htmlFor="senderName" className="-caption-small mb-1 block text-text-muted">{t.name}</label>
                        <input id="senderName" type="text" placeholder={t.namePh}
                          className="w-full border-b border-line bg-transparent py-3 -body-small text-text outline-none transition-colors duration-300 ease-power placeholder:text-text-muted/50 focus:border-text" />
                      </div>
                      <div>
                        <label htmlFor="senderEmail" className="-caption-small mb-1 block text-text-muted">{t.email}</label>
                        <input id="senderEmail" type="email" placeholder={t.emailPh}
                          className="w-full border-b border-line bg-transparent py-3 -body-small text-text outline-none transition-colors duration-300 ease-power placeholder:text-text-muted/50 focus:border-text" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="messageBody" className="-caption-small mb-1 block text-text-muted">{t.message}</label>
                      <textarea id="messageBody" rows="4" placeholder={t.messagePh}
                        className="w-full border-b border-line bg-transparent py-3 -body-small text-text outline-none transition-colors duration-300 ease-power placeholder:text-text-muted/50 focus:border-text resize-y"></textarea>
                    </div>

                    {/* Dua jalur, satu isian. Keduanya mengirim pesan yang bentuknya
                         sama — yang berbeda hanya aplikasi yang membukanya. */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      <button type="submit" data-component="button"
                        className="group relative inline-flex cursor-pointer items-center justify-center rounded-full border px-8 py-4 transition-colors duration-300 ease-power bg-text text-background border-text w-full sm:w-auto">
                        <span className="relative block overflow-hidden">
                          <span className="-caption-small flex items-center justify-center gap-2 transition-transform duration-500 ease-brand group-hover:-translate-y-full"><Icon name="whatsapp" /> {t.viaWa}</span>
                          <span aria-hidden="true" className="-caption-small absolute inset-x-0 top-full flex items-center justify-center gap-2 transition-transform duration-500 ease-brand group-hover:-translate-y-full"><Icon name="whatsapp" /> {t.viaWa}</span>
                        </span>
                      </button>
                      <button type="button" id="send-email" data-component="button"
                        className="group relative inline-flex cursor-pointer items-center justify-center rounded-full border px-8 py-4 transition-colors duration-300 ease-power border-line text-text hover:border-text/60 w-full sm:w-auto">
                        <span className="relative block overflow-hidden">
                          <span className="-caption-small flex items-center justify-center gap-2 transition-transform duration-500 ease-brand group-hover:-translate-y-full"><Icon name="envelope" /> {t.viaEmail}</span>
                          <span aria-hidden="true" className="-caption-small absolute inset-x-0 top-full flex items-center justify-center gap-2 transition-transform duration-500 ease-brand group-hover:-translate-y-full"><Icon name="envelope" /> {t.viaEmail}</span>
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    </>
  );
}
