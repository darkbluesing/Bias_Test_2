'use client';

import { useState, useEffect } from 'react';
import { Question } from '@/types';
import { useBiasTestStore } from '@/lib/store';

interface QuestionCardProps {
  question: Question;
  onAnswer: (score: number) => void;
  selectedAnswer?: number;
  className?: string;
}

export function QuestionCard({ question, onAnswer, selectedAnswer, className = '' }: QuestionCardProps) {
  const { language } = useBiasTestStore();
  
  const [selected, setSelected] = useState<number | undefined>(selectedAnswer);

  // selectedAnswer가 변경될 때마다 로컬 상태 동기화
  useEffect(() => {
    setSelected(selectedAnswer);
  }, [selectedAnswer, question.id]);

  const handleOptionClick = (score: number) => {
    console.log(`📝 QuestionCard ${question.id} 답변 선택: ${score}`);

    // 중복 선택 방지
    if (selected === score) {
      console.log('⚠️ 동일한 답변 선택 - 무시');
      return;
    }
    
    // UI 상태 즉시 업데이트
    setSelected(score);
    
    // 상위 컴포넌트로 전달 (중복 방지는 상위에서 처리)
    onAnswer(score);
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg p-8 ${className}`} style={{ minHeight: '500px' }}>
      {/* 광고 공간 - 상단 */}
      <div className="mb-8">
        <div className="bg-gray-100 rounded-lg h-16 flex items-center justify-center text-gray-500 text-sm">
          광고 공간 (728x90 / 320x50)
        </div>
      </div>

      {/* 질문 번호와 제목 */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <span className="inline-flex items-center justify-center w-10 h-10 bg-pink-100 text-pink-600 rounded-full text-lg font-bold">
            {question.id}
          </span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-relaxed">
          {question.text[language]}
        </h2>
      </div>

      {/* 선택지 버튼들 - PDF 샘플과 동일한 스타일 */}
      <div className="space-y-4 mb-8">
        {question.options.map((option, index) => (
          <button
            key={`${question.id}-${index}-${option.score}`}
            onClick={() => handleOptionClick(option.score)}
            className={`
              w-full p-6 rounded-xl border-2 text-left font-medium text-lg transition-all duration-200
              ${
                selected === option.score
                  ? 'bg-blue-50 border-blue-300 text-blue-800 shadow-md'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300'
              }
            `}
          >
            {option.text[language]}
          </button>
        ))}
      </div>

      {/* 광고 공간 - 하단 */}
      <div className="mt-8">
        <div className="bg-gray-100 rounded-lg h-16 flex items-center justify-center text-gray-500 text-sm">
          광고 공간 (728x90 / 320x50)
        </div>
      </div>
    </div>
  );
}