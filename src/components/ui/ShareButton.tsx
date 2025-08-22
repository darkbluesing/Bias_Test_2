'use client';

import { useState } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

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
        throw new Error('결과 요소를 찾을 수 없습니다.');
      }

      // 불필요한 요소들을 숨김 (광고, 공유 버튼 등)
      const elementsToHide = element.querySelectorAll('[data-hide-in-export="true"]');
      elementsToHide.forEach(el => {
        (el as HTMLElement).style.display = 'none';
      });

      // 캡처 옵션 설정 - PDF 샘플 크기에 맞춰서 조정
      const canvas = await html2canvas(element, {
        backgroundColor: '#f9fafb', // 배경색을 회색으로 설정
        scale: 2, // 고화질
        width: 400, // A4 비율에 맞춰 조정
        height: 600,
        useCORS: true,
        allowTaint: true,
        scrollX: 0,
        scrollY: 0,
        removeContainer: true,
      });

      // 워터마크 추가
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.font = '14px Arial';
        ctx.fillStyle = '#666666';
        ctx.textAlign = 'center';
        ctx.fillText('광고 공간 (728x90 / 320x50)', canvas.width / 2, canvas.height - 20);
      }

      // 이미지 다운로드
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `편견테스트-결과-${percentage}%.png`);
        }
      }, 'image/png');

      // 숨겨진 요소들 다시 표시
      elementsToHide.forEach(el => {
        (el as HTMLElement).style.display = '';
      });

    } catch (error) {
      console.error('이미지 생성 오류:', error);
      alert('이미지 생성 중 오류가 발생했습니다. 다시 시도해 주세요.');
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