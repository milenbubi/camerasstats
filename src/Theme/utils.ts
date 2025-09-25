import { PaletteMode } from "@mui/material";
import LS from "../Utils/localStorageUtils";



export function getLsOrBrowserTheme(): PaletteMode {
  // Get themeMode from Local Storage
  const lsResult = LS.get("themeMode");
  let themeMode: PaletteMode;

  if (lsResult === "dark" || lsResult === "light") {   // LS mode is correct, return it
    themeMode = lsResult;
  }
  else {  // Return system color preference
    const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    themeMode = isSystemDark ? "dark" : "light";
  }

  LS.set("themeMode", themeMode);
  return themeMode;
}