# 📋 CHANGELOG.md — **PETA INDONESIA**

> Rekam **semua kejadian** di aplikasi: apa yang berubah, kapan, dan kenapa.
> Ini untuk **Bapak** — supaya tahu riwayat aplikasi tanpa perlu technical.

---

## 3 Oktober 2026 — 🔒 **PERBAIKAN K14: [+] KUNCI WILAYAH · TOMBOOL HAPUS GANDA DIBUANG**

**Catatan Bapak:** *"klik [+] > seharusnya wilayah tidak bisa diganti.. karena head adalah wilayah"* ·
*"klik [✎] > mengapa ada double"* · *"masih di edit [✎] → [hapus][batal][simpan] bukannya [-] adalah hapus??"*

**1. Tombol [+] — Wilayah kini DIKUNCI**
- Sebelumnya wilayah masih bisa diubah walau membuka form dari baris kota.
- Sekarang: wilayah & titik **mengikuti kota** (abu-abu, tidak bisa diketik);
  tombol "Ambil dari daftar" & "Bersihkan" **disembunyikan**.
- Judul form: **"Tambah Member Baru"**.
- Bapak hanya mengisi: **nama, kategori, inisial, keterangan**.

**2. Tombol Hapus yang dobel di form — DIBUANG**
- Form Ubah sebelumnya punya tombol **[Hapus]**, padahal **hapus sudah ada di tombol [−] baris kota**.
- Tombol **[Hapus] di form dihapus** — sekarang form hanya punya **[Batal] [Simpan]**.
- Jadi jelas: **hapus = tombol [−] di baris kota**.

**3. Baris pilihan member dibuat lebih jelas**
- Diberi **panah ›** (untuk [✎]) dan **✕** (untuk [−]) sebagai tanda baris bisa diklik.
- Ditambah keterangan pada daftar member: *"Tombol [+] tambah member baru · [✎] ubah · [−] hapus"*.

**Hasil uji:** [+] → wilayah **terkunci** (readOnly + dropdown tersembunyi) ✅ ·
judul "Tambah Member Baru" ✅ · tombol Hapus form **sudah tidak ada** ✅ ·
[+] isi "yayasan ABC" → Simpan → kota jadi **(2)** ✅ · [✎] → daftar pilih dengan panah **›** ✅ ·
pilih → form ubah terbuka, **wilayah terkunci**, hanya **[Batal] [Simpan]** ✅ ·
[−] → daftar pilih dengan panah **✕** ✅ · pilih "yayasan ABC" → terhapus, kota kembali **(1)** ✅ ·
tanpa error ✅

---

## 3 Oktober 2026 — 🏙️ **TOMBOOL PINDAH KE BARIS KOTA (K14)**

**Order Bapak:** *"penempatan [+] [✎] [-] seharusnya di Balikpapan, Kalimantan Timur.
klik [+] ada penambahan daftar label pada wilayah Balikpapan Kalimantan Timur.
klik [✎] atau [-] di dalam daftar user memilih label yg mana mau di edit atau hapus"* ·
*"1 wilayah banyak label kategori... bukankah seharusnya data seperti ini?"*

**Susunan baru daftar Member:**

```
● Balikpapan, Kalimantan Timur (3)        [+][✎][−]
   - Yayasan Bumi Lestari - Yayasan
   - Komunitas Nelayan Pesisir - Sosial
   - Sekolah Paud - Sekolah

● Bandung, Jawa Barat (1)                 [+][✎][−]
   - SD Harapan Bangsa - Sekolah
```

| Tombol | Letak | Fungsi |
|--------|-------|--------|
| **[+]** | baris **kota** | Tambah member baru — form terbuka, **wilayah + titik kota sudah terisi** |
| **[✎]** | baris **kota** | Muncul **daftar isi kota** → pilih member mana yang mau diubah |
| **[−]** | baris **kota** | Muncul **daftar isi kota** → pilih member mana yang mau dihapus |

**Yang diubah:**
- Tombol `[+][✎][−]` **dipindah** dari baris member → **baris kota**.
- Baris member kini **bersih**: hanya `- Nama - Kategori` (tanpa tombol).
- Fitur **banyak label per member** (chip "Yayasan · Sosial") **dibuang** — cukup
  **1 kategori per member**, diatur di form. Ini sesuai contoh Bapak.
- Tombol **👁 Label kategori pada peta** & **👁 Judul kota di daftar** tetap di atas.

**Hasil uji:** tombol pindah ke baris kota (24 tombol / 8 kota, 0 di member) ✅ ·
baris member bersih `- Nama` / `Yayasan` ✅ · **[−]** muncul daftar pilih hapus ✅ ·
**[✎]** muncul daftar pilih ubah ✅ · pilih member → form ubah terbuka & **wilayah terkunci** ✅ ·
**[+]** → form terbuka dengan **wilayah + titik kota terisi** ✅ · isi "Sekolah Paud" → Simpan →
kota Balikpapan jadi **(2)** berisi `- Sekolah Paud` + `- Yayasan Bumi Lestari` ✅ ·
**[−]** pilih "Sekolah Paud" → terhapus, kota kembali **(1)**, penanda kembali 8 ✅ · tanpa error ✅

---
## 3 Oktober 2026 — 🔧 **DEBUG FITUR MEMBER [+] [✎] [−]**

**Order Bapak:** *"km harus debugging member dari fitur [+] [✎] [−] sampai di simpan dan di hapus
sampai benar.. nanti saya tes lagi.. sekarang belum berfungsi dengan baik"*

