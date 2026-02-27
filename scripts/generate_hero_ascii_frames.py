#!/usr/bin/env python3
import base64
import json
from pathlib import Path

import cv2
import numpy as np


ROOT = Path(__file__).resolve().parents[1]
VIDEO_PATH = ROOT / "public" / "videos" / "video.mp4"
OUTPUT_PATH = ROOT / "public" / "ascii" / "hero-swing-ascii-v2.json"

ASCII_RAMP = " .'`^\",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$"
FRAME_COUNT = 48

PLAYBACK_START_SEC = 0.43
PLAYBACK_END_SEC = 2.35

SOURCE_ZOOM = 1.16
SOURCE_OFFSET_X_MOBILE = -0.52
SOURCE_OFFSET_Y = 0.12
SOURCE_OFFSET_Y_MOBILE_DELTA = 0.08
SUBJECT_FOCUS_X = 0.53
SUBJECT_FOCUS_Y = 0.58

SUBJECT_MASK_CENTER_X = 0.52
SUBJECT_MASK_CENTER_Y = 0.58
SUBJECT_MASK_RADIUS_X = 0.38
SUBJECT_MASK_RADIUS_Y = 0.62
SUBJECT_GRAY_LIFT = 52

PROFILES = {
    "desktop": {
        "cols": 240,
        "rows": 135,
        "offset_x": 0.0,
        "offset_y": SOURCE_OFFSET_Y,
    },
    "mobile": {
        "cols": 96,
        "rows": 192,
        "offset_x": SOURCE_OFFSET_X_MOBILE,
        "offset_y": SOURCE_OFFSET_Y + SOURCE_OFFSET_Y_MOBILE_DELTA,
    },
}


def clamp(value: float, min_value: float, max_value: float) -> float:
    return min(max_value, max(min_value, value))


def draw_cover(frame_rgb: np.ndarray, cols: int, rows: int, source_offset_x: float, source_offset_y: float) -> np.ndarray:
    source_height, source_width = frame_rgb.shape[:2]
    cover_scale = max(cols / source_width, rows / source_height)
    scale = cover_scale * SOURCE_ZOOM

    draw_width = source_width * scale
    draw_height = source_height * scale

    desired_x = cols * 0.5 - draw_width * SUBJECT_FOCUS_X + cols * source_offset_x
    desired_y = rows * 0.5 - draw_height * SUBJECT_FOCUS_Y + rows * source_offset_y

    min_x = min(0.0, cols - draw_width)
    max_x = max(0.0, cols - draw_width)
    min_y = min(0.0, rows - draw_height)
    max_y = max(0.0, rows - draw_height)

    draw_x = clamp(desired_x, min_x, max_x)
    draw_y = clamp(desired_y, min_y, max_y)

    matrix = np.array([[scale, 0.0, draw_x], [0.0, scale, draw_y]], dtype=np.float32)
    return cv2.warpAffine(
        frame_rgb,
        matrix,
        (cols, rows),
        flags=cv2.INTER_LINEAR,
        borderMode=cv2.BORDER_CONSTANT,
        borderValue=(0, 0, 0),
    )


