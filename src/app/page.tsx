'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useBiasTestStore } from '@/lib/store';
import { getTranslation, detectLanguageFromBrowser } from '@/lib/i18n';
import { useHydration } from '@/lib/useHydration';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { Button } from '@/components/ui/Button';
import { AdsterraBanner } from '@/components/ui/AdsterraBanner';

export default function HomePage() {
  const router = useRouter();
  const isHydrated = useHydration();
  const [name, setName] = useState('');
  const [isStarting, setIsStarting] = useState(false);
  const { language, setLanguage, setUserProfile, resetTest } = useBiasTestStore();
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

    resetTest(); // Reset the test state before starting a new one

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
            <AdsterraBanner
              className="w-full"
              options={{ key: '5aec263b46cce11388d8da8c1ee59913', height: 60, width: 468 }}
            />
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-2.5">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <h1 className={`${language === 'ja' ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'} font-bold text-gray-900 mb-2 leading-normal whitespace-pre-line`}>{t.welcome.title}</h1>
                <p className="text-base md:text-lg text-gray-700 font-semibold mb-3 leading-normal">{t.welcome.subtitle}</p>
                
                <div className="text-sm md:text-base text-left leading-normal space-y-1.5 mb-4">
                  {/* 설명 문단에 구분점 추가 */}
                  {t.welcome.description && Array.isArray(t.welcome.description) && (
                    <div className={`font-medium text-gray-600 ${language === 'zh' ? 'space-y-3' : 'space-y-1.5'}`}>
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
                    <ul className="space-y-0.5 text-gray-700 text-sm leading-normal">
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
            <AdsterraBanner
              className="w-full"
              options={{ key: '5aec263b46cce11388d8da8c1ee59913', height: 60, width: 468 }}
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

