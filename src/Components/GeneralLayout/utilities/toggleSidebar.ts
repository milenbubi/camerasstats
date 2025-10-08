import { useEffect } from "react";
import { useLocation } from "react-router-dom";



export function openSidebar() {
  document.body.style.overflow = "hidden";
  document.documentElement.style.setProperty("--SideNavigation-slideIn", "1");
}


export function closeSidebar() {
  document.body.style.removeProperty("overflow");
  document.documentElement.style.setProperty("--SideNavigation-slideIn", "0");
}


export function toggleSidebar() {
  const slideIn = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--SideNavigation-slideIn");

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
      .getPropertyValue("--SideNavigation-slideIn");

    if (slideIn === "1") {
      closeSidebar();
    }
  }, [location]);
}