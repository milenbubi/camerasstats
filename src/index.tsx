import "@ffilip/mui-react-utils/styles.css"
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, GlobalStyles } from "@mui/material";
import AppEntry from "./AppEntry";
import globalStyles from "./Styles/StylesGlobal";
import { ThemeProvider } from "./Contexts/theme";
import { EventBusProvider } from "./Contexts/eventBus";
import SnackbarProvider from "./Contexts/SnackbarContext";
import SoftRefreshProvider from "./Contexts/softRefresh/SoftRefreshProvider";



function CamerasStatsApp() {
  return (
    <BrowserRouter>
      <ThemeProvider>

        <CssBaseline enableColorScheme />
        <GlobalStyles styles={globalStyles} />

        <EventBusProvider>
          <SoftRefreshProvider>
            <SnackbarProvider>
              <AppEntry />
            </SnackbarProvider>
          </SoftRefreshProvider>
        </EventBusProvider>

      </ThemeProvider>
    </BrowserRouter>
  );
}



const container = document.getElementById("Root");
const root = ReactDOM.createRoot(container!);
root.render(<CamerasStatsApp />);