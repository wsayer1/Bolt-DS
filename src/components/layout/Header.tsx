import { Select, Button, Dropdown, Avatar } from '@blitz/design-system';
import type { DateRange } from '../../types';

interface HeaderProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
}

const dateRangeOptions = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
  { value: '6m', label: 'Last 6 months' },
];

export function Header({ dateRange, onDateRangeChange }: HeaderProps) {
  return (
    <header className="h-16 bg-bolt-ds-surfaceOne border-b border-bolt-ds-borderOutline px-6 flex items-center justify-between sticky top-0 z-10">
      <div>
        <h1 className="text-lg font-semibold text-bolt-ds-textPrimary">Social engagement</h1>
        <p className="text-xs text-bolt-ds-textTertiary">Monitor your social media performance</p>
      </div>

      <div className="flex items-center gap-4">
        <Select
          options={dateRangeOptions}
          value={dateRange}
          onValueChange={(v) => onDateRangeChange(v as DateRange)}
          size="md"
        />

        <Dropdown
          trigger={
            <Button variant="ghost" size="sm" className="p-1">
              <Avatar size="xs" user={{ name: 'Alex Morgan' }} />
            </Button>
          }
        >
          <Dropdown.Item>
            <span className="flex items-center gap-2">
              <span className="i-ph:user w-4 h-4" />
              Profile
            </span>
          </Dropdown.Item>
          <Dropdown.Item>
            <span className="flex items-center gap-2">
              <span className="i-ph:gear w-4 h-4" />
              Preferences
            </span>
          </Dropdown.Item>
          <Dropdown.Item>
            <span className="flex items-center gap-2">
              <span className="i-ph:sign-out w-4 h-4" />
              Sign out
            </span>
          </Dropdown.Item>
        </Dropdown>
      </div>
    </header>
  );
}
