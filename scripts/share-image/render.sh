#!/usr/bin/env bash
# Renders default.html into the site's default link-preview image (1200×630 PNG).
#
#   scripts/share-image/render.sh [output-path]
#
# Needs Google Chrome (headless) and a network connection (the card loads the brand
# fonts from Google Fonts), plus `sharp` from node_modules to shrink the PNG.
# When the art changes, write to a NEW filename and update SHARE_IMAGE in
# src/lib/site.ts — social platforms cache preview images by URL.
set -euo pipefail
cd "$(dirname "$0")"

OUT="${1:-../../static/images/share/peter-crosby-for-congress-2026.png}"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

mkdir -p "$(dirname "$OUT")"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
	--window-size=1200,630 --virtual-time-budget=8000 \
	--screenshot="$TMP/raw.png" "file://$PWD/default.html" >/dev/null 2>&1

node -e "
const sharp = require('sharp');
sharp(process.argv[1])
	.resize(1200, 630)
	.png({ palette: true, quality: 95, compressionLevel: 9 })
	.toFile(process.argv[2])
	.then((i) => console.log('wrote', process.argv[2], i.width + 'x' + i.height, Math.round(i.size / 1024) + ' KB'));
" "$TMP/raw.png" "$OUT"
