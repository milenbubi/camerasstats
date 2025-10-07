import { useMemo } from "react";
import { NavItem } from "./navItem";
import { SIDEBAR_ICONS } from "./sidebarIcons";
import { routes } from "../../../../Network/routes";



export function useNavData() {
  const navItems = useMemo<NavItem[]>(() => {
    const data: NavItem[] = [
      {
        type: "link",
        title: "Dashboard",
        path: routes.dashboard.path,
        icon: SIDEBAR_ICONS.dashboard
      },
      {
        type: "link",
        title: "Visit Stats",
        path: routes.visits.path,
        icon: SIDEBAR_ICONS.visits
      },

      {
        type: "group",
        title: "Tasks",
        icon: SIDEBAR_ICONS.tasks,
        subMenu: [{
          type: "link",
          title: "InProgress",
          path: routes.aaa.path,
          icon: SIDEBAR_ICONS.nestedItem
        },
        {
          type: "group",
          title: "Personal",
          icon: SIDEBAR_ICONS.personal,
          subMenu: [
            {
              type: "link",
              title: "New",
              path: routes.bbb.path,
              icon: SIDEBAR_ICONS.nestedItem
            },
            {
              type: "link",
              title: "Done",
              path: routes.ccc.path,
              icon: SIDEBAR_ICONS.nestedItem
            }
          ]
        }]
      }
    ];

    return data;
  }, []);


  return navItems;
}