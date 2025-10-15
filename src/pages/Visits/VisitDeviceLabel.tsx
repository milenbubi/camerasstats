import { Box, Tooltip, Typography, Chip, Link } from "@mui/joy";
import { IVisit } from "../../Utils/models";
import Iconify from "../../Components/Iconify";
import { useChan180Colors } from "../../Utils/colorUtils";
import ClipboardCopy from "../../Components/ClipboardCopy";
import { UserAgentParserUrl } from "../../Utils/constants";
import { formatUTCDateToLocalDateString } from "../../Utils/TimeUtilities";

interface IProps {
  visit: IVisit;
}



function VisitDeviceLabel({ visit }: IProps) {
  const { greenC } = useChan180Colors();


  return (
    <Tooltip
      placement="top-start"
      variant="outlined"
      arrow
      sx={{ background: t => t.palette.background.popup }}
      title={
        <Box sx={{ maxWidth: 320, p: "8px 8px 4px 8px" }}>
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