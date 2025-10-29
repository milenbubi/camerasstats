import { IconButton } from "@mui/joy";
import { Iconify } from "@ffilip/mui-react-utils/components";
import { toggleSidebar } from "../utilities/toggleSidebar";


function HamburgerMenu() {
  return (
    <IconButton
      onClick={toggleSidebar}
      variant="outlined"
      color="neutral"
      size="sm"
    >
      <Iconify icon="material-symbols:menu-rounded" />
    </IconButton>
  );
}


export default HamburgerMenu;