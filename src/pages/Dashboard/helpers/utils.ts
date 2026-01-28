import { PeriodLengthInDays } from "@ffilip/chan180-utils";
import { ITabPanelItem } from "../../../Components/Tabs/utils";
import { IUniqueCounts, IUniqueEntities } from "../../../Utils/models";


export const dashboardPeriodOptions = [
  // { title: "Today", value: PeriodLengthInDays.Today, paramName: "today" },
  { title: "24 Hours", value: PeriodLengthInDays.One, paramName: "24h" },
  { title: "3 Days", value: PeriodLengthInDays.Three, paramName: "3d" },
  { title: "7 Days", value: PeriodLengthInDays.Seven, paramName: "7d" },
  { title: "30 Days", value: PeriodLengthInDays.Thirty, paramName: "30d" },
  { title: "50 Days", value: PeriodLengthInDays.Fifty, paramName: "50d" },
  { title: "90 Days", value: PeriodLengthInDays.ThreeMonths, paramName: "90d" },
  { title: "All Time", value: PeriodLengthInDays.AllTime, paramName: "alltime" }
] satisfies ITabPanelItem<PeriodLengthInDays>[];


type DashboardPeriod = typeof dashboardPeriodOptions[number]["value"];
const dashboardPeriodValues = dashboardPeriodOptions.map(o => o.value);

export function isDashboardPeriod(value: unknown): value is DashboardPeriod {
  return typeof value === "number" && dashboardPeriodValues.includes(value as DashboardPeriod);
}


interface IDashboardState {
  data: {
    uniqueEntities: IUniqueEntities;
    uniqueCounts: IUniqueCounts;
  } | null;
  totalCount: number;
  loading: boolean;
}

export const DEFAULT_DASHBOARD_STATE: IDashboardState = {
  data: null,
  totalCount: 0,
  loading: false
};