import { ReactNode } from "react";


export interface ITabPanelItem<TValue> {
  title: ReactNode;
  value: TValue;
  paramName: string;
}


export function tabParamToIndex(tabParam: string | null, items: ITabPanelItem<any>[]) {
  const index = items.findIndex(item => item.paramName === tabParam);
  return index > -1 ? index : 0;
}


export function indexToTabParam(index: number, items: ITabPanelItem<any>[]) {
  return items[index || 0]?.paramName || "";
}