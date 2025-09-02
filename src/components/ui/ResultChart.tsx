'use client';

import React from 'react';

interface ResultChartProps {
  percentage: number;
  category: string;
  userName?: string;
  className?: string;
  title?: string;
  showGradientBar?: boolean;
  size?: 'sm' | 'md' | 'lg';
  disableAnimation?: boolean; // 애니메이션 비활성화 prop
  translations?: { [key: string]: string };
}

export function ResultChart({ 
  percentage, 
  userName, 
  className = '',
  title,
  showGradientBar = true,
  size = 'md',
  disableAnimation = false, // 기본값은 false
  translations = {}
}: ResultChartProps) {
  const chartSize = {
    sm: { width: 200, height: 200, innerRadius: 60, strokeWidth: 20, fontSize: 'text-3xl' },
    md: { width: 256, height: 256, innerRadius: 80, strokeWidth: 24, fontSize: 'text-4xl' },
    lg: { width: 280, height: 280, innerRadius: 90, strokeWidth: 28, fontSize: 'text-4xl' }
  }[size];

  const defaultTitle = userName
    ? (translations.yourScoreWithName || '').replace('{name}', userName) || `${userName}님의 편향성 지수`
    : translations.yourScore || '편향성 지수';
  const displayTitle = title || defaultTitle;
  
  const circumference = 2 * Math.PI * chartSize.innerRadius;
  const strokeDasharray = circumference;
  const finalOffset = circumference * (1 - percentage / 100);
  const color = getColorForPercentage(percentage);

  const chartId = `chart-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`text-center ${className}`}>
      {/* 애니메이션이 활성화된 경우에만 스타일 렌더링 */}
      {!disableAnimation && (
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes drawChart-${chartId} {
              from { stroke-dashoffset: ${circumference}; }
              to { stroke-dashoffset: ${finalOffset}; }
            }
            .chart-animation-${chartId} {
              animation: drawChart-${chartId} 2s ease-out 0.5s forwards;
            }
          `
        }} />
      )}
      
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{displayTitle}</h2>
      
      <div className="flex justify-center mb-6">
        <div className="relative flex items-center justify-center" style={{ width: chartSize.width, height: chartSize.height }}>
          <svg className="transform -rotate-90 w-full h-full" viewBox={`0 0 ${chartSize.width} ${chartSize.height}`}>
            <circle
              cx={chartSize.width / 2} cy={chartSize.height / 2} r={chartSize.innerRadius}
              stroke="#e5e7eb" strokeWidth={chartSize.strokeWidth} fill="transparent" className="opacity-30"
            />
            <circle
              cx={chartSize.width / 2} cy={chartSize.height / 2} r={chartSize.innerRadius}
              stroke={color} strokeWidth={chartSize.strokeWidth} fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeLinecap="round"
              className={!disableAnimation ? `chart-animation-${chartId}` : ''}
              // 애니메이션 활성화 시 초기값 설정, 비활성화 시 최종값 설정
              strokeDashoffset={disableAnimation ? finalOffset : circumference}
              style={{
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
              }}
            />
          </svg>
          
          <div className={`absolute inset-0 flex items-center justify-center pointer-events-none`}>
            <div className={`${chartSize.fontSize} font-black`} style={{ color, textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              {percentage}%
            </div>
          </div>
        </div>
      </div>

      {showGradientBar && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">{translations.biasRange || '편향성 범위'}</h3>
          <div className="flex justify-between text-xs text-gray-600 mb-2">
            <span>{translations.veryLow || '매우 낮음'}</span>
            <span>{translations.low || '낮음'}</span>
            <span>{translations.moderate || '보통'}</span>
            <span>{translations.high || '높음'}</span>
            <span>{translations.veryHigh || '매우 높음'}</span>
          </div>
          <div className="relative h-6 rounded-full overflow-hidden border border-gray-200" style={{ background: 'linear-gradient(to right, #10b981, #22c55e, #f59e0b, #f97316, #ef4444)' }}>
            <div className="absolute top-0 h-full w-1 bg-gray-900 shadow-lg" style={{ left: `${percentage}%`, transform: 'translateX(-50%)' }} />
          </div>
        </div>
      )}
    </div>
  );
}

function getColorForPercentage(percentage: number): string {
  if (percentage <= 15) return '#10b981';
  if (percentage <= 30) return '#22c55e';
  if (percentage <= 50) return '#f59e0b';
  if (percentage <= 70) return '#f97316';
  return '#ef4444';
}