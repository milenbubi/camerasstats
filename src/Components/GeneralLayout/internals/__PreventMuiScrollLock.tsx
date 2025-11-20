import { useEffect } from "react";



/**
 * Internal component: Prevents Material UI (MUI) from applying automatic
 * scroll-locking styles to the document body.
 *
 * MUI components such as <Select/>, <Menu/> and <Modal/> may add inline
 * `overflow: hidden` and scrollbar compensation via `padding-right`.
 * Since the application uses `body` as the main scroll container, these
 * injected styles cause layout shifting and break the custom scrollbar.
 *
 * This component observes inline style mutations on `document.body` and
 * removes any scroll-locking properties as soon as they appear.
 */
function __PreventMuiScrollLock() {
  const target = document.body;

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const style = target.style;

      if (style.overflow) {
        style.overflow = "";
      }

      if (style.paddingRight) {
        style.paddingRight = "";
      }
    });

    observer.observe(target, {
      attributes: true,
      attributeFilter: ["style"]
    });

    return () => observer.disconnect();
  }, []);

  return null;
}



export default __PreventMuiScrollLock;