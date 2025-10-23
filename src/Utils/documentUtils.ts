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
 * Converts a nested JavaScript object into a PHP-style query string.
 *
 * Supported types:
 * - primitives (string, number, boolean)
 * - Date (serialized via toISOString)
 * - arrays (including arrays of objects)
 * - plain nested objects
 *
 * Skips:
 * - null / undefined
 * - functions, symbols
 * - NaN / Infinity
 *
 * Example:
 * ```ts
 * urlQueryStringFromObject({
 *   page: 1,
 *   filters: { active: true, tags: ["a", "b"] },
 *   countries: [ { active: "USA" }, {currentt: "Russia"}],
 *   date: new Date()
 * });
 * // ?page=1&filters[active]=true&filters[tags][]=a&filters[tags][]=b&countries[][active]=USA&countries[][currentt]=Russia&date=2025-10-17T12%3A30%3A34.081Z
 * ```
 *
 * @param {Record<string, any>} obj - The object to serialize.
 * @returns {string} A valid query string starting with '?' or an empty string.
 */
const urlQueryStringFromObject = (() => {
  /** Recursive helper — defined once, not recreated on each call */
  const buildQuery = (parts: string[], keyPrefix: string, value: any) => {
    if (value === null || value === undefined) return;

    // Skip non-serializable types
    if (typeof value === "function" || typeof value === "symbol") return;
    if (Number.isNaN(value) || value === Infinity || value === -Infinity) return;

    // Array
    if (Array.isArray(value)) {
      value.forEach(v => {
        if (isPlainObject(v)) {
          Object.entries(v).forEach(([k, val]) =>
            buildQuery(parts, `${keyPrefix}[][${k}]`, val)
          );
        }
        else {
          buildQuery(parts, `${keyPrefix}[]`, v);
        }
      });
      return;
    }

    // Date
    if (value instanceof Date) {
      parts.push(`${keyPrefix}=${encodeURIComponent(value.toISOString())}`);
      return;
    }

    // Plain Object
    if (isPlainObject(value)) {
      Object.entries(value).forEach(([subKey, subValue]) => {
        buildQuery(parts, `${keyPrefix}[${subKey}]`, subValue);
      });
      return;
    }

    // Primitive values
    parts.push(`${keyPrefix}=${encodeURIComponent(String(value))}`);
  };


  // The main exported function
  return function urlQueryStringFromObject(obj: Record<string, any>): string {
    if (!isPlainObject(obj) || Object.keys(obj).length === 0) {
      return "";
    }

    const parts: string[] = [];


    Object.entries(obj).forEach(([key, value]) => buildQuery(parts, key, value));

    return parts.length ? "?" + parts.join("&") : "";
  };
})();



export { useDownloadFile, urlQueryStringFromObject };