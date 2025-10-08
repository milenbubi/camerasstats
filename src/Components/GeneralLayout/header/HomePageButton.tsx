import { Box } from "@mui/joy";
import { Link } from "react-router-dom";
import { CardMedia } from "@mui/material";
import { routes } from "../../../Network/routes";
import { useNavRefreshNavigator } from "../../../Contexts/eventBus/useNavRefreshNavigator";



function HomePageButton() {
  const { handleNavClick } = useNavRefreshNavigator();


  return (
    <Box
      component={Link}
      to={routes.dashboard.path}
      onClick={() => handleNavClick({ path: routes.dashboard.path })}
    >
      <CardMedia
        component="img"
        src="/shots/logo.jpg"
        sx={{ width: 60, borderRadius: "13px" }}
        onError={e => { e.currentTarget.style.display = "none"; }}
      />
    </Box>
  );
}



export default HomePageButton;