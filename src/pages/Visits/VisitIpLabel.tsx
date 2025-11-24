import { Box, Typography, Link, Sheet } from "@mui/joy";
import { MouseEvent, useEffect, useState } from "react";
import { C180ZIndex } from "@ffilip/mui-react-utils/mui";
import { Backdrop, ClickAwayListener, Fade, Popper } from "@mui/material";
import { formatUTCDateToLocalDateString } from "@ffilip/chan180-utils/time";
import { IGeoLocation, IVisit } from "../../Utils/models";

interface IProps {
  visit: IVisit;
  blueC: string;
  greenC: string;
  isDark: boolean;
  yellowC: string;
  redC: string;
}


const LocationData = ({ data }: { data: string; }) => (
  <Typography
    sx={{ fontSize: "sm", fontWeight: "lg" }}
    children={data}
  />
);

const ProviderData = ({ label, data }: { label: string; data: string; }) => (
  <Box sx={{ display: "flex", alignItems: "baseline" }}>
    <Typography
      sx={{ width: 35, fontSize: "xs", fontWeight: "lg" }}
      children={label + ":"}
    />
    <Typography
      sx={{ fontSize: "sm", fontWeight: "xl" }}
      children={data || "Unknown"}
    />
  </Box>
);


function PopperContent({ visit, blueC, greenC }: IProps) {
  const [geoData, setGeoData] = useState({ isp: "", as: "", org: "" });


  useEffect(() => {
    try {
      const geoLocation: IGeoLocation = JSON.parse(visit.locationJson);
      setGeoData({ isp: geoLocation.isp, as: geoLocation.as, org: geoLocation.org });
    }
    catch (error) { }
  }, []);


  return (
    <Sheet
      variant="outlined"
      sx={{ minWidth: 300, maxWidth: { xs: 385, sm: 550 }, p: "14px 18px", background: t => t.palette.background.popup, borderRadius: "8px" }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mb: 0.5, flexWrap: "wrap", columnGap: 2 }}>
        <Typography
          level="title-lg" sx={{ fontSize: "sm" }}
          children={visit.ipAddress}
        />
        <Typography
          textColor="grey"
          sx={{ fontSize: "xs", fontWeight: "xl", fontStyle: "italic" }}
          children={formatUTCDateToLocalDateString(visit.visitTime, "date", "en-GB")}
        />
      </Box>

      <Box sx={{ m: "8px 16px", "& p": { color: blueC } }}>
        <LocationData data={visit.city} />
        <LocationData data={visit.region} />
        <LocationData data={visit.country} />
      </Box>

      <Box sx={{ "& p:last-of-type": { color: greenC } }}>
        <ProviderData label="isp" data={geoData.isp} />
        <ProviderData label="asn" data={geoData.as} />
        <ProviderData label="org" data={geoData.org} />
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
        sx={{
          fontSize: 14,
          fontWeight: "md",
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
        placement="bottom"
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