**🔴 TEMUAN UTAMA (penyebab “belum berfungsi”):**
Bapak menguji **versi ONLINE** (`suwandhih.github.io/DataPeta`), sedangkan versi itu
**masih LAMA** — belum memuat K12 & K13. Pemeriksaan membuktikan:

| Versi | Keadaan |
|-------|---------|
| **Komputer ini** (berkas `index.html`) | **Terbaru** — semua fitur member jalan ✅ |
| **Online** (github.io) | **Lama** — belum ada tombol “Judul kota”, belum ada kunci Wilayah ❌ |

**Penyebab:** K13 (tombol judul kota, perbaikan [+], kunci Wilayah) **belum diunggah** ke GitHub.

**Yang diperbaiki di kode (agar lebih tahan salah):**
- **Panel label dibuat lebih jelas** — ada **judul** (“Label kategori — nama lokasi”) +
  **tombol ×** untuk menutup. Sebelumnya panel terbuka tanpa judul sehingga terasa “tidak ada reaksi”.
- **Keterangan panel dipertegas:** *”Klik nama label untuk MENAMBAH (jadi berwarna) atau
  MENGHAPUS. Label pertama = utama (warna titik).”*
- **Alur simpan disatukan** — kalau form dibuka dari Member, setelah **Simpan**
  panel Member **selalu terbuka lagi** (baik saat menambah maupun mengubah). Sebelumnya
  bergantung pada variabel global yang bisa tertinggal nilainya.

**Hasil debug (klik nyata, 0 error):**
| Uji | Hasil |
|-----|-------|
| Panel Member terbuka | 8 member ✅ |
| **[+]** → panel label muncul (judul + 5 label + tombol ×) | ✅ |
| **[+]** tambah “Sosial” → tersimpan di database & tampil di UI | ✅ |
| **[+]** hapus “Sosial” → kembali kosong | ✅ |
| **[✎]** buka edit → **Wilayah terkunci** | ✅ |
| **[✎]** simpan → form tutup & panel Member terbuka | ✅ |
| **[+ Tambah Lokasi]** → nama baru langsung terlihat di daftar | ✅ |
| **[−]** hapus → data hilang, penanda kembali 8 | ✅ |
| **Ketahanan data** (muat ulang halaman) label tetap ada | ✅ |
| Error / console error | **0** ✅ |

⚠️ **PERLU BAPAK TAHU:** selama belum diunggah, uji online akan **selalu** memakai
versi lama. Perlu **unggah** supaya versi online = versi di komputer ini.

---
## 3 Oktober 2026 — �️ **MEMBER: JUDUL KOTA BISA DISEMBUNYIKAN + FIX [+] + EDIT TANPA UBAH WILAYAH (K13)**

**Order Bapak:** *"mau saya sekalian hide/un detail label kategori secara keseluruhan ...
● Balikpapan, Kalimantan Timur (3) ... label di hide/un lewat tombol di atas"* ·
*"perbaiki mungkin bug [+] member tidak bisa menambah misal sekolah/kesehatan tidak ada reaksi"* ·
*"kalau edit [✎] member seharusnya wilayah tidak bisa di edit ... arti edit disini adalah
bukan edit wilayah tapi nama label"*

**a. Tombol baru: 👁 Judul kota di daftar**
- Di panel Member kini ada **dua** tombol:

  **[👁  Label kategori pada peta   (Tampil/Sembunyi)]** → mengatur tulisan kategori **di peta** (sudah benar, tidak diubah)

  **[👁  Judul kota di daftar   (Tampil/Sembunyi)]** → mengatur **judul kelompok kota** di daftar Member

- Saat "Sembunyi": judul `● Balikpapan, Kalimantan Timur (3)` **hilang**, daftar jadi ramping —
  **hanya nama member** yang tampil (tetap 8 member).

**b. Perbaikan tombol [+] (tambah label)**
- Tombol **[+]** kini **selalu membuka panel label** di bawah barisnya.
- **Hanya satu panel** terbuka pada satu waktu (panel member lain ikut tertutup).
- Panel **otomatis di-scroll ke layar** — jadi tidak lagi terasa “tidak ada reaksi”.
- Label tambahan disimpan di kolom `label` (lebih rapi dari `kategoriLain` lama).

**c. Tombol [✎] Edit — Wilayah & titik DIKUNCI**
- Form ubah data kini berjudul **"Ubah Nama & Label Lokasi"**.
- Kolom **Wilayah, Bujur, Lintang dibiarkan abu-abu (tidak bisa diubah)**;
  tombol “Ambil dari daftar” & “Bersihkan” disembunyikan.
- Muncul keterangan singkat di bawahnya:
  *”Wilayah & titik dikunci. Yang diubah di sini hanya nama & label lokasi. Kalau wilayahnya
  salah → hapus lokasi ini, lalu tambah baru di wilayah yang benar.”*
- Artinya sesuai maksud Bapak: edit = **nama & label**, bukan wilayah.

**Hasil uji:** dua tombol tampil (Label peta + Judul kota) ✅ · “Judul kota” Sembunyi →
judul hilang (`display:none`, 8 grup ringkas) tapi **8 member tetap tampil** ✅ · Tampil lagi → normal ✅ ·
**[+]** panel muncul (5 label) ✅ · klik “Kesehatan” → baris jadi **“Yayasan · Kesehatan”** + label di peta ikut ✅ ·
panel tetap terbuka setelah menambah ✅ · **[✎]** → form judul “Ubah Nama & Label Lokasi”,
**Wilayah/Bujur/Lintang terkunci** (readOnly + abu-abu), dropdown & Bersihkan tersembunyi, keterangan muncul,
**Nama tetap bisa diubah** ✅ · data uji dibersihkan (kembali 8) ✅ · tanpa error ✅

