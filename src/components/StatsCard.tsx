import type { ReactNode } from 'react';

const colorMap: Record<string, { bg: string; icon: string }> = {
  blue:   { bg: 'bg-blue-50',   icon: 'text-blue-600' },
  green:  { bg: 'bg-green-50',  icon: 'text-green-600' },
  yellow: { bg: 'bg-yellow-50', icon: 'text-yellow-600' },
  red:    { bg: 'bg-red-50',    icon: 'text-red-600' },
  purple: { bg: 'bg-purple-50', icon: 'text-purple-600' },
  teal:   { bg: 'bg-teal-50',   icon: 'text-teal-600' },
  gray:   { bg: 'bg-gray-50',   icon: 'text-gray-500' },
};

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: string;
}

export default function StatsCard({ title, value, icon, color = 'blue' }: StatsCardProps) {
  const { bg, icon: iconColor } = colorMap[color] ?? colorMap.blue;
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
      <div className={`${bg} ${iconColor} p-3 rounded-lg shrink-0`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm text-gray-500 truncate">{title}</p>
        <p className="text-2xl font-bold text-gray-900 leading-tight">{value}</p>
      </div>
    </div>
  );
}
