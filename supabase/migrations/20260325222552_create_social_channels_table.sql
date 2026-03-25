/*
  # Create social channels table

  1. New Tables
    - `social_channels`
      - `id` (uuid, primary key)
      - `name` (text) - Display name of the channel
      - `platform` (text) - Platform key identifier
      - `color` (text) - Hex color for chart display
      - `description` (text) - Brief description of the channel
      - `created_at` (timestamptz) - Record creation timestamp

  2. Security
    - Enable RLS on `social_channels` table
    - Add public read policy for anonymous access (mock dashboard)
*/

CREATE TABLE IF NOT EXISTS social_channels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  platform text NOT NULL UNIQUE,
  color text NOT NULL DEFAULT '#2ba6ff',
  description text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE social_channels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to social channels"
  ON social_channels
  FOR SELECT
  TO anon
  USING (auth.role() = 'anon');

INSERT INTO social_channels (name, platform, color, description) VALUES
  ('Instagram', 'instagram', '#E1306C', 'Photo and video sharing platform'),
  ('X (Twitter)', 'twitter', '#1DA1F2', 'Microblogging and social networking'),
  ('YouTube', 'youtube', '#FF0000', 'Video sharing and streaming platform'),
  ('LinkedIn', 'linkedin', '#0A66C2', 'Professional networking platform'),
  ('Facebook', 'facebook', '#1877F2', 'Social networking platform'),
  ('TikTok', 'tiktok', '#00F2EA', 'Short-form video platform'),
  ('Reddit', 'reddit', '#FF4500', 'Community discussion platform');