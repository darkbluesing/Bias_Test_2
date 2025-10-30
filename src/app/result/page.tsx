'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useBiasTestStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';
import { getBiasCategory } from '@/data/solutions';
import { ShareButton } from '@/components/ui/ShareButton';
import { ResultChart } from '@/components/ui/ResultChart';
import { AmazonBanner } from '@/components/ui/AmazonBanner';

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
        console.log('Result page initialization - current result:', result);
        
        if (result && result.percentage !== undefined) {
          console.log('Result found in store:', result);
          setIsLoading(false);
          setHasInitialized(true);
          return;
        }
        
        // 약간의 지연으로 state 업데이트 시간 확보
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // 다시 한 번 확인
        const currentState = useBiasTestStore.getState();
        if (currentState.result && currentState.result.percentage !== undefined) {
          console.log('Result found in store after delay:', currentState.result);
          setIsLoading(false);
          setHasInitialized(true);
          return;
        }
        
        if (typeof window !== 'undefined') {
          const backup = localStorage.getItem('bias-test-result-backup');
          console.log('Checking localStorage backup:', backup ? 'found' : 'not found');
          
          if (backup) {
            try {
              const backupData = JSON.parse(backup);
              console.log('Parsed backup data:', backupData);
              
              if (backupData.result && backupData.result.percentage !== undefined) {
                console.log('Restoring from backup');
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
        
        console.log('No result found, redirecting to home');
        setTimeout(() => {
          alert('테스트 결과를 찾을 수 없습니다.\n다시 테스트를 진행해주세요.');
          router.push('/');
        }, 1500);
        
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
          <Link
            href="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-lg font-bold text-gray-900">www.areyoubiased.life</span>
          </Link>
        </div>
      </header>

      <main className="px-4 py-1">
        <div className="max-w-mobile mx-auto">
          <div className="mb-3 flex justify-center" data-hide-in-export="true">
            <AmazonBanner
              className="w-full max-w-[468px]"
              href="https://www.amazon.com/dp/B09B2SBHQK?th=1&linkCode=ll1&tag=kpdhworld-20&linkId=ef89ac7312052ccde8bcc9e2127963b1&language=en_US&ref_=as_li_ss_tl"
              title="Amazon Alexa Smart Display"
              description="Stay connected with Alexa routines, video calls, and smart home control in a compact bedside hub."
              imageSrc="/images/amazon-monitor.svg"
              imageAlt="Amazon Alexa smart display"
              dense
            />
          </div>

          <div id="result-container" className="bg-white rounded-xl shadow-lg overflow-visible relative">
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

              <div className="mt-3" data-hide-in-export="true">
                <a
                  href="https://www.effectivegatecpm.com/mpxmx7ri?key=9a9fd73316309e4a945fac814b056168"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-amber-400 px-3 py-2 text-center text-[11px] font-semibold text-white transition hover:bg-amber-500"
                >
                  <span className="whitespace-pre-line leading-snug">{t.result.supportButton}</span>
                </a>
              </div>

            </div>
          </div>

          <div className="mt-3 flex justify-center" data-hide-in-export="true">
            <AmazonBanner
              className="w-full max-w-[468px]"
              href="https://www.amazon.com/seenlast-Adjustable-Electric-Vintage-Scented/dp/B0CDRDK6MR?_encoding=UTF8&dib=eyJ2IjoiMSJ9.Nw9VAx1lX9kXhbMfkIemOSG5djkJxGmtdFXuD_dRJjkDZWQvFo9BhOw_kHFTlzg6bI_1z9DjWSG2ujXAa9rV1WRJTMQt4Vo2BNSk8yhppsOrF1i5RugymqOdW2A2XCvjTjJq5FKXLcDIxCWa1mPyOQT-w8QpC3hXbM-KdDuhJzBSVM_kDFYkbp4RXPk8zDoNeF2rAMSoX3BKuwfaiCk-z6wxld9wfGq3URHoxaMxMMMFSMQ4l1i_Ow9jUOm00PWAWQPj_CwRESK5muQALTINVnpoY9ve52xrTY-R5xFIBys.mI4MotbuNamruDUsjcoPqUhkMRY9D0UlW3sXInhxmJQ&dib_tag=se&keywords=Home%2BDecor%2Bgifts&qid=1761806642&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&smid=A2899BZAJ32AE4&th=1&linkCode=ll1&tag=kpdhworld-20&linkId=0f631666e3ee28b31dc502c7b896c92d&language=en_US&ref_=as_li_ss_tl"
              title="Vintage-Inspired Home Decor"
              description="Create a calming vibe with this adjustable electric aroma diffuser. Perfect for gifting."
              imageSrc="/images/amazon-diffuser.svg"
              imageAlt="Vintage electric aroma diffuser"
              dense
            />
          </div>


          <div className="flex flex-row gap-2 sm:gap-4 justify-center items-center mt-4 px-2" data-hide-in-export="true">
            <ShareButton 
              percentage={result.percentage}
              className="flex-1 max-w-[140px] sm:max-w-[180px] md:max-w-[200px]"
              buttonText={t.result.shareButton}
            />
            
            <button
              onClick={handleRetakeTest}
              className="flex-1 max-w-[140px] sm:max-w-[180px] md:max-w-[200px] inline-flex items-center justify-center px-4 py-2 bg-gray-500 text-white rounded-lg font-medium text-sm hover:bg-gray-600 transition-colors"
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
