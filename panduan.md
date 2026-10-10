# 📘 panduan.md — CARA PAKAI **PETA INDONESIA**

> Panduan ini untuk **Bapak** — ditulis dengan **bahasa biasa**, bukan bahasa teknis.
> Tujuannya: supaya Bapak bisa memakai aplikasinya **tanpa perlu bertanya**.

---

## 0. 📌 Status sekarang

**Antarmuka peta sudah ada (Tahap 1).** Bapak sudah bisa membukanya dan mencoba.
Peta sudah memakai **bentuk Indonesia asli** — **38 provinsi lengkap** (termasuk
4 provinsi baru di Papua). **Negara tetangga** juga tampil sebagai latar abu-abu
(hanya bentuk daratan, tanpa kota).

**Latar peta sekarang = CITRA SATELIT (sejak 6 Okt 2026).** Jadi yang terlihat bukan
gambar peta biasa, tapi **foto asli permukaan bumi dari satelit** — gunung, hutan,
sungai, dan laut terlihat seperti aslinya. Garis putih di atasnya = **batas provinsi**.

✅ **Peta tetap bisa dibuka tanpa internet.** Citra satelitnya sudah **disimpan di dalam
proyek** (diunduh sekali), jadi tidak perlu koneksi untuk melihat peta.
Tulisan kecil di kiri bawah peta = keterangan sumber citra.

**Susunan layar sekarang (sejak 4 Okt 2026) — 3 bagian tetap:**

```
┌──────────────────────────────────────────────────────────┐
│ [cari lokasi di peta…]  [+] [−] [⟲]  [☰ Member] [👥] [☰]  │ ← bar atas (beku)
├──────────────────────────────────────────────────────────┤
│                                                          │
│              P E T A   I N D O N E S I A                 │ ← peta (lebar penuh,
│                                                          │   tidak tertutup)
├──────────────────────────────────────────────────────────┤
│ [Semua] [Yayasan] [Sekolah] [Kesehatan] …                │ ← bar bawah (beku)
└──────────────────────────────────────────────────────────┘
```

| Bagian | Isi | Sifat |
|--------|-----|-------|
| **Bar atas** | kotak cari · tombol zoom · Member · **suku** · menu | **Beku** — tidak bergeser saat peta digeser |
| **Peta** | peta Indonesia | Selalu terlihat penuh |
| **Bar bawah** | Semua / Yayasan / Sekolah / … | **Beku** — tidak bergeser |

⚠️ Di HP, tombol **Member** dan **Suku** tampil sebagai **ikon saja** (supaya muat satu baris).

---

## 0b. 🖥️ Cara membuka aplikasi

### 🌐 Di PC dan HP — lewat internet (cara utama)

Buka alamat ini di peramban (Chrome/Edge):

> **https://suwandhih.github.io/DataPeta/**

Bisa dibuka dari **PC maupun HP**, di mana saja, asal ada internet.

### 💻 Di PC — dari berkas (tanpa internet)

1. Buka folder `C:\data\DataPeta`.
2. Klik dua kali berkas **`index.html`**.

⚠️ **Catatan:** cara dari berkas ini **hanya untuk melihat peta**. Nanti saat data
sudah di cloud, mengisi data **butuh internet** (harus lewat alamat web di atas).

### Yang bisa dicoba sekarang

| Bagian | Kegunaan |
|--------|----------|
| 🔍 **Kotak pencarian** (bar atas, paling kiri) | Ketik nama lokasi → penanda menyaring |
| 📍 **Penanda bulat** di peta | Klik → muncul rincian di panel kanan |
| 🗺️ **Provinsi** di peta | Klik wilayah → muncul nama provinsi **+ jumlah penduduknya** (data resmi BPS). **Garis batasnya jadi merah** selama panel terbuka |
| 🔍 **Zoom** (bar atas, di kanan kotak cari) | Tombol **+** perbesar · **−** perkecil · **⟲** kembalikan. Bisa juga **roda mouse** (PC) atau **cubit dua jari** (HP) |
| ✋ **Geser peta** | Tahan & tarik peta (setelah di-zoom) |
| 🏷️ **Bar kategori** (paling bawah) | Klik kategori → hanya kategori itu tampil |
| 👥 **[suku]** (bar atas, setelah ☰ Member) | **Suku bangsa di peta** — klik bergantian: **Sembunyi → Sedang → Penuh** |

### 👥 Cara melihat suku bangsa di peta

1. **Perbesar peta** dulu (klik **+** minimal satu kali) — kalau peta masih kecil, suku
   tidak ditampilkan supaya peta tidak ramai.
2. Klik tombol **👥 (Suku)** di bar atas, berulang kali:

