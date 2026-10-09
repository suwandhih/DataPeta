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
| 🗺️ **Provinsi** di peta | Klik wilayah → muncul nama provinsi |
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
| 🟫 **Segitiga jingga** | Gunung / puncak (nama & tinggi muncul saat di-zoom) |
| 〰️ **Garis biru muda** | Sungai |
| 💧 **Bidang biru muda bening** | Danau |
| ⬜ **Garis putih** | Batas provinsi (bisa diklik) |
| ⚪ **Bulatan putih berisi huruf** | Data lokasi Bapak (bisa diklik) |
| 🌫️ **Garis putih tipis** | Negara tetangga |
| 🟡 **Tulisan kuning muda** | Nama pulau |
| 🟣 **Titik ungu muda** | Suku bangsa (muncul saat di-zoom) |

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
