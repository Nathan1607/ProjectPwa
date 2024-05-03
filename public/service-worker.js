// Permet d'installer le service worker
self.addEventListener("install", event => {
  console.log("Service Worker installing.");
});
  
// Permet d'activer le service worker
self.addEventListener("activate", event => {
  console.log("Service Worker activating.");
});
