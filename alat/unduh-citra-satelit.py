"""Unduh citra satelit Indonesia sekali, simpan jadi satu berkas gambar.

Hasilnya dipakai aplikasi sebagai latar peta (offline) — jadi aplikasi
TIDAK perlu internet untuk menampilkan peta.

Sumber citra: Esri World Imagery (gratis, tanpa kunci API).
Jalankan:  python alat/unduh-citra-satelit.py
"""

import io
import json
import math
import os
import sys
import time
import urllib.request
from concurrent.futures import ThreadPoolExecutor

import numpy as np
from PIL import Image

Image.MAX_IMAGE_PIXELS = None

AKAR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BERKAS_PETA = os.path.join(AKAR, "data", "peta-indonesia.js")
BERKAS_KELUARAN = os.path.join(AKAR, "data", "citra-satelit.jpg")

ZOOM = 8                 # tingkat rincian ubin (8 ≈ 600 m per piksel)
LEBAR_AKHIR = 8192       # lebar gambar akhir (px) — cukup tajam sampai zoom ±6×
MUTU_JPEG = 80
TILE = 256
VB_W, VB_H = 1000, 400   # ukuran bidang peta di aplikasi (lihat js/app.js)
SUMBER = ("https://server.arcgisonline.com/ArcGIS/rest/services/"
          "World_Imagery/MapServer/tile/{z}/{y}/{x}")
PENANDA = "Esri, Maxar, Earthstar Geographics"


def baca_batas():
    """Ambil kotak batas (bujur/lintang) dari data peta provinsi."""
    teks = open(BERKAS_PETA, encoding="utf-8").read()
    data = json.loads(teks[teks.index("{"):teks.rindex("}") + 1])
    min_lon = min_lat = float("inf")
    max_lon = max_lat = float("-inf")

    def telusuri(c):
        nonlocal min_lon, min_lat, max_lon, max_lat
        if isinstance(c[0], (int, float)):
            min_lon = min(min_lon, c[0])
            max_lon = max(max_lon, c[0])
            min_lat = min(min_lat, c[1])
            max_lat = max(max_lat, c[1])
        else:
            for bagian in c:
                telusuri(bagian)

    for f in data["features"]:
        telusuri(f["geometry"]["coordinates"])
    return min_lon, min_lat, max_lon, max_lat


def lon_ke_piksel(lon, z):
    return (lon + 180.0) / 360.0 * (TILE * 2 ** z)


def lat_ke_piksel(lat, z):
    lat = np.clip(lat, -85.05112878, 85.05112878)
    rad = np.radians(lat)
    return (1.0 - np.log(np.tan(rad) + 1.0 / np.cos(rad)) / np.pi) / 2.0 * (TILE * 2 ** z)


def unduh_ubin(z, x, y, percobaan=4):
    url = SUMBER.format(z=z, x=x, y=y)
    for n in range(percobaan):
        try:
            with urllib.request.urlopen(url, timeout=30) as r:
                return Image.open(io.BytesIO(r.read())).convert("RGB")
        except Exception as e:
            if n == percobaan - 1:
                raise RuntimeError(f"gagal {url}: {e}")
            time.sleep(1.5 * (n + 1))


def ratakan_ke_equirectangular(potong, derajat_lon, lat_atas, lat_bawah,
                               baris_awal, geser_x):
    """Ubah citra Mercator → equirectangular (lintang digambar lurus).

    Peta aplikasi memakai proyeksi equirectangular, ubin citra memakai
    Mercator (makin ke kutub makin melar). Tanpa langkah ini, garis
    provinsi akan meleset dari citra.

    potong      : potongan kanvas citra (masih Mercator)
    derajat_lon : lebar bidang peta dalam derajat (maks_bujur - min_bujur)
    baris_awal  : baris Mercator GLOBAL dari potong[0] — bukan pecahannya
    geser_x     : selisih pecahan kolom awal, supaya tepi kiri hasil
                  tepat pada garis bujur kiri peta

    Dua kolom terakhir potongan dicadangkan untuk pergeseran pecahan itu.
    Tinggi hasil dihitung dari skala mendatar supaya rasionya sama
    dengan bidang peta aplikasi.
    """
    tinggi_m, lebar_m = potong.shape[:2]
    lebar_e = lebar_m - 2
    tinggi_e = max(2, int(round(lebar_e * (lat_atas - lat_bawah) / derajat_lon)))

    baris = np.linspace(lat_atas, lat_bawah, tinggi_e)
    y_m = lat_ke_piksel(baris, ZOOM) - baris_awal
    if y_m.min() < -1.0 or y_m.max() > tinggi_m:
        raise RuntimeError(
            f"baris_awal salah: y_m {y_m.min():.0f}..{y_m.max():.0f} "
            f"di luar potongan 0..{tinggi_m}. Perlu baris Mercator global potong[0].")
    y0 = np.clip(np.floor(y_m).astype(np.int32), 0, tinggi_m - 1)
    y1 = np.clip(y0 + 1, 0, tinggi_m - 1)
    bobot_y = (y_m - np.floor(y_m)).astype(np.float32)
    geser_x = float(geser_x)

    hasil = np.empty((tinggi_e, lebar_e, 3), dtype=np.uint8)
    blok = 256                       # diproses per blok supaya hemat memori
    for mulai in range(0, tinggi_e, blok):
        selesai = min(mulai + blok, tinggi_e)
        b = bobot_y[mulai:selesai][:, None, None]
        isi = potong[y0[mulai:selesai]].astype(np.float32) * (1.0 - b)
        isi += potong[y1[mulai:selesai]].astype(np.float32) * b
        if geser_x > 1e-6:
            isi = isi[:, :lebar_e] * (1.0 - geser_x) + isi[:, 1:lebar_e + 1] * geser_x
        else:
            isi = isi[:, :lebar_e]
        hasil[mulai:selesai] = np.clip(isi + 0.5, 0, 255).astype(np.uint8)
    return Image.fromarray(hasil)


