/*
  # Create notifications table

  1. New Tables
    - `notifications`
      - `id` (uuid, primary key)
      - `title` (text) - Notification title
      - `message` (text) - Notification body
      - `type` (text) - Semantic type (info, success, warning, danger, neutral)
      - `is_read` (boolean) - Read status
      - `created_at` (timestamptz) - Creation timestamp

  2. Security
    - Enable RLS on `notifications` table
    - Add public read policy for anonymous access
*/

CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  message text NOT NULL DEFAULT '',
  type text NOT NULL DEFAULT 'neutral',
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to notifications"
  ON notifications
  FOR SELECT
  TO anon
  USING (auth.role() = 'anon');

INSERT INTO notifications (title, message, type, is_read, created_at) VALUES
  ('Instagram milestone reached', 'Your Instagram account has crossed 500K followers. Engagement rate is up 12% this month.', 'success', false, now() - interval '2 hours'),
  ('YouTube engagement drop', 'YouTube comments decreased by 18% compared to last week. Consider reviewing your content strategy.', 'warning', false, now() - interval '6 hours'),
  ('Weekly report ready', 'Your weekly social media performance report for all channels is now available for download.', 'info', true, now() - interval '1 day'),
  ('TikTok account flagged', 'Unusual activity detected on your TikTok account. Please review recent posts and verify account security.', 'danger', false, now() - interval '2 days'),
  ('LinkedIn post went viral', 'Your latest LinkedIn article received 10x more impressions than your average. Great job!', 'success', true, now() - interval '3 days'),
  ('Scheduled maintenance', 'Platform analytics will undergo scheduled maintenance on Sunday 2:00 AM - 4:00 AM UTC.', 'neutral', true, now() - interval '4 days'),
  ('Facebook reach improved', 'Organic reach on Facebook has improved by 25% after the latest algorithm update.', 'info', false, now() - interval '5 days');