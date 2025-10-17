import { useMemo, useState } from "react";
import { Box, Tooltip, VariantProp } from "@mui/joy";
import { IconButton, SxProps, Theme } from "@mui/material";
import Iconify from "./Iconify";
import { C180ZIndex } from "../Theme/utils";

interface IProps {
  text: string;
  size?: number;
  sx?: SxProps<Theme>;
  variant?: VariantProp;
};

const DefaultTooltipTitle = "Copy user agent";



function ClipboardCopy({ text, size = 20, sx, variant = "outlined" }: IProps) {
  const [tooltip, setTooltip] = useState(DefaultTooltipTitle);
  const isHTTPS = useMemo(() => window.isSecureContext, []);


  const handleCopy = () => {
    if (isHTTPS && navigator?.clipboard?.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => setTooltip("Copied"))
        .catch(() => { });
    }
  };


  return (
    isHTTPS && (
      <Tooltip
        placement="top-start"
        variant={variant}
        arrow
        disableTouchListener
        onMouseLeave={() => { setTooltip(DefaultTooltipTitle); }}
        title={<Box>{tooltip}</Box>}
        sx={{ zIndex: C180ZIndex.copyButton }}
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