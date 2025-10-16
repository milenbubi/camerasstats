import { Box, GlobalStyles } from "@mui/joy";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import { layoutConfig } from "./utilities/layoutConfig";
import { useAdminScrollbar } from "../../Utils/muiHooks";
import __OutletWithRefresh from "./internals/__OutletWithRefresh";
import __ScrollResetListener from "./internals/__ScrollResetListener";
import { cssVars, ContentWrapperElementId } from "../../Utils/htmlUtils";



function GeneralLayout() {
  const adminscrollbar = useAdminScrollbar();


  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden"
      }}
    >

      <Header />
      <Sidebar />

      <Box
        sx={{
          flexGrow: 1,
          marginLeft: `var(${cssVars.contentAreaMarginLeft})`,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflowY: "hidden",
          overflowX: "hidden",
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
          className={adminscrollbar}
          id={ContentWrapperElementId}
          sx={{ flexGrow: 1, overflowY: "auto", p: { xs: 1, sm: 2 } }}
        >
          <__OutletWithRefresh />
          <__ScrollResetListener />
        </Box>
      </Box>
    </Box>
  );
}



export default GeneralLayout;