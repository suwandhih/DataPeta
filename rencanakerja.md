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
| K05 | c. **Muara** (kuala) di peta — ⏸️ **DITAHAN** (keputusan Bapak, 9 Okt 2026): *"di pending dulu.. karena sudah pakai citra satelit"* | ⏸️ | ⏸️ | 9 Okt 2026 |
| K05 | d. **Bendungan / waduk** di peta — ⏸️ **DITAHAN** (keputusan Bapak, 9 Okt 2026), alasan sama | ⏸️ | ⏸️ | 9 Okt 2026 |
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
| K02 | g. Tempat isian data client per lokasi — ✅ **dikerjakan sebagai K03 j** | ✅ | ✅ | 2 Okt 2026 |
| **K03** | **Penyimpanan data di Layerbase cloud** (keputusan Bapak, 2 Okt 2026) | | | |
| K03 | a. ⚠️ **Ubah aturan F3** — aplikasi kini butuh internet (keputusan Bapak) | ✅ | ✅ | 2 Okt 2026 |
| K03 | b. ⚠️ **Ubah cara buka di HP** — tidak bisa lagi dari My Files (`file://`) | ✅ | ✅ | 2 Okt 2026 |
| K03 | f. **Hosting GitHub Pages** — aplikasi online di `suwandhih.github.io/DataPeta` | ✅ | ✅ | 2 Okt 2026 |
| K03 | c. Buat database SQLite di Layerbase (paket Free, 5 GB) — ✅ **dikerjakan sebagai K03 h1** | ✅ | ✅ | 2 Okt 2026 |
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
| K03 | f. Uji di HP (oleh Bapak) — ⏳ **menunggu Bapak** | ⬜ | ⬜ | — |
| K03 | i. **IndexedDB** — penyimpanan data lokal (dikerjakan dulu, keputusan Bapak) | ✅ | ✅ | 2 Okt 2026 |
| K03 | j. Form isian data client (tambah/ubah/hapus lokasi) — K02 g | ✅ | ✅ | 2 Okt 2026 |
| K03 | e. Sambungkan aplikasi ke database cloud (cara aman) | ✅ | ✅ | 2 Okt 2026 |

| **K04** | **Nama kota utama + daftar wilayah** (order Bapak, 2 Okt 2026) | | | |
| K04 | a. **38 ibu kota provinsi** tampil permanen di peta | ✅ | ✅ | 9 Okt 2026 |
| K04 | a1. Sumber nama + koordinat ibu kota: **Wikipedia "Daftar ibu kota provinsi di Indonesia"** (tabel + peta lokasi artikel) — 38 baris lengkap | ✅ | ✅ | 9 Okt 2026 |
| K04 | a2. Berkas baru `data/ibu-kota.js` (38 ibu kota + koordinat) | ✅ | ✅ | 9 Okt 2026 |
| K04 | a3. Lapisan `lapisIbuKota` + `gambarIbuKota()` — bintang kuning ⭐ + nama, ukuran tetap, tampil di semua tingkat zoom | ✅ | ✅ | 9 Okt 2026 |
| K04 | a4. Penempatan otomatis: hindari nama kota, gunung, penanda, nama pulau, ibu kota lain | ✅ | ✅ | 9 Okt 2026 |
| K04 | a5. Nama di tepi peta (Jayapura, Merauke, Wamena) digeser masuk supaya tidak terpotong | ✅ | ✅ | 9 Okt 2026 |
| K04 | a6. Uji PC (1440×900) + HP (390×844), zoom 1×–9×: 38 nama tampil, 0 terpotong, 0 bertumpuk | ✅ | ✅ | 9 Okt 2026 |
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
| K08 | f. Form isian: bujur/lintang/inisial diganti yang lebih jelas (nanti) — ⏸️ **DITAHAN** (belum ada order Bapak) | ⏸️ | ⏸️ | — |
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

| **K21** | **Info jumlah penduduk di form member** (temuan Bapak, 9 Okt 2026) — *"member · pengisian tambah data · wilayah sudah ditemukan · info jumlah penduduk ditampilkan pada dalam form isi data"* | | | |
| K21 | a. 🐛 **Dinilai:** form member ([+] dan [✎]) **tidak** menampilkan jumlah penduduk | ✅ | ✅ | 9 Okt 2026 |
| K21 | b. 🐛 **Sebab:** nama wilayah member berbentuk *"Bandung, Jawa Barat"* — **ambigu** (Kabupaten atau Kota Bandung?) | ✅ | ✅ | 9 Okt 2026 |
| K21 | c. Perbaikan: nama wilayah dipotong di koma + **kode wilayah disimpan** saat menyimpan data | ✅ | ✅ | 9 Okt 2026 |
| K21 | d. Uji PC + HP (oleh AI) — 11 uji, 0 gagal | ✅ | ✅ | 9 Okt 2026 |
| K21 | e. Uji di HP (oleh Bapak) | ⬜ | ⬜ | — |

