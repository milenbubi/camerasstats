/**
 * @file __SoftPathRefreshProvider.tsx
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
 *   const { triggerSoftRefresh } = useContextSoftRefresh();
 */
import { useLocation } from "react-router-dom";
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useRef } from "react";
import { useChan180EventEmitter } from "./busEvents";
import { closeSidebar } from "../../Components/GeneralLayout/utilities/toggleSidebar";

type SoftRefreshContextType = {
  triggerSoftRefresh: (path: string) => void;
};

const SoftRefreshContext = createContext<SoftRefreshContextType>({} as SoftRefreshContextType);



/**
 * Invisible component that monitors the current location via react-router.
 * Calls `onLocationChange` whenever `location.pathname` changes.
 */
function LocationConfigurator({ onLocationChange }: { onLocationChange: (newPath: string) => void; }) {
  const location = useLocation();

  useEffect(() => {
    onLocationChange(location.pathname)
  }, [location.pathname]);

  return null;
}


/**
 * Internal provider (double underscore signals internal use)
 * Wraps children with the SoftRefreshContext and listens for
 * refresh requests.
 */
function __SoftRefreshProvider({ children }: PropsWithChildren) {
  // Keep track of the last known path
  const locationPath = useRef("");
  const { emitEvent } = useChan180EventEmitter();


  /**
   * Updates the internal locationPath ref whenever the location changes
   */
  const onLocationChange = useCallback((newPath: string) => {
    locationPath.current = newPath;
  }, []);


  /**
   * Trigger a “soft refresh” if the requested path matches the current path
   */
  const triggerSoftRefresh = useCallback((path: string) => {
    closeSidebar();

    if (path === locationPath.current) {
      emitEvent("softRefresh", { key: Date.now() })
    }
  }, []);


  return (
    <SoftRefreshContext.Provider value={{ triggerSoftRefresh }}>
      <LocationConfigurator onLocationChange={onLocationChange} />
      {children}
    </SoftRefreshContext.Provider>
  );
}


/**
 * Hook to access SoftRefreshContext
 */
function useContextSoftRefresh() {
  return useContext(SoftRefreshContext);
}


export default __SoftRefreshProvider;
export { useContextSoftRefresh };