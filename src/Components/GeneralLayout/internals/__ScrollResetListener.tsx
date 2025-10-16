import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import { getGeneralLayoutWrapperElement } from "../../../Utils/htmlUtils";



function __ScrollResetListener() {
  const location = useLocation();


  useEffect(() => {
    const contentWrapper = getGeneralLayoutWrapperElement();

    if (contentWrapper) {
      contentWrapper.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [location.pathname]);


  return null;
}



export default __ScrollResetListener;