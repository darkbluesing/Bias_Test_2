'use client';

import { useBiasTestStore } from '@/lib/store';

interface StateDebuggerProps {
  enabled?: boolean;
}

export function StateDebugger({ enabled = process.env.NODE_ENV === 'development' }: StateDebuggerProps) {
  const { currentQuestion, answers, userProfile, language, isTestCompleted } = useBiasTestStore();
  
  if (!enabled) return null;

  const validAnswers = answers.filter(a => a !== undefined && a !== null);
  const invalidAnswers = answers.filter(a => a === undefined || a === null);

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white text-xs p-4 rounded-lg max-w-xs z-50">
      <h4 className="font-bold mb-2">State Debug</h4>
      <div className="space-y-1">
        <div>Question: {currentQuestion + 1}/40</div>
        <div>Answers: {answers.length} ({validAnswers.length} valid)</div>
        <div>User: {userProfile.name || 'None'}</div>
        <div>Lang: {language}</div>
        <div>Completed: {isTestCompleted() ? 'Yes' : 'No'}</div>
        {invalidAnswers.length > 0 && (
          <div className="text-red-300">Missing: {invalidAnswers.length}</div>
        )}
        <div className="mt-2 text-xs opacity-75">
          Sample: [{answers.slice(0, 3).join(', ')}, ...]
        </div>
      </div>
    </div>
  );
}