import { ReactNode } from "react";


export interface ITabPanelItem {
  title: ReactNode;
  paramName: string;
}


export function tabParamToIndex(tabParam: string | null, items: ITabPanelItem[]) {
  const index = items.findIndex((i) => i.paramName === tabParam);
  return index > -1 ? index : 0;
}


export function indexToTabParam(index: number, items: ITabPanelItem[]) {
  return items[index || 0]?.paramName || "";
}