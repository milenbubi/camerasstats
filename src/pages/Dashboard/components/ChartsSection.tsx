import { memo } from "react";
import { Stack } from "@mui/material";


import "../../../Styles/Main.scss"
import { DashboardData } from "../helpers/utils";
import DevicesChart from "../charts/DevicesChart";
import DistinctStats from "../charts/DistinctStats";
import DayOfWeekChart from "../charts/DayOfWeekChart";
import EntityPieCharts from "../charts/EntityPieChart";

interface IProps {
  data: DashboardData;
  totalVisits: number;
}



function ChartsSection({ data, totalVisits }: IProps) {
  return (
    <Stack sx={{ width: 1, pt: { xs: 3, lg: 5 }, gap: { xs: 2, lg: 4 }, px: 1, alignItems: "center" }}>

      <Stack
        sx={{
          flexDirection: { xs: "column", lg: "row" }, maxWidth: { xs: "md", lg: "lg" }, width: 1,
          gap: { xs: 2, lg: 4, xl: 6 }, alignItems: "stretch"
        }}
      >
        <DevicesChart data={data.uniqueEntities.devices} totalVisits={totalVisits} />
        <EntityPieCharts data={data.uniqueEntities} totalVisits={totalVisits} />
      </Stack>

      <Stack sx={{ width: 1, gap: { xs: 2, lg: 4 }, alignItems: "center", maxWidth: "md" }}>
        <DistinctStats data={data.uniqueCounts} />
        <DayOfWeekChart data={data.uniqueEntities.daysOfWeek} />
      </Stack>

    </Stack>
  );
}



export default memo(ChartsSection, (prev, next) => prev.data === next.data);