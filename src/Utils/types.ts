/**
 * Checks if a value is a plain JavaScript object (i.e., created using {} or new Object()).
 *
 * @param value The value to check.
 * @returns `true` if the value is a plain object, otherwise `false`.
 *
 * @example
 * isPlainObject({}); // true
 * isPlainObject(new Object()); // true
 * isPlainObject([]); // false
 * isPlainObject(null); // false
 * isPlainObject(new Date()); // false
 */
export function isPlainObject(value: any): value is Record<string, any> {
  return Object.prototype.toString.call(value) === "[object Object]";
}


type NullOrUndefined = null | undefined;

/**
 * Returns true if value is neither null nor undefined.
 * Useful for filtering arrays to remove empty values.
 * 
 * 66316669
 * @param value The value to check.
 * @returns True if value is not null or undefined.
 */
export function NotEmpty<T>(value: T | NullOrUndefined): value is T {
  return value !== null && value !== undefined;
}