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

  // 색상 매핑 (RGB 하드코딩)
  const getColorForPercentage = (percentage: number): string => {
    if (percentage <= 15) return 'rgb(16, 185, 129)';
    if (percentage <= 30) return 'rgb(34, 197, 94)';
    if (percentage <= 50) return 'rgb(245, 158, 11)';
    if (percentage <= 70) return 'rgb(249, 115, 22)';
    return 'rgb(239, 68, 68)';
  };

  // Canvas 전용 간단 HTML 생성 (DOM 조작 없이)
  const createCanvasOptimizedElement = () => {
    const container = document.createElement('div');
    const color = getColorForPercentage(percentage);
    
    // 완전히 인라인 스타일만 사용하는 간단한 구조
    container.innerHTML = `
      <div style="
        width: 375px;
        background: rgb(255, 255, 255);
        padding: 16px;
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
      ">
        <div style="
          background: rgb(255, 255, 255);
          border-radius: 12px;
          padding: 24px;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        ">
          <h2 style="
            font-size: 24px;
            font-weight: bold;
            color: rgb(17, 24, 39);
            margin: 0 0 32px 0;
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
              color: rgb(255, 255, 255);
              text-shadow: 0 2px 4px rgba(0,0,0,0.3);
            ">${percentage}%</div>
          </div>
          
          <div style="margin-bottom: 24px;">
            <h3 style="
              font-size: 18px;
              font-weight: 600;
              color: rgb(55, 65, 81);
              margin: 0 0 16px 0;
            ">편향성 범위</h3>
            <div style="
              display: flex;
              justify-content: space-between;
              font-size: 11px;
              color: rgb(107, 114, 128);
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
              background: rgb(16, 185, 129);
              border: 1px solid rgb(229, 231, 235);
              overflow: hidden;
            ">
              <div style="width: 20%; height: 100%; background: rgb(16, 185, 129); float: left;"></div>
              <div style="width: 20%; height: 100%; background: rgb(34, 197, 94); float: left;"></div>
              <div style="width: 20%; height: 100%; background: rgb(245, 158, 11); float: left;"></div>
              <div style="width: 20%; height: 100%; background: rgb(249, 115, 22); float: left;"></div>
              <div style="width: 20%; height: 100%; background: rgb(239, 68, 68); float: left;"></div>
              <div style="
                position: absolute;
                top: 0;
                height: 100%;
                width: 2px;
                background-color: rgb(17, 24, 39);
                left: ${percentage}%;
                transform: translateX(-50%);
                z-index: 10;
              "></div>
            </div>
          </div>
          
          <div style="
            text-align: left;
            color: rgb(55, 65, 81);
            font-size: 14px;
            line-height: 1.6;
          ">
            <div style="margin-bottom: 16px;">
              <h3 style="
                font-size: 18px;
                font-weight: bold;
                color: rgb(17, 24, 39);
                margin: 0 0 8px 0;
              ">분석</h3>
              <p style="margin: 0;">당신의 편향성 지수를 기반으로 한 분석 결과입니다.</p>
            </div>
            <div>
              <h3 style="
                font-size: 18px;
                font-weight: bold;
                color: rgb(17, 24, 39);
                margin: 0 0 12px 0;
              ">개선 방안</h3>
              <div>
                <div style="display: flex; align-items: flex-start; margin-bottom: 8px;">
                  <span style="color: rgb(37, 99, 235); margin-right: 8px;">•</span>
                  <span>다양한 관점으로 정보를 바라보기</span>
                </div>
                <div style="display: flex; align-items: flex-start; margin-bottom: 8px;">
                  <span style="color: rgb(37, 99, 235); margin-right: 8px;">•</span>
                  <span>반대 의견에도 귀 기울이기</span>
                </div>
                <div style="display: flex; align-items: flex-start;">
                  <span style="color: rgb(37, 99, 235); margin-right: 8px;">•</span>
                  <span>근거 기반으로 판단하기</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    return container;
  };

  const handleDownload = async () => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    let clonedElement: HTMLElement | null = null;
    
    try {
      console.log('🚀 순수 HTML 이미지 생성 시작...');
      
      // 원본 요소는 무시하고 완전히 새로운 요소 생성
      clonedElement = createCanvasOptimizedElement();
      
      // DOM에 추가 (화면 밖에)
      clonedElement.style.cssText = `
        position: absolute;
        top: -9999px;
        left: -9999px;
        visibility: visible;
        opacity: 1;
      `;
      
      document.body.appendChild(clonedElement);
      
      console.log('⏱️ 레이아웃 대기 중...');
      // 레이아웃 계산 시간
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('🖼️ HTML2Canvas 실행 중...');
      // 최소한의 옵션으로 캔버스 생성
      const canvas = await html2canvas(clonedElement, {
        backgroundColor: 'white',
        scale: 2,
        useCORS: true,
        allowTaint: false,
        width: 375,
        height: clonedElement.scrollHeight,
        logging: true
      });
      
      console.log('✅ 캔버스 완성!', `${canvas.width}x${canvas.height}`);

      // 빈 이미지 검증
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('캔버스 컨텍스트 오류');
      }
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const hasContent = imageData.data.some((pixel, index) => {
        // RGBA에서 알파가 아닌 채널 확인
        return index % 4 !== 3 && pixel !== 255;
      });
      
      if (!hasContent) {
        throw new Error('빈 이미지가 생성되었습니다.');
      }

      console.log('💾 다운로드 링크 생성 중...');
      // 다운로드 실행
      const dataURL = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `편향성-테스트-결과-${percentage}%-${Date.now()}.png`;
      link.href = dataURL;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('🎉 성공적으로 다운로드됨!');
      
    } catch (error) {
      console.error('❌ 다운로드 실패:', error);
      alert(`다운로드 실패\n원인: ${error.message}\n\n다시 시도해주세요.`);
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