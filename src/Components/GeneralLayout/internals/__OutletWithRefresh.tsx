import { Outlet } from "react-router-dom";
import { useCallback, useState } from "react";

import { getGeneralLayoutWrapperElement } from "../../../Utils/htmlUtils";
import { BusEventPayloads, useChan180EventListener } from "../../../Contexts/eventBus";



/**
 * Internal component: Wraps the React Router `<Outlet>` and forces a re-render
 * when a `softRefresh` event is emitted on the Chan180 event bus.
 *
 * On refresh, updates the internal key to trigger remounting and smoothly
 * scrolls the main layout wrapper to the top.
 */
function __OutletWithRefresh() {
  const [outletKey, setOutletKey] = useState(-1);


  const handleSoftRefresh = useCallback((data: BusEventPayloads["softRefresh"]) => {
    setOutletKey(data.key);

    const layoutWrapper = getGeneralLayoutWrapperElement();
    layoutWrapper?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);


  useChan180EventListener("softRefresh", handleSoftRefresh);


  return (
    <Outlet key={outletKey} />
  );
}



export default __OutletWithRefresh;