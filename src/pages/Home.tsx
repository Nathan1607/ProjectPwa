import { toast } from 'react-toastify';
import Header from '../components/header/Header';
import '../style/Home.css';

export default function App() {

  const handleClick = () => {
    toast.info('Notification envoyée et affichée', {
      position: "top-right",
      autoClose: 5000,
      closeOnClick: true,
    });
    console.log('Notification envoyée');
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
