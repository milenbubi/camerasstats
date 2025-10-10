import { TableCellProps } from "@mui/material";



function buildPaginationOptions(options?: number[]) {
  if (options && options.length > 0) {
    const paginationOptions = options.map(option => ({
      value: option,
      label: option.toString()
    }));

    return paginationOptions;
  }

  return [
    { value: 20, label: "20" },
    { value: 50, label: "50" },
    { value: 100, label: "100" }
  ];
}


/**
 * Prevent `Thepage prop of a TablePagination is out of range` error raising
 * when search box is filled and user changes pagination,
 *
 */
function setCurrentPage(currentPage: number, pageRows: number, totalCount: number) {
  if (currentPage * pageRows + 1 > totalCount) {
    return 0;
  }

  return currentPage;
}


export interface ITablePage {
  current: number;
  rows: number;
}

export interface ITableSort {
  by: string;
  direction: SortDirection;
}

export type SortDirection = "asc" | "desc";

export interface ITableHeader {
  key: string;
  text: string;
  width?: string | number;
  disablePadding?: boolean;
  align?: TableCellProps["align"];
  sortable: boolean;
}

export interface ITableDataQuery {
  _start?: number;
  _end?: number;
  _sort?: string;
  _order?: SortDirection;
}



export { buildPaginationOptions, setCurrentPage };