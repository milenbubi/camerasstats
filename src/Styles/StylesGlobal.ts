import { Theme } from "@mui/material";



const globalStyles = (theme: Theme) => ({
  html: {
    WebkitFontSmoothing: "antialiased",  //"auto"
    MozOsxFontSmoothing: "grayscale",
    height: "100%",
    width: "100%"
  },
  body: {
    height: "100%",
    width: "100%",
    margin: 0,
    padding: 0
  },
  "#Root": {
    height: "100%",
    width: "100%"
  },
  ":root": {
    "--Scrollbar-color": theme.palette.mode === "dark" ? "#5a6b8a" : "#6e87a8",
    "--Scrollbar-color-on-hover": theme.palette.mode === "dark" ? "#8ba4c5" : "#5a6b8a"
  }
});



export default globalStyles;