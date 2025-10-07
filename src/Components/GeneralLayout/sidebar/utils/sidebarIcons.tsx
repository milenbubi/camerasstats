import Iconify from "../../../Iconify";

interface IProps {
  name: string;
}



function SidebarIcon({ name }: IProps) {
  return (
    <Iconify icon={name} />
  );
}



export const SIDEBAR_ICONS = {
  dashboard: <SidebarIcon name="emojione:bar-chart" />,
  visits: <SidebarIcon name="streamline-plump-color:table-flat" />,
  tasks: <SidebarIcon name="streamline-ultimate-color:task-list-to-do" />,
  nestedItem: <SidebarIcon name="icon-park-outline:dot" />,
  personal: <SidebarIcon name="tdesign:task-double" />
};