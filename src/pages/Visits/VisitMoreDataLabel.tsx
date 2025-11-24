import { Popover } from "@mui/material";
import { Box, Typography, Link, Sheet } from "@mui/joy";
import { MouseEvent, useCallback, useState } from "react";
import { Iconify } from "@ffilip/mui-react-utils/components";
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
    try {
      const jsonData: Record<string, string> = JSON.parse(visit.clientHintsJson);
      const data = Object.entries(jsonData).map(([label, data]) => ({ label, data }));
      setSecChData(data);
      setAnchorEl(event.currentTarget);
    }
    catch (error) { }
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
        sx={{ color: "text.primary" }}
        onClick={openPopover}
        children={<Iconify icon="uiw:more" width={20} />}
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
            minWidth: 300, maxWidth: { xs: 385, sm: 550 }
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