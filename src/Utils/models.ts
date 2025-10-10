export interface IVisit {
  id: number;
  place: string;
  city: string;
  region: string;
  country: string;
  device: string;
  visitTime: string;   // ISO8601 string, UTC
  ipAddress: string;
  userAgent: string;
}


export interface IVisitStatsResponse {
  totalCount: number;
  items: IVisit[];
}