export default function Contact() {
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
          className="mx-auto w-full px-4 sm:px-6 nav:px-10 max-w-[1180px] grid grid-cols-1 gap-x-8 gap-y-10 py-16 sm:py-20 nav:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] nav:gap-x-16 nav:gap-y-12 nav:py-28">

          <div>
            <header className="nav:sticky nav:top-28">
              <div data-component="scrub-reveal" className="flex items-center gap-4 mb-7">
                <span className="-mono text-text-muted tabular-nums">06</span>
                <span className="h-px w-12 bg-line"></span>
                <span className="-caption-small text-text-muted">Kontak</span>
              </div>

              <h2 className="-h1" data-line-mask>
                <span data-anim="line-mask" className="last:text-text-muted"><span>Hubungi</span></span>
                <span data-anim="line-mask" className="last:text-text-muted"><span>Saya</span></span>
              </h2>

              <p data-component="scrub-reveal" className="-body-small text-text-muted mt-7 max-w-[17rem]">
                Terbuka untuk peluang pengembangan web fullstack, kolaborasi, atau diskusi seputar produk dan pendidikan
              </p>
            </header>
          </div>

          <div className="min-w-0 nav:min-h-[62vh]">
            <div className="flex flex-col gap-16">

              <div className="border-t border-line">
                <div data-component="scrub-reveal">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-line py-6">
                    <span className="-caption-small text-text-muted">Email</span>
                    <span className="-title-4">arif.herfian@gmail.com</span>
                  </div>
                </div>
                <div data-component="scrub-reveal">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-line py-6">
                    <span className="-caption-small text-text-muted">WhatsApp</span>
                    <span className="-title-4">+62 857-9022-6536</span>
                  </div>
                </div>
                <div data-component="scrub-reveal">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-line py-6">
                    <span className="-caption-small text-text-muted">Lokasi</span>
                    <span className="-title-4">Kab. Blitar, Jawa Timur</span>
                  </div>
                </div>
                <div data-component="scrub-reveal">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-line py-6">
                    <span className="-caption-small text-text-muted">Almamater</span>
                    <span className="-title-4">Universitas Negeri Malang</span>
                  </div>
                </div>
              </div>

              <div data-component="scrub-reveal">
                <div className="corner-marks border border-line p-5 sm:p-7 nav:p-10">
                  <h3 className="-caption-small mb-8 text-text-muted">Kirim Pesan</h3>

                  <form id="contact-form" className="flex flex-col gap-6 sm:gap-7">
                    <div className="grid grid-cols-1 gap-6 sm:gap-7 nav:grid-cols-2">
                      <div>
                        <label htmlFor="senderName" className="-caption-small mb-1 block text-text-muted">Nama</label>
                        <input id="senderName" type="text" placeholder="Nama Anda"
                          className="w-full border-b border-line bg-transparent py-3 -body-small text-text outline-none transition-colors duration-300 ease-power placeholder:text-text-muted/50 focus:border-text" />
                      </div>
                      <div>
                        <label htmlFor="senderEmail" className="-caption-small mb-1 block text-text-muted">Email</label>
                        <input id="senderEmail" type="email" placeholder="email@contoh.com"
                          className="w-full border-b border-line bg-transparent py-3 -body-small text-text outline-none transition-colors duration-300 ease-power placeholder:text-text-muted/50 focus:border-text" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="messageBody" className="-caption-small mb-1 block text-text-muted">Pesan</label>
                      <textarea id="messageBody" rows="4" placeholder="Halo Arif! Saya melihat portofolio Anda dan ingin berdiskusi soal peluang kerja sama."
                        className="w-full border-b border-line bg-transparent py-3 -body-small text-text outline-none transition-colors duration-300 ease-power placeholder:text-text-muted/50 focus:border-text resize-y"></textarea>
                    </div>

                    {/* Dua jalur, satu isian. Keduanya mengirim pesan yang bentuknya
                         sama — yang berbeda hanya aplikasi yang membukanya. */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      <button type="submit" data-component="button"
                        className="group relative inline-flex cursor-pointer items-center justify-center rounded-full border px-8 py-4 transition-colors duration-300 ease-power bg-text text-background border-text w-full sm:w-auto">
                        <span className="relative block overflow-hidden">
                          <span className="-caption-small flex items-center justify-center gap-2 transition-transform duration-500 ease-brand group-hover:-translate-y-full"><i className="fa-brands fa-whatsapp"></i> Kirim via WhatsApp</span>
                          <span aria-hidden="true" className="-caption-small absolute inset-x-0 top-full flex items-center justify-center gap-2 transition-transform duration-500 ease-brand group-hover:-translate-y-full"><i className="fa-brands fa-whatsapp"></i> Kirim via WhatsApp</span>
                        </span>
                      </button>
                      <button type="button" id="send-email" data-component="button"
                        className="group relative inline-flex cursor-pointer items-center justify-center rounded-full border px-8 py-4 transition-colors duration-300 ease-power border-line text-text hover:border-text/60 w-full sm:w-auto">
                        <span className="relative block overflow-hidden">
                          <span className="-caption-small flex items-center justify-center gap-2 transition-transform duration-500 ease-brand group-hover:-translate-y-full"><i className="fa-solid fa-envelope"></i> Kirim via Email</span>
                          <span aria-hidden="true" className="-caption-small absolute inset-x-0 top-full flex items-center justify-center gap-2 transition-transform duration-500 ease-brand group-hover:-translate-y-full"><i className="fa-solid fa-envelope"></i> Kirim via Email</span>
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
