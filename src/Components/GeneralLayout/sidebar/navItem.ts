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
 * A navigation item that represents a direct link.
 *
 * - **Must have a valid `path` string.**
 * - **Cannot contain a `subMenu` (enforced with `never`).**
 *
 * Use this type for leaf items that navigate directly to a route.
 */
export type NavItemWithPath = BaseNavItem & {
  path: string;
  subMenu?: never;
  // Disallow `subMenu` when `path` is defined — ensures only one navigation mode per item.
};


/**
 * A navigation item that represents a parent with children.
 *
 * - **Must have a `subMenu` array of `NavItem`.**
 * - **Cannot contain a `path` (enforced with `never`).**
 *
 * Use this type for expandable items that group multiple navigation targets.
 */
export type NavItemWithSubMenu = BaseNavItem & {
  subMenu: NavItem[];
  path?: never;
  // Disallow `path` when `subMenu` is defined — ensures that parent items with children don't have a path.
};


/**
 * Union type for all valid navigation items.
 *
 * A `NavItem` can be either:
 * - `NavItemWithPath` → a direct link, or
 * - `NavItemWithSubMenu` → a parent with nested items.
 *
 * This ensures each item has exactly one valid navigation mode.
 */
export type NavItem = NavItemWithPath | NavItemWithSubMenu;