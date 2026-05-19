#!/usr/bin/env bash
# Extract embedded raster images from a PDF into public/images/from-pdf/
# Requires Poppler: brew install poppler
set -euo pipefail
PDF="${1:?Usage: ./scripts/extract-pdf-images.sh <path-to.pdf>}"
OUT_DIR="${2:-public/images/from-pdf}"
mkdir -p "$OUT_DIR"
if ! command -v pdfimages &>/dev/null; then
  echo "Install Poppler first: brew install poppler"
  exit 1
fi
pdfimages -all "$PDF" "$OUT_DIR/slide"
echo "Done. Review images in $OUT_DIR — rename, crop for web, then move to public/images/stories/ (etc.)."
