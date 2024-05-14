import { useEffect, useRef, useState } from "react";
import '../../style/Localisation.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface LocationData {
  latitude: number;
  longitude: number;
}

export default function MapView() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    const updateLocation = () => {
      const locationString = localStorage.getItem('location');
      if (locationString) {
        try {
          const locationData: LocationData = JSON.parse(locationString);
          console.log('Données de localisation récupérées:', locationData);
          setLocation(locationData);
        } catch (error) {
          console.error('Erreur lors de la conversion des données JSON :', error);
        }
      } else {
        console.log('Aucune donnée de localisation trouvée dans le localStorage.');
      }
    };

    // Chargement initial
    updateLocation();

    // Écouter les changements de storage
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'location') {
        console.log('localStorage "location" modifié:', event.newValue);
        updateLocation();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (location && mapRef.current) {
      console.log('Mise à jour de la carte avec la localisation:', location);

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      mapInstanceRef.current = initializeMap(location);
      addMarkerToMap(mapInstanceRef.current, location.latitude, location.longitude);
    }
  }, [location]);

  const initializeMap = (location: LocationData) => {
    const map = L.map(mapRef.current!).setView([location.latitude, location.longitude], 13);
    console.log('Carte initialisée à :', location.latitude, location.longitude);
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
