'use client';

import { useState } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import html2canvas from 'html2canvas';

interface ShareButtonProps {
  resultElementId: string;
  percentage: number;
  className?: string;
  buttonText?: string;
}

export function ShareButton({ resultElementId, percentage, className = '', buttonText = '결과 공유하기' }: ShareButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  // 폰트 로딩 완료 대기 함수
  const waitForFonts = async (): Promise<void> => {
    try {
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
        console.log('✅ 폰트 로딩 완료');
      }
      // 추가 대기로 안정성 확보
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.warn('⚠️ 폰트 로딩 대기 실패:', error);
      // 최소 대기
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  };

  // Promise로 래핑된 toBlob 함수
  const canvasToBlob = (canvas: HTMLCanvasElement): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob && blob.size > 0) {
          resolve(blob);
        } else {
          reject(new Error('Blob 생성 실패'));
        }
      }, 'image/png', 0.9);
    });
  };

  // 다운로드 함수 (단순화)
  const downloadImage = (blob: Blob, fileName: string): boolean => {
    try {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // 메모리 정리
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      console.log('✅ 다운로드 성공');
      return true;
    } catch (error) {
      console.error('❌ 다운로드 실패:', error);
      return false;
    }
  };

  // 대체 방법: 새 창에서 이미지 표시
  const showImageInNewWindow = (canvas: HTMLCanvasElement) => {
    try {
      const dataURL = canvas.toDataURL('image/png', 0.9);
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>테스트 결과</title>
              <style>
                body { margin: 0; padding: 20px; background: #f0f0f0; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
                img { max-width: 100%; box-shadow: 0 4px 12px rgba(0,0,0,0.15); border-radius: 8px; }
              </style>
            </head>
            <body>
              <img src="${dataURL}" alt="편견 테스트 결과" />
            </body>
          </html>
        `);
        newWindow.document.close();
        console.log('✅ 새 창 표시 성공');
      }
    } catch (error) {
      console.error('❌ 새 창 표시 실패:', error);
    }
  };

  // 폴백 방법: 간단한 텍스트 기반 결과 이미지 생성 (모바일 친화적)
  const createFallbackImage = (percentage: number): HTMLCanvasElement => {
    console.log('🎯 폴백 이미지 생성 중...');
    
    const canvas = document.createElement('canvas');
    const isMobile = window.innerWidth <= 768;
    // 모바일에서는 더 작은 크기로 생성
    canvas.width = isMobile ? 400 : 600;
    canvas.height = isMobile ? 600 : 800;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) throw new Error('캔버스 컨텍스트 생성 실패');
    
    // 배경 그라데이션
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#f8fafc');
    gradient.addColorStop(1, '#e2e8f0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 테두리
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 3;
    ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);
    
    // 로고 영역 (상단)
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(0, 0, canvas.width, 60);
    
    // 제목 (흰색, 로고 영역 내) - 모바일 대응
    ctx.fillStyle = '#ffffff';
    const titleSize = isMobile ? 18 : 24;
    ctx.font = `bold ${titleSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('편견 테스트 결과', canvas.width / 2, 38);
    
    // 백분율 배경 원
    const centerX = canvas.width / 2;
    const centerY = 250;
    const radius = 120;
    
    // 원 배경
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 4;
    ctx.stroke();
    
    // 진행률 호 (도넛차트 스타일)
    const progressAngle = (percentage / 100) * 2 * Math.PI;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 10, -Math.PI / 2, -Math.PI / 2 + progressAngle);
    ctx.strokeStyle = getColorForPercentage(percentage);
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';
    ctx.stroke();
    
    // 백분율 텍스트 (큰 텍스트) - 모바일 대응
    ctx.fillStyle = getColorForPercentage(percentage);
    const percentageSize = isMobile ? 48 : 72;
    ctx.font = `bold ${percentageSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(`${percentage}%`, centerX, centerY + 15);
    
    // 설명 - 모바일 대응
    ctx.fillStyle = '#64748b';
    const descSize = isMobile ? 16 : 20;
    ctx.font = `${descSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    ctx.fillText('당신의 편견 지수', centerX, centerY + 80);
    
    // 카테고리 설명 - 모바일 대응
    const category = getCategoryForPercentage(percentage);
    ctx.fillStyle = '#475569';
    const categorySize = isMobile ? 18 : 24;
    ctx.font = `bold ${categorySize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    const categoryY = isMobile ? 420 : 420;
    ctx.fillText(category, centerX, categoryY);
    
    // 웹사이트 - 모바일 대응
    ctx.fillStyle = '#1e293b';
    const websiteSize = isMobile ? 14 : 18;
    ctx.font = `bold ${websiteSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    const websiteY = isMobile ? 480 : 480;
    ctx.fillText('www.areyoubiased.life', centerX, websiteY);
    
    // 날짜 - 모바일 대응
    ctx.fillStyle = '#94a3b8';
    const dateSize = isMobile ? 12 : 14;
    ctx.font = `${dateSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    const date = new Date().toLocaleDateString('ko-KR');
    const dateY = isMobile ? 540 : 540;
    ctx.fillText(`결과 생성일: ${date}`, centerX, dateY);
    
    console.log('✅ 폴백 이미지 생성 완료');
    return canvas;
  };

  // 백분율에 따른 색상 반환
  const getColorForPercentage = (percentage: number): string => {
    if (percentage < 20) return '#10b981'; // green
    if (percentage < 40) return '#22c55e'; // light green
    if (percentage < 60) return '#f59e0b'; // amber
    if (percentage < 80) return '#f97316'; // orange
    return '#ef4444'; // red
  };

  // 백분율에 따른 카테고리 반환
  const getCategoryForPercentage = (percentage: number): string => {
    if (percentage < 20) return '매우 낮은 편견 수준';
    if (percentage < 40) return '낮은 편견 수준';
    if (percentage < 60) return '보통 편견 수준';
    if (percentage < 80) return '높은 편견 수준';
    return '매우 높은 편견 수준';
  };

  const handleDownloadImage = async () => {
    setIsGenerating(true);
    console.log('🚀 === 안정화된 이미지 다운로드 시작 ===');
    
    // 파일명을 위한 timestamp 생성
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    
    try {
      // 1. 요소 확인
      const element = document.getElementById(resultElementId);
      if (!element) {
        throw new Error(`결과 요소를 찾을 수 없습니다: ${resultElementId}`);
      }
      
      console.log('✅ 대상 요소 확인:', {
        id: element.id,
        width: element.offsetWidth,
        height: element.offsetHeight,
        visible: element.offsetParent !== null
      });

      // 2. 폰트 로딩 완료 대기
      console.log('⏳ 폰트 및 렌더링 대기...');
      await waitForFonts();

      // 3. SNS용 컴팩트 스타일 적용
      const elementsToHide = element.querySelectorAll('[data-hide-in-export="true"], [data-share-button], button, .ad-space');
      const originalStyles: Map<HTMLElement, {opacity: string, display: string}> = new Map();
      const textElements = element.querySelectorAll('p, div, span, h1, h2, h3');
      const originalTextStyles: Map<HTMLElement, {lineHeight: string, marginBottom: string, marginTop: string, paddingBottom: string, paddingTop: string}> = new Map();
      
      // 광고와 버튼 완전히 숨김
      elementsToHide.forEach(el => {
        const htmlEl = el as HTMLElement;
        originalStyles.set(htmlEl, {
          opacity: htmlEl.style.opacity,
          display: htmlEl.style.display
        });
        htmlEl.style.display = 'none';
      });

      // 텍스트 압축을 더 보수적으로 적용하여 누락 방지
      textElements.forEach(el => {
        const htmlEl = el as HTMLElement;
        const computedStyle = getComputedStyle(htmlEl);
        originalTextStyles.set(htmlEl, {
          lineHeight: htmlEl.style.lineHeight,
          marginBottom: htmlEl.style.marginBottom,
          marginTop: htmlEl.style.marginTop,
          paddingBottom: htmlEl.style.paddingBottom,
          paddingTop: htmlEl.style.paddingTop
        });
        
        // 핵심 텍스트는 압축하지 않음 (제목, 백분율 등)
        const isLargeText = htmlEl.classList.contains('text-6xl') || 
                           htmlEl.classList.contains('text-5xl') || 
                           htmlEl.classList.contains('text-7xl') ||
                           htmlEl.classList.contains('text-8xl') ||
                           htmlEl.classList.contains('text-9xl') ||
                           htmlEl.classList.contains('font-black');
        
        const isImportantText = htmlEl.textContent?.includes('%') ||
                               htmlEl.textContent?.includes('편견') ||
                               htmlEl.tagName === 'H1' ||
                               htmlEl.tagName === 'H2' ||
                               htmlEl.tagName === 'H3';
        
        if (!isLargeText && !isImportantText) {
          // 행간을 너무 줄이지 않음 (1.4로 설정)
          htmlEl.style.lineHeight = '1.4';
          
          // 여백 압축을 더 보수적으로 설정
          const marginBottom = parseInt(computedStyle.marginBottom) || 0;
          const marginTop = parseInt(computedStyle.marginTop) || 0;
          const paddingBottom = parseInt(computedStyle.paddingBottom) || 0;
          const paddingTop = parseInt(computedStyle.paddingTop) || 0;
          
          if (marginBottom > 8) {
            htmlEl.style.marginBottom = Math.max(marginBottom * 0.7, 6) + 'px';
          }
          if (marginTop > 8) {
            htmlEl.style.marginTop = Math.max(marginTop * 0.7, 6) + 'px';
          }
          if (paddingBottom > 4) {
            htmlEl.style.paddingBottom = Math.max(paddingBottom * 0.8, 3) + 'px';
          }
          if (paddingTop > 4) {
            htmlEl.style.paddingTop = Math.max(paddingTop * 0.8, 3) + 'px';
          }
        }
      });
      
      console.log(`🔧 ${elementsToHide.length}개 요소 숨김, ${textElements.length}개 텍스트 압축 완료`);

      // 4. DOM 업데이트 완료 대기
      await new Promise(resolve => setTimeout(resolve, 300));

      // 5. html2canvas 실행 (안정성 최우선)
      console.log('📸 html2canvas 실행...');
      let canvas: HTMLCanvasElement;
      
      try {
        // 모바일 친화적인 크기 계산
        const elementRect = element.getBoundingClientRect();
        const isMobile = window.innerWidth <= 768;
        const targetWidth = isMobile ? 400 : 600; // 모바일: 400px, 데스크톱: 600px
        const scaleRatio = targetWidth / elementRect.width;
        
        console.log('📱 모바일 비율 설정:', {
          isMobile,
          elementWidth: elementRect.width,
          targetWidth,
          scaleRatio: scaleRatio.toFixed(2)
        });

        canvas = await html2canvas(element, {
          backgroundColor: '#ffffff',
          scale: Math.max(scaleRatio, 1), // 모바일 비율에 맞춰 조정
          width: targetWidth,
          height: Math.round(elementRect.height * scaleRatio),
          useCORS: true,
          allowTaint: true, // CSS 파싱 오류를 줄이기 위해 허용
          logging: false,
          imageTimeout: 15000,
          removeContainer: true, // 컨테이너 정리
          // SVG 처리 단순화
          foreignObjectRendering: false,
          // 복잡한 CSS 요소들 무시
          ignoreElements: (element: Element) => {
            // 문제가 될 수 있는 요소들 완전히 무시
            if (element.hasAttribute('data-html2canvas-ignore') || 
                element.hasAttribute('data-hide-in-export') ||
                element.tagName === 'SCRIPT' ||
                element.tagName === 'STYLE' ||
                element.tagName === 'LINK' ||
                element.classList.contains('animate-spin')) {
              return true;
            }
            return false;
          },
          // 간소화된 DOM 복제 처리
          onclone: (clonedDoc: Document) => {
            console.log('🔧 DOM 복제 (간소화)...');
            
            try {
              // 기본적인 스타일만 적용
              const styleEl = clonedDoc.createElement('style');
              styleEl.textContent = `
                * { 
                  animation: none !important; 
                  transition: none !important; 
                }
                [data-hide-in-export="true"] { display: none !important; }
                [data-share-button] { display: none !important; }
              `;
              clonedDoc.head.appendChild(styleEl);
              
              console.log('✅ 간소화된 DOM 처리 완료');
            } catch (error) {
              console.warn('DOM 클론 처리 중 오류 (무시됨):', error);
            }
          }
        });
      } catch (canvasError) {
        console.warn('html2canvas 실패, 폴백 이미지 사용:', canvasError);
        // html2canvas 실패 시 즉시 폴백 이미지 사용
        canvas = createFallbackImage(percentage);
      }

      // 6. 캔버스 검증 및 디버깅
      console.log('🔍 캔버스 검증:', {
        canvas: !!canvas,
        width: canvas?.width || 0,
        height: canvas?.height || 0,
        hasContent: canvas ? (canvas.getContext('2d')?.getImageData(0, 0, canvas.width, canvas.height).data.some(pixel => pixel !== 0)) : false
      });

      if (!canvas || canvas.width === 0 || canvas.height === 0) {
        throw new Error(`캔버스 생성 실패: width=${canvas?.width || 0}, height=${canvas?.height || 0}`);
      }

      // 캔버스 내용 확인 (빈 캔버스인지 검사)
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const imageData = ctx.getImageData(0, 0, Math.min(canvas.width, 100), Math.min(canvas.height, 100));
        const hasVisibleContent = imageData.data.some((pixel, index) => {
          // 알파 채널이 아닌 RGB 값 중 배경색(255,255,255)이 아닌 값이 있는지 확인
          if (index % 4 === 3) return false; // 알파 채널 스킵
          return pixel !== 255; // 흰색(255)이 아닌 값 확인
        });
        
        console.log('🎨 캔버스 내용 분석:', {
          hasVisibleContent,
          samplePixelCount: imageData.data.length / 4,
          firstPixels: Array.from(imageData.data.slice(0, 12))
        });
        
        if (!hasVisibleContent) {
          console.warn('⚠️ 캔버스가 비어있거나 흰색만 포함됨 - 폴백 이미지 사용');
          // 빈 캔버스면 폴백 이미지로 교체
          const fallbackCanvas = createFallbackImage(percentage);
          
          // 8. 스타일 복원 (폴백 사용 시에도 실행)
          originalStyles.forEach((styles, el) => {
            el.style.opacity = styles.opacity;
            el.style.display = styles.display;
          });

          originalTextStyles.forEach((styles, el) => {
            el.style.lineHeight = styles.lineHeight;
            el.style.marginBottom = styles.marginBottom;
            el.style.marginTop = styles.marginTop;
            el.style.paddingBottom = styles.paddingBottom;
            el.style.paddingTop = styles.paddingTop;
          });
          
          // 폴백 이미지로 다운로드 처리
          try {
            const blob = await canvasToBlob(fallbackCanvas);
            console.log(`✅ 폴백 Blob 생성: ${Math.round(blob.size / 1024)}KB`);
            
            const fileName = `편견테스트결과_${percentage}%_${timestamp}.png`;
            const success = downloadImage(blob, fileName);
            if (success) {
              alert('이미지가 다운로드되었습니다! (간소화된 버전)');
            } else {
              showImageInNewWindow(fallbackCanvas);
              alert('다운로드가 지원되지 않아 새 창에서 이미지를 표시했습니다.\n이미지를 우클릭하여 저장할 수 있습니다.');
            }
          } catch (fallbackError) {
            console.error('폴백 이미지 생성 실패:', fallbackError);
            showImageInNewWindow(fallbackCanvas);
            alert('다운로드가 지원되지 않아 새 창에서 이미지를 표시했습니다.\n이미지를 우클릭하여 저장할 수 있습니다.');
          }
          
          return; // 여기서 함수 종료
        }
      }

      console.log('✅ 캔버스 생성 성공:', {
        width: canvas.width,
        height: canvas.height,
        estimatedSize: `${Math.round(canvas.width * canvas.height * 4 / 1024)}KB`
      });

      // 7. 다운로드 시도
      const fileName = `편견테스트결과_${percentage}%_${timestamp}.png`;
      
      try {
        // Blob 생성 및 다운로드 시도
        const blob = await canvasToBlob(canvas);
        console.log(`✅ Blob 생성: ${Math.round(blob.size / 1024)}KB`);
        
        const success = downloadImage(blob, fileName);
        if (!success) {
          throw new Error('다운로드 실패');
        }
        
        // 성공 알림
        alert('이미지가 다운로드되었습니다!');
        
      } catch (downloadError) {
        console.warn('다운로드 실패, 새 창으로 표시:', downloadError);
        // 대체: 새 창에서 이미지 표시
        showImageInNewWindow(canvas);
        alert('다운로드가 지원되지 않아 새 창에서 이미지를 표시했습니다.\n이미지를 우클릭하여 저장할 수 있습니다.');
      }

      // 8. 스타일 복원
      originalStyles.forEach((styles, el) => {
        el.style.opacity = styles.opacity;
        el.style.display = styles.display;
      });

      originalTextStyles.forEach((styles, el) => {
        el.style.lineHeight = styles.lineHeight;
        el.style.marginBottom = styles.marginBottom;
        el.style.marginTop = styles.marginTop;
        el.style.paddingBottom = styles.paddingBottom;
        el.style.paddingTop = styles.paddingTop;
      });
      
      console.log('🎉 이미지 처리 완료!');

    } catch (error) {
      console.error('❌ 이미지 생성 오류:', error);
      
      // 사용자 친화적 오류 메시지
      const errorMsg = error instanceof Error ? error.message : '알 수 없는 오류';
      alert(`이미지 생성에 실패했습니다.\n\n오류: ${errorMsg}\n\n다음을 시도해보세요:\n• 페이지를 새로고침하고 다시 시도\n• 다른 브라우저 사용\n• 브라우저 다운로드 설정 확인`);
      
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
          {buttonText}
        </>
      )}
    </button>
  );
}