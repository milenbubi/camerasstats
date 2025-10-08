import { ThemeProvider as MUIThemeProvider, PaletteMode, THEME_ID } from "@mui/material/styles";
import { createContext, useContext, useMemo, useState, useEffect, PropsWithChildren } from "react";
import LS from "../../Utils/localStorageUtils";
import __JoyThemeProvider from "./__JoyThemeProvider";
import { getLsOrBrowserTheme } from "../../Theme/utils";
import { muiDarkTheme } from "../../Theme/muiDarkTheme";
import { muiLightTheme } from "../../Theme/muiLightTheme";

interface ThemeContextType {
  themeMode: PaletteMode;
  isThemeDark: boolean;
  toggleThemeMode: VoidFunction;
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);



function __MUI7ThemeProvider({ children }: PropsWithChildren) {
  const [themeMode, setThemeMode] = useState(getLsOrBrowserTheme);


  const muiTheme = useMemo(() => {
    return themeMode === "dark" ? muiDarkTheme : muiLightTheme;
  }, [themeMode]);


  useEffect(() => {  // Update <meta name="theme-color">
    const meta = document.querySelector("meta[name=theme-color]");
    meta?.setAttribute("content", muiTheme.palette.background.default);
  }, [muiTheme]);


  const toggleThemeMode = () => {
    const newThemeMode = themeMode === "dark" ? "light" : "dark";
    LS.set("themeMode", newThemeMode);
    setThemeMode(newThemeMode);
  };


  return (
    <ThemeContext.Provider value={{ themeMode, isThemeDark: themeMode === "dark", toggleThemeMode }}>
      <MUIThemeProvider theme={{ [THEME_ID]: muiTheme }}>
        <__JoyThemeProvider themeMode={themeMode}>
          {children}
        </__JoyThemeProvider>
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}



function useContextTheme() {
  return useContext(ThemeContext);
}


export default __MUI7ThemeProvider;
export { useContextTheme };