import { Theme } from "@mui/material";
import { cssVars } from "../Utils/htmlUtils";



const globalStyles = (theme: Theme) => ({
  html: {
    WebkitFontSmoothing: "antialiased",  //"auto"
    MozOsxFontSmoothing: "grayscale",
    width: "100%",
    height: "100vh",
    overflowY: "hidden"
  },
  body: {
    height: "100vh",
    width: "100%",
    margin: 0,
    padding: 0,
    overflowY: "auto"
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