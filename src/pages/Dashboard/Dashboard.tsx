import { useRef } from "react";
import { Stack } from "@mui/material";
import { useLatestRequestGuard, useMergedState } from "@ffilip/mui-react-utils/react";
import { calculatePeriodBoundaries, getLocalToUTCString, IPeriodBoundaries, urlQueryStringFromObject } from "@ffilip/chan180-utils";

import DevicesChart from "./DevicesChart";
import DashboardTitle from "./DashboardTitle";
import DashboardFilters from "./DashboardFilters";
import { transformDashboardItems } from "./parsers";
import { useAPIRequest } from "../../Network/apiHooks";
import { IDashboardResponse } from "../../Utils/models";
import { useContextSnack } from "../../Contexts/SnackbarContext";
import { DashboardPeriod, DEFAULT_DASHBOARD_STATE, DEFAULT_DASHBOARD_PERIOD } from "./utils";



function Dashboard() {
  const { showSnack } = useContextSnack();
  const { RequestToApi } = useAPIRequest();
  const { register, isOutdated } = useLatestRequestGuard();
  const period = useRef<DashboardPeriod>(DEFAULT_DASHBOARD_PERIOD);
  const [state, setState] = useMergedState({ ...DEFAULT_DASHBOARD_STATE });


  const changePeriod = (newPeriod: DashboardPeriod) => {
    period.current = newPeriod;
    loadDashboardData();
  };


  const loadDashboardData = async () => {
    setState({ loading: true });
    const requestId = register();

    const { start, end }: IPeriodBoundaries = calculatePeriodBoundaries(period.current);

    const urlParams = urlQueryStringFromObject({
      _visitTimeFrom: getLocalToUTCString(start),
      _visitTimeTo: getLocalToUTCString(end)
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
    <Stack sx={{ gap: 3, pt: 2, alignItems: "center" }}>
      <DashboardTitle />
      <DashboardFilters onChange={changePeriod} loading={state.loading} />
      <DevicesChart data={state.devices} totalVisits={state.totalCount} />
    </Stack>
  );
}



export default Dashboard;