import { MouseEvent, useCallback, useState } from "react";
import { Box, Typography, Chip, Link, Sheet } from "@mui/joy";
import { Backdrop, ClickAwayListener, Fade, Popper } from "@mui/material";

import { IVisit } from "../../Utils/models";
import Iconify from "../../Components/Iconify";
import { C180ZIndex } from "../../Theme/utils";
import ClipboardCopy from "../../Components/ClipboardCopy";
import { UserAgentParserUrl } from "../../Utils/constants";
import { formatUTCDateToLocalDateString } from "../../Utils/TimeUtilities";

interface IProps {
  visit: IVisit;
  blueC: string;
  greenC: string;
  isDark: boolean;
}



function VisitDeviceLabel({ visit, blueC, greenC, isDark }: IProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);


  const handleClick = useCallback((event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);


  return (
    <>
      <Link
        component={Box}
        sx={{
          fontSize: 14,
          fontWeight: "lg",
          color: blueC,
          cursor: "pointer",
          "&:hover": {
            textDecoration: "underline"
          }
        }}
        onClick={handleClick}
        children={visit.device}
      />

      <Backdrop
        open={Boolean(anchorEl)}
        sx={{
          zIndex: C180ZIndex.backdrop,
          backgroundColor: `rgba(0, 0, 0, ${isDark ? 0.5 : 0.2})`,
          pointerEvents: "none"
        }}
      />

      <Popper
        sx={{ zIndex: t => C180ZIndex.popper }}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        placement="bottom-end"
        transition
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
            <Fade {...TransitionProps} timeout={350}>
              <Sheet
                variant="outlined"
                sx={{ maxWidth: 320, p: "12px 14px 10px 14px", background: t => t.palette.background.popup, borderRadius: "8px" }}
              >
                <Typography level="title-lg" sx={{ fontSize: "sm" }}>
                  {visit.device}
                  <Typography
                    textColor="grey"
                    sx={{ fontSize: "xs", fontStyle: "italic", ml: "6px" }}
                    children={`on ${formatUTCDateToLocalDateString(visit.visitTime, "date", "en")}`}
                  />
                </Typography>

                <Box sx={{ pt: 1 }}>
                  <Typography
                    startDecorator={<Iconify color={greenC} icon="ic:baseline-adjust" width={12} />}
                    sx={{ fontWeight: "lg", fontSize: "sm", mb: "2px" }}
                    children={`Visited from ${visit.country}`}
                  />
                  <Typography
                    textColor="text.secondary"
                    sx={{ fontSize: "sm", mb: 1 }}
                    children={visit.userAgent}
                  />

                </Box>

                <Box sx={{ pl: 1 }}>
                  <ClipboardCopy text={visit.userAgent} variant="solid" />
                  <Chip
                    size="lg" color="danger" sx={{ ml: 2 }}
                    endDecorator={<Iconify icon="bx:link-external" />}
                  >
                    <Link
                      href={UserAgentParserUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ fontSize: 14, fontWeight: "lg", color: t => t.palette.text.secondary }}
                      children="Parse UA"
                    />
                  </Chip>
                </Box>
              </Sheet>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
}



export default VisitDeviceLabel;