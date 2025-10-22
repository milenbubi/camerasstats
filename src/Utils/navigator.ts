/**
 * Detects whether the current device should be treated as "mobile" in terms of UX.
 *
 * It combines userAgent checks (for legacy compatibility) with modern pointer APIs
 * so that hybrid devices (e.g. Surface) are NOT considered mobile.
 */
export function isMobile(): boolean {
  const ua = navigator.userAgent;

  // Modern input detection
  const hasTouch = navigator.maxTouchPoints > 0;
  const hasHover = window.matchMedia?.("(any-hover: hover)").matches;
  const hasFinePointer = window.matchMedia?.("(any-pointer: fine)").matches;

  /*  UA-based fallback (legacy)  */
  // Mobile platforms and common mobile device identifiers
  const classicMobileRegex = /Android|webOS|iPhone|Nexus|iPod|BlackBerry|BB10|IEMobile|Opera\s?Mini|Mobile\s?Safari|Windows\s?Phone|MeeGo|SymbianOS|PlayBook|Huawei|Xiaomi|Mi\s?Phone/i;
  // Tablet platforms and popular tablet device identifiers
  const tabletRegex = /Tablet|Kindle|Silk|Tab(?!let)|Xoom|SCH-I800|GT-P1000|Pixel\s?Tablet|iPad/i;

  const isIpad =
    (ua.includes("iPad") ||
      (ua.includes("Macintosh") && hasTouch)) &&
    !ua.includes("EdgiOS") && !ua.includes("FxiOS");

  const uaMobile = classicMobileRegex.test(ua) || tabletRegex.test(ua) || isIpad;

  // Treat as mobile only if:
  // - it looks like mobile/tablet by UA, AND
  // - it doesn't have a real mouse/hover (hybrids excluded)
  return uaMobile && hasTouch && !hasHover && !hasFinePointer;
}



/**
 * Detects whether the current browser is genuine Safari
 * (on macOS, iOS, or iPadOS), including modern iPads that
 * identify as "Macintosh" in their user agent string.
 *
 * This excludes browsers that embed "Safari" in their UA
 * but are actually Chrome, Edge, or Firefox (e.g., CriOS, FxiOS, EdgiOS).
 *
 * @returns {boolean} True if the browser is real Safari; false otherwise.
 */
export const isSafari = (() => {
  const ua = navigator.userAgent;

  // This line detects real Safari signatures like "Version/17.0 Safari/605.1.15"
  const isRealSafari = /\bVersion\/[\d.]+.*Safari\//i.test(ua);

  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.maxTouchPoints > 1 && /Macintosh/.test(ua));
  const isMac = /Macintosh/.test(ua);

  // Exclude fake iOS Safari variants (Edge, Chrome, Firefox)
  const isSafariIOS =
    isIOS &&
    isRealSafari &&
    !ua.includes("CriOS") &&
    !ua.includes("FxiOS") &&
    !ua.includes("EdgiOS");

  // Desktop Safari detection
  const isSafariDesktop = isMac && isRealSafari;

  return isSafariDesktop || isSafariIOS;
})();