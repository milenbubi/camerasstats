import { openFacebookProfile, openNewTab } from "@ffilip/chan180-utils";
import { SiteUrl } from "../../../Utils/constants";



export function openChan180Website() {
  openNewTab(SiteUrl);
}



export function openAuthorProfile() {
  const fbUserId = "100000461091188";
  openFacebookProfile(fbUserId);
}