---

## 3 Oktober 2026 — �👁️ **SATU TOMBOL LABEL KATEGORI (perbaikan K12)**

**Order Bapak:** *"fitur hide/unhide label kategori pada peta cukup 1 tombol tempatkan
saja di bawah [+ Tambah Lokasi] [label kategori pada peta] jadi bukan per member
[+][✎][−] dihapus → [👁]"*

**Perubahan:**
- Tombol **[👁]** pada **tiap member dihapus** — jadi tombol per member sekarang
  tinggal **3**: **[+] [✎] [−]**.
- Ditambah **satu tombol** di panel Member, tepat **di bawah [+ Tambah Lokasi]**:

  **[👁  Label kategori pada peta  ( Tampil / Sembunyi )]**

- Tombol ini menyembunyikan / menampilkan **SEMUA label kategori** di peta sekaligus.
- Tanda keadaan jelas: **Tampil** (hijau) atau **Sembunyi** (abu-abu).
- **Nama lokasi tetap tampil** dalam kedua keadaan.

**Hasil uji:** tombol ada & berada di bawah [+ Tambah Lokasi] (13 px) ✅ ·
tombol per member = **[+] [✎] [−]** (tanpa 👁) ✅ · klik Sembunyi → label kategori
**8 → 0**, **nama lokasi tetap 8** ✅ · tanda keadaan berubah “Tampil” → “Sembunyi” ✅ ·
klik lagi Tampil → label kategori kembali **8** ✅ · tanpa error ✅

---

## 3 Oktober 2026 — 🏷️ **MEMBER: BANYAK KATEGORI + TOMBOL AKSI + SEMBUNYIKAN LABEL (K12)**

**Order Bapak:** *"baru belum ada dalam daftar member"* · *"masing2 lokasi harus ada
[+][v][-] … fungsi [tambah] adalah menambah label kategori"* · *"masing2 member ada
tombol hide/unhide detail label kategori"* · *"di barisan judul Member perlu ada tombol
hide/unhide menampilkan label ke peta secara keseluruhan"*

**a. 🐛 Lokasi baru kini langsung terlihat**
- Sebelumnya setelah **Simpan**, panel Member **menutup sendiri** — jadi lokasi baru
  tidak kelihatan, seolah belum masuk.
- Sekarang panel Member **tetap terbuka** setelah Simpan (kalau form dibuka dari Member).
- Data lokasi baru sebenarnya **sudah tersimpan** — sekarang langsung terlihat di daftar.

**b. Satu member boleh punya BEBERAPA kategori**
- Tombol **[+]** pada member membuka daftar kategori. Klik kategori → **tertambah**;
  klik lagi → **terhapus**.
- **Kategori pertama = utama** (menentukan **warna titik** di peta) — tidak bisa dihapus
  selama masih ada kategori lain.
- Kategori tambahan tampil di peta sebagai tulisan terpisah (mis. `Yayasan · Sosial`).
- Data lama **tidak diubah** — kategori lama tetap jadi kategori utama.

**c. Tiap member punya 4 tombol**
| Tombol | Arti |
|--------|------|
| **[+]** | Tambah / hapus kategori member itu |
| **[✎]** | Ubah data lokasi (buka form) |
| **[−]** | Hapus lokasi (dengan konfirmasi) |
| **[👁]** | Sembunyikan / tampilkan label kategori member itu di peta |

**d. Sembunyikan label kategori per member**
- Tombol **[👁]** menyembunyikan **tulisan kategori** member itu di peta.
- **Nama lokasi tetap tampil** selama datanya ada (sesuai permintaan Bapak).
  Tombolnya jadi pucat kalau label sedang disembunyikan.
- **e. Sembunyikan SEMUA label kategori sekaligus**
- Di baris judul **"Member"** ada tombol **[👁]** global.
- Menekannya menyembunyikan **semua label kategori** di peta sekaligus —
  **nama lokasi tetap tampil**. Tekan lagi untuk menampilkan kembali.

**Hasil uji (blok K12):** label kategori awal 8 ✅ · hide global → label kategori **0**,
**nama lokasi tetap 8** ✅ · tampilkan lagi → 8 ✅ · hide per member → 8 jadi **7** ✅ ·
tombol per baris = **[+] [✎] [−] [👁]** ✅ · panel kategori terbuka, chip kategori tampil ✅ ·
tambah "Sosial" → peta jadi **"Yayasan · Sosial"** + baris member ikut ✅ ·
hapus → kembali "Yayasan" ✅ · tambah lokasi dari Member → **panel Member tetap terbuka**,
lokasi baru langsung terlihat (9 baris) ✅ · data uji dihapus (kembali 8) ✅ · tanpa error ✅

**Perbaikan sampingan:** label gabungan (mis. "Yayasan · Sosial") sempat ikut masuk ke
daftar kategori sehingga mengganggu warna — **sudah diperbaiki** (warna memakai kategori utama).

---

## 3 Oktober 2026 — 🧭 **PILIH WILAYAH DARI DAFTAR + MEMBER SATU-SATUNYA MENU (K11)**

