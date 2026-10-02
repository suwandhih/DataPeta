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
  const lapisProvinsi = document.getElementById("lapisProvinsi");
  const lapisKota = document.getElementById("lapisKota");
  const lapisPenanda = document.getElementById("lapisPenanda");
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
    gambarKota();
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

  // ---------- Nama kota sesuai tingkat zoom ----------
  // zoom out → hanya kota besar ; zoom in → kota kecil mulai muncul
  function ambangUntukZoom(z) {
    if (z < 1.8) return 2;    // hanya kota terbesar
    if (z < 2.6) return 4;
    if (z < 3.6) return 6;
    if (z < 5.0) return 7;
    return 99;                 // semua kota
  }

  function gambarKota() {
    if (typeof KOTA_INDONESIA === "undefined" || !proyeksi) return;
    const ambang = ambangUntukZoom(zk);
    lapisKota.innerHTML = "";

    KOTA_INDONESIA.forEach((kota) => {
      if (kota.r > ambang) return;
      const p = proyek(kota.lon, kota.lat);
      if (p.x < -20 || p.x > VB_W + 20 || p.y < -20 || p.y > VB_H + 20) return;

      const g = document.createElementNS(NS, "g");
      const kecilan = 1 / zk;
      g.setAttribute(
        "transform",
        "translate(" + p.x.toFixed(1) + "," + p.y.toFixed(1) + ") scale(" + kecilan.toFixed(4) + ")"
      );

      const titik = document.createElementNS(NS, "circle");
      titik.setAttribute("r", kota.r <= 3 ? 3 : 2);
      titik.setAttribute("class", "kota-titik");

      const teks = document.createElementNS(NS, "text");
      teks.setAttribute("class", "kota-nama" + (kota.r <= 3 ? " kota-besar" : ""));
      teks.setAttribute("x", "6");
      teks.setAttribute("y", "4");

      // Saat zoom kecil, nama dibalik agar tidak saling menumpuk
      if (zk < 2.6 && kota.lon < 0) {
        teks.setAttribute("x", "-4");
        teks.setAttribute("text-anchor", "end");
      }
      teks.textContent = kota.n;

      g.appendChild(titik);
      g.appendChild(teks);
      lapisKota.appendChild(g);
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

    labelPeta.textContent =
      PETA_INDONESIA.features.length + " provinsi · data batas asli";
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
    });
})();
