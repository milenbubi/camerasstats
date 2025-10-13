import { Sheet } from "@mui/joy";
import { ReactNode, Ref, forwardRef, useImperativeHandle, useRef, useState } from "react";
import { SxProps, Table, TableBody, TableContainer, TableFooter, Theme } from "@mui/material";

import TableHeader from "./TableHeader";
import TrinityTablePagination from "./TrinityTablePagination";
import C180NoTableRecordsLabel from "./C180NoTableRecordsLabel";
import { useDidUpdateEffect, useMergedState } from "../../Utils/reactHooks";
import { ITableDataQuery, ITableHeader, ITablePage, ITableSort, SortDirection, buildPaginationOptions } from "./tableUtils";

interface IProps {
  headers: ITableHeader[];
  itemsRenderer: ReactNode;
  initialSortDirection?: SortDirection;
  totalCount: number;
  initialSortColumn?: string;
  queryData: (props: ITableDataQuery) => void;
  pagination?: boolean;
  rowsPerPageOptions?: number[];
  sx?: SxProps<Theme>;
}

export interface TableRefresh {
  refresh(): void;
  refreshWithSameSettings(): void;
}



function FullTable({ initialSortColumn = "", initialSortDirection = "desc", ...props }: IProps, ref: Ref<TableRefresh>) {
  useImperativeHandle(ref, () => ({ refresh, refreshWithSameSettings: triggerFetch }));
  const mayUpdate = useRef(true); // Avoid updating, when new page rows count is bigger than records

  const [sort, setSort] = useMergedState<ITableSort>({
    by: initialSortColumn,
    direction: initialSortDirection,
  });

  const [page, setPage] = useState<ITablePage>({
    current: 0,
    rows: buildPaginationOptions(props.rowsPerPageOptions)[0].value,
  });


  useDidUpdateEffect(() => {
    if (mayUpdate.current) {
      triggerFetch();
    }
    else {
      mayUpdate.current = true;
    }
  }, [page]);


  const triggerFetch = () => {
    const queryProps: ITableDataQuery = {
      _start: page.current * page.rows,
      _end: page.current * page.rows + page.rows,
      _sort: sort.by,
      _order: sort.direction
    };

    props.queryData(queryProps);
  };


  const handleRequestSort = (sortKey: string) => {
    let sortDirection: SortDirection;

    if (sortKey === sort.by) {
      sortDirection = sort.direction === "asc" ? "desc" : "asc";
    }
    else {
      sortDirection = initialSortDirection;
    }

    setSort({ by: sortKey, direction: sortDirection }, () =>
      setPage(oldPage => ({ ...oldPage, current: 0 }))
    );
  };


  const handleChangePage = (next: number) => {
    setPage(oldPage => ({ ...oldPage, current: next }));
  };


  const handleChangeRowsPerPage = (rows: number) => {
    if (page.rows >= props.totalCount && rows >= props.totalCount) {
      mayUpdate.current = false; // Avoid server request in this case
    }

    setPage({ current: 0, rows });
  };


  const refresh = () => {
    setSort(
      { by: initialSortColumn, direction: initialSortDirection },
      () => setPage(oldPage => ({ ...oldPage, current: 0 }))
    );
  };


  return (
    <TableContainer
      component={Sheet}
      variant="outlined"
      sx={{ borderRadius: "6px", ...props.sx }}
    >
      <Table size="small">
        <TableHeader
          sortDirection={sort.direction}
          sortBy={sort.by}
          onRequestSort={handleRequestSort}
          headers={props.headers}
          initialSortDirection={initialSortDirection}
        />
        <TableBody>
          {props.totalCount > 0 ? props.itemsRenderer : <C180NoTableRecordsLabel colSpan={props.headers.length} />}
        </TableBody>

        {props.pagination && (
          <TableFooter>
            <TrinityTablePagination
              rowsPerPageOptions={props.rowsPerPageOptions}
              totalCount={props.totalCount}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableFooter>
        )}

      </Table>
    </TableContainer>
  );
}



export default forwardRef<TableRefresh, IProps>(FullTable);