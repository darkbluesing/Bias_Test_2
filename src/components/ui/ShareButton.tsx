'use client';

import { useState } from 'react';
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
  buttonText = '결과 다운로드',
  resultElementId = 'result-container'
}: ShareButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    
    try {
      console.log('🎨 Canvas API를 사용한 직접 이미지 생성 시작...');
      
      // 결과 요소 찾기
      const originalElement = document.getElementById(resultElementId);
      if (!originalElement) {
        throw new Error('결과 요소를 찾을 수 없습니다.');
      }
      
      // 결과 데이터 추출
      const nameElement = originalElement.querySelector('h2');
      const percentageElement = originalElement.querySelector('[class*="text-4xl"]');
      const categoryElement = originalElement.querySelector('h3');
      const descriptionElement = originalElement.querySelector('p');
      
      const name = nameElement?.textContent || '사용자';
      const percent = percentage;
      const category = categoryElement?.textContent || '';
      const description = descriptionElement?.textContent || '';
      
      console.log('📋 추출된 데이터:', { name, percent, category });
      
      // Canvas 생성
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context를 생성할 수 없습니다.');
      
      // Canvas 크기 설정
      canvas.width = 400;
      canvas.height = 600;
      
      // 배경 그리기
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // 제목 그리기
      ctx.fillStyle = '#111827';
      ctx.font = 'bold 20px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.textAlign = 'center';
      
      // 텍스트 줄바꿈 처리
      const maxWidth = 360;
      const words = name.split(' ');
      let line = '';
      let y = 60;
      
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, canvas.width / 2, y);
          line = words[n] + ' ';
          y += 30;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, canvas.width / 2, y);
      
      // 원형 차트 그리기
      const centerX = canvas.width / 2;
      const centerY = 200;
      const radius = 80;
      const lineWidth = 24;
      
      // 배경 원
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = lineWidth;
      ctx.stroke();
      
      // 진행 원 (percentage만큼)
      const startAngle = -Math.PI / 2; // 12시 방향부터 시작
      const endAngle = startAngle + (2 * Math.PI * percent / 100);
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      
      // 색상 결정
      let color = '#10b981'; // 기본 녹색
      if (percent > 70) color = '#ef4444'; // 빨간색
      else if (percent > 50) color = '#f97316'; // 주황색
      else if (percent > 30) color = '#f59e0b'; // 노란색
      else if (percent > 15) color = '#22c55e'; // 연녹색
      
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.stroke();
      
      // 퍼센트 텍스트
      ctx.fillStyle = color;
      ctx.font = 'bold 48px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${percent}%`, centerX, centerY + 15);
      
      // 카테고리
      ctx.fillStyle = '#374151';
      ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText(category, centerX, 350);
      
      // 설명 (줄바꿈 처리)
      ctx.fillStyle = '#6b7280';
      ctx.font = '14px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.textAlign = 'center';
      
      const descWords = description.split(' ');
      let descLine = '';
      let descY = 380;
      
      for (let n = 0; n < descWords.length; n++) {
        const testLine = descLine + descWords[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          ctx.fillText(descLine, centerX, descY);
          descLine = descWords[n] + ' ';
          descY += 20;
        } else {
          descLine = testLine;
        }
      }
      ctx.fillText(descLine, centerX, descY);
      
      // 하단 브랜딩
      ctx.fillStyle = '#9ca3af';
      ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText('www.areyoubiased.life', centerX, canvas.height - 30);
      
      console.log('✅ Canvas 이미지 생성 완료');
      
      // 다운로드 실행
      const dataURL = canvas.toDataURL('image/png', 0.95);
      const link = document.createElement('a');
      const timestamp = new Date().toISOString().slice(0, 16).replace('T', '_').replaceAll(':', '-');
      const fileName = `bias_test_result_${percent}%_${timestamp}.png`;
      
      link.download = fileName;
      link.href = dataURL;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('🎉 Canvas 기반 다운로드 완료!', fileName);
      
    } catch (error) {
      console.error('💥 Canvas 다운로드 실패:', error);
      alert('이미지 다운로드에 실패했습니다.\n\n' + (error instanceof Error ? error.message : '알 수 없는 오류'));
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className={`inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
      {isDownloading ? '생성 중...' : buttonText}
    </button>
  );
}