import { useCallback } from "react";
import { isPlainObject } from "./types";
import { useContextSnack } from "../Contexts/SnackbarContext";


/**
 * Downloads a file from a given URL and triggers a browser download.
 * @param fileUrl URL of the file to download.
 * @param fileName Name for the downloaded file.
 * @param errMessage Optional error message shown to the user if download fails (default: "File is not downloaded").
 */
function useDownloadFile() {
  const { showSnack } = useContextSnack();

  const downloadFile = useCallback((fileUrl: string, fileName: string, errMessage = "File is not downloaded") => {
    fetch(fileUrl)
      .then(response => response.blob())
      .then(blob => {
        const href = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = href;
        a.download = fileName;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch(err => {
        // Show error message to the user if download fails
        errMessage && showSnack(errMessage, "danger");
      });
  }, []);

  return { downloadFile };
}



/**
 * Compose url query string from  object.
 * Object keys and values should be strings.
 * @param obj  Plain javascript object.
 */
function urlQueryStringFromObject(obj: Record<string, any>) {
  if (!isPlainObject(obj)) {
    return "";
  }

  if (Object.keys(obj).length === 0) {
    return "";
  }

  const queryString = Object.entries(obj)
    .map(([k, v]) => `${k}=${encodeURIComponent(v?.toString() || "")}`)
    .join("&");

  // const queryString1 = new URLSearchParams(obj).toString();
  return "?" + queryString;
}



/**
 ** Create pause before next code execution.
 ** You need to use the 'await' keyword when call this function.
 * @param delay  time in milliseconds.
 */
function sleep(delay: number) {
  return new Promise(resolve => {
    return setTimeout(resolve, delay);
  });
}



/**
 ** Enter/exit fullscreen mode.
 * @param htmlElementId  HTML element id.
 */
function goFullScreen(htmlElementId: string) {
  if (!document.fullscreenEnabled) {
    return;
  }

  if (document.fullscreenElement) {  // Exit fullscreen mode
    document.exitFullscreen()
      .catch(() => { });
  }
  else {  // Enter fullscreen mode
    const fsElement = document.getElementById(htmlElementId);

    fsElement?.requestFullscreen()
      .catch(() => { });
  }
}



export {
  useDownloadFile,
  urlQueryStringFromObject,
  sleep,
  goFullScreen
};