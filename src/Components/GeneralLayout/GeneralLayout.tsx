import { Outlet } from "react-router-dom";
import { Box, GlobalStyles } from "@mui/joy";
import { useCallback, useState } from "react";

import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import { layoutConfig } from "./utilities/layoutConfig";
import { useAdminScrollbar } from "../../Utils/muiHooks";
import { BusEventPayloads, useChan180EventListener } from "../../Contexts/eventBus";
import { cssVars, GeneralLayoutWrapperElementId, getGeneralLayoutWrapperELement } from "../../Utils/htmlUtils";



function OutletWithRefresh() {
  const [outletKey, setOutletKey] = useState<number>();

  const handleNavPathRefresh = useCallback((data?: BusEventPayloads["navPathRefresh"]) => {
    setOutletKey(data?.key);
    getGeneralLayoutWrapperELement()?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useChan180EventListener("navPathRefresh", handleNavPathRefresh);

  return (
    <Outlet key={outletKey} />
  );
}



function GeneralLayout() {
  const adminscrollbar = useAdminScrollbar();


  return (
    <Box
      id={GeneralLayoutWrapperElementId}
      className={adminscrollbar}
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden"
      }}
    >

      <Header />
      <Sidebar />

      <Box
        className={adminscrollbar}
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
          sx={{ flexGrow: 1, overflowY: "auto", p: { xs: 1, sm: 2 } }}
        >
          <OutletWithRefresh />
        </Box>
      </Box>
    </Box>
  );
}



export default GeneralLayout;