def main():
    min_lon, min_lat, max_lon, max_lat = baca_batas()
    print(f"Batas peta: bujur {min_lon:.3f}..{max_lon:.3f} · lintang {min_lat:.3f}..{max_lat:.3f}")

    # Peta aplikasi memakai skala = VB_W / (max_lon - min_lon) dan menaruh
    # Indonesia di tengah tinggi VB_H. Jadi citra harus digambar dengan
    # skala yang sama, lalu dipotong selebar/setinggi bidang peta.
    skala = VB_W / (max_lon - min_lon)
    derajat_lon = max_lon - min_lon
    tinggi_bidang = VB_H / skala                      # derajat lintang yang tercakup
    lat_atas = max_lat + (VB_H - (max_lat - min_lat) * skala) / 2 / skala
    lat_bawah = lat_atas - tinggi_bidang
    print(f"Bidang peta: lintang {lat_bawah:.4f}..{lat_atas:.4f} "
          f"(rasio {VB_W / VB_H:.3f})")

    # Ukuran potongan dihitung dari BEDA koordinat Mercator, bukan dari
    # selisih pembulatan, supaya tepinya tidak bergeser. Sisa pecahannya
    # dipakai untuk menggeser gambar saat diratakan (lihat geser_x).
    kiri_m = lon_ke_piksel(min_lon, ZOOM)
    atas_m = lat_ke_piksel(lat_atas, ZOOM)
    bawah_m = lat_ke_piksel(lat_bawah, ZOOM)
    lebar_m = int(round(lon_ke_piksel(max_lon, ZOOM) - kiri_m))
    tinggi_m = int(math.ceil(bawah_m - atas_m)) + 1

    x_awal = int(math.floor(kiri_m))
    y_awal = int(math.floor(atas_m))
    geser_x = float(kiri_m - x_awal)

    x_akhir = x_awal + lebar_m + 2      # 2 kolom cadangan untuk geser_x
    y_akhir = y_awal + tinggi_m

    x0, x1 = x_awal // TILE, (x_akhir - 1) // TILE
    y0, y1 = y_awal // TILE, (y_akhir - 1) // TILE
    kolom, baris = x1 - x0 + 1, y1 - y0 + 1
    print(f"Zoom {ZOOM}: ubin {kolom} x {baris} = {kolom * baris} ubin"
          f" · potongan {lebar_m + 2} x {tinggi_m} px")

    lebar, tinggi = kolom * TILE, baris * TILE
    kanvas = np.zeros((tinggi, lebar, 3), dtype=np.uint8)

    tugas = [(x, y) for y in range(y0, y1 + 1) for x in range(x0, x1 + 1)]
    selesai = 0

    def kerjakan(t):
        nonlocal selesai
        x, y = t
        gambar = unduh_ubin(ZOOM, x, y)
        kanvas[(y - y0) * TILE:(y - y0 + 1) * TILE,
               (x - x0) * TILE:(x - x0 + 1) * TILE] = np.asarray(gambar)
        selesai += 1
        if selesai % 25 == 0 or selesai == len(tugas):
            print(f"  {selesai}/{len(tugas)} ubin", flush=True)

    with ThreadPoolExecutor(max_workers=8) as pool:
        list(pool.map(kerjakan, tugas))

    potong = kanvas[y_awal - y0 * TILE:y_akhir - y0 * TILE,
                    x_awal - x0 * TILE:x_akhir - x0 * TILE]
    print(f"Potongan (Mercator): {potong.shape[1]} x {potong.shape[0]} px")

    gambar = ratakan_ke_equirectangular(potong, derajat_lon, lat_atas, lat_bawah,
                                        atas_m, geser_x)
    print(f"Setelah diratakan: {gambar.width} x {gambar.height} px "
          f"(rasio {gambar.width / gambar.height:.4f})")

    # Dikecilkan ke ukuran akhir. Tingginya dipaksa persis mengikuti rasio
    # bidang peta (VB_W : VB_H) supaya gambar tidak diregangkan sedikit pun
    # oleh preserveAspectRatio="none" di SVG.
    tinggi_akhir = max(1, round(LEBAR_AKHIR * VB_H / VB_W))
    if gambar.size != (LEBAR_AKHIR, tinggi_akhir):
        gambar = gambar.resize((LEBAR_AKHIR, tinggi_akhir), Image.LANCZOS)
    print(f"Ukuran akhir: {gambar.width} x {gambar.height} px "
          f"(rasio {gambar.width / gambar.height:.5f})")

    gambar.save(BERKAS_KELUARAN, "JPEG", quality=MUTU_JPEG, optimize=True, progressive=True)

    ukuran = os.path.getsize(BERKAS_KELUARAN) / 1024 / 1024
    print(f"\nSelesai: {BERKAS_KELUARAN}")
    print(f"  {gambar.width} x {gambar.height} px · {ukuran:.2f} MB")
    print(f"  Sumber: {PENANDA}")


if __name__ == "__main__":
    sys.exit(main())
