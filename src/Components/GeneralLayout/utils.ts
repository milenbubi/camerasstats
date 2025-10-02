export function openSidebar() {
  document.body.style.overflow = "hidden";
  document.documentElement.style.setProperty("--SideNavigation-slideIn", "1");
}


export function closeSidebar() {
  document.documentElement.style.removeProperty("--SideNavigation-slideIn");
  document.body.style.removeProperty("overflow");
}


export function toggleSidebar() {
  const slideIn = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--SideNavigation-slideIn");

  if (slideIn) {
    closeSidebar();
  }
  else {
    openSidebar();
  }
}