import { ReactNode } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { ITableHeader } from "./tableUtils";
import C180NoTableRecordsLabel from "./C180NoTableRecordsLabel";

interface IProps {
  headers?: ITableHeader[];
  itemsRenderer: ReactNode;
  hasRecords: boolean;
}



function BasicTable({ headers, itemsRenderer, hasRecords }: IProps) {
  return (
    <TableContainer>
      <Table size="small">

        <TableHead>
          <TableRow>
            {headers?.map((header) => (
              <TableCell key={header.key} align={header.align} width={header.width}>
                <Box whiteSpace="nowrap">{header.text}</Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {hasRecords ? itemsRenderer : <C180NoTableRecordsLabel />}
        </TableBody>
      </Table>
    </TableContainer>
  );
}



export default BasicTable;