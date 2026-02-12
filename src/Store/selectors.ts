import { useMemo } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDataActions } from "./slices";
import { AppDispatch, RootState } from "./Store";
import { IAppDataState, BooleanKeys } from "./state";

/*  Use throughout application instead of plain `useSelector` and `useDispatch`  */


export const useStoreSelector: TypedUseSelectorHook<RootState> = useSelector;


export function useStoreDispatch() {
  const dispatch = useDispatch<AppDispatch>();

  const dispatchHandlers = useMemo(() => {
    return {
      dispatchAppData: (data: Partial<IAppDataState>) => {
        return dispatch(AppDataActions.setAppData(data));
      },
      dispatchToggleBoolean: (key: BooleanKeys<IAppDataState>) => {
        return dispatch(AppDataActions.toggleBooleanAppData(key));
      }
    };
  }, []);

  return dispatchHandlers;
}