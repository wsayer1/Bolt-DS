import { Avatar, Badge, Tooltip } from '@blitz/design-system';
import type { NavSection } from '../../types';

interface SidebarProps {
  activeSection: NavSection;
  onNavigate: (section: NavSection) => void;
  unreadCount: number;
}

const navItems: Array<{ key: NavSection; label: string; icon: string }> = [
  { key: 'overview', label: 'Overview', icon: 'i-ph:chart-line-up' },
  { key: 'channels', label: 'Channels', icon: 'i-ph:broadcast' },
  { key: 'notifications', label: 'Notifications', icon: 'i-ph:bell' },
  { key: 'settings', label: 'Settings', icon: 'i-ph:gear' },
];

export function Sidebar({ activeSection, onNavigate, unreadCount }: SidebarProps) {
  return (
    <aside className="w-64 bg-bolt-ds-surfaceOne border-r border-bolt-ds-borderOutline flex flex-col h-screen sticky top-0">
      <div className="p-4 border-b border-bolt-ds-borderOutline">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-bolt-ds-brand flex items-center justify-center">
            <span className="i-ph:chart-pie-slice text-bolt-ds-onBrand w-5 h-5" />
          </div>
          <span className="text-bolt-ds-textPrimary font-semibold text-lg">SocialPulse</span>
        </div>
      </div>

      <nav className="flex-1 p-3 flex flex-col gap-1">
        {navItems.map(item => {
          const isActive = activeSection === item.key;
          return (
            <Tooltip.Root key={item.key} delayDuration={600}>
              <Tooltip.Trigger asChild>
                <button
                  onClick={() => onNavigate(item.key)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-bolt-ds-brandContainer text-bolt-ds-onBrandContainer'
                      : 'text-bolt-ds-textSecondary'
                  }`}
                  style={!isActive ? { background: 'transparent' } : undefined}
                >
                  <span className={`${item.icon} w-5 h-5 shrink-0`} />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.key === 'notifications' && unreadCount > 0 && (
                    <Badge type="danger">{unreadCount}</Badge>
                  )}
                </button>
              </Tooltip.Trigger>
              <Tooltip.Content side="right" sideOffset={8}>
                {item.label}
              </Tooltip.Content>
            </Tooltip.Root>
          );
        })}
      </nav>

      <div className="p-4 border-t border-bolt-ds-borderOutline">
        <div className="flex items-center gap-3">
          <Avatar size="sm" user={{ name: 'Alex Morgan' }} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-bolt-ds-textPrimary truncate">Alex Morgan</p>
            <p className="text-xs text-bolt-ds-textTertiary truncate">Marketing Lead</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
