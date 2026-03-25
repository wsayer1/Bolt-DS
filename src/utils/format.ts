export function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`;
  }
  return num.toString();
}

export function formatPercent(num: number): string {
  const sign = num >= 0 ? '+' : '';
  return `${sign}${num.toFixed(1)}%`;
}

export function getPlatformIcon(platform: string): string {
  switch (platform) {
    case 'instagram': return 'i-ph:instagram-logo';
    case 'twitter': return 'i-ph:x-logo';
    case 'youtube': return 'i-ph:youtube-logo';
    case 'linkedin': return 'i-ph:linkedin-logo';
    case 'facebook': return 'i-ph:facebook-logo';
    case 'tiktok': return 'i-ph:tiktok-logo';
    case 'reddit': return 'i-ph:reddit-logo';
    default: return 'i-ph:globe';
  }
}
