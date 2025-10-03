import { GlobalStyles, Box, List } from "@mui/joy";
import { Sheet, listItemButtonClasses } from "@mui/joy";

import SidebarTop from "./SidebarTop";
import SidebarCard from "./SidebarCard";
import SidebarBottom from "./SidebarBottom";
import NavLinkButton from "./NavLinkButton";
import { useNavData } from "./sidebarNavData";
import { layoutConfig } from "../configLayout";
import SidebarBackdrop from "./SidebarBackdrop";
import { useAdminScrollbar } from "../../../Utils/muiHooks";
import NavLinkButtonWithChilds from "./NavLinkButtonWithChilds";



function Sidebar() {
  const navData = useNavData();
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

          {/* Nav Links */}
          {navData.map((nav, index) => {
            if (nav.path) { return <NavLinkButton key={index} {...nav} /> }
            else if (nav.subMenu) { return <NavLinkButtonWithChilds key={index} {...nav} /> }
            else { return null; }
          })}
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