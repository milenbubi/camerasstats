import { Typography } from "@mui/joy";
import { TableCell, TableRow } from "@mui/material";

interface IProps {
  colSpan: number;
}



function C180NoTableRecordsLabel({ colSpan }: IProps) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan}>

        <Typography
          textAlign="center"
          level="h2"
          color="danger"
          children="No Records"
        />

      </TableCell>
    </TableRow>
  );
}



export default C180NoTableRecordsLabel;