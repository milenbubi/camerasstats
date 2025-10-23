import { createRef, useEffect, useRef } from "react";
import { Container, Paper, Stack } from "@mui/material";
import { DEFAULT_VISITS_TABLE_STATE, normalizeDeviceNames } from "./utils";
import { DeviceName } from "../../Utils/statsUtils";
import VisitDeviceFilter from "./VisitDeviceFilter";
import SearchField from "../../Components/SearchField";
import { useAPIRequest } from "../../Network/apiHooks";
import { useMergedState } from "../../Utils/reactHooks";
import { IVisitStatsResponse } from "../../Utils/models";
import { getLocalToUTCString } from "../../Utils/TimeUtilities";
import { useContextSnack } from "../../Contexts/SnackbarContext";
import { ITableDataQuery } from "../../Components/Table/tableUtils";
import { urlQueryStringFromObject } from "../../Utils/documentUtils";
import DateTimeFilter from "../../Components/DateTime/DateTimeFilter";
import FullTable, { TableRefresh } from "../../Components/Table/FullTable";
import { IPeriodBoundaries } from "../../Components/DateTime/dtPeriodParser";
import VisitsTableItems, { useVisitsTableHeaders } from "./VisitsTableItems";



function VisitsStatsPage() {
  const searchText = useRef("");
  const table = createRef<TableRefresh>();
  const { showSnack } = useContextSnack();
  const devices = useRef<DeviceName[]>([]);
  const { RequestToApi } = useAPIRequest();
  const tableHeaders = useVisitsTableHeaders();
  const period = useRef<IPeriodBoundaries>({ start: 0, end: 0 });
  const [state, setState] = useMergedState({ ...DEFAULT_VISITS_TABLE_STATE });


  useEffect(() => {
    table.current?.refresh();
  }, []);


  const loadVisits = async (tableData: ITableDataQuery) => {
    const urlParams = urlQueryStringFromObject({
      ...tableData,
      _search: searchText.current,
      _visitTimeFrom: getLocalToUTCString(period.current.start),
      _visitTimeTo: getLocalToUTCString(period.current.end),
      _devices: normalizeDeviceNames(devices.current)
    });

    const { Data, Error } = await RequestToApi<IVisitStatsResponse>("/statistics.php" + urlParams, "GET");

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
              table.current?.refresh()
            }}
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
            rowsPerPageOptions={[20, 50, 100]}
          />

        </Stack>
      </Paper>
    </Container>
  );
}



export default VisitsStatsPage;