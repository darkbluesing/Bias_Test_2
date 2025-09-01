'use client';

import { useState, useEffect } from 'react';
import { Question } from '@/types';
import { useBiasTestStore } from '@/lib/store';

interface QuestionCardProps {
  question: Question;
  onAnswer: (optionIndex: number) => void;
  selectedAnswer?: number;
  questionNumber?: number;
  className?: string;
}

export function QuestionCard({ question, onAnswer, selectedAnswer, questionNumber, className = '' }: QuestionCardProps) {
  const { language } = useBiasTestStore();
  
  const [selected, setSelected] = useState<number | undefined>(selectedAnswer);

  // selectedAnswer가 변경될 때마다 로컬 상태 동기화
  useEffect(() => {
    setSelected(selectedAnswer);
  }, [selectedAnswer, question.id]);

  const handleOptionClick = (optionIndex: number) => {
    console.log(`📝 QuestionCard ${question.id} 답변 선택: ${optionIndex}`);

    // 중복 선택 방지
    if (selected === optionIndex) {
      console.log('⚠️ 동일한 답변 선택 - 무시');
      return;
    }
    
    // UI 상태 즉시 업데이트
    setSelected(optionIndex);
    
    // 상위 컴포넌트로 전달 (중복 방지는 상위에서 처리)
    onAnswer(optionIndex);
  };

  return (
    <div className={className}>
      {/* 메인 질문 컨테이너 - 확대된 크기 */}
      <div className="bg-white rounded-xl shadow-lg p-8" style={{ minHeight: '500px' }}>
        {/* 질문 번호와 제목 - 여백 축소 */}
        <div className="mb-4">
          <div className="flex items-start mb-3">
            <span className="inline-flex items-center justify-center w-8 h-8 bg-pink-100 text-pink-600 rounded-full text-base font-bold mr-4 mt-1 flex-shrink-0">
              {questionNumber || 1}
            </span>
            <h2 className="text-lg md:text-xl font-bold text-gray-900 leading-relaxed">
              {question.text[language]}
            </h2>
          </div>
        </div>

        {/* 선택지 버튼들 - 일관된 간격 */}
        <div className="space-y-3 mt-8">
          {question.options.map((option, index) => (
            <button
              key={`${question.id}-${index}`}
              onClick={() => handleOptionClick(index)}
              className={`
                w-full p-4 rounded-xl border-2 text-left font-medium text-base transition-all duration-200
                ${
                  selected === index
                    ? 'bg-blue-50 border-blue-300 text-blue-800 shadow-md'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300'
                }
              `}
            >
              {option[language]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}