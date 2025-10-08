import { Box } from "@mui/joy";
import { useCallback, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./sidebar/Sidebar";
import { layoutConfig } from "./configLayout";
import { useAdminScrollbar } from "../../Utils/muiHooks";
import SidebarRouteWatcher from "./sidebar/utils/SidebarRouteWatcher";
import { BusEventPayloads, useChan180EventListener } from "../../Contexts/eventBus";
import { GeneralLayoutWrapperElementId, getGeneralLayoutWrapperELement } from "../../Utils/htmlUtils";



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
      sx={{
        display: "flex",
        height: 1,
        overflowY: "auto"
      }}
      className={adminscrollbar}
    >
      <SidebarRouteWatcher />
      <Header />
      <Sidebar />

      <Box sx={{ flex: 1, height: 1, pt: { xs: layoutConfig.HeaderHeight, md: 0 } }}>
        <Box component="main" sx={{ height: 1 }}>
          <OutletWithRefresh />
        </Box>
      </Box>
    </Box>
  );
}



export default GeneralLayout;