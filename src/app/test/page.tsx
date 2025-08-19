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
import { DebugPanel } from '@/components/DebugPanel';

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

  const handleAnswer = async (score: number) => {
    console.log('handleAnswer 호출:', {
      currentQuestion,
      score,
      isProcessing,
      isSubmitting,
      questionsLength: questions.length,
      currentAnswersLength: answers.length
    });
    
    // 이미 처리 중이면 중복 방지
    if (isProcessing || isSubmitting) {
      console.log('이미 처리 중이므로 handleAnswer 중단');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // 답변 저장
      console.log('답변 저장 중...');
      submitAnswer(score);
      
      // 마지막 질문인지 확인
      const isLastQuestion = currentQuestion === questions.length - 1;
      console.log('마지막 질문 여부:', isLastQuestion, `(${currentQuestion}/${questions.length - 1})`);
      
      if (isLastQuestion) {
        console.log('** 마지막 질문 - 직접 결과페이지로 이동 **');
        // 마지막 질문은 답변 저장 후 바로 결과 계산 및 이동
        await new Promise(resolve => setTimeout(resolve, 100)); // 상태 저장 대기
        
        // 최신 answers 가져오기 
        const latestAnswers = useBiasTestStore.getState().answers;
        console.log('최종 답변 확인:', latestAnswers.length, latestAnswers.filter(a => a !== undefined).length);
        
        // 결과 계산
        const result = biasCalculator.calculateResult(latestAnswers, language);
        setResult(result);
        
        // 결과 페이지로 직접 이동
        console.log('결과페이지로 강제 이동');
        window.location.href = '/result';
        return;
      } else {
        console.log('다음 질문으로 이동 준비');
        // 일반 문항은 즉시 이동 (딜레이 제거)
        console.log('다음 질문으로 즉시 이동');
        nextQuestion();
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('handleAnswer 오류:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert('오류가 발생했습니다: ' + errorMessage);
      setIsProcessing(false);
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    if (isProcessing || isSubmitting) {
      console.log('Next 버튼: 이미 처리 중이므로 중단');
      return;
    }
    
    const currentAnswer = getCurrentAnswer();
    if (currentAnswer === undefined) {
      alert(t.error.answerRequired);
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // 마지막 문항이면 결과 계산 후 이동
      if (currentQuestion === questions.length - 1) {
        console.log('Next 버튼: 마지막 질문 - 결과 계산 후 이동');
        
        const latestAnswers = useBiasTestStore.getState().answers;
        const result = biasCalculator.calculateResult(latestAnswers, language);
        setResult(result);
        
        window.location.href = '/result';
        return;
      } else {
        console.log('Next 버튼: 다음 질문으로 이동');
        nextQuestion();
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Next 버튼 오류:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert('오류가 발생했습니다: ' + errorMessage);
      setIsProcessing(false);
    }
  };

  const handlePrevious = () => {
    if (isProcessing || isSubmitting) {
      console.log('Previous 버튼: 이미 처리 중이므로 중단');
      return;
    }
    
    // 즉시 이전 질문으로 이동 (딜레이 제거)
    prevQuestion();
  };

  const handleSubmitTest = async () => {
    try {
      console.log('=== handleSubmitTest 시작 ===');
      console.log('현재 질문 번호:', currentQuestion);
      console.log('isSubmitting 상태:', isSubmitting);
      
      // 이미 제출 중이면 중복 방지
      if (isSubmitting) {
        console.log('이미 제출 중이므로 중단');
        return;
      }

      // 제출 상태 설정
      setIsSubmitting(true);
      console.log('제출 상태 설정 완료');

    try {
      // 최신 상태 가져오기 (상태 업데이트 보장을 위한 대기)
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // 스토어에서 최신 answers 가져오기
      const currentAnswers = useBiasTestStore.getState().answers;
      console.log('=== 최신 Answers 상태 확인 ===');
      console.log('현재 answers:', currentAnswers);
      console.log('answers 길이:', currentAnswers.length);
      console.log('전체 질문 수:', questions.length);
      
      // answers 배열 상세 로그
      currentAnswers.forEach((answer, index) => {
        console.log(`질문 ${index + 1}: ${answer} (${answer === undefined ? 'undefined' : 'answered'})`);
      });
      
      // 답변 개수 상세 확인
      const validAnswers = currentAnswers.filter(answer => answer !== undefined && answer !== null);
      const invalidAnswers = currentAnswers.filter(answer => answer === undefined || answer === null);
      
      console.log('유효한 답변 수:', validAnswers.length);
      console.log('유효하지 않은 답변 수:', invalidAnswers.length);
      
      // 답변 배열이 40개가 아니거나 유효한 답변이 40개가 아닌 경우
      if (currentAnswers.length !== 40) {
        throw new Error(`답변 배열 길이 오류: ${currentAnswers.length}/40`);
      }
      
      if (validAnswers.length < 40) {
        const missingQuestions = [];
        for (let i = 0; i < 40; i++) {
          if (currentAnswers[i] === undefined || currentAnswers[i] === null) {
            missingQuestions.push(i + 1);
          }
        }
        console.error('누락된 질문들:', missingQuestions);
        throw new Error(`누락된 질문: ${missingQuestions.join(', ')}번 (총 ${validAnswers.length}/40개 답변 완료)`);
      }
      
      console.log('=== 결과 계산 시작 ===');
      
      // 결과 계산을 위한 배열 복사
      const answersForCalculation = [...currentAnswers];
      console.log('계산에 사용할 답변들:', answersForCalculation.slice(0, 5), '...', answersForCalculation.slice(-5));
      
      // 최종 검증
      const hasUndefined = answersForCalculation.some(answer => answer === undefined || answer === null);
      if (hasUndefined) {
        const undefinedIndices = answersForCalculation.map((a, i) => a === undefined || a === null ? i + 1 : null).filter(x => x !== null);
        throw new Error(`답변에 undefined/null 값 포함: ${undefinedIndices.join(', ')}번 질문`);
      }
      
      // 결과 계산
      console.log('biasCalculator.calculateResult 호출 중...');
      const result = biasCalculator.calculateResult(answersForCalculation, language);
      console.log('계산된 결과:', result);
      
      console.log('=== 결과 저장 시작 ===');
      setResult(result);
      
      // localStorage에도 백업 저장 (안전한 처리)
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          const backupData = {
            result: result,
            userProfile: userProfile,
            timestamp: Date.now(),
            answers: currentAnswers
          };
          localStorage.setItem('bias-test-result-backup', JSON.stringify(backupData));
          console.log('localStorage에 백업 저장 완료:', backupData);
        }
      } catch (storageError) {
        console.error('localStorage 백업 저장 실패:', storageError);
        // localStorage 실패해도 계속 진행
      }
      
      // 저장 후 약간의 대기
      await new Promise(resolve => setTimeout(resolve, 300));
      
      console.log('=== 결과 페이지로 이동 ===');
      // 상태 저장 완료 후 페이지 이동
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // 강제 페이지 이동 (Next.js 라우터 이슈 방지)
      if (typeof window !== 'undefined') {
        console.log('window.location.href로 결과 페이지 이동');
        window.location.href = '/result';
      } else {
        console.log('router.push로 결과 페이지 이동');
        router.push('/result');
      }
      
    } catch (error) {
      console.error('=== 결과 제출 오류 ===');
      console.error('오류 내용:', error);
      
      if (error instanceof Error) {
        console.error('오류 메시지:', error.message);
        console.error('오류 스택:', error.stack);
      }
      
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
      alert(`테스트 제출 중 오류가 발생했습니다:\n${errorMessage}\n\n페이지를 새로고침하고 다시 시도해주세요.`);
      
      // 오류 발생 시 제출 상태 해제
      setIsSubmitting(false);
      setIsProcessing(false);
    }
    } catch (outerError) {
      console.error('=== handleSubmitTest 최상위 오류 ===');
      console.error('최상위 오류:', outerError);
      alert('테스트 제출 중 심각한 오류가 발생했습니다. 페이지를 새로고침해주세요.');
      setIsSubmitting(false);
      setIsProcessing(false);
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
    <div className="min-h-screen bg-gray-50" style={{ minHeight: '100vh' }}>
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
        <div className="max-w-mobile mx-auto" style={{ minHeight: '60vh' }}>
          {/* 광고 공간 - 상단 */}
          <div className="mb-8">
            <div className="bg-gray-100 rounded-lg h-20 flex items-center justify-center text-gray-500 text-sm">
              광고 공간 (728x90 / 320x50)
            </div>
          </div>

          {/* 추가 네이티브 광고 공간 - 10번마다 */}
          {currentQuestion % 10 === 5 && (
            <div className="mb-8">
              <div className="bg-gray-100 rounded-lg h-20 flex items-center justify-center text-gray-500 text-sm">
                네이티브 광고 공간
              </div>
            </div>
          )}

          {/* 질문 카드 - 고정 높이 컨테이너 */}
          <div className="mb-8" style={{ minHeight: '500px' }}>
            <QuestionCard
              question={currentQuestionData}
              onAnswer={handleAnswer}
              selectedAnswer={getCurrentAnswer()}
              className=""
            />
          </div>

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
      
      {/* Development Debug Panel */}
      <DebugPanel />
    </div>
  );
}