| **K22** | **Referensi sumber data di `panduan.md`** (order Bapak, 9 Okt 2026) — *"cantumkan referensi data dari mana: peta, jumlah penduduk, agama — supaya data yang dipelajari user tahu dari sumbernya"* | | | |
| K22 | a. Cantumkan sumber **latar peta** (citra satelit) + **batas provinsi** | ✅ | ✅ | 9 Okt 2026 |
| K22 | b. Cantumkan sumber **jumlah penduduk** (38 provinsi + 514 kab/kota) | ✅ | ✅ | 9 Okt 2026 |
| K22 | c. Cantumkan sumber **agama** (hasil K23) + tautan tabel BPS | ✅ | ✅ | 9 Okt 2026 |
| K22 | d. Uji tampilan + periksa tautan | ✅ | ✅ | 9 Okt 2026 |

| **K23** | **Data agama per kabupaten/kota** (order Bapak, 9 Okt 2026) — dikerjakan **dicicil per tahap** | | | |
| K23 | a. Cari sumber resmi → **hasil riset:** BPS Pusat **tidak** menyediakan agama sampai kab/kota; Dukcapil Kemendagri menu *Data Kependudukan* **tidak ada kolom agama**; BPS provinsi hanya **10 dari 38** yang punya | ✅ | ✅ | 9 Okt 2026 |
| K23 | b. **Tahap 1** — ambil agama kab/kota dari BPS provinsi yang tersedia (**5 provinsi**: DKI Jakarta, Sumatera Utara, Sulawesi Utara, Sulawesi Tenggara, Kalimantan Utara = **76 kab/kota**) | ✅ | ✅ | 9 Okt 2026 |
| K23 | c. Simpan sebagai data proyek (`data/agama.js` + `alat/bps-agama-mentah.txt`) | ✅ | ✅ | 9 Okt 2026 |
| K23 | d. Tampilkan di form saat wilayah dipilih (termasuk form **Member**) | ✅ | ✅ | 9 Okt 2026 |
| K23 | e. Uji PC + HP (oleh AI) — 12 uji, 0 gagal | ✅ | ✅ | 9 Okt 2026 |
| K23 | f. **Tahap 2** — ditambah **4 provinsi** (Jawa Barat, Jawa Tengah, Jambi, Sumatera Selatan) → total **9 provinsi / 166 kab/kota** | ✅ | ✅ | 9 Okt 2026 |
| K23 | g. Pemindaian ulang 38 provinsi → sisa **29 provinsi belum menerbitkan** tabel agama per kab/kota (bukan gagal dicari) | ✅ | ✅ | 9 Okt 2026 |
| K23 | h. 🐛 **Dinilai:** situs BPS membatasi permintaan beruntun (tampak "No results" padahal bukan) → perlu jeda antarpermintaan | ✅ | ✅ | 9 Okt 2026 |
| K23 | i. 🐛 **Dinilai:** tabel Jambi memakai format `257.189,00` → semua angka terbaca **0**; diperbaiki + ditambah penolakan baris tak terbaca | ✅ | ✅ | 9 Okt 2026 |
| K23 | j. Uji PC + HP (oleh AI) — 11 uji, 0 gagal; **166 kab/kota semuanya cocok** dengan baris BPS | ✅ | ✅ | 9 Okt 2026 |
| K23 | k. Tahap 3…n — provinsi yang **sudah menerbitkan** (perlu dicari ke Dinas Dukcapil daerah), **dicicil** | ⏳ | ⏳ | — |
| K23 | k1. **Pemindaian 9 Okt 2026 — jalur BPS & Dukcapil PUSAT sudah HABIS.** Hasil: BPS Pusat `subject=519&keyword=agama` → **"No results"**; Dukcapil Kemendagri (12 tabel) → **tidak ada kolom agama**; **28 provinsi BPS** (Aceh s/d Papua Barat) → **"No results"** | ✅ | ✅ | 9 Okt 2026 |
| K23 | k2. 🎯 **TEMUAN: Kalimantan Timur PUNYA tabel "Jumlah Penduduk Menurut Agama"** (diperbarui 25 Feb 2025) — tapi halamannya **404 "Tabel Tidak Tersedia"** (rusak di sisi BPS). Wayback Machine belum mengarsipkannya. Publikasi Kaltim `keyword=agama` → 0 hasil | ✅ | ✅ | 9 Okt 2026 |
| K23 | k3. **5 provinsi tanpa subdomain BPS:** Papua Selatan · Papua Barat Daya · Papua Tengah · Papua Pegunungan (+ `diy` harus pakai `yogyakarta`) | ✅ | ✅ | 9 Okt 2026 |
| K23 | k4. **Jalur berikutnya (BELUM dicoba):** publikasi **"Provinsi Dalam Angka"** (PDF tahunan tiap BPS provinsi) — biasanya memuat tabel agama per kab/kota. **Mulai dari Kalimantan Timur** | ⬜ | ⬜ | — |
| K23 | k5. Jalur cadangan: publikasi BPS Pusat *"Kewarganegaraan, Suku Bangsa, Agama dan Bahasa Sehari-hari Penduduk Indonesia"* (23 Mei 2012, data **SP2010**) — **provinsi saja**, bukan kab/kota | ⬜ | ⬜ | — |
| K23 | l. Uji di HP (oleh Bapak) | ⬜ | ⬜ | — |

