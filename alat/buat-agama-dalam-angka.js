/* GABUNG DATA AGAMA DARI "PROVINSI DALAM ANGKA" KE data/agama.js

Alat ini mengambil hasil alat/baca-agama-dalam-angka.py (yang sudah tervalidasi
terhadap baris total provinsi di tabel BPS) dan menambahkannya ke data/agama.js
tanpa mengubah provinsi yang sudah ada.

Angka TIDAK diubah sama sekali - apa adanya dari tabel BPS (aturan F8).
Yang dihitung cuma penyesuaian nama kolom supaya seragam.

Jalankan:  node alat/buat-agama-dalam-angka.js
*/
const fs = require("fs");
const path = require("path");

const AKAR = path.join(__dirname, "..");
const SUMBER = path.join(AKAR, "alat", "agama-dalam-angka.json");
const AGAMA = path.join(AKAR, "data", "agama.js");
const MENTAH = path.join(AKAR, "alat", "bps-agama-mentah.txt");

// Alamat halaman publikasi "Provinsi Dalam Angka" (sumber resmi BPS)
const SUBDOMAIN = {
  "11": "aceh", "12": "sumut", "13": "sumbar", "14": "riau", "15": "jambi",
  "16": "sumsel", "17": "bengkulu", "18": "lampung", "19": "babel",
  "21": "kepri", "31": "jakarta", "32": "jabar", "33": "jateng",
  "34": "yogyakarta", "35": "jatim", "36": "banten", "51": "bali",
  "52": "ntb", "53": "ntt", "61": "kalbar", "62": "kalteng",
  "63": "kalsel", "64": "kaltim", "65": "kaltara", "71": "sulut",
  "72": "sulteng", "73": "sulsel", "74": "sultra", "75": "gorontalo",
  "76": "sulbar", "81": "maluku", "82": "malut", "91": "papua",
  "92": "papuabarat",
};

function bacaJson(jalur) {
  return JSON.parse(fs.readFileSync(jalur, "utf8"));
}

function isiBerkasAgama() {
  const isi = fs.readFileSync(AGAMA, "utf8");
  // Berkas lama memakai objek JS (kunci tanpa tanda kutip), jadi dinilai
  // sebagai JavaScript dengan "window" tiruan, bukan JSON.parse.
  const window = {};
  require("vm").runInNewContext(isi, { window });
  const mSum = isi.match(/window\.AGAMA_SUMBER = \{[\s\S]*?\n\};/);
  const mKab = isi.match(/window\.AGAMA_KABKOTA = \{[\s\S]*?\n\};/);
  if (!mSum || !mKab) throw new Error("Format data/agama.js tidak dikenali");
  return {
    isi,
    sumberAwal: mSum.index,
    sumberAkhir: mSum.index + mSum[0].length,
    kabAwal: mKab.index,
    kabAkhir: mKab.index + mKab[0].length,
    sumber: window.AGAMA_SUMBER,
    kabkota: window.AGAMA_KABKOTA,
  };
}

function utama() {
  const catatan = bacaJson(SUMBER);
  const { isi, sumberAwal, sumberAkhir, kabAwal, kabAkhir, sumber, kabkota } =
    isiBerkasAgama();

  const provinsiBaru = [];
  const kabBaru = {};
  const barisMentah = [];

  for (const kode of Object.keys(catatan).sort()) {
    const c = catatan[kode];
    if (sumber[kode]) continue;                    // sudah ada, jangan ditimpa
    if (!c.kolom || !c.kolom.length) continue;
    const terbaca = c.terbaca || {};
    if (!Object.keys(terbaca).length) continue;

    const sub = SUBDOMAIN[kode] || "";
    const tahun = String(c.tahun || "").slice(0, 4);
    sumber[kode] = {
      provinsi: c.nama,
      tahun: tahun,
      satuan: "jiwa",
      kolom: c.kolom,
      judul: "Jumlah Penduduk Menurut Agama dan Kabupaten/Kota di Provinsi " +
        c.nama + ", " + tahun + " (tabel dari " + c.nama +
        " Dalam Angka " + tahun + ")",
      url: "https://" + sub + ".bps.go.id/id/publication?keyword=dalam+angka",
    };
    provinsiBaru.push(kode);

    const isiMentah = [];
    for (const k of Object.keys(terbaca).sort()) {
      const v = terbaca[k];
      kabkota[k] = v.angka;                        // angka apa adanya (F8)
      isiMentah.push(v.nama.replace(/^(Kabupaten|Kota)\s+/, "") +
        "~" + v.angka.join("~") + "  [jumlah " + v.total + "]");
    }
    barisMentah.push(kode + "#" + c.nama + " Dalam Angka " + tahun +
      " halaman " + (c.halaman_terbaca || []).join(",") +
      "|Jumlah Penduduk Menurut Agama dan Kabupaten/Kota|" +
      c.kolom.join("~") + "|" + tahun +
      "|" + isiMentah.join("|"));
  }

  if (!provinsiBaru.length) {
    console.log("Tidak ada provinsi baru untuk ditambahkan.");
    return;
  }

  // Susun ulang berkas: SUMBER diurutkan, KABKOTA diurutkan
  const urutSumber = {};
  for (const k of Object.keys(sumber).sort()) urutSumber[k] = sumber[k];
  const urutKab = {};
  for (const k of Object.keys(kabkota).sort()) urutKab[k] = kabkota[k];

  const kepala = isi.slice(0, sumberAwal);
  const tengah = isi.slice(sumberAkhir, kabAwal);
  const ekor = isi.slice(kabAkhir);
  const baru = kepala +
    "window.AGAMA_SUMBER = " + JSON.stringify(urutSumber, null, 2) + ";" +
    tengah +
    "window.AGAMA_KABKOTA = " + JSON.stringify(urutKab, null, 2) + ";" +
    ekor;

  fs.writeFileSync(AGAMA, baru, "utf8");

  // Catat angka mentah untuk pembanding (tidak boleh hilang)
  const tambahan = "\n@@\n" + barisMentah.join("\n@@\n") + "\n";
  fs.appendFileSync(MENTAH, tambahan, "utf8");

  console.log("Provinsi baru ditambahkan: " + provinsiBaru.length);
  console.log("  " + provinsiBaru.join(", "));
  console.log("Jumlah kab/kota sekarang: " + Object.keys(urutKab).length);
  console.log("Sumber sekarang: " + Object.keys(urutSumber).length + " provinsi");
}

utama();
