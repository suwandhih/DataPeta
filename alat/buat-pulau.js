/* ============================================================
   BUAT DATA PULAU — data/pulau.js
   Sumber: Natural Earth (public domain)
     ne_10m_geography_regions_polys.geojson
   Nama memakai NAME_ID (nama resmi Indonesia).
   Titik penempatan: dihitung sendiri (beberapa calon titik di dalam pulau),
   supaya aplikasi bisa memilih tempat yang tidak menutupi nama kota.
   ============================================================ */

const fs = require("fs");

const URL =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_geography_regions_polys.geojson";

// Pulau Indonesia yang dipakai (nama resmi NAME_ID dari Natural Earth).
// Yang di luar Indonesia (Nikobar, Mindanao, Palawan, Phuket, Melville, dll) TIDAK diambil.
const DIPAKAI = new Set([
  "Papua", "Kalimantan", "Sumatra", "Sulawesi", "Jawa",
  "Bali", "Pulau Madura", "Pulau Lombok", "Pulau Sumbawa", "Pulau Flores",
  "Pulau Sumba", "Timor", "Alor", "Pulau Wetar", "Pulau Seram",
  "Buru", "Pulau Halmahera", "Morotai", "Taliabu", "Pulau Biak",
  "Kolepom", "Pulau Bangka", "Pulau Belitung", "Bunguran", "Pulau Nias",
  "Pulau Siberut", "Pulau Pagai Selatan", "Pulau Enggano", "Simeulue"
]);

// Hanya pulau yang berada di wilayah Indonesia.
// (Mis. ada juga pulau "Flores" di Kepulauan Azores — harus dibuang.)
const BATAS_ID = { x0: 94, y0: -12, x1: 142, y1: 8 };

const SEMUA_CINCIN_ID = []; // cincin batas 38 provinsi

function tandaDalam(x, y, cincin) {
  let dalam = false;
  for (let i = 0, j = cincin.length - 1; i < cincin.length; j = i++) {
    const xi = cincin[i][0], yi = cincin[i][1];
    const xj = cincin[j][0], yj = cincin[j][1];
    const potong = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (potong) dalam = !dalam;
  }
  return dalam;
}

// Cek apakah titik ada di dalam geometri (Polygon / MultiPolygon),
// dan TIDAK ada di dalam lubangnya.
function dalamGeometri(x, y, geom) {
  const polys = geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates;
  for (const poly of polys) {
    if (tandaDalam(x, y, poly[0])) {
      let diLubang = false;
      for (let i = 1; i < poly.length; i++) {
        if (tandaDalam(x, y, poly[i])) { diLubang = true; break; }
      }
      if (!diLubang) return true;
    }
  }
  return false;
}

function batas(geom) {
  const a = [999, 999, -999, -999];
  const telusuri = (c) => {
    if (typeof c[0] === "number") {
      if (c[0] < a[0]) a[0] = c[0];
      if (c[1] < a[1]) a[1] = c[1];
      if (c[0] > a[2]) a[2] = c[0];
      if (c[1] > a[3]) a[3] = c[1];
      return;
    }
    c.forEach(telusuri);
  };
  telusuri(geom.coordinates);
  return a;
}

function diIndonesia(kotak) {
  return !(
    kotak[2] < BATAS_ID.x0 || kotak[0] > BATAS_ID.x1 ||
    kotak[3] < BATAS_ID.y0 || kotak[1] > BATAS_ID.y1
  );
}

// Titik harus di dalam geometri pulau DAN di dalam wilayah Indonesia.
// Penting: bagian Kalimantan (Sabah/Sarawak, Malaysia) dan Papua (PNG)
// harus dibuang supaya nama pulau tidak jatuh di negara lain.
function titikSah(x, y, geom) {
  if (!dalamGeometri(x, y, geom)) return false;
  for (const c of SEMUA_CINCIN_ID) {
    if (tandaDalam(x, y, c)) return true;
  }
  return false;
}

function jarak(p, q) {
  const dx = p[0] - q[0], dy = p[1] - q[1];
  return Math.sqrt(dx * dx + dy * dy);
}

