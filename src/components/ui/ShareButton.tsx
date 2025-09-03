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

  // OKLCH를 RGB로 변환하는 매핑 테이블
  const oklchToRgbMap: { [key: string]: string } = {
    // Tailwind CSS 기본 색상들의 OKLCH -> RGB 매핑
    // Gray colors
    'oklch(98.5% 0.000 0)': 'rgb(249, 250, 251)', // gray-50
    'oklch(96.7% 0.000 0)': 'rgb(243, 244, 246)', // gray-100
    'oklch(92.8% 0.000 0)': 'rgb(229, 231, 235)', // gray-200
    'oklch(87.2% 0.000 0)': 'rgb(209, 213, 219)', // gray-300
    'oklch(70.7% 0.000 0)': 'rgb(156, 163, 175)', // gray-400
    'oklch(55.1% 0.000 0)': 'rgb(107, 114, 128)', // gray-500
    'oklch(44.6% 0.000 0)': 'rgb(75, 85, 99)',   // gray-600
    'oklch(37.3% 0.000 0)': 'rgb(55, 65, 81)',   // gray-700
    'oklch(27.8% 0.000 0)': 'rgb(31, 41, 55)',   // gray-800
    'oklch(21% 0.000 0)': 'rgb(17, 24, 39)',     // gray-900
    
    // Blue colors
    'oklch(62.3% 0.229 264.1)': 'rgb(59, 130, 246)', // blue-500
    'oklch(54.6% 0.227 263.1)': 'rgb(37, 99, 235)',  // blue-600
    'oklch(48.8% 0.216 262.3)': 'rgb(29, 78, 216)',  // blue-700
    
    // Green colors
    'oklch(70.7% 0.137 154.8)': 'rgb(16, 185, 129)', // emerald-500
    'oklch(75.8% 0.131 152.7)': 'rgb(34, 197, 94)',  // green-500
    
    // Orange/Yellow colors
    'oklch(78.8% 0.130 83.3)': 'rgb(245, 158, 11)',  // amber-500
    'oklch(76.9% 0.156 66.2)': 'rgb(249, 115, 22)',  // orange-500
    
    // Red colors
    'oklch(62.8% 0.257 29.0)': 'rgb(239, 68, 68)',   // red-500
  };

  // 원본 DOM을 복제하면서 OKLCH 색상만 RGB로 변환
  const createOklchSafeClone = (element: HTMLElement) => {
    const clone = element.cloneNode(true) as HTMLElement;
    
    // data-hide-in-export 요소 제거
    const hideElements = clone.querySelectorAll('[data-hide-in-export="true"]');
    hideElements.forEach(el => el.remove());
    
    // 모바일 최적화 컨테이너 스타일 적용
    clone.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 375px !important;
      max-width: 375px !important;
      background: rgb(255, 255, 255) !important;
      padding: 16px !important;
      box-sizing: border-box !important;
      font-family: -apple-system, BlinkMacSystemFont, system-ui, sans-serif !important;
      margin: 0 !important;
    `;
    
    // 모든 하위 요소의 OKLCH 색상을 RGB로 변환
    const walker = document.createTreeWalker(
      clone,
      NodeFilter.SHOW_ELEMENT,
      null
    );
    
    const elements: Element[] = [clone];
    let node;
    while ((node = walker.nextNode())) {
      elements.push(node as Element);
    }
    
    elements.forEach(el => {
      if (!(el instanceof HTMLElement)) return;
      
      const style = el.style;
      const computedStyle = window.getComputedStyle(el);
      
      // 모든 스타일 속성을 확인하고 OKLCH 색상 변환
      ['color', 'background-color', 'border-color', 'background', 'background-image'].forEach(prop => {
        // 인라인 스타일 처리
        const inlineValue = style.getPropertyValue(prop);
        if (inlineValue && inlineValue.includes('oklch')) {
          const convertedValue = convertOklchValues(inlineValue);
          style.setProperty(prop, convertedValue, 'important');
        }
        
        // 계산된 스타일 처리
        const computedValue = computedStyle.getPropertyValue(prop);
        if (computedValue && computedValue.includes('oklch')) {
          const convertedValue = convertOklchValues(computedValue);
          style.setProperty(prop, convertedValue, 'important');
        }
      });
      
      // 추가로 그라데이션과 특수 배경 처리
      if (computedStyle.backgroundImage && computedStyle.backgroundImage.includes('linear-gradient')) {
        const bgImage = computedStyle.backgroundImage;
        if (bgImage.includes('oklch')) {
          const converted = convertOklchValues(bgImage);
          style.setProperty('background-image', converted, 'important');
        } else {
          // 기존 그라데이션 유지
          style.setProperty('background-image', bgImage, 'important');
        }
      }
      
      // SVG 요소 처리
      if (el.tagName === 'svg') {
        el.style.setProperty('display', 'block', 'important');
        el.style.setProperty('visibility', 'visible', 'important');
      }
      
      // 원형 차트의 stroke 색상 처리
      if (el.tagName === 'circle' && el.hasAttribute('stroke')) {
        const strokeColor = el.getAttribute('stroke');
        if (strokeColor && strokeColor.includes('oklch')) {
          const convertedColor = convertOklchValues(strokeColor);
          el.setAttribute('stroke', convertedColor);
        }
      }
    });
    
    return clone;
  };
  
  // OKLCH 값들을 RGB로 변환하는 함수
  const convertOklchValues = (cssValue: string): string => {
    let converted = cssValue;
    
    // 매핑 테이블을 사용하여 변환
    Object.entries(oklchToRgbMap).forEach(([oklch, rgb]) => {
      converted = converted.replace(new RegExp(oklch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), rgb);
    });
    
    // 남은 일반적인 OKLCH 패턴들을 기본값으로 변환
    converted = converted.replace(/oklch\([^)]+\)/g, (match) => {
      // 기본 변환 로직
      if (match.includes('98.') || match.includes('96.')) return 'rgb(255, 255, 255)';
      if (match.includes('21') || match.includes('27.')) return 'rgb(17, 24, 39)';
      return 'rgb(107, 114, 128)'; // 기본 회색
    });
    
    return converted;
  };

  const handleDownload = async () => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    let clonedElement: HTMLElement | null = null;
    
    try {
      console.log('🚀 실제 결과 페이지 기반 이미지 생성 시작...');
      
      // 실제 결과 요소 찾기
      const originalElement = document.getElementById(resultElementId);
      if (!originalElement) {
        throw new Error('결과 요소를 찾을 수 없습니다.');
      }
      
      console.log('📋 원본 DOM 복제 및 OKLCH 변환 중...');
      // 원본 DOM을 복제하면서 OKLCH 문제만 해결
      clonedElement = createOklchSafeClone(originalElement);
      
      // DOM에 추가 (화면 밖에)
      clonedElement.style.position = 'absolute';
      clonedElement.style.top = '-9999px';
      clonedElement.style.left = '-9999px';
      clonedElement.style.visibility = 'visible';
      clonedElement.style.opacity = '1';
      
      document.body.appendChild(clonedElement);
      
      console.log('⏱️ 레이아웃과 스타일 안정화 대기 중...');
      // 충분한 렌더링 시간 확보
      await new Promise(resolve => setTimeout(resolve, 800));
      
      console.log('🖼️ 개인화된 결과로 HTML2Canvas 실행 중...');
      // HTML2Canvas 실행
      const canvas = await html2canvas(clonedElement, {
        backgroundColor: 'rgb(255, 255, 255)',
        scale: 2,
        useCORS: true,
        allowTaint: false,
        width: 375,
        height: clonedElement.scrollHeight,
        logging: false,
        // SVG 렌더링 향상
        foreignObjectRendering: true,
        // 추가 안정성 옵션
        removeContainer: false,
        imageTimeout: 15000,
        // OKLCH 변환된 스타일 인식을 위한 옵션
        onclone: (clonedDoc, element) => {
          // 복제된 문서에서도 애니메이션 비활성화
          const style = clonedDoc.createElement('style');
          style.textContent = `
            *, *::before, *::after {
              animation-duration: 0s !important;
              animation-delay: 0s !important;
              transition-duration: 0s !important;
              transition-delay: 0s !important;
            }
          `;
          clonedDoc.head.appendChild(style);
        }
      });
      
      console.log('✅ 개인화된 결과 캔버스 완성!', `${canvas.width}x${canvas.height}`);

      // 빈 이미지 검증 (더 정교한 검사)
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('캔버스 컨텍스트를 가져올 수 없습니다.');
      }
      
      // 샘플링으로 빈 이미지 검사
      const sampleSize = Math.min(100, canvas.width);
      const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize);
      const hasContent = imageData.data.some((pixel, index) => {
        // 완전히 흰색이 아닌 픽셀이 있는지 확인
        if (index % 4 === 3) return false; // 알파 채널 무시
        return pixel < 250; // 거의 흰색이 아닌 픽셀
      });
      
      if (!hasContent) {
        throw new Error('생성된 이미지가 비어있거나 내용을 찾을 수 없습니다.');
      }

      console.log('💾 개인화된 결과 이미지 다운로드 시작...');
      // 다운로드 실행
      const dataURL = canvas.toDataURL('image/png', 0.95);
      const link = document.createElement('a');
      const timestamp = new Date().toISOString().slice(0, 16).replace('T', '-').replace(':', '');
      link.download = `편향성테스트결과-${percentage}%-${timestamp}.png`;
      link.href = dataURL;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('🎉 개인화된 테스트 결과 다운로드 완료!');
      
    } catch (error) {
      console.error('💥 이미지 다운로드 실패:', error);
      alert(`이미지 다운로드에 실패했습니다.\n\n오류 내용: ${error.message || '알 수 없는 오류'}\n\n다시 시도해주세요.`);
    } finally {
      if (clonedElement && document.body.contains(clonedElement)) {
        document.body.removeChild(clonedElement);
      }
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px 16px',
        backgroundColor: isDownloading ? 'rgb(107, 114, 128)' : 'rgb(37, 99, 235)',
        color: 'rgb(255, 255, 255)',
        borderRadius: '8px',
        fontWeight: '500',
        border: 'none',
        cursor: isDownloading ? 'not-allowed' : 'pointer',
        fontSize: '14px',
        transition: 'background-color 0.2s',
        opacity: isDownloading ? 0.5 : 1,
        ...parseStyleString(className)
      }}
      onMouseEnter={(e) => {
        if (!isDownloading) {
          e.currentTarget.style.backgroundColor = 'rgb(29, 78, 216)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isDownloading) {
          e.currentTarget.style.backgroundColor = 'rgb(37, 99, 235)';
        }
      }}
    >
      <ArrowDownTrayIcon 
        style={{ 
          width: '20px', 
          height: '20px', 
          marginRight: '8px' 
        }} 
      />
      {isDownloading ? '생성 중...' : buttonText}
    </button>
  );
}

// 간단한 className 파서 (필요한 경우)
function parseStyleString(className: string) {
  // className에서 추가 스타일 파싱 (필요시)
  return {};
}