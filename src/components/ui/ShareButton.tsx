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
    console.log('🚀 이미지 다운로드 시작');
    
    try {
      const element = document.getElementById(resultElementId);
      if (!element) {
        console.error('❌ 결과 요소를 찾을 수 없습니다:', resultElementId);
        alert('결과 요소를 찾을 수 없습니다.');
        return;
      }
      console.log('✅ 대상 요소 찾음:', element);

      // 단순하고 안정적인 요소 숨김 로직
      const hideSelectors = [
        '[data-hide-in-export="true"]',
        '[data-share-button]',
        'button:not([data-keep-in-export])'
      ];

      const elementsToHide: HTMLElement[] = [];
      const originalStyles: Array<{element: HTMLElement, display: string, visibility: string}> = [];

      hideSelectors.forEach(selector => {
        const elements = element.querySelectorAll(selector);
        elements.forEach(el => {
          const htmlEl = el as HTMLElement;
          // 이미 처리한 요소는 건너뛰기
          if (elementsToHide.includes(htmlEl)) return;
          
          elementsToHide.push(htmlEl);
          originalStyles.push({
            element: htmlEl,
            display: htmlEl.style.display,
            visibility: htmlEl.style.visibility
          });
          htmlEl.style.visibility = 'hidden';
        });
      });

      console.log(`🔧 ${elementsToHide.length}개 요소 숨김 완료`);

      // DOM 업데이트 대기
      await new Promise(resolve => setTimeout(resolve, 200));

      // 단순하고 안정적인 캡처 옵션
      console.log('📸 html2canvas 시작...');
      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2, // scale 감소로 안정성 확보
        logging: true, // 디버깅을 위해 로깅 활성화
        useCORS: true,
        allowTaint: true, // 안정성을 위해 허용
        imageTimeout: 10000,
        width: element.offsetWidth,
        height: element.offsetHeight
      });
      console.log('✅ 캔버스 생성 완료:', canvas.width + 'x' + canvas.height);

      // 안전한 다운로드 로직
      try {
        const timestamp = new Date().toLocaleDateString('ko-KR').replace(/\./g, '').replace(/\s/g, '');
        const fileName = `나의편견테스트결과_${percentage}%_${timestamp}.png`;
        
        canvas.toBlob((blob) => {
          if (blob) {
            console.log('💾 블롭 생성 성공, 다운로드 시작...');
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            link.style.display = 'none';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // cleanup
            setTimeout(() => URL.revokeObjectURL(url), 100);
            console.log('✅ 다운로드 완료');
          } else {
            console.error('❌ 블롭 생성 실패');
            alert('이미지 생성에 실패했습니다.');
          }
        }, 'image/png', 0.9);
        
      } catch (downloadError) {
        console.error('❌ 다운로드 오류:', downloadError);
        // 대체 방법: 새 창에서 이미지 표시
        const dataURL = canvas.toDataURL('image/png');
        const newWindow = window.open();
        if (newWindow) {
          newWindow.document.write(`<img src="${dataURL}" alt="테스트 결과"/>`);
        }
      }

      // 원래 스타일 복원
      originalStyles.forEach(({element, display, visibility}) => {
        element.style.display = display;
        element.style.visibility = visibility;
      });
      console.log('🔄 스타일 복원 완료');

    } catch (error) {
      console.error('❌ 전체 프로세스 오류:', error);
      console.error('오류 스택:', error instanceof Error ? error.stack : '스택 없음');
      
      // 사용자 친화적 오류 메시지
      const errorMsg = error instanceof Error ? error.message : '알 수 없는 오류';
      alert(`이미지 생성 중 오류가 발생했습니다.\n오류: ${errorMsg}\n\n브라우저를 새로고침 후 다시 시도해주세요.`);
    } finally {
      setIsGenerating(false);
      console.log('🏁 이미지 다운로드 프로세스 종료');
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