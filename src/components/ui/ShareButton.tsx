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

  const handleDownloadImage = async () => {
    setIsGenerating(true);
    console.log('🚀 === 안정화된 이미지 다운로드 시작 ===');
    
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

      // 3. 요소 숨김 처리 (간소화)
      const elementsToHide = element.querySelectorAll('[data-hide-in-export="true"], [data-share-button]');
      const originalStyles: Map<HTMLElement, string> = new Map();
      
      elementsToHide.forEach(el => {
        const htmlEl = el as HTMLElement;
        originalStyles.set(htmlEl, htmlEl.style.opacity);
        htmlEl.style.opacity = '0';
        htmlEl.style.pointerEvents = 'none';
      });
      
      console.log(`🔧 ${elementsToHide.length}개 요소 숨김 완료`);

      // 4. DOM 업데이트 완료 대기
      await new Promise(resolve => setTimeout(resolve, 300));

      // 5. html2canvas 실행 (단순화된 옵션)
      console.log('📸 html2canvas 실행...');
      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2, // 고품질
        useCORS: true,
        allowTaint: false,
        logging: false,
        imageTimeout: 10000,
        removeContainer: false,
        // SVG 지원 향상
        foreignObjectRendering: true,
        // 요소 무시 설정 (단순화)
        ignoreElements: (element: Element) => {
          return element.hasAttribute('data-html2canvas-ignore') || 
                 element.tagName === 'SCRIPT';
        },
        // 복제된 DOM에서 스타일 정규화
        onclone: (clonedDoc: Document) => {
          // 애니메이션 및 전환 효과 제거
          const styleEl = clonedDoc.createElement('style');
          styleEl.textContent = `
            *, *::before, *::after {
              animation-duration: 0s !important;
              transition-duration: 0s !important;
              animation-delay: 0s !important;
              transition-delay: 0s !important;
            }
          `;
          clonedDoc.head.appendChild(styleEl);
        }
      });

      // 6. 캔버스 검증
      if (!canvas || canvas.width === 0 || canvas.height === 0) {
        throw new Error('캔버스 생성 실패 또는 빈 캔버스');
      }

      console.log('✅ 캔버스 생성 성공:', {
        width: canvas.width,
        height: canvas.height,
        size: `${Math.round(canvas.width * canvas.height * 4 / 1024)}KB`
      });

      // 7. 다운로드 시도
      const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
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
      originalStyles.forEach((originalOpacity, el) => {
        el.style.opacity = originalOpacity;
        el.style.pointerEvents = '';
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
          결과 공유하기
        </>
      )}
    </button>
  );
}