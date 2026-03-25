import type { ChannelSummary } from '../../hooks/useChannelSummary';
import type { SocialChannel, EngagementMetric } from '../../types';
import { MetricCard } from '../cards/MetricCard';
import { EngagementLineChart } from '../charts/EngagementLineChart';
import { EngagementAreaChart } from '../charts/EngagementAreaChart';
import { ChannelBarChart } from '../charts/ChannelBarChart';

interface OverviewSectionProps {
  summary: ChannelSummary;
  channels: SocialChannel[];
  metrics: EngagementMetric[];
}

export function OverviewSection({ summary, channels, metrics }: OverviewSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-bolt-ds-textPrimary mb-1">Overview</h2>
        <p className="text-sm text-bolt-ds-textTertiary">Key performance indicators across all channels</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total followers"
          value={summary.totalFollowers}
          change={8.2}
          icon="i-ph:users-three"
          iconVariant="brand"
        />
        <MetricCard
          title="Total engagement"
          value={summary.totalEngagement}
          change={12.5}
          icon="i-ph:heart"
          iconVariant="success"
        />
        <MetricCard
          title="Avg. impressions"
          value={summary.avgImpressions}
          change={-3.1}
          icon="i-ph:eye"
          iconVariant="warning"
        />
        <MetricCard
          title="Engagement rate"
          value={summary.avgEngagementRate}
          change={5.4}
          icon="i-ph:chart-line-up"
          iconVariant="brand"
          suffix="%"
        />
      </div>

      <EngagementLineChart channels={channels} metrics={metrics} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EngagementAreaChart metrics={metrics} />
        <ChannelBarChart summary={summary} />
      </div>
    </div>
  );
}
