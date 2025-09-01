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
  const { language, answers, setAnswer, currentQuestion, nextQuestion, previousQuestion, setResult, resetTest } = useBiasTestStore();
  const t = getTranslation(language);

  const [allQuestions, setAllQuestions] = useState(generateAllQuestions());

  useEffect(() => {
    setAllQuestions(generateAllQuestions());
  }, [language]);

  const handleNext = () => {
    if (answers[currentQuestion] === undefined) {
      alert(t.error.answerRequired);
      return;
    }
    if (currentQuestion < allQuestions.length - 1) {
      nextQuestion();
    }
  };

  const handleSubmit = () => {
    if (answers[currentQuestion] === undefined) {
      alert(t.error.answerRequired);
      return;
    }

    // 모든 질문에 답변했는지 확인
    const allAnswered = answers.length === allQuestions.length && answers.every(a => a !== undefined);
    if (!allAnswered) {
      alert(t.error.testIncomplete);
      return;
    }

    const finalResult = calculateBias(answers);
    setResult(finalResult);
    router.push('/result');
  };

  if (!isHydrated) {
    return <div>Loading...</div>;
  }

  const question = allQuestions[currentQuestion];
  const progress = (currentQuestion / allQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-mobile mx-auto p-4">
        <ProgressBar progress={progress} />
        <QuestionCard 
          question={question}
          questionNumber={currentQuestion + 1}
          totalQuestions={allQuestions.length}
          selectedAnswer={answers[currentQuestion]}
          onAnswerSelect={(answerIndex) => setAnswer(currentQuestion, answerIndex)}
          onNext={handleNext}
          onPrevious={previousQuestion}
          onSubmit={handleSubmit}
          isFirstQuestion={currentQuestion === 0}
          isLastQuestion={currentQuestion === allQuestions.length - 1}
          translations={t.test}
        />
      </main>
    </div>
  );
}
