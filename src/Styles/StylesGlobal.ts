import { Theme } from "@mui/material";
import { cssVars } from "../Utils/htmlUtils";



const globalStyles = (theme: Theme) => ({
  html: {
    WebkitFontSmoothing: "antialiased",  //"auto"
    MozOsxFontSmoothing: "grayscale",
    width: "100%",
    height: "100dvh",
    overflowX: "hidden"
    // DO NOT add overflowY: hidden → breaks pull-to-refresh
  },
  body: {
    margin: 0,
    padding: 0,
    height: "100dvh",
    width: "100%",
    overflowY: "auto",
    overflowX: "hidden"
  },
  "#Root": {
    height: "100%",
    width: "100%"
  },
  ":root": {
    [cssVars.scrollbarColor]: theme.palette.mode === "dark" ? "#5a6b8a" : "#6e87a8",
    [cssVars.scrollbarColorOnHover]: theme.palette.mode === "dark" ? "#8ba4c5" : "#5a6b8a"
  }
});



export default globalStyles;