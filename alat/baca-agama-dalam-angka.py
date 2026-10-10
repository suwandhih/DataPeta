"""BACA TABEL AGAMA DARI "PROVINSI DALAM ANGKA" (PDF BPS)

Alat ini membaca PDF yang sudah diunduh alat/cari-agama-dalam-angka.py,
lalu mengambil angka penduduk menurut agama per kabupaten/kota.

CARA KERJA
  1. Cari halaman yang memuat tabel agama (ada >= 3 kata kunci agama +
     nama kabupaten/kota provinsi itu + angka besar).
  2. Baca tabelnya dengan fitz.find_tables() -> baris & kolom sudah rapi.
  3. Kenali kolom dari BARIS KEPALA tabel: kolom yang namanya agama
     (Islam, Protestan, ...) diambil, kolom "Jumlah" dipisahkan.
  4. Cocokkan nama kabupaten/kota dengan data/wilayah/kabkota.js.

CARA MEMASTIKAN BACAAN BENAR (aturan F8 - jangan mengarang):
  Tabel BPS selalu punya baris total provinsi di paling bawah. Baris itu
  dipakai sebagai kunci: jumlah angka semua kabupaten/kota HARUS sama dengan
  angka baris total provinsi. Kalau tidak sama, tabel itu dibuang.
  Bukti ini dari dokumen itu sendiri, jadi tidak bergantung pada tahun data.

CATATAN PENTING - tanda air (watermark) BPS:
  Setiap halaman diberi tanda air alamat situs, mis. "https://bali.bps.go.id".
  Tanda air itu menyelipkan huruf ke dalam sel, contohnya sel yang seharusnya
  "21.212" terbaca "d\\n21.212 . i", dan nama "Lampung" terbaca "t\\nLampung t".
  Karena itu semua angka dibaca dengan menyisakan angka saja, dan semua nama
  dicocokkan dengan menyisakan huruf saja.

CATATAN PENTING - Kabupaten dan Kota dipisah:
  Banyak provinsi punya nama kembar, mis. Kabupaten Solok dan Kota Solok.
  Di tabel BPS keduanya dipisah oleh baris judul "Kabupaten/Regency" dan
  "Kota/Municipality". Baris judul itu dipakai sebagai penanda, jadi
  "Solok" setelah baris "Kota" dibaca sebagai Kota Solok.

Jalankan:  python alat/baca-agama-dalam-angka.py
Keluaran:  alat/agama-dalam-angka.json
"""
import json
import os
import re
import sys

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

AKAR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KELUARAN = os.path.join(AKAR, "alat", "agama-dalam-angka.json")

KATA_AGAMA = re.compile(r"islam|katolik|protestan|hindu|budha|buddha|konghucu|kepercayaan", re.I)
KOSONG = ("-", "\u2013", "\u2014", "...", "\u2026", "", "~0", "0,00", "0.00")
AWALAN = re.compile(r"^(provinsi|kabupaten|kota|kab\.|kotamadya)\s+", re.I)
JUDUL_KAB = re.compile(r"kabupaten\s*/?\s*regency", re.I)
JUDUL_KOTA = re.compile(r"kota\s*/?\s*municipality", re.I)


def baca_data_js(berkas, nama_var):
    """Baca variabel dari berkas data/*.js tanpa menjalankan peramban."""
    jalur = os.path.join(AKAR, "data", berkas)
    with open(jalur, encoding="utf-8") as f:
        isi = f.read()
    m = re.search(re.escape(nama_var) + r"\s*=\s*(\{.*?\n\};)", isi, re.S)
    if not m:
        m = re.search(re.escape(nama_var) + r"\s*=\s*(\{.*\})", isi, re.S)
    return json.loads(m.group(1).rstrip(";"))


def nama_provinsi(kode_prov):
    """Nama provinsi dari data/wilayah/provinsi.js."""
    jalur = os.path.join(AKAR, "data", "wilayah", "provinsi.js")
    with open(jalur, encoding="utf-8") as f:
        isi = f.read()
    m = re.search(r'\["%s","([^"]+)"' % kode_prov, isi)
    return m.group(1) if m else None