| **K24** | **🐛 Klik provinsi tidak jalan saat di-zoom in** (temuan Bapak, 9 Okt 2026) — *"jumlah penduduk ada bug · berfungsi jika peta terlihat full sumatera sampai papua · tapi jika di zoom in untuk detail lokasi tidak berfungsi"* | | | |
| K24 | a. **Dinilai:** `svg.setPointerCapture()` dijalankan saat pointer **ditekan**, padahal penangkapan hanya perlu saat **menggeser**. Akibatnya klik singkat ikut "tertangkap" peta → tidak sampai ke wilayah | ✅ | ✅ | 9 Okt 2026 |
| K24 | b. Sebab tambahan: geser hanya aktif saat zoom > 1 → **kenapa bug-nya hanya muncul saat zoom in** | ✅ | ✅ | 9 Okt 2026 |
| K24 | c. Perbaikan: penangkapan kursor dilakukan **setelah benar-benar menggeser** (≥ 5 piksel), bukan saat menekan | ✅ | ✅ | 9 Okt 2026 |
| K24 | d. Uji PC + HP (oleh AI) — 12 uji, 0 gagal | ✅ | ✅ | 9 Okt 2026 |
| K24 | e. Uji di HP (oleh Bapak) | ⬜ | ⬜ | — |

| **K25** | **Agama di panel provinsi** (order Bapak, 9 Okt 2026) — *"agama sudah ada? tapi belum di masuk dalam member form isian"* → **dinilai:** agama **sudah** tampil di form isian (member & tambah lokasi); yang belum = **panel provinsi** (klik provinsi di peta) hanya menampilkan jumlah penduduk | | | |
| K25 | a. Tampilkan agama di panel provinsi — dijumlahkan dari kab/kota (angka BPS, tidak dikarang) | ✅ | ✅ | 9 Okt 2026 |
| K25 | b. Hanya untuk **9 provinsi** yang ada datanya; provinsi lain tidak menampilkan apa-apa | ✅ | ✅ | 9 Okt 2026 |
| K25 | c. Provinsi bersatuan **persen** (Jawa Tengah, Kalimantan Utara) → ditampilkan **rata-rata**, bukan dijumlahkan | ✅ | ✅ | 9 Okt 2026 |
| K25 | d. Uji PC + HP (oleh AI) — 18 uji, 0 gagal | ✅ | ✅ | 9 Okt 2026 |
| K25 | e. Uji di HP (oleh Bapak) | ⬜ | ⬜ | — |

