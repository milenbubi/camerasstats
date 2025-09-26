import { createTheme } from "@mui/material/styles";
import { globalMUIOverrides } from "./muiComponents";


const defaultLightTheme = createTheme({
  palette: {
    mode: "light"
  }
});


export const muiLightTheme = createTheme({
  palette: {
    mode: "light",
    // primary: {
    //   main: "#2a7474"
    // },
    background: {
      // default: "#fbfcfe",
      // paper: "#ececec"
      paper: "#fafbfb"
    },
    text: {
      primary: "#000000",
      secondary: "#555555"
    }
  },
  ...globalMUIOverrides("light", defaultLightTheme)
});