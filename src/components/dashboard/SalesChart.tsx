// ===== src/components/dashboard/SalesChart.tsx =====
import React from 'react';
import { MoreVertical } from 'lucide-react';
import type { SalesData } from '../../types';

interface SalesChartProps {
  data: SalesData[];
}

export const SalesChart: React.FC<SalesChartProps> = ({ data }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Monthly Sales</h3>
        <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          <MoreVertical className="w-4 h-4 text-gray-500" />
        </button>
      </div>
      
      <div className="flex items-end space-x-2 h-48">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div 
              className="w-full bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600 cursor-pointer"
              style={{ height: `${(item.value / maxValue) * 100}%` }}
              title={`${item.month}: ${item.value}`}
            />
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">{item.month}</span>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-4">
        <span>0</span>
        <span>200</span>
        <span>400</span>
      </div>
    </div>
  );
};
