# 📖 rencanakerja.md — PAPAN ORDER PROYEK **PETA INDONESIA**

> Dibuat: 30 September 2026 · Lokasi: `C:\data\Peta Indonesia`
> 🔴 **Aturan papan ini ada di `agents.md` bagian I.** Baca sana dulu.

---

## 0. 📋 PAPAN ORDER

### A. KASUS BELUM SELESAI

| Kode | Kasus | Butir | Status | Tgl |
|------|-------|-------|--------|-----|
| **K01** | **Data wilayah Indonesia lengkap** | | | |
| K01 | a. Cari sumber data lengkap & tepercaya (38 prov → 514 kab/kota → 7.285 kec → 83.762 desa/kelurahan) | ⬜ | ⬜ | — |
| K01 | b. Ambil & verifikasi data **38 provinsi** | ⬜ | ⬜ | — |
| K01 | c. Turunkan ke **kabupaten & kota** | ⬜ | ⬜ | — |
| K01 | d. Turunkan ke **kecamatan** | ⬜ | ⬜ | — |
| K01 | e. Turunkan ke **desa & kelurahan** | ⬜ | ⬜ | — |
| K01 | f. Simpan sebagai data proyek (format & struktur) | ⬜ | ⬜ | — |
| **K02** | **Antarmuka (UI) peta seperti acuan CHNGMKR** | | | |
| K02 | a. Tentukan peta dasar → **OFFLINE** (keputusan Bapak, 2 Okt 2026) | ✅ | ✅ | 2 Okt 2026 |
| K02 | b. Kerangka UI: peta layar penuh + panel | ✅ | ✅ | 2 Okt 2026 |
| K02 | c. Penanda (marker) lokasi di peta | ✅ | ✅ | 2 Okt 2026 |
| K02 | d. Kotak pencarian wilayah | ✅ | ✅ | 2 Okt 2026 |
| K02 | e. Panel rincian saat marker diklik | ✅ | ✅ | 2 Okt 2026 |
| K02 | f. Filter kategori | ✅ | ✅ | 2 Okt 2026 |
| K02 | h. Peta batas provinsi **asli** (offline, dari GeoJSON) | ✅ | ✅ | 2 Okt 2026 |
| K02 | i. ⚠️ Data peta sumber hanya **34 provinsi** (4 provinsi baru Papua belum ada) — perlu sumber lebih baru | ✅ | ✅ | 2 Okt 2026 |
| K02 | j. **Negara tetangga tampil** sebagai latar (tanpa kota) | ✅ | ✅ | 2 Okt 2026 |
| K02 | k. **Lengkapi 38 provinsi** dengan data lebih baru | ✅ | ✅ | 2 Okt 2026 |
| K02 | l. **Zoom in/out** peta (roda mouse, tombol, geser) | ⬜ | ⬜ | — |
| K02 | m. **Nama kota** tampil sesuai zoom (zoom out = kota besar, zoom in = kota kecil) | ⬜ | ⬜ | — |
| K02 | g. Tempat isian data client per lokasi | ⬜ | ⬜ | — |
| **K03** | **Penyimpanan data di Layerbase cloud** (keputusan Bapak, 2 Okt 2026) | | | |
| K03 | a. ⚠️ **Ubah aturan F3** — aplikasi kini butuh internet (keputusan Bapak) | ✅ | ✅ | 2 Okt 2026 |
| K03 | b. ⚠️ **Ubah cara buka di HP** — tidak bisa lagi dari My Files (`file://`) | ✅ | ✅ | 2 Okt 2026 |
| K03 | f. **Hosting GitHub Pages** — aplikasi online di `suwandhih.github.io/DataPeta` | ✅ | ✅ | 2 Okt 2026 |
| K03 | c. Buat database SQLite di Layerbase (paket Free, 5 GB) | ⬜ | ⬜ | — |
| K03 | d. ⚠️ **Masalah keamanan:** kunci API Layerbase akan terlihat di halaman publik GitHub Pages → data bisa dicuri/dihapus orang. **Perlu perantara (proxy)** atau ganti cara. | ⚠️ | ⚠️ | 2 Okt 2026 |
| K03 | g. **Ide Bapak: IndexedDB utama + Layerbase titipan (semi-online)** — ✅ **DIPERBOLEHKAN** (pemakaian database biasa, bukan proxy/reselling). Batas Free: 10 GB/24j, 5 GB simpan, harus tidur ≥25% — semua cukup. | ✅ | ✅ | 2 Okt 2026 |
| K03 | h. **Perantara Cloudflare Worker** (sembunyikan kunci API) — perlu akun gratis | ⬜ | ⬜ | — |
| K03 | i. **IndexedDB** — penyimpanan data lokal (dikerjakan dulu, keputusan Bapak) | ✅ | ✅ | 2 Okt 2026 |
| K03 | j. Form isian data client (tambah/ubah/hapus lokasi) — K02 g | ✅ | ✅ | 2 Okt 2026 |
| K03 | e. Sambungkan aplikasi ke database cloud (cara aman) | ⬜ | ⬜ | — |
| K03 | f. Uji di PC & HP | ⬜ | ⬜ | — |

### B. ANTREAN KERJA
_(kosong — belum ada order yang disetujui)_

### C. IDE

| Ide | Tanda | Catatan |
|-----|-------|---------|
| Peta wilayah Indonesia interaktif (klik provinsi → kab → kec → desa) | 🟡 perlu diperdalam | menunggu data K01 |
| Data proyek yayasan (diisi manual Bapak di tiap titik peta) | 🟡 perlu diperdalam | lihat aturan F4 |
| **Akses di HP lewat My Files (folder Download)** | ⚠️ bermasalah | **Tidak bisa** dipakai bersama Layerbase — `file://` diblokir hubungi cloud (CORS). Cara buka di HP harus berubah. |
| **Fitur Ekspor/Impor data** (pindah data PC↔HP) | ⏸️ ditahan | tidak perlu kalau pakai cloud (data sudah sama otomatis) |

### D. SELESAI

| Kode | Keterangan | Tgl |
|------|------------|-----|
| — | Inisialisasi proyek: backup 5 dokumen salinan ANodes, kosongkan, buat `agents.md` | 30 Sep 2026 |

---

## 📌 CATATAN
- Order baru dari Bapak → dicatat dulu di tabel **A** atau **B** dengan tanda ⬜, **baru dikerjakan**.
