import { useMemo } from "react";
import Iconify from "../../Iconify";
import { NavItem } from "./navItem";
import { routes } from "../../../Network/routes";


const iconify = (name: string) => <Iconify icon={name} />;


export const SIDEBAR_ICONS = {
  dashboard: iconify("emojione:bar-chart"),
  tables: iconify("streamline-plump-color:table-flat"),
  tasks: iconify("streamline-ultimate-color:task-list-to-do"),
  nestedItem: iconify("icon-park-outline:dot"),
  personal: iconify("tdesign:task-double")
};



export function useNavData() {
  const navItems = useMemo<NavItem[]>(() => {
    const data: NavItem[] = [
      {
        title: "Dashboard",
        path: routes.dashboard.path,
        icon: SIDEBAR_ICONS.dashboard
      },
      {
        title: "Tables",
        path: routes.tables.path,
        icon: SIDEBAR_ICONS.tables,
      },

      {
        title: "Tasks",
        icon: SIDEBAR_ICONS.tasks,
        subMenu: [{
          title: "InProgress",
          path: routes.aaa.path,
          icon: SIDEBAR_ICONS.nestedItem,
        },
        {
          title: "Personal",
          icon: SIDEBAR_ICONS.personal,
          subMenu: [
            {
              title: "New",
              path: routes.bbb.path,
              icon: SIDEBAR_ICONS.nestedItem,
            },
            {
              title: "Done",
              path: routes.ccc.path,
              icon: SIDEBAR_ICONS.nestedItem,
            }
          ]
        }
        ]
      }
    ];

    return data;
  }, []);


  return navItems;
}