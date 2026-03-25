import { useState } from 'react';
import {
  OptionCard,
  OptionCardGroup,
  Switch,
  Select,
  Checkbox,
  Input,
  Button,
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  DialogButton,
  DialogClose,
} from '@blitz/design-system';

export function SettingsSection() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState('15');
  const [showInactive, setShowInactive] = useState(false);
  const [dashboardName, setDashboardName] = useState('Social engagement');
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-bolt-ds-textPrimary mb-1">Settings</h2>
        <p className="text-sm text-bolt-ds-textTertiary">Configure your dashboard preferences</p>
      </div>

      <div className="bg-bolt-ds-surfaceOne border border-bolt-ds-borderOutline rounded-lg p-6">
        <h3 className="text-base font-semibold text-bolt-ds-textPrimary mb-4">General</h3>
        <Input
          label="Dashboard name"
          value={dashboardName}
          onValueChange={setDashboardName}
          labelTooltip="This name appears in the header and browser tab"
          hint="Choose a descriptive name for your dashboard"
          placeholder="Enter dashboard name"
        />
      </div>

      <div className="bg-bolt-ds-surfaceOne border border-bolt-ds-borderOutline rounded-lg overflow-hidden">
        <div className="px-6 pt-5 pb-3">
          <h3 className="text-base font-semibold text-bolt-ds-textPrimary">Notifications</h3>
        </div>
        <OptionCardGroup>
          <OptionCard
            title="Email notifications"
            description="Receive email alerts when important events occur"
            action={
              <Switch
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
                size="sm"
              />
            }
          />
          <OptionCard
            title="Weekly digest"
            description="Get a summary of your social media performance every Monday"
            action={
              <Switch
                checked={weeklyDigest}
                onCheckedChange={setWeeklyDigest}
                size="sm"
              />
            }
          />
          <OptionCard
            title="Dark mode"
            description="Use dark theme for the dashboard interface"
            action={
              <Switch checked={true} disabled size="sm" />
            }
          />
        </OptionCardGroup>
      </div>

      <div className="bg-bolt-ds-surfaceOne border border-bolt-ds-borderOutline rounded-lg overflow-hidden">
        <div className="px-6 pt-5 pb-3">
          <h3 className="text-base font-semibold text-bolt-ds-textPrimary">Data</h3>
        </div>
        <OptionCardGroup>
          <OptionCard
            title="Refresh interval"
            description="How often to automatically refresh the dashboard data"
            action={
              <Select
                options={[
                  { value: '5', label: '5 min' },
                  { value: '15', label: '15 min' },
                  { value: '30', label: '30 min' },
                  { value: '60', label: '1 hour' },
                ]}
                value={refreshInterval}
                onValueChange={setRefreshInterval}
                size="md"
              />
            }
          />
          <OptionCard
            title="Show inactive channels"
            description="Include channels with no recent activity in reports"
            action={
              <Checkbox
                checked={showInactive}
                onChange={(val) => setShowInactive(val === true)}
              />
            }
          />
        </OptionCardGroup>
      </div>

      <div className="bg-bolt-ds-surfaceOne border border-bolt-ds-borderOutline rounded-lg p-6">
        <h3 className="text-base font-semibold text-bolt-ds-textPrimary mb-2">Danger zone</h3>
        <p className="text-sm text-bolt-ds-textTertiary mb-4">
          Irreversible actions that affect your dashboard configuration
        </p>
        <Button
          variant="primary"
          tint="danger"
          size="sm"
          startIcon="i-ph:arrow-counter-clockwise"
          onClick={() => setResetDialogOpen(true)}
        >
          Reset dashboard
        </Button>
      </div>

      <Dialog
        open={resetDialogOpen}
        onClose={() => setResetDialogOpen(false)}
        showCloseButton
        closeOnBackdropClick
      >
        <DialogHeader
          title="Reset dashboard"
          description="This will reset all settings and customizations to their default values."
          badge="danger"
          badgeIcon="i-ph:warning"
        />
        <DialogContent>
          <p className="text-sm text-bolt-ds-textSecondary">
            Are you sure you want to reset your dashboard? This action cannot be undone.
            All custom settings, notification preferences, and layout changes will be lost.
          </p>
        </DialogContent>
        <DialogActions>
          <DialogClose asChild>
            <DialogButton variant="secondary">Cancel</DialogButton>
          </DialogClose>
          <DialogButton
            variant="primary"
            tint="danger"
            onClick={() => setResetDialogOpen(false)}
          >
            Reset
          </DialogButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
