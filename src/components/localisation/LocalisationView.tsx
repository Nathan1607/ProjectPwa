import { useEffect, useState } from "react";

export default function LocalisationView() {

  const [location, setLocation] = useState(null);

useEffect(() => {
  console.log('LocalisationView mounted');
}, []);

  return (
    <div>
        <p>LocalisationView</p>
    </div>
  )
}
