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
  const [isProcessing, setIsProcessing] = useState(false);
  
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
    console.log('handleAnswer 호출:', {
      currentQuestion,
      score,
      isProcessing,
      isSubmitting,
      questionsLength: questions.length
    });
    
    // 이미 처리 중이면 중복 방지
    if (isProcessing || isSubmitting) {
      console.log('이미 처리 중이므로 handleAnswer 중단');
      return;
    }
    
    setIsProcessing(true);
    
    // 답변 저장
    submitAnswer(score);
    
    console.log('답변 저장 후 다음 단계 처리 예약');
    
    // 선택지 클릭 시 자동으로 다음 문제로 이동
    setTimeout(() => {
      try {
        const isLastQuestion = currentQuestion === questions.length - 1;
        console.log('마지막 질문 여부:', isLastQuestion, `(${currentQuestion}/${questions.length - 1})`);
        
        if (isLastQuestion) {
          console.log('마지막 질문이므로 handleSubmitTest 호출');
          // 마지막 문항이면 제출
          handleSubmitTest();
        } else {
          console.log('다음 질문으로 이동');
          nextQuestion();
          setIsProcessing(false);
        }
      } catch (error) {
        console.error('handleAnswer 오류:', error);
        setIsProcessing(false);
      }
    }, 500); // 0.5초 후 자동 이동
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
    console.log('=== handleSubmitTest 시작 ===');
    console.log('현재 질문 번호:', currentQuestion);
    console.log('현재 answers:', answers);
    console.log('answers 길이:', answers.length);
    console.log('전체 질문 수:', questions.length);
    console.log('isTestCompleted():', isTestCompleted());
    console.log('isSubmitting 상태:', isSubmitting);
    
    // 이미 제출 중이면 중복 방지
    if (isSubmitting) {
      console.log('이미 제출 중이므로 중단');
      return;
    }

    // answers 배열 상세 로그
    console.log('=== Answers 상세 분석 ===');
    answers.forEach((answer, index) => {
      console.log(`질문 ${index + 1}: ${answer} (${answer === undefined ? 'undefined' : 'answered'})`);
    });
    
    // 답변 개수 상세 확인
    const validAnswers = answers.filter(answer => answer !== undefined && answer !== null);
    const invalidAnswers = answers.filter(answer => answer === undefined || answer === null);
    
    console.log('유효한 답변 수:', validAnswers.length);
    console.log('유효하지 않은 답변 수:', invalidAnswers.length);
    
    // 답변 수가 부족하면 누락된 질문 찾기
    if (validAnswers.length < 40) {
      const missingQuestions = [];
      for (let i = 0; i < 40; i++) {
        if (answers[i] === undefined || answers[i] === null) {
          missingQuestions.push(i + 1);
        }
      }
      console.error('누락된 질문들:', missingQuestions);
      alert(`다음 질문들에 답변해주세요: ${missingQuestions.join(', ')}번 (총 ${validAnswers.length}/40개 답변 완료)`);
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log('=== 결과 계산 시작 ===');
      
      // 결과 계산 전 예비 검증
      const answersForCalculation = [...answers];
      console.log('계산에 사용할 답변들:', answersForCalculation);
      
      if (answersForCalculation.length !== 40) {
        throw new Error(`답변 길이 오류: ${answersForCalculation.length}/40`);
      }
      
      const hasUndefined = answersForCalculation.some(answer => answer === undefined || answer === null);
      if (hasUndefined) {
        throw new Error('답변에 undefined 값이 포함되어 있음');
      }
      
      const result = biasCalculator.calculateResult(answersForCalculation, language);
      console.log('계산된 결과:', result);
      
      console.log('=== 결과 저장 시작 ===');
      setResult(result);
      
      // 저장 후 잘짠 주기
      await new Promise(resolve => setTimeout(resolve, 200));
      
      console.log('=== 결과 페이지로 이동 ===');
      if (typeof window !== 'undefined') {
        window.location.href = '/result';
      } else {
        router.push('/result');
      }
      
    } catch (error) {
      console.error('=== 결과 계산 오류 ===');
      console.error('오류 내용:', error);
      
      if (error instanceof Error) {
        console.error('오류 메시지:', error.message);
        console.error('오류 스택:', error.stack);
      }
      
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
      alert(`결과 계산 중 오류가 발생했습니다:\n${errorMessage}\n\n다시 시도해주세요.`);
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