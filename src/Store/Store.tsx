import { Provider } from "react-redux";
import { PropsWithChildren } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { appDataReducer } from "./slices";


const store = configureStore({
  reducer: {
    appData: appDataReducer
  }
});


function StoreProvider({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}


export default StoreProvider;


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;