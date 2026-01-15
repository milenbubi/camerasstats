import { useState } from "react";
import { Container } from "@mui/material";
import { C180Loader } from "@ffilip/mui-react-utils/components";
import { calculatePeriodBoundaries, IPeriodBoundaries, PeriodLengthInDays } from "@ffilip/chan180-utils";
import C180Tabs from "../../Components/Tabs/C180Tabs";
import { dashboardPeriodOptions, isDashboardPeriod } from "./utils";

interface IProps {
  loading: boolean;
  onChange: (value: IPeriodBoundaries) => void;
}



function DashboardFilters({ loading, onChange }: IProps) {
  const [tabIndex, setTabIndex] = useState(-1);


  const onTabChange = (newTabIndex: number, period: PeriodLengthInDays) => {
    if (isDashboardPeriod(period)) {
      setTabIndex(newTabIndex);
      onChange(calculatePeriodBoundaries(period));
    }
  };


  return (
    <Container maxWidth="lg" disableGutters>

      <C180Loader
        open={loading}
        sx={{ mb: 1.5 }}
      />

      <C180Tabs
        tabIndex={tabIndex}
        items={dashboardPeriodOptions}
        onTabChange={onTabChange}
        searchParamName="dashboardperiod"
        sx={{ fontSize: 66 }}
      />

    </Container>
  );
}



export default DashboardFilters;