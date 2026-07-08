import { Popover } from "@mui/material";
import { Box, Typography, Link, Sheet } from "@mui/joy";
import { MouseEvent, useCallback, useState } from "react";
import { C180ZIndex, fixMuiOverlayFocus, Iconify } from "@ffilip/mui-react-utils";
import { IVisit } from "../../Utils/models";

interface IProps {
  visit: IVisit;
  yellowC: string;
}



function PlacesLabel({ visit, yellowC }: IProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);


  const openPopover = useCallback((event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);


  const closePopover = useCallback(() => {
    setAnchorEl(null);
    fixMuiOverlayFocus();
  }, []);


  if (!visit.place || typeof visit.place !== "string") {
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
        children={<Iconify icon="mdi:place-outline" width={16} sx={{ color: "text.primary", opacity: 0.8, transform: "translate(-2px, 3px) scale(1.4)" }} />}
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
            minWidth: 300, maxWidth: { xs: 380, sm: 550 },
            maxHeight: 500
          }}
        >
          <Typography level="title-sm" textAlign="center" sx={{ ml: "1px" }}>
            {visit.ipAddress}
          </Typography>

          <Typography level="title-sm" textAlign="center" sx={{ mb: 2, color: "text.secondary", fontStyle: "italic" }}>
            {"Places visited"}
          </Typography>

          <Box sx={{ ml: 1 }}>
            {
              visit.place
                .trim()
                .split(/\s+/)
                .map((place, index) => (
                  <Typography
                    key={index}
                    sx={{ fontSize: "md", fontWeight: "xl", color: yellowC }}
                    children={place}
                  />
                ))}
          </Box>
        </Sheet>
      </Popover>
    </>
  );
}



export default PlacesLabel;