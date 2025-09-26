import { PaletteMode, Theme, ThemeOptions } from "@mui/material/styles";



export function globalMUIOverrides(themeMode: PaletteMode, defaultTheme: Theme): ThemeOptions {
  const isDark = themeMode === "dark";


  return {
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 7,
            // background: isDark?"#121216":defaultTheme.palette.background.paper
          }
        }
      }
    }
  };
}