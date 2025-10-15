import { Box, Tooltip, Typography, Chip } from "@mui/joy";
import Iconify from "../../Components/Iconify";
import { IVisit } from "../../Utils/models";
import { useChan180Colors } from "../../Utils/colorUtils";
import { formatUTCDateToLocalDateString } from "../../Utils/TimeUtilities";

interface IProps {
  visit: IVisit;
}



function VisitDeviceLabel({ visit }: IProps) {
  const { greenC } = useChan180Colors();


  return (
    <Tooltip
      placement="top-end"
      variant="outlined"
      arrow
      title={
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 350,
            justifyContent: "center",
            p: 1
          }}
        >
          <Typography level="title-lg" sx={{ fontSize: "sm" }}>
            {visit.device}
            <Typography
              textColor="grey"
              sx={{ fontSize: "sm", fontStyle: "italic", ml: "6px" }}
              children={`on ${formatUTCDateToLocalDateString(visit.visitTime, "date", "en")}`}
            />
          </Typography>

          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, width: "100%", mt: 1 }}>
            <Box>
              <Typography
                startDecorator={<Iconify color={greenC} icon="ic:baseline-adjust" width={12} />}
                sx={{ fontWeight: "lg", fontSize: "sm" }}
              >
                {`Visited from ${visit.country}`}
              </Typography>
              <Typography textColor="text.secondary" sx={{ fontSize: "sm", mb: 1 }}>
                {visit.userAgent}
              </Typography>
              <Chip size="sm" color="danger" sx={{ fontWeight: "lg" }}>
                bug 🐛
              </Chip>
              <Chip size="sm" color="primary" sx={{ ml: 1, fontWeight: "lg" }}>
                package: system
              </Chip>
            </Box>
          </Box>
        </Box>
      }
    >
      <Box sx={{ cursor: "default" }}>
        {visit.device}
      </Box>
    </Tooltip>
  );
}



export default VisitDeviceLabel;