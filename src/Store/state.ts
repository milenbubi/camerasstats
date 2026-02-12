export type AuthModalType = "login" | "registration" | "forgotPassword";


/*  AppData state  */
export interface IAppDataState {
  displayCurrency: string;
  authModal: AuthModalType;
  currencies: string[];
  isAuthorized: boolean | null;
  isDarkMode: boolean;
}


export const initialAppDataState: IAppDataState = {
  displayCurrency: "BGN",
  authModal: "login",
  currencies: [],
  isAuthorized: null,
  isDarkMode: true
};


export function getObjectKeys<T extends object>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>;
}


export type BooleanKeys<T> = {
  [K in keyof T]: NonNullable<T[K]> extends boolean ? K : never
}[keyof T];