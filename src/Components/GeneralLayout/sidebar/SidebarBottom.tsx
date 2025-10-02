import { useCallback } from "react";
import { CardMedia } from "@mui/material";
import { Avatar, Box, Divider, IconButton, Typography } from "@mui/joy";
import { toggleSidebar } from "../utils";
import { useOpenAuthorProfile } from "../author";
import { SiteEmail, SiteUrl, AuthorName } from "../../../Utils/constants";



function SidebarBottom() {
  const { openAuthorProfile } = useOpenAuthorProfile();


  const handleAuthorProfile = useCallback(() => {
    toggleSidebar();
    openAuthorProfile();
  }, []);


  const openChan180Website = useCallback(() => {
    toggleSidebar();
    window.open(SiteUrl, "_blank", "noopener,noreferrer");
  }, []);


  return (
    <Box>
      <Divider />

      <Box sx={{ display: "flex", gap: 1, py: 1.5, alignItems: "center" }}>

        <Avatar
          variant="outlined"
          size="sm"
          src="/shots/author.jpg"
          onClick={handleAuthorProfile}
          sx={{ cursor: "pointer" }}
        />

        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">{AuthorName}</Typography>
          <Typography level="body-xs" sx={{ fontSize: { xs: "0.65rem", lg: "0.7rem" } }}>{SiteEmail}</Typography>
        </Box>

        <IconButton variant="outlined" color="primary" size="sm" onClick={openChan180Website}>
          <CardMedia
            component="img"
            src="/shots/logochan180.jpg"
            sx={{ width: 20, borderRadius: "50%" }}
            onError={e => { e.currentTarget.style.display = "none"; }}
          />
        </IconButton>
      </Box>
    </Box>
  );
}



export default SidebarBottom;