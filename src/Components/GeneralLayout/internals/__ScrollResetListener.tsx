import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getGeneralLayoutWrapperElement } from "../../../Utils/htmlUtils";



/**
 * Internal component: Listens for route changes and smoothly scrolls
 * the main layout wrapper back to the top whenever the pathname updates.
 */
function __ScrollResetListener() {
  const { pathname } = useLocation();


  useEffect(() => {
    const layoutWrapper = getGeneralLayoutWrapperElement();

    layoutWrapper?.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);


  return null;
}



export default __ScrollResetListener;