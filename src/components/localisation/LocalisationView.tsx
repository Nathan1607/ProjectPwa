import { useEffect, useState } from "react";

interface LocationState {
  latitude: number;
  longitude: number;
}

export default function LocalisationView() {

  const [location, setLocation] = useState<LocationState | null>(null);

  useEffect(() => {
    if("geolocation" in navigator){
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
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
    <div>
        {location ? (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      ) : (
        <p>En attente de la localisation...</p>
      )}
    </div>
  )
}
