import { useMemo, useState } from "react";
import { IconButton, SxProps, Theme } from "@mui/material";
import { Box, Tooltip, TooltipProps, VariantProp } from "@mui/joy";
import Iconify from "./Iconify";
import { C180ZIndex } from "../Theme/utils";
import { isMobile } from "../Utils/navigator";

interface IProps {
  defaultTitle: string;
  textToCopy: string;
  size?: number;
  sx?: SxProps<Theme>;
  variant?: VariantProp;
};

const SuccessCopyTitle = "Copied";




function ClipboardCopy({ defaultTitle, textToCopy, size = 20, sx, variant = "solid" }: IProps) {
  const [open, setOpen] = useState(false);
  const isDeviceMobile = useMemo(() => isMobile(), []);
  const [tooltip, setTooltip] = useState(defaultTitle);
  const isHTTPS = useMemo(() => window.isSecureContext, []);


  const tooltipProps = useMemo<Partial<TooltipProps>>(() => {
    if (!isDeviceMobile) {
      return { onMouseLeave: () => setTooltip(defaultTitle) };
    }

    return {
      open,
      disableFocusListener: true,
      disableHoverListener: true,
      disableTouchListener: true
    };
  }, [open, defaultTitle]);


  const handleCopy = () => {
    if (isHTTPS && navigator?.clipboard?.writeText) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setTooltip(SuccessCopyTitle);
          isDeviceMobile && setOpen(true);

          // Automatically hide if current device is mobile
          isDeviceMobile && setTimeout(() => {
            setTooltip(defaultTitle);
            setOpen(false);
          }, 1500);
        })
        .catch(() => { });
    }
  };


  return (
    isHTTPS && (
      <Tooltip
        placement="top-start"
        variant={variant}
        arrow
        sx={{ zIndex: C180ZIndex.copyButton }}
        title={<Box>{tooltip}</Box>}
        {...tooltipProps}
      >
        <IconButton
          onClick={handleCopy}
          color="success"
          sx={sx}
        >
          <Iconify icon="uiw:copy" width={size} />
        </IconButton>
      </Tooltip>
    )
  );
}



export default ClipboardCopy;