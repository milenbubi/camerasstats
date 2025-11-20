import { Box, GlobalStyles } from "@mui/joy";

import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import { layoutConfig } from "./utilities/layoutConfig";

import { cssVars } from "../../Utils/htmlUtils";
import __BodyScrollbar from "./internals/__BodyScrollbar";
import __OutletWithRefresh from "./internals/__OutletWithRefresh";
import __ScrollResetListener from "./internals/__ScrollResetListener";
import __PreventMuiScrollLock from "./internals/__PreventMuiScrollLock";


function GeneralLayout() {
  return (
    <Box sx={{ height: 1 }}>

      <Header />
      <Sidebar />

      <Box
        sx={{
          height: 1,
          marginLeft: `var(${cssVars.contentAreaMarginLeft})`,
          pt: { xs: layoutConfig.HeaderHeight, md: 0 }
        }}
      >
        <GlobalStyles
          styles={theme => ({
            ":root": {
              [cssVars.contentAreaMarginLeft]: layoutConfig.Sidebar.big,
              [theme.breakpoints.down("md")]: {
                [cssVars.contentAreaMarginLeft]: 0
              }
            }
          })}
        />
        <Box
          component="main"
          sx={{
            height: 1,
            p: { xs: 1, sm: 2 }
          }}
        >
          <__OutletWithRefresh />
          <__ScrollResetListener />
          <__BodyScrollbar />
          <__PreventMuiScrollLock />
        </Box>
      </Box>
    </Box>
  );
}



export default GeneralLayout;