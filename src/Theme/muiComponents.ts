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

      MuiPopover: {
        defaultProps: {
          slotProps: {
            backdrop: {
              sx: {
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                backdropFilter: 'blur(0.5px)'
              }
            }
          }
        }
      },

      ...muiTable(defaultTheme)
    }
  };
}