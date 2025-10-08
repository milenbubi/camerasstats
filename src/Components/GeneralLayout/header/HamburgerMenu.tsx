import { IconButton } from "@mui/joy";
import Iconify from "../../Iconify";
import { toggleSidebar } from "../utils";


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