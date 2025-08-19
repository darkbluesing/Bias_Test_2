'use client';

import { useState, useEffect } from 'react';
import { RadioGroup } from '@headlessui/react';
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

  const handleChange = (value: string) => {
    const score = parseInt(value);
    
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
    <div className={`bg-white rounded-xl shadow-lg p-6 md:p-8 ${className}`} style={{ minHeight: '450px' }}>
      <div className="mb-6">
        <div className="flex items-center mb-3">
          <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-600 rounded-full text-sm font-bold">
            {question.id}
          </span>
        </div>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 leading-relaxed">
          {question.text[language]}
        </h2>
      </div>

      <RadioGroup value={selected?.toString() || ''} onChange={handleChange}>
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <RadioGroup.Option
              key={`${question.id}-${index}-${option.score}`}
              value={option.score.toString()}
              disabled={false}
              className={({ checked, active }) =>
                `${
                  checked
                    ? 'bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200 ring-2 ring-pink-300'
                    : 'bg-white border-gray-300 hover:bg-pink-25'
                }
                ${active ? 'ring-2 ring-offset-2 ring-pink-300' : ''}
                cursor-pointer
                relative flex rounded-lg px-5 py-4 border focus:outline-none transition-all duration-200`
              }
            >
              {({ checked }) => (
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-sm">
                      <RadioGroup.Label
                        as="p"
                        className={`font-medium ${
                          checked ? 'text-pink-800' : 'text-gray-900'
                        }`}
                      >
                        {option.text[language]}
                      </RadioGroup.Label>
                    </div>
                  </div>
                  {checked && (
                    <div className="shrink-0 text-pink-600">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}