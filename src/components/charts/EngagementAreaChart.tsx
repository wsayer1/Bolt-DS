import { useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { format, parseISO } from 'date-fns';
import type { EngagementMetric } from '../../types';
import { ChartTooltip } from './ChartTooltip';
import { formatNumber } from '../../utils/format';

interface EngagementAreaChartProps {
  metrics: EngagementMetric[];
}

export function EngagementAreaChart({ metrics }: EngagementAreaChartProps) {
  const chartData = useMemo(() => {
    const dateMap = new Map<string, { likes: number; shares: number; comments: number }>();

    metrics.forEach(m => {
      const entry = dateMap.get(m.date) || { likes: 0, shares: 0, comments: 0 };
      entry.likes += m.likes;
      entry.shares += m.shares;
      entry.comments += m.comments;
      dateMap.set(m.date, entry);
    });

    return Array.from(dateMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, values]) => ({
        date: format(parseISO(date), 'MMM d'),
        Likes: values.likes,
        Shares: values.shares,
        Comments: values.comments,
      }));
  }, [metrics]);

  return (
    <div className="bg-bolt-ds-surfaceOne border border-bolt-ds-borderOutline rounded-lg p-6">
      <h3 className="text-base font-semibold text-bolt-ds-textPrimary mb-1">
        Engagement composition
      </h3>
      <p className="text-xs text-bolt-ds-textTertiary mb-6">
        Breakdown of interaction types over time
      </p>
      <div style={{ width: '100%', height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis
            dataKey="date"
            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => formatNumber(v)}
          />
          <Tooltip content={<ChartTooltip />} />
          <Area
            type="monotone"
            dataKey="Likes"
            stackId="1"
            stroke="#22c55e"
            fill="#22c55e"
            fillOpacity={0.3}
          />
          <Area
            type="monotone"
            dataKey="Shares"
            stackId="1"
            stroke="#2ba6ff"
            fill="#2ba6ff"
            fillOpacity={0.3}
          />
          <Area
            type="monotone"
            dataKey="Comments"
            stackId="1"
            stroke="#f97316"
            fill="#f97316"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
}
