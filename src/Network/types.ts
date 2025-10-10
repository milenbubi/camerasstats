export interface IAPIErrorResponse {
  error: any;
}


export type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE";


export interface IResponse<T> {
  Data: T;
  Error?: string;
}