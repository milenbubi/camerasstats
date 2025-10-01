import { useMemo } from "react";
import { useTheme, useMediaQuery } from "@mui/material";



export function useWidth() {
  const theme = useTheme();
  const keys = useMemo(() => [...theme.breakpoints.keys], []);


  return keys.reduce((prev, curr) => {
    const match = useMediaQuery(theme.breakpoints.up(curr));
    return match ? curr : prev;
  }, "xs");
}



export function useIsMobile() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return isMobile;
}



export function useAdminScrollbar() {
  const isMobile = useIsMobile();
  const className = isMobile ? "" : "adminscrollbar";

  return className;
}