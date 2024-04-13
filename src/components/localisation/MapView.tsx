import { useEffect, useRef } from "react";
import '../../style/Localisation.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


interface LocationData {
  latitude: number;
  longitude: number;
}

export default function MapView() {
  
    const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const locationString = localStorage.getItem('location');
    if (locationString) {
        try {
            const locationData: LocationData = JSON.parse(locationString);

            createMap(locationData);
        } catch (error) {
            console.error('Erreur lors de la conversion des données JSON :', error);
        }
    } else {
        console.log('Aucune donnée de localisation trouvée dans le localStorage.');
    }
  }, []);

  const createMap = (location: LocationData) => {
    if (mapRef.current) {
        mapRef.current.innerHTML = '';
      }

    const map = initializeMap(location);
    addMarkerToMap(map, location.latitude, location.longitude);
  }

  const initializeMap = (location: LocationData) => {
    const map = L.map(mapRef.current!).setView([location.latitude, location.longitude], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    return map;
  };

  const addMarkerToMap = (map: L.Map, lat: number, lng: number) => {
    L.marker([lat, lng]).addTo(map);
  };

  return (
    <div className="location-container">
      {location ? (
        <div className="location-info">
          <div ref={mapRef} id="map" style={{ height: "20rem", width: "30rem" }}></div>
        </div>
      ) : (
        <p>En attente de la localisation...</p>
      )}
    </div>
  );
}
