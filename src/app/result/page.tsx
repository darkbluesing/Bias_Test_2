'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBiasTestStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';
import { getBiasCategory } from '@/data/solutions';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { Button } from '@/components/ui/Button';
import { ResultChart } from '@/components/ui/ResultChart';
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
        <div className="max-w-mobile mx-auto" style={{ minHeight: '60vh' }}>
          {/* 광고 공간 - 상단 */}
          <div className="mb-8" data-hide-in-export="true">
            <div className="bg-gray-100 rounded-lg h-20 flex items-center justify-center text-gray-500 text-sm">
              광고 공간 (728x90 / 320x50)
            </div>
          </div>

          {/* 결과 메인 섹션 */}
          <div id="result-content" className="space-y-8">
            {/* 백분율 표시 - 상단 강조 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t.result.yourScore}
              </h2>
              
              <div className="mb-6">
                <div 
                  className="text-7xl md:text-8xl font-black mb-4"
                  style={{ 
                    background: `linear-gradient(135deg, ${getColorForCategory(result.category)}, ${getColorForCategory(result.category)}88)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {result.percentage}%
                </div>
                <p className="text-xl text-gray-600 font-medium">
                  {biasCategory.title[language]}
                </p>
              </div>
            </div>

            {/* 차트 시각화 */}
            <ResultChart 
              percentage={result.percentage} 
              category={result.category} 
            />

            {/* 분석 결과 */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t.result.analysis}
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {biasCategory.description[language]}
              </p>
              
              {/* 점수 세부 정보 */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{result.totalScore}</div>
                    <div className="text-sm text-gray-600">총 점수</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">40</div>
                    <div className="text-sm text-gray-600">총 질문</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 맞춤 솔루션 */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {t.result.solutions}
              </h3>
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {biasCategory.solutions[language]}
                </div>
              </div>
            </div>

            {/* 액션 버튼들 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <ShareButton 
                resultElementId="result-content"
                percentage={result.percentage}
              />
              
              <Button
                onClick={handleRetakeTest}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                {t.result.retakeButton}
              </Button>
            </div>

            {/* 완료 시간 */}
            <div className="text-center text-sm text-gray-500">
              <p>테스트 완료: {new Date(result.completedAt).toLocaleDateString()}</p>
            </div>
          </div>


          {/* 광고 공간 - 하단 */}
          <div className="mt-12" data-hide-in-export="true">
            <div className="bg-gray-100 rounded-lg h-20 flex items-center justify-center text-gray-500 text-sm">
              하단 광고 공간 (728x90 / 320x50)
            </div>
          </div>

          {/* 추가 정보 섹션 */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                {language === 'ko' ? '테스트에 대해' : language === 'en' ? 'About the Test' : language === 'es' ? 'Acerca del Test' : language === 'zh' ? '关于测试' : 'テストについて'}
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                {language === 'ko' 
                  ? '이 테스트는 학술적 연구를 바탕으로 설계되었으며, 일상생활에서 무의식적으로 가질 수 있는 편견을 측정합니다. 결과는 개인의 성장과 학습을 위한 목적으로만 사용되어야 합니다.'
                  : language === 'en'
                  ? 'This test is designed based on academic research and measures unconscious biases that may occur in daily life. Results should only be used for personal growth and learning purposes.'
                  : language === 'es'
                  ? 'Esta prueba está diseñada basándose en investigación académica y mide sesgos inconscientes que pueden ocurrir en la vida diaria. Los resultados deben usarse solo para propósitos de crecimiento personal y aprendizaje.'
                  : language === 'zh'
                  ? '此测试基于学术研究设计，测量日常生活中可能出现的无意识偏见。结果仅应用于个人成长和学习目的。'
                  : 'このテストは学術研究に基づいて設計されており、日常生活で無意識に持つ可能性のある偏見を測定します。結果は個人の成長と学習の目的でのみ使用されるべきです。'
                }
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                {language === 'ko' ? '다음 단계' : language === 'en' ? 'Next Steps' : language === 'es' ? 'Próximos Pasos' : language === 'zh' ? '下一步' : '次のステップ'}
              </h4>
              <ul className="text-gray-700 text-sm space-y-2">
                <li>• {language === 'ko' ? '결과를 친구나 가족과 공유해보세요' : language === 'en' ? 'Share your results with friends and family' : language === 'es' ? 'Comparte tus resultados con amigos y familia' : language === 'zh' ? '与朋友和家人分享您的结果' : '結果を友人や家族と共有してください'}</li>
                <li>• {language === 'ko' ? '제안된 솔루션을 실천해보세요' : language === 'en' ? 'Try implementing the suggested solutions' : language === 'es' ? 'Intenta implementar las soluciones sugeridas' : language === 'zh' ? '尝试实施建议的解决方案' : '提案されたソリューションを実践してみてください'}</li>
                <li>• {language === 'ko' ? '6개월 후 다시 테스트해보세요' : language === 'en' ? 'Retake the test after 6 months' : language === 'es' ? 'Vuelve a tomar la prueba después de 6 meses' : language === 'zh' ? '6个月后再次测试' : '6か月後に再度テストしてください'}</li>
              </ul>
            </div>
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

function getColorForCategory(category: string): string {
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
}