'use client';

import { useEffect } from 'react';
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

  useEffect(() => {
    console.log('=== Result Page 접근 로그 ===');
    console.log('result:', result);
    console.log('userProfile:', userProfile);
    console.log('userProfile.name:', userProfile.name);
    
    // localStorage에서 백업 데이터 확인하는 함수
    const tryRecoverFromBackup = (): boolean => {
      if (typeof window !== 'undefined') {
        try {
          const backup = localStorage.getItem('bias-test-result-backup');
          if (backup) {
            const backupData = JSON.parse(backup);
            console.log('localStorage 백업 데이터 발견:', backupData);
            
            // 백업 데이터가 최근 것인지 확인 (30분 이내)
            const isRecent = Date.now() - backupData.timestamp < 30 * 60 * 1000;
            if (isRecent && backupData.result && backupData.userProfile) {
              console.log('백업 데이터로 복구 시도');
              
              // 백업 데이터로 상태 복구
              const { setResult: storeSetResult, setUserProfile } = useBiasTestStore.getState();
              storeSetResult(backupData.result);
              setUserProfile(backupData.userProfile);
              
              console.log('백업 데이터로 상태 복구 완료');
              return true;
            } else {
              console.log('백업 데이터가 너무 오래되었거나 유효하지 않음');
              localStorage.removeItem('bias-test-result-backup');
            }
          } else {
            console.log('localStorage에 백업 데이터가 없음');
          }
        } catch (error) {
          console.error('백업 데이터 처리 오류:', error);
          localStorage.removeItem('bias-test-result-backup');
        }
      }
      return false;
    };
    
    if (!result) {
      console.error('result가 없음 - 백업 복구 시도');
      
      // 1차 시도: 즉시 백업 복구
      const recovered = tryRecoverFromBackup();
      
      if (!recovered) {
        console.log('백업 복구 실패 - 잠깐 대기 후 재시도');
        // 2차 시도: 잠깐 대기 후 다시 확인
        setTimeout(() => {
          const currentResult = useBiasTestStore.getState().result;
          console.log('대기 후 result 상태:', currentResult);
          
          if (!currentResult) {
            // 3차 시도: 백업 복구 재시도
            const finalRecovery = tryRecoverFromBackup();
            
            if (!finalRecovery) {
              console.error('모든 복구 시도 실패 - 메인페이지로 이동');
              alert('테스트 결과를 불러올 수 없습니다.\\n페이지를 새로고침하거나 테스트를 다시 진행해주세요.');
              router.push('/');
            } else {
              console.log('최종 백업 복구 성공');
              // 페이지 새로고침으로 상태 동기화
              window.location.reload();
            }
          }
        }, 1000);
      } else {
        console.log('백업 복구 성공 - 페이지 새로고침');
        // 복구 성공 시 페이지 새로고침
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
      return;
    }
    
    console.log('Result 페이지 정상 로드 완료');
  }, [result, userProfile.name, router]);

  if (!result) {
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

  const biasCategory = getBiasCategory(result.percentage);

  const handleRetakeTest = () => {
    resetTest();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
                {userProfile.name}님의 결과
              </p>
            </div>
          </div>
          <LanguageSelector className="w-32" />
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="px-4 py-8">
        <div className="max-w-mobile mx-auto">
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
              <p>테스트 완료: {result.completedAt.toLocaleDateString()}</p>
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