| Klik ke- | Yang muncul di peta |
|----------|---------------------|
| **1** | **Sedang** — titik ungu + **nama suku** |
| **2** | **Penuh** — titik + nama + **jumlah jiwa** + tulisan **"perkiraan"** |
| **3** | **Tidak tampil** (kembali seperti semula) |

3. **Dekatkan kursor** ke titik suku (PC) → muncul keterangan lengkap: nama suku,
   jumlah jiwa, kawasan utama, dan peringatan perkiraan.

> ⚠️ **PENTING — titik suku = PERKIRAAN.**
> Sumber resmi (BPS) **tidak menyediakan titik lokasi suku**. Jadi titik suku
> diletakkan di **ibu kota provinsi asalnya**, **bukan** lokasi persis suku.
> Karena itu setiap titik suku diberi tulisan **"perkiraan"**.
> Angka jumlah jiwa asli dari **Sensus BPS 2010** (bukan perkiraan).

> 📌 **28 suku** yang tampil adalah kelompok besar menurut BPS 2010. Beberapa di antaranya
> **kelompok gabungan** (mis. "Asal Sulawesi", "Asal Papua") — yaitu gabungan suku-suku
> kecil di wilayah itu. Jumlahnya dihitung **otomatis** dari data, tidak dikarang.
| ☰ **Member** (bar atas, kanan) | Buka daftar lokasi tersimpan — **di sini juga ada tombol Tambah Lokasi** |
| ➕ **Tambah Lokasi** (di panel Member) | Isi data lokasi baru |
| 🏷️ **Label kategori pada peta** (di panel Member) | Tombol **Tampil / Sembunyi** → menampilkan atau menyembunyikan tulisan kategori di peta |
| ✏️ **[+]** **[✎]** **[−]** (tiap member) | **[+]** tambah kategori · **[✎]** ubah data · **[−]** hapus |
| ☰ **Tombol menu** (bar atas, paling kanan) | Buka menu samping |
| ✕ **Tombol tutup** | Tutup panel / menu (bisa juga tekan `Esc`) |

### 📝 Cara mengisi data lokasi

1. Klik tombol **Member** (kanan atas).
2. Klik tombol **"+ Tambah Lokasi"** di dalam panel Member.
3. Isi: **nama**, **wilayah**, **kategori**, **bujur & lintang**, **inisial**, **keterangan**.
4. Klik **Simpan** → penanda muncul di peta.

**Cara cepat mengisi kolom Wilayah** (tidak perlu ketik manual):

| Cara | Langkah |
|------|---------|
| **Cari** | Ketik nama wilayah (mis. "bandung") → muncul daftar saran → klik salah satu |
| **Ambil dari daftar** | Klik **"Ambil dari daftar ▾"** → pilih Provinsi → Kabupaten/Kota → Kecamatan → Desa |

Setelah wilayah dipilih, kolom **Bujur & Lintang terisi sendiri** dan peta otomatis
bergerak ke wilayah itu. Klik **Bersihkan** kalau ingin mengulang.

> **Keterangan** ditulis satu per baris, format: `Nama = Isi`
> Contoh:
> ```
> Berdiri = 2015
> Bidang = Pendidikan anak
> ```

⚠️ **Penting:** data tersimpan **di perangkat ini saja**. Data di PC dan di HP **terpisah**.
Untuk memindahkan data antar perangkat, tunggu fitur cloud (sedang dikerjakan).

### 🗺️ Bentang alam di peta

Peta sudah dilengkapi **bentang alam** supaya mudah dibaca.
Sejak 6 Okt 2026 latar peta = **citra satelit**, jadi warnanya disesuaikan
supaya tetap jelas di atas foto bumi yang gelap:

| Tanda | Artinya |
|-------|---------|
| 🟫 **Segitiga jingga** | Gunung / puncak (nama & tinggi muncul saat di-zoom). **Bisa diklik** — muncul keterangan lengkap: nama, tinggi, **pulau** dan **provinsi** tempat gunung itu berada |
| 〰️ **Garis biru muda** | Sungai |
| 💧 **Bidang biru muda bening** | Danau |
| ⬜ **Garis putih** | Batas provinsi (bisa diklik) |
| ⚪ **Bulatan putih berisi huruf** | Data lokasi Bapak (bisa diklik) |
| 🌫️ **Garis putih tipis** | Negara tetangga |
| 🟡 **Tulisan kuning muda** | Nama pulau |
| 🟣 **Titik ungu muda** | Suku bangsa (muncul saat di-zoom) |

### 🖱️ Mengklik provinsi di peta

Klik salah satu **provinsi** di peta → panel kanan terbuka, berisi **jumlah penduduk**.
Ini bisa dipakai **kapan saja** — baik saat peta terlihat penuh (Sumatera sampai
Papua) **maupun saat sudah di-zoom in** ke lokasi yang lebih detail.

