/**
 * Detects whether the current device is a mobile device or tablet.
 *
 * Handles classic mobile user agents (Android, iPhone, etc.),
 * common tablets (Nexus, Kindle, etc.), and modern iPads
 * that identify as desktop (e.g., iPadOS Safari).
 *
 * @returns {boolean} True if the device is mobile or tablet; False otherwise.
 */
export function isMobile(): boolean {
  const ua = navigator.userAgent;

  // Mobile platforms and common mobile device identifiers
  const classicMobileRegex = /Android|webOS|iPhone|Nexus|iPod|BlackBerry|BB10|IEMobile|Opera\s?Mini|Mobile\s?Safari|Windows\s?Phone|MeeGo|SymbianOS|PlayBook/i;

  // Tablet platforms and popular tablet device identifiers
  const tabletRegex = /Tablet|Kindle|Silk|Tab|Xoom|SCH-I800|GT-P1000/i;

  // Special detection for iPads with desktop userAgent
  const isIpad = (ua.includes("iPad") ||
    (ua.includes("Macintosh") && navigator.maxTouchPoints > 1)) &&
    !ua.includes("EdgiOS") && !ua.includes("FxiOS");

  return classicMobileRegex.test(ua) || tabletRegex.test(ua) || isIpad;
}



/**
 * Detects whether the browser is Mobile Safari (iOS or iPadOS),
 * including modern iPads that pretend to be desktop.
 *
 * @returns {boolean} True if the browser is Mobile Safari.
 */
export const isSafari = (() => {
  const ua = navigator.userAgent;
  const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.maxTouchPoints > 1 && /Macintosh/.test(ua));
  const isMac = /Macintosh/.test(ua);

  const isSafariDesktop = isMac && isSafari;
  const isSafariIOS = isIOS && !ua.includes("CriOS") && !ua.includes("FxiOS") && !ua.includes("EdgiOS");

  return isSafariDesktop || isSafariIOS;
})();