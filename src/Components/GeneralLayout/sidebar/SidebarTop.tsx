import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Divider, Typography } from "@mui/joy";
import { toggleSidebar } from "../utils";
import { routes } from "../../../Network/routes";
import ChangeThemeButton from "../../../Theme/ChangeThemeButton";



function SidebarTop() {
  const navigate = useNavigate();


  const goToHomePage = useCallback(() => {
    toggleSidebar();
    navigate(routes.home.path);
  }, []);


  return (
    <Box>
      <Box sx={{ display: "flex", p: "6px 16px 10px 24px", alignItems: "center" }}>

        <Typography
          level="title-lg"
          sx={{
            cursor: "pointer",
            color: t => t.palette.mode === "dark" ? "#a3c3d9" : "#333d44",
            transition: "color 0.2s ease, background 0.2s ease",
            '@media (hover: hover)': {
              '&:hover': {
                color: t => t.palette.mode === "dark"
                  ? "rgba(163, 195, 217, 0.8)"  // леко по-тъмен blue-gray
                  : "#000000"
              }
            }
          }}
          onClick={goToHomePage}
        >
          {"Chan 180 stats"}
        </Typography>

        <ChangeThemeButton sx={{ ml: "auto" }} />

      </Box>

      <Divider sx={{ mx: 2 }} />
    </Box>
  );
}



export default SidebarTop;