'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBiasTestStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';
import { getBiasCategory } from '@/data/solutions';
import { ShareButton } from '@/components/ui/ShareButton';
import { ResultChart } from '@/components/ui/ResultChart';

export default function ResultPage() {
  const router = useRouter();
  const { result, userProfile, language, resetTest } = useBiasTestStore();
  const t = getTranslation(language);
  
  const [isLoading, setIsLoading] = useState(true);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (hasInitialized) return;
    
    const initializePage = async () => {
      try {
        if (result && result.percentage !== undefined) {
          setIsLoading(false);
          setHasInitialized(true);
          return;
        }
        
        if (typeof window !== 'undefined') {
          const backup = localStorage.getItem('bias-test-result-backup');
          if (backup) {
            try {
              const backupData = JSON.parse(backup);
              if (backupData.result && backupData.result.percentage !== undefined) {
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

  if (isLoading || !result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">결과를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  const biasCategory = getBiasCategory(result.percentage);
  const solutionItems = (biasCategory.solutions[language] || '').split('\n');

  const handleRetakeTest = () => {
    resetTest();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="py-4">
        <div className="max-w-mobile mx-auto px-4">
          <button 
            onClick={() => router.push('/')}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-lg font-bold text-gray-900">www.areyoubiased.life</span>
          </button>
        </div>
      </header>

      <main className="px-4 py-1">
        <div className="max-w-mobile mx-auto">
          <div className="mb-3" data-hide-in-export="true">
            <div className="bg-gray-100 rounded-lg h-16 flex items-center justify-center text-gray-500 text-sm">광고 공간</div>
          </div>

          <div id="result-container" className="bg-white rounded-xl shadow-lg overflow-visible">
            <ResultChart
              percentage={result.percentage}
              category={result.category}
              userName={userProfile.name}
              size="md"
              className="p-4 pb-2"
              showGradientBar={true}
              translations={{
                biasRange: t.result.biasRange,
                veryLow: t.result.veryLow,
                low: t.result.low,
                moderate: t.result.moderate,
                high: t.result.high,
                veryHigh: t.result.veryHigh,
                biasLabel: t.result.biasLabel,
                objectivityLabel: t.result.objectivityLabel,
                yourScore: t.result.yourScore,
                yourScoreWithName: t.result.yourScoreWithName
              }}
            />
            
            <div className="px-4 pb-4">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{biasCategory.title[language]}</h3>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{t.result.analysis}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{biasCategory.description[language]}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{t.result.solutions}</h3>
                <div className="text-gray-700 leading-relaxed space-y-2">
                  {solutionItems.map((solution, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-blue-600 mr-2 mt-0.5 text-sm">•</span>
                      <span className="text-sm leading-relaxed">{solution}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3" data-hide-in-export="true">
            <div className="bg-gray-100 rounded-lg h-16 flex items-center justify-center text-gray-500 text-sm">광고 공간</div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-4" data-hide-in-export="true">
            <ShareButton 
              resultData={{
                percentage: result.percentage,
                userName: userProfile.name || '',
                category: result.category,
                lang: language,
              }}
              className="px-6 py-2 text-base"
              buttonText={t.result.shareButton}
            />
            
            <button
              onClick={handleRetakeTest}
              className="inline-flex items-center justify-center px-6 py-2 bg-gray-500 text-white rounded-lg font-medium text-base hover:bg-gray-600 transition-colors"
            >
              {t.result.retakeTest}
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-6 mt-8">
        <div className="max-w-mobile mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">© 2024 Are You Biased. All rights reserved.</p>
          <p className="text-gray-500 text-xs mt-1">https://areyoubiased.life</p>
        </div>
      </footer>
    </div>
  );
}
