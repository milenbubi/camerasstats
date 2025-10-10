import { Fragment } from "react";
import { Box, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { ITableHeader, SortDirection } from "./tableUtils";

interface IProps {
  onRequestSort: (property: string) => void;
  sortDirection: SortDirection;
  sortBy: string;
  headers: ITableHeader[];
  initialSortDirection: SortDirection;
}



function TableHeader({ initialSortDirection, sortDirection, sortBy, onRequestSort, headers }: IProps) {
  return (
    <TableHead>
      <TableRow>
        {headers.map((header, index) => (
          <Fragment key={index}>
            {header.sortable ?
              (
                <TableCell
                  sx={{ width: header.width }}
                  scope="row"
                  align={header.align || "left"}
                  padding={header.disablePadding ? "none" : "normal"}
                  sortDirection={sortBy === header.key ? sortDirection : false}
                >
                  <TableSortLabel
                    active={sortBy === header.key}
                    direction={sortBy === header.key ? sortDirection : initialSortDirection}
                    onClick={() => onRequestSort(header.key)}
                  >
                    <Box whiteSpace="nowrap">{header.text}</Box>
                  </TableSortLabel>
                </TableCell>
              )
              :
              (
                <TableCell
                  align={header.align || "left"}
                  padding={header.disablePadding ? "none" : "normal"}
                  scope="row"
                  width={header.width}
                >
                  <Box whiteSpace="nowrap">{header.text}</Box>
                </TableCell>
              )
            }
          </Fragment>
        ))}
      </TableRow>
    </TableHead>
  );
}



export default TableHeader;