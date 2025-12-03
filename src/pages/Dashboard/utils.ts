import { IDashboardDataResponse } from "../../Utils/models";


export type DashboardPeriods = "all" | "7d" | "24h" | "30d" | "90d";


interface IDashboardState {
  data: IDashboardDataResponse | null;
  loading: boolean;
}


export const DEFAULT_DASHBOARD_STATE: IDashboardState = {
  data: null,
  loading: false
};