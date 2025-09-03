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

  // 불필요한 요소들을 제거하고 모바일 비율로 최적화된 복제본 생성
  const createMobileOptimizedClone = (element: HTMLElement) => {
    const clone = element.cloneNode(true) as HTMLElement;
    
    // data-hide-in-export="true" 요소들 제거
    const hideElements = clone.querySelectorAll('[data-hide-in-export="true"]');
    hideElements.forEach(el => el.remove());
    
    // 모바일 최적화 스타일 적용
    clone.style.cssText = `
      position: fixed;
      top: -9999px;
      left: -9999px;
      width: 375px !important;
      max-width: 375px !important;
      margin: 0 !important;
      padding: 16px !important;
      background-color: #ffffff !important;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif !important;
    `;
    
    // 내부 요소들에 모바일 최적화 스타일 적용
    const resultContainer = clone.querySelector('#result-container') || clone;
    if (resultContainer instanceof HTMLElement) {
      resultContainer.style.cssText = `
        background-color: #ffffff !important;
        border-radius: 12px !important;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
        overflow: visible !important;
        width: 100% !important;
        max-width: 343px !important;
        margin: 0 auto !important;
      `;
    }
    
    return clone;
  };

  // 모든 최신 CSS 색상 함수를 RGB로 강제 변환하는 스타일 생성
  const createColorFixStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
      /* 모든 요소의 색상을 RGB로 강제 설정 */
      * {
        color: inherit !important;
        background-color: inherit !important;
        border-color: inherit !important;
      }
      
      /* Tailwind 색상 클래스들을 RGB로 직접 매핑 */
      .text-gray-900, [class*="text-gray-900"] { color: #111827 !important; }
      .text-gray-800, [class*="text-gray-800"] { color: #1f2937 !important; }
      .text-gray-700, [class*="text-gray-700"] { color: #374151 !important; }
      .text-gray-600, [class*="text-gray-600"] { color: #4b5563 !important; }
      .text-gray-500, [class*="text-gray-500"] { color: #6b7280 !important; }
      .text-blue-600, [class*="text-blue-600"] { color: #2563eb !important; }
      
      .bg-white, [class*="bg-white"] { background-color: #ffffff !important; }
      .bg-gray-50, [class*="bg-gray-50"] { background-color: #f9fafb !important; }
      .bg-gray-100, [class*="bg-gray-100"] { background-color: #f3f4f6 !important; }
      
      .border-gray-200, [class*="border-gray-200"] { border-color: #e5e7eb !important; }
      
      /* 그라데이션 색상들 */
      .from-blue-200 { --tw-gradient-from: #dbeafe !important; }
      .to-cyan-200 { --tw-gradient-to: #a5f3fc !important; }
      .from-pink-200 { --tw-gradient-from: #fce7f3 !important; }
      .to-purple-200 { --tw-gradient-to: #e9d5ff !important; }
      
      /* 그림자 효과 */
      .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important; }
      
      /* 테두리 반경 */
      .rounded-xl { border-radius: 12px !important; }
      .rounded-lg { border-radius: 8px !important; }
      .rounded-full { border-radius: 9999px !important; }
      
      /* SVG와 그라데이션 요소 강화 */
      svg, svg * { 
        display: block !important; 
        visibility: visible !important; 
        opacity: 1 !important;
      }
      
      circle[stroke] { 
        stroke: currentColor !important; 
        fill: transparent !important;
        stroke-width: 24px !important;
      }
      
      /* 그라데이션 바 강화 */
      [style*="linear-gradient"] {
        background: linear-gradient(to right, #10b981, #22c55e, #f59e0b, #f97316, #ef4444) !important;
        display: block !important;
        visibility: visible !important;
      }
    `;
    return style;
  };

  // 모든 최신 CSS 색상 함수를 완전히 제거하고 안전한 RGB로 변환
  const fixInlineStyles = (element: HTMLElement) => {
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_ELEMENT,
      null
    );
    
    const nodes: HTMLElement[] = [element];
    let node: Node | null;
    
    while ((node = walker.nextNode())) {
      if (node instanceof HTMLElement) {
        nodes.push(node);
      }
    }
    
    nodes.forEach(el => {
      // 모든 CSS 속성을 확인하고 문제 색상 함수 제거
      const style = el.style;
      const computedStyle = window.getComputedStyle(el);
      
      // 모든 스타일 속성을 순회하며 색상 함수 확인
      for (let i = 0; i < style.length; i++) {
        const prop = style[i];
        const value = style.getPropertyValue(prop);
        
        // 문제가 되는 색상 함수들을 감지하고 제거
        if (value && (
          value.includes('oklch') || 
          value.includes('lab') || 
          value.includes('lch') || 
          value.includes('hwb') ||
          value.includes('color(')
        )) {
          // 해당 속성을 완전히 제거
          style.removeProperty(prop);
          
          // 가능한 경우 계산된 스타일로 대체
          const computedValue = computedStyle.getPropertyValue(prop);
          if (computedValue && !computedValue.includes('oklch') && !computedValue.includes('lab')) {
            try {
              style.setProperty(prop, computedValue, 'important');
            } catch (e) {
              console.warn(`Failed to set computed style for ${prop}:`, e);
            }
          }
        }
      }
      
      // 추가 안전 장치: 알려진 문제 속성들을 직접 처리
      ['color', 'background-color', 'border-color', 'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color'].forEach(prop => {
        const value = style.getPropertyValue(prop);
        if (value && (value.includes('oklch') || value.includes('lab'))) {
          style.removeProperty(prop);
          // 기본 안전 색상으로 설정
          if (prop === 'color') {
            style.setProperty(prop, '#000000', 'important');
          } else if (prop.includes('background')) {
            style.setProperty(prop, '#ffffff', 'important');
          } else if (prop.includes('border')) {
            style.setProperty(prop, '#e5e7eb', 'important');
          }
        }
      });
      
      // 클래스명 기반으로도 안전한 색상 적용
      if (el.className) {
        if (el.className.includes('text-gray-900')) {
          style.setProperty('color', '#111827', 'important');
        } else if (el.className.includes('text-gray-800')) {
          style.setProperty('color', '#1f2937', 'important');
        } else if (el.className.includes('text-gray-700')) {
          style.setProperty('color', '#374151', 'important');
        } else if (el.className.includes('bg-white')) {
          style.setProperty('background-color', '#ffffff', 'important');
        }
      }
    });
  };

  const handleDownload = async () => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    let tempStyle: HTMLStyleElement | null = null;
    let clonedElement: HTMLElement | null = null;
    
    try {
      console.log('🚀 이미지 다운로드 시작...');
      
      // 원본 결과 요소 찾기
      const originalElement = document.getElementById(resultElementId);
      if (!originalElement) {
        console.error('❌ 결과 요소를 찾을 수 없습니다:', resultElementId);
        throw new Error('결과 요소를 찾을 수 없습니다.');
      }
      
      console.log('📱 모바일 최적화된 복제본 생성 중...');
      // 모바일 최적화된 복제본 생성 (불필요한 요소 제거)
      clonedElement = createMobileOptimizedClone(originalElement);
      
      // 색상 문제 해결을 위한 스타일 추가
      tempStyle = createColorFixStyles();
      document.head.appendChild(tempStyle);
      
      // 복제본을 DOM에 임시 추가
      document.body.appendChild(clonedElement);
      
      console.log('🎨 인라인 스타일 색상 문제 해결 중...');
      // 복제본의 모든 인라인 스타일에서 문제 색상 제거
      fixInlineStyles(clonedElement);
      
      console.log('⏱️ 스타일 적용 대기 중...');
      // 스타일과 레이아웃이 적용될 시간을 충분히 줌
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('🖼️ html2canvas로 이미지 생성 중...');
      
      // 모바일 최적화된 복제본으로 캔버스 생성
      const canvas = await html2canvas(clonedElement, {
        backgroundColor: '#ffffff',
        scale: 3, // 고해상도를 위해 스케일 증가
        useCORS: true,
        allowTaint: true,
        width: 375, // 모바일 너비 고정
        height: clonedElement.scrollHeight,
        logging: false,
        // SVG와 그라데이션 렌더링 개선을 위한 옵션들
        foreignObjectRendering: true,
        removeContainer: true,
        // LAB/OKLCH 색상 함수 처리를 위한 추가 설정
        ignoreElements: (element) => {
          // 문제가 되는 스타일을 가진 요소들을 무시하지 않고 처리
          return false;
        },
        onclone: (clonedDoc, element) => {
          // 복제된 문서에서도 색상 스타일 적용
          const clonedStyle = clonedDoc.createElement('style');
          clonedStyle.textContent = tempStyle?.textContent || '';
          clonedDoc.head.appendChild(clonedStyle);
          
          // SVG 원형 차트를 깔끔한 카드형 디자인으로 대체
          const svgElements = element.querySelectorAll('svg');
          svgElements.forEach(svg => {
            const svgParent = svg.parentElement;
            if (svgParent) {
              // 진행률에 따른 색상 계산
              let color = '#10b981';
              if (percentage > 15) color = '#22c55e';
              if (percentage > 30) color = '#f59e0b';
              if (percentage > 50) color = '#f97316';
              if (percentage > 70) color = '#ef4444';
              
              // 깔끔한 카드형 디자인
              const scoreCard = clonedDoc.createElement('div');
              scoreCard.style.cssText = `
                width: 200px !important;
                height: 120px !important;
                background-color: ${color} !important;
                border-radius: 16px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                margin: 24px auto !important;
                position: relative !important;
                box-shadow: 0 8px 16px rgba(0,0,0,0.15) !important;
              `;
              
              // 퍼센트 텍스트
              const percentText = clonedDoc.createElement('div');
              percentText.textContent = `${percentage}%`;
              percentText.style.cssText = `
                font-size: 56px !important;
                font-weight: 900 !important;
                color: white !important;
                text-shadow: 0 2px 4px rgba(0,0,0,0.3) !important;
                letter-spacing: -2px !important;
              `;
              
              scoreCard.appendChild(percentText);
              
              // SVG를 카드로 교체
              svgParent.replaceChild(scoreCard, svg);
            }
          });
          
          // 그라데이션 바를 div로 대체
          const gradientElements = element.querySelectorAll('[style*="gradient"]');
          gradientElements.forEach(el => {
            if (el instanceof HTMLElement) {
              // CSS 그라데이션 대신 여러 개의 div로 구현
              const gradientBar = clonedDoc.createElement('div');
              gradientBar.style.cssText = `
                display: flex !important;
                height: 24px !important;
                border-radius: 12px !important;
                overflow: hidden !important;
                border: 1px solid #e5e7eb !important;
                position: relative !important;
              `;
              
              // 색상 세그먼트 생성
              const colors = ['#10b981', '#22c55e', '#f59e0b', '#f97316', '#ef4444'];
              colors.forEach(color => {
                const segment = clonedDoc.createElement('div');
                segment.style.cssText = `
                  flex: 1 !important;
                  background-color: ${color} !important;
                  height: 100% !important;
                `;
                gradientBar.appendChild(segment);
              });
              
              // 위치 표시자 추가
              const indicator = clonedDoc.createElement('div');
              indicator.style.cssText = `
                position: absolute !important;
                top: 0 !important;
                height: 100% !important;
                width: 2px !important;
                background-color: #111827 !important;
                left: ${percentage}% !important;
                transform: translateX(-50%) !important;
              `;
              gradientBar.appendChild(indicator);
              
              // 원본 요소를 새로운 그라데이션 바로 교체
              el.parentNode?.replaceChild(gradientBar, el);
            }
          });
        }
      });
      
      console.log('✅ 캔버스 생성 완료!');
      console.log('📏 캔버스 크기:', canvas.width, 'x', canvas.height);

      // 캔버스가 비어있는지 확인
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('캔버스 컨텍스트를 가져올 수 없습니다.');
      }
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const hasContent = imageData.data.some((pixel, index) => {
        // 알파 채널이 아닌 RGB 채널에서 완전한 흰색이 아닌 픽셀 찾기
        return index % 4 < 3 && pixel < 250;
      });
      
      if (!hasContent) {
        throw new Error('생성된 이미지가 비어있습니다. 다시 시도해주세요.');
      }

      console.log('💾 다운로드 파일 생성 중...');
      // 다운로드 링크 생성 및 실행
      canvas.toBlob((blob) => {
        if (!blob) {
          throw new Error('이미지 Blob 생성에 실패했습니다.');
        }
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const timestamp = new Date().toISOString().slice(0, 10);
        link.download = `bias-test-result-${percentage.toFixed(1)}%-${timestamp}.png`;
        link.href = url;
        link.style.display = 'none';
        
        // 다운로드 실행
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // 메모리 정리
        URL.revokeObjectURL(url);
        
        console.log('🎉 이미지 다운로드 완료!');
      }, 'image/png', 0.95);
      
    } catch (error) {
      console.error('💥 이미지 다운로드 실패:', error);
      alert(`이미지 다운로드에 실패했습니다.\n오류: ${error.message || '알 수 없는 오류'}\n\n다시 시도해주세요.`);
    } finally {
      // 정리 작업
      if (tempStyle && document.head.contains(tempStyle)) {
        document.head.removeChild(tempStyle);
      }
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
      className={`inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
      {isDownloading ? '생성 중...' : buttonText}
    </button>
  );
}