def bersih_nama(teks):
    """Sisakan huruf saja dari sebuah nama.

    Dipakai untuk mencocokkan nama di PDF dengan daftar wilayah. Tanda air
    (watermark) alamat situs BPS menyelipkan huruf ke dalam sel, contohnya
    "Lampung" terbaca "t\\nLampung t". Dengan menyisakan huruf saja, nama
    tetap bisa dikenali karena nama aslinya ada di dalamnya.
    """
    t = str(teks or "").lower().strip()
    t = AWALAN.sub("", t)
    return re.sub(r"[^a-z]", "", t)


def daftar_kabkota(kode_prov):
    """Nama kabupaten/kota sebuah provinsi.

    Keluarannya dua daftar: yang berawalan "Kabupaten" dan yang berawalan
    "Kota", supaya nama kembar (Kabupaten Solok vs Kota Solok) tidak tertukar.
    """
    jalur = os.path.join(AKAR, "data", "wilayah", "kabkota.js")
    with open(jalur, encoding="utf-8") as f:
        isi = f.read()
    kab, kota = {}, {}
    for m in re.finditer(r'\["(\d\d\.\d\d)","([^"]+)"', isi):
        kode, nama = m.group(1), m.group(2)
        if not kode.startswith(kode_prov + "."):
            continue
        if re.match(r"^(Kota|Kotamadya)\s+", nama, re.I):
            kota[bersih_nama(AWALAN.sub("", nama))] = (kode, nama)
        else:
            kab[bersih_nama(AWALAN.sub("", nama))] = (kode, nama)
    return kab, kota


def angka_dari(teks):
    """Ubah '1.234' atau '96,279' jadi 1234 / 96279. Tanda '-' jadi None.

    Huruf dibuang dulu karena tanda air BPS menyelipkan huruf ke dalam sel
    angka (mis. "d\\n21.212 . i" seharusnya "21.212").
    """
    if teks is None:
        return None
    t = str(teks).strip()
    if t in KOSONG:
        return None
    t = re.sub(r"[^\d.,]", "", t).strip(".,")
    if not t or t in KOSONG:
        return None
    if re.match(r"^\d{1,3}(?:,\d{3})+$", t):
        t = t.replace(",", "")
    elif re.match(r"^\d{1,3}(?:\.\d{3})+$", t):
        t = t.replace(".", "")
    else:
        t = t.replace(",", ".")
    try:
        return int(float(t))
    except ValueError:
        return None


def nama_kabkota(teks, kab, kota, jenis):
    """Cocokkan isi sel dengan daftar kabupaten/kota provinsi.

    Nama di PDF bisa kena tanda air (mis. "t\\nLampung t", "h\\nPinrang"),
    diberi nomor ("1. Sumba Barat"), atau disertai terjemahan Inggris
    ("Kota Gorontalo\\nGorontalo Municipality"). Karena itu nama dicocokkan
    dengan mencari nama wilayah TERPANJANG yang terkandung di dalam sel.

    Daftar yang dipakai mengikuti penanda di sel itu sendiri: kalau sel memuat
    "Kota"/"Municipality" dipakai daftar kota, kalau memuat "Kabupaten"/
    "Regency" dipakai daftar kabupaten. Ini penting untuk nama kembar seperti
    Kabupaten Gorontalo dan Kota Gorontalo.
    """
    asli = str(teks or "")
    b = bersih_nama(re.sub(r"^\d+[.\s]+", "", asli))
    if not b:
        return None
    if re.search(r"kota|municipality", asli, re.I):
        jenis = "kota"
    elif re.search(r"kabupaten|regency", asli, re.I):
        jenis = "kab"
    utama, cadangan = (kota, kab) if jenis == "kota" else (kab, kota)
    for daftar in (utama, cadangan):
        if b in daftar:
            return daftar[b]
        terbaik = None
        for nama, nilai in daftar.items():
            if nama and nama in b and (terbaik is None or len(nama) > len(terbaik[0])):
                terbaik = (nama, nilai)
        if terbaik:
            return terbaik[1]
    return None


