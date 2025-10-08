import { Link } from "react-router-dom";
import { Box, Divider, Typography } from "@mui/joy";
import { routes } from "../../../../Network/routes";
import ChangeThemeButton from "../../../../Theme/ChangeThemeButton";
import { useNavRefreshNavigator } from "../../../../Contexts/eventBus/useNavRefreshNavigator";



function SidebarTop() {
  const { handleNavClick } = useNavRefreshNavigator();


  return (
    <Box>
      <Box sx={{ display: "flex", p: "6px 16px 10px 24px", alignItems: "center" }}>

        {/* Home page */}
        <Typography
          component={Link}
          to={routes.dashboard.path}
          level="title-lg"
          sx={{
            textDecoration: "none",
            color: t => t.palette.mode === "dark" ? "#a3c3d9" : "#333d44",
            transition: "color 0.2s ease, background 0.2s ease",
            "@media (hover: hover)": {
              "&:hover": {
                color: t => t.palette.mode === "dark"
                  ? "rgba(163, 195, 217, 0.8)"  // леко по-тъмен blue-gray
                  : "#000000"
              }
            }
          }}
          onClick={() => handleNavClick({ path: routes.dashboard.path })}
        >
          {"Chan 180 stats"}
        </Typography>

        {/* Theme toggler */}
        <ChangeThemeButton sx={{ ml: "auto" }} />

      </Box>

      <Divider sx={{ mx: 2 }} />
    </Box>
  );
}



export default SidebarTop;