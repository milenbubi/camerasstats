import * as ReactDOM from "react-dom/client";
import { CssBaseline, GlobalStyles } from "@mui/material";
import "./Styles/Scrollbar.scss";
import AppEntry from "./AppEntry";
import VisitsTable from "./Visits/VisitsTable";
import globalStyles from "./Styles/StylesGlobal";
import ThemeProvider from "./Theme/ThemeContext";
import SnackbarProvider from "./Contexts/SnackbarContext";



function CamerasStatsApp() {
  return (
    <ThemeProvider>
      <CssBaseline enableColorScheme />
      <GlobalStyles styles={globalStyles} />
      <SnackbarProvider>
        <VisitsTable />
        <AppEntry />
      </SnackbarProvider>
    </ThemeProvider>
  );
}



const container = document.getElementById("Root");
const root = ReactDOM.createRoot(container!);
root.render(<CamerasStatsApp />);