'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useBiasTestStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';
import { generateAllQuestions } from '@/data/questions';
import { biasCalculator } from '@/lib/biasCalculator';
import { useHydration } from '@/lib/useHydration';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { QuestionCard } from '@/components/ui/QuestionCard';
import { AdsterraBanner } from '@/components/ui/AdsterraBanner';

export default function TestPage() {
  const router = useRouter();
  const isHydrated = useHydration();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const store = useBiasTestStore() as any; // Temporary workaround for Netlify build
  
  // Direct access to avoid destructuring issues
  const language = store.language;
  const answers = store.answers;
  const currentQuestion = store.currentQuestion;
  const nextQuestion = store.nextQuestion;
  const previousQuestion = store.previousQuestion;
  const submitAnswer = store.submitAnswer;
  const setResult = store.setResult;
  const t = getTranslation(language);

  const [allQuestions, setAllQuestions] = useState(() => generateAllQuestions());

  useEffect(() => {
    // This ensures questions are re-generated if the language changes during the test.
    setAllQuestions(generateAllQuestions());
  }, [language]);

  const handleAnswerSelect = (answerIndex: number) => {
    submitAnswer(answerIndex);

    const isLastQuestion = currentQuestion === allQuestions.length - 1;

    if (isLastQuestion) {
      // 마지막 질문 - 결과 계산 및 저장
      setTimeout(() => {
        try {
          const finalAnswers = [...answers];
          finalAnswers[currentQuestion] = answerIndex;
          
          console.log('Final answers for calculation:', finalAnswers);
          console.log('All answers defined:', finalAnswers.every(a => a !== undefined));
          
          const finalResult = biasCalculator.calculateResult(finalAnswers, language);
          console.log('Calculated result:', finalResult);
          
          setResult(finalResult);
          
          // localStorage에 백업 저장
          if (typeof window !== 'undefined') {
            const backupData = {
              result: finalResult,
              userProfile: store.userProfile
            };
            localStorage.setItem('bias-test-result-backup', JSON.stringify(backupData));
            console.log('Result backup saved to localStorage');
          }
          
          // 결과 페이지로 이동
          setTimeout(() => {
            router.push('/result');
          }, 100);
          
        } catch (error) {
          console.error('결과 계산 오류:', error);
          alert('결과 계산 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
      }, 100);
    } else {
      // 다음 질문으로 이동
      setTimeout(() => {
        nextQuestion();
      }, 200);
    }
  };

  if (!isHydrated) {
    // Show a loading state until the component is hydrated.
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Safety check to prevent crashing if currentQuestion is out of bounds.
  if (currentQuestion >= allQuestions.length) {
    // This can happen briefly after the last question is answered, before redirecting.
    return <div className="min-h-screen flex items-center justify-center">Calculating results...</div>;
  }

  const question = allQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / allQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-100">
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
      
      <main className="max-w-mobile mx-auto p-4 py-1">
        <div className="mb-3 flex justify-center">
          <AdsterraBanner
            className="w-full"
            options={{ key: '5aec263b46cce11388d8da8c1ee59913', height: 60, width: 468 }}
          />
        </div>
        
        <ProgressBar progress={progress} className="mb-4" label={t.test.progress} />
        
        <QuestionCard 
          question={question}
          questionNumber={currentQuestion + 1}
          totalQuestions={allQuestions.length}
          selectedAnswer={answers[currentQuestion]}
          onAnswerSelect={handleAnswerSelect}
          onPrevious={previousQuestion}
          onNext={() => {
            // 답변이 선택된 경우에만 다음으로 (마지막 질문은 handleAnswerSelect에서 처리)
            if (currentQuestion < allQuestions.length - 1 && answers[currentQuestion] !== undefined) {
              nextQuestion();
            }
          }}
          isFirstQuestion={currentQuestion === 0}
          isLastQuestion={currentQuestion === allQuestions.length - 1}
          translations={t.test}
        />
        
        <div className="mt-4 flex justify-center">
          <AdsterraBanner
            className="w-full"
            options={{ key: '5aec263b46cce11388d8da8c1ee59913', height: 60, width: 468 }}
          />
        </div>
      </main>
    </div>
  );
}

