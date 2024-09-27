'use client'; // This is a client component

import { useEffect } from 'react';

function askNotificationPermission() {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications.');
    return;
  }

  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
    } else if (permission === 'denied') {
      console.log('Notification permission denied.');
    }
  });
}

export default function NotificationPermission() {
  useEffect(() => {
    // Call the notification permission request when the component loads
    askNotificationPermission();
  }, []);

  return null; // No visible UI needed
}