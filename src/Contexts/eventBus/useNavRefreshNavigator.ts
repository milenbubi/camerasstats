import { MouseEvent, useCallback } from "react";
import { NavigateFunction } from "react-router-dom";
import { closeSidebar } from "../../Components/GeneralLayout/utils";
import { useContextNavPathRefresh } from "./__NavPathRefreshProvider";

interface IProps {
  path: string;
  navigate?: NavigateFunction;
  event?: MouseEvent<HTMLElement>;
}



/**
 * useNavRefreshNavigator
 *
 * Centralized hook to handle navigation with soft refresh and sidebar closing.
 *
 * This hook does **not call `useNavigate()` internally**, to avoid unnecessary re-renders
 * caused by `useNavigate()` returning a new function on every render. Instead, the 
 * `navigate` function (from `useNavigate()`) should be passed in by the component.
 *
 * Usage:
 *   const navigate = useNavigate();
 *   const { handleNavClick } = useNavRefreshNavigator();
 *
 *   <ListItem onClick={(e) => handleNavClick({ path: "/dashboard", navigate, event: e })}>
 *     <NavLink to="/dashboard">Dashboard</NavLink>
 *   </ListItem>
 *
 * Features:
 * - Calls the provided `navigate` function, if any.
 * - Triggers soft refresh via `triggerNavRefresh` from __NavPathRefreshProvider.
 * - Closes the sidebar by calling `closeSidebar`.
 *
 * Dependencies:
 * - `triggerNavRefresh` must be stable (memoized) to prevent unnecessary re-renders.
 *
 * Notes:
 * - The `event` parameter is optional; if provided, `preventDefault()` is called.
 * - This hook centralizes navigation logic to avoid repeating soft refresh + sidebar close logic.
 */

function useNavRefreshNavigator() {
  const { triggerNavRefresh } = useContextNavPathRefresh();


  const handleNavClick = useCallback(({ path, navigate, event }: IProps) => {
    event?.preventDefault();
    navigate?.(path);
    triggerNavRefresh(path);
    closeSidebar();
  }, [triggerNavRefresh]);


  return { handleNavClick };
}



export { useNavRefreshNavigator };