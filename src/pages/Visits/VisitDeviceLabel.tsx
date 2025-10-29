import { MouseEvent, useCallback, useState } from "react";
import { Iconify } from "@ffilip/mui-react-utils/components";
import { Box, Typography, Chip, Link, Sheet } from "@mui/joy";
import { Backdrop, ClickAwayListener, Fade, Popper } from "@mui/material";

import { IVisit } from "../../Utils/models";
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
        sx={{ zIndex: C180ZIndex.popper }}
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
                sx={{ maxWidth: { xs: 375, sm: 500 }, p: "14px 18px", background: t => t.palette.background.popup, borderRadius: "8px" }}
              >

                <Typography level="title-lg" sx={{ fontSize: "sm" }}>
                  {visit.device}
                  <Typography
                    textColor="grey"
                    sx={{ fontSize: "xs", fontStyle: "italic", ml: "6px" }}
                    children={`on ${formatUTCDateToLocalDateString(visit.visitTime, "date", "en")}`}
                  />
                </Typography>

                <Box sx={{ pt: 1, mb: 2 }}>
                  <Typography
                    startDecorator={<Iconify color={greenC} icon="ic:baseline-adjust" width={12} />}
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
                    <ClipboardCopy defaultTitle="Copy user agent" textToCopy={visit.userAgent} />

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
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
}



export default VisitDeviceLabel;