NOMOR_TABEL = re.compile(r"(?:tabel|table)\s+(\d+(?:\.\d+)+)", re.I)


def nomor_tabel(teks):
    """Ambil nomor tabel dari teks halaman, mis. "4.5.4".

    Halaman lanjutan memuat tulisan "Lanjutan Tabel/Continued Table 4.5.4",
    jadi nomornya sama dengan halaman pertama. Nomor ini dipakai untuk
    menggabungkan halaman yang memang satu tabel, dan memisahkan tabel lain
    yang kebetulan bersebelahan (mis. tabel tempat ibadah).
    """
    m = NOMOR_TABEL.search(teks)
    return m.group(1) if m else None


def halaman_tabel_agama(doc, kab, kota):
    """Cari kelompok halaman yang memuat tabel agama.

    Halaman dianggap memuat tabel agama kalau ada tabel yang BARIS KEPALANYA
    memuat >= 3 nama agama (Islam, Protestan, Katolik, ...). Halaman yang
    berurutan DAN bernomor tabel sama digabung jadi satu kelompok, karena
    tabel BPS sering dipecah dua halaman.
    """
    semua_nama = list(kab) + list(kota)
    calon = []
    for i in range(doc.page_count):
        teks = doc[i].get_text()
        # Saring dulu dengan teks halaman supaya find_tables() tidak dipanggil
        # di semua halaman (lambat dan memicu galat struktur PDF).
        if len(KATA_AGAMA.findall(teks)) < 3:
            continue
        tl = bersih_nama(teks)
        if sum(1 for nama in semua_nama if nama in tl) < 3:
            continue
        for tabel in tabel_halaman(doc[i]):
            kepala, kolom, _ = kolom_agama(tabel.extract())
            if kepala is not None and len(kolom) >= 3:
                calon.append((i, nomor_tabel(teks)))
                break
    kelompok = []
    for i, nomor in calon:
        if (kelompok and i == kelompok[-1][-1][0] + 1
                and nomor is not None and nomor == kelompok[-1][0][1]):
            kelompok[-1].append((i, nomor))
        else:
            kelompok.append([(i, nomor)])
    return [[i for i, _ in g] for g in kelompok]


NAMA_KOLOM = [
    (re.compile(r"islam|moslem|muslim", re.I), "Islam"),
    (re.compile(r"protestan|protestant", re.I), "Protestan"),
    (re.compile(r"katolik|catholic|chatolic", re.I), "Katolik"),
    (re.compile(r"kristen|christian", re.I), "Kristen"),
    (re.compile(r"hindu", re.I), "Hindu"),
    (re.compile(r"budha|buddha|buddhist", re.I), "Budha"),
    (re.compile(r"konghucu|confucius|confucianism", re.I), "Konghucu"),
    (re.compile(r"kepercayaan|belief", re.I), "Kepercayaan"),
    (re.compile(r"lainnya|others", re.I), "Lainnya"),
]


def nama_kolom_bersih(label):
    """Ubah nama kolom PDF jadi nama standar.

    Di PDF, nama kolom ditulis dua bahasa (mis. "Katolik\\nCatholic") atau
    ada salah tulis ("Chatolic"). Supaya seragam di data/agama.js, nama
    kolom diseragamkan jadi satu kata Indonesia. Kalau tidak dikenali,
    nama aslinya tetap dipakai (tidak dikarang).
    """
    t = re.sub(r"\s+", " ", str(label or "")).strip()
    for pola, nama in NAMA_KOLOM:
        if pola.search(t):
            return nama
    return t


def tabel_halaman(halaman):
    """Ambil tabel di satu halaman, dengan dua cara.

    Sebagian tabel BPS bergaris (mode "lines"), sebagian lagi hanya berupa
    susunan teks tanpa garis (mode "text"). Kalau cara pertama tidak dapat
    tabel, dicoba cara kedua.
    """
    tabel = halaman.find_tables().tables
    if tabel:
        return tabel
    return halaman.find_tables(strategy="text").tables


