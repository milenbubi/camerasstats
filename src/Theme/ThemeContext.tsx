import { ThemeProvider as MUIThemeProvider, PaletteMode } from "@mui/material/styles";
import { createContext, useContext, useMemo, useState, useEffect, PropsWithChildren } from "react";
import { darkTheme } from "./dark";
import { lightTheme } from "./light";
import LS from "../Utils/localStorageUtils";
import { getLsOrBrowserTheme } from "./utils";

interface ThemeContextType {
  themeMode: PaletteMode;
  toggleThemeMode: VoidFunction;
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);



export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [themeMode, setThemeMode] = useState(getLsOrBrowserTheme);


  const theme = useMemo(() => {
    return themeMode === "dark" ? darkTheme : lightTheme;
  }, [themeMode]);


  useEffect(() => {  // Update <meta name="theme-color">
    const meta = document.querySelector("meta[name=theme-color]");
    meta?.setAttribute("content", theme.palette.background.default);
  }, [themeMode]);


  const toggleThemeMode = () => {
    const newThemeMode = themeMode === "dark" ? "light" : "dark";
    LS.set("themeMode", newThemeMode);
    setThemeMode(newThemeMode);
  };


  return (
    <ThemeContext.Provider value={{ themeMode, toggleThemeMode }}>
      <MUIThemeProvider theme={theme}>
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};



function useContextTheme() {
  return useContext(ThemeContext);
}

export default ThemeProvider;
export { useContextTheme };