'use client';

import { useState } from 'react';
import { useBiasTestStore } from '@/lib/store';

export function DebugPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    currentQuestion, 
    answers, 
    userProfile, 
    result, 
    isTestCompleted 
  } = useBiasTestStore();

  // 개발 환경에서만 표시
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm font-mono"
        >
          DEBUG
        </button>
      </div>
    );
  }

  const validAnswers = answers.filter(a => a !== undefined && a !== null);
  const missingAnswers = [];
  for (let i = 0; i < 40; i++) {
    if (answers[i] === undefined || answers[i] === null) {
      missingAnswers.push(i + 1);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black text-white p-4 rounded-lg max-w-sm text-xs font-mono max-h-96 overflow-y-auto">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold">DEBUG PANEL</span>
        <button
          onClick={() => setIsOpen(false)}
          className="text-red-400 hover:text-red-300"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-2">
        <div>
          <span className="text-yellow-400">Question:</span> {currentQuestion + 1}/40
        </div>
        
        <div>
          <span className="text-yellow-400">Answers:</span> {validAnswers.length}/40
        </div>
        
        <div>
          <span className="text-yellow-400">Array Length:</span> {answers.length}
        </div>
        
        <div>
          <span className="text-yellow-400">Test Complete:</span> {isTestCompleted() ? 'YES' : 'NO'}
        </div>
        
        <div>
          <span className="text-yellow-400">User Name:</span> {userProfile.name || 'None'}
        </div>
        
        <div>
          <span className="text-yellow-400">Result:</span> {result ? 'EXISTS' : 'NULL'}
        </div>
        
        {missingAnswers.length > 0 && (
          <div>
            <span className="text-red-400">Missing:</span> {missingAnswers.slice(0, 10).join(', ')}
            {missingAnswers.length > 10 && '...'}
          </div>
        )}
        
        <div className="mt-2 pt-2 border-t border-gray-700">
          <div className="text-gray-400 text-xs">
            Last 5 answers: {answers.slice(-5).map(a => a ?? 'X').join(', ')}
          </div>
        </div>
        
        <div className="mt-2">
          <button
            onClick={() => {
              console.log('=== 전체 상태 덤프 ===');
              console.log('currentQuestion:', currentQuestion);
              console.log('answers:', answers);
              console.log('userProfile:', userProfile);
              console.log('result:', result);
              console.log('localStorage backup:', localStorage.getItem('bias-test-result-backup'));
            }}
            className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-xs"
          >
            Console Dump
          </button>
        </div>
      </div>
    </div>
  );
}