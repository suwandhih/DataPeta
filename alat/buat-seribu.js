/* ============================================================
   BUAT DATA KEPULAUAN SERIBU — data/kepulauan-seribu.js
   Sumber: geoBoundaries (gbOpen IDN ADM2)
     Data asli: Badan Pusat Statistik (BPS) + WFP + OCHA ROAP
     Lisensi: CC BY 3.0 IGO
   Alasan: data batas 38 provinsi (data/peta-indonesia.js) HANYA memuat
   daratan DKI Jakarta — Kepulauan Seribu tidak termasuk. Jadi diambil
   dari sumber lain (BPS) supaya kepulauan ini tampil di peta.
   ============================================================ */

const fs = require("fs");

const URL =
  "https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/IDN/ADM2/geoBoundaries-IDN-ADM2_simplified.geojson";

// Bulatkan koordinat supaya berkas tidak terlalu besar
function bulatkan(geom) {
  const t = (x) => {
    if (typeof x[0] === "number") return [+x[0].toFixed(4), +x[1].toFixed(4)];
    return x.map(t);
  };
  return { type: geom.type, coordinates: t(geom.coordinates) };
}

(async () => {
  console.log("Mengunduh data batas kabupaten Indonesia…");
  const res = await fetch(URL);
  if (!res.ok) throw new Error("Gagal unduh: " + res.status);
  const gj = await res.json();

  const fitur = gj.features.filter(
    (f) => f.properties.shapeName === "Kepulauan Seribu"
  );
  if (!fitur.length) throw new Error("Kepulauan Seribu tidak ditemukan");

  const hasil = fitur.map((f) => ({
    n: f.properties.shapeName,
    g: bulatkan(f.geometry)
  }));

  const isi =
    "/* ============================================================\n" +
    "   KEPULAUAN SERIBU — batas wilayah (1 kabupaten)\n" +
    "   Sumber: geoBoundaries (gbOpen IDN ADM2)\n" +
    "     Data asli: Badan Pusat Statistik (BPS) + WFP + OCHA ROAP\n" +
    "     Lisensi: CC BY 3.0 IGO\n" +
    "   Alasan terpisah: data batas 38 provinsi hanya memuat daratan\n" +
    "   DKI Jakarta, sehingga Kepulauan Seribu tidak ikut tampil.\n" +
    "   Struktur: { n: nama, g: geometri (GeoJSON) }\n" +
    "   ============================================================ */\n\n" +
    "const KEPULAUAN_SERIBU = " +
    JSON.stringify(hasil) +
    ";\n\n" +
    "if (typeof window !== \"undefined\") window.KEPULAUAN_SERIBU = KEPULAUAN_SERIBU;\n";

  fs.writeFileSync("c:/data/DataPeta/data/kepulauan-seribu.js", isi);

  const ukuran = (fs.statSync("c:/data/DataPeta/data/kepulauan-seribu.js").size / 1024).toFixed(1);
  console.log("Tersimpan:", hasil.length, "wilayah ·", ukuran, "KB");
  hasil.forEach((h) => console.log("  " + h.n + " · " + h.g.type));
})();
