import { getBiasCategory } from '@/data/solutions';
import { TestResult, SupportedLanguage } from '@/types';

export class BiasCalculator {
  private readonly maxScore: number;
  private readonly totalQuestions: number;

  constructor(totalQuestions: number = 40, maxScorePerQuestion: number = 3) {
    this.totalQuestions = totalQuestions;
    this.maxScore = totalQuestions * maxScorePerQuestion;
  }

  /**
   * 테스트 결과를 계산합니다
   * @param answers 사용자 답변 배열 (각 답변의 점수)
   * @param language 언어 설정
   * @returns 테스트 결과 객체
   */
  calculateResult(answers: number[], language: SupportedLanguage): TestResult {
    if (answers.length !== this.totalQuestions) {
      throw new Error(`Expected ${this.totalQuestions} answers, got ${answers.length}`);
    }

    const totalScore = answers.reduce((sum, score) => sum + score, 0);
    const percentage = Math.round((totalScore / this.maxScore) * 100);
    
    const biasCategory = getBiasCategory(percentage);

    return {
      totalScore,
      percentage,
      category: biasCategory.category,
      solutions: biasCategory.solutions,
      completedAt: new Date()
    };
  }

  /**
   * 현재 진행률을 계산합니다
   * @param currentQuestion 현재 질문 번호 (0-based)
   * @returns 진행률 백분율
   */
  calculateProgress(currentQuestion: number): number {
    return Math.round(((currentQuestion + 1) / this.totalQuestions) * 100);
  }

  /**
   * 편향성 레벨을 텍스트로 반환합니다
   * @param percentage 백분율
   * @param language 언어
   * @returns 레벨 텍스트
   */
  getBiasLevelText(percentage: number, language: SupportedLanguage): string {
    const category = getBiasCategory(percentage);
    return category.title[language];
  }

  /**
   * 편향성 설명을 반환합니다
   * @param percentage 백분율
   * @param language 언어
   * @returns 설명 텍스트
   */
  getBiasDescription(percentage: number, language: SupportedLanguage): string {
    const category = getBiasCategory(percentage);
    return category.description[language];
  }
}

// 싱글톤 인스턴스 생성
export const biasCalculator = new BiasCalculator();