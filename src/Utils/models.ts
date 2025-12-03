import { DeviceName } from "./statsUtils";



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


export interface IDeviceStat {
  name: string;
  visits: number;
}


export interface IDashboardDataResponse {
  totalVisits: number;
  uniqueCountries: number;
  uniqueCities: number;
  uniqueRegions: number;
  devices: IDeviceStat[];
}


export interface IVisitStatsResponse {
  totalCount: number;
  items: IVisit[];
}