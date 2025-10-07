import { useLocation } from "react-router-dom";
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useRef } from "react";
import { useChan180EventEmitter } from "../Utils/busEvents";

type NavPathRefreshContextType = {
  triggerNavRefresh: (path: string) => void;
};

const NavPathRefreshContext = createContext<NavPathRefreshContextType>({} as NavPathRefreshContextType);

interface IProps {
  onLocationChange: (newPath: string) => void;
}



function NavLocationConfigurator({ onLocationChange }: IProps) {
  const location = useLocation();

  useEffect(() => {
    onLocationChange(location.pathname)
  }, [location.pathname]);

  return null;
}



function NavPathRefreshProvider({ children }: PropsWithChildren) {
  const locationPath = useRef("");
  const { emitEvent } = useChan180EventEmitter();


  const onLocationChange = useCallback((newPath: string) => {
    locationPath.current = newPath;
  }, []);


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



function useContextNavPathRefresh() {
  const context = useContext(NavPathRefreshContext);
  return context;
}


export default NavPathRefreshProvider;
export { useContextNavPathRefresh };