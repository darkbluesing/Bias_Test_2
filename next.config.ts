import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  images: {
    unoptimized: true
  },
  // 네트리파이 빌드 환경에서 타입 체크 건너뛰기
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'production' && process.env.NETLIFY === 'true',
  },
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'production' && process.env.NETLIFY === 'true',
  }
};

export default nextConfig;
