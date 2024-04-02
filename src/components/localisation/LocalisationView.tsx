import { useEffect } from "react";

export default function LocalisationView() {

  const requestNotificationPermission = async () => {
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        await Notification.requestPermission();
    }
  };

  const showNotification = () => {
    if (Notification.permission === 'granted') {
        new Notification("Notification de LocalisationView", {
            body: "Voici une notification!",
        });
        console.log("Notification envoyée.");
    } else {
        console.log("La permission de notification n'a pas été accordée.");
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);


  return (
    <div>
        <p>LocalisationView</p>
        <br />
        <button onClick={showNotification}>Envoyer Notification</button>
    </div>
  )
}
