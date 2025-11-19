import { Box } from "@mui/joy";
import { cssVars } from "../../../../Utils/htmlUtils";
import { C180ZIndex } from "@ffilip/mui-react-utils/mui";
import { closeSidebar } from "../../utilities/toggleSidebar";


function SidebarBackdrop() {
  return (
    <Box
      sx={{
        position: "fixed",
        zIndex: C180ZIndex.backdrop,
        top: 0,
        right: 0,
        width: "100vw",
        height: "100vh",
        opacity: `var(${cssVars.sidebarSlideIn})`,
        backgroundColor: `var(${cssVars.joyPaletteBackdrop})`,
        transition: "opacity 0.4s",
        transform: {
          xs: `translateX(calc(-100% * (var(${cssVars.sidebarSlideIn}, 0) - 1) - var(${cssVars.sidebarSlideIn}, 0) * var(${cssVars.sidebarWidth}, 0px)))`,
          md: "translateX(-100%)"
        }
      }}
      onClick={closeSidebar}
    />
  );
}


export default SidebarBackdrop;