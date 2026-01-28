import { extendTheme } from "@mui/joy";


export const joyTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          surface: "#f7f9fe"
        },
        // primary: { solidBg: "#1976d2", solidColor: "#fff" }
      }
    },
    dark: {
      palette: {
        background: {
          surface: "#0f1012"
        },
        // primary: { solidBg: "#90caf9", solidColor: "#000" }
      }
    }
  }
});