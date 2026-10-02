/* ============================================================
   PETA INDONESIA — Cloudflare Worker (perantara aman)
   ------------------------------------------------------------
   Tugas: menyembunyikan kunci API Layerbase.
   Aplikasi (GitHub Pages) memanggil Worker ini, bukan Layerbase
   langsung. Kunci API disimpan sebagai "secret" di Cloudflare,
   jadi TIDAK terlihat di halaman publik.

   Cara pasang:
   1. Cloudflare Dashboard → Workers & Pages → Create → Worker
   2. Tempel kode ini
   3. Settings → Variables → tambah SECRET:
        LAYERBASE_KEY  = sk_...        (kunci API Layerbase)
        LAYERBASE_HOST = https://sage.cloud.layerbase.dev
        DB_ID          = 156a6d1e-df46-48a7-b62a-b540a1310241
   4. Deploy → catat alamat Worker (mis. https://peta-api.xxx.workers.dev)
   ============================================================ */

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

function balas(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS }
  });
}

async function jalankanSQL(env, sql) {
  const url = env.LAYERBASE_HOST + "/v1/databases/" + env.DB_ID + "/query";
  const r = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + env.LAYERBASE_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query: sql })
  });
  const t = await r.text();
  if (!r.ok) throw new Error("Layerbase " + r.status + ": " + t);
  try {
    return JSON.parse(t);
  } catch (e) {
    return { raw: t };
  }
}

// ---------- Pengaman nilai untuk SQL (API tidak dukung parameter) ----------
function teks(v) {
  if (v === null || v === undefined) return "NULL";
  return "'" + String(v).replace(/'/g, "''") + "'";
}

function angka(v) {
  const n = Number(v);
  return isNaN(n) ? "NULL" : String(n);
}

export default {
  async fetch(request, env) {
    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS });
    }
    if (request.method !== "POST") {
      return balas({ error: "Gunakan POST" }, 405);
    }

    let isi;
    try {
      isi = await request.json();
    } catch (e) {
      return balas({ error: "Body bukan JSON" }, 400);
    }

    const aksi = isi.aksi;

    try {
      // ---------- Ambil semua lokasi ----------
      if (aksi === "ambilSemua") {
        const hasil = await jalankanSQL(
          env,
          "SELECT id, nama, wilayah, kategori, lon, lat, inisial, gambar, rincian, diubah FROM lokasi ORDER BY nama"
        );
        return balas({ ok: true, data: hasil });
      }

      // ---------- Simpan (tambah / ubah) ----------
      if (aksi === "simpan") {
        const l = isi.lokasi || {};
        if (!l.id || !l.nama) return balas({ error: "id & nama wajib" }, 400);
        const rincian = JSON.stringify(l.rincian || []);
        const diubah = new Date().toISOString();
        const sql =
          "INSERT INTO lokasi (id, nama, wilayah, kategori, lon, lat, inisial, gambar, rincian, diubah) VALUES (" +
          teks(l.id) + ", " + teks(l.nama) + ", " + teks(l.wilayah || "") + ", " +
          teks(l.kategori || "") + ", " + angka(l.lon) + ", " + angka(l.lat) + ", " +
          teks(l.inisial || "") + ", " + teks(l.gambar || "") + ", " +
          teks(rincian) + ", " + teks(diubah) + ") " +
          "ON CONFLICT(id) DO UPDATE SET nama=excluded.nama, wilayah=excluded.wilayah, " +
          "kategori=excluded.kategori, lon=excluded.lon, lat=excluded.lat, " +
          "inisial=excluded.inisial, gambar=excluded.gambar, rincian=excluded.rincian, diubah=excluded.diubah";
        await jalankanSQL(env, sql);
        return balas({ ok: true, id: l.id, diubah: diubah });
      }

      // ---------- Hapus ----------
      if (aksi === "hapus") {
        if (!isi.id) return balas({ error: "id wajib" }, 400);
        await jalankanSQL(env, "DELETE FROM lokasi WHERE id = " + teks(isi.id));
        return balas({ ok: true });
      }

      return balas({ error: "Aksi tidak dikenal: " + aksi }, 400);
    } catch (e) {
      return balas({ error: String(e.message || e) }, 500);
    }
  }
};
