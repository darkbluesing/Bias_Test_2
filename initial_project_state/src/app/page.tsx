'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useBiasTestStore } from '@/lib/store';
import { getTranslation, detectLanguageFromBrowser } from '@/lib/i18n';
import { useHydration } from '@/lib/useHydration';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { Button } from '@/components/ui/Button';

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
    
    window.location.href = '/test';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="px-4 py-6">
        <div className="max-w-mobile mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Are You Biased?</h1>
          </div>
          <LanguageSelector className="w-40" />
        </div>
      </header>

      <main className="px-4 py-12">
        <div className="max-w-mobile mx-auto">
          <div className="mb-3">
            <div className="bg-gray-100 rounded-lg h-16 flex items-center justify-center text-gray-500 text-sm">광고 공간</div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-3">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">{t.welcome.title}</h1>
                <p className="text-lg md:text-xl text-gray-700 font-semibold mb-6 leading-relaxed">{t.welcome.subtitle}</p>
                
                <div className="text-base text-left leading-normal space-y-3 mb-6">
                  {/* 설명 문단에 구분점 추가 */}
                  {t.welcome.description && Array.isArray(t.welcome.description) && (
                    <div className="font-medium text-gray-600 space-y-3">
                      {t.welcome.description.map((paragraph, index) => (
                        <div key={`desc-${index}`} className="flex items-start">
                          <span className="mr-3 text-gray-500">•</span>
                          <span>{paragraph}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="py-2">
                    <div className="border-t border-gray-200"></div>
                  </div>
                  
                  {t.welcome.description_points && Array.isArray(t.welcome.description_points) && (
                    <ul className="space-y-1 text-gray-700">
                      {t.welcome.description_points.map((point, index) => (
                        <li key={`point-${index}`} className="flex items-start">
                          <span className="mr-3 text-blue-600">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="max-w-md mx-auto">
                <div className="mb-6">
                  <label className="block text-lg font-medium text-gray-700 mb-3">{t.welcome.nameInput}</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.welcome.namePlaceholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                    onKeyPress={(e) => { if (e.key === 'Enter') handleStartTest(); }}
                  />
                </div>
                
                <div className="relative h-[60px]">
                  <Button
                    onClick={handleStartTest}
                    loading={isStarting}
                    size="lg"
                    fullWidth
                    className="text-lg py-4 h-[60px] absolute inset-0"
                  >
                    {t.welcome.startButton}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="bg-gray-100 rounded-lg h-16 flex items-center justify-center text-gray-500 text-sm">광고 공간</div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-mobile mx-auto px-4 text-center">
          <p className="text-gray-400">© 2024 Are You Biased. All rights reserved.</p>
          <p className="text-gray-500 text-sm mt-2">https://areyoubiased.life</p>
        </div>
      </footer>
    </div>
  );
}