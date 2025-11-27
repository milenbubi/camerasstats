import { Popover } from "@mui/material";
import { MouseEvent, useCallback, useState } from "react";
import { Box, Typography, Chip, Link, Sheet } from "@mui/joy";
import { formatUTCDateToLocalDateString } from "@ffilip/chan180-utils/time";
import { C180ZIndex, fixMuiOverlayFocus } from "@ffilip/mui-react-utils/mui";
import { Iconify, ClipboardCopyButton } from "@ffilip/mui-react-utils/components";

import { IVisit } from "../../Utils/models";
import { UserAgentParserUrl } from "../../Utils/constants";

interface IProps {
  visit: IVisit;
  blueC: string;
  greenC: string;
  yellowC: string;
}

const getPreposition = (device: string) => ["Bot", "API Client"].includes(device) ? "via" : "on";



function VisitDeviceLabel({ visit, blueC, greenC, yellowC }: IProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const openPopover = useCallback((event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);


  const closePopover = useCallback(() => {
    setAnchorEl(null);
    fixMuiOverlayFocus();
  }, []);


  return (
    <>
      <Link
        sx={{
          fontSize: 14,
          fontWeight: "lg",
          color: blueC,
          "&:hover": {
            textDecoration: "underline"
          }
        }}
        onClick={openPopover}
        children={visit.device}
      />

      <Popover
        sx={{ zIndex: C180ZIndex.popper }}
        open={Boolean(anchorEl)}
        onClose={closePopover}
        anchorEl={anchorEl}
        disableScrollLock
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <Sheet
          variant="outlined"
          sx={{ maxWidth: { xs: 375, sm: 500 }, p: "14px 18px 16px", background: t => t.palette.background.popup, borderRadius: "8px" }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography level="title-lg" sx={{ fontSize: "sm" }}>
              <Typography
                sx={{ fontSize: "xs", mr: "5px", opacity: 0.8 }}
                children={getPreposition(visit.device)}
              />
              {visit.device}
              <Typography
                textColor="grey"
                sx={{ fontSize: "xs", fontStyle: "italic", ml: "5px" }}
                children={`, ${formatUTCDateToLocalDateString(visit.visitTime, "date", "en-GB")}`}
              />
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Iconify width={18} icon="heroicons-solid:chip" sx={{ mr: "6px", color: greenC }} />
              <Typography level="title-lg" sx={{ fontSize: "sm", opacity: 0.8, fontStyle: "italic" }}>
                {visit.os}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ m: 2 }}>
            <Typography
              startDecorator={<Iconify color={yellowC} icon="ic:baseline-adjust" width={18} />}
              sx={{ fontWeight: "lg", fontSize: "sm", mb: "2px" }}
              children={`Visited from ${visit.country}`}
            />
            <Typography
              textColor="text.secondary"
              sx={{ fontSize: "sm" }}
              children={visit.userAgent}
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0 }}>
              <ClipboardCopyButton defaultTitle="Copy user agent" textToCopy={visit.userAgent} />

              <Typography level="body-xs" sx={{ fontStyle: "italic", color: "text.secondary" }}>
                {"Copy"}
              </Typography>
            </Box>

            <Chip
              title="Opens a website where you can paste the copied user agent for analysis"
              size="lg" color="danger"
              component={Link}
              href={UserAgentParserUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ ml: 2, fontWeight: "lg", color: t => t.palette.text.secondary, alignItems: "unset" }}
            >
              <Box sx={{ display: "flex", height: 1, alignItems: "center" }}>
                <Box sx={{ fontSize: 14, lineHeight: "14px", position: "relative", whiteSpace: "pre" }}>
                  {"Analyze (paste manually)    "}
                  <Iconify icon="bx:link-external" width={11} sx={{ position: "absolute", right: 0, top: -2 }} />
                </Box>
              </Box>
            </Chip>

          </Box>
        </Sheet>
      </Popover>
    </>
  );
}



export default VisitDeviceLabel;