import { SxProps, Theme } from "@mui/material";
import { DateTimePickerSlotProps } from "@mui/x-date-pickers";


export const dtPickerSlotProps: DateTimePickerSlotProps<false> = {
  textField:
  {
    error: false,
    size: "small",
    sx: {
      background: t => t.palette.mode === "dark" ? "#0b0d0e" : "#fbfcfe",
      width: 250,
      "& .MuiPickersSectionList-root": {
        fontSize: 15
      },
      "& .MuiFormLabel-root": {
        fontSize: 15,
        "&.Mui-focused": {
          fontSize: 16
        }
      }
    }
  }
};



export const dtSelecSx: SxProps<Theme> = {
  mr: 3,
  width: 160,
  maxWidth: 160,
  height: 40,
  background: t => t.palette.mode === "dark" ? "#0b0d0e" : "#fbfcfe",
};