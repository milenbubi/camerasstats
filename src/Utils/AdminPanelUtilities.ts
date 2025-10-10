export type IsNumericOptions = {
  notNegative?: boolean;
  isInteger?: boolean;
  allowEmpty?: boolean;
  realNumber?: boolean;
};



/**
 * Convert UTC date in format: day month year - hour minute seconds.
 * @param source   Date object or date string. They must point to UTC time !!!
 * @param locale   Current locale.
 */
export function formatUTCDateToLocalDateString(
  source: Date | string | null,
  locale: string,
  props?: { dateOnly?: boolean; noSeconds?: boolean; hoursMinutesOnly?: boolean }
) {
  if (!source) {
    return "N/A";
  }

  let date: Date;

  if (typeof source === "object") {
    date = source;
  }
  else {
    date = new Date(source.trim());
  }

  if (date.toString().toUpperCase().includes("invalid".toUpperCase())) {
    return "N/A";
  }

  let dateLocaleOptions: Intl.DateTimeFormatOptions;

  if (props?.hoursMinutesOnly) {
    dateLocaleOptions = {
      hour12: false,
      hour: "2-digit",
      minute: "numeric"
    };
  }
  else {
    dateLocaleOptions = {
      hour12: false,
      year: "numeric",
      month: "short",
      day: "numeric",
      ...(props?.dateOnly
        ? undefined
        : {
          hour: "2-digit",
          minute: "numeric",
          second: props?.noSeconds ? undefined : "2-digit"
        })
    };
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