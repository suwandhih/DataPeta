# 📖 rencanakerja.md — PAPAN ORDER PROYEK **PETA INDONESIA**

> Dibuat: 30 September 2026 · Lokasi: `C:\data\DataPeta`
> 🔴 **Aturan papan ini ada di `agents.md` bagian I.** Baca sana dulu.

---

## 0. 📋 PAPAN ORDER

### A. KASUS BELUM SELESAI

| Kode | Kasus | Butir | Status | Tgl |
|------|-------|-------|--------|-----|
| **K05** | **Kelengkapan peta** (order Bapak, 2 Okt 2026) — ✅ **DIUTAMAKAN** | | | |
| K05 | a. Zoom in / zoom out — ✅ sudah ada (verifikasi) | ✅ | ✅ | 2 Okt 2026 |
| K05 | b. **Sungai, danau, gunung** di peta (agar mudah dibaca) | ✅ | ✅ | 2 Okt 2026 |
| K05 | b1. 🐛 Bapak: *"5b tidak tampil"* → **dinilai**: lapisan air tertutup warna provinsi → urutan lapisan diperbaiki | ✅ | ✅ | 2 Okt 2026 |
| K05 | c. **Muara** (kuala) di peta | ⬜ | ⬜ | — |
| K05 | d. **Bendungan / waduk** di peta | ⬜ | ⬜ | — |
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
| K02 | l. **Zoom in/out** peta (roda mouse, tombol, geser, cubit dua jari) | ✅ | ✅ | 2 Okt 2026 |
| K02 | m. **Nama kota** tampil sesuai zoom (zoom out = kota besar, zoom in = kota kecil) | ✅ | ✅ | 2 Okt 2026 |
| K02 | g. Tempat isian data client per lokasi | ⬜ | ⬜ | — |
| **K03** | **Penyimpanan data di Layerbase cloud** (keputusan Bapak, 2 Okt 2026) | | | |
| K03 | a. ⚠️ **Ubah aturan F3** — aplikasi kini butuh internet (keputusan Bapak) | ✅ | ✅ | 2 Okt 2026 |
| K03 | b. ⚠️ **Ubah cara buka di HP** — tidak bisa lagi dari My Files (`file://`) | ✅ | ✅ | 2 Okt 2026 |
| K03 | f. **Hosting GitHub Pages** — aplikasi online di `suwandhih.github.io/DataPeta` | ✅ | ✅ | 2 Okt 2026 |
| K03 | c. Buat database SQLite di Layerbase (paket Free, 5 GB) | ⬜ | ⬜ | — |
| K03 | d. ⚠️ **Masalah keamanan:** kunci API Layerbase akan terlihat di halaman publik GitHub Pages → data bisa dicuri/dihapus orang. **Perlu perantara (proxy)** atau ganti cara. | ⚠️ | ⚠️ | 2 Okt 2026 |
| K03 | g. **Ide Bapak: IndexedDB utama + Layerbase titipan (semi-online)** — ✅ **DIPERBOLEHKAN** (pemakaian database biasa, bukan proxy/reselling). Batas Free: 10 GB/24j, 5 GB simpan, harus tidur ≥25% — semua cukup. | ✅ | ✅ | 2 Okt 2026 |
| K03 | h. **Perantara Cloudflare Worker** (sembunyikan kunci API) — pakai akun Bapak | ✅ | ✅ | 2 Okt 2026 |
| K03 | h1. Buat database SQLite Layerbase `peta-indonesia` (Free) | ✅ | ✅ | 2 Okt 2026 |
| K03 | h1b. API host `sage.cloud.layerbase.dev` · DB ID `156a6d1e-...` · API key dibuat | ✅ | ✅ | 2 Okt 2026 |
| K03 | h1c. Tabel `lokasi` dibuat di database | ✅ | ✅ | 2 Okt 2026 |
| K03 | h1d. ⚠️ **Uji CORS: peramban DIBLOKIR** memanggil Layerbase langsung → **Cloudflare Worker WAJIB** | ✅ | ✅ | 2 Okt 2026 |
| K03 | h2. Akun Cloudflare (Bapak sudah punya) | ✅ | ✅ | 2 Okt 2026 |
| K03 | h3. AI buat Cloudflare Worker `peta-api` (perantara) | ✅ | ✅ | 2 Okt 2026 |
| K03 | h4. Sambungkan aplikasi ke Worker (tombol Kirim/Ambil) | ✅ | ✅ | 2 Okt 2026 |
| K03 | h5. Uji: kirim 8/8 · hapus lokal → tarik 8 kembali · **tanpa duplikat** | ✅ | ✅ | 2 Okt 2026 |
| K03 | f. Uji di HP (oleh Bapak) | ⬜ | ⬜ | — |
| K03 | i. **IndexedDB** — penyimpanan data lokal (dikerjakan dulu, keputusan Bapak) | ✅ | ✅ | 2 Okt 2026 |
| K03 | j. Form isian data client (tambah/ubah/hapus lokasi) — K02 g | ✅ | ✅ | 2 Okt 2026 |
| K03 | e. Sambungkan aplikasi ke database cloud (cara aman) | ✅ | ✅ | 2 Okt 2026 |
| K03 | f. Uji di PC & HP | ⬜ | ⬜ | — |

