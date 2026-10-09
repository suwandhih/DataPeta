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
2. **Peta & data peta tetap LOKAL (offline)** — citra satelit & batas wilayah disimpan
   di dalam proyek, tidak diambil dari internet saat dipakai.
   ⚠️ **Diubah 2 Okt 2026 (keputusan Bapak):** aplikasi **memakai database cloud
   (Layerbase)** ⇒ **butuh internet untuk data isian**. Dibuka lewat **alamat web
   (GitHub Pages)**, ❌ bukan dari berkas (`file://`). Yang tetap offline: **peta &
   data peta**. Yang di cloud: **data isian Bapak**.
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

### 3.1b Keputusan (6 Okt 2026) — **latar peta = CITRA SATELIT**

- **Latar peta diganti citra satelit** supaya isi bumi terlihat realistis (keputusan Bapak).
- **Tetap OFFLINE:** citra diunduh **sekali** lewat `alat/unduh-citra-satelit.py`,
  disimpan jadi **`data/citra-satelit.jpg`** (8192 × 3277 px · 1,95 MB).
  Aplikasi **tidak** memanggil internet untuk menampilkan peta.
- **Sumber citra: Esri World Imagery** — gratis, **tanpa kunci API**.
  Tulisan sumber wajib tampil di peta: *"Citra: Esri, Maxar, Earthstar Geographics"*.
- **Tampilan lain tidak diubah** — tata letak, tombol, panel, dan alur kerja tetap sama.
  Yang berubah hanya latar peta + warna garis/tulisan agar terbaca di atas citra gelap.
- **Cara kerja pengunduh (penting, jangan diubah tanpa paham):**
  1. Ubin citra diunduh dalam bentuk **Mercator** (EPSG:3857) — makin ke kutub makin melar.
  2. Peta aplikasi memakai **equirectangular** (lintang digambar lurus) — lihat `js/app.js`.
  3. Karena itu citra harus **diratakan** (Mercator → equirectangular) sebelum dipakai.
     Tanpa langkah ini, garis provinsi akan meleset dari citra.
  4. Bidang peta = **1000 × 400** (rasio 2,5). Citra akhir **dipaksa** rasionya 2,5 juga,
     supaya tidak diregangkan oleh `preserveAspectRatio="none"`.
  5. Pengunduh punya **pengaman**: kalau baris awal perataan salah, skrip **berhenti
     dengan pesan jelas** — tidak diam-diam menghasilkan citra rusak.
- **Cara memeriksa hasilnya:** jalankan `python alat/unduh-citra-satelit.py`, lalu lihat
  ukuran berkas. Citra yang benar ≈ **1,95 MB**. Kalau jauh lebih kecil (mis. 0,85 MB),
  berarti citra rusak/tidak tajam — jangan dipakai.

### 3.2 Struktur berkas aplikasi

```
DataPeta/
├── index.html                 → halaman utama (peta + panel + form)
├── css/style.css              → gaya tampilan
├── js/app.js                  → logika antarmuka
├── js/penyimpanan.js          → penyimpanan IndexedDB (data lokal)
├── js/awan.js                 → sambungan awan (Cloudflare Worker)
├── cloudflare/worker.js       → kode Worker (perantara aman)
├── cloudflare/wrangler.toml   → konfigurasi Worker
├── data/peta-indonesia.js     → batas 38 provinsi (GeoJSON, offline)
├── data/citra-satelit.jpg     → latar peta: citra satelit (offline, 8192×3277)
├── data/negara-dunia.js       → batas negara dunia (latar tetangga)
├── data/sungai.js             → sungai Indonesia
├── data/danau.js              → danau Indonesia
├── data/gunung.js             → gunung Indonesia (nama + tinggi)
├── data/kota-indonesia.js     → nama kota Indonesia (untuk zoom)
├── data/ibu-kota.js           → 38 ibu kota provinsi (nama + koordinat) — tampil permanen ⭐
├── data/pulau.js              → nama pulau Indonesia
├── data/suku.js               → suku bangsa (BPS 2010)
├── data/penduduk.js           → jumlah penduduk 38 provinsi + 514 kab/kota (BPS 2026)
├── data/agama.js              → agama per kab/kota (BPS provinsi; 9 provinsi)
├── data/contoh-lokasi.js      → data contoh (isi awal)
├── alat/unduh-citra-satelit.py → pengunduh citra satelit (dijalankan sekali saja)
├── alat/buat-penduduk.js      → pembuat data/penduduk.js dari angka BPS
├── alat/bps-penduduk-2026.json → angka mentah BPS (apa adanya)
├── alat/buat-agama.js         → pembuat data/agama.js dari angka BPS provinsi
├── alat/bps-agama-mentah.txt  → angka mentah agama BPS provinsi (apa adanya)
└── (5 dokumen .md)
```

