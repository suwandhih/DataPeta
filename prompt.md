# 🧩 prompt.md — KONSEP PROYEK **PETA INDONESIA**

> Berkas ini = **konsep**. Tujuannya supaya proyek ini **bisa dilanjutkan ATAU dibangun
> ulang 100%** — oleh Bapak sendiri (tanpa AI) atau AI lain.
> 🔴 **Aturan kerja AI ada di `agents.md`** — bukan di sini. Ini murni **konsep & rancangan**.

---

## 0. KONSEP INTI (baca dulu)

### 0.1 Apa itu Peta Indonesia

Aplikasi **peta wilayah Indonesia** + **data informasi**. Melihat Indonesia secara visual,
mencari nama wilayah, lalu **menekan klik** untuk membuka rincian tiap wilayah.

Tiga hal yang jadi inti:

| # | Inti | Artinya |
|---|------|---------|
| 1 | **Peta** | Indonesia bisa dilihat & diklik — bukan daftar teks saja |
| 2 | **Data informasi** | Tiap wilayah punya nama, jumlah, dan keterangan |
| 3 | **Data milik Bapak** | Ada bagian yang **Bapak isi sendiri** (proyek yayasan) — tidak hilang |

### 0.2 Batasan yang TIDAK BOLEH dilanggar

1. **Harus jalan di PC (70%) dan HP Android (30%)** — dua-duanya.
2. **Tidak boleh bergantung pada server** — harus bisa dibuka langsung dari berkas
   (offline, tanpa internet).
3. **Nama proyek persis: "Peta Indonesia".** UI = peta + data informasi.
4. **Data TIDAK boleh dikarang** — harus dari sumber yang dipercaya.

---

## 1. DATA YANG DIPERLUKAN

Target jumlah wilayah (angka acuan, untuk **memeriksa kelengkapan** — bukan untuk dikarang):

| Tingkat | Jumlah |
|---------|--------|
| Provinsi | 38 |
| Kabupaten | 416 |
| Kota | 98 |
| Kecamatan | 7.285 |
| Desa | 75.266 |
| Kelurahan | 8.496 |

⚠️ Angka-angka ini **acuan kelengkapan**, ❌ **bukan sumber data**. Isi datanya
harus diambil dari sumber eksternal yang dipercaya.

---

## 2. ARSITEKTUR (konsep, bukan final)

```
Peta Indonesia
├── Peta        → bisa zoom & klik wilayah
├── Panel kiri  → daftar/pencari nama wilayah
├── Panel kanan → rincian wilayah terpilih
└── Panel bawah → form isian data yang diisi manual Bapak
```

---

## 3. KEPUTUSAN & STRUKTUR BERKAS

### 3.1 Keputusan (2 Okt 2026)

- **Peta dasar = OFFLINE** (keputusan Bapak). Tidak pakai Google Maps.
- **Teknologi = HTML + CSS + JavaScript murni** — tanpa server.
- **Gaya UI** = bersih & minimalis, terinspirasi acuan `chngmkr.com/map`.
- **Penyimpanan data = Layerbase cloud** (keputusan Bapak) ⇒ aplikasi **butuh internet**.
- **Hosting = GitHub Pages** ⇒ **https://suwandhih.github.io/DataPeta/**
- **Peta & data peta tetap lokal** (offline); hanya **data isian** yang di cloud.

### 3.2 Struktur berkas aplikasi

```
DataPeta/
├── index.html                 → halaman utama (peta + panel + form)
├── css/style.css              → gaya tampilan
├── js/app.js                  → logika antarmuka
├── js/penyimpanan.js          → penyimpanan IndexedDB (data lokal)
├── data/peta-indonesia.js     → batas 38 provinsi (GeoJSON, offline)
├── data/negara-dunia.js       → batas negara dunia (latar tetangga)
├── data/kota-indonesia.js     → nama kota Indonesia (untuk zoom)
├── data/contoh-lokasi.js      → data contoh (isi awal)
└── (5 dokumen .md)
```

**Sumber peta:**
- 38 provinsi → **BIG** via `github.com/ardian28/GeoJson-Indonesia-38-Provinsi`
- Negara dunia → **Natural Earth** (public domain)

### 3.3 Cara menambah lokasi (sementara)

Buka `data/contoh-lokasi.js`, salin satu blok `{ ... }`, ubah isinya:
`nama` · `wilayah` · `kategori` · `x`/`y` (posisi %) · `inisial` · `rincian`.

---

## 4. BELUM DITENTUKAN

_(masih dibahas — diisi bersama)_

- Bentuk/garis batas wilayah asli (SVG? GeoJSON? gambar?)
- Sumber data wilayah (BPS? Kemendagri? GitHub?)
- Cara menyimpan data isian Bapak (agar tidak hilang)
- Rincian lain