| **K26** | **Lengkapi data agama sampai seluruh kab/kota** (order Bapak, 10 Okt 2026) — *"agama belum semua kota / desa / kab terdata .. di lengkapi"* | | | |
| K26 | a. **Keadaan sekarang (diperiksa 10 Okt 2026):** agama baru ada **9 provinsi / 166 kab/kota** dari **514** kab/kota (32%). Sisa **29 provinsi / 348 kab/kota** belum ada | ✅ | ✅ | 10 Okt 2026 |
| K26 | b. **Catatan penting:** BPS **tidak menerbitkan** agama sampai **desa/kelurahan** — tidak ada sumber resmi. Yang bisa dilengkapi = **kabupaten/kota** (dan kecamatan bila ada) | ⬜ | ⬜ | — |
| K26 | c. **Tahap 1a — pemindaian tabel BPS provinsi SELESAI (10 Okt 2026).** Cara: buka `?subject=519` (bukan `keyword=agama` — filter itu **rusak**, Jakarta pun salah terbaca kosong), baca ID tabel dari React props baris tabel. **Hasil: TIDAK ADA tabel agama per kab/kota di provinsi lain.** Yang sudah ada memang hanya 9 provinsi. | ✅ | ✅ | 10 Okt 2026 |
| K26 | c2. **Catatan penting (jangan diulang — aturan B14):** `subject=519` + `keyword=agama` **TIDAK bisa dipercaya**. Jakarta punya tabel agama per kab/kota (di `data/agama.js`) tapi filter ini menjawab "No results". **Selalu pakai `?subject=519` tanpa keyword, lalu saring sendiri.** | ✅ | ✅ | 10 Okt 2026 |
| K26 | c3. Provinsi **dipastikan tidak punya tabel agama** (10 Okt 2026): 11 Aceh · 13 Sumbar · 14 Riau · 17 Bengkulu · 18 Lampung · 19 Babel · 21 Kepri · 34 Yogyakarta · 35 Jatim · 36 Banten · 51 Bali · 52 NTB · 53 NTT · 61 Kalbar · 62 Kalteng · 63 Kalsel · 72 Sulteng · 73 Sulsel · 76 Sulbar · 81 Maluku · 82 Malut · 91 Papua · 92 Papua Barat. (Jatim 258 tabel, Yogyakarta 39, Sulsel 35, Bali 17 — **nol** yang bertema agama.) | ✅ | ✅ | 10 Okt 2026 |
| K26 | c4. ⚠️ **Kalimantan Timur: tabel "Jumlah Penduduk Menurut Agama" RUSAK di sisi BPS.** Judulnya muncul di daftar (`Mzk2IzI=`), tapi halaman tabelnya berbunyi **"Tabel Tidak Tersedia"** — jadi ini kerusakan BPS, bukan salah kita. Kode provinsi lain belum dipindai. | ⚠️ | ⬜ | 10 Okt 2026 |
| K26 | d. **Tahap 2** — provinsi yang PDF-nya tidak memuat tabel agama → cari ke **Dinas Dukcapil daerah** / **BPS provinsi lain** | ⬜ | ⬜ | — |
| K26 | d2. **⛔ Cek jalan yang sudah HABIS (10 Okt 2026) — jangan diulang:** Perpustakaan BPS (PDF butuh login SSO) · `webapi.bps.go.id` (butuh API key) · `data.go.id` (tidak ada) · `sensus.bps.go.id/sp2010` (hanya sampai provinsi) · Dukcapil pusat `data-kependudukan` (hanya jumlah penduduk, **tidak ada agama**) · mesin pencari (tidak ada hasil) · `sp2010.bps.go.id` (dialihkan ke `sensus.bps.go.id`). | ✅ | ✅ | 10 Okt 2026 |
| K26 | d3. 🟡 **IDE yang perlu diputuskan Bapak:** Dukcapil daerah / BPS **kabupaten** kadang menerbitkan "Kabupaten Dalam Angka" yang memuat agama. Tapi jalurnya **satu per satu daerah** (348 kab/kota) — lama sekali. Bapak mau ditempuh? | 🟡 | ⬜ | 10 Okt 2026 |
| K26 | d4. 🟡 **IDE yang perlu diputuskan Bapak:** tabel "Jumlah Penduduk Menurut Agama" versi **tahun lama** (2018–2022) di 9 provinsi yang sama — **tidak menambah provinsi baru**. Tidak berguna untuk melengkapi. | ❌ | ❌ | 10 Okt 2026 |
| K26 | e. **Tahap 3** — jalur cadangan **SP2010 sudah diperiksa 10 Okt 2026** → hanya sampai **provinsi**, tidak per kab/kota. **Tidak bisa dipakai.** | ❌ | ❌ | 10 Okt 2026 |
| K26 | f. Simpan hasil ke `data/agama.js` + `alat/bps-agama-mentah.txt` (angka apa adanya, tidak dikarang — aturan F8) | ⬜ | ⬜ | — |
| K26 | g. Uji PC + HP (oleh AI) — angka cocok dengan tabel sumber | ⬜ | ⬜ | — |
| K26 | h. Uji di HP (oleh Bapak) | ⬜ | ⬜ | — |
| K26 | i. **ORDER BAPAK 10 Okt 2026: pencarian DILANJUTKAN** (belum ditutup). Tiga jalur sisa, dikerjakan berurutan: **(i-1)** unduh **"Provinsi Dalam Angka"** per provinsi (PDF resmi BPS) → cari tabel agama per kab/kota; **(i-2)** kalau tidak ada → **Dinas Dukcapil provinsi/kabupaten**; **(i-3)** kalau tidak ada → tanya Bapak (mungkin Bapak punya akses login Perpustakaan BPS / API key BPS). ⚠️ **Semua jalur butuh file PDF yang harus dibuka satu per satu** (38 provinsi × 514 kab/kota) — ini pekerjaan panjang, bukan sekali jalan. | ⬜ | ⬜ | 10 Okt 2026 |

