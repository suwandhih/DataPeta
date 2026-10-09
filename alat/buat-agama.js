/* ============================================================
   BUAT DATA AGAMA — data/agama.js
   Sumber: Badan Pusat Statistik (BPS) — tabel resmi BPS PROVINSI.
   BPS Pusat TIDAK menyediakan agama sampai kabupaten/kota, jadi
   angkanya diambil dari BPS provinsi yang menerbitkannya.

   Angka mentah apa adanya: alat/bps-agama-mentah.txt
   (satu blok per provinsi, dipisah baris "@@")

   Hasil:
     data/agama.js -> AGAMA_KABKOTA (per kabupaten/kota)
                      AGAMA_PROVINSI (jumlah provinsi)
                      AGAMA_SUMBER   (keterangan sumber per provinsi)

   Cara pakai:  node alat/buat-agama.js
   ============================================================ */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const AKAR = path.join(__dirname, "..");
const MENTAH = path.join(__dirname, "bps-agama-mentah.txt");

// ---------- Bantu ----------
const kunci = (s) => s.toUpperCase().replace(/[^A-Z0-9]/g, "");
const keJiwa = (teks) => {
  const t = String(teks).trim();
  if (!t || t === "-") return 0;
  return Number(t.replace(/\s/g, "").replace(/\./g, ""));
};
const kePersen = (teks) => {
  const t = String(teks).trim();
  if (!t || t === "-") return 0;
  return Number(t.replace(",", "."));
};

// ---------- Baca data wilayah proyek ----------
function muatWilayah(berkas) {
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(AKAR, "data", "wilayah", berkas), "utf8"), ctx);
  return ctx.window;
}
const wKab = muatWilayah("kabkota.js").WILAYAH_KABKOTA;

// ---------- Keterangan tiap sumber ----------
// satuan : "jiwa" (jumlah orang) atau "persen" (persentase penduduk)
// kolom  : nama kolom agama sesuai tabel BPS, urut seperti di tabel
const SUMBER = {
  "31": {
    provinsi: "DKI Jakarta",
    tahun: "2024",
    satuan: "jiwa",
    kolom: ["Islam", "Kristen", "Katolik", "Hindu", "Budha", "Konghucu", "Aliran Kepercayaan"],
    judul: "Jumlah Penduduk Menurut Agama dan Kabupaten/Kota di Provinsi DKI Jakarta",
    url: "https://jakarta.bps.go.id/id/statistics-table/2/ODQ0IzI=/jumlah-penduduk-menurut-agama-dan-kabupaten-kota-di-provinsi-dki-jakarta.html"
  },
  "12": {
    provinsi: "Sumatera Utara",
    tahun: "2025",
    satuan: "jiwa",
    kolom: ["Islam", "Protestan", "Katolik", "Hindu", "Budha", "Konghucu"],
    judul: "Jumlah Penduduk Menurut Kabupaten/Kota dan Agama yang Dianut",
    url: "https://sumut.bps.go.id/id/statistics-table/2/ODA0IzI=/jumlah-penduduk-menurut-kabupaten-kota-dan-agama-yang-dianut.html"
  },
  "71": {
    provinsi: "Sulawesi Utara",
    tahun: "2018",
    satuan: "jiwa",
    kolom: ["Islam", "Kristen", "Katolik", "Hindu", "Budha"],
    judul: "Jumlah Penduduk Menurut Kabupaten/Kota dan Agama di Provinsi Sulawesi Utara (Jiwa)",
    url: "https://sulut.bps.go.id/id/statistics-table/2/NjE3IzI=/jumlah-penduduk-menurut-kabupaten-kota-dan-agama-di-provinsi-sulawesi-utara--jiwa-.html"
  },
  "74": {
    provinsi: "Sulawesi Tenggara",
    tahun: "2022",
    satuan: "jiwa",
    kolom: ["Islam", "Protestan", "Katolik", "Hindu", "Budha", "Lainnya"],
    judul: "Jumlah Penduduk Menurut Kabupaten/Kota dan Agama yang Dianut di Provinsi Sulawesi Tenggara, 2022",
    url: "https://sultra.bps.go.id/id/statistics-table/1/NDUwNCMx/jumlah-penduduk-menurut-kabupaten-kota-dan-agama-yang-dianut-di-provinsi-sulawesi-tenggara--2022.html"
  },
  "65": {
    provinsi: "Kalimantan Utara",
    tahun: "2021",
    satuan: "persen",
    kolom: ["Islam", "Protestan", "Katolik", "Hindu", "Budha", "Lainnya"],
    judul: "Persentase Penduduk Menurut Agama yang Dianut (Persen)",
    url: "https://kaltara.bps.go.id/id/statistics-table/2/NDYyIzI=/persentase-penduduk-menurut-agama-yang-dianut--persen-.html"
  }
};

// Nama kabupaten/kota BPS -> kode wilayah proyek.
// Dipakai HANYA kalau pencocokan otomatis gagal (beda ejaan / nama lama).
const PADANAN = {
  "12.10": "Labuhan Batu",
  "12.22": "Labuhanbatu Selatan",
  "12.23": "Labuanbatu Utara",
  "12.77": "Padangsidimpuan",
  "31.01": "Kep Seribu",
  "71.09": "Kepulauan Sitaro",
  "74.72": "Kota Baubau"
};

