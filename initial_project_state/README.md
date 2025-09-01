# 편견 테스트 (Are You Biased?) 웹앱

무의식적 편견을 측정하고 개인맞춤 솔루션을 제공하는 다국어 지원 웹 애플리케이션입니다.

## 🌟 주요 기능

- **40가지 질문**: 다양한 상황의 질문으로 편향성을 정확히 측정
- **5개 언어 지원**: 한국어, 영어, 스페인어, 중국어, 일본어
- **IP 기반 언어 자동 감지**: 사용자의 위치에 따른 자동 언어 설정
- **개인맞춤 결과**: 백분율별 맞춤 솔루션 제공
- **시각적 결과 표시**: 차트와 그래프로 직관적인 결과 확인
- **결과 공유 기능**: 이미지 다운로드 및 SNS 공유
- **완전 반응형**: 웹과 모바일 모든 기기에서 완벽 동작
- **애드센스 통합**: 광고 수익화 구조

## 🛠 기술 스택

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Headless UI
- **상태 관리**: Zustand
- **차트**: Recharts
- **다국어**: React-i18next
- **이미지 생성**: html2canvas
- **폰트**: Pretendard

## 📱 페이지 구성

1. **홈페이지** (`/`): 테스트 소개 및 이름 입력
2. **테스트 페이지** (`/test`): 40개 질문 진행
3. **결과 페이지** (`/result`): 백분율 결과 및 솔루션 제공

## 🚀 로컬 개발

### 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

### 빌드
```bash
npm run build
```

### 프로덕션 서버
```bash
npm run start
```

## 🌐 배포

### GitHub 업로드

1. 로컬 Git 저장소 초기화:
```bash
cd bias-test-app
git init
git add .
git commit -m "Initial commit: 편견 테스트 웹앱 완성"
```

2. GitHub에서 새 저장소 생성 후:
```bash
git remote add origin https://github.com/YOUR_USERNAME/bias-test-app.git
git branch -M main
git push -u origin main
```

### Netlify 배포

1. [Netlify](https://app.netlify.com) 접속 후 로그인
2. "New site from Git" 클릭
3. GitHub 저장소 선택
4. 빌드 설정:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: `18.17.0` 이상

5. 환경 변수 설정 (Site settings → Environment variables):
   - `NODE_ENV`: `production`

6. 도메인 설정:
   - Site settings → Domain management
   - Custom domain 추가: `areyoubiased.life`

## 📊 편향성 측정 알고리즘

- **총 40문제**, 각 문제당 0-3점
- **최대 점수**: 120점
- **백분율 계산**: (총점 / 120) × 100
- **5단계 분류**: 매우 낮음(0-20%) → 매우 높음(81-100%)

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: Blue (#2563eb)
- **Success**: Green (#10b981)
- **Warning**: Amber (#f59e0b)
- **Error**: Red (#ef4444)

### 폰트
- **주요**: Pretendard (한국어 최적화)
- **Fallback**: Apple 시스템 폰트

## 🌍 다국어 지원

### 지원 언어
- 🇰🇷 한국어 (ko) - 기본
- 🇺🇸 영어 (en)
- 🇪🇸 스페인어 (es)
- 🇨🇳 중국어 (zh)
- 🇯🇵 일본어 (ja)

### 언어 감지
1. IP 기반 지역 감지
2. 브라우저 언어 설정 확인
3. 사용자 수동 선택 가능

## 📱 반응형 디자인

- **모바일**: 320px-768px
- **태블릿**: 768px-1024px
- **데스크톱**: 1024px+
- **최대 너비**: 600px (모바일 비율 유지)

## 🎯 애드센스 광고 위치

1. **홈페이지**: 상단/하단 배너
2. **테스트 진행**: 중간 네이티브 광고
3. **결과 페이지**: 사이드바, 하단 배너

## 🔒 접근성

- **WCAG 2.1 AA 준수**
- **키보드 내비게이션 지원**
- **스크린 리더 호환**
- **고대비 색상 지원**
- **터치 최적화**

## 📈 SEO 최적화

- **다국어 메타데이터**
- **Open Graph 태그**
- **구조화된 데이터**
- **사이트맵 자동 생성**

## 📞 문의

- 웹사이트: https://areyoubiased.life
- 이메일: contact@areyoubiased.life

---

**© 2024 Are You Biased. All rights reserved.**