| **K27** | **Tiga perbaikan data wilayah** (order Bapak, 10 Okt 2026) — temuan Bapak atas peta | | | |
| K27 | a. 🐛 *"bali - denpasar tapi nyasar ke P. Lombok"* — **dinilai:** koordinat Denpasar **BENAR** (115,2339 −8,6717 ada di Pulau Bali — diuji titik-dalam-poligon terhadap batas provinsi asli). Yang salah = **jarak nama dari bintangnya terlalu jauh saat zoom besar**. Rumus `9 × zoom + 5` ikut membesar → di zoom 7,3 nama terdorong **95 px** ke kanan sampai menyeberang ke Pulau Lombok. Di zoom 12 terdorong **±150 px** (nama "Mamuju" 130 px dari bintangnya). Ukuran bintang di layar **tetap 10 px** di semua zoom, jadi jarak tidak perlu ikut membesar. | ✅ | ✅ | 10 Okt 2026 |
| K27 | b. Perbaikan: **jarak tulisan dibuat tetap** (`jarakTulisan()` = ± 11 px, tidak dikali zoom) untuk **ibu kota + nama kota**, sama seperti penanda lokasi (K14). Ikut dibersihkan: `RINTANGAN_PENANDA` (dulu `5 × zoom + 3`, padahal penanda ukurannya tetap). | ✅ | ✅ | 10 Okt 2026 |
| K27 | c. ✅ **Cek jumlah penduduk NTB 5.815.328 jiwa — ANGKA BENAR, tidak perlu diubah.** Bukti: (1) file mentah `alat/bps-penduduk-2026.json` baris 301 = `["NUSA TENGGARA BARAT","5.815.328"]`; (2) jumlah 10 kab/kota NTB (787.339 + 1.149.627 + 1.460.017 + 550.684 + 258.349 + 559.349 + 160.732 + 268.761 + 452.410 + 168.060) = **5.815.328** persis; (3) NTB memang lebih kecil dari NTT (5.828.569) dan lebih besar dari Bali (4.488.243). | ✅ | ✅ | 10 Okt 2026 |
| K27 | d. 🐛 *"gunung rinjani seharusnya di p. lombok tapi ada di mataram dan jumlah penduduknya sama dengan NTB"* — **dinilai: ini SATU masalah, bukan dua.** Rinjani **memang** di Pulau Lombok, tapi koordinatnya ada di **Kabupaten Lombok Timur**, ±20 km dari Kota Mataram. Karena layar sempit, namanya tampak seolah di Mataram. Lalu **jumlah penduduk 5.815.328 yang muncul = panel Provinsi NTB**, bukan data gunung (gunung tidak punya data penduduk). Sebabnya: bintang ibu kota "Mataram" **bertabrakan dengan segitiga Rinjani**, dan segitiga gunung tidak bisa diklik (`pointer-events: none`) → klik menembus ke batas provinsi NTB di bawahnya → terbuka panel Provinsi NTB. | ✅ | ✅ | 10 Okt 2026 |
| K27 | e. Perbaikan d: **segitiga gunung bisa diklik** (`pointer-events: auto`, kursor tanda tanya) + **keterangan diperjelas** jadi *"nama — tinggi — pulau + provinsi"*, dihitung dari batas provinsi asli + daftar pulau (bukan dikarang — aturan F8). Hasil: **Gunung Rinjani — 3726 m — Pulau Lombok, Nusa Tenggara Barat**. Murray Hill tidak diberi provinsi (memang bukan gunung Indonesia). | ✅ | ✅ | 10 Okt 2026 |
| K27 | f. Penanda versi `index.html` dinaikkan (aturan B13) → `?v=20261010-01` (19 penanda) | ✅ | ✅ | 10 Okt 2026 |
| K27 | g. Uji PC (1440×900) + HP (390×844), zoom 1×–12× — **12 uji, 0 gagal**: Denpasar & Mataram di pulau yang benar pada semua zoom (tulisan Denpasar tetap di dekat pantai timur Bali, **tidak lagi sampai Pulau Lombok**), jarak nama kembali rapat (terburuk 29 px, sebelumnya 150 px), 38 ibu kota tetap tampil, gunung bisa diklik dengan keterangan benar | ✅ | ✅ | 10 Okt 2026 |
| K27 | g2. **Uji versi ONLINE** (`suwandhih.github.io/DataPeta`) — **10 uji, 0 gagal** (aturan C9). Penanda versi online sudah `?v=20261010-01`. Hasil: keterangan *Gunung Rinjani — 3726 m — Pulau Lombok, Nusa Tenggara Barat*; jarak nama ibu kota dari bintangnya: Mataram 7,5 px · Denpasar 10,1 px · Makassar 10,1 px · Surabaya 10,5 px — **semua rapat**. | ✅ | ✅ | 10 Okt 2026 |
| K27 | h. Uji di HP (oleh Bapak) | ⬜ | ⬜ | — |
| K27 | i. 🐛 **ORDER BAPAK 10 Okt 2026: *"nama yang menjauh perlu dirapikan"*** — nama beberapa ibu kota masih tampak **menjauh dari bintangnya**. Diperiksa 3 sebabnya: **(1)** pilihan sisi `"-jauh"` (`jarak + 18`, jadi ± 33 px); **(2)** `masukBatas()` menggeser nama **masuk ke layar** padahal bintangnya sudah di luar peta → terukur "Kupang" **58 px** dari bintangnya; **(3)** bintang & titik kota **tidak didaftarkan sebagai penghalang**, jadi nama boleh menimpa bintang lain. | ✅ | ✅ | 10 Okt 2026 |
| K27 | j. Perbaikan i: **(1)** sisi `"-jauh"` dibuang menyeluruh (dari `SEMUA_SISI`, `kotakSisi`, `letakTeks`, `jj`) — sisi sudut `kiri-atas` & `kiri-bawah` ditambahkan sebagai gantinya; **(2)** `masukBatas()` dihapus — bintang/titik yang di luar peta **tidak digambar namanya** (baris ± 60 px di luar batas tidak lagi dibuang, jadi penanda di tepi tetap dapat namanya); **(3)** fungsi baru `tempatTulisan()` + `hitungLuas()`: sisi dekat → sisi sudut → **baru** jarak ditambah **3 px** (`JARAK_TAMBAHAN = [0, 3, 6]`); **(4)** bintang ibu kota (`RINTANGAN_BINTANG` = 7) + titik kota (`RINTANGAN_TITIK` = 4) didaftarkan sebagai penghalang. Fungsi `bentrok()` yang tidak terpakai lagi dihapus (aturan H1). | ✅ | ✅ | 10 Okt 2026 |
| K27 | k. Penanda versi `index.html` dinaikkan (aturan B13) → `?v=20261010-06` (19 penanda) | ✅ | ✅ | 10 Okt 2026 |
| K27 | l. Uji PC (1440×900) + HP (390×844), zoom 1×–12× — **nama bertumpuk 0 · nama menutupi bintang 0 · galat konsol 0**, 38 ibu kota tetap tampil. Jarak nama dari bintangnya (PC): z1 **19,6 px** · z1,5 14,7 px · z2,25 13,7 px · z3,38 13,3 px · z5,06 13,3 px · z7,59 6,2 px · z12 6,2 px — **turun dari 54,3 px sebelum perbaikan**. Uji HP: terburuk 18,9 px | ✅ | ✅ | 10 Okt 2026 |
| K27 | m. **Jawaban pertanyaan Bapak (NTB vs NTT):** ❌ **TIDAK sama.** NTB = **5.815.328** jiwa · NTT = **5.828.569** jiwa — **beda 13.241 jiwa**. Kebetulan mirip karena sama-sama 5,8 juta. Bukti: (1) file mentah BPS baris 301 & 312; (2) jumlah seluruh kab/kota tiap provinsi (10 kab/kota NTB & 22 kab/kota NTT) — **selisih 0** untuk dua-duanya. | ✅ | ✅ | 10 Okt 2026 |
| K27 | n. **Uji versi ONLINE** (`suwandhih.github.io/DataPeta`) — **4 uji, 0 gagal** (aturan C9). Penanda versi online sudah `?v=20261010-06`. Hasil: z1 38 nama · z2,25 12 nama · z5,06 4 nama · z12 1 nama — **celahMaks 19,6 px**, **nama bertumpuk 0**, **nama menutupi bintang 0**, **galat konsol 0** | ✅ | ✅ | 10 Okt 2026 |

