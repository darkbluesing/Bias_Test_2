'use client';

import { useState } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import html2canvas from 'html2canvas';

interface ShareButtonProps {
  resultElementId?: string;
  percentage: number;
  className?: string;
  buttonText?: string;
}

export function ShareButton({ 
  percentage,
  className = '', 
  buttonText = '결과 다운로드',
  resultElementId = 'result-container'
}: ShareButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    try {
      console.log('이미지 다운로드 시작...');
      
      // 결과 요소를 찾습니다
      const element = document.getElementById(resultElementId);
      if (!element) {
        console.error('결과 요소를 찾을 수 없습니다:', resultElementId);
        throw new Error('결과 요소를 찾을 수 없습니다.');
      }
      
      console.log('html2canvas로 이미지 생성 중...');
      
      // html2canvas를 사용하여 이미지 생성 - 최적화된 옵션
      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2, // 고해상도
        useCORS: true,
        allowTaint: false, // 보안 정책에 맞게 false로 변경
        width: element.offsetWidth,
        height: element.offsetHeight,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        logging: false // 로깅 비활성화
      });
      
      console.log('캔버스 생성 완료, 다운로드 준비 중...');

      // 다운로드 링크 생성
      const dataURL = canvas.toDataURL('image/png', 0.9);
      const link = document.createElement('a');
      link.download = `bias-test-result-${percentage.toFixed(1)}%.png`;
      link.href = dataURL;
      
      // 다운로드 실행
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('이미지 다운로드 완료');
    } catch (error) {
      console.error('이미지 다운로드 실패:', error);
      alert(`이미지 다운로드에 실패했습니다: ${error.message || '알 수 없는 오류'}`);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className={`inline-flex items-center justify-center bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
      {isDownloading ? '생성 중...' : buttonText}
    </button>
  );
}