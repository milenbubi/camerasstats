import { PayloadAction } from "@reduxjs/toolkit";
import { BooleanKeys, getObjectKeys, IAppDataState } from "./state";


type AppDataStateKeys = keyof IAppDataState;


export const appDataDispatchActions = {
  setAppData: (state: IAppDataState, action: PayloadAction<Partial<IAppDataState>>) => {
    const newData = action.payload;

    getObjectKeys(newData).forEach(<K extends AppDataStateKeys>(key: K) => {
      const value = newData[key];

      if (value !== undefined && key in state) {
        state[key] = value;
      }
    });
  },

  toggleBooleanAppData: (state: IAppDataState, action: PayloadAction<BooleanKeys<IAppDataState>>) => {
    const key = action.payload;
    state[key] = !state[key];
  }
};