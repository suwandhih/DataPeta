/* ============================================================
   BUAT DATA WILAYAH INDONESIA — folder data/wilayah/
   Sumber: emsifa/api-wilayah-indonesia (API statis, lisensi MIT)
     Data asli:
       - Kode & nama wilayah : Kepmendagri No. 300.2.2-2430 Tahun 2025
       - Koordinat (lat/lng) : Badan Informasi Geospasial (BIG)
       - Kode pos            : cahyadsn/wilayah_kodepos
   Hasil (format ringkas, satu baris per wilayah):
     provinsi.js          -> [kode, nama, lat, lng]
     kabkota.js           -> [kode, nama, lat, lng]
     kecamatan/{prov}.js  -> [kode, nama, lat, lng]
     desa/{kab}.js        -> [kode, nama, lat, lng, kodepos]
   Induk wilayah TIDAK disimpan — bisa dibaca dari kode itu sendiri
   (dipisah titik): 32 -> 32.73 -> 32.73.01 -> 32.73.01.1001
   ============================================================ */

const fs = require("fs");
const path = require("path");

const BASE = "https://www.emsifa.com/api-wilayah-indonesia/v2";
const AKAR = "c:/data/DataPeta/data/wilayah";
const PARALEL = 24;

// ---------- Bantu ----------
function tulisBerkas(berkas, isi) {
  fs.mkdirSync(path.dirname(berkas), { recursive: true });
  fs.writeFileSync(berkas, isi);
}

function ukuranKB(berkas) {
  return (fs.statSync(berkas).size / 1024).toFixed(1);
}

async function ambil(url) {
  for (let coba = 0; coba < 5; coba++) {
    try {
      const r = await fetch(url);
      if (r.status === 404) return null;
      if (!r.ok) throw new Error("HTTP " + r.status);
      const j = await r.json();
      return j.data;
    } catch (e) {
      if (coba === 4) throw new Error(url + " → " + e.message);
      await new Promise((s) => setTimeout(s, 400 * (coba + 1)));
    }
  }
}

// Jalankan tugas dengan batas jumlah permintaan bersamaan
async function kerjakanBanyak(daftar, batas, fn) {
  const hasil = new Array(daftar.length);
  let i = 0;
  let selesai = 0;
  async function pekerja() {
    while (i < daftar.length) {
      const idx = i++;
      hasil[idx] = await fn(daftar[idx], idx);
      selesai++;
      if (selesai % 500 === 0) {
        process.stdout.write("  " + selesai + "/" + daftar.length + "\r");
      }
    }
  }
  await Promise.all(Array.from({ length: batas }, pekerja));
  return hasil;
}

// Bulatkan koordinat (4 desimal ≈ 11 meter — cukup untuk pusat peta)
function bulat(x) {
  return x === null || x === undefined || isNaN(x) ? null : +Number(x).toFixed(4);
}

// Baris ringkas: buang nilai null di ujung supaya berkas lebih kecil
function baris(kode, nama, lat, lng, kodepos) {
  const b = [kode, nama, bulat(lat), bulat(lng)];
  if (kodepos) b.push(kodepos);
  return b;
}

function berkasJs(judul, namaVar, isi) {
  return (
    "/* " + judul + "\n" +
    "   Sumber: emsifa/api-wilayah-indonesia (MIT)\n" +
    "     Kode & nama: Kepmendagri No. 300.2.2-2430 Tahun 2025\n" +
    "     Koordinat  : Badan Informasi Geospasial (BIG)\n" +
    "   Format: [kode, nama, lat, lng] — induk dibaca dari kode (dipisah titik)\n" +
    "   Dibuat otomatis oleh alat/buat-wilayah.js — jangan diubah manual. */\n" +
    "window." + namaVar + " = " + JSON.stringify(isi) + ";\n"
  );
}

