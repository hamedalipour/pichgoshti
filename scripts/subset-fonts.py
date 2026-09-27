"""
Subset Vazirmatn weights to the exact glyph set the site uses (Persian/Arabic + Latin + punctuation).
Keeps Arabic shaping features; outputs woff2 when brotli is available, otherwise ttf
(next/font converts ttf -> woff2 at build time).
"""
import glob
import json
import os
import sys
import unicodedata

from fontTools.ttLib import TTFont
from fontTools.subset import main as subset_main, Options

SRC = "src/fonts"
OUT = "src/fonts"

WEIGHTS = [
    ("Vazirmatn-Regular.woff2", "Vazirmatn-Fa-Regular.woff2"),
    ("Vazirmatn-Bold.woff2", "Vazirmatn-Fa-Bold.woff2"),
    ("Vazirmatn-ExtraBold.woff2", "Vazirmatn-Fa-ExtraBold.woff2"),
]

# --- 1) collect every character that can appear in rendered UI/content ---
chars = set()
for pattern in ("content/*.json", "src/**/*.tsx", "src/**/*.ts", "src/**/*.css"):
    for path in glob.glob(pattern, recursive=True):
        with open(path, encoding="utf-8") as fh:
            chars |= set(fh.read())
# extras that only exist at runtime (formatted numbers, separators)
chars |= set("۰۱۲۳۴۵۶۷۸۹٬٪–—…\"\"''•|/×·،؛«»؟٪")
# future-proof ranges: full ASCII, Arabic block (Persian letters + digits),
# general punctuation (incl. ZWNJ), Latin-1, currency, arrows/shapes
for lo, hi in (
    (0x0020, 0x007E),
    (0x00A0, 0x00FF),
    (0x0600, 0x06FF),
    (0x2000, 0x206F),
    (0x20A0, 0x20BF),
    (0x2122, 0x2122),
    (0x2190, 0x21BB),
    (0x25A0, 0x25FF),
    (0xFDFC, 0xFDFC),
):
    chars |= {chr(c) for c in range(lo, hi + 1)}
chars = {c for c in chars if not unicodedata.category(c).startswith("C") and c not in "\n\r\t"}
print(f"[chars] unique chars to keep: {len(chars)}")

HAVE_BROTLI = False
try:
    import brotli  # noqa: F401

    HAVE_BROTLI = True
except Exception:
    pass
print(f"[codec] brotli available: {HAVE_BROTLI}")

for src_name, out_name in WEIGHTS:
    src = os.path.join(SRC, src_name)
    if not os.path.exists(src):
        print(f"[skip] missing {src}")
        continue

    f = TTFont(src)
    cmap = set()
    for table in f["cmap"].tables:
        cmap |= set(table.cmap.keys())
    missing = {c for c in chars if ord(c) not in cmap and ord(c) > 32}
    # report only meaningful misses (letters/digits), not symbols/emoji
    miss_letters = sorted(c for c in missing if unicodedata.category(c).startswith(("L", "N")))
    keep = {c for c in chars if ord(c) in cmap}
    print(f"[{src_name}] source={os.path.getsize(src)//1024}kb | chars kept={len(keep)} | missing letters={len(miss_letters)}")
    if miss_letters:
        print("   ! not in source font:", "".join(miss_letters[:40]))
    f.close()

    out = os.path.join(OUT, out_name if HAVE_BROTLI else out_name.replace(".woff2", ".ttf"))
    opts = Options()
    opts.layout_features = ["*"]
    opts.keep_gpos = True
    opts.hinting = False
    opts.desubroutinize = True
    opts.notdef_outline = True
    opts.text = "".join(sorted(keep))
    if HAVE_BROTLI:
        opts.flavor = "woff2"
    sys.argv = ["subset", src, "--output-file=" + out] + [
        "--layout-features=*",
        "--no-hinting",
        "--desubroutinize",
        "--notdef-outline",
        "--text=" + "".join(sorted(keep)),
    ] + (["--flavor=woff2"] if HAVE_BROTLI else [])
    subset_main()
    print(f"   -> {os.path.basename(out)}: {os.path.getsize(out)//1024}kb")

print("DONE")
