import { createTheme } from "@mui/material/styles";
import { globalMUIOverrides } from "./muiComponents";


const defaultDarkTheme = createTheme({
  palette: {
    mode: "dark"
  }
});


export const muiDarkTheme = createTheme({
  palette: {
    mode: "dark",
    // primary: {
    //   main: "#1f5858"
    // },
    background: {
      default: "#101214",
      paper: "#121216"
    },
    text: {
      primary: "#ffffff",
      secondary: "#bbbbbb"
    }
  },
  ...globalMUIOverrides("dark", defaultDarkTheme)
});