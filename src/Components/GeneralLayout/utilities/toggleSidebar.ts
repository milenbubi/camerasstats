import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { cssVars } from "../../../Utils/htmlUtils";



export function openSidebar() {
  document.body.style.overflow = "hidden";
  document.documentElement.style.setProperty(cssVars.sidebarSlideIn, "1");
}


export function closeSidebar() {
  document.body.style.removeProperty("overflow");
  document.documentElement.style.setProperty(cssVars.sidebarSlideIn, "0");
}


export function toggleSidebar() {
  const slideIn = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(cssVars.sidebarSlideIn);

  if (slideIn === "1") {
    closeSidebar();
  }
  else {
    openSidebar();
  }
}


export default function useCloseSidebarOnRouteChange() {
  const location = useLocation();

  useEffect(() => {
    const slideIn = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue(cssVars.sidebarSlideIn);

    if (slideIn === "1") {
      closeSidebar();
    }
  }, [location]);
}