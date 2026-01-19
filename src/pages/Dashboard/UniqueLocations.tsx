import { Typography, Card, CardContent, } from "@mui/joy";
import { Centered, Iconify } from "@ffilip/mui-react-utils/components";
import { IUniqueLocations } from "../../Utils/models";

interface IProps {
  data: IUniqueLocations;
}



function UniqueLocations({ data }: IProps) {
  return (
    <Centered sx={{ width: 500, maxWidth: 1, gap: { xs: 2, sm: 4 } }}>

      <Card variant="solid" sx={{ flex: 1, p: "8px 12px 12px" }} color="primary" invertedColors>
        <CardContent>
          <Typography level="title-lg">{"Countries"}</Typography>
          <Typography level="body-md">{"Distinct countries"}</Typography>
          <Centered sx={{ gap: 2, mt: { xs: 1, sm: 2 } }}>
            <Iconify width={32} icon="gis:globe-poi" sx={{ mb: "3px" }} />
            <Typography level="h1">{data.uniqueCountries}</Typography>
          </Centered>
        </CardContent>
      </Card>

      <Card variant="solid" sx={{ flex: 1, p: "8px 12px 12px" }} color="primary" invertedColors>
        <CardContent >
          <Typography level="title-lg">{"Cities"}</Typography>
          <Typography level="body-md">{"Unique locations"}</Typography>
          <Centered sx={{ gap: 2, mt: { xs: 1, sm: 2 } }}>
            <Iconify width={34} icon="hugeicons:city-01" sx={{ mb: "2px" }} />
            <Typography level="h1">{data.uniqueCities}</Typography>
          </Centered>
        </CardContent>
      </Card>

    </Centered>
  );
}



export default UniqueLocations;