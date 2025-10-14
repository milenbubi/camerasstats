import { ChangeEvent, MouseEvent, useMemo } from "react";
import { alpha, Box, TablePagination } from "@mui/material";
import { ITablePage, buildPaginationOptions, setCurrentPage } from "./tableUtils";

interface IProps {
  totalCount: number;
  page: ITablePage;
  rowsPerPageOptions?: number[];
  onChangePage: (value: number) => void;
  onChangeRowsPerPage: (value: number) => void;
}



function C180TablePagination(props: IProps) {
  const rowsPerPageOptions = useMemo(() => buildPaginationOptions(props.rowsPerPageOptions), []);


  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, next: number) => {
    props.onChangePage(next);
  };


  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    props.onChangeRowsPerPage(Number(event.target.value) || 0);
  };


  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
      <TablePagination
        component={Box}
        rowsPerPageOptions={rowsPerPageOptions}
        labelRowsPerPage="Rows"
        count={Number(props.totalCount)}
        rowsPerPage={props.page.rows}
        page={setCurrentPage(props.page.current, props.page.rows, props.totalCount)}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={({ from, to, count }) => (
          <Box component="span">
            {`${from} - ${to}`}
            <Box component="span" mx={0.8}>
              {"of"}
            </Box>
            {count}
          </Box>
        )}
        sx={{
          "& .MuiToolbar-root": { minHeight: 20 },
          "& .MuiTablePagination-selectLabel": { my: "12px" },
          "& .MuiTablePagination-displayedRows": { my: "12px" }
        }}
        slotProps={{
          select: {
            MenuProps: {
              PaperProps: {
                sx: { border: t => "1px solid " + alpha(t.palette.primary.light, 0.5) }
              }
            },
            inputProps: {
              id: "pgninp"
            }
          }
        }}
      />
    </Box>
  );
}



export default C180TablePagination;