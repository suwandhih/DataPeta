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
| K23 | l. Uji di HP (oleh Bapak) | ⬜ | ⬜ | — |

| **K24** | **🐛 Klik provinsi tidak jalan saat di-zoom in** (temuan Bapak, 9 Okt 2026) — *"jumlah penduduk ada bug · berfungsi jika peta terlihat full sumatera sampai papua · tapi jika di zoom in untuk detail lokasi tidak berfungsi"* | | | |
| K24 | a. **Dinilai:** `svg.setPointerCapture()` dijalankan saat pointer **ditekan**, padahal penangkapan hanya perlu saat **menggeser**. Akibatnya klik singkat ikut "tertangkap" peta → tidak sampai ke wilayah | ✅ | ✅ | 9 Okt 2026 |
| K24 | b. Sebab tambahan: geser hanya aktif saat zoom > 1 → **kenapa bug-nya hanya muncul saat zoom in** | ✅ | ✅ | 9 Okt 2026 |
| K24 | c. Perbaikan: penangkapan kursor dilakukan **setelah benar-benar menggeser** (≥ 5 piksel), bukan saat menekan | ✅ | ✅ | 9 Okt 2026 |
| K24 | d. Uji PC + HP (oleh AI) — 12 uji, 0 gagal | ✅ | ✅ | 9 Okt 2026 |
| K24 | e. Uji di HP (oleh Bapak) | ⬜ | ⬜ | — |

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
