// public/service-worker.js

self.addEventListener('push', function(event) {
    const options = {
      body: event.data ? event.data.text() : 'No data',
      icon: '/icon.png', // Replace with your icon path
      badge: '/badge.png', // Optional badge
    };
  
    event.waitUntil(
      self.registration.showNotification('New Notification', options)
    );
  });