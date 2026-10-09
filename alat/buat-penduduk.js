/* ============================================================
   BUAT DATA JUMLAH PENDUDUK — data/penduduk.js
   Sumber: Badan Pusat Statistik (BPS), dua tabel resmi:
     1. "Penduduk, Laju Pertumbuhan Penduduk, ... Menurut Provinsi, 2026"
        https://www.bps.go.id/id/statistics-table?subject=519
     2. "Jumlah Penduduk menurut Kabupaten/Kota dan Kelompok Umur"
        https://www.bps.go.id/id/statistics-table/2/Mjc5MCMy/-jumlah-penduduk-menurut-kabupaten-kota-dan-kelompok-umur.html
   Angka mentah kedua tabel disimpan apa adanya di alat/bps-penduduk-2026.json

   Hasil:
     data/penduduk.js -> PENDUDUK_PROVINSI (38) · PENDUDUK_KABKOTA (514)
                         PENDUDUK_INDONESIA

   Cara pakai:  node alat/buat-penduduk.js
   ============================================================ */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const AKAR = path.join(__dirname, "..");
const MENTAH = path.join(__dirname, "bps-penduduk-2026.json");

// ---------- Bantu ----------
const kunci = (s) => s.toUpperCase().replace(/[^A-Z0-9]/g, "");
const keJiwa = (teks) => Number(String(teks).replace(/\./g, ""));

// Nama provinsi BPS -> kode provinsi (Kepmendagri)
const KODE_PROV = {
  "ACEH": "11",
  "SUMATERA UTARA": "12",
  "SUMATERA BARAT": "13",
  "RIAU": "14",
  "JAMBI": "15",
  "SUMATERA SELATAN": "16",
  "BENGKULU": "17",
  "LAMPUNG": "18",
  "KEP. BANGKA BELITUNG": "19",
  "KEPULAUAN RIAU": "21",
  "DKI JAKARTA": "31",
  "JAWA BARAT": "32",
  "JAWA TENGAH": "33",
  "D I YOGYAKARTA": "34",
  "JAWA TIMUR": "35",
  "BANTEN": "36",
  "BALI": "51",
  "NUSA TENGGARA BARAT": "52",
  "NUSA TENGGARA TIMUR": "53",
  "KALIMANTAN BARAT": "61",
  "KALIMANTAN TENGAH": "62",
  "KALIMANTAN SELATAN": "63",
  "KALIMANTAN TIMUR": "64",
  "KALIMANTAN UTARA": "65",
  "SULAWESI UTARA": "71",
  "SULAWESI TENGAH": "72",
  "SULAWESI SELATAN": "73",
  "SULAWESI TENGGARA": "74",
  "GORONTALO": "75",
  "SULAWESI BARAT": "76",
  "MALUKU": "81",
  "MALUKU UTARA": "82",
  "PAPUA": "91",
  "PAPUA BARAT": "92",
  "PAPUA SELATAN": "93",
  "PAPUA TENGAH": "94",
  "PAPUA PEGUNUNGAN": "95",
  "PAPUA BARAT DAYA": "96"
};

// Nama kabupaten/kota BPS -> kode wilayah proyek.
// Dipakai HANYA kalau pencocokan otomatis gagal (beda ejaan / nama lama).
const PADANAN = {
  "12.12": "Toba Samosir / Toba",
  "16.02": "Ogan Komering Ilir",
  "16.07": "Banyu Asin",
  "16.73": "Kota Lubuklinggau",
  "31.01": "Kep. Seribu",
  "31.71": "Kota Jakarta Pusat",
  "31.72": "Kota Jakarta Utara",
  "31.73": "Kota Jakarta Barat",
  "31.74": "Kota Jakarta Selatan",
  "31.75": "Kota Jakarta Timur",
  "71.09": "Siau Tagulandang Biaro",
  "73.71": "Kota Makasar",
  "76.01": "Mamuju Utara / Pasangkayu",
  "81.03": "Maluku Tenggara Barat / Kepulauan Tanimbar"
};

// ---------- Baca data wilayah proyek ----------
function muatWilayah(berkas) {
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(AKAR, "data", "wilayah", berkas), "utf8"), ctx);
  return ctx.window;
}

const wProv = muatWilayah("provinsi.js").WILAYAH_PROVINSI;
const wKab = muatWilayah("kabkota.js").WILAYAH_KABKOTA;

// ---------- Baca angka BPS ----------
const mentah = JSON.parse(fs.readFileSync(MENTAH, "utf8"));

// Susun: nama provinsi BPS -> daftar [nama kab/kota, angka]
const perProv = {};
let provKini = null;
let angkaIndonesia = null;
for (const [nama, angka] of mentah) {
  if (nama === "TOTAL") continue;
  if (nama === "INDONESIA") { angkaIndonesia = angka; continue; }
  if (KODE_PROV[nama]) { provKini = nama; perProv[provKini] = []; continue; }
  if (provKini) perProv[provKini].push([nama, angka]);
}

