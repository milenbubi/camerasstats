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