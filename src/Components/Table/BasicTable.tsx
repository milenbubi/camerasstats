import { Sheet } from "@mui/joy";
import { ReactNode } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { ITableHeader } from "./tableUtils";
import C180NoTableRecordsLabel from "./C180NoTableRecordsLabel";

interface IProps {
  headers: ITableHeader[];
  itemsRenderer: ReactNode;
  hasRecords: boolean;
}



function BasicTable({ headers, itemsRenderer, hasRecords }: IProps) {
  return (
    <TableContainer component={Sheet} variant="soft">
      <Table size="small">

        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index} align={header.align}>
                <Box whiteSpace="nowrap">{header.text}</Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {hasRecords ? itemsRenderer : <C180NoTableRecordsLabel colSpan={headers.length} />}
        </TableBody>

      </Table>
    </TableContainer>
  );
}



export default BasicTable;