def label_kolom(baris):
    """Ambil nama kolom dari baris kepala tabel.

    Sel yang DIGABUNG (merge) terbaca None, jadi diisi dari kolom sebelah kiri.
    Contoh Kepulauan Riau: ['Kabupaten/Kota', 'Islam', None, 'Protestan', None]
    -> ['Kabupaten/Kota', 'Islam', 'Islam', 'Protestan', 'Protestan'].
    Sel yang benar-benar kosong ("") DIBIARKAN kosong, karena itu biasanya
    kolom pemisah antar kelompok (mis. antara Hindu-perempuan dan Budha).
    """
    hasil = []
    for sel in baris:
        if sel is None and hasil:
            hasil.append(hasil[-1])
            continue
        hasil.append(re.sub(r"\s+", " ", str(sel)).strip())
    return hasil


def kolom_agama(tabel):
    """Cari baris kepala tabel -> (nomor baris kepala, kolom agama, kolom Jumlah).

    Baris kepala dikenali dari sel pertama yang memuat "Kabupaten" atau
    "Regency". Nama kolom agama dicocokkan dengan KATA_AGAMA, kolom total
    dicocokkan dengan "jumlah"/"total".
    """
    for i, baris in enumerate(tabel):
        if not baris or not re.search(r"kabupaten|regency|municipality", str(baris[0]), re.I):
            continue
        label = label_kolom(baris)
        agama = [j for j, t in enumerate(label) if j and KATA_AGAMA.search(t)]
        jumlah = [j for j, t in enumerate(label) if j and re.search(r"jumlah|total", t, re.I)]
        if agama:
            return i, agama, (jumlah[0] if jumlah else None)
    return None, [], None


def ada_pisah_kelamin(tabel, kepala):
    """Apakah tabel memisah laki-laki dan perempuan?

    Contoh Kepulauan Riau: baris kepala memuat "Islam", baris di bawahnya
    memuat "Laki-Laki/Male" dan "Perempuan/Female". Kalau begitu, angka
    laki-laki dan perempuan harus dijumlahkan supaya jadi satu angka agama.
    """
    if kepala + 1 >= len(tabel):
        return False
    bawah = " ".join(str(x or "") for x in tabel[kepala + 1])
    return bool(re.search(r"laki-laki|male", bawah, re.I)) and \
        bool(re.search(r"perempuan|female", bawah, re.I))


def _baris_provinsi(sel, nama_prov):
    """Apakah sel ini baris total provinsi (boleh kena tanda air)?

    Tiga bentuk yang ditemui di PDF BPS:
      "Aceh"                                  -> sama persis
      "t\\nLampung t"                          -> kena tanda air (beda 2 huruf)
      "Provinsi Gorontalo\\nGorontalo Province" -> disertai kata "Provinsi"
    Nama kabupaten yang mirip ("Aceh Besar") TIDAK boleh ikut terbaca, karena
    itu selisih panjangnya dibatasi ketat.
    """
    b = bersih_nama(sel)
    p = bersih_nama(nama_prov)
    if not b or not p:
        return False
    if re.search(r"provinsi|province", str(sel), re.I):
        return True
    if b == p:
        return True
    # Nama provinsi di tabel kadang disingkat, mis. "Kep. Bangka Belitung"
    # untuk "Kepulauan Bangka Belitung".
    b2 = b.replace("kepulauan", "kep")
    p2 = p.replace("kepulauan", "kep")
    if b2 == p2:
        return True
    return p2 in b2 and len(b2) - len(p2) <= 2


