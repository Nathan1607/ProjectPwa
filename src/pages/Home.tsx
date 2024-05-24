import Header from '../components/header/Header';
import '../style/Home.css';
import QRCode from 'qrcode.react';

export default function App() {

  const installUrl = 'https://nathan.gaulard.angers.mds-project.fr/';

  return (
    <div>
      <Header />
      <h1>Vous êtes sur la page Home</h1>
      <br />
      <h2>Scannez le QR code pour installer l'application</h2>
      <QRCode value={installUrl} />
    </div>
  );
}
