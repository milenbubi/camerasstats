import { alpha, createTheme } from "@mui/material/styles";
import { globalMUIOverrides } from "./muiComponents";
import { blueGrey, grey } from "@mui/material/colors";



const baseTheme = createTheme({
  palette: {
    mode: "light",
    // primary: {
    //   main: "#2a7474"
    // },
    background: {
      // default: "#fbfcfe",
      paper: "#f4f4f5",
      neutral: alpha(blueGrey[500], 0.3)
    },
    text: {
      primary: "#000000",
      secondary: "#555555"
    }
  }
});


export const muiLightTheme = createTheme({
  ...baseTheme,
  ...globalMUIOverrides(baseTheme)
});