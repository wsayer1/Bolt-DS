import { Alert, DefaultLoader, IconDecoration, Button } from '@blitz/design-system';
import type { Notification } from '../../types';
import { formatDistanceToNow, parseISO } from 'date-fns';

interface NotificationsSectionProps {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  onDismiss: (id: string) => void;
}

export function NotificationsSection({
  notifications,
  loading,
  error,
  onDismiss,
}: NotificationsSectionProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <DefaultLoader size="lg" />
        <p className="text-sm text-bolt-ds-textTertiary">Loading notifications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert type="danger" title="Failed to load notifications">
        {error}
      </Alert>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-bolt-ds-textPrimary mb-1">Notifications</h2>
        <p className="text-sm text-bolt-ds-textTertiary">Recent alerts and updates</p>
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4 bg-bolt-ds-surfaceOne border border-bolt-ds-borderOutline rounded-lg">
          <IconDecoration icon="i-ph:bell-slash" variant="brand" size="xl" shape="circle" />
          <div className="text-center">
            <p className="text-bolt-ds-textPrimary font-medium">No notifications</p>
            <p className="text-sm text-bolt-ds-textTertiary mt-1">
              You're all caught up. Check back later.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {notifications.map(notification => (
            <Alert
              key={notification.id}
              type={notification.type}
              title={notification.title}
              onClose={() => onDismiss(notification.id)}
              actions={
                notification.type === 'danger' ? (
                  <Button variant="tint" tint="danger" size="xs">
                    Review now
                  </Button>
                ) : notification.type === 'success' ? (
                  <Button variant="tint" tint="success" size="xs">
                    View details
                  </Button>
                ) : undefined
              }
            >
              <div className="flex flex-col gap-1">
                <span>{notification.message}</span>
                <span className="text-xs opacity-60">
                  {formatDistanceToNow(parseISO(notification.created_at), { addSuffix: true })}
                </span>
              </div>
            </Alert>
          ))}
        </div>
      )}
    </div>
  );
}
