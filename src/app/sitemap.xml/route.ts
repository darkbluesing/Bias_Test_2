import { NextResponse } from 'next/server'

export async function GET() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.areyoubiased.life</loc>
    <lastmod>2025-01-11</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.areyoubiased.life/test</loc>
    <lastmod>2025-01-11</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.areyoubiased.life/result</loc>
    <lastmod>2025-01-11</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400', // 24시간 캐시
    },
  })
}

export const dynamic = 'force-static'
export const revalidate = 86400 // 24시간마다 재생성