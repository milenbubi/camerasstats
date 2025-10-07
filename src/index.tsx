import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider as BusProvider } from "react-bus";
import { CssBaseline, GlobalStyles } from "@mui/material";
import "./Styles/Scrollbar.scss";
import AppEntry from "./AppEntry";
import globalStyles from "./Styles/StylesGlobal";
import ThemeProvider from "./Contexts/ThemeProvider";
import SnackbarProvider from "./Contexts/SnackbarContext";
import NavPathRefreshProvider from "./Contexts/NavPathRefreshProvider";



function CamerasStatsApp() {
  return (
    <BrowserRouter>
      <ThemeProvider>

        <CssBaseline enableColorScheme />
        <GlobalStyles styles={globalStyles} />

        <BusProvider>
          <NavPathRefreshProvider>
            <SnackbarProvider>
              <AppEntry />
            </SnackbarProvider>
          </NavPathRefreshProvider>
        </BusProvider>

      </ThemeProvider>
    </BrowserRouter>
  );
}



const container = document.getElementById("Root");
const root = ReactDOM.createRoot(container!);
root.render(<CamerasStatsApp />);