self.addEventListener("install", event => {
  console.log("Service Worker installing.");
});
  
self.addEventListener("activate", event => {
  console.log("Service Worker activating.");
});

self.addEventListener('notificationclick', event => {
  console.log('Notification click Received.', event);

  event.notification.close();
});
