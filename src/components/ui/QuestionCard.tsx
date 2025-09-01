'use client';

import { useState, useEffect } from 'react';
import { Question } from '@/types';
import { useBiasTestStore } from '@/lib/store';
import { Button } from './Button';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer?: number;
  onAnswerSelect: (optionIndex: number) => void;
  onPrevious: () => void;
  isFirstQuestion: boolean;
  translations: { [key: string]: string };
  className?: string;
}

export function QuestionCard({ 
  question, 
  questionNumber,
  selectedAnswer, 
  onAnswerSelect,
  onPrevious,
  isFirstQuestion,
  translations,
  className = '' 
}: QuestionCardProps) {
  const { language } = useBiasTestStore();
  
  // This local state is for immediate UI feedback when an answer is selected.
  const [selected, setSelected] = useState<number | undefined>(selectedAnswer);

  // Sync local state with the global state from the parent component.
  useEffect(() => {
    setSelected(selectedAnswer);
  }, [selectedAnswer, question?.id]);

  const handleOptionClick = (optionIndex: number) => {
    // Prevent re-triggering navigation if the same answer is clicked again.
    if (selected === optionIndex) return;

    setSelected(optionIndex);
    onAnswerSelect(optionIndex);
  };

  // Gracefully handle cases where the question object might not be available yet.
  if (!question) {
    return null;
  }

  return (
    <div className={className}>
      <div className="bg-white rounded-xl shadow-lg p-8" style={{ minHeight: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div className="mb-4">
            <div className="flex items-start mb-3">
              <span className="inline-flex items-center justify-center w-8 h-8 bg-pink-100 text-pink-600 rounded-full text-base font-bold mr-4 mt-1 flex-shrink-0">
                {questionNumber}
              </span>
              <h2 className="text-lg md:text-xl font-bold text-gray-900 leading-relaxed">
                {question.text[language]}
              </h2>
            </div>
          </div>

          <div className="space-y-3 mt-8">
            {question.options.map((option, index) => (
              <button
                key={`${question.id}-${index}`}
                onClick={() => handleOptionClick(index)}
                className={`w-full p-4 rounded-xl border-2 text-left font-medium text-base transition-all duration-200 ${
                  selected === index
                    ? 'bg-blue-50 border-blue-300 text-blue-800 shadow-md'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300'
                }`}
              >
                {option[language]}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-start">
          <Button 
            onClick={onPrevious} 
            disabled={isFirstQuestion}
            variant="secondary"
          >
            {translations.previous}
          </Button>
        </div>
      </div>
    </div>
  );
}