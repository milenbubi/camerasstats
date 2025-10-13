import { Theme, ThemeOptions } from "@mui/material/styles";
import { muiTable } from "./muiTable";



export function globalMUIOverrides(defaultTheme: Theme): ThemeOptions {
  return {
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 7
          }
        }
      },
      ...muiTable(defaultTheme)
    }
  };
}