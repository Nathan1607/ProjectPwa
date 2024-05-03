import { toast } from 'react-toastify';
import Header from '../components/header/Header';
import '../style/Home.css';

export default function App() {

  const handleClickVibration = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(1000);
    } else {
      toast.error("L'API Vibration n'est pas disponible dans ce navigateur.");
    }
  };

  return (
    <div>
      <Header />
      <h1>Vous êtes sur la page Home</h1>
      <br />
      <button onClick={handleClickVibration}>Vibration</button>
    </div>
  );
}