| **K04** | **Nama kota utama + daftar wilayah** (order Bapak, 2 Okt 2026) | | | |
| K04 | a. **38 ibu kota provinsi** tampil permanen di peta | ⬜ | ⬜ | — |
| K04 | b. Panel **daftar wilayah lain** di dalam menu ☰ (kab/kota/kec/desa/kelurahan) — **dikerjakan sebagai K08 c** | ✅ | ✅ | 2 Okt 2026 |
| K04 | c. Klik wilayah di daftar → **form isian data** — **dikerjakan sebagai K08 d** | ✅ | ✅ | 2 Okt 2026 |
| K04 | d. Unduh **data wilayah asli** (BPS/BIG) — **dikerjakan sebagai K08 e** | ✅ | ✅ | 2 Okt 2026 |
| **K07** | **Kepulauan Seribu tidak tampak** (temuan Bapak, 2 Okt 2026) | | | |
| K07 | a. Periksa sebab — **dinilai**: data batas DKI Jakarta hanya daratan; Natural Earth tidak memuat Kepulauan Seribu | ✅ | ✅ | 2 Okt 2026 |
| K07 | b. Cari sumber data lain → **geoBoundaries** (data asli BPS) | ✅ | ✅ | 2 Okt 2026 |
| K07 | c. Gambar batas Kepulauan Seribu di peta + nama permanen | ✅ | ✅ | 2 Okt 2026 |
| K07 | d. 🐛 Bapak: *"belum terlihat pulau 1000"* → **dinilai**: 72 pulau hanya 0,1–3,7 km (< 1 piksel) | ✅ | ✅ | 2 Okt 2026 |
| K07 | e. 🐛 Bapak: *"bulat2 hijau dihilangkan .. tidak bisa liat pulaunya"* → titik hijau **dihapus**, diganti **bentuk asli pulau** | ✅ | ✅ | 2 Okt 2026 |
| K07 | f. 🎨 Bapak: *"diberi warna hijau .. sangat tidak seimbang .. jadi jelek"* → garis hijau **dihapus**, warna disamakan dengan provinsi lain | ✅ | ✅ | 2 Okt 2026 |
| **K08** | **Daftar wilayah + form panel samping** (order Bapak, 2 Okt 2026) | | | |
| K08 | a. Pelajari proyek acuan `Peta-Indonesia-1berkas.html` | ✅ | ✅ | 2 Okt 2026 |
| K08 | b. **Form [+ Tambah Lokasi] jadi panel samping** (seperti menu ☰) — peta tetap terlihat | ✅ | ✅ | 2 Okt 2026 |
| K08 | c. **Daftar wilayah** (provinsi → kab/kota → kecamatan → desa) di menu ☰ | ✅ | ✅ | 2 Okt 2026 |
| K08 | d. Klik wilayah di daftar → **peta geser + perbesar** ke wilayah itu + form terbuka | ✅ | ✅ | 2 Okt 2026 |
| K08 | e. Unduh **data wilayah lengkap sampai desa** — 38 prov · 514 kab/kota · 7.285 kec · 83.762 desa (sumber Kepmendagri 2025 + BIG) | ✅ | ✅ | 2 Okt 2026 |
| K08 | f. Form isian: bujur/lintang/inisial diganti yang lebih jelas (nanti) | ⏸️ | ⏸️ | — |
| **K15** | **Tata letak tombol beku + bar kategori di luar peta** (order Bapak, 4 Okt 2026) — permintaan: *"tata letak tombol zoom in [+] out [-] dan [⟲] menutupi peta .. usul: [cari lokasi di peta ...] tombol [+][-][⟲] [☰ Member] [☰] dalam satu baris di atas tapi di freeze pada saat zoom/move cursor menu tidak bergeser .. untuk tampilan bawah: semua/yayasan/sekolah... tempatkan baris dibawah peta di freeze .. berlaku untuk PC dan HP"* | | | |
| K15 | a. **Bar atas baru** — satu baris: `[cari lokasi di peta…] [+] [−] [⟲] [☰ Member] [☰]` | ✅ | ✅ | 4 Okt 2026 |
| K15 | b. Tombol **[+] [−] [⟲]** dipindah dari tengah peta → masuk bar atas (yang lama dihapus) | ✅ | ✅ | 4 Okt 2026 |
| K15 | c. **Bar kategori** (Semua/Yayasan/Sekolah…) dipindah ke baris bawah di luar peta → **peta tidak tertutup** | ✅ | ✅ | 4 Okt 2026 |
| K15 | d. Kedua bar **beku (freeze)** — tidak bergeser saat peta di-zoom/digeser | ✅ | ✅ | 4 Okt 2026 |
| K15 | e. Penyesuaian **HP**: muat satu baris di layar kecil (teks "Member" jadi ikon ☰ saja) | ✅ | ✅ | 4 Okt 2026 |
| K15 | f. Uji PC + HP (oleh AI) — 15 uji, 0 gagal | ✅ | ✅ | 4 Okt 2026 |
| K15 | g. **Uji di HP (oleh Bapak)** — *"sudah ok sementara sudah bisa tes di hp luas pandang lebih baik"* | ✅ | ✅ | 4 Okt 2026 |

