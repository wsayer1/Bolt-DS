export interface SocialChannel {
  id: string;
  name: string;
  platform: string;
  color: string;
  description: string;
  created_at: string;
}

export interface EngagementMetric {
  id: string;
  channel_id: string;
  date: string;
  followers: number;
  likes: number;
  shares: number;
  comments: number;
  impressions: number;
  engagement_rate: number;
  created_at: string;
}

export interface EngagementWithChannel extends EngagementMetric {
  social_channels: SocialChannel;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'neutral' | 'info' | 'success' | 'warning' | 'danger';
  is_read: boolean;
  created_at: string;
}

export type DateRange = '7d' | '30d' | '90d' | '6m';

export type MetricKey = 'followers' | 'likes' | 'shares' | 'comments' | 'impressions';

export type NavSection = 'overview' | 'channels' | 'notifications' | 'settings';
