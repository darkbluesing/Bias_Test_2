'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface ResultChartProps {
  percentage: number;
  category: 'very_low' | 'low' | 'moderate' | 'high' | 'very_high';
  className?: string;
}

export function ResultChart({ percentage, category, className = '' }: ResultChartProps) {
  const remainingPercentage = 100 - percentage;
  
  const pieData = [
    { name: 'Bias', value: percentage, color: getColorForCategory(category) },
    { name: 'Remaining', value: remainingPercentage, color: '#e5e7eb' },
  ];

  const barData = [
    { name: 'Your Score', value: percentage, color: getColorForCategory(category) }
  ];

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      {/* 백분율 표시 - 상단 강조 */}
      <div className="text-center mb-8">
        <div className="relative inline-block">
          <div className="text-6xl md:text-7xl font-bold mb-2" style={{ color: getColorForCategory(category) }}>
            {percentage}%
          </div>
          <div className="text-lg text-gray-600 font-medium">
            편향성 지수
          </div>
        </div>
      </div>

      {/* 차트 섹션 */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* 파이 차트 */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">전체 비율</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                startAngle={90}
                endAngle={450}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 바 차트 */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">점수 분포</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={(value) => `${value}%`} />
              <Bar dataKey="value" fill={getColorForCategory(category)} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 레벨 인디케이터 */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-600 mb-2">
          <span>매우 낮음</span>
          <span>낮음</span>
          <span>보통</span>
          <span>높음</span>
          <span>매우 높음</span>
        </div>
        <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
          <div className="absolute inset-0 flex">
            <div className="bg-green-400 h-full" style={{ width: '20%' }} />
            <div className="bg-green-300 h-full" style={{ width: '20%' }} />
            <div className="bg-yellow-400 h-full" style={{ width: '20%' }} />
            <div className="bg-orange-400 h-full" style={{ width: '20%' }} />
            <div className="bg-red-400 h-full" style={{ width: '20%' }} />
          </div>
          {/* 현재 위치 표시 */}
          <div
            className="absolute top-0 h-full w-1 bg-gray-800 shadow-lg"
            style={{ left: `${percentage}%`, transform: 'translateX(-50%)' }}
          />
        </div>
      </div>

      {/* 범례 */}
      <div className="flex justify-center">
        <div className="inline-flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: getColorForCategory(category) }}
            />
            <span>편향성</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-gray-300 mr-2" />
            <span>객관성</span>
          </div>
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