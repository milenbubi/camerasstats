import { IVisit } from "../../Utils/models";
import { ALL_DEVICE_NAME, DeviceName } from "../../Utils/statsUtils";



/**
 * Normalizes the selected device names before sending them to the API.
 *
 * Rules:
 * - If no devices are selected → returns `null` (the parameter will be skipped).
 * - If "ALL" is included in the selection → returns `["ALL"]` only.
 * - Otherwise → returns the array as-is.
 *
 * This ensures that the backend receives either a specific list of devices
 * or the universal `"ALL"` indicator, but never a redundant combination.
 *
 * Example:
 * ```ts
 * normalizeDeviceNames([]); // null
 * normalizeDeviceNames(["ALL", "Mobile", "Desktop"]); // ["ALL"]
 * normalizeDeviceNames(["Mobile", "TV"]); // ["Mobile", "TV"]
 * ```
 *
 * @param {DeviceName[]} selected - The list of currently selected device names.
 * @returns {DeviceName[] | null} A normalized array of devices or `null`.
 */
export function normalizeDeviceNames(selected: DeviceName[]): DeviceName[] | null {
  if (selected.length === 0) return null;
  if (selected.includes(ALL_DEVICE_NAME)) return [ALL_DEVICE_NAME];
  return selected;
}



interface IVisitsTableState {
  visits: IVisit[];
  totalCount: number;
  loading: boolean;
}


export const DEFAULT_VISITS_TABLE_STATE: IVisitsTableState = {
  visits: [],
  totalCount: 0,
  loading: false
};