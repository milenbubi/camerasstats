export type IsNumericOptions = {
  notNegative?: boolean;
  isInteger?: boolean;
  allowEmpty?: boolean;
  realNumber?: boolean;
};


/**
 * Checks if the given value is a valid date.
 * 
 * @param value - The value to check. Can be a Date object, a number (milliseconds since Epoch), or a string.
 * @returns A Date object if the value is valid, otherwise null.
 */
function parseValidDate(value: DateSource): Date | null {
  let date: Date;

  if (value instanceof Date) {
    date = value;
  }
  else if (typeof value === "number") {
    date = new Date(value);
  }
  else if (typeof value === "string") {
    date = new Date(value.trim());
  }
  else {
    return null;
  }

  return isNaN(date.getTime()) ? null : date;
}



type DateFormatUnit = "fullDateTime" | "date" | "year" | "yearMonth" | "monthDay" | "hoursMinutesSeconds";
type DateSource = Date | string | number | null;

/**
 * Formats a UTC date value into a localized date/time string.
 *
 * @param source - The source date. Can be a Date object, a date string, a Unix timestamp (milliseconds since Epoch), or null.
 * @param unit - The output format unit. Controls how detailed the formatted string will be:
 *    - `"fullDateTime"` → includes date and time (e.g. "14 Oct 2025, 16:32:10")
 *    - `"date"` → year, short month, and day
 *    - `"year"` → year only
 *    - `"yearMonth"` → full month name and year
 *    - `"monthDay"` → full month name and day only
 *    - `"hoursMinutesSeconds"` → time only
 * @param locale - The target locale (e.g. `"en-US"`, `"bg-BG"`). Determines language and formatting rules.
 * @param noSeconds - Optional flag to omit seconds in time-based formats.
 * @returns {string} - The formatted local date/time string. Returns `"N/A"` if the source is invalid or null.
 */
export function formatUTCDateToLocalDateString(source: DateSource, unit: DateFormatUnit, locale: string, noSeconds?: boolean): string {
  const date = parseValidDate(source);
  if (!date) return "N/A";

  let dateLocaleOptions: Intl.DateTimeFormatOptions;

  switch (unit) {
    case "fullDateTime":
      dateLocaleOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour12: false,
        hour: "2-digit",
        minute: "numeric",
        second: noSeconds ? undefined : "2-digit"
      };
      break;

    case "date":
      dateLocaleOptions = { year: "numeric", month: "short", day: "numeric" };
      break;

    case "year":
      dateLocaleOptions = { year: "numeric" };
      break;

    case "yearMonth":
      dateLocaleOptions = { year: "numeric", month: "long" };
      break;

    case "monthDay":
      dateLocaleOptions = { month: "long", day: "numeric" };
      break;

    case "hoursMinutesSeconds":
      dateLocaleOptions = {
        hour12: false,
        hour: "2-digit",
        minute: "numeric",
        second: noSeconds ? undefined : "2-digit"
      };
      break;

    default:  // fallback to long date
      dateLocaleOptions = { year: "numeric", month: "long", day: "numeric" };
      break;
  }

  return date.toLocaleString(locale, dateLocaleOptions);
}



/**
 * Convert Date object to UTC string pointing to 00:00 at same day.
 * @param date   Date object or null.
 */
export function getUTCZeroTime(date: Date | null) {
  if (!date) {
    return;
  }

  const newBirthDate = new Date(date);
  const offset = newBirthDate.getTimezoneOffset();

  newBirthDate.setMinutes(offset * -1); //

  if (offset > 0) {
    newBirthDate.setTime(newBirthDate.getTime() - 24 * 60 * 60 * 1000);
  }

  return newBirthDate.toISOString();
}



/**
 * @param value  String to check.
 * @param options  An object that contains properties specifying number type.
 * @returns  true if specified , otherwise false.
 */
export function isNumeric(value: string | number, options: IsNumericOptions = {}) {
  if (!["number", "string"].includes(typeof value)) {
    // only string or number format
    return false;
  }

  if (value === "-.") {
    // value "-." is not allowed
    return false;
  }

  const { notNegative, isInteger, allowEmpty, realNumber } = options;

  if (value === "") {
    return !!allowEmpty;
  }

  if (realNumber) {
    const notNumber = ["-", "."].some((v) => v === value);

    if (notNumber) {
      return false;
    }
  }

  let numberMatch: RegExp = /^-?\d*\.?\d*$/g;

  if (notNegative) {
    numberMatch = /^\d*\.?\d*$/g;
  }

  if (isInteger) {
    numberMatch = /^-?\d*$/g;
  }

  if (isInteger && notNegative) {
    numberMatch = /^\d*$/g;
  }

  return numberMatch.test(value.toString());
  // ^(?!0*\.?0*$)^\d*\.?\d*$   -    For not Zero
}