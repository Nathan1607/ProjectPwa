import { toast } from 'react-toastify';
import Header from '../components/header/Header';
import '../style/Home.css'

export default function App() {

  const handleClick = () => {
    toast.info('Notification envoyée et affichée', {
      position: "top-right",
      autoClose: 5000,
      closeOnClick: true,
    });
    console.log('Notification envoyée');
  }

  const handleClickVibration = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(5000);
      console.log('Vibration envoyée')
    } else {
      toast.error('L\'API Vibration n\'est pas disponible dans ce navigateur.');
    }
  }

  const handleCall = () => {
    window.location.href = 'tel:0610040031'; // Remplacez +1234567890 par le numéro que vous souhaitez appeler
  };

  return (
      <div>
        <Header />
        <h1>Vous êtes sur la page Home</h1>
        <br />
        <button onClick={handleClick}>Notification</button>
        <button onClick={handleClickVibration}>Vibration</button>
        <button onClick={handleCall}>Appeler</button>
      </div>
  );
}

