import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BiasTestState, UserProfile, TestResult, SupportedLanguage } from '@/types';

interface BiasTestStore extends BiasTestState {
  // Actions
  setLanguage: (language: SupportedLanguage) => void;
  setUserProfile: (profile: Partial<UserProfile>) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  setCurrentQuestion: (questionNumber: number) => void;
  submitAnswer: (answerScore: number) => void;
  setResult: (result: TestResult) => void;
  resetTest: () => void;
  
  // Getters
  getCurrentAnswer: () => number | undefined;
  isTestCompleted: () => boolean;
  getProgress: () => number;
}

const initialState: BiasTestState = {
  currentQuestion: 0,
  answers: [],
  userProfile: {},
  language: 'ko',
  result: undefined
};

export const useBiasTestStore = create<BiasTestStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      setLanguage: (language) => set({ language }),
      
      setUserProfile: (profile) => set((state) => ({
        userProfile: { ...state.userProfile, ...profile }
      })),
      
      nextQuestion: () => set((state) => {
        const nextQuestionIndex = state.currentQuestion + 1;
        // 40문제이므로 0-39 인덱스, 마지막 문항(39)에서는 증가하지 않음
        if (nextQuestionIndex < 40) {
          return { currentQuestion: nextQuestionIndex };
        }
        return {}; // 마지막 문항에서는 변경하지 않음
      }),
      
      prevQuestion: () => set((state) => ({
        currentQuestion: Math.max(state.currentQuestion - 1, 0)
      })),
      
      setCurrentQuestion: (questionNumber) => set({
        currentQuestion: Math.max(0, Math.min(questionNumber, 39))
      }),
      
      submitAnswer: (answerScore) => set((state) => {
        console.log('submitAnswer 호출:', {
          currentQuestion: state.currentQuestion,
          answerScore,
          currentAnswersLength: state.answers.length,
          currentAnswers: state.answers
        });
        
        // answers 배열을 40개로 초기화 (이전에 초기화되지 않았다면)
        const newAnswers = state.answers.length === 0 
          ? new Array(40).fill(undefined) 
          : [...state.answers];
        
        // 40개보다 적으면 40개로 확장
        while (newAnswers.length < 40) {
          newAnswers.push(undefined);
        }
        
        // 현재 질문에 답변 저장
        if (state.currentQuestion >= 0 && state.currentQuestion < 40) {
          newAnswers[state.currentQuestion] = answerScore;
        } else {
          console.error('잘못된 질문 인덱스:', state.currentQuestion);
        }
        
        console.log('업데이트된 answers:', newAnswers);
        console.log('업데이트된 answers 길이:', newAnswers.length);
        
        return {
          answers: newAnswers
        };
      }),
      
      setResult: (result) => set({ result }),
      
      resetTest: () => set({
        ...initialState,
        language: get().language // 언어 설정은 유지
      }),
      
      // Getters
      getCurrentAnswer: () => {
        const state = get();
        return state.answers[state.currentQuestion];
      },
      
      isTestCompleted: () => {
        const state = get();
        console.log('isTestCompleted 체크:', {
          answersLength: state.answers.length,
          validAnswers: state.answers.filter(a => a !== undefined && a !== null).length,
          answers: state.answers
        });
        
        // answers 배열이 40개이고, 모두 undefined가 아니면 완료
        if (state.answers.length !== 40) {
          console.log('answers 길이가 40이 아님:', state.answers.length);
          return false;
        }
        
        const hasUndefined = state.answers.some((answer, index) => {
          const isUndefined = answer === undefined || answer === null;
          if (isUndefined) {
            console.log(`질문 ${index + 1}에 답변이 없음:`, answer);
          }
          return isUndefined;
        });
        
        const completed = !hasUndefined;
        console.log('테스트 완료 여부:', completed);
        return completed;
      },
      
      getProgress: () => {
        const state = get();
        return Math.round(((state.currentQuestion + 1) / 40) * 100);
      }
    }),
    {
      name: 'bias-test-storage', // localStorage key
      partialize: (state) => ({
        // 세션 종료 시 초기화되어야 할 데이터 제외
        language: state.language,
        userProfile: state.userProfile
      }),
    }
  )
);