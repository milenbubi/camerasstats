import { IResponse, RequestMethod } from "./types";



class APIRequestor {
  // use Singleton pattern
  private static instance: APIRequestor;

  private API_URL: string;

  private constructor() {
    this.API_URL = "https://chan180.net/php";
  }

  public static getInstance(): APIRequestor {
    if (!APIRequestor.instance) {
      APIRequestor.instance = new APIRequestor();
    }

    return APIRequestor.instance;
  }


  request<T>(endpoint: string, method: RequestMethod, data?: any,) {
    const url = this.API_URL + endpoint;
    const body = method !== "GET" ? JSON.stringify(data) : undefined;
    const options: RequestInit = { method, body, headers: {} };
    return this.requestServer<T>(url, options);
  }


  private requestServer<T>(url: string, options: RequestInit): Promise<IResponse<T>> {
    return new Promise<IResponse<T>>(resolve => {
      // Send the fetch request
      fetch(url, options)
        .then(res => {
          // Check HTTP status
          if (!res.ok) {
            return resolve({
              Data: {} as T,
              Error: "The server is currently unavailable. Please try again later."
            });
          }

          // Determine response type
          const contentType = res.headers.get("Content-Type") || "";
          const isApplJson = contentType.includes("application/json");

          // Parse JSON
          if (isApplJson) {
            res.json()
              .then(data => resolve({ Data: data as T }))
              .catch(() =>
                resolve({
                  Data: {} as T,
                  Error: "The server returned an invalid response. Please try again later."
                })
              );
          }
          // Read as text
          else {
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
        // Network / fetch error
        .catch(() =>
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