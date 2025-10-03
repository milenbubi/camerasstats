import { NavLink } from "react-router-dom";
import ListItemButton from "@mui/joy/ListItemButton";
import { Chip, ListItem, ListItemContent, Typography } from "@mui/joy";
import { toggleSidebar } from "../utils";
import { NavItemWithPath } from "./navItem";



function NavLinkButton({ path, icon, title, disabled, hideIfNotAuth }: NavItemWithPath) {
  return (
    <ListItem onClick={toggleSidebar}>
      <NavLink to={path} style={{ textDecoration: "none", width: "100%" }}>
        {({ isActive }) => (
          <ListItemButton
            sx={t => ({
              "& .MuiTypography-root": {
                fontWeight: 600
              },
              ":hover": {
                bgcolor: t.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.15)!important"
                  : "rgba(0, 0, 0, 0.15)!important"
              },

              background: isActive
                ? (t.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.2)"
                  : "rgba(0, 0, 0, 0.15)")
                : "transparent"
            })}
          >
            {icon}
            <ListItemContent /* sx={{flex:"unset"}} */>
              <Typography level="title-sm">{title}</Typography>
            </ListItemContent>
            {/* <Chip size="sm" color="success" variant="solid"sx={{fontWeight:600}}>{554}</Chip> */}
          </ListItemButton>
        )}
      </NavLink>
    </ListItem>
  );
}



export default NavLinkButton;