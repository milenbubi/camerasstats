import { createSlice } from "@reduxjs/toolkit";
import { initialAppDataState } from "./state";
import { appDataDispatchActions } from "./actions";


const appDataSlice = createSlice({
  name: "appData",
  initialState: initialAppDataState,
  reducers: appDataDispatchActions
});


export const AppDataActions = appDataSlice.actions;
export const appDataReducer = appDataSlice.reducer;