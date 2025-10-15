import { createRef, useEffect, useRef } from "react";
import { Container, Paper, Stack } from "@mui/material";
import { useAPIRequest } from "../../Network/apiHooks";
import { useMergedState } from "../../Utils/reactHooks";
import { getLocalToUTCString } from "../../Utils/TimeUtilities";
import { useContextSnack } from "../../Contexts/SnackbarContext";
import { IVisit, IVisitStatsResponse } from "../../Utils/models";
import { ITableDataQuery } from "../../Components/Table/tableUtils";
import { urlQueryStringFromObject } from "../../Utils/DocumentUtils";
import DateTimeFilter from "../../Components/DateTime/DateTimeFilter";
import FullTable, { TableRefresh } from "../../Components/Table/FullTable";
import VisitsTableItems, { useVisitsTableHeaders } from "./VisitsTableItems";
import { IPeriodBoundaries } from "../../Components/DateTime/dtPeriodParser";

interface IState {
  visits: IVisit[];
  totalCount: number;
  loading: boolean;
}



function VisitsStatsPage() {
  const table = createRef<TableRefresh>();
  const { showSnack } = useContextSnack();
  const { RequestToApi } = useAPIRequest();
  const tableHeaders = useVisitsTableHeaders();
  const period = useRef<IPeriodBoundaries>({ start: 0, end: 0 });


  const [state, setState] = useMergedState<IState>({
    visits: [],
    totalCount: 0,
    loading: false
  });


  useEffect(() => {
    table.current?.refresh();
  }, []);


  const loadVisits = async (tableData: ITableDataQuery) => {
    const urlParams = urlQueryStringFromObject({
      ...tableData,
      _visitTimeFrom: getLocalToUTCString(period.current.start),
      _visitTimeTo: getLocalToUTCString(period.current.end)
    });


    const { Data } = await RequestToApi<IVisitStatsResponse>("/statistics.php" + urlParams, "GET");

    setState({
      totalCount: Data.totalCount,
      visits: Data.items
    });
  };


  return (
    <Container maxWidth="lg" disableGutters>
      <Paper sx={{ p: { xs: 1, sm: 2 } }}>
        <Stack sx={{ gap: 3, pt: 2 }}>

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

          <FullTable
            ref={table}
            headers={tableHeaders}
            itemsRenderer={<VisitsTableItems data={state.visits} />}
            initialSortDirection="desc"
            totalCount={state.totalCount}
            initialSortColumn="visit_time"
            queryData={loadVisits}
            rowsPerPageOptions={[10, 20, 50, 100]}
          />

        </Stack>
      </Paper>
    </Container>
  );
}



export default VisitsStatsPage;