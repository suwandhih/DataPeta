/* ============================================================
   PETA INDONESIA — Sambungan awan (Cloudflare Worker)
   ------------------------------------------------------------
   Aplikasi memanggil Worker, bukan Layerbase langsung.
   Kunci API aman (disimpan di Cloudflare, tidak terlihat).
   ------------------------------------------------------------
   Alamat Worker: https://peta-api.suwandhih.workers.dev
   ============================================================ */

const Awan = (function () {
  "use strict";

  const URL_WORKER = "https://peta-api.suwandhih.workers.dev";

  function panggil(isi) {
    return fetch(URL_WORKER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(isi)
    }).then((r) => r.json());
  }

  // ---------- Ambil semua dari awan ----------
  function ambilSemua() {
    return panggil({ aksi: "ambilSemua" }).then((hasil) => {
      if (!hasil.ok) throw new Error(hasil.error || "Gagal ambil data");
      const rows = (hasil.data && hasil.data.rows) || [];
      return rows.map((b) => ({
        id: b.id,
        nama: b.nama,
        wilayah: b.wilayah,
        kategori: b.kategori,
        lon: b.lon,
        lat: b.lat,
        inisial: b.inisial,
        gambar: b.gambar,
        rincian: b.rincian ? JSON.parse(b.rincian) : [],
        diubah: b.diubah
      }));
    });
  }

  // ---------- Kirim satu lokasi ----------
  function simpan(lokasi) {
    return panggil({ aksi: "simpan", lokasi: lokasi }).then((hasil) => {
      if (!hasil.ok) throw new Error(hasil.error || "Gagal simpan");
      return hasil;
    });
  }

  // ---------- Hapus satu lokasi ----------
  function hapus(id) {
    return panggil({ aksi: "hapus", id: id }).then((hasil) => {
      if (!hasil.ok) throw new Error(hasil.error || "Gagal hapus");
      return hasil;
    });
  }

  // ---------- Kirim semua data lokal ke awan ----------
  function kirimSemua(daftar) {
    let sukses = 0;
    let gagal = 0;
    return daftar.reduce(
      (rantai, l) =>
        rantai.then(() =>
          simpan(l)
            .then(() => { sukses++; })
            .catch(() => { gagal++; })
        ),
      Promise.resolve()
    ).then(() => ({ sukses, gagal, total: daftar.length }));
  }

  // ---------- Ambil dari awan, gabung ke lokal (tanpa duplikat) ----------
  function tarikDanGabung() {
    return ambilSemua().then((dariAwan) =>
      Penyimpanan.ambilSemua().then((lokal) => {
        const petaLokal = {};
        lokal.forEach((l) => { petaLokal[l.id] = l; });

        let baru = 0;
        let diperbarui = 0;
        const tugas = [];

        dariAwan.forEach((a) => {
          const l = petaLokal[a.id];
          if (!l) {
            // Belum ada di lokal → tambah
            tugas.push(Penyimpanan.simpan(a));
            baru++;
          } else {
            // Sudah ada → pakai yang paling baru (bandingkan waktu diubah)
            const waktuLokal = l.diubah || "";
            const waktuAwan = a.diubah || "";
            if (waktuAwan > waktuLokal) {
              tugas.push(Penyimpanan.simpan(a));
              diperbarui++;
            }
          }
        });

        return Promise.all(tugas).then(() => ({ baru, diperbarui, total: dariAwan.length }));
      })
    );
  }

  return { ambilSemua, simpan, hapus, kirimSemua, tarikDanGabung };
})();