**Order Bapak:** *"Wilayah (provinsi/kabupaten/kota) user bisa cari atau lewat
pulldown menu untuk mencari lokasi"* · *"member di sediakan edit & hapus"* ·
*"apakah + tambah lokasi baru di masukkan pada member · satu lokasi bisa ada
beberapa yayasan · jadi menu hanya member saja"* · pilihan bentuk: **C** (cari + dropdown).

**a. Kolom Wilayah di form — bisa DICARI atau DIPILIH dari daftar**
- Ketik nama wilayah → muncul **daftar saran** (mis. ketik "bandung" → muncul
  Kabupaten Bandung, Kabupaten Bandung Barat, Kota Bandung).
- Pencarian kini mencakup **nama provinsi juga** — mengetik "bandung jawa barat"
  tetap menemukan Kota Bandung.
- Tombol **[Ambil dari daftar ▾]** membuka **daftar bertingkat**:
  **Indonesia → Provinsi → Kabupaten/Kota → Kecamatan → Desa/Kelurahan**.
  Tanda **›** masuk ke wilayah di bawahnya; jejak tingkatan di atas bisa diklik untuk kembali.
- Setelah wilayah dipilih → kolom **Wilayah, Bujur, Lintang terisi otomatis** +
  peta **geser & perbesar** ke wilayah itu + **titik sementara** muncul (bisa dilihat dulu).
- Tombol **[Bersihkan]** mengosongkan kembali kolom wilayah & koordinat.
- Data kecamatan & desa tetap dimuat **hanya saat dibuka** — aplikasi tetap ringan.

**b. Daftar Member — ada tombol Ubah & Hapus**
- Tiap baris member kini punya **dua tombol kecil**: **[Ubah]** dan **[Hapus]**.
- **Ubah** → panel Member menutup, form isian lokasi itu terbuka.
- **Hapus** → minta konfirmasi dulu, baru dihapus (data yang diisi Bapak tetap aman).
- Klik badan baris tetap berfungsi: peta pindah + titik berkedip merah.

**c. Menu kini hanya MEMBER**
- Tombol **[+ Tambah Lokasi]** di baris atas **dihapus**.
- Sebagai gantinya, di dalam panel **Member** ada tombol **[+ Tambah Lokasi]** di atas daftar.
- Baris atas kini tinggal: kotak cari · **[Member]** · **[☰ Menu]**.
- Alasan (sesuai maksud Bapak): **satu lokasi/kota boleh punya beberapa yayasan** —
  jadi cukup satu tempat untuk menambah, mengubah, dan menghapus.

**Hasil uji (blok K11):** elemen pemilih wilayah lengkap ✅ · cari "bandung" = 3 saran ✅ ·
klik saran → Wilayah + Bujur + Lintang terisi + titik pratinjau ✅ · pencarian dengan nama
provinsi ("bandung jawa barat") = 2 hasil ✅ · dropdown provinsi → Jawa Barat (27) →
Kota Bandung (30 kec) → Sukasari (4 desa) ✅ · pilih desa → terisi otomatis + dropdown tertutup ✅ ·
Bersihkan mengosongkan semua ✅ · tombol Ubah & Hapus ada di 8 baris ✅ ·
Ubah → form terbuka terisi ✅ · Hapus (alur) → jumlah lokasi kembali 8 ✅ ·
tombol Tambah Lokasi ada di dalam Member & baris atas bersih ✅ · tanpa error ✅

---

## 3 Oktober 2026 — 🔗 **LABEL LOKASI BERGARIS + MEMBER BERKELOMPOK (K10)**

**Order Bapak:** *"seharusnya 1 kota banyak member / beberapa member"* ·
*"dot member diusulkan dari nama lokasi dari dot warna dengan garis ke nama
kategori tujuan nama lokasi tidak tertutup"* · *"tulisan label kategori di kecilkan"*

**a. Daftar Member dikelompokkan per kota/wilayah**
- Sebelumnya satu daftar rata diurutkan per nama.
- Sekarang: **satu kota = satu kelompok** — jadi **1 kota boleh punya banyak member**.
- Tiap kelompok punya **judul kota** + **tanda jumlah** (mis. `2`).
- Di dalam kelompok, member diurutkan menurut nama; tiap baris menampilkan
  **warna kategori + nama lokasi + kategori**.

**b. Garis penghubung dari titik ke nama lokasi**
- Titik (dot) warna kini dihubungkan **garis tipis** ke kotak label.
- Label diletakkan di **tempat lapang** (8 arah × 4 jarak) — dipilih yang paling
  sedikit bertabrakan dengan nama kota / nama gunung / titik lain.
- Tujuan: **nama lokasi tidak tertutup** teks lain (anti saling tindih).
- Garis **selalu tampil** selama label tampil, dan **tebalnya tetap** di semua zoom
  (tidak ikut menebal saat diperbesar).
- Warnanya mengikuti kategori; titik sementara (belum disimpan) bergaris putus-putus.

**c. Label kategori dikecilkan**
- Di ujung garis ditulis **nama lokasi** + **label kategori** (2 baris).
- Ukuran label kategori **sama dengan nama lokasi (9 px)** — tidak lebih besar.
- Label kategori diberi **warna kategori** supaya mudah dibedakan.

**Hasil uji (blok K10):** 8 lokasi → 8 garis + 8 nama + 8 label kategori ✅ ·
ukuran nama = kategori = 9 px ✅ · garis tebal tetap (non-scaling) ✅ ·
0 tabrakan nama lokasi vs nama kota ✅ · member 8 kelompok / 8 baris ✅ ·
uji tambah lokasi di kota sama → kelompok "Jakarta Pusat" jadi **2 member** ✅ ·
data uji dihapus lagi (kembali 8 lokasi) ✅ · tanpa error ✅

