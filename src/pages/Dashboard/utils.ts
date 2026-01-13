import { IDashboardDataResponse } from "../../Utils/models";


export type DashboardPeriod = "24h" | "7d" | "30d" | "90d" | "allTime";


interface IDashboardTimeOptions {
  text: string;
  value: DashboardPeriod;
}


export const dashboardTimeOptions: IDashboardTimeOptions[] = [
  { text: "24 Hours", value: "24h" },
  { text: "7 Days", value: "7d" },
  { text: "30 Days", value: "30d" },
  { text: "90 Days", value: "90d" },
  { text: "All Time", value: "allTime" }
];

export const dashboardPeriodValues = dashboardTimeOptions.map(o => o.value);

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