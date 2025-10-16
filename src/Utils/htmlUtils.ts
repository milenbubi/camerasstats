export const ContentWrapperElementId = "cnt-wrapper";


export function getGeneralLayoutWrapperElement() {
  return document.getElementById(ContentWrapperElementId);
}



export const cssVars = {
  scrollbarColor: "--Scrollbar-color",
  scrollbarColorOnHover: "--Scrollbar-color-on-hover",
  headerHeight: "--Header-height",
  sidebarWidth: "--Sidebar-width",
  sidebarSlideIn: "--SideNavigation-slideIn",
  listNestedInset: "--List-nestedInsetStart",
  listItemRadius: "--ListItem-radius",
  listItemMinHeight: "--ListItem-minHeight",
  joyPaletteBackdrop: "--joy-palette-background-backdrop",
  contentAreaMarginLeft: "--Content-area-nargin-left"
} as const;