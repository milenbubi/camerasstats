import { Typography } from "@mui/material";


function DashboardTitle() {
  return (
    <Typography
      variant="h4"
      align="center"
      sx={{ fontWeight: 600, color: t => t.palette.mode === "dark" ? "orange" : "red" }}>
      {"Chan180 Dashboard"}
    </Typography>
  );
}


export default DashboardTitle;