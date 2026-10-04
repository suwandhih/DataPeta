/* ============================================================
   SUKU BANGSA INDONESIA — Peta Indonesia (K16)
   ------------------------------------------------------------
   SUMBER (aturan F8 — tidak dikarang):
   - Nama suku & jumlah penduduk : Badan Pusat Statistik (BPS),
     "Kewarganegaraan, Suku Bangsa, Agama, dan Bahasa Sehari-hari
     Penduduk Indonesia — Sensus Penduduk 2010", Tabel P1.2
     (klasifikasi awal, 31 kelompok).
   - "Kawasan utama"            : kolom yang sama dari tabel BPS 2010.

   ⚠️ PENTING — TITIK SUKU ADALAH PERKIRAAN (keputusan Bapak, 4 Okt 2026):
   Sumber mana pun TIDAK menyediakan koordinat suku (Wikidata hanya 72,
   dan semuanya bukan suku; BPS & Kemendikbud tidak menyediakan koordinat).
   Karena itu titik tiap suku ditempatkan di IBU KOTA PROVINSI ASALNYA
   (koordinat provinsi dari BIG = ibu kota provinsi). Letaknya = perkiraan,
   bukan lokasi persis. Setiap titik diberi tanda "perkiraan".

   Keterangan kolom:
   - n : nama suku
   - j : jumlah penduduk (Sensus BPS 2010)
   - p : kode provinsi tempat titik diletakkan (lihat data/wilayah/provinsi.js)
   - k : "kawasan utama" menurut BPS 2010 (daftar provinsi/pulau)
   - a : true = kelompok gabungan "asal <wilayah>" (bukan satu suku tunggal)

   Dibuat: 4 Oktober 2026
   ============================================================ */

const SUKU_INDONESIA = [
  { n: "Jawa",            j: 97094536, p: "33", a: false, k: "Banten; Jawa Tengah; Jawa Timur; DI Yogyakarta; Lampung; Sumatera Utara; DKI Jakarta; Jawa Barat" },
  { n: "Sunda",           j: 41359454, p: "32", a: false, k: "Jawa Barat; Banten; DKI Jakarta; Jawa Tengah; Lampung; Sumatera Selatan" },
  { n: "Batak",           j:  8466969, p: "12", a: false, k: "Sumatera Utara; Riau; Kepulauan Riau; DKI Jakarta; Jawa Barat" },
  { n: "Asal Sulawesi",   j:  7634262, p: "73", a: true,  k: "Sulawesi" },
  { n: "Madura",          j:  7179356, p: "35", a: false, k: "Pulau Madura; Jawa Timur; Kalimantan Barat" },
  { n: "Betawi",          j:  6807968, p: "31", a: false, k: "DKI Jakarta; Jawa Barat; Banten" },
  { n: "Minangkabau",     j:  6462713, p: "13", a: false, k: "Sumatera Barat; Riau; Bengkulu; Jambi; DKI Jakarta; Jawa Barat; Aceh; Sumatera Utara" },
  { n: "Bugis",           j:  6359700, p: "73", a: false, k: "Sulawesi Selatan" },
  { n: "Melayu",          j:  5365399, p: "14", a: false, k: "Riau; Kalimantan Barat; Sumatera Utara; Sumatera Selatan; Kepulauan Riau; Jambi; Bengkulu; Kepulauan Bangka Belitung" },
  { n: "Asal Sumatera Selatan", j: 5119581, p: "16", a: true, k: "Sumatera Selatan; Lampung" },
  { n: "Asal NTT",        j:  4184923, p: "53", a: true,  k: "Nusa Tenggara Timur" },
  { n: "Banjar",          j:  4127124, p: "63", a: false, k: "Kalimantan Selatan; Kalimantan Tengah; Kalimantan Timur; Riau" },
  { n: "Asal Aceh",       j:  4091451, p: "11", a: true,  k: "Aceh; Sumatera Utara" },
  { n: "Bali",            j:  3946416, p: "51", a: false, k: "Bali; Pulau Lombok; Nusa Tenggara Barat" },
  { n: "Sasak",           j:  3173127, p: "52", a: false, k: "Nusa Tenggara Barat" },
  { n: "Dayak",           j:  3009494, p: "62", a: false, k: "Kalimantan Barat; Kalimantan Tengah; Kalimantan Utara; Kalimantan Timur" },
  { n: "Tionghoa",        j:  2832510, p: "31", a: false, k: "Perkotaan di DKI Jakarta; Pulau Sumatra; Pulau Jawa; Kalimantan Barat" },
  { n: "Asal Papua",      j:  2693630, p: "91", a: true,  k: "Papua; Papua Barat" },
  { n: "Makassar",        j:  2672590, p: "73", a: false, k: "Sulawesi Selatan" },
  { n: "Asal Sumatra",    j:  2204472, p: "12", a: true,  k: "Pulau Sumatra" },
  { n: "Maluku",          j:  2203415, p: "81", a: false, k: "Kepulauan Maluku" },
  { n: "Asal Kalimantan", j:  1968620, p: "61", a: true,  k: "Pulau Kalimantan" },
  { n: "Jambi",           j:  1415547, p: "15", a: false, k: "Jambi" },
  { n: "Lampung",         j:  1381660, p: "18", a: false, k: "Lampung" },
  { n: "Asal NTB",        j:  1280094, p: "52", a: true,  k: "Nusa Tenggara Barat" },
  { n: "Gorontalo",       j:  1251494, p: "75", a: false, k: "Gorontalo" },
  { n: "Minahasa",        j:  1237177, p: "71", a: false, k: "Sulawesi Utara" },
  { n: "Nias",            j:  1041925, p: "12", a: false, k: "Pulau Nias; Sumatera Utara" }
];
