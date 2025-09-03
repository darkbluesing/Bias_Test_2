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

  // OKLCH 색상을 RGB로 변환하는 함수
  const convertOklchToRgb = (element: HTMLElement) => {
    const clone = element.cloneNode(true) as HTMLElement;
    const allElements = [clone, ...clone.querySelectorAll('*')] as HTMLElement[];
    
    // OKLCH 색상 매핑 (예시 색상들)
    const oklchToRgbMap: { [key: string]: string } = {
      'oklch(62.3% .214 259.815)': '#3b82f6', // blue-500
      'oklch(54.6% .245 262.881)': '#2563eb', // blue-600
      'oklch(48.8% .243 264.376)': '#1d4ed8', // blue-700
      'oklch(98.5% .002 247.839)': '#f9fafb', // gray-50
      'oklch(96.7% .003 264.542)': '#f3f4f6', // gray-100
      'oklch(92.8% .006 264.531)': '#e5e7eb', // gray-200
      'oklch(87.2% .01 258.338)': '#d1d5db',  // gray-300
      'oklch(70.7% .022 261.325)': '#9ca3af', // gray-400
      'oklch(55.1% .027 264.364)': '#6b7280', // gray-500
      'oklch(44.6% .03 256.802)': '#4b5563',  // gray-600
      'oklch(37.3% .034 259.733)': '#374151', // gray-700
      'oklch(27.8% .033 256.848)': '#1f2937', // gray-800
      'oklch(21% .034 264.665)': '#111827',   // gray-900
      '#fff': '#ffffff',
      '#000': '#000000'
    };
    
    allElements.forEach(el => {
      const computedStyle = window.getComputedStyle(el);
      const bgColor = computedStyle.backgroundColor;
      const color = computedStyle.color;
      const borderColor = computedStyle.borderColor;
      
      // 배경색 변환
      if (bgColor && bgColor.includes('oklch')) {
        const rgbColor = oklchToRgbMap[bgColor] || '#ffffff';
        el.style.backgroundColor = rgbColor;
      }
      
      // 텍스트 색상 변환
      if (color && color.includes('oklch')) {
        const rgbColor = oklchToRgbMap[color] || '#000000';
        el.style.color = rgbColor;
      }
      
      // 테두리 색상 변환
      if (borderColor && borderColor.includes('oklch')) {
        const rgbColor = oklchToRgbMap[borderColor] || '#e5e7eb';
        el.style.borderColor = rgbColor;
      }
    });
    
    return clone;
  };

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
      
      console.log('OKLCH 색상을 RGB로 변환 중...');
      const clonedElement = convertOklchToRgb(element);
      
      // 복제된 요소를 임시로 DOM에 추가 (보이지 않게)
      clonedElement.style.position = 'absolute';
      clonedElement.style.left = '-9999px';
      clonedElement.style.visibility = 'hidden';
      document.body.appendChild(clonedElement);
      
      console.log('html2canvas로 이미지 생성 중...');
      
      // html2canvas를 사용하여 이미지 생성
      const canvas = await html2canvas(clonedElement, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: false,
        width: element.offsetWidth,
        height: element.offsetHeight,
        logging: false
      });
      
      // 임시 요소 제거
      document.body.removeChild(clonedElement);
      
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