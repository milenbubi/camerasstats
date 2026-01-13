import { Container } from "@mui/material";
import { useMemo, useState } from "react";
import { C180Loader } from "@ffilip/mui-react-utils/components";

import C180Tabs from "../../Components/Tabs/C180Tabs";
import { ITabPanelItem } from "../../Components/Tabs/utils";
import { DashboardPeriod, dashboardTimeOptions, isDashboardPeriod } from "./utils";

interface IProps {
  loading: boolean;
  onChange: (value: DashboardPeriod) => void;
}



function DashboardFilters({ loading, onChange }: IProps) {
  const [tabIndex, setTabIndex] = useState(-1);


  const tabItems = useMemo(() => {
    return dashboardTimeOptions.map<ITabPanelItem>(dto => ({
      title: dto.text,
      paramName: dto.value
    }));
  }, []);


  const onTabChange = (newTabIndex: number) => {
    const isValidTabIndex = newTabIndex >= 0 && newTabIndex < tabItems.length;
    const newValue = dashboardTimeOptions[newTabIndex]?.value;

    if (isValidTabIndex && isDashboardPeriod(newValue)) {
      setTabIndex(newTabIndex);
      newValue && onChange(newValue);
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
        items={tabItems}
        onTabChange={onTabChange}
        searchParamName="dashboardperiod"
        sx={{ fontSize: 66 }}
      />

    </Container>
  );
}



export default DashboardFilters;