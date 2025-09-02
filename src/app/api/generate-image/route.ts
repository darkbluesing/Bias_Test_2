import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  if (!searchParams.has('percentage')) {
    return new NextResponse('Missing percentage parameter', { status: 400 });
  }

  const baseUrl = process.env.NODE_ENV === 'production' 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:3002';
  const renderUrl = `${baseUrl}/render-result?${searchParams.toString()}`;

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 428, height: 1000, deviceScaleFactor: 2 });

    await page.goto(renderUrl, { waitUntil: 'networkidle0' });

    const element = await page.$('#result-container');
    if (!element) {
      throw new Error('Could not find result container element');
    }

    const clip = await element.boundingBox();
    if (!clip) {
        throw new Error('Could not get bounding box of the element');
    }

    const imageBuffer = await page.screenshot({
      type: 'png',
      clip: {
        x: clip.x,
        y: clip.y,
        width: clip.width,
        height: clip.height,
      },
    });

    // 타입을 확실하게 하기 위해 버퍼를 새로 생성합니다.
    const cleanImageBuffer = new Uint8Array(imageBuffer);
    const imageBlob = new Blob([cleanImageBuffer], { type: 'image/png' });

    return new NextResponse(imageBlob, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'attachment; filename="result.png"',
      },
    });

  } catch (error) {
    console.error('Error generating image:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new NextResponse(`Failed to generate image: ${errorMessage}`, { status: 500 });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}