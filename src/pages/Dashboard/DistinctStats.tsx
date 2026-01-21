import { Box, useMediaQuery } from "@mui/material";
import { Typography, Card, CardContent, } from "@mui/joy";
import { Centered, Iconify } from "@ffilip/mui-react-utils/components";
import { IUniqueCounts } from "../../Utils/models";

interface IProps {
  data: IUniqueCounts;
}

interface ISingleStatProps {
  title: string;
  subTitle: string;
  count: number;
  icon: string;
  isSmall: boolean;
}


const SingleStatCard = ({ title, subTitle, count, icon, isSmall }: ISingleStatProps) => (
  <Card variant="solid" sx={{ flex: 1, minWidth: 0, p: "8px 12px 12px" }} color="primary" invertedColors>
    <CardContent sx={{ justifyContent: "space-between" }}>
      <Box>
        <Typography level="title-lg" fontSize={isSmall ? 17 : undefined}>{title}</Typography>
        <Typography level="body-sm" lineHeight="14px">{subTitle}</Typography>
      </Box>
      <Centered sx={{ gap: { xs: 2, sm: 3, md: 4 }, mt: { xs: 1, sm: 2 } }}>
        <Iconify width={isSmall ? 17 : 30} icon={icon} sx={{ mb: isSmall ? "2px" : 0 }} />
        <Typography level="h1" fontSize={isSmall ? 21 : undefined}>{count}</Typography>
      </Centered>
    </CardContent>
  </Card>
);



function DistinctStats({ data }: IProps) {
  const isSmall = useMediaQuery("(max-width:600px)");

  return (
    <Centered sx={{ width: 700, maxWidth: 1, gap: { xs: 2, sm: 4 }, alignItems: "stretch" }}>
      <SingleStatCard title="Countries" subTitle="Distinct nations" count={data.uniqueCountries} icon="gis:globe-poi" isSmall={isSmall} />
      <SingleStatCard title="Cities" subTitle="Unique locations" count={data.uniqueCities} icon="hugeicons:city-01" isSmall={isSmall} />
      <SingleStatCard title="OS" subTitle="Singular OSes" count={data.uniqueOses} icon="cbi:blueos" isSmall={isSmall} />
    </Centered>
  );
}



export default DistinctStats;