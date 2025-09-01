'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useBiasTestStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';
import { generateAllQuestions } from '@/data/questions';
import { calculateBias } from '@/lib/biasCalculator';
import { useHydration } from '@/lib/useHydration';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { QuestionCard } from '@/components/ui/QuestionCard';
import { LanguageSelector } from '@/components/ui/LanguageSelector';

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
      const finalResult = calculateBias(finalAnswers);
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
      <main className="max-w-mobile mx-auto p-4 py-8">
        <ProgressBar progress={progress} className="mb-8" />
        <QuestionCard 
          question={question}
          questionNumber={currentQuestion + 1}
          totalQuestions={allQuestions.length}
          selectedAnswer={answers[currentQuestion]}
          onAnswerSelect={handleAnswerSelect}
          onPrevious={previousQuestion}
          isFirstQuestion={currentQuestion === 0}
          translations={t.test}
        />
      </main>
    </div>
  );
}
