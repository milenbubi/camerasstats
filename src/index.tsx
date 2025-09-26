import * as ReactDOM from "react-dom/client";
import { CssBaseline, GlobalStyles } from "@mui/material";
import "./Styles/Scrollbar.scss";
import AppEntry from "./AppEntry";
import globalStyles from "./Styles/StylesGlobal";
import ThemeProvider from "./Theme/ThemeContext";



function CamerasStatsApp() {
  return (
    <ThemeProvider>
      <CssBaseline enableColorScheme />
      <GlobalStyles styles={globalStyles} />
      <AppEntry />
    </ThemeProvider>
  );
}



const container = document.getElementById("Root");
const root = ReactDOM.createRoot(container!);
root.render(<CamerasStatsApp />);