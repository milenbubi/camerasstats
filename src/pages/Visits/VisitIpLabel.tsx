import { Popover } from "@mui/material";
import { Box, Typography, Link, Sheet } from "@mui/joy";
import { MouseEvent, useCallback, useState } from "react";
import { safeJsonParse } from "@ffilip/chan180-utils/helpers";
import { formatUTCDateToLocalDateString } from "@ffilip/chan180-utils/time";
import { C180ZIndex, fixMuiOverlayFocus } from "@ffilip/mui-react-utils/mui";
import { IGeoLocation, IVisit } from "../../Utils/models";

interface IProps {
  visit: IVisit;
  blueC: string;
  greenC: string;
  redC: string;
}

interface IAsnData {
  isp: string;
  asn: string;
  org: string;
}


const LocationData = ({ data }: { data: string; }) => (
  <Typography
    sx={{ fontSize: "sm", fontWeight: "lg" }}
    children={data}
  />
);


const ProviderData = ({ label, data }: { label: string; data?: string; }) => (
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



function VisitIpLabel({ visit, blueC, greenC, redC }: IProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [geoData, setGeoData] = useState<IAsnData>();


  const openPopover = useCallback((event: MouseEvent<HTMLElement>) => {
    const geoLocation = safeJsonParse<IGeoLocation>(visit.locationJson);

    if (geoLocation) {
      setGeoData({ isp: geoLocation.isp, asn: geoLocation.as, org: geoLocation.org });
      setAnchorEl(event.currentTarget);
    }
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
          fontWeight: "md",
          color: redC,
          "&:hover": {
            textDecoration: "underline"
          }
        }}
        onClick={openPopover}
        children={visit.ipAddress}
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
          sx={{
            p: "14px 18px",
            borderRadius: "8px",
            background: t => t.palette.background.popup,
            minWidth: 300, maxWidth: { xs: 380, sm: 550 }
          }}
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
            <ProviderData label="isp" data={geoData?.isp} />
            <ProviderData label="asn" data={geoData?.asn} />
            <ProviderData label="org" data={geoData?.org} />
          </Box>
        </Sheet>
      </Popover>
    </>
  );
}



export default VisitIpLabel;