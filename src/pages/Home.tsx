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

  return (
      <div>
        <Header />
        <h1>Vous êtes sur la page Home</h1>
        <br />
        <button onClick={handleClick}>Notification</button>
      </div>
  );
}

