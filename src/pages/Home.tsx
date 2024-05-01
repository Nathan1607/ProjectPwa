import { toast } from 'react-toastify';
import Header from '../components/header/Header';
import '../style/Home.css'

export default function App() {

  const handleClick = () => {
    toast.info('Notification envoyée et affichée', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
    });
    console.log('Notification envoyée');
  }

  const handleClickVibration = () => {
    // Vérifier si l'API Vibration est disponible dans le navigateur
    if ('vibrate' in navigator) {
      // Faire vibrer l'appareil pendant 1000 ms
      navigator.vibrate(1000);
    } else {
      // Si l'API Vibration n'est pas disponible, afficher un message d'erreur
      toast.error('L\'API Vibration n\'est pas disponible dans ce navigateur.');
    }
  }

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

