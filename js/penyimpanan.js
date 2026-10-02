/* ============================================================
   PETA INDONESIA — Penyimpanan data lokal (IndexedDB)
   ------------------------------------------------------------
   Data lokasi disimpan di peramban (PC / HP), TIDAK hilang saat
   halaman ditutup. Tanpa internet.
   ------------------------------------------------------------
   Nama database : peta-indonesia
   Tabel (store) : lokasi      (kunci: id)   — data lokasi
                   pengaturan  (kunci: nama) — daftar kategori
   ============================================================ */

const Penyimpanan = (function () {
  "use strict";

  const NAMA_DB = "peta-indonesia";
  const VERSI = 2;
  const STORE = "lokasi";
  const STORE_ATUR = "pengaturan";
  let db = null;

  // ---------- Buka database ----------
  function buka() {
    return new Promise((selesai, gagal) => {
      if (db) return selesai(db);
      const permintaan = indexedDB.open(NAMA_DB, VERSI);

      permintaan.onupgradeneeded = (e) => {
        const d = e.target.result;
        if (!d.objectStoreNames.contains(STORE)) {
          d.createObjectStore(STORE, { keyPath: "id" });
        }
        if (!d.objectStoreNames.contains(STORE_ATUR)) {
          d.createObjectStore(STORE_ATUR, { keyPath: "nama" });
        }
      };

      permintaan.onsuccess = (e) => {
        db = e.target.result;
        selesai(db);
      };

      permintaan.onerror = () => gagal(permintaan.error);
    });
  }

  // ---------- Ambil semua lokasi ----------
  function ambilSemua() {
    return buka().then(
      (d) =>
        new Promise((selesai, gagal) => {
          const tx = d.transaction(STORE, "readonly");
          const req = tx.objectStore(STORE).getAll();
          req.onsuccess = () => selesai(req.result || []);
          req.onerror = () => gagal(req.error);
        })
    );
  }

  // ---------- Simpan (tambah / ubah) ----------
  function simpan(lokasi) {
    return buka().then(
      (d) =>
        new Promise((selesai, gagal) => {
          const tx = d.transaction(STORE, "readwrite");
          const req = tx.objectStore(STORE).put(lokasi);
          req.onsuccess = () => selesai(lokasi);
          req.onerror = () => gagal(req.error);
        })
    );
  }

  // ---------- Hapus ----------
  function hapus(id) {
    return buka().then(
      (d) =>
        new Promise((selesai, gagal) => {
          const tx = d.transaction(STORE, "readwrite");
          const req = tx.objectStore(STORE).delete(id);
          req.onsuccess = () => selesai(true);
          req.onerror = () => gagal(req.error);
        })
    );
  }

  // ---------- Hitung jumlah ----------
  function hitung() {
    return buka().then(
      (d) =>
        new Promise((selesai, gagal) => {
          const tx = d.transaction(STORE, "readonly");
          const req = tx.objectStore(STORE).count();
          req.onsuccess = () => selesai(req.result);
          req.onerror = () => gagal(req.error);
        })
    );
  }

  // ---------- Isi awal (kalau masih kosong) ----------
  function isiAwalJikaKosong() {
    return hitung().then((n) => {
      if (n > 0) return n;
      const daftar = typeof CONTOH_LOKASI !== "undefined" ? CONTOH_LOKASI : [];
      return Promise.all(daftar.map(simpan)).then(() => daftar.length);
    });
  }

  // ---------- Pengaturan (daftar kategori) ----------
  function ambilPengaturan(nama) {
    return buka().then(
      (d) =>
        new Promise((selesai, gagal) => {
          const tx = d.transaction(STORE_ATUR, "readonly");
          const req = tx.objectStore(STORE_ATUR).get(nama);
          req.onsuccess = () => selesai(req.result ? req.result.nilai : null);
          req.onerror = () => gagal(req.error);
        })
    );
  }

  function simpanPengaturan(nama, nilai) {
    return buka().then(
      (d) =>
        new Promise((selesai, gagal) => {
          const tx = d.transaction(STORE_ATUR, "readwrite");
          const req = tx.objectStore(STORE_ATUR).put({ nama: nama, nilai: nilai });
          req.onsuccess = () => selesai(nilai);
          req.onerror = () => gagal(req.error);
        })
    );
  }

  // ---------- Buat id baru ----------
  function idBaru() {
    return "L" + Date.now().toString(36) + Math.floor(Math.random() * 1000);
  }

  return {
    buka,
    ambilSemua,
    simpan,
    hapus,
    hitung,
    isiAwalJikaKosong,
    ambilPengaturan,
    simpanPengaturan,
    idBaru
  };
})();