| **K16** | **Suku bangsa di peta + tombol [suku] hide/un** (order Bapak, 4 Okt 2026) — *"di proses"* | | | |
| K16 | a. Buat `data/suku.js` dari **tabel resmi BPS 2010** (28 suku: nama · jumlah penduduk · kawasan utama) | ✅ | ✅ | 4 Okt 2026 |
| K16 | b. Tombol **[suku]** di bar atas (setelah ☰ Member) + **hide/un 3 tingkat**: Sembunyi → Sedang → Penuh | ✅ | ✅ | 4 Okt 2026 |
| K16 | c. Titik suku di **ibu kota provinsi asal** + **tanda "perkiraan"** (label, tooltip, keterangan) | ✅ | ✅ | 4 Okt 2026 |
| K16 | d. Uji PC + HP (oleh AI) — 5 uji tampilan × 7 ukuran + 8 uji fungsi, **0 gagal** | ✅ | ✅ | 4 Okt 2026 |
| K16 | e. **Uji di HP (oleh Bapak)** | ⬜ | ⬜ | — |

| **K18** | **Jumlah penduduk 38 provinsi** (order Bapak, 9 Okt 2026) — tahap **a** dari rencana data penduduk & agama | | | |
| K18 | a. Cari sumber resmi jumlah penduduk 38 provinsi → **BPS** (tabel resmi 2026) | ✅ | ✅ | 9 Okt 2026 |
| K18 | b. Ambil & verifikasi data — jumlah 38 provinsi **persis sama** dengan angka BPS (selisih 0) | ✅ | ✅ | 9 Okt 2026 |
| K18 | c. Simpan sebagai data proyek (`data/penduduk.js` + `alat/buat-penduduk.js`) | ✅ | ✅ | 9 Okt 2026 |
| K18 | d. Tampilkan di panel rincian saat provinsi diklik | ✅ | ✅ | 9 Okt 2026 |
| K18 | e. Uji PC + HP (oleh AI) — 10 uji, 0 gagal | ✅ | ✅ | 9 Okt 2026 |
| K18 | f. Uji di HP (oleh Bapak) | ⬜ | ⬜ | — |