def baca_tabel(halaman, kab, kota, nama_prov):
    """Baca semua tabel di satu halaman -> {kode: {angka, jumlah, kolom}}.

    Hanya kolom yang namanya benar-benar agama yang diambil, jadi kolom
    "Jumlah", kolom laki-laki/perempuan, dan kolom lain tidak ikut terbaca.
    Baris total provinsi disimpan dengan kunci "PROV" sebagai bukti.
    """
    hasil = {}
    for tabel in tabel_halaman(halaman):
        baris_semua = tabel.extract()
        kepala, kolom, kol_jumlah = kolom_agama(baris_semua)
        if kepala is None:
            continue
        label = label_kolom(baris_semua[kepala])
        # Buang kolom agama yang namanya kosong (sel pemisah antar kelompok)
        kolom = [j for j in kolom if str(label[j]).strip()]
        # Kalau tabel memisah laki-laki/perempuan, angka tiap agama dijumlahkan
        # dulu supaya jadi satu angka per agama.
        pisah_kelamin = ada_pisah_kelamin(baris_semua, kepala)
        if pisah_kelamin:
            kolom = [kolom[i] for i in range(0, len(kolom), 2)]
        nama_kolom = [nama_kolom_bersih(label[j]) for j in kolom]
        jenis = "kab"
        for baris in baris_semua[kepala + 1:]:
            if not baris:
                continue
            sel0 = str(baris[0] or "")
            # Baris judul "Kabupaten/Regency" dan "Kota/Municipality" jadi penanda
            if JUDUL_KOTA.search(sel0):
                jenis = "kota"
                continue
            if JUDUL_KAB.search(sel0):
                jenis = "kab"
                continue
            # Baris total provinsi diperiksa lebih dulu, supaya nama provinsi
            # tidak tertukar dengan nama kabupaten yang mirip (mis. "Aceh").
            # Nama provinsi boleh kena tanda air ("t\nLampung t"), jadi
            # dicocokkan dengan "terkandung di dalam sel" + panjang mirip.
            if nama_prov and sel0 and _baris_provinsi(sel0, nama_prov):
                kode, nama = "PROV", nama_prov
            else:
                kk = nama_kabkota(sel0, kab, kota, jenis)
                if not kk:
                    continue
                kode, nama = kk
            angka = []
            for j in kolom:
                if j >= len(baris):
                    angka.append(0)
                    continue
                if pisah_kelamin:
                    # Angka laki-laki + perempuan di kolom sebelahnya
                    a = angka_dari(baris[j]) or 0
                    b = angka_dari(baris[j + 1]) if j + 1 < len(baris) else 0
                    angka.append(a + (b or 0))
                else:
                    # Sel bertanda "-" (tidak ada) dihitung 0, TIDAK dibuang,
                    # supaya posisi angkanya tetap sejajar dengan nama kolom.
                    angka.append(angka_dari(baris[j]) or 0)
            total = angka_dari(baris[kol_jumlah]) if kol_jumlah is not None and kol_jumlah < len(baris) else None
            # Satu kabupaten/kota hanya boleh muncul sekali per halaman.
            # Kalau muncul lagi, itu baris tahun lain (mis. 2024, 2023) atau
            # baris yang salah baca -> dibuang, supaya angkanya tidak dobel.
            if kode not in hasil:
                hasil[kode] = {"nama": nama, "angka": list(angka), "jumlah": total,
                               "kolom": nama_kolom}
    return hasil


def baca_kelompok(doc, kelompok, kab, kota, nama_prov):
    """Gabungkan angka dari semua halaman satu kelompok, lalu uji kebenarannya.

    UJI KEBENARAN (dari dokumen itu sendiri):
      Jumlah angka semua kabupaten/kota harus sama dengan angka baris total
      provinsi di tabel yang sama. Kalau tidak sama, tabel itu dibuang.
    """
    kumpul = {}
    for h in kelompok:
        for k, v in baca_tabel(doc[h], kab, kota, nama_prov).items():
            if k not in kumpul:
                kumpul[k] = {"nama": v["nama"], "angka": list(v["angka"]),
                             "jumlah": v["jumlah"], "kolom": v["kolom"]}
            else:
                kumpul[k]["angka"].extend(v["angka"])
                kumpul[k]["kolom"] = kumpul[k]["kolom"] + v["kolom"]
                if v["jumlah"] is not None:
                    kumpul[k]["jumlah"] = v["jumlah"]
    prov = kumpul.pop("PROV", None)
    if prov is None:
        return {}, []
    # Baris total provinsi: pakai kolom "Jumlah" kalau ada, kalau tidak jumlahkan
    total_prov = prov["jumlah"] if prov["jumlah"] is not None else sum(prov["angka"])
    # Tabel penduduk pasti besar. Angka kecil berarti itu tabel lain yang
    # kebetulan punya kolom agama (mis. tabel tempat ibadah) -> dibuang.
    if not total_prov or total_prov < 100000:
        return {}, []
    # UJI: jumlah semua kabupaten/kota harus sama dengan baris total provinsi
    jumlah_kabkota = sum(v["jumlah"] if v["jumlah"] is not None else sum(v["angka"])
                         for v in kumpul.values())
    if abs(jumlah_kabkota - total_prov) > max(1, total_prov * 0.005):
        return {}, [["(seluruh provinsi)", "jumlah kab/kota %s vs provinsi %s"
                     % (jumlah_kabkota, total_prov)]]
    benar = {}
    for k, v in kumpul.items():
        total = v["jumlah"] if v["jumlah"] is not None else sum(v["angka"])
        benar[k] = {"nama": v["nama"], "angka": v["angka"], "total": total,
                    "kolom": v["kolom"],
                    "cara": "kolom-jumlah" if v["jumlah"] is not None else "dijumlahkan"}
    return benar, []


