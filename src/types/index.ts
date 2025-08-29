// 기본 타입 정의
export interface Question {
  id: string;
  text: {
    ko: string;
    en: string;
    es: string;
    zh: string;
    ja: string;
  };
  options: {
    ko: string;
    en: string;
    es: string;
    zh: string;
    ja: string;
  }[];
}

export interface UserProfile {
  name: string;
  gender: string;
  maritalStatus: string;
  race: string;
  age: string;
  religion: string;
  education: string;
  income: string;
  occupation: string;
  region: string;
  householdSize: string;
}

export interface TestResult {
  totalScore: number;
  percentage: number;
  category: 'very_low' | 'low' | 'moderate' | 'high' | 'very_high';
  solutions: {
    ko: string;
    en: string;
    es: string;
    zh: string;
    ja: string;
  };
  completedAt: string; // ISO string으로 변경하여 직렬화 문제 해결
}

export interface BiasTestState {
  currentQuestion: number;
  answers: number[];
  userProfile: Partial<UserProfile>;
  result?: TestResult;
  language: 'ko' | 'en' | 'es' | 'zh' | 'ja';
}

export type SupportedLanguage = 'ko' | 'en' | 'es' | 'zh' | 'ja';

export interface LocalizedText {
  ko: string;
  en: string;
  es: string;
  zh: string;
  ja: string;
}