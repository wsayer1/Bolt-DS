import { useState } from 'react';
import { Alert, DefaultLoader } from '@blitz/design-system';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { OverviewSection } from './components/sections/OverviewSection';
import { ChannelDetailSection } from './components/sections/ChannelDetailSection';
import { NotificationsSection } from './components/sections/NotificationsSection';
import { SettingsSection } from './components/sections/SettingsSection';
import { useEngagementData } from './hooks/useEngagementData';
import { useChannelSummary } from './hooks/useChannelSummary';
import { useNotifications } from './hooks/useNotifications';
import type { DateRange, NavSection } from './types';

function App() {
  const [activeSection, setActiveSection] = useState<NavSection>('overview');
  const [dateRange, setDateRange] = useState<DateRange>('30d');

  const { channels, metrics, loading, error } = useEngagementData(dateRange);
  const summary = useChannelSummary(channels, metrics);
  const {
    notifications,
    loading: notificationsLoading,
    error: notificationsError,
    dismissNotification,
    unreadCount,
  } = useNotifications();

  return (
    <div className="flex min-h-screen bg-bolt-ds-surface">
      <Sidebar
        activeSection={activeSection}
        onNavigate={setActiveSection}
        unreadCount={unreadCount}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header dateRange={dateRange} onDateRangeChange={setDateRange} />

        <main className="flex-1 p-6">
          {loading && activeSection !== 'notifications' && activeSection !== 'settings' ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <DefaultLoader size="lg" />
              <p className="text-sm text-bolt-ds-textTertiary">Loading dashboard data...</p>
            </div>
          ) : error && activeSection !== 'notifications' && activeSection !== 'settings' ? (
            <Alert type="danger" title="Failed to load data">
              {error}
            </Alert>
          ) : (
            <>
              {activeSection === 'overview' && (
                <OverviewSection
                  summary={summary}
                  channels={channels}
                  metrics={metrics}
                />
              )}
              {activeSection === 'channels' && (
                <ChannelDetailSection summary={summary} />
              )}
              {activeSection === 'notifications' && (
                <NotificationsSection
                  notifications={notifications}
                  loading={notificationsLoading}
                  error={notificationsError}
                  onDismiss={dismissNotification}
                />
              )}
              {activeSection === 'settings' && <SettingsSection />}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
