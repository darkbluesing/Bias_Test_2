'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBiasTestStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';
import { getBiasCategory } from '@/data/solutions';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { ShareButton } from '@/components/ui/ShareButton';

export default function ResultPage() {
  const router = useRouter();
  const { result, userProfile, language, resetTest } = useBiasTestStore();
  const t = getTranslation(language);
  
  const [isLoading, setIsLoading] = useState(true);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (hasInitialized) return; // 한 번만 실행
    
    console.log('🏁 === Result Page 초기화 시작 ===');
    console.log('📊 result:', !!result);
    console.log('👤 userProfile.name:', userProfile.name);
    
    const initializePage = async () => {
      try {
        // 디버깅을 위한 상세 로깅
        console.log('🔍 Result page initialization debug:', {
          result: result ? { 
            percentage: result.percentage, 
            totalScore: result.totalScore, 
            category: result.category,
            completedAt: result.completedAt,
            completedAtType: typeof result.completedAt
          } : null,
          userProfileName: userProfile.name,
          windowType: typeof window,
          sessionStorageCompleted: typeof window !== 'undefined' ? sessionStorage.getItem('test-completed') : 'unavailable'
        });
        
        // 1. 결과 데이터가 있으면 즉시 표시
        if (result && result.percentage !== undefined) {
          console.log('✅ 결과 데이터 존재 - 즉시 표시');
          setIsLoading(false);
          setHasInitialized(true);
          return;
        }
        
        // 2. 결과 데이터가 없으면 백업 복구 시도
        console.log('⚠️ 결과 데이터 없음 - 백업 복구 시도');
        
        if (typeof window !== 'undefined') {
          const backup = localStorage.getItem('bias-test-result-backup');
          if (backup) {
            try {
              const backupData = JSON.parse(backup);
              
              // 백업 데이터 유효성 확인
              if (backupData.result && backupData.result.percentage !== undefined) {
                console.log('💾 백업 데이터로 복구');
                
                const { setResult: storeSetResult, setUserProfile } = useBiasTestStore.getState();
                storeSetResult(backupData.result);
                if (backupData.userProfile) {
                  setUserProfile(backupData.userProfile);
                }
                
                setIsLoading(false);
                setHasInitialized(true);
                return;
              }
            } catch (error) {
              console.error('백업 데이터 파싱 오류:', error);
              localStorage.removeItem('bias-test-result-backup');
            }
          }
        }
        
        // 3. 복구 실패 시 홈으로 리다이렉트
        console.log('❌ 복구 실패 - 홈으로 이동');
        setTimeout(() => {
          alert('테스트 결과를 찾을 수 없습니다.\n다시 테스트를 진행해주세요.');
          router.push('/');
        }, 1000);
        
      } catch (error) {
        console.error('페이지 초기화 오류:', error);
        alert('오류가 발생했습니다. 다시 테스트를 진행해주세요.');
        router.push('/');
      }
      
      setHasInitialized(true);
    };
    
    initializePage();
  }, [result, userProfile, router, hasInitialized]);

  // 로딩 상태 표시
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">결과를 불러오는 중...</p>
          <p className="text-sm text-gray-500 mt-2">잠시만 기다려주세요</p>
        </div>
      </div>
    );
  }

  // 결과 데이터가 없으면 에러 페이지
  if (!result || result.percentage === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">결과를 찾을 수 없습니다</h1>
          <p className="text-gray-600 mb-6">테스트를 다시 진행해주세요.</p>
          <button 
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            홈으로 가기
          </button>
        </div>
      </div>
    );
  }

  // getBiasCategory는 항상 fallback을 반환하므로 단순하게 처리
  console.log('getBiasCategory 호출:', result.percentage);
  const biasCategory = getBiasCategory(result.percentage);
  console.log('biasCategory 결과:', biasCategory);

  const handleRetakeTest = () => {
    resetTest();
    router.push('/');
  };

  const getColorForCategory = (category: string): string => {
    switch (category) {
      case 'very_low':
        return '#10b981'; // green-500
      case 'low':
        return '#22c55e'; // green-400
      case 'moderate':
        return '#f59e0b'; // amber-500
      case 'high':
        return '#f97316'; // orange-500
      case 'very_high':
        return '#ef4444'; // red-500
      default:
        return '#6b7280'; // gray-500
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ minHeight: '100vh' }}>
      {/* 헤더 */}
      <header className="bg-white shadow-sm px-4 py-4">
        <div className="max-w-mobile mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                {t.result.title}
              </h1>
              <p className="text-sm text-gray-600">
                {userProfile.name || '사용자'}님의 결과
              </p>
            </div>
          </div>
          <LanguageSelector className="w-32" />
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="px-4 py-8">
        <div className="max-w-mobile mx-auto">
          {/* 광고 공간 - 상단 (컨테이너 외부) */}
          <div className="mb-6" data-hide-in-export="true">
            <div className="bg-gray-100 rounded-lg h-20 flex items-center justify-center text-gray-500 text-sm">
              광고 공간 (728x90 / 320x50)
            </div>
          </div>

          {/* 결과 메인 컨테이너 - 모든 요소를 하나의 흰색 컨테이너에 통합 */}
          <div id="result-content" className="bg-white rounded-xl shadow-lg p-8" style={{ minHeight: '600px', maxWidth: '100%' }}>
            {/* 사용자 이름과 편향성 지수 제목 */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                {userProfile.name ? `${userProfile.name}님의 무의식적 편견 지수` : '당신의 무의식적 편견 지수'}
              </h2>
            </div>
            
            {/* 도넛 차트 영역 */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="relative w-64 h-64">
                  <svg className="transform -rotate-90 w-64 h-64" viewBox="0 0 256 256">
                    {/* 배경 원 */}
                    <circle
                      cx="128"
                      cy="128"
                      r="100"
                      stroke="#e5e7eb"
                      strokeWidth="21"
                      fill="transparent"
                      className="opacity-30"
                    />
                    {/* 진행률 원 */}
                    <circle
                      cx="128"
                      cy="128"
                      r="100"
                      stroke={getColorForCategory(result.category)}
                      strokeWidth="21"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 100}`}
                      strokeDashoffset={`${2 * Math.PI * 100 * (1 - result.percentage / 100)}`}
                      className="transition-all duration-2000 ease-out"
                      strokeLinecap="round"
                      style={{
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                      }}
                    />
                  </svg>
                  {/* 중앙 텍스트 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div 
                        className="text-5xl font-black mb-2"
                        style={{ 
                          color: getColorForCategory(result.category),
                          textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                      >
                        {result.percentage}%
                      </div>
                      <div className="text-base text-gray-600 font-medium">무의식적 편견</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 편향성 범위 바 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                매우 높은 편향성 (81-100%)
              </h3>
              
              <div className="flex justify-between text-xs text-gray-600 mb-2">
                <span>매우 낮음</span>
                <span>낮음</span>
                <span>보통</span>
                <span>높음</span>
                <span>매우 높음</span>
              </div>
              
              <div className="relative h-6 rounded-full overflow-hidden" style={{
                background: 'linear-gradient(to right, #10b981 0%, #22c55e 20%, #f59e0b 40%, #f97316 60%, #ef4444 80%, #dc2626 100%)'
              }}>
                <div
                  className="absolute top-0 h-full w-1 bg-gray-800 shadow-lg"
                  style={{ left: `${result.percentage}%`, transform: 'translateX(-50%)' }}
                />
              </div>
              
              {/* 범례 */}
              <div className="flex justify-center space-x-6 text-sm mt-4">
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-2" 
                    style={{ backgroundColor: getColorForCategory(result.category) }}
                  />
                  <span className="text-gray-700">편향성</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-gray-300 mr-2" />
                  <span className="text-gray-700">객관성</span>
                </div>
              </div>
            </div>

            {/* 분석 결과 */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                분석 결과
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                심각한 편향성이 감지되었습니다. 즉시 전문적인 도움과 체계적인 개선이 필요합니다.
              </p>
            </div>

            {/* 맞춤 솔루션 */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                맞춤 솔루션
              </h3>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <div className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>즉시 전문적인 다양성 및 포용성 교육을 받으세요</span>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>심층적인 편견 극복 프로그램에 참여하세요</span>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>자신의 편견이 사회에 미치는 부정적 영향을 인지하게 검토하세요</span>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>다문화 환경에서 자원봉사 활동을 시작하세요</span>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>편견에 대한 책임감을 가지고 적극적으로 변화하려 노력하세요</span>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>정기적인 전문 상담을 받으세요</span>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>포용적인 가치를 실천하는 롤모델을 찾아 배우세요</span>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>일상에서 편견적 행동을 자각하고 즉시 수정하세요</span>
                </div>
              </div>
            </div>
          </div>

          {/* 광고 공간 - 하단 (컨테이너 외부) */}
          <div className="mt-6" data-hide-in-export="true">
            <div className="bg-gray-100 rounded-lg h-20 flex items-center justify-center text-gray-500 text-sm">
              광고 공간 (728x90 / 320x50)
            </div>
          </div>

          {/* 액션 버튼들 - 광고 아래 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
            <ShareButton 
              resultElementId="result-content"
              percentage={result.percentage}
              className="px-8 py-3 text-lg shadow-lg"
            />
            
            <button
              onClick={handleRetakeTest}
              className="inline-flex items-center justify-center px-8 py-3 bg-gray-500 text-white rounded-lg font-medium text-lg hover:bg-gray-600 transition-colors"
            >
              다시 테스트하기
            </button>
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-mobile mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 Are You Biased. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            https://areyoubiased.life
          </p>
        </div>
      </footer>
    </div>
  );
}