def utama():
    """Baca PDF. Bisa dibatasi: python alat/baca-agama-dalam-angka.py 51 13

    Tanpa argumen = semua provinsi (lama, ±10 menit). Dengan argumen kode
    provinsi = hanya provinsi itu (cepat, ±10 detik per provinsi).
    """
    pilih = [a for a in sys.argv[1:] if re.match(r"^\d\d$", a)]
    with open(KELUARAN, encoding="utf-8") as f:
        catatan = json.load(f)

    import fitz
    ringkas = {}
    for kode, catat in sorted(catatan.items()):
        if pilih and kode not in pilih:
            continue
        berkas = catat.get("pdf")
        if not berkas:
            continue
        jalur = os.path.join(AKAR, berkas)
        if not os.path.exists(jalur):
            continue
        kab, kota = daftar_kabkota(kode)
        prov = nama_provinsi(kode)
        doc = fitz.open(jalur)
        # Kalau ada beberapa tabel agama, ambil yang paling banyak tervalidasi
        terbaik, terbaik_gagal, terbaik_hal = {}, [], []
        for kelompok in halaman_tabel_agama(doc, kab, kota):
            benar, gagal = baca_kelompok(doc, kelompok, kab, kota, prov)
            if len(benar) > len(terbaik):
                terbaik, terbaik_gagal = benar, gagal
                terbaik_hal = [h + 1 for h in kelompok]
        doc.close()
        catat["terbaca"] = terbaik
        catat["gagal"] = terbaik_gagal
        catat["halaman_terbaca"] = terbaik_hal
        # Nama kolom agama diambil dari baris yang kolomnya paling lengkap.
        # Tabel yang terbagi dua halaman hanya punya sebagian kolom di halaman
        # pertama (mis. Bali halaman 1 = 4 kolom, halaman 2 = 3 kolom lagi).
        kolom_terbaik = []
        for v in terbaik.values():
            if len(v["kolom"]) > len(kolom_terbaik):
                kolom_terbaik = v["kolom"]
        catat["kolom"] = kolom_terbaik
        ringkas[kode] = (catat["nama"], len(terbaik), len(kab) + len(kota), len(terbaik_gagal))

    with open(KELUARAN, "w", encoding="utf-8") as f:
        json.dump(catatan, f, ensure_ascii=False, indent=1)

    print("%-4s %-32s %s" % ("kode", "provinsi", "terbaca / jumlah kab-kota"))
    print("-" * 70)
    for kode, (nama, n, total, g) in sorted(ringkas.items()):
        tanda = "OK" if n == total else ("sebagian" if n else "GAGAL")
        print("%-4s %-32s %2d / %2d  %s%s" % (kode, nama, n, total, tanda,
              ("  (gagal %d)" % g) if g else ""))
    siap = sum(1 for v in ringkas.values() if v[1] == v[2])
    print("-" * 70)
    print("Provinsi lengkap & tervalidasi: %d" % siap)


if __name__ == "__main__":
    utama()