💡 **Tip:** kalau Bapak ingin **menggeser peta**, tekan lalu **tarik**. Kalau hanya
**ingin mengklik** provinsi, cukup **tekan lalu lepas tanpa menggeser** — aplikasi
tahu bedanya, jadi panel tetap terbuka.

### 🔴 Garis merah penanda provinsi

Kalau Bapak **klik salah satu provinsi** di peta, **garis batas provinsi itu berubah
jadi merah** — supaya Bapak tahu persis provinsi mana yang sedang dibuka.

Warnanya **kembali normal** begitu panel rincian ditutup (tombol **×**, tombol
**Escape**, atau klik di peta). Kalau Bapak klik provinsi lain, yang lama langsung
normal lagi — jadi **hanya satu** provinsi yang merah.

### 🗺️ Jumlah penduduk provinsi

Klik salah satu **provinsi** di peta → di panel kanan muncul **jumlah penduduknya**.

Contoh: klik **Jawa Barat** → *Jumlah penduduk 51.163.888 jiwa*.

Angkanya **resmi dari BPS** (Badan Pusat Statistik), bukan perkiraan. Kalau dijumlahkan
seluruh 38 provinsi, hasilnya **287.198.383 jiwa** — persis sama dengan angka resmi BPS
untuk seluruh Indonesia.

#### 🔍 Membuktikan angka itu — daftar kabupaten/kota

Di bawah angka penduduk ada tombol **"Lihat rincian N kabupaten/kota"**. Klik → muncul
**daftar semua kabupaten/kota** di provinsi itu beserta penduduknya.

Contoh **Nusa Tenggara Barat** (klik → 10 baris):

| Kabupaten/Kota | Penduduk |
|----------------|----------|
| Kabupaten Bima | 559.349 |
| Kabupaten Dompu | 258.349 |
| Kabupaten Lombok Barat | 787.339 |
| … (urut A–Z) | … |

Di bawah daftar tertulis:

> **Jumlah 10 kabupaten/kota = 5.815.328 jiwa — sama dengan angka BPS ✓**

Jadi angka yang ditampilkan **bisa dibuktikan sendiri** oleh Bapak — memang jumlah dari
seluruh kabupaten/kota di provinsi itu, bukan angka entah dari mana.

**Catatan:**
- Daftarnya **bisa dibuka-tutup** — kalau tidak perlu, tinggal ditutup lagi.
- Untuk daerah yang banyak (Jawa Timur **38** kabupaten/kota), daftarnya **bisa digulir**.
- Tulisan **"sama dengan angka BPS ✓"** itu **hasil hitungan aplikasi sendiri**, bukan
  tulisan tetap. Kalau suatu saat jumlahnya tidak cocok, aplikasi akan menulis
  **"beda N jiwa"** — jadi tidak akan pernah menipu.
- Berlaku untuk **seluruh 38 provinsi**. Sudah diuji: **38 provinsi · 514 kabupaten/kota ·
  semua cocok, selisih 0**.

### 🏙️ Jumlah penduduk kabupaten/kota

Saat Bapak **memilih wilayah** di form (mau tambah lokasi), muncul kotak biru berisi
**jumlah penduduk wilayah itu**.

Contoh: pilih **Kota Bogor** → *"Kabupaten/kota ini berpenduduk **1.089.179** jiwa
(sumber: BPS)"*.

Kotak ini juga muncul saat Bapak menambah/ubah data lewat menu **Member**
(tombol **[+]** dan **[✎]**) — jadi Bapak langsung tahu jumlah penduduk kotanya.

Semua **514 kabupaten/kota** sudah ada angkanya. Kalau dijumlahkan, hasilnya
**287.198.383 jiwa** — **persis sama** dengan angka resmi BPS untuk seluruh Indonesia.

⚠️ **Catatan:** angka ini baru **jumlah penduduk**. Data **agama** per kabupaten/kota
ada di bagian **🕌 Agama penduduk kabupaten/kota** di bawah.

### 🕌 Agama penduduk kabupaten/kota

Kalau wilayah yang Bapak pilih **sudah ada datanya**, muncul kotak **hijau** berisi
**jumlah penduduk menurut agama** untuk wilayah itu.

Contoh: pilih **Kota Medan** → kotak hijau menampilkan *Islam 1.641.401 jiwa ·
Protestan 478.387 jiwa · Katolik 63.276 jiwa · Hindu 10.945 jiwa · Budha 220.770 jiwa ·
Konghucu 406 jiwa*.

Kotak ini muncul **bersamaan** dengan kotak jumlah penduduk biru — termasuk saat
Bapak menambah/ubah data lewat menu **Member** (tombol **[+]** dan **[✎]**).

⚠️ **Penting — data agama belum lengkap.** Sudah **30 provinsi** tersedia
(**412 dari 514** kabupaten/kota):