| **K28** | **Daftar rincian kab/kota di panel provinsi** (ORDER BAPAK 10 Okt 2026) — *"kalau di uji sama.. saya perhatikan karena area bukan satu pulau.. atau satu lokasi angka itu terdiri dari beberapa lokasi. kalau begitu dibuat daftar provinsi terdiri dari lokasi a,b,c,d dengan jumlahnya jadi angka yg di sajikan bisa dibuktikan"*. Bapak memilih **tahap a + b**, dan **berlaku SELURUH WILAYAH (38 provinsi)**. | | | |
| K28 | a. Periksa dulu (10 Okt 2026): **semua bahan sudah ada, tidak perlu cari data baru.** 38/38 provinsi punya penduduk; 38/38 punya daftar kab/kota (514 kab/kota); **jumlah kab/kota = angka provinsi cocok persis di 38 provinsi (selisih 0)**. Yang kurang hanya **cara menampilkan** | ✅ | ✅ | 10 Okt 2026 |
| K28 | b. **Tahap a** — panel provinsi menampilkan **daftar kabupaten/kota + jumlahnya**, bisa dibuka-tutup (`<details>`), daftar digulir kalau panjang (maks 260 px). Fungsi baru `daftarKabKotaProvinsi()` + `blokKabKotaPanel()`; gaya baru `.panel-rincian` di `css/style.css`. Urut nama A–Z | ✅ | ✅ | 10 Okt 2026 |
| K28 | c. **Tahap b** — tanda bukti **dihitung sendiri** dari data (bukan ditulis manual — aturan F8): *"Jumlah 10 kabupaten/kota = **5.815.328 jiwa** — sama dengan angka BPS ✓"*. Ada 3 kemungkinan pesan: cocok ✓ · beda (angka selisihnya disebut) · belum lengkap | ✅ | ✅ | 10 Okt 2026 |
| K28 | d. Tahap c (klik nama kab/kota → peta melompat ke daerah itu) — **belum diputuskan Bapak**, tunggu aba-aba | ⏸️ | ⬜ | 10 Okt 2026 |
| K28 | e. Penanda versi `index.html` dinaikkan (aturan B13) → `?v=20261010-07` (19 penanda) | ✅ | ✅ | 10 Okt 2026 |
| K28 | f. Uji PC (1440×900) + HP (390×844) — **berlaku seluruh wilayah**: diuji perhitungan semua **38 provinsi / 514 kab/kota** → **38 lengkap · 38 cocok · 0 gagal**. Uji tampilan: NTB 10 baris · NTT 22 · Bali 9 · DKI Jakarta 6 · Jawa Barat 27 · Papua 9 · Papua Tengah 8 · Kaltim 10 · Papua Selatan 4 · **Jawa Timur 38 (paling banyak)** — daftar muat di dalam panel, bisa digulir, panel tidak kepanjangan, 0 galat konsol | ✅ | ✅ | 10 Okt 2026 |
| K28 | g. **Uji versi ONLINE** (`suwandhih.github.io/DataPeta`) — **4 uji, 0 gagal** (aturan C9). Penanda versi online `?v=20261010-07`. Hasil: NTB 10 kab/kota ✓ · NTT 22 ✓ · Bali 9 ✓ · Jawa Timur 38 ✓ — semua bertanda "sama dengan angka BPS ✓", 0 galat konsol | ✅ | ✅ | 10 Okt 2026 |