| **K19** | **Garis batas provinsi jadi merah saat diklik** (order Bapak, 9 Okt 2026) — *"klik jawa barat area di peta minta di garis batas provinsi dibuat garis merah sampai form provinsi di tutup warna merah kembali normal"* | | | |
| K19 | a. Garis batas provinsi terpilih jadi **merah** (lebih tebal) | ✅ | ✅ | 9 Okt 2026 |
| K19 | b. Warna **kembali normal** saat panel ditutup (tombol ×, Escape, klik peta) | ✅ | ✅ | 9 Okt 2026 |
| K19 | c. Pindah provinsi → yang lama normal, yang baru merah (hanya 1 merah) | ✅ | ✅ | 9 Okt 2026 |
| K19 | d. Uji PC + HP (oleh AI) — 10 uji, 0 gagal | ✅ | ✅ | 9 Okt 2026 |
| K19 | e. Uji di HP (oleh Bapak) | ⬜ | ⬜ | — |

| **K20** | **Jumlah penduduk kabupaten/kota** (lanjutan order Bapak, 9 Okt 2026) — tahap **b** dari rencana data penduduk & agama | | | |
| K20 | a. Cari sumber resmi → **BPS**: tabel *"Jumlah Penduduk menurut Kabupaten/Kota dan Kelompok Umur"* | ✅ | ✅ | 9 Okt 2026 |
| K20 | b. Ambil & verifikasi — **514 kab/kota**, jumlah **persis sama** dengan angka BPS (selisih 0) | ✅ | ✅ | 9 Okt 2026 |
| K20 | c. Simpan sebagai data proyek (`data/penduduk.js` + `alat/bps-penduduk-2026.json`) | ✅ | ✅ | 9 Okt 2026 |
| K20 | d. Tampilkan di form saat wilayah kab/kota dipilih | ✅ | ✅ | 9 Okt 2026 |
| K20 | e. Uji PC + HP (oleh AI) — 17 uji, 0 gagal | ✅ | ✅ | 9 Okt 2026 |
| K20 | f. Uji di HP (oleh Bapak) | ⬜ | ⬜ | — |

### B. ANTREAN KERJA
_(kosong — belum ada order yang disetujui)_

### C. IDE

| Ide | Tanda | Catatan |
|-----|-------|---------|
| Peta wilayah Indonesia interaktif (klik provinsi → kab → kec → desa) | 🟡 perlu diperdalam | menunggu data K01 |
| Data proyek yayasan (diisi manual Bapak di tiap titik peta) | 🟡 perlu diperdalam | lihat aturan F4 |
| **Akses di HP lewat My Files (folder Download)** | ⚠️ bermasalah | **Tidak bisa** dipakai bersama Layerbase — `file://` diblokir hubungi cloud (CORS). Cara buka di HP harus berubah. |
| **Fitur Ekspor/Impor data** (pindah data PC↔HP) | ⏸️ ditahan | tidak perlu kalau pakai cloud (data sudah sama otomatis) |
| **Peta dasar MapLibre + citra satelit** (permintaan Bapak, 3 Okt 2026) | ✅ dikerjakan jadi **K17** (6 Okt 2026) | Bapak: *"catat dulu, ada request mendadak, jangan diproses, fokus member dulu"* → lalu 6 Okt 2026 diproses. **Jawaban yang dipakai:** (1) peta **tetap offline** — citra diunduh sekali, bukan butuh internet; (2) sumber **Esri World Imagery** (tanpa kunci API); (3) **ganti total** latar peta, tampilan lain tidak diubah. Selesai sebagai K17 (tabel D). |
| **Suku bangsa di peta** | ✅ dikerjakan jadi **K16** (4 Okt 2026) | Bapak: *"di proses"*. **Hasil pemeriksaan sumber:** Wikidata = 1.558 suku tapi 72 koordinat **semuanya bukan suku** · Wikipedia tabel BPS 2010 = 31 kelompok, tanpa koordinat · Peta Bahasa Kemendikbud = server mati · BPS = 403. → **Keputusan Bapak:** titik suku **ditempelkan ke ibu kota provinsi asal** + tanda **"perkiraan"**. Selesai sebagai K16 (tabel A). |
| ↳ Suku: tambah koordinat asli per suku | ⏸️ ditahan | Menunggu Bapak menemukan sumber koordinat suku. Sementara 28 suku titiknya di ibu kota provinsi asal (perkiraan). |

