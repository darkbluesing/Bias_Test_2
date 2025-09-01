import { biasQuestions } from '@/data/questions';
import { getBiasCategory, mapToMainCategory } from '@/data/solutions';
import { TestResult } from '@/types';

const weights = [0, 1, 2, 3, 4];
const maxScorePerQuestion = Math.max(...weights);
const totalQuestions = biasQuestions.length;
const maxTotalScore = maxScorePerQuestion * totalQuestions;

export function calculateBias(userAnswers: number[]): TestResult {
  const totalScore = userAnswers.reduce((sum, answerIndex) => {
    return sum + weights[answerIndex];
  }, 0);

  const percentage = Math.round((totalScore / maxTotalScore) * 100);

  const biasCategory = getBiasCategory(percentage);

  const mainCategory = mapToMainCategory(biasCategory.category);

  const result: TestResult = {
    totalScore,
    percentage,
    category: mainCategory,
    solutions: biasCategory.solutions,
    completedAt: new Date().toISOString(),
  };

  return result;
}
