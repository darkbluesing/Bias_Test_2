import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  images: {
    unoptimized: true
  },
  // 정적 사이트 최적화
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  basePath: '',
  // 안전한 빌드 최적화 설정 (실험적 기능 제거)
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  // 네트리파이 빌드 환경에서 타입 체크 건너뛰기
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'production' && process.env.NETLIFY === 'true',
  },
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'production' && process.env.NETLIFY === 'true',
  },
  // 정적 파일 최적화
  generateEtags: false,
  poweredByHeader: false
};

export default nextConfig;
