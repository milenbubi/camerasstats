import ListItemButton from "@mui/joy/ListItemButton";
import { List, ListItem, ListItemContent, Typography } from "@mui/joy";
import Iconify from "../../../Iconify";
import NavLinkButton from "./NavLinkButton";
import { NavItemWithSubMenu } from "../utils/navItem";
import SidebarNestedItemsToggler from "../components/SidebarNestedItemsToggler";



function NavLinkButtonWithChilds({ subMenu, icon, title, disabled, hideIfNotAuth }: NavItemWithSubMenu) {
  return (
    <ListItem nested>
      <SidebarNestedItemsToggler
        renderToggle={({ open, setOpen }) => (
          <ListItemButton onClick={() => setOpen(!open)}>
            {icon}
            <ListItemContent>
              <Typography level="title-sm">{title}</Typography>
            </ListItemContent>
            <Iconify icon="material-symbols:keyboard-arrow-down" sx={{
              transform: open ? "rotate(-180deg)" : "rotate(0deg)",
              transition: "transform 0.25s ease"
            }} />
          </ListItemButton>
        )}
      >
        <List sx={{ gap: 0.5 }}>
          {subMenu.map((menu, index) => {
            if (menu.path) { return <NavLinkButton key={index} {...menu} /> }
            else if (menu.subMenu) { return <NavLinkButtonWithChilds key={index} {...menu} /> }
            else { return null; }
          })}
        </List>
      </SidebarNestedItemsToggler>
    </ListItem>
  );
}



export default NavLinkButtonWithChilds;