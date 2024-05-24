// Permet d'installer le service worker

self.addEventListener("install", event => {
  console.log("Service Worker installing.");
});
  
// Permet d'activer le service worker
self.addEventListener("activate", event => {
  console.log("Service Worker activating.");
});

// Gestion des notifications
self.addEventListener('notificationclick', event => {
  console.log('Notification click Received.', event);

  event.notification.close();

  // Ouvrir une fenêtre ou une application, par exemple
  // event.waitUntil(
  //   clients.openWindow('https://www.example.com')
  // );
});
