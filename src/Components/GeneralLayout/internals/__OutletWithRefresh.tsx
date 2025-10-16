import { Outlet } from "react-router-dom";
import { useCallback, useState } from "react";

import { getGeneralLayoutWrapperElement } from "../../../Utils/htmlUtils";
import { BusEventPayloads, useChan180EventListener } from "../../../Contexts/eventBus";



function __OutletWithRefresh() {
  const [outletKey, setOutletKey] = useState<number>(-1);


  const handleSoftRefresh = useCallback((data: BusEventPayloads["softRefresh"]) => {
    setOutletKey(data.key);

    const contentWrapper = getGeneralLayoutWrapperElement();

    if (contentWrapper) {
      contentWrapper.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);


  useChan180EventListener("softRefresh", handleSoftRefresh);


  return (
    <Outlet key={outletKey} />
  );
}



export default __OutletWithRefresh;