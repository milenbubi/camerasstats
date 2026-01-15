import { useState } from "react";
import { Container } from "@mui/material";
import { PeriodLengthInDays } from "@ffilip/chan180-utils";
import { C180Loader } from "@ffilip/mui-react-utils/components";
import C180Tabs from "../../Components/Tabs/C180Tabs";
import { DashboardPeriod, dashboardPeriodOptions, isDashboardPeriod } from "./utils";

interface IProps {
  loading: boolean;
  onChange: (value: DashboardPeriod) => void;
}



function DashboardFilters({ loading, onChange }: IProps) {
  const [tabIndex, setTabIndex] = useState(-1);


  const onTabChange = (newTabIndex: number, period: PeriodLengthInDays) => {
    if (isDashboardPeriod(period)) {
      setTabIndex(newTabIndex);
      onChange(period);
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