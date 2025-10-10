import { TableCell, TableRow, Typography } from "@mui/material";
import { ITableHeader } from "./tableUtils";

interface IProps {
  headers?: ITableHeader[];
}



function C180NoTableRecordsLabel({ headers }: IProps) {
  return (
    <TableRow>
      <TableCell colSpan={headers?.length || 1} align="center">
        <Typography variant="h4" color="error">
          {"No Records"}
        </Typography>
      </TableCell>
    </TableRow>
  );
}



export default C180NoTableRecordsLabel;