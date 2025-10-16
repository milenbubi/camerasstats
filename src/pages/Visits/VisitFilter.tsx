import { useState } from "react";
import { Box, Chip, Typography } from "@mui/joy";
import { NotEmpty } from "../../Utils/types";
import Iconify from "../../Components/Iconify";
import { useChan180Colors } from "../../Utils/colorUtils";

const devices = [
  { name: "ALL", icon: "fluent:select-all-on-24-regular" },
  { name: "Mobile", icon: "fa:mobile" },
  { name: "Desktop", icon: "streamline-plump:web-remix" },
  { name: "Bot", icon: "icon-park-outline:google-ads" },
  { name: "API Client", icon: "ic:baseline-api" },
  { name: "TV", icon: "ic:baseline-live-tv" }
];

interface IProps {

}


function VistiFilters({ }: IProps) {
  const { greenC } = useChan180Colors();
  const [selected, setSelected] = useState([devices[0]?.name].filter(NotEmpty));


  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: { xs: "center", lg: "flex-start" } }}>

        <Typography level="title-lg" sx={{ mb: 1.5 }}>
          {"Devices"}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 2 }}>
          {devices.map((device, index) => {
            const { icon, name } = device;
            const checked = selected.includes(name);

            return (
              <Chip
                key={index}
                startDecorator={<Iconify icon={icon} sx={{ opacity: checked ? 1 : 0.8 }} />}
                variant={checked ? "outlined" : "plain"}
                slotProps={{
                  action: {
                    sx: {
                      background: t => checked ? t.palette.background.surface : t.palette.background.level2,
                      borderColor: greenC,
                      "&:hover": {
                        background: t => checked ? t.palette.background.level2 : t.palette.background.level3
                      }
                    }
                  }
                }}
                sx={{
                  overflow: "hidden",
                  color: checked ? greenC : "neutral",
                  px: { xs: 1.5, sm: 2.2 }, py: "6px"
                }}
                onClick={() => {
                  setSelected(prev => {
                    return prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name];
                  });
                }}
              >
                <Typography
                  level="title-sm"
                  sx={{ opacity: checked ? 1 : 0.7, color: checked ? greenC : "neutral", fontWeight: 600, ml: 1 }}
                  children={name}
                />
              </Chip>
            );
          })}
        </Box>

      </Box>
    </Box>
  );
}



export default VistiFilters;