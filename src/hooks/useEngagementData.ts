import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { SocialChannel, EngagementMetric, DateRange } from '../types';
import { subDays, subMonths, format } from 'date-fns';

function getStartDate(range: DateRange): string {
  const now = new Date();
  switch (range) {
    case '7d': return format(subDays(now, 7), 'yyyy-MM-dd');
    case '30d': return format(subDays(now, 30), 'yyyy-MM-dd');
    case '90d': return format(subDays(now, 90), 'yyyy-MM-dd');
    case '6m': return format(subMonths(now, 6), 'yyyy-MM-dd');
  }
}

export function useEngagementData(dateRange: DateRange) {
  const [channels, setChannels] = useState<SocialChannel[]>([]);
  const [metrics, setMetrics] = useState<EngagementMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      setError(null);

      const startDate = getStartDate(dateRange);

      const [channelRes, metricsRes] = await Promise.all([
        supabase.from('social_channels').select('*').order('name'),
        supabase
          .from('engagement_metrics')
          .select('*')
          .gte('date', startDate)
          .order('date', { ascending: true }),
      ]);

      if (cancelled) return;

      if (channelRes.error) {
        setError(channelRes.error.message);
        setLoading(false);
        return;
      }
      if (metricsRes.error) {
        setError(metricsRes.error.message);
        setLoading(false);
        return;
      }

      setChannels(channelRes.data || []);
      setMetrics(metricsRes.data || []);
      setLoading(false);
    }

    fetchData();
    return () => { cancelled = true; };
  }, [dateRange]);

  return { channels, metrics, loading, error };
}