---

## 2 Oktober 2026 — 🎯 **PENANDA LOKASI & KATEGORI (K09)**

**Order Bapak:** *"penambahan fitur dot lokasi"* — 4 butir + 1 perbaikan tampilan.

**a. Titik & nama lokasi dari daftar wilayah**
- Pilih wilayah di daftar → **titik + nama lokasi langsung muncul di peta** (titik sementara,
  garis putus-putus, nama miring).
- Nama mengikuti yang Bapak tulis di kolom "Nama lokasi" — berubah otomatis saat diketik.
- Tekan **Batal** → titik sementara **hilang**. Tekan **Simpan** → titik jadi tetap.

**b. Kategori bisa ditambah / diubah**
- Di menu ☰ ada bagian **"Pengaturan — Kategori"**.
- **Tambah** kategori baru lewat kotak isian + tombol Tambah.
- **Klik nama kategori** → ubah namanya. Lokasi yang memakai kategori itu **ikut berubah**.
- **Tanda ×** → hapus kategori. Kalau masih dipakai lokasi → **ditolak** dengan pesan
  ("masih dipakai 2 lokasi"), sesuai permintaan Bapak.
- Daftar kategori disimpan di peramban → tidak hilang saat ditutup.

**c. Tombol [Member]**
- Tombol baru di baris atas, di sebelah **[+ Tambah Lokasi]** dan **[☰]**.
- Isinya **daftar semua lokasi yang sudah disimpan**, diurutkan menurut nama.
- Tiap baris menampilkan warna kategori, nama lokasi, dan wilayahnya.

**d. Klik lokasi di daftar member**
- Peta **pindah + perbesar** ke lokasi itu.
- Titiknya **berkedip merah** ±4 detik → mudah terlihat mana lokasi tersimpan.

**e. Lingkaran penanda diperkecil**
- Sebelumnya radius 10 (terlalu besar) → sekarang **radius 5** (setengahnya).
- Huruf di dalamnya ikut menyesuaikan (4,5 px).

**Tambahan:**
- **Tiap kategori punya warna sendiri** (biru, hijau, merah, oranye, ungu, …) — titik di peta
  dan tombol kategori memakai warna yang sama.
- **Nama lokasi tampil di samping titik** supaya jelas titik itu lokasi apa.
- Nama kota **menghindar** dari nama lokasi — tidak saling menimpa.

**Hasil uji:** titik radius 5 · 8 nama lokasi tampil · 0 tumpang tindih dengan nama kota ·
pratinjau muncul saat pilih wilayah & hilang saat Batal · member 8 baris · klik member →
peta pindah (3,2× → 6×) + kedip merah (animasi `kedipMerah` 0,5 s) · tambah kategori jadi 6 ·
hapus kategori terpakai ditolak · tanpa error ✅

---
## 2 Oktober 2026 — �🗺️ **DAFTAR WILAYAH: 38 PROVINSI SAMPAI DESA**

**Order Bapak:** *"daftar lokasi2 ketika di klik di fokuskan pada provinsi atau kota
atau desa tergantung daftar yg dipilih.. setiap wilayah di pilih mengerakkan otomatis
pointer ke lokasi otomatis tinggal di isi"*

**Data wilayah lengkap (baru):**
- Sumber: **emsifa/api-wilayah-indonesia** (lisensi MIT)
  - Kode & nama: **Kepmendagri No. 300.2.2-2430 Tahun 2025**
  - Koordinat: **Badan Informasi Geospasial (BIG)**
  - Kode pos: cahyadsn/wilayah_kodepos
- Jumlah: **38 provinsi · 514 kabupaten/kota · 7.285 kecamatan · 83.762 desa/kelurahan**
- Disimpan di `data/wilayah/` — dimuat **bertahap** supaya aplikasi tetap ringan:
  - `provinsi.js` + `kabkota.js` (26 KB) → ikut saat halaman dibuka
  - `kecamatan/{provinsi}.js` (313 KB, 38 berkas) → dimuat saat provinsi dibuka
  - `desa/{kabupaten}.js` (4,7 MB, 514 berkas) → dimuat saat kabupaten dibuka
- Alat pembuat: `alat/buat-wilayah.js`

**Yang dikerjakan:**
- Menu ☰ kini punya bagian **"Daftar Wilayah"**:
  - **Klik nama wilayah** → peta **geser + perbesar** ke wilayah itu, lalu **form isian
    terbuka** dengan kolom Wilayah, Bujur, dan Lintang **sudah terisi otomatis**.
  - **Klik tanda ›** → masuk ke wilayah di bawahnya (provinsi → kab/kota → kecamatan → desa).
  - **Jejak tingkatan** di atas (Indonesia › Jawa Barat › Kota Bandung) bisa diklik untuk kembali.
  - **Kotak cari wilayah** untuk menyaring nama.
- Perbesaran menyesuaikan tingkatan: provinsi 3,2× · kab/kota 5,5× · kecamatan 8× · desa 11×.

**Hasil uji:** 38 provinsi tampil · Jawa Barat → 27 kab/kota · Kota Bandung → 30 kecamatan ·
Sukasari → 4 desa · klik wilayah menggeser peta + mengisi form otomatis · cari "papua"
menemukan 6 provinsi · tanpa error ✅

---
## 2 Oktober 2026 — 🧩 **FORM TAMBAH LOKASI JADI PANEL SAMPING**

