import { DeviceName } from "./statsUtils";


/* Table statisctics */
export interface IGeoLocation {
  as: string;
  city: string;
  country: string;
  countryCode: string;
  isp: string;
  lat: number;
  lon: number;
  org: string;
  query: string;
  region: string;
  regionName: string;
  status: string;
  timezone: string;
  zip: string;
}


export interface IVisit {
  id: number;
  place: string;
  city: string;
  region: string;
  country: string;
  device: DeviceName;
  os: string;
  visitTime: string;   // ISO8601 string, UTC
  ipAddress: string;
  userAgent: string;
  locationJson: string;
  browserVisitCount: number;
  clientHintsJson: string;
}


export interface IVisitStatsResponse {
  totalCount: number;
  items: IVisit[];
}
/* End Table statisctics */

/* Dashboard data */
export interface IDashboardItem {
  id: number;
  city: string;
  country: string;
  device: string;
  os: string;
  visitTime: string;
}

export interface IDashboardResponse {
  totalCount: number;
  items: IDashboardItem[];
}


export interface IEntityVisit {
  name: string;
  visits: number;
}

export interface ILocationStat {
  uniqueCountries: number;
  uniqueCities: number;
}
/* End Dashboard data */