| Provinsi | Tahun data | Kab/kota | Satuan |
|----------|-----------|----------|--------|
| DKI Jakarta | 2024 | 6 | jiwa |
| Sumatera Utara | 2025 | 33 | jiwa |
| Sulawesi Utara | 2018 | 15 | jiwa |
| Sulawesi Tenggara | 2022 | 17 | jiwa |
| Kalimantan Utara | 2021 | 5 | persen |
| Jawa Barat | 2023 | 27 | jiwa |
| Jawa Tengah | 2023 | 35 | persen |
| Jambi | 2022 | 11 | jiwa |
| Sumatera Selatan | 2022 | 17 | jiwa |
| Aceh | 2026 | 23 | jiwa |
| Sumatera Barat | 2026 | 19 | jiwa |
| Lampung | 2026 | 15 | jiwa |
| Kepulauan Bangka Belitung | 2026 | 7 | jiwa |
| Kepulauan Riau | 2026 | 7 | jiwa |
| Bali | 2026 | 9 | jiwa |
| Kalimantan Barat | 2026 | 14 | jiwa |
| Kalimantan Tengah | 2026 | 14 | jiwa |
| Kalimantan Selatan | 2026 | 13 | jiwa |
| Sulawesi Selatan | 2026 | 24 | jiwa |
| Gorontalo | 2026 | 6 | jiwa |
| Maluku | 2026 | 11 | jiwa |
| Maluku Utara | 2026 | 10 | jiwa |
| **D.I. Yogyakarta** | 2025 | 5 | jiwa |
| **Banten** | 2025 | 8 | jiwa |
| **Kalimantan Timur** | 2024 | 10 | jiwa |
| **Sulawesi Barat** | 2024 | 6 | persen |
| **Nusa Tenggara Timur** | 2026 | 22 | persen |
| **Papua Barat** | 2026 | 7 | jiwa |
| **Papua Tengah** | 2024 | 8 | jiwa |
| **Papua Pegunungan** | 2025 | 8 | jiwa |

Jumlahnya **412 dari 514 kabupaten/kota**. Kalau wilayah yang Bapak pilih belum ada
datanya, **kotak hijau tidak muncul** — itu memang **belum ada**, bukan rusak.

Kenapa belum lengkap? **BPS Pusat tidak menerbitkan data agama sampai kabupaten/kota.**
Yang menerbitkan hanya **BPS provinsi**, dan itupun **tidak semua provinsi**. Cara
mendapatkannya: mengunduh buku **"Provinsi Dalam Angka"** (PDF resmi BPS) lalu membaca
tabelnya otomatis. Sebagian provinsi tidak menerbitkan tabelnya di edisi terbaru,
tetapi **ada di edisi lama** — itu sudah diperiksa sampai edisi 2018.

**8 provinsi benar-benar belum ada** tabelnya: Riau · Bengkulu · Jawa Timur ·
Nusa Tenggara Barat · Sulawesi Tengah · Papua · Papua Selatan · Papua Barat Daya.
Untuk 8 provinsi ini **11 jalur sudah dicoba dan semuanya habis** (semua edisi
"Dalam Angka" 2018–2026 · halaman tabel BPS · publikasi BPS · Dukcapil provinsi ·
Kemenag · BPS Sensus · Perpustakaan BPS · API BPS · data.go.id · subdomain BPS
provinsi baru · pencarian publikasi provinsi baru). **Papua Selatan & Papua Barat Daya**
tabelnya ada, tetapi **isinya masih "..."** — BPS belum mengisi angkanya.

Sisanya harus dicari ke Dinas Dukcapil tiap kabupaten/kota (±500 situs, format tidak
seragam) — akan **dicicil** sedikit demi sedikit.

Sesuai aturan proyek, angka yang belum ada **tidak dikarang** dan **tidak ditaksir**.

#### 🕊️ Pilihan "tidak ada agama" dan "kepercayaan"

| Pilihan | Ada di BPS? |
|---|---|
| **"Tidak ada agama"** | ❌ **TIDAK ADA.** BPS tidak menerbitkan jumlah penduduk tanpa agama. |
| **"Kepercayaan"** | ✅ **ADA**, tapi tidak semua provinsi. Yang punya kolomnya: **Bali** (119 jiwa) · **Sumatera Barat** (269 jiwa) · **DKI Jakarta** (*Aliran Kepercayaan* 385 jiwa) · **Jawa Barat** (*Kepercayaan Lain* 3.275 jiwa) · **Jambi** (*Lainnya* 2.221 jiwa) · **Sulawesi Tenggara** (*Lainnya* 28 jiwa) · **Kalimantan Utara** (*Lainnya* 0,08 %). |

