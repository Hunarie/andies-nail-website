"""Build the web-sized photos in public/img from the full-size photos in originals/.

    pip install pillow
    python tools/optimize_images.py

Outputs are rebuilt from pixels only, so EXIF metadata (GPS location, camera
model, timestamps) never reaches the public site. Any original that still
carries metadata is also rewritten in place without it, because this folder
lives in a public repository.
"""
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "originals"
OUT = ROOT / "public" / "img"

QUALITY = 74          # WebP quality: visually clean, roughly 5% of the JPEG size
SOCIAL_PREVIEW = "gel-x-long-set"   # photo used for link previews (og-image.jpg)


def plan(name: str):
    """Return (widths, aspect) for a photo. aspect is width/height, or None to keep it."""
    if name.startswith("nails"):          # hero carousel: portrait cards, cropped from the top
        return (400, 800), 3 / 4
    if name == "andie-portrait":          # about section
        return (480, 774), 3 / 4
    return (480, 960), None               # service cards


def load(path: Path) -> Image.Image:
    with Image.open(path) as im:
        im = ImageOps.exif_transpose(im)  # bake in phone rotation before dropping EXIF
        return im.convert("RGB")


def crop_to(im: Image.Image, aspect: float, anchor_y: float = 0.0) -> Image.Image:
    w, h = im.size
    if w / h > aspect:                    # too wide: trim the sides evenly
        new_w = round(h * aspect)
        left = (w - new_w) // 2
        return im.crop((left, 0, left + new_w, h))
    new_h = round(w / aspect)             # too tall: trim, keeping the anchored edge
    top = round((h - new_h) * anchor_y)
    return im.crop((0, top, w, top + new_h))


def scrub_original(path: Path) -> bool:
    """Rewrite an original without metadata if it has any worth removing."""
    with Image.open(path) as im:
        exif = im.getexif()
        private = len(exif.get_ifd(0x8825)) > 0 or any(t in exif for t in (0x010F, 0x0110, 0x0132))
    if not private:
        return False
    load(path).save(path, "JPEG", quality=92, optimize=True)
    return True


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for old in OUT.glob("*.webp"):
        old.unlink()

    for path in sorted(SRC.glob("*.jpg")):
        if scrub_original(path):
            print(f"  scrubbed metadata from originals/{path.name}")
        widths, aspect = plan(path.stem)
        im = load(path)
        if aspect:
            im = crop_to(im, aspect)
        for width in widths:
            width = min(width, im.width)  # never upscale
            height = round(im.height * width / im.width)
            out = OUT / f"{path.stem}-{width}.webp"
            im.resize((width, height), Image.LANCZOS).save(out, "WEBP", quality=QUALITY, method=6)
            print(f"{out.name:40s} {width}x{height}  {out.stat().st_size / 1024:6.1f} KB")

    # Link-preview image: social scrapers want a 1200x630 JPEG.
    og = crop_to(load(SRC / f"{SOCIAL_PREVIEW}.jpg"), 1200 / 630, anchor_y=0.5).resize((1200, 630), Image.LANCZOS)
    og.save(OUT / "og-image.jpg", "JPEG", quality=82, optimize=True, progressive=True)
    print(f"{'og-image.jpg':40s} 1200x630  {(OUT / 'og-image.jpg').stat().st_size / 1024:6.1f} KB")


if __name__ == "__main__":
    main()
