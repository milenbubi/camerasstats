import { GlobalStyles, Box, List } from "@mui/joy";
import { Sheet, listItemButtonClasses } from "@mui/joy";

import SidebarTop from "./components/SidebarTop";
import SidebarCard from "./components/SidebarCard";
import { cssVars } from "../../../Utils/htmlUtils";
import NavLinkButton from "./common/NavLinkButton";
import { useNavData } from "./utils/sidebarNavData";
import SidebarBottom from "./components/SidebarBottom";
import { layoutConfig } from "../utilities/layoutConfig";
import SidebarBackdrop from "./components/SidebarBackdrop";
import { useAdminScrollbar } from "../../../Utils/muiHooks";
import NavLinkButtonWithChilds from "./common/NavLinkButtonWithChilds";



function Sidebar() {
  const navData = useNavData();
  const adminscrollbar = useAdminScrollbar();


  return (
    <Sheet
      sx={{
        position: "fixed",
        transform: {
          xs: `translateX(calc(100% * (var(${cssVars.sidebarSlideIn}, 0) - 1)))`,
          md: "none"
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 10000,
        height: "100dvh",
        width: `var(${cssVars.sidebarWidth})`,
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
            [cssVars.sidebarWidth]: layoutConfig.Sidebar.big,
            [theme.breakpoints.down("md")]: {
              [cssVars.sidebarWidth]: layoutConfig.Sidebar.small
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
            [cssVars.listNestedInset]: "20px",
            [cssVars.listItemRadius]: theme => theme.vars.radius.sm
          }}
        >
          {/* Nav Links */}
          {navData.map((nav, index) => {
            switch (nav.type) {
              case "link": return <NavLinkButton key={index} {...nav} />;
              case "group": return <NavLinkButtonWithChilds key={index} {...nav} />;
              default: return null;
            }
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