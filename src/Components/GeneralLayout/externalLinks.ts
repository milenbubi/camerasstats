import { SiteUrl } from "../../Utils/constants";
import { isMobile } from "../../Utils/navigator";



export function openChan180Website() {
  window.open(SiteUrl, "_blank", "noopener,noreferrer");
}



export function openAuthorProfile() {
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
}