import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "편견 테스트 - 무의식적 편견을 발견하고 개선하세요",
  description: "당신의 무의식적 편견을 측정하고 개인맞춤 솔루션을 받아보세요. 더 포용적인 사고를 기르는 첫걸음입니다.",
  keywords: "편견 테스트, 무의식적 편견, 다양성, 포용성, 자기계발",
  verification: {
    google: "OLdpMroBqngbmU3ZM7XG6ZO9OIFECKuT-aiqtrp-JYY",
  },
  openGraph: {
    title: "편견 테스트 - Are You Biased?",
    description: "무의식적 편견을 발견하고 개선하는 테스트",
    url: "https://areyoubiased.life",
    siteName: "Are You Biased",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9411264810928915"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased bg-gray-50">
        {children}
      </body>
    </html>
  );
}
