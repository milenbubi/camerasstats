import { ReactNode } from "react";


/**
 * Base properties shared by all navigation items.
 */
type BaseNavItem = {
  title: string;
  icon: ReactNode;
  disabled?: boolean;
  hideIfNotAuth?: boolean;
};


/**
 * Represents a navigation item in the sidebar.
 *
 * Each item must have **exactly one navigation mode**:
 * - Either a `path` for a clickable link, or
 * - A `subMenu` array for a parent item with children.
 *
 * This ensures there is always a valid navigation target.
 */
export type NavItem =
  | (BaseNavItem & {
    path: string;
    subMenu?: never;
    // Disallow `subMenu` when `path` is defined — ensures only one navigation mode per item.
  })
  | (BaseNavItem & {
    subMenu: NavItem[];
    path?: never;
    // Disallow `path` when `subMenu` is defined — ensures that parent items with children don't have a path.
  });