⚠️ Nama kolomnya berbeda-beda antarprovinsi (*Kepercayaan*, *Aliran Kepercayaan*,
*Kepercayaan Lain*, *Lainnya*). Kolom *"Lainnya"* tidak dijelaskan BPS apakah murni
kepercayaan — jadi **ditampilkan apa adanya** dengan nama aslinya, tidak ditafsirkan.

#### Bagaimana angka agama ini bisa dipercaya?

Setiap tabel BPS punya **baris total provinsi** di paling bawah. Jumlah angka semua
kabupaten/kota **harus sama** dengan baris total itu. Kalau tidak sama, tabelnya
dibuang. Jadi angka yang tampil sudah **terbukti dari dokumen BPS itu sendiri**.

Contoh **Bali** — cocok persis dengan PDF halaman 262–263:

| Kabupaten/Kota | Islam | Katolik | Protestan | Hindu | Budha | Konghucu | Kepercayaan | Jumlah |
|---|---|---|---|---|---|---|---|---|
| Jembrana | 88.752 | 2.690 | 4.225 | 234.213 | 972 | 17 | 4 | **330.873** |
| Denpasar | 152.473 | 16.499 | 36.265 | 455.056 | 15.696 | 353 | 41 | **676.383** |
| **Bali** | 452.232 | 38.003 | 77.566 | 3.790.611 | 29.962 | 625 | **119** | **4.389.118** |

### 🕌 Agama penduduk provinsi (saat provinsi diklik di peta)

Kalau Bapak **klik provinsi di peta**, panel kanan menampilkan **jumlah penduduk**
provinsi itu. Untuk **30 provinsi yang sudah ada datanya**, di bawahnya muncul kotak
hijau berisi **agama penduduk provinsi** — dijumlahkan dari seluruh kabupaten/kota
di provinsi itu.

Contoh: klik **Jawa Barat** → *Islam 48.581.396 jiwa · Kristen 883.850 jiwa ·
Katolik 303.633 jiwa · Hindu 17.356 jiwa · Budha 98.232 jiwa · Konghucu 12.250 jiwa ·
Kepercayaan Lain 3.275 jiwa* (jumlah 27 kab/kota).

⚠️ **Perhatikan bedanya:**

| Provinsi | Yang ditampilkan | Kenapa |
|----------|------------------|--------|
| Jawa Barat, DKI Jakarta, Sumatera Utara, Jambi, Sumatera Selatan, Sulawesi Utara, Sulawesi Tenggara | **Jumlah** (jiwa) | Tabel BPS-nya dalam satuan **jiwa** → bisa dijumlahkan |
| Jawa Tengah, Kalimantan Utara, Sulawesi Barat, Nusa Tenggara Timur | **Rata-rata** (%) | Tabel BPS-nya dalam satuan **persen** → persen tidak bisa dijumlahkan, jadi dirata-ratakan |

Judul kotak hijau selalu menyebut mana yang dipakai — *"Jumlah penduduk menurut agama"*
atau *"Rata-rata penduduk menurut agama"* — supaya tidak salah paham.

Untuk **8 provinsi yang belum ada datanya**, kotak hijau **tidak muncul** — hanya
jumlah penduduknya saja. Itu memang belum ada, bukan rusak.

### ⭐ Ibu kota provinsi di peta (tampil permanen)

**38 ibu kota provinsi** selalu tampil di peta — **tidak hilang** walau peta
diperkecil sampai seluruh Indonesia terlihat.

| Bagian | Keterangan |
|--------|------------|
| **Tanda** | **Bintang kuning ⭐** di titik ibu kota |
| **Nama** | Nama ibu kota, contoh: **⭐ Bandung** |
| **Kapan tampil** | **Selalu** — di semua tingkat zoom |
| **Ukuran huruf** | **Tetap** — tidak ikut membesar saat peta di-zoom |

**Contoh 38 ibu kota:** Banda Aceh, Medan, Padang, Pekanbaru, Jambi, Palembang,
Bengkulu, Bandar Lampung, Pangkalpinang, Tanjungpinang, **Jakarta**, Bandung,
Semarang, Yogyakarta, Surabaya, Serang, Denpasar, Mataram, Kupang, Pontianak,
Palangka Raya, Banjarbaru, Samarinda, Tanjung Selor, Manado, Palu, Makassar,
Kendari, Gorontalo, Mamuju, Ambon, Sofifi, Jayapura, Manokwari, Merauke, Nabire,
Wamena, Sorong.

💡 **Tip:** nama ibu kota **tidak akan menutupi** nama kota lain, nama gunung,
penanda lokasi Bapak, maupun nama pulau — tempatnya diatur otomatis.

