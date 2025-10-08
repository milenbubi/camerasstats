/**
 * @file __NavPathRefreshProvider.tsx
 *
 * This provider handles same-path “soft refreshes” in the app.
 * -------------------------------------------------------------
 * In a single-page React app, clicking a link to the current path
 * usually does nothing because the route hasn’t changed.
 * 
 * This context + provider system allows components to trigger a
 * “soft refresh” event on the current route, which rerenders
 * affected components (like <OutletWithRefresh />).
 *
 * Components can access the refresh trigger via:
 *   const { triggerNavRefresh } = useContextNavPathRefresh();
 */
import { useLocation } from "react-router-dom";
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useRef } from "react";
import { useChan180EventEmitter } from "./busEvents";

type NavPathRefreshContextType = {
  triggerNavRefresh: (path: string) => void;
};

const NavPathRefreshContext = createContext<NavPathRefreshContextType>({} as NavPathRefreshContextType);

/**
 * Context shape: exposes only the `triggerNavRefresh` method.
 */
interface IProps {
  onLocationChange: (newPath: string) => void;
}


/**
 * Invisible component that monitors the current location via react-router.
 * Calls `onLocationChange` whenever `location.pathname` changes.
 */
function NavLocationConfigurator({ onLocationChange }: IProps) {
  const location = useLocation();

  useEffect(() => {
    onLocationChange(location.pathname)
  }, [location.pathname]);

  return null;
}


/**
 * Internal provider (double underscore signals internal use)
 * Wraps children with the NavPathRefreshContext and listens for
 * same-path refresh requests.
 */
function __NavPathRefreshProvider({ children }: PropsWithChildren) {
  // Keep track of the last known path
  const locationPath = useRef("");
  const { emitEvent } = useChan180EventEmitter();

  /**
   * Updates the internal ref whenever the location changes
   */
  const onLocationChange = useCallback((newPath: string) => {
    locationPath.current = newPath;
  }, []);

  /**
   * Trigger a “soft refresh” if the requested path matches the current path
   */
  const triggerNavRefresh = useCallback((path: string) => {
    if (path === locationPath.current) {
      emitEvent("navPathRefresh", { key: Date.now() })
    }
  }, []);


  return (
    <NavPathRefreshContext.Provider value={{ triggerNavRefresh }}>
      <NavLocationConfigurator onLocationChange={onLocationChange} />
      {children}
    </NavPathRefreshContext.Provider>
  );
}


/**
 * Hook to access NavPathRefreshContext
 */
function useContextNavPathRefresh() {
  return useContext(NavPathRefreshContext);
}


export default __NavPathRefreshProvider;
export { useContextNavPathRefresh };