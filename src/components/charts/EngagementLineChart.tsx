import { useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { format, parseISO } from 'date-fns';
import type { SocialChannel, EngagementMetric } from '../../types';
import { ChartTooltip } from './ChartTooltip';
import { formatNumber } from '../../utils/format';

interface EngagementLineChartProps {
  channels: SocialChannel[];
  metrics: EngagementMetric[];
}

export function EngagementLineChart({ channels, metrics }: EngagementLineChartProps) {
  const chartData = useMemo(() => {
    const dateMap = new Map<string, Record<string, number>>();

    metrics.forEach(m => {
      const channel = channels.find(c => c.id === m.channel_id);
      if (!channel) return;
      const entry = dateMap.get(m.date) || {};
      entry[channel.name] = m.likes + m.shares + m.comments;
      dateMap.set(m.date, entry);
    });

    return Array.from(dateMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, values]) => ({
        date: format(parseISO(date), 'MMM d'),
        ...values,
      }));
  }, [channels, metrics]);

  return (
    <div className="bg-bolt-ds-surfaceOne border border-bolt-ds-borderOutline rounded-lg p-6">
      <h3 className="text-base font-semibold text-bolt-ds-textPrimary mb-1">
        Engagement over time
      </h3>
      <p className="text-xs text-bolt-ds-textTertiary mb-6">
        Total interactions (likes + shares + comments) per channel
      </p>
      <div style={{ width: '100%', height: 340 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
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
            <Legend
              wrapperStyle={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}
            />
            {channels.map(channel => (
              <Line
                key={channel.id}
                type="monotone"
                dataKey={channel.name}
                stroke={channel.color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
