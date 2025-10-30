'use client';

import * as htmlToImage from 'html-to-image';

// html-to-image does not export types for internal helpers, but some versions
// expose `normalizeFontFamily` on the namespace. When it exists we guard the
// input to prevent runtime errors (e.g. font being undefined).
type HtmlToImageWithInternals = typeof htmlToImage & {
  normalizeFontFamily?: (font: string) => string;
};

const moduleWithInternals = htmlToImage as HtmlToImageWithInternals;

if (typeof moduleWithInternals.normalizeFontFamily === 'function') {
  const original = moduleWithInternals.normalizeFontFamily;
  moduleWithInternals.normalizeFontFamily = (font: string) => {
    if (!font) {
      return '';
    }
    return original(String(font));
  };
}

export const toPng = htmlToImage.toPng;
export const toJpeg = htmlToImage.toJpeg;
export const toSvg = htmlToImage.toSvg;
export const toCanvas = htmlToImage.toCanvas;
export const toBlob = htmlToImage.toBlob;
export const toPixelData = htmlToImage.toPixelData;
