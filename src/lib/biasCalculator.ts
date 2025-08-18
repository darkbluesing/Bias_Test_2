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
    try {
      console.log('BiasCalculator.calculateResult 시작:', {
        answersLength: answers?.length || 0,
        totalQuestions: this.totalQuestions,
        language,
        sampleAnswers: answers ? [...(answers.slice(0, 5) || []), '...', ...(answers.slice(-5) || [])] : []
      });
    } catch (logError) {
      console.error('로깅 오류:', logError);
    }

    // 입력 검증
    if (!Array.isArray(answers)) {
      throw new Error(`답변이 배열이 아닙니다: ${typeof answers}`);
    }

    if (answers.length !== this.totalQuestions) {
      throw new Error(`Expected ${this.totalQuestions} answers, got ${answers.length}`);
    }

    // undefined/null 검증
    const invalidAnswers = answers.map((answer, index) => 
      (answer === undefined || answer === null) ? index + 1 : null
    ).filter(x => x !== null);

    if (invalidAnswers.length > 0) {
      throw new Error(`Invalid answers at questions: ${invalidAnswers.join(', ')}`);
    }

    // 점수 범위 검증
    const invalidScores = answers.map((answer, index) => 
      (typeof answer !== 'number' || answer < 0 || answer > 3) ? { question: index + 1, score: answer } : null
    ).filter(x => x !== null);

    if (invalidScores.length > 0) {
      throw new Error(`Invalid scores: ${invalidScores.map(s => `Q${s.question}:${s.score}`).join(', ')}`);
    }

    try {
      const totalScore = answers.reduce((sum, score) => sum + score, 0);
      const percentage = Math.round((totalScore / this.maxScore) * 100);
      
      console.log('점수 계산 결과:', {
        totalScore,
        maxScore: this.maxScore,
        percentage
      });
      
      const biasCategory = getBiasCategory(percentage);
      console.log('편향 카테고리:', biasCategory);

      if (!biasCategory) {
        throw new Error(`Failed to determine bias category for percentage: ${percentage}`);
      }

      const result: TestResult = {
        totalScore,
        percentage,
        category: biasCategory.category,
        solutions: biasCategory.solutions,
        completedAt: new Date()
      };

      console.log('최종 결과 생성 완료:', result);
      return result;

    } catch (error) {
      console.error('BiasCalculator 내부 오류:', error);
      throw error;
    }
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