**Order Bapak:** *"[+ tambah lokasi] dibuat form seperti [☰]. jangan tengah seperti sekarang..
 supaya peta pasti terlihat"*

**Sebelum:** form muncul sebagai **kotak di tengah layar** + latar gelap → peta tertutup.

**Sesudah:** form muncul sebagai **panel dari kanan** (seperti menu ☰):
- Peta **tetap terlihat** di sebelah kiri saat mengisi data.
- **Tanpa latar gelap** → Bapak masih bisa melihat & menggeser peta.
- Di HP: panel 88% lebar layar, sisa 12% tetap memperlihatkan peta.
- Form & menu ☰ **tidak bisa terbuka bersamaan** (sama-sama di kanan).

**Uji:** panel muncul di kanan (380 px) · peta tetap terlihat · tanpa error ✅

---

## 2 Oktober 2026 — 🎨 **WARNA PULAU KEPULAUAN SERIBU DISAMAKAN**

**Masalah Bapak:** *"biar pulau seperti awal saja.. diberi warna hijau .. sangat tidak
seimbang dengan pulau2 lainnya.. jadi jelek"*

**Penyebab:** garis tepi pulau diberi **warna hijau** supaya kelihatan — tapi jadi
**mencolok** dan tidak seimbang dengan wilayah lain yang abu-abu.

**Perbaikan:**
- Garis hijau **dihapus**.
- Warna pulau kini **sama persis** dengan provinsi lain: isi abu-abu `#c9d0d9`,
  garis tepi putih tipis `0.6`.
- Bentuk asli pulau tetap digambar (tidak kembali jadi titik).

**Hasil uji:** warna pulau kecil = warna provinsi (abu-abu + garis putih 0,6) ·
0 titik hijau · tanpa error ✅

---

## 2 Oktober 2026 — �🏝️ **PULAU KEPULAUAN SERIBU: BENTUK ASLI, BUKAN TITIK**

**Masalah Bapak:** *"belum terlihat pulau 1000"* → lalu *"tolong bulat2 hijau
dihilangkan .. tidak bisa liat pulaunya .. tujuan bulat2 hijau itu apa ?"*

**Penyebab:** bentuk pulau-pulaunya **terlalu kecil**.
- Kepulauan Seribu berisi **72 pulau**, masing-masing hanya **0,1–3,7 km**.
- Di peta, 1 km hanya ±0,9 piksel → pulau terkecil **kurang dari 1 piksel**.
- Percobaan pertama memakai **titik hijau** sebagai penanda — tapi titik itu
  justru **menutupi** pulau, jadi Bapak tidak bisa melihat bentuk pulaunya.

**Perbaikan (final):**
- Titik hijau **dihapus seluruhnya**.
- Yang digambar adalah **bentuk asli pulau** (garis batas dari data BPS).
- Supaya tetap terlihat, **tebal garis tepinya dibuat tetap** di layar
  (tidak ikut mengecil saat peta di-zoom) — jadi yang tampak tetap
  **bentuk pulau yang sebenarnya**, bukan titik palsu.
- Pulau bisa **diklik** seperti wilayah lain.
- Nama **"KEPULAUAN SERIBU"** tetap tampil permanen di atas gugusan.

**Hasil uji:** 0 titik hijau · bentuk pulau terlihat (9×17 px di zoom 1,
164×297 px di zoom 11,4) · bisa diklik · tanpa error ✅

---
## 2 Oktober 2026 — 🏝️ **KEPULAUAN SERIBU DITAMBAHKAN**

**Order Bapak:** *"iya pulau 1000 perlu ditambahkan coba cari sumber yg lain"*

**Sumber data baru:** **geoBoundaries** (gbOpen IDN ADM2)
- Data asli: **Badan Pusat Statistik (BPS)** + WFP + OCHA ROAP
- Lisensi: CC BY 3.0 IGO
- Berkas: `data/kepulauan-seribu.js` (7,5 KB)

**Yang dikerjakan:**
- Batas wilayah **Kepulauan Seribu** (106,39–106,85 BT · 5,20–6,04 LS) digambar di peta.
- Nama **"Kepulauan Seribu"** tampil permanen, ditaruh di bagian **utara** gugusan
  supaya tidak menutupi nama kota Jakarta.
- Nama ini **wajib tampil** — kalau tidak ada tempat bebas, dipakai tempat yang
  paling sedikit bertabrakan.
- Wilayah bisa **diklik** seperti provinsi lain.
- Alat pembuat: `alat/buat-seribu.js`.

**Hasil uji:** Kepulauan Seribu tergambar (72 pulau) · nama tampil di semua tingkat
zoom · tidak menutupi nama kota. ✅

---
## 2 Oktober 2026 — � **PENTING: berkas rahasia terunggah ke GitHub**

**Masalah:** saat mengunggah, ternyata ada berkas catatan pribadi yang ikut terunggah
ke GitHub (halaman publik):
- `catat/GitHub.txt` — berisi **kata sandi**
- `catat/layerbase.txt` — berisi **kunci API Layerbase**

**Tindakan yang sudah dilakukan:**
1. Kedua berkas **dihapus** dari repo.
2. Folder `catat/` dimasukkan ke `.gitignore` → **tidak akan terunggah lagi**.
3. **Riwayat Git dibersihkan** (filter-branch + gc) → kunci & sandi **hilang dari riwayat**.
4. Repo diunggah ulang (paksa) → GitHub kini bersih.

