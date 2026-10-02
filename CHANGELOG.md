# 📋 CHANGELOG.md — **PETA INDONESIA**

> Rekam **semua kejadian** di aplikasi: apa yang berubah, kapan, dan kenapa.
> Ini untuk **Bapak** — supaya tahu riwayat aplikasi tanpa perlu technical.

---

## 2 Oktober 2026 — 🌏 38 PROVINSI + NEGARA TETANGGA

**Peta dilengkapi: 38 provinsi (data baru) + negara tetangga sebagai latar.**

- Data peta diganti dengan **38 provinsi** dari **Badan Informasi Geospasial (BIG)**
  via `github.com/ardian28/GeoJson-Indonesia-38-Provinsi`.
  → 4 provinsi baru Papua kini ada: Papua Tengah, Papua Selatan, Papua Pegunungan, Papua Barat Daya.
- Ditambah **negara tetangga** sebagai latar (data Natural Earth, 177 negara) —
  hanya bentuk daratan, **tanpa kota**, warna lebih terang dari Indonesia.
- Kontras diperjelas: Indonesia lebih gelap, tetangga lebih terang.
- Berkas sumber `.geojson` dihapus setelah diubah ke `.js` (tidak ada sampah).
- Uji: 38 provinsi tergambar · 177 negara latar · klik "Papua Tengah" → panel benar.

---

## 2 Oktober 2026 — 🗺️ PETA INDONESIA ASLI (bukan gambar kasar lagi)

**Peta sekarang memakai data batas provinsi asli** — bentuk kepulauan Indonesia sungguhan.

- Diunduh data batas provinsi (GeoJSON) dari `github.com/superpikar/indonesia-geojson` → disimpan lokal.
- Data diubah ke `data/peta-indonesia.js` agar bisa dibuka **offline** dari berkas (file://).
- `js/app.js` ditulis ulang: menggambar peta dari data asli + proyeksi koordinat.
- Penanda lokasi kini memakai **koordinat asli** (bujur/lintang), bukan posisi persen.
- Provinsi di peta **bisa diklik** → muncul panel nama provinsi.
- Uji: 34 provinsi tergambar · 8 penanda · klik penanda → panel lokasi · klik provinsi → panel provinsi.
- ⚠️ **Keterbatasan:** sumber data ini hanya memuat **34 provinsi** (data lama).
  4 provinsi baru di Papua (Papua Selatan, Papua Tengah, Papua Pegunungan, Papua Barat Daya)
  **belum ada** — perlu sumber yang lebih baru.

---

## 2 Oktober 2026 — 🗺️ TAHAP 1: KERANGKA ANTARMUKA (UI)

**Antarmuka peta pertama dibuat** — gaya bersih & minimalis seperti acuan CHNGMKR.

- Dibuat `index.html` — peta layar penuh + kotak pencarian + tombol menu + bar kategori + panel rincian.
- Dibuat `css/style.css` — gaya tampilan (putih-hitam, minimalis).
- Dibuat `js/app.js` — logika: klik penanda, filter kategori, pencarian, buka/tutup panel & menu.
- Dibuat `data/contoh-lokasi.js` — **8 data contoh** (bukan data asli) untuk menguji tampilan.
- Peta masih **gambar sementara** (bentuk kasar) — batas wilayah asli menyusul dari K01.
- ✅ **Offline** — bisa dibuka langsung dari berkas, tanpa internet (aturan F3).
- Uji: 8 penanda tampil · filter Sekolah=2, Kesehatan=2 · pencarian "klinik"=1 · panel & menu buka-tutup normal.
- ⚠️ Belum ada: form isian data client (K02 g) & data wilayah asli (K01).

---

## 30 September 2026 — 🏁 INISIALISASI PROYEK

**Dasar (fondasi) proyek dibuat dari nol.**

- Folder `C:\data\Peta Indonesia` disiapkan.
- Backup 5 dokumen salinan lama → `backups\salinan-anodes-20260930-121306`.
- 5 dokumen emptied (isi lama dibuang), lalu diisi sesuai aturan Peta Indonesia.
- Dibuat `agents.md` = **aturan main AI** (versi 1).
- Dibuat `rencanakerja.md` = **papan order**; kasus pertama: **K01 Data wilayah Indonesia lengkap**.
- Dibuat `prompt.md` = **konsep proyek** (bisa dibangun ulang tanpa AI).
- Dibuat `panduan.md` & `catatanAI.md`.
- ⚠️ **Belum ada aplikasi.** Yang ada sekarang baru **dokumen dasar**.

---
