// ===== src/components/dashboard/RecentActivities.tsx =====
import React from 'react';
import { Users, Package, CheckCircle } from 'lucide-react';

export const RecentActivities: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'customer',
      title: 'New customer registered',
      time: '2 minutes ago',
      icon: Users,
      color: 'blue'
    },
    {
      id: 2,
      type: 'order',
      title: 'Order #1234 completed',
      time: '5 minutes ago',
      icon: Package,
      color: 'green'
    },
    {
      id: 3,
      type: 'task',
      title: 'Task completed successfully',
      time: '10 minutes ago',
      icon: CheckCircle,
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-600';
      case 'green':
        return 'bg-green-100 dark:bg-green-900/20 text-green-600';
      case 'purple':
        return 'bg-purple-100 dark:bg-purple-900/20 text-purple-600';
      default:
        return 'bg-gray-100 dark:bg-gray-900/20 text-gray-600';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Recent Activities
      </h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getColorClasses(activity.color)}`}>
              <activity.icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {activity.title}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};