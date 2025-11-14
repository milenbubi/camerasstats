const geoLoaction: IGeoLocation = {
  as: "AS8866 Vivacom Bulgaria EAD",
  city: "Sofia",
  country: "Bulgaria",
  countryCode: "BG",
  isp: "Vivacom Bulgaria EAD",
  lat: 42.6826,
  lon: 23.3223,
  org: "Vivacom GPON Sofia",
  query: "111.111.111.111",
  region: "22",
  regionName: "Sofia-Capital",
  status: "success",
  timezone: "Europe/Sofia",
  zip: "1000"
};


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
  device: string;
  os: string;
  visitTime: string;   // ISO8601 string, UTC
  ipAddress: string;
  userAgent: string;
  locationJson: string;
  browserVisitCount: number;
}


export interface IVisitStatsResponse {
  totalCount: number;
  items: IVisit[];
}