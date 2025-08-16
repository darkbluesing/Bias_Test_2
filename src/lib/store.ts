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
        const newAnswers = [...state.answers];
        newAnswers[state.currentQuestion] = answerScore;
        
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
        return state.answers.length === 40 && state.answers.every(answer => answer !== undefined);
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