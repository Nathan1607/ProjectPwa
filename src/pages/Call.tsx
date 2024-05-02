import Header from '../components/header/Header';
import { useState } from 'react';

export default function Call() {

    const [phoneNumber, setPhoneNumber] = useState('');

    const handleCall = () => {
        if (phoneNumber.length == 10) {
          window.location.href = `tel:${phoneNumber}`;
        } else {
            console.log('Le numéro de téléphone doit contenir 10 chiffres.  ')
        }
      };
    
      const handleKeyPress = (key: any) => {
        if (phoneNumber.length < 10) {
          setPhoneNumber(prevPhoneNumber => prevPhoneNumber + key);
        }
      };
    
      const handleDelete = () => {
        setPhoneNumber(prevPhoneNumber => prevPhoneNumber.slice(0, -1));
      };
    
  return (
    <div>
      <Header />
      <h1>Vous êtes sur la page Call</h1>
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
      <button onClick={handleCall}>Appeler</button>
    </div>
  );
}
