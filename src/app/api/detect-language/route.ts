import { NextRequest, NextResponse } from 'next/server';
import { SupportedLanguage } from '@/types';

// 국가별 언어 매핑
const countryLanguageMap: Record<string, SupportedLanguage> = {
  'KR': 'ko', // 한국
  'US': 'en', // 미국
  'GB': 'en', // 영국
  'CA': 'en', // 캐나다
  'AU': 'en', // 호주
  'ES': 'es', // 스페인
  'MX': 'es', // 멕시코
  'AR': 'es', // 아르헨티나
  'CO': 'es', // 콜롬비아
  'CN': 'zh', // 중국
  'TW': 'zh', // 대만
  'HK': 'zh', // 홍콩
  'SG': 'zh', // 싱가포르
  'JP': 'ja', // 일본
};

export async function GET(request: NextRequest) {
  try {
    // 클라이언트 IP 주소 획득
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ip = forwardedFor?.split(',')[0] || realIp || '127.0.0.1';

    // Accept-Language 헤더에서 선호 언어 확인
    const acceptLanguage = request.headers.get('accept-language') || '';
    const preferredLang = acceptLanguage.split(',')[0].split('-')[0].toLowerCase();

    // 지원하는 언어인지 확인
    const supportedLanguages: SupportedLanguage[] = ['ko', 'en', 'es', 'zh', 'ja'];
    if (supportedLanguages.includes(preferredLang as SupportedLanguage)) {
      return NextResponse.json({ language: preferredLang });
    }

    // 개발 환경이거나 로컬 IP인 경우 기본값 반환
    if (process.env.NODE_ENV === 'development' || ip === '127.0.0.1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
      return NextResponse.json({ language: 'ko' }); // 개발 환경 기본값
    }

    // 실제 프로덕션 환경에서는 IP 기반 지역 감지 서비스 사용
    // 여기서는 간단한 예제로 Accept-Language 기반으로 처리
    const fallbackLanguage = 'en'; // 기본 폴백 언어
    
    return NextResponse.json({ 
      language: fallbackLanguage,
      detected_ip: ip,
      accept_language: acceptLanguage 
    });

  } catch (error) {
    console.error('Language detection error:', error);
    return NextResponse.json({ language: 'en' }, { status: 200 });
  }
}