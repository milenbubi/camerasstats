import { Box } from "@mui/joy";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./sidebar/Sidebar";
import { layoutConfig } from "./configLayout";



function GeneralLayout() {
  return (
    <Box sx={{ display: "flex", minHeight: "100dvh", width: "100%" }}>

      <Header />
      <Sidebar />

      {/* Main area */}
      <Box sx={{ flex: 1, height: 1 }}>
        <Box sx={{ height: 1, pt: { xs: layoutConfig.HeaderHeight, md: 0 } }}>
          <Box component="main" sx={{ height: 1 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>

    </Box>
  );
}

export default GeneralLayout;