**Alur data:** `IndexedDB (utama)` → `Cloudflare Worker (penjaga kunci)` → `Layerbase (titipan)`

- **Cloudflare Worker:** `https://peta-api.suwandhih.workers.dev`
- **Rahasia Worker:** `LAYERBASE_KEY` (secret), `LAYERBASE_HOST`, `DB_ID`
- **Deploy Worker:** `cd cloudflare; npx wrangler deploy`

**Sumber peta:**
- 38 provinsi → **BIG** via `github.com/ardian28/GeoJson-Indonesia-38-Provinsi`
- Negara dunia → **Natural Earth** (public domain)
- **Latar citra satelit → Esri World Imagery** (gratis, tanpa kunci API) — diunduh sekali
  lewat `alat/unduh-citra-satelit.py`, disimpan sebagai `data/citra-satelit.jpg`
- **Nama kota → Natural Earth** (public domain) — `data/kota-indonesia.js`
- **38 ibu kota provinsi → Wikipedia bahasa Indonesia** — artikel *"Daftar ibu kota
  provinsi di Indonesia"* (tabel + peta lokasi artikel) dan artikel tiap ibu kota.
  Disimpan sebagai `data/ibu-kota.js`. Tampil **permanen** di peta (⭐ + nama).
- **Jumlah penduduk 38 provinsi & 514 kabupaten/kota → BPS** (tabel resmi 2026) —
  disimpan sebagai `data/penduduk.js`, dibuat lewat `alat/buat-penduduk.js`
- **Agama per kabupaten/kota → BPS PROVINSI** (BPS Pusat tidak menerbitkannya).
  Sudah **9 provinsi** (166 dari 514 kabupaten/kota): DKI Jakarta (2024),
  Sumatera Utara (2025), Sulawesi Utara (2018), Sulawesi Tenggara (2022),
  Kalimantan Utara (2021 — persen), Jawa Barat (2023), Jawa Tengah (2023 — persen),
  Jambi (2022), Sumatera Selatan (2022).
  Disimpan sebagai `data/agama.js`, dibuat lewat `alat/buat-agama.js`.
  Provinsi lain **belum menerbitkan** — tidak dikarang (aturan F8).
  **Tampil di dua tempat:** (1) form isian saat wilayah dipilih (kab/kota),
  (2) panel provinsi saat provinsi diklik di peta — dijumlahkan dari kab/kotanya.
  Provinsi bersatuan **persen** (Jawa Tengah, Kalimantan Utara) ditampilkan
  sebagai **rata-rata**, bukan dijumlahkan.

  **🔍 Hasil pemindaian sumber (9 Okt 2026) — jalur pusat sudah HABIS:**
  - BPS Pusat `subject=519&keyword=agama` → **"No results"** (tidak ada tabel agama)
  - BPS Pusat publikasi `keyword=agama` → hanya **1**: *"Kewarganegaraan, Suku Bangsa,
    Agama dan Bahasa Sehari-hari Penduduk Indonesia"* (23 Mei 2012, data **SP2010**) —
    **provinsi saja**, bukan kab/kota
  - Dukcapil Kemendagri (12 tabel *Data Kependudukan*) → **tidak ada kolom agama**
  - **28 provinsi BPS** (Aceh s/d Papua Barat) → **"No results"**
  - **Kalimantan Timur** → tabel *"Jumlah Penduduk Menurut Agama"* **ADA** di daftar
    (diperbarui 25 Feb 2025), tapi halamannya **404 "Tabel Tidak Tersedia"** (rusak di
    sisi BPS). Wayback Machine belum mengarsipkannya.
  - 5 provinsi **tanpa subdomain BPS**: Papua Selatan · Papua Barat Daya · Papua Tengah ·
    Papua Pegunungan (+ `diy` harus pakai `yogyakarta`)

  **Jalur berikutnya (belum dicoba):** publikasi **"Provinsi Dalam Angka"** (PDF tahunan
  tiap BPS provinsi) — biasanya memuat tabel agama per kab/kota. Mulai dari **Kalimantan Timur**.

  **Cara mengakses BPS (penting):** `Invoke-WebRequest`/`web_fetch` ke `bps.go.id` →
  **403 Forbidden** (Cloudflare). Harus lewat peramban. Situs BPS membatasi permintaan
  beruntun → jeda **9 detik** setelah muat + **3,5 detik** antarprovinsi; kalau terlalu
  cepat semua provinsi tampak "No results" (palsu). URL benar:
  `https://{sub}.bps.go.id/id/statistics-table?subject=519&keyword=agama` (tanpa `subject` → 404).

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
