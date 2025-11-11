import { Box, Typography, Link, Sheet } from "@mui/joy";
import { MouseEvent, useEffect, useState } from "react";
import { C180ZIndex } from "@ffilip/mui-react-utils/mui";
import { Backdrop, ClickAwayListener, Fade, Popper } from "@mui/material";
import { formatUTCDateToLocalDateString } from "@ffilip/chan180-utils/time";
import { ILocationJSON, IVisit } from "../../Utils/models";


interface IProps {
  visit: IVisit;
  blueC: string;
  greenC: string;
  isDark: boolean;
  yellowC: string;
  redC: string;
}



function PopperContent({ visit, blueC, greenC }: IProps) {
  const [isp, setIsp] = useState("");


  useEffect(() => {
    try {
      const locationData: ILocationJSON = JSON.parse(visit.locationJson);
      setIsp(locationData?.isp || "Unknown");
    }
    catch (error) {
      setIsp("Unknown");
    }
  }, []);


  return (
    <Sheet
      variant="outlined"
      sx={{ minWidth: 300, maxWidth: { xs: 375, sm: 500 }, p: "14px 18px", background: t => t.palette.background.popup, borderRadius: "8px" }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mb: 0.5, flexWrap: "wrap", columnGap: 2 }}>
        <Typography
          level="title-lg" sx={{ fontSize: "sm" }}
          children={visit.ipAddress}
        />
        <Typography
          sx={{ fontSize: 12, fontWeight: 600 }}
          children={formatUTCDateToLocalDateString(visit.visitTime, "date", "en-GB")}
        />
      </Box>

      <Box sx={{ m: "8px 16px", "& p": { color: blueC } }}>
        <Typography
          sx={{ fontWeight: "lg", fontSize: "sm" }}
          children={visit.city}
        />
        <Typography
          sx={{ fontWeight: "lg", fontSize: "sm" }}
          children={visit.region}
        />
        <Typography
          sx={{ fontWeight: "lg", fontSize: "sm" }}
          children={visit.country}
        />
      </Box>

      <Box sx={{}}>
        <Typography sx={{ fontSize: "xs", fontWeight: "lg" }}>
          {"ISP:"}
          <Typography sx={{ fontSize: "md", fontWeight: "xl", ml: 1, color: greenC }}>
            {isp}
          </Typography>
        </Typography>
      </Box>
    </Sheet>
  );
}



function VisitIpLabel({ visit, blueC, greenC, isDark, yellowC, redC }: IProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);


  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };


  return (
    <>
      <Link
        component={Box}
        sx={{
          fontSize: 14,
          fontWeight: "md",
          cursor: "pointer",
          color: redC,
          "&:hover": {
            textDecoration: "underline"
          }
        }}
        onClick={handleClick}
        children={visit.ipAddress}
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
              <Box>
                <PopperContent visit={visit} blueC={blueC} greenC={greenC} isDark={isDark} yellowC={yellowC} redC={redC} />
              </Box>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
}



export default VisitIpLabel;