// BPS masih memakai batas wilayah LAMA untuk "PAPUA" dan "PAPUA BARAT",
// padahal provinsi baru (Papua Selatan/Tengah/Pegunungan, Papua Barat Daya)
// juga dicantumkan sebagai bagian. Supaya tidak dihitung dua kali,
// kabupaten/kota milik provinsi baru dikeluarkan dari daftar provinsi lama.
const PAPUA_BARU = {
  "PAPUA SELATAN": "PAPUA",
  "PAPUA TENGAH": "PAPUA",
  "PAPUA PEGUNUNGAN": "PAPUA",
  "PAPUA BARAT DAYA": "PAPUA BARAT"
};
for (const [baru, lama] of Object.entries(PAPUA_BARU)) {
  const namaBaru = new Set((perProv[baru] || []).map(([n]) => n));
  perProv[lama] = (perProv[lama] || []).filter(([n]) => !namaBaru.has(n));
}

// ---------- Cocokkan kabupaten/kota ----------
const hasilKab = {};
const belumCocok = [];

for (const [kode, nama] of wKab) {
  const kodeProv = kode.split(".")[0];
  const namaProvBps = Object.keys(KODE_PROV).find((p) => KODE_PROV[p] === kodeProv);
  const daftar = perProv[namaProvBps] || [];

  let namaBps = PADANAN[kode];
  if (!namaBps) {
    const kota = /^Kota\s+/i.test(nama);
    const bersih = nama.replace(/^Kabupaten\s+/i, "").replace(/^Kota\s+/i, "");
    // "Kota X" hanya boleh cocok dengan "Kota X" di BPS, dan sebaliknya —
    // supaya Kota Bogor tidak mengambil angka Kabupaten Bogor.
    const ketemu = daftar.find(([n]) => {
      const nKota = /^Kota\s+/i.test(n);
      if (nKota !== kota) return false;
      const nBersih = n.replace(/^Kota\s+/i, "");
      return kunci(nBersih) === kunci(bersih) || kunci(n) === kunci(nama);
    });
    if (ketemu) namaBps = ketemu[0];
  }
  if (!namaBps) { belumCocok.push([kode, nama, namaProvBps]); continue; }

  const baris = daftar.find(([n]) => n === namaBps);
  if (!baris) { belumCocok.push([kode, nama, "padanan tidak ada: " + namaBps]); continue; }
  hasilKab[kode] = keJiwa(baris[1]);
}

// ---------- Jumlah penduduk provinsi ----------
// Dijumlahkan dari kabupaten/kota di dalamnya (angka BPS yang sama).
// Untuk provinsi Papua yang baru, kabupaten/kotanya sudah dipisahkan di atas.
const hasilProv = {};
for (const [kode] of wProv) {
  const anak = wKab.filter((k) => k[0].split(".")[0] === kode);
  const jumlah = anak.reduce((a, [k]) => a + (hasilKab[k] || 0), 0);
  if (jumlah > 0) hasilProv[kode] = jumlah;
}

// ---------- Tulis berkas ----------
const barisKab = Object.keys(hasilKab).sort().map((k) => `  "${k}": ${hasilKab[k]}`);
const barisProv = Object.keys(hasilProv).sort().map((k) => `  "${k}": ${hasilProv[k]}`);

const isi = `/* JUMLAH PENDUDUK PROVINSI & KABUPATEN/KOTA
   Sumber: Badan Pusat Statistik (BPS) — tabel resmi 2026
     · Provinsi : "Penduduk, Laju Pertumbuhan Penduduk, ... Menurut Provinsi, 2026"
     · Kab/Kota : "Jumlah Penduduk menurut Kabupaten/Kota dan Kelompok Umur"
   Angka mentah BPS: alat/bps-penduduk-2026.json
   Format: { "kode wilayah": jumlah jiwa }
   Dibuat otomatis oleh alat/buat-penduduk.js — jangan diubah manual. */
window.PENDUDUK_PROVINSI = {
${barisProv.join(",\n")}
};

window.PENDUDUK_KABKOTA = {
${barisKab.join(",\n")}
};

/* Jumlah penduduk seluruh Indonesia menurut BPS (tabel yang sama). */
window.PENDUDUK_INDONESIA = ${keJiwa(angkaIndonesia)};
`;

fs.writeFileSync(path.join(AKAR, "data", "penduduk.js"), isi, "utf8");

// ---------- Laporan ----------
const totalKab = Object.values(hasilKab).reduce((a, b) => a + b, 0);
const totalProv = Object.values(hasilProv).reduce((a, b) => a + b, 0);
console.log("Kabupaten/kota tercocokkan :", Object.keys(hasilKab).length, "dari", wKab.length);
console.log("Provinsi                   :", Object.keys(hasilProv).length, "dari", wProv.length);
console.log("Jumlah kab/kota            :", totalKab.toLocaleString("id-ID"));
console.log("Jumlah provinsi            :", totalProv.toLocaleString("id-ID"));
console.log("Angka BPS Indonesia        :", keJiwa(angkaIndonesia).toLocaleString("id-ID"));
console.log("Selisih kab/kota vs BPS    :", (totalKab - keJiwa(angkaIndonesia)).toLocaleString("id-ID"));
console.log("Selisih provinsi vs BPS    :", (totalProv - keJiwa(angkaIndonesia)).toLocaleString("id-ID"));
if (belumCocok.length) {
  console.log("BELUM COCOK:", belumCocok.length);
  belumCocok.forEach((x) => console.log("   ", x.join(" | ")));
}
