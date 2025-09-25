import { createTheme } from "@mui/material/styles";



export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2a7474"
    },
    background: {
      default: "#fbfcfe",
      paper: "#ececec"
    },
    text: {
      primary: "#000000",
      secondary: "#555555"
    }
  }
});