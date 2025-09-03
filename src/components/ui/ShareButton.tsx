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

  // 요소의 모든 계산된 스타일을 인라인으로 복사하는 함수
  const copyComputedStyles = (source: Element, target: Element) => {
    const computedStyle = window.getComputedStyle(source);
    const targetElement = target as HTMLElement;
    
    // 모든 CSS 속성 복사
    for (let i = 0; i < computedStyle.length; i++) {
      const property = computedStyle[i];
      const value = computedStyle.getPropertyValue(property);
      
      // OKLCH 색상을 RGB로 변환
      let convertedValue = value;
      if (value.includes('oklch')) {
        // OKLCH를 RGB로 변환하는 간단한 매핑
        const oklchToRgbMap: { [key: string]: string } = {
          'oklch(62.3% 0.214 259.815)': 'rgb(59, 130, 246)',
          'oklch(54.6% 0.245 262.881)': 'rgb(37, 99, 235)',
          'oklch(48.8% 0.243 264.376)': 'rgb(29, 78, 216)',
          'oklch(98.5% 0.002 247.839)': 'rgb(249, 250, 251)',
          'oklch(96.7% 0.003 264.542)': 'rgb(243, 244, 246)',
          'oklch(92.8% 0.006 264.531)': 'rgb(229, 231, 235)',
          'oklch(87.2% 0.01 258.338)': 'rgb(209, 213, 219)',
          'oklch(70.7% 0.022 261.325)': 'rgb(156, 163, 175)',
          'oklch(55.1% 0.027 264.364)': 'rgb(107, 114, 128)',
          'oklch(44.6% 0.03 256.802)': 'rgb(75, 85, 99)',
          'oklch(37.3% 0.034 259.733)': 'rgb(55, 65, 81)',
          'oklch(27.8% 0.033 256.848)': 'rgb(31, 41, 55)',
          'oklch(21% 0.034 264.665)': 'rgb(17, 24, 39)'
        };
        convertedValue = oklchToRgbMap[value] || value;
      }
      
      try {
        targetElement.style.setProperty(property, convertedValue, computedStyle.getPropertyPriority(property));
      } catch (e) {
        // 일부 속성은 설정할 수 없을 수 있음
      }
    }
  };

  // 요소와 모든 자식 요소의 스타일을 복사하는 함수
  const cloneElementWithStyles = (element: HTMLElement) => {
    const clone = element.cloneNode(false) as HTMLElement;
    copyComputedStyles(element, clone);
    
    // 자식 요소들도 재귀적으로 복사
    for (let i = 0; i < element.children.length; i++) {
      const childElement = element.children[i] as HTMLElement;
      const clonedChild = cloneElementWithStyles(childElement);
      clone.appendChild(clonedChild);
    }
    
    // 텍스트 노드 복사
    for (let i = 0; i < element.childNodes.length; i++) {
      const node = element.childNodes[i];
      if (node.nodeType === Node.TEXT_NODE) {
        clone.appendChild(node.cloneNode(true));
      }
    }
    
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
      
      console.log('모든 스타일과 함께 요소 복제 중...');
      const clonedElement = cloneElementWithStyles(element);
      
      // 복제된 요소를 임시로 DOM에 추가 (보이지 않게)
      clonedElement.style.position = 'fixed';
      clonedElement.style.top = '-9999px';
      clonedElement.style.left = '-9999px';
      clonedElement.style.zIndex = '-9999';
      clonedElement.style.visibility = 'hidden';
      clonedElement.style.pointerEvents = 'none';
      document.body.appendChild(clonedElement);
      
      // DOM이 업데이트될 시간을 줌
      await new Promise(resolve => setTimeout(resolve, 100));
      
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
      className={`inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
      {isDownloading ? '생성 중...' : buttonText}
    </button>
  );
}