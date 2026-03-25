import { Badge, IconDecoration } from '@blitz/design-system';
import { formatNumber, formatPercent } from '../../utils/format';

interface MetricCardProps {
  title: string;
  value: number;
  change?: number;
  icon: string;
  iconVariant?: 'default' | 'brand' | 'success' | 'warning' | 'danger' | 'neutral';
  suffix?: string;
}

export function MetricCard({ title, value, change, icon, iconVariant = 'brand', suffix }: MetricCardProps) {
  const trendType = change !== undefined && change >= 0 ? 'success' : 'danger';

  return (
    <div className="bg-bolt-ds-surfaceOne border border-bolt-ds-borderOutline rounded-lg p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <IconDecoration icon={icon} variant={iconVariant} size="md" shape="rounded" />
        {change !== undefined && (
          <Badge type={trendType}>
            {formatPercent(change)}
          </Badge>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-bolt-ds-textPrimary">
          {suffix ? `${formatNumber(value)}${suffix}` : formatNumber(value)}
        </p>
        <p className="text-sm text-bolt-ds-textTertiary mt-1">{title}</p>
      </div>
    </div>
  );
}
