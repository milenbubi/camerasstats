import { useRef } from "react";
import { Stack } from "@mui/material";
import { useLatestRequestGuard, useMergedState } from "@ffilip/mui-react-utils/react";
import { getLocalToUTCString, IPeriodBoundaries, urlQueryStringFromObject } from "@ffilip/chan180-utils";

import "../../Styles/Main.scss"
import DevicesChart from "./DevicesChart";
import DistinctStats from "./DistinctStats";
import DashboardTitle from "./DashboardTitle";
import DayOfWeekChart from "./DayOfWeekChart";
import DashboardFilters from "./DashboardFilters";
import { useAPIRequest } from "../../Network/apiHooks";
import { IDashboardResponse } from "../../Utils/models";
import { DEFAULT_DASHBOARD_STATE } from "./helpers/utils";
import { transformDashboardItems } from "./helpers/parsers";
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
        items: Data.items,
        ...transformDashboardItems(Data.items),
        totalCount: Data.totalCount,
        loading: false
      });
    }
  };


  return (
    <Stack sx={{ py: 2, alignItems: "center" }}>
      <DashboardTitle />
      <DashboardFilters onChange={changePeriod} loading={state.loading} />
      <Stack sx={{ width: 1, pt: 3, gap: { xs: 2, sm: 3, lg: 6 }, alignItems: "center" }}>
        {state.uniqueEntities && <DevicesChart data={state.uniqueEntities.devices} totalVisits={state.totalCount} />}
        {state.uniqueCounts && <DistinctStats data={state.uniqueCounts} />}
        {state.uniqueEntities && <DayOfWeekChart data={state.uniqueEntities.daysOfWeek} />}
      </Stack>
    </Stack>
  );
}



export default Dashboard;