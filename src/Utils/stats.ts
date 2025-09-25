import { useEffect } from "react";



export function useStats(place: string) {
  useEffect(() => {
    if (!window.location.port) {  // Запис на ново посещение
      fetch(`/php/visit.php?page=${place}`, { method: "GET" })
        .then(res => res.json())
        // .then(data => console.log("Visit logged:", data))
        .catch(err => { /* console.error(err); */ });
    }
    else {  // Извикваме данните - само за DEV цели
      fetch("https://chan180.net/php/stats.php", { method: "GET" })
        .then(res => res.json())
        .then(data => console.log("Site stats:", data))
        .catch(err => console.error(err));
    }
  }, []);
} 