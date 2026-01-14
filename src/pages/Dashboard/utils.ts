import { IDashboardDataResponse } from "../../Utils/models";


export const dashboardPeriodOptions = [
  { value: "24h", text: "24 Hours" },
  { value: "3d", text: "3 Days" },
  { value: "7d", text: "7 Days" },
  { value: "30d", text: "30 Days" },
  { value: "90d", text: "90 Days" },
  { value: "allTime", text: "All Time" }
] as const;

export type DashboardPeriod = typeof dashboardPeriodOptions[number]["value"];


const dashboardPeriodValues = dashboardPeriodOptions.map(o => o.value);

export function isDashboardPeriod(value: unknown): value is DashboardPeriod {
  return typeof value === "string" && dashboardPeriodValues.includes(value as DashboardPeriod);
}


interface IDashboardState {
  data: IDashboardDataResponse | null;
  loading: boolean;
}

export const DEFAULT_DASHBOARD_STATE: IDashboardState = {
  data: null,
  loading: false
};


export const DEFAULT_DASHBOARD_PERIOD = dashboardPeriodOptions[0].value;