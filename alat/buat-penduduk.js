/* ============================================================
   BUAT DATA JUMLAH PENDUDUK 38 PROVINSI — data/penduduk.js
   Sumber: Badan Pusat Statistik (BPS), tabel resmi
     "Penduduk, Laju Pertumbuhan Penduduk, Distribusi Persentase Penduduk,
      Kepadatan Penduduk, Rasio Jenis Kelamin Penduduk Menurut Provinsi, 2026"
     https://www.bps.go.id/id/statistics-table?subject=519
   Angka BPS asli dalam RIBUAN (mis. 5.695,9) — di sini dikali 1.000 jadi jiwa.

   Cara pakai:  node alat/buat-penduduk.js
   ============================================================ */

const fs = require("fs");
const path = require("path");

// Nama provinsi BPS -> kode provinsi (Kepmendagri)
const KODE = {
  "Aceh": "11",
  "Sumatera Utara": "12",
  "Sumatera Barat": "13",
  "Riau": "14",
  "Jambi": "15",
  "Sumatera Selatan": "16",
  "Bengkulu": "17",
  "Lampung": "18",
  "Kepulauan Bangka Belitung": "19",
  "Kepulauan Riau": "21",
  "DKI Jakarta": "31",
  "Jawa Barat": "32",
  "Jawa Tengah": "33",
  "DI Yogyakarta": "34",
  "Jawa Timur": "35",
  "Banten": "36",
  "Bali": "51",
  "Nusa Tenggara Barat": "52",
  "Nusa Tenggara Timur": "53",
  "Kalimantan Barat": "61",
  "Kalimantan Tengah": "62",
  "Kalimantan Selatan": "63",
  "Kalimantan Timur": "64",
  "Kalimantan Utara": "65",
  "Sulawesi Utara": "71",
  "Sulawesi Tengah": "72",
  "Sulawesi Selatan": "73",
  "Sulawesi Tenggara": "74",
  "Gorontalo": "75",
  "Sulawesi Barat": "76",
  "Maluku": "81",
  "Maluku Utara": "82",
  "Papua": "91",
  "Papua Barat": "92",
  "Papua Selatan": "93",
  "Papua Tengah": "94",
  "Papua Pegunungan": "95",
  "Papua Barat Daya": "96"
};

// Salinan apa adanya dari tabel BPS (kolom "Jumlah Penduduk (Ribu)").
const BPS = [
  ["Aceh", "5.695,9"],
  ["Sumatera Utara", "15.978,6"],
  ["Sumatera Barat", "5.991,6"],
  ["Riau", "6.892,4"],
  ["Jambi", "3.811,7"],
  ["Sumatera Selatan", "9.017,1"],
  ["Bengkulu", "2.163,3"],
  ["Lampung", "9.623,8"],
  ["Kepulauan Bangka Belitung", "1.569,7"],
  ["Kepulauan Riau", "2.243,1"],
  ["DKI Jakarta", "10.669,7"],
  ["Jawa Barat", "51.163,9"],
  ["Jawa Tengah", "38.565,0"],
  ["DI Yogyakarta", "3.802,7"],
  ["Jawa Timur", "42.352,0"],
  ["Banten", "12.641,3"],
  ["Bali", "4.488,2"],
  ["Nusa Tenggara Barat", "5.815,3"],
  ["Nusa Tenggara Timur", "5.828,6"],
  ["Kalimantan Barat", "5.835,0"],
  ["Kalimantan Tengah", "2.879,5"],
  ["Kalimantan Selatan", "4.372,1"],
  ["Kalimantan Timur", "4.478,4"],
  ["Kalimantan Utara", "758,8"],
  ["Sulawesi Utara", "2.740,5"],
  ["Sulawesi Tengah", "3.189,8"],
  ["Sulawesi Selatan", "9.661,3"],
  ["Sulawesi Tenggara", "2.880,0"],
  ["Gorontalo", "1.256,4"],
  ["Sulawesi Barat", "1.547,4"],
  ["Maluku", "1.995,2"],
  ["Maluku Utara", "1.391,7"],
  ["Papua", "1.086,5"],
  ["Papua Barat", "596,5"],
  ["Papua Selatan", "557,2"],
  ["Papua Tengah", "1.510,8"],
  ["Papua Pegunungan", "1.501,9"],
  ["Papua Barat Daya", "645,5"]
];

const INDONESIA = "287.198,4";

// "5.695,9" (ribuan) -> 5695900 (jiwa)
function keJiwa(teks) {
  const angka = Number(teks.replace(/\./g, "").replace(",", "."));
  if (!Number.isFinite(angka)) throw new Error("Angka tidak terbaca: " + teks);
  return Math.round(angka * 1000);
}

const baris = BPS.map(([nama, ribu]) => {
  const kode = KODE[nama];
  if (!kode) throw new Error("Kode provinsi tidak ada untuk: " + nama);
  return `  "${kode}": ${keJiwa(ribu)}`;
});

const isi = `/* JUMLAH PENDUDUK 38 PROVINSI
   Sumber: Badan Pusat Statistik (BPS) — tabel resmi
     "Penduduk, Laju Pertumbuhan Penduduk, Distribusi Persentase Penduduk,
      Kepadatan Penduduk, Rasio Jenis Kelamin Penduduk Menurut Provinsi, 2026"
     https://www.bps.go.id/id/statistics-table?subject=519
   Angka asli BPS dalam ribuan (mis. 5.695,9 ribu) — di sini ditulis penuh (5.695.900 jiwa).
   Format: { "kode provinsi": jumlah jiwa }
   Dibuat otomatis oleh alat/buat-penduduk.js — jangan diubah manual. */
window.PENDUDUK_PROVINSI = {
${baris.join(",\n")}
};

/* Jumlah penduduk seluruh Indonesia menurut BPS (tabel yang sama). */
window.PENDUDUK_INDONESIA = ${keJiwa(INDONESIA)};
`;

const tujuan = path.join(__dirname, "..", "data", "penduduk.js");
fs.writeFileSync(tujuan, isi, "utf8");

const total = BPS.reduce((a, [, ribu]) => a + keJiwa(ribu), 0);
console.log("Ditulis:", tujuan);
console.log("Provinsi:", BPS.length);
console.log("Jumlah semua:", total.toLocaleString("id-ID"));
console.log("Angka BPS Indonesia:", keJiwa(INDONESIA).toLocaleString("id-ID"));
console.log("Selisih:", (total - keJiwa(INDONESIA)).toLocaleString("id-ID"));
