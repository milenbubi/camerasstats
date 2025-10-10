import { createRef, useEffect } from "react";
import { useAPIRequest } from "../../Network/apiHooks";
import { useMergedState } from "../../Utils/reactHooks";
import { useContextSnack } from "../../Contexts/SnackbarContext";
import { IVisit, IVisitStatsResponse } from "../../Utils/models";
import { ITableDataQuery } from "../../Components/Table/tableUtils";
import FullTable, { TableRefresh } from "../../Components/Table/FullTable";
import VisitsTableItems, { useVisitsTableHeaders } from "./VisitsTableItems";

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


  const [state, setState] = useMergedState<IState>({
    visits: [],
    totalCount: 0,
    loading: false
  });


  useEffect(() => {
    table.current?.refresh();
  }, []);

  const loadVisits = async ({ _end, _start, _order, _sort }: ITableDataQuery) => {
    const { Data } = await RequestToApi<IVisitStatsResponse>(`/statistics.php?_start=${_start}&_end=${_end}&_order=${_order}&_sort=${_sort}`, "GET");
    setState({
      totalCount: Data.totalCount,
      visits: Data.items
    });
  };


  return (
    <>
      <FullTable
        ref={table}
        headers={tableHeaders}
        itemsRenderer={<VisitsTableItems data={state.visits} />}
        initialSortDirection="desc"
        totalCount={state.totalCount}
        initialSortColumn="createdAt"
        queryData={loadVisits}
        pagination
        rowsPerPageOptions={[10, 20, 50, 100]}
      />

    </>
  );
}



export default VisitsStatsPage;