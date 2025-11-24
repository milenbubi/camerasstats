import { memo, useMemo } from "react";
import { TableCell, TableRow } from "@mui/material";
import { useChan180Colors } from "@ffilip/mui-react-utils/mui";
import { formatUTCDateToLocalDateString } from "@ffilip/chan180-utils/time";

import VisitIpLabel from "./VisitIpLabel";
import { IVisit } from "../../Utils/models";
import VisitDeviceLabel from "./VisitDeviceLabel";
import VisitMoreDataLabel from "./VisitMoreDataLabel";
import { ITableHeader } from "../../Components/Table/tableUtils";

interface IProps {
  data: IVisit[];
}



export function useVisitsTableHeaders() {
  const tableHeaders = useMemo<ITableHeader[]>(() => [
    { key: "city", text: "City", sortable: true },
    { key: "region", text: "Region", sortable: true },
    { key: "country", text: "Country", sortable: true },
    { key: "visit_time", text: "Visit Time", sortable: true },
    { key: "device", text: "Device", sortable: true },
    { key: "ipAddress", text: "IP Address", sortable: false },
    { key: "_more", text: "More", sortable: false }
  ], []);

  return tableHeaders;
}



function ItemsRenderer({ data }: IProps) {
  const { greenC, blueC, yellowC, redC, isDark } = useChan180Colors();
  return (
    <>
      {data.map(visit => (
        <TableRow key={visit.id} hover>
          <TableCell sx={{ color: greenC, fontWeight: 600 }}>{visit.city}</TableCell>
          <TableCell>{visit.region}</TableCell>
          <TableCell>{visit.country}</TableCell>

          <TableCell sx={{ whiteSpace: "nowrap", color: isDark ? yellowC : redC }}>
            {formatUTCDateToLocalDateString(visit.visitTime, "fullDateTime", "en", true)}
          </TableCell>

          <TableCell>
            <VisitDeviceLabel visit={visit} blueC={blueC} greenC={greenC} isDark={isDark} yellowC={yellowC} />
          </TableCell>

          <TableCell>
            <VisitIpLabel visit={visit} blueC={blueC} greenC={greenC} isDark={isDark} yellowC={yellowC} redC={redC} />
          </TableCell>

          <TableCell>
            <VisitMoreDataLabel visit={visit} yellowC={yellowC} />
          </TableCell>
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