📌 **Nama selalu rapat ke bintangnya** (± 12 piksel) pada **semua** tingkat zoom.
Jadi nama tidak pernah "nyasar" ke pulau sebelah. Kalau tempat itu sudah penuh,
aplikasi memindahkannya dengan urutan ini:

1. **sisi lain bintang yang sama** (atas / bawah / kiri / kanan), lalu
2. **sisi sudut** (kanan-atas, kanan-bawah, kiri-atas, kiri-bawah), baru
3. **jaraknya ditambah sedikit** — **3 piksel**, lalu 6 dan 10 piksel kalau masih penuh.

Aplikasi **selalu** memilih yang paling dekat lebih dulu. Jadi meskipun penuh,
pergeseran nama tidak pernah lebih dari **± 20 piksel** dari bintangnya.

⚠️ Kalau bintangnya sendiri **keluar dari layar** (kota itu sedang tidak terlihat),
namanya **ikut disembunyikan** — supaya tidak ada nama yang tampil sendirian
jauh dari kotanya.

📚 **Sumber nama & koordinat:** Wikipedia bahasa Indonesia — lihat bagian
**1b. 📚 Dari mana datanya?**

### 🏙️ Nama kota di peta

Nama kota **muncul sendiri** sesuai tingkat zoom:

| Kondisi | Yang tampil |
|---------|-------------|
| **Zoom keluar** (seluruh Indonesia) | Hanya **kota besar** — Jakarta, Surabaya, Bandung, Medan |
| **Zoom masuk** | **Kota kecil** mulai muncul (Denpasar, Pontianak, Ambon, …) |
| **Zoom paling dekat** | **Semua 105 kota** tampil |

💡 **Tip:** kalau nama kota terasa terlalu ramai, cukup **perkecil** (klik **−**).

### ☁️ Cara pindah data PC ↔ HP

Buka **menu** (☰ kanan atas), lalu:

1. **↑ Kirim ke Awan** — mengirim data perangkat ini ke awan.
2. **↓ Ambil dari Awan** — mengambil data dari awan ke perangkat ini.

**Contoh:**
- Di **PC**: klik **Kirim ke Awan**
- Di **HP**: klik **Ambil dari Awan** → data dari PC masuk ke HP

✅ **Aman:** data yang sudah ada **tidak dobel** — hanya yang baru / lebih baru yang masuk.

⚠️ **Butuh internet** untuk kedua tombol ini. Tanpa internet, aplikasi tetap bisa dipakai (data lokal).

⚠️ **Catatan:** data yang tampil sekarang **data contoh** (untuk uji tampilan),
bukan data asli. Data asli akan diisi Bapak sendiri nanti.

---

## 1. 📂 Apa saja isi folder ini?

