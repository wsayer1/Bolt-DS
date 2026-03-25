import { useMemo } from 'react';
import type { SocialChannel, EngagementMetric } from '../types';

export interface ChannelSummary {
  totalFollowers: number;
  totalEngagement: number;
  avgImpressions: number;
  avgEngagementRate: number;
  topChannel: SocialChannel | null;
  channelStats: Array<{
    channel: SocialChannel;
    latestFollowers: number;
    totalLikes: number;
    totalShares: number;
    totalComments: number;
    totalImpressions: number;
    avgEngagementRate: number;
    followerGrowth: number;
  }>;
}

export function useChannelSummary(
  channels: SocialChannel[],
  metrics: EngagementMetric[]
): ChannelSummary {
  return useMemo(() => {
    if (!channels.length || !metrics.length) {
      return {
        totalFollowers: 0,
        totalEngagement: 0,
        avgImpressions: 0,
        avgEngagementRate: 0,
        topChannel: null,
        channelStats: [],
      };
    }

    const channelStats = channels.map(channel => {
      const channelMetrics = metrics.filter(m => m.channel_id === channel.id);
      const latest = channelMetrics[channelMetrics.length - 1];
      const earliest = channelMetrics[0];
      const totalLikes = channelMetrics.reduce((s, m) => s + m.likes, 0);
      const totalShares = channelMetrics.reduce((s, m) => s + m.shares, 0);
      const totalComments = channelMetrics.reduce((s, m) => s + m.comments, 0);
      const totalImpressions = channelMetrics.reduce((s, m) => s + m.impressions, 0);
      const avgEngagementRate = channelMetrics.length
        ? channelMetrics.reduce((s, m) => s + Number(m.engagement_rate), 0) / channelMetrics.length
        : 0;
      const followerGrowth = earliest && latest && earliest.followers > 0
        ? ((latest.followers - earliest.followers) / earliest.followers) * 100
        : 0;

      return {
        channel,
        latestFollowers: latest?.followers || 0,
        totalLikes,
        totalShares,
        totalComments,
        totalImpressions,
        avgEngagementRate: Math.round(avgEngagementRate * 100) / 100,
        followerGrowth: Math.round(followerGrowth * 100) / 100,
      };
    });

    const totalFollowers = channelStats.reduce((s, c) => s + c.latestFollowers, 0);
    const totalEngagement = channelStats.reduce(
      (s, c) => s + c.totalLikes + c.totalShares + c.totalComments,
      0
    );
    const avgImpressions = channelStats.length
      ? Math.round(channelStats.reduce((s, c) => s + c.totalImpressions, 0) / channelStats.length)
      : 0;
    const avgEngagementRate = channelStats.length
      ? Math.round(
          (channelStats.reduce((s, c) => s + c.avgEngagementRate, 0) / channelStats.length) * 100
        ) / 100
      : 0;
    const topChannel = channelStats.length
      ? channelStats.reduce((top, c) =>
          c.avgEngagementRate > top.avgEngagementRate ? c : top
        ).channel
      : null;

    return {
      totalFollowers,
      totalEngagement,
      avgImpressions,
      avgEngagementRate,
      topChannel,
      channelStats,
    };
  }, [channels, metrics]);
}
