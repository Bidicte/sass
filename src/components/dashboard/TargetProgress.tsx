// ===== src/components/dashboard/TargetProgress.tsx =====
import React from 'react';
import { MoreVertical, TrendingUp } from 'lucide-react';

interface TargetProgressProps {
  percentage: number;
  change: number;
  earnings: number;
}

export const TargetProgress: React.FC<TargetProgressProps> = ({ 
  percentage, 
  change, 
  earnings 
}) => {
  const circumference = 2 * Math.PI * 70;
  const strokeDasharray = (percentage / 100) * circumference;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Monthly Target</h3>
        <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          <MoreVertical className="w-4 h-4 text-gray-500" />
        </button>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Target you've set for each month
      </p>
      
      <div className="flex flex-col items-center">
        <div className="relative w-40 h-40 mb-4">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-gray-200 dark:text-gray-700"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${strokeDasharray} ${circumference}`}
              className="text-blue-500 transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {percentage}%
            </span>
            <div className="flex items-center space-x-1 text-green-600">
              <TrendingUp className="w-3 h-3" />
              <span className="text-xs">+{change}%</span>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
          You earn ${earnings.toLocaleString()} today, it's higher than last month. Keep up your good work!
        </p>
      </div>
    </div>
  );
};