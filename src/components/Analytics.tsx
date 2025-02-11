import React from 'react';
import { BarChart3, MessageSquare, Hash, Users } from 'lucide-react';

interface AnalyticsProps {
  content: string;
}

export function Analytics({ content }: AnalyticsProps) {
  const stats = [
    {
      icon: MessageSquare,
      label: 'Word Count',
      value: content ? content.split(/\s+/).filter(Boolean).length : 0,
    },
    {
      icon: Hash,
      label: 'Hashtags',
      value: content ? (content.match(/#\w+/g) || []).length : 0,
    },
    {
      icon: Users,
      label: 'Mentions',
      value: content ? (content.match(/@\w+/g) || []).length : 0,
    },
    {
      icon: BarChart3,
      label: 'Engagement Score',
      value: content ? Math.min(100, Math.floor(content.length / 30)) : 0,
    },
  ];

  return (
    <div className="mt-6 sm:mt-8">
      <h2 className="text-lg font-semibold mb-3 sm:mb-4 dark:text-white">Content Analytics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 overflow-y-auto touch-pan-y">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 sm:p-4 flex items-center space-x-3 sm:space-x-4 transition-colors duration-200"
          >
            <div className="bg-blue-50 dark:bg-blue-900/20 p-2 sm:p-3 rounded-lg">
              <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              <p className="text-xl sm:text-2xl font-semibold dark:text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}