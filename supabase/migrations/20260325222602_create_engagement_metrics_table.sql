/*
  # Create engagement metrics table

  1. New Tables
    - `engagement_metrics`
      - `id` (uuid, primary key)
      - `channel_id` (uuid, FK to social_channels)
      - `date` (date) - Metric date
      - `followers` (integer) - Follower count
      - `likes` (integer) - Likes count
      - `shares` (integer) - Shares count
      - `comments` (integer) - Comments count
      - `impressions` (integer) - Impressions count
      - `engagement_rate` (numeric) - Engagement rate percentage

  2. Security
    - Enable RLS on `engagement_metrics` table
    - Add public read policy for anonymous access

  3. Indexes
    - Index on channel_id and date for efficient querying
*/

CREATE TABLE IF NOT EXISTS engagement_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_id uuid NOT NULL REFERENCES social_channels(id),
  date date NOT NULL,
  followers integer NOT NULL DEFAULT 0,
  likes integer NOT NULL DEFAULT 0,
  shares integer NOT NULL DEFAULT 0,
  comments integer NOT NULL DEFAULT 0,
  impressions integer NOT NULL DEFAULT 0,
  engagement_rate numeric(5,2) NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(channel_id, date)
);

CREATE INDEX IF NOT EXISTS idx_engagement_metrics_channel_date
  ON engagement_metrics(channel_id, date);

ALTER TABLE engagement_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to engagement metrics"
  ON engagement_metrics
  FOR SELECT
  TO anon
  USING (auth.role() = 'anon');