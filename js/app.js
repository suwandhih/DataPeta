/* ============================================================
   PETA INDONESIA — Logika antarmuka
   Data lokasi disimpan di IndexedDB (tidak hilang saat ditutup).
   Peta digambar dari data batas provinsi asli (data/peta-indonesia.js).
   ============================================================ */

(function () {
  "use strict";

  const NS = "http://www.w3.org/2000/svg";

  // ---------- Ambil elemen ----------
  const svg = document.getElementById("petaSvg");
  const viewportLapis = document.getElementById("viewport");
  const lapisNegara = document.getElementById("lapisNegara");
  const lapisDanau = document.getElementById("lapisDanau");
  const lapisSungai = document.getElementById("lapisSungai");
  const lapisProvinsi = document.getElementById("lapisProvinsi");
  const lapisPulauKecil = document.getElementById("lapisPulauKecil");
  const lapisGunung = document.getElementById("lapisGunung");
  const lapisKota = document.getElementById("lapisKota");
  const lapisPulau = document.getElementById("lapisPulau");
  const lapisPenanda = document.getElementById("lapisPenanda");
  const lapisNamaKota = document.getElementById("lapisNamaKota");
  const labelPeta = document.getElementById("labelPeta");
  const zoomMasuk = document.getElementById("zoomMasuk");
  const zoomKeluar = document.getElementById("zoomKeluar");
  const zoomReset = document.getElementById("zoomReset");
  const kotakCari = document.getElementById("kotakCari");
  const hapusCari = document.getElementById("hapusCari");
  const kategoriBar = document.getElementById("kategori");
  const panel = document.getElementById("panel");
  const panelIsi = document.getElementById("panelIsi");
  const panelTutup = document.getElementById("panelTutup");
  const tombolMenu = document.getElementById("tombolMenu");
  const laci = document.getElementById("laci");
  const laciTutup = document.getElementById("laciTutup");
  const tirai = document.getElementById("tirai");
  const tombolTambah = document.getElementById("tombolTambah");
  const formLokasi = document.getElementById("formLokasi");
  const formJudul = document.getElementById("formJudul");
  const formTutup = document.getElementById("formTutup");
  const formBatal = document.getElementById("formBatal");
  const formSimpan = document.getElementById("formSimpan");
  const formHapus = document.getElementById("formHapus");
  const fNama = document.getElementById("fNama");
  const fWilayah = document.getElementById("fWilayah");
  const fKategori = document.getElementById("fKategori");
  const fLon = document.getElementById("fLon");
  const fLat = document.getElementById("fLat");
  const fInisial = document.getElementById("fInisial");
  const fRincian = document.getElementById("fRincian");
  const tombolRincian = document.getElementById("tombolRincian");

  // ---------- Ukuran kanvas peta ----------
  const VB_W = 1000;
  const VB_H = 400;

  // ---------- Keadaan ----------
  let kategoriAktif = "Semua";
  let cariTeks = "";
  let idTerpilih = null;
  let proyeksi = null;
  let daftarLokasi = [];
  let idSedangDiubah = null;

  // ---------- Bantu ----------
  function inisialDari(nama) {
    return nama
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((k) => k[0].toUpperCase())
      .join("");
  }

  function cocok(lokasi) {
    const cocokKategori =
      kategoriAktif === "Semua" || lokasi.kategori === kategoriAktif;
    const t = cariTeks.trim().toLowerCase();
    const cocokCari =
      t === "" ||
      lokasi.nama.toLowerCase().includes(t) ||
      lokasi.wilayah.toLowerCase().includes(t);
    return cocokKategori && cocokCari;
  }

  // ---------- Proyeksi koordinat → kanvas ----------
  function siapkanProyeksi(geojson) {
    let minLon = Infinity, maxLon = -Infinity, minLat = Infinity, maxLat = -Infinity;

    function telusuri(coords) {
      if (typeof coords[0] === "number") {
        const lon = coords[0], lat = coords[1];
        if (lon < minLon) minLon = lon;
        if (lon > maxLon) maxLon = lon;
        if (lat < minLat) minLat = lat;
        if (lat > maxLat) maxLat = lat;
      } else {
        coords.forEach(telusuri);
      }
    }
    geojson.features.forEach((f) => telusuri(f.geometry.coordinates));

    const skala = VB_W / (maxLon - minLon);
    const tinggi = (maxLat - minLat) * skala;
    const offsetY = (VB_H - tinggi) / 2;
    proyeksi = { minLon, maxLat, skala, offsetY };
  }

  function proyek(lon, lat) {
    return {
      x: (lon - proyeksi.minLon) * proyeksi.skala,
      y: (proyeksi.maxLat - lat) * proyeksi.skala + proyeksi.offsetY
    };
  }

  // ---------- Zoom & geser ----------
  let zk = 1;          // tingkat zoom (1 = seluruh Indonesia)
  let tx = 0;          // geser horizontal
  let ty = 0;          // geser vertikal
  const ZK_MIN = 1;
  const ZK_MAKS = 12;

  function terapkanTampilan() {
    viewportLapis.setAttribute(
      "transform",
      "translate(" + tx.toFixed(1) + "," + ty.toFixed(1) + ") scale(" + zk.toFixed(3) + ")"
    );
    gambarPulau();
    gambarKota();
    gambarGunung();
    gambarPenanda();
  }

  function zoomKe(nilai, pusatX, pusatY) {
    const baru = Math.max(ZK_MIN, Math.min(ZK_MAKS, nilai));
    if (baru === zk) return;
    const px = pusatX === undefined ? VB_W / 2 : pusatX;
    const py = pusatY === undefined ? VB_H / 2 : pusatY;
    // Jaga titik di bawah kursor tetap di tempatnya
    tx = px - (px - tx) * (baru / zk);
    ty = py - (py - ty) * (baru / zk);
    zk = baru;
    terapkanTampilan();
  }

  function batasiGeser() {
    const minX = VB_W * (1 - zk);
    const minY = VB_H * (1 - zk);
    if (tx > 0) tx = 0;
    if (ty > 0) ty = 0;
    if (tx < minX) tx = minX;
    if (ty < minY) ty = minY;
  }

  // ---------- Nama pulau (tampil permanen) ----------
  // Satu nama per pulau. Tempatnya dipilih otomatis supaya tidak
  // menutupi nama kota, nama gunung, penanda, maupun nama pulau lain.

  // Ukuran huruf (px, sama dengan css/style.css). Karena tiap lapisan
  // dikompensasi 1/zk, ukuran huruf di LAYAR selalu tetap sebesar ini.
  const HURUF = { pulauBesar: 12, pulau: 10, kotaBesar: 12, kota: 9, gunung: 8 };
  const SPASI = { pulauBesar: 1.8, pulau: 1.2 };

  // Perkiraan lebar & tinggi tulisan DI LAYAR (satuan px layar).
  function ukuranTeks(nama, ukuran, spasi) {
    return { w: nama.length * (ukuran * 0.6 + (spasi || 0)) + 2, h: ukuran * 1.15 };
  }

  // Peta → layar
  function keLayar(p) {
    return { x: p.x * zk + tx, y: p.y * zk + ty };
  }

  // Kotak tulisan di LAYAR untuk sebuah sisi penempatan.
  // (sx, sy) = titik di layar. Tulisan digambar dengan
  // dominant-baseline="middle", jadi y = titik tengah tegak.
  // jarak = jarak tepi tulisan dari titik (menyesuaikan besar penanda).
  function kotakSisi(sisi, w, h, sx, sy, jarak) {
    const j = jarak || 14;
    const jj = j + 18;   // untuk pilihan "jauh"
    if (sisi === "atas") return { kiri: sx - w / 2, kanan: sx + w / 2, atas: sy - j - h / 2, bawah: sy - j + h / 2 };
    if (sisi === "bawah") return { kiri: sx - w / 2, kanan: sx + w / 2, atas: sy + j - h / 2, bawah: sy + j + h / 2 };
    if (sisi === "kiri") return { kiri: sx - j - w, kanan: sx - j, atas: sy - h / 2, bawah: sy + h / 2 };
    if (sisi === "kanan") return { kiri: sx + j, kanan: sx + j + w, atas: sy - h / 2, bawah: sy + h / 2 };
    if (sisi === "kanan-atas") return { kiri: sx + j, kanan: sx + j + w, atas: sy - j - h / 2, bawah: sy - j + h / 2 };
    if (sisi === "kanan-bawah") return { kiri: sx + j, kanan: sx + j + w, atas: sy + j - h / 2, bawah: sy + j + h / 2 };
    // Pilihan jauh — dipakai kalau penanda lokasi tepat berada di kota
    if (sisi === "atas-jauh") return { kiri: sx - w / 2, kanan: sx + w / 2, atas: sy - jj - h / 2, bawah: sy - jj + h / 2 };
    if (sisi === "bawah-jauh") return { kiri: sx - w / 2, kanan: sx + w / 2, atas: sy + jj - h / 2, bawah: sy + jj + h / 2 };
    if (sisi === "kiri-jauh") return { kiri: sx - jj - w, kanan: sx - jj, atas: sy - h / 2, bawah: sy + h / 2 };
    return { kiri: sx + jj, kanan: sx + jj + w, atas: sy - h / 2, bawah: sy + h / 2 };
  }

  function bentrok(a, b) {
    return !(a.kanan < b.kiri || a.kiri > b.kanan || a.bawah < b.atas || a.atas > b.bawah);
  }

  // Pilih sisi penempatan yang paling sedikit bertabrakan.
  // Kalau ada sisi yang bebas (0 tabrakan), itu yang dipilih.
  function pilihSisi(sx, sy, w, h, daftarSisi, rintangan, jarak) {
    let terbaik = daftarSisi[0];
    let luasTerbaik = Infinity;

    for (const sisi of daftarSisi) {
      const kotak = kotakSisi(sisi, w, h, sx, sy, jarak);
      let luas = 0;
      for (const k of rintangan) {
        const dx = Math.min(kotak.kanan, k.kanan) - Math.max(kotak.kiri, k.kiri);
        const dy = Math.min(kotak.bawah, k.bawah) - Math.max(kotak.atas, k.atas);
        if (dx > 0 && dy > 0) luas += dx * dy;
      }
      if (luas < luasTerbaik) {
        luasTerbaik = luas;
        terbaik = sisi;
        if (luas === 0) break;
      }
    }
    return terbaik;
  }

  const SEMUA_SISI = [
    "kanan", "kiri", "atas", "bawah", "kanan-atas", "kanan-bawah",
    "kanan-jauh", "kiri-jauh", "atas-jauh", "bawah-jauh"
  ];

  // Sisi yang dipakai lebih dulu (yang dekat) — supaya nama tetap rapat ke kotanya
  const SISI_DEKAT = ["kanan", "kiri", "atas", "bawah", "kanan-atas", "kanan-bawah"];

  // Kumpulkan kotak semua tulisan yang sudah pasti tampil (kota + gunung + penanda).
  function kotakRintangan() {
    const kotak = [];

    daftarKotaTampil().forEach((k) => kotak.push(k.rect));

    // Nama gunung hanya tampil saat zoom ≥ 2 — jadi baru jadi penghalang saat itu
    if (zk >= 2 && typeof GUNUNG !== "undefined") {
      GUNUNG.forEach((g) => {
        const p = proyek(g.lon, g.lat);
        const s = keLayar(p);
        if (s.x < -80 || s.x > VB_W + 80 || s.y < -80 || s.y > VB_H + 80) return;
        const nama = (g.n || "Puncak") + " " + (g.e ? g.e + " m" : "");
        const u = ukuranTeks(nama, HURUF.gunung, 0);
        kotak.push({ kiri: s.x + 6, kanan: s.x + 6 + u.w, atas: s.y - u.h / 2, bawah: s.y + u.h / 2 });
      });
    }

    // Penanda lokasi milik Bapak — juga jangan ditutupi.
    // Penanda membesar saat zoom (radius 10 × zoom), jadi ikut dihitung.
    const rPenanda = 10 * zk + 3;
    daftarLokasi.filter(cocok).forEach((lokasi) => {
      const s = keLayar(proyek(lokasi.lon, lokasi.lat));
      if (s.x < -80 || s.x > VB_W + 80 || s.y < -80 || s.y > VB_H + 80) return;
      kotak.push({ kiri: s.x - rPenanda, kanan: s.x + rPenanda, atas: s.y - rPenanda, bawah: s.y + rPenanda });
    });

    return kotak;
  }

  function gambarPulau() {
    if (typeof PULAU === "undefined" || !proyeksi) return;
    lapisPulau.innerHTML = "";

    const rintangan = kotakRintangan();

    // Titik calon SEMUA pulau (di layar) — supaya nama pulau saling menjauh.
    const titikPulau = [];
    PULAU.forEach((pulau) => {
      pulau.k.forEach((t) => {
        const s = keLayar(proyek(t[0], t[1]));
        if (s.x >= -60 && s.x <= VB_W + 60 && s.y >= -60 && s.y <= VB_H + 60) {
          titikPulau.push({ x: s.x, y: s.y, n: pulau.n });
        }
      });
    });

    // Kepulauan Seribu — nama ditampilkan di atas gugusannya.
    // (Tidak masuk daftar PULAU karena datanya dari sumber lain.)
    // Nama ini WAJIB tampil (permintaan Bapak), jadi kalau tidak ada tempat
    // yang benar-benar bebas, dipakai tempat yang paling sedikit bertabrakan.
    const seribu = [];
    if (typeof KEPULAUAN_SERIBU !== "undefined") {
      KEPULAUAN_SERIBU.forEach((w) => {
        const titik = titikCalonGeometri(w.g);
        if (titik.length) seribu.push({ n: w.n, k: titik, wajib: true });
      });
    }

    const terpakai = [];

    [...PULAU, ...seribu].forEach((pulau) => {
      const besarPulau = pulau.r <= 3;
      const ukuran = besarPulau ? HURUF.pulauBesar : HURUF.pulau;
      const spasi = besarPulau ? SPASI.pulauBesar : SPASI.pulau;
      const u = ukuranTeks(pulau.n, ukuran, spasi);

      // Titik calon sudah urut: pertama paling dekat pusat pulau.
      const calon = pulau.k
        .map((t) => keLayar(proyek(t[0], t[1])))
        .filter((s) => s.x >= -60 && s.x <= VB_W + 60 && s.y >= -60 && s.y <= VB_H + 60);
      if (!calon.length) return;

      // Pilih tempat yang TIDAK menutupi apa pun. Kalau tidak ada,
      // nama pulau tidak ditampilkan (nama kota lebih penting) —
      // kecuali nama yang ditandai "wajib".
      let terpilih = null;
      let skorTerbaik = -1;
      let cadangan = null;
      let skorCadangan = -1;

      calon.forEach((s) => {
        const kotak = { kiri: s.x - u.w / 2, kanan: s.x + u.w / 2, atas: s.y - u.h / 2, bawah: s.y + u.h / 2 };

        // Terlalu dekat tepi layar → huruf bisa terpotong
        if (kotak.kiri < 4 || kotak.kanan > VB_W - 4) return;
        if (kotak.atas < 4 || kotak.bawah > VB_H - 4) return;

        // Hitung luas tabrakan (untuk cadangan kalau nama wajib tampil)
        let luas = 0;
        const hitung = (k) => {
          const dx = Math.min(kotak.kanan, k.kanan) - Math.max(kotak.kiri, k.kiri);
          const dy = Math.min(kotak.bawah, k.bawah) - Math.max(kotak.atas, k.atas);
          if (dx > 0 && dy > 0) luas += dx * dy;
        };
        rintangan.forEach(hitung);
        terpakai.forEach(hitung);

        if (luas === 0) {
          // Tempat bebas — pilih yang paling tengah
          const skor = calon.length - calon.indexOf(s);
          let dekatPulau = Infinity;
          titikPulau.forEach((k) => {
            if (k.n === pulau.n) return;
            const dx = s.x - k.x;
            const dy = s.y - k.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < dekatPulau) dekatPulau = d;
          });
          const nilai = skor + Math.min(dekatPulau, 60) / 10;
          if (nilai > skorTerbaik) {
            skorTerbaik = nilai;
            terpilih = s;
          }
        } else if (luas < skorCadangan || skorCadangan < 0) {
          // Tempat paling sedikit bertabrakan (cadangan)
          skorCadangan = luas;
          cadangan = s;
        }
      });

      if (!terpilih && pulau.wajib) terpilih = cadangan;
      if (!terpilih) return;
      terpakai.push({ kiri: terpilih.x - u.w / 2, kanan: terpilih.x + u.w / 2, atas: terpilih.y - u.h / 2, bawah: terpilih.y + u.h / 2 });

      // Kembali ke koordinat peta untuk digambar
      const px = (terpilih.x - tx) / zk;
      const py = (terpilih.y - ty) / zk;

      const g = document.createElementNS(NS, "g");
      const kecilan = 1 / zk;  // ukuran huruf tetap (tidak ikut membesar saat zoom)
      g.setAttribute(
        "transform",
        "translate(" + px.toFixed(1) + "," + py.toFixed(1) + ") scale(" + kecilan.toFixed(4) + ")"
      );
      g.setAttribute("class", "pulau" + (besarPulau ? " pulau-besar" : ""));

      const teks = document.createElementNS(NS, "text");
      teks.setAttribute("class", "pulau-nama");
      teks.setAttribute("text-anchor", "middle");
      teks.setAttribute("dominant-baseline", "middle");
      teks.setAttribute("y", "0");
      teks.textContent = pulau.n;

      const judul = document.createElementNS(NS, "title");
      judul.textContent = /^pulau|^kepulauan/i.test(pulau.n) ? pulau.n : "Pulau " + pulau.n;

      g.appendChild(teks);
      g.appendChild(judul);
      lapisPulau.appendChild(g);
    });
  }

  // ---------- Nama kota sesuai tingkat zoom ----------
  // zoom out → hanya kota besar ; zoom in → kota kecil mulai muncul
  function ambangUntukZoom(z) {
    if (z < 1.8) return 2;    // hanya kota terbesar
    if (z < 2.6) return 4;
    if (z < 3.6) return 6;
    if (z < 5.0) return 7;
    return 99;                 // semua kota
  }

  // Daftar kota yang tampil + kotak tulisannya (dipakai penempatan nama pulau).
  function daftarKotaTampil() {
    const hasil = [];
    if (typeof KOTA_INDONESIA === "undefined" || !proyeksi) return hasil;
    const ambang = ambangUntukZoom(zk);
    const terpakai = [];

    // Rintangan untuk nama kota = nama kota yang sudah ditaruh,
    // nama gunung, dan penanda lokasi milik Bapak.
    const rintangan = [];

    // Penanda membesar saat zoom (radius 10 × zoom), jadi ikut dihitung.
    const rPenanda = 10 * zk + 3;
    daftarLokasi.filter(cocok).forEach((lokasi) => {
      const s = keLayar(proyek(lokasi.lon, lokasi.lat));
      if (s.x < -80 || s.x > VB_W + 80 || s.y < -80 || s.y > VB_H + 80) return;
      rintangan.push({ kiri: s.x - rPenanda, kanan: s.x + rPenanda, atas: s.y - rPenanda, bawah: s.y + rPenanda });
    });

    if (zk >= 2 && typeof GUNUNG !== "undefined") {
      GUNUNG.forEach((g) => {
        const s = keLayar(proyek(g.lon, g.lat));
        if (s.x < -60 || s.x > VB_W + 60 || s.y < -60 || s.y > VB_H + 60) return;
        const nama = (g.n || "Puncak") + " " + (g.e ? g.e + " m" : "");
        const u = ukuranTeks(nama, HURUF.gunung, 0);
        rintangan.push({ kiri: s.x + 6, kanan: s.x + 6 + u.w, atas: s.y - u.h / 2, bawah: s.y + u.h / 2 });
      });
    }

    KOTA_INDONESIA.forEach((kota) => {
      if (kota.r > ambang) return;
      const s = keLayar(proyek(kota.lon, kota.lat));
      if (s.x < -60 || s.x > VB_W + 60 || s.y < -60 || s.y > VB_H + 60) return;

      const besar = kota.r <= 3;
      const ukuran = besar ? HURUF.kotaBesar : HURUF.kota;
      const teksnya = ukuranTeks(kota.n, ukuran, 0);

      // Cari sisi yang paling sedikit bertabrakan dengan yang sudah ada.
      // Coba dulu sisi dekat; kalau semuanya bertabrakan, pakai sisi jauh.
      // Jarak label menyesuaikan besar penanda (penanda membesar saat zoom).
      const jarak = 10 * zk + 6;
      const semua = [...rintangan, ...terpakai];
      let sisi = pilihSisi(s.x, s.y, teksnya.w, teksnya.h, SISI_DEKAT, semua, jarak);
      let rect = kotakSisi(sisi, teksnya.w, teksnya.h, s.x, s.y, jarak);

      let adaBentrok = semua.some((k) => bentrok(rect, k));
      if (adaBentrok) {
        sisi = pilihSisi(s.x, s.y, teksnya.w, teksnya.h, SEMUA_SISI, semua, jarak);
        rect = kotakSisi(sisi, teksnya.w, teksnya.h, s.x, s.y, jarak);
      }

      terpakai.push({ kiri: rect.kiri - 3, kanan: rect.kanan + 3, atas: rect.atas - 2, bawah: rect.bawah + 2 });
      hasil.push({ kota, p: proyek(kota.lon, kota.lat), besar, sisi, rect, jarak });
    });

    return hasil;
  }

  // Arah nama menurut sisi yang dipilih (untuk digambar)
  function letakTeks(sisi, jarak) {
    const j = jarak || 14;
    const jj = j + 18;
    if (sisi === "atas") return { x: "0", y: String(-j), anchor: "middle" };
    if (sisi === "bawah") return { x: "0", y: String(j), anchor: "middle" };
    if (sisi === "kiri") return { x: String(-j), y: "0", anchor: "end" };
    if (sisi === "kanan") return { x: String(j), y: "0", anchor: "start" };
    if (sisi === "kanan-atas") return { x: String(j), y: String(-j), anchor: "start" };
    if (sisi === "kanan-bawah") return { x: String(j), y: String(j), anchor: "start" };
    if (sisi === "atas-jauh") return { x: "0", y: String(-jj), anchor: "middle" };
    if (sisi === "bawah-jauh") return { x: "0", y: String(jj), anchor: "middle" };
    if (sisi === "kiri-jauh") return { x: String(-jj), y: "0", anchor: "end" };
    return { x: String(jj), y: "0", anchor: "start" };
  }

  function gambarKota() {
    lapisKota.innerHTML = "";
    lapisNamaKota.innerHTML = "";

    daftarKotaTampil().forEach(({ kota, p, besar, sisi, jarak }) => {
      const g = document.createElementNS(NS, "g");
      const kecilan = 1 / zk;
      g.setAttribute(
        "transform",
        "translate(" + p.x.toFixed(1) + "," + p.y.toFixed(1) + ") scale(" + kecilan.toFixed(4) + ")"
      );

      const titik = document.createElementNS(NS, "circle");
      titik.setAttribute("r", besar ? 3 : 2);
      titik.setAttribute("class", "kota-titik");

      const teks = document.createElementNS(NS, "text");
      teks.setAttribute("class", "kota-nama" + (besar ? " kota-besar" : ""));
      teks.setAttribute("dominant-baseline", "middle");
      const letak = letakTeks(sisi, jarak);
      teks.setAttribute("x", letak.x);
      teks.setAttribute("y", letak.y);
      teks.setAttribute("text-anchor", letak.anchor);
      teks.textContent = kota.n;

      // Titik kota tetap di lapisnya sendiri; NAMA kota dipisah ke lapisan
      // paling atas supaya tidak tertutup penanda lokasi.
      g.appendChild(titik);
      lapisKota.appendChild(g);

      const gNama = document.createElementNS(NS, "g");
      gNama.setAttribute("transform", g.getAttribute("transform"));
      gNama.appendChild(teks);
      lapisNamaKota.appendChild(gNama);
    });
  }

  // ---------- Geometri → jalur SVG ----------
  function cincinKePath(cincin) {
    return (
      cincin
        .map((c, i) => {
          const p = proyek(c[0], c[1]);
          return (i === 0 ? "M" : "L") + p.x.toFixed(1) + "," + p.y.toFixed(1);
        })
        .join(" ") + " Z"
    );
  }

  function geometriKePath(geom) {
    if (geom.type === "Polygon") {
      return geom.coordinates.map(cincinKePath).join(" ");
    }
    if (geom.type === "MultiPolygon") {
      return geom.coordinates
        .map((poly) => poly.map(cincinKePath).join(" "))
        .join(" ");
    }
    return "";
  }

  // Beberapa titik calon penempatan nama dari sebuah geometri.
  // Dipakai Kepulauan Seribu — datanya berupa batas wilayah, bukan titik.
  // Diberi beberapa pilihan (tengah, utara, selatan, barat, timur) supaya
  // nama bisa dihindarkan dari nama kota di sekitarnya.
  function titikCalonGeometri(geom) {
    let mnx = Infinity, mxx = -Infinity, mny = Infinity, mxy = -Infinity;
    const telusuri = (c) => {
      if (typeof c[0] === "number") {
        if (c[0] < mnx) mnx = c[0];
        if (c[0] > mxx) mxx = c[0];
        if (c[1] < mny) mny = c[1];
        if (c[1] > mxy) mxy = c[1];
        return;
      }
      c.forEach(telusuri);
    };
    telusuri(geom.coordinates);
    if (mnx === Infinity) return [];

    const cx = (mnx + mxx) / 2;
    const cy = (mny + mxy) / 2;
    const dx = (mxx - mnx) / 2;
    const dy = (mxy - mny) / 2;

    // Urutan: bagian UTARA dulu (jauh dari kota Jakarta di selatan),
    // lalu menjauh ke tengah & selatan.
    return [
      [cx, mxy - dy * 0.15],          // utara
      [cx, mxy - dy * 0.35],          // agak ke utara
      [mxx - dx * 0.2, mxy - dy * 0.15],  // utara-timur
      [mnx + dx * 0.2, mxy - dy * 0.15],  // utara-barat
      [cx, cy],                       // tengah
      [cx, mny + dy * 0.25],          // selatan
      [cx, mny]                       // paling selatan
    ];
  }

  // ---------- Gambar sungai, danau, gunung (kelengkapan peta) ----------
  function gambarSungai() {
    if (typeof SUNGAI === "undefined") return;
    lapisSungai.innerHTML = "";
    SUNGAI.forEach((s) => {
      const d = s.t
        .map((c, i) => {
          const p = proyek(c[0], c[1]);
          return (i === 0 ? "M" : "L") + p.x.toFixed(1) + "," + p.y.toFixed(1);
        })
        .join(" ");
      const path = document.createElementNS(NS, "path");
      path.setAttribute("d", d);
      path.setAttribute("class", "sungai");
      lapisSungai.appendChild(path);
    });
  }

  function gambarDanau() {
    if (typeof DANAU === "undefined") return;
    lapisDanau.innerHTML = "";
    DANAU.forEach((s) => {
      const d = s.t
        .map((c, i) => {
          const p = proyek(c[0], c[1]);
          return (i === 0 ? "M" : "L") + p.x.toFixed(1) + "," + p.y.toFixed(1);
        })
        .join(" ") + " Z";
      const path = document.createElementNS(NS, "path");
      path.setAttribute("d", d);
      path.setAttribute("class", "danau");
      const judul = document.createElementNS(NS, "title");
      judul.textContent = s.n || "Danau";
      path.appendChild(judul);
      lapisDanau.appendChild(path);
    });
  }

  function gambarGunung() {
    if (typeof GUNUNG === "undefined") return;
    lapisGunung.innerHTML = "";
    GUNUNG.forEach((g) => {
      const p = proyek(g.lon, g.lat);
      const el = document.createElementNS(NS, "g");
      const kecilan = 1 / zk;
      el.setAttribute(
        "transform",
        "translate(" + p.x.toFixed(1) + "," + p.y.toFixed(1) + ") scale(" + kecilan.toFixed(4) + ")"
      );
      el.setAttribute("class", "gunung");

      const segitiga = document.createElementNS(NS, "path");
      segitiga.setAttribute("d", "M0,-5 L4.5,3 L-4.5,3 Z");
      segitiga.setAttribute("class", "gunung-tanda");

      // Nama gunung hanya muncul saat di-zoom cukup dekat
      if (zk >= 2) el.classList.add("gunung-besar");

      const teks = document.createElementNS(NS, "text");
      teks.setAttribute("class", "gunung-nama");
      teks.setAttribute("x", "6");
      teks.setAttribute("y", "3");
      teks.textContent = (g.n || "Puncak") + " " + (g.e ? g.e + " m" : "");

      const judul = document.createElementNS(NS, "title");
      judul.textContent = (g.n || "Puncak") + (g.e ? " — " + g.e + " m" : "");

      el.appendChild(segitiga);
      el.appendChild(teks);
      el.appendChild(judul);
      lapisGunung.appendChild(el);
    });
  }

  // ---------- Gambar negara tetangga (latar) ----------
  function gambarNegara() {
    if (typeof NEGARA_DUNIA === "undefined") return;
    lapisNegara.innerHTML = "";
    NEGARA_DUNIA.features.forEach((f) => {
      const path = document.createElementNS(NS, "path");
      path.setAttribute("d", geometriKePath(f.geometry));
      path.setAttribute("class", "negara");
      lapisNegara.appendChild(path);
    });
  }

  // ---------- Gambar peta provinsi ----------
  function gambarPeta() {
    if (typeof PETA_INDONESIA === "undefined") {
      labelPeta.textContent = "Data peta tidak ditemukan.";
      return;
    }
    siapkanProyeksi(PETA_INDONESIA);
    gambarNegara();
    gambarDanau();
    gambarSungai();
    lapisProvinsi.innerHTML = "";

    PETA_INDONESIA.features.forEach((f) => {
      const path = document.createElementNS(NS, "path");
      path.setAttribute("d", geometriKePath(f.geometry));
      path.setAttribute("class", "provinsi");
      const nama =
        f.properties.PROVINSI || f.properties.state || f.properties.name || "Wilayah";
      path.dataset.nama = nama;
      path.addEventListener("click", () => bukaPanelProvinsi(nama));
      lapisProvinsi.appendChild(path);
    });

    // Kepulauan Seribu — diambil dari sumber lain (BPS), karena data batas
    // 38 provinsi hanya memuat daratan DKI Jakarta.
    if (typeof KEPULAUAN_SERIBU !== "undefined") {
      KEPULAUAN_SERIBU.forEach((w) => {
        const path = document.createElementNS(NS, "path");
        path.setAttribute("d", geometriKePath(w.g));
        path.setAttribute("class", "provinsi");
        path.dataset.nama = w.n;
        path.addEventListener("click", () => bukaPanelProvinsi(w.n));
        lapisProvinsi.appendChild(path);
      });
    }

    gambarPulauKecil();

    labelPeta.textContent =
      PETA_INDONESIA.features.length + " provinsi · data batas asli";
    gambarPulau();
  }

  // ---------- Tanda pulau-pulau kecil ----------
  // Pulau di Kepulauan Seribu hanya 0,1–3,7 km — di peta kurang dari 1 piksel,
  // jadi bentuknya tidak mungkin terlihat. Diberi tanda titik supaya tampak.
  function gambarPulauKecil() {
    lapisPulauKecil.innerHTML = "";
    if (typeof KEPULAUAN_SERIBU === "undefined" || !proyeksi) return;

    KEPULAUAN_SERIBU.forEach((w) => {
      const polys = w.g.type === "Polygon" ? [w.g.coordinates] : w.g.coordinates;
      polys.forEach((poly) => {
        const c = poly[0];
        let mnx = Infinity, mxx = -Infinity, mny = Infinity, mxy = -Infinity;
        c.forEach((x) => {
          if (x[0] < mnx) mnx = x[0];
          if (x[0] > mxx) mxx = x[0];
          if (x[1] < mny) mny = x[1];
          if (x[1] > mxy) mxy = x[1];
        });
        const p = proyek((mnx + mxx) / 2, (mny + mxy) / 2);
        if (p.x < -20 || p.x > VB_W + 20 || p.y < -20 || p.y > VB_H + 20) return;

        const g = document.createElementNS(NS, "g");
        const kecilan = 1 / zk;   // ukuran tetap di layar
        g.setAttribute(
          "transform",
          "translate(" + p.x.toFixed(1) + "," + p.y.toFixed(1) + ") scale(" + kecilan.toFixed(4) + ")"
        );
        g.setAttribute("class", "pulau-kecil");

        const titik = document.createElementNS(NS, "circle");
        titik.setAttribute("r", "3");
        titik.setAttribute("class", "pulau-kecil-titik");

        const judul = document.createElementNS(NS, "title");
        judul.textContent = w.n;

        g.appendChild(titik);
        g.appendChild(judul);
        lapisPulauKecil.appendChild(g);
      });
    });
  }
  // ---------- Gambar penanda ----------
  function gambarPenanda() {
    lapisPenanda.innerHTML = "";
    daftarLokasi.filter(cocok).forEach((lokasi) => {
      const p = proyek(lokasi.lon, lokasi.lat);

      const g = document.createElementNS(NS, "g");
      g.setAttribute("class", "penanda" + (lokasi.id === idTerpilih ? " aktif" : ""));
      const kecilan = 1 / zk;
      g.setAttribute(
        "transform",
        "translate(" + p.x.toFixed(1) + "," + p.y.toFixed(1) + ") scale(" + kecilan.toFixed(4) + ")"
      );

      const bulat = document.createElementNS(NS, "circle");
      bulat.setAttribute("r", "10");
      bulat.setAttribute("class", "penanda-bulat");

      const huruf = document.createElementNS(NS, "text");
      huruf.setAttribute("class", "penanda-huruf");
      huruf.setAttribute("y", "3.5");
      huruf.textContent = lokasi.inisial || inisialDari(lokasi.nama);

      const judul = document.createElementNS(NS, "title");
      judul.textContent = lokasi.nama;

      g.appendChild(bulat);
      g.appendChild(huruf);
      g.appendChild(judul);
      g.addEventListener("click", (e) => {
        e.stopPropagation();
        bukaPanel(lokasi.id);
      });
      lapisPenanda.appendChild(g);
    });
  }

  // ---------- Gambar bar kategori ----------
  function gambarKategori() {
    kategoriBar.innerHTML = "";
    KATEGORI.forEach((kat) => {
      const btn = document.createElement("button");
      btn.className = "kategori-tombol" + (kat === kategoriAktif ? " aktif" : "");
      btn.textContent = kat;
      btn.addEventListener("click", () => {
        kategoriAktif = kat;
        gambarKategori();
        gambarPenanda();
      });
      kategoriBar.appendChild(btn);
    });
  }

  // ---------- Panel rincian ----------
  function bukaPanel(id) {
    const lokasi = daftarLokasi.find((l) => l.id === id);
    if (!lokasi) return;
    idTerpilih = id;

    const gambar = lokasi.gambar
      ? `<img src="${lokasi.gambar}" alt="${lokasi.nama}" style="width:100%;height:100%;object-fit:cover;border-radius:14px;">`
      : (lokasi.inisial || inisialDari(lokasi.nama));

    const baris = (lokasi.rincian || [])
      .map(
        (r) =>
          `<div class="panel-baris"><span class="label">${r.label}</span><span class="nilai">${r.nilai}</span></div>`
      )
      .join("");

    panelIsi.innerHTML = `
      <div class="panel-gambar">${gambar}</div>
      <span class="panel-kategori">${lokasi.kategori}</span>
      <h2 class="panel-nama">${lokasi.nama}</h2>
      <p class="panel-wilayah">${lokasi.wilayah}</p>
      ${baris}
      <div class="panel-aksi">
        <button class="tombol-aksi" id="aksiUbah">Ubah data</button>
      </div>
    `;

    const aksiUbah = document.getElementById("aksiUbah");
    if (aksiUbah) aksiUbah.addEventListener("click", () => bukaForm(id));

    panel.classList.add("terbuka");
    panel.setAttribute("aria-hidden", "false");
    gambarPenanda();
  }

  function bukaPanelProvinsi(nama) {
    idTerpilih = null;
    panelIsi.innerHTML = `
      <div class="panel-gambar">${inisialDari(nama)}</div>
      <span class="panel-kategori">Provinsi</span>
      <h2 class="panel-nama">${nama}</h2>
      <p class="panel-wilayah">Wilayah Indonesia</p>
      <div class="panel-baris"><span class="label">Data lokasi</span><span class="nilai">Belum ada</span></div>
    `;
    panel.classList.add("terbuka");
    panel.setAttribute("aria-hidden", "false");
    gambarPenanda();
  }

  function tutupPanel() {
    panel.classList.remove("terbuka");
    panel.setAttribute("aria-hidden", "true");
    idTerpilih = null;
    gambarPenanda();
  }

  // ---------- Laci menu ----------
  function bukaLaci() {
    laci.classList.add("terbuka");
    laci.setAttribute("aria-hidden", "false");
    tirai.classList.add("tampil");
  }

  function tutupLaci() {
    laci.classList.remove("terbuka");
    laci.setAttribute("aria-hidden", "true");
    tirai.classList.remove("tampil");
  }

  // ---------- Form isian data ----------
  function isiPilihanKategori() {
    fKategori.innerHTML = "";
    KATEGORI.filter((k) => k !== "Semua").forEach((k) => {
      const opt = document.createElement("option");
      opt.value = k;
      opt.textContent = k;
      fKategori.appendChild(opt);
    });
  }

  function bukaForm(id) {
    idSedangDiubah = id || null;
    const lokasi = id ? daftarLokasi.find((l) => l.id === id) : null;

    formJudul.textContent = lokasi ? "Ubah Data Lokasi" : "Tambah Lokasi Baru";
    fNama.value = lokasi ? lokasi.nama : "";
    fWilayah.value = lokasi ? lokasi.wilayah : "";
    fKategori.value = lokasi ? lokasi.kategori : KATEGORI[1];
    fLon.value = lokasi ? lokasi.lon : "";
    fLat.value = lokasi ? lokasi.lat : "";
    fInisial.value = lokasi ? (lokasi.inisial || "") : "";
    fRincian.value = lokasi && lokasi.rincian
      ? lokasi.rincian.map((r) => r.label + " = " + r.nilai).join("\n")
      : "";
    formHapus.style.display = lokasi ? "block" : "none";

    formLokasi.classList.add("terbuka");
    formLokasi.setAttribute("aria-hidden", "false");
    fNama.focus();
  }

  function tutupForm() {
    formLokasi.classList.remove("terbuka");
    formLokasi.setAttribute("aria-hidden", "true");
    idSedangDiubah = null;
  }

  function bacaRincian(teks) {
    return teks
      .split("\n")
      .map((b) => b.trim())
      .filter((b) => b.includes("="))
      .map((b) => {
        const i = b.indexOf("=");
        return { label: b.slice(0, i).trim(), nilai: b.slice(i + 1).trim() };
      });
  }

  function simpanForm() {
    const nama = fNama.value.trim();
    if (!nama) {
      alert("Nama lokasi belum diisi.");
      fNama.focus();
      return;
    }
    const lon = parseFloat(fLon.value);
    const lat = parseFloat(fLat.value);
    if (isNaN(lon) || isNaN(lat)) {
      alert("Koordinat (bujur & lintang) belum benar. Contoh: 106.83 dan -6.18");
      return;
    }

    const data = {
      id: idSedangDiubah || Penyimpanan.idBaru(),
      nama: nama,
      wilayah: fWilayah.value.trim(),
      kategori: fKategori.value,
      lon: lon,
      lat: lat,
      inisial: fInisial.value.trim(),
      gambar: "",
      rincian: bacaRincian(fRincian.value)
    };

    Penyimpanan.simpan(data).then(() => {
      tutupForm();
      muatUlang();
    });
  }

  function hapusLokasi() {
    if (!idSedangDiubah) return;
    if (!confirm("Hapus lokasi ini? Data akan hilang.")) return;
    Penyimpanan.hapus(idSedangDiubah).then(() => {
      tutupForm();
      tutupPanel();
      muatUlang();
    });
  }

  // ---------- Pencarian ----------
  kotakCari.addEventListener("input", (e) => {
    cariTeks = e.target.value;
    hapusCari.classList.toggle("tampil", cariTeks.length > 0);
    gambarPenanda();
  });

  hapusCari.addEventListener("click", () => {
    cariTeks = "";
    kotakCari.value = "";
    hapusCari.classList.remove("tampil");
    gambarPenanda();
  });

  // ---------- Pasang kejadian ----------
  panelTutup.addEventListener("click", tutupPanel);
  tombolMenu.addEventListener("click", bukaLaci);
  laciTutup.addEventListener("click", tutupLaci);
  tirai.addEventListener("click", tutupLaci);
  tombolTambah.addEventListener("click", () => bukaForm(null));
  formTutup.addEventListener("click", tutupForm);
  formBatal.addEventListener("click", tutupForm);
  formSimpan.addEventListener("click", simpanForm);
  formHapus.addEventListener("click", hapusLokasi);
  tombolRincian.addEventListener("click", () => {
    fRincian.value += (fRincian.value ? "\n" : "") + "Keterangan = Isi di sini";
    fRincian.focus();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      tutupPanel();
      tutupLaci();
      tutupForm();
    }
  });

  // ---------- Kendali zoom ----------
  function titikKeKanvas(e) {
    const kotak = svg.getBoundingClientRect();
    const rasio = VB_W / VB_H;
    let w = kotak.width;
    let h = kotak.height;
    // Sesuaikan dengan preserveAspectRatio (xMidYMid meet)
    if (w / h > rasio) w = h * rasio;
    else h = w / rasio;
    const kiri = kotak.left + (kotak.width - w) / 2;
    const atas = kotak.top + (kotak.height - h) / 2;
    return {
      x: ((e.clientX - kiri) / w) * VB_W,
      y: ((e.clientY - atas) / h) * VB_H
    };
  }

  svg.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      const t = titikKeKanvas(e);
      const faktor = e.deltaY < 0 ? 1.18 : 1 / 1.18;
      zoomKe(zk * faktor, t.x, t.y);
    },
    { passive: false }
  );

  // Geser (tahan & tarik) + cubit dua jari (HP)
  let geserAktif = false;
  let geserX = 0;
  let geserY = 0;
  const jari = {};       // pointer aktif (untuk cubit)
  let jarakCubit = 0;

  function daftarJari() {
    return Object.keys(jari).map((k) => jari[k]);
  }

  function jarakDuaJari() {
    const d = daftarJari();
    if (d.length < 2) return 0;
    const dx = d[0].x - d[1].x;
    const dy = d[0].y - d[1].y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  svg.addEventListener("pointerdown", (e) => {
    jari[e.pointerId] = { x: e.clientX, y: e.clientY };
    if (daftarJari().length === 2) {
      jarakCubit = jarakDuaJari();
      geserAktif = false;
      return;
    }
    if (zk <= 1) return;
    geserAktif = true;
    geserX = e.clientX;
    geserY = e.clientY;
    svg.setPointerCapture(e.pointerId);
  });

  svg.addEventListener("pointermove", (e) => {
    if (jari[e.pointerId]) {
      jari[e.pointerId].x = e.clientX;
      jari[e.pointerId].y = e.clientY;
    }

    // Cubit dua jari
    if (daftarJari().length === 2) {
      e.preventDefault();
      const baru = jarakDuaJari();
      if (jarakCubit > 0 && baru > 0) {
        const t = titikKeKanvas(e);
        zoomKe(zk * (baru / jarakCubit), t.x, t.y);
      }
      jarakCubit = baru;
      return;
    }

    if (!geserAktif) return;
    const kotak = svg.getBoundingClientRect();
    const skalaKanvas = VB_W / Math.max(kotak.width, 1);
    tx += (e.clientX - geserX) * skalaKanvas;
    ty += (e.clientY - geserY) * skalaKanvas;
    geserX = e.clientX;
    geserY = e.clientY;
    batasiGeser();
    // Saat menggeser: cukup pindahkan tampilan (tanpa gambar ulang → lebih lancar)
    viewportLapis.setAttribute(
      "transform",
      "translate(" + tx.toFixed(1) + "," + ty.toFixed(1) + ") scale(" + zk.toFixed(3) + ")"
    );
  });

  function lepasJari(e) {
    delete jari[e.pointerId];
    geserAktif = false;
    jarakCubit = 0;
  }

  svg.addEventListener("pointerup", lepasJari);
  svg.addEventListener("pointercancel", lepasJari);
  svg.addEventListener("pointerleave", lepasJari);

  zoomMasuk.addEventListener("click", () => zoomKe(zk * 1.5));
  zoomKeluar.addEventListener("click", () => zoomKe(zk / 1.5));
  zoomReset.addEventListener("click", () => {
    zk = 1;
    tx = 0;
    ty = 0;
    terapkanTampilan();
  });

  // ---------- Muat ulang data ----------
  function muatUlang() {
    return Penyimpanan.ambilSemua().then((data) => {
      daftarLokasi = data;
      gambarPenanda();
      gambarKota();   // nama kota dihitung ulang setelah penanda diketahui
    });
  }

  // ---------- Sinkron awan ----------
  const tombolKirim = document.getElementById("tombolKirim");
  const tombolTarik = document.getElementById("tombolTarik");
  const awanStatus = document.getElementById("awanStatus");

  function laporAwan(teks, warna) {
    awanStatus.textContent = teks;
    awanStatus.style.color = warna || "var(--abu-teks)";
  }

  tombolKirim.addEventListener("click", () => {
    laporAwan("Mengirim…");
    Penyimpanan.ambilSemua()
      .then((data) => Awan.kirimSemua(data))
      .then((h) =>
        laporAwan("Terkirim " + h.sukses + " dari " + h.total + (h.gagal ? " (" + h.gagal + " gagal)" : ""), h.gagal ? "#b91c1c" : "#166534")
      )
      .catch((e) => laporAwan("Gagal: " + e.message, "#b91c1c"));
  });

  tombolTarik.addEventListener("click", () => {
    laporAwan("Mengambil…");
    Awan.tarikDanGabung()
      .then((h) => {
        laporAwan(
          "Selesai — " + h.baru + " baru, " + h.diperbarui + " diperbarui (dari " + h.total + ")",
          "#166534"
        );
        return muatUlang();
      })
      .catch((e) => laporAwan("Gagal: " + e.message, "#b91c1c"));
  });

  // ---------- Mulai ----------
  gambarPeta();
  gambarKategori();
  isiPilihanKategori();
  terapkanTampilan();
  Penyimpanan.isiAwalJikaKosong()
    .then(() => muatUlang())
    .catch((e) => {
      console.error("Gagal memuat data:", e);
      daftarLokasi = typeof CONTOH_LOKASI !== "undefined" ? CONTOH_LOKASI : [];
      gambarPenanda();
      gambarKota();
    });
})();
