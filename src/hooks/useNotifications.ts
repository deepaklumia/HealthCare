import { useEffect } from 'react';

export function useNotifications() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(console.error);
    }
  }, []);

  const requestPermission = async () => {
    if (!('Notification' in window)) return false;
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  };

  const sendNotification = async (title: string, body: string) => {
    const granted = await requestPermission();
    if (!granted) return;

    if (navigator.serviceWorker.controller) {
      const reg = await navigator.serviceWorker.ready;
      reg.showNotification(title, { body, icon: '/logo192.png', tag: 'healthcare-notification' });
    } else {
      new Notification(title, { body });
    }
  };

  return { sendNotification, requestPermission };
}