**⚠️ PERLU TINDAKAN BAPAK:** karena kunci & sandi sempat terbuka di internet,
sebaiknya **ganti (reset)**:
- **Kunci API Layerbase** → buat kunci baru di Layerbase, lalu perbarui rahasia
  `LAYERBASE_KEY` di Cloudflare Worker.
- **Kata sandi** yang tertulis di `catat/GitHub.txt` (kalau masih dipakai).

**Aturan baru:** berkas berisi sandi/kunci **TIDAK BOLEH** masuk repo. Simpan di
folder `catat/` (sudah diabaikan Git).

---

## 2 Oktober 2026 — �🐛 **PERBAIKAN: nama kota tertutup penanda**

**Masalah Bapak:** *"nama jakarta masuk di area pulau sedang area tidak terlalu besar"* —
nama kota tertutup lingkaran penanda, jadi terbaca "Jakrta", "Banding", "Sur-baya".

**Penyebab (ditemukan AI):**
1. Nama kota digambar **sebelum** penanda lokasi → tertutup lingkaran penanda.
2. Penanda lokasi **membesar saat zoom** (radius 10 × zoom), tapi perhitungan
   penghindaran memakai ukuran tetap → tidak terdeteksi.

**Perbaikan:**
- Nama kota dipindah ke **lapisan paling atas** (di atas penanda) → tidak bisa tertutup.
- Nama kota kini **memilih sendiri tempatnya** dari 10 pilihan (kanan/kiri/atas/bawah,
  dekat & jauh) — dipilih yang paling sedikit bertabrakan.
- Jarak nama dari titik **menyesuaikan besar penanda** saat zoom.
- Nama kota dihitung ulang setelah data lokasi selesai dimuat.
- Hasil: **0 tabrakan** nama kota dengan penanda/gunung/pulau di semua tingkat zoom. ✅

---

## 2 Oktober 2026 — 🏝️ **PULAU SERIBU — penjelasan**

**Pertanyaan Bapak:** *"pulau seribu tidak tampak.. apakah terlalu kecil?"*

**Jawaban:** bukan karena terlalu kecil — **datanya memang tidak ada**.
- Data batas provinsi DKI Jakarta yang dipakai **hanya memuat daratan**
  (106,69–106,97 BT). Kepulauan Seribu (±106,5 BT ke utara) **tidak termasuk**.
- Data pulau Natural Earth juga **tidak memuat** Kepulauan Seribu.
- Jadi walau di-zoom berapa pun, Pulau Seribu tidak akan muncul.

**Perlu keputusan Bapak:** apakah Kepulauan Seribu perlu ditambahkan
(perlu sumber data lain, mis. batas wilayah dari BIG).

---

## 2 Oktober 2026 — 🏝️ NAMA PULAU DI PETA

**Nama pulau kini tampil permanen, tidak mengganggu nama kota.**

- Ditambah **29 pulau**: Kalimantan · Papua · Sumatra · Jawa · Sulawesi · Timor ·
  Bali · Madura · Lombok · Sumbawa · Flores · Sumba · Alor · Wetar · Seram · Buru ·
  Halmahera · Morotai · Taliabu · Biak · Kolepom · Bangka · Belitung · Bunguran ·
  Nias · Siberut · Pagai Selatan · Enggano · Simeulue.
- **Tampil permanen** — tidak hilang saat zoom keluar/masuk.
- **Penempatan otomatis:** nama pulau dicari tempat yang **tidak menutupi nama kota**,
  tidak menutupi nama gunung, tidak menutupi nama pulau lain, dan tidak terpotong
  tepi peta. Kalau tidak ada tempat aman → nama pulau tidak ditampilkan
  (nama kota lebih dipentingkan, sesuai permintaan Bapak).
- **Sumber data:** Natural Earth (public domain) — nama resmi Indonesia (`NAME_ID`).
- Pulau di luar Indonesia (Nikobar, Mindanao, Palawan, Phuket, Flores di Azores)
  **disaring/dibuang**.
- Titik penempatan **dipastikan berada di dalam wilayah Indonesia** — dicek terhadap
  batas 38 provinsi, jadi nama tidak akan jatuh di Malaysia atau Papua Nugini.
- Berkas: `data/pulau.js` (29 pulau) · alat pembuat: `alat/buat-pulau.js`.
- Uji: 8 uji · 0 gagal — saat zoom 1× muncul 24 nama pulau · zoom naik jadi 13 nama
  (hanya yang tampak) · **0 tabrakan** dengan nama kota/gunung. ✅

---

## 2 Oktober 2026 — 🐛 **PERBAIKAN: sungai & danau tidak terlihat**

**Masalah Bapak:** *"5b. tidak ada atau tidak tampil"* — sungai, danau, gunung tidak tampak.

**Penyebab (ditemukan AI):** urutan lapisan peta salah. Sungai & danau digambar
**sebelum** provinsi, jadi **tertutup** oleh warna provinsi yang pekat. Gunung
kebetulan digambar setelah provinsi → itu sebabnya gunung terlihat, sungai/danau tidak.

**Perbaikan:**
- Urutan lapisan diubah: **provinsi dulu → baru danau → sungai → gunung**.
- Warna diperjelas: sungai `#4a90d9` (garis 1,4) · danau `#7fb8e8` · gunung `#a0522d`.
- Hasil: 30 sungai · 4 danau · 18 gunung **terlihat jelas** di layar. ✅

**Catatan uji:** 30 sungai · 4 danau · 18 gunung tergambar · 105 kota saat zoom masuk · tanpa error ✅

