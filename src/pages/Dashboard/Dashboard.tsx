import { useRef } from "react";
import { Stack } from "@mui/material";
import { urlQueryStringFromObject } from "@ffilip/chan180-utils";
import { useLatestRequestGuard, useMergedState } from "@ffilip/mui-react-utils/react";

import DevicesChart from "./DevicesChart";
import DashboardTitle from "./DashboardTitle";
import DashboardFilters from "./DashboardFilters";
import { useAPIRequest } from "../../Network/apiHooks";
import { IDashboardDataResponse } from "../../Utils/models";
import { useContextSnack } from "../../Contexts/SnackbarContext";
import { DashboardPeriod, DEFAULT_DASHBOARD_STATE } from "./utils";



function Dashboard() {
  const { showSnack } = useContextSnack();
  const { RequestToApi } = useAPIRequest();
  const period = useRef<DashboardPeriod>("24h");
  const { register, isOutdated } = useLatestRequestGuard();
  const [state, setState] = useMergedState({ ...DEFAULT_DASHBOARD_STATE });


  const changePeriod = (newPeriod: DashboardPeriod) => {
    period.current = newPeriod;
    loadDashboardData();
  };


  const loadDashboardData = async () => {
    setState({ loading: true });
    const requestId = register();

    const urlParams = urlQueryStringFromObject({
      _period: period.current
    });

    const { Data, Error } = await RequestToApi<IDashboardDataResponse>("/dashboard.php" + urlParams, "GET");

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
        data: Data,
        loading: false
      });
    }
  };


  return (
    <Stack sx={{ gap: 3, pt: 2, alignItems: "center" }}>
      <DashboardTitle />
      <DashboardFilters onChange={changePeriod} loading={state.loading} />
      <DevicesChart data={state.data?.devices} />
    </Stack>
  );
}



export default Dashboard;