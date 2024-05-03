import { toast } from 'react-toastify';
import Header from '../components/header/Header';
import '../style/Home.css';

export default function App() {
  const handleClick = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then((result) => {
        if (result === 'granted') {
          new Notification('Notification', {
            body: 'Ceci est une notification',
          });
        } else {
          throw new Error('Permission refusée');
        }
      });
    } else {
      throw new Error("L'API Notification n'est pas disponible dans ce navigateur.");
    }
  };

  const handleClickVibration = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(5000);
      console.log('Vibration envoyée');
    } else {
      toast.error("L'API Vibration n'est pas disponible dans ce navigateur.");
    }
  };

  return (
    <div>
      <Header />
      <h1>Vous êtes sur la page Home</h1>
      <br />
      <button onClick={handleClick}>Notification</button>
      <button onClick={handleClickVibration}>Vibration</button>
    </div>
  );
}
