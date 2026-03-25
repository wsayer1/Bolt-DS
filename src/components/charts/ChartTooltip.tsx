import { formatNumber } from '../../utils/format';

interface TooltipPayloadEntry {
  color?: string;
  name?: string;
  value?: number;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: string;
}

export function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-bolt-ds-surfaceTwo border border-bolt-ds-borderOutline rounded-lg p-3 shadow-lg">
      <p className="text-xs text-bolt-ds-textTertiary mb-2">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-bolt-ds-textSecondary">{entry.name}:</span>
          <span className="text-bolt-ds-textPrimary font-medium">
            {formatNumber(entry.value ?? 0)}
          </span>
        </div>
      ))}
    </div>
  );
}
