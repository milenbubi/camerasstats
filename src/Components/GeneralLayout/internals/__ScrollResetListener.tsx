import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getGeneralLayoutWrapperElement } from "../../../Utils/htmlUtils";



function __ScrollResetListener() {
  const location = useLocation();


  useEffect(() => {
    const layoutWrapper = getGeneralLayoutWrapperElement();

    layoutWrapper.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);


  return null;
}



export default __ScrollResetListener;