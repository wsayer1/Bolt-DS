/*
  # Seed engagement metrics data

  Generates ~180 days (6 months) of daily engagement metrics for all 7 social channels.
  Each channel has different baseline metrics and growth patterns to create realistic data.

  - Instagram: High engagement, steady growth
  - X (Twitter): Moderate engagement, volatile
  - YouTube: High impressions, moderate engagement
  - LinkedIn: Lower volume, high engagement rate
  - Facebook: Large follower base, declining engagement
  - TikTok: Fast growth, high engagement
  - Reddit: Moderate, community-driven spikes
*/

DO $$
DECLARE
  ch RECORD;
  d date;
  day_num integer;
  base_followers integer;
  base_likes integer;
  base_shares integer;
  base_comments integer;
  base_impressions integer;
  v_followers integer;
  v_likes integer;
  v_shares integer;
  v_comments integer;
  v_impressions integer;
  v_engagement_rate numeric(5,2);
  noise numeric;
  growth numeric;
BEGIN
  FOR ch IN SELECT id, platform FROM social_channels LOOP
    FOR day_num IN 0..179 LOOP
      d := CURRENT_DATE - (179 - day_num);
      noise := (random() - 0.5) * 0.3;
      growth := 1.0 + (day_num::numeric / 180.0) * 0.2;

      IF ch.platform = 'instagram' THEN
        base_followers := 480000; base_likes := 12000; base_shares := 3200; base_comments := 1800; base_impressions := 250000;
      ELSIF ch.platform = 'twitter' THEN
        base_followers := 320000; base_likes := 8500; base_shares := 4500; base_comments := 2200; base_impressions := 180000;
      ELSIF ch.platform = 'youtube' THEN
        base_followers := 750000; base_likes := 15000; base_shares := 2000; base_comments := 3500; base_impressions := 500000;
      ELSIF ch.platform = 'linkedin' THEN
        base_followers := 95000; base_likes := 3200; base_shares := 1800; base_comments := 900; base_impressions := 60000;
      ELSIF ch.platform = 'facebook' THEN
        base_followers := 620000; base_likes := 7000; base_shares := 2800; base_comments := 1500; base_impressions := 320000;
      ELSIF ch.platform = 'tiktok' THEN
        base_followers := 280000; base_likes := 25000; base_shares := 8000; base_comments := 4500; base_impressions := 600000;
      ELSIF ch.platform = 'reddit' THEN
        base_followers := 150000; base_likes := 6000; base_shares := 1200; base_comments := 3800; base_impressions := 120000;
      END IF;

      v_followers := (base_followers * growth * (1.0 + noise * 0.05))::integer;
      v_likes := (base_likes * (1.0 + noise + sin(day_num::numeric / 7.0) * 0.15) * growth)::integer;
      v_shares := (base_shares * (1.0 + noise + sin(day_num::numeric / 10.0) * 0.1) * growth)::integer;
      v_comments := (base_comments * (1.0 + noise + cos(day_num::numeric / 5.0) * 0.2) * growth)::integer;
      v_impressions := (base_impressions * (1.0 + noise + sin(day_num::numeric / 14.0) * 0.2) * growth)::integer;

      IF v_likes < 0 THEN v_likes := 100; END IF;
      IF v_shares < 0 THEN v_shares := 50; END IF;
      IF v_comments < 0 THEN v_comments := 50; END IF;
      IF v_impressions < 1 THEN v_impressions := 1000; END IF;

      v_engagement_rate := ROUND(((v_likes + v_shares + v_comments)::numeric / v_impressions::numeric) * 100, 2);
      IF v_engagement_rate > 99.99 THEN v_engagement_rate := 99.99; END IF;

      INSERT INTO engagement_metrics (channel_id, date, followers, likes, shares, comments, impressions, engagement_rate)
      VALUES (ch.id, d, v_followers, v_likes, v_shares, v_comments, v_impressions, v_engagement_rate);
    END LOOP;
  END LOOP;
END $$;