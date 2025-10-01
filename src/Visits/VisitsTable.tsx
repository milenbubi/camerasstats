import { useState } from "react";
import { useContextSnack } from "../Contexts/SnackbarContext";

function VisitsTable() {
  const { showSnack } = useContextSnack();

  const handleFetch = async () => {
    try {
      const res = await fetch("https://chan18d0.net/php/statistics.php?_start=0&_end=10");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      console.log(data);
    }
    catch (err: any) {
      showSnack("fdd","danger")
    }
  };

  return (
    <>
      <button onClick={handleFetch}>Зареди статистика</button>


    </>
  );
}



export default VisitsTable