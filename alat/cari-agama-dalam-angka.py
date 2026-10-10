"""CARI TABEL AGAMA DI DALAM "PROVINSI DALAM ANGKA" (PDF BPS)

Cara kerja:
  1. Buka halaman publikasi BPS provinsi → cari "Provinsi X Dalam Angka <tahun>"
  2. Ambil tautan unduh PDF-nya
  3. Unduh PDF, lalu cari halaman yang memuat tabel agama per kabupaten/kota
  4. Simpan temuan ke alat/agama-dalam-angka.json

Jalankan:  python alat/cari-agama-dalam-angka.py
"""
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request

# Konsol Windows kadang bukan UTF-8 -> paksa supaya tanda panah tidak bikin gagal
try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

AKAR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KELUARAN = os.path.join(AKAR, "alat", "agama-dalam-angka.json")
FOLDER_PDF = os.path.join(AKAR, "catat", "pdf-agama")

# Subdomain BPS tiap provinsi (yang belum punya data agama)
PROVINSI = [
    ("11", "Aceh", "aceh"),
    ("13", "Sumatera Barat", "sumbar"),
    ("14", "Riau", "riau"),
    ("17", "Bengkulu", "bengkulu"),
    ("18", "Lampung", "lampung"),
    ("19", "Kepulauan Bangka Belitung", "babel"),
    ("21", "Kepulauan Riau", "kepri"),
    ("34", "Daerah Istimewa Yogyakarta", "yogyakarta"),
    ("35", "Jawa Timur", "jatim"),
    ("36", "Banten", "banten"),
    ("51", "Bali", "bali"),
    ("52", "Nusa Tenggara Barat", "ntb"),
    ("53", "Nusa Tenggara Timur", "ntt"),
    ("61", "Kalimantan Barat", "kalbar"),
    ("62", "Kalimantan Tengah", "kalteng"),
    ("63", "Kalimantan Selatan", "kalsel"),
    ("64", "Kalimantan Timur", "kaltim"),
    ("72", "Sulawesi Tengah", "sulteng"),
    ("73", "Sulawesi Selatan", "sulsel"),
    ("75", "Gorontalo", "gorontalo"),
    ("76", "Sulawesi Barat", "sulbar"),
    ("81", "Maluku", "maluku"),
    ("82", "Maluku Utara", "malut"),
    ("91", "Papua", "papua"),
    ("92", "Papua Barat", "papuabarat"),
]

JEDA = 9  # detik — BPS membatasi permintaan beruntun (aturan C10)

UA = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/120.0 Safari/537.36",
    "Accept-Language": "id-ID,id;q=0.9,en;q=0.8",
}


# BPS menolak permintaan biasa (HTTP 403). Jadi halaman dibuka lewat browser
# sungguhan (Playwright). PDF-nya diunduh lewat browser juga.
_BROWSER = None
_KONTEKS = None


def siapkan_browser():
    """BPS menolak browser tanpa tampilan (headless) -> pakai mode tampil."""
    global _BROWSER, _KONTEKS
    if _BROWSER is None:
        from playwright.sync_api import sync_playwright
        _PW = sync_playwright().start()
        _BROWSER = _PW.chromium.launch(
            headless=False, args=["--disable-blink-features=AutomationControlled"])
        _KONTEKS = _BROWSER.new_context(
            user_agent=UA["User-Agent"], locale="id-ID",
            viewport={"width": 1440, "height": 900})
    return _KONTEKS


def ambil(url, biner=False, ulang=3):
    """Buka halaman lewat browser. biner=True -> kembalikan isi berkas (PDF)."""
    for ke in range(ulang):
        try:
            konteks = siapkan_browser()
            halaman = konteks.new_page()
            try:
                if biner:
                    jawab = konteks.request.get(url, timeout=180000)
                    if not jawab.ok:
                        raise RuntimeError("HTTP %d" % jawab.status)
                    return jawab.body()
                halaman.goto(url, wait_until="domcontentloaded", timeout=90000)
                halaman.wait_for_timeout(10000)
                return halaman.content()
            finally:
                halaman.close()
        except Exception as e:
            if ke == ulang - 1:
                raise
            print("      (coba ulang %d: %s)" % (ke + 1, str(e)[:60]))
            time.sleep(JEDA)
    return None


def tutup_browser():
    global _BROWSER
    if _BROWSER is not None:
        _BROWSER.close()
        _BROWSER = None


