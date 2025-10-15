import { memo, useMemo } from "react";
import { TableCell, TableRow } from "@mui/material";
import { IVisit } from "../../Utils/models";
import VisitDeviceLabel from "./VisitDeviceLabel";
import { ITableHeader } from "../../Components/Table/tableUtils";
import { formatUTCDateToLocalDateString } from "../../Utils/TimeUtilities";

interface IProps {
  data: IVisit[];
}



export function useVisitsTableHeaders() {
  const tableHeaders = useMemo<ITableHeader[]>(
    () => [
      { key: "city", text: "City", sortable: true },
      { key: "region", text: "Region", sortable: true },
      { key: "country", text: "Country", sortable: true },
      { key: "visit_time", text: "Visit Time", sortable: true },
      { key: "device", text: "Device", sortable: true },
      { key: "ipAddress", text: "IP Address", sortable: false }
    ], []
  );

  return tableHeaders;
}



function ItemsRenderer({ data }: IProps) {
  return (
    <>
      {data.map((visit, index) => (
        <TableRow key={index} hover>
          <TableCell>{visit.city}</TableCell>
          <TableCell>{visit.region}</TableCell>
          <TableCell>{visit.country}</TableCell>

          <TableCell sx={{ whiteSpace: "nowrap" }}>
            {formatUTCDateToLocalDateString(visit.visitTime, "fullDateTime", "en", true)}
          </TableCell>

          <TableCell>
            <VisitDeviceLabel visit={visit}  />
          </TableCell>

          <TableCell>{visit.ipAddress}</TableCell>
        </TableRow>
      ))}
    </>
  );
}



const VisitsTableItems = memo(
  ItemsRenderer,
  (prevProps, nextProps) => prevProps.data === nextProps.data
);


export default VisitsTableItems;