---

## 2 Oktober 2026 — 🏔️ KELENGKAPAN PETA (sungai · danau · gunung)

**Peta kini memuat bentang alam — lebih mudah dibaca.**

- Ditambah **30 sungai** (garis biru) — Barito, Kapuas, Digul, Mamberamo, dll.
- Ditambah **4 danau** (biru muda) — Danau Toba, Jempang, Murray, Rawa biru.
- Ditambah **18 gunung** (segitiga coklat + nama + tinggi) — Semeru, Rinjani, Kerinci,
  Merapi, Tambora, Puncak Jaya (4.884 m), dll.
- Puncak negara tetangga (Kinabalu, Mount Apo) **dibuang**.
- Nama gunung **muncul saat di-zoom** (agar tidak ramai di tampilan awal).
- Sumber data: **Natural Earth** (public domain) — disaring hanya wilayah Indonesia.
- Uji: 30 sungai · 4 danau · 18 gunung tergambar · tanpa error ✅

---

## 2 Oktober 2026 — 🔍 ZOOM + NAMA KOTA

**Peta kini bisa di-zoom & digeser; nama kota muncul sesuai tingkat zoom.**

- **Zoom:** roda mouse (PC) · cubit dua jari (HP) · tombol **+ / − / ⟲** (kanan).
- **Geser:** tahan & tarik peta.
- **Nama kota sesuai zoom** (data Natural Earth, 105 kota Indonesia):
  - Zoom keluar → hanya **kota besar** (Jakarta, Surabaya, Bandung, Medan …)
  - Zoom masuk → **kota kecil** ikut muncul bertahap
- Penanda lokasi & nama kota **tidak ikut membesar** saat zoom (tetap enak dibaca).
- Uji: zoom keluar = 4 kota · zoom masuk = 23 → 105 kota · tombol reset kembali ke awal ✅

---

## 2 Oktober 2026 — ☁️ DATA CLOUD (Layerbase + Cloudflare) — SELESAI

**Data kini bisa dipindah PC ↔ HP lewat awan. Kunci API aman.**

- Dibuat database **SQLite di Layerbase** (`peta-indonesia`, paket Free 5 GB) + tabel `lokasi`.
- ⚠️ **Uji CORS:** peramban **diblokir** memanggil Layerbase langsung → **Cloudflare Worker wajib**.
- Dibuat **Cloudflare Worker** `peta-api` (`peta-api.suwandhih.workers.dev`) sebagai perantara:
  menyembunyikan **kunci API** (disimpan sebagai *secret* di Cloudflare, ❌ tidak terlihat di halaman publik).
- Ditambah `js/awan.js` + tombol di menu: **"↑ Kirim ke Awan"** dan **"↓ Ambil dari Awan"**.
- Cara kerja: **IndexedDB = data utama** · **Layerbase = titipan** untuk pindah antar perangkat.
- **Anti-duplikat:** saat "Ambil dari Awan", data yang sudah ada tidak ditimpa kecuali lebih baru.
- Uji: kirim **8 dari 8** ✅ · hapus lokal → tarik **8 data kembali** ✅ · tarik 2× → **tanpa duplikat** ✅.
- ⚠️ **Catatan:** Layerbase **tidur** saat tidak dipakai (bangun ±1–5 detik). Ini normal & sesuai aturan Free.

---

## 2 Oktober 2026 — 💾 PENYIMPANAN DATA (IndexedDB) + FORM ISIAN

**Bapak kini bisa mengisi data sendiri — dan data tidak hilang.**

- Dibuat `js/penyimpanan.js` — penyimpanan **IndexedDB** (data di peramban, tidak hilang saat ditutup).
- Dibuat **form isian data**: tombol **"+ Tambah Lokasi"** (kanan atas).
- Form bisa: **tambah** lokasi baru · **ubah** data (tombol "Ubah data" di panel) · **hapus**.
- Isian: nama · wilayah · kategori · bujur/lintang · inisial · keterangan (format `Nama = Isi`).
- Data contoh (8 lokasi) otomatis dimasukkan saat pertama kali dibuka.
- Uji: tambah lokasi → 9 penanda · **muat ulang halaman → data tetap ada** · ubah · hapus · batal — semua bekerja.
- ⚠️ **Catatan:** data tersimpan **per perangkat** (PC & HP terpisah). Pindah data antar
  perangkat menunggu **Layerbase** (K03 e).

---
## 2 Oktober 2026 — � APLIKASI ONLINE (GitHub Pages)

**Aplikasi kini bisa dibuka lewat internet — dari PC maupun HP.**

- Dibuat repositori GitHub: `github.com/suwandhih/DataPeta` (Public).
- Berkas diunggah ke GitHub (git).
- **GitHub Pages diaktifkan** (branch `main`, folder root).
- 🌐 **Alamat aplikasi:** **https://suwandhih.github.io/DataPeta/**
- **Aturan F3 diubah** (keputusan Bapak): aplikasi kini **butuh internet** karena
  akan memakai database cloud (Layerbase). Dibuka lewat **alamat web**, bukan dari berkas.
- Ditambah aturan **F3b**: cara buka di HP = lewat alamat web (bukan My Files).
- Uji: aplikasi terbuka di alamat web, peta 38 provinsi tampil, penanda & panel normal.
- ⚠️ **Belum:** database Layerbase belum dibuat & belum disambungkan (K03 c, d).

---

## 2 Oktober 2026 — �🌏 38 PROVINSI + NEGARA TETANGGA

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
