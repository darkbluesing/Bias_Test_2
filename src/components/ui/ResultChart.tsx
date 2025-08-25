'use client';

import React from 'react';

interface ResultChartProps {
  percentage: number;
  category: 'very_low' | 'low' | 'moderate' | 'high' | 'very_high';
  userName?: string;
  className?: string;
  title?: string;
  showGradientBar?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function ResultChart({ 
  percentage, 
  category, 
  userName, 
  className = '', 
  title,
  showGradientBar = true,
  size = 'md'
}: ResultChartProps) {
  const chartSize = {
    sm: { width: 200, height: 200, innerRadius: 60, strokeWidth: 20, fontSize: '4xl' },
    md: { width: 256, height: 256, innerRadius: 80, strokeWidth: 24, fontSize: '5xl' },
    lg: { width: 320, height: 320, innerRadius: 100, strokeWidth: 32, fontSize: '6xl' }
  }[size];

  const defaultTitle = userName ? `${userName}님의 무의식적 편견 지수` : '당신의 무의식적 편견 지수';
  const displayTitle = title || defaultTitle;
  
  const circumference = 2 * Math.PI * chartSize.innerRadius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference * (1 - percentage / 100);
  const color = getColorForCategory(category);

  return (
    <div className={`bg-white rounded-2xl shadow-xl p-8 text-center ${className}`}>
      {/* 제목 */}
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        {displayTitle}
      </h2>
      
      {/* 도넛 차트 */}
      <div className="flex justify-center mb-8">
        <div 
          className="relative" 
          style={{ 
            width: chartSize.width, 
            height: chartSize.height,
            '--circumference': `${circumference}px`,
            '--stroke-dashoffset': `${strokeDashoffset}px`
          } as React.CSSProperties}
        >
          <svg 
            className="transform -rotate-90" 
            width={chartSize.width} 
            height={chartSize.height}
            viewBox={`0 0 ${chartSize.width} ${chartSize.height}`}
            role="img"
            aria-labelledby="chart-title"
            aria-describedby="chart-desc"
          >
            <title id="chart-title">편향성 지수 차트</title>
            <desc id="chart-desc">{`편향성 지수: ${percentage}%, 카테고리: ${category}`}</desc>
            
            {/* 배경 원 */}
            <circle
              cx={chartSize.width / 2}
              cy={chartSize.height / 2}
              r={chartSize.innerRadius}
              stroke="#e5e7eb"
              strokeWidth={chartSize.strokeWidth}
              fill="transparent"
              className="opacity-30"
            />
            
            {/* 진행률 원 - 애니메이션 포함 */}
            <circle
              cx={chartSize.width / 2}
              cy={chartSize.height / 2}
              r={chartSize.innerRadius}
              stroke={color}
              strokeWidth={chartSize.strokeWidth}
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={circumference}
              strokeLinecap="round"
              className="chart-progress"
              style={{
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
              }}
            />
          </svg>
          
          {/* 중앙 텍스트 - %만 표시 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div 
                className={`${chartSize.fontSize} font-black transition-all duration-1000 ease-out`}
                style={{ 
                  color,
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                {percentage}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {showGradientBar && (
        <>
          {/* 편향성 범위 바 */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              편향성 범위
            </h3>
            
            {/* 범위 표시 라벨 */}
            <div className="flex justify-between text-xs text-gray-600 mb-2">
              <span>매우 낮음</span>
              <span>낮음</span>
              <span>보통</span>
              <span>높음</span>
              <span>매우 높음</span>
            </div>
            
            {/* 그라데이션 바 */}
            <div className="relative h-6 rounded-full overflow-hidden" style={{
              background: 'linear-gradient(to right, #10b981 0%, #22c55e 20%, #f59e0b 40%, #f97316 60%, #ef4444 80%, #dc2626 100%)'
            }}>
              {/* 현재 위치 표시 */}
              <div
                className="absolute top-0 h-full w-1 bg-gray-800 shadow-lg transition-all duration-1000 ease-out"
                style={{ left: `${percentage}%`, transform: 'translateX(-50%)' }}
              />
            </div>
          </div>

          {/* 범례 */}
          <div className="flex justify-center space-x-6 text-sm">
            <div className="flex items-center">
              <div 
                className="w-4 h-4 rounded-full mr-2" 
                style={{ backgroundColor: color }}
              />
              <span className="text-gray-700">편향성</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-gray-300 mr-2" />
              <span className="text-gray-700">객관성</span>
            </div>
          </div>
        </>
      )}

    </div>
  );
}

export function getColorForCategory(category: string): string {
  switch (category) {
    case 'very_low':
      return '#10b981'; // green-500
    case 'low':
      return '#22c55e'; // green-400
    case 'moderate':
      return '#f59e0b'; // amber-500
    case 'high':
      return '#f97316'; // orange-500
    case 'very_high':
      return '#ef4444'; // red-500
    default:
      return '#6b7280'; // gray-500
  }
}