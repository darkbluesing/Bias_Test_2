'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useBiasTestStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';
import { generateAllQuestions } from '@/data/questions';
import { biasCalculator } from '@/lib/biasCalculator';
import { useHydration } from '@/lib/useHydration';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { QuestionCard } from '@/components/ui/QuestionCard';

export default function TestPage() {
  const router = useRouter();
  const isHydrated = useHydration();
  const { 
    language, 
    answers, 
    currentQuestion,
    nextQuestion, 
    previousQuestion, 
    submitAnswer,
    setResult
  } = useBiasTestStore();
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
      // The answer for the last question is submitted, but the state update might not be complete yet.
      // We need to include the latest answer in the calculation to avoid a race condition.
      const finalAnswers = [...answers];
      finalAnswers[currentQuestion] = answerIndex;
      const finalResult = biasCalculator.calculateResult(finalAnswers, language);
      setResult(finalResult);
      router.push('/result');
    } else {
      // Add a small delay to allow the user to see their selection before moving to the next question.
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
      
      <main className="max-w-mobile mx-auto p-4 py-1">
        <div className="mb-3">
          <div className="bg-gray-100 rounded-lg h-16 flex items-center justify-center text-gray-500 text-sm shadow-inner">광고 공간</div>
        </div>
        
        <ProgressBar progress={progress} className="mb-4" />
        
        <QuestionCard 
          question={question}
          questionNumber={currentQuestion + 1}
          totalQuestions={allQuestions.length}
          selectedAnswer={answers[currentQuestion]}
          onAnswerSelect={handleAnswerSelect}
          onPrevious={previousQuestion}
          onNext={() => {
            if (currentQuestion === allQuestions.length - 1) {
              // 마지막 질문일 때는 결과 계산 및 이동
              const finalAnswers = [...answers];
              finalAnswers[currentQuestion] = answers[currentQuestion];
              if (finalAnswers.every(a => a !== undefined)) {
                const finalResult = biasCalculator.calculateResult(finalAnswers, language);
                setResult(finalResult);
                router.push('/result');
              }
            } else {
              // 답변이 선택된 경우에만 다음으로
              if (answers[currentQuestion] !== undefined) {
                nextQuestion();
              }
            }
          }}
          isFirstQuestion={currentQuestion === 0}
          isLastQuestion={currentQuestion === allQuestions.length - 1}
          translations={t.test}
        />
        
        <div className="mt-4">
          <div className="bg-gray-100 rounded-lg h-16 flex items-center justify-center text-gray-500 text-sm shadow-inner">광고 공간</div>
        </div>
      </main>
    </div>
  );
}
