import LocalisationView from "../components/localisation/LocalisationView";
import '../style/Localisation.css';
import Header from '../components/header/Header';
import MapView from "../components/localisation/MapView";

export default function Localisation() {

  return (
    <div>
        <Header />
        <h1>Localisation</h1>
        <div className="container-localisation">
        <LocalisationView />
        
        <p className="p-map">Map interactive :</p>
        <MapView />
        </div>
    </div>
  )
}
