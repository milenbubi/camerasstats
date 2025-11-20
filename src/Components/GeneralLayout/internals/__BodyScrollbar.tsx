import { useEffect, useRef } from "react";
import { useAdminScrollbar } from "@ffilip/mui-react-utils/mui";
import { getGeneralLayoutWrapperElement } from "../../../Utils/htmlUtils";



/**
 * Internal component: Syncs the admin scrollbar class with the main layout wrapper.
 *
 * Applies or removes the scrollbar class returned by `useAdminScrollbar()` and
 * keeps the wrapper element updated when the base class changes.
 */
function __BodyScrollbar() {
  const { admScrlBarClassName, baseClassName } = useAdminScrollbar();
  const prevBase = useRef(baseClassName);


  useEffect(() => {
    const layoutWrapper = getGeneralLayoutWrapperElement();

    // 1) Remove old class if the name changed
    if (prevBase.current !== baseClassName) {
      layoutWrapper?.classList.remove(prevBase.current);
      prevBase.current = baseClassName;
    }

    // 2) Apply or remove active class
    layoutWrapper?.classList.toggle(baseClassName, !!admScrlBarClassName);

  }, [admScrlBarClassName, baseClassName]);


  return null;
}



export default __BodyScrollbar;