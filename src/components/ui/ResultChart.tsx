'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ResultChartProps {
  percentage: number;
  category: 'very_low' | 'low' | 'moderate' | 'high' | 'very_high';
  userName?: string;
  className?: string;
}

export function ResultChart({ percentage, category, userName, className = '' }: ResultChartProps) {
  const remainingPercentage = 100 - percentage;
  
  const pieData = [
    { name: 'Bias', value: percentage },
    { name: 'Remaining', value: remainingPercentage },
  ];

  return (
    <div className={`bg-white rounded-2xl shadow-xl p-8 text-center ${className}`}>
      {/* 당신의 편향성 지수 제목 */}
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        {userName ? `${userName}님의 편향성 지수` : '당신의 편향성 지수'}
      </h2>
      
      {/* 도넛 차트 */}
      <div className="relative mb-8">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
              startAngle={90}
              endAngle={450}
            >
              <Cell fill={getColorForCategory(category)} />
              <Cell fill="#e5e7eb" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* 중앙 백분율 표시 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div 
              className="text-5xl md:text-6xl font-black mb-2"
              style={{ color: getColorForCategory(category) }}
            >
              {percentage}%
            </div>
          </div>
        </div>
      </div>

      {/* 편향성 범위 바 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          매우 높은 편향성 (81-100%)
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
            className="absolute top-0 h-full w-1 bg-gray-800 shadow-lg"
            style={{ left: `${percentage}%`, transform: 'translateX(-50%)' }}
          />
        </div>
      </div>

      {/* 범례 */}
      <div className="flex justify-center space-x-6 text-sm">
        <div className="flex items-center">
          <div 
            className="w-4 h-4 rounded-full mr-2" 
            style={{ backgroundColor: getColorForCategory(category) }}
          />
          <span className="text-gray-700">편향성</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-gray-300 mr-2" />
          <span className="text-gray-700">객관성</span>
        </div>
      </div>
    </div>
  );
}

function getColorForCategory(category: string): string {
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