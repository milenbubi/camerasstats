import { CardMedia } from "@mui/material";
import { Avatar, Box, IconButton, Typography } from "@mui/joy";
import { useOpenAuthorProfile } from "./author";
import { SiteEmail, SiteUrl, AuthorName } from "../../Utils/constants";



function SidebarBottom() {
  const { openAuthorProfile } = useOpenAuthorProfile();

  
  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>

      <Avatar
        variant="outlined"
        size="sm"
        src="/shots/author.jpg"
        onClick={openAuthorProfile}
        sx={{ cursor: "pointer" }}
      />

      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography level="title-sm">{AuthorName}</Typography>
        <Typography level="body-xs" sx={{ fontSize: { xs: "0.65rem", lg: "0.7rem" } }}>{SiteEmail}</Typography>
      </Box>

      <IconButton variant="outlined" color="primary" size="sm" onClick={() => window.open(SiteUrl, "_blank", "noopener,noreferrer")}>
        <CardMedia
          component="img"
          src="/shots/logochan180.jpg"
          sx={{ width: 20, borderRadius: "50%" }}
          onError={e => { e.currentTarget.style.display = "none"; }}
        />
      </IconButton>
    </Box>
  );
}



export default SidebarBottom;