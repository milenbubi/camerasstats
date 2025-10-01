import { CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GlobalStyles, Box, Chip, Divider, IconButton, List, Typography } from "@mui/joy";
import { ListItem, ListItemContent, ListItemButton, Sheet, listItemButtonClasses } from "@mui/joy";

import Iconify from "../Iconify";
import { closeSidebar } from "./utils";
import SidebarCard from "./SidebarCard";
import SidebarBottom from "./SidebarBottom";
import NavLinkButton from "../NavLinkButton";
import { routes } from "../../Network/routes";
import { layoutConfig } from "./configLayout";
import SidebarItemToggler from "./SidebarItemToggler";
import { useAdminScrollbar } from "../../Utils/muiHooks";
import ChangeThemeButton from "../../Theme/ChangeThemeButton";



function Sidebar() {
  const navigate = useNavigate();
  const adminscrollbar = useAdminScrollbar();


  return (
    <Sheet
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none"
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 10000,
        height: "100dvh",
        width: "var(--Sidebar-width)",
        top: 0,
        py: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider"
      }}
    >
      <GlobalStyles
        styles={theme => ({
          ":root": {
            "--Sidebar-width": layoutConfig.Sidebar.big,
            [theme.breakpoints.down("md")]: {
              "--Sidebar-width": layoutConfig.Sidebar.small
            }
          }
        })}
      />

      {/* Backdrop */}
      <Box
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)"
          }
        }}
        onClick={() => closeSidebar()}
      />

      {/* Top */}
      <Box sx={{ display: "flex", gap: 1, px: 2, alignItems: "center" }}>
        <IconButton variant="outlined" color="neutral" size="sm" onClick={() => navigate(routes.home.path)}>
          <CardMedia
            component="img"
            src="/shots/logochan180.jpg"
            sx={{ width: 20, borderRadius: "50%" }}
            onError={e => { e.currentTarget.style.display = "none"; }}
          />
        </IconButton>
        <Typography level="title-lg">{"Chan 180"}</Typography>
        <ChangeThemeButton sx={{ ml: "auto" }} />
      </Box>


      {/* Content */}
      <Box
        className={adminscrollbar}
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          px: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5
          }
        }}
      >
        {/* Navigation */}
        <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "20px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm
          }}
        >
          {/* Dashboard */}
          <NavLinkButton to={routes.home.path}>
            <Iconify icon="emojione:bar-chart" />
            <ListItemContent>
              <Typography level="title-sm">{"Dashboard"}</Typography>
            </ListItemContent>
          </NavLinkButton>

          {/* Tables */}
          <NavLinkButton to={routes.visitsstatistics.path}>
            <Iconify icon="streamline-plump-color:table-flat" />
            <ListItemContent>
              <Typography level="title-sm">{"Tables"}</Typography>
            </ListItemContent>
          </NavLinkButton>

          {/* Tasks */}
          <ListItem nested>
            <SidebarItemToggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <Iconify icon="streamline-ultimate-color:task-list-to-do" />
                  <ListItemContent>
                    <Typography level="title-sm">{"Tasks"}</Typography>
                  </ListItemContent>
                  <Iconify icon="material-symbols:keyboard-arrow-down" sx={{ transform: open ? "rotate(180deg)" : "none" }} />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton>
                    <Iconify icon="icon-park-outline:dot" />
                    {"All tasks"}
                    <Chip size="sm" color="primary" variant="solid">{4}</Chip>
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>{"Backlog"}</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>{"In progress"}</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>{"Done"}</ListItemButton>
                </ListItem>
              </List>
            </SidebarItemToggler>
          </ListItem>
        </List>

        {/* Card */}
        <SidebarCard />

        <Divider />

        {/* Bottom */}
        <SidebarBottom />
      </Box>

    </Sheet>
  );
}



export default Sidebar;