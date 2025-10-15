import { Box } from "@mui/joy";
import { Link } from "react-router-dom";
import { CardMedia } from "@mui/material";
import { routes } from "../../../Network/routes";
import { useContextSoftRefresh } from "../../../Contexts/eventBus";



function HomePageButton() {
  const { triggerSoftRefresh } = useContextSoftRefresh();


  return (
    <Box
      component={Link}
      to={routes.dashboard.path}
      onClick={() => triggerSoftRefresh(routes.dashboard.path)}
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