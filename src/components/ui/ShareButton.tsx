'use client';

import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

interface ShareButtonProps {
  resultData: {
    percentage: number;
    userName: string;
    category: string;
    lang: string;
  };
  className?: string;
  buttonText?: string;
}

export function ShareButton({ 
  resultData,
  className = '', 
  buttonText = '결과 다운로드' 
}: ShareButtonProps) {

  // API URL을 생성합니다.
  const query = new URLSearchParams({
    percentage: resultData.percentage.toString(),
    userName: resultData.userName,
    category: resultData.category,
    lang: resultData.lang,
  }).toString();

  const apiUrl = `/api/generate-image?${query}`;

  return (
    <a
      href={apiUrl}
      download="result.png"
      target="_blank" // 새 탭에서 열어 다운로드 실패 시에도 사용자가 이미지를 볼 수 있도록 함
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${className}`}
    >
      <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
      {buttonText}
    </a>
  );
}