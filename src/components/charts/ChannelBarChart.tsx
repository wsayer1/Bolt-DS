import { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';
import { Select } from '@blitz/design-system';
import type { ChannelSummary } from '../../hooks/useChannelSummary';
import { ChartTooltip } from './ChartTooltip';
import { formatNumber } from '../../utils/format';

interface ChannelBarChartProps {
  summary: ChannelSummary;
}

const metricOptions = [
  { value: 'totalLikes', label: 'Likes' },
  { value: 'totalShares', label: 'Shares' },
  { value: 'totalComments', label: 'Comments' },
  { value: 'totalImpressions', label: 'Impressions' },
  { value: 'latestFollowers', label: 'Followers' },
];

type StatKey = 'totalLikes' | 'totalShares' | 'totalComments' | 'totalImpressions' | 'latestFollowers';

export function ChannelBarChart({ summary }: ChannelBarChartProps) {
  const [selectedMetric, setSelectedMetric] = useState<StatKey>('totalLikes');

  const chartData = summary.channelStats.map(stat => ({
    name: stat.channel.name,
    value: stat[selectedMetric],
    color: stat.channel.color,
  }));

  return (
    <div className="bg-bolt-ds-surfaceOne border border-bolt-ds-borderOutline rounded-lg p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-bolt-ds-textPrimary mb-1">
            Channel comparison
          </h3>
          <p className="text-xs text-bolt-ds-textTertiary">
            Compare metrics across channels
          </p>
        </div>
        <Select
          options={metricOptions}
          value={selectedMetric}
          onValueChange={(v) => setSelectedMetric(v as StatKey)}
          size="md"
        />
      </div>
      <div style={{ width: '100%', height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis
            dataKey="name"
            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          />
          <YAxis
            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => formatNumber(v)}
          />
          <Tooltip content={<ChartTooltip />} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} name={metricOptions.find(o => o.value === selectedMetric)?.label}>
            {chartData.map((entry, index) => (
              <Cell key={index} fill={entry.color} fillOpacity={0.85} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
}