### D. SELESAI

| Kode | Keterangan | Tgl |
|------|------------|-----|
| **K17** | **Peta diganti citra satelit (tetap offline)** — latar peta kini **foto asli bumi dari satelit** (Esri World Imagery), disimpan lokal `data/citra-satelit.jpg` (8192×3277 · 1,95 MB) + pengunduh `alat/unduh-citra-satelit.py`. Tampilan lain tidak diubah; warna garis/tulisan disesuaikan agar terbaca. 🐛 Garis meleset 66 px → **dinilai**: salah hitung di pengunduh → diperbaiki + pengaman dipasang. Uji: 4 keselarasan + 20 aplikasi, **0 gagal** (PC & HP). Bapak: *"sudah benar"* | 6 Okt 2026 |
| **K14g** | **Label peta: nama wilayah selalu tampil** — tombol 👁 (kini "Label lokasi pada peta") menyembunyikan nama lokasi & kategori; nama wilayah tetap | 3 Okt 2026 |
| **K14f** | **Dua tombol 👁 disatukan dalam satu baris** (Label kategori pada peta & Ringkas daftar) | 3 Okt 2026 |
| **K14e** | **Tombol 👁 kedua jadi "Ringkas daftar (hanya kota)"** — saat di-hide, seluruh baris member (nama & kategori) disembunyikan; hanya judul kota yang tampil | 3 Okt 2026 |
| **K14d** | **Tombol 👁 kedua diperbaiki** — “Label kategori di daftar” yang disembunyikan; nama lokasi & judul kota tetap tampil | 3 Okt 2026 |
| **K14c** | **Hilangkan tampilan dobel** saat [✎]/[−] — daftar anggota kota disembunyikan selama memilih | 3 Okt 2026 |
| **K14b** | **[+] kunci Wilayah** (wilayah = kepala kota) · **tombol Hapus dobel di form dibuang** (hapus lewat [−]) · panah ›/✕ di daftar pilih | 3 Okt 2026 |
| **K14** | **Tombol [+] [✎] [−] dipindah ke baris KOTA** — pilih member lewat daftar isi kota; baris member bersih `- Nama - Kategori`; label berlapis dibuang | 3 Okt 2026 |
| **K13b** | **Debug fitur member [+][✎][−]** — temuan: versi online masih lama; panel label diberi judul + tombol ×; alur simpan disatukan. Lolos 10 uji | 3 Okt 2026 |
| **K13** | **Member: tombol judul kota · perbaikan panel [+] · edit tanpa ubah wilayah** (a–c ✅) | 3 Okt 2026 |
| **K12b** | **Satu tombol “Label kategori pada peta”** di bawah [+ Tambah Lokasi] — tombol 👁 per member dihapus (sisa [+][✎][−]) | 3 Okt 2026 |
| **K12** | **Member: banyak kategori per member + tombol [+][✎][−][👁] + hide/unhide label kategori (per member & global)** (a–e ✅) | 3 Okt 2026 |
| **K11** | **Form wilayah (cari + dropdown bertingkat) + Member satu-satunya menu** — tombol Ubah/Hapus di member (a–c ✅) | 3 Okt 2026 |
| **K10** | **Member berkelompok per kota** + **garis penghubung** dot–label + **label kategori** kecil (a–c ✅) | 3 Okt 2026 |
| **K09** | **Penanda lokasi & kategori** — dot warna, kategori bisa diubah, member, kedip merah (a–g ✅) | 2 Okt 2026 |
| **K06** | **Nama pulau tampil permanen** — 29 pulau, penempatan otomatis tidak menutupi nama kota (a–e ✅) | 2 Okt 2026 |
| — | Inisialisasi proyek: backup 5 dokumen salinan ANodes, kosongkan, buat `agents.md` | 30 Sep 2026 |

---

## 📌 CATATAN
- Order baru dari Bapak → dicatat dulu di tabel **A** atau **B** dengan tanda ⬜, **baru dikerjakan**.
