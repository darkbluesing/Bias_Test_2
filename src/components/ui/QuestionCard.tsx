'use client';

import { useState, useEffect, useRef } from 'react';
import { RadioGroup } from '@headlessui/react';
import { Question } from '@/types';
import { useBiasTestStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';

interface QuestionCardProps {
  question: Question;
  onAnswer: (score: number) => void;
  selectedAnswer?: number;
  className?: string;
}

export function QuestionCard({ question, onAnswer, selectedAnswer, className = '' }: QuestionCardProps) {
  const { language } = useBiasTestStore();
  const t = getTranslation(language);
  
  const [selected, setSelected] = useState<number | undefined>(selectedAnswer);
  const isProcessingRef = useRef(false);
  const lastAnswerRef = useRef<number | undefined>(undefined);

  // selectedAnswer가 변경될 때마다 로컬 상태 업데이트
  useEffect(() => {
    setSelected(selectedAnswer);
    lastAnswerRef.current = selectedAnswer;
  }, [selectedAnswer, question.id]);

  // 질문이 변경될 때 처리 상태 초기화
  useEffect(() => {
    isProcessingRef.current = false;
    lastAnswerRef.current = selectedAnswer;
  }, [question.id]);

  const handleChange = (value: string) => {
    console.log('handleChange 호출:', {
      questionId: question.id,
      value,
      isProcessing: isProcessingRef.current,
      lastAnswer: lastAnswerRef.current
    });

    // 이미 처리 중이면 중복 방지
    if (isProcessingRef.current) {
      console.log('처리 중이므로 중복 호출 방지');
      return;
    }

    const score = parseInt(value);
    
    // 같은 답변 중복 선택 방지
    if (lastAnswerRef.current === score) {
      console.log('동일한 답변 중복 선택 방지:', score);
      return;
    }

    isProcessingRef.current = true;
    setSelected(score);
    lastAnswerRef.current = score;
    
    // 작은 딜레이 후 onAnswer 호출
    setTimeout(() => {
      onAnswer(score);
      // 처리 완료 후 상태 초기화 (더 긴 딜레이)
      setTimeout(() => {
        isProcessingRef.current = false;
      }, 100);
    }, 50);
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 md:p-8 ${className}`}>
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
              key={index}
              value={option.score.toString()}
              className={({ checked, active }) =>
                `${
                  checked
                    ? 'bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200 ring-2 ring-pink-300'
                    : 'bg-white border-gray-300 hover:bg-pink-25'
                }
                ${active ? 'ring-2 ring-offset-2 ring-pink-300' : ''}
                relative flex cursor-pointer rounded-lg px-5 py-4 border focus:outline-none transition-all duration-200`
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