import { useCallback } from "react";
import API from "./API";
import { IResponse, RequestMethod } from "./types";



/**
 * Hook for making typed API requests.
 *
 * Returns a reusable RequestToApi function.
 * 
 * @template T — The expected shape of the response data. Should be provided when calling RequestToApi.
 * @returns An object containing the RequestToApi function for making API calls.
 */
export function useAPIRequest() {
  const RequestToApi = useCallback(<T = any>(
    endpoint: string,
    method: RequestMethod,
    data?: any
  ): Promise<IResponse<T>> => {
    return API.request<T>(endpoint, method, data);
  }, []);

  return { RequestToApi };
}