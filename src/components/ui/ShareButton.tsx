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

  // 포괄적인 OKLCH -> RGB 변환 함수
  const convertOklchToRgb = (value: string): string => {
    if (!value.includes('oklch')) return value;
    
    // 다양한 OKLCH 패턴 매칭
    const oklchPatterns = [
      // Tailwind CSS 기본 색상들
      { pattern: /oklch\(62\.3%\s+[\.\d]*\s+[\d\.]*\)/, rgb: '#3b82f6' }, // blue-500
      { pattern: /oklch\(54\.6%\s+[\.\d]*\s+[\d\.]*\)/, rgb: '#2563eb' }, // blue-600
      { pattern: /oklch\(48\.8%\s+[\.\d]*\s+[\d\.]*\)/, rgb: '#1d4ed8' }, // blue-700
      { pattern: /oklch\(42\.4%\s+[\.\d]*\s+[\d\.]*\)/, rgb: '#1e40af' }, // blue-800
      { pattern: /oklch\(37\.9%\s+[\.\d]*\s+[\d\.]*\)/, rgb: '#1e3a8a' }, // blue-900
      
      // Gray 색상들
      { pattern: /oklch\(98\.5%\s+[\.\d]*\s+[\d\.]*\)/, rgb: '#f9fafb' }, // gray-50
      { pattern: /oklch\(96\.7%\s+[\.\d]*\s+[\d\.]*\)/, rgb: '#f3f4f6' }, // gray-100
      { pattern: /oklch\(92\.8%\s+[\.\d]*\s+[\d\.]*\)/, rgb: '#e5e7eb' }, // gray-200
      { pattern: /oklch\(87\.2%\s+[\.\d]*\s+[\d\.]*\)/, rgb: '#d1d5db' }, // gray-300
      { pattern: /oklch\(70\.7%\s+[\.\d]*\s+[\d\.]*\)/, rgb: '#9ca3af' }, // gray-400
      { pattern: /oklch\(55\.1%\s+[\.\d]*\s+[\d\.]*\)/, rgb: '#6b7280' }, // gray-500
      { pattern: /oklch\(44\.6%\s+[\.\d]*\s+[\d\.]*\)/, rgb: '#4b5563' }, // gray-600
      { pattern: /oklch\(37\.3%\s+[\.\d]*\s+[\d\.]*\)/, rgb: '#374151' }, // gray-700
      { pattern: /oklch\(27\.8%\s+[\.\d]*\s+[\d\.]*\)/, rgb: '#1f2937' }, // gray-800
      { pattern: /oklch\(21%\s+[\.\d]*\s+[\d\.]*\)/, rgb: '#111827' },   // gray-900
      
      // 기타 색상들 - 일반적인 폴백
      { pattern: /oklch\([89]\d%\s+[\.\d]*\s+[\d\.]*\)/, rgb: '#ffffff' }, // 80-99% lightness -> white
      { pattern: /oklch\([1-3]\d%\s+[\.\d]*\s+[\d\.]*\)/, rgb: '#000000' }  // 10-39% lightness -> black
    ];
    
    for (const { pattern, rgb } of oklchPatterns) {
      if (pattern.test(value)) {
        return value.replace(pattern, rgb);
      }
    }
    
    // 매칭되지 않는 OKLCH는 기본값으로 대체
    console.warn('Unmatched OKLCH color:', value);
    return value.replace(/oklch\([^)]+\)/g, '#ffffff');
  };

  // CSS 스타일 문자열에서 모든 OKLCH 색상을 변환
  const convertStyleString = (styleText: string): string => {
    return styleText.replace(/oklch\([^)]+\)/g, (match) => {
      return convertOklchToRgb(match);
    });
  };

  // 요소의 모든 계산된 스타일을 HTML2Canvas 호환 색상으로 변환하여 적용
  const applyCompatibleStyles = (source: Element, target: Element) => {
    const computedStyle = window.getComputedStyle(source);
    const targetElement = target as HTMLElement;
    
    // 중요한 스타일 속성들만 선택적으로 복사
    const importantProperties = [
      'background-color', 'color', 'border-color', 'border-top-color', 
      'border-right-color', 'border-bottom-color', 'border-left-color',
      'font-family', 'font-size', 'font-weight', 'font-style',
      'width', 'height', 'padding', 'margin', 'border', 'border-radius',
      'display', 'position', 'top', 'left', 'right', 'bottom',
      'text-align', 'line-height', 'box-shadow', 'opacity',
      'transform', 'z-index'
    ];
    
    importantProperties.forEach(property => {
      try {
        const value = computedStyle.getPropertyValue(property);
        if (value) {
          const convertedValue = convertOklchToRgb(value);
          targetElement.style.setProperty(property, convertedValue, 'important');
        }
      } catch (e) {
        console.warn(`Failed to set ${property}:`, e);
      }
    });
    
    // 텍스트 내용도 복사
    if (source.textContent && source.children.length === 0) {
      targetElement.textContent = source.textContent;
    }
  };

  // 요소와 모든 자식 요소를 HTML2Canvas 호환 형태로 복제
  const createCompatibleClone = (element: HTMLElement): HTMLElement => {
    const clone = element.cloneNode(false) as HTMLElement;
    
    // 소스 요소의 스타일 적용
    applyCompatibleStyles(element, clone);
    
    // 자식 요소들을 재귀적으로 처리
    Array.from(element.children).forEach(child => {
      if (child instanceof HTMLElement) {
        const clonedChild = createCompatibleClone(child);
        clone.appendChild(clonedChild);
      }
    });
    
    // 직접 텍스트 노드들 복사
    Array.from(element.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        clone.appendChild(node.cloneNode(true));
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
      
      console.log('HTML2Canvas 호환 형태로 요소 복제 중...');
      const clonedElement = createCompatibleClone(element);
      
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