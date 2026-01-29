import { useRef } from "react";
import { Stack } from "@mui/material";
import { useLatestRequestGuard, useMergedState } from "@ffilip/mui-react-utils/react";
import { getLocalToUTCString, IPeriodBoundaries, urlQueryStringFromObject } from "@ffilip/chan180-utils";

import "../../Styles/Main.scss"
import DevicesChart from "./DevicesChart";
import DistinctStats from "./DistinctStats";
import DashboardTitle from "./DashboardTitle";
import DayOfWeekChart from "./DayOfWeekChart";
import EntityPieCharts from "./EntityPieChart";
import DashboardFilters from "./DashboardFilters";
import { useAPIRequest } from "../../Network/apiHooks";
import { IDashboardResponse } from "../../Utils/models";
import { DEFAULT_DASHBOARD_STATE } from "./helpers/utils";
import { useContextSnack } from "../../Contexts/SnackbarContext";



function Dashboard() {
  const { showSnack } = useContextSnack();
  const { RequestToApi } = useAPIRequest();
  const { register, isOutdated } = useLatestRequestGuard();
  const period = useRef<IPeriodBoundaries>({ start: 0, end: 0 });
  const [state, setState] = useMergedState({ ...DEFAULT_DASHBOARD_STATE });


  const changePeriod = (newPeriod: IPeriodBoundaries) => {
    period.current = newPeriod;
    loadDashboardData();
  };


  const loadDashboardData = async () => {
    setState({ loading: true });
    const requestId = register();

    const urlParams = urlQueryStringFromObject({
      _visitTimeFrom: getLocalToUTCString(period.current.start),
      _visitTimeTo: getLocalToUTCString(period.current.end),
      _timeZoneoffsetInMinutes: new Date().getTimezoneOffset()
    });

    const { Data, Error } = await RequestToApi<IDashboardResponse>("/dashboard.php" + urlParams, "GET");

    if (isOutdated(requestId)) {  // Abort, if there is new request
      setState({ loading: false });
      return;
    }

    if (Error) {
      showSnack(Error, "danger", "solid");
      setState({ ...DEFAULT_DASHBOARD_STATE });
    }
    else {
      setState({
        data: Data.data,
        totalCount: Data.totalCount,
        loading: false
      });
    }
  };


  return (
    <Stack sx={{ py: 2, alignItems: "center" }}>
      <DashboardTitle />
      <DashboardFilters onChange={changePeriod} loading={state.loading} />

      {state.data && (
        <Stack sx={{ width: 1, pt: { xs: 3, lg: 5 }, gap: { xs: 2, sm: 2, lg: 6 }, alignItems: "center" }}>
          <Stack sx={{ flexDirection: { xs: "column", xl: "row" }, maxWidth: { xs: "md", xl: "lg" }, width: 1, gap: { xs: 2, sm: 3, lg: 6 }, alignItems: "stretch" }}>
            <DevicesChart data={state.data.uniqueEntities.devices} totalVisits={state.totalCount} />
            <EntityPieCharts data={state.data.uniqueEntities} totalVisits={state.totalCount} />
          </Stack>

          <Stack sx={{ width: 1, gap: { xs: 2, sm: 2, lg: 6 }, alignItems: "center", maxWidth: { xs: "md", xl: "lg" } }}>
            <DistinctStats data={state.data.uniqueCounts} />
            <DayOfWeekChart data={state.data.uniqueEntities.daysOfWeek} />
          </Stack>
        </Stack>
      )}

    </Stack>
  );
}



export default Dashboard;