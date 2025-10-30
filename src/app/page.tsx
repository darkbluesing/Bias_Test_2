'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useBiasTestStore } from '@/lib/store';
import { getTranslation, detectLanguageFromBrowser } from '@/lib/i18n';
import { useHydration } from '@/lib/useHydration';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { Button } from '@/components/ui/Button';
import { AmazonBanner } from '@/components/ui/AmazonBanner';

export default function HomePage() {
  const router = useRouter();
  const isHydrated = useHydration();
  const [name, setName] = useState('');
  const [isStarting, setIsStarting] = useState(false);
  const { language, setLanguage, setUserProfile } = useBiasTestStore();
  const t = getTranslation(language);

  useEffect(() => {
    if (!isHydrated) return;
    
    const detectedLang = detectLanguageFromBrowser();
    setLanguage(detectedLang);
  }, [isHydrated, setLanguage]);

  const handleStartTest = async () => {
    if (isStarting) return;

    if (!name.trim()) {
      alert(t.error.nameRequired);
      return;
    }

    setIsStarting(true);
    setUserProfile({ name: name.trim() });
    
    await new Promise(resolve => setTimeout(resolve, 100));
    
    router.push('/test');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="px-4 py-4">
        <div className="max-w-mobile mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <Link href="/" className="text-lg sm:text-xl font-bold text-gray-900 truncate hover:opacity-80 transition-opacity">www.areyoubiased.life</Link>
          </div>
          <LanguageSelector className="w-24 sm:w-28 ml-1 flex-shrink-0" />
        </div>
      </header>

      <main className="px-4 py-1">
        <div className="max-w-mobile mx-auto">
          <div className="mb-2 flex justify-center">
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

          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-2.5">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <h1 className={`${language === 'ja' ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'} font-bold text-gray-900 mb-2 leading-tight whitespace-pre-line`}>{t.welcome.title}</h1>
                <p className="text-base md:text-lg text-gray-700 font-semibold mb-3 leading-snug">{t.welcome.subtitle}</p>
                
                <div className="text-sm md:text-base text-left leading-tight space-y-1.5 mb-4">
                  {/* 설명 문단에 구분점 추가 */}
                  {t.welcome.description && Array.isArray(t.welcome.description) && (
                    <div className="font-medium text-gray-600 space-y-1.5">
                      {t.welcome.description.map((paragraph, index) => (
                        <div key={`desc-${index}`} className="flex items-start">
                          <span className="mr-2 text-gray-500">•</span>
                          <span>{paragraph}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="py-1.5">
                    <div className="border-t border-gray-200"></div>
                  </div>
                  
                  {t.welcome.description_points && Array.isArray(t.welcome.description_points) && (
                    <ul className="space-y-0.5 text-gray-700 text-sm leading-tight">
                      {t.welcome.description_points.map((point, index) => (
                        <li key={`point-${index}`} className="flex items-start">
                          <span className="mr-2 text-blue-600">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="max-w-md mx-auto">
                <div className="mb-4">
                  <label className="block text-base font-medium text-gray-700 mb-2">{t.welcome.nameInput}</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.welcome.namePlaceholder}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                    onKeyPress={(e) => { if (e.key === 'Enter') handleStartTest(); }}
                    data-testid="welcome-name-input"
                  />
                </div>
                
                <div className="relative h-[52px]">
                  <Button
                    onClick={handleStartTest}
                    loading={isStarting}
                    size="lg"
                    fullWidth
                    className="text-base py-3.5 h-[52px] absolute inset-0"
                    data-testid="start-test-button"
                  >
                    {t.welcome.startButton}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 flex justify-center">
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
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-6">
        <div className="max-w-mobile mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 Are You Biased. All rights reserved.</p>
          <p className="text-gray-500 text-sm mt-2">www.areyoubiased.life</p>
        </div>
      </footer>
    </div>
  );
}
