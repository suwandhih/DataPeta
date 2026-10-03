# 📘 panduan.md — CARA PAKAI **PETA INDONESIA**

> Panduan ini untuk **Bapak** — ditulis dengan **bahasa biasa**, bukan bahasa teknis.
> Tujuannya: supaya Bapak bisa memakai aplikasinya **tanpa perlu bertanya**.

---

## 0. 📌 Status sekarang

**Antarmuka peta sudah ada (Tahap 1).** Bapak sudah bisa membukanya dan mencoba.
Peta sudah memakai **bentuk Indonesia asli** — **38 provinsi lengkap** (termasuk
4 provinsi baru di Papua). **Negara tetangga** juga tampil sebagai latar abu-abu
(hanya bentuk daratan, tanpa kota).

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
| 🔍 **Kotak pencarian** (kiri atas) | Ketik nama lokasi → penanda menyaring |
| 📍 **Penanda bulat** di peta | Klik → muncul rincian di panel kanan |
| 🗺️ **Provinsi** di peta | Klik wilayah → muncul nama provinsi |
| 🔍 **Zoom** (kanan) | Tombol **+** perbesar · **−** perkecil · **⟲** kembalikan. Bisa juga **roda mouse** (PC) atau **cubit dua jari** (HP) |
| ✋ **Geser peta** | Tahan & tarik peta (setelah di-zoom) |
| 🏷️ **Bar kategori** (bawah) | Klik kategori → hanya kategori itu tampil |
| ☰ **Member** (kanan atas) | Buka daftar lokasi tersimpan — **di sini juga ada tombol Tambah Lokasi** |
| ✏️ **Ubah / Hapus** (di daftar Member) | Ubah atau hapus data lokasi langsung dari daftar |
| ☰ **Tombol menu** (kanan atas) | Buka menu samping |
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

### �️ Bentang alam di peta

Peta sudah dilengkapi **bentang alam** supaya mudah dibaca:

| Tanda | Artinya |
|-------|---------|
| 🟫 **Segitiga coklat** | Gunung / puncak (nama & tinggi muncul saat di-zoom) |
| 〰️ **Garis biru** | Sungai |
| 💧 **Bidang biru muda** | Danau |
| ⬜ **Kotak abu-abu** | Provinsi (bisa diklik) |
| ⚪ **Bulatan putih berisi huruf** | Data lokasi Bapak (bisa diklik) |
| 🌫️ **Pucat di pinggir** | Negara tetangga |

### �🏙️ Nama kota di peta

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

| Nama | Untuk siapa | Isinya |
|------|-------------|--------|
| 📋 **CHANGELOG.md** | Bapak | Rekam semua kejadian: apa yang berubah, kapan |
| 📖 **panduan.md** | Bapak | Berkas yang sedang Anda baca |
| 🧩 **prompt.md** | Bapak / AI lain | Konsep proyek, supaya bisa dibangun ulang |
| 📖 **rencanakerja.md** | Bapak + AI | Papan rencana: apa yang sudah & belum |
| 🤖 **agents.md** | AI | Aturan main untuk AI |
| 📝 **catatanAI.md** | AI | Tempat sementara catatan AI |
| 💾 **backups/** | Semua | Cadangan file, supaya tidak hilang |

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
