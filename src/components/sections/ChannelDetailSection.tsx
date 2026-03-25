import { useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Checkbox,
  Button,
  Badge,
} from '@blitz/design-system';
import type { ChannelSummary } from '../../hooks/useChannelSummary';
import { formatNumber, formatPercent, getPlatformIcon } from '../../utils/format';

interface ChannelDetailSectionProps {
  summary: ChannelSummary;
}

export function ChannelDetailSection({ summary }: ChannelDetailSectionProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [exporting, setExporting] = useState(false);

  const allIds = summary.channelStats.map(s => s.channel.id);
  const allSelected = allIds.length > 0 && allIds.every(id => selectedIds.has(id));
  const someSelected = allIds.some(id => selectedIds.has(id)) && !allSelected;

  function toggleAll(checked: boolean | 'indeterminate') {
    if (checked === true) {
      setSelectedIds(new Set(allIds));
    } else {
      setSelectedIds(new Set());
    }
  }

  function toggleOne(id: string) {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function handleExport() {
    setExporting(true);
    setTimeout(() => setExporting(false), 2000);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-bolt-ds-textPrimary mb-1">Channels</h2>
          <p className="text-sm text-bolt-ds-textTertiary">Detailed breakdown by platform</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            startIcon="i-ph:arrow-square-out"
            onClick={handleExport}
            loading={exporting}
          >
            Export data
          </Button>
          <Button
            variant="ghost"
            size="sm"
            startIcon="i-ph:arrow-clockwise"
          >
            Refresh
          </Button>
        </div>
      </div>

      <div className="bg-bolt-ds-surfaceOne border border-bolt-ds-borderOutline rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={allSelected ? true : someSelected ? 'indeterminate' : false}
                  onChange={toggleAll}
                />
              </TableHead>
              <TableHead>Channel</TableHead>
              <TableHead>Followers</TableHead>
              <TableHead>Likes</TableHead>
              <TableHead>Shares</TableHead>
              <TableHead>Comments</TableHead>
              <TableHead>Impressions</TableHead>
              <TableHead>Eng. rate</TableHead>
              <TableHead>Growth</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {summary.channelStats.map(stat => (
              <TableRow key={stat.channel.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedIds.has(stat.channel.id)}
                    onChange={() => toggleOne(stat.channel.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <span
                      className={`${getPlatformIcon(stat.channel.platform)} w-5 h-5`}
                      style={{ color: stat.channel.color }}
                    />
                    <span className="text-bolt-ds-textPrimary font-medium">
                      {stat.channel.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-bolt-ds-textSecondary">
                  {formatNumber(stat.latestFollowers)}
                </TableCell>
                <TableCell className="text-bolt-ds-textSecondary">
                  {formatNumber(stat.totalLikes)}
                </TableCell>
                <TableCell className="text-bolt-ds-textSecondary">
                  {formatNumber(stat.totalShares)}
                </TableCell>
                <TableCell className="text-bolt-ds-textSecondary">
                  {formatNumber(stat.totalComments)}
                </TableCell>
                <TableCell className="text-bolt-ds-textSecondary">
                  {formatNumber(stat.totalImpressions)}
                </TableCell>
                <TableCell>
                  <Badge type={stat.avgEngagementRate > 8 ? 'success' : stat.avgEngagementRate > 5 ? 'brand' : 'warning'}>
                    {stat.avgEngagementRate.toFixed(1)}%
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className={stat.followerGrowth >= 0 ? 'text-bolt-ds-success' : 'text-bolt-ds-danger'}>
                    {formatPercent(stat.followerGrowth)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
