import Header from '../components/header/Header';
import '../style/Home.css'

export default function App() {

  const handleClick = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      console.log('Notification permission granted.')
      new Notification('Titre de la notification', {
        body: 'Contenu de la notification'
      });
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('Titre de la notification', {
            body: 'Contenu de la notification'
          });
        }
      });
    }
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

