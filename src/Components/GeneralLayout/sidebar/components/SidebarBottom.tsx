import { Link } from "react-router-dom";
import { CardMedia } from "@mui/material";
import { MouseEvent, useCallback } from "react";
import { Avatar, Box, Divider, IconButton, Typography } from "@mui/joy";
import { closeSidebar } from "../../utils";
import { openAuthorProfile, openChan180Website } from "../../externalLinks";
import { SiteEmail, SiteUrl, AuthorName, AuthorProfile } from "../../../../Utils/constants";



function SidebarBottom() {
  const handleSiteClick = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openChan180Website();
    closeSidebar();
  }, []);


  const handleAuthorClick = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openAuthorProfile();
    closeSidebar();
  }, []);


  return (
    <Box>
      <Divider />

      <Box sx={{ display: "flex", gap: 1, py: "10px", alignItems: "center" }}>

        {/* Author Profile */}
        <Avatar
          component={Link}
          to={AuthorProfile}
          variant="outlined"
          size="sm"
          src="/shots/author.jpg"
          onClick={handleAuthorClick}
          sx={{ cursor: "pointer" }}
        />

        {/* Email */}
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">{AuthorName}</Typography>
          <Typography level="body-xs" sx={{ fontSize: { xs: "0.65rem", lg: "0.7rem" } }}>{SiteEmail}</Typography>
        </Box>

        {/* Chan 180 */}
        <IconButton
          component={Link}
          to={SiteUrl}
          variant="outlined" color="primary" size="sm"
          onClick={handleSiteClick}
        >
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