import { useCallback } from "react";
import { isMobile } from "../../Utils/navigator";



export const useOpenAuthorProfile = () => {
  const openAuthorProfile = useCallback(() => {
    const fbUserId = "100000461091188";

    const openNewTab = () => {
      const newWindow = window.open(`https://www.facebook.com/${fbUserId}`, "_blank", "noopener,noreferrer");

      if (newWindow) {
        newWindow.opener = null;
      }
    };

    if (!isMobile()) {
      openNewTab();
      return;
    }

    const now = Date.now();

    window.location.href = `fb://profile/${fbUserId}`;

    setTimeout(() => {
      if (Date.now() - now < 1600) {
        openNewTab();
      }
    }, 1500);
  }, []);

  
  return { openAuthorProfile };
};