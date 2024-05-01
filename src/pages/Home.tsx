import { useState } from 'react';
import { toast } from 'react-toastify';
import Header from '../components/header/Header';
import '../style/Home.css';

export default function App() {
  const [phoneNumber, setPhoneNumber] = useState('');

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

  const handleCall = () => {
    if (phoneNumber) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      toast.error("Veuillez entrer un numéro de téléphone.");
    }
  };

  const handleKeyPress = (key: any) => {
    setPhoneNumber(prevPhoneNumber => prevPhoneNumber + key);
  };

  const handleDelete = () => {
    setPhoneNumber(prevPhoneNumber => prevPhoneNumber.slice(0, -1));
  };

  return (
    <div>
      <Header />
      <h1>Vous êtes sur la page Home</h1>
      <br />
      <div className="phone-keypad">
        <div className="phone-display">{phoneNumber}</div>
        <div className="phone-keys">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map(key => (
            <button key={key} onClick={() => handleKeyPress(key)}>
              {key}
            </button>
          ))}
          <button onClick={handleDelete}>Effacer</button>
        </div>
      </div>
      <br />
      <button onClick={handleClick}>Notification</button>
      <button onClick={handleClickVibration}>Vibration</button>
      <button onClick={handleCall}>Appeler</button>
    </div>
  );
}
