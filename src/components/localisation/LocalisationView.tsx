import { useEffect, useState } from "react";
import '../../style/Localisation.css';
import 'leaflet/dist/leaflet.css';

interface LocationState {
  latitude: number;
  longitude: number;
}

export default function LocalisationView() {
  const [location, setLocation] = useState<LocationState | null>(null);

  // Save the location to session storage
  const saveLocationToSessionStorage = (location: LocationState) => {
    sessionStorage.setItem('location', JSON.stringify(location));
  };

  // Get the location from session storage
  const getLocationFromSessionStorage = (): LocationState | null => {
    const savedLocation = localStorage.getItem('location');
    return savedLocation ? JSON.parse(savedLocation) : null;
  };

  useEffect(() => {
    const storedLocation = getLocationFromSessionStorage();
    if (storedLocation) {
      setLocation(storedLocation);
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(newLocation);
          saveLocationToSessionStorage(newLocation);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log('Geolocation not available');
    }
  }, []);

  return (
    <div className="location-container">
      {location ? (
        <div className="location-info">
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      ) : (
        <p>En attente de la localisation...</p>
      )}
    </div>
  );
}
