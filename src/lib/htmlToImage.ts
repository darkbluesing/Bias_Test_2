'use client';

import * as htmlToImage from 'html-to-image';

type NormalizeFn = (font: string) => string;

const candidate = (htmlToImage as unknown as { normalizeFontFamily?: NormalizeFn }).normalizeFontFamily;

if (typeof candidate === 'function') {
  (htmlToImage as unknown as { normalizeFontFamily: NormalizeFn }).normalizeFontFamily = (font: string) => {
    if (!font) return '';
    return candidate(String(font));
  };
}

export const toPng = htmlToImage.toPng;
export const toJpeg = htmlToImage.toJpeg;
export const toSvg = htmlToImage.toSvg;
export const toPixelData = htmlToImage.toPixelData;
export const toCanvas = htmlToImage.toCanvas;
export const getFontWeight = (htmlToImage as any).getFontWeight;
export const getStyle = (htmlToImage as any).getStyle;
export const getMimeType = (htmlToImage as any).getMimeType;
