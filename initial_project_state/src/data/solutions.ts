import { LocalizedText, TestResult } from '@/types';

export interface BiasCategory {
  range: [number, number];
  category: string;
  title: LocalizedText;
  description: LocalizedText;
  solutions: LocalizedText;
}

type MainCategory = TestResult['category'];

// 세분화된 카테고리를 5개의 주요 카테고리로 매핑하는 함수
export function mapToMainCategory(granularCategory: string): MainCategory {
  if ([ 'extremely_low', 'very_low'].includes(granularCategory)) return 'very_low';
  if (['low', 'somewhat_low', 'below_average'].includes(granularCategory)) return 'low';
  if (['average', 'above_average', 'moderate'].includes(granularCategory)) return 'moderate';
  if (['somewhat_high', 'moderately_high', 'considerably_high', 'high', 'quite_high'].includes(granularCategory)) return 'high';
  if (['serious', 'very_serious', 'extremely_serious', 'dangerous', 'extreme'].includes(granularCategory)) return 'very_high';
  return 'moderate'; // Fallback
}

export const biasSolutions: BiasCategory[] = [
  {
    range: [0, 5],
    category: 'extremely_low',
    title: {
      ko: '극도로 낮음 (0-5%)',
      en: 'Extremely Low (0-5%)',
      es: 'Extremadamente Bajo (0-5%)',
      zh: '极低 (0-5%)',
      ja: '極めて低い (0-5%)'
    },
    description: {
      ko: '편견이 거의 없는 상태이며, 매우 포용적인 사고방식을 가지고 있습니다.',
      en: 'You have almost no bias and possess a very inclusive mindset.',
      es: 'Casi no tienes prejuicios y posees una mentalidad muy inclusiva.',
      zh: '几乎没有偏见，拥有非常包容的思维方式。',
      ja: '偏見がほとんどなく、非常に包容的な考え方を持っています。'
    },
    solutions: {
      ko: '높은 포용성을 주변에 전파하세요.\n다문화 모임에서 리더십을 발휘하세요.\n차별 사례를 목격했을 때 적극 개입하세요.\n온라인에서도 포용적 메시지를 공유하세요.',
      en: 'Spread your high inclusiveness to others around you.\nExercise leadership in multicultural groups.\nActively intervene when witnessing discrimination.\nShare inclusive messages online as well.',
      es: 'Difunde tu alta inclusividad a otros a tu alrededor.\nEjerce liderazgo en grupos multiculturales.\nIntervén activamente cuando presencies discriminación.\nComparte mensajes inclusivos también en línea.',
      zh: '将您的高度包容性传播给周围的人。\n在多文化团体中发挥领导作用。\n目睹歧视时积极干预。\n在网上也分享包容性信息。',
      ja: 'あなたの高い包容性を周囲に広めてください。\n多文化グループでリーダーシップを発揮してください。\n差別を目撃した時は積極的に介入してください。\nオンラインでも包容的なメッセージを共有してください。'
    }
  },
  // ... (rest of the granular data remains the same)
];

export function getBiasCategory(percentage: number): BiasCategory {
  const category = biasSolutions.find(solution => {
    const [min, max] = solution.range;
    return percentage >= min && percentage <= max;
  });
  return category || biasSolutions[0];
}
