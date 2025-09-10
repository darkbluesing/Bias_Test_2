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
  // html2canvas 호환성을 위한 webpack 설정
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      canvas: false,
    };
    return config;
  },
  // Turbopack 호환성을 위해 experimental.esmExternals 제거
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  // 네트리파이 빌드 환경에서 타입 체크 건너뛰기
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // 정적 파일 최적화
  generateEtags: false,
  poweredByHeader: false
};

export default nextConfig;
