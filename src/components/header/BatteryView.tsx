import { useState, useEffect } from "react";

interface BatteryManager extends EventTarget {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
}

declare global {
  interface Navigator {
    getBattery(): Promise<BatteryManager>;
  }
}

export default function BatteryStatus() {
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);

  useEffect(() => {
    if ("getBattery" in navigator) {
      navigator.getBattery()
        .then(battery => {
          updateBatteryStatus(battery);
          battery.addEventListener("levelchange", () => {
            updateBatteryStatus(battery);
          });
        })
        .catch(error => {
          console.error("Erreur lors de l'obtention de l'état de la batterie :", error);
        });
    } else {
      console.log("L'API Battery Status n'est pas disponible dans ce navigateur.");
    }
  }, []);

  const updateBatteryStatus = (battery: BatteryManager) => {
    const level = battery.level * 100;
    setBatteryLevel(level);
  };

  return (
    <div>
      {batteryLevel !== null && (
        <div className="battery-container">
          <p className="battery-text">{batteryLevel}%</p>
          <img  className="battery-image" src="/images/batterie.png" alt="Your Image" />
        </div>
      )}
    </div>
  );
};
