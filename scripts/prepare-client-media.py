"""Create browser copies of client uploads; leave the originals untouched.

Usage: python scripts/prepare-client-media.py --ffmpeg /path/to/ffmpeg
Requires Pillow. Re-running skips existing derivatives.
"""
import argparse
import io
import json
import subprocess
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

from PIL import Image, ImageOps, TiffImagePlugin

ROOT = Path(__file__).resolve().parents[1]
CLIENTS = [
    ("ganesh-constructions", "Ganesh Constructions", "ganesh constructions", [
        ("1.JPG", "Site photograph"),
        ("DJI_20260715121345_0002_D.MP4", "Aerial film"),
    ]),
    ("spark", "Spark Clinic", "spark", [
        ("Dental_2.png", "Dental care campaign"),
        ("Dental_3.png", "Smile care campaign"),
        ("Dental_Forkids.png", "Dental care for kids"),
    ]),
    ("sri-venkateswara-constructions", "Sri Venkateswara Constructions", "Sri venkateshwara", [
        ("DJI_20260804112655_0397_D.MP4", "Aerial film"),
    ]),
    ("ssm-construction", "SSM Construction", "SSm", [
        ("DJI_20260715141209_0088_D.JPG", "Site photograph"),
        ("DJI_20260715140614_0071_D.LRF", "Aerial film 01"),
        ("DJI_20260715141110_0083_D.MP4", "Aerial film 02"),
        ("DJI_20260715141132_0084_D.MP4", "Aerial film 03"),
    ]),
    ("tirumalasetty", "Tirumalasetty Projects LLP", "thirumala setty", [
        ("DJI_20260804110539_0376_D.JPG", "Site photograph 01"),
        ("DJI_20260804112133_0389_D.JPG", "Site photograph 02"),
        ("DJI_20260804112520_0394_D.DNG", "Site photograph 03"),
        ("DJI_20260804112309_0391_D.MP4", "Aerial film 01"),
        ("DJI_20260804125644_0368_D.MP4", "Aerial film 02"),
    ]),
]


def open_photo(path):
    if path.suffix.lower() != ".dng":
        return ImageOps.exif_transpose(Image.open(path))
    # DJI DNGs contain a camera-developed JPEG preview alongside the raw sensor data.
    # Choose the largest embedded JPEG, not the 160px EXIF thumbnail.
    image = Image.open(path)
    previews = []
    for offset in image.tag_v2.get(330, ()):
        with path.open("rb") as source:
            header = source.read(8)
            source.seek(offset)
            tags = TiffImagePlugin.ImageFileDirectory_v2(header)
            tags.load(source)
            if tags.get(259) == 7 and 273 in tags and 279 in tags:
                source.seek(tags[273][0])
                preview = Image.open(io.BytesIO(source.read(tags[279][0])))
                preview.load()
                previews.append(preview)
    if not previews:
        raise RuntimeError(f"No display-size preview in {path}")
    return max(previews, key=lambda p: p.width * p.height)


def run_ffmpeg(ffmpeg, args):
    result = subprocess.run([ffmpeg, "-hide_banner", "-loglevel", "error", "-y", *args],
                            capture_output=True, text=True)
    if result.returncode:
        raise RuntimeError(result.stderr)


def prepare(job):
    ffmpeg, slug, brand, folder, index, filename, title = job
    source = ROOT / folder / filename
    destination = ROOT / "public/assets/client-media" / slug
    destination.mkdir(parents=True, exist_ok=True)
    video = source.suffix.lower() in (".mp4", ".lrf")
    kind = "video" if video else "image"
    stem = f"{index:02d}-{kind}"
    output = destination / f"{stem}.{'mp4' if video else 'webp'}"
    poster = destination / f"{stem}-poster.webp" if video else output
    thumbnail = destination / f"{stem}-thumb.webp"
    if video:
        if not output.exists():
            run_ffmpeg(ffmpeg, ["-i", str(source), "-map", "0:v:0", "-map", "0:a?",
                       "-sn", "-dn", "-vf", "scale=w='min(1920,iw)':h=-2:flags=lanczos,fps=25,format=yuv420p",
                       "-c:v", "libx264", "-preset", "fast", "-crf", "24", "-threads", "2",
                       "-c:a", "aac", "-b:a", "128k", "-map_metadata", "-1", "-movflags", "+faststart", str(output)])
        if not poster.exists():
            run_ffmpeg(ffmpeg, ["-ss", "1", "-i", str(output), "-frames:v", "1",
                       "-vf", "scale=1280:-2", "-quality", "85", str(poster)])
        photo = Image.open(poster)
    else:
        photo = open_photo(source)
        photo.thumbnail((1920, 1920), Image.Resampling.LANCZOS)
        if photo.mode == "RGBA":
            background = Image.new("RGB", photo.size, "white")
            background.paste(photo, mask=photo.getchannel("A"))
            photo = background
        photo = photo.convert("RGB")
        if not output.exists():
            photo.save(output, "WEBP", quality=87, method=6)
    width, height = photo.size
    thumb = photo.copy()
    thumb.thumbnail((360, 240), Image.Resampling.LANCZOS)
    thumb.save(thumbnail, "WEBP", quality=80)
    url = lambda p: "/" + p.relative_to(ROOT / "public").as_posix()
    item = {"id": stem, "type": kind, "title": title, "alt": f"{brand} — {title.lower()}",
            "src": url(output), "thumbnail": url(thumbnail), "width": width, "height": height,
            "sourceFile": f"{folder}/{filename}"}
    if video:
        item["poster"] = url(poster)
    print(f"Prepared {slug}/{output.name}: {output.stat().st_size / 1048576:.2f} MB", flush=True)
    return slug, item


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--ffmpeg", required=True)
    args = parser.parse_args()
    jobs = [(args.ffmpeg, slug, brand, folder, index, filename, title)
            for slug, brand, folder, files in CLIENTS
            for index, (filename, title) in enumerate(files, 1)]
    galleries = {f"/clients/{slug}": {"brand": brand, "items": []} for slug, brand, _, _ in CLIENTS}
    with ThreadPoolExecutor(max_workers=2) as pool:
        for slug, item in pool.map(prepare, jobs):
            galleries[f"/clients/{slug}"]["items"].append(item)
    (ROOT / "src/data/client-media.json").write_text(json.dumps(galleries, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
