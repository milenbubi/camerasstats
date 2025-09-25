import { createTheme } from "@mui/material/styles";



export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1f5858"
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e"
    },
    text: {
      primary: "#ffffff",
      secondary: "#bbbbbb"
    }
  }
});