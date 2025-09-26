import { ThemeProvider as MUIThemeProvider, PaletteMode, THEME_ID } from "@mui/material/styles";
import { createContext, useContext, useMemo, useState, useEffect, PropsWithChildren } from "react";
import { muiDarkTheme } from "./muiDark";
import { muiLightTheme } from "./muiLight";
import LS from "../Utils/localStorageUtils";
import { getLsOrBrowserTheme } from "./utils";
import JoyThemeProvider from "./JoyThemeProvider";

interface ThemeContextType {
  themeMode: PaletteMode;
  toggleThemeMode: VoidFunction;
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);



function ThemeProvider({ children }: PropsWithChildren) {
  const [themeMode, setThemeMode] = useState(getLsOrBrowserTheme);


  const muiTheme = useMemo(() => {
    return themeMode === "dark" ? muiDarkTheme : muiLightTheme;
  }, [themeMode]);


  useEffect(() => {  // Update <meta name="theme-color">
    const meta = document.querySelector("meta[name=theme-color]");
    meta?.setAttribute("content", muiTheme.palette.background.default);
  }, [themeMode]);


  const toggleThemeMode = () => {
    const newThemeMode = themeMode === "dark" ? "light" : "dark";
    LS.set("themeMode", newThemeMode);
    setThemeMode(newThemeMode);
  };


  return (
    <ThemeContext.Provider value={{ themeMode, toggleThemeMode }}>
      <MUIThemeProvider theme={{ [THEME_ID]: muiTheme }}>
        <JoyThemeProvider themeMode={themeMode}>
          {children}
        </JoyThemeProvider>
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}



function useContextTheme() {
  return useContext(ThemeContext);
}


export default ThemeProvider;
export { useContextTheme };