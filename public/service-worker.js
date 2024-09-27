self.addEventListener('push', (event) => {
    const data = event.data.json();
    const options = {
      body: data.message,
      icon: '/icon.png',  // Path to your notification icon
      badge: '/badge.png', // Path to your badge icon
    };
  
    event.waitUntil(
      self.registration.showNotification('New Notification', options)
    );
  });
  
  self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientList) => {
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url === '/' && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow('/'); // Open your app's main URL
        }
      })
    );
  });