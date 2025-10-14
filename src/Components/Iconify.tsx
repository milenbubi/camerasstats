import { forwardRef, Ref } from "react";
import { Box, BoxProps } from "@mui/joy";
import { Icon, IconifyIcon } from "@iconify/react";

interface IProps extends BoxProps {
  icon?: IconifyIcon | string;
}

// flaticon.com
// https://icon-sets.iconify.design/?category=General



function Iconify({ icon, width = 20, sx, ...other }: IProps, ref: Ref<SVGElement>) {
  return (
    <Box
      ref={ref}
      component={Icon}
      icon={icon}
      sx={{ width, height: width, ...sx }}
      {...other}
    />
  );
}



export default forwardRef<SVGElement, IProps>(Iconify);