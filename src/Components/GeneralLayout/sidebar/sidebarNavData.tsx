import { useMemo } from "react";
import Iconify from "../../Iconify";
import { NavItem } from "./vavItem";
import { routes } from "../../../Network/routes";


const iconify = (name: string) => (
  <Iconify icon={name} sx={{ width: 1, height: 1 }} />
);



export const SIDEBAR_ICONS = {
  dashboard: iconify("emojione:bar-chart"),
  tables: iconify("streamline-plump-color:table-flat"),
  tasks: iconify("mdi:casino-chip"),
  listItem: iconify("")
};



export function useNavData() {
  const data = useMemo<NavItem[]>(() => {
    return [
      {
        title: "Dashboard",
        path: routes.home.path,
        icon: SIDEBAR_ICONS.dashboard
      },
      {
        title: "Tables",
        path: routes.home.path,
        icon: SIDEBAR_ICONS.dashboard,
      },
      {
        title: "Tasks",
        icon: SIDEBAR_ICONS.dashboard,
        subMenu: [{
          title: "Tables",
          path: routes.home.path,
          icon: SIDEBAR_ICONS.dashboard
        }]
      }
    ];
  }, []);


  return data;
}