def compute_ascii_channels(image_rgb: np.ndarray) -> np.ndarray:
    rows, cols = image_rgb.shape[:2]
    luminance = (
        image_rgb[:, :, 0].astype(np.float32) * 0.2126
        + image_rgb[:, :, 1].astype(np.float32) * 0.7152
        + image_rgb[:, :, 2].astype(np.float32) * 0.0722
    )

    left = np.concatenate([luminance[:, :1], luminance[:, :-1]], axis=1)
    right = np.concatenate([luminance[:, 1:], luminance[:, -1:]], axis=1)
    up = np.concatenate([luminance[:1, :], luminance[:-1, :]], axis=0)
    down = np.concatenate([luminance[1:, :], luminance[-1:, :]], axis=0)

    gradient = np.abs(right - left) + np.abs(down - up)
    edge_boost = np.clip((gradient - 8.0) / 70.0, 0.0, 1.0)
    tone = np.clip(1.0 - luminance / 255.0 + edge_boost * 0.28, 0.0, 1.0)

    nx = np.arange(cols, dtype=np.float32)[None, :] / max(cols, 1)
    ny = np.arange(rows, dtype=np.float32)[:, None] / max(rows, 1)
    dx = (nx - SUBJECT_MASK_CENTER_X) / SUBJECT_MASK_RADIUS_X
    dy = (ny - SUBJECT_MASK_CENTER_Y) / SUBJECT_MASK_RADIUS_Y

    region = np.clip(1.0 - np.sqrt(dx * dx + dy * dy), 0.0, 1.0)
    detail = np.clip(edge_boost * 0.9 + (1.0 - luminance / 255.0) * 0.35, 0.0, 1.0)
    subject_mask = np.clip(region * 0.9 + detail * 0.35, 0.0, 1.0)

    char_index = np.floor(tone * (len(ASCII_RAMP) - 1)).astype(np.uint8)
    boosted_gray = np.clip(luminance + SUBJECT_GRAY_LIFT * subject_mask, 0.0, 255.0).astype(np.uint8)
    alpha = np.clip(0.16 + tone * 0.84 + edge_boost * 0.12, 0.08, 1.0)
    alpha_u8 = np.round(alpha * 255.0).astype(np.uint8)
    subject_mask_u8 = np.round(subject_mask * 255.0).astype(np.uint8)

    packed = np.stack([char_index, boosted_gray, alpha_u8, subject_mask_u8], axis=-1)
    return packed.reshape(-1)


def encode_frame(frame_data: np.ndarray) -> str:
    return base64.b64encode(frame_data.tobytes()).decode("ascii")


def read_frame(cap: cv2.VideoCapture, time_sec: float) -> np.ndarray:
    cap.set(cv2.CAP_PROP_POS_MSEC, time_sec * 1000.0)
    success, frame_bgr = cap.read()
    if not success:
        raise RuntimeError(f"Failed to read frame at {time_sec:.3f}s")
    return cv2.cvtColor(frame_bgr, cv2.COLOR_BGR2RGB)


def main() -> None:
    if not VIDEO_PATH.exists():
        raise FileNotFoundError(f"Missing video: {VIDEO_PATH}")

    cap = cv2.VideoCapture(str(VIDEO_PATH))
    if not cap.isOpened():
        raise RuntimeError(f"Could not open video: {VIDEO_PATH}")

    clip_duration = PLAYBACK_END_SEC - PLAYBACK_START_SEC
    if FRAME_COUNT <= 1:
        sample_times = [PLAYBACK_START_SEC]
    else:
        sample_times = [
            PLAYBACK_START_SEC + clip_duration * (i / (FRAME_COUNT - 1))
            for i in range(FRAME_COUNT)
        ]

    payload = {
        "version": 1,
        "encoding": "base64-u8-char-gray-alpha-mask",
        "frameCount": FRAME_COUNT,
        "clipDurationSec": round(clip_duration, 4),
        "profiles": {},
    }

    for profile_name, profile in PROFILES.items():
        cols = profile["cols"]
        rows = profile["rows"]
        offset_x = profile["offset_x"]
        offset_y = profile["offset_y"]

        encoded_frames: list[str] = []
        for t in sample_times:
            frame_rgb = read_frame(cap, t)
            covered = draw_cover(frame_rgb, cols, rows, offset_x, offset_y)
            ascii_bytes = compute_ascii_channels(covered)
            encoded_frames.append(encode_frame(ascii_bytes))

        payload["profiles"][profile_name] = {
            "cols": cols,
            "rows": rows,
            "frames": encoded_frames,
        }

    cap.release()
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(payload, separators=(",", ":")), encoding="utf-8")
    print(f"Wrote {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
