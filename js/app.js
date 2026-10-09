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
  const lapisNamaLokasi = document.getElementById("lapisNamaLokasi");
  const lapisSuku = document.getElementById("lapisSuku");
  const labelPeta = document.getElementById("labelPeta");
  const zoomMasuk = document.getElementById("zoomMasuk");
  const zoomKeluar = document.getElementById("zoomKeluar");
  const zoomReset = document.getElementById("zoomReset");
  const tombolSuku = document.getElementById("tombolSuku");
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
  const fNama = document.getElementById("fNama");
  const fWilayah = document.getElementById("fWilayah");
  const fWilayahPilih = document.getElementById("fWilayahPilih");
  const fWilayahSaran = document.getElementById("fWilayahSaran");
  const fWilayahDropdown = document.getElementById("fWilayahDropdown");
  const fWilayahBersih = document.getElementById("fWilayahBersih");
  const fWilayahLangkah = document.getElementById("fWilayahLangkah");
  const fWilayahCatatan = document.getElementById("fWilayahCatatan");
  const fKategori = document.getElementById("fKategori");
  const fLon = document.getElementById("fLon");
  const fLat = document.getElementById("fLat");
  const fInisial = document.getElementById("fInisial");
  const fRincian = document.getElementById("fRincian");
  const tombolRincian = document.getElementById("tombolRincian");
  const wilayahJalan = document.getElementById("wilayahJalan");
  const wilayahCari = document.getElementById("wilayahCari");
  const wilayahDaftar = document.getElementById("wilayahDaftar");
  const tombolMember = document.getElementById("tombolMember");
  const member = document.getElementById("member");
  const memberTutup = document.getElementById("memberTutup");
  const memberDaftar = document.getElementById("memberDaftar");
  const memberMataGlobal = document.getElementById("memberMataGlobal");
  const memberLabelKeadaan = document.getElementById("memberLabelKeadaan");
  const memberJudulKota = document.getElementById("memberJudulKota");
  const memberKotaKeadaan = document.getElementById("memberKotaKeadaan");
  const kategoriAtur = document.getElementById("kategoriAtur");
  const kategoriBaru = document.getElementById("kategoriBaru");
  const kategoriTambah = document.getElementById("kategoriTambah");
  const kategoriPesan = document.getElementById("kategoriPesan");

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

  // Daftar wilayah: jejak tingkatan yang sedang dibuka (kosong = provinsi)
  let wilayahJejak = [];
  let wilayahCariTeks = "";

  // Kategori: bisa ditambah / diubah Bapak (disimpan di IndexedDB)
  let daftarKategori = KATEGORI.slice();

  // Pratinjau: titik sementara dari daftar wilayah, belum disimpan
  let pratinjau = null;      // { nama, lon, lat, kategori }
  let idBerkedip = null;     // lokasi yang sedang berkedip merah
  let kembaliKeMember = false; // setelah simpan → buka lagi panel Member
  let membukaPanelMember = false; // penanda untuk tombol mata global
  let labelTerpakai = [];    // kotak label lokasi yang sudah ditaruh (anti tumpang tindih)
  // Label kategori di peta: bisa disembunyikan sekaligus (satu tombol).
  let labelTampilGlobal = true;                 // tombol "Label kategori pada peta"
  let kategoriDaftarTampil = true;              // tombol "Label kategori di daftar"

  // ---------- Suku bangsa (K16) ----------
  // 0 = sembunyi · 1 = sedang (titik + nama) · 2 = penuh (+ jumlah & tanda perkiraan)
  let sukuTingkat = 0;

  // ---------- Bantu ----------
  function inisialDari(nama) {
    return nama
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((k) => k[0].toUpperCase())
      .join("");
  }

  // Warna titik menurut kategori — supaya mudah dibedakan di peta
  const WARNA_KATEGORI = [
    "#2563eb", "#16a34a", "#dc2626", "#d97706",
    "#7c3aed", "#0891b2", "#be185d", "#4d7c0f"
  ];

  function warnaKategori(nama) {
    const i = daftarKategori.filter((k) => k !== "Semua").indexOf(nama);
    return WARNA_KATEGORI[(i < 0 ? 0 : i) % WARNA_KATEGORI.length];
  }

  // Warna kategori milik lokasi — pastikan kategorinya dikenal supaya
  // warnanya SAMA dengan tombol kategori (tidak jatuh ke warna pertama).
  function warnaKategoriLokasi(nama) {
    if (nama && daftarKategori.indexOf(nama) === -1) daftarKategori.push(nama);
    return warnaKategori(nama);
  }

  // Tulisan kategori yang tampil di peta (untuk satu lokasi).
  // Kosong = label kategori disembunyikan (nama lokasi tetap tampil).
  function teksKategoriPeta(lokasi) {
    if (!labelTampilGlobal) return "";
    return lokasi.kategori || "";
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
    gambarSuku();
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
    // Penanda membesar saat zoom (radius 5 × zoom), jadi ikut dihitung.
    const rPenanda = 5 * zk + 3;
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

    // Penanda membesar saat zoom (radius 5 × zoom), jadi ikut dihitung.
    const rPenanda = 5 * zk + 3;
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

  // ---------- Pulau-pulau kecil ----------
  // Pulau di Kepulauan Seribu hanya 0,1–3,7 km — di peta kurang dari 1 piksel.
  // Bentuk aslinya digambar apa adanya, warnanya sama seperti provinsi lain.
  function gambarPulauKecil() {
    lapisPulauKecil.innerHTML = "";
    if (typeof KEPULAUAN_SERIBU === "undefined" || !proyeksi) return;

    KEPULAUAN_SERIBU.forEach((w) => {
      const path = document.createElementNS(NS, "path");
      path.setAttribute("d", geometriKePath(w.g));
      path.setAttribute("class", "pulau-kecil-bentuk");
      path.dataset.nama = w.n;
      path.addEventListener("click", () => bukaPanelProvinsi(w.n));

      const judul = document.createElementNS(NS, "title");
      judul.textContent = w.n;
      path.appendChild(judul);

      lapisPulauKecil.appendChild(path);
    });
  }
  // ---------- Gambar penanda ----------
  function gambarPenanda() {
    lapisPenanda.innerHTML = "";
    lapisNamaLokasi.innerHTML = "";
    labelTerpakai = [];

    // Rintangan untuk label (nama kota, gunung, titik) — dihitung SEKALI
    // per gambar supaya peta tetap ringan.
    const rintanganLabel = kotakRintanganLabel();

    // Titik sementara dari daftar wilayah (belum disimpan) — garis putus-putus
    if (pratinjau && proyeksi) {
      const p = proyek(pratinjau.lon, pratinjau.lat);
      const g = document.createElementNS(NS, "g");
      g.setAttribute("class", "penanda penanda-pratinjau");
      g.setAttribute(
        "transform",
        "translate(" + p.x.toFixed(1) + "," + p.y.toFixed(1) + ") scale(" + (1 / zk).toFixed(4) + ")"
      );

      const bulat = document.createElementNS(NS, "circle");
      bulat.setAttribute("r", "5");
      bulat.setAttribute("class", "penanda-bulat");
      bulat.setAttribute("fill", warnaKategori(pratinjau.kategori));

      const huruf = document.createElementNS(NS, "text");
      huruf.setAttribute("class", "penanda-huruf");
      huruf.setAttribute("y", "1.7");
      huruf.textContent = inisialDari(pratinjau.nama);

      const judul = document.createElementNS(NS, "title");
      judul.textContent = pratinjau.nama + " (belum disimpan)";

      g.appendChild(bulat);
      g.appendChild(huruf);
      g.appendChild(judul);
      lapisPenanda.appendChild(g);

      gambarLabelLokasi(
        pratinjau.wilayah || "",
        labelTampilGlobal ? pratinjau.nama : "",
        labelTampilGlobal ? pratinjau.kategori : "",
        p,
        "pratinjau",
        rintanganLabel
      );
    }

    daftarLokasi.filter(cocok).forEach((lokasi) => {
      const p = proyek(lokasi.lon, lokasi.lat);

      const g = document.createElementNS(NS, "g");
      g.setAttribute(
        "class",
        "penanda" +
          (lokasi.id === idTerpilih ? " aktif" : "") +
          (lokasi.id === idBerkedip ? " kedip" : "")
      );
      const kecilan = 1 / zk;
      g.setAttribute(
        "transform",
        "translate(" + p.x.toFixed(1) + "," + p.y.toFixed(1) + ") scale(" + kecilan.toFixed(4) + ")"
      );

      const bulat = document.createElementNS(NS, "circle");
      bulat.setAttribute("r", "5");
      bulat.setAttribute("class", "penanda-bulat");
      bulat.setAttribute("fill", warnaKategori(lokasi.kategori));

      const huruf = document.createElementNS(NS, "text");
      huruf.setAttribute("class", "penanda-huruf");
      huruf.setAttribute("y", "1.7");
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

      gambarLabelLokasi(
        lokasi.wilayah || "",
        labelTampilGlobal ? lokasi.nama : "",
        teksKategoriPeta(lokasi),
        p,
        lokasi.id === idBerkedip ? "kedip" : "",
        rintanganLabel
      );
    });
  }

  // ---------- Label lokasi: garis penghubung + nama + label kategori ----------
  // Titik (dot) warna dihubungkan GARIS ke kotak label yang diletakkan di
  // tempat lapang — supaya nama lokasi TIDAK tertutup nama kota / label lain.
  // Ukuran label kategori = ukuran nama lokasi (tidak lebih besar).
  const HURUF_LOKASI = { nama: 9, kategori: 9 };
  const SISI_LOKASI = [
    "kanan", "kiri", "bawah", "atas",
    "kanan-bawah", "kanan-atas", "kiri-bawah", "kiri-atas"
  ];

  // Rintangan untuk label lokasi: nama kota, nama gunung, dan titik lokasi.
  function kotakRintanganLabel() {
    const kotak = [];

    daftarKotaTampil().forEach((k) => kotak.push(k.rect));

    if (zk >= 2 && typeof GUNUNG !== "undefined") {
      GUNUNG.forEach((g) => {
        const s = keLayar(proyek(g.lon, g.lat));
        if (s.x < -80 || s.x > VB_W + 80 || s.y < -80 || s.y > VB_H + 80) return;
        const nama = (g.n || "Puncak") + " " + (g.e ? g.e + " m" : "");
        const u = ukuranTeks(nama, HURUF.gunung, 0);
        kotak.push({ kiri: s.x + 6, kanan: s.x + 6 + u.w, atas: s.y - u.h / 2, bawah: s.y + u.h / 2 });
      });
    }

    // Titik lokasi digambar dengan ukuran tetap (radius 5) — bukan 5 × zoom.
    const rPenanda = 7;
    daftarLokasi.filter(cocok).forEach((lokasi) => {
      const s = keLayar(proyek(lokasi.lon, lokasi.lat));
      if (s.x < -80 || s.x > VB_W + 80 || s.y < -80 || s.y > VB_H + 80) return;
      kotak.push({ kiri: s.x - rPenanda, kanan: s.x + rPenanda, atas: s.y - rPenanda, bawah: s.y + rPenanda });
    });

    return kotak;
  }

  // Kotak label di LAYAR untuk sebuah sisi & jarak.
  function kotakLokasiSisi(sisi, w, h, sx, sy, jarak) {
    const g = jarak * 0.45;
    if (sisi === "kanan")       return { kiri: sx + jarak, kanan: sx + jarak + w, atas: sy - h / 2, bawah: sy + h / 2 };
    if (sisi === "kiri")        return { kiri: sx - jarak - w, kanan: sx - jarak, atas: sy - h / 2, bawah: sy + h / 2 };
    if (sisi === "bawah")       return { kiri: sx - w / 2, kanan: sx + w / 2, atas: sy + jarak, bawah: sy + jarak + h };
    if (sisi === "atas")        return { kiri: sx - w / 2, kanan: sx + w / 2, atas: sy - jarak - h, bawah: sy - jarak };
    if (sisi === "kanan-bawah") return { kiri: sx + jarak, kanan: sx + jarak + w, atas: sy + g, bawah: sy + g + h };
    if (sisi === "kanan-atas")  return { kiri: sx + jarak, kanan: sx + jarak + w, atas: sy - g - h, bawah: sy - g };
    if (sisi === "kiri-bawah")  return { kiri: sx - jarak - w, kanan: sx - jarak, atas: sy + g, bawah: sy + g + h };
    return { kiri: sx - jarak - w, kanan: sx - jarak, atas: sy - g - h, bawah: sy - g };
  }

  function gambarLabelLokasi(wilayah, nama, kategori, p, kelas, rintangan) {
    if (!proyeksi) return;
    const s = keLayar(p);

    const punyaNama = !!nama;
    const punyaKat = !!kategori;
    const lebarWilayah = ukuranTeks(wilayah || "", HURUF_LOKASI.nama, 0).w;
    const lebarNama = ukuranTeks(nama || "", HURUF_LOKASI.nama, 0).w;
    const lebarKat = ukuranTeks(kategori || "", HURUF_LOKASI.kategori, 0).w;
    const w = Math.max(lebarWilayah, lebarNama, lebarKat) + 6;
    const tinggiBaris = HURUF_LOKASI.nama * 1.22;
    // Baris: wilayah (selalu) + nama + kategori (bila tampil)
    const jumlahBaris = 1 + (punyaNama ? 1 : 0) + (punyaKat ? 1 : 0);
    const h = tinggiBaris * jumlahBaris;

    const semua = (rintangan || []).concat(labelTerpakai);

    let terpilih = null;
    let luasTerbaik = Infinity;
    let adaBebas = false;

    // Coba sisi & jarak: yang paling sedikit bertabrakan dipilih.
    for (const jarak of [26, 44, 66, 92]) {
      for (const sisi of SISI_LOKASI) {
        const kotak = kotakLokasiSisi(sisi, w, h, s.x, s.y, jarak);
        // Huruf jangan terpotong tepi peta
        if (kotak.kiri < 4 || kotak.kanan > VB_W - 4 || kotak.atas < 4 || kotak.bawah > VB_H - 4) continue;
        let luas = 0;
        for (const k of semua) {
          const dx = Math.min(kotak.kanan, k.kanan) - Math.max(kotak.kiri, k.kiri);
          const dy = Math.min(kotak.bawah, k.bawah) - Math.max(kotak.atas, k.atas);
          if (dx > 0 && dy > 0) luas += dx * dy;
        }
        if (luas < luasTerbaik) {
          luasTerbaik = luas;
          terpilih = kotak;
        }
        if (luas === 0) { adaBebas = true; break; }
      }
      if (adaBebas) break;
    }

    if (!terpilih) terpilih = kotakLokasiSisi("kanan", w, h, s.x, s.y, 22);

    // Simpan agar label berikutnya tidak menimpa label ini.
    labelTerpakai.push({
      kiri: terpilih.kiri - 2, kanan: terpilih.kanan + 2,
      atas: terpilih.atas - 2, bawah: terpilih.bawah + 2
    });

    // Titik ujung garis = tepi kotak label yang paling dekat titik
    const ax = Math.max(terpilih.kiri, Math.min(terpilih.kanan, s.x));
    const ay = Math.max(terpilih.atas, Math.min(terpilih.bawah, s.y));
    const kePetaX = (x) => (x - tx) / zk;
    const kePetaY = (y) => (y - ty) / zk;

    // Garis penghubung (tebal tetap di layar berkat non-scaling-stroke)
    const garis = document.createElementNS(NS, "line");
    garis.setAttribute("x1", kePetaX(s.x).toFixed(1));
    garis.setAttribute("y1", kePetaY(s.y).toFixed(1));
    garis.setAttribute("x2", kePetaX(ax).toFixed(1));
    garis.setAttribute("y2", kePetaY(ay).toFixed(1));
    garis.setAttribute("class", "lokasi-garis" + (kelas ? " " + kelas : ""));
    lapisNamaLokasi.appendChild(garis);

    // Baris label: wilayah (kepala) → nama lokasi → kategori
    const cx = (terpilih.kiri + terpilih.kanan) / 2;
    const teksKelas = kelas ? " " + kelas : "";
    let barisKe = 0;

    lapisNamaLokasi.appendChild(
      buatTeksLokasi(wilayah, "lokasi-wilayah" + teksKelas, cx, terpilih.atas + tinggiBaris * (barisKe + 0.5), null)
    );
    barisKe++;

    if (punyaNama) {
      lapisNamaLokasi.appendChild(
        buatTeksLokasi(nama, "lokasi-nama" + teksKelas, cx, terpilih.atas + tinggiBaris * (barisKe + 0.5), null)
      );
      barisKe++;
    }
    if (punyaKat) {
      // Warna memakai kategori UTAMA saja (teks bisa berisi beberapa kategori)
      const utama = kategori.split(" · ")[0];
      lapisNamaLokasi.appendChild(
        buatTeksLokasi(kategori, "lokasi-kategori" + teksKelas, cx, terpilih.atas + tinggiBaris * (barisKe + 0.5), warnaKategoriLokasi(utama))
      );
    }
  }

  // Satu baris teks berukuran tetap (tidak ikut membesar saat zoom).
  function buatTeksLokasi(isi, kelas, xLayar, yLayar, warna) {
    const g = document.createElementNS(NS, "g");
    g.setAttribute(
      "transform",
      "translate(" + ((xLayar - tx) / zk).toFixed(1) + "," + ((yLayar - ty) / zk).toFixed(1) +
        ") scale(" + (1 / zk).toFixed(4) + ")"
    );
    const t = document.createElementNS(NS, "text");
    t.setAttribute("class", kelas);
    t.setAttribute("text-anchor", "middle");
    t.setAttribute("dominant-baseline", "middle");
    t.setAttribute("x", "0");
    t.setAttribute("y", "0");
    if (warna) t.setAttribute("fill", warna);
    t.textContent = isi;
    g.appendChild(t);
    return g;
  }

  // ---------- Gambar bar kategori ----------
  function gambarKategori() {
    kategoriBar.innerHTML = "";
    daftarKategori.forEach((kat) => {
      const btn = document.createElement("button");
      btn.className = "kategori-tombol" + (kat === kategoriAktif ? " aktif" : "");
      btn.textContent = kat;
      if (kat !== "Semua") {
        const titik = document.createElement("span");
        titik.className = "kategori-warna";
        titik.style.background = warnaKategori(kat);
        btn.prepend(titik);
      }
      btn.addEventListener("click", () => {
        kategoriAktif = kat;
        gambarKategori();
        gambarPenanda();
      });
      kategoriBar.appendChild(btn);
    });
  }

  // ---------- Suku bangsa (K16) ----------
  // Titik suku = IBU KOTA PROVINSI ASAL (perkiraan) — lihat data/suku.js.
  // Hanya ditampilkan saat zoom ≥ 2 dan hanya untuk provinsi yang sedang terlihat,
  // supaya peta tidak terlalu ramai saat zoom keluar.
  const HURUF_SUKU = { nama: 9, jumlah: 8, perkiraan: 7.5 };
  const SISI_SUKU = ["atas", "kanan", "bawah", "kiri", "kanan-atas", "kanan-bawah", "kiri-atas", "kiri-bawah"];

  function namaProvinsiSuku(kode) {
    if (typeof WILAYAH_PROVINSI === "undefined") return "";
    const p = WILAYAH_PROVINSI.find((x) => x[0] === kode);
    return p ? p[1] : "";
  }

  function gambarSuku() {
    if (!lapisSuku) return;
    lapisSuku.innerHTML = "";
    if (sukuTingkat <= 0) return;
    if (typeof SUKU_INDONESIA === "undefined" || !proyeksi) return;
    if (zk < 1.5) return;   // zoom keluar → terlalu ramai

    const rintangan = kotakRintanganLabel().slice();

    SUKU_INDONESIA.forEach((s) => {
      const prov = (typeof WILAYAH_PROVINSI !== "undefined" ? WILAYAH_PROVINSI.find((x) => x[0] === s.p) : null);
      if (!prov) return;
      const p = proyek(prov[3], prov[2]);   // [kode, nama, lat, lng] → proyek(lon, lat)
      const layar = keLayar(p);

      // Hanya gambar bila provinsinya sedang terlihat di layar
      if (layar.x < -40 || layar.x > VB_W + 40 || layar.y < -40 || layar.y > VB_H + 40) return;

      const g = document.createElementNS(NS, "g");
      g.setAttribute("class", "suku");
      g.setAttribute("transform", "translate(" + p.x.toFixed(1) + "," + p.y.toFixed(1) + ") scale(" + (1 / zk).toFixed(4) + ")");

      const bulat = document.createElementNS(NS, "circle");
      bulat.setAttribute("r", "3.4");
      bulat.setAttribute("class", "suku-titik perkiraan");
      g.appendChild(bulat);

      const judul = document.createElementNS(NS, "title");
      judul.textContent =
        s.n + (s.a ? " (kelompok gabungan)" : "") + " — suku" +
        "\nJumlah (BPS 2010): " + s.j.toLocaleString("id-ID") + " jiwa" +
        "\nKawasan utama (BPS 2010): " + s.k +
        "\n\n⚠️ Titik ini PERKIRAAN: diletakkan di ibu kota provinsi asal," +
        "\n   bukan lokasi persis suku.";
      g.appendChild(judul);
      lapisSuku.appendChild(g);

      // Label: nama selalu; jumlah + tanda "perkiraan" hanya pada tingkat penuh
      const baris = [{ isi: s.n, kelas: "suku-nama", tinggi: HURUF_SUKU.nama }];
      if (sukuTingkat >= 2) {
        baris.push({ isi: s.j.toLocaleString("id-ID") + " jiwa", kelas: "suku-jumlah", tinggi: HURUF_SUKU.jumlah });
        baris.push({ isi: "perkiraan", kelas: "suku-perkiraan", tinggi: HURUF_SUKU.perkiraan });
      }

      const lebar = Math.max.apply(null, baris.map((b) => ukuranTeks(b.isi, b.tinggi, 0).w));
      const tinggi = baris.reduce((t, b) => t + b.tinggi * 1.25, 0);

      const sisi = pilihSisi(layar.x, layar.y, lebar, tinggi, SISI_SUKU, rintangan, 10);
      const kotak = kotakSisi(sisi, lebar, tinggi, layar.x, layar.y, 10);
      rintangan.push(kotak);

      // Sama seperti label lokasi: teks digambar lewat buatTeksLokasi supaya
      // besar huruf di layar TETAP (tidak ikut membesar saat zoom).
      const tengahX = (kotak.kiri + kotak.kanan) / 2;
      let yAtas = kotak.atas;
      baris.forEach((b) => {
        lapisSuku.appendChild(buatTeksLokasi(b.isi, b.kelas, tengahX, yAtas + b.tinggi * 0.62));
        yAtas += b.tinggi * 1.25;
      });
    });
  }

  // Tombol [suku]: sembunyi → sedang → penuh → sembunyi
  function perbaruiTombolSuku() {
    if (!tombolSuku) return;
    tombolSuku.classList.toggle("tingkat-1", sukuTingkat === 1);
    tombolSuku.classList.toggle("tingkat-2", sukuTingkat === 2);
    const kata = ["Sembunyi", "Sedang", "Penuh"][sukuTingkat];
    tombolSuku.title = "Suku bangsa di peta — sekarang: " + kata + " (klik untuk ganti)";
    tombolSuku.setAttribute("aria-label", "Suku bangsa di peta — " + kata);
  }

  if (tombolSuku) {
    tombolSuku.addEventListener("click", () => {
      sukuTingkat = (sukuTingkat + 1) % 3;
      perbaruiTombolSuku();
      gambarSuku();
    });
    perbaruiTombolSuku();
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
    const kode = kodeProvinsiDariNama(nama);
    const jiwa = pendudukProvinsi(kode);
    panelIsi.innerHTML = `
      <div class="panel-gambar">${inisialDari(nama)}</div>
      <span class="panel-kategori">Provinsi</span>
      <h2 class="panel-nama">${nama}</h2>
      <p class="panel-wilayah">Wilayah Indonesia</p>
      ${jiwa === null ? "" : `<div class="panel-baris"><span class="label">Jumlah penduduk</span><span class="nilai">${jiwa.toLocaleString("id-ID")} jiwa</span></div>`}
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

  // ---------- Daftar wilayah ----------
  // Tingkatan: 0 = provinsi, 1 = kab/kota, 2 = kecamatan, 3 = desa/kelurahan.
  // Provinsi & kab/kota sudah dimuat bersama halaman. Kecamatan & desa
  // dimuat saat dibuka saja — supaya aplikasi tetap ringan.
  const wilayahDimuat = {};

  function wilayahProvinsi() {
    return typeof WILAYAH_PROVINSI !== "undefined" ? WILAYAH_PROVINSI : [];
  }

  function wilayahKabKota() {
    return typeof WILAYAH_KABKOTA !== "undefined" ? WILAYAH_KABKOTA : [];
  }

  // Jumlah penduduk provinsi (jiwa) menurut BPS — null kalau tidak ada datanya.
  // Nama di peta kadang beda dengan nama resmi (mis. "DKI Jakarta" vs
  // "Daerah Khusus Ibukota Jakarta") — dicocokkan lewat kode wilayah.
  function pendudukProvinsi(kode) {
    const d = typeof PENDUDUK_PROVINSI !== "undefined" ? PENDUDUK_PROVINSI : null;
    if (!d || !kode) return null;
    const n = d[kode];
    return typeof n === "number" ? n : null;
  }

  // Nama di peta yang beda dengan nama resmi (Kepmendagri).
  const ALIAS_PROVINSI = { "DKI Jakarta": "31" };

  function kodeProvinsiDariNama(nama) {
    if (ALIAS_PROVINSI[nama]) return ALIAS_PROVINSI[nama];
    const w = wilayahProvinsi().find((x) => x[1] === nama);
    return w ? w[0] : null;
  }

  function muatBerkasWilayah(berkas, namaVar) {
    if (wilayahDimuat[berkas]) return wilayahDimuat[berkas];
    wilayahDimuat[berkas] = new Promise((selesai, gagal) => {
      const s = document.createElement("script");
      s.src = berkas;
      s.onload = () => selesai(window[namaVar] || []);
      s.onerror = () => gagal(new Error("Gagal memuat " + berkas));
      document.head.appendChild(s);
    });
    return wilayahDimuat[berkas];
  }

  // Daftar wilayah pada tingkatan yang sedang dibuka
  function wilayahSaatIni() {
    const jejak = wilayahJejak;
    if (!jejak.length) return Promise.resolve(wilayahProvinsi());

    if (jejak.length === 1) {
      const prov = jejak[0].kode;
      return Promise.resolve(wilayahKabKota().filter((k) => k[0].split(".")[0] === prov));
    }

    if (jejak.length === 2) {
      const prov = jejak[0].kode;
      const kab = jejak[1].kode;
      return muatBerkasWilayah("data/wilayah/kecamatan/" + prov + ".js", "WILAYAH_KECAMATAN")
        .then((d) => d.filter((k) => k[0].split(".").slice(0, 2).join(".") === kab));
    }

    const kab = jejak[1].kode;
    const kec = jejak[2].kode;
    return muatBerkasWilayah("data/wilayah/desa/" + kab + ".js", "WILAYAH_DESA")
      .then((d) => d.filter((k) => k[0].split(".").slice(0, 3).join(".") === kec));
  }

  // Nama induk wilayah, dibaca dari kode (dipisah titik)
  function namaWilayahLengkap(kode, nama) {
    const bagian = kode.split(".");
    if (bagian.length === 1) return nama;   // provinsi — tidak punya induk

    const prov = wilayahProvinsi().find((x) => x[0] === bagian[0]);
    const kab = wilayahKabKota().find((x) => x[0] === bagian.slice(0, 2).join("."));

    const potongan = [nama];
    // Kab/kota sendiri tidak perlu diulang — hanya kecamatan & desa
    if (bagian.length >= 3 && kab) potongan.push(kab[1]);
    if (prov) potongan.push(prov[1]);
    return potongan.join(", ");
  }

  function gambarWilayahJalan() {
    wilayahJalan.innerHTML = "";

    const akar = document.createElement("button");
    akar.textContent = "Indonesia";
    akar.addEventListener("click", () => {
      wilayahJejak = [];
      wilayahCariTeks = "";
      wilayahCari.value = "";
      gambarWilayah();
    });
    wilayahJalan.appendChild(akar);

    wilayahJejak.forEach((w, i) => {
      const pisah = document.createElement("span");
      pisah.textContent = "›";
      wilayahJalan.appendChild(pisah);

      const b = document.createElement("button");
      b.textContent = w.nama;
      b.addEventListener("click", () => {
        wilayahJejak = wilayahJejak.slice(0, i + 1);
        wilayahCariTeks = "";
        wilayahCari.value = "";
        gambarWilayah();
      });
      wilayahJalan.appendChild(b);
    });
  }

  function gambarWilayah() {
    gambarWilayahJalan();
    wilayahDaftar.innerHTML = '<p class="wilayah-kosong">Memuat…</p>';

    wilayahSaatIni()
      .then((daftar) => {
        const cari = wilayahCariTeks.trim().toLowerCase();
        const tampil = cari
          ? daftar.filter((w) => w[1].toLowerCase().includes(cari))
          : daftar;

        wilayahDaftar.innerHTML = "";
        if (!tampil.length) {
          wilayahDaftar.innerHTML = '<p class="wilayah-kosong">Tidak ada wilayah yang cocok.</p>';
          return;
        }

        const bisaMasuk = wilayahJejak.length < 3;
        const potong = document.createDocumentFragment();

        tampil.forEach((w) => {
          const baris = document.createElement("div");
          baris.className = "wilayah-baris";

          const nama = document.createElement("button");
          nama.className = "wilayah-nama";
          nama.textContent = w[1];
          nama.title = "Pindah peta ke " + w[1] + " & isi data";
          nama.addEventListener("click", () => pilihWilayah(w));
          baris.appendChild(nama);

          if (bisaMasuk) {
            const masuk = document.createElement("button");
            masuk.className = "wilayah-masuk";
            masuk.textContent = "›";
            masuk.title = "Lihat wilayah di dalam " + w[1];
            masuk.addEventListener("click", () => {
              wilayahJejak = wilayahJejak.concat([{ kode: w[0], nama: w[1] }]);
              wilayahCariTeks = "";
              wilayahCari.value = "";
              gambarWilayah();
            });
            baris.appendChild(masuk);
          }

          potong.appendChild(baris);
        });

        wilayahDaftar.appendChild(potong);
      })
      .catch((e) => {
        wilayahDaftar.innerHTML = '<p class="wilayah-kosong">Gagal memuat data wilayah.</p>';
        console.error(e);
      });
  }

  // Klik nama wilayah → peta geser + perbesar ke wilayah itu, lalu form terbuka
  function pilihWilayah(w) {
    tutupLaci();
    bukaForm(null);
    terapkanWilayah({ kode: w[0], nama: w[1], lat: w[2], lon: w[3] });
    fNama.focus();
  }

  // ---------- Laci menu ----------
  function bukaLaci() {
    tutupForm();   // form & menu sama-sama di kanan — jangan bertumpuk
    tutupMember();
    laci.classList.add("terbuka");
    laci.setAttribute("aria-hidden", "false");
    tirai.classList.add("tampil");
  }
  function tutupLaci() {
    laci.classList.remove("terbuka");
    laci.setAttribute("aria-hidden", "true");
    tirai.classList.remove("tampil");
  }

  // ---------- Panel member (daftar lokasi tersimpan) ----------
  // Susunan: ● Kota (jumlah) [tombol aksi] → daftar member di dalamnya.
  // Tombol [+] [✎] [−] ada pada baris KOTA:
  //   [+] tambah member baru di kota itu
  //   [✎] pilih member mana yang mau diubah
  //   [−] pilih member mana yang mau dihapus
  function bukaMember() {
    tutupForm();
    tutupLaci();
    gambarMember();
    gambarTombolMataGlobal();
    member.classList.add("terbuka");
    member.setAttribute("aria-hidden", "false");
  }

  function tutupMember() {
    member.classList.remove("terbuka");
    member.setAttribute("aria-hidden", "true");
  }

  // Tombol bulat kecil pada baris kota
  function tombolKota(teks, judul, kelas, aksi) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "member-tombol" + (kelas ? " " + kelas : "");
    b.textContent = teks;
    b.title = judul;
    b.addEventListener("click", (e) => {
      e.stopPropagation();
      aksi();
    });
    return b;
  }

  function gambarMember() {
    memberDaftar.innerHTML = "";
    // Daftar bisa diringkas: saat di-hide, hanya judul kota yang tampil
    memberDaftar.classList.toggle("kategori-sembunyi", !kategoriDaftarTampil);

    if (!daftarLokasi.length) {
      memberDaftar.innerHTML = '<p class="member-kosong">Belum ada lokasi tersimpan.</p>';
      return;
    }

    // Kelompokkan per kota/wilayah — satu kota boleh punya banyak member.
    const grup = new Map();
    daftarLokasi.forEach((lokasi) => {
      const kunci = (lokasi.wilayah || "Tanpa wilayah").trim() || "Tanpa wilayah";
      if (!grup.has(kunci)) grup.set(kunci, []);
      grup.get(kunci).push(lokasi);
    });

    [...grup.keys()]
      .sort((a, b) => a.localeCompare(b, "id"))
      .forEach((kunci) => {
        const isi = grup.get(kunci).slice().sort((a, b) => a.nama.localeCompare(b.nama, "id"));

        const kotak = document.createElement("div");
        kotak.className = "member-grup";

        const judul = document.createElement("div");
        judul.className = "member-grup-judul";
        judul.setAttribute("data-kota", kunci);

        const pin = document.createElement("span");
        pin.className = "member-grup-pin";
        pin.textContent = "●";

        const namaKota = document.createElement("span");
        namaKota.className = "member-grup-nama";
        namaKota.textContent = kunci;

        const jumlah = document.createElement("span");
        jumlah.className = "member-grup-jumlah";
        jumlah.textContent = isi.length;

        // Tombol aksi tingkat KOTA
        const aksiKota = document.createElement("div");
        aksiKota.className = "member-aksi";
        aksiKota.appendChild(
          tombolKota("+", "Tambah member baru di " + kunci, "", () => tambahMemberKota(isi))
        );
        aksiKota.appendChild(
          tombolKota("✎", "Ubah salah satu member di " + kunci, "", () => pilihMember(kunci, isi, "ubah"))
        );
        aksiKota.appendChild(
          tombolKota("−", "Hapus salah satu member di " + kunci, "member-tombol-hapus", () =>
            pilihMember(kunci, isi, "hapus")
          )
        );

        judul.appendChild(pin);
        judul.appendChild(namaKota);
        judul.appendChild(jumlah);
        judul.appendChild(aksiKota);
        kotak.appendChild(judul);

        const isiKotak = document.createElement("div");
        isiKotak.className = "member-grup-isi";

        // Baris member: "- Nama - Kategori" (tanpa tombol — tombol ada di kota)
        isi.forEach((lokasi) => {
          const baris = document.createElement("div");
          baris.className = "member-baris";
          baris.setAttribute("data-lokasi", lokasi.id);
          baris.title = "Pindah peta ke " + lokasi.nama;

          const warna = document.createElement("span");
          warna.className = "member-warna";
          warna.style.background = warnaKategoriLokasi(lokasi.kategori);

          const isiBaris = document.createElement("div");
          isiBaris.className = "member-isi";
          isiBaris.innerHTML = '<div class="member-nama"></div><div class="member-wilayah"></div>';
          isiBaris.querySelector(".member-nama").textContent = "- " + lokasi.nama;
          isiBaris.querySelector(".member-wilayah").textContent = lokasi.kategori;

          baris.appendChild(warna);
          baris.appendChild(isiBaris);
          baris.addEventListener("click", () => sorotLokasi(lokasi.id));
          isiKotak.appendChild(baris);
        });

        kotak.appendChild(isiKotak);
        memberDaftar.appendChild(kotak);
      });
  }

  // [+] di baris kota → tambah member baru di kota itu
  function tambahMemberKota(isi) {
    const contoh = isi[0] || {};
    tutupMember();
    // Wilayah dikunci — wilayah = kepala baris kota
    bukaForm(null, true, true);
    if (contoh.wilayah) {
      fWilayah.value = contoh.wilayah;
      if (typeof contoh.lat === "number") fLat.value = contoh.lat;
      if (typeof contoh.lon === "number") fLon.value = contoh.lon;

      if (typeof contoh.lat === "number" && typeof contoh.lon === "number" && proyeksi) {
        const p = proyek(contoh.lon, contoh.lat);
        zk = Math.max(ZK_MIN, Math.min(ZK_MAKS, 6));
        tx = VB_W / 2 - p.x * zk;
        ty = VB_H / 2 - p.y * zk;
        batasiGeser();
        terapkanTampilan();
        pratinjau = { nama: "Lokasi baru", wilayah: contoh.wilayah || "", lon: contoh.lon, lat: contoh.lat, kategori: fKategori.value };
        gambarPenanda();
      }
    }
    fNama.focus();
  }

  // [✎] / [−] di baris kota → muncul daftar member untuk dipilih
  function pilihMember(kunci, isi, mode) {
    const penanda = kunci + "||" + mode;
    const lama = memberDaftar.querySelector('[data-pilih="' + CSS.escape(penanda) + '"]');
    if (lama) {
      lama.remove();
      bersihkanSedangPilih();
      return;
    }
    memberDaftar.querySelectorAll(".member-pilih").forEach((p) => p.remove());
    bersihkanSedangPilih();

    const judulKota = memberDaftar.querySelector('[data-kota="' + CSS.escape(kunci) + '"]');
    if (!judulKota) return;

    // Sembunyikan daftar anggota kota ini selama memilih → tidak tampak dobel
    const grup = judulKota.parentElement;
    if (grup) grup.classList.add("sedang-pilih");

    const panel = document.createElement("div");
    panel.className = "member-pilih";
    panel.setAttribute("data-pilih", penanda);

    const kepala = document.createElement("div");
    kepala.className = "member-kategori-judul";
    const kepalaTeks = document.createElement("span");
    kepalaTeks.textContent =
      (mode === "hapus" ? "Hapus" : "Ubah") + " member di " + kunci + " — pilih satu:";
    const kepalaTutup = document.createElement("button");
    kepalaTutup.type = "button";
    kepalaTutup.className = "member-kategori-tutup";
    kepalaTutup.textContent = "×";
    kepalaTutup.title = "Tutup daftar";
    kepalaTutup.addEventListener("click", () => {
      panel.remove();
      bersihkanSedangPilih();
    });
    kepala.appendChild(kepalaTeks);
    kepala.appendChild(kepalaTutup);
    panel.appendChild(kepala);

    const daftar = document.createElement("div");
    daftar.className = "member-pilih-daftar";

    isi.forEach((lokasi) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "member-pilih-baris" + (mode === "hapus" ? " hapus" : "");

      const tNama = document.createElement("span");
      tNama.className = "member-pilih-nama";
      tNama.textContent = lokasi.nama;

      const tKat = document.createElement("span");
      tKat.className = "member-pilih-kat";
      tKat.textContent = lokasi.kategori;
      tKat.style.background = warnaKategoriLokasi(lokasi.kategori);

      b.appendChild(tNama);
      b.appendChild(tKat);

      // Panah penanda bahwa baris ini BISA diklik
      const tPanah = document.createElement("span");
      tPanah.className = "member-pilih-panah";
      tPanah.textContent = mode === "hapus" ? "✕" : "›";
      b.appendChild(tPanah);

      b.title = mode === "hapus" ? "Hapus " + lokasi.nama : "Ubah " + lokasi.nama;
      b.addEventListener("click", () => {
        panel.remove();
        bersihkanSedangPilih();
        if (mode === "hapus") {
          hapusLokasi(lokasi.id);
        } else {
          tutupMember();
          bukaForm(lokasi.id, true);
        }
      });
      daftar.appendChild(b);
    });

    panel.appendChild(daftar);
    judulKota.insertAdjacentElement("afterend", panel);
    panel.scrollIntoView({ block: "nearest" });
  }

  // Hapus tanda "sedang memilih" dari semua grup kota
  function bersihkanSedangPilih() {
    memberDaftar.querySelectorAll(".member-grup.sedang-pilih").forEach((g) =>
      g.classList.remove("sedang-pilih")
    );
  }

  // ---------- Label lokasi: tampil / sembunyi di peta ----------
  // Nama WILAYAH selalu tampil (kepala label). Yang disembunyikan = nama
  // lokasi + kategori. Satu tombol saja di bawah [+ Tambah Lokasi].
  function gambarTombolMataGlobal() {
    memberMataGlobal.classList.toggle("aktif", labelTampilGlobal);
    memberMataGlobal.title = labelTampilGlobal
      ? "Klik untuk menyembunyikan nama lokasi & kategori di peta (nama wilayah tetap tampil)"
      : "Klik untuk menampilkan lagi nama lokasi & kategori di peta";
    memberLabelKeadaan.textContent = labelTampilGlobal ? "Tampil" : "Sembunyi";
  }

  function toggleLabelGlobal() {
    labelTampilGlobal = !labelTampilGlobal;
    gambarTombolMataGlobal();
    gambarPenanda();
  }

  // Daftar Member: tampil penuh / ringkas (hanya judul kota)
  function gambarTombolJudulKota() {
    memberJudulKota.classList.toggle("aktif", kategoriDaftarTampil);
    memberJudulKota.title = kategoriDaftarTampil
      ? "Klik untuk meringkas daftar (hanya judul kota)"
      : "Klik untuk menampilkan lagi seluruh daftar member";
    memberKotaKeadaan.textContent = kategoriDaftarTampil ? "Tampil" : "Sembunyi";
  }

  function toggleJudulKota() {
    kategoriDaftarTampil = !kategoriDaftarTampil;
    gambarTombolJudulKota();
    gambarMember();
  }

  // Klik lokasi di daftar member → peta pindah + titik berkedip merah
  function sorotLokasi(id) {
    const lokasi = daftarLokasi.find((l) => l.id === id);
    if (!lokasi || !proyeksi) return;

    const p = proyek(lokasi.lon, lokasi.lat);
    zk = Math.max(zk, 6);
    tx = VB_W / 2 - p.x * zk;
    ty = VB_H / 2 - p.y * zk;
    batasiGeser();
    terapkanTampilan();

    tutupMember();
    idTerpilih = id;
    idBerkedip = id;
    gambarPenanda();

    // Kedip berhenti sendiri setelah beberapa detik
    setTimeout(() => {
      if (idBerkedip === id) {
        idBerkedip = null;
        gambarPenanda();
      }
    }, 4000);
  }

  // ---------- Pengaturan kategori ----------
  function gambarKategoriAtur() {
    kategoriAtur.innerHTML = "";
    daftarKategori.filter((k) => k !== "Semua").forEach((kat) => {
      const baris = document.createElement("div");
      baris.className = "kategori-atur-baris";

      const warna = document.createElement("span");
      warna.className = "kategori-atur-warna";
      warna.style.background = warnaKategori(kat);

      const nama = document.createElement("button");
      nama.className = "kategori-atur-nama";
      nama.textContent = kat;
      nama.title = "Klik untuk mengubah nama";
      nama.addEventListener("click", () => ubahKategori(kat));

      const hapus = document.createElement("button");
      hapus.className = "kategori-atur-hapus";
      hapus.textContent = "×";
      hapus.title = "Hapus kategori";
      hapus.addEventListener("click", () => hapusKategori(kat));

      baris.appendChild(warna);
      baris.appendChild(nama);
      baris.appendChild(hapus);
      kategoriAtur.appendChild(baris);
    });
  }

  function pesanKategori(teks) {
    kategoriPesan.textContent = teks || "";
  }

  function simpanDaftarKategori() {
    return Penyimpanan.simpanPengaturan("kategori", daftarKategori);
  }

  function tambahKategori() {
    const nama = kategoriBaru.value.trim();
    if (!nama) return;
    if (daftarKategori.some((k) => k.toLowerCase() === nama.toLowerCase())) {
      pesanKategori("Kategori itu sudah ada.");
      return;
    }
    daftarKategori.push(nama);
    kategoriBaru.value = "";
    pesanKategori("");
    simpanDaftarKategori().then(() => {
      gambarKategoriAtur();
      gambarKategori();
      isiPilihanKategori();
    });
  }

  function ubahKategori(lama) {
    const baru = prompt("Ubah nama kategori:", lama);
    if (baru === null) return;
    const nama = baru.trim();
    if (!nama || nama === lama) return;
    if (daftarKategori.some((k) => k.toLowerCase() === nama.toLowerCase())) {
      pesanKategori("Kategori itu sudah ada.");
      return;
    }

    daftarKategori = daftarKategori.map((k) => (k === lama ? nama : k));
    if (kategoriAktif === lama) kategoriAktif = nama;

    // Lokasi yang memakai kategori lama ikut berubah
    const terpakai = daftarLokasi.filter((l) => l.kategori === lama);
    pesanKategori("");
    Promise.all(terpakai.map((l) => Penyimpanan.simpan(Object.assign({}, l, { kategori: nama }))))
      .then(simpanDaftarKategori)
      .then(() => {
        gambarKategoriAtur();
        gambarKategori();
        isiPilihanKategori();
        return muatUlang();
      });
  }

  function hapusKategori(kat) {
    const terpakai = daftarLokasi.filter((l) => l.kategori === kat).length;
    if (terpakai > 0) {
      pesanKategori(
        "Tidak bisa dihapus — masih dipakai " + terpakai + " lokasi. Pindahkan dulu lokasinya."
      );
      return;
    }
    if (!confirm('Hapus kategori "' + kat + '"?')) return;

    daftarKategori = daftarKategori.filter((k) => k !== kat);
    if (kategoriAktif === kat) kategoriAktif = "Semua";
    pesanKategori("");
    simpanDaftarKategori().then(() => {
      gambarKategoriAtur();
      gambarKategori();
      isiPilihanKategori();
    });
  }

  // ---------- Form isian data ----------
  function isiPilihanKategori() {
    fKategori.innerHTML = "";
    daftarKategori.filter((k) => k !== "Semua").forEach((k) => {
      const opt = document.createElement("option");
      opt.value = k;
      opt.textContent = k;
      fKategori.appendChild(opt);
    });
  }

  // ---------- Pemilih wilayah di form (cari + dropdown bertingkat) ----------
  // Supaya Bapak tidak perlu mengetik nama wilayah manual — cukup cari
  // ATAU pilih dari daftar bertingkat (provinsi → kab/kota → kec → desa).
  let wilayahSaranCache = null;
  let wilayahSaranTimer = null;
  let langkahJejak = [];   // tingkatan yang sedang dibuka di dropdown

  function wilayahSaranDaftar() {
    if (wilayahSaranCache) return wilayahSaranCache;
    const provinsi = wilayahProvinsi();
    const daftar = [];

    provinsi.forEach((w) =>
      daftar.push({
        kode: w[0], nama: w[1], lat: w[2], lon: w[3],
        tingkat: "Provinsi", cari: w[1].toLowerCase()
      })
    );

    // Kab/kota — dicari juga lewat nama provinsinya (mis. "bandung jawa barat")
    wilayahKabKota().forEach((w) => {
      const prov = provinsi.find((p) => p[0] === w[0].split(".")[0]);
      daftar.push({
        kode: w[0], nama: w[1], lat: w[2], lon: w[3],
        tingkat: "Kabupaten / Kota",
        cari: (w[1] + " " + (prov ? prov[1] : "")).toLowerCase()
      });
    });

    wilayahSaranCache = daftar;
    return daftar;
  }

  function sembunyikanSaranWilayah() {
    fWilayahSaran.classList.remove("tampil");
    fWilayahSaran.setAttribute("aria-hidden", "true");
  }

  function gambarSaranWilayah(teks) {
    const cari = teks.trim().toLowerCase();
    if (!cari) {
      sembunyikanSaranWilayah();
      return;
    }

    const cocok = wilayahSaranDaftar()
      .filter((w) => w.cari.includes(cari))
      .slice(0, 40);

    fWilayahSaran.innerHTML = "";

    if (!cocok.length) {
      fWilayahSaran.innerHTML =
        '<div class="wilayah-saran-kosong">Wilayah tidak ditemukan. Coba ketik nama lain, atau pakai “Ambil dari daftar”.</div>';
    } else {
      cocok.forEach((w) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "wilayah-saran-baris";
        const t = document.createElement("span");
        t.className = "wilayah-saran-tingkat";
        t.textContent = w.tingkat;
        b.appendChild(t);
        b.appendChild(document.createTextNode(w.nama));
        b.addEventListener("click", () => {
          sembunyikanSaranWilayah();
          terapkanWilayah(w);
        });
        fWilayahSaran.appendChild(b);
      });
    }

    fWilayahSaran.classList.add("tampil");
    fWilayahSaran.setAttribute("aria-hidden", "false");
  }

  // Cari wilayah dari KODE-nya (dipakai dropdown bertingkat)
  function wilayahDariKode(kode) {
    const bagian = kode.split(".");

    if (bagian.length === 1) {
      const w = wilayahProvinsi().find((x) => x[0] === kode);
      return w ? { kode: w[0], nama: w[1], lat: w[2], lon: w[3] } : null;
    }
    if (bagian.length === 2) {
      const w = wilayahKabKota().find((x) => x[0] === kode);
      return w ? { kode: w[0], nama: w[1], lat: w[2], lon: w[3] } : null;
    }
    if (bagian.length === 3) {
      const prov = bagian[0];
      return muatBerkasWilayah("data/wilayah/kecamatan/" + prov + ".js", "WILAYAH_KECAMATAN").then((d) => {
        const w = d.find((x) => x[0] === kode);
        return w ? { kode: w[0], nama: w[1], lat: w[2], lon: w[3] } : null;
      });
    }
    const kab = bagian.slice(0, 2).join(".");
    return muatBerkasWilayah("data/wilayah/desa/" + kab + ".js", "WILAYAH_DESA").then((d) => {
      const w = d.find((x) => x[0] === kode);
      return w ? { kode: w[0], nama: w[1], lat: w[2], lon: w[3] } : null;
    });
  }

  // Isi form + geser peta ke wilayah yang dipilih
  function terapkanWilayah(hasil) {
    if (!hasil) return;
    fWilayah.value = namaWilayahLengkap(hasil.kode, hasil.nama);
    if (typeof hasil.lat === "number") fLat.value = hasil.lat;
    if (typeof hasil.lon === "number") fLon.value = hasil.lon;

    if (typeof hasil.lat === "number" && typeof hasil.lon === "number" && proyeksi) {
      const p = proyek(hasil.lon, hasil.lat);
      const tingkat = hasil.kode.split(".").length;
      const perbesaran = [3.2, 5.5, 8, 11][tingkat - 1] || 3.2;
      zk = Math.max(ZK_MIN, Math.min(ZK_MAKS, perbesaran));
      tx = VB_W / 2 - p.x * zk;
      ty = VB_H / 2 - p.y * zk;
      batasiGeser();
      terapkanTampilan();
    }

    // Titik sementara — supaya Bapak lihat dulu sebelum disimpan
    if (typeof hasil.lat === "number" && typeof hasil.lon === "number") {
      pratinjau = {
        nama: fNama.value.trim() || hasil.nama,
        wilayah: hasil.nama,
        lon: hasil.lon,
        lat: hasil.lat,
        kategori: fKategori.value
      };
      gambarPenanda();
    }
  }

  function bukaDropdownWilayah() {
    langkahJejak = [];
    fWilayahLangkah.classList.add("tampil");
    fWilayahLangkah.setAttribute("aria-hidden", "false");
    fWilayahDropdown.textContent = "Tutup daftar ▴";
    gambarLangkahWilayah();
  }

  function tutupDropdownWilayah() {
    fWilayahLangkah.classList.remove("tampil");
    fWilayahLangkah.setAttribute("aria-hidden", "true");
    fWilayahDropdown.textContent = "Ambil dari daftar ▾";
  }

  function langkahDaftar() {
    if (!langkahJejak.length) {
      return Promise.resolve(wilayahProvinsi().map((w) => ({ kode: w[0], nama: w[1] })));
    }
    if (langkahJejak.length === 1) {
      const prov = langkahJejak[0].kode;
      return Promise.resolve(
        wilayahKabKota()
          .filter((k) => k[0].split(".")[0] === prov)
          .map((w) => ({ kode: w[0], nama: w[1] }))
      );
    }
    if (langkahJejak.length === 2) {
      const prov = langkahJejak[0].kode;
      const kab = langkahJejak[1].kode;
      return muatBerkasWilayah("data/wilayah/kecamatan/" + prov + ".js", "WILAYAH_KECAMATAN").then((d) =>
        d
          .filter((k) => k[0].split(".").slice(0, 2).join(".") === kab)
          .map((w) => ({ kode: w[0], nama: w[1] }))
      );
    }
    const kab = langkahJejak[1].kode;
    const kec = langkahJejak[2].kode;
    return muatBerkasWilayah("data/wilayah/desa/" + kab + ".js", "WILAYAH_DESA").then((d) =>
      d
        .filter((k) => k[0].split(".").slice(0, 3).join(".") === kec)
        .map((w) => ({ kode: w[0], nama: w[1] }))
    );
  }

  function gambarLangkahWilayah() {
    fWilayahLangkah.innerHTML = "";

    const jalan = document.createElement("div");
    jalan.className = "wilayah-langkah-jalan";

    const akar = document.createElement("button");
    akar.type = "button";
    akar.textContent = "Indonesia";
    akar.addEventListener("click", () => {
      langkahJejak = [];
      gambarLangkahWilayah();
    });
    jalan.appendChild(akar);

    langkahJejak.forEach((w, i) => {
      const pisah = document.createElement("span");
      pisah.textContent = "›";
      jalan.appendChild(pisah);

      const b = document.createElement("button");
      b.type = "button";
      b.textContent = w.nama;
      b.addEventListener("click", () => {
        langkahJejak = langkahJejak.slice(0, i + 1);
        gambarLangkahWilayah();
      });
      jalan.appendChild(b);
    });

    fWilayahLangkah.appendChild(jalan);

    const isi = document.createElement("div");
    isi.className = "wilayah-langkah-isi";
    isi.innerHTML = '<p class="wilayah-saran-kosong">Memuat…</p>';
    fWilayahLangkah.appendChild(isi);

    langkahDaftar()
      .then((daftar) => {
        isi.innerHTML = "";
        if (!daftar.length) {
          isi.innerHTML = '<p class="wilayah-saran-kosong">Tidak ada wilayah.</p>';
          return;
        }

        daftar.forEach((w) => {
          const baris = document.createElement("div");
          baris.className = "wilayah-langkah-baris";

          const nama = document.createElement("button");
          nama.type = "button";
          nama.className = "wilayah-langkah-nama";
          nama.textContent = w.nama;
          nama.title = "Pakai wilayah " + w.nama;
          nama.addEventListener("click", () => {
            tutupDropdownWilayah();
            Promise.resolve(wilayahDariKode(w.kode)).then((hasil) => terapkanWilayah(hasil));
          });
          baris.appendChild(nama);

          if (langkahJejak.length < 3) {
            const masuk = document.createElement("button");
            masuk.type = "button";
            masuk.className = "wilayah-langkah-masuk";
            masuk.textContent = "›";
            masuk.title = "Lihat wilayah di dalam " + w.nama;
            masuk.addEventListener("click", () => {
              langkahJejak = langkahJejak.concat([{ kode: w.kode, nama: w.nama }]);
              gambarLangkahWilayah();
            });
            baris.appendChild(masuk);
          }

          isi.appendChild(baris);
        });
      })
      .catch(() => {
        isi.innerHTML = '<p class="wilayah-saran-kosong">Gagal memuat data wilayah.</p>';
      });
  }

  function bukaForm(id, dariMember, kunciWilayah) {
    idSedangDiubah = id || null;
    // Kalau dibuka dari panel Member → setelah Simpan, panel Member dibuka lagi
    kembaliKeMember = !!dariMember;
    const lokasi = id ? daftarLokasi.find((l) => l.id === id) : null;

    // Wilayah & titik dikunci bila:
    //  - mengubah data yang sudah ada, ATAU
    //  - menambah member baru dari baris kota (wilayah = kepala/kota)
    const kunci = !!lokasi || !!kunciWilayah;
    fWilayah.readOnly = kunci;
    fLon.readOnly = kunci;
    fLat.readOnly = kunci;
    fWilayah.classList.toggle("nonaktif", kunci);
    fLon.classList.toggle("nonaktif", kunci);
    fLat.classList.toggle("nonaktif", kunci);
    fWilayahDropdown.hidden = kunci;
    fWilayahBersih.hidden = kunci;
    fWilayahCatatan.hidden = !kunci;
    if (kunci) {
      fWilayahCatatan.textContent = lokasi
        ? "Wilayah & titik dikunci — wilayah tidak bisa diganti. Yang bisa diubah: nama, kategori, inisial, keterangan. Kalau wilayahnya salah → hapus lewat tombol [−] di baris kota, lalu tambah baru di wilayah yang benar."
        : "Wilayah & titik mengikuti kota ini (tidak bisa diganti). Isi nama & kategori member barunya, lalu Simpan.";
    }

    // Pemilih wilayah selalu mulai dari keadaan bersih
    langkahJejak = [];
    tutupDropdownWilayah();
    sembunyikanSaranWilayah();

    formJudul.textContent = lokasi
      ? "Ubah Nama & Label Lokasi"
      : (kunciWilayah ? "Tambah Member Baru" : "Tambah Lokasi Baru");
    fNama.value = lokasi ? lokasi.nama : "";
    fWilayah.value = lokasi ? lokasi.wilayah : "";
    fKategori.value = lokasi ? lokasi.kategori : daftarKategori[1];
    fLon.value = lokasi ? lokasi.lon : "";
    fLat.value = lokasi ? lokasi.lat : "";
    fInisial.value = lokasi ? (lokasi.inisial || "") : "";
    fRincian.value = lokasi && lokasi.rincian
      ? lokasi.rincian.map((r) => r.label + " = " + r.nilai).join("\n")
      : "";

    // Panel samping — peta tetap terlihat. Tirai TIDAK dipakai supaya
    // Bapak masih bisa melihat & menggeser peta sambil mengisi.
    formLokasi.classList.add("terbuka");
    formLokasi.setAttribute("aria-hidden", "false");
    fNama.focus();
  }

  function tutupForm() {
    formLokasi.classList.remove("terbuka");
    formLokasi.setAttribute("aria-hidden", "true");
    idSedangDiubah = null;
    sembunyikanSaranWilayah();
    tutupDropdownWilayah();
    // Titik sementara ikut hilang kalau form ditutup tanpa disimpan
    if (pratinjau) {
      pratinjau = null;
      gambarPenanda();
    }
  }

  // Titik sementara mengikuti isian form — supaya Bapak lihat hasilnya dulu
  function perbaruiPratinjau() {
    if (!pratinjau) return;
    const lon = parseFloat(fLon.value);
    const lat = parseFloat(fLat.value);
    if (isNaN(lon) || isNaN(lat)) return;
    pratinjau.nama = fNama.value.trim() || "Lokasi baru";
    pratinjau.lon = lon;
    pratinjau.lat = lat;
    pratinjau.kategori = fKategori.value;
    gambarPenanda();
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

    pratinjau = null;   // sudah disimpan — titik sementara tidak dipakai lagi
    // Simpan dulu keadaan "balik ke Member" sebelum form ditutup
    const balikMember = kembaliKeMember;
    Penyimpanan.simpan(data).then(() => {
      tutupForm();
      muatUlang()
        .then(() => {
          if (balikMember) bukaMember();
        })
        .catch(() => {});
    });
  }

  function hapusLokasi(id) {
    const target = id || idSedangDiubah;
    if (!target) return;
    if (!confirm("Hapus lokasi ini? Data akan hilang.")) return;
    Penyimpanan.hapus(target).then(() => {
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

  // ---------- Pencarian wilayah ----------
  wilayahCari.addEventListener("input", (e) => {
    wilayahCariTeks = e.target.value;
    gambarWilayah();
  });

  // ---------- Pasang kejadian ----------
  panelTutup.addEventListener("click", tutupPanel);
  tombolMenu.addEventListener("click", bukaLaci);
  laciTutup.addEventListener("click", tutupLaci);
  tirai.addEventListener("click", tutupLaci);
  tombolMember.addEventListener("click", bukaMember);
  memberTutup.addEventListener("click", tutupMember);
  memberMataGlobal.addEventListener("click", toggleLabelGlobal);
  memberJudulKota.addEventListener("click", toggleJudulKota);
  kategoriTambah.addEventListener("click", tambahKategori);
  kategoriBaru.addEventListener("keydown", (e) => {
    if (e.key === "Enter") tambahKategori();
  });
  tombolTambah.addEventListener("click", () => {
    // Form & menu sama-sama di kanan — jangan bertumpuk.
    tutupMember();
    tutupLaci();
    bukaForm(null, true);
  });

  // Titik sementara mengikuti isian form
  [fNama, fLon, fLat].forEach((el) => el.addEventListener("input", perbaruiPratinjau));
  fKategori.addEventListener("change", perbaruiPratinjau);

  // Pemilih wilayah: cari (ketik) atau dropdown bertingkat
  fWilayah.addEventListener("input", () => {
    if (fWilayah.readOnly) return;   // wilayah dikunci saat mengubah data
    clearTimeout(wilayahSaranTimer);
    const teks = fWilayah.value;
    wilayahSaranTimer = setTimeout(() => gambarSaranWilayah(teks), 120);
  });
  fWilayah.addEventListener("keydown", (e) => {
    if (e.key === "Escape") sembunyikanSaranWilayah();
  });

  fWilayahDropdown.addEventListener("click", () => {
    if (fWilayahLangkah.classList.contains("tampil")) tutupDropdownWilayah();
    else bukaDropdownWilayah();
  });

  fWilayahBersih.addEventListener("click", () => {
    fWilayah.value = "";
    fLon.value = "";
    fLat.value = "";
    sembunyikanSaranWilayah();
    tutupDropdownWilayah();
    if (pratinjau) {
      pratinjau = null;
      gambarPenanda();
    }
    fWilayah.focus();
  });

  // Klik di luar kotak saran → tutup daftar saran
  document.addEventListener("click", (e) => {
    if (!fWilayahPilih.contains(e.target)) sembunyikanSaranWilayah();
  });

  formTutup.addEventListener("click", tutupForm);
  formBatal.addEventListener("click", tutupForm);
  formSimpan.addEventListener("click", simpanForm);
  tombolRincian.addEventListener("click", () => {
    fRincian.value += (fRincian.value ? "\n" : "") + "Keterangan = Isi di sini";
    fRincian.focus();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      tutupPanel();
      tutupLaci();
      tutupMember();
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
      if (member.classList.contains("terbuka")) gambarMember();
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
  gambarWilayah();
  gambarTombolMataGlobal();
  gambarTombolJudulKota();
  terapkanTampilan();

  // Kategori yang pernah diubah Bapak disimpan di peramban
  Penyimpanan.ambilPengaturan("kategori")
    .then((simpan) => {
      if (Array.isArray(simpan) && simpan.length) daftarKategori = simpan;
      gambarKategoriAtur();
      gambarKategori();
      isiPilihanKategori();
    })
    .catch(() => gambarKategoriAtur());

  Penyimpanan.isiAwalJikaKosong()
    .then(() => muatUlang())
    .catch((e) => {
      console.error("Gagal memuat data:", e);
      daftarLokasi = typeof CONTOH_LOKASI !== "undefined" ? CONTOH_LOKASI : [];
      gambarPenanda();
      gambarKota();
    });
})();
