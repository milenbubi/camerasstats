import { ListItem } from "@mui/joy";
import { NavLink, NavLinkProps } from "react-router-dom";
import ListItemButton, { ListItemButtonProps } from "@mui/joy/ListItemButton";
import { toggleSidebar } from "./GeneralLayout/utils";

interface IProps extends Omit<ListItemButtonProps, "component"> {
  to: NavLinkProps["to"];
}



function NavLinkButton({ to, sx, children, ...buttonProps }: IProps) {
  return (
    <ListItem onClick={toggleSidebar}>
      <NavLink to={to} style={{ textDecoration: "none", width: "100%" }}>
        {({ isActive }) => (
          <ListItemButton
            sx={t => ({
              "& .MuiTypography-root": {
                fontWeight: isActive ? 600 : 500
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
                : "transparent",
              ...sx
            })}
            {...buttonProps}
          >
            {children}
          </ListItemButton>
        )}
      </NavLink>
    </ListItem>
  );
}



export default NavLinkButton;