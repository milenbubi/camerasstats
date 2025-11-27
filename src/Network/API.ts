import { safeJsonStringify } from "@ffilip/chan180-utils/helpers";
import { BackendUrl } from "../Utils/constants";
import { IResponse, RequestMethod } from "./types";



class APIRequestor {
  // use Singleton pattern
  private static instance: APIRequestor;

  private API_URL: string;

  private constructor() {
    this.API_URL = BackendUrl;
  }

  public static getInstance(): APIRequestor {
    if (!APIRequestor.instance) {
      APIRequestor.instance = new APIRequestor();
    }

    return APIRequestor.instance;
  }


  request<T>(endpoint: string, method: RequestMethod, data?: any,) {
    const url = this.API_URL + endpoint;
    const body = method !== "GET" ? safeJsonStringify(data) : undefined;
    const options: RequestInit = { method, body, headers: {} };

    return this.requestServer<T>(url, options);
  }


  private requestServer<T>(url: string, options: RequestInit): Promise<IResponse<T>> {
    return new Promise<IResponse<T>>(resolve => {
      fetch(url, options)  // Send the fetch request
        .then(res => {
          if (!res.ok) {  // Check HTTP status
            return resolve({
              Data: {} as T,
              Error: "The server is currently unavailable. Please try again later."
            });
          }

          // Determine response type
          const contentType = res.headers.get("Content-Type") || "";
          const isApplJson = contentType.includes("application/json");

          if (isApplJson) {  // Parse JSON
            res.json()
              .then(data => resolve({ Data: data as T }))
              .catch(() =>
                resolve({
                  Data: {} as T,
                  Error: "The server returned an invalid response. Please try again later."
                })
              );
          }
          else {  // Or read as text
            res.text()
              .then(data => resolve({ Data: data as T }))
              .catch(() =>
                resolve({
                  Data: {} as T,
                  Error: "The server response could not be read."
                })
              );
          }
        })
        .catch(() =>  // Network / fetch error
          resolve({
            Data: {} as T,
            Error: "Unable to retrieve the requested statistics. Please try again later."
          })
        );
    });
  }
}



const API = APIRequestor.getInstance();
export default API;