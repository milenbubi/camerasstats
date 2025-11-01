import { useMemo, useState } from "react";
import { IconButton, SxProps, Theme } from "@mui/material";
import { Iconify } from "@ffilip/mui-react-utils/components";
import { Box, Tooltip, TooltipProps, VariantProp } from "@mui/joy";
import { C180ZIndex } from "../Theme/utils";
import { isMobile } from "../Utils/navigator";
import { useChan180Colors } from "@ffilip/mui-react-utils";

interface IProps {
  defaultTitle: string;
  textToCopy: string;
  size?: number;
  sx?: SxProps<Theme>;
  variant?: VariantProp;
};

const SuccessCopyTitle = "Copied";



function ClipboardCopy({ defaultTitle, textToCopy, size = 18, sx, variant = "solid" }: IProps) {
  const { blueC } = useChan180Colors();
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
        <IconButton onClick={handleCopy} sx={sx}>
          <Iconify icon="uiw:copy" width={size} sx={{ color: blueC }} />
        </IconButton>
      </Tooltip>
    )
  );
}



export default ClipboardCopy;