| Berkas | Untuk siapa | Isi |
|--------|-------------|-----|
| 📋 **CHANGELOG.md** | Bapak | Rekam semua kejadian: apa yang berubah, kapan |
| 📖 **panduan.md** | Bapak | Berkas yang sedang Anda baca |
| 🧩 **prompt.md** | Bapak / AI lain | Konsep proyek, supaya bisa dibangun ulang |
| 📖 **rencanakerja.md** | Bapak + AI | Papan rencana: apa yang sudah & belum |
| 🤖 **agents.md** | AI | Aturan main untuk AI |
| 📝 **catatanAI.md** | AI | Tempat sementara catatan AI |
| 💾 **backups/** | Semua | Cadangan berkas, supaya tidak hilang |
| 📊 **data/penduduk.js** | Aplikasi | Jumlah penduduk 38 provinsi + 514 kab/kota (sumber: BPS) |
| 🕌 **data/agama.js** | Aplikasi | Agama per kabupaten/kota (sumber: BPS provinsi; sudah 30 provinsi) |

---

## 1b. 📚 Dari mana datanya? (referensi sumber)

Semua data di aplikasi ini **diambil dari sumber resmi**, bukan dikarang dan bukan
ditaksir. Berikut daftarnya supaya Bapak (dan siapa pun yang mempelajari aplikasi ini)
tahu **asal setiap angka**.

### 🗺️ Peta

| Bagian peta | Sumber | Keterangan |
|-------------|--------|------------|
| **Latar peta (citra satelit)** | **Esri World Imagery** | Foto asli permukaan bumi. Gratis, **tanpa kunci API**. Diunduh **sekali** lewat `alat/unduh-citra-satelit.py` → disimpan jadi `data/citra-satelit.jpg` (8192 × 3277 px). Sesudah itu **tidak perlu internet** untuk melihat peta. |
| **Batas 38 provinsi** | **BIG** (Badan Informasi Geospasial) | Lewat `github.com/ardian28/GeoJson-Indonesia-38-Provinsi`. Disimpan jadi `data/peta-indonesia.js`. |
| **Batas negara tetangga** | **Natural Earth** | Domain publik. Disimpan jadi `data/negara-dunia.js`. |
| **Nama pulau** | **Natural Earth** | Disimpan jadi `data/pulau.js`. |
| **Sungai, danau, gunung** | **Natural Earth** | Disimpan jadi `data/sungai.js`, `data/danau.js`, `data/gunung.js`. |
| **Nama kota** | **Natural Earth** | Disimpan jadi `data/kota-indonesia.js`. |
| **38 ibu kota provinsi** (⭐ tampil permanen di peta) | **Wikipedia bahasa Indonesia** | Artikel *"Daftar ibu kota provinsi di Indonesia"* + artikel tiap ibu kota. Disimpan jadi `data/ibu-kota.js`. Nama **dan** koordinatnya dari sumber yang sama. |
| **Suku bangsa** | **BPS** (Sensus Penduduk 2010) | Disimpan jadi `data/suku.js`. ⚠️ Titiknya **perkiraan** — ditempelkan ke ibu kota provinsi asal, karena sumber koordinat asli belum ada. |
| **Daftar wilayah** (38 prov · 514 kab/kota · 7.285 kec · 83.762 desa) | **Kepmendagri 2025** + **BIG** | Disimpan di `data/wilayah/`. |

### 👥 Jumlah penduduk

| Data | Sumber | Keterangan |
|------|--------|------------|
| **38 provinsi** | **BPS** — tabel *"Penduduk, Laju Pertumbuhan Penduduk, Distribusi Persentase Penduduk, Kepadatan Penduduk, Rasio Jenis Kelamin Penduduk Menurut Provinsi, 2026"* | Angka resmi BPS. |
| **514 kabupaten/kota** | **BPS** — tabel *"Jumlah Penduduk menurut Kabupaten/Kota dan Kelompok Umur"* | Angka resmi BPS. |
| **Seluruh Indonesia** | **BPS** | **287.198.383 jiwa**. |

📁 Disimpan sebagai **`data/penduduk.js`** · dibuat lewat **`alat/buat-penduduk.js`** ·
angka mentah apa adanya di **`alat/bps-penduduk-2026.json`**.

✅ **Bukti cocok:** kalau 38 provinsi dijumlahkan → **287.198.383** · kalau 514
kabupaten/kota dijumlahkan → **287.198.383**. Dua-duanya **persis sama** dengan angka
resmi BPS untuk seluruh Indonesia (selisih **0**).

### 🕌 Agama

| Data | Sumber | Keterangan |
|------|--------|------------|
| **Agama per kabupaten/kota** | **BPS PROVINSI** (bukan BPS Pusat) | BPS Pusat **tidak** menerbitkan agama sampai kabupaten/kota. Yang menerbitkan hanya BPS provinsi, dan tidak semua. |

📁 Disimpan sebagai **`data/agama.js`** · dibuat lewat **`alat/buat-agama.js`** dan
**`alat/buat-agama-dalam-angka.js`** · angka mentah apa adanya di
**`alat/bps-agama-mentah.txt`**.

Sudah **30 provinsi** yang tersedia (**412 dari 514** kabupaten/kota):

| Provinsi | Tahun | Tabel BPS | Tautan |
|----------|-------|-----------|--------|
| DKI Jakarta | 2024 | *Jumlah Penduduk Menurut Agama dan Kabupaten/Kota di Provinsi DKI Jakarta* | [jakarta.bps.go.id](https://jakarta.bps.go.id/id/statistics-table/2/ODQ0IzI=/jumlah-penduduk-menurut-agama-dan-kabupaten-kota-di-provinsi-dki-jakarta.html) |
| Sumatera Utara | 2025 | *Jumlah Penduduk Menurut Kabupaten/Kota dan Agama yang Dianut* | [sumut.bps.go.id](https://sumut.bps.go.id/id/statistics-table/2/ODA0IzI=/jumlah-penduduk-menurut-kabupaten-kota-dan-agama-yang-dianut.html) |
| Sulawesi Utara | 2018 | *Jumlah Penduduk Menurut Kabupaten/Kota dan Agama di Provinsi Sulawesi Utara (Jiwa)* | [sulut.bps.go.id](https://sulut.bps.go.id/id/statistics-table/2/NjE3IzI=/jumlah-penduduk-menurut-kabupaten-kota-dan-agama-di-provinsi-sulawesi-utara--jiwa-.html) |
| Sulawesi Tenggara | 2022 | *Jumlah Penduduk Menurut Kabupaten/Kota dan Agama yang Dianut di Provinsi Sulawesi Tenggara, 2022* | [sultra.bps.go.id](https://sultra.bps.go.id/id/statistics-table/1/NDUwNCMx/jumlah-penduduk-menurut-kabupaten-kota-dan-agama-yang-dianut-di-provinsi-sulawesi-tenggara--2022.html) |
| Kalimantan Utara | 2021 | *Persentase Penduduk Menurut Agama yang Dianut (Persen)* | [kaltara.bps.go.id](https://kaltara.bps.go.id/id/statistics-table/2/NDYyIzI=/persentase-penduduk-menurut-agama-yang-dianut--persen-.html) |
| Jawa Barat | 2023 | *Jumlah Penduduk dan Agama Yang Dianut (Jiwa)* | [jabar.bps.go.id](https://jabar.bps.go.id/id/statistics-table/2/MzM1IzI=/jumlah-penduduk-dan-agama-yang-dianut--jiwa-.html) |
| Jawa Tengah | 2023 | *Persentase Penduduk Menurut Agama yang Dianut (Persen)* | [jateng.bps.go.id](https://jateng.bps.go.id/id/statistics-table?subject=519&keyword=agama) |
| Jambi | 2022 | *Jumlah Penduduk Menurut Agama yang Dianut (Jiwa)* | [jambi.bps.go.id](https://jambi.bps.go.id/id/statistics-table?subject=519&keyword=agama) |
| Sumatera Selatan | 2022 | *Jumlah Penduduk Menurut Agama di Sumatera Selatan Tahun 2019-2022* | [sumsel.bps.go.id](https://sumsel.bps.go.id/id/statistics-table?subject=519&keyword=agama) |

**21 provinsi berikutnya** diambil dari buku **"Provinsi Dalam Angka"** (PDF resmi BPS)
— tabel *"Jumlah Penduduk Menurut Agama dan Kabupaten/Kota"*:

| Provinsi | Tahun | Kab/kota | Provinsi | Tahun | Kab/kota |
|---|---|---|---|---|---|
| Aceh | 2026 | 23 | Kalimantan Barat | 2026 | 14 |
| Sumatera Barat | 2026 | 19 | Kalimantan Tengah | 2026 | 14 |
| Lampung | 2026 | 15 | Kalimantan Selatan | 2026 | 13 |
| Kepulauan Bangka Belitung | 2026 | 7 | Sulawesi Selatan | 2026 | 24 |
| Kepulauan Riau | 2026 | 7 | Gorontalo | 2026 | 6 |
| Bali | 2026 | 9 | Maluku | 2026 | 11 |
| D.I. Yogyakarta | 2025 | 5 | Maluku Utara | 2026 | 10 |
| Banten | 2025 | 8 | Sulawesi Barat | 2024 | 6 |
| Kalimantan Timur | 2024 | 10 | Nusa Tenggara Timur | 2026 | 22 |
| Papua Barat | 2026 | 7 | Papua Tengah | 2024 | 8 |
| Papua Pegunungan | 2025 | 8 | | | |

📄 PDF-nya disimpan di folder **`catat/pdf-agama/`** (±60 berkas — tidak diunggah ke
GitHub). Alat pembacanya: **`alat/baca-agama-dalam-angka.py`**.

🎉 **Papua Tengah & Papua Pegunungan** ternyata tabelnya ada di buku **"Provinsi Papua
Dalam Angka"** (provinsi hasil pemekaran belum punya buku sendiri).

⚠️ **Perhatikan:** tahun datanya **berbeda-beda** (2018–2026) dan **4 provinsi**
satuannya **persen**, bukan jiwa (Jawa Tengah · Kalimantan Utara · Sulawesi Barat ·
Nusa Tenggara Timur). Jadi angka antarprovinsi **tidak bisa dibandingkan langsung**.

⚠️ **Catatan jujur:** di tabel Sulawesi Tenggara, baris **total provinsi** dari BPS
**tidak sama** dengan penjumlahan baris kabupaten/kotanya (selisih 58.737 jiwa).
Yang dipakai di aplikasi adalah **angka BPS apa adanya** — tidak diperbaiki sendiri.

### ☁️ Penyimpanan data isian

| Bagian | Sumber / alat |
|--------|---------------|
| **Data lokal (di perangkat)** | **IndexedDB** — tersimpan di PC/HP Bapak sendiri |
| **Titipan awan** | **Layerbase** (database SQLite) lewat perantara **Cloudflare Worker** `peta-api` |

---

## 2. 🔍 Kalau Bapak mau tahu "sudah sampai mana?"

Buka **`rencanakerja.md`**. Di bagian paling atas ada **papan order**, yang isinya:

| Tanda | artinya |
|-------|---------|
| ✅ | **Sudah selesai** |
| ⬜ | **Belum** |
| 🔨 | **Sedang dikerjakan** |
| ⚠️ | **Ada masalah** |

Bisa juga langsung tanya AI: *"papan"* — lalu AI beri ringkasan singkat.

---

*Panduan ini dibuat 30 September 2026 · status: baru mulai*