| **K29** | **Lengkapi data agama seluruh kab/kota — ORDER BAPAK 10 Okt 2026 (lanjutan K26 i).** Bapak memilih: **"langsung kerjakan semua 29 provinsi sekaligus"**. Bapak juga bertanya apakah ada pilihan **"tidak ada agama" / "kepercayaan"**. | | | |
| K29 | a. **Jawaban pertanyaan Bapak (10 Okt 2026):** *"tidak ada agama"* → ❌ **TIDAK ADA** di tabel BPS mana pun (BPS tidak menerbitkan penduduk tanpa agama). *"Kepercayaan"* → ✅ **ADA di 4 dari 9 provinsi** yang sudah punya data: **DKI Jakarta** (kolom *"Aliran Kepercayaan"* 385 jiwa, 2024) · **Jawa Barat** (*"Kepercayaan Lain"* 3.275 jiwa, 2023) · **Jambi** (*"Lainnya"* 2.221 jiwa, 2022) · **Sulawesi Tenggara** (*"Lainnya"* 28 jiwa, 2022) · **Kalimantan Utara** (*"Lainnya"* 0,08 %, 2021). Lima provinsi lain tidak punya kolomnya: Sumatera Utara · Sumatera Selatan · Jawa Tengah · Sulawesi Utara · (1 lagi). ⚠️ Nama kolom berbeda-beda; *"Lainnya"* tidak dijelaskan BPS apakah murni kepercayaan. Keempatnya **sudah tampil** di aplikasi. | ✅ | ✅ | 10 Okt 2026 |
| K29 | b. **Tahap 1** — unduh **"Provinsi Dalam Angka"** (PDF resmi BPS) tiap provinsi → cari tabel agama per kab/kota. ✅ **SELESAI**: 36 PDF terunduh (567 MB, di `catat/`), 25 provinsi diperiksa. Alat: `alat/cari-agama-dalam-angka.py` | ✅ | ✅ | 10 Okt 2026 |
| K29 | b1. **Pembaca tabel PDF** — `alat/baca-agama-dalam-angka.py`. Tiga kendala berat diatasi: (1) **tanda air BPS** menyelipkan huruf ke dalam sel angka (`"d\n21.212 . i"` = 21.212) dan ke nama (`"t\nLampung t"` = Lampung); (2) tabel sering **terbagi 2 halaman** (halaman lanjutan hanya bertulis "Lanjutan Tabel 4.5.4"); (3) **Kabupaten dan Kota dipisah** baris judul (Kab. Solok vs Kota Solok). | ✅ | ✅ | 10 Okt 2026 |
| K29 | b2. **Cara membuktikan angka benar (F8)** — jumlah angka semua kab/kota diuji terhadap **baris total provinsi di tabel BPS yang sama**. Kalau tidak sama, tabel dibuang. Tidak bergantung tahun data. | ✅ | ✅ | 10 Okt 2026 |
| K29 | c. **Tahap 2** — provinsi yang tabelnya tidak ada di "Dalam Angka" → ganti pendekatan (aturan C5). ✅ **SELESAI**: 6 provinsi berhasil lewat **edisi lama** (mode `--lama`): DIY 2025 · Banten 2025 · Kalimantan Timur 2024 · Sulawesi Barat 2024 (persen) · Nusa Tenggara Timur 2026 (persen) · Papua Barat 2026. | ✅ | ✅ | 10 Okt 2026 |
| K29 | c1. **Tahap 3 — provinsi baru Papua.** Ternyata buku **"Provinsi Papua Dalam Angka"** memuat tabel untuk provinsi hasil pemekaran: **Papua Tengah** (2024, 8 kab) dan **Papua Pegunungan** (2025, 8 kab). Keduanya berhasil dibaca & tervalidasi. | ✅ | ✅ | 10 Okt 2026 |
| K29 | c2. **Sisa 8 provinsi TIDAK BISA dilengkapi** — BPS tidak menerbitkan tabel agama per kab/kota untuk provinsi ini: **Riau (14) · Bengkulu (17) · Jawa Timur (35) · Nusa Tenggara Barat (52) · Sulawesi Tengah (72) · Papua (91) · Papua Selatan (93) · Papua Barat Daya (96)**. | ⚠️ | ⬜ | — |
| K29 | c3. **Semua jalur sudah dicoba & HABIS (aturan B14 — jangan diulang):** ① "Dalam Angka" **semua edisi 2018–2026** untuk 8 provinsi itu → tidak ada tabel agama; ② halaman tabel BPS `subject=519` → ternyata *"Kependudukan dan Migrasi"*, 0 tabel; ③ publikasi BPS `keyword=agama` → hanya "Dalam Angka" yang sudah diperiksa; ④ Dukcapil provinsi (Riau/Jatim/NTB/Papua) → **ERR_NAME_NOT_RESOLVED**; Bengkulu & Sulteng situsnya ada tapi tanpa data agama; ⑤ Kemenag (SIMBI, statistik, data.kemenag.go.id) → 404 / *"aplikasi sedang dalam perbaikan"*; ⑥ BPS Sensus → hanya halaman depan; ⑦ Perpustakaan BPS → butuh login SSO; ⑧ `webapi.bps.go.id` → butuh kunci API; ⑨ `data.go.id`; ⑩ subdomain BPS provinsi baru (papuatengah/papuaselatan/papuabaratdaya) → **tidak ada**; ⑪ publikasi BPS Pusat `keyword=papua tengah/selatan/barat daya/pegunungan` → 0 tautan. | ⚠️ | ⬜ | — |
| K29 | c4. **Papua Selatan (93) & Papua Barat Daya (96)**: tabelnya **ADA** di buku Papua 2026 hal 280 dan Papua Barat 2026, tetapi **seluruh isinya "..."** (BPS belum mengisi angkanya). Jadi bukan salah kita. | ⚠️ | ⬜ | — |
| K29 | d. Simpan hasil ke `data/agama.js` + `alat/bps-agama-mentah.txt` — angka apa adanya, tidak dikarang (aturan F8). ✅ **30 provinsi masuk**, **412 kab/kota**. Alat: `alat/buat-agama-dalam-angka.js` | ✅ | ✅ | 10 Okt 2026 |
| K29 | d1. 🎉 **Temuan penting:** kolom **"Kepercayaan"** ada di **7 provinsi**: Bali (119 jiwa) · Sumatera Barat (269 jiwa) · DKI Jakarta (*Aliran Kepercayaan* 385) · Jawa Barat (*Kepercayaan Lain* 3.275) · Jambi (*Lainnya* 2.221) · Sulawesi Tenggara (*Lainnya* 28) · Kalimantan Utara (*Lainnya* 0,08%). *"Tidak ada agama"* ❌ **tidak diterbitkan BPS** di provinsi mana pun. | ✅ | ✅ | 10 Okt 2026 |
| K29 | d2. **5 bug pembaca tabel diperbaiki:** ① kolom **"Kristen"** tidak dikenali → angka bergeser (Papua Barat Fakfak terbaca 79.177, seharusnya **95.699**); ② **tabel persen** tidak didukung (Sulbar 2024, NTT 2026) → ujinya per baris harus ~100%; ③ **desimal dipotong** (`99,85` → 99); ④ **singkatan nama provinsi** ("D.I. Yogyakarta") tidak dikenali; ⑤ alias "yogyakarta" terlalu longgar → **Kota Yogyakarta** ikut terbaca sebagai baris provinsi. | ✅ | ✅ | 10 Okt 2026 |
| K29 | d3. **Validasi cadangan** — kalau BPS mengosongkan baris total provinsi ("..."), pengujian memakai **jumlah penduduk provinsi** dari `data/penduduk.js` dengan toleransi 15% (tahun tabel agama dan tahun data penduduk berbeda). Dipakai untuk **Papua Tengah 2024**. | ✅ | ✅ | 10 Okt 2026 |
| K29 | e. Naikkan penanda versi `index.html` (aturan B13) → `?v=20261010-09` | ✅ | ✅ | 10 Okt 2026 |
| K29 | f. Uji PC (1440×900) + HP (390×844) — **30 provinsi/412 kab/kota termuat · 0 jumlah tidak cocok**. Panel diuji: Papua Tengah (5 baris) · Papua Pegunungan (5) · Papua Barat (6) · Bali (7) — **0 meluber** di PC maupun HP, 0 galat konsol | ✅ | ✅ | 10 Okt 2026 |

