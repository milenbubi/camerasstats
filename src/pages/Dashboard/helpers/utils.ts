import { PeriodLengthInDays } from "@ffilip/chan180-utils";
import { ITabPanelItem } from "../../../Components/Tabs/utils";
import { IDashboardItem, IEntityVisit, IUniqueCounts } from "../../../Utils/models";


export const dashboardPeriodOptions = [
  { title: "Today", value: PeriodLengthInDays.Today, paramName: "today" },
  { title: "24 Hours", value: PeriodLengthInDays.One, paramName: "24h" },
  { title: "3 Days", value: PeriodLengthInDays.Three, paramName: "3d" },
  { title: "7 Days", value: PeriodLengthInDays.Seven, paramName: "7d" },
  { title: "30 Days", value: PeriodLengthInDays.Thirty, paramName: "30d" },
  { title: "50 Days", value: PeriodLengthInDays.Fifty, paramName: "50d" },
  { title: "90 Days", value: PeriodLengthInDays.ThreeMonths, paramName: "90d" }
] satisfies ITabPanelItem<PeriodLengthInDays>[];


type DashboardPeriod = typeof dashboardPeriodOptions[number]["value"];
const dashboardPeriodValues = dashboardPeriodOptions.map(o => o.value);

export function isDashboardPeriod(value: unknown): value is DashboardPeriod {
  return typeof value === "number" && dashboardPeriodValues.includes(value as DashboardPeriod);
}


interface IDashboardState {
  items: IDashboardItem[] | null;
  uniqueEntities: {
    devices: IEntityVisit[];
    countries: IEntityVisit[];
    cities: IEntityVisit[];
    oses: IEntityVisit[];
    daysOfWeek: IEntityVisit[];
  } | null;
  uniqueCounts: IUniqueCounts | null;
  totalCount: number;
  loading: boolean;
}

export const DEFAULT_DASHBOARD_STATE: IDashboardState = {
  items: null,
  uniqueEntities: null,
  uniqueCounts: null,
  totalCount: 0,
  loading: false
};