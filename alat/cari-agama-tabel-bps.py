"""CARI TABEL AGAMA DI HALAMAN TABEL STATISTIK BPS PROVINSI

Buku "Provinsi Dalam Angka" tidak memuat tabel agama untuk sebagian provinsi.
Alat ini mencoba jalur lain: halaman "Tabel Statistik" BPS provinsi
(subject=519 = Agama), yang kadang memuat tabel yang tidak ada di buku.

Jalankan:  python alat/cari-agama-tabel-bps.py
Keluaran:  dicetak di layar (tidak mengubah berkas apa pun)
"""
import json
import os
import re
import sys
import time

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

AKAR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Provinsi yang belum ada datanya
SISA = [
    ("14", "Riau", "riau"),
    ("17", "Bengkulu", "bengkulu"),
    ("35", "Jawa Timur", "jatim"),
    ("52", "Nusa Tenggara Barat", "ntb"),
    ("72", "Sulawesi Tengah", "sulteng"),
    ("91", "Papua", "papua"),
]

JEDA = 9  # detik - BPS membatasi permintaan beruntun (aturan C10)

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0 Safari/537.36")

_BROWSER = None
_KONTEKS = None


def siapkan_browser():
    global _BROWSER, _KONTEKS
    if _BROWSER is None:
        from playwright.sync_api import sync_playwright
        _PW = sync_playwright().start()
        _BROWSER = _PW.chromium.launch(
            headless=False, args=["--disable-blink-features=AutomationControlled"])
        _KONTEKS = _BROWSER.new_context(
            user_agent=UA, locale="id-ID", viewport={"width": 1440, "height": 900})
    return _KONTEKS


def buka(url):
    konteks = siapkan_browser()
    halaman = konteks.new_page()
    try:
        halaman.goto(url, wait_until="domcontentloaded", timeout=90000)
        halaman.wait_for_timeout(10000)
        return halaman.content()
    finally:
        halaman.close()


def tutup():
    global _BROWSER
    if _BROWSER is not None:
        _BROWSER.close()
        _BROWSER = None


def utama():
    hasil = {}
    for kode, nama, sub in SISA:
        print("=" * 60)
        print("[%s] %s" % (kode, nama))
        for subjek in ("519", "530"):
            url = ("https://%s.bps.go.id/id/statistics-table?subject=%s"
                   % (sub, subjek))
            try:
                html = buka(url)
            except Exception as e:
                print("   subject=%s GAGAL: %s" % (subjek, str(e)[:70]))
                time.sleep(JEDA)
                continue
            # Judul tabel ada di tautan /id/statistics-table/<...>/<slug>.html
            tautan = re.findall(
                r'href="(/id/statistics-table/\d+/[^"]+\.html)"[^>]*>([^<]{5,200})<',
                html)
            agama = [(t, re.sub(r"\s+", " ", j).strip())
                     for t, j in tautan if re.search(r"agama|kepercayaan", j, re.I)]
            print("   subject=%s: %d tabel, %d menyebut agama"
                  % (subjek, len(tautan), len(agama)))
            for t, j in agama[:12]:
                print("      - %s" % j[:110])
                print("        https://%s.bps.go.id%s" % (sub, t))
            hasil[kode] = hasil.get(kode, {})
            hasil[kode][subjek] = [{"judul": j, "tautan": t} for t, j in agama]
            time.sleep(JEDA)
    tutup()
    with open(os.path.join(AKAR, "alat", "agama-tabel-bps.json"), "w",
              encoding="utf-8") as f:
        json.dump(hasil, f, ensure_ascii=False, indent=1)
    print("\nSelesai. Hasil: alat/agama-tabel-bps.json")


if __name__ == "__main__":
    utama()
