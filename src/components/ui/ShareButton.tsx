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

  // HTML2Canvas 호환 컬러 맵핑
  const getColorForPercentage = (percentage: number): string => {
    if (percentage <= 15) return '#10b981';
    if (percentage <= 30) return '#22c55e';
    if (percentage <= 50) return '#f59e0b';
    if (percentage <= 70) return '#f97316';
    return '#ef4444';
  };

  // 깔끔하고 간단한 복제본 생성 (HTML2Canvas 최적화)
  const createPrintOptimizedClone = (element: HTMLElement) => {
    const clone = element.cloneNode(true) as HTMLElement;
    
    // 불필요한 요소 제거
    const hideElements = clone.querySelectorAll('[data-hide-in-export="true"]');
    hideElements.forEach(el => el.remove());
    
    // 기본 컨테이너 스타일 설정
    clone.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 375px;
      background: #ffffff;
      padding: 16px;
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    `;
    
    // ResultChart 내부를 간단한 HTML로 교체
    const resultContainer = clone.querySelector('#result-container');
    if (resultContainer) {
      const color = getColorForPercentage(percentage);
      
      // 완전히 새로운 간단한 HTML 구조로 교체
      resultContainer.innerHTML = `
        <div style="
          background: #ffffff;
          border-radius: 12px;
          padding: 24px;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        ">
          <h2 style="
            font-size: 24px;
            font-weight: bold;
            color: #111827;
            margin-bottom: 32px;
            margin-top: 0;
          ">편향성 지수</h2>
          
          <div style="
            width: 200px;
            height: 120px;
            background-color: ${color};
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 32px auto;
            box-shadow: 0 8px 16px rgba(0,0,0,0.15);
          ">
            <div style="
              font-size: 56px;
              font-weight: 900;
              color: white;
              text-shadow: 0 2px 4px rgba(0,0,0,0.3);
            ">${percentage}%</div>
          </div>
          
          <div style="margin-bottom: 24px;">
            <h3 style="
              font-size: 18px;
              font-weight: 600;
              color: #374151;
              margin-bottom: 16px;
              margin-top: 0;
            ">편향성 범위</h3>
            <div style="
              display: flex;
              justify-content: space-between;
              font-size: 11px;
              color: #6b7280;
              margin-bottom: 8px;
            ">
              <span>매우 낮음</span>
              <span>낮음</span>
              <span>보통</span>
              <span>높음</span>
              <span>매우 높음</span>
            </div>
            <div style="
              position: relative;
              height: 24px;
              border-radius: 12px;
              background: linear-gradient(to right, #10b981, #22c55e, #f59e0b, #f97316, #ef4444);
              border: 1px solid #e5e7eb;
            ">
              <div style="
                position: absolute;
                top: 0;
                height: 100%;
                width: 2px;
                background-color: #111827;
                left: ${percentage}%;
                transform: translateX(-50%);
              "></div>
            </div>
          </div>
          
          <div style="
            text-align: left;
            color: #374151;
            font-size: 14px;
            line-height: 1.6;
          ">
            <div style="margin-bottom: 16px;">
              <h3 style="
                font-size: 18px;
                font-weight: bold;
                color: #111827;
                margin-bottom: 8px;
                margin-top: 0;
              ">분석</h3>
              <p style="margin: 0;">당신의 편향성 지수를 기반으로 한 분석 결과입니다.</p>
            </div>
            <div>
              <h3 style="
                font-size: 18px;
                font-weight: bold;
                color: #111827;
                margin-bottom: 12px;
                margin-top: 0;
              ">개선 방안</h3>
              <div>
                <div style="display: flex; align-items: flex-start; margin-bottom: 8px;">
                  <span style="color: #2563eb; margin-right: 8px;">•</span>
                  <span>다양한 관점으로 정보를 바라보기</span>
                </div>
                <div style="display: flex; align-items: flex-start; margin-bottom: 8px;">
                  <span style="color: #2563eb; margin-right: 8px;">•</span>
                  <span>반대 의견에도 귀 기울이기</span>
                </div>
                <div style="display: flex; align-items: flex-start;">
                  <span style="color: #2563eb; margin-right: 8px;">•</span>
                  <span>근거 기반으로 판단하기</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
    
    return clone;
  };

  const handleDownload = async () => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    let clonedElement: HTMLElement | null = null;
    
    try {
      console.log('🚀 이미지 다운로드 시작...');
      
      // 원본 결과 요소 찾기
      const originalElement = document.getElementById(resultElementId);
      if (!originalElement) {
        throw new Error('결과 요소를 찾을 수 없습니다.');
      }
      
      console.log('📱 최적화된 복제본 생성 중...');
      // 간단하고 안정적인 복제본 생성
      clonedElement = createPrintOptimizedClone(originalElement);
      
      // 복제본을 임시로 DOM에 추가 (화면 밖에)
      clonedElement.style.position = 'absolute';
      clonedElement.style.top = '-9999px';
      clonedElement.style.left = '-9999px';
      document.body.appendChild(clonedElement);
      
      console.log('⏱️ 레이아웃 안정화 대기 중...');
      // 레이아웃이 안정화될 시간을 줌
      await new Promise(resolve => setTimeout(resolve, 300));
      
      console.log('🖼️ 캔버스 생성 중...');
      // 간단한 옵션으로 html2canvas 실행
      const canvas = await html2canvas(clonedElement, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: false,
        width: 375,
        height: clonedElement.scrollHeight,
        logging: false
      });
      
      console.log('✅ 캔버스 생성 완료!', canvas.width + 'x' + canvas.height);

      // 간단한 빈 캔버스 검사
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('캔버스 컨텍스트를 가져올 수 없습니다.');
      }
      
      // 캔버스가 완전히 비어있는지 확인
      const imageData = ctx.getImageData(0, 0, Math.min(canvas.width, 100), Math.min(canvas.height, 100));
      const hasContent = imageData.data.some(pixel => pixel > 0);
      
      if (!hasContent) {
        throw new Error('생성된 이미지가 비어있습니다.');
      }

      console.log('💾 이미지 다운로드 실행 중...');
      // 이미지 다운로드
      const dataURL = canvas.toDataURL('image/png', 0.9);
      const link = document.createElement('a');
      const timestamp = new Date().toISOString().slice(0, 10);
      link.download = `bias-test-result-${percentage}%-${timestamp}.png`;
      link.href = dataURL;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('🎉 다운로드 완료!');
      
    } catch (error) {
      console.error('💥 다운로드 실패:', error);
      alert(`이미지 다운로드에 실패했습니다.\n오류: ${error.message || '알 수 없는 오류'}\n\n다시 시도해주세요.`);
    } finally {
      // 정리
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