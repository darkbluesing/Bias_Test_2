'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBiasTestStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';
import { generateAllQuestions } from '@/data/questions';
import { biasCalculator } from '@/lib/biasCalculator';
import { useHydration } from '@/lib/useHydration';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { QuestionCard } from '@/components/ui/QuestionCard';
import { Button } from '@/components/ui/Button';
import { LanguageSelector } from '@/components/ui/LanguageSelector';

export default function TestPage() {
  const router = useRouter();
  const isHydrated = useHydration();
  const [questions] = useState(generateAllQuestions());
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    currentQuestion,
    answers,
    language,
    userProfile,
    nextQuestion,
    prevQuestion,
    submitAnswer,
    setResult,
    getCurrentAnswer,
    isTestCompleted
  } = useBiasTestStore();

  const t = getTranslation(language);

  // Hydration이 완료되고 이름이 없으면 홈으로 리다이렉트
  useEffect(() => {
    if (!isHydrated) return; // hydration 완료까지 대기

    console.log('테스트 페이지 - 사용자 프로필 확인:', userProfile);
    
    if (!userProfile.name) {
      console.log('사용자 이름이 없어서 홈으로 리다이렉트');
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      } else {
        router.push('/');
      }
      return;
    }
  }, [isHydrated, userProfile.name, router]);

  // Hydration이 완료되지 않았으면 로딩 화면 표시
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  const currentQuestionData = questions[currentQuestion];
  const progress = Math.round(((currentQuestion + 1) / questions.length) * 100);

  const handleAnswer = (score: number) => {
    submitAnswer(score);
  };

  const handleNext = () => {
    const currentAnswer = getCurrentAnswer();
    if (currentAnswer === undefined) {
      alert(t.error.answerRequired);
      return;
    }
    
    // 마지막 문항이면 자동으로 결과 제출
    if (currentQuestion === questions.length - 1) {
      handleSubmitTest();
    } else {
      nextQuestion();
    }
  };

  const handlePrevious = () => {
    prevQuestion();
  };

  const handleSubmitTest = async () => {
    if (!isTestCompleted()) {
      alert(t.error.testIncomplete);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = biasCalculator.calculateResult(answers, language);
      setResult(result);
      router.push('/result');
    } catch (error) {
      console.error('Test submission error:', error);
      alert(t.error.networkError);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!userProfile.name || !currentQuestionData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm px-4 py-4 sticky top-0 z-10">
        <div className="max-w-mobile mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                {t.nav.title}
              </h1>
              <p className="text-sm text-gray-600">
                {userProfile.name}님의 테스트
              </p>
            </div>
          </div>
          <LanguageSelector className="w-32" />
        </div>
      </header>

      {/* 프로그레스 바 */}
      <div className="bg-white px-4 py-4 border-b">
        <div className="max-w-mobile mx-auto">
          <ProgressBar
            current={currentQuestion + 1}
            total={questions.length}
            className="mb-2"
          />
          <p className="text-center text-sm text-gray-600">
            {t.test.question} {currentQuestion + 1} {t.test.of} {questions.length}
          </p>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <main className="px-4 py-8">
        <div className="max-w-mobile mx-auto">
          {/* 광고 공간 - 질문 상단 */}
          {currentQuestion % 10 === 5 && (
            <div className="mb-8">
              <div className="bg-gray-100 rounded-lg h-20 flex items-center justify-center text-gray-500 text-sm">
                네이티브 광고 공간
              </div>
            </div>
          )}

          {/* 질문 카드 */}
          <QuestionCard
            question={currentQuestionData}
            onAnswer={handleAnswer}
            selectedAnswer={getCurrentAnswer()}
            className="mb-8"
          />

          {/* 네비게이션 버튼 */}
          <div className="flex items-center justify-between gap-4">
            <Button
              onClick={handlePrevious}
              variant="outline"
              disabled={currentQuestion === 0}
              className="flex-1"
            >
              ← {t.test.previous}
            </Button>

            {currentQuestion < questions.length - 1 ? (
              <Button
                onClick={handleNext}
                disabled={getCurrentAnswer() === undefined}
                className="flex-1"
              >
                {t.test.next} →
              </Button>
            ) : (
              <Button
                onClick={handleSubmitTest}
                loading={isSubmitting}
                disabled={!isTestCompleted()}
                className="flex-1"
              >
                {t.test.submit}
              </Button>
            )}
          </div>


          {/* 광고 공간 - 하단 */}
          <div className="mt-8">
            <div className="bg-gray-100 rounded-lg h-16 flex items-center justify-center text-gray-500 text-sm">
              배너 광고 공간
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}