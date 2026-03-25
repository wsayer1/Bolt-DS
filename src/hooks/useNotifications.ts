import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Notification } from '../types';

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNotifications() {
      setLoading(true);
      const { data, error: err } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false });

      if (err) {
        setError(err.message);
      } else {
        setNotifications(data || []);
      }
      setLoading(false);
    }

    fetchNotifications();
  }, []);

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return { notifications, loading, error, dismissNotification, unreadCount };
}
