import { GlobalStyles, Box, Chip, List, Typography } from "@mui/joy";
import { ListItem, ListItemContent, ListItemButton, Sheet, listItemButtonClasses } from "@mui/joy";

import Iconify from "../../Iconify";
import SidebarTop from "./SidebarTop";
import SidebarCard from "./SidebarCard";
import SidebarBottom from "./SidebarBottom";
import NavLinkButton from "./NavLinkButton";
import { layoutConfig } from "../configLayout";
import SidebarBackdrop from "./SidebarBackdrop";
import { routes } from "../../../Network/routes";
import SidebarItemToggler from "./SidebarItemToggler";
import { useAdminScrollbar } from "../../../Utils/muiHooks";



function Sidebar() {
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
        pt: 1,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
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
      <SidebarBackdrop />

      {/* Top */}
      <SidebarTop />


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
            pt: 1,
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

        {/* Bottom */}
        <SidebarBottom />
      </Box>

    </Sheet>
  );
}



export default Sidebar;