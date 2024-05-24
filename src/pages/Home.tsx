import Header from '../components/header/Header';
import '../style/Home.css';
import { QRCodeSVG } from 'qrcode.react';

export default function App() {

  const installUrl = 'https://nathan.gaulard.angers.mds-project.fr/';

  return (
    <div>
      <Header />
      <h1>Vous êtes sur la page Home</h1>
      <br />
      <h2>Scannez le QR code pour aller sur l'application</h2>
      <div className='QRCode'>
        <QRCodeSVG value={installUrl} />
      </div>    
    </div>
  );
}
