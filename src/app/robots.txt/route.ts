import { NextResponse } from 'next/server'

export async function GET() {
  const robots = `User-agent: *
Allow: /

Sitemap: https://www.areyoubiased.life/sitemap.xml`

  return new NextResponse(robots, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400', // 24시간 캐시
    },
  })
}

export const dynamic = 'force-static'
export const revalidate = 86400 // 24시간마다 재생성