// Ambil beberapa titik calon: dari kisi-kisi di dalam pulau,
// lalu dipilih yang saling berjauhan (menyebar merata).
function titikCalon(geom, jumlah) {
  const [x0, y0, x1, y1] = batas(geom);
  const lebar = x1 - x0, tinggi = y1 - y0;
  if (lebar <= 0 || tinggi <= 0) return [];

  const kisi = 60;
  const ditemukan = [];
  for (let i = 0; i <= kisi; i++) {
    for (let j = 0; j <= kisi; j++) {
      const x = x0 + (lebar * i) / kisi;
      const y = y0 + (tinggi * j) / kisi;
      if (titikSah(x, y, geom)) ditemukan.push([x, y]);
    }
  }
  if (!ditemukan.length) return [];

  // Titik pertama = yang paling dekat dengan pusat kumpulan titik
  const pusat = ditemukan
    .reduce((a, c) => [a[0] + c[0] / ditemukan.length, a[1] + c[1] / ditemukan.length], [0, 0]);

  const urut = ditemukan.slice().sort((a, b) => jarak(a, pusat) - jarak(b, pusat));
  const dipilih = [urut[0]];

  // Selanjutnya: ambil yang paling jauh dari yang sudah dipilih
  while (dipilih.length < jumlah && dipilih.length < urut.length) {
    let terbaik = null, skorTerbaik = -1;
    for (const t of urut) {
      let terdekat = Infinity;
      for (const d of dipilih) {
        const j = jarak(t, d);
        if (j < terdekat) terdekat = j;
      }
      if (terdekat > skorTerbaik) { skorTerbaik = terdekat; terbaik = t; }
    }
    if (!terbaik) break;
    dipilih.push(terbaik);
  }

  return dipilih.map((p) => [+p[0].toFixed(3), +p[1].toFixed(3)]);
}

// Baca cincin batas 38 provinsi — dipakai untuk memastikan titik penempatan
// nama pulau benar-benar ada di wilayah Indonesia.
function bacaProvinsi() {
  const isi = fs.readFileSync("c:/data/DataPeta/data/peta-indonesia.js", "utf8");
  const mulai = isi.indexOf("= ");
  const akhir = isi.lastIndexOf(";");
  const gj = JSON.parse(isi.slice(mulai + 2, akhir));
  gj.features.forEach((f) => {
    const polys =
      f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates;
    polys.forEach((poly) =>
      poly.forEach((cincin) => {
        const xs = cincin.map((c) => c[0]);
        if (Math.min(...xs) < BATAS_ID.x0 - 1 || Math.max(...xs) > BATAS_ID.x1 + 1) return;
        SEMUA_CINCIN_ID.push(cincin);
      })
    );
  });
}

(async () => {
  bacaProvinsi();
  console.log("Cincin batas Indonesia:", SEMUA_CINCIN_ID.length);

  const res = await fetch(URL);
  if (!res.ok) throw new Error("Gagal unduh: " + res.status);
  const gj = await res.json();

  const hasil = [];
  const dilewati = [];
  const sudah = new Set();

  gj.features.forEach((f) => {
    const p = f.properties;
    if (p.FEATURECLA !== "Island") return;
    const nama = p.NAME_ID || p.NAME;
    if (!DIPAKAI.has(nama)) return;
    if (sudah.has(nama)) return;                 // jangan dua kali
    if (!diIndonesia(batas(f.geometry))) return; // harus di Indonesia

    const kandidat = titikCalon(f.geometry, 12);
    if (!kandidat.length) { dilewati.push(nama); return; }
    sudah.add(nama);

    hasil.push({
      n: nama,
      r: p.SCALERANK,           // 2 = pulau sangat besar · 5 = pulau kecil
      k: kandidat               // titik-titik calon penempatan nama
    });
  });

  hasil.sort((a, b) => a.r - b.r || a.n.localeCompare(b.n));

  const isi =
    "/* ============================================================\n" +
    "   NAMA PULAU INDONESIA — " + hasil.length + " pulau\n" +
    "   Sumber: Natural Earth (public domain), ne_10m_geography_regions_polys.\n" +
    "   Nama memakai nama resmi Indonesia (NAME_ID).\n" +
    "   Titik penempatan sudah dipastikan berada di dalam wilayah Indonesia\n" +
    "   (dicek terhadap batas 38 provinsi, data/peta-indonesia.js).\n" +
    "   Struktur: { n: nama, r: besar-pulau (2 terbesar), k: daftar titik calon }\n" +
    "   Titik calon dipakai aplikasi untuk memilih tempat nama yang\n" +
    "   tidak menutupi nama kota.\n" +
    "   ============================================================ */\n\n" +
    "const PULAU = " +
    JSON.stringify(hasil) +
    ";\n\n" +
    "if (typeof window !== \"undefined\") window.PULAU = PULAU;\n";

  fs.writeFileSync("c:/data/DataPeta/data/pulau.js", isi);

  console.log("Pulau disimpan:", hasil.length);
  hasil.forEach((h) => console.log("  rank " + h.r + " · " + h.n + " · " + h.k.length + " titik"));
  if (dilewati.length) console.log("Dilewati (titik tidak ditemukan):", dilewati.join(", "));
})();
