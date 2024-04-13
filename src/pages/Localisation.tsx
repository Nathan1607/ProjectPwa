import { useEffect } from "react";
import LocalisationView from "../components/localisation/LocalisationView";
import '../style/Localisation.css';
import Header from '../components/Header';
import MapView from "../components/localisation/MapView";

export default function Localisation() {

  return (
    <div>
        <Header />
        <h1>Localisation</h1>
        <LocalisationView />
        <MapView />
    </div>
  )
}
