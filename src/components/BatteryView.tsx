import React, { useState, useEffect } from "react";

export default function BatteryStatus() {

    const [batteryLevel, setBatteryLevel] = useState<number | null>(null);

    useEffect(() => {
        if ("getBattery" in navigator) {
          navigator.getBattery().then(battery => {
            updateBatteryStatus(battery);
            
              battery.addEventListener("levelchange", () => {
              updateBatteryStatus(battery);
            });
          });
        } else {
          console.log("L'API Battery Status n'est pas disponible dans ce navigateur.");
        }
      }, []);

      const updateBatteryStatus = (battery: Battery) => {
        const level = battery.level * 100;
        setBatteryLevel(level);
      };

  return (
    <div>
        {batteryLevel !== null && (
            <p>{batteryLevel}%</p>
        )}
    </div>
  );
};

