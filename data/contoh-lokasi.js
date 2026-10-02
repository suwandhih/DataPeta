/* ============================================================
   DATA CONTOH LOKASI — Peta Indonesia (Tahap 1)
   ------------------------------------------------------------
   ⚠️ INI DATA CONTOH SAJA (untuk menguji tampilan).
   Bukan data asli. Data asli diisi Bapak sendiri (aturan F4/F8).
   ------------------------------------------------------------
   Cara menambah lokasi: salin satu blok { ... } lalu ubah isinya.
   - lon, lat : koordinat asli (bujur, lintang) — penanda otomatis
                diletakkan di titik yang benar di peta
   - nama   : nama lokasi
   - wilayah: provinsi / kabupaten / kota
   - kategori: harus salah satu dari daftar KATEGORI di bawah
   - inisial: huruf yang tampil di penanda (kalau tidak ada gambar)
   - gambar : (opsional) alamat gambar, mis. "assets/foto.jpg"
   - rincian: daftar keterangan yang tampil di panel
   ============================================================ */

const KATEGORI = [
  "Semua",
  "Yayasan",
  "Sekolah",
  "Kesehatan",
  "Sosial",
  "Lainnya"
];

const CONTOH_LOKASI = [
  {
    id: "L001",
    nama: "Yayasan Cahaya Nusantara",
    wilayah: "Jakarta Pusat, DKI Jakarta",
    kategori: "Yayasan",
    lon: 106.83,
    lat: -6.18,
    inisial: "CN",
    gambar: "",
    rincian: [
      { label: "Berdiri", nilai: "2015" },
      { label: "Bidang", nilai: "Pendidikan anak" },
      { label: "Penerima manfaat", nilai: "±120 anak" },
      { label: "Kontak", nilai: "0812-xxxx-xxxx" }
    ]
  },
  {
    id: "L002",
    nama: "SD Harapan Bangsa",
    wilayah: "Bandung, Jawa Barat",
    kategori: "Sekolah",
    lon: 107.61,
    lat: -6.91,
    inisial: "SD",
    gambar: "",
    rincian: [
      { label: "Jenjang", nilai: "SD" },
      { label: "Jumlah siswa", nilai: "±340" },
      { label: "Akreditasi", nilai: "A" }
    ]
  },
  {
    id: "L003",
    nama: "Klinik Sehat Bersama",
    wilayah: "Surabaya, Jawa Timur",
    kategori: "Kesehatan",
    lon: 112.75,
    lat: -7.25,
    inisial: "KS",
    gambar: "",
    rincian: [
      { label: "Layanan", nilai: "Umum & ibu anak" },
      { label: "Jam buka", nilai: "08.00–20.00" },
      { label: "Dokter", nilai: "3 orang" }
    ]
  },
  {
    id: "L004",
    nama: "Rumah Belajar Pelosok",
    wilayah: "Makassar, Sulawesi Selatan",
    kategori: "Sosial",
    lon: 119.43,
    lat: -5.14,
    inisial: "RB",
    gambar: "",
    rincian: [
      { label: "Program", nilai: "Les gratis" },
      { label: "Peserta", nilai: "±80 anak" },
      { label: "Relawan", nilai: "12 orang" }
    ]
  },
  {
    id: "L005",
    nama: "Yayasan Bumi Lestari",
    wilayah: "Balikpapan, Kalimantan Timur",
    kategori: "Yayasan",
    lon: 116.85,
    lat: -1.27,
    inisial: "BL",
    gambar: "",
    rincian: [
      { label: "Bidang", nilai: "Lingkungan" },
      { label: "Program", nilai: "Tanam mangrove" },
      { label: "Luas", nilai: "±15 hektar" }
    ]
  },
  {
    id: "L006",
    nama: "Posyandu Melati",
    wilayah: "Medan, Sumatera Utara",
    kategori: "Kesehatan",
    lon: 98.67,
    lat: 3.59,
    inisial: "PM",
    gambar: "",
    rincian: [
      { label: "Layanan", nilai: "Ibu & balita" },
      { label: "Jadwal", nilai: "Setiap Rabu" },
      { label: "Kader", nilai: "6 orang" }
    ]
  },
  {
    id: "L007",
    nama: "Sekolah Alam Papua",
    wilayah: "Jayapura, Papua",
    kategori: "Sekolah",
    lon: 140.72,
    lat: -2.53,
    inisial: "SA",
    gambar: "",
    rincian: [
      { label: "Jenjang", nilai: "SD–SMP" },
      { label: "Jumlah siswa", nilai: "±150" },
      { label: "Fokus", nilai: "Alam & budaya" }
    ]
  },
  {
    id: "L008",
    nama: "Komunitas Nelayan Pesisir",
    wilayah: "Kupang, Nusa Tenggara Timur",
    kategori: "Sosial",
    lon: 123.60,
    lat: -10.17,
    inisial: "KN",
    gambar: "",
    rincian: [
      { label: "Anggota", nilai: "±200 keluarga" },
      { label: "Program", nilai: "Bantuan perahu" },
      { label: "Bidang", nilai: "Perikanan" }
    ]
  }
];
