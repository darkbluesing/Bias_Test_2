'use client';

import { useEffect, useRef, useState } from 'react';
import { toPng } from '@/lib/htmlToImage';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

interface ShareButtonProps {
  resultElementId?: string;
  percentage: number;
  className?: string;
  buttonText?: string;
}

export function ShareButton({ 
  percentage,
  className = '', 
  buttonText = '결과 공유하기',
  resultElementId = 'result-container'
}: ShareButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const [pendingDownload, setPendingDownload] = useState(false);
  const adContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!showAd || !adContainerRef.current) {
      return;
    }
    const containerId = 'container-1e4f541ec5421554343c96068cff9c9f';
    adContainerRef.current.innerHTML = `<div id="${containerId}"></div>`;
    const optionsScript = document.createElement('script');
    optionsScript.type = 'text/javascript';
    optionsScript.text = `atOptions = { key: '1e4f541ec5421554343c96068cff9c9f', format: 'iframe', height: 250, width: 300, params: {} };`;
    const invokeScript = document.createElement('script');
    invokeScript.async = true;
    invokeScript.src = '//www.highperformanceformat.com/1e4f541ec5421554343c96068cff9c9f/invoke.js';
    adContainerRef.current.appendChild(optionsScript);
    adContainerRef.current.appendChild(invokeScript);

    return () => {
      if (adContainerRef.current) {
        adContainerRef.current.innerHTML = '';
      }
    };
  }, [showAd]);

  const performDownload = async () => {
    if (isDownloading) return;

    setIsDownloading(true);
    
    const element = document.getElementById(resultElementId) as HTMLElement;
    if (!element) {
      alert('이미지를 생성할 요소를 찾을 수 없습니다.');
      setIsDownloading(false);
      return;
    }

    const animatedCircle = element.querySelector('[class*="chart-animation-"]') as SVGCircleElement | null;

    try {
      // 1단계: DOM을 이미지 데이터로 캡처
      if (animatedCircle) {
        const finalOffset = animatedCircle.dataset.finalOffset;
        if (finalOffset) {
          animatedCircle.style.animation = 'none';
          animatedCircle.setAttribute('stroke-dashoffset', finalOffset);
        }
      }

      const dataUrl = await toPng(element, {
        quality: 1.0,
        pixelRatio: 2,
        filter: (node: HTMLElement) => node.dataset?.hideInExport !== 'true',
      });

      // 2단계: 캡처된 이미지에 푸터(로고 및 주소)를 추가하여 새 Canvas 생성
      const finalImage = await addFooterToImage(dataUrl);

      // 다운로드 링크 생성 및 클릭
      const link = document.createElement('a');
      const timestamp = new Date().toISOString().slice(0, 16).replace('T', '_').replaceAll(':', '-');
      link.download = `bias_test_result_${percentage}%_${timestamp}.png`;
      link.href = finalImage;
      link.click();

    } catch (error) {
      console.error('이미지 생성 중 오류가 발생했습니다:', error);
      alert('이미지 다운로드에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      if (animatedCircle) {
        animatedCircle.style.animation = '';
      }
      setIsDownloading(false);
    }
  };

  const handleDownloadRequest = () => {
    if (isDownloading) return;
    setPendingDownload(true);
    setShowAd(true);
  };

  const handleAdClose = async () => {
    setShowAd(false);
    if (pendingDownload) {
      await performDownload();
      setPendingDownload(false);
    }
  };

  // 이미지에 푸터를 추가하는 함수
  const addFooterToImage = (imageDataUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const footerHeight = 60;
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height + footerHeight * 2; // pixelRatio 2 감안

        const ctx = canvas.getContext('2d')!;

        // 배경을 흰색으로 채움
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 원본 이미지 그리기
        ctx.drawImage(img, 0, 0);

        // --- 푸터 그리기 시작 ---
        const scale = 2; // pixelRatio
        const logoSize = 20 * scale;
        const fontSize = 14 * scale;
        const text = 'www.areyoubiased.life';
        
        ctx.font = `bold ${fontSize}px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`;
        const textWidth = ctx.measureText(text).width;
        const gap = 8 * scale;
        const totalFooterWidth = logoSize + gap + textWidth;
        
        const startX = (canvas.width - totalFooterWidth) / 2;
        const startY = img.height + (footerHeight * scale - logoSize) / 2;

        // 로고 배경
        ctx.fillStyle = '#2563eb'; // blue-600
        ctx.roundRect(startX, startY, logoSize, logoSize, 4 * scale);
        ctx.fill();

        // 로고 텍스트 'B'
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${12 * scale}px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('B', startX + logoSize / 2, startY + logoSize / 2);

        // 페이지 주소 텍스트
        ctx.fillStyle = '#4b5563'; // gray-600
        ctx.font = `${fontSize}px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, startX + logoSize + gap, startY + logoSize / 2);

        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = reject;
      img.src = imageDataUrl;
    });
  };

  return (
    <>
      <button
        onClick={handleDownloadRequest}
        disabled={isDownloading}
        className={`inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
        {isDownloading ? '생성 중...' : buttonText}
      </button>

      {showAd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="relative w-full max-w-[340px] rounded-2xl bg-white px-3 py-4 shadow-xl sm:w-auto">
            <button
              type="button"
              onClick={handleAdClose}
              className="absolute right-3 top-3 text-sm font-medium text-gray-500 hover:text-gray-800"
            >
              광고 닫기
            </button>
            <p className="mb-3 text-sm font-semibold text-gray-800">광고를 닫으면 이미지가 다운로드됩니다.</p>
            <div
              ref={adContainerRef}
              className="mx-auto flex items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50"
              style={{ minHeight: 250, width: 300 }}
            />
          </div>
        </div>
      )}
    </>
  );
}
