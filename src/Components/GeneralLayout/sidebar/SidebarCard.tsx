import { Button, Card, IconButton, LinearProgress, Typography, Stack } from "@mui/joy";
import Iconify from "../../Iconify";


function SidebarCard() {
  return (
    <Card
      invertedColors
      variant="soft"
      color="warning"
      size="sm"
      sx={{ boxShadow: "none" }}
    >
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography level="title-sm">
          {"Used space"}
        </Typography>

        <IconButton size="sm">
          <Iconify icon="material-symbols:close-rounded" />
        </IconButton>
      </Stack>

      <Typography level="body-xs">
        {"Your team has used 80% of your available space. Need more?"}
      </Typography>
      <LinearProgress variant="outlined" value={80} determinate sx={{ my: 1 }} />
      <Button size="sm" variant="solid">
        {"Upgrade plan"}
      </Button>
    </Card>
  );
}


export default SidebarCard;