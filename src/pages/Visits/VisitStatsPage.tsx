import { createRef, useEffect, useRef } from "react";
import { Container, Paper, Stack } from "@mui/material";
import { getLocalToUTCString } from "@ffilip/chan180-utils/time";
import { SearchField } from "@ffilip/mui-react-utils/components";
import { urlQueryStringFromObject } from "@ffilip/chan180-utils/env";
import { useLatestRequestGuard, useMergedState } from "@ffilip/mui-react-utils/react";

import { DeviceName } from "../../Utils/statsUtils";
import VisitDeviceFilter from "./VisitDeviceFilter";
import { useAPIRequest } from "../../Network/apiHooks";
import { IVisitStatsResponse } from "../../Utils/models";
import { useContextSnack } from "../../Contexts/SnackbarContext";
import { ITableDataQuery } from "../../Components/Table/tableUtils";
import DateTimeFilter from "../../Components/DateTime/DateTimeFilter";
import FullTable, { TableRefresh } from "../../Components/Table/FullTable";
import { DEFAULT_VISITS_TABLE_STATE, normalizeDeviceNames } from "./utils";
import { IPeriodBoundaries } from "../../Components/DateTime/dtPeriodParser";
import VisitsTableItems, { useVisitsTableHeaders } from "./VisitsTableItems";



function VisitsStatsPage() {
  const searchText = useRef("");
  const table = createRef<TableRefresh>();
  const { showSnack } = useContextSnack();
  const devices = useRef<DeviceName[]>([]);
  const { RequestToApi } = useAPIRequest();
  const tableHeaders = useVisitsTableHeaders();
  const { register, isOutdated } = useLatestRequestGuard();
  const period = useRef<IPeriodBoundaries>({ start: 0, end: 0 });
  const [state, setState] = useMergedState({ ...DEFAULT_VISITS_TABLE_STATE });


  useEffect(() => {
    table.current?.refresh();
  }, []);


  const loadVisits = async (tableData: ITableDataQuery) => {
    setState({ loading: true });
    const requestId = register();

    const urlParams = urlQueryStringFromObject({
      ...tableData,
      _search: searchText.current,
      _visitTimeFrom: getLocalToUTCString(period.current.start),
      _visitTimeTo: getLocalToUTCString(period.current.end),
      _devices: normalizeDeviceNames(devices.current)
    });

    const { Data, Error } = await RequestToApi<IVisitStatsResponse>("/statistics.php" + urlParams, "GET");

    if (isOutdated(requestId)) {  // Abort, if there is new request
      setState({ loading: false });
      return;
    }

    if (Error) {
      showSnack(Error, "danger", "solid");
      setState({ ...DEFAULT_VISITS_TABLE_STATE });
    }
    else {
      setState({
        totalCount: Data.totalCount,
        visits: Data.items,
        loading: false
      });
    }
  };


  return (
    <Container maxWidth="lg" disableGutters>
      <Paper sx={{ p: { xs: 1, sm: 2 } }}>
        <Stack sx={{ gap: { xs: 3, sm: 4 }, pt: 2 }}>

          <SearchField
            onChange={s => {
              searchText.current = s;
            }}
            onSubmit={s => {
              searchText.current = s;
              table.current?.refresh();
            }}
            name="stats180-search"
            placeholder="Search all fields..."
            maxWidth={290}
          />

          <DateTimeFilter
            onFilterClicked={p => {
              period.current = p;
              table.current?.refresh();
            }}
            onPeriodChanged={p => {
              period.current = p;
            }}
            initialFilterPeriod={7}
          />

          <VisitDeviceFilter
            onFilterChanged={f => {
              devices.current = f;
              table.current?.refresh();
            }}
            setInitialFilters={f => {
              devices.current = f;
            }}
          />

          <FullTable
            ref={table}
            headers={tableHeaders}
            itemsRenderer={<VisitsTableItems data={state.visits} />}
            initialSortDirection="desc"
            totalCount={state.totalCount}
            initialSortColumn="visit_time"
            queryData={loadVisits}
            loading={state.loading}
            rowsPerPageOptions={[20, 50, 100]}
          />

        </Stack>
      </Paper>
    </Container>
  );
}



export default VisitsStatsPage;