def cari_publikasi(sub, nama):
    """Cari taпутan halaman 'Provinsi X Dalam Angka' terbaru."""
    url = "https://%s.bps.go.id/id/publication?keyword=%s" % (
        sub, urllib.parse.quote("dalam angka"))
    html = ambil(url)
    if not html:
        return None
    # Pola alamat BPS: /id/publication/<tahun>/<bln>/<tgl>/<kode>/<slug>.html
    # Slug "Dalam Angka" memuat "dalam-angka". Ini paling andal.
    pola = re.compile(r'href="(/id/publication/(\d{4})/[^"]*?/[\w-]*dalam-angka[\w-]*\.html)"')
    kandidat = {}
    for m in pola.finditer(html):
        tautan, tahun = m.group(1), int(m.group(2))
        if tahun not in kandidat or tautan < kandidat[tahun]:
            kandidat[tahun] = tautan
    if not kandidat:
        return None
    tahun = max(kandidat)
    return (tahun, kandidat[tahun], "Provinsi %s Dalam Angka %d" % (nama, tahun))


def cari_pdf(tautan, sub):
    """Buka halaman publikasi -> ambil tautan unduh PDF."""
    html = ambil(tautan if tautan.startswith("http") else "https://%s.bps.go.id%s" % (sub, tautan))
    if not html:
        return None
    m = re.search(r'href="(https://web-api\.bps\.go\.id/download\.php\?f=[^"]+)"', html)
    return m.group(1) if m else None


def periksa_pdf(berkas):
    """Cari halaman yang memuat tabel agama per kabupaten/kota."""
    import fitz
    doc = fitz.open(berkas)
    temuan = []
    for i in range(doc.page_count):
        t = doc[i].get_text()
        if not re.search(r"agama", t, re.I):
            continue
        # tabel agama biasanya menyebut kabupaten/kota + nama-nama agama
        ada_kolom = len(re.findall(r"Islam|Katolik|Protestan|Hindu|Budha|Konghucu|Kepercayaan", t, re.I))
        if ada_kolom >= 4:
            judul = ""
            for b in t.split("\n"):
                if re.search(r"jumlah penduduk menurut agama", b, re.I):
                    judul = b.strip()
                    break
            temuan.append({
                "halaman": i + 1,
                "judul": judul,
                "ada_kepercayaan": bool(re.search(r"kepercayaan", t, re.I)),
                "cuplikan": re.sub(r"\s+", " ", t)[:400],
            })
    doc.close()
    return temuan


def utama():
    os.makedirs(FOLDER_PDF, exist_ok=True)
    hasil = {}
    if os.path.exists(KELUARAN):
        with open(KELUARAN, encoding="utf-8") as f:
            hasil = json.load(f)

    for kode, nama, sub in PROVINSI:
        if kode in hasil and hasil[kode].get("temuan"):
            print("[%s] %s — sudah ada, dilewati" % (kode, nama))
            continue
        print("[%s] %s ..." % (kode, nama))
        catat = {"nama": nama, "subdomain": sub}
        try:
            pub = cari_publikasi(sub, nama)
            if not pub:
                catat["catatan"] = "publikasi 'Dalam Angka' tidak ditemukan"
                print("      → tidak ditemukan")
            else:
                tahun, tautan, judul = pub
                catat["tahun"] = tahun
                catat["judul"] = judul
                catat["halaman_publikasi"] = tautan
                print("      → %s (%s)" % (judul[:70], tahun))
                time.sleep(JEDA)
                pdf = cari_pdf(tautan, sub)
                if not pdf:
                    catat["catatan"] = "tautan PDF tidak ditemukan"
                    print("      → PDF tidak ditemukan")
                else:
                    berkas = os.path.join(FOLDER_PDF, "%s-%s.pdf" % (sub, tahun))
                    if not os.path.exists(berkas):
                        time.sleep(JEDA)
                        data = ambil(pdf, biner=True)
                        with open(berkas, "wb") as f:
                            f.write(data)
                    catat["pdf"] = os.path.relpath(berkas, AKAR)
                    catat["ukuran_pdf"] = os.path.getsize(berkas)
                    print("      → PDF %.1f MB" % (catat["ukuran_pdf"] / 1048576))
                    temuan = periksa_pdf(berkas)
                    catat["temuan"] = temuan
                    if temuan:
                        print("      → TABEL AGAMA: %d halaman, kepercayaan=%s"
                              % (len(temuan), any(x["ada_kepercayaan"] for x in temuan)))
                    else:
                        print("      → tabel agama TIDAK ADA di PDF ini")
        except Exception as e:
            catat["catatan"] = "GAGAL: " + str(e)[:150]
            print("      → GAGAL: %s" % str(e)[:100])
        hasil[kode] = catat
        with open(KELUARAN, "w", encoding="utf-8") as f:
            json.dump(hasil, f, ensure_ascii=False, indent=1)
        time.sleep(JEDA)

    tutup_browser()
    ada = sum(1 for v in hasil.values() if v.get("temuan"))
    print("\nSELESAI: %d dari %d provinsi punya tabel agama" % (ada, len(PROVINSI)))


if __name__ == "__main__":
    utama()