### B. ANTREAN KERJA
_(kosong — belum ada order yang disetujui)_

> 📌 **BESOK MULAI DARI SINI (catatan 9 Okt 2026, malam):**
> 1. **K23 k4** — coba publikasi **"Kalimantan Timur Dalam Angka"** (PDF) di `kaltim.bps.go.id/id/publication` → cari tabel agama per kab/kota. Kalau berhasil, lanjut provinsi lain dengan cara sama.
> 2. **K23 k5** — jalur cadangan: publikasi SP2010 BPS Pusat (provinsi saja).
> 3. **Uji di HP oleh Bapak** yang masih menunggu: K03 f · K16 e · K18 f · K19 e · K20 f · K21 e · K23 l · K24 e · **K25 e**.
> 4. ⚠️ **Jangan ulangi pemindaian BPS Pusat / Dukcapil pusat** — sudah habis (aturan B14).

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
| **K01** | **Data wilayah Indonesia lengkap** — 38 provinsi · 514 kab/kota · 7.285 kecamatan · 83.762 desa/kelurahan. Sumber **Kepmendagri No. 300.2.2-2430 Tahun 2025** (kode & nama) + **BIG** (koordinat). Disimpan di `data/wilayah/`. Dikerjakan sebagai **K08 e**; diperiksa ulang 9 Okt 2026 — jumlah persis sama | 2 Okt 2026 |
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
