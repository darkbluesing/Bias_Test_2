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

      // 캡처에서 제외할 요소들 선택 및 숨김
      const elementsToHide = [
        // 광고 공간들
        ...Array.from(document.querySelectorAll('[data-hide-in-export="true"]')),
        // 액션 버튼들 (공유하기, 재테스트하기)
        ...Array.from(document.querySelectorAll('[data-share-button]')),
        ...Array.from(document.querySelectorAll('button')).filter(btn => 
          btn.textContent?.includes('다시 테스트하기') || 
          btn.textContent?.includes('결과 공유하기')
        ),
        // 광고 관련 div들
        ...Array.from(document.querySelectorAll('div')).filter(div => 
          div.textContent?.includes('광고 공간')
        )
      ];

      // 기존 스타일 백업 및 숨김
      const originalStyles: Array<{element: HTMLElement, display: string}> = [];
      elementsToHide.forEach(el => {
        const htmlEl = el as HTMLElement;
        originalStyles.push({
          element: htmlEl,
          display: htmlEl.style.display
        });
        htmlEl.style.display = 'none';
      });

      // 잠시 대기 (DOM 업데이트 완료 위해)
      await new Promise(resolve => setTimeout(resolve, 100));

      // 향상된 캡처 옵션
      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 3, // 고품질을 위해 스케일 증가
        logging: false,
        useCORS: true,
        allowTaint: false,
        foreignObjectRendering: false,
        imageTimeout: 15000,
        removeContainer: true,
        width: element.offsetWidth,
        height: element.offsetHeight
      });

      // 이미지 다운로드
      const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '');
      canvas.toBlob((blob) => {
        if (blob) {
          const link = document.createElement('a');
          link.download = `편견테스트결과_${percentage}%_${timestamp}.png`;
          link.href = URL.createObjectURL(blob);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(link.href);
        }
      }, 'image/png', 0.95);

      // 원래 스타일 복원
      originalStyles.forEach(({element, display}) => {
        element.style.display = display;
      });

    } catch (error) {
      console.error('이미지 생성 오류:', error);
      alert('이미지 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
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