// ---------- Baca angka mentah ----------
const blok = fs.readFileSync(MENTAH, "utf8").split("@@").map((b) => b.trim()).filter(Boolean);

const hasilKab = {};
const belumCocok = [];
const hasilProv = {};

for (const satu of blok) {
  const baris = satu.split("|").map((b) => b.trim()).filter(Boolean);
  const kodeProv = baris[0].split("#")[0].trim();
  const info = SUMBER[kodeProv];
  if (!info) { belumCocok.push(["PROVINSI TIDAK DIKENAL", kodeProv]); continue; }

  const ubah = info.satuan === "persen" ? kePersen : keJiwa;
  const daftar = wKab.filter(([k]) => k.split(".")[0] === kodeProv);

  for (const b of baris) {
    const sel = b.split("~").map((s) => s.trim());
    if (sel.length < 2) continue;
    const namaBps = sel[0];
    if (!namaBps || /^Sumber\/Source/i.test(namaBps)) continue;
        // lewati baris judul tabel (nama kolom, tahun, atau label wilayah)
        if (info.kolom.some((k) => kunci(k) === kunci(namaBps))) continue;
        if (/^\d{4}$/.test(namaBps)) continue;
        if (/^Kab(upaten)?[\/ ]?Kota/i.test(namaBps)) continue;
        if (kunci(namaBps) === kunci(info.provinsi)) {
      // baris jumlah provinsi — dipakai APA ADANYA dari BPS.
      // (Di tabel Sulawesi Tenggara baris total ini tidak sama dengan
      //  penjumlahan baris kabupaten/kota; yang dipakai tetap angka BPS.)
      hasilProv[kodeProv] = sel.slice(1, 1 + info.kolom.length).map(ubah);
      continue;
    }

        // cocokkan nama BPS ke nama wilayah proyek
        const bersih = (s) => s.replace(/^Kabupaten\s+/i, "").replace(/^Kota\s+/i, "").replace(/^Administrasi\s+/i, "");
        const nBersih = bersih(namaBps);
        const kandidat = daftar.filter(([k, nama]) => PADANAN[k] === namaBps || kunci(bersih(nama)) === kunci(nBersih));
        // kalau nama sama dipakai kabupaten DAN kota (mis. Bogor), wajib dibedakan
        const ketemu = kandidat.length === 1
          ? kandidat[0]
          : kandidat.find(([k, nama]) => /^Kota\s+/i.test(nama) === /^Kota\s+/i.test(namaBps));
        if (!ketemu) { belumCocok.push([kodeProv, namaBps]); continue; }

        const nilai = sel.slice(1, 1 + info.kolom.length).map(ubah);
        hasilKab[ketemu[0]] = nilai;
      }

  // jumlah provinsi sudah diambil dari baris total BPS di atas
}

// ---------- Tulis berkas ----------
const barisKab = Object.keys(hasilKab).sort().map((k) => `  "${k}": [${hasilKab[k].join(", ")}]`);
const barisProv = Object.keys(hasilProv).sort().map((k) => `  "${k}": [${hasilProv[k].join(", ")}]`);
const barisSumber = Object.keys(SUMBER).sort().map((k) => {
  const s = SUMBER[k];
  return `  "${k}": { provinsi: ${JSON.stringify(s.provinsi)}, tahun: ${JSON.stringify(s.tahun)}, satuan: ${JSON.stringify(s.satuan)},\n` +
    `         kolom: ${JSON.stringify(s.kolom)},\n` +
    `         judul: ${JSON.stringify(s.judul)},\n` +
    `         url: ${JSON.stringify(s.url)} }`;
});

const isi = `/* DATA AGAMA PER KABUPATEN/KOTA
   Sumber: Badan Pusat Statistik (BPS) — tabel resmi BPS PROVINSI.
   BPS Pusat tidak menerbitkan agama sampai kabupaten/kota, jadi angkanya
   diambil dari BPS provinsi yang menerbitkannya. Baru ${Object.keys(SUMBER).length} provinsi
   yang tersedia; provinsi lain belum ada datanya (tidak dikarang).
   Angka mentah BPS: alat/bps-agama-mentah.txt
   Format: { "kode wilayah": [ angka urut sesuai AGAMA_SUMBER[kodeProvinsi].kolom ] }
   Dibuat otomatis oleh alat/buat-agama.js — jangan diubah manual. */
window.AGAMA_SUMBER = {
${barisSumber.join(",\n")}
};

window.AGAMA_KABKOTA = {
${barisKab.join(",\n")}
};

window.AGAMA_PROVINSI = {
${barisProv.join(",\n")}
};
`;

fs.writeFileSync(path.join(AKAR, "data", "agama.js"), isi, "utf8");

// ---------- Laporan ----------
console.log("Provinsi tersedia :", Object.keys(SUMBER).length);
console.log("Kab/kota terisi   :", Object.keys(hasilKab).length);
console.log("Belum cocok       :", belumCocok.length);
for (const b of belumCocok) console.log("   -", b.join(" | "));
