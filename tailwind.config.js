/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pretendard': ['Pretendard', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
      },
      maxWidth: {
        'mobile': '414px',
      },
      width: {
        'mobile-full': '100%',
        'mobile-max': '414px',
      },
    },
  },
  plugins: [],
  // HTML2Canvas 호환성을 위한 RGB 색상 강제 설정
  corePlugins: {
    // OKLCH 색상 사용을 방지하기 위한 설정
  },
  future: {
    // 최신 색상 기능 비활성화
    hoverOnlyWhenSupported: false,
  }
};