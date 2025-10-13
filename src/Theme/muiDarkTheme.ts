import { blueGrey } from "@mui/material/colors";
import { alpha, createTheme } from "@mui/material/styles";
import { globalMUIOverrides } from "./muiComponents";



const baseTheme = createTheme({
  palette: {
    mode: "dark",
    // primary: {
    //   main: "#1f5858"
    // },
    background: {
      default: "#000000",
      paper: "#0a0b11",
      neutral: alpha(blueGrey[500], 0.5)
    },
    text: {
      primary: "#ffffff",
      secondary: "#bbbbbb"
    }
  }
});



export const muiDarkTheme = createTheme({
  ...baseTheme,
  ...globalMUIOverrides(baseTheme)
});