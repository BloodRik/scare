import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid 
} from 'recharts';
import { useThemeStore } from '../store/themeStore';

interface ChartDataPoint {
  name: string;
  UAH?: number;
  USD?: number;
  EUR?: number;
  BTC?: number;
  ETH?: number;
  USDT?: number;
}

interface InteractiveChartProps {
  data: ChartDataPoint[];
  dataKey: 'UAH' | 'USD' | 'EUR' | 'BTC' | 'ETH' | 'USDT';
  gradientColor?: string;
}

export const InteractiveChart: React.FC<InteractiveChartProps> = ({ 
  data, 
  dataKey,
  gradientColor = '#234CFF' 
}) => {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  // Customize formatting for currencies
  const formatYAxis = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value.toString();
  };

  const getCurrencySymbol = () => {
    switch (dataKey) {
      case 'UAH': return '₴';
      case 'USD': return '$';
      case 'EUR': return '€';
      case 'USDT': return '₮';
      case 'BTC': return '₿';
      case 'ETH': return 'Ξ';
      default: return '';
    }
  };

  return (
    <div className="w-full h-[230px]" id="interactive-chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 5, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={gradientColor} stopOpacity={0.4} />
              <stop offset="95%" stopColor={gradientColor} stopOpacity={0.0} />
            </linearGradient>
          </defs>

          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke={isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'} 
          />

          <XAxis 
            dataKey="name" 
            tickLine={false}
            axisLine={false}
            stroke={isDark ? '#4B5563' : '#9CA3AF'}
            style={{ fontSize: 11, fontFamily: 'Inter, sans-serif' }}
          />

          <YAxis 
            tickFormatter={formatYAxis}
            tickLine={false}
            axisLine={false}
            stroke={isDark ? '#4B5563' : '#9CA3AF'}
            style={{ fontSize: 11, fontFamily: 'Inter, sans-serif' }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#161B26' : '#FFFFFF',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              borderRadius: '16px',
              color: isDark ? '#FFFFFF' : '#0F172A',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px'
            }}
            formatter={(value: any) => [
              <span className="font-semibold text-slate-900 dark:text-white" key="val">
                {Number(value).toLocaleString()} {getCurrencySymbol()}
              </span>,
              null
            ]}
            labelFormatter={(label) => <span className="text-slate-400 font-medium">{label}</span>}
          />

          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={gradientColor}
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#chartGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
