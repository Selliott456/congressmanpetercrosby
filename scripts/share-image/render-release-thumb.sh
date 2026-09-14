#!/usr/bin/env bash
# Renders a press release's card thumbnail (1200×675 JPEG) from release-thumb.html.
#
#   scripts/share-image/render-release-thumb.sh <slug> "<DATE>" "<title>"
#   e.g. render-release-thumb.sh september-internal-polling "September 14, 2026" "Northern Utah on track…"
#
# Writes static/press-releases/<slug>-thumb.jpg — set it as the release's `image` in
# src/lib/data/pressReleases.ts. Needs Google Chrome, a network connection (Google
# Fonts), and `sharp` from node_modules.
set -euo pipefail
cd "$(dirname "$0")"

SLUG="$1"
DATE="$2"
TITLE="$3"
OUT="../../static/press-releases/${SLUG}-thumb.jpg"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

QUERY="$(node -e 'const [d, t] = process.argv.slice(1); console.log(`date=${encodeURIComponent(d)}&title=${encodeURIComponent(t)}`)' "$DATE" "$TITLE")"

"$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
	--window-size=1200,675 --virtual-time-budget=8000 \
	--screenshot="$TMP/raw.png" "file://$PWD/release-thumb.html?$QUERY" >/dev/null 2>&1

node -e "
const sharp = require('sharp');
sharp(process.argv[1])
	.resize(1200, 675)
	.jpeg({ quality: 84, mozjpeg: true })
	.toFile(process.argv[2])
	.then((i) => console.log('wrote', process.argv[2], i.width + 'x' + i.height, Math.round(i.size / 1024) + ' KB'));
" "$TMP/raw.png" "$OUT"
