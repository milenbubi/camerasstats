import { extendTheme } from "@mui/joy";


export const joyTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          surface: '#f0f6ff', 
        },
        // primary: { solidBg: '#1976d2', solidColor: '#fff' } // примерно MUI primary
      }
    },
    dark: {
      palette: {    background: {
        // surface: '#1a1a1a', 
        // surface: '#000', 
      },
        // primary: { solidBg: '#90caf9', solidColor: '#000' }
      }
    }
  }
});