// ---------- Jalan ----------
(async () => {
  const mulai = Date.now();

  // 1. Provinsi
  console.log("1/4  Mengunduh 38 provinsi…");
  const provinsi = await ambil(BASE + "/provinces.json");
  if (!provinsi || !provinsi.length) throw new Error("Provinsi kosong");
  const barisProvinsi = provinsi.map((p) => baris(p.id, p.name, p.lat, p.lng));
  tulisBerkas(AKAR + "/provinsi.js", berkasJs("DAFTAR PROVINSI INDONESIA (38)", "WILAYAH_PROVINSI", barisProvinsi));
  console.log("     " + barisProvinsi.length + " provinsi · " + ukuranKB(AKAR + "/provinsi.js") + " KB");

  // 2. Kabupaten / kota
  console.log("2/4  Mengunduh kabupaten & kota…");
  const perProvinsiKab = await kerjakanBanyak(provinsi, PARALEL, (p) =>
    ambil(BASE + "/regencies/" + p.id + ".json")
  );
  const barisKab = [];
  perProvinsiKab.forEach((daftar) => {
    (daftar || []).forEach((k) => barisKab.push(baris(k.id, k.name, k.lat, k.lng)));
  });
  tulisBerkas(AKAR + "/kabkota.js", berkasJs("DAFTAR KABUPATEN & KOTA (514)", "WILAYAH_KABKOTA", barisKab));
  console.log("     " + barisKab.length + " kab/kota · " + ukuranKB(AKAR + "/kabkota.js") + " KB");

  // 3. Kecamatan — disimpan per provinsi supaya tidak berat saat dibuka
  console.log("3/4  Mengunduh kecamatan…");
  const perKabKec = await kerjakanBanyak(barisKab, PARALEL, (k) =>
    ambil(BASE + "/districts/" + k[0] + ".json")
  );
  const kecPerProvinsi = {};
  const semuaKec = [];
  perKabKec.forEach((daftar, i) => {
    const prov = barisKab[i][0].split(".")[0];
    if (!kecPerProvinsi[prov]) kecPerProvinsi[prov] = [];
    (daftar || []).forEach((d) => {
      const b = baris(d.id, d.name, d.lat, d.lng);
      kecPerProvinsi[prov].push(b);
      semuaKec.push(b);
    });
  });
  let totalKecKB = 0;
  Object.keys(kecPerProvinsi).forEach((prov) => {
    const berkas = AKAR + "/kecamatan/" + prov + ".js";
    tulisBerkas(berkas, berkasJs("DAFTAR KECAMATAN — PROVINSI " + prov, "WILAYAH_KECAMATAN", kecPerProvinsi[prov]));
    totalKecKB += fs.statSync(berkas).size / 1024;
  });
  console.log("     " + semuaKec.length + " kecamatan · " + Object.keys(kecPerProvinsi).length + " berkas · " + totalKecKB.toFixed(1) + " KB");

  // 4. Desa / kelurahan — disimpan per kabupaten (dimuat saat dibuka saja)
  console.log("4/4  Mengunduh desa & kelurahan…");
  const perKecDesa = await kerjakanBanyak(semuaKec, PARALEL, (d) =>
    ambil(BASE + "/villages/" + d[0] + ".json")
  );
  const desaPerKab = {};
  let totalDesa = 0;
  perKecDesa.forEach((daftar, i) => {
    const kab = semuaKec[i][0].split(".").slice(0, 2).join(".");
    if (!desaPerKab[kab]) desaPerKab[kab] = [];
    (daftar || []).forEach((v) => {
      desaPerKab[kab].push(baris(v.id, v.name, v.lat, v.lng, v.postal_code));
      totalDesa++;
    });
  });
  let totalDesaKB = 0;
  Object.keys(desaPerKab).forEach((kab) => {
    const berkas = AKAR + "/desa/" + kab + ".js";
    tulisBerkas(berkas, berkasJs("DAFTAR DESA & KELURAHAN — KAB/KOTA " + kab, "WILAYAH_DESA", desaPerKab[kab]));
    totalDesaKB += fs.statSync(berkas).size / 1024;
  });
  console.log("     " + totalDesa + " desa/kelurahan · " + Object.keys(desaPerKab).length + " berkas · " + totalDesaKB.toFixed(1) + " KB");

  const detik = ((Date.now() - mulai) / 1000).toFixed(0);
  console.log("\nSelesai dalam " + detik + " detik.");
  console.log("  provinsi  : " + barisProvinsi.length);
  console.log("  kab/kota  : " + barisKab.length);
  console.log("  kecamatan : " + semuaKec.length);
  console.log("  desa      : " + totalDesa);
})().catch((e) => {
  console.error("GAGAL:", e.message);
  process.exit(1);
});
