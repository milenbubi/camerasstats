import { forwardRef } from "react";
import { Icon } from "@iconify/react";
import { IconifyIcon } from "@iconify/react";
import Box, { BoxProps } from "@mui/material/Box";

interface IProps extends BoxProps {
  icon?: IconifyIcon | string;
}

// flaticon.com
// https://icon-sets.iconify.design/?category=General



const Iconify = forwardRef<SVGElement, IProps>(({ icon, width = 20, sx, ...other }, ref) => (
  <Box
    ref={ref}
    component={Icon}
    icon={icon}
    sx={{ width, height: width, ...sx }}
    {...other}
  />
));



export default Iconify;