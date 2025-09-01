'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { ResultChart } from '@/components/ui/ResultChart';
import { getBiasCategory } from '@/data/solutions';
import { getTranslation, languages } from '@/lib/i18n';
import { SupportedLanguage, TestResult } from '@/types';

type BiasCategoryType = TestResult['category'];

const validCategories: BiasCategoryType[] = ['very_low', 'low', 'moderate', 'high', 'very_high'];
function isBiasCategory(value: string | null): value is BiasCategoryType {
  return validCategories.includes(value as BiasCategoryType);
}

function RenderResultContent() {
  const searchParams = useSearchParams();

  const percentage = Number(searchParams.get('percentage') || '50');
  const userName = searchParams.get('userName') || '';
  const categoryParam = searchParams.get('category');
  const category: BiasCategoryType = isBiasCategory(categoryParam) ? categoryParam : 'moderate';

  const langParam = searchParams.get('lang');
  const supportedLanguages = Object.keys(languages);
  const lang: SupportedLanguage = 
    langParam && supportedLanguages.includes(langParam) 
    ? langParam as SupportedLanguage 
    : 'en';

  const t = getTranslation(lang);
  // 백분율에 맞는 동적 데이터 가져오기
  const biasCategory = getBiasCategory(percentage);
  // 해당 언어의 솔루션 문자열을 배열로 변환
  const solutionItems = (biasCategory.solutions[lang] || '').split('\n');

  return (
    <main className="p-4 bg-white">
      <div id="result-container" className="bg-white rounded-xl shadow-lg overflow-visible">
        <ResultChart
          percentage={percentage}
          category={category}
          userName={userName}
          size="md"
          disableAnimation={true}
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
            {/* 동적 제목 사용 */}
            <h3 className="text-lg font-semibold text-gray-800">{biasCategory.title[lang]}</h3>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">{t.result.analysis}</h3>
            {/* 동적 설명 사용 */}
            <p className="text-sm text-gray-700 leading-relaxed">{biasCategory.description[lang]}</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">{t.result.solutions}</h3>
            {/* 동적 솔루션 목록 렌더링 */}
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
    </main>
  );
}

export default function RenderResultPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RenderResultContent />
    </Suspense>
  );
}
