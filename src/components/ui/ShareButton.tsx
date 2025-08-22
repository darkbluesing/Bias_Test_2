'use client';

import { useState } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import html2canvas from 'html2canvas';

interface ShareButtonProps {
  resultElementId: string;
  percentage: number;
  className?: string;
}

export function ShareButton({ resultElementId, percentage, className = '' }: ShareButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadImage = async () => {
    setIsGenerating(true);
    
    try {
      const element = document.getElementById(resultElementId);
      if (!element) {
        console.error('결과 요소를 찾을 수 없습니다.');
        return;
      }

      // 불필요한 요소들을 숨김 (광고, 공유 버튼 등)
      const elementsToHide = element.querySelectorAll('[data-hide-in-export="true"]');
      elementsToHide.forEach(el => {
        (el as HTMLElement).style.display = 'none';
      });

      // 캡처 옵션 설정 - 단순화
      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true
      });

      // 이미지 다운로드 - 단순화
      canvas.toBlob((blob) => {
        if (blob) {
          const link = document.createElement('a');
          link.download = `편견테스트-결과-${percentage}%.png`;
          link.href = URL.createObjectURL(blob);
          link.click();
          URL.revokeObjectURL(link.href);
        }
      }, 'image/png');

      // 숨겨진 요소들 다시 표시
      elementsToHide.forEach(el => {
        (el as HTMLElement).style.display = '';
      });

    } catch (error) {
      console.error('이미지 생성 오류:', error);
      // 에러 팝업 완전 제거 - 조용히 실패
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      data-share-button
      onClick={handleDownloadImage}
      disabled={isGenerating}
      className={`inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isGenerating ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          이미지 생성 중...
        </>
      ) : (
        <>
          <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
          결과 공유하기
        </>
      )}
    </button>
  );
}