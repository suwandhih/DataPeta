/* ============================================================
   BUAT DATA AGAMA — data/agama.js
   Sumber: Badan Pusat Statistik (BPS) — tabel resmi BPS PROVINSI.
   BPS Pusat TIDAK menyediakan agama sampai kabupaten/kota, jadi
   angkanya diambil dari BPS provinsi yang menerbitkannya.

   Angka mentah apa adanya: alat/bps-agama-mentah.txt
   (satu blok per provinsi, dipisah baris "@@")

   Hasil:
        data/agama.js -> AGAMA_KABKOTA (per kabupaten/kota)
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
  let t = String(teks).trim();
  if (!t || t === "-" || /^~+$/.test(t)) return 0;
  t = t.replace(/\s/g, "");
  if (t.includes(",")) {
    // Format Indonesia: titik = pemisah ribuan, koma = desimal (mis. "257.189,00")
    t = t.replace(/\./g, "").replace(",", ".");
  } else {
    t = t.replace(/\./g, "");
  }
  const angka = Number(t);
  return isNaN(angka) ? 0 : angka;
};
const kePersen = (teks) => {
  let t = String(teks).trim();
  if (!t || t === "-" || /^~+$/.test(t)) return 0;
  t = t.replace(/\s/g, "").replace(/\./g, "").replace(",", ".");
  if (t.replace(/[^0-9]/g, "").length === 0) return 0;
  // Nilai persen tidak mungkin di atas 100 — kalau ada titik ribuan yang
  // ikut terhapus, angkanya jadi janggal. Dikembalikan apa adanya ke 0.
  const angka = Number(t);
  return isNaN(angka) ? 0 : angka;
};
// BPS menulis kode wilayah di depan nama pada beberapa tabel (mis. "3301 Kabupaten Cilacap").
const buangKode = (s) => s.replace(/^\d{4}\s+/, "").trim();
const angkaDi = (teks) => /^[\d.,\s]+$/.test(String(teks).trim()) && String(teks).trim() !== "";

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
    },
    "32": {
      provinsi: "Jawa Barat",
      tahun: "2023",
      satuan: "jiwa",
      kolom: ["Islam", "Kristen", "Katolik", "Hindu", "Budha", "Konghucu", "Kepercayaan Lain"],
      judul: "Jumlah Penduduk dan Agama Yang Dianut (Jiwa)",
      url: "https://jabar.bps.go.id/id/statistics-table/2/MzM1IzI=/jumlah-penduduk-dan-agama-yang-dianut--jiwa-.html"
    },
    "33": {
      provinsi: "Jawa Tengah",
      tahun: "2023",
      satuan: "persen",
      kolom: ["Islam", "Protestan", "Katolik", "Hindu", "Budha", "Konghucu"],
      judul: "Persentase Penduduk Menurut Agama yang Dianut (Persen)",
      url: "https://jateng.bps.go.id/id/statistics-table?subject=519&keyword=agama"
    },
    "15": {
      provinsi: "Jambi",
      tahun: "2022",
      satuan: "jiwa",
      kolom: ["Islam", "Protestan", "Katolik", "Hindu", "Budha", "Konghucu", "Lainnya"],
      judul: "Jumlah Penduduk Menurut Agama yang Dianut (Jiwa)",
      url: "https://jambi.bps.go.id/id/statistics-table?subject=519&keyword=agama"
    },
    "16": {
      provinsi: "Sumatera Selatan",
      tahun: "2022",
      satuan: "jiwa",
      kolom: ["Islam", "Protestan", "Katolik", "Hindu", "Budha"],
      judul: "Jumlah Penduduk Menurut Agama di Sumatera Selatan Tahun 2019-2022",
      url: "https://sumsel.bps.go.id/id/statistics-table?subject=519&keyword=agama",
      // tabel ini memuat 4 tahun berdampingan (2019 2020 2021 2022) —
      // yang dipakai tahun terakhir.
      tahunBertingkat: 4
    }
  };

// Nama kabupaten/kota BPS -> kode wilayah proyek.
// Dipakai HANYA kalau pencocokan otomatis gagal (beda ejaan / nama lama).
// Contoh yang perlu: BPS menulis nama kabupaten induk saja ("Bandung"),
// padahal di proyek ada Kabupaten Bandung DAN Kota Bandung.
const PADANAN = {
  "12.10": "Labuhan Batu",
  "12.22": "Labuhanbatu Selatan",
  "12.23": "Labuanbatu Utara",
  "12.77": "Padangsidimpuan",
  "31.01": "Kep Seribu",
  "71.09": "Kepulauan Sitaro",
  "74.72": "Kota Baubau",
  "32.04": "Bandung",
  "32.16": "Bekasi",
  "32.17": "Bandung Barat",
  "33.71": "Kota Magelang",
  "33.72": "Kota Surakarta",
  "33.73": "Kota Salatiga",
  "33.74": "Kota Semarang",
  "33.75": "Kota Pekalongan",
  "33.76": "Kota Tegal",
  // Proyek menulis "Kabupaten Ogan Komering" (tanpa "Ilir"); BPS pakai "Ilir".
  "16.02": "Ogan Komering Ilir",
  // Nama BPS vs nama proyek berbeda ejaan.
  "16.12": "Pali",
  "16.72": "Pagar Alam",
  "16.73": "Lubuk Linggau",
  "16.74": "Prabumulih"
};

// ---------- Baca angka mentah ----------
const blok = fs.readFileSync(MENTAH, "utf8").split("@@").map((b) => b.trim()).filter(Boolean);

const hasilKab = {};
const belumCocok = [];

for (const satu of blok) {
  const baris = satu.split("|").map((b) => b.trim()).filter(Boolean);
  const kodeProv = baris[0].split("#")[0].trim();
  const info = SUMBER[kodeProv];
  if (!info) { belumCocok.push(["PROVINSI TIDAK DIKENAL", kodeProv]); continue; }

  const ubah = info.satuan === "persen" ? kePersen : keJiwa;
  const daftar = wKab.filter(([k]) => k.split(".")[0] === kodeProv);
  // Label baris yang berarti "jumlah seluruh provinsi", mis. "Provinsi Jawa Barat".
  const KEPALA_PROV = new Set([kunci("Provinsi " + info.provinsi), kunci(info.provinsi)]);

  for (const b of baris) {
    const sel = b.split("~").map((s) => s.trim());
    if (sel.length < 2) continue;
      const namaBps = buangKode(sel[0]);
      if (!namaBps || /^Sumber\/?Source/i.test(namaBps) || /^Sumber:/.test(namaBps)) continue;
      if (/^~+$/.test(namaBps)) continue;
      // Tabel Sumatera Selatan memuat 4 tahun berdampingan (2019 2020 2021 2022),
      // disusun PER AGAMA: Islam[2019,2020,2021,2022] lalu Protestan[...] dst.
      // Yang dipakai tahun terakhir.
      const ngambil = info.tahunBertingkat
        ? info.kolom.map((_, i) => sel[1 + i * info.tahunBertingkat + (info.tahunBertingkat - 1)])
        : sel.slice(1, 1 + info.kolom.length);
      // lewati baris judul tabel (nama kolom, tahun, atau label wilayah)
      if (info.kolom.some((k) => kunci(k) === kunci(namaBps))) continue;
      if (/^\d{4}$/.test(namaBps)) continue;
      if (/^Kab(upaten)?[\/ ]?Kota/i.test(namaBps) && !info.tahunBertingkat && sel.length < info.kolom.length + 1) continue;
            // Baris jumlah provinsi dilewati — aplikasi tidak memakainya (yang
            // ditampilkan selalu per kabupaten/kota). Lagi pula baris total BPS
            // tidak selalu sama dengan penjumlahan kabupaten/kotanya.
            if (KEPALA_PROV.has(kunci(namaBps)) || kunci(namaBps) === kunci("PROVINSI " + info.provinsi)) continue;
      // Baris harus punya cukup angka — kalau tidak, itu baris judul.
      if (ngambil.filter(angkaDi).length < 2) continue;

      // Angka harus benar-benar terbaca. Ada tabel BPS yang memakai format
      // "257.189,00" — kalau salah baca, hasilnya 0 semua. Baris seperti itu
      // TIDAK dipakai dan dilaporkan (supaya tidak ada angka 0 palsu).
      const adaAngka = ngambil.filter((v) => keJiwa(v) > 0 || kePersen(v) > 0).length;
      if (info.satuan === "jiwa" && adaAngka === 0) { belumCocok.push([kodeProv, "TAK TERBACA: " + namaBps]); continue; }
      if (info.satuan === "persen" && adaAngka < 2) { belumCocok.push([kodeProv, "TAK TERBACA: " + namaBps]); continue; }

      // cocokkan nama BPS ke nama wilayah proyek (lewat KODE kalau ada)
      const kodeSel = (sel[0].match(/^(\d{2})(\d{2})$/) || [])[0];
      const bersih = (s) => s.replace(/^Kabupaten\s+/i, "").replace(/^Kota\s+/i, "").replace(/^Administrasi\s+/i, "");
      const nBersih = bersih(namaBps);
      let kandidat = kodeSel
        ? daftar.filter(([k]) => k.replace(".", "") === kodeSel)
        : daftar.filter(([k, nama]) => PADANAN[k] === sel[0].trim() || kunci(bersih(nama)) === kunci(nBersih));
      let nilai = ngambil.map(ubah);

      // Baris tidak dikenali → dilaporkan (tidak dikarang).
      if (!kandidat.length) { belumCocok.push([kodeProv, namaBps]); continue; }

      // Kalau nama sama dipakai kabupaten DAN kota (mis. Bogor), wajib dibedakan.
      const ketemu = kandidat.length === 1
        ? kandidat[0]
        : (kandidat.find(([k, nama]) => /^Kota\s+/i.test(nama) === /^Kota\s+/i.test(namaBps)) || kandidat[0]);

      hasilKab[ketemu[0]] = nilai;
      }

  // baris jumlah provinsi dilewati (tidak dipakai aplikasi)
}

// ---------- Tulis berkas ----------
const barisKab = Object.keys(hasilKab).sort().map((k) => `  "${k}": [${hasilKab[k].join(", ")}]`);
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
`;

fs.writeFileSync(path.join(AKAR, "data", "agama.js"), isi, "utf8");

// ---------- Laporan ----------
console.log("Provinsi tersedia :", Object.keys(SUMBER).length);
console.log("Kab/kota terisi   :", Object.keys(hasilKab).length);
console.log("Belum cocok       :", belumCocok.length);
for (const b of belumCocok) console.log("   -", b.join(" | "));
