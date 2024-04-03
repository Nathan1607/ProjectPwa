// Permet d'installer le service worker
self.addEventListener("install", event => {
  console.log("Service Worker installing.");
});
  
// Permet d'activer le service worker
self.addEventListener("activate", event => {
  console.log("Service Worker activating.");
});

// Permet de recevoir et afficher des notifications
self.addEventListener('push', function(event) {
  const payload = event.data ? event.data.text() : 'Notification';

  event.waitUntil(
      self.registration.showNotification('Notification', {
          body: payload,
      })
  );
});
// Permet de fermer la notification lorsqu'on clique dessus
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
});