import { Stack } from "@mui/material";
import { useEffect, useRef } from "react";
import { urlQueryStringFromObject } from "@ffilip/chan180-utils";
import { useLatestRequestGuard, useMergedState } from "@ffilip/mui-react-utils/react";

import DevicesChart from "./DevicesChart";
import { useAPIRequest } from "../../Network/apiHooks";
import { IDashboardDataResponse } from "../../Utils/models";
import { useContextSnack } from "../../Contexts/SnackbarContext";
import { DashboardPeriods, DEFAULT_DASHBOARD_STATE } from "./utils";



function Dashboard() {
  const { showSnack } = useContextSnack();
  const { RequestToApi } = useAPIRequest();
  const period = useRef<DashboardPeriods>("all");
  const { register, isOutdated } = useLatestRequestGuard();
  const [state, setState] = useMergedState({ ...DEFAULT_DASHBOARD_STATE });


  useEffect(() => {
    loadDashboardData();
  }, []);


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
    <Stack sx={{ gap: 4, pt: 2, alignItems: "center" }}>


      {/* <Paper sx={{ p: 7 }}> */}
      {/* <Sheet variant="outlined" sx={{ p: 4 }}> */}

      {state.data && (
        <DevicesChart data={state.data?.devices} title="Devices that visited chan180.net" />
      )}
      {/* </Sheet> */}
      {/* </Paper> */}

    </Stack>

  );
}



export default Dashboard;