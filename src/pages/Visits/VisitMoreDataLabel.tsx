import { Popover } from "@mui/material";
import { Box, Typography, Link, Sheet } from "@mui/joy";
import { MouseEvent, useCallback, useState } from "react";
import { Iconify } from "@ffilip/mui-react-utils/components";
import { safeJsonParse } from "@ffilip/chan180-utils/helpers";
import { C180ZIndex, fixMuiOverlayFocus } from "@ffilip/mui-react-utils/mui";
import { IVisit } from "../../Utils/models";

interface IProps {
  visit: IVisit;
  yellowC: string;
}

interface ISecChData {
  label: string;
  data: string;
}


const SecChData = ({ label, data }: ISecChData) => (
  <Box sx={{ display: "flex", alignItems: "baseline" }}>
    <Typography
      sx={{ fontSize: "xs", fontWeight: "lg", whiteSpace: "nowrap", mr: 1 }}
      children={label + " :"}
    />
    <Typography
      sx={{ fontSize: "sm", fontWeight: "xl" }}
      children={data || "Unknown"}
    />
  </Box>
);



function VisitMoreDataLabel({ visit, yellowC }: IProps) {
  const [secChData, setSecChData] = useState<ISecChData[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);


  const openPopover = useCallback((event: MouseEvent<HTMLElement>) => {
    const jsonData = safeJsonParse<Record<string, string>>(visit.clientHintsJson);

    if (jsonData) {
      const data = Object.keys(jsonData)
        .map<ISecChData>(key => ({
          label: key,
          data: jsonData[key]
        }));

      setSecChData(data);
      setAnchorEl(event.currentTarget);
    }
  }, []);


  const closePopover = useCallback(() => {
    setAnchorEl(null);
    fixMuiOverlayFocus();
  }, []);


  if (!visit.clientHintsJson) {
    return (
      <Typography fontSize="sm" fontWeight="xl" letterSpacing={2}>
        {"n/a"}
      </Typography>
    );
  }


  return (
    <>
      <Link
        onClick={openPopover}
        children={<Iconify icon="uiw:more" width={16} sx={{ transform: "translate(-2px, 2px) scale(1.4)" }} />}
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
          <Typography level="title-lg" textAlign="center" sx={{ mb: 2 }}>
            {"User-Agent Client Hints (UA-CH)"}
          </Typography>
          <Box sx={{ "& p:last-of-type": { color: yellowC } }}>
            {secChData.map((scd) => <SecChData key={scd.label} {...scd} />)}
          </Box>
        </Sheet>
      </Popover>
    